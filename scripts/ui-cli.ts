#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const REGISTRY_LOCAL = './registry.json';
const REGISTRY_REMOTE = 'https://raw.githubusercontent.com/huy14032003/ui-component/main/registry.json';

const log  = (msg: string) => console.log(`[basuicn] ${msg}`);
const warn = (msg: string) => console.warn(`[basuicn] WARN: ${msg}`);
const error = (msg: string) => console.error(`[basuicn] ERROR: ${msg}`);

const getTargetProjectDir = () => process.cwd();

// ─── Registry ──────────────────────���─────────────────────────────���────────────

interface RegistryFile { path: string; content: string }
interface RegistryComponent {
    dependencies: string[];
    internalDependencies?: string[];
    files: RegistryFile[];
}
interface Registry {
    core?: { dependencies: string[]; files: RegistryFile[] };
    components: Record<string, RegistryComponent>;
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

// ─── npm ──────────────────────────────────────────────────────────────────────

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

// ─── Packages ───────────────────────��─────────────────────────────��───────────

/** Build/dev tooling installed as devDependencies */
const VITE_DEV_PACKAGES = [
    'tailwindcss',
    '@tailwindcss/vite',
    '@vitejs/plugin-react',
    '@types/node',
];

/**
 * Runtime packages every project using these components needs.
 * Installed as regular dependencies.
 */
const RUNTIME_PACKAGES = [
    '@base-ui/react',
    'tailwind-variants',
    'clsx',
    'tailwind-merge',
    'tailwindcss-animate',
    'lucide-react',
];

// ─── Vite config ────────────────────────────���──────────────────────────��──────

const VITE_CONFIG_TEMPLATE = `import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [tailwindcss(), react()],
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

    if (!fs.existsSync(configTs) && !fs.existsSync(configJs)) {
        fs.writeFileSync(configTs, VITE_CONFIG_TEMPLATE);
        log('Created vite.config.ts.');
        return;
    }

    const existingPath = fs.existsSync(configTs) ? configTs : configJs;
    let content = fs.readFileSync(existingPath, 'utf-8');

    const missingImports: string[] = [];
    if (!content.includes('@tailwindcss/vite')) missingImports.push("import tailwindcss from '@tailwindcss/vite';");
    if (!content.includes('@vitejs/plugin-react')) missingImports.push("import react from '@vitejs/plugin-react';");
    if (!content.includes("from 'path'") && !content.includes('from "path"')) missingImports.push("import path from 'path';");

    const missingPlugins: string[] = [];
    if (!content.includes('tailwindcss()')) missingPlugins.push('tailwindcss()');
    if (!content.includes('react()') && !content.includes('react({')) missingPlugins.push('react()');

    const hasAlias = content.includes('alias:') || content.includes("'@'") || content.includes('"@"');

    if (missingImports.length === 0 && missingPlugins.length === 0 && hasAlias) {
        log('vite.config already configured — skipping.');
        return;
    }

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

    if (missingPlugins.length > 0) {
        const match = content.match(/plugins:\s*\[/);
        if (match && match.index !== undefined) {
            const pos = match.index + match[0].length;
            const after = content.slice(pos);
            const pluginLines = missingPlugins.map((p) => `\n      ${p},`).join('');
            const needsNewline = after.length > 0 && after[0] !== '\n' && after[0] !== '\r';
            content = content.slice(0, pos) + pluginLines + (needsNewline ? '\n      ' : '') + after;
        }
    }

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
    log(`Updated ${path.basename(existingPath)} with Tailwind + path aliases.`);
};

// ─── tsconfig ────────────────────────��────────────────────────────────���───────

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

    const newConfig = { compilerOptions: { baseUrl: '.', paths: TSCONFIG_PATHS } };
    fs.writeFileSync(path.join(cwd, 'tsconfig.json'), JSON.stringify(newConfig, null, 2));
    log('Created tsconfig.json with path aliases.');
};

// ─── Core files ────────────────────────────���─────────────────────────────��────

/**
 * Copy core files (cn.ts, index.css, ThemeProvider, themes.ts) from registry.
 * Pass force=true on `init` to always overwrite — keeps core up to date.
 */
const ensureCore = (
    registry: { core?: { dependencies: string[]; files: RegistryFile[] } },
    cwd: string,
    options: { force?: boolean } = {}
) => {
    const core = registry.core;
    if (!core) return;

    installNpmPackages(core.dependencies, cwd);

    for (const file of core.files) {
        const targetPath = path.join(cwd, file.path);
        const targetDir = path.dirname(targetPath);

        if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

        if (fs.existsSync(targetPath) && !options.force) {
            log(`Core file exists (skipping): ${file.path}`);
            continue;
        }

        fs.writeFileSync(targetPath, file.content);
        log(`${fs.existsSync(targetPath) ? 'Updated' : 'Created'} core file: ${file.path}`);
    }
};

// ─── main.tsx patching ────────────────────────────────────────────────────────

/**
 * Components that need additional setup in the main entry file.
 * Key = component name in registry, value = import + JSX to inject.
 */
const MAIN_PATCH_COMPONENTS: Record<string, { import: string; jsx: string }> = {
    toast: {
        import: "import { Toaster } from '@/components/ui/toast/Toaster';",
        jsx: '<Toaster position="top-center" expand={true} richColors />',
    },
};

const MAIN_CANDIDATES = ['src/main.tsx', 'src/main.jsx', 'src/index.tsx', 'src/index.jsx'];

const findMainFile = (cwd: string): string | null => {
    for (const c of MAIN_CANDIDATES) {
        const p = path.join(cwd, c);
        if (fs.existsSync(p)) return p;
    }
    return null;
};

const insertImport = (content: string, importLine: string): string => {
    // Don't add duplicate
    if (content.includes(importLine)) return content;
    const allImports = [...content.matchAll(/^import\s.+$/gm)];
    if (allImports.length > 0) {
        const last = allImports[allImports.length - 1];
        const pos = last.index! + last[0].length;
        return content.slice(0, pos) + '\n' + importLine + content.slice(pos);
    }
    return importLine + '\n' + content;
};

/**
 * Patches the main entry file to:
 *  1. Import src/styles/index.css (theme variables + Tailwind)
 *  2. Import ThemeProvider
 *  3. Wrap <App /> with <ThemeProvider>
 *
 * Safe to call multiple times — skips sections that are already set up.
 */
const patchMainTsx = (cwd: string) => {
    const mainPath = findMainFile(cwd);
    if (!mainPath) {
        warn('Could not find entry file (src/main.tsx). Skipping main entry setup.');
        return;
    }

    let content = fs.readFileSync(mainPath, 'utf-8');
    let changed = false;

    // 1. Ensure styles/index.css is imported
    const cssImportLine = "import './styles/index.css';";
    const hasCssImport = content.includes('styles/index.css') || content.includes('index.css');
    if (!hasCssImport) {
        // Insert at top before other imports
        const firstImport = content.match(/^import\s/m);
        if (firstImport?.index !== undefined) {
            content = content.slice(0, firstImport.index) + cssImportLine + '\n' + content.slice(firstImport.index);
        } else {
            content = cssImportLine + '\n' + content;
        }
        changed = true;
    } else if (!content.includes('styles/index.css')) {
        // Has some CSS import but not our theme CSS — add it alongside
        content = insertImport(content, cssImportLine);
        changed = true;
    }

    // 2. ThemeProvider
    if (!content.includes('ThemeProvider')) {
        content = insertImport(content, "import { ThemeProvider } from '@/lib/theme/ThemeProvider';");

        const wrapped = content.replace(/(<App\s*\/>)/g, '<ThemeProvider>\n      $1\n    </ThemeProvider>');
        if (wrapped === content) {
            warn('Could not locate <App /> in entry file — add <ThemeProvider> wrapper manually.');
        } else {
            content = wrapped;
        }
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(mainPath, content);
        log(`Patched ${path.relative(cwd, mainPath)}.`);
    } else {
        log(`${path.relative(cwd, mainPath)} already configured — skipping.`);
    }
};

/**
 * Injects a component's bootstrap JSX (e.g. <Toaster />) into the main entry file.
 * Places it inside <ThemeProvider> after <App />, falls back to right after <App />.
 */
const patchMainTsxComponent = (cwd: string, componentName: string) => {
    const patch = MAIN_PATCH_COMPONENTS[componentName];
    if (!patch) return;

    const mainPath = findMainFile(cwd);
    if (!mainPath) return;

    let content = fs.readFileSync(mainPath, 'utf-8');
    // Check by component tag name (e.g. "Toaster")
    const tagName = patch.jsx.match(/<(\w+)/)?.[1];
    if (tagName && content.includes(`<${tagName}`)) return;

    content = insertImport(content, patch.import);

    const withProvider = content.replace(
        /(<App\s*\/>)(\s*\n\s*<\/ThemeProvider>)/,
        `$1\n      ${patch.jsx}$2`
    );

    if (withProvider !== content) {
        fs.writeFileSync(mainPath, withProvider);
    } else {
        const fallback = content.replace(/(<App\s*\/>)/, `$1\n      ${patch.jsx}`);
        if (fallback !== content) fs.writeFileSync(mainPath, fallback);
    }

    log(`Added <${tagName}> to ${path.relative(cwd, mainPath)}.`);
};

// ─── Component add/remove ──────────────────────────��──────────────────────────

const addComponent = (
    name: string,
    registry: { core?: unknown; components: Record<string, RegistryComponent> },
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

        if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

        if (fs.existsSync(targetPath) && !options.force) {
            warn(`Skipped (exists): ${file.path} — use --force to overwrite`);
            continue;
        }

        fs.writeFileSync(targetPath, file.content);
        log(`Created: ${file.path}`);
    }
};

const removeComponent = (
    name: string,
    registry: { components: Record<string, { files: { path: string }[] }> },
    cwd: string
) => {
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

// ─── Commands ─────────────────────────────────────────────────────────────────

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

        case 'init': {
            log('Initializing project...');
            setupViteConfig(cwd);
            setupTsConfig(cwd);
            installNpmPackages(RUNTIME_PACKAGES, cwd);
            // force=true so init always refreshes core files to latest version
            ensureCore(registry, cwd, { force: true });
            patchMainTsx(cwd);
            log('Initialization complete.');
            break;
        }

        case 'add': {
            if (componentNames.length === 0) {
                error('Usage: npx basuicn add <component-name> [--force]');
                return;
            }

            // Auto-init if project hasn't been initialized yet
            const cnPath = path.join(cwd, 'src/lib/utils/cn.ts');
            if (!fs.existsSync(cnPath)) {
                log('Project not initialized — running init first...');
                setupViteConfig(cwd);
                setupTsConfig(cwd);
                installNpmPackages(RUNTIME_PACKAGES, cwd);
                ensureCore(registry, cwd, { force: true });
                patchMainTsx(cwd);
            }

            for (const name of componentNames) {
                addComponent(name, registry, cwd, { force: isForce });
                patchMainTsxComponent(cwd, name);
            }
            log('Done!');
            break;
        }

        case 'update': {
            if (componentNames.length === 0) {
                error('Usage: npx basuicn update <component-name> [...]');
                return;
            }
            for (const name of componentNames) {
                log(`Updating: ${name}...`);
                addComponent(name, registry, cwd, { force: true });
            }
            log('Update complete.');
            break;
        }

        case 'remove': {
            if (componentNames.length === 0) {
                error('Usage: npx basuicn remove <component-name>');
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
                const comp = registry.components[k];
                const deps = comp.internalDependencies?.filter(Boolean);
                const depStr = deps?.length ? ` (requires: ${deps.join(', ')})` : '';
                console.log(`  - ${k}${depStr}`);
            }
            break;
        }

        case 'diff': {
            if (componentNames.length === 0) {
                error('Usage: npx basuicn diff <component-name>');
                return;
            }
            for (const name of componentNames) {
                const component = registry.components[name];
                if (!component) {
                    error(`Component "${name}" not found. Run 'list' to see available components.`);
                    continue;
                }
                let hasDiff = false;
                console.log(`\n[diff] ${name}`);
                for (const file of component.files) {
                    const targetPath = path.join(cwd, file.path);
                    if (!fs.existsSync(targetPath)) {
                        console.log(`  + [new file] ${file.path}`);
                        hasDiff = true;
                        continue;
                    }
                    const localContent = fs.readFileSync(targetPath, 'utf-8');
                    if (localContent === file.content) continue;
                    hasDiff = true;
                    console.log(`\n  ~ ${file.path}`);
                    const localLines = localContent.split('\n');
                    const remoteLines = file.content.split('\n');
                    const maxLen = Math.max(localLines.length, remoteLines.length);
                    let shownLines = 0;
                    for (let i = 0; i < maxLen; i++) {
                        if (localLines[i] !== remoteLines[i]) {
                            if (localLines[i] !== undefined) console.log(`    - ${localLines[i]}`);
                            if (remoteLines[i] !== undefined) console.log(`    + ${remoteLines[i]}`);
                            shownLines++;
                            if (shownLines >= 20) {
                                const remaining = maxLen - i - 1;
                                if (remaining > 0) console.log(`    ... and ${remaining} more lines`);
                                break;
                            }
                        }
                    }
                }
                if (!hasDiff) log(`${name}: already up to date.`);
            }
            break;
        }

        case 'doctor': {
            log('Running project health check...\n');
            let issues = 0;
            const check = (ok: boolean, msg: string, fix?: string) => {
                console.log(`${ok ? '  ✓' : '  ✗'} ${msg}`);
                if (!ok) { if (fix) console.log(`      → ${fix}`); issues++; }
            };

            // ── Core files ──────────────────────────────────────────────────
            check(fs.existsSync(path.join(cwd, 'src/lib/utils/cn.ts')),
                'src/lib/utils/cn.ts', 'run: npx basuicn init');
            check(fs.existsSync(path.join(cwd, 'src/lib/theme/themes.ts')),
                'src/lib/theme/themes.ts', 'run: npx basuicn init');
            check(fs.existsSync(path.join(cwd, 'src/lib/theme/ThemeProvider.tsx')),
                'src/lib/theme/ThemeProvider.tsx', 'run: npx basuicn init');
            check(fs.existsSync(path.join(cwd, 'src/styles/index.css')),
                'src/styles/index.css (theme variables)', 'run: npx basuicn init');

            // ── main entry ────────────────���──────────────────────────��──────
            const mainPath = findMainFile(cwd);
            if (mainPath) {
                const mainContent = fs.readFileSync(mainPath, 'utf-8');
                check(mainContent.includes('ThemeProvider'),
                    'ThemeProvider in main entry', 'run: npx basuicn init');
                check(mainContent.includes('styles/index.css') || mainContent.includes('index.css'),
                    'CSS import in main entry', 'run: npx basuicn init');
            } else {
                check(false, 'main entry file (src/main.tsx)', 'create src/main.tsx');
            }

            // ── Runtime packages ─────────────────────────��──────────────────
            const pkgPath = path.join(cwd, 'package.json');
            if (fs.existsSync(pkgPath)) {
                const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
                const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
                for (const dep of RUNTIME_PACKAGES) {
                    check(!!allDeps[dep], `package: ${dep}`, `run: npm install ${dep}`);
                }
                // Dev packages
                for (const dep of VITE_DEV_PACKAGES) {
                    check(!!allDeps[dep], `package (dev): ${dep}`, `run: npm install -D ${dep}`);
                }
            } else {
                check(false, 'package.json found', 'run: npm init -y');
            }

            // ── Config files ────────────────────���───────────────────────────
            const hasTailwindInCss = (() => {
                const candidates = ['src/styles/index.css', 'src/index.css', 'src/App.css'];
                return candidates.some(f => {
                    const p = path.join(cwd, f);
                    if (!fs.existsSync(p)) return false;
                    const c = fs.readFileSync(p, 'utf-8');
                    return c.includes('@import "tailwindcss"') || c.includes("@import 'tailwindcss'");
                });
            })();
            check(hasTailwindInCss, '@import "tailwindcss" in CSS', 'run: npx basuicn init');

            const tsCandidates = ['tsconfig.app.json', 'tsconfig.json'];
            const hasAlias = tsCandidates.some(f => {
                const p = path.join(cwd, f);
                if (!fs.existsSync(p)) return false;
                const c = fs.readFileSync(p, 'utf-8');
                return c.includes('"@/*"') || c.includes("'@/*'");
            });
            check(hasAlias, 'TypeScript path aliases (@/*)', 'run: npx basuicn init');

            const hasViteConfig =
                fs.existsSync(path.join(cwd, 'vite.config.ts')) ||
                fs.existsSync(path.join(cwd, 'vite.config.js'));
            check(hasViteConfig, 'vite.config.ts / vite.config.js', 'run: npx basuicn init');

            console.log('');
            if (issues === 0) {
                log('All checks passed! Project is healthy.');
            } else {
                warn(`${issues} issue(s) found. Run "npx basuicn init" to fix most issues.`);
            }
            break;
        }

        default: {
            console.log(`
  basuicn — UI Component CLI

  Commands:
    init                     Set up project: install deps, copy core files, patch main entry
    add <name> [--force]     Add component(s) to your project
    update <name>            Update component(s) to latest registry version
    diff <name>              Show diff between local and registry version
    remove <name>            Remove component(s) from your project
    list                     List all available components
    doctor                   Check project health and configuration

  Options:
    --local                  Use local registry.json instead of remote
    --force                  Overwrite existing files when adding

  Quick start:
    npx basuicn init
    npx basuicn add button
    npx basuicn add toast
`);
        }
    }
};

main();
