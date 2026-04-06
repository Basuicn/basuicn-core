import { build } from 'esbuild';

await build({
  entryPoints: ['scripts/ui-cli.ts'],
  bundle: true,
  platform: 'node',
  outfile: 'dist/ui-cli.cjs',
  format: 'cjs',
  packages: 'external',
});

console.log('✔ CLI built → dist/ui-cli.cjs');
