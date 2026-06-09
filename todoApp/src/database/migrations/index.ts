import { databaseMetadataMigration } from "./0001-database-metadata.js";
import { tasksMigration } from "./0002-tasks.js";

export const baseMigrations = [databaseMetadataMigration, tasksMigration];
