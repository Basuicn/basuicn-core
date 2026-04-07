import * as React from 'react';
import { PanelLeft } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useSidebar, SIDEBAR_WIDTH_DEFAULT } from './SidebarContext';

// ─── SidebarTrigger ───────────────────────────────────────────────────────────

export const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();
  return (
    <button
      ref={ref}
      type="button"
      data-sidebar="trigger"
      onClick={(e) => {
        toggleSidebar();
        onClick?.(e);
      }}
      className={cn('inline-flex items-center justify-center h-8 w-8 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className)}
      title="Toggle Sidebar (⌘B)"
      {...props}
    >
      <PanelLeft className="h-4 w-4" />
      <span className="sr-only">Toggle Sidebar</span>
    </button>
  );
});
SidebarTrigger.displayName = 'SidebarTrigger';

// ─── Sidebar ──────────────────────────────────────────────────────────────────

/** Props for the Sidebar panel */
export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  /** Which side of the viewport the sidebar attaches to */
  side?: 'left' | 'right';
  /** Visual variant: default border, floating card, or inset with background */
  variant?: 'sidebar' | 'floating' | 'inset';
  /** Collapse behavior: slide offcanvas, shrink to icons, or non-collapsible */
  collapsible?: 'offcanvas' | 'icon' | 'none';
}

export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ side = 'left', variant = 'sidebar', collapsible = 'icon', className, children, ...props }, ref) => {
    const { state, isMobile, openMobile, setOpenMobile, sidebarWidth } = useSidebar();

    if (collapsible === 'none') {
      return (
        <aside
          ref={ref}
          className={cn('flex h-screen flex-col bg-sidebar border-r border-sidebar-border', className)}
          style={{ width: SIDEBAR_WIDTH_DEFAULT }}
          {...props}
        >
          {children}
        </aside>
      );
    }

    if (isMobile) {
      return (
        <>
          {openMobile && (
            <div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm motion-safe:transition-opacity"
              onClick={() => setOpenMobile(false)}
            />
          )}
          <aside
            ref={ref}
            className={cn(
              'fixed inset-y-0 z-50 flex flex-col bg-sidebar border-r border-sidebar-border shadow-xl',
              'motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-in-out',
              side === 'left' ? 'left-0' : 'right-0',
              openMobile
                ? 'translate-x-0'
                : side === 'left'
                ? '-translate-x-full'
                : 'translate-x-full',
              className
            )}
            style={{ width: sidebarWidth }}
            {...props}
          >
            {children}
          </aside>
        </>
      );
    }

    return (
      <aside
        ref={ref}
        data-state={state}
        data-collapsible={state === 'collapsed' ? collapsible : ''}
        data-variant={variant}
        data-side={side}
        className={cn(
          'group relative flex h-full w-full flex-col bg-sidebar text-sidebar-foreground',
          'overflow-hidden shrink-0',
          className
        )}
        {...props}
      >
        {children}
      </aside>
    );
  }
);
Sidebar.displayName = 'Sidebar';

// ─── SidebarRail — kept for API compatibility, resize is handled by ResizableHandle ──

export const SidebarRail = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (_props, _ref) => null,
);
SidebarRail.displayName = 'SidebarRail';

// ─── SidebarInset ─────────────────────────────────────────────────────────────

export const SidebarInset = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('relative flex flex-1 flex-col overflow-hidden min-w-0 bg-background', className)}
      {...props}
    />
  )
);
SidebarInset.displayName = 'SidebarInset';

// ─── Layout: Header / Content / Footer ───────────────────────────────────────

export const SidebarHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-sidebar="header"
      className={cn('flex flex-col gap-2 p-2 shrink-0', className)}
      {...props}
    />
  )
);
SidebarHeader.displayName = 'SidebarHeader';

export const SidebarFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { isMobile } = useSidebar();
    if (isMobile) {
      return null;
    }
    return (
    <div
      ref={ref}
      data-sidebar="footer"
      className={cn('flex flex-col gap-2 p-2 mt-auto shrink-0', className)}
      {...props}
    />
  )
}
);
SidebarFooter.displayName = 'SidebarFooter';

export const SidebarContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-sidebar="content"
      className={cn('flex flex-1 flex-col gap-2 overflow-y-auto overflow-x-hidden py-2', className)}
      {...props}
    />
  )
);
SidebarContent.displayName = 'SidebarContent';

export const SidebarSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-sidebar="separator"
      className={cn('mx-2  h-px border-t border-sidebar-border', className)}
      {...props}
    />
  )
);
SidebarSeparator.displayName = 'SidebarSeparator';
