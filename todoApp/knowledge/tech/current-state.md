---
type: current-state
status: active
updated_at: 2026-06-04
initiative_coverage: Initiative 1 (partial — WI-001 and WI-002 done, WI-003 pending)
sources:
  - .kaddo/scan.json
  - knowledge/inventory.md
  - knowledge/tech/decisions/ADR-001-cli-framework-commander.md
  - knowledge/tech/decisions/ADR-002-db-access-better-sqlite3.md
  - knowledge/delivery/work-items/WI-001-initialize-typescript-cli-project.md
  - knowledge/delivery/work-items/WI-002-configure-sqlite-connection-and-migration-runner.md
---

# todoApp — Current State

> Architecture baseline: what is true about the codebase right now.
> Updated after each completed initiative. Does not describe intent — see `codebase.md` and `roadmap.md` for that.

---

## Summary

| Area | State |
|------|-------|
| Project scaffold | Done (WI-001) |
| Database infrastructure | Done (WI-002) |
| Domain schema (tasks + projects) | Pending (WI-003) |
| Task commands | Not started (WI-004 to WI-006) |
| Project commands | Not started (WI-007 to WI-009) |
| CLI output polish | Not started (WI-010 to WI-013) |
| Build | Passing — 0 TypeScript errors |
| Tests | 11 / 11 passing |
| Binary | `todo --help` and `todo --version` work |

---

## Runtime Environment

| Item | Value |
|------|-------|
| Runtime | Node.js 22.16.0 |
| Language | TypeScript 5.9.3 |
| Module system | CommonJS (`"module": "CommonJS"` in tsconfig) |
| Package manager | pnpm 11.5.1 |
| Platform tested | Windows 11 (win32 x64) |

---

## Architecture Pattern

The codebase follows a layered architecture with strict top-down dependency flow:

```
CLI Command (thin)
    ↓
Service (business logic)
    ↓
Repository (data access, raw SQL)
    ↓
Database (better-sqlite3 connection)
```

- **CLI layer** is only responsible for parsing input and printing output.
- **Service layer** owns business rules and orchestrates repositories.
- **Repository layer** writes raw SQL queries; enforces `deleted_at IS NULL` on all reads.
- **Database layer** is a lazy singleton with pragmas and migration runner.

This pattern is defined but not yet instantiated beyond the database layer — the `modules/` directories are empty stubs.

---

## Source File Tree

```
src/
├── cli/
│   ├── index.ts                  Commander entry point — `todo` binary
│   └── commands/                 Empty — WI-006 (tasks), WI-008 (projects)
│
├── database/
│   ├── connection.ts             Lazy singleton — WAL + FK + auto-migrations
│   └── migrations/
│       ├── index.ts              Migration interface + empty registry
│       ├── runner.ts             Idempotent runner — tracks in `_migrations` table
│       └── runner.test.ts        5 tests — all passing
│
├── modules/
│   ├── tasks/                    Empty stub — WI-004 to WI-006
│   └── projects/                 Empty stub — WI-007 to WI-009
│
└── shared/
    ├── types.ts                  Status, Priority union types
    ├── constants.ts              DEFAULT_STATUS, DEFAULT_PRIORITY, STATUSES, PRIORITIES
    ├── errors.ts                 NotFoundError, ValidationError
    └── shared.test.ts            6 tests — all passing
```

---

## Module Details

### `src/cli/index.ts`

The `todo` binary entry point. Registers a root `Command` with name, description, and version. No subcommands yet — `todo --help` and `todo --version` are the only working commands.

```
todo --help     → shows usage
todo --version  → 0.1.0
```

No domain logic. No database access. Pure Commander setup.

---

### `src/database/connection.ts`

Exports two functions:

- `getDatabase()` — opens and returns the SQLite singleton. On first call: creates the database file, sets pragmas, runs pending migrations.
- `closeDatabase()` — closes the connection and resets the singleton to `null`.

Active SQLite pragmas:
- `PRAGMA journal_mode = WAL` — write-ahead logging for better concurrent read performance.
- `PRAGMA foreign_keys = ON` — enforces FK constraints (SQLite disables them by default).

Database path resolution: `process.env.DB_PATH ?? path.join(process.cwd(), 'data', 'app.sqlite')`.

---

### `src/database/migrations/runner.ts`

`runMigrations(db, migrations?)` — accepts a `Database.Database` instance and an optional `Migration[]` array (defaults to the registry in `index.ts`).

Behavior:
1. Creates `_migrations` table if it does not exist.
2. Reads all applied migration names from `_migrations`.
3. Iterates over the provided `migrations` array in order.
4. Skips any migration already recorded in `_migrations`.
5. Applies each pending migration with `db.exec(sql)`.
6. Records the applied name in `_migrations`.

