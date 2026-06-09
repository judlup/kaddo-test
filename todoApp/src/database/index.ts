export { DEFAULT_DATABASE_PATH, resolveDatabasePath, type DatabaseConfig } from "./config.js";
export { openDatabase, type OpenDatabaseOptions, type SqliteDatabase } from "./connection.js";
export { initializeDatabase, type InitializedDatabase } from "./initialize.js";
export {
  ensureMigrationsTable,
  getAppliedMigrationIds,
  MIGRATIONS_TABLE,
  runMigrations,
  type Migration
} from "./migration-runner.js";
