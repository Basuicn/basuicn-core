import fs from 'fs';

const arg = process.argv[2];
if (!arg) {
  console.error('Usage: node scripts/set-version.mjs <version|major|minor|patch>');
  console.error('  Examples: node scripts/set-version.mjs 1.0.0');
  console.error('            node scripts/set-version.mjs major');
  process.exit(1);
}

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
const [major, minor, patch] = pkg.version.split('.').map(Number);

let newVersion;
if (arg === 'major') newVersion = `${major + 1}.0.0`;
else if (arg === 'minor') newVersion = `${major}.${minor + 1}.0`;
else if (arg === 'patch') newVersion = `${major}.${minor}.${patch + 1}`;
else if (/^\d+\.\d+\.\d+$/.test(arg)) newVersion = arg;
else {
  console.error(`Invalid version: "${arg}"`);
  process.exit(1);
}

pkg.version = newVersion;
fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2) + '\n');

let cli = fs.readFileSync('./scripts/ui-cli.ts', 'utf-8');
cli = cli.replace(/const VERSION = '[^']+';/, `const VERSION = '${newVersion}';`);
fs.writeFileSync('./scripts/ui-cli.ts', cli);

console.log(`\x1b[32m✔\x1b[0m Version set → ${newVersion}`);
