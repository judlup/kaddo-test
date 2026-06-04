---
id: WI-003
title: Create initial schema migration (tasks + projects)
initiative: Initiative 1 — Project Foundation
status: done
knowledge_level: K1
created_at: 2026-06-04
---

# WI-003 — Create initial schema migration (tasks + projects)

**Problem:**

The `tasks` and `projects` tables do not exist in the database yet, so no domain module can read or write data until the schema is applied.

**Expected result:**

A migration file that creates the `tasks` and `projects` tables with all MVP fields as defined in `knowledge/tech/codebase.md`, applied automatically by the migration runner on startup.

**Suggested Knowledge Level:** K1

> Justification: The schema is fully specified in `codebase.md`. This work item translates that spec into SQL — no design decisions remain open.

**Acceptance criteria:**

- Migration file `001_init.sql` (or equivalent) creates the `projects` table.
- Migration file creates the `tasks` table with all required columns (see schema below).
- All NOT NULL constraints, DEFAULT values, and foreign key relationships are correctly expressed.
- `tasks.project_id` allows NULL (projects are optional).
- `tasks.deleted_at` defaults to NULL (soft delete).
- `tasks.status` defaults to `'todo'`.
- `tasks.priority` defaults to `'medium'`.
- The migration runner applies this file on a fresh database startup.
- A test that initializes the DB on a fresh in-memory SQLite instance verifies that both tables exist after migration.

**Definition of Done:**

- [x] `001_init.ts` created in `src/database/migrations/` (TypeScript migration file — see current-state.md deviation #2).
- [x] `projects` table schema:
  - `id` INTEGER PRIMARY KEY AUTOINCREMENT
  - `name` TEXT NOT NULL
  - `description` TEXT
  - `created_at` TEXT NOT NULL DEFAULT (datetime('now'))
  - `updated_at` TEXT NOT NULL DEFAULT (datetime('now'))
- [x] `tasks` table schema:
  - `id` INTEGER PRIMARY KEY AUTOINCREMENT
  - `title` TEXT NOT NULL
  - `description` TEXT
  - `status` TEXT NOT NULL DEFAULT 'todo'
  - `priority` TEXT NOT NULL DEFAULT 'medium'
  - `project_id` INTEGER REFERENCES projects(id) ON DELETE SET NULL
  - `deleted_at` TEXT DEFAULT NULL
  - `created_at` TEXT NOT NULL DEFAULT (datetime('now'))
  - `updated_at` TEXT NOT NULL DEFAULT (datetime('now'))
  - `completed_at` TEXT DEFAULT NULL
- [x] Integration test confirms both tables exist after running migrations on a fresh in-memory DB. (15 tests passing in `schema.test.ts`)

**Open questions:**

- Should `PRAGMA foreign_keys = ON` be enforced at the connection level? Recommendation: yes — add it to `connection.ts` so foreign key constraints are always active in SQLite.
- Should `updated_at` be updated via a SQLite trigger or manually in the repository layer? Recommendation: manually in the repository — keeps behavior explicit and avoids hidden trigger magic.

**Assumptions:**

- Timestamps are stored as ISO 8601 text in SQLite (SQLite has no native datetime type).
- `deleted_at IS NULL` is the canonical condition for "not deleted" across all queries. This must be enforced in the repository layer, not the migration.
- The schema will not change between WI-003 and the first feature work item. If it does, a new migration file must be created (not by editing `001_init.sql`).

**Dependencies:**

- WI-002 must be complete (migration runner must exist before this migration can run).

**Suggested ownership (code globs):**

```
src/database/migrations/001_init.sql
src/database/connection.ts
```
