import { describe, it, expect } from 'vitest';
import { NotFoundError, ValidationError } from './errors';
import { DEFAULT_PRIORITY, DEFAULT_STATUS, PRIORITIES, STATUSES } from './constants';

describe('errors', () => {
  it('NotFoundError formats message correctly', () => {
    const err = new NotFoundError('Task', 42);
    expect(err.message).toBe('Task with id 42 not found');
    expect(err.name).toBe('NotFoundError');
  });

  it('ValidationError preserves message', () => {
    const err = new ValidationError('title is required');
    expect(err.message).toBe('title is required');
    expect(err.name).toBe('ValidationError');
  });
});

describe('constants', () => {
  it('default status is todo', () => {
    expect(DEFAULT_STATUS).toBe('todo');
  });

  it('default priority is medium', () => {
    expect(DEFAULT_PRIORITY).toBe('medium');
  });

  it('statuses contain expected values', () => {
    expect(STATUSES).toContain('todo');
    expect(STATUSES).toContain('in-progress');
    expect(STATUSES).toContain('done');
  });

  it('priorities contain expected values', () => {
    expect(PRIORITIES).toContain('low');
    expect(PRIORITIES).toContain('medium');
    expect(PRIORITIES).toContain('high');
  });
});
