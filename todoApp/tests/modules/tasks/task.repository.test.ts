import { describe, expect, it } from "vitest";

import { initializeDatabase } from "../../../src/database/index.js";
import { TaskRepository } from "../../../src/modules/tasks/index.js";

describe("TaskRepository", () => {
  it("crea una tarea con valores minimos y defaults", () => {
    const { database } = initializeDatabase({ path: ":memory:" });
    const repository = new TaskRepository(database);

    const task = repository.create({ title: "Write task model" });

    expect(task.id).toBeGreaterThan(0);
    expect(task.title).toBe("Write task model");
    expect(task.description).toBeNull();
    expect(task.status).toBe("todo");
    expect(task.priority).toBe("medium");
    expect(task.projectId).toBeNull();
    expect(task.completedAt).toBeNull();
    expect(task.deletedAt).toBeNull();
    expect(Date.parse(task.createdAt)).not.toBeNaN();
    expect(Date.parse(task.updatedAt)).not.toBeNaN();

    database.close();
  });

  it("obtiene una tarea por id", () => {
    const { database } = initializeDatabase({ path: ":memory:" });
    const repository = new TaskRepository(database);
    const created = repository.create({ title: "Read task" });

    const found = repository.getById(created.id);

    expect(found).toEqual(created);

    database.close();
  });

  it("actualiza campos persistibles de una tarea", () => {
    const { database } = initializeDatabase({ path: ":memory:" });
    const repository = new TaskRepository(database);
    const created = repository.create({ title: "Original" });
    const completedAt = new Date().toISOString();

    const updated = repository.update(created.id, {
      title: "Updated",
      description: "Now with details",
      status: "done",
      priority: "high",
      projectId: 12,
      completedAt
    });

    expect(updated).toMatchObject({
      id: created.id,
      title: "Updated",
      description: "Now with details",
      status: "done",
      priority: "high",
      projectId: 12,
      completedAt,
      deletedAt: null
    });
    expect(updated?.updatedAt).not.toBe(created.updatedAt);

    database.close();
  });

  it("rechaza status y priority invalidos desde restricciones SQLite", () => {
    const { database } = initializeDatabase({ path: ":memory:" });

    expect(() =>
      database
        .prepare(
          `
          INSERT INTO tasks (title, status, priority, created_at, updated_at)
          VALUES ('Invalid', 'blocked', 'medium', '2026-06-09T00:00:00.000Z', '2026-06-09T00:00:00.000Z')
          `
        )
        .run()
    ).toThrow();

    expect(() =>
      database
        .prepare(
          `
          INSERT INTO tasks (title, status, priority, created_at, updated_at)
          VALUES ('Invalid', 'todo', 'urgent', '2026-06-09T00:00:00.000Z', '2026-06-09T00:00:00.000Z')
          `
        )
        .run()
    ).toThrow();

    database.close();
  });
});
