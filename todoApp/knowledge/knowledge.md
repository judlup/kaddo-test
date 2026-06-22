---
type: current-state
updated_at: 2026-06-08
---

# todoApp - Knowledge

> Lo que es verdadero sobre el producto ahora.

## Purpose

todoApp es una aplicacion CLI local para gestionar tareas y proyectos, respaldada por SQLite.

El proyecto sirve como ejemplo pequeno para validar el flujo de Kaddo: definir negocio, producto, arquitectura, roadmap, work items e implementacion de forma trazable.

## Architecture overview

La arquitectura prevista es una aplicacion Node.js con TypeScript y Commander.js para la interfaz CLI.

La logica de negocio vivira en services, el acceso a datos en repositories y la persistencia local en SQLite mediante better-sqlite3.

Componentes previstos:

- CLI: comandos de tareas y proyectos.
- Tasks: modelo, service y repository de tareas.
- Projects: modelo, service y repository de proyectos.
- Database: conexion SQLite y migraciones.
- Shared: tipos, errores y constantes compartidas.

## Key domains

- Tasks: creacion, listado, consulta, actualizacion, completado y archivo de tareas.
- Projects: creacion, listado y consulta de proyectos.
- Local Persistence: almacenamiento SQLite local.
- CLI Interaction: experiencia de usuario desde terminal con texto o tabla simple.

## Active constraints

- El MVP es CLI-only.
- El MVP debe funcionar localmente sin servicios externos.
- No habra autenticacion, web, API, equipos, roles, notificaciones ni colaboracion.
- No habra due dates ni tags en el MVP.
- No habra salida JSON en el MVP.
- Las tareas pueden existir sin proyecto; `project_id` es opcional.
- La prioridad es obligatoria y usa `low`, `medium` o `high`; el valor por defecto es `medium`.
- Los estados validos son `todo`, `in-progress` y `done`.
- `task list` oculta tareas completadas por defecto.
- Las tareas completadas pueden verse con `--all` o `--status done`.
- Delete es soft delete/archive mediante `deleted_at`; no habra hard delete en el MVP.
- El stack confirmado es Node.js, TypeScript, pnpm, Commander.js, SQLite, better-sqlite3 y Vitest.

## Current delivery state

- La base tecnica del proyecto CLI ya esta inicializada.
- Existen `package.json`, `tsconfig.json`, `vitest.config.ts`, estructura inicial `src/` y una prueba minima.
- La CLI minima usa Commander.js y muestra ayuda/version sin comandos de dominio reales.
- La persistencia SQLite base usa `better-sqlite3`, una ruta default `data/app.sqlite`, foreign keys activadas y una tabla tecnica de migraciones.
- La persistencia inicial de tareas incluye tabla `tasks`, modelo TypeScript y repository sin exponer comandos CLI.
- El roadmap contiene candidatos parseables para `kaddo create --from roadmap`.
- ADR-001 define el stack tecnico aceptado.
- ADR-002 define el alcance funcional del MVP.
- `kaddo scan`, `kaddo owners suggest`, `kaddo guard` y `kaddo explain` ya se ejecutaron correctamente despues de inicializar la base TypeScript CLI.
- Kaddo detecta TypeScript, pnpm y `src/` como directorio fuente.
- WI-001 esta completado.
- WI-002 esta completado: configurar persistencia SQLite base.
- WI-003 esta completado: crear modelo y persistencia de tareas.
