---
type: roadmap
id: roadmap
status: draft
generated_by: roadmap-agent
knowledge_level: K3
updated_at: 2026-06-08
---

# Roadmap

Generado con Kaddo Roadmap Agent. Las iniciativas y work items abajo son candidatos para revision humana; no son compromisos finales.

## Resumen

todoApp construira un MVP CLI pequeno para gestionar tareas y proyectos locales con SQLite. El objetivo principal es validar el flujo de Kaddo desde conocimiento estructurado hasta work items e implementacion.

## Supuestos

- El MVP se implementara como CLI local, sin web ni API.
- La prioridad es aprender y validar el flujo de Kaddo, no crear un producto comercial amplio.
- El stack confirmado es Node.js, TypeScript, pnpm, Commander.js, SQLite, better-sqlite3 y Vitest.
- La salida del CLI sera texto o tabla simple.

## Principios del roadmap

- Mantener el MVP pequeno y trazable.
- Materializar primero la base tecnica.
- Implementar tareas antes de proyectos porque las tareas son el centro del producto.
- Probar la logica de dominio fuera de la CLI siempre que sea posible.
- Evitar funcionalidades fuera del alcance confirmado.

## Iniciativas

### RM-001: Fundacion tecnica del proyecto CLI

**Goal:** Crear la base minima del proyecto TypeScript CLI con estructura, scripts, tooling y convenciones necesarias para construir el MVP.

**Related capabilities:** CLI Interaction, Local Persistence, Task Management, Project Management

**Project area / domain:** Plataforma tecnica / repositorio

**Impact:** High

**Risk:** Medium

**Suggested Knowledge Level:** K2

**Dependencies:** ADR-001, ADR-002

**Why this comes now:** El repositorio no tiene codigo fuente, package manager detectado, tests ni estructura implementada.

**Candidate Work Items:**

- WI-CANDIDATE-001: Inicializar proyecto TypeScript CLI
  - type: chore
  - suggested knowledge level: K2
  - expected value: Dejar el repositorio listo para desarrollar y probar la CLI.
  - notes: Configurar pnpm, TypeScript, Commander.js, Vitest, estructura `src/` y scripts basicos sin implementar comportamiento de dominio.

- WI-CANDIDATE-002: Configurar persistencia SQLite base
  - type: chore
  - suggested knowledge level: K2
  - expected value: Dejar preparada la conexion local a SQLite y la ejecucion de migraciones.
  - notes: Usar better-sqlite3; crear estructura de `database/` y migraciones iniciales sin comandos de usuario finales.

**Open questions:**

- Ninguna abierta para esta iniciativa.

---

### RM-002: Gestion de tareas

**Goal:** Permitir crear, listar, consultar, actualizar, completar y archivar tareas desde la CLI.

**Related capabilities:** Task Management, Task Status Management, Basic Task Filtering, Local Persistence

**Project area / domain:** Tasks

**Impact:** High

**Risk:** Medium

**Suggested Knowledge Level:** K3

**Dependencies:** RM-001

**Why this comes now:** Las tareas son la capacidad central del producto y validan el ciclo completo CLI -> service -> repository -> SQLite.

**Candidate Work Items:**

- WI-CANDIDATE-003: Crear modelo y persistencia de tareas
  - type: feature
  - suggested knowledge level: K3
  - expected value: Persistir tareas con los campos confirmados del MVP.
  - notes: Incluir `title`, `description`, `status`, `priority`, `project_id`, `created_at`, `updated_at`, `completed_at` y `deleted_at`; `project_id` nullable; priority por defecto `medium`.

- WI-CANDIDATE-004: Implementar comandos basicos de tareas
  - type: feature
  - suggested knowledge level: K3
  - expected value: Gestionar tareas desde CLI con texto o tabla simple.
  - notes: Cubrir `task add`, `task list`, `task show`, `task update`, `task done` y `task delete`.

- WI-CANDIDATE-005: Implementar filtros y reglas de listado de tareas
  - type: feature
  - suggested knowledge level: K2
  - expected value: Mostrar por defecto solo tareas activas y permitir consultar completadas cuando se solicite.
  - notes: `task list` oculta `done` y archivadas por defecto; completadas visibles con `--all` o `--status done`.

**Open questions:**

- Definir el formato exacto de tabla simple durante el refinamiento del work item.

---

