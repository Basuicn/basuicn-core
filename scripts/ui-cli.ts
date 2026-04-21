#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import readline from 'readline';

// ─── Constants ────────────────────────────────────────────────────────────────

const VERSION = '0.3.1';
const REGISTRY_LOCAL = './registry.json';
const REGISTRY_REMOTE = 'https://raw.githubusercontent.com/Basuicn/basuicn-core/main/registry.json';

// ─── Colors (ANSI) ───────────────────────────────────────────────────────────

const c = {
    reset: '\x1b[0m',
    bold: '\x1b[1m',
    dim: '\x1b[2m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    cyan: '\x1b[36m',
    magenta: '\x1b[35m',
    blue: '\x1b[34m',
    gray: '\x1b[90m',
};

const log   = (msg: string) => console.log(`${c.cyan}▸${c.reset} ${msg}`);
const ok    = (msg: string) => console.log(`${c.green}✔${c.reset} ${msg}`);
const warn  = (msg: string) => console.warn(`${c.yellow}⚠${c.reset} ${msg}`);
const error = (msg: string) => console.error(`${c.red}✖${c.reset} ${msg}`);

const getTargetProjectDir = () => process.cwd();

// ─── Framework detection ──────────────────────────────────────────────────────

type Framework = 'vite' | 'nextjs-app' | 'nextjs-pages';

const detectFramework = (cwd: string): Framework => {
    const hasNextConfig =
        fs.existsSync(path.join(cwd, 'next.config.js')) ||
        fs.existsSync(path.join(cwd, 'next.config.ts')) ||
        fs.existsSync(path.join(cwd, 'next.config.mjs'));

    const hasNextDep = (() => {
        const pkgPath = path.join(cwd, 'package.json');
        if (!fs.existsSync(pkgPath)) return false;
        try {
            const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8')) as Record<string, unknown>;
            const all = { ...(pkg.dependencies as object || {}), ...(pkg.devDependencies as object || {}) } as Record<string, string>;
            return !!all['next'];
        } catch { return false; }
    })();

    if (hasNextConfig || hasNextDep) {
        const hasAppDir =
            fs.existsSync(path.join(cwd, 'src/app')) ||
            fs.existsSync(path.join(cwd, 'app'));
        const hasPagesDir =
            fs.existsSync(path.join(cwd, 'src/pages')) ||
            fs.existsSync(path.join(cwd, 'pages'));
        if (hasPagesDir && !hasAppDir) return 'nextjs-pages';
        return 'nextjs-app';
    }

    return 'vite';
};

// ─── Interactive prompt ──────────────────────────────────────────────────────

const ask = (question: string): Promise<string> => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise((resolve) => {
        rl.question(`${c.cyan}?${c.reset} ${question} `, (answer) => {
            rl.close();
            resolve(answer.trim());
        });
    });
};

const confirm = async (question: string, defaultYes = true): Promise<boolean> => {
    const hint = defaultYes ? 'Y/n' : 'y/N';
    const answer = await ask(`${question} ${c.dim}(${hint})${c.reset}`);
    if (!answer) return defaultYes;
    return answer.toLowerCase().startsWith('y');
};

// ─── Registry ─────────────────────────────────────────────────────────────────

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

    log(`Installing: ${c.bold}${toInstall.join(', ')}${c.reset}...`);
    const flag = dev ? '--save-dev' : '--save';
    try {
        execSync(`npm install ${toInstall.join(' ')} ${flag}`, { stdio: 'inherit', cwd });
    } catch (err) {
        error(`Failed to install packages: ${toInstall.join(', ')}. ${err instanceof Error ? err.message : ''}`);
    }
};

// ─── Packages ─────────────────────────────────────────────────────────────────

const VITE_DEV_PACKAGES = [
    'tailwindcss',
    '@tailwindcss/vite',
    '@vitejs/plugin-react',
    '@types/node',
];

const RUNTIME_PACKAGES = [
    '@base-ui/react',
    'tailwind-variants',
    'clsx',
    'tailwind-merge',
    'tailwindcss-animate',
    'lucide-react',
];

const NEXTJS_DEV_PACKAGES = [
    'tailwindcss',
    '@tailwindcss/postcss',
    '@types/node',
];

const POSTCSS_CONFIG_TEMPLATE = `const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

export default config;
`;

// ─── Vite config ──────────────────────────────────────────────────────────────

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
        ok('Created vite.config.ts.');
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
        ok('vite.config already configured — skipping.');
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
    ok(`Updated ${path.basename(existingPath)} with Tailwind + path aliases.`);
};

// ─── Next.js config ───────────────────────────────────────────────────────────

