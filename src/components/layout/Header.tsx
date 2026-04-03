import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { type RouteConfig, ROUTES } from '../../../routes';
import { ThemeToggle } from '../ui/ThemeToggle';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb/Breadcrumb';
import { SidebarTrigger } from '../ui/sidebar/Sidebar';
import { HeaderSearch } from './HeaderSearch';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const segments = location.pathname.replace(/^\//, '').split('/').filter(Boolean);

  const currentLabel = React.useMemo(() => {
    const findRouteLabel = (routes: RouteConfig[], parentPath = ''): string | null => {
      for (const route of routes) {
        const absolutePath = [parentPath, route.prefix, route.path]
          .filter(Boolean)
          .join('/')
          .replace(/\/+/g, '/');

        const targetPath = absolutePath === '' ? '/' : absolutePath;
        if (location.pathname === targetPath) return route.label;

        if (route.children) {
          const childLabel = findRouteLabel(route.children, absolutePath);
          if (childLabel) return childLabel;
        }
      }
      return null;
    };
    return findRouteLabel(ROUTES) || 'UI Library';
  }, [location.pathname]);

  const routeHasPage = React.useCallback((targetPath: string): boolean => {
    const find = (routes: RouteConfig[], parentPath = ''): boolean => {
      for (const route of routes) {
        const absolutePath = [parentPath, route.prefix, route.path]
          .filter(Boolean)
          .join('/')
          .replace(/\/+/g, '/');
        const fullPath = absolutePath === '' ? '/' : absolutePath;
        if (fullPath === targetPath) return !!route.element;
        if (route.children && find(route.children, fullPath)) return true;
      }
      return false;
    };
    return find(ROUTES);
  }, []);

  return (
    <header className="h-[66px] bg-background/95 backdrop-blur-sm border-b border-border/50 flex items-center px-4 gap-3 sticky top-0">
      <SidebarTrigger />
      <div className="h-4 w-px bg-border/60" />

      <nav className="flex items-center gap-1 text-sm flex-1 min-w-0">
        <div className="flex flex-col">
          <h1 className="text-foreground font-medium capitalize truncate text-lg">{currentLabel}</h1>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink onClick={() => navigate('/')} className="cursor-pointer">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              {segments.map((seg, i) => {
                const href = '/' + segments.slice(0, i + 1).join('/');
                const isLast = i === segments.length - 1;
                const isNavigable = !isLast && routeHasPage(href);
                const label = seg.replace(/-/g, ' ');
                return (
                  <React.Fragment key={i}>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      {isLast ? (
                        <BreadcrumbPage className="capitalize">{label}</BreadcrumbPage>
                      ) : isNavigable ? (
                        <BreadcrumbLink onClick={() => navigate(href)} className="cursor-pointer capitalize">
                          {label}
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbLink asChild className="capitalize cursor-default">
                          <span>{label}</span>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </React.Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </nav>

      <HeaderSearch />

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

export { Header };
