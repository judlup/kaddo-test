---
type: adr
id: ADR-002
status: accepted
date: 2026-06-08
title: Alcance funcional del MVP
knowledge_level: K2
---

# ADR-002: Alcance funcional del MVP

## Contexto

todoApp existe para validar el flujo de Kaddo desde conocimiento de negocio y producto hasta roadmap, work items e implementacion. El dominio debe seguir siendo pequeno para que el foco este en la trazabilidad del proceso.

## Decision

El MVP incluira:

- Gestion de tareas desde CLI.
- Gestion de proyectos desde CLI.
- Tareas con proyecto opcional.
- Persistencia local con SQLite.
- Prioridad de tareas con valores `low`, `medium` y `high`.
- Prioridad por defecto `medium`.
- Estados de tarea limitados a `todo`, `in-progress` y `done`.
- Listado de tareas que oculta completadas por defecto.
- Visualizacion de tareas completadas mediante `--all` o `--status done`.
- Eliminacion logica mediante `deleted_at`.
- Salida CLI en texto o tabla simple.

## Fuera de alcance

El MVP no incluira:

- Autenticacion.
- Workspaces, teams, roles o permisos.
- Interfaz web.
- API.
- Notificaciones.
- Comentarios.
- Adjuntos.
- Integraciones externas.
- Cloud deployment.
- Colaboracion multiusuario.
- Due dates.
- Tags.
- Hard delete.
- Salida JSON.

## Reglas de dominio confirmadas

- Una tarea debe tener `title`.
- Una tarea puede tener `description`.
- Una tarea debe tener `status`.
- Una tarea debe tener `priority`.
- Una tarea puede tener `project_id` nulo.
- Un proyecto puede contener multiples tareas.
- Las tareas completadas permanecen almacenadas.
- Las tareas eliminadas se archivan con `deleted_at` y no se borran fisicamente.

## Consecuencias

- El modelo de datos inicial debe incluir `project_id` nullable, `priority`, `completed_at` y `deleted_at`.
- Los comandos `task list` deben filtrar por defecto tareas no completadas y no eliminadas.
- Los comandos deben permitir ver completadas con `--all` o `--status done`.
- No se requiere disenar contratos JSON ni compatibilidad de automatizacion en esta etapa.

## Riesgos

- Incluir proyectos en el MVP aumenta el alcance inicial, pero se mantiene acotado porque la relacion con tareas es opcional.
- El soft delete requiere que repositories y listados excluyan registros con `deleted_at` por defecto.

## Criterios de aceptacion de la decision

- El roadmap y los work items reflejan proyectos, prioridades y soft delete como parte del MVP.
- Las preguntas abiertas sobre projects, priority, due dates, tags, estados, completadas, delete y JSON quedan cerradas para el MVP.
