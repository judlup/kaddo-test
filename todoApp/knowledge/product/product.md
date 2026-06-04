---
type: product
status: active
updated_at: 2026-06-04
---

# Product

## Product Brief

A CLI TODO application backed by SQLite. Users manage tasks locally from the terminal: create, list, view, update, complete, and delete tasks. Tasks can optionally be grouped into projects.

The product is an intentionally small example to validate Kaddo's KDD workflow. Simplicity is a feature — scope is kept minimal so the process is visible, not the application complexity.

## Capabilities

| Capability | Summary | MVP |
|------------|---------|-----|
| Create task | Add a task with title, optional description, priority, optional project | Yes |
| List tasks | Show active tasks; filter by status and project | Yes |
| View task | Show full detail for a single task | Yes |
| Update task | Edit title, description, status, priority, project | Yes |
| Complete task | Mark a task as done; records `completed_at` | Yes |
| Delete task | Soft-delete a task; sets `deleted_at` | Yes |
| Create project | Add a named project to group tasks | Yes |
| List projects | Show all projects | Yes |
| View project | Show project detail and its tasks | Yes |
| Filter tasks | Filter by `status` and `project_id` | Yes |
| JSON output | Machine-readable output format | No |
| Tags | Label tasks with free-form tags | No |
| Due dates | Attach deadlines to tasks | No |

## Scope

### Task fields

| Field | Type | Required | Default | Notes |
|-------|------|----------|---------|-------|
| `id` | integer | auto | — | Primary key |
| `title` | text | yes | — | |
| `description` | text | no | null | |
| `status` | text | yes | `todo` | `todo` / `in-progress` / `done` |
| `priority` | text | yes | `medium` | `low` / `medium` / `high` |
| `project_id` | integer | no | null | FK → projects |
| `deleted_at` | text | no | null | Soft delete timestamp |
| `completed_at` | text | no | null | Set when status → `done` |
| `created_at` | text | auto | now | |
| `updated_at` | text | auto | now | |

### Project fields

| Field | Type | Required | Default |
|-------|------|----------|---------|
| `id` | integer | auto | — |
| `name` | text | yes | — |
| `description` | text | no | null |
| `created_at` | text | auto | now |
| `updated_at` | text | auto | now |

### CLI commands (MVP)

```
todo task add "title" [--desc "..."] [--priority low|medium|high] [--project <id>]
todo task list [--status todo|in-progress|done] [--project <id>] [--all]
todo task show <id>
todo task update <id> [--title "..."] [--desc "..."] [--status ...] [--priority ...] [--project <id>]
todo task done <id>
todo task delete <id>

todo project add "name" [--desc "..."]
todo project list
todo project show <id>
```

## Out of Scope

- Web interface
- REST API
- Authentication / sessions
- Teams, roles, workspaces
- Notifications
- Tags
- Due dates
- JSON output format
- Cloud sync
- Multi-user collaboration

## Success Criteria

- A user can run the CLI locally without setup beyond `pnpm install`.
- A user can complete the full task lifecycle: create → update → done → delete.
- A user can group tasks under projects and filter by project.
- Data persists across sessions in a local SQLite file.
- A Kaddo evaluator can trace every code decision back to a knowledge file.
- A maintainer can understand the project by reading the knowledge layer alone.

## Decisions

| # | Decision | Rationale |
|---|----------|-----------|
| 1 | `task list` hides done tasks by default | Reduces noise; `--all` shows everything |
| 2 | Projects are optional | Task creation should not require a project |
| 3 | Soft delete only | Physical delete adds no value for a demo; history is preserved |
| 4 | Priority in MVP | Real domain field; validates Kaddo handling of enum fields |

## Open Questions

- Should `task list` show a count summary (e.g., "3 tasks, 1 done") in a later version?
- Should projects support archiving in a future version?
