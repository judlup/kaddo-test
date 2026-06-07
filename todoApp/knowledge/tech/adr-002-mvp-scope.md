---
type: adr
id: adr-002
title: MVP Feature Scope and Domain Model
status: accepted
date: 2026-06-07
---

# ADR-002: MVP Feature Scope and Domain Model

## Context

todoApp requires clear boundaries on what is included in the first version (MVP) and how the core domain entities (Task, Project) should be modeled to support these features.

## Decision

### MVP Features (Included)

**Task Management:**
- Create, read, update, delete (soft delete via `deleted_at`)
- Status transitions: `todo` → `in-progress` → `done`
- Priority levels: `low`, `medium`, `high`
- Optional project assignment
- Timestamps: `created_at`, `updated_at`, `deleted_at`

**Project Management:**
- Create, read, update, delete (soft delete)
- Optional grouping of tasks
- Projects are not required for tasks to exist

**Display & Filtering:**
- List tasks (excluding deleted tasks by default)
- Filter by status
- Filter by project
- Hide completed (`done`) tasks by default in listings
- Show completed tasks via explicit filter/flag

**CLI Output:**
- Plain text and simple table format
- No JSON output in MVP

### MVP Features (Excluded)

- Due dates
- Tags
- Recurring tasks
- Comments or notes beyond `description`
- Authentication or multi-user features
- Web interface or API
- Bulk operations
- Search

### Domain Model

#### Task Entity

```typescript
interface Task {
  id: string;                    // UUID or auto-increment
  title: string;                 // Required, non-empty
  description?: string;          // Optional
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  project_id?: string;           // Optional FK to Project
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;             // Soft delete marker
}
```

#### Project Entity

```typescript
interface Project {
  id: string;                    // UUID or auto-increment
  name: string;                  // Required, non-empty
  description?: string;          // Optional
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;             // Soft delete marker
}
```

### Data Integrity Rules

1. **Task-Project relationship:** Optional. A task exists with or without a project.
2. **Cascade on delete:** When a project is soft-deleted, its tasks remain but become orphaned (project_id still references the deleted project). Queries should filter out deleted projects.
3. **Status transitions:** No enforced state machine. Users can move between any states freely.
4. **Priority default:** Default to `medium` if not specified.
5. **Soft delete:** `deleted_at = null` means active; `deleted_at != null` means archived. No hard deletion in MVP.

## Rationale

### Why Optional Projects?

- **Flexibility:** Users can organize tasks simply (flat list) or hierarchically (grouped by project).
- **Low complexity:** Reduces initial implementation effort.
- **Evolutionary:** Projects can be made mandatory in a future version if needed.

### Why Soft Delete?

- **Auditability:** Maintains a complete history of all actions.
- **Recovery:** Users can undelete tasks accidentally removed.
- **Regulatory alignment:** Some use cases require data retention.
- **Simple to implement:** Just add `deleted_at` column; no complex cascade logic.

### Why Three Priority Levels?

- **Simple prioritization:** Avoids over-engineering; three levels are sufficient for a TODO app.
- **Cognitive load:** Users can quickly decide: low/medium/high without analysis paralysis.

### Why Hide Completed Tasks by Default?

- **Signal-to-noise ratio:** Users care most about active work.
- **Still queryable:** Completed tasks aren't deleted; users can explicitly request them.
- **Common pattern:** Most TODO apps do this (Todoist, Apple Reminders, etc.).

## Consequences

### Positive
- ✅ **Clear scope:** Developers know exactly what to build.
- ✅ **Simple data model:** Easy to reason about, test, and extend.
- ✅ **Supports future growth:** Optional features can be added without redesigning entities.

### Negative
- ⚠️ **No state validation:** The domain doesn't enforce valid status transitions. This is acceptable for MVP simplicity.
- ⚠️ **Orphaned tasks on project delete:** Tasks don't cascade. This is a trade-off for avoiding complex delete logic.

## Validation

This decision will be validated by:
1. Successfully implementing all CRUD operations with this model.
2. Confirming that optional projects don't complicate the code.
3. Verifying that soft deletes work correctly in list queries.

## Related Decisions

- **CLI Output:** Plain text/table only; no JSON serialization of full entities.
- **Technology Stack:** SQLite's simple schema aligns well with this straightforward domain model.
