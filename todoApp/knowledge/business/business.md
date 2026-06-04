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
- A task must have a status.
- A task may belong to a project.
- A project can contain multiple tasks.
- Completed tasks should remain stored for historical reference.
- Deleted tasks may be removed or archived depending on the selected implementation.
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

## Open Questions

- Should projects be included in the first version?
- Should tasks have priority?
- Should tasks support tags?
- Should completed tasks be hidden by default?
- Should delete mean hard delete or archive?
- Should CLI output support JSON for automation?