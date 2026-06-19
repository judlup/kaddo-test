import { describe, it, expect } from 'vitest';
import { createClient } from '@libsql/client';

describe('Database connection test', () => {
  it('should query local memory database using @libsql/client', async () => {
    const client = createClient({
      url: 'file::memory:',
    });
    const result = await client.execute('SELECT 1 + 1 AS sum');
    expect(result.rows[0].sum).toBe(2);
  });
});