Idempotent — safe to call multiple times on the same database.
The second `migrations` parameter exists to enable testing without mocking.

---

### `src/database/migrations/index.ts`

Defines the `Migration` interface `{ name: string; sql: string }` and exports an empty `migrations` array.

This array is the single registry of all schema migrations. WI-003 will add the first entry.

---

### `src/shared/`

Domain-agnostic building blocks shared across all modules:

| File | Exports |
|------|---------|
| `types.ts` | `Status` (`'todo' \| 'in-progress' \| 'done'`), `Priority` (`'low' \| 'medium' \| 'high'`) |
| `constants.ts` | `DEFAULT_STATUS`, `DEFAULT_PRIORITY`, `STATUSES`, `PRIORITIES` |
| `errors.ts` | `NotFoundError(entity, id)`, `ValidationError(message)` |

---

## Dependencies

### Production

| Package | Installed version | Notes |
|---------|------------------|-------|
| `better-sqlite3` | 12.10.0 | See deviation note below |
| `commander` | 12.1.0 | ADR-001 |

### Development

| Package | Installed version |
|---------|------------------|
| `typescript` | 5.9.3 |
| `vitest` | 2.1.9 |
| `tsx` | 4.22.4 |
| `@types/better-sqlite3` | 7.6.13 |
| `@types/node` | 20.19.41 |

---

## Test Coverage

| Test file | Tests | Status |
|-----------|-------|--------|
| `src/shared/shared.test.ts` | 6 | Passing |
| `src/database/migrations/runner.test.ts` | 5 | Passing |
| **Total** | **11** | **All passing** |

Tests are colocated with their source files. Vitest discovers them via its default glob (`**/*.test.ts`).

No tests yet for: CLI commands, task/project modules (not yet implemented).

---

## Build Output

`pnpm build` compiles `src/` to `dist/` via `tsc`. Source maps and `.d.ts` declarations are emitted.

Note: test files (`*.test.ts`) are currently compiled into `dist/`. This is harmless but could be excluded with `exclude: ["**/*.test.ts"]` in `tsconfig.json` if needed.

---

## Deviations from `codebase.md`

| # | Area | Planned | Actual | Reason |
|---|------|---------|--------|--------|
| 1 | `better-sqlite3` version | `^9.6.0` | `12.10.0` | v9.6.0 has no prebuilt binaries for Node.js 22 on win32 x64; node-gyp compilation failed due to missing VC++ toolset. v12.10.0 ships prebuilt binaries for Node 22. |
| 2 | Migration format | Raw `.sql` files | TypeScript `Migration[]` in `index.ts` | TypeScript files with exported SQL strings work natively with the compiled binary without needing a file-copy step in the build. |
| 3 | pnpm config location | `package.json` `"pnpm"` key | `pnpm-workspace.yaml` | pnpm v10+ removed support for settings in `package.json`; they must be in `pnpm-workspace.yaml`. |
| 4 | Test directory | Implied separate `__tests__/` | Colocated in `src/` | Vitest's default glob finds tests anywhere in `src/`; colocation keeps tests next to the code they cover. |

---

## Gaps (What Does Not Exist Yet)

| What | Needed by | Work item |
|------|-----------|-----------|
| Initial schema (tasks + projects tables) | Initiative 1 close | WI-003 |
| Task model, repository, service | Initiative 2 | WI-004, WI-005 |
| Task CLI commands | Initiative 2 | WI-006 |
| Project model, repository, service | Initiative 3 | WI-007, WI-008 |
| Project CLI commands | Initiative 3 | WI-008, WI-009 |
| Table-formatted output | Initiative 4 | WI-010 |
| Error messages polish | Initiative 4 | WI-011 |
| CLI integration tests | Initiative 4 | WI-012 |
| README | Initiative 4 | WI-013 |

---

## Notes on Kaddo Scan Results

The `scan.json` / `inventory.md` generated by `kaddo scan` has some gaps worth noting:

- **No test directories detected** — Kaddo looks for conventional directories like `__tests__/` or `test/`. This project uses Vitest with colocated tests. Tests are present and passing.
- **No migration directories detected** — Kaddo scans for SQL file directories. Migrations are TypeScript files in `src/database/migrations/`. They are present and functional.
- **Domains flagged as structural** — Kaddo suggested `cli`, `database`, `modules`, `shared` as possible domains based on folder names. These are architectural layers, not bounded contexts. The actual business domains (`tasks`, `projects`) do not have code yet.
- **Knowledge layers still show ✗ for Business/Product** — Kaddo tracks files by specific filename conventions. The business and product knowledge exists in `knowledge/business/business.md` and `knowledge/product/product.md` but may not match the exact filenames Kaddo checks for. This is a display gap in the tooling, not a content gap.
