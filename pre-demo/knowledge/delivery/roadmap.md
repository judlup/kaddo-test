---
type: roadmap
id: roadmap
status: draft
generated_by: roadmap-agent
knowledge_level: K3
---

# Hoja de Ruta (Roadmap)

Generado con Kaddo Roadmap Agent. Las iniciativas y los elementos de trabajo (work items) a continuación son **candidatos** para revisión humana — no compromisos finales.

## Resumen (Summary)

Esta hoja de ruta establece la secuencia para construir la aplicación de tareas pendientes (TODO) por línea de comandos utilizando Node.js, TypeScript y SQLite. El enfoque es incremental, comenzando por el andamiaje del proyecto y la base de datos para luego implementar la lógica de negocio y finalmente los comandos CLI.

## Supuestos (Assumptions)

- Se asume que el entorno local tiene Node.js v18+ y pnpm instalados.
- Se asume que las pruebas unitarias y de integración son suficientes para validar el comportamiento sin una interfaz gráfica.

## Principios del Roadmap (Roadmap Principles)

1. **Entregas incrementales**: Primero la base tecnológica, luego la lógica del dominio, y finalmente la CLI.
2. **Calidad desde el inicio**: Cada módulo debe venir acompañado de sus pruebas unitarias correspondientes.
3. **Validación metodológica**: Usar las capacidades de Kaddo para trazar cada etapa del desarrollo.

## Iniciativas (Initiatives)

### RM-001: Foundational CLI TODO App

**Goal:** Proporcionar la infraestructura y comandos CLI básicos para crear y gestionar tareas y proyectos persistidos localmente con SQLite.

**Related capabilities:** CLI Interaction, Task Management, Task Status Management, Project Management, Local Persistence

**Project area / domain:** CLI, Tasks, Projects, Database

**Impact:** High

**Risk:** Low

**Suggested Knowledge Level:** K2

**Dependencies:** Ninguna

**Why this comes now:** Es la base tecnológica e inicial indispensable del MVP para poder validar el flujo Kaddo.

**Candidate Work Items:**

- WI-CANDIDATE-001: Configuración Inicial del Proyecto TypeScript
  - type: chore
  - suggested knowledge level: K2
  - expected value: Repositorio inicializado con TypeScript, gestor de paquetes pnpm, Vitest para pruebas y Commander.js configurado.
  - notes: Configurar package.json, tsconfig.json, y la estructura de directorios básica en `src/`.

- WI-CANDIDATE-002: Base de Datos SQLite y Migraciones
  - type: feat
  - suggested knowledge level: K2
  - expected value: Conexión configurada con better-sqlite3 y primera migración ejecutada para crear las tablas de tareas y proyectos.
  - notes: Implementar `connection.ts` y scripts de migraciones en `src/database/`.

- WI-CANDIDATE-003: Módulo de Gestión de Tareas
  - type: feat
  - suggested knowledge level: K2
  - expected value: Implementación de la lógica del dominio, repositorio y servicio para crear, listar por estado, actualizar y archivar lógicamente tareas.
  - notes: Desarrollar `task.model.ts`, `task.repository.ts` y `task.service.ts` con sus pruebas unitarias.

- WI-CANDIDATE-004: Módulo de Gestión de Proyectos
  - type: feat
  - suggested knowledge level: K2
  - expected value: Implementación de la lógica para crear, listar y asociar proyectos a las tareas.
  - notes: Desarrollar `project.model.ts`, `project.repository.ts` y `project.service.ts`.

- WI-CANDIDATE-005: Comandos CLI para Gestión de Tareas
  - type: feat
  - suggested knowledge level: K2
  - expected value: Integración de comandos CLI para permitir operaciones de tareas (`todo task add`, `todo task list`, etc.) desde la terminal.
  - notes: Implementar `task.commands.ts` llamando a los servicios del módulo.

- WI-CANDIDATE-006: Comandos CLI para Gestión de Proyectos
  - type: feat
  - suggested knowledge level: K2
  - expected value: Integración de comandos CLI para proyectos (`todo project add` y `todo project list`).
  - notes: Implementar `project.commands.ts`.

- WI-CANDIDATE-007: Pruebas de Integración y Validación del Flujo Kaddo
  - type: chore
  - suggested knowledge level: K2
  - expected value: Pruebas de extremo a extremo que aseguran la consistencia y finalizan la validación del MVP.
  - notes: Ejecutar pruebas y validar que el conocimiento de Kaddo esté al día.

**Open questions:**

- ¿Es necesario implementar el comando `todo task list --all` desde el primer Work Item de CLI?

---

## Suggested Execution Order

1. WI-CANDIDATE-001 (Chore: Setup)
2. WI-CANDIDATE-002 (Feat: Database)
3. WI-CANDIDATE-003 (Feat: Tasks module)
4. WI-CANDIDATE-004 (Feat: Projects module)
5. WI-CANDIDATE-005 (Feat: Tasks CLI)
6. WI-CANDIDATE-006 (Feat: Projects CLI)
7. WI-CANDIDATE-007 (Chore: E2E Tests & Kaddo validation)

## Risks and Constraints

- El uso de better-sqlite3 requiere compilar módulos nativos de C en algunos sistemas operativos (por ejemplo, Windows), lo cual puede requerir dependencias adicionales de compilación.

## Not Now

- Sincronización en la nube o base de datos compartida.
- Interfaz gráfica o Web.

## Next Recommended Work Item

WI-CANDIDATE-001: Configuración Inicial del Proyecto TypeScript
