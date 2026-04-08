import chalk from 'chalk';

export function printSummary(title: string, summary: string): void {
  console.log();
  console.log(chalk.bold.cyan(title));
  console.log(chalk.gray('='.repeat(40)));
  console.log(summary);
}

export function printSection(title: string, items: string[], icon?: string): void {
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
