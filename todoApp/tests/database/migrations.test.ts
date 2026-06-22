import { describe, expect, it } from "vitest";

import {
  getAppliedMigrationIds,
  initializeDatabase,
  runMigrations
} from "../../src/database/index.js";
import { baseMigrations } from "../../src/database/migrations/index.js";

describe("database migrations", () => {
  it("aplica la migracion tecnica base", () => {
    const { database, appliedMigrations } = initializeDatabase({ path: ":memory:" });

    expect(appliedMigrations).toEqual(["0001_database_metadata", "0002_tasks"]);
    expect(getAppliedMigrationIds(database)).toEqual(["0001_database_metadata", "0002_tasks"]);

    database.close();
  });

  it("ejecuta migraciones de forma idempotente", () => {
    const { database } = initializeDatabase({ path: ":memory:" });

    const secondRun = runMigrations(database, baseMigrations);

    expect(secondRun).toEqual([]);
    expect(getAppliedMigrationIds(database)).toEqual(["0001_database_metadata", "0002_tasks"]);

    database.close();
  });
});
