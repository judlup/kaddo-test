---
type: chore
id: WI-002
title: "Configurar persistencia SQLite base"
knowledge_level: K2
status: completed
phase: now
initiative: "Fundacion tecnica del proyecto CLI"
domains:
  - Local Persistence
code:
  - package.json
  - pnpm-lock.yaml
  - src/database/**
  - tests/database/**
created_at: 2026-06-08
updated_at: 2026-06-09
source: roadmap
source_id: WI-CANDIDATE-002
source_initiative: RM-001
summary: "Preparar la conexion local a SQLite y una estrategia minima de migraciones sin implementar todavia tablas de dominio."
---

# Configurar persistencia SQLite base

> Type: chore - Level: K2

## Source

- Source: roadmap
- Candidate: WI-CANDIDATE-002
- Initiative: RM-001 - Fundacion tecnica del proyecto CLI

## Problem

El proyecto ya tiene una base CLI TypeScript, pero todavia no cuenta con una capa tecnica para abrir una base SQLite local ni ejecutar migraciones controladas.

## Expected Result

La aplicacion queda preparada para usar SQLite con `better-sqlite3`, con una conexion local configurable, una estructura de migraciones base y pruebas que validen que la capa de database puede inicializarse sin depender de comandos de dominio.

## Suggested Knowledge Level

K2, porque el trabajo configura infraestructura local y convenciones tecnicas acotadas; no introduce todavia reglas de negocio de tareas o proyectos.

## Context From Roadmap

Este work item viene de `WI-CANDIDATE-002`.

**Related capabilities:** Local Persistence, Task Management, Project Management

**Domain:** Plataforma tecnica / repositorio

**Impact:** High

**Risk:** Medium

**Dependencies:**

- WI-001 completado.
- ADR-001: stack tecnico aceptado.
- ADR-002: alcance funcional del MVP.
- `knowledge/tech/codebase.md`.

## Acceptance Criteria

- `better-sqlite3` queda agregado como dependencia del proyecto.
- Existe una capa `src/database/` para crear o abrir una conexion SQLite local.
- La ruta de la base local tiene un default simple, por ejemplo `data/app.sqlite`, y puede ajustarse sin tocar logica de dominio.
- Existe una convencion inicial para migraciones bajo `src/database/migrations/`.
- Existe una forma tecnica de inicializar la base y registrar/aplicar migraciones base.
- Existen pruebas enfocadas en la capa de database, usando una base temporal o en memoria.
- Las pruebas verifican que la conexion puede abrirse y cerrarse correctamente.
- Las pruebas verifican que la inicializacion de migraciones es idempotente.
- No se crean todavia tablas finales de `tasks` ni `projects`.
- No se implementan repositories, services ni comandos CLI de tareas/proyectos.
- No se introduce ORM; se mantiene `better-sqlite3` directo como define ADR-001.

## Out of scope

- Implementar modelo, repository o service de tareas.
- Implementar modelo, repository o service de proyectos.
- Crear schema definitivo de `tasks` o `projects`.
- Implementar comandos CLI de database, tasks o projects.
- Agregar salida JSON.
- Agregar API, web, autenticacion o integraciones externas.
- Configurar CI remoto.

## How to test it (validation)

1. `corepack pnpm install`
2. `corepack pnpm build`
3. `corepack pnpm test`
4. Ejecutar cualquier test especifico de database si se agrega un script o ruta dedicada.
5. `kaddo scan`
6. `kaddo owners suggest`
7. `kaddo guard`
8. `kaddo explain`

## Definition of Done

- La capa base de SQLite compila.
- Las pruebas de database pasan.
- La inicializacion de database no crea funcionalidad de dominio fuera de este work item.
- El ownership de WI-002 usa globs especificos y no cubre todo `src/**`.
- `knowledge/knowledge.md` se mantiene sincronizado si cambia el estado tecnico real.
- El siguiente work item puede construir persistencia de tareas sobre esta base sin redefinir conexion o convencion de migraciones.

## Implementation Result

- Se agrego `better-sqlite3` como dependencia directa.
- Se agrego `@types/better-sqlite3` como dependencia de desarrollo.
- Se agrego script `lint` basado en TypeScript.
- Se creo configuracion de ruta default para SQLite en `src/database/config.ts`.
- Se creo modulo de conexion SQLite en `src/database/connection.ts`.
- Se habilito `PRAGMA foreign_keys = ON` por defecto.
- Se creo runner tecnico de migraciones en `src/database/migration-runner.ts`.
- Se creo migracion tecnica inicial `0001_database_metadata`.
- Se creo inicializador `initializeDatabase`.
- Se agregaron exports publicos de database en `src/database/index.ts`.
- Se agregaron tests de conexion y migraciones bajo `tests/database/**`.
- No se crearon tablas `tasks` ni `projects`.
- No se implementaron repositories, services, comandos CLI de dominio ni filtros.

## Validation Result

- `corepack pnpm build`: paso.
- `corepack pnpm lint`: paso.
- `corepack pnpm test`: paso, 3 test files y 5 tests passing.
- `npm.cmd rebuild better-sqlite3`: paso con permisos externos para descargar el binario precompilado.
- `kaddo scan`: no ejecutado en esta sesion; `kaddo` no esta disponible en PATH.
- `kaddo owners suggest`: no ejecutado en esta sesion; `kaddo` no esta disponible en PATH.
- `kaddo guard`: no ejecutado en esta sesion; `kaddo` no esta disponible en PATH.
- `kaddo explain`: no ejecutado en esta sesion; `kaddo` no esta disponible en PATH.

## Risks

- `better-sqlite3` usa dependencia nativa y puede requerir toolchain compatible durante instalacion.
- Una abstraccion demasiado amplia de database podria anticipar necesidades que todavia no existen.

## Assumptions

- La base de datos local por defecto vivira bajo `data/`.
- Las migraciones pueden comenzar con una tabla tecnica de control o equivalente minimo.
- La persistencia de tareas y proyectos se implementara en work items posteriores.

## Open Questions

- Ninguna bloqueante para este work item.

## Suggested ownership (code globs)

- `package.json`
- `pnpm-lock.yaml`
- `src/database/**`
- `tests/database/**`

## Handoff

Cuando este work item sea aprobado para construccion, el siguiente agente recomendado es `implementation-agent`.
