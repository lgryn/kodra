import chalk from 'chalk';
import type { ExplainResponse } from '@shared/schemas/explain-response.schema';

export function renderExplainResult(result: ExplainResponse) {
  console.log();
  console.log(chalk.bold.cyan('Explanation'));
  console.log(chalk.gray('='.repeat(40)));
  console.log(result.summary);

  printSection('Responsibilities', result.responsibilities, '\u{1F4CC}');
  printSection('Key dependencies', result.keyDependencies, '\u{1F517}');
  printSection('Risks', result.risks, '\u{26A0}\u{FE0F}');
  printSection('Improvements', result.improvements, '\u{2728}');
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
