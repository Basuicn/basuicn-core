import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { SANDBOX_TEMPLATES } from './templates';

interface ToolbarProps {
  templateId: string;
  onTemplateChange: (id: string) => void;
}

export function SandboxToolbar({ templateId, onTemplateChange }: ToolbarProps) {
  const [open, setOpen] = useState(false);
  const current = SANDBOX_TEMPLATES.find((t) => t.id === templateId);

  return (
    <div className="h-10 bg-muted/30 border-b border-border flex items-center px-3 shrink-0 gap-3">
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 bg-background border border-border px-2.5 py-1.5 rounded-md hover:bg-muted transition-colors text-sm"
        >
          <span>{current?.icon}</span>
          <span className="font-medium text-foreground">{current?.label}</span>
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
        </button>

        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
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
                    <div className="text-sm font-medium text-foreground">{t.label}</div>
                    <div className="text-xs text-muted-foreground">{t.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex-1" />

      <div className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded hidden sm:block">
        react-playground
      </div>
    </div>
  );
}
