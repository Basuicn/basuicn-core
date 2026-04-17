import React, { useState } from 'react';
import { useSandpack } from '@codesandbox/sandpack-react';
import { Package, Plus, X } from 'lucide-react';

const POPULAR_PACKAGES = [
  'axios',
  'framer-motion',
  'zustand',
  'react-router-dom',
  'date-fns',
  'clsx',
  'zod',
  'react-hook-form',
  'swr',
  'lodash',
];

export function DependencyPanel() {
  const { sandpack } = useSandpack();
  const [newDep, setNewDep] = useState('');

  let deps: Record<string, string> = {};
  try {
    const pkg = JSON.parse(
      sandpack.files['/package.json']?.code || '{}',
    );
    deps = pkg.dependencies || {};
  } catch {
    /* ignore parse error */
  }

  const addDep = (name: string) => {
    if (!name.trim() || deps[name]) return;
    try {
      const pkg = JSON.parse(
        sandpack.files['/package.json']?.code || '{}',
      );
      pkg.dependencies = { ...pkg.dependencies, [name.trim()]: 'latest' };
      sandpack.updateFile(
        '/package.json',
        JSON.stringify(pkg, null, 2),
      );
      setNewDep('');
    } catch {
      /* ignore */
    }
  };

  const removeDep = (name: string) => {
    if (['react', 'react-dom', 'react-scripts'].includes(name)) return;
    try {
      const pkg = JSON.parse(
        sandpack.files['/package.json']?.code || '{}',
      );
      const { [name]: _, ...rest } = pkg.dependencies || {};
      pkg.dependencies = rest;
      sandpack.updateFile(
        '/package.json',
        JSON.stringify(pkg, null, 2),
      );
    } catch {
      /* ignore */
    }
  };

  const available = POPULAR_PACKAGES.filter((p) => !deps[p]);

  return (
    <div className="flex flex-col h-full text-foreground">
      <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground shrink-0">
        Dependencies
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          addDep(newDep);
        }}
        className="flex gap-1 px-3 pb-2"
      >
        <input
          value={newDep}
          onChange={(e) => setNewDep(e.target.value)}
          placeholder="Package name..."
          className="flex-1 min-w-0 bg-muted border border-border text-foreground text-[13px] px-2 py-1.5 rounded outline-none focus:border-primary transition-colors"
        />
        <button
          type="submit"
          className="px-2 py-1.5 bg-primary text-primary-foreground rounded text-xs font-medium hover:bg-primary/90 transition-colors shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </form>

      {available.length > 0 && (
        <div className="px-3 pb-3">
          <div className="text-[10px] text-muted-foreground mb-1.5">
            Quick add:
          </div>
          <div className="flex flex-wrap gap-1">
            {available.slice(0, 5).map((p) => (
              <button
                key={p}
                onClick={() => addDep(p)}
                className="text-[10px] px-1.5 py-0.5 bg-muted hover:bg-accent rounded border border-border transition-colors"
              >
                + {p}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto border-t border-border">
        <div className="px-3 py-1.5 text-[10px] text-muted-foreground">
          Installed ({Object.keys(deps).length})
        </div>
        {Object.entries(deps).map(([name, version]) => (
          <div
            key={name}
            className="flex items-center justify-between px-3 py-1.5 hover:bg-muted/50 text-[13px] group"
          >
            <div className="flex items-center gap-1.5 truncate min-w-0">
              <Package className="w-3 h-3 text-muted-foreground shrink-0" />
              <span className="truncate">{name}</span>
              <span className="text-[10px] text-muted-foreground shrink-0">
                {version as string}
              </span>
            </div>
            {!['react', 'react-dom', 'react-scripts'].includes(name) && (
              <button
                onClick={() => removeDep(name)}
                className="opacity-0 group-hover:opacity-100 p-0.5 hover:text-danger transition-opacity shrink-0"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
