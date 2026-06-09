import { describe, expect, it } from "vitest";

import { openDatabase } from "../../src/database/index.js";

describe("openDatabase", () => {
  it("abre y cierra una conexion SQLite en memoria", () => {
    const database = openDatabase({ path: ":memory:" });

    const row = database.prepare("SELECT 1 AS value").get() as { value: number };

    expect(row.value).toBe(1);

    database.close();
    expect(database.open).toBe(false);
  });

  it("activa foreign keys por defecto", () => {
    const database = openDatabase({ path: ":memory:" });

    const row = database.prepare("PRAGMA foreign_keys").get() as { foreign_keys: number };

    expect(row.foreign_keys).toBe(1);

    database.close();
  });
});
