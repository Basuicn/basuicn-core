import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '../../../routes';
import * as Icon from '@/components/ui/icons';
import { cn } from '@/lib/utils/cn';
import {
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
  SidebarSeparator,
  UserMenuPopover,
  UserMenuItem,
  useSidebar,
} from '../ui/sidebar/Sidebar';
import { SidebarNavItem } from './SidebarNavItem';

const AppSidebar: React.FC = () => {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarRail />
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

      <SidebarContent>
        {['overview', 'general', 'forms', 'complex', 'overlays'].map((cat) => {
          const catRoutes = ROUTES.filter(r => r.category === cat);
          if (catRoutes.length === 0) return null;

          return (
            <SidebarGroup key={cat}>
              <SidebarGroupLabel className="capitalize">{cat}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {catRoutes.map((route, idx) => (
                    <SidebarNavItem
                      key={idx}
                      route={route}
                      isCollapsed={isCollapsed}
                    />
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
              <SidebarSeparator className="mt-2 opacity-50" />
            </SidebarGroup>
          );
        })}
      </SidebarContent>

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

export { AppSidebar };
