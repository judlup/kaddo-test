import type Database from 'better-sqlite3';
import { NotFoundError } from '../../shared/errors';
import { DEFAULT_PRIORITY } from '../../shared/constants';
import type { Task, CreateTaskInput, UpdateTaskInput, FindTasksOptions } from './task.model';

export class TaskRepository {
  constructor(private readonly db: Database.Database) {}

  findAll(options: FindTasksOptions = {}): Task[] {
    const conditions: string[] = ['deleted_at IS NULL'];
    const params: unknown[] = [];

    if (options.status !== undefined) {
      conditions.push('status = ?');
      params.push(options.status);
    }

    if (options.projectId !== undefined) {
      conditions.push('project_id = ?');
      params.push(options.projectId);
    }

    const sql = `SELECT * FROM tasks WHERE ${conditions.join(' AND ')} ORDER BY created_at ASC`;
    return this.db.prepare(sql).all(...params) as Task[];
  }

  findById(id: number): Task | undefined {
    return this.db
      .prepare('SELECT * FROM tasks WHERE id = ? AND deleted_at IS NULL')
      .get(id) as Task | undefined;
  }

  create(input: CreateTaskInput): Task {
    return this.db
      .prepare(
        `INSERT INTO tasks (title, description, priority, project_id)
         VALUES (?, ?, ?, ?)
         RETURNING *`
      )
      .get(
        input.title,
        input.description ?? null,
        input.priority ?? DEFAULT_PRIORITY,
        input.project_id ?? null
      ) as Task;
  }

  update(id: number, input: UpdateTaskInput): Task {
    const fields: string[] = ["updated_at = datetime('now')"];
    const params: unknown[] = [];

    if (input.title !== undefined) {
      fields.push('title = ?');
      params.push(input.title);
    }
    if ('description' in input) {
      fields.push('description = ?');
      params.push(input.description ?? null);
    }
    if (input.status !== undefined) {
      fields.push('status = ?');
      params.push(input.status);
      if (input.status === 'done') {
        fields.push("completed_at = datetime('now')");
      }
    }
    if (input.priority !== undefined) {
      fields.push('priority = ?');
      params.push(input.priority);
    }
    if ('project_id' in input) {
      fields.push('project_id = ?');
      params.push(input.project_id ?? null);
    }

    params.push(id);

    const updated = this.db
      .prepare(
        `UPDATE tasks SET ${fields.join(', ')} WHERE id = ? AND deleted_at IS NULL RETURNING *`
      )
      .get(...params) as Task | undefined;

    if (!updated) {
      throw new NotFoundError('Task', id);
    }
    return updated;
  }

  softDelete(id: number): void {
    const result = this.db
      .prepare(
        `UPDATE tasks SET deleted_at = datetime('now'), updated_at = datetime('now')
         WHERE id = ? AND deleted_at IS NULL`
      )
      .run(id);

    if (result.changes === 0) {
      throw new NotFoundError('Task', id);
    }
  }
}
