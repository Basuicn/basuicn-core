#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const REGISTRY_LOCAL = './registry.json';
const REGISTRY_REMOTE = 'https://raw.githubusercontent.com/huy14032003/ui-component/main/registry.json';

const log = (msg: string) => console.log(`[base-cus-ui] ${msg}`);
const warn = (msg: string) => console.warn(`[base-cus-ui] WARN: ${msg}`);
const error = (msg: string) => console.error(`[base-cus-ui] ERROR: ${msg}`);

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

const installNpmPackages = (packages: string[], cwd: string, dev = false) => {
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
    const flag = dev ? '--save-dev' : '--save';
    try {
        execSync(`npm install ${toInstall.join(' ')} ${flag}`, { stdio: 'inherit', cwd });
    } catch (err) {
        error(`Failed to install packages: ${toInstall.join(', ')}. ${err instanceof Error ? err.message : ''}`);
    }
};

const VITE_DEV_PACKAGES = ['tailwindcss', '@tailwindcss/vite', '@vitejs/plugin-react', 'vite-plugin-babel', 'babel-plugin-react-compiler', '@types/node'];

// Runtime packages always required — installed regardless of registry content
const RUNTIME_PACKAGES = ['@base-ui/react', 'tailwind-variants', 'clsx', 'tailwind-merge', 'tailwindcss-animate'];

const VITE_CONFIG_TEMPLATE = `import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import babel from 'vite-plugin-babel';
import { reactCompilerPreset } from 'babel-plugin-react-compiler';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@components': path.resolve(__dirname, './src/components'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@styles': path.resolve(__dirname, './src/styles'),
    },
  },
});
`;

const TSCONFIG_PATHS = {
    '@/*': ['./src/*'],
    '@lib/*': ['./src/lib/*'],
    '@components/*': ['./src/components/*'],
    '@assets/*': ['./src/assets/*'],
    '@pages/*': ['./src/pages/*'],
    '@styles/*': ['./src/styles/*'],
};

