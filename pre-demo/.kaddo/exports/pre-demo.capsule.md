---
type: knowledge-capsule
system: pre-demo
version: 1
updated_at: 2026-06-19
owner: small-team
source_project: pre-demo
---

# pre-demo — Cápsula de Conocimiento (Knowledge Capsule)

## Purpose

El proyecto `pre-demo` es una aplicación CLI (Command Line Interface) liviana respaldada por SQLite para gestionar tareas y proyectos localmente. Su principal propósito es validar la metodología de Desarrollo Guiado por Conocimiento (Knowledge Driven Development) utilizando Kaddo, proporcionando un dominio de negocio simple pero con un flujo de trabajo estructurado y auditable.

## Responsibilities

- Proveer una interfaz de comandos interactiva y fácil de usar en la terminal del sistema para gestionar tareas y proyectos.
- Validar las reglas del negocio de tareas y proyectos antes de su almacenamiento (por ejemplo, obligatoriedad del título de la tarea y del nombre del proyecto).
- Persistir los datos del usuario localmente de manera consistente y relacional.
- Permitir la eliminación lógica de tareas (soft delete) para conservar históricos de uso y análisis.

## Exposed Capabilities

- **CLI Interaction**: Interfaz de línea de comandos estructurada con `Commander.js` para interactuar de forma intuitiva con el sistema.
- **Task Management**: Operaciones completas CRUD sobre tareas locales (creación, listado filtrado por estado, actualización de estado, asignación de prioridad y archivado/soft delete).
- **Project Management**: Operaciones básicas para la creación de proyectos y agrupación relacional de tareas.
- **Local Persistence**: Persistencia de datos local rápida y segura en un archivo SQLite sin dependencias externas de red.

## Public Contracts

- Interfaz de comandos CLI ejecutable localmente mediante Node.js con los comandos `todo task` y `todo project`.

## Dependencies

- **Node.js (v18+)**
- **@libsql/client** (provee acceso y compatibilidad a base de datos SQLite sin requerir compilación nativa con node-gyp en Windows)

## Known Risks

- Incompatibilidad menor si el entorno de ejecución local carece de soporte Node.js moderno con ESM (ECMAScript Modules), mitigado especificando la compatibilidad de runtime.

## Relevant ADRs

- Selección de SQLite y `@libsql/client` como motor de base de datos relacional y local autónomo.
- Mapeo modular estructurado por capacidades de dominio (`tasks`, `projects`, `database`) en lugar de una arquitectura MVC global.
- Uso de eliminación lógica (`deleted_at`) en lugar de borrado físico para conservar registros históricos.

## Owners

- Pequeño equipo de desarrollo (Small Team).

## Out of Scope

- Autenticación o registro de cuentas de usuario.
- Bases de datos distribuidas o almacenamiento y sincronización en la nube.
- Interfaz gráfica de usuario (web, móvil o escritorio) o APIs públicas de red.
- Colaboración multiusuario en tiempo real.

## Usage Notes

- Compilar el proyecto ejecutando `npm run build`.
- Iniciar la ayuda de comandos de la aplicación mediante `npm run start -- --help`.

> Security: this capsule must never contain secrets, tokens, credentials, PII or source code.
