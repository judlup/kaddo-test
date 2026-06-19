import { Command } from 'commander';

const program = new Command();

program
  .name('todo')
  .description('Aplicación CLI de tareas pendientes (TODO) respaldada por SQLite')
  .version('1.0.0');

program.parse(process.argv);
