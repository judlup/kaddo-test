import type { SqliteDatabase } from "../../database/index.js";
import type { CreateTaskInput, Task, UpdateTaskInput } from "./task.model.js";

interface TaskRow {
  id: number;
  title: string;
  description: string | null;
  status: Task["status"];
  priority: Task["priority"];
  project_id: number | null;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
  deleted_at: string | null;
}

export class TaskRepository {
  constructor(private readonly database: SqliteDatabase) {}

  create(input: CreateTaskInput): Task {
    const now = new Date().toISOString();

    const result = this.database
      .prepare(
        `
        INSERT INTO tasks (
          title,
          description,
          status,
          priority,
          project_id,
          created_at,
          updated_at,
          completed_at,
          deleted_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, NULL, NULL)
        `
      )
      .run(
        input.title,
        input.description ?? null,
        input.status ?? "todo",
        input.priority ?? "medium",
        input.projectId ?? null,
        now,
        now
      );

    return this.getById(Number(result.lastInsertRowid)) as Task;
  }

  getById(id: number): Task | null {
    const row = this.database.prepare("SELECT * FROM tasks WHERE id = ?").get(id) as
      | TaskRow
      | undefined;

    return row ? toTask(row) : null;
  }

  update(id: number, input: UpdateTaskInput): Task | null {
    const current = this.getById(id);

    if (!current) {
      return null;
    }

    const next = {
      title: input.title ?? current.title,
      description: input.description === undefined ? current.description : input.description,
      status: input.status ?? current.status,
      priority: input.priority ?? current.priority,
      projectId: input.projectId === undefined ? current.projectId : input.projectId,
      completedAt: input.completedAt === undefined ? current.completedAt : input.completedAt,
      deletedAt: input.deletedAt === undefined ? current.deletedAt : input.deletedAt,
      updatedAt: nextTimestampAfter(current.updatedAt)
    };

    this.database
      .prepare(
        `
        UPDATE tasks
        SET
          title = ?,
          description = ?,
          status = ?,
          priority = ?,
          project_id = ?,
          updated_at = ?,
          completed_at = ?,
          deleted_at = ?
        WHERE id = ?
        `
      )
      .run(
        next.title,
        next.description,
        next.status,
        next.priority,
        next.projectId,
        next.updatedAt,
        next.completedAt,
        next.deletedAt,
        id
      );

    return this.getById(id);
  }
}

function nextTimestampAfter(timestamp: string): string {
  const nextTime = Math.max(Date.now(), Date.parse(timestamp) + 1);
  return new Date(nextTime).toISOString();
}

function toTask(row: TaskRow): Task {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    status: row.status,
    priority: row.priority,
    projectId: row.project_id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    completedAt: row.completed_at,
    deletedAt: row.deleted_at
  };
}
