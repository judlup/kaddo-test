import type { Migration } from './index';

export const migration: Migration = {
  name: '001_init',
  sql: `
    CREATE TABLE IF NOT EXISTS projects (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      name        TEXT    NOT NULL,
      description TEXT,
      created_at  TEXT    NOT NULL DEFAULT (datetime('now')),
      updated_at  TEXT    NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS tasks (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      title        TEXT    NOT NULL,
      description  TEXT,
      status       TEXT    NOT NULL DEFAULT 'todo',
      priority     TEXT    NOT NULL DEFAULT 'medium',
      project_id   INTEGER REFERENCES projects(id) ON DELETE SET NULL,
      deleted_at   TEXT    DEFAULT NULL,
      created_at   TEXT    NOT NULL DEFAULT (datetime('now')),
      updated_at   TEXT    NOT NULL DEFAULT (datetime('now')),
      completed_at TEXT    DEFAULT NULL
    );
  `,
};
