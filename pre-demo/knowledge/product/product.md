---
type: product
status: consolidated
---

# Producto

## Resumen del Producto (Product Brief)

Este producto es una aplicación sencilla de tareas pendientes (TODO) por interfaz de línea de comandos (CLI) respaldada por SQLite.

Permite a los usuarios gestionar tareas localmente desde la terminal creando, listando, actualizando, completando y eliminando tareas.

El producto es intencionalmente pequeño y está diseñado principalmente para validar el flujo de trabajo de Kaddo al transformar una idea en conocimiento estructurado de negocio, alcance del producto, base técnica de la base de código, hoja de ruta (roadmap) y elementos de trabajo (work items).

## Capacidades (Capabilities)

- **Interacción por CLI**: Interfaz de línea de comandos para interactuar con la aplicación.
- **Gestión de Tareas**: Crear, ver y modificar tareas.
- **Gestión de Estado de Tareas**: Cambiar el estado de las tareas (por hacer, en progreso, completado).
- **Gestión de Proyectos**: Agrupar tareas relacionadas en proyectos.
- **Persistencia Local**: Almacenamiento local de datos mediante SQLite.
- **Filtrado Básico de Tareas**: Filtrar tareas por estado y proyecto.
- **Reportes Básicos**: Visualización de listas de tareas pendientes y su progreso básico.

## Alcance (Scope)

El MVP incluye:

- Crear tareas desde la CLI.
- Listar tareas.
- Ver detalles de una tarea.
- Actualizar el título, la descripción, el estado y la prioridad de una tarea.
- Marcar tareas como completadas.
- Eliminar o archivar tareas lógicamente (soft delete).
- Crear proyectos.
- Asignar tareas a proyectos.
- Persistir los datos en SQLite local.
- Filtros básicos por estado y proyecto.

## Fuera de Alcance (Out of Scope)

El MVP no incluye:

- Autenticación o registro de usuarios.
- Espacios de trabajo (workspaces).
- Equipos o colaboración multiusuario.
- Roles y permisos.
- Interfaz web.
- API REST o GraphQL.
- Notificaciones.
- Comentarios en las tareas.
- Archivos adjuntos.
- Actualizaciones en tiempo real.
- Integraciones externas.
- Despliegue en la nube o hosting compartido.

## Criterios de Éxito (Success Criteria)

El MVP es exitoso si:

- Un usuario puede instalar o ejecutar la CLI localmente sin dependencias externas complejas.
- Un usuario puede crear, listar, actualizar, completar y eliminar tareas lógicamente.
- Un usuario puede agrupar tareas por proyecto.
- Los datos se persisten localmente usando SQLite de forma robusta.
- El proyecto demuestra un flujo claro de Kaddo desde el negocio hasta el producto, base de código, roadmap y elementos de trabajo.
- Un mantenedor puede comprender el proyecto leyendo los archivos de conocimiento de Kaddo generados.

## Supuestos (Assumptions)

- La interfaz CLI es suficiente para la primera versión.
- SQLite es adecuado y suficiente para la persistencia local de datos.
- Los usuarios ejecutarán la aplicación localmente en sus propias terminales.
- El valor principal no es la aplicación de tareas en sí misma, sino la trazabilidad y validación de la metodología Kaddo.
- El proyecto puede evolucionar posteriormente, pero solo después de validar el flujo inicial del MVP.

## Preguntas Abiertas (Open Questions)

- ¿Deberían ser los proyectos obligatorios u opcionales al crear tareas? (Decisión del MVP: Opcionales).
- ¿Debería incluirse la prioridad en el MVP? (Decisión del MVP: Sí, con valores low, medium, high).
- ¿Deberían las tareas admitir fechas de vencimiento (due dates)? (Decisión del MVP: No en el MVP).
- ¿Deberían las tareas completadas aparecer en la lista por defecto? (Decisión del MVP: No, se ocultan por defecto pero se pueden listar con un flag `--all` o por estado).
- ¿La eliminación debe archivar de forma lógica (soft delete) o eliminar permanentemente de forma física (hard delete)? (Decisión del MVP: Soft delete).
- ¿Debería la salida de la CLI admitir formatos de tabla y JSON? (Decisión del MVP: Solo tabla simple/texto, JSON fuera del MVP).
