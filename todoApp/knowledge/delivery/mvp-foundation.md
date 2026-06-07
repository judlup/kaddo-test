---
type: delivery
title: MVP Foundation — Decision Summary
date: 2026-06-07
---

# todoApp MVP — Decision Summary

> All critical MVP decisions have been closed. Ready to create work items.

## Quick Reference: What We're Building

A simple **CLI task manager** that runs locally with SQLite. Users can:

✅ Create, list, update, complete, and archive tasks  
✅ Organize tasks into optional projects  
✅ Prioritize tasks (low/medium/high)  
✅ Filter tasks by status or project  
✅ View completed tasks on demand  

❌ Not included: due dates, tags, authentication, web UI, JSON output

---

## Finalized Decisions

### Feature Scope

| Feature | Decision | Rationale |
|---------|----------|-----------|
| **Projects** | Optional, not required | Flexibility + low complexity |
| **Priority** | Included (low/medium/high) | Simple prioritization without analysis paralysis |
| **Status** | 3 states only: todo, in-progress, done | Simplicity, covers 90% of use cases |
| **Completed visibility** | Hidden by default | Reduces noise; still queryable |
| **Delete behavior** | Soft delete (deleted_at) | Auditability + recovery + simplicity |
| **Due dates** | Not in MVP | Deferred to post-MVP |
| **Tags** | Not in MVP | Deferred to post-MVP |
| **CLI output** | Text or table only | No JSON in MVP |

### Technology Stack

| Layer | Technology | Reason |
|-------|-----------|--------|
| Runtime | Node.js | Common, good CLI support, single language |
| Language | TypeScript | Type safety, self-documenting, better IDE support |
| CLI | Commander.js | Lightweight, well-suited for small CLIs |
| Database | SQLite | Local-first, no external services |
| DB Driver | better-sqlite3 | Synchronous, simple for CLI workflows |
| Package Mgr | pnpm | Fast, strict dependency resolution |
| Testing | Vitest | Fast, native TypeScript support |

### Domain Model

**Task:**
```
id, title, description, status, priority, project_id, 
created_at, updated_at, deleted_at
```

**Project:**
```
id, name, description, 
created_at, updated_at, deleted_at
```

---

## Roadmap Structure

### Phase 1: Foundation (Now)
- Project setup & tooling
- Database & migrations system
- Domain models & repositories
- CLI command framework

### Phase 2: Core Features (Next)
- Task CRUD commands
- Status management
- Priority support
- Project CRUD commands
- Task-project association
- Filtering & display

### Phase 3: Polish (Later)
- Advanced search
- Bulk operations
- Future: API, web UI, collaboration

---

## Architecture Overview

```
CLI Commands (Commander.js)
    ↓
Services (Business Logic)
    ↓
Repositories (Data Access)
    ↓
Database (SQLite + Migrations)
```

**Key principles:**
- CLI commands stay thin (just route to services)
- Business logic lives in services
- Data access is isolated in repositories
- Database changes go through migrations

---

## Success Criteria for MVP

✓ All Phase 1 & Phase 2 work items complete  
✓ User can fully manage tasks & projects via CLI  
✓ Data persists correctly in SQLite  
✓ Codebase is well-organized by domain  
✓ Core logic is testable (services & repositories)  
✓ Kaddo knowledge reflects all decisions & rationale  

---

## Next Steps

1. **Create work items** from the roadmap (12 items for Phase 1 + Phase 2)
2. **Create feature branches** using Git strategy: `feature/vs-NNN-slug`
3. **Start Phase 1** with project setup work item
4. **Update knowledge** as decisions are validated during implementation

---

## Related Documents

- **ADR-001:** Technology Stack Selection
- **ADR-002:** MVP Feature Scope & Domain Model
- **roadmap.md:** Detailed phases and work item list
- **codebase.md:** Architecture and structure
- **product.md:** Product definition and capabilities
- **business.md:** Problem statement and value proposition
