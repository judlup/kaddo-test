---
type: feature
id: WI-003
title: "Crear modelo y persistencia de tareas"
knowledge_level: K3
status: completed
phase: now
initiative: "Gestion de tareas"
domains:
  - Tasks
  - Local Persistence
code:
  - src/modules/tasks/**
  - src/database/migrations/**
  - tests/modules/tasks/**
  - tests/database/**
created_at: 2026-06-09
updated_at: 2026-06-09
source: roadmap
source_id: WI-CANDIDATE-003
source_initiative: RM-002
summary: "Crear el modelo de tareas, su migracion SQLite y una capa de persistencia testeada sin exponer todavia comandos CLI."
---

# Crear modelo y persistencia de tareas

> Type: feature - Level: K3

## Source

- Source: roadmap
- Candidate: WI-CANDIDATE-003
- Initiative: RM-002 - Gestion de tareas

## Problem

El producto necesita persistir tareas con las reglas confirmadas del MVP antes de poder implementar comandos CLI de gestion de tareas.

## Expected Result

Existe un modelo de Task, una migracion SQLite para almacenar tareas y una capa de persistencia testeada que permite crear, leer y actualizar registros de tareas sin implementar todavia comandos CLI ni services de negocio.

## Suggested Knowledge Level

K3. El trabajo introduce el primer modelo de dominio real del MVP, una tabla SQLite de producto y reglas de persistencia que deben mantenerse alineadas con ADR-002.

## Context From Roadmap

Este work item viene de `WI-CANDIDATE-003`.

**Related capabilities:** Task Management, Task Status Management, Basic Task Filtering, Local Persistence

**Domain:** Tasks

**Impact:** High

**Risk:** Medium

**Dependencies:**

- WI-001 completado: base TypeScript CLI.
- WI-002 completado: conexion SQLite y runner de migraciones.
- ADR-002: alcance funcional del MVP.
- `knowledge/tech/codebase.md`.

## Acceptance Criteria

- Existe un modelo TypeScript para Task bajo `src/modules/tasks/**`.
- El modelo define los campos confirmados del MVP:
  - `id`
  - `title`
  - `description`
  - `status`
  - `priority`
  - `project_id`
  - `created_at`
  - `updated_at`
  - `completed_at`
  - `deleted_at`
- `title` es obligatorio.
- `description` es opcional.
- `status` solo acepta `todo`, `in-progress` y `done`.
- `priority` solo acepta `low`, `medium` y `high`.
- `priority` usa `medium` como valor por defecto.
- `project_id` es nullable porque las tareas pueden existir sin proyecto.
- Existe una migracion SQLite para crear la tabla `tasks`.
- La migracion de `tasks` se integra con el runner creado en WI-002.
- La migracion es idempotente cuando se ejecuta varias veces a traves del runner.
- La tabla `tasks` incluye `completed_at` y `deleted_at`.
- No se crea tabla `projects` en este work item.
- `project_id` puede existir como columna nullable, pero no debe depender de una tabla `projects` inexistente.
- Existe una capa repository o equivalente de persistencia para tareas bajo `src/modules/tasks/**`.
- La capa de persistencia permite crear una tarea con valores minimos y aplicar defaults.
- La capa de persistencia permite obtener una tarea por `id`.
- La capa de persistencia permite actualizar campos persistibles de una tarea.
- La capa de persistencia no expone comandos CLI ni salida de usuario.
- Existen tests que validan schema, defaults, restricciones de status/priority y operaciones basicas de persistencia.

## Out of scope

- Implementar comandos CLI de `todo task`.
- Implementar `task list`, filtros, formato tabla o salida de usuario.
- Implementar service de tareas con reglas de caso de uso.
- Implementar marcado de tarea como done desde CLI.
- Implementar soft delete desde CLI.
- Crear tabla `projects`.
- Crear repository, model o service de proyectos.
- Agregar foreign key real hacia `projects` antes de que exista la tabla de proyectos.
- Implementar salida JSON.
- Cambiar el stack tecnico o introducir ORM.

## How to test it (validation)

1. `corepack pnpm build`
2. `corepack pnpm lint`
3. `corepack pnpm test`
4. Ejecutar tests especificos de tareas si existen, por ejemplo `corepack pnpm test tests/modules/tasks`.
5. Verificar manualmente que no se agregaron comandos CLI de dominio.
6. Verificar manualmente que no se creo tabla `projects`.
7. `kaddo scan`
8. `kaddo owners suggest`
9. `kaddo guard`
10. `kaddo explain`

## Definition of Done

- El modelo Task queda definido con tipos explicitos.
- La migracion `tasks` queda integrada al flujo de migraciones existente.
- Las pruebas de tareas y migraciones pasan.
- No se implementa ningun comando CLI de dominio.
- No se implementa la persistencia de proyectos.
- El ownership de WI-003 usa globs especificos y no cubre todo `src/**`.
- El conocimiento afectado se actualiza si cambia la estructura real.

## Implementation Result

- Se agrego la migracion `0002_tasks` e integracion en `baseMigrations`.
- Se creo la tabla `tasks` con `title`, `description`, `status`, `priority`, `project_id`, `created_at`, `updated_at`, `completed_at` y `deleted_at`.
- Se agregaron restricciones SQLite para `status` (`todo`, `in-progress`, `done`) y `priority` (`low`, `medium`, `high`).
- Se mantuvo `project_id` nullable sin foreign key hacia `projects`.
- Se agrego modelo TypeScript de Task con tipos explicitos.
- Se agrego `TaskRepository` con create, getById y update.
- El repository expone API camelCase y mapea internamente a columnas snake_case.
- Los timestamps se generan en TypeScript.
- No se crearon tablas `projects`.
- No se implementaron services, comandos CLI de dominio, filtros ni salida de usuario.

## Validation Result

- `corepack pnpm build`: paso.
- `corepack pnpm lint`: paso.
- `corepack pnpm test`: paso, 5 test files y 11 tests passing.
- Verificacion manual: `src/cli/commands` sigue sin comandos de dominio.
- Verificacion manual: no se encontro `CREATE TABLE projects`.
- `kaddo scan`: no ejecutado en esta sesion; `kaddo` no esta disponible en PATH.
- `kaddo owners suggest`: no ejecutado en esta sesion; `kaddo` no esta disponible en PATH.
- `kaddo guard`: no ejecutado en esta sesion; `kaddo` no esta disponible en PATH.
- `kaddo explain`: no ejecutado en esta sesion; `kaddo` no esta disponible en PATH.

## Risks

- Crear `project_id` antes de la tabla `projects` puede tentar a agregar una foreign key prematura.
- Mezclar repository con services o CLI haria crecer el work item mas alla de su alcance.
- Las reglas de `status` y `priority` deben estar duplicadas lo menos posible entre TypeScript y SQLite.

## Assumptions

- La tabla `tasks` puede incluir `project_id` nullable sin foreign key hasta que se implemente la tabla `projects`.
- La capa de persistencia puede usar `better-sqlite3` directo.
- Los timestamps pueden almacenarse como texto ISO o formato SQLite consistente, siempre que los tests lo documenten.
- La logica de casos de uso se refinara en work items posteriores.

## Decisions

- Los timestamps se generan en TypeScript.
- El repository expone nombres camelCase y mapea internamente a columnas snake_case.

## Open Questions

- Ninguna bloqueante para este work item.

## Suggested ownership (code globs)

- `src/modules/tasks/**`
- `src/database/migrations/**`
- `tests/modules/tasks/**`
- `tests/database/**`

## Handoff

Cuando este work item sea aprobado para construccion, el siguiente agente recomendado es `implementation-agent`.
