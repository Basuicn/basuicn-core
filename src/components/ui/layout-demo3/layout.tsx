'use client'

import { useCallback, useEffect, useRef } from 'react'
import type { PanelImperativeHandle } from 'react-resizable-panels'
import {
  SidebarProvider,
  SidebarInset,
  useSidebar,
} from '@/components/ui/sidebar/Sidebar'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable/Resizable'
import { ThemeProvider } from '@/lib/theme/ThemeProvider'
import SideBar from './_layout/SideBar'
import Header from './_layout/Header'

interface Props {
  children: React.ReactNode
}

function LayoutBody({ children }: { children?: React.ReactNode }) {
  const { open, setOpen, isMobile } = useSidebar();
  const panelRef = useRef<PanelImperativeHandle>(null);
  // Prevent onResize from echoing back the programmatic change
  const syncingRef = useRef(false);

  // Keyboard toggle (Ctrl+B) → collapse / expand panel
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel || isMobile) return;
    syncingRef.current = true;
    if (open) panel.expand();
    else panel.collapse();
    requestAnimationFrame(() => { syncingRef.current = false; });
  }, [open, isMobile]);

  // Drag-to-collapse/expand → update sidebar context
  const handleSidebarResize = useCallback(
    (size: { asPercentage: number; inPixels: number }) => {
      if (syncingRef.current) return;
      setOpen(size.inPixels > 8);
    },
    [setOpen],
  );

  const content = (
    <SidebarInset className="h-full">
       <Header />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 h-full">
          <ThemeProvider defaultTheme="">
            {children}
          </ThemeProvider>
        </div>
      </main>
    </SidebarInset>
  );

  // ── Mobile: sidebar renders as fixed overlay, no panel needed ──
  if (isMobile) {
    return (
      <div className="flex h-screen w-full">
        <SideBar />
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
        collapsedSize="0px"
        groupResizeBehavior="preserve-pixel-size"
        panelRef={panelRef}
        onResize={handleSidebarResize}
      >
        <SideBar />
      </ResizablePanel>
      {open && <ResizableHandle variant="bar" />}


      <ResizablePanel>
        {content}
      </ResizablePanel>
      
    </ResizablePanelGroup>
  );
}

export default function Layout({ children }: Props) {
  return (
   <div  className="h-screen w-full overflow-hidden">
      <SidebarProvider className="h-full ">
        <LayoutBody>{children}</LayoutBody>
      </SidebarProvider>
    </div>
  )
}
