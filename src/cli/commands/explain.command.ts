import { Command } from 'commander';
import chalk from 'chalk';
import { explainCode } from '@app/use-cases/explain-code';
import { readFileContent } from '@shared/utils/read-file';

export function registerExplainCommand(program: Command) {
  program
    .command('explain')
    .argument('<file>', 'Path to file')
    .action(async (file) => {
      try {
        const code = await readFileContent(file);
        const result = await explainCode(code);

        console.log();
        console.log(chalk.bold.cyan('Explanation'));
        console.log(chalk.gray('='.repeat(40)));
        console.log(result.summary);

        printSection('Responsibilities', result.responsibilities, '\u{1F4CC}');
        printSection('Key dependencies', result.keyDependencies, '\u{1F517}');
        printSection('Risks', result.risks, '\u{26A0}\u{FE0F}');
        printSection('Improvements', result.improvements, '\u{2728}');
      } catch (err) {
        console.error(chalk.red('Error:'), err);
        process.exitCode = 1;
      }
    });
}

function printSection(title: string, items: string[], icon?: string) {
  console.log();
  const heading = icon ? `${icon} ${title}` : title;
  console.log(chalk.bold.yellow(heading));

  if (items.length === 0) {
    console.log(chalk.gray('- None'));
    return;
  }

  for (const item of items) {
    console.log(`${chalk.green('-')} ${item}`);
  }
}
