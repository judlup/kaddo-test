---
type: adr
id: adr-001
title: Technology Stack Selection
status: accepted
date: 2026-06-07
---

# ADR-001: Technology Stack Selection

## Context

todoApp is a CLI-based task management system designed to validate Kaddo's knowledge-driven development workflow. The technology selection must balance simplicity, maintainability, and ease of understanding for developers and evaluators.

## Decision

We have selected the following technology stack:

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Runtime | Node.js | Widely available, good CLI support, single-language full stack |
| Language | TypeScript | Type safety, self-documenting code, better IDE support |
| CLI Framework | Commander.js | Simple, lightweight, well-documented for small CLI apps |
| Database | SQLite | Local-first, no external services, trivial setup |
| Database Driver | better-sqlite3 | Synchronous API, simple for CLI workflows |
| Package Manager | pnpm | Fast, efficient, enforces strict dependency management |
| Testing | Vitest | Fast, modern, native TypeScript support, ESM-first |

## Rationale

### Node.js + TypeScript
- **Why not Python/Go?** Node.js aligns with common web developer workflows. TypeScript ensures code clarity without the complexity of a compiled language.
- **Single language ecosystem** keeps the project lean for learning purposes.

### Commander.js
- Minimal framework overhead ideal for a small CLI.
- Large ecosystem of examples and extensions if needed.

### SQLite + better-sqlite3
- **No external dependencies:** The database is a single file. Users don't need to install PostgreSQL, MySQL, or run containers.
- **Synchronous API:** Simpler mental model for a CLI tool. Async complexity is not needed for a single-threaded, synchronous command interface.

### pnpm
- Stricter dependency resolution prevents common "works on my machine" issues.
- Faster installations and smaller node_modules footprint.

### Vitest
- Native ESM and TypeScript support without extra transpilation.
- Fast test execution makes TDD more practical during development.

## Consequences

### Positive
- ✅ **Simplicity:** No Docker, no external services, no infrastructure complexity.
- ✅ **Fast feedback:** Quick CLI testing and rapid iteration.
- ✅ **Understandability:** Clear layering (CLI → Service → Repository → Database) makes the codebase easy to review.
- ✅ **Portability:** Runs on any machine with Node.js installed.

### Negative
- ⚠️ **Scale limitations:** SQLite is not suitable for concurrent multi-user access. This is acceptable for MVP; future scalability would require architecture changes.
- ⚠️ **Synchronous database access:** Blocks the event loop. Not suitable for async/concurrent workloads, but acceptable for CLI workflows.

## Alternatives Considered

### Alternative 1: Python + Click
- **Pro:** Python is familiar to many developers.
- **Con:** Adds another language to the repository. Kaddo example benefits from single-language simplicity.

### Alternative 2: Go
- **Pro:** Single static binary, blazing fast.
- **Con:** Compiled language adds complexity to local development and is less accessible to evaluators unfamiliar with Go.

### Alternative 3: PostgreSQL + Drizzle ORM
- **Pro:** Scales to concurrent users.
- **Con:** Requires external database setup, violates "local-first" principle. Too complex for a validation project.

## Validation

This decision will be validated by:
1. Successfully building all MVP features with this stack.
2. Demonstrating that the codebase remains understandable and maintainable.
3. Confirming that the project works on different machines without setup friction.

## Related Decisions

- **Layered Architecture:** CLI commands are thin; business logic lives in services.
- **Domain-Driven Structure:** Modules organized by domain concepts (Tasks, Projects), not by framework layers.
- **Soft Delete:** Using `deleted_at` timestamp allows archived tasks to be recovered and maintains historical data.
