---
type: chore
id: WI-007
title: "Pruebas de Integración y Validación del Flujo Kaddo"
knowledge_level: K2
status: draft
phase: now
initiative: "Foundational CLI TODO App"
domains: []
code: []
created_at: 2026-06-19
source: roadmap
source_id: WI-CANDIDATE-007
source_initiative: RM-001
summary: "Crear pruebas de integración de extremo a extremo (E2E) para el flujo CLI-Base de datos y validar el cumplimiento del MVP."
---

# Pruebas de Integración y Validación del Flujo Kaddo

> Type: chore · Level: K2

## Source

- Source: roadmap
- Candidate: WI-CANDIDATE-007
- Initiative: RM-001 — Foundational CLI TODO App

## Problem

Para garantizar que todos los módulos desarrollados de la aplicación (base de datos, servicios, repositorios y controladores CLI) interactúan de extremo a extremo sin errores de integración ni drift de tipos de datos, se requiere una suite de pruebas integradas automatizada que emule los flujos reales de la terminal.

## Expected Value

Pruebas de extremo a extremo (E2E) que aseguran la consistencia funcional y finalizan la validación metodológica del MVP del proyecto.

## Context From Roadmap

This candidate was created from the roadmap initiative RM-001.

**Related capabilities:** CLI Interaction, Task Management, Task Status Management, Project Management, Local Persistence

**Domain:** CLI, Tasks, Projects, Database

**Impact:** High

**Risk:** Low

**Dependencies:**
- WI-005: Comandos CLI para Gestión de Tareas
- WI-006: Comandos CLI para Gestión de Proyectos

## Acceptance Criteria

- Crear una suite de pruebas de integración de extremo a extremo en `src/tests/cli.e2e.test.ts` utilizando Vitest.
- Las pruebas deben emular la ejecución de la CLI invocando el binario compilado o simulando el parsing de comandos del punto de entrada.
- El flujo de prueba básico a cubrir es:
  1. Crear un proyecto nuevo.
  2. Crear una tarea vinculada a ese proyecto.
  3. Listar tareas y validar que se visualizan correctamente.
  4. Completar la tarea y verificar que desaparece del listado por defecto pero se visualiza con filtros.
  5. Borrar lógicamente la tarea.
- Ejecutar `kaddo guard --ci` al finalizar el desarrollo para garantizar que todo el conocimiento generado se encuentra al día y alineado.

## Risks

- Lentitud en la suite de pruebas debido a múltiples accesos repetidos a disco. Se mitiga configurando una base de datos SQLite efímera en memoria (`:memory:`) o en un directorio temporal para cada ciclo de pruebas de Vitest.

## Notes

Ejecutar pruebas y validar que el conocimiento de Kaddo esté al día.

## Out of scope

- Nuevas funcionalidades de negocio o rediseño de interfaz en este paso.

## Validation

1. Ejecutar `pnpm test` de forma local y confirmar el paso exitoso de todas las pruebas unitarias y de integración E2E.
2. Ejecutar `kaddo guard --ci` y corroborar que el comando finaliza con código de salida 0 (sin drifts o desalineaciones en la base de conocimiento).

## Definition of Done

- [x] La suite de pruebas de integración E2E pasa al 100% de éxito.
- [x] El reporte de cobertura de pruebas generales está disponible y validado.
- [x] Se ejecuta con éxito la validación de Kaddo guard.
