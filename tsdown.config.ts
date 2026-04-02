import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: {
    'cli/index': 'src/cli/index.ts',
  },
  platform: 'node',
  format: 'esm',
  target: 'node20',
  dts: true,
  clean: true,
  fixedExtension: false,
});
