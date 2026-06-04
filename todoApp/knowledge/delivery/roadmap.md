---
type: roadmap
updated_at: 2026-06-04
---

# todoApp — Roadmap

> What we intend to build and why. Ordered by dependency and value.

---

## Now

### Initiative 1 — Project Foundation

**Goal:** Working TypeScript CLI project connected to SQLite with schema in place.

No user-facing features. Establishes the foundation every subsequent work item depends on.

| Work Item | Title | Status |
|-----------|-------|--------|
| WI-001 | Initialize TypeScript CLI project | pending |
| WI-002 | Configure SQLite connection and migration runner | pending |
| WI-003 | Create initial schema migration (tasks + projects) | pending |

---

### Initiative 2 — Task Management

**Goal:** Full task lifecycle from CLI. The core product capability.

Depends on Initiative 1 being complete.

| Work Item | Title | Status |
|-----------|-------|--------|
| WI-004 | Task model and repository | pending |
| WI-005 | Task service (create, update, soft delete, status transitions) | pending |
| WI-006 | CLI task commands (add, list, show, update, done, delete) | pending |

---

## Next

### Initiative 3 — Project Management

**Goal:** Let users group tasks under named projects.

Depends on Initiative 2 being complete (task commands must exist before project commands can reference them).

| Work Item | Title | Status |
|-----------|-------|--------|
| WI-007 | Project model and repository | pending |
| WI-008 | Project service and CLI commands (add, list, show) | pending |
| WI-009 | Extend task commands with --project filter and assignment | pending |

---

## Later

### Initiative 4 — Quality and Developer Experience

**Goal:** Make the app credible as a Kaddo demo — clean output, clear errors, documented usage.

| Work Item | Title | Status |
|-----------|-------|--------|
| WI-010 | Formatted table output for task list and project list | pending |
| WI-011 | Consistent error messages (NotFoundError, ValidationError) | pending |
| WI-012 | CLI integration tests (end-to-end command execution) | pending |
| WI-013 | README with usage examples and Kaddo flow description | pending |

---

## Not Now

Features explicitly excluded from the MVP. Reconsidering any of these requires a new business decision.

- JSON output (`--json` flag)
- Tags on tasks
- Due dates on tasks
- Web interface
- REST API
- Authentication
- Teams / roles / workspaces
- Notifications
- Cloud sync
