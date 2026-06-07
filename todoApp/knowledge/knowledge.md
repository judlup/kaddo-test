---
type: current-state
updated_at: 2026-06-07
---

# todoApp - Knowledge

> What is true about this product right now.

## Purpose

todoApp is a small local CLI TODO application used to validate Kaddo's Knowledge Driven Development workflow.

The product exists less as a commercial TODO app and more as a realistic example of turning business intent, product scope, architecture, roadmap, and work items into traceable project knowledge before implementation.

## Current Implementation State

WI-001 is implemented and completed.

The repository now has a minimal Node.js + TypeScript CLI project foundation:

- `package.json` with pnpm-compatible scripts.
- TypeScript configured in strict mode with CommonJS output.
- Node 22 LTS target documented through `.nvmrc` and `package.json` engines.
- Commander.js wired as the base CLI entrypoint.
- `tsx` configured for development execution.
- Vitest configured with one minimal passing test file.
- ESLint and Prettier configuration present.
- Minimal source folders for CLI, database, modules, and shared code boundaries.
- Minimal data folder placeholder.
- README setup and development instructions.

The base CLI currently supports only help/version behavior. Task commands, project commands, database access, migrations, models, services, and repositories are not implemented yet.

## Architecture Overview

The MVP is a CLI-only Node.js application written in TypeScript and backed by a local SQLite database in later work items.

The confirmed stack is:

- Runtime: Node.js 22 LTS
- Language: TypeScript
- Module system: CommonJS
- Package manager: pnpm
- CLI framework: Commander.js
- Database: SQLite
- Database access: better-sqlite3
- Development runner: tsx
- Test framework: Vitest

The intended design keeps CLI commands thin, places business behavior in services, and isolates persistence in repositories.

## Key Domains

### CLI Foundation

Implemented:

- `todo --help`
- `todo --version`
- Base Commander.js entrypoint

Not implemented yet:

- `todo task ...`
- `todo project ...`

### Tasks

Not implemented yet.

Planned MVP rules:

- A task must have a title.
- A task can have a description.
- Supported statuses are `todo`, `in-progress`, and `done`.
- Supported priorities are `low`, `medium`, and `high`.
- Default priority is `medium`.
- `project_id` is optional / nullable.
- Completed tasks are hidden by default in `task list`.
- Deleting a task means archiving / soft delete using `deleted_at`.

### Projects

Not implemented yet.

Planned MVP rules:

- Projects are included in the MVP.
- Projects remain minimal.
- A project can contain multiple tasks.
- Tasks can exist without a project.

### Local Persistence

Not implemented yet.

SQLite and better-sqlite3 are part of the confirmed stack, but database connection and migrations are out of scope for WI-001 and remain future work.

## Active Constraints

- The first version is CLI-only.
- The first version works locally without external services.
- The first version will use SQLite for local persistence.
- Authentication, teams, roles, workspaces, notifications, comments, attachments, integrations, API, web UI, and collaboration are out of scope.
- Due dates, tags, hard delete, and JSON CLI output are out of scope for the MVP.

## Validation State

The following WI-001 validation commands passed:

- `corepack pnpm install`
- `corepack pnpm run build`
- `corepack pnpm test`
- `corepack pnpm run lint`
- `corepack pnpm dev`

Validation notes:

- Direct `pnpm` is not available in PATH, but Corepack can invoke pnpm.
- Local Node runtime is `v24.13.0`; the project declares Node 22 LTS as the target.
- Vitest emitted a deprecation warning for the CJS build of Vite's Node API, but tests passed.

## Open Questions

- Should a future tooling work item pin or install pnpm explicitly for contributors who do not use Corepack?
- Should the Vitest/Vite CJS deprecation warning be handled in a later tooling update?
