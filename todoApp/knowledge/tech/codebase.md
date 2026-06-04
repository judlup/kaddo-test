---
type: codebase
status: active
updated_at: 2026-06-04
---

# Codebase

> Describes the intended technical foundation. Does not generate code.

## Stack

| Layer | Technology | Decision |
|-------|------------|----------|
| Runtime | Node.js 22 | LTS, native ESM + CommonJS |
| Language | TypeScript (strict) | Type safety; explicit domain modeling |
| CLI framework | Commander.js | Widely documented; native subcommand support for `todo <resource> <action>` |
| Database | SQLite | Local, offline, zero infrastructure |
| DB access | better-sqlite3 | Synchronous API fits CLI; raw SQL keeps queries readable |
| Package manager | pnpm | Workspace support; fast installs |
| Testing | Vitest | Fast, colocated tests; compatible with TypeScript |

See `knowledge/tech/decisions/` for ADRs on Commander.js and better-sqlite3.

## Architecture Pattern

```
CLI (thin)
  → Service (business logic)
    → Repository (raw SQL)
      → Database (better-sqlite3 singleton)
```

- **CLI** — parses args, calls service, prints output. No business logic.
- **Service** — validates input, enforces business rules, calls repository.
- **Repository** — executes SQL. Always filters `deleted_at IS NULL`. Sets `updated_at` on writes.
- **Database** — singleton connection. Runs migrations on first call. Pragmas: `WAL`, `foreign_keys = ON`.

## Repository Structure

```
src/
  cli/
    index.ts                    ← entry point, registers subcommands
    commands/
      task.commands.ts
      project.commands.ts

  modules/
    tasks/
      task.model.ts             ← Task interface, input types
      task.repository.ts        ← SQL access
      task.service.ts           ← business logic
    projects/
      project.model.ts
      project.repository.ts
      project.service.ts

  database/
    connection.ts               ← singleton + migration runner call
    migrations/
      runner.ts                 ← idempotent migration runner
      index.ts                  ← migration registry
      001_init.ts               ← initial schema (tasks + projects)

  shared/
    types.ts                    ← Status, Priority
    constants.ts                ← DEFAULT_STATUS, DEFAULT_PRIORITY, enums
    errors.ts                   ← NotFoundError, ValidationError

knowledge/
  business/business.md
  product/product.md
  tech/codebase.md
  tech/current-state.md
  tech/decisions/
  delivery/roadmap.md
  delivery/work-items/

data/
  app.sqlite                    ← runtime DB (gitignored)

package.json
tsconfig.json
pnpm-workspace.yaml
.env.example
```

## Domain Entities

### Task

```typescript
interface Task {
  id:           number;
  title:        string;
  description:  string | null;
  status:       'todo' | 'in-progress' | 'done';
  priority:     'low' | 'medium' | 'high';
  project_id:   number | null;
  deleted_at:   string | null;
  created_at:   string;
  updated_at:   string;
  completed_at: string | null;
}
```

### Project

```typescript
interface Project {
  id:          number;
  name:        string;
  description: string | null;
  created_at:  string;
  updated_at:  string;
}
```

## Development Standards

- CLI commands are thin — no business logic, no SQL.
- Business logic lives in services.
- SQL lives in repositories — nowhere else.
- All timestamps stored as ISO 8601 text (SQLite has no native datetime type).
- `updated_at` is set manually by the repository on every write.
- `completed_at` is set by the repository when `status` transitions to `done`.
- Soft delete: all repository queries filter `WHERE deleted_at IS NULL` by default.
- Migrations are TypeScript files exporting `{ name: string; sql: string }` — no `.sql` files needed in a compiled TS binary.
- Tests are colocated with source (`*.test.ts` alongside the file under test).
- No mocks for SQLite — tests use `:memory:` databases with real migrations.

## Build

```json
{
  "target": "ES2022",
  "module": "CommonJS",
  "strict": true,
  "outDir": "./dist",
  "rootDir": "./src"
}
```

Entry point: `src/cli/index.ts` → `dist/cli/index.js` → `bin: { "todo": "./dist/cli/index.js" }`

## Decisions

| # | Decision |
|---|----------|
| 1 | Commander.js over CAC — better documented, wider adoption |
| 2 | better-sqlite3 over Drizzle ORM — sync API, raw SQL, no schema duplication |
| 3 | TypeScript migration files over `.sql` files — no extra build step for a compiled binary |
| 4 | `:memory:` DB in tests — fast, isolated, no test file cleanup needed |
| 5 | `updated_at` managed by repository, not SQLite triggers — explicit, observable, testable |
