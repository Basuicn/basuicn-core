import React, { useState } from 'react';
import { SandpackConsole, useSandpack } from '@codesandbox/sandpack-react';
import { cn } from '@/lib/utils/cn';

type TerminalTab = 'console' | 'problems';

export function TerminalPane() {
  const { sandpack } = useSandpack();
  const [tab, setTab] = useState<TerminalTab>('console');

  return (
    <div className="flex flex-col h-full bg-background">
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

      <div className="flex-1 overflow-auto min-h-0">
        {tab === 'console' && (
          <SandpackConsole standalone style={{ height: '100%' }} />
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
