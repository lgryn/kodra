import type { ExplainResponse } from '@shared/schemas/explain-response.schema';
import { printSection, printSummary } from '@cli/presenters/print.utils';

export function renderExplainResult(result: ExplainResponse): void {
  printSummary('Explanation', result.summary);

  printSection('Responsibilities', result.responsibilities, '\u{1F4CC}');
  printSection('Key dependencies', result.keyDependencies, '\u{1F517}');
  printSection('Risks', result.risks, '\u{26A0}\u{FE0F}');
  printSection('Improvements', result.improvements, '\u{2728}');
}
