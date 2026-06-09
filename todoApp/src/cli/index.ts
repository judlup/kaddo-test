#!/usr/bin/env node

import { createProgram } from "./program.js";

const program = createProgram();
const argv = process.argv.filter((arg, index) => index <= 1 || arg !== "--");

program.parse(argv);
