import { build } from 'esbuild';

await build({
  entryPoints: ['scripts/ui-cli.ts'],
  bundle: true,
  platform: 'node',
  outfile: 'dist/ui-cli.cjs',
  format: 'cjs',
  packages: 'external',
  banner: { js: '#!/usr/bin/env node' },
});

console.log('✔ CLI built → dist/ui-cli.cjs');
