---
type: roadmap
id: roadmap
status: candidate
generated_by: MVP-planning-session
knowledge_level: K3
---

# todoApp — Roadmap

> Structured initiative and work item candidates ready for `kaddo create --from roadmap`.

## Summary

The MVP roadmap consists of **3 initiatives** organized sequentially to deliver a functional CLI task manager:

1. **RM-001: Project Foundation** — Project setup, tooling, database infrastructure
2. **RM-002: Task Management** — Core task CRUD, status management, priority support
3. **RM-003: Project Management** — Project CRUD, task-project association, filtering

**Total candidate work items: 12** (3 chores + 9 features)

**Execution timeline:** Phases 1 & 2 for MVP. Phase 3 (Later) reserved for post-MVP enhancements.

---

## Assumptions

- Node.js + TypeScript + Commander.js stack is confirmed and available.
- SQLite is sufficient for local persistence; no external databases required.
- CLI-only interface is acceptable; web UI/API can be added post-MVP.
- Small team (1-2 developers) working on this project.
- Soft delete (deleted_at) is simpler to implement than hard delete with cascades.

---

## Roadmap Principles

1. **Foundation First:** Tooling and database infrastructure must be solid before feature work.
2. **Layered Architecture:** CLI commands delegate to Services, which delegate to Repositories.
3. **Testability:** Core logic (services, repositories) is testable without the CLI.
4. **Incremental Delivery:** Each work item delivers observable value.
5. **Knowledge-Driven:** Architecture decisions are documented in ADRs before implementation.

---

## Initiatives

### RM-001: Project Foundation

**Goal:** Establish project infrastructure, tooling, and database layer. Get the CLI bootstrapped and ready for feature development.

**Related capabilities:** 
- Project setup and configuration
- Database persistence foundation

**Project area / domain:** Infrastructure, Tooling

**Impact:** High (blocks all other work)

**Risk:** Low (standard Node.js + TypeScript setup)

**Suggested Knowledge Level:** K1

**Dependencies:** None

**Why this comes now:** Foundation work must complete before any feature development can begin. This initiative establishes the development environment, database schema, and CLI entry point.

**Candidate Work Items:**

- WI-RM001-001: Initialize TypeScript CLI project
  - type: chore
  - suggested knowledge level: K1
  - expected value: Project compiles and runs; development environment is ready
  - notes: package.json, tsconfig.json, .gitignore, build scripts, folder structure

- WI-RM001-002: Configure database and migrations
  - type: chore
  - suggested knowledge level: K2
  - expected value: SQLite database can be initialized; migrations system is functional
  - notes: Set up better-sqlite3 integration, create migrations folder, build first migration (schema creation)

- WI-RM001-003: Create domain models and repository layer
  - type: chore
  - suggested knowledge level: K2
  - expected value: Task and Project entities are defined; repository stubs are testable
  - notes: Define TypeScript interfaces for Task and Project; create base Repository class; implement simple in-memory repo for testing

- WI-RM001-004: Bootstrap CLI framework and error handling
  - type: chore
  - suggested knowledge level: K1
  - expected value: CLI boots with todo --help; basic command routing works
  - notes: Set up Commander.js, global error handler, colored console output, user-friendly error messages

**Open questions:** None (all foundation decisions finalized)

**Execution rationale:** These 4 items must complete in order. Each builds on the previous layer.

---

### RM-002: Task Management

**Goal:** Deliver core task CRUD, status transitions, and priority support. Users can create, list, update, complete, and archive tasks.

**Related capabilities:**
- Task creation and persistence
- Task status management (todo → in-progress → done)
- Task priority support (low, medium, high)
- Task filtering by status
- Hide completed tasks by default
- Soft delete / archive functionality

**Project area / domain:** Core Domain, Task Management

**Impact:** High (MVP-critical)

**Risk:** Medium (requires careful design of filtering logic and soft-delete queries)

**Suggested Knowledge Level:** K2

**Dependencies:** RM-001 (all foundation work must be complete)

**Why this comes now:** Once foundation is ready, task management is the critical path for MVP. Users must be able to manage tasks before projects make sense.

**Candidate Work Items:**

- WI-RM002-001: Implement Task repository and service layer
  - type: feature
  - suggested knowledge level: K2
  - expected value: Task CRUD operations are tested and ready; service layer abstracts repository
  - notes: TaskRepository (create, findById, findAll, update, softDelete), TaskService (business logic); test with Vitest

- WI-RM002-002: Add task creation command
  - type: feature
  - suggested knowledge level: K1
  - expected value: User can run todo task add "title" with optional description and priority
  - notes: Parse CLI args, validate inputs, persist to database, return confirmation with task ID

- WI-RM002-003: Add task listing command with filtering
  - type: feature
  - suggested knowledge level: K2
  - expected value: User can list tasks; completed tasks are hidden by default; filtering by status works
  - notes: todo task list, todo task list --status done, exclude deleted_at IS NOT NULL, table output format

- WI-RM002-004: Add task detail view command
  - type: feature
  - suggested knowledge level: K1
  - expected value: User can view full task details with todo task show <id>
  - notes: Display all task fields in readable format; handle not-found gracefully

- WI-RM002-005: Add task status update command
  - type: feature
  - suggested knowledge level: K1
  - expected value: User can change task status: todo task update <id> --status in-progress
  - notes: Support all three statuses (todo, in-progress, done); validate transitions

