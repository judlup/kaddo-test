import { Command } from "commander";
import { APP_DESCRIPTION, APP_NAME, APP_VERSION } from "../shared/app-info.js";

export function createProgram(): Command {
  const program = new Command();

  program
    .name(APP_NAME)
    .description(APP_DESCRIPTION)
    .version(APP_VERSION);

  return program;
}