const setupNextConfig = (cwd: string) => {
    installNpmPackages(NEXTJS_DEV_PACKAGES, cwd, true);

    const postcssCandidates = ['postcss.config.mjs', 'postcss.config.js', 'postcss.config.cjs'];
    const existingPostcss = postcssCandidates.map(f => path.join(cwd, f)).find(p => fs.existsSync(p));

    if (!existingPostcss) {
        fs.writeFileSync(path.join(cwd, 'postcss.config.mjs'), POSTCSS_CONFIG_TEMPLATE);
        ok('Created postcss.config.mjs with @tailwindcss/postcss.');
        return;
    }

    const content = fs.readFileSync(existingPostcss, 'utf-8');
    if (!content.includes('@tailwindcss/postcss') && !content.includes('tailwindcss')) {
        warn(`${path.basename(existingPostcss)} found but missing Tailwind plugin — add '@tailwindcss/postcss': {} to plugins manually.`);
    } else {
        ok(`${path.basename(existingPostcss)} already configured — skipping.`);
    }
};

// ─── tsconfig ─────────────────────────────────────────────────────────────────

const setupTsConfig = (cwd: string) => {
    const candidates = ['tsconfig.app.json', 'tsconfig.json'];

    for (const candidate of candidates) {
        const configPath = path.join(cwd, candidate);
        if (!fs.existsSync(configPath)) continue;

        const raw = fs.readFileSync(configPath, 'utf-8');

        if (raw.includes('"@/*"') || raw.includes("'@/*'")) {
            ok(`${candidate} already has path aliases — skipping.`);
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
            ok(`Added path aliases to ${candidate}.`);
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
    ok('Created tsconfig.json with path aliases.');
};

// ─── Core files ───────────────────────────────────────────────────────────────

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
            log(`Core file exists (skipping): ${c.dim}${file.path}${c.reset}`);
            continue;
        }

        fs.writeFileSync(targetPath, file.content);
        ok(`${fs.existsSync(targetPath) ? 'Updated' : 'Created'} core file: ${file.path}`);
    }
};

// ─── Next.js layout patching ─────────────────────────────────────────────────

const NEXT_APP_LAYOUT_CANDIDATES = [
    'src/app/layout.tsx', 'src/app/layout.jsx',
    'app/layout.tsx', 'app/layout.jsx',
];

const NEXT_PAGES_APP_CANDIDATES = [
    'src/pages/_app.tsx', 'src/pages/_app.jsx',
    'pages/_app.tsx', 'pages/_app.jsx',
];

const findNextLayoutFile = (cwd: string): string | null => {
    for (const c of NEXT_APP_LAYOUT_CANDIDATES) {
        const p = path.join(cwd, c);
        if (fs.existsSync(p)) return p;
    }
    return null;
};

const findNextPagesAppFile = (cwd: string): string | null => {
    for (const c of NEXT_PAGES_APP_CANDIDATES) {
        const p = path.join(cwd, c);
        if (fs.existsSync(p)) return p;
    }
    return null;
};

const patchNextLayout = (cwd: string) => {
    const layoutPath = findNextLayoutFile(cwd);
    if (!layoutPath) {
        warn('Could not find app/layout.tsx — add ThemeProvider and CSS import manually.');
        return;
    }

    let content = fs.readFileSync(layoutPath, 'utf-8');
    let changed = false;

    // CSS import
    const cssImport = "import '@/styles/index.css';";
    if (!content.includes('styles/index.css') && !content.includes('index.css')) {
        const firstImport = content.match(/^import\s/m);
        if (firstImport?.index !== undefined) {
            content = content.slice(0, firstImport.index) + cssImport + '\n' + content.slice(firstImport.index);
        } else {
            content = cssImport + '\n' + content;
        }
        changed = true;
    }

    // ThemeProvider
    if (!content.includes('ThemeProvider')) {
        content = insertImport(content, "import { ThemeProvider } from '@/lib/theme/ThemeProvider';");
        // Wrap {children} with ThemeProvider
        const wrapped = content.replace(/\{children\}/, '<ThemeProvider>{children}</ThemeProvider>');
        if (wrapped !== content) {
            content = wrapped;
        } else {
            warn('Could not locate {children} in layout.tsx — add <ThemeProvider> wrapper manually.');
        }
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(layoutPath, content);
        ok(`Patched ${path.relative(cwd, layoutPath)}.`);
    } else {
        ok(`${path.relative(cwd, layoutPath)} already configured — skipping.`);
    }
};

const patchNextPagesApp = (cwd: string) => {
    const appPath = findNextPagesAppFile(cwd);
    if (!appPath) {
        warn('Could not find pages/_app.tsx — add ThemeProvider and CSS import manually.');
        return;
    }

    let content = fs.readFileSync(appPath, 'utf-8');
    let changed = false;

    // CSS import
    const cssImport = "import '@/styles/index.css';";
    if (!content.includes('styles/index.css') && !content.includes('index.css')) {
        content = insertImport(content, cssImport);
        changed = true;
    }

    // ThemeProvider
    if (!content.includes('ThemeProvider')) {
        content = insertImport(content, "import { ThemeProvider } from '@/lib/theme/ThemeProvider';");
        const wrapped = content.replace(/(<Component\s[^/]*\/\s*>)/, '<ThemeProvider>\n        $1\n      </ThemeProvider>');
        if (wrapped !== content) {
            content = wrapped;
        } else {
            warn('Could not locate <Component .../> in _app.tsx — add <ThemeProvider> wrapper manually.');
        }
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(appPath, content);
        ok(`Patched ${path.relative(cwd, appPath)}.`);
    } else {
        ok(`${path.relative(cwd, appPath)} already configured — skipping.`);
    }
};

