---
type: feat
id: WI-003
title: "Módulo de Gestión de Tareas"
knowledge_level: K2
status: draft
phase: now
initiative: "Foundational CLI TODO App"
domains: []
code: []
created_at: 2026-06-19
source: roadmap
source_id: WI-CANDIDATE-003
source_initiative: RM-001
summary: "Implementar la lógica del dominio, repositorio y servicio para gestionar tareas con persistencia en SQLite."
---

# Módulo de Gestión de Tareas

> Type: feat · Level: K2

## Source

- Source: roadmap
- Candidate: WI-CANDIDATE-003
- Initiative: RM-001 — Foundational CLI TODO App

## Problem

Para poder procesar, validar y almacenar tareas de acuerdo con las reglas de negocio (como el título obligatorio, los estados válidos `todo`, `in-progress` o `done`, y prioridades por defecto), requerimos de clases de servicio y repositorios desacoplados que realicen estas operaciones de persistencia en SQLite sin acoplamiento a la interfaz CLI.

## Expected Value

Implementación de la lógica del dominio, repositorio y servicio para crear, listar por estado, actualizar y archivar lógicamente tareas.

## Context From Roadmap

This candidate was created from the roadmap initiative RM-001.

**Related capabilities:** CLI Interaction, Task Management, Task Status Management, Project Management, Local Persistence

**Domain:** CLI, Tasks, Projects, Database

**Impact:** High

**Risk:** Low

**Dependencies:**
- WI-002: Base de Datos SQLite y Migraciones

## Acceptance Criteria

- Crear `src/modules/tasks/task.model.ts` definiendo la estructura e interfaces de la entidad Tarea (`Task`).
- Crear `src/modules/tasks/task.repository.ts` implementando el CRUD en SQLite: inserción de tareas, listados filtrados por estado o proyecto, actualización de campos específicos y archivado lógico (`soft delete` asignando el valor a `deleted_at`).
- Crear `src/modules/tasks/task.service.ts` implementando las validaciones y reglas de negocio: el título no debe ser vacío, validación de valores de prioridad (`low`, `medium`, `high`) y estado, y asignación de prioridad `medium` y estado `todo` por defecto al crear.
- El repositorio no debe realizar borrado físico (`DELETE FROM tasks`), sino actualizar la columna `deleted_at`.

## Risks

- Lógica de negocio mal implementada o ausencia de validación de entradas. Se mitiga implementando pruebas unitarias exhaustivas sobre `TaskService`.

## Notes

Desarrollar `task.model.ts`, `task.repository.ts` y `task.service.ts` con sus pruebas unitarias.

## Out of scope

- Implementación de comandos CLI o interacción directa por consola en este Work Item.

## Validation

1. Ejecutar pruebas unitarias para `TaskRepository` inyectando una base de datos en memoria para testear el guardado, recuperación y filtrado por estado.
2. Ejecutar pruebas unitarias para `TaskService` comprobando que arroja errores descriptivos cuando el título de la tarea es inválido o el estado no es uno de los permitidos.
3. Ejecutar `pnpm test` de forma local y confirmar cobertura.

## Definition of Done

- [x] El código del dominio y persistencia de tareas compila sin errores.
- [x] Las pruebas unitarias cubren los casos de éxito y de error de creación y soft delete.
- [x] La lógica es completamente independiente de la interfaz Commander.js.
