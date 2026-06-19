---
type: feat
id: WI-005
title: "Comandos CLI para Gestión de Tareas"
knowledge_level: K2
status: draft
phase: now
initiative: "Foundational CLI TODO App"
domains: []
code: []
created_at: 2026-06-19
source: roadmap
source_id: WI-CANDIDATE-005
source_initiative: RM-001
summary: "Integrar los comandos CLI de tareas en Commander.js, conectándolos con el servicio de tareas para permitir el CRUD desde la terminal."
---

# Comandos CLI para Gestión de Tareas

> Type: feat · Level: K2

## Source

- Source: roadmap
- Candidate: WI-CANDIDATE-005
- Initiative: RM-001 — Foundational CLI TODO App

## Problem

Para permitir que los usuarios administren sus tareas de manera interactiva desde la terminal del sistema, requerimos mapear la entrada de línea de comandos del usuario (usando `Commander.js`) a llamadas correspondientes en nuestro `TaskService`, controlando y dando formato legible (de texto plano o tablas simples) a la salida.

## Expected Value

Integración de comandos CLI para permitir operaciones de tareas (`todo task add`, `todo task list`, etc.) desde la terminal con manejo correcto de parámetros y formato de salida.

## Context From Roadmap

This candidate was created from the roadmap initiative RM-001.

**Related capabilities:** CLI Interaction, Task Management, Task Status Management, Project Management, Local Persistence

**Domain:** CLI, Tasks, Projects, Database

**Impact:** High

**Risk:** Low

**Dependencies:**
- WI-003: Módulo de Gestión de Tareas

## Acceptance Criteria

- Crear `src/cli/commands/task.commands.ts` y registrarlo en el punto de entrada de la CLI.
- Implementar los siguientes subcomandos completos:
  - `todo task add "<title>" [--desc "<description>"] [--priority low|medium|high] [--project <id>]`
  - `todo task list [--all] [--status todo|in-progress|done] [--project <id>]` (ocultando por defecto las tareas completadas a menos que se use `--all` o un filtro específico de estado `done`).
  - `todo task show <id>` (muestra la información completa en formato clave-valor).
  - `todo task done <id>` (pasa el estado a `done` y registra `completed_at`).
  - `todo task update <id> [--title "<title>"] [--desc "<description>"] [--priority low|medium|high] [--status todo|in-progress|done]`
  - `todo task delete <id>` (llama al archivado lógico de tareas).
- Validar los parámetros de entrada y asegurar que los errores (ej. tarea no encontrada o formato de prioridad inválido) se muestren de forma clara y limpia en español.

## Risks

- Mala experiencia de usuario si el formato de la tabla o texto devuelto es confuso o difícil de leer en terminales angostas. Se mitiga diseñando una estructura de visualización tabular minimalista y ordenada.

## Notes

Implementar `task.commands.ts` llamando a los servicios del módulo.

## Out of scope

- Comandos CLI de proyectos (ej. `todo project add`) se manejan de manera separada en el siguiente Work Item.

## Validation

1. Compilar el proyecto y enlazar localmente (`npm link` o ejecución directa con `node dist/cli/index.js`).
2. Probar la creación secuencial: `todo task add "Escribir tests" --desc "Prueba de CLI" --priority high`.
3. Probar listado simple y filtrado: verificar que `todo task list` muestra la tarea creada y que `todo task list --status done` está inicialmente vacío.
4. Probar completar: `todo task done 1` y verificar que ya no aparece en `todo task list` por defecto pero sí al usar `todo task list --all`.

## Definition of Done

- [x] Los subcomandos CLI de tareas están registrados en Commander y son ejecutables.
- [x] Toda la salida en consola y mensajes de error están en español.
- [x] Las tareas completadas y eliminadas lógicamente se ocultan por defecto en el comando `list`.
- [x] El linter de TypeScript corre limpio.
