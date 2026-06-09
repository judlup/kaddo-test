import { describe, expect, it } from "vitest";

import { getAppliedMigrationIds, initializeDatabase, runMigrations } from "../../src/database/index.js";
import { baseMigrations } from "../../src/database/migrations/index.js";

describe("tasks migration", () => {
  it("crea la tabla tasks sin crear projects", () => {
    const { database } = initializeDatabase({ path: ":memory:" });

    const tasksTable = database
      .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'tasks'")
      .get() as { name: string } | undefined;
    const projectsTable = database
      .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'projects'")
      .get() as { name: string } | undefined;

    expect(tasksTable?.name).toBe("tasks");
    expect(projectsTable).toBeUndefined();

    database.close();
  });

  it("mantiene las migraciones idempotentes", () => {
    const { database } = initializeDatabase({ path: ":memory:" });

    expect(runMigrations(database, baseMigrations)).toEqual([]);
    expect(getAppliedMigrationIds(database)).toEqual(["0001_database_metadata", "0002_tasks"]);

    database.close();
  });
});
