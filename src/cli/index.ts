#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import { registerExplainCommand } from '@cli/commands/explain.command';

const program = new Command();

program.name('kodra').description('AI dev CLI tool').version('0.1.0');
program.showHelpAfterError();
program.addHelpText(
  'after',
  `
${chalk.bold.cyan('Quick Start')}
  ${chalk.green('kodra explain <file>')}    Explain a code file with OpenAI

${chalk.bold.yellow('Environment')}
  OpenAI-powered commands require a ${chalk.bold('.env')} file with:
  ${chalk.gray('OPENAI_API_KEY=your_key')}
  ${chalk.gray('OPENAI_MODEL=gpt-4o-mini')}

${chalk.bold.magenta('Example')}
  ${chalk.green('kodra explain src/cli/index.ts')}
`,
);

registerExplainCommand(program);

program.parse();