const patchNextLayoutComponent = (cwd: string, patch: { import: string; jsx: string }) => {
    const layoutPath = findNextLayoutFile(cwd);
    if (!layoutPath) {
        warn(`Could not find Next.js layout — add ${patch.jsx} manually.`);
        return;
    }

    let content = fs.readFileSync(layoutPath, 'utf-8');
    const tagName = patch.jsx.match(/<(\w+)/)?.[1];
    if (tagName && content.includes(`<${tagName}`)) return;

    content = insertImport(content, patch.import);
    // Insert before </body>
    const updated = content.replace(/<\/body>/, `  ${patch.jsx}\n      </body>`);
    if (updated !== content) {
        fs.writeFileSync(layoutPath, updated);
        ok(`Added <${tagName}> to ${path.relative(cwd, layoutPath)}.`);
    } else {
        warn(`Could not auto-add <${tagName}> to layout.tsx — add it manually.`);
    }
};

const patchNextPagesAppComponent = (cwd: string, patch: { import: string; jsx: string }) => {
    const appPath = findNextPagesAppFile(cwd);
    if (!appPath) {
        warn(`Could not find pages/_app.tsx — add ${patch.jsx} manually.`);
        return;
    }

    let content = fs.readFileSync(appPath, 'utf-8');
    const tagName = patch.jsx.match(/<(\w+)/)?.[1];
    if (tagName && content.includes(`<${tagName}`)) return;

    content = insertImport(content, patch.import);
    // Insert after <Component .../>
    let updated = content.replace(
        /(<Component\s[^/]*\/\s*>)(\s*\n\s*<\/ThemeProvider>)/,
        `$1\n      ${patch.jsx}$2`
    );
    if (updated === content) {
        updated = content.replace(/(<Component\s[^/]*\/\s*>)/, `$1\n      ${patch.jsx}`);
    }
    if (updated !== content) {
        fs.writeFileSync(appPath, updated);
        ok(`Added <${tagName}> to ${path.relative(cwd, appPath)}.`);
    } else {
        warn(`Could not auto-add <${tagName}> to _app.tsx — add it manually.`);
    }
};

const patchEntryFile = (cwd: string, framework: Framework) => {
    if (framework === 'nextjs-app') patchNextLayout(cwd);
    else if (framework === 'nextjs-pages') patchNextPagesApp(cwd);
    else patchMainTsx(cwd);
};

const patchEntryComponentFile = (cwd: string, componentName: string, framework: Framework) => {
    const patch = MAIN_PATCH_COMPONENTS[componentName];
    if (!patch) return;
    if (framework === 'nextjs-app') patchNextLayoutComponent(cwd, patch);
    else if (framework === 'nextjs-pages') patchNextPagesAppComponent(cwd, patch);
    else patchMainTsxComponent(cwd, componentName);
};

// ─── main.tsx patching ────────────────────────────────────────────────────────

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
    if (content.includes(importLine)) return content;
    const allImports = [...content.matchAll(/^import\s.+$/gm)];
    if (allImports.length > 0) {
        const last = allImports[allImports.length - 1];
        const pos = last.index! + last[0].length;
        return content.slice(0, pos) + '\n' + importLine + content.slice(pos);
    }
    return importLine + '\n' + content;
};

const patchMainTsx = (cwd: string) => {
    const mainPath = findMainFile(cwd);
    if (!mainPath) {
        warn('Could not find entry file (src/main.tsx). Skipping main entry setup.');
        return;
    }

    let content = fs.readFileSync(mainPath, 'utf-8');
    let changed = false;

    const cssImportLine = "import './styles/index.css';";
    const hasCssImport = content.includes('styles/index.css') || content.includes('index.css');
    if (!hasCssImport) {
        const firstImport = content.match(/^import\s/m);
        if (firstImport?.index !== undefined) {
            content = content.slice(0, firstImport.index) + cssImportLine + '\n' + content.slice(firstImport.index);
        } else {
            content = cssImportLine + '\n' + content;
        }
        changed = true;
    } else if (!content.includes('styles/index.css')) {
        content = insertImport(content, cssImportLine);
        changed = true;
    }

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
        ok(`Patched ${path.relative(cwd, mainPath)}.`);
    } else {
        ok(`${path.relative(cwd, mainPath)} already configured — skipping.`);
    }
};

const patchMainTsxComponent = (cwd: string, componentName: string) => {
    const patch = MAIN_PATCH_COMPONENTS[componentName];
    if (!patch) return;

    const mainPath = findMainFile(cwd);
    if (!mainPath) return;

    let content = fs.readFileSync(mainPath, 'utf-8');
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

    ok(`Added <${tagName}> to ${path.relative(cwd, mainPath)}.`);
};

// ─── index.ts barrel update ───────────────────────────────────────────────────

