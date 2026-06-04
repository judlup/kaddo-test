import { describe, it, expect, beforeEach } from 'vitest';
import Database from 'better-sqlite3';
import { runMigrations } from '../../database/migrations/runner';
import { TaskRepository } from './task.repository';
import { NotFoundError } from '../../shared/errors';

function makeDb(): Database.Database {
  const db = new Database(':memory:');
  db.pragma('foreign_keys = ON');
  runMigrations(db);
  return db;
}

describe('TaskRepository', () => {
  let db: Database.Database;
  let repo: TaskRepository;

  beforeEach(() => {
    db = makeDb();
    repo = new TaskRepository(db);
  });

  describe('create', () => {
    it('creates a task with minimal input and applies defaults', () => {
      const task = repo.create({ title: 'Buy groceries' });

      expect(task.id).toBeTypeOf('number');
      expect(task.title).toBe('Buy groceries');
      expect(task.description).toBeNull();
      expect(task.status).toBe('todo');
      expect(task.priority).toBe('medium');
      expect(task.project_id).toBeNull();
      expect(task.deleted_at).toBeNull();
      expect(task.completed_at).toBeNull();
      expect(task.created_at).toBeTruthy();
      expect(task.updated_at).toBeTruthy();
    });

    it('creates a task with all fields provided', () => {
      const project = db.prepare("INSERT INTO projects (name) VALUES ('Work') RETURNING *").get() as { id: number };
      const task = repo.create({
        title: 'Write report',
        description: 'Q2 summary',
        priority: 'high',
        project_id: project.id,
      });

      expect(task.title).toBe('Write report');
      expect(task.description).toBe('Q2 summary');
      expect(task.priority).toBe('high');
      expect(task.project_id).toBe(project.id);
    });
  });

  describe('findById', () => {
    it('returns a task by id', () => {
      const created = repo.create({ title: 'Fix bug' });
      const found = repo.findById(created.id);

      expect(found).toBeDefined();
      expect(found!.id).toBe(created.id);
      expect(found!.title).toBe('Fix bug');
    });

    it('returns undefined for a non-existent id', () => {
      expect(repo.findById(999)).toBeUndefined();
    });

    it('returns undefined for a soft-deleted task', () => {
      const task = repo.create({ title: 'To delete' });
      repo.softDelete(task.id);

      expect(repo.findById(task.id)).toBeUndefined();
    });
  });

  describe('findAll', () => {
    it('returns all non-deleted tasks', () => {
      repo.create({ title: 'Task A' });
      repo.create({ title: 'Task B' });
      const deleted = repo.create({ title: 'Task C' });
      repo.softDelete(deleted.id);

      const tasks = repo.findAll();
      expect(tasks).toHaveLength(2);
      expect(tasks.map(t => t.title)).toEqual(['Task A', 'Task B']);
    });

    it('filters by status', () => {
      const a = repo.create({ title: 'Task A' });
      repo.create({ title: 'Task B' });
      repo.update(a.id, { status: 'in-progress' });

      const inProgress = repo.findAll({ status: 'in-progress' });
      expect(inProgress).toHaveLength(1);
      expect(inProgress[0].title).toBe('Task A');
    });

    it('filters by projectId', () => {
      const project = db.prepare("INSERT INTO projects (name) VALUES ('P1') RETURNING *").get() as { id: number };
      repo.create({ title: 'Owned', project_id: project.id });
      repo.create({ title: 'Orphan' });

      const owned = repo.findAll({ projectId: project.id });
      expect(owned).toHaveLength(1);
      expect(owned[0].title).toBe('Owned');
    });

    it('returns empty array when no tasks exist', () => {
      expect(repo.findAll()).toEqual([]);
    });
  });

  describe('update', () => {
    it('updates the task title', () => {
      const task = repo.create({ title: 'Old title' });
      const updated = repo.update(task.id, { title: 'New title' });

      expect(updated.title).toBe('New title');
    });

    it('updates status to done and sets completed_at', () => {
      const task = repo.create({ title: 'Finish docs' });
      const updated = repo.update(task.id, { status: 'done' });

      expect(updated.status).toBe('done');
      expect(updated.completed_at).not.toBeNull();
    });

    it('updates priority', () => {
      const task = repo.create({ title: 'Low prio' });
      const updated = repo.update(task.id, { priority: 'high' });

      expect(updated.priority).toBe('high');
    });

    it('updates description to null (clears it)', () => {
      const task = repo.create({ title: 'Task', description: 'Some detail' });
      const updated = repo.update(task.id, { description: null });

      expect(updated.description).toBeNull();
    });

    it('sets updated_at on every update', () => {
      const task = repo.create({ title: 'Timestamped' });
      const updated = repo.update(task.id, { title: 'Changed' });

      expect(updated.updated_at).toBeTruthy();
    });

    it('throws NotFoundError for a non-existent task', () => {
      expect(() => repo.update(999, { title: 'Ghost' })).toThrowError(NotFoundError);
    });

    it('throws NotFoundError when updating a soft-deleted task', () => {
      const task = repo.create({ title: 'To delete' });
      repo.softDelete(task.id);

      expect(() => repo.update(task.id, { title: 'Too late' })).toThrowError(NotFoundError);
    });
  });

  describe('softDelete', () => {
    it('sets deleted_at on the task', () => {
      const task = repo.create({ title: 'Doomed' });
      repo.softDelete(task.id);

      const raw = db
        .prepare('SELECT deleted_at FROM tasks WHERE id = ?')
        .get(task.id) as { deleted_at: string | null };
      expect(raw.deleted_at).not.toBeNull();
    });

    it('makes the task invisible to findById and findAll', () => {
      const task = repo.create({ title: 'Invisible' });
      repo.softDelete(task.id);

      expect(repo.findById(task.id)).toBeUndefined();
      expect(repo.findAll()).toHaveLength(0);
    });

    it('throws NotFoundError for a non-existent task', () => {
      expect(() => repo.softDelete(999)).toThrowError(NotFoundError);
    });

    it('throws NotFoundError when deleting an already-deleted task', () => {
      const task = repo.create({ title: 'Already gone' });
      repo.softDelete(task.id);

      expect(() => repo.softDelete(task.id)).toThrowError(NotFoundError);
    });
  });
});
