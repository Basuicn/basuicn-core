import React, { useState, useEffect } from 'react';
import { SandpackProvider } from '@codesandbox/sandpack-react';
import { cn } from '@/lib/utils/cn';
import { SandboxLayout } from './SandboxLayout';
import { SANDBOX_TEMPLATES } from './templates';
import type { SandboxTemplate } from './templates';

// ─── Dark mode detection ─────────────────────────────────────

function useIsDark() {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains('dark'),
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  return isDark;
}

// ─── Sandpack themes ─────────────────────────────────────────

const lightTheme = {
  colors: {
    surface1: '#ffffff',
    surface2: '#f8fafc',
    surface3: '#f1f5f9',
    clickable: '#64748b',
    base: '#0f172a',
    disabled: '#94a3b8',
    hover: '#0f172a',
    accent: '#2f27ce',
    error: '#ef4444',
    errorSurface: '#fef2f2',
  },
  syntax: {
    plain: '#0f172a',
    comment: { color: '#94a3b8', fontStyle: 'italic' as const },
    keyword: '#7c3aed',
    tag: '#2563eb',
    punctuation: '#64748b',
    definition: '#059669',
    property: '#0891b2',
    static: '#c2410c',
    string: '#16a34a',
  },
  font: {
    body: 'Inter, system-ui, sans-serif',
    mono: '"Fira Code", Consolas, "Courier New", monospace',
    size: '13px',
    lineHeight: '20px',
  },
};

const darkTheme = {
  colors: {
    surface1: '#0f172a',
    surface2: '#1e293b',
    surface3: '#334155',
    clickable: '#94a3b8',
    base: '#e2e8f0',
    disabled: '#475569',
    hover: '#f8fafc',
    accent: '#6366f1',
    error: '#ef4444',
    errorSurface: '#450a0a',
  },
  syntax: {
    plain: '#e2e8f0',
    comment: { color: '#64748b', fontStyle: 'italic' as const },
    keyword: '#c084fc',
    tag: '#60a5fa',
    punctuation: '#94a3b8',
    definition: '#34d399',
    property: '#22d3ee',
    static: '#fb923c',
    string: '#4ade80',
  },
  font: {
    body: 'Inter, system-ui, sans-serif',
    mono: '"Fira Code", Consolas, "Courier New", monospace',
    size: '13px',
    lineHeight: '20px',
  },
};

// ─── Props ───────────────────────────────────────────────────

export interface CodeSandboxProps {
  /** Starting template id */
  defaultTemplate?: string;
  /** Custom initial files (overrides template) */
  files?: Record<string, string>;
  /** Extra dependencies */
  dependencies?: Record<string, string>;
  /** Container className */
  className?: string;
}

// ─── Component ───────────────────────────────────────────────

export function CodeSandbox({
  defaultTemplate = 'react-ts',
  files: customFiles,
  dependencies: extraDeps,
  className,
}: CodeSandboxProps) {
  const isDark = useIsDark();
  const [templateId, setTemplateId] = useState(defaultTemplate);

  const template: SandboxTemplate =
    SANDBOX_TEMPLATES.find((t) => t.id === templateId) ??
    SANDBOX_TEMPLATES[0];

  const files = customFiles ?? template.files;
  const deps = {
    ...template.dependencies,
    ...extraDeps,
  };

  return (
    <div className={cn('h-full w-full', className)}>
      <SandpackProvider
        key={templateId}
        template={template.template}
        theme={isDark ? darkTheme : lightTheme}
        files={files}
        customSetup={{
          dependencies: {
            react: '^18.0.0',
            'react-dom': '^18.0.0',
            'react-scripts': '^5.0.0',
            ...deps,
          },
        }}
        options={{
          recompileMode: 'delayed',
          recompileDelay: 400,
          classes: {
            'sp-wrapper': 'h-full w-full',
          },
        }}
      >
        <SandboxLayout
          templateId={templateId}
          onTemplateChange={setTemplateId}
          className="h-full w-full"
        />
      </SandpackProvider>
    </div>
  );
}
