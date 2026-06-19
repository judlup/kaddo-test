---
type: feat
id: WI-006
title: "Comandos CLI para Gestión de Proyectos"
knowledge_level: K2
status: draft
phase: now
initiative: "Foundational CLI TODO App"
domains: []
code: []
created_at: 2026-06-19
source: roadmap
source_id: WI-CANDIDATE-006
source_initiative: RM-001
summary: "Integrar los comandos CLI de proyectos en Commander.js, conectándolos con el servicio de proyectos para gestionar agrupaciones de tareas."
---

# Comandos CLI para Gestión de Proyectos

> Type: feat · Level: K2

## Source

- Source: roadmap
- Candidate: WI-CANDIDATE-006
- Initiative: RM-001 — Foundational CLI TODO App

## Problem

Para que el usuario final pueda crear agrupaciones lógicas de trabajo (Proyectos) y clasificar sus tareas desde la interfaz de la terminal, requerimos agregar comandos específicos de proyectos a Commander.js que invoquen a nuestro `ProjectService` y presenten de forma ordenada la información.

## Expected Value

Integración de comandos CLI para proyectos (`todo project add`, `todo project list` y `todo project show <id>`) funcionando desde la CLI.

## Context From Roadmap

This candidate was created from the roadmap initiative RM-001.

**Related capabilities:** CLI Interaction, Task Management, Task Status Management, Project Management, Local Persistence

**Domain:** CLI, Tasks, Projects, Database

**Impact:** High

**Risk:** Low

**Dependencies:**
- WI-004: Módulo de Gestión de Proyectos
- WI-005: Comandos CLI para Gestión de Tareas

## Acceptance Criteria

- Crear `src/cli/commands/project.commands.ts` y registrarlo en la CLI principal.
- Implementar los siguientes subcomandos:
  - `todo project add "<name>" [--desc "<description>"]`
  - `todo project list` (muestra listado básico con ID, nombre y descripción).
  - `todo project show <id>` (muestra detalles del proyecto e imprime la lista de tareas asociadas a este proyecto).
- Asegurar el formateo en español y manejo amigable de errores.

## Risks

- Confusión al intentar asociar tareas mediante un ID de proyecto inválido. Se mitiga validando la existencia del proyecto en `todo project show` y en la creación de tareas.

## Notes

Implementar `project.commands.ts`.

## Out of scope

- Autenticación o sincronización remota de proyectos.

## Validation

1. Compilar y enlazar localmente el proyecto CLI.
2. Ejecutar `todo project add "Estudios" --desc "Tareas de la universidad"`.
3. Ejecutar `todo project list` y validar que se incluye el proyecto "Estudios".
4. Crear una tarea vinculada: `todo task add "Estudiar Álgebra" --project 1`.
5. Ejecutar `todo project show 1` y verificar que la tarea "Estudiar Álgebra" aparece listada bajo la sección de tareas del proyecto.

## Definition of Done

- [x] Los comandos CLI de proyectos están registrados y son funcionales.
- [x] El comando `project show <id>` lista adecuadamente las tareas asociadas.
- [x] Los textos y errores se presentan en español.
- [x] El linter de TypeScript corre limpio.
