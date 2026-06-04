import { describe, it, expect, beforeEach } from 'vitest';
import Database from 'better-sqlite3';
import { runMigrations } from './runner';
import { migrations } from './index';

type ColumnInfo = { cid: number; name: string; type: string; notnull: number; dflt_value: string | null; pk: number };

function inMemoryDb(): Database.Database {
  const db = new Database(':memory:');
  db.pragma('foreign_keys = ON');
  return db;
}

function getColumns(db: Database.Database, table: string): ColumnInfo[] {
  return db.prepare(`PRAGMA table_info(${table})`).all() as ColumnInfo[];
}

function columnNames(db: Database.Database, table: string): string[] {
  return getColumns(db, table).map(c => c.name);
}

function tableExists(db: Database.Database, name: string): boolean {
  const row = db
    .prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name=?`)
    .get(name) as { name: string } | undefined;
  return row !== undefined;
}

describe('001_init migration', () => {
  let db: Database.Database;

  beforeEach(() => {
    db = inMemoryDb();
    runMigrations(db, migrations);
  });

  describe('table existence', () => {
    it('creates the projects table', () => {
      expect(tableExists(db, 'projects')).toBe(true);
    });

    it('creates the tasks table', () => {
      expect(tableExists(db, 'tasks')).toBe(true);
    });
  });

  describe('projects schema', () => {
    it('has all required columns', () => {
      const cols = columnNames(db, 'projects');
      expect(cols).toContain('id');
      expect(cols).toContain('name');
      expect(cols).toContain('description');
      expect(cols).toContain('created_at');
      expect(cols).toContain('updated_at');
    });

    it('name is NOT NULL', () => {
      expect(() =>
        db.prepare('INSERT INTO projects (name) VALUES (NULL)').run()
      ).toThrow();
    });

    it('description allows NULL', () => {
      expect(() =>
        db.prepare("INSERT INTO projects (name, description) VALUES ('p', NULL)").run()
      ).not.toThrow();
    });
  });

  describe('tasks schema', () => {
    it('has all required columns', () => {
      const cols = columnNames(db, 'tasks');
      expect(cols).toContain('id');
      expect(cols).toContain('title');
      expect(cols).toContain('description');
      expect(cols).toContain('status');
      expect(cols).toContain('priority');
      expect(cols).toContain('project_id');
      expect(cols).toContain('deleted_at');
      expect(cols).toContain('created_at');
      expect(cols).toContain('updated_at');
      expect(cols).toContain('completed_at');
    });

    it('status defaults to todo', () => {
      db.prepare("INSERT INTO tasks (title) VALUES ('t')").run();
      const row = db.prepare('SELECT status FROM tasks WHERE id = 1').get() as { status: string };
      expect(row.status).toBe('todo');
    });

    it('priority defaults to medium', () => {
      db.prepare("INSERT INTO tasks (title) VALUES ('t')").run();
      const row = db.prepare('SELECT priority FROM tasks WHERE id = 1').get() as { priority: string };
      expect(row.priority).toBe('medium');
    });

    it('deleted_at defaults to NULL', () => {
      db.prepare("INSERT INTO tasks (title) VALUES ('t')").run();
      const row = db.prepare('SELECT deleted_at FROM tasks WHERE id = 1').get() as { deleted_at: string | null };
      expect(row.deleted_at).toBeNull();
    });

    it('title is NOT NULL', () => {
      expect(() =>
        db.prepare('INSERT INTO tasks (title) VALUES (NULL)').run()
      ).toThrow();
    });

    it('project_id allows NULL (projects are optional)', () => {
      expect(() =>
        db.prepare("INSERT INTO tasks (title, project_id) VALUES ('t', NULL)").run()
      ).not.toThrow();
    });
  });

  describe('foreign key: tasks.project_id → projects.id', () => {
    it('rejects a task referencing a non-existent project', () => {
      expect(() =>
        db.prepare("INSERT INTO tasks (title, project_id) VALUES ('t', 999)").run()
      ).toThrow();
    });

    it('accepts a task referencing an existing project', () => {
      db.prepare("INSERT INTO projects (name) VALUES ('p')").run();
      expect(() =>
        db.prepare("INSERT INTO tasks (title, project_id) VALUES ('t', 1)").run()
      ).not.toThrow();
    });

    it('sets project_id to NULL when the referenced project is deleted (ON DELETE SET NULL)', () => {
      db.prepare("INSERT INTO projects (name) VALUES ('p')").run();
      db.prepare("INSERT INTO tasks (title, project_id) VALUES ('t', 1)").run();

      db.prepare('DELETE FROM projects WHERE id = 1').run();

      const row = db.prepare('SELECT project_id FROM tasks WHERE id = 1').get() as { project_id: number | null };
      expect(row.project_id).toBeNull();
    });
  });

  describe('idempotency', () => {
    it('running migrations again does not throw', () => {
      expect(() => runMigrations(db, migrations)).not.toThrow();
    });
  });
});
