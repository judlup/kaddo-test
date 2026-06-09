---
type: adr
id: ADR-001
status: accepted
date: 2026-06-08
title: Stack tecnico del MVP CLI
knowledge_level: K2
---

# ADR-001: Stack tecnico del MVP CLI

## Contexto

todoApp es una aplicacion de linea de comandos para gestionar tareas locales y validar el flujo de Knowledge Driven Development de Kaddo. El MVP debe mantenerse pequeno, portable y facil de entender.

La aplicacion no necesita servicios externos, autenticacion, interfaz web, API ni colaboracion en tiempo real.

## Decision

Usaremos el siguiente stack para el MVP:

- Runtime: Node.js
- Lenguaje: TypeScript
- Package manager: pnpm
- CLI framework: Commander.js
- Base de datos: SQLite
- Acceso a base de datos: better-sqlite3
- Testing: Vitest

## Consecuencias

- La aplicacion puede ejecutarse localmente sin infraestructura externa.
- TypeScript permite mantener modelos y servicios explicitos sin agregar complejidad excesiva.
- Commander.js cubre la necesidad de comandos CLI simples y legibles.
- better-sqlite3 evita introducir una capa ORM antes de que el dominio lo requiera.
- Vitest permite probar services y repositories sin depender de una interfaz CLI interactiva.

## Alternativas consideradas

- Drizzle ORM: descartado para el MVP porque agrega una abstraccion adicional que no es necesaria para el tamano inicial del producto.
- CAC: descartado en favor de Commander.js por ser una opcion comun y suficiente para comandos CLI simples.
- Salida JSON desde CLI: fuera del MVP; la salida sera texto o tabla simple.

## Riesgos

- better-sqlite3 tiene dependencia nativa; la instalacion puede requerir toolchain compatible segun el entorno.
- Sin ORM, las consultas SQL deben mantenerse simples, bien ubicadas en repositories y cubiertas por tests.

## Criterios de aceptacion de la decision

- El proyecto base usa Node.js, TypeScript y pnpm.
- La CLI se implementa con Commander.js.
- La persistencia local usa SQLite mediante better-sqlite3.
- Las pruebas se ejecutan con Vitest.
