import fs from 'fs';
import { execSync } from 'child_process';

// Skip if triggered by a version bump commit (avoid infinite loop)
const lastMsg = execSync('git log -1 --pretty=%s').toString().trim();
if (lastMsg.startsWith('chore: bump version')) process.exit(0);

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
const [major, minor, patch] = pkg.version.split('.').map(Number);
const newVersion = `${major}.${minor}.${patch + 1}`;

pkg.version = newVersion;
fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2) + '\n');

let cli = fs.readFileSync('./scripts/ui-cli.ts', 'utf-8');
cli = cli.replace(/const VERSION = '[^']+';/, `const VERSION = '${newVersion}';`);
fs.writeFileSync('./scripts/ui-cli.ts', cli);

execSync('git add package.json scripts/ui-cli.ts');
execSync(`git commit --no-verify -m "chore: bump version to ${newVersion}"`);

console.log(`\x1b[32m✔\x1b[0m Bumped version → ${newVersion}`);
