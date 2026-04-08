import { Command } from 'commander';
import chalk from 'chalk';
import { refactorCode } from '@app/use-cases/refactor-code';
import { renderRefactorResult } from '@cli/presenters/refactor.presenter';
import { readFileContent } from '@shared/utils/read-file';

export function registerRefactorCommand(program: Command): void {
  const command = program
    .command('refactor')
    .description('Refactor a code file and print a structured result')
    .argument('<file>', 'Path to file')
    .requiredOption('--goal <goal>', 'Refactor goal')
    .action(async (file: string, options: { goal: string }) => {
      try {
        const code = await readFileContent(file);
        const result = await refactorCode(code, options.goal);

        renderRefactorResult(result);
      } catch (err) {
        console.error(chalk.red('Error:'), err);
        process.exitCode = 1;
      }
    });

  command.addHelpText(
    'after',
    `
${chalk.bold.yellow('Environment')}
  This command requires ${chalk.bold('OPENAI_API_KEY')} in ${chalk.bold('.env')}.

${chalk.bold.magenta('Example')}
  ${chalk.green('kodra refactor src/app/use-cases/explain-code.ts --goal "improve readability and reduce duplication"')}
`,
  );
}
