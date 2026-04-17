import React from 'react';
import { Files, Search, Package, Settings } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export type SidebarTab = 'explorer' | 'search' | 'dependencies';

interface ActivityBarProps {
  activeTab: SidebarTab | null;
  onTabChange: (tab: SidebarTab | null) => void;
}

const tabs: { id: SidebarTab; icon: React.ReactNode; label: string }[] = [
  { id: 'explorer', icon: <Files className="w-[18px] h-[18px]" />, label: 'Explorer' },
  { id: 'search', icon: <Search className="w-[18px] h-[18px]" />, label: 'Search' },
  { id: 'dependencies', icon: <Package className="w-[18px] h-[18px]" />, label: 'Dependencies' },
];

export function SandboxActivityBar({ activeTab, onTabChange }: ActivityBarProps) {
  return (
    <div className="w-11 bg-muted/30 border-r border-border flex flex-col items-center py-1.5 shrink-0">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(activeTab === tab.id ? null : tab.id)}
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
