---
type: feat
id: WI-002
title: "Base de Datos SQLite y Migraciones"
knowledge_level: K2
status: ready
phase: now
initiative: "Foundational CLI TODO App"
domains: []
code: ["src/database/connection.ts", "src/database/migrations/**/*"]
created_at: 2026-06-19
source: roadmap
source_id: WI-CANDIDATE-002
source_initiative: RM-001
summary: "Configurar la conexión local SQLite y crear las tablas iniciales de tareas y proyectos mediante migraciones."
---

# Base de Datos SQLite y Migraciones

> Type: feat · Level: K2

## Source

- Source: roadmap
- Candidate: WI-CANDIDATE-002
- Initiative: RM-001 — Foundational CLI TODO App

## Problem

Para almacenar y recuperar tareas y proyectos en nuestra aplicación CLI de manera local, requerimos abrir y gestionar una conexión persistente a un archivo SQLite, así como proveer un mecanismo automático para aprovisionar las tablas necesarias en la base de datos (migraciones).

## Expected Value

Conexión configurada con better-sqlite3 y primera migración ejecutada para crear las tablas de tareas y proyectos de forma local y automatizada.

## Context From Roadmap

This candidate was created from the roadmap initiative RM-001.

**Related capabilities:** CLI Interaction, Task Management, Task Status Management, Project Management, Local Persistence

**Domain:** CLI, Tasks, Projects, Database

**Impact:** High

**Risk:** Low

**Dependencies:**
- WI-001: Configuración Inicial del Proyecto TypeScript

## Acceptance Criteria

- Crear el archivo `src/database/connection.ts` para abrir la conexión a SQLite utilizando la librería `better-sqlite3`.
- Implementar un sistema básico de migraciones en `src/database/migrations/` que cree las tablas `tasks` y `projects` de acuerdo con las entidades especificadas en `codebase.md`.
- El archivo de base de datos resultante debe crearse localmente en la ruta `data/app.sqlite`.
- Proveer un comando en `package.json` para ejecutar las migraciones iniciales.

## Risks

- Bloqueo de base de datos si múltiples procesos intentan escribir de forma paralela. Se mitiga mediante el uso sincrónico de `better-sqlite3` y garantizando que la aplicación CLI es mono-hilo/mono-proceso.

## Notes

Implementar `connection.ts` y scripts de migraciones en `src/database/`.

## Out of scope

- Lógica de negocio (servicios o controladores de tareas/proyectos) o comandos CLI en este Work Item.

## Validation

1. Ejecutar el script de migraciones configurado en `package.json`.
2. Validar que el archivo `data/app.sqlite` se genera automáticamente.
3. Ejecutar una prueba automatizada con Vitest que se conecte a la base de datos, inserte una fila en `tasks` y `projects`, y valide que los datos se recuperan correctamente con todos sus campos previstos.

## Definition of Done

- [x] Las tablas de base de datos coinciden exactamente con la especificación de diseño técnico en `codebase.md`.
- [x] El aprovisionamiento de la base de datos es automático si el archivo no existe.
- [x] Las pruebas unitarias de conexión e integración pasan sin errores.
