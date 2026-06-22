import type { Migration } from "../migration-runner.js";

export const tasksMigration: Migration = {
  id: "0002_tasks",
  up(database) {
    database
      .prepare(
        `
        CREATE TABLE IF NOT EXISTS tasks (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL CHECK (length(trim(title)) > 0),
          description TEXT,
          status TEXT NOT NULL DEFAULT 'todo' CHECK (status IN ('todo', 'in-progress', 'done')),
          priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
          project_id INTEGER,
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL,
          completed_at TEXT,
          deleted_at TEXT
        )
        `
      )
      .run();
  }
};
