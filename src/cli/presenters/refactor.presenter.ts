import chalk from 'chalk';
import { printSection, printSummary } from '@cli/presenters/print.utils';
import type { RefactorResponse } from '@shared/schemas/refactor-response.schema';

export function renderRefactorResult(result: RefactorResponse): void {
  printSummary('Refactor', result.summary);

  printSection('Changes', result.changes, '\u{1F6E0}\u{FE0F}');
  printSection('Risks', result.risks, '\u{26A0}\u{FE0F}');

  console.log();
  console.log(chalk.bold.yellow('\u{1F4C4} Refactored code'));
  console.log(chalk.gray('-'.repeat(40)));
  console.log(result.refactoredCode);
}
