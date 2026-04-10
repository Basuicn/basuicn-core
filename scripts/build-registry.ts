import fs from 'fs';
import path from 'path';

const COMPONENTS_DIR = './src/components/ui';
const OUTPUT_FILE = './registry.json';

// Directories to exclude from registry (not reusable components)
const EXCLUDE_DIRS = new Set(['icons', 'layout', 'vs-code', 'Showcase.tsx']);

interface RegistryFile {
  path: string;
  content: string;
}

interface RegistryComponent {
  name: string;
  dependencies: string[];
  internalDependencies: string[];
  files: RegistryFile[];
}

interface Registry {
  core: {
    dependencies: string[];
    files: RegistryFile[];
  };
  components: Record<string, RegistryComponent>;
}

const getFiles = (dir: string): string[] => {
  const files: string[] = [];
  let entries: string[];
  try {
    entries = fs.readdirSync(dir);
  } catch (err) {
    console.warn(`Cannot read directory ${dir}: ${err}`);
    return files;
  }
  for (const file of entries) {
    const fullPath = path.join(dir, file);
    try {
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        files.push(...getFiles(fullPath));
      } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        if (!file.includes('.test.') && !file.includes('.stories.')) {
          files.push(fullPath);
        }
      }
    } catch (err) {
      console.warn(`Skipping ${fullPath}: ${err}`);
    }
  }
  return files;
};

const INTERNAL_ALIAS_PREFIXES = ['@/', '@lib/', '@components/', '@app/'];

const parseDependencies = (content: string): string[] => {
  const dependencies = new Set<string>();
  const importRegex = /(?:from|import)\s+['"]([^'"]+)['"]/g;
  let match;

  while ((match = importRegex.exec(content)) !== null) {
    const pkg = match[1];

    // Skip relative imports
    if (pkg.startsWith('.')) continue;
    // Skip internal aliases
    if (INTERNAL_ALIAS_PREFIXES.some(prefix => pkg.startsWith(prefix))) continue;

    // Extract package name
    const parts = pkg.split('/');
    if (pkg.startsWith('@') && parts.length >= 2) {
      dependencies.add(`${parts[0]}/${parts[1]}`);
    } else {
      dependencies.add(parts[0]);
    }
  }

  // Remove React (always a peer dependency)
  dependencies.delete('react');
  dependencies.delete('react-dom');

  return [...dependencies];
};

const getInternalDeps = (content: string, currentDirName: string): string[] => {
  const internalDeps = new Set<string>();

  // 1. Alias imports: @/components/ui/xxx or @components/ui/xxx
  const aliasRegex = /from\s+['"](?:@\/?components\/ui)\/([^'"]+)['"]/g;
  let match;
  while ((match = aliasRegex.exec(content)) !== null) {
    const depPath = match[1].split('/')[0];
    if (depPath !== currentDirName && depPath !== 'icons') {
      internalDeps.add(depPath);
    }
  }

  // 2. Relative imports: ../spinner/Spinner
  const relativeRegex = /from\s+['"]\.\.\/([^'"]+)['"]/g;
  while ((match = relativeRegex.exec(content)) !== null) {
    const depPath = match[1].split('/')[0];
    if (depPath !== currentDirName) {
      internalDeps.add(depPath);
    }
  }

  return [...internalDeps];
};

const buildRegistry = () => {
  console.log('Building component registry...');

  const registry: Registry = {
    core: {
      dependencies: [
        '@base-ui/react',
        'clsx',
        'tailwind-merge',
        'tailwind-variants',
        'tailwindcss-animate',
        '@tailwindcss/vite',
        'autoprefixer',
        'tailwindcss',
        'postcss',
      ],
      files: [
        {
          path: 'src/lib/utils/cn.ts',
          content: fs.readFileSync('./src/lib/utils/cn.ts', 'utf-8'),
        },
        {
          path: 'src/styles/index.css',
          content: fs.readFileSync('./src/styles/index.css', 'utf-8'),
        },
        {
          path: 'src/lib/theme/themes.ts',
          content: fs.readFileSync('./src/lib/theme/themes.ts', 'utf-8'),
        },
        {
          path: 'src/lib/theme/ThemeProvider.tsx',
          content: fs.readFileSync('./src/lib/theme/ThemeProvider.tsx', 'utf-8'),
        },
      ],
    },
    components: {},
  };

  const componentDirs = fs.readdirSync(COMPONENTS_DIR);

  for (const dirName of componentDirs) {
    if (EXCLUDE_DIRS.has(dirName)) continue;

    const dirPath = path.join(COMPONENTS_DIR, dirName);
    if (!fs.statSync(dirPath).isDirectory()) continue;

    const files = getFiles(dirPath);
    if (files.length === 0) continue;

    // Find main file: prefer <DirName>.tsx, then any .tsx
    const mainFile =
      files.find(
        (f) =>
          f.toLowerCase().includes(dirName.toLowerCase()) &&
          f.endsWith('.tsx')
      ) || files.find((f) => f.endsWith('.tsx'));

    if (!mainFile) continue;

    // Parse all files in the component directory for dependencies
    const allDependencies = new Set<string>();
    const allInternalDeps = new Set<string>();

    for (const file of files) {
      try {
        const content = fs.readFileSync(file, 'utf-8');
        for (const dep of parseDependencies(content)) allDependencies.add(dep);
        for (const dep of getInternalDeps(content, dirName)) allInternalDeps.add(dep);
      } catch (err) {
        console.warn(`Failed to read ${file}: ${err}`);
      }
    }

    registry.components[dirName] = {
      name: dirName,
      dependencies: [...allDependencies],
      internalDependencies: [...allInternalDeps],
      files: files.map((f) => {
        try {
          return {
            path: f.replace(/\\/g, '/').replace(/^\.\//, ''),
            content: fs.readFileSync(f, 'utf-8'),
          };
        } catch (err) {
          console.warn(`Failed to read ${f}: ${err}`);
          return { path: f.replace(/\\/g, '/').replace(/^\.\//, ''), content: '' };
        }
      }).filter(f => f.content !== ''),
    };
  }

  const componentCount = Object.keys(registry.components).length;
  if (componentCount === 0) {
    console.warn('Warning: No components found in registry');
  }
  try {
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(registry, null, 2));
  } catch (err) {
    console.error(`Failed to write registry: ${err}`);
    process.exit(1);
  }
  console.log(`Registry built: ${componentCount} components → ${OUTPUT_FILE}`);
};

buildRegistry();
