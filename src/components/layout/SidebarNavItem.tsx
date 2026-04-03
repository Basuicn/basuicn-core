import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { type RouteConfig } from '../../../routes';
import {
  SidebarMenuItem,
  SidebarNavLink,
  SidebarMenuCollapsible,
} from '../ui/sidebar/Sidebar';

export interface SidebarNavItemProps {
  route: RouteConfig;
  parentPath?: string;
  isCollapsed: boolean;
}

export const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ route, parentPath = '', isCollapsed }) => {
  const location = useLocation();

  const absolutePath = [parentPath, route.prefix, route.path]
    .filter(Boolean)
    .join('/')
    .replace(/\/+/g, '/');

  const hasChildren = route.children && route.children.length > 0;

  const isAnyChildActive = React.useMemo(() => {
    if (!hasChildren) return false;
    const checkActive = (items: RouteConfig[]): boolean => {
      return items.some(item => {
        const itemAbsPath = [absolutePath, item.prefix, item.path]
          .filter(Boolean)
          .join('/')
          .replace(/\/+/g, '/');
        if (location.pathname === itemAbsPath) return true;
        if (item.children) return checkActive(item.children);
        return false;
      });
    };
    return checkActive(route.children ?? []);
  }, [hasChildren, route.children, absolutePath, location.pathname]);

  if (hasChildren) {
    return (
      <SidebarMenuItem>
        <SidebarMenuCollapsible
          id={route.label}
          icon={route.icon}
          label={route.label}
          isChildActive={isAnyChildActive}
        >
          {route.children!.map((child, index) => (
            <SidebarNavItem
              key={index}
              route={child}
              parentPath={absolutePath}
              isCollapsed={isCollapsed}
            />
          ))}
        </SidebarMenuCollapsible>
      </SidebarMenuItem>
    );
  }

  if (route.element) {
    return (
      <SidebarMenuItem>
        <SidebarNavLink
          to={absolutePath === '' ? '/' : absolutePath}
          icon={route.icon}
          label={route.label}
          end={route.end}
          size="sm"
          badge={
            route.badge && !isCollapsed ? (
              <span className="text-[10px] bg-primary text-primary-foreground rounded px-1.5 py-0.5 font-medium leading-none">
                {route.badge}
              </span>
            ) : undefined
          }
        />
      </SidebarMenuItem>
    );
  }

  return null;
};
