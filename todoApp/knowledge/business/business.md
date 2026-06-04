---
type: business
status: active
updated_at: 2026-06-04
---

# Business

## Problem

Developers often start new projects by writing code before clarifying intent, product scope, architecture, and roadmap.

This project exists as a small, concrete example to validate how Kaddo helps transform an initial idea into structured project knowledge — and how that knowledge drives development decisions.

## Users

### Developer (primary)
A developer who wants to manage tasks locally from the terminal. Needs a fast, simple CLI that works offline without setup friction.

### Kaddo Evaluator (primary)
A person assessing Kaddo's workflow. Their goal is to observe whether a real project — even a small one — benefits from defining business intent, product scope, and architecture before writing code. The traceability from this file to the codebase is the product they are evaluating.

### Maintainer
A person reviewing or extending the project later. Needs to understand why decisions were made, not just what the code does.

## Value Proposition

A small, realistic CLI TODO app that demonstrates Kaddo's Knowledge Driven Development (KDD) workflow end-to-end:

> Business intent → Product scope → Architecture → Roadmap → Work items → Code

The domain is intentionally simple so the focus stays on the process, not the application complexity.

## Business Rules

- A task must have a title.
- A task must have a status: `todo`, `in-progress`, or `done`.
- A task must have a priority: `low`, `medium`, or `high`. Default is `medium`.
- A task may optionally belong to a project.
- A project may contain multiple tasks.
- Deleting a task uses soft delete (`deleted_at`). Tasks are never physically removed in the MVP.
- Completed tasks (`status = done`) are stored permanently for historical reference.
- The app must work offline without external services.

## Constraints

- CLI-only interface in the MVP.
- Local SQLite persistence only.
- No authentication, teams, roles, or multi-user support.
- No external service dependencies.
- Must stay small enough to be useful as a Kaddo example.

## Decisions

| # | Decision | Rationale |
|---|----------|-----------|
| 1 | Projects are optional (`project_id` nullable) | Reduces friction for simple task creation |
| 2 | Soft delete via `deleted_at` | Preserves history; aligns with business rule on completed tasks |
| 3 | Priority included in MVP (low/medium/high, default medium) | Adds real domain value without complexity |
| 4 | Task list hides `done` tasks by default | Reduces noise; `--all` or `--status done` reveals them |
| 5 | Statuses: `todo`, `in-progress`, `done` | Minimal, unambiguous lifecycle |
| 6 | JSON output excluded from MVP | Out of scope for a Kaddo validation demo |

## Open Questions

- Should tasks support tags in a future version?
- Should tasks support due dates in a future version?
