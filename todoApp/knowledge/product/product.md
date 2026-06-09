---
type: product
status: draft
---

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

- Listing tasks.

- Viewing task details.

- Updating task title, description, status, and priority.

- Marking tasks as completed.

- Deleting or archiving tasks.

- Creating projects.

- Assigning tasks to projects.

- Persisting data in SQLite.

- Basic filters by status and project.

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

## Open Questions

- Should projects be mandatory or optional?

- Should priority be included in the MVP?

- Should tasks support due dates?

- Should completed tasks appear in the default list?

- Should delete archive or permanently remove tasks?

- Should CLI output support table and JSON formats?