const UI_INDEX_PATH = 'src/components/ui/index.ts';
const UI_INDEX_DIR  = 'src/components/ui';

/** Pick the primary .tsx component file (skip tests, stories, hooks) */
const pickMainFile = (files: RegistryFile[]): RegistryFile | undefined =>
    files.find(
        (f) =>
            f.path.startsWith(UI_INDEX_DIR + '/') &&
            f.path.endsWith('.tsx') &&
            !f.path.includes('.test.') &&
            !f.path.includes('.stories.'),
    );

/** Append `export * from './dir/File';` to index.ts if not already present */
const addToComponentIndex = (componentFiles: RegistryFile[], cwd: string) => {
    const indexPath = path.join(cwd, UI_INDEX_PATH);
    if (!fs.existsSync(indexPath)) return;

    const mainFile = pickMainFile(componentFiles);
    if (!mainFile) return;

    const withoutExt = mainFile.path.replace(/\.tsx$/, '');
    const relPath = './' + path.relative(UI_INDEX_DIR, withoutExt).replace(/\\/g, '/');
    const exportLine = `export * from '${relPath}';`;

    const content = fs.readFileSync(indexPath, 'utf-8');
    if (content.includes(relPath)) return;

    fs.writeFileSync(indexPath, content.trimEnd() + '\n' + exportLine + '\n');
    ok(`Updated index.ts: added ${c.dim}${relPath}${c.reset}`);
};

/** Remove the export line from index.ts */
const removeFromComponentIndex = (componentFiles: RegistryFile[], cwd: string) => {
    const indexPath = path.join(cwd, UI_INDEX_PATH);
    if (!fs.existsSync(indexPath)) return;

    const mainFile = pickMainFile(componentFiles);
    if (!mainFile) return;

    const withoutExt = mainFile.path.replace(/\.tsx$/, '');
    const relPath = './' + path.relative(UI_INDEX_DIR, withoutExt).replace(/\\/g, '/');

    const content = fs.readFileSync(indexPath, 'utf-8');
    const filtered = content
        .split('\n')
        .filter((line) => !line.includes(relPath))
        .join('\n');

    if (filtered === content) return;
    fs.writeFileSync(indexPath, filtered);
    ok(`Updated index.ts: removed ${c.dim}${relPath}${c.reset}`);
};

// ─── Component add/remove ─────────────────────────────────────────────────────

const addComponent = (
    name: string,
    registry: { core?: unknown; components: Record<string, RegistryComponent> },
    cwd: string,
    options: { force: boolean; framework?: Framework },
    added: Set<string> = new Set()
) => {
    if (added.has(name)) return;
    added.add(name);

    const component = registry.components[name];
    if (!component) {
        error(`Component "${name}" not found. Run '${c.cyan}basuicn list${c.reset}' to see available components.`);
        return;
    }

    log(`Adding: ${c.bold}${name}${c.reset}...`);

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
            warn(`Skipped (exists): ${file.path} — use ${c.cyan}--force${c.reset} to overwrite`);
            continue;
        }

        // Add 'use client' for Next.js App Router TSX components that don't already have it
        let content = file.content;
        if (options.framework === 'nextjs-app' && file.path.endsWith('.tsx')) {
            if (!content.startsWith("'use client'") && !content.startsWith('"use client"')) {
                content = "'use client';\n" + content;
            }
        }

        fs.writeFileSync(targetPath, content);
        ok(`Created: ${file.path}`);
    }

    addToComponentIndex(component.files, cwd);
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

    log(`Removing: ${c.bold}${name}${c.reset}...`);

    for (const file of component.files) {
        const targetPath = path.join(cwd, file.path);
        if (fs.existsSync(targetPath)) {
            fs.unlinkSync(targetPath);
            ok(`Deleted: ${file.path}`);
        }
    }

    for (const file of component.files) {
        const targetDir = path.dirname(path.join(cwd, file.path));
        try {
            if (fs.existsSync(targetDir) && fs.readdirSync(targetDir).length === 0) {
                fs.rmdirSync(targetDir);
                ok(`Removed empty dir: ${path.relative(cwd, targetDir)}`);
            }
        } catch (err) {
            warn(`Could not remove directory: ${err instanceof Error ? err.message : err}`);
        }
    }

    removeFromComponentIndex(component.files as RegistryFile[], cwd);
};

// ─── Help texts ───────────────────────────────────────────────────────────────

