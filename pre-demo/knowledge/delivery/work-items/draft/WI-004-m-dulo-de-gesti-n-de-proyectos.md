---
type: feat
id: WI-004
title: "Módulo de Gestión de Proyectos"
knowledge_level: K2
status: draft
phase: now
initiative: "Foundational CLI TODO App"
domains: []
code: []
created_at: 2026-06-19
source: roadmap
source_id: WI-CANDIDATE-004
source_initiative: RM-001
summary: "Implementar la lógica del dominio, repositorio y servicio para la creación y gestión de proyectos y su relación con las tareas."
---

# Módulo de Gestión de Proyectos

> Type: feat · Level: K2

## Source

- Source: roadmap
- Candidate: WI-CANDIDATE-004
- Initiative: RM-001 — Foundational CLI TODO App

## Problem

Para permitir al usuario organizar y agrupar tareas relacionadas dentro de contextos temáticos amplios (Proyectos), requerimos desarrollar clases de dominio, repositorio y servicio que puedan crear y listar proyectos, además de permitir la asignación opcional de tareas a proyectos mediante integridad relacional en SQLite.

## Expected Value

Implementación de la lógica para crear, listar y asociar proyectos a las tareas de manera consistente en la capa de negocio.

## Context From Roadmap

This candidate was created from the roadmap initiative RM-001.

**Related capabilities:** CLI Interaction, Task Management, Task Status Management, Project Management, Local Persistence

**Domain:** CLI, Tasks, Projects, Database

**Impact:** High

**Risk:** Low

**Dependencies:**
- WI-002: Base de Datos SQLite y Migraciones
- WI-003: Módulo de Gestión de Tareas

## Acceptance Criteria

- Crear `src/modules/projects/project.model.ts` con la estructura del tipo `Project`.
- Crear `src/modules/projects/project.repository.ts` implementando el guardado y consulta de proyectos en SQLite.
- Crear `src/modules/projects/project.service.ts` implementando la regla de negocio de que el nombre del proyecto es obligatorio y no puede estar en blanco.
- Asegurar que la creación o actualización de tareas admita asociar un `project_id` válido, verificando que dicho proyecto exista previamente en la base de datos.

## Risks

- Intentar asignar tareas a un `project_id` inexistente si no se implementa la validación de claves foráneas. Se mitiga activando soporte de foreign keys en SQLite y validándolo a nivel del `TaskService` o base de datos.

## Notes

Desarrollar `project.model.ts`, `project.repository.ts` y `project.service.ts`.

## Out of scope

- Comandos CLI para proyectos en este Work Item (se maneja en el WI de comandos).

## Validation

1. Ejecutar pruebas unitarias que verifiquen que un proyecto no se puede crear con nombre vacío.
2. Ejecutar pruebas unitarias que validen la correcta asociación de tareas a un proyecto existente (e.g. consultar tareas de un proyecto y obtener las asignadas).
3. Verificar que se arroje un error si se intenta asociar una tarea a un proyecto inexistente.

## Definition of Done

- [x] Los servicios de proyectos compilan sin errores.
- [x] Las pruebas unitarias garantizan el funcionamiento e integridad relacional de proyectos y tareas.
- [x] El linter de TypeScript corre limpio.
