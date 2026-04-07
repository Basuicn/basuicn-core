import React, { useState, useMemo } from 'react';
import {
  SandpackCodeEditor,
  SandpackPreview,
  SandpackConsole,
  useSandpack,
} from '@codesandbox/sandpack-react';
import { Group, Panel, Separator } from 'react-resizable-panels';
import {
  Files,
  Search,
  Package,
  Settings,
  ChevronDown,
  Plus,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { FileTree } from './FileTree';
import { SANDBOX_TEMPLATES } from './templates';

// ─── Types ───────────────────────────────────────────────────

type SidebarTab = 'explorer' | 'search' | 'dependencies';
type TerminalTab = 'console' | 'problems';

export interface SandboxLayoutProps {
  templateId: string;
  onTemplateChange: (id: string) => void;
  className?: string;
}

// ─── Search Panel ────────────────────────────────────────────

function SearchPanel() {
  const { sandpack } = useSandpack();
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    const matches: { path: string; line: number; text: string }[] = [];
    for (const [path, file] of Object.entries(sandpack.files)) {
      file.code.split('\n').forEach((line, i) => {
        if (line.toLowerCase().includes(q)) {
          matches.push({ path, line: i + 1, text: line.trim() });
        }
      });
    }
    return matches.slice(0, 100);
  }, [query, sandpack.files]);

  return (
    <div className="flex flex-col h-full text-foreground">
      <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground shrink-0">
        Search
      </div>
      <div className="px-3 pb-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search in files..."
          className="w-full bg-muted border border-border text-foreground text-[13px] px-2 py-1.5 rounded outline-none focus:border-primary transition-colors"
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        {results.length > 0 && (
          <div className="px-3 pb-1 text-[10px] text-muted-foreground">
            {results.length} result{results.length !== 1 ? 's' : ''}
          </div>
        )}
        {results.map((r, i) => (
          <div
            key={`${r.path}:${r.line}:${i}`}
            className="px-3 py-1.5 cursor-pointer hover:bg-muted/50 text-xs border-b border-border/30"
            onClick={() => sandpack.openFile(r.path)}
          >
            <div className="font-medium truncate">
              {r.path.split('/').pop()}
              <span className="text-muted-foreground ml-1 font-normal">
                {r.path}
              </span>
            </div>
            <div className="text-muted-foreground truncate font-mono">
              <span className="text-primary mr-1">{r.line}:</span>
              {r.text}
            </div>
          </div>
        ))}
        {query && results.length === 0 && (
          <div className="px-3 py-6 text-xs text-muted-foreground text-center">
            No results found
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Dependency Panel ────────────────────────────────────────

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

function DependencyPanel() {
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

      {/* Add input */}
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

      {/* Quick add */}
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

      {/* Installed list */}
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

// ─── Activity Bar ────────────────────────────────────────────

function ActivityBar({
  activeTab,
  onTabChange,
}: {
  activeTab: SidebarTab | null;
  onTabChange: (tab: SidebarTab | null) => void;
}) {
  const tabs: { id: SidebarTab; icon: React.ReactNode; label: string }[] = [
    {
      id: 'explorer',
      icon: <Files className="w-[18px] h-[18px]" />,
      label: 'Explorer',
    },
    {
      id: 'search',
      icon: <Search className="w-[18px] h-[18px]" />,
      label: 'Search',
    },
    {
      id: 'dependencies',
      icon: <Package className="w-[18px] h-[18px]" />,
      label: 'Dependencies',
    },
  ];

  return (
    <div className="w-11 bg-muted/30 border-r border-border flex flex-col items-center py-1.5 shrink-0">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() =>
            onTabChange(activeTab === tab.id ? null : tab.id)
          }
          className={cn(
            'relative w-full h-9 flex items-center justify-center transition-colors',
            activeTab === tab.id
              ? 'text-foreground'
              : 'text-muted-foreground hover:text-foreground',
          )}
          title={tab.label}
        >
          {activeTab === tab.id && (
            <span className="absolute left-0 top-[20%] bottom-[20%] w-0.5 bg-primary rounded-r" />
          )}
          {tab.icon}
        </button>
      ))}
      <div className="flex-1" />
      <button
        className="w-full h-9 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        title="Settings"
      >
        <Settings className="w-[18px] h-[18px]" />
      </button>
    </div>
  );
}

// ─── Terminal Pane ───────────────────────────────────────────

