import React, { useState } from 'react';
import {
  SandpackCodeEditor,
  SandpackPreview,
} from '@codesandbox/sandpack-react';
import { Group, Panel, Separator } from 'react-resizable-panels';
import { cn } from '@/lib/utils/cn';
import { FileTree } from './FileTree';
import { SearchPanel } from './SearchPanel';
import { DependencyPanel } from './DependencyPanel';
import { SandboxActivityBar, type SidebarTab } from './SandboxActivityBar';
import { TerminalPane } from './TerminalPane';
import { SandboxToolbar } from './SandboxToolbar';
import { SandboxStatusBar } from './SandboxStatusBar';

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

// ─── Main Layout ───────────────────────���─────────────────────

export interface SandboxLayoutProps {
  templateId: string;
  onTemplateChange: (id: string) => void;
  className?: string;
}

export function SandboxLayout({
  templateId,
  onTemplateChange,
  className,
}: SandboxLayoutProps) {
  const [sidebarTab, setSidebarTab] = useState<SidebarTab | null>('explorer');

  return (
    <div
      className={cn(
        'flex flex-col h-full w-full bg-background text-foreground overflow-hidden',
        className,
      )}
    >
      <SandboxToolbar templateId={templateId} onTemplateChange={onTemplateChange} />

      <div className="flex flex-1 min-h-0">
        <SandboxActivityBar activeTab={sidebarTab} onTabChange={setSidebarTab} />

        {sidebarTab && (
          <div className="w-56 border-r border-border shrink-0 overflow-hidden bg-background">
            {sidebarTab === 'explorer' && <FileTree />}
            {sidebarTab === 'search' && <SearchPanel />}
            {sidebarTab === 'dependencies' && <DependencyPanel />}
          </div>
        )}

        <Group orientation="horizontal" className="h-full flex-1 min-w-0">
          <Panel defaultSize={55} minSize={25}>
            <Group orientation="vertical">
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
              <Panel defaultSize={30} minSize={8}>
                <TerminalPane />
              </Panel>
            </Group>
          </Panel>

          <ResizeHandle />

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

      <SandboxStatusBar />
    </div>
  );
}
