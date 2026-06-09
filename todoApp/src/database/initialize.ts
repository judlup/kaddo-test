import { openDatabase, type OpenDatabaseOptions, type SqliteDatabase } from "./connection.js";
import { runMigrations } from "./migration-runner.js";
import { baseMigrations } from "./migrations/index.js";

export interface InitializedDatabase {
  database: SqliteDatabase;
  appliedMigrations: string[];
}

export function initializeDatabase(options: OpenDatabaseOptions = {}): InitializedDatabase {
  const database = openDatabase(options);
  const appliedMigrations = runMigrations(database, baseMigrations);

  return {
    database,
    appliedMigrations
  };
}