const HELP_MAIN = `
${c.bold}${c.cyan}basuicn${c.reset} ${c.dim}v${VERSION}${c.reset} — Modern React UI Component CLI

${c.bold}USAGE${c.reset}
  ${c.cyan}npx basuicn${c.reset} ${c.green}<command>${c.reset} ${c.dim}[options]${c.reset}

${c.bold}COMMANDS${c.reset}
  ${c.green}init${c.reset}                       Initialize project: install deps, copy core files, patch entry
  ${c.green}add${c.reset} ${c.dim}<name...>${c.reset}             Add component(s) to your project
  ${c.green}update${c.reset} ${c.dim}<name...>${c.reset}          Update component(s) to latest registry version
  ${c.green}diff${c.reset} ${c.dim}<name...>${c.reset}            Show diff between local and registry version
  ${c.green}remove${c.reset} ${c.dim}<name...>${c.reset}          Remove component(s) from your project
  ${c.green}list${c.reset}                       List all available components
  ${c.green}doctor${c.reset}                     Check project health and configuration

${c.bold}OPTIONS${c.reset}
  ${c.cyan}--force${c.reset}                    Overwrite existing files when adding/updating
  ${c.cyan}--local${c.reset}                    Use local registry.json instead of remote
  ${c.cyan}--help, -h${c.reset}                 Show help (use with a command for detailed help)
  ${c.cyan}--version, -v${c.reset}              Show version

${c.bold}QUICK START${c.reset}
  ${c.dim}$${c.reset} npx basuicn init
  ${c.dim}$${c.reset} npx basuicn add button input card
  ${c.dim}$${c.reset} npx basuicn add toast

${c.bold}EXAMPLES${c.reset}
  ${c.dim}$${c.reset} npx basuicn add dialog --force   ${c.dim}# Overwrite existing dialog${c.reset}
  ${c.dim}$${c.reset} npx basuicn diff button           ${c.dim}# See what changed since last update${c.reset}
  ${c.dim}$${c.reset} npx basuicn doctor                ${c.dim}# Diagnose missing deps/config${c.reset}

${c.dim}Documentation: https://github.com/Basuicn/basuicn-core${c.reset}
`;

const HELP_COMMANDS: Record<string, string> = {
    init: `
${c.bold}basuicn init${c.reset}

  Initialize your project for basuicn components.
  Auto-detects Vite or Next.js (App Router / Pages Router).

  ${c.bold}What it does (Vite):${c.reset}
    1. Installs runtime dependencies (@base-ui/react, tailwind-variants, etc.)
    2. Sets up vite.config.ts with Tailwind CSS + path aliases
    3. Patches tsconfig.json with path aliases (@/*, @lib/*, etc.)
    4. Copies core files (cn.ts, themes.ts, ThemeProvider.tsx, index.css)
    5. Wraps your <App /> with <ThemeProvider> in src/main.tsx

  ${c.bold}What it does (Next.js):${c.reset}
    1. Installs runtime dependencies (@base-ui/react, tailwind-variants, etc.)
    2. Sets up postcss.config.mjs with @tailwindcss/postcss
    3. Patches tsconfig.json with path aliases (@/*, @lib/*, etc.)
    4. Copies core files (cn.ts, themes.ts, ThemeProvider.tsx, index.css)
    5. Wraps {children} with <ThemeProvider> in app/layout.tsx (or pages/_app.tsx)

  ${c.bold}Usage:${c.reset}
    ${c.dim}$${c.reset} npx basuicn init
    ${c.dim}$${c.reset} npx basuicn init --local   ${c.dim}# Use local registry${c.reset}
`,
    add: `
${c.bold}basuicn add${c.reset} ${c.dim}<name...>${c.reset}

  Add one or more components to your project.

  ${c.bold}Options:${c.reset}
    ${c.cyan}--force${c.reset}    Overwrite existing component files

  ${c.bold}Features:${c.reset}
    • Auto-runs init if project hasn't been set up
    • Resolves internal dependencies (e.g., dialog depends on button)
    • Installs required npm packages automatically
    • Patches main entry for components that need it (e.g., toast)

  ${c.bold}Usage:${c.reset}
    ${c.dim}$${c.reset} npx basuicn add button
    ${c.dim}$${c.reset} npx basuicn add button input card dialog
    ${c.dim}$${c.reset} npx basuicn add toast --force

  ${c.bold}Interactive:${c.reset}
    ${c.dim}$${c.reset} npx basuicn add           ${c.dim}# Prompts to select components${c.reset}
`,
    update: `
${c.bold}basuicn update${c.reset} ${c.dim}<name...>${c.reset}

  Update component(s) to the latest registry version.
  Equivalent to ${c.cyan}add --force${c.reset}.

  ${c.bold}Usage:${c.reset}
    ${c.dim}$${c.reset} npx basuicn update button
    ${c.dim}$${c.reset} npx basuicn update button card dialog
`,
    remove: `
${c.bold}basuicn remove${c.reset} ${c.dim}<name...>${c.reset}

  Remove component(s) from your project.
  Deletes component files and cleans up empty directories.

  ${c.bold}Usage:${c.reset}
    ${c.dim}$${c.reset} npx basuicn remove button
    ${c.dim}$${c.reset} npx basuicn remove dialog drawer sheet
`,
    diff: `
${c.bold}basuicn diff${c.reset} ${c.dim}<name...>${c.reset}

  Show differences between your local component files and the registry version.
  Useful to see what has changed before running update.

  ${c.bold}Usage:${c.reset}
    ${c.dim}$${c.reset} npx basuicn diff button
    ${c.dim}$${c.reset} npx basuicn diff button card
`,
    list: `
${c.bold}basuicn list${c.reset}

  Show all available components in the registry.
  Displays internal dependencies for each component.

  ${c.bold}Usage:${c.reset}
    ${c.dim}$${c.reset} npx basuicn list
`,
    doctor: `
${c.bold}basuicn doctor${c.reset}

  Run a health check on your project configuration.

  ${c.bold}Checks:${c.reset}
    • Core files exist (cn.ts, themes.ts, ThemeProvider.tsx, index.css)
    • ThemeProvider + CSS import in main entry
    • Runtime packages installed
    • Dev packages installed
    • Tailwind CSS configured
    • TypeScript path aliases
    • Vite config present

  ${c.bold}Usage:${c.reset}
    ${c.dim}$${c.reset} npx basuicn doctor
`,
};

