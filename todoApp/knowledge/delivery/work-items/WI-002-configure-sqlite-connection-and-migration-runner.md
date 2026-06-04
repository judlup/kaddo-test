---
id: WI-002
title: Configure SQLite connection and migration runner
initiative: Initiative 1 — Project Foundation
status: ready
knowledge_level: K1
created_at: 2026-06-04
---

# WI-002 — Configure SQLite connection and migration runner

**Problem:**

Without a database connection module and a migration runner, no feature module can persist data, and schema changes cannot be applied in a controlled, reproducible way.

**Expected result:**

A `database` module that opens a SQLite connection and applies pending migrations automatically on startup, so feature modules can import a ready-to-use `db` instance.

**Suggested Knowledge Level:** K1

> Justification: This is infrastructure plumbing. No business rules are involved. The stack choice (SQLite, better-sqlite3 or Drizzle ORM) is defined in `codebase.md`.

**Acceptance criteria:**

- `src/database/connection.ts` exports a function that returns an open SQLite connection (or a singleton).
- `src/database/migrations/` holds migration files, each with a sequential numeric prefix (e.g. `001_init.sql`).
- The migration runner reads files from `src/database/migrations/`, tracks applied migrations (e.g. in a `_migrations` table), and applies only pending ones.
- Running the migration runner twice does not apply the same migration twice.
- The database file is written to `data/app.sqlite` (path configurable via `.env`).
- A unit test verifies that the migration runner applies migrations in order and skips already-applied ones.

**Definition of Done:**

- [ ] DB access library installed and configured (better-sqlite3 or Drizzle ORM — must be decided before this WI starts).
- [ ] `src/database/connection.ts` implemented and exports a usable `db` instance.
- [ ] Migration runner implemented in `src/database/migrations/runner.ts` (or equivalent).
- [ ] `_migrations` tracking table created by the runner if it does not exist.
- [ ] `data/` directory added to `.gitignore`; `data/.gitkeep` committed so the directory exists.
- [ ] Unit test for the migration runner passes in Vitest.

**Open questions:**

- DB access library: `better-sqlite3` (synchronous, minimal) or `Drizzle ORM` (more structure, type-safe queries)? Recommendation: `better-sqlite3` for an example project — fewer abstractions, easier to follow. Drizzle can be added later.
- Should the database path be hardcoded as `data/app.sqlite` or always read from `process.env.DB_PATH`? Recommendation: default to `data/app.sqlite` with an env override.
- Should migrations be raw `.sql` files or TypeScript files? Recommendation: raw `.sql` — simpler, portable, readable without running the app.

**Assumptions:**

- SQLite is the only persistence layer for v1. No other database will be added.
- The migration runner is triggered automatically when the CLI starts (not a separate command).
- `better-sqlite3` is chosen unless the team decides on Drizzle before this WI begins.

**Suggested ownership (code globs):**

```
src/database/connection.ts
src/database/migrations/
src/database/migrations/runner.ts
.env.example
```
