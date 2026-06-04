import type Database from 'better-sqlite3';
import { migrations as defaultMigrations, type Migration } from './index';

export function runMigrations(
  db: Database.Database,
  migrations: Migration[] = defaultMigrations
): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS _migrations (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      name       TEXT NOT NULL UNIQUE,
      applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  const applied = new Set<string>(
    (db.prepare('SELECT name FROM _migrations').all() as { name: string }[]).map(r => r.name)
  );

  for (const migration of migrations) {
    if (applied.has(migration.name)) continue;
    db.exec(migration.sql);
    db.prepare('INSERT INTO _migrations (name) VALUES (?)').run(migration.name);
  }
}
