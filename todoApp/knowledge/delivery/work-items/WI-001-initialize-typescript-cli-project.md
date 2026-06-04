---
id: WI-001
title: Initialize TypeScript CLI project
initiative: Initiative 1 — Project Foundation
status: ready
knowledge_level: K1
created_at: 2026-06-04T00:00:00.000Z
code:
  - srcs/cli/**
---

# WI-001 — Initialize TypeScript CLI project

**Problem:**

The project has no working Node.js/TypeScript setup, so no feature development can begin until a functional skeleton with build, test, and CLI entry point exists.

**Expected result:**

A minimal but complete project scaffold: TypeScript compiles, the test runner works, and the `todo` binary is callable from the terminal.

**Suggested Knowledge Level:** K1

> Justification: This is pure infrastructure configuration. No business logic, no domain decisions. All choices (pnpm, Vitest, TypeScript) are already defined in `codebase.md`.

**Acceptance criteria:**

- `pnpm install` completes without errors.
- `pnpm build` compiles TypeScript to `dist/` without errors.
- `pnpm test` runs Vitest and reports 0 failures (with at least one placeholder test).
- `todo --version` or `todo --help` is callable from the terminal after build.
- Folder structure matches the layout defined in `knowledge/tech/codebase.md`.
- `tsconfig.json` targets the Node.js version in use and enables strict mode.

**Definition of Done:**

- [ ] `package.json` configured with `name`, `version`, `bin`, `scripts` (build, test, dev).
- [ ] `tsconfig.json` created with strict mode and correct paths.
- [ ] CLI framework installed and wired to the `todo` binary entry point (empty command registered).
- [ ] Vitest configured and a placeholder test passes.
- [ ] Folder structure (`src/cli/`, `src/modules/`, `src/database/`, `src/shared/`) exists.
- [ ] `.gitignore` covers `node_modules/`, `dist/`, `data/`.
- [ ] `.env.example` created (even if empty for now).

**Open questions:**

- CLI framework: Commander.js or CAC? Both are valid — this decision should be made before this work item starts. Recommendation: Commander.js (more widely known, better docs for an example project).
- Should `pnpm` scripts include a `dev` script with `ts-node` or `tsx` for development without build step?

**Assumptions:**

- Node.js is already installed in the development environment.
- pnpm is available globally.
- The `todo` binary name is final for v1.

**Suggested ownership (code globs):**

```
package.json
tsconfig.json
.gitignore
.env.example
src/cli/index.ts
src/cli/commands/
```
