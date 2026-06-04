---
type: roadmap
updated_at: 2026-06-04
---

# todoApp — Roadmap

> What we intend to build and why.

## Now

### Initiative 1 — Project Foundation

**Goal:** Establish a working TypeScript CLI project with the right structure before any feature work begins.

**Why now:** Every subsequent initiative depends on having a functional project skeleton, database connection, and migration system in place.

**Capabilities:** Local Persistence, CLI Interaction

**Scope:**
- Initialize Node.js + TypeScript project with pnpm
- Configure Vitest for testing
- Decide and configure CLI framework (Commander.js or CAC)
- Decide and configure database access layer (better-sqlite3 or Drizzle ORM)
- Create folder structure as defined in `codebase.md`
- Implement SQLite connection module
- Implement migration runner
- Create initial schema migration (tasks table + projects table)
- Configure `todo` binary entry point

**Knowledge level:** K1 (foundation — must be stable before feature work)

**Risk:** Low — well-understood tooling, no business logic.

**Candidate work items:**
- `WI-001` — Initialize TypeScript CLI project
- `WI-002` — Configure SQLite connection and migration runner
- `WI-003` — Create initial schema migration (tasks + projects)

---

### Initiative 2 — Task Management

**Goal:** Allow users to create, view, update, complete, and soft-delete tasks from the CLI.

**Why now:** Core value of the app. All other features depend on tasks existing.

**Capabilities:** Task Management, Task Status Management, Basic Task Filtering

**Scope:**
- Task model with all MVP fields (`title`, `description`, `status`, `priority`, `project_id`, `deleted_at`, `created_at`, `updated_at`, `completed_at`)
- Task repository (CRUD + soft delete + filters)
- Task service (business logic)
- CLI commands:
  - `todo task add <title>` — create task
  - `todo task list` — list tasks (excludes completed and deleted by default)
  - `todo task list --all` — include completed tasks
  - `todo task list --status <status>` — filter by status
  - `todo task show <id>` — view task details
  - `todo task update <id>` — update title, description, status, priority
  - `todo task done <id>` — mark task as done
  - `todo task delete <id>` — soft delete task

**Filtering behavior:**
- Default `task list` excludes `status = done` and `deleted_at IS NOT NULL`
- `--all` includes completed tasks; deleted tasks are always excluded
- `--status done` shows only completed tasks

**Knowledge level:** K2 (core domain — needs unit tests on service layer)

**Risk:** Medium — soft delete and filter logic must be consistent across all queries.

**Dependencies:** Initiative 1 complete.

**Candidate work items:**
- `WI-004` — Task model and repository
- `WI-005` — Task service (create, update, soft delete, status transitions)
- `WI-006` — CLI task commands (add, list, show, update, done, delete)

---

## Next

### Initiative 3 — Project Management

**Goal:** Allow users to create projects and assign tasks to them, with filtering support.

**Why now:** Projects are part of the MVP scope and build directly on top of the task foundation.

**Capabilities:** Project Management, Basic Task Filtering

**Scope:**
- Project model (`id`, `name`, `description`, `created_at`, `updated_at`)
- Project repository (CRUD)
- Project service
- CLI commands:
  - `todo project add <name>` — create project
  - `todo project list` — list projects
  - `todo project show <id>` — view project with its tasks
- Extend `todo task add` to support `--project <id>`
- Extend `todo task list` to support `--project <id>` filter
- Extend `todo task update` to support changing `project_id`

**Knowledge level:** K2

**Risk:** Low — same patterns as task management; no new architectural decisions.

**Dependencies:** Initiative 2 complete.

**Candidate work items:**
- `WI-007` — Project model and repository
- `WI-008` — Project service and CLI commands
- `WI-009` — Extend task commands with project support

---

## Later

### Initiative 4 — Quality and Developer Experience

**Goal:** Polish the CLI output and improve reliability for users and contributors.

**Why later:** Not blocking for validation. Can be prioritized once core features are stable.

**Capabilities:** Basic Reporting, CLI Interaction

**Scope:**
- Formatted table output for `task list` and `project list`
- Friendly error messages for invalid IDs, missing titles, unknown commands
- Integration tests covering CLI command flows end-to-end
- `README.md` with install and usage instructions

**Knowledge level:** K1

**Risk:** Low — no model or schema changes.

**Dependencies:** Initiatives 1–3 complete.

**Candidate work items:**
- `WI-010` — Table-formatted CLI output
- `WI-011` — Error handling and user-facing messages
- `WI-012` — CLI integration tests
- `WI-013` — README with install and usage guide

---

## Not Now

The following are explicitly deferred and should not be considered for the current cycle:

- JSON output (`--json` flag)
- Task tags
- Task due dates
- Task priority filtering
- Archive vs delete distinction (soft delete is the decision for v1)
- Authentication, teams, roles, workspaces
- Web interface or API
- Cloud deployment
