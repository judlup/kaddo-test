import { describe, expect, it } from 'vitest';
import { appName, version } from './constants';

describe('Project Setup', () => {
  it('should have a version', () => {
    expect(version).toBeDefined();
    expect(version).toMatch(/^\d+\.\d+\.\d+$/);
  });

  it('should have correct version format', () => {
    expect(version).toBe('0.1.0');
  });

  it('should expose the CLI name', () => {
    expect(appName).toBe('todo');
  });
});
