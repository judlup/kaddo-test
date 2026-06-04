export interface Migration {
  name: string;
  sql: string;
}

// Migrations are registered here in order.
// Each entry corresponds to a work item in knowledge/delivery/work-items/.
// WI-003 will add the first migration (001_init).
export const migrations: Migration[] = [];
