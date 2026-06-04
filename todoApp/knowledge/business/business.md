---

type: business
status: draft
-------------

# Business

## Problem

Developers often start new projects by creating code before clarifying the problem, product scope, technical foundation, roadmap, and work items.

This project exists as a small example to validate how Kaddo helps transform an initial idea into structured project knowledge before and during development.

## Users

### Developer

A person building the example app. Their goal is to use a simple project to validate Kaddo’s flow from business intent to codebase and work items.

### Maintainer

A person reviewing or evolving the project. Their goal is to understand why the app exists, what it does, and how it should evolve.

### Kaddo Evaluator

A person testing Kaddo. Their goal is to observe whether Kaddo helps organize knowledge, guide development, and reduce ambiguity.

## Value Proposition

The project provides a small, realistic, and easy-to-understand CLI TODO app that can be used to validate Kaddo’s Knowledge Driven Development workflow.

It keeps the domain intentionally simple so the focus remains on the relationship between business intent, product scope, codebase structure, roadmap, work items, and development decisions.

## Business Rules

- A task must have a title.
- A task can have a description.
- A task must have a status (`todo`, `in-progress`, `done`).
- A task must have a priority (`low`, `medium`, `high`). Default is `medium`.
- A task may belong to a project. Projects are optional — tasks can exist without one.
- A project can contain multiple tasks.
- Completed tasks remain stored for historical reference and are hidden from default listings.
- Deleted tasks are soft-deleted (`deleted_at` timestamp) and hidden from all normal listings. Data is not permanently removed.
- The app should work locally without external services.

## Constraints

- The app must remain simple.
- The first version must be CLI-only.
- The first version must use SQLite for local persistence.
- The first version must not include authentication.
- The first version must not include teams, roles, workspaces, notifications, or collaboration.
- The project should be useful as an example for validating Kaddo.

## Assumptions

- A small CLI app is enough to validate the Kaddo workflow.
- SQLite is enough for local persistence.
- Users will run the app locally.
- The main value is not the TODO app itself, but the traceability of how it is defined and built.
- The project may evolve later, but only after validating the initial flow.

## Decisions

- **Projects in MVP:** Yes, but optional. `project_id` is nullable. Tasks can exist without a project.
- **Priority in MVP:** Yes. Values: `low`, `medium`, `high`. Default: `medium`.
- **Completed tasks visibility:** Hidden from default `task list`. Use `--all` or `--status done` to include them.
- **Delete strategy:** Soft delete. Tasks get a `deleted_at` timestamp and are excluded from all normal listings. No permanent removal in v1.
- **CLI output format:** Plain text / table only. JSON output is deferred to a future iteration.
- **Task status values:** `todo`, `in-progress`, `done`.

## Open Questions

- Should tasks support tags in a future version?
- Should tasks support due dates in a future version?

