---
type: business
status: consolidated
---

# Negocio

## Problema

Los desarrolladores a menudo comienzan nuevos proyectos escribiendo código antes de aclarar el problema, el alcance del producto, la base técnica, la hoja de ruta (roadmap) y los elementos de trabajo (work items).

Este proyecto existe como un pequeño ejemplo para validar cómo Kaddo ayuda a transformar una idea inicial en conocimiento estructurado del proyecto antes y durante el desarrollo.

## Usuarios

### Desarrollador (Developer) — Primario
Una persona que construye la aplicación de ejemplo. Su objetivo es utilizar un proyecto simple para validar el flujo de Kaddo desde la intención del negocio hasta la base de código y los elementos de trabajo.

### Mantenedor (Maintainer) — Secundario
Una persona que revisa o evoluciona el proyecto. Su objetivo es comprender por qué existe la aplicación, qué hace y cómo debería evolucionar.

### Evaluador de Kaddo (Kaddo Evaluator) — Secundario
Una persona que prueba Kaddo. Su objetivo es observar si Kaddo ayuda a organizar el conocimiento, guiar el desarrollo y reducir la ambigüedad.

## Propuesta de Valor

El proyecto proporciona una aplicación de tareas pendientes (TODO) por CLI que es pequeña, realista y fácil de entender, la cual se puede utilizar para validar el flujo de trabajo de desarrollo guiado por conocimiento (Knowledge Driven Development) de Kaddo.

Mantiene el dominio intencionalmente simple para que el enfoque permanezca en la relación entre la intención del negocio, el alcance del producto, la estructura de la base de código, la hoja de ruta, los elementos de trabajo y las decisiones de desarrollo.

## Reglas de Negocio

- Una tarea debe tener un título obligatorio.
- Una tarea puede tener una descripción opcional.
- Una tarea debe tener un estado válido (por hacer, en progreso, completada).
- Una tarea puede pertenecer a un proyecto de forma opcional.
- Un proyecto puede contener múltiples tareas.
- Las tareas completadas deben permanecer almacenadas para referencia histórica.
- Las tareas eliminadas deben ser archivadas (soft delete) en lugar de eliminarse de forma física.
- La aplicación debe funcionar localmente y de forma autónoma sin requerir servicios externos de red.

## Restricciones

- La aplicación debe mantenerse simple y minimalista en su diseño de código.
- La primera versión (MVP) debe ser exclusivamente para CLI (interfaz de línea de comandos).
- La primera versión debe utilizar SQLite para la persistencia local de datos.
- La primera versión no debe incluir mecanismos de autenticación o registro de usuarios.
- La primera versión no debe incluir equipos, roles, espacios de trabajo (workspaces), notificaciones o colaboración remota.
- El proyecto debe ser útil como ejemplo para validar Kaddo.

## Supuestos

- Una pequeña aplicación CLI es suficiente para validar el flujo de trabajo de Kaddo.
- SQLite es suficiente para la persistencia local de datos en este escenario de prueba.
- Los usuarios ejecutarán la aplicación localmente en sus propios entornos de desarrollo.
- El valor principal no es la aplicación TODO en sí, sino la trazabilidad de cómo se define, estructura y construye usando Kaddo.
- El proyecto puede evolucionar más adelante, pero solo después de validar el flujo inicial del MVP.

## Preguntas Abiertas

- ¿Deberían incluirse los proyectos en la primera versión? (Decisión: Sí, de forma opcional).
- ¿Deberían tener prioridad las tareas? (Decisión: Sí, con valores low, medium, high).
- ¿Deberían las tareas admitir etiquetas (tags)? (Decisión: No en el MVP).
- ¿Deberían las tareas completadas ocultarse por defecto en la vista CLI? (Decisión: Sí, se ocultan por defecto pero se pueden mostrar con un flag).
- ¿La salida de la CLI debe admitir JSON para automatización? (Decisión: No en el MVP).

## Glosario

- **Kaddo**: Herramienta CLI y framework conceptual para el desarrollo guiado por conocimiento (Knowledge Driven Development) que ayuda a estructurar y trazar el ciclo de vida del software.
- **Tarea (Task)**: Unidad de trabajo gestionada por el usuario en el sistema.
- **Proyecto (Project)**: Agrupación lógica de tareas relacionadas.
- **CLI**: Interfaz de Línea de Comandos (Command Line Interface).
- **SQLite**: Base de datos SQL relacional y local autónoma y ligera.
- **Soft Delete**: Eliminación lógica en base de datos marcando un registro como inactivo o eliminado sin borrar físicamente la fila.
