---
type: codebase
status: structured
updated_at: 2026-06-19
---

# Base de Código (Codebase)

> Base técnica prevista del proyecto. Este archivo describe la estructura y decisiones de implementación esperadas; no genera código.

## Estructura del Repositorio

El proyecto será una aplicación CLI simple respaldada por SQLite.

La estructura debe mantenerse pequeña, entendible y alineada con las capacidades del producto.

```txt
src/
  cli/
    commands/
      task.commands.ts
      project.commands.ts

  modules/
    tasks/
      task.model.ts
      task.repository.ts
      task.service.ts

    projects/
      project.model.ts
      project.repository.ts
      project.service.ts

  database/
    connection.ts
    migrations/

  shared/
    errors.ts
    types.ts
    constants.ts

knowledge/
  business/
  product/
  tech/
  delivery/

data/
  app.sqlite

README.md
.env.example
package.json
```

## Tecnologías Confirmadas

- Entorno de ejecución (Runtime): Node.js (v18+)
- Lenguaje: TypeScript
- Interfaz: CLI
- Base de datos: SQLite
- Acceso a base de datos: @libsql/client (en reemplazo de better-sqlite3 por compatibilidad nativa en entornos Windows)
- Framework para CLI: Commander.js
- Gestor de paquetes: pnpm (u npm como alternativa)
- Framework de pruebas: Vitest

## Atributos de Calidad

- **Simplicidad**: El proyecto debe ser fácil de entender, configurar y modificar para nuevos desarrolladores.
- **Mantenibilidad**: El código debe organizarse por componentes o módulos de dominio en lugar de agrupar todo por capas técnicas globales.
- **Portabilidad**: La aplicación debe poder ejecutarse localmente sin depender de servicios externos o servidores en la nube.
- **Trazabilidad**: Las tareas de desarrollo y decisiones de arquitectura deben poder auditarse directamente desde los artefactos de conocimiento de Kaddo.
- **Testabilidad**: La lógica del dominio (servicios y repositorios) debe poder probarse de forma aislada sin necesidad de levantar o simular la CLI completa.
- **Evolución Controlada**: La arquitectura debe permitir una fácil adición de nuevas capacidades, evitando la sobreingeniería (como el diseño de APIs web) en el MVP.

## Estándares de Desarrollo

- Utilizar TypeScript para garantizar la seguridad de tipos.
- Mantener los comandos CLI lo más delgados posible (delgados controladores); toda la lógica debe delegarse a los servicios de dominio.
- Ubicar la lógica del negocio dentro del directorio del módulo correspondiente en `modules/<name>/*.service.ts`.
- Abstraer el acceso a la base de datos SQLite en clases o funciones de repositorio en `modules/<name>/*.repository.ts`.
- Usar nombres descriptivos y consistentes alineados con el Glosario de Negocio.
- Implementar migraciones estructuradas para cualquier cambio en el esquema de la base de datos.
- Evitar abstracciones prematuras o el uso de ORMs pesados.
- Documentar todas las decisiones importantes del proyecto en archivos de conocimiento Kaddo (directorio `knowledge/`).

## Estrategia de Git

Se adoptará GitHub Flow junto con Conventional Commits y Versionamiento Semántico (SemVer). La estrategia concreta seguirá la configuración definida en `.kaddo/git.yml` cuando esté disponible.

Ejemplos de commits sugeridos:

```txt
feat(tasks): add task creation command
feat(tasks): add task status update
feat(projects): add project creation command
docs(kaddo): update codebase foundation
chore(repo): configure typescript cli project
```

## Módulos Iniciales

- **CLI**: Manejo de los comandos del terminal.
- **Tasks**: Dominio de la gestión de tareas.
- **Projects**: Dominio de la gestión de proyectos.
- **Database**: Configuración de conexión y migraciones de SQLite.
- **Shared**: Utilidades comunes, tipos y manejo de errores.

## Entidades de Dominio Iniciales

### Tarea (Task)

Representa una unidad de trabajo.

Campos previstos:

```txt
id (UUID o numérico autoincremental)
title (string, obligatorio)
description (string, opcional)
status (enum: todo, in-progress, done)
priority (enum: low, medium, high)
project_id (foreign key, opcional / nullable)
created_at (timestamp)
updated_at (timestamp)
completed_at (timestamp, nullable)
deleted_at (timestamp, nullable para soft delete)
```

Reglas:
- `title` es obligatorio.
- `description` es opcional.
- `status` por defecto es `todo`.
- `priority` por defecto es `medium`.
- `completed_at` debe registrarse cuando la tarea cambie a estado `done`.
- `deleted_at` se usará para implementar eliminación lógica (soft delete).

### Proyecto (Project)

Representa un grupo de tareas relacionadas.

Campos previstos:

```txt
id (UUID o numérico autoincremental)
name (string, obligatorio)
description (string, opcional)
created_at (timestamp)
updated_at (timestamp)
```

Reglas:
- `name` es obligatorio.
- `description` es opcional.
- Un proyecto puede tener múltiples tareas asociadas.
- Una tarea puede no pertenecer a ningún proyecto.

## Comandos CLI Iniciales

```bash
todo task add "Create project brief"
todo task list
todo task list --all
todo task list --status done
todo task show <id>
todo task done <id>
todo task update <id>
todo task delete <id>

todo project add "Kaddo validation"
todo project list
todo project show <id>
```

## Decisiones Confirmadas del MVP

- Los proyectos forman parte del alcance del MVP.
- Las tareas pueden existir sin pertenecer a ningún proyecto (relación opcional).
- La prioridad de las tareas se incluye en el MVP con valores: `low`, `medium`, `high` (por defecto `medium`).
- No se soportarán fechas de vencimiento (due dates) ni etiquetas (tags) en la primera versión.
- Los estados de tarea válidos serán: `todo`, `in-progress` y `done`.
- Las tareas completadas se ocultarán por defecto al ejecutar `todo task list`. Para verlas, se usará el flag `--all` o `--status done`.
- La eliminación de tareas será lógica (soft delete / archivo) a través del campo `deleted_at`. No se usará `hard delete`.
- La salida de la CLI será texto formateado o tablas simples. No se implementará salida formateada en JSON en el MVP.

## Preguntas Abiertas Restantes

- Definir el formato de presentación visual exacto para las tablas CLI.
- Definir si los proyectos se referenciarán en los comandos de tareas mediante su ID numérico o su nombre.

## Criterios Mínimos para Iniciar el Desarrollo

- Contar con Node.js v18+ y pnpm instalados localmente.
- Tener inicializado el repositorio Git.
- Haber creado el archivo `.env` inicial a partir de `.env.example`.
- Tener configurada una base de datos SQLite de desarrollo vacía en la ruta del proyecto.
- Disponer de pruebas automatizadas iniciales que verifiquen la conexión con SQLite antes de empezar con los comandos CLI.

## Lista de Verificación de Calidad (Quality Checklist)

- [x] La estructura propuesta sigue los dominios del negocio y producto, no los defaults de un framework.
- [x] No se implementa código productivo en este archivo de conocimiento.
- [x] El stack confirmado es lo más simple posible para este validador.
- [x] Los módulos iniciales mapean directamente a las capacidades identificadas.
- [x] La aplicación puede ejecutarse localmente de forma autónoma sin dependencias externas.
- [x] Las decisiones confirmadas del MVP están debidamente documentadas.
- [x] Se especifican los criterios mínimos para iniciar el desarrollo.
