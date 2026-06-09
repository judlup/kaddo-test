---
type: work-item
id: WI-001
status: completed
source: WI-CANDIDATE-001
generated_by: work-item-agent
work_item_type: chore
knowledge_level: K2
title: Inicializar proyecto TypeScript CLI
created_at: 2026-06-08T00:00:00.000Z
updated_at: 2026-06-08T00:00:00.000Z
code:
  - src/cli/**
  - src/database/**
  - src/modules/**
  - src/shared/**
---

# Inicializar proyecto TypeScript CLI

**Problem:**

El repositorio no tiene una base tecnica ejecutable para desarrollar, compilar y probar el MVP CLI definido en ADR-001 y ADR-002.

**Expected result:**

El proyecto queda inicializado como una aplicacion CLI Node.js + TypeScript usando pnpm, Commander.js y Vitest, con estructura base alineada con `knowledge/tech/codebase.md` y sin implementar todavia comportamiento real de tareas, proyectos o persistencia SQLite.

**Suggested Knowledge Level:** K2

K2 es suficiente porque el trabajo define la base tecnica inicial y requiere coordinar tooling, estructura y scripts, pero no introduce reglas de dominio ni persistencia funcional.

**Context and references:**

- `knowledge/tech/adr-001-tech-stack.md`
- `knowledge/tech/adr-002-mvp-scope.md`
- `knowledge/tech/codebase.md`
- `knowledge/delivery/roadmap.md`

**Acceptance criteria:**

- Existe `package.json` con `pnpm` como package manager esperado.
- `package.json` incluye scripts minimos para desarrollo, build y test.
- El proyecto usa TypeScript y cuenta con configuracion `tsconfig.json`.
- El proyecto usa Vitest y cuenta con configuracion de pruebas.
- El proyecto usa Commander.js como framework CLI.
- Existe una entrada CLI minima en `src/` que puede ejecutarse o compilarse sin implementar comandos reales del dominio.
- Existe estructura inicial alineada con el codebase baseline:
  - `src/cli/`
  - `src/cli/commands/`
  - `src/modules/tasks/`
  - `src/modules/projects/`
  - `src/database/`
  - `src/database/migrations/`
  - `src/shared/`
- Existe al menos una prueba minima que verifique que la configuracion de Vitest funciona.
- La implementacion no agrega web, API, autenticacion, salida JSON, due dates, tags ni hard delete.
- La implementacion no crea todavia tablas, migraciones definitivas ni repositories de dominio.
- Si la estructura final difiere de `knowledge/tech/codebase.md`, el conocimiento afectado queda actualizado.

**Out of scope:**

- Implementar comandos reales de `todo task`.
- Implementar comandos reales de `todo project`.
- Crear el schema definitivo de SQLite.
- Implementar migraciones de tareas o proyectos.
- Implementar repositories, services o modelos completos de dominio.
- Implementar salida JSON.
- Configurar CI remoto.
- Publicar paquete npm.

**How to test it (validation):**

1. `pnpm install`
2. `pnpm build`
3. `pnpm test`
4. Ejecutar la CLI minima si el script existe, por ejemplo `pnpm dev -- --help` o el comando equivalente definido en `package.json`.
5. `kaddo scan`
6. `kaddo owners suggest`
7. `kaddo guard`

Si `kaddo` no esta disponible en el entorno local, documentar esa limitacion en el resultado de implementacion y ejecutar las validaciones tecnicas disponibles (`pnpm build` y `pnpm test`).

**Definition of Done:**

- La base TypeScript CLI compila correctamente.
- Las pruebas minimas pasan.
- La estructura inicial existe y esta lista para los siguientes work items.
- No se implementa funcionalidad de negocio fuera del alcance de este work item.
- Cualquier desviacion respecto a ADR-001, ADR-002 o `knowledge/tech/codebase.md` queda documentada.
- El siguiente work item puede comenzar sin volver a decidir stack, estructura base o tooling de pruebas.

**Implementation result:**

- Se creo la base Node.js + TypeScript con pnpm, Commander.js y Vitest.
- Se agrego una CLI minima con `--help` y `--version`.
- Se agrego estructura inicial `src/cli`, `src/modules`, `src/database` y `src/shared`.
- Se agrego una prueba minima para verificar la configuracion de Vitest.
- Se genero `pnpm-lock.yaml`.
- No se implementaron comandos de dominio, persistencia SQLite, migraciones ni salida JSON.

**Validation result:**

- `corepack pnpm install`: paso.
- `corepack pnpm build`: paso.
- `corepack pnpm test`: paso.
- `corepack pnpm dev -- --help`: paso.
- `kaddo scan`: no ejecutado; `kaddo` no esta disponible en PATH.
- `kaddo owners suggest`: no ejecutado; `kaddo` no esta disponible en PATH.
- `kaddo guard`: no ejecutado; `kaddo` no esta disponible en PATH.

**Open questions:**

- Ninguna abierta para este work item.

**Assumptions:**

- El entorno de desarrollo tendra Node.js y pnpm disponibles.
- La instalacion de dependencias puede requerir acceso a red.
- La configuracion inicial puede usar una CLI minima de ayuda/version, sin comandos de negocio.

**Suggested ownership (code globs):**

- `package.json`
- `pnpm-lock.yaml`
- `tsconfig.json`
- `vitest.config.*`
- `src/**`
- `tests/**`
- `knowledge/tech/codebase.md`

**Handoff:**

Cuando este work item sea aprobado para construccion, el siguiente agente recomendado es `implementation-agent`.
