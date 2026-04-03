/**
 * Syncs the default theme CSS variables from themes.ts → src/styles/index.css.
 * Run via: npm run theme:sync
 *
 * Replaces the content between:
 *   /* GENERATED:theme-start *\/
 *   /* GENERATED:theme-end *\/
 * in index.css with fresh values from themes[0].
 */

import fs from 'fs';
import path from 'path';
import { themes } from '../src/lib/theme/themes';

const CSS_PATH = path.resolve('src/styles/index.css');
const START_MARKER = '/* GENERATED:theme-start */';
const END_MARKER   = '/* GENERATED:theme-end */';

const INDENT = '        '; // 8 spaces — matches :root { } indentation in index.css

const { colors: c } = themes[0];
const vars: [string, string][] = [
    ['--background',              c.background],
    ['--foreground',              c.foreground],
    ['--primary',                 c.primary],
    ['--primary-foreground',      c.primaryForeground],
    ['--secondary',               c.secondary],
    ['--secondary-foreground',    c.secondaryForeground],
    ['--muted',                   c.muted],
    ['--muted-foreground',        c.mutedForeground],
    ['--accent',                  c.accent],
    ['--accent-foreground',       c.accentForeground],
    ['--success',                 c.success],
    ['--success-foreground',      c.successForeground],
    ['--warning',                 c.warning],
    ['--warning-foreground',      c.warningForeground],
    ['--danger',                  c.danger],
    ['--danger-foreground',       c.dangerForeground],
    ['--destructive',             c.danger],
    ['--destructive-foreground',  c.dangerForeground],
    ['--border',                  c.border],
    ['--input',                   c.input],
    ['--ring',                    c.ring],
    ['--popover',                 c.popover],
    ['--popover-foreground',      c.popoverForeground],
];

const generated = [
    START_MARKER,
    `${INDENT}/* Auto-generated from themes.ts — run \`npm run theme:sync\` to update */`,
    ...vars.map(([k, v]) => `${INDENT}${k}: ${v};`),
    `${INDENT}${END_MARKER}`,
].join('\n');

const css = fs.readFileSync(CSS_PATH, 'utf-8');

const startIdx = css.indexOf(START_MARKER);
const endIdx   = css.indexOf(END_MARKER);

if (startIdx === -1 || endIdx === -1) {
    console.error(
        `[theme:sync] Markers not found in ${CSS_PATH}.\n` +
        `Add these two comments inside @layer base :root { }:\n\n` +
        `  ${START_MARKER}\n  ${END_MARKER}\n`
    );
    process.exit(1);
}

const before = css.slice(0, startIdx);
const after  = css.slice(endIdx + END_MARKER.length);
const result = before + generated + after;

fs.writeFileSync(CSS_PATH, result, 'utf-8');
console.log(`[theme:sync] Synced default theme "${themes[0].name}" → ${CSS_PATH}`);
