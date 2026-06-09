import Database, { type Database as SqliteDatabase } from "better-sqlite3";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

import { resolveDatabasePath, type DatabaseConfig } from "./config.js";

export type { SqliteDatabase };

export interface OpenDatabaseOptions extends DatabaseConfig {
  fileMustExist?: boolean;
  readonly?: boolean;
}

export function openDatabase(options: OpenDatabaseOptions = {}): SqliteDatabase {
  const databasePath = resolveDatabasePath(options);

  if (databasePath !== ":memory:") {
    mkdirSync(dirname(databasePath), { recursive: true });
  }

  const database = new Database(databasePath, {
    fileMustExist: options.fileMustExist ?? false,
    readonly: options.readonly ?? false
  });

  database.pragma("foreign_keys = ON");

  return database;
}
