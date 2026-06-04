import { describe, it, expect, beforeEach } from 'vitest';
import Database from 'better-sqlite3';
import { runMigrations } from './runner';
import type { Migration } from './index';

function inMemoryDb(): Database.Database {
  const db = new Database(':memory:');
  db.pragma('foreign_keys = ON');
  return db;
}

function tableExists(db: Database.Database, name: string): boolean {
  const row = db
    .prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name=?`)
    .get(name) as { name: string } | undefined;
  return row !== undefined;
}

describe('runMigrations', () => {
  let db: Database.Database;

  beforeEach(() => {
    db = inMemoryDb();
  });

  it('creates the _migrations tracking table', () => {
    runMigrations(db, []);
    expect(tableExists(db, '_migrations')).toBe(true);
  });

  it('applies migrations in order', () => {
    const m: Migration[] = [
      { name: '001_a', sql: 'CREATE TABLE a (id INTEGER PRIMARY KEY)' },
      { name: '002_b', sql: 'CREATE TABLE b (id INTEGER PRIMARY KEY)' },
    ];

    runMigrations(db, m);

    expect(tableExists(db, 'a')).toBe(true);
    expect(tableExists(db, 'b')).toBe(true);
  });

  it('records applied migrations in _migrations', () => {
    const m: Migration[] = [
      { name: '001_a', sql: 'CREATE TABLE a (id INTEGER PRIMARY KEY)' },
    ];

    runMigrations(db, m);

    const rows = db.prepare('SELECT name FROM _migrations').all() as { name: string }[];
    expect(rows.map(r => r.name)).toContain('001_a');
  });

  it('does not apply an already-applied migration a second time', () => {
    const m: Migration[] = [
      { name: '001_a', sql: 'CREATE TABLE a (id INTEGER PRIMARY KEY)' },
    ];

    runMigrations(db, m);
    // Running again must not throw (would fail with "table already exists" if re-applied)
    expect(() => runMigrations(db, m)).not.toThrow();
  });

  it('applies only new migrations on subsequent runs', () => {
    const first: Migration[] = [
      { name: '001_a', sql: 'CREATE TABLE a (id INTEGER PRIMARY KEY)' },
    ];
    const second: Migration[] = [
      { name: '001_a', sql: 'CREATE TABLE a (id INTEGER PRIMARY KEY)' },
      { name: '002_b', sql: 'CREATE TABLE b (id INTEGER PRIMARY KEY)' },
    ];

    runMigrations(db, first);
    runMigrations(db, second);

    expect(tableExists(db, 'b')).toBe(true);
    const rows = db.prepare('SELECT name FROM _migrations').all() as { name: string }[];
    expect(rows).toHaveLength(2);
  });
});