function TerminalPane() {
  const { sandpack } = useSandpack();
  const [tab, setTab] = useState<TerminalTab>('console');

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Tab bar */}
      <div className="h-7 shrink-0 bg-muted/30 border-t border-b border-border flex items-center px-3 gap-3 text-[10px] font-semibold tracking-wider">
        {(['console', 'problems'] as TerminalTab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              'uppercase transition-colors pb-0.5 -mb-px border-b',
              tab === t
                ? 'text-primary border-primary'
                : 'text-muted-foreground border-transparent hover:text-foreground',
            )}
          >
            {t}
            {t === 'problems' && sandpack.error && (
              <span className="ml-1 text-danger font-bold">1</span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto min-h-0">
        {tab === 'console' && (
          <SandpackConsole
            standalone
            style={{ height: '100%' }}
          />
        )}
        {tab === 'problems' && (
          <div className="p-3 text-xs">
            {sandpack.error ? (
              <div className="text-danger font-mono whitespace-pre-wrap break-words">
                {sandpack.error.message}
              </div>
            ) : (
              <div className="text-muted-foreground text-center py-4">
                No problems detected
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Status Bar ──────────────────────────────────────────────

function StatusBar() {
  const { sandpack } = useSandpack();
  const fileName = sandpack.activeFile?.split('/').pop() || '';
  const ext = fileName.split('.').pop()?.toUpperCase() || '';

  return (
    <div className="h-6 bg-primary text-primary-foreground flex items-center px-3 text-[10px] font-medium shrink-0 gap-3">
      {/* Status */}
      <span className="flex items-center gap-1.5">
        <span
          className={cn(
            'w-1.5 h-1.5 rounded-full',
            sandpack.status === 'running'
              ? 'bg-green-400'
              : sandpack.status === 'idle'
                ? 'bg-yellow-400'
                : 'bg-white/50',
          )}
        />
        {sandpack.status === 'running'
          ? 'Running'
          : sandpack.status === 'idle'
            ? 'Ready'
            : 'Loading'}
      </span>

      {sandpack.error && (
        <span className="bg-white/20 px-1.5 py-0.5 rounded text-[9px]">
          1 Error
        </span>
      )}

      <div className="flex-1" />

      <span className="opacity-75">{fileName}</span>
      <span className="opacity-75">UTF-8</span>
      {ext && <span className="opacity-75">{ext}</span>}
    </div>
  );
}

// ─── Toolbar ─────────────────────────────────────────────────

function Toolbar({
  templateId,
  onTemplateChange,
}: {
  templateId: string;
  onTemplateChange: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const current = SANDBOX_TEMPLATES.find((t) => t.id === templateId);

  return (
    <div className="h-10 bg-muted/30 border-b border-border flex items-center px-3 shrink-0 gap-3">
      {/* Template picker */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 bg-background border border-border px-2.5 py-1.5 rounded-md hover:bg-muted transition-colors text-sm"
        >
          <span>{current?.icon}</span>
          <span className="font-medium text-foreground">
            {current?.label}
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
        </button>

        {open && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />
            <div className="absolute top-full left-0 mt-1 bg-background border border-border rounded-lg shadow-xl z-50 min-w-[260px] py-1 animate-in fade-in slide-in-from-top-2 duration-200">
              {SANDBOX_TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    onTemplateChange(t.id);
                    setOpen(false);
                  }}
                  className={cn(
                    'w-full text-left px-3 py-2.5 hover:bg-muted flex items-center gap-3 transition-colors',
                    t.id === templateId && 'bg-primary/5',
                  )}
                >
                  <span className="text-lg shrink-0">{t.icon}</span>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-foreground">
                      {t.label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {t.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex-1" />

      {/* Project badge */}
      <div className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded hidden sm:block">
        react-playground
      </div>
    </div>
  );
}

// ─── Resize Handle ───────────────────────────────────────────

function ResizeHandle({ horizontal }: { horizontal?: boolean }) {
  return (
    <Separator
      className={cn(
        'transition-colors shrink-0',
        horizontal
          ? 'h-[3px] hover:bg-primary/40 cursor-row-resize bg-border/60'
          : 'w-[3px] hover:bg-primary/40 cursor-col-resize bg-border/60',
      )}
    />
  );
}

// ─── Main Layout ─────────────────────────────────────────────

export function SandboxLayout({
  templateId,
  onTemplateChange,
  className,
}: SandboxLayoutProps) {
  const [sidebarTab, setSidebarTab] = useState<SidebarTab | null>(
    'explorer',
  );

  return (
    <div
      className={cn(
        'flex flex-col h-full w-full bg-background text-foreground overflow-hidden',
        className,
      )}
    >
      <Toolbar
        templateId={templateId}
        onTemplateChange={onTemplateChange}
      />

      <div className="flex flex-1 min-h-0">
        {/* Activity bar */}
        <ActivityBar activeTab={sidebarTab} onTabChange={setSidebarTab} />

        {/* Sidebar panel (fixed width, toggleable) */}
        {sidebarTab && (
          <div className="w-56 border-r border-border shrink-0 overflow-hidden bg-background">
            {sidebarTab === 'explorer' && <FileTree />}
            {sidebarTab === 'search' && <SearchPanel />}
            {sidebarTab === 'dependencies' && <DependencyPanel />}
          </div>
        )}

        {/* Resizable main area: Editor + Preview */}
        <Group orientation="horizontal" className="h-full flex-1 min-w-0">
          {/* Editor + Terminal column */}
          <Panel defaultSize={55} minSize={25}>
            <Group orientation="vertical">
              {/* Code editor */}
              <Panel defaultSize={70} minSize={20}>
                <SandpackCodeEditor
                  showTabs
                  showLineNumbers
                  showInlineErrors
                  wrapContent
                  closableTabs
                  style={{ height: '100%' }}
                />
              </Panel>

              <ResizeHandle horizontal />

              {/* Terminal */}
              <Panel defaultSize={30} minSize={8}>
                <TerminalPane />
              </Panel>
            </Group>
          </Panel>

          <ResizeHandle />

          {/* Preview */}
          <Panel defaultSize={45} minSize={20}>
            <SandpackPreview
              showNavigator
              showRefreshButton
              showOpenInCodeSandbox={false}
              style={{ height: '100%' }}
            />
          </Panel>
        </Group>
      </div>

      <StatusBar />
    </div>
  );
}
