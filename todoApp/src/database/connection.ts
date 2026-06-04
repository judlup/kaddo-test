import Database from 'better-sqlite3';
import path from 'path';
import { runMigrations } from './migrations/runner';

const DB_PATH = process.env.DB_PATH ?? path.join(process.cwd(), 'data', 'app.sqlite');

let instance: Database.Database | null = null;

export function getDatabase(): Database.Database {
  if (!instance) {
    instance = new Database(DB_PATH);
    instance.pragma('journal_mode = WAL');
    instance.pragma('foreign_keys = ON');
    runMigrations(instance);
  }
  return instance;
}

export function closeDatabase(): void {
  if (instance) {
    instance.close();
    instance = null;
  }
}
