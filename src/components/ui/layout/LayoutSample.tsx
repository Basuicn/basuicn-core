import * as React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import * as Icon from "@components/ui/icons";
import { cn } from '@lib/utils/cn';
import { ThemeToggle } from '../ThemeToggle';
import { Tooltip } from '../tooltip/Tooltip';
import {
  SidebarProvider,
  Sidebar,
  SidebarRail,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarNavLink,
  SidebarMenuCollapsible,
  SidebarSeparator,
  SidebarTrigger,
  SidebarInset,
  UserMenuPopover,
  UserMenuItem,
  useSidebar,
} from '../sidebar/Sidebar';
import { ROUTES } from '../../../../routes';

// ─── Nav Config ───────────────────────────────────────────────────────────────

const COLLAPSIBLE_GROUPS = [
  { id: 'general', label: 'General', icon: <Icon.BookOpen className="w-4 h-4" />, defaultOpen: true },
  { id: 'forms', label: 'Forms', icon: <Icon.Users className="w-4 h-4" />, defaultOpen: false },
  { id: 'complex', label: 'Complex', icon: <Icon.CreditCard className="w-4 h-4" />, defaultOpen: false },
  { id: 'overlays', label: 'Overlays', icon: <Icon.ShieldCheck className="w-4 h-4" />, defaultOpen: false },
] as const;

// ─── App Sidebar ──────────────────────────────────────────────────────────────

const AppSidebar: React.FC = () => {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';
  const location = useLocation();

  // ─── Memoized Nav Config ───────────────────────────────────────────────────
  const navOverview = React.useMemo(() => 
    ROUTES.filter((r) => r.category === 'overview').map((r) => ({
      to: r.path,
      end: r.end,
      icon: r.icon,
      label: r.label,
    })), 
  []);

  const navCollapsibles = React.useMemo(() => 
    COLLAPSIBLE_GROUPS.map((group) => ({
      id: group.id,
      icon: group.icon,
      label: group.label,
      defaultOpen: group.defaultOpen,
      items: ROUTES.filter((r) => r.category === group.id).map((r) => ({
        to: r.path,
        icon: r.icon,
        label: r.label,
        badge: r.badge,
      })),
    })),
  []);

  return (
    <Sidebar collapsible="icon">
      <SidebarRail />
      {/* Header */}
      <SidebarHeader className="border-b border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <div
              className={cn(
                'flex items-center gap-3 px-2 py-2 rounded-md transition-all duration-200',
                isCollapsed && 'justify-center'
              )}
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0 shadow-sm">
                <span className="text-primary-foreground font-bold text-sm select-none">UI</span>
              </div>
              {!isCollapsed && (
                <div className="overflow-hidden min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate leading-tight">UI Library</p>
                  <p className="text-xs text-muted-foreground truncate leading-tight">Component Showcase</p>
                </div>
              )}
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        {/* Overview */}
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navOverview.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarNavLink to={item.to} end={item.end} icon={item.icon} label={item.label} />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Components Collapsible Groups */}
        <SidebarGroup>
          <SidebarGroupLabel>Components</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navCollapsibles.map((group) => {
                // Detect xem có child nào đang active không
                const isChildActive = group.items.some((item) =>
                  location.pathname === item.to || location.pathname.startsWith(item.to + '/')
                );

                return (
                  <SidebarMenuItem key={group.id}>
                    <SidebarMenuCollapsible
                      id={group.id}
                      icon={group.icon}
                      label={group.label}
                      defaultOpen={group.defaultOpen}
                      isChildActive={isChildActive}
                    >
                      {group.items.map((item) => (
                        <SidebarNavLink
                          key={item.to}
                          to={item.to}
                          icon={item.icon}
                          label={item.label}
                          size="sm"
                          badge={
                            'badge' in item && item.badge && !isCollapsed ? (
                              <span className="text-[10px] bg-primary text-primary-foreground rounded px-1.5 py-0.5 font-medium leading-none">
                                {item.badge}
                              </span>
                            ) : undefined
                          }
                        />
                      ))}
                    </SidebarMenuCollapsible>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer — User menu */}
      <SidebarFooter className="border-t border-sidebar-border pb-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <UserMenuPopover
              name="admin2"
              email="admin@example.com"
              avatar="https://i.pravatar.cc/100"
            >
              <UserMenuItem icon={<Icon.Sparkles className="w-4 h-4" />}>
                Upgrade to Pro
              </UserMenuItem>
              <div className="h-px bg-border/50 my-1" />
              <UserMenuItem icon={<Icon.BadgeCheck className="w-4 h-4" />}>
                Account
              </UserMenuItem>
              <UserMenuItem icon={<Icon.BillingIcon className="w-4 h-4" />}>
                Billing
              </UserMenuItem>
              <UserMenuItem icon={<Icon.BellIcon className="w-4 h-4" />}>
                Notifications
              </UserMenuItem>
              <div className="h-px bg-border/50 my-1" />
              <UserMenuItem icon={<Icon.LogOut className="w-4 h-4" />} destructive>
                Log out
              </UserMenuItem>
            </UserMenuPopover>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

// ─── Header ───────────────────────────────────────────────────────────────────

const Header: React.FC = () => {
  const location = useLocation();
  const segments = location.pathname.replace(/^\//, '').split('/').filter(Boolean);

  return (
    <header className="h-[60px] bg-background/95 backdrop-blur-sm border-b border-border/50 flex items-center px-4 gap-3 sticky top-0 z-30">
      <SidebarTrigger />
      <div className="h-4 w-px bg-border/60" />
      <nav className="flex items-center gap-1 text-sm flex-1 min-w-0">
        <span className="text-muted-foreground hover:text-foreground transition-colors cursor-default">
          Home
        </span>
        {segments.map((seg, i) => (
          <React.Fragment key={i}>
            <Icon.ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40 shrink-0" />
            <span
              className={
                i === segments.length - 1
                  ? 'text-foreground font-medium capitalize truncate'
                  : 'text-muted-foreground capitalize'
              }
            >
              {seg.replace(/-/g, ' ')}
            </span>
          </React.Fragment>
        ))}
      </nav>
      <div className="flex items-center gap-2 shrink-0">
        <ThemeToggle />
        <img
          src="https://i.pravatar.cc/100"
          alt="avatar"
          className="w-8 h-8 rounded-full object-cover border border-border cursor-pointer"
        />
      </div>
    </header>
  );
};

// ─── DashboardLayout ──────────────────────────────────────────────────────────

export const LayoutSample = React.forwardRef<HTMLDivElement, { children?: React.ReactNode }>(({ children }, ref) => {
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

LayoutSample.displayName = "LayoutSample";