### RM-003: Gestion de proyectos

**Goal:** Permitir crear, listar y consultar proyectos, y asociar tareas a proyectos de forma opcional.

**Related capabilities:** Project Management, Task Management, Basic Task Filtering

**Project area / domain:** Projects

**Impact:** Medium

**Risk:** Medium

**Suggested Knowledge Level:** K3

**Dependencies:** RM-001, RM-002

**Why this comes now:** Projects son parte confirmada del MVP, pero dependen de la base de tareas y de `project_id` nullable.

**Candidate Work Items:**

- WI-CANDIDATE-006: Crear modelo y persistencia de proyectos
  - type: feature
  - suggested knowledge level: K3
  - expected value: Persistir proyectos locales para agrupar tareas.
  - notes: Incluir `name`, `description`, `created_at` y `updated_at`.

- WI-CANDIDATE-007: Implementar comandos basicos de proyectos
  - type: feature
  - suggested knowledge level: K2
  - expected value: Gestionar proyectos desde CLI.
  - notes: Cubrir `project add`, `project list` y `project show`.

- WI-CANDIDATE-008: Asociar tareas a proyectos y filtrar por proyecto
  - type: feature
  - suggested knowledge level: K3
  - expected value: Permitir organizacion minima de tareas por proyecto sin hacer obligatorio el proyecto.
  - notes: `project_id` debe seguir siendo opcional; agregar filtro por proyecto en listados de tareas.

**Open questions:**

- Definir si el usuario referenciara proyectos por id numerico, nombre o ambos.

---

### RM-004: Validacion y documentacion del MVP

**Goal:** Asegurar que el MVP tiene pruebas basicas, documentacion de uso y conocimiento Kaddo actualizado.

**Related capabilities:** CLI Interaction, Local Persistence, Basic Reporting

**Project area / domain:** Calidad / documentacion

**Impact:** Medium

**Risk:** Low

**Suggested Knowledge Level:** K2

**Dependencies:** RM-002, RM-003

**Why this comes now:** El proyecto existe para validar trazabilidad; la documentacion y pruebas son parte del valor del ejemplo.

**Candidate Work Items:**

- WI-CANDIDATE-009: Agregar pruebas del flujo MVP
  - type: chore
  - suggested knowledge level: K2
  - expected value: Verificar services, repositories y reglas principales del MVP.
  - notes: Priorizar pruebas de tareas, proyectos, filtros de completadas y soft delete.

- WI-CANDIDATE-010: Documentar instalacion y uso de la CLI
  - type: chore
  - suggested knowledge level: K1
  - expected value: Permitir que un usuario ejecute y entienda el MVP localmente.
  - notes: Documentar comandos principales, valores de estado, valores de prioridad y comportamiento de `task list`.

**Open questions:**

- Ninguna abierta para esta iniciativa.

---

## Orden de ejecucion sugerido

1. Inicializar proyecto TypeScript CLI
2. Configurar persistencia SQLite base
3. Crear modelo y persistencia de tareas
4. Implementar comandos basicos de tareas
5. Implementar filtros y reglas de listado de tareas
6. Crear modelo y persistencia de proyectos
7. Implementar comandos basicos de proyectos
8. Asociar tareas a proyectos y filtrar por proyecto
9. Agregar pruebas del flujo MVP
10. Documentar instalacion y uso de la CLI

## Riesgos y restricciones

- El proyecto aun no tiene codigo fuente, tests ni package manager detectado.
- better-sqlite3 puede requerir soporte nativo durante instalacion.
- El soft delete exige filtros consistentes para no mostrar tareas archivadas por defecto.
- Projects aumenta el alcance del MVP, aunque la relacion opcional reduce el riesgo.
- No se debe implementar web, API, autenticacion, JSON output, tags ni due dates en esta etapa.

## Not Now

- Interfaz web.
- API HTTP.
- Autenticacion.
- Workspaces, teams, roles o permisos.
- Notificaciones.
- Comentarios o adjuntos.
- Integraciones externas.
- Cloud deployment.
- Due dates.
- Tags.
- Hard delete.
- Salida JSON.

## Next Recommended Work Item

Implementar comandos basicos de tareas

------------------------
Agent: roadmap-agent

Produced:
knowledge/delivery/roadmap.md

Next:
kaddo create --from roadmap
work-item-agent
------------------------
