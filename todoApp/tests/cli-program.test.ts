import { describe, expect, it } from "vitest";

import { createProgram } from "../src/cli/program.js";

describe("createProgram", () => {
  it("configura la CLI minima", () => {
    const program = createProgram();

    expect(program.name()).toBe("todo");
    expect(program.description()).toBe("CLI local para gestionar tareas y proyectos.");
  });
});