// ─── Commands ─────────────────────────────────────────────────────────────────

const main = async () => {
    const args = process.argv.slice(2);

    // Version flag
    if (args.includes('--version') || args.includes('-v')) {
        console.log(`basuicn v${VERSION}`);
        return;
    }

    const isLocal = args.includes('--local');
    const isForce = args.includes('--force');
    const isHelp = args.includes('--help') || args.includes('-h');
    const filteredArgs = args.filter((a) => !a.startsWith('--') && a !== '-h' && a !== '-v');
    const command = filteredArgs[0];
    const componentNames = filteredArgs.slice(1);

    // Help for specific command
    if (isHelp && command && HELP_COMMANDS[command]) {
        console.log(HELP_COMMANDS[command]);
        return;
    }

    // General help
    if (isHelp || !command) {
        console.log(HELP_MAIN);
        return;
    }

    const cwd = getTargetProjectDir();
    const registry = await getRegistry(isLocal);

    switch (command) {

        case 'init': {
            log('Initializing project...');
            const framework = detectFramework(cwd);
            if (framework === 'vite') {
                setupViteConfig(cwd);
            } else {
                log(`Detected Next.js (${framework === 'nextjs-app' ? 'App Router' : 'Pages Router'}).`);
                setupNextConfig(cwd);
            }
            setupTsConfig(cwd);
            installNpmPackages(RUNTIME_PACKAGES, cwd);
            ensureCore(registry, cwd, { force: true });
            patchEntryFile(cwd, framework);
            console.log('');
            ok(`${c.bold}Initialization complete!${c.reset} Run ${c.cyan}npx basuicn add <component>${c.reset} to get started.`);
            break;
        }

        case 'add': {
            let names = componentNames;

            // Interactive mode: no component names provided
            if (names.length === 0) {
                const all = Object.keys(registry.components).sort();
                console.log(`\n${c.bold}Available components (${all.length}):${c.reset}`);

                // Group by category
                const categories: Record<string, string[]> = {};
                for (const name of all) {
                    const prefix = name.includes('-') ? name.split('-')[0] : 'general';
                    if (!categories[prefix]) categories[prefix] = [];
                    categories[prefix].push(name);
                }

                // Print in columns
                const cols = 4;
                for (let i = 0; i < all.length; i += cols) {
                    const row = all.slice(i, i + cols).map(n => n.padEnd(20)).join('');
                    console.log(`  ${c.dim}${row}${c.reset}`);
                }

                console.log('');
                const answer = await ask(`Which components to add? ${c.dim}(space-separated, or "all")${c.reset}`);
                if (!answer) {
                    log('No components selected.');
                    return;
                }
                names = answer === 'all' ? all : answer.split(/[\s,]+/).filter(Boolean);
            }

            // Auto-init if project hasn't been initialized yet
            const cnPath = path.join(cwd, 'src/lib/utils/cn.ts');
            const framework = detectFramework(cwd);
            if (!fs.existsSync(cnPath)) {
                log('Project not initialized — running init first...');
                if (framework === 'vite') {
                    setupViteConfig(cwd);
                } else {
                    log(`Detected Next.js (${framework === 'nextjs-app' ? 'App Router' : 'Pages Router'}).`);
                    setupNextConfig(cwd);
                }
                setupTsConfig(cwd);
                installNpmPackages(RUNTIME_PACKAGES, cwd);
                ensureCore(registry, cwd, { force: true });
                patchEntryFile(cwd, framework);
                console.log('');
            }

            for (const name of names) {
                addComponent(name, registry, cwd, { force: isForce, framework });
                patchEntryComponentFile(cwd, name, framework);
            }
            console.log('');
            ok(`${c.bold}Done!${c.reset} Added ${names.length} component(s).`);
            break;
        }

        case 'update': {
            if (componentNames.length === 0) {
                error(`Usage: ${c.cyan}npx basuicn update <component-name> [...]${c.reset}`);
                console.log(`  Run ${c.cyan}npx basuicn update --help${c.reset} for details.`);
                return;
            }
            for (const name of componentNames) {
                log(`Updating: ${c.bold}${name}${c.reset}...`);
                addComponent(name, registry, cwd, { force: true });
            }
            console.log('');
            ok(`${c.bold}Update complete.${c.reset}`);
            break;
        }

        case 'remove': {
            if (componentNames.length === 0) {
                error(`Usage: ${c.cyan}npx basuicn remove <component-name>${c.reset}`);
                return;
            }

            if (!isForce) {
                const yes = await confirm(`Remove ${componentNames.join(', ')}?`);
                if (!yes) {
                    log('Cancelled.');
                    return;
                }
            }

            for (const name of componentNames) {
                removeComponent(name, registry, cwd);
            }
            console.log('');
            ok(`${c.bold}Done!${c.reset}`);
            break;
        }

        case 'list': {
            const components = Object.keys(registry.components).sort();
            console.log(`\n${c.bold}Available components (${components.length}):${c.reset}\n`);

            const installed: string[] = [];
            const available: string[] = [];

            for (const k of components) {
                const comp = registry.components[k];
                const firstFile = comp.files[0];
                const isInstalled = firstFile && fs.existsSync(path.join(cwd, firstFile.path));
                if (isInstalled) installed.push(k);
                else available.push(k);
            }

            if (installed.length > 0) {
                console.log(`  ${c.green}Installed (${installed.length}):${c.reset}`);
                for (const k of installed) {
                    const deps = registry.components[k].internalDependencies?.filter(Boolean);
                    const depStr = deps?.length ? ` ${c.dim}→ ${deps.join(', ')}${c.reset}` : '';
                    console.log(`    ${c.green}●${c.reset} ${k}${depStr}`);
                }
                console.log('');
            }

            if (available.length > 0) {
                console.log(`  ${c.dim}Available (${available.length}):${c.reset}`);
                for (const k of available) {
                    const deps = registry.components[k].internalDependencies?.filter(Boolean);
                    const depStr = deps?.length ? ` ${c.dim}→ ${deps.join(', ')}${c.reset}` : '';
                    console.log(`    ${c.dim}○${c.reset} ${k}${depStr}`);
                }
            }
            console.log('');
            break;
        }

        case 'diff': {
            if (componentNames.length === 0) {
                error(`Usage: ${c.cyan}npx basuicn diff <component-name>${c.reset}`);
                return;
            }
            for (const name of componentNames) {
                const component = registry.components[name];
                if (!component) {
                    error(`Component "${name}" not found.`);
                    continue;
                }
                let hasDiff = false;
                console.log(`\n${c.bold}[diff] ${name}${c.reset}`);
                for (const file of component.files) {
                    const targetPath = path.join(cwd, file.path);
                    if (!fs.existsSync(targetPath)) {
                        console.log(`  ${c.green}+ [new file]${c.reset} ${file.path}`);
                        hasDiff = true;
                        continue;
                    }
                    const localContent = fs.readFileSync(targetPath, 'utf-8');
                    if (localContent === file.content) continue;
                    hasDiff = true;
                    console.log(`\n  ${c.yellow}~${c.reset} ${file.path}`);
                    const localLines = localContent.split('\n');
                    const remoteLines = file.content.split('\n');
                    const maxLen = Math.max(localLines.length, remoteLines.length);
                    let shownLines = 0;
                    for (let i = 0; i < maxLen; i++) {
                        if (localLines[i] !== remoteLines[i]) {
                            if (localLines[i] !== undefined) console.log(`    ${c.red}- ${localLines[i]}${c.reset}`);
                            if (remoteLines[i] !== undefined) console.log(`    ${c.green}+ ${remoteLines[i]}${c.reset}`);
                            shownLines++;
                            if (shownLines >= 20) {
                                const remaining = maxLen - i - 1;
                                if (remaining > 0) console.log(`    ${c.dim}... and ${remaining} more lines${c.reset}`);
                                break;
                            }
                        }
                    }
                }
                if (!hasDiff) ok(`${name}: already up to date.`);
            }
            break;
        }

        case 'doctor': {
            console.log(`\n${c.bold}Project Health Check${c.reset}\n`);
            let issues = 0;
            const check = (passed: boolean, msg: string, fix?: string) => {
                console.log(`  ${passed ? `${c.green}✔${c.reset}` : `${c.red}✖${c.reset}`} ${msg}`);
                if (!passed) { if (fix) console.log(`    ${c.dim}→ ${fix}${c.reset}`); issues++; }
            };

            const docFramework = detectFramework(cwd);
            if (docFramework !== 'vite') {
                console.log(`  ${c.cyan}ℹ${c.reset} Framework: Next.js (${docFramework === 'nextjs-app' ? 'App Router' : 'Pages Router'})\n`);
            }

            // Core files
            check(fs.existsSync(path.join(cwd, 'src/lib/utils/cn.ts')),
                'src/lib/utils/cn.ts', 'run: npx basuicn init');
            check(fs.existsSync(path.join(cwd, 'src/lib/theme/themes.ts')),
                'src/lib/theme/themes.ts', 'run: npx basuicn init');
            check(fs.existsSync(path.join(cwd, 'src/lib/theme/ThemeProvider.tsx')),
                'src/lib/theme/ThemeProvider.tsx', 'run: npx basuicn init');
            check(fs.existsSync(path.join(cwd, 'src/styles/index.css')),
                'src/styles/index.css (theme variables)', 'run: npx basuicn init');

            // Entry file check (framework-aware)
            if (docFramework === 'nextjs-app') {
                const layoutPath = findNextLayoutFile(cwd);
                if (layoutPath) {
                    const layoutContent = fs.readFileSync(layoutPath, 'utf-8');
                    check(layoutContent.includes('ThemeProvider'), 'ThemeProvider in app/layout.tsx', 'run: npx basuicn init');
                    check(layoutContent.includes('styles/index.css') || layoutContent.includes('index.css'), 'CSS import in app/layout.tsx', 'run: npx basuicn init');
                } else {
                    check(false, 'app/layout.tsx', 'create src/app/layout.tsx');
                }
            } else if (docFramework === 'nextjs-pages') {
                const pagesAppPath = findNextPagesAppFile(cwd);
                if (pagesAppPath) {
                    const pagesAppContent = fs.readFileSync(pagesAppPath, 'utf-8');
                    check(pagesAppContent.includes('ThemeProvider'), 'ThemeProvider in pages/_app.tsx', 'run: npx basuicn init');
                    check(pagesAppContent.includes('styles/index.css') || pagesAppContent.includes('index.css'), 'CSS import in pages/_app.tsx', 'run: npx basuicn init');
                } else {
                    check(false, 'pages/_app.tsx', 'create pages/_app.tsx');
                }
            } else {
                const mainPath = findMainFile(cwd);
                if (mainPath) {
                    const mainContent = fs.readFileSync(mainPath, 'utf-8');
                    check(mainContent.includes('ThemeProvider'), 'ThemeProvider in main entry', 'run: npx basuicn init');
                    check(mainContent.includes('styles/index.css') || mainContent.includes('index.css'), 'CSS import in main entry', 'run: npx basuicn init');
                } else {
                    check(false, 'main entry file (src/main.tsx)', 'create src/main.tsx');
                }
            }

            // Runtime packages
            const pkgPath = path.join(cwd, 'package.json');
            if (fs.existsSync(pkgPath)) {
                const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8')) as Record<string, unknown>;
                const allDeps = { ...(pkg.dependencies as object || {}), ...(pkg.devDependencies as object || {}) } as Record<string, string>;
                for (const dep of RUNTIME_PACKAGES) {
                    check(!!allDeps[dep], `package: ${dep}`, `run: npm install ${dep}`);
                }
                if (docFramework === 'vite') {
                    for (const dep of VITE_DEV_PACKAGES) {
                        check(!!allDeps[dep], `package (dev): ${dep}`, `run: npm install -D ${dep}`);
                    }
                } else {
                    for (const dep of NEXTJS_DEV_PACKAGES) {
                        check(!!allDeps[dep], `package (dev): ${dep}`, `run: npm install -D ${dep}`);
                    }
                }
            } else {
                check(false, 'package.json found', 'run: npm init -y');
            }

            // Config files
            const hasTailwindInCss = (() => {
                const candidates = ['src/styles/index.css', 'src/index.css', 'src/App.css'];
                return candidates.some(f => {
                    const p = path.join(cwd, f);
                    if (!fs.existsSync(p)) return false;
                    const content = fs.readFileSync(p, 'utf-8');
                    return content.includes('@import "tailwindcss"') || content.includes("@import 'tailwindcss'");
                });
            })();
            check(hasTailwindInCss, '@import "tailwindcss" in CSS', 'run: npx basuicn init');

            const tsCandidates = ['tsconfig.app.json', 'tsconfig.json'];
            const hasAlias = tsCandidates.some(f => {
                const p = path.join(cwd, f);
                if (!fs.existsSync(p)) return false;
                const content = fs.readFileSync(p, 'utf-8');
                return content.includes('"@/*"') || content.includes("'@/*'");
            });
            check(hasAlias, 'TypeScript path aliases (@/*)', 'run: npx basuicn init');

            if (docFramework === 'vite') {
                const hasViteConfig =
                    fs.existsSync(path.join(cwd, 'vite.config.ts')) ||
                    fs.existsSync(path.join(cwd, 'vite.config.js'));
                check(hasViteConfig, 'vite.config.ts / vite.config.js', 'run: npx basuicn init');
            } else {
                const hasPostcss = ['postcss.config.mjs', 'postcss.config.js', 'postcss.config.cjs']
                    .some(f => fs.existsSync(path.join(cwd, f)));
                check(hasPostcss, 'postcss.config.mjs (Tailwind CSS for Next.js)', 'run: npx basuicn init');
            }

            console.log('');
            if (issues === 0) {
                ok(`${c.bold}All checks passed!${c.reset} Project is healthy.`);
            } else {
                warn(`${c.bold}${issues} issue(s) found.${c.reset} Run ${c.cyan}npx basuicn init${c.reset} to fix most issues.`);
            }
            break;
        }

        default: {
            error(`Unknown command: "${command}"`);
            console.log(`  Run ${c.cyan}npx basuicn --help${c.reset} to see available commands.\n`);
        }
    }
};

main();
