import React, { useState, useMemo } from 'react';
import { useSandpack } from '@codesandbox/sandpack-react';

export function SearchPanel() {
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
