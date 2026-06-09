import type { SqliteDatabase } from "./connection.js";

export const MIGRATIONS_TABLE = "__kaddo_migrations";

export interface Migration {
  id: string;
  up(database: SqliteDatabase): void;
}

export function ensureMigrationsTable(database: SqliteDatabase): void {
  database
    .prepare(
      `
      CREATE TABLE IF NOT EXISTS ${MIGRATIONS_TABLE} (
        id TEXT PRIMARY KEY,
        applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
      `
    )
    .run();
}

export function getAppliedMigrationIds(database: SqliteDatabase): string[] {
  ensureMigrationsTable(database);

  const rows = database
    .prepare(`SELECT id FROM ${MIGRATIONS_TABLE} ORDER BY id ASC`)
    .all() as Array<{ id: string }>;

  return rows.map((row) => row.id);
}

export function runMigrations(database: SqliteDatabase, migrations: Migration[]): string[] {
  ensureMigrationsTable(database);

  const applied = new Set(getAppliedMigrationIds(database));
  const apply = database.transaction((migration: Migration) => {
    if (applied.has(migration.id)) {
      return false;
    }

    migration.up(database);
    database.prepare(`INSERT INTO ${MIGRATIONS_TABLE} (id) VALUES (?)`).run(migration.id);
    applied.add(migration.id);
    return true;
  });

  return migrations.filter((migration) => apply(migration)).map((migration) => migration.id);
}
