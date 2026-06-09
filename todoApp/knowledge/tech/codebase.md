---
type: codebase
status: draft
updated_at: 2026-06-08
---

# Codebase

> Base tecnica prevista del proyecto. Este archivo describe la estructura y decisiones de implementacion esperadas; no genera codigo.

## Repository Structure

El proyecto sera una aplicacion CLI simple respaldada por SQLite.

La estructura debe mantenerse pequena, entendible y alineada con las capacidades del producto.

```txt
src/
  cli/
    commands/
      task.commands.ts
      project.commands.ts

  modules/
    tasks/
      task.model.ts
      task.repository.ts
      task.service.ts

    projects/
      project.model.ts
      project.repository.ts
      project.service.ts

  database/
    connection.ts
    migrations/

  shared/
    errors.ts
    types.ts
    constants.ts

knowledge/
  business/
  product/
  tech/
  delivery/

data/
  app.sqlite

README.md
.env.example
package.json
```

## Confirmed Stack

- Runtime: Node.js
- Language: TypeScript
- Interface: CLI
- Database: SQLite
- Database access: better-sqlite3
- CLI framework: Commander.js
- Package manager: pnpm
- Testing: Vitest

## Quality Attributes

- Simplicidad: el proyecto debe ser facil de entender y modificar.
- Mantenibilidad: el codigo debe organizarse por capacidades de producto.
- Portabilidad: la app debe ejecutarse localmente sin servicios externos.
- Trazabilidad: las tareas y decisiones importantes deben poder inspeccionarse desde Kaddo.
- Testabilidad: la logica principal debe poder probarse sin ejecutar la CLI completa.
- Evolucion controlada: el codigo debe permitir crecimiento futuro, sin disenar API o web en el MVP.

## Development Standards

- Usar TypeScript.
- Mantener los comandos CLI delgados.
- Poner la logica de negocio en services.
- Poner el acceso a SQLite en repositories.
- Mantener conceptos de dominio simples y explicitos.
- Usar migraciones para cambios de base de datos.
- Mantener configuracion minima.
- Evitar abstracciones prematuras.
- Documentar decisiones importantes en los archivos de conocimiento Kaddo.

## Git Strategy

GitHub Flow + Conventional Commits + SemVer. La estrategia concreta debe seguir la configuracion de Kaddo del proyecto cuando exista.

Ejemplos de commits sugeridos para el futuro:

```txt
feat(tasks): add task creation command
feat(tasks): add task status update
feat(projects): add project creation command
docs(kaddo): update codebase foundation
chore(repo): configure typescript cli project
```

## Initial Modules

- CLI
- Tasks
- Projects
- Database
- Shared

## Initial Domain Entities

### Task

Representa una unidad de trabajo.

Campos previstos:

```txt
id
title
description
status
priority
project_id
created_at
updated_at
completed_at
deleted_at
```

Reglas:

- `title` es obligatorio.
- `description` es opcional.
- `status` debe ser `todo`, `in-progress` o `done`.
- `priority` debe ser `low`, `medium` o `high`.
- `priority` por defecto es `medium`.
- `project_id` es opcional / nullable.
- `completed_at` se usa cuando una tarea pasa a `done`.
- `deleted_at` se usa para soft delete / archive.

### Project

Representa un grupo de tareas relacionadas.

Campos previstos:

```txt
id
name
description
created_at
updated_at
```

Reglas:

- `name` es obligatorio.
- `description` es opcional.
- Un proyecto puede tener multiples tareas.
- Una tarea no esta obligada a pertenecer a un proyecto.

## Initial CLI Commands

```bash
todo task add "Create project brief"
todo task list
todo task list --all
todo task list --status done
todo task show <id>
todo task done <id>
todo task update <id>
todo task delete <id>

todo project add "Kaddo validation"
todo project list
todo project show <id>
```

## Confirmed MVP Decisions

- Projects entran en el MVP.
- Las tareas pueden existir sin proyecto.
- `project_id` debe ser opcional / nullable.
- Priority entra en el MVP.
- Valores de priority: `low`, `medium`, `high`.
- Valor por defecto de priority: `medium`.
- No habra due dates en el MVP.
- No habra tags en el MVP.
- Estados: `todo`, `in-progress`, `done`.
- Las tareas completadas se ocultan por defecto en `task list`.
- Las tareas completadas se pueden ver con `--all` o `--status done`.
- Delete sera soft delete / archive usando `deleted_at`.
- No habra hard delete en el MVP.
- La salida del CLI sera texto o tabla simple.
- No habra salida JSON en el MVP.

## Remaining Open Questions

- Definir el formato exacto de tabla simple para listados CLI.
- Definir si los proyectos se referencian por id numerico, nombre o ambos.

## Quality checklist

- [x] La estructura sigue negocio y producto, no un default de framework.
- [x] No se implementa codigo desde este archivo.
- [x] El stack confirmado es simple para un proyecto de ejemplo.
- [x] Los modulos iniciales mapean a capacidades de producto.
- [x] La app puede ejecutarse localmente sin servicios externos.
- [x] Las decisiones confirmadas del MVP estan reflejadas en la base tecnica.
