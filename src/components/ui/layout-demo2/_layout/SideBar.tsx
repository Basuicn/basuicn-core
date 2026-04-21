import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils/cn";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuCollapsible,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar/Sidebar";
import { routesConfig } from "../constants/route.constants";

const SideBar = () => {
  const { pathname } = useLocation();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  return (
    <Sidebar collapsible="icon" variant="sidebar" side="left" data-lenis-prevent>
      <SidebarHeader>
        <Link to="/blocks">
          <div
            className={cn(
              "flex items-center gap-3 px-2 py-2 rounded-md transition-all duration-200",
              isCollapsed && "justify-center",
            )}
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0 shadow-sm flex-none">
              <span className="text-primary-foreground font-bold text-sm select-none">
                UI
              </span>
            </div>
            {!isCollapsed && (
              <div className="overflow-hidden min-w-0">
                <p className="text-sm font-semibold text-foreground truncate leading-tight">
                  UI Library
                </p>
                <p className="text-xs text-muted-foreground truncate leading-tight">
                  Component Showcase
                </p>
              </div>
            )}
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {routesConfig.map((route, idx) => {
          const isChildActive = route.items.some(
            (item) => pathname === item.href,
          );
          const shouldDefaultOpen = isChildActive || route.defaultOpen === true;

          return (
            <SidebarGroup key={idx}>
              {route.collapsible ? (
                <>
                  <SidebarGroupLabel>{route.title}</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuCollapsible
                          id={route.title}
                          icon={
                            <span className="shrink-0 w-4 h-4 flex items-center justify-center">
                              {route.icon}
                            </span>
                          }
                          label={route.title}
                          defaultOpen={shouldDefaultOpen}
                          isChildActive={isChildActive}
                        >
                          {route.items.map((item, i) => {
                            const isActive = pathname === item.href;
                            return (
                              <SidebarMenuSubItem key={i}>
                                <Link to={item.href}>
                                  <SidebarMenuButton
                                    isActive={isActive}
                                    tooltip={item.title}
                                    size="sm"
                                    className={cn(
                                      isActive &&
                                        "bg-sidebar-accent text-sidebar-accent-foreground font-semibold",
                                    )}
                                  >
                                    <span className="shrink-0 w-4 h-4 flex items-center justify-center">
                                      {item.icon}
                                    </span>
                                    <span className="truncate">{item.title}</span>
                                  </SidebarMenuButton>
                                </Link>
                              </SidebarMenuSubItem>
                            );
                          })}
                        </SidebarMenuCollapsible>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </>
              ) : (
                <>
                  <SidebarGroupLabel>{route.title}</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {route.items.map((item, i) => {
                        const isActive = pathname === item.href;
                        return (
                          <SidebarMenuItem key={i}>
                            <Link to={item.href}>
                              <SidebarMenuButton
                                isActive={isActive}
                                tooltip={item.title}
                                size="sm"
                                className={cn(
                                  isActive &&
                                    "bg-sidebar-accent text-sidebar-accent-foreground font-semibold",
                                )}
                              >
                                <span className="shrink-0 w-4 h-4 flex items-center justify-center">
                                  {item.icon}
                                </span>
                                <span className="truncate">{item.title}</span>
                              </SidebarMenuButton>
                            </Link>
                          </SidebarMenuItem>
                        );
                      })}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </>
              )}
            </SidebarGroup>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
};

export default SideBar;
