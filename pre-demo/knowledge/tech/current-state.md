---
type: current-state
status: draft
updated_at: 2026-06-19
---

# Estado Actual (Current State)

Generado a partir del Kaddo Context Pack.

## Descripción General del Sistema (System Overview)

El proyecto `pre-demo` es una aplicación minimalista de línea de comandos (CLI) diseñada para la gestión local de tareas pendientes y proyectos. Está construida utilizando Node.js con TypeScript, y utiliza una base de datos local SQLite para la persistencia de datos. El objetivo primordial de este desarrollo es validar el flujo de trabajo metodológico guiado por conocimiento (Knowledge Driven Development) de Kaddo.

## Módulos (Modules)

- **cli**: Módulo que expone y define la interfaz de comandos de terminal de la aplicación utilizando `Commander.js`. Contiene los comandos para interactuar con tareas y proyectos.
- **modules/tasks**: Módulo que encapsula el modelo de datos de Tarea, su lógica de negocio en servicios y el acceso a base de datos mediante repositorios.
- **modules/projects**: Módulo que encapsula el modelo de datos de Proyecto, su lógica de negocio y su repositorio correspondiente.
- **database**: Módulo encargado de gestionar la inicialización de la conexión de la base de datos y la ejecución estructurada de migraciones.
- **shared**: Módulo de soporte que centraliza constantes, utilidades globales, tipos TypeScript compartidos y el manejo común de errores.

## Dependencias e Integraciones (Dependencies and Integrations)

- **Node.js (v18+)**: Entorno de ejecución en tiempo de ejecución local.
- **TypeScript**: Lenguaje de programación principal que aporta tipado estático y robustez al código.
- **better-sqlite3**: Driver sincrónico eficiente y rápido para SQLite en Node.js.
- **Commander.js**: Librería para parsear argumentos de CLI y estructurar subcomandos de manera sencilla.
- **Vitest**: Framework moderno de pruebas para la ejecución de unit tests y tests de integración rápidos.
- **pnpm**: Gestor de paquetes eficiente utilizado para administrar dependencias.

## Almacenamiento de Datos (Data Stores)

- **SQLite**: Almacenamiento local mediante un único archivo de base de datos relacional ubicado en `data/app.sqlite`.

## Infraestructura (Infrastructure)

- **Arquitectura Local/Autónoma**: El sistema no cuenta con infraestructura en la nube, ni integración con APIs externas ni servicios remotos. Todo corre y persiste en el host local del usuario.

## Decisiones Implícitas (candidatos)

- **Decisión de usar SQLite**: Se selecciona SQLite para proporcionar consultas relacionales eficientes entre las entidades Tarea y Proyecto de forma local, evitando la sobreingeniería de un motor cliente-servidor como PostgreSQL.
- **Decisión de usar eliminación lógica (Soft Delete)**: Las tareas y proyectos eliminados mantendrán sus registros en la base de datos con una marca temporal (`deleted_at`) para posibilitar reportes históricos futuros, en lugar de realizar un borrado permanente.
- **Mapeo directo por capacidad de negocio en la estructura**: La estructura de carpetas agrupa el código en módulos de dominio en lugar de la clásica división MVC técnica global, lo que facilita la escalabilidad y mantenibilidad por capacidades.

## Preguntas Abiertas

- ¿Cómo se aprovisionará automáticamente la estructura inicial de base de datos si la base de datos SQLite no existe al iniciar la CLI?
- ¿Se prefiere el almacenamiento de logs del sistema en archivos planos locales o en la consola estándar del sistema en caso de errores graves?

## Áreas que Requieren Validación Humana

- Confirmar si los IDs de tareas y proyectos utilizarán generadores UUID (strings únicos) o enteros secuenciales autoincrementales provistos por SQLite.
