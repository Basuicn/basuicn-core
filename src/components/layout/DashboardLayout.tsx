import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarInset } from '../ui/sidebar/Sidebar';
import { AppSidebar } from './AppSidebar';
import { Header } from './Header';

// ─── DashboardLayout ──────────────────────────────────────────────────────────

export const DashboardLayout = React.forwardRef<HTMLDivElement, { children?: React.ReactNode }>(({ children }, ref) => {
  return (
    <div ref={ref} className="h-full w-full">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Header />
          <main className="flex-1 overflow-y-auto bg-muted/10">
            <div className="p-6 h-[calc(100vh-60px)] overflow-auto">
              {children ? children : <Outlet />}
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
});

DashboardLayout.displayName = "DashboardLayout";
