---
type: adr
id: ADR-0001
title: "Selección de SQLite local y @libsql/client para Persistencia"
status: accepted
created_at: 2026-06-19
decided_by: small-team
code: ["src/database/**"]
---

# Selección de SQLite local y @libsql/client para Persistencia

## Contexto y Problema

Para el producto `pre-demo` (una aplicación de tareas pendientes por interfaz de comandos/CLI), se necesita un mecanismo para persistir los datos de tareas y proyectos localmente en el host del usuario de forma relacional y consistente.

El diseño inicial de la base de código contemplaba el uso de la biblioteca `better-sqlite3`. Sin embargo, durante la instalación de dependencias en sistemas Windows, `better-sqlite3` requiere compilación de extensiones nativas C++ mediante `node-gyp`, lo cual falla si el entorno del desarrollador carece de las herramientas de compilación de Visual Studio o de la configuración de Python adecuada. Esto compromete la portabilidad del proyecto y la facilidad de onboarding para nuevos desarrolladores.

## Decisión

Se decide adoptar **SQLite** como motor de base de datos relacional y **`@libsql/client`** como cliente de conexión a la base de datos local en lugar de `better-sqlite3`.

### Racionales de la Selección:

1. **SQLite es suficiente para el MVP local**: 
   Como aplicación CLI monousuario, no existe necesidad de concurrencia de escritura masiva, control transaccional distribuido, alta disponibilidad ni almacenamiento en red. SQLite provee persistencia relacional íntegra y de alto rendimiento en un solo archivo local, evitando la sobreingeniería y complejidad operacional de desplegar un motor cliente-servidor (como PostgreSQL o MySQL).
   
2. **@libsql/client en lugar de better-sqlite3**: 
   `@libsql/client` provee binarios precompilados nativos específicos para cada sistema operativo (incluido Windows) que se instalan directamente desde el registro NPM sin requerir compilación local. Esto elimina los errores de instalación de `node-gyp` y garantiza una configuración instantánea.

## Consecuencias

- **Migraciones**: Se deberá implementar un sistema simple de migraciones ejecutado por código TypeScript bajo `src/database/migrations/` que lea y ejecute sentencias SQL para inicializar y versionar las tablas `tasks` y `projects`.
- **Tests**: Se facilita la ejecución de pruebas rápidas de integración usando Vitest, pudiendo levantar bases de datos de prueba en memoria o en archivos temporales que se limpien después de cada suite de pruebas.
- **Portabilidad en Windows**: Cualquier desarrollador en una máquina Windows (o cualquier otro sistema operativo compatible) podrá clonar el repositorio y ejecutar `npm install` y `npm run build` sin toparse con problemas de dependencias nativas faltantes.

## Áreas y Paths Afectados

Esta decisión gobierna e impacta exclusivamente las siguientes ubicaciones del repositorio:
- `src/database/connection.ts` (Instanciación y exportación de la base de datos).
- `src/database/migrations/` (Definiciones de tablas y versión del esquema).
- `data/app.sqlite` (Ubicación por defecto del archivo físico de la base de datos).
- `package.json` (Dependencias y scripts de ejecución de migraciones).
