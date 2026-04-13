import * as React from 'react';
import { Outlet } from 'react-router-dom';
import type { PanelImperativeHandle } from 'react-resizable-panels';
import { SidebarProvider, SidebarInset, useSidebar } from '../ui/sidebar/Sidebar';
import { AppSidebar } from './AppSidebar';
import { Header } from './Header';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@components/ui/resizable/Resizable';

// ─── Inner layout — needs useSidebar() context ────────────────

function LayoutBody({ children }: { children?: React.ReactNode }) {
  const { open, setOpen, isMobile } = useSidebar();
  const panelRef = React.useRef<PanelImperativeHandle | null>(null);
  // Prevent onResize from echoing back the programmatic change
  const syncingRef = React.useRef(false);

  // Keyboard toggle (Ctrl+B) → collapse / expand panel
  React.useEffect(() => {
    const panel = panelRef.current;
    if (!panel || isMobile) return;
    syncingRef.current = true;
    if (open) panel.expand();
    else panel.collapse();
    requestAnimationFrame(() => { syncingRef.current = false; });
  }, [open, isMobile]);

  // Drag-to-collapse/expand → update sidebar context
  const handleSidebarResize = React.useCallback(
    (size: { asPercentage: number; inPixels: number }) => {
      if (syncingRef.current) return;
      // collapsedSize = "64px"; add a small threshold to avoid floating-point edge cases
      setOpen(size.inPixels > 72);
    },
    [setOpen],
  );

  const content = (
    <SidebarInset>
      <Header />
      <main className="flex-1 overflow-y-auto bg-muted/10">
        <div className="p-6 h-[calc(100vh-66px)] overflow-auto max-w-full mx-auto">
          {children ?? <Outlet />}
        </div>
      </main>
    </SidebarInset>
  );

  // ── Mobile: sidebar renders as fixed overlay, no panel needed ──
  if (isMobile) {
    return (
      <div className="flex h-screen w-full">
        <AppSidebar />
        {content}
      </div>
    );
  }

  // ── Desktop: sidebar + handle + content as resizable panels ───
  return (
    <ResizablePanelGroup direction="horizontal" className="h-full w-full">
      <ResizablePanel
        id="app-sidebar"
        defaultSize="256px"
        minSize="160px"
        maxSize="480px"
        collapsible
        collapsedSize="64px"
        groupResizeBehavior="preserve-pixel-size"
        panelRef={panelRef}
        onResize={handleSidebarResize}
      >
        <AppSidebar />
      </ResizablePanel>
      <ResizableHandle variant="bar" />


      <ResizablePanel>
        {content}
      </ResizablePanel>
      
    </ResizablePanelGroup>
  );
}

// ─── DashboardLayout ──────────────────────────────────────────

export const DashboardLayout = React.forwardRef<HTMLDivElement, { children?: React.ReactNode }>(
  ({ children }, ref) => (
    // h-screen gives a definite height so the Group's height:100% resolves to 100vh,
    // letting the Separator span the full sidebar height for drag-to-resize.
    <div ref={ref} className="h-screen w-full overflow-hidden">
      <SidebarProvider className="h-full">
        <LayoutBody>{children}</LayoutBody>
      </SidebarProvider>
    </div>
  ),
);
DashboardLayout.displayName = 'DashboardLayout';
