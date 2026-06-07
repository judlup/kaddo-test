# todoApp

A simple CLI task manager built with Node.js, TypeScript, and SQLite.

## MVP Scope

- Create, read, update, and delete tasks via CLI
- Organize tasks into optional projects
- Task priority levels: low, medium, high
- Task status tracking: todo, in-progress, done
- Completed tasks hidden by default
- Local SQLite persistence (no external services)

This repository is currently at the project foundation stage. Task, project, and database behavior are planned but not implemented yet.

## Tech Stack

- **Runtime:** Node.js 22 LTS
- **Language:** TypeScript
- **CLI Framework:** Commander.js
- **Database:** SQLite with better-sqlite3
- **Package Manager:** pnpm
- **Testing:** Vitest

## Development Setup

### Prerequisites

- Node.js 22+ (or use `nvm use` / `fnm use` with `.nvmrc`)
- pnpm

### Installation

```bash
# Install dependencies
pnpm install

# Build the project
pnpm build

# Run the CLI help in development mode
pnpm dev

# Run tests
pnpm test

# Run linter
pnpm lint

# Format code
pnpm format
```

## Project Structure

```
src/
  cli/                # CLI commands and entry point
    index.ts
  modules/
    tasks/            # Task domain (models, services, repos)
    projects/         # Project domain (models, services, repos)
  database/           # Database connection and migrations
  shared/             # Shared utilities, types, constants, errors

knowledge/            # Kaddo knowledge layer (business, product, tech, delivery)

data/                 # SQLite database files
  app.sqlite
```

## Available Commands

```bash
todo --help           # Show help
todo --version        # Show version
```

## Documentation

- **Business:** `knowledge/business/business.md`
- **Product:** `knowledge/product/product.md`
- **Architecture:** `knowledge/tech/codebase.md` and ADRs
- **Roadmap:** `knowledge/delivery/roadmap.md`

## Development Workflow

1. Create a feature branch: `git checkout -b feature/wi-NNN-description`
2. Make changes and commit with conventional commits: `git commit -m "feat(domain): description"`
3. Run tests: `pnpm test`
4. Build and lint: `pnpm build && pnpm lint`
5. Push and create a PR

## License

MIT
