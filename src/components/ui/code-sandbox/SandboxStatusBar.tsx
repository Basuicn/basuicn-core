import React from 'react';
import { useSandpack } from '@codesandbox/sandpack-react';
import { cn } from '@/lib/utils/cn';

export function SandboxStatusBar() {
  const { sandpack } = useSandpack();
  const fileName = sandpack.activeFile?.split('/').pop() || '';
  const ext = fileName.split('.').pop()?.toUpperCase() || '';

  return (
    <div className="h-6 bg-primary text-primary-foreground flex items-center px-3 text-[10px] font-medium shrink-0 gap-3">
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
