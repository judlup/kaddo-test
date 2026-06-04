---
type: capabilities
status: active
updated_at: 2026-06-04
sources:
  - knowledge/business/business.md
  - knowledge/product/product.md
  - knowledge/tech/codebase.md
  - knowledge/delivery/roadmap.md
  - knowledge/delivery/work-items/
---

# todoApp — Capabilities

> What the system can do, grounded in business intent, scoped by product decisions, and traceable to delivery.

## Summary

| # | Capability | Initiative | Status |
|---|------------|------------|--------|
| 1 | [CLI Interaction](#1-cli-interaction) | 1 + 4 | Partial (foundation done, polish deferred) |
| 2 | [Task Management](#2-task-management) | 2 | Planned |
| 3 | [Task Status Management](#3-task-status-management) | 2 | Planned |
| 4 | [Project Management](#4-project-management) | 3 | Planned |
| 5 | [Local Persistence](#5-local-persistence) | 1 | Partial (runner done, schema pending WI-003) |
| 6 | [Basic Task Filtering](#6-basic-task-filtering) | 2 + 3 | Planned |
| 7 | [Basic Reporting](#7-basic-reporting) | 4 | Planned |

---

## 1. CLI Interaction

**What it is:**
The entry point for all user interactions. Users operate the app exclusively through terminal commands — no web interface, no API.

**User goal:**
A Developer or Kaddo Evaluator can install and run the app locally from the terminal without any setup beyond `pnpm install`.

**Behavior:**
- The `todo` binary is registered in `package.json` and callable after build.
- Commands follow the pattern `todo <resource> <action> [args] [flags]`.
- `todo --help` and `todo --version` work at the root and on every subcommand.
- Unknown commands produce a clear error message.
- All output is plain text or a formatted table (JSON output is out of scope for MVP).

**Business rules enforced:**
- The app works locally without external services.
- The first version is CLI-only.

**CLI surface:**
```
todo --help
todo --version
todo task <action>
todo project <action>
```

**Modules involved:** `src/cli/`

**Delivering work items:**
- `WI-001` — Initialize TypeScript CLI project *(foundation — done)*
- `WI-010` — Table-formatted CLI output *(polish — Initiative 4)*
- `WI-011` — Error handling and user-facing messages *(polish — Initiative 4)*

**Out of scope for MVP:** JSON output (`--json`), shell completion, interactive mode.

---

## 2. Task Management

**What it is:**
The core capability of the product. Allows users to create, view, update, complete, and soft-delete tasks from the terminal.

**User goal:**
A Developer can manage their tasks end-to-end from the terminal without leaving the CLI.

**Behavior:**
- Create a task with a required title; description, priority, and project are optional.
- List tasks (completed and deleted tasks excluded by default).
- View full details of a single task by ID.
- Update any mutable field: title, description, status, priority, or project assignment.
- Mark a task as done (sets `status = done` and `completed_at`).
- Soft-delete a task (sets `deleted_at`; task is hidden from all normal listings).

**Business rules enforced:**
- A task must have a title.
- A task must have a status (`todo`, `in-progress`, `done`).
- A task must have a priority (`low`, `medium`, `high`; default `medium`).
- A task may belong to a project (optional; `project_id` nullable).
- Deleted tasks are not permanently removed — `deleted_at` is set.

**CLI commands:**
```
todo task add "<title>" [--description <desc>] [--priority <p>] [--project <id>]
todo task list [--all] [--status <status>] [--project <id>]
todo task show <id>
todo task update <id> [--title <t>] [--description <d>] [--status <s>] [--priority <p>] [--project <id>]
todo task done <id>
todo task delete <id>
```

**Modules involved:** `src/modules/tasks/`, `src/cli/commands/task.commands.ts`

**Delivering work items:**
- `WI-004` — Task model and repository *(Initiative 2)*
- `WI-005` — Task service: create, update, soft delete, status transitions *(Initiative 2)*
- `WI-006` — CLI task commands *(Initiative 2)*

**Out of scope for MVP:** Tags, due dates, attachments, comments, task dependencies.

---

## 3. Task Status Management

**What it is:**
Controls the lifecycle of a task as it moves through the workflow: `todo → in-progress → done`.

**User goal:**
A Developer can track the progress of their work without leaving the terminal, and retrieve historical context from completed tasks when needed.

**Behavior:**
- A task starts with `status = todo` by default.
- Status can be updated to any valid value via `task update --status`.
- `task done <id>` is a shortcut that sets `status = done` and records `completed_at`.
- Completed tasks are hidden from `task list` by default.
- `task list --all` includes completed tasks alongside active ones.
- `task list --status done` shows only completed tasks.

**Business rules enforced:**
- Valid statuses are `todo`, `in-progress`, `done` only.
- Completed tasks remain stored for historical reference (not deleted on completion).
- Completed tasks are hidden from default listings.

**CLI commands:**
```
todo task done <id>
todo task update <id> --status <status>
todo task list --status done
todo task list --all
```

**Modules involved:** `src/modules/tasks/task.service.ts`

**Delivering work items:**
- `WI-005` — Task service: status transitions *(part of Initiative 2)*
- `WI-006` — CLI task commands with `--status` and `--all` flags *(Initiative 2)*

**Out of scope for MVP:** Custom status values, status transition rules (e.g., blocking `done → todo`), status history/audit log.

---

## 4. Project Management

**What it is:**
Allows users to group related tasks under a named project. Projects are optional — tasks can exist without one.

**User goal:**
A Developer can organise related tasks under a named project and view all tasks for a given project in one command.

**Behavior:**
- Create a project with a required name and optional description.
- List all projects.
- View a single project and the tasks assigned to it.
- Assign a task to a project at creation or via `task update --project <id>`.
- Remove a task from a project by setting `project_id` to null via `task update --project none`.
- When a project is shown, its tasks are listed (excluding completed and deleted by default).

**Business rules enforced:**
- A project can contain multiple tasks.
- `project_id` on a task is nullable — projects are optional.
- Tasks whose project is deleted retain their data (`ON DELETE SET NULL` on the foreign key).

**CLI commands:**
```
todo project add "<name>" [--description <desc>]
todo project list
todo project show <id>
todo task add "<title>" --project <id>
todo task update <id> --project <id>
todo task list --project <id>
```

**Modules involved:** `src/modules/projects/`, `src/cli/commands/project.commands.ts`

**Delivering work items:**
- `WI-007` — Project model and repository *(Initiative 3)*
- `WI-008` — Project service and CLI commands *(Initiative 3)*
- `WI-009` — Extend task commands with project support *(Initiative 3)*

**Out of scope for MVP:** Project archiving, project-level status, sub-projects, project templates.

---

## 5. Local Persistence

**What it is:**
All data is stored in a local SQLite file. No external services, no cloud, no network required.

**User goal:**
A Developer can close the terminal and reopen it later with all their tasks and projects intact.

**Behavior:**
- On first run, the database file is created at `data/app.sqlite` (configurable via `DB_PATH` env var).
- Schema migrations are applied automatically on startup via the migration runner.
- All migrations are tracked in a `_migrations` table — each migration is applied exactly once.
- `PRAGMA foreign_keys = ON` is enforced at the connection level.
- `PRAGMA journal_mode = WAL` is enabled for concurrent read performance.

**Business rules enforced:**
- The app works locally without external services.
- Soft-deleted tasks persist in the database (data is not permanently lost).
- Completed tasks remain stored for historical reference.

**Schema (v1):**
- `projects` — `id`, `name`, `description`, `created_at`, `updated_at`
- `tasks` — `id`, `title`, `description`, `status`, `priority`, `project_id`, `deleted_at`, `created_at`, `updated_at`, `completed_at`
- `_migrations` — internal tracking table

**Modules involved:** `src/database/`

**Delivering work items:**
- `WI-002` — SQLite connection and migration runner *(done)*
- `WI-003` — Initial schema migration: tasks + projects *(Initiative 1, pending)*

**Out of scope for MVP:** Multiple databases, remote sync, export/import, backup.

---

## 6. Basic Task Filtering

**What it is:**
Allows users to narrow down task listings by status and/or project, without loading the full task list.

**User goal:**
A Developer can quickly see only the tasks that are relevant to their current focus (e.g., only in-progress tasks for a specific project).

**Behavior:**
- `todo task list` — shows only active tasks (`status != done`, `deleted_at IS NULL`).
- `todo task list --all` — includes completed tasks; still excludes deleted.
- `todo task list --status <status>` — shows tasks with a specific status (e.g., `--status in-progress`).
- `todo task list --project <id>` — shows tasks belonging to a specific project.
- Filters can be combined: `todo task list --status todo --project 1`.

**Business rules enforced:**
- Deleted tasks (`deleted_at IS NOT NULL`) are never shown in any listing.
- Completed tasks are excluded from the default listing.

**CLI commands:**
```
todo task list
todo task list --all
todo task list --status todo
todo task list --status in-progress
todo task list --status done
todo task list --project <id>
todo task list --status todo --project <id>
```

**Modules involved:** `src/modules/tasks/task.repository.ts`, `src/cli/commands/task.commands.ts`

**Delivering work items:**
- `WI-006` — CLI task commands with filter flags *(Initiative 2)*
- `WI-009` — `--project` filter extension *(Initiative 3)*

**Out of scope for MVP:** Full-text search, priority filtering, due date ranges, saved filters.

---

## 7. Basic Reporting

**What it is:**
Presents tasks and projects in a readable, formatted output in the terminal.

**User goal:**
A Developer can scan a formatted list of tasks or projects at a glance without parsing raw text.

**Behavior:**
- `task list` and `project list` output a formatted table with relevant columns.
- `task show` and `project show` output a structured detail view.
- All messages (success, error, empty state) are clear and user-facing.
- Output is plain text / table format. No JSON in MVP.

**Business rules enforced:** None specific — this capability is presentation only.

**CLI commands:** All `list` and `show` commands.

**Modules involved:** `src/cli/` (output formatting helpers)

**Delivering work items:**
- `WI-010` — Table-formatted CLI output *(Initiative 4)*
- `WI-011` — Error handling and user-facing messages *(Initiative 4)*
- `WI-013` — README with install and usage guide *(Initiative 4)*

**Out of scope for MVP:** JSON output (`--json`), color themes, pager (like `less`), CSV export.
