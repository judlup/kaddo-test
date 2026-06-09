import { resolve } from "node:path";

export const DEFAULT_DATABASE_PATH = resolve(process.cwd(), "data", "app.sqlite");

export interface DatabaseConfig {
  path?: string;
}

export function resolveDatabasePath(config: DatabaseConfig = {}): string {
  return config.path ?? DEFAULT_DATABASE_PATH;
}
