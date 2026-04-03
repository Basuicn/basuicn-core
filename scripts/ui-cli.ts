#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const REGISTRY_LOCAL = './registry.json';
const REGISTRY_REMOTE = 'https://raw.githubusercontent.com/huy14032003/ui-component/main/registry.json';

const log = (msg: string) => console.log(`[CUS-BASE-UI] ${msg}`);
const warn = (msg: string) => console.warn(`[CUS-BASE-UI] WARN: ${msg}`);
const error = (msg: string) => console.error(`[CUS-BASE-UI] ERROR: ${msg}`);

const getTargetProjectDir = () => process.cwd();

interface Registry {
    core?: { dependencies: string[]; files: { path: string; content: string }[] };
    components: Record<string, { dependencies: string[]; internalDependencies?: string[]; files: { path: string; content: string }[] }>;
}

const validateRegistry = (data: unknown): data is Registry => {
    if (!data || typeof data !== 'object') return false;
    const reg = data as Record<string, unknown>;
    return 'components' in reg && typeof reg.components === 'object' && reg.components !== null;
};

const getRegistry = async (isLocal: boolean): Promise<Registry> => {
    if (isLocal && fs.existsSync(REGISTRY_LOCAL)) {
        log('Using local registry...');
        try {
            const data = JSON.parse(fs.readFileSync(REGISTRY_LOCAL, 'utf-8'));
            if (!validateRegistry(data)) {
                error('Invalid local registry format — missing "components" field.');
                process.exit(1);
            }
            return data;
        } catch (err) {
            error(`Failed to parse local registry: ${err instanceof Error ? err.message : err}`);
            process.exit(1);
        }
    }

    log('Fetching registry from remote...');
    try {
        const response = await fetch(REGISTRY_REMOTE);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (!validateRegistry(data)) {
            error('Invalid remote registry format — missing "components" field.');
            process.exit(1);
        }
        return data;
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        error(`Cannot fetch registry: ${message}`);
        process.exit(1);
    }
};

const installNpmPackages = (packages: string[], cwd: string) => {
    if (packages.length === 0) return;

    const pkgJsonPath = path.join(cwd, 'package.json');
    let toInstall = packages;

    if (fs.existsSync(pkgJsonPath)) {
        const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'));
        const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
        toInstall = packages.filter((p) => !allDeps[p]);
    }

    if (toInstall.length === 0) return;

    log(`Installing: ${toInstall.join(', ')}...`);
    try {
        execSync(`npm install ${toInstall.join(' ')} --save`, { stdio: 'inherit', cwd });
    } catch (err) {
        error(`Failed to install packages: ${toInstall.join(', ')}. ${err instanceof Error ? err.message : ''}`);
    }
};

const ensureCore = (registry: { core?: { dependencies: string[]; files: { path: string; content: string }[] } }, cwd: string) => {
    const core = registry.core;
    if (!core) return;

    installNpmPackages(core.dependencies, cwd);

    for (const file of core.files) {
        const targetPath = path.join(cwd, file.path);
        const targetDir = path.dirname(targetPath);

        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        if (!fs.existsSync(targetPath)) {
            fs.writeFileSync(targetPath, file.content);
            log(`Created core file: ${file.path}`);
        }
    }
};

const addComponent = (
    name: string,
    registry: { core?: unknown; components: Record<string, { dependencies: string[]; internalDependencies?: string[]; files: { path: string; content: string }[] }> },
    cwd: string,
    options: { force: boolean },
    added: Set<string> = new Set()
) => {
    if (added.has(name)) return;
    added.add(name);

    const component = registry.components[name];
    if (!component) {
        error(`Component "${name}" not found. Run 'list' to see available components.`);
        return;
    }

    log(`Adding: ${name}...`);

    ensureCore(registry as Parameters<typeof ensureCore>[0], cwd);
    installNpmPackages(component.dependencies, cwd);

    // Resolve internal dependencies first
    if (component.internalDependencies) {
        for (const dep of component.internalDependencies) {
            if (registry.components[dep]) {
                addComponent(dep, registry, cwd, options, added);
            }
        }
    }

    for (const file of component.files) {
        const targetPath = path.join(cwd, file.path);
        const targetDir = path.dirname(targetPath);

        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        if (fs.existsSync(targetPath) && !options.force) {
            warn(`Skipped (exists): ${file.path} — use --force to overwrite`);
            continue;
        }

        fs.writeFileSync(targetPath, file.content);
        log(`Created: ${file.path}`);
    }
};

const removeComponent = (name: string, registry: { components: Record<string, { files: { path: string }[] }> }, cwd: string) => {
    const component = registry.components[name];
    if (!component) {
        error(`Component "${name}" not found.`);
        return;
    }

    log(`Removing: ${name}...`);

    for (const file of component.files) {
        const targetPath = path.join(cwd, file.path);
        if (fs.existsSync(targetPath)) {
            fs.unlinkSync(targetPath);
            log(`Deleted: ${file.path}`);
        }
    }

    // Clean up empty directories
    for (const file of component.files) {
        const targetDir = path.dirname(path.join(cwd, file.path));
        try {
            if (fs.existsSync(targetDir) && fs.readdirSync(targetDir).length === 0) {
                fs.rmdirSync(targetDir);
                log(`Removed empty dir: ${path.relative(cwd, targetDir)}`);
            }
        } catch (err) {
            warn(`Could not remove directory: ${err instanceof Error ? err.message : err}`);
        }
    }
};

const main = async () => {
    const args = process.argv.slice(2);
    const isLocal = args.includes('--local');
    const isForce = args.includes('--force');
    const filteredArgs = args.filter((a) => !a.startsWith('--'));
    const command = filteredArgs[0];
    const componentNames = filteredArgs.slice(1);

    const cwd = getTargetProjectDir();
    const registry = await getRegistry(isLocal);

    switch (command) {
        case 'add': {
            if (componentNames.length === 0) {
                error('Usage: npx cus-base-ui add <component-name> [--force]');
                return;
            }
            for (const name of componentNames) {
                addComponent(name, registry, cwd, { force: isForce });
            }
            log('Done!');
            break;
        }

        case 'remove': {
            if (componentNames.length === 0) {
                error('Usage: npx cus-base-ui remove <component-name>');
                return;
            }
            for (const name of componentNames) {
                removeComponent(name, registry, cwd);
            }
            log('Done!');
            break;
        }

        case 'list': {
            const components = Object.keys(registry.components).sort();
            log(`Available components (${components.length}):`);
            for (const k of components) {
                const deps = registry.components[k].internalDependencies;
                const depStr = deps?.length ? ` (requires: ${deps.join(', ')})` : '';
                console.log(`  - ${k}${depStr}`);
            }
            break;
        }

        case 'init': {
            ensureCore(registry, cwd);
            log('Initialization complete.');
            break;
        }

        case 'tailwind': {
            console.log('\n--- Copy to tailwind.config.ts / tailwind.config.js ---\n');
            console.log('// See README_CLI.md for full theme config');
            break;
        }

        default: {
            console.log(`
  cus-base-ui — UI Component CLI

  Commands:
    init                     Initialize project (install core deps + files)
    add <name> [--force]     Add component(s) to your project
    remove <name>            Remove component(s) from your project
    list                     List all available components
    tailwind                 Show Tailwind config instructions

  Options:
    --local                  Use local registry.json instead of remote
    --force                  Overwrite existing files when adding
`);
        }
    }
};

main();
