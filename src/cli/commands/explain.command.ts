import { Command } from 'commander';
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

        console.log('\nExplanation:\n');
        console.log(result);
      } catch (err) {
        console.error('Error:', err);
        process.exitCode = 1;
      }
    });
}
