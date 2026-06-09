import { ensureMigrationsTable, type Migration } from "../migration-runner.js";

export const databaseMetadataMigration: Migration = {
  id: "0001_database_metadata",
  up(database) {
    ensureMigrationsTable(database);
  }
};