- WI-RM002-006: Add task priority support
  - type: feature
  - suggested knowledge level: K1
  - expected value: User can set priority on create and update: todo task add "task" --priority high
  - notes: Default to medium; validate against enum

- WI-RM002-007: Add task title/description update command
  - type: feature
  - suggested knowledge level: K1
  - expected value: User can update task text: todo task update <id> --title "new title" --description "..."
  - notes: Partial updates allowed; timestamps updated correctly

- WI-RM002-008: Add task archive/delete command (soft delete)
  - type: feature
  - suggested knowledge level: K1
  - expected value: User can archive tasks: todo task delete <id> sets deleted_at; can still query archived tasks
  - notes: No hard delete in MVP; archiving is reversible conceptually (even if no unarchive command yet)

- WI-RM002-009: Write comprehensive task tests
  - type: chore
  - suggested knowledge level: K2
  - expected value: Task repository and service layer have greater than 80% test coverage
  - notes: Test CRUD, filtering, soft delete, status transitions, priority defaults

**Open questions:** 
- Should the user be able to unarchive a task? (Deferred to post-MVP)
- Should completed tasks have a completion_at timestamp? (Deferred; using updated_at for now)

**Execution rationale:** Items should be completed in rough order: repository first, then commands, then tests. Tests can run in parallel with command development.

---

### RM-003: Project Management

**Goal:** Deliver project CRUD and task-project association. Users can organize tasks into optional projects.

**Related capabilities:**
- Project creation and persistence
- Project listing and filtering
- Task-project association
- Filtering tasks by project

**Project area / domain:** Core Domain, Project Management

**Impact:** Medium (MVP-important, but tasks work without projects)

**Risk:** Low (straightforward foreign key relationship)

**Suggested Knowledge Level:** K2

**Dependencies:** RM-001 (foundation), RM-002 (task management must be stable)

**Why this comes now:** Projects are optional, so feature work completes Tasks first. Project support is added once Tasks are proven.

**Candidate Work Items:**

- WI-RM003-001: Implement Project repository and service layer
  - type: feature
  - suggested knowledge level: K2
  - expected value: Project CRUD operations are tested; service layer ready
  - notes: ProjectRepository (create, findById, findAll, update, softDelete); ProjectService; test with Vitest

- WI-RM003-002: Add project creation command
  - type: feature
  - suggested knowledge level: K1
  - expected value: User can run todo project add "name" with optional description
  - notes: Parse CLI args, validate, persist, return confirmation with project ID

- WI-RM003-003: Add project listing command
  - type: feature
  - suggested knowledge level: K1
  - expected value: User can list projects: todo project list; table output format; exclude deleted
  - notes: Show project count or summary of associated tasks

- WI-RM003-004: Add project detail view command
  - type: feature
  - suggested knowledge level: K1
  - expected value: User can view full project with associated tasks: todo project show <id>
  - notes: Display all project fields and list of tasks in the project (excluding deleted tasks)

- WI-RM003-005: Add task-project association in task commands
  - type: feature
  - suggested knowledge level: K2
  - expected value: User can assign task to project on create/update: todo task add "..." --project <project_id>
  - notes: Validate project exists; allow null project_id (tasks don't require a project)

- WI-RM003-006: Enhance task list filtering by project
  - type: feature
  - suggested knowledge level: K2
  - expected value: User can filter tasks by project: todo task list --project <project_id>
  - notes: Can combine with status filter; still exclude completed tasks by default

**Open questions:**
- Should deleting a project also archive its tasks? (Current plan: no; tasks become orphaned)
- Should there be a bulk-assign-to-project command? (Deferred to post-MVP)

**Execution rationale:** Project work can proceed in parallel with Task work once foundation is complete. Order within RM-003 items is flexible as long as repository is tested first.

---

## Suggested Execution Order

1. **Phase 1: Foundation** → Complete RM-001 fully (4 items, must be sequential)
2. **Phase 2: Core Features** → Complete RM-002 fully (9 items, parallelizable after repository work)
3. **Phase 3 (Optional): Project Management** → Complete RM-003 fully (6 items, can parallelize)

**Critical path:** RM-001 → RM-002 Task Repository → RM-002 Commands (parallel) → Testing

---

## Risks and Constraints

| Risk | Severity | Mitigation |
|------|----------|-----------|
| Soft delete queries become complex | Medium | Document filtering pattern; centralize in repository |
| SQLite file gets corrupted | Low | Use better-sqlite3 properly; document backup strategy post-MVP |
| CLI output formatting inconsistencies | Low | Create shared formatting utilities; use consistent table library |
| Scope creep (features deferred to post-MVP get requested) | Medium | Maintain "Not Now" list; document rationale for each deferral |

---

## Not Now (Post-MVP Candidates)

These features were explicitly deferred and documented:

- Due dates
- Tags and custom metadata
- Search and advanced filtering
- Bulk operations
- Task templates
- Recurring tasks
- Web interface or API
- Authentication and multi-user
- Comments and attachments
- Unarchive / recovery UI

---

## Next Recommended Work Item

**Start here:** `WI-RM001-001: Initialize TypeScript CLI project`

Run: `kaddo create feature --from roadmap` (or `kaddo create chore --from roadmap`)

This will present the first candidate work item and guide the work-item-agent to formalize it into a work item.
