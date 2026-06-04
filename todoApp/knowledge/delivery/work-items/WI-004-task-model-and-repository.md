---
id: WI-004
title: Task model and repository
initiative: Initiative 2 — Task Management
status: done
knowledge_level: K1
created_at: 2026-06-04
---

# WI-004 — Task model and repository

**Problem:**

No domain layer exists for tasks. Commands and services have nowhere to define the Task entity or read/write task data from SQLite.

**Expected result:**

A `Task` TypeScript interface reflecting the DB schema, plus a `TaskRepository` class that wraps all raw SQL access for tasks — always filtering `deleted_at IS NULL` by default.

**Suggested Knowledge Level:** K1

> Justification: The schema is fully defined in `001_init.ts`. This work item translates it into a typed domain layer with no open design decisions.

**Acceptance criteria:**

- `Task` interface matches all columns in the `tasks` table.
- `CreateTaskInput` and `UpdateTaskInput` interfaces exist.
- `TaskRepository.create()` inserts a task and returns the full row.
- `TaskRepository.findById()` returns the task or `undefined`; never returns soft-deleted rows.
- `TaskRepository.findAll()` filters by `deleted_at IS NULL`; accepts optional `status` and `projectId` filters.
- `TaskRepository.update()` updates provided fields, always sets `updated_at`; sets `completed_at` when `status = 'done'`; throws `NotFoundError` for missing/deleted tasks.
- `TaskRepository.softDelete()` sets `deleted_at`; throws `NotFoundError` if task not found or already deleted.
- 20 tests pass.

**Definition of Done:**

- [x] `src/modules/tasks/task.model.ts` — `Task`, `CreateTaskInput`, `UpdateTaskInput`, `FindTasksOptions`.
- [x] `src/modules/tasks/task.repository.ts` — `TaskRepository` class with `findAll`, `findById`, `create`, `update`, `softDelete`.
- [x] `src/modules/tasks/task.repository.test.ts` — 20 tests (create, findById, findAll, update, softDelete).
- [x] 46/46 tests passing total.

**Assumptions:**

- Repository receives `Database.Database` via constructor (no singleton dependency — testable with `:memory:` DB).
- `updated_at` is set manually in the repository using `datetime('now')` in SQL — no triggers.
- `completed_at` is set automatically by the repository when `status` transitions to `'done'`.
- "Hide completed by default" is a service/CLI concern, not a repository concern.

**Dependencies:**

- WI-003 must be complete (schema must exist before repository can run queries).

**Suggested ownership (code globs):**

```
src/modules/tasks/task.model.ts
src/modules/tasks/task.repository.ts
src/modules/tasks/task.repository.test.ts
```
