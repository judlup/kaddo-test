export interface Migration {
  name: string;
  sql: string;
}

import { migration as m001Init } from './001_init';

// Migrations are registered here in order.
// Each entry corresponds to a work item in knowledge/delivery/work-items/.
export const migrations: Migration[] = [
  m001Init,
];