const setupViteConfig = (cwd: string) => {
    installNpmPackages(VITE_DEV_PACKAGES, cwd, true);

    const configTs = path.join(cwd, 'vite.config.ts');
    const configJs = path.join(cwd, 'vite.config.js');

    // No config exists — create from template
    if (!fs.existsSync(configTs) && !fs.existsSync(configJs)) {
        fs.writeFileSync(configTs, VITE_CONFIG_TEMPLATE);
        log('Created vite.config.ts with Tailwind + React Compiler setup.');
        return;
    }

    const existingPath = fs.existsSync(configTs) ? configTs : configJs;
    let content = fs.readFileSync(existingPath, 'utf-8');

    const missingImports: string[] = [];
    if (!content.includes('@tailwindcss/vite')) missingImports.push("import tailwindcss from '@tailwindcss/vite';");
    if (!content.includes('@vitejs/plugin-react')) missingImports.push("import react from '@vitejs/plugin-react';");
    if (!content.includes('vite-plugin-babel')) missingImports.push("import babel from 'vite-plugin-babel';");
    if (!content.includes('babel-plugin-react-compiler')) missingImports.push("import { reactCompilerPreset } from 'babel-plugin-react-compiler';");
    if (!content.includes("from 'path'") && !content.includes('from "path"')) missingImports.push("import path from 'path';");

    const missingPlugins: string[] = [];
    if (!content.includes('tailwindcss()')) missingPlugins.push('tailwindcss()');
    if (!content.includes('react()') && !content.includes('react({')) missingPlugins.push('react()');
    if (!content.includes('reactCompilerPreset')) missingPlugins.push("babel({ presets: [reactCompilerPreset()] })");

    const hasAlias = content.includes('alias:') || content.includes('alias(') || content.includes("'@'") || content.includes('"@"');

    if (missingImports.length === 0 && missingPlugins.length === 0 && hasAlias) {
        log('vite.config already configured — skipping.');
        return;
    }

    // --- Auto-patch the file ---

    // 1. Insert missing imports after the last import statement
    if (missingImports.length > 0) {
        const importBlock = missingImports.join('\n');
        const allImports = [...content.matchAll(/^import\s.+$/gm)];
        if (allImports.length > 0) {
            const last = allImports[allImports.length - 1];
            const pos = last.index! + last[0].length;
            content = content.slice(0, pos) + '\n' + importBlock + content.slice(pos);
        } else {
            content = importBlock + '\n' + content;
        }
    }

    // 2. Insert missing plugins into plugins: [...]
    if (missingPlugins.length > 0) {
        const match = content.match(/plugins:\s*\[/);
        if (match && match.index !== undefined) {
            const pos = match.index + match[0].length;
            const after = content.slice(pos);
            const pluginLines = missingPlugins.map((p) => `\n      ${p},`).join('');
            // If existing content continues on the same line (e.g. `plugins: [react()],`),
            // push it to a new line so formatting stays clean
            const needsNewline = after.length > 0 && after[0] !== '\n' && after[0] !== '\r';
            content = content.slice(0, pos) + pluginLines + (needsNewline ? '\n      ' : '') + after;
        }
    }

    // 3. Insert resolve.alias block if missing
    if (!hasAlias) {
        const aliasBlock = [
            '  resolve: {',
            '    alias: {',
            "      '@': path.resolve(__dirname, './src'),",
            "      '@lib': path.resolve(__dirname, './src/lib'),",
            "      '@components': path.resolve(__dirname, './src/components'),",
            "      '@assets': path.resolve(__dirname, './src/assets'),",
            "      '@pages': path.resolve(__dirname, './src/pages'),",
            "      '@styles': path.resolve(__dirname, './src/styles'),",
            '    },',
            '  },',
        ].join('\n');

        // Find end of plugins array, then insert after that line
        const pluginsStart = content.search(/plugins:\s*\[/);
        if (pluginsStart !== -1) {
            let depth = 0;
            let foundStart = false;
            for (let i = pluginsStart; i < content.length; i++) {
                if (content[i] === '[') { depth++; foundStart = true; }
                if (content[i] === ']') depth--;
                if (foundStart && depth === 0) {
                    let lineEnd = content.indexOf('\n', i);
                    if (lineEnd === -1) lineEnd = content.length;
                    content = content.slice(0, lineEnd + 1) + aliasBlock + '\n' + content.slice(lineEnd + 1);
                    break;
                }
            }
        }
    }

    fs.writeFileSync(existingPath, content);
    log(`Updated ${path.basename(existingPath)} with Tailwind + React Compiler + path aliases.`);
};

const ensureTailwindCss = (cwd: string) => {
    const candidates = ['src/index.css', 'src/App.css', 'src/main.css'];
    for (const cssFile of candidates) {
        const cssPath = path.join(cwd, cssFile);
        if (fs.existsSync(cssPath)) {
            const content = fs.readFileSync(cssPath, 'utf-8');
            if (!content.includes('@import "tailwindcss"') && !content.includes("@import 'tailwindcss'")) {
                fs.writeFileSync(cssPath, `@import "tailwindcss";\n\n${content}`);
                log(`Added @import "tailwindcss" to ${cssFile}`);
            } else {
                log(`${cssFile} already imports Tailwind — skipping.`);
            }
            return;
        }
    }
    // No CSS file found — create src/index.css
    const srcDir = path.join(cwd, 'src');
    if (!fs.existsSync(srcDir)) fs.mkdirSync(srcDir, { recursive: true });
    fs.writeFileSync(path.join(srcDir, 'index.css'), '@import "tailwindcss";\n');
    log('Created src/index.css with @import "tailwindcss"');
};

const setupTsConfig = (cwd: string) => {
    const candidates = ['tsconfig.app.json', 'tsconfig.json'];

    for (const candidate of candidates) {
        const configPath = path.join(cwd, candidate);
        if (!fs.existsSync(configPath)) continue;

        const raw = fs.readFileSync(configPath, 'utf-8');

        if (raw.includes('"@/*"') || raw.includes("'@/*'")) {
            log(`${candidate} already has path aliases — skipping.`);
            return;
        }

        try {
            // Strip comments safely: block comments first, then single-line comments
            // only when they appear outside of string values (preceded by whitespace or line start)
            const stripped = raw
                .replace(/\/\*[\s\S]*?\*\//g, '')
                .replace(/(^|[\s,{[\]])\/\/[^\n]*/g, '$1');
            const parsed = JSON.parse(stripped) as { compilerOptions?: Record<string, unknown> };
            if (!parsed.compilerOptions) parsed.compilerOptions = {};
            parsed.compilerOptions.baseUrl = '.';
            parsed.compilerOptions.paths = TSCONFIG_PATHS;
            fs.writeFileSync(configPath, JSON.stringify(parsed, null, 2));
            log(`Added path aliases to ${candidate}.`);
        } catch (err) {
            warn(`Could not auto-patch ${candidate}: ${err instanceof Error ? err.message : err}`);
            warn('Add these to compilerOptions manually:');
            console.log('\n  "baseUrl": ".",');
            console.log('  "paths": {');
            for (const [alias, targets] of Object.entries(TSCONFIG_PATHS)) {
                console.log(`    "${alias}": ["${targets[0]}"],`);
            }
            console.log('  }');
            console.log('');
        }
        return;
    }

    // No tsconfig found — create a minimal one
    const newConfig = { compilerOptions: { baseUrl: '.', paths: TSCONFIG_PATHS } };
    fs.writeFileSync(path.join(cwd, 'tsconfig.json'), JSON.stringify(newConfig, null, 2));
    log('Created tsconfig.json with path aliases.');
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
                error('Usage: npx base-cus-ui add <component-name> [--force]');
                return;
            }

            // Auto-init if not yet initialized
            const cnPath = path.join(cwd, 'src/lib/utils/cn.ts');
            if (!fs.existsSync(cnPath)) {
                log('Project not initialized — running init first...');
                setupViteConfig(cwd);
                setupTsConfig(cwd);
                ensureTailwindCss(cwd);
                installNpmPackages(RUNTIME_PACKAGES, cwd);
            }

            for (const name of componentNames) {
                addComponent(name, registry, cwd, { force: isForce });
            }
            log('Done!');
            break;
        }

        case 'remove': {
            if (componentNames.length === 0) {
                error('Usage: npx base-cus-ui remove <component-name>');
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
            setupViteConfig(cwd);
            setupTsConfig(cwd);
            ensureTailwindCss(cwd);
            installNpmPackages(RUNTIME_PACKAGES, cwd);
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
  base-cus-ui — UI Component CLI

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
