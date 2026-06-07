---
type: chore
id: WI-001
title: "Initialize TypeScript CLI project"
knowledge_level: K1
status: completed
phase: now
initiative: "Project Foundation"
domains:
  - cli
  - repository-foundation
code:
  - package.json
  - pnpm-lock.yaml
  - pnpm-workspace.yaml
  - tsconfig.json
  - vitest.config.ts
  - .eslintrc.js
  - .prettierrc
  - .gitignore
  - .nvmrc
  - README.md
  - src/**
  - data/.gitkeep
created_at: 2026-06-07
ready_at: 2026-06-07
completed_at: 2026-06-07
source: roadmap
source_id: WI-RM001-001
source_initiative: RM-001
summary: "Project needs TypeScript setup, tooling, and folder structure configured"
---

# Initialize TypeScript CLI Project

> Type: chore - Level: K1 - Status: completed

## Source

- Source: roadmap
- Candidate: WI-RM001-001
- Initiative: RM-001 - Project Foundation

## Problem

The project required TypeScript compilation setup, build tooling configuration, and development environment initialization before feature development could begin.

## Expected Result

- TypeScript compiles cleanly in strict mode.
- Build, test, lint, and development scripts execute successfully.
- Project folder structure matches the defined architecture for WI-001 scope.
- The CLI entrypoint is runnable and intentionally minimal.

## Knowledge Level

K1 - Standard Node.js + TypeScript tooling with no new architectural decisions. Technology choices were already decided in ADR-001, and the intended structure was defined in `knowledge/tech/codebase.md`.

## Context From Roadmap

This candidate was created from the roadmap initiative RM-001 - Project Foundation.

Related capabilities:

- Project setup and configuration
- CLI Interaction
- Testability

Domain:

- Infrastructure
- Tooling
- CLI foundation

Impact: High

Risk: Low

Dependencies:

- None

## Acceptance Criteria

1. [x] `package.json` created with Node.js CLI package metadata, Commander.js, TypeScript, tsx, Vitest, ESLint, Prettier, and the confirmed stack dependencies.
2. [x] `tsconfig.json` configured with strict mode enabled and `outDir` pointing to `dist/`.
3. [x] Minimal folders exist for `src/cli`, `src/cli/commands`, `src/modules/tasks`, `src/modules/projects`, `src/database`, `src/database/migrations`, `src/shared`, `knowledge/`, and `data/`.
4. [x] Build script compiles TypeScript to `dist/` without errors.
5. [x] Dev script runs the base CLI help without errors.
6. [x] `.gitignore` excludes `node_modules/`, `dist/`, `.env`, OS-specific files, logs, coverage, and SQLite runtime files.
7. [x] ESLint config exists and `pnpm run lint` passes.
8. [x] Prettier config exists without requiring an undeclared external config package.
9. [x] `README.md` documents setup, build, development, test, lint, and current CLI availability.
10. [x] `pnpm run lint` passes.
11. [x] TypeScript strict mode compiles without errors.

## Out of Scope

- Task commands.
- Project commands.
- SQLite connection or migrations.
- Domain models, services, or repositories.
- GitHub Actions workflows or CI/CD.
- API or backend integration.
- Docker setup or containerization.
- JSON CLI output.

## Validation

- [x] `corepack pnpm install`
- [x] `corepack pnpm run build`
- [x] `corepack pnpm test`
- [x] `corepack pnpm run lint`
- [x] `corepack pnpm dev`

Validation notes:

- `corepack pnpm install` completed successfully after `pnpm-workspace.yaml` was corrected to declare the root package.
- `corepack pnpm test` passed 1 test file with 3 tests.
- `corepack pnpm dev` prints the base `todo` help output and exits successfully.
- Node installed in the local environment is `v24.13.0`; the project declares Node 22 LTS via `.nvmrc` and `package.json` engines.
- Vitest emitted a deprecation warning for the CJS build of Vite's Node API. Tests still passed.

## Definition of Done

- [x] `package.json` created with correct scripts and dependencies.
- [x] `tsconfig.json` created with strict mode and correct paths.
- [x] `.gitignore` created with Node.js and IDE exclusions.
- [x] Folder structure scaffolded per WI-001 scope.
- [x] ESLint config file created and working.
- [x] Prettier config file created and working.
- [x] `pnpm install` succeeds through Corepack.
- [x] `pnpm build` succeeds with no errors.
- [x] `pnpm dev` starts without error and shows CLI help.
- [x] `pnpm run lint` passes.
- [x] TypeScript strict mode enabled and verified.
- [x] README.md updated with setup and development instructions.
- [x] Branch exists: `feature/wi-001-project-scaffold`.
- [ ] Commit created.
- [ ] PR opened.
- [x] Build, test, lint, and TypeScript compilation pass.

## Open Questions & Assumptions

- The CLI binary name is `todo`.
- Pre-commit hooks are deferred to a separate work item if needed.
- `.env.example` already exists and remains minimal.
- Single-package pnpm workspace is sufficient for this project.
- Build output includes source maps based on the existing TypeScript config.

## Suggested Ownership (Code Globs)

- `package.json`
- `pnpm-lock.yaml`
- `pnpm-workspace.yaml`
- `tsconfig.json`
- `vitest.config.ts`
- `.eslintrc.js`
- `.prettierrc`
- `.gitignore`
- `.nvmrc`
- `src/**`
- `data/.gitkeep`
- `README.md`

## Status History

- 2026-06-07 draft -> ready: Refinement complete.
- 2026-06-07 ready -> completed: WI-001 implemented and validated. Commit and PR were intentionally not performed because the human requested no automatic commit or push.

## Learning

- Corepack can run pnpm in this environment, but direct `pnpm` is not available in PATH.
- `pnpm-workspace.yaml` must include a `packages` field, even for a single-package workspace.
- The local runtime is Node 24, while project configuration targets Node 22 LTS.
