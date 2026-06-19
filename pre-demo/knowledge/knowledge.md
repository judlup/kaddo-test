---
type: current-state
updated_at: 2026-06-19
---

# pre-demo — Conocimiento (Knowledge)

> Qué es verdad sobre este producto en este momento.

## Propósito

El producto `pre-demo` es una aplicación CLI liviana respaldada por SQLite para gestionar tareas y proyectos localmente. Su principal propósito es validar la metodología de Desarrollo Guiado por Conocimiento (Knowledge Driven Development) utilizando Kaddo.

## Descripción General de la Arquitectura

La aplicación se compone de comandos CLI interactivos estructurados con `Commander.js` que delegan la lógica de negocio a servicios específicos de dominio (`tasks` y `projects`). Estos servicios interactúan con una base de datos local de SQLite a través de clases de repositorio, garantizando el aislamiento de componentes y la testabilidad de la lógica.

## Dominios Clave

- **Tareas (Tasks)**: Creación, actualización de estado, asignación y archivado (soft delete) de tareas individuales.
- **Proyectos (Projects)**: Agrupación y clasificación opcional de tareas asociadas.
- **Base de Datos (Database)**: Persistencia local y control de esquemas mediante migraciones.

## Restricciones Activas

- Interfaz CLI únicamente.
- Persistencia local autónoma mediante SQLite (sin backend externo o base de datos en red).
- Sin autenticación de usuarios ni capacidades multi-inquilino/colaborativas en la primera versión.
