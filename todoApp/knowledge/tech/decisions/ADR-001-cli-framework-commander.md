---
id: ADR-001
title: Use Commander.js as the CLI framework
status: accepted
date: 2026-06-04
---

# ADR-001 — Use Commander.js as the CLI framework

## Status

Accepted

## Context

The project requires a CLI framework to define commands, parse arguments, handle flags, and display help output. Two candidates were evaluated:

- **Commander.js** — mature, widely adopted, imperative API, excellent documentation.
- **CAC** (Command And Conquer) — lightweight, minimal API, less common in the ecosystem.

The project is an example application designed to validate Kaddo's KDD workflow. Readability and familiarity matter more than minimal bundle size or advanced features.

## Decision

Use **Commander.js**.

## Reasons

- Widely known in the Node.js ecosystem — a Maintainer or Kaddo Evaluator can understand the CLI structure without learning a new library.
- Well-documented with clear examples that align with the command pattern used in this project (`todo task add`, `todo project list`).
- Supports subcommands natively, which maps directly to the `todo <resource> <action>` structure defined in `codebase.md`.
- No significant downside for a project of this size and scope.

## Consequences

- All CLI commands are defined using Commander's `Command` API.
- The `todo` binary entry point creates a root `Command` and registers subcommand groups (`task`, `project`).
- If the project were to grow into a very large CLI tool, Commander's imperative style could become verbose — but that scenario is out of scope for v1.

## References

- `knowledge/tech/codebase.md` — Initial CLI Commands
- `WI-001` — Initialize TypeScript CLI project
