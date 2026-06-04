---
type: product
status: draft
-------------

# Product

## Product Brief

This product is a simple CLI TODO application backed by SQLite.

It allows users to manage tasks locally from the terminal by creating, listing, updating, completing, and deleting tasks.

The product is intentionally small and is mainly designed to validate Kaddo’s workflow for turning an idea into structured business knowledge, product scope, codebase foundation, roadmap, and work items.

## Capabilities

- CLI Interaction
- Task Management
- Task Status Management
- Project Management
- Local Persistence
- Basic Task Filtering
- Basic Reporting

## Scope

The MVP includes:

- Creating tasks from the CLI.
- Listing tasks (completed tasks hidden by default; use `--all` or `--status done` to include them).
- Viewing task details.
- Updating task title, description, status, and priority.
- Marking tasks as completed.
- Soft-deleting tasks (`deleted_at` timestamp; tasks are hidden, not permanently removed).
- Creating projects (optional — tasks can exist without a project).
- Assigning tasks to projects.
- Persisting data in SQLite.
- Filtering tasks by status and project.

Task fields in MVP:
- `title` (required)
- `description` (optional)
- `status`: `todo` | `in-progress` | `done` (default: `todo`)
- `priority`: `low` | `medium` | `high` (default: `medium`)
- `project_id` (nullable)

## Out of Scope

The MVP does not include:

- Authentication.
- Workspaces.
- Teams.
- Roles and permissions.
- Web interface.
- API.
- Notifications.
- Comments.
- File attachments.
- Real-time updates.
- External integrations.
- Cloud deployment.
- Multi-user collaboration.

## Success Criteria

The MVP is successful if:

- A user can install or run the CLI locally.
- A user can create, list, update, complete, and delete tasks.
- A user can group tasks by project.
- Data persists locally using SQLite.
- The project demonstrates a clear Kaddo flow from business to product, codebase, roadmap, and work items.
- A maintainer can understand the project by reading the generated knowledge files.

## Assumptions

- The CLI is enough for the first version.
- SQLite is enough for local persistence.
- The app is an example project, not a commercial product.
- Project management should remain minimal.
- The app should be easy to extend later.

## Decisions

- **Projects:** Optional. `project_id` is nullable.
- **Priority:** Included in MVP. Values: `low`, `medium`, `high`. Default: `medium`.
- **Completed tasks in list:** Hidden by default. Visible with `--all` or `--status done`.
- **Delete:** Soft delete. `deleted_at` field — tasks are hidden, not removed.
- **CLI output format:** Plain text / table. JSON deferred to a future iteration.
- **Task status values:** `todo`, `in-progress`, `done`.

## Open Questions

- Should tasks support due dates in a future version?
- Should tags be considered for a future version?