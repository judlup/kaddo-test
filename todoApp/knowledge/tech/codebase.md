---

type: codebase
status: draft
-------------

# Codebase

> Created by `kaddo bootstrap`. The minimal **how** of the project. Refine with the
> codebase-agent. It describes the intended base — it does **not** generate code.

## Repository Structure

The project will be a simple CLI application backed by SQLite.

The structure should keep the codebase small, understandable, and aligned with the product capabilities.

```txt
src/
  cli/
    commands/
      task.commands.ts
      project.commands.ts

  modules/
    tasks/
      task.model.ts
      task.repository.ts
      task.service.ts

    projects/
      project.model.ts
      project.repository.ts
      project.service.ts

  database/
    connection.ts
    migrations/

  shared/
    errors.ts
    types.ts
    constants.ts

knowledge/
  business.md
  product.md
  codebase.md
  roadmap.md
  work-items/

data/
  app.sqlite

README.md
.env.example
package.json
```

## Candidate Stack

* Runtime: Node.js
* Language: TypeScript
* Interface: CLI
* Database: SQLite
* Database access: better-sqlite3 or Drizzle ORM
* CLI framework: Commander.js or CAC
* Package manager: pnpm
* Testing: Vitest

## Quality Attributes

* Simplicity: the project should be easy to understand and modify.
* Maintainability: code should be organized by product capabilities.
* Portability: the app should run locally without external services.
* Traceability: tasks and important changes should be easy to inspect.
* Testability: core task behavior should be testable without running the CLI.
* Evolvability: the codebase should allow future growth into API or web app if needed.

## Development Standards

* Use TypeScript.
* Keep CLI commands thin.
* Put business logic inside services.
* Put database access inside repositories.
* Keep domain concepts simple and explicit.
* Use SQLite migrations for database changes.
* Keep configuration minimal.
* Avoid premature abstractions.
* Document important decisions in Kaddo knowledge files.

## Git Strategy

GitHub Flow + Conventional Commits + SemVer (default). See `kaddo add git-strategy`.

Recommended branch format:

```txt
feature/vs-001-project-foundation
feature/vs-002-task-management
feature/vs-003-project-management
docs/update-product-scope
```

Recommended commit examples:

```txt
feat(tasks): add task creation command
feat(tasks): add task status update
feat(projects): add project creation command
docs(kaddo): update codebase foundation
chore(repo): configure typescript cli project
```

## Initial Modules

* CLI
* Tasks
* Projects
* Database
* Shared

## Initial Domain Entities

### Task

Represents a unit of work.

Suggested fields:

```txt
id
title
description
status
priority
project_id
created_at
updated_at
completed_at
```

### Project

Represents a group of related tasks.

Suggested fields:

```txt
id
name
description
created_at
updated_at
```

## Initial CLI Commands

```bash
todo task add "Create project brief"
todo task list
todo task show <id>
todo task done <id>
todo task update <id>
todo task delete <id>

todo project add "Kaddo validation"
todo project list
todo project show <id>
```

## Assumptions

* The app is mainly an example to validate Kaddo’s flow.
* The first version does not need authentication.
* The first version does not need teams, roles, or workspaces.
* SQLite is enough for local persistence.
* The CLI is the only interface for the MVP.
* The domain should stay intentionally small.
* The app may evolve later into an API or web app, but that is not part of the first version.

## Open Questions

* Should tasks belong to a project from the beginning?
* Should task priority be included in the MVP?
* Should task status support only `todo`, `in-progress`, and `done`?
* Should completed tasks be hidden by default?
* Should deleted tasks be hard-deleted or marked as archived?
* Should the app support tags?
* Should the CLI output be plain text, table format, or JSON optionally?

## Quality checklist

* [x] Structure follows business and product, not a framework default.
* [x] No production code is described here — only the foundation.
* [x] The stack is simple enough for an example project.
* [x] Initial modules map to product capabilities.
* [x] The app can run locally without external services.
* [x] Open questions capture technical decisions that still need validation.
