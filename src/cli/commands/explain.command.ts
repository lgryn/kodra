import { Command } from 'commander';
import chalk from 'chalk';
import { explainCode } from '@app/use-cases/explain-code';
import { renderExplainResult } from '@cli/presenters/explain.presenter';
import { readFileContent } from '@shared/utils/read-file';

export function registerExplainCommand(program: Command) {
  const command = program
    .command('explain')
    .description('Explain a code file and print a structured summary')
    .argument('<file>', 'Path to file')
    .action(async (file) => {
      try {
        const code = await readFileContent(file);
        const result = await explainCode(code);

        renderExplainResult(result);
      } catch (err) {
        console.error(chalk.red('Error:'), err);
        process.exitCode = 1;
      }
    });

  command.addHelpText(
    'after',
    `
${chalk.bold.yellow('Environment')}
  This command requires ${chalk.bold('OPENAI_API_KEY')} and ${chalk.bold('OPENAI_MODEL')} in ${chalk.bold('.env')}.

${chalk.bold.magenta('Example')}
  ${chalk.green('kodra explain src/app/use-cases/explain-code.ts')}
`,
  );
}
