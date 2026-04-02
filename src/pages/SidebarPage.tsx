import React from 'react'
import { PageHeader, ShowcaseCard } from '@/components/ui/Showcase'
import {
    SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarGroup,
    SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem,
    SidebarMenuButton, SidebarMenuBadge, SidebarSeparator, SidebarFooter,
    SidebarInset, SidebarTrigger, SidebarMenuSkeleton,
    UserMenuPopover,
    UserMenuItem,
    SidebarMenuCollapsible,
    SidebarNavLink,
    useSidebar
} from '@components/ui/sidebar/Sidebar'
import * as Icons from '@components/ui/icons'
import { useLocation } from 'react-router-dom';

const SidebarPage = () => {
    const [open, setOpen] = React.useState(true);
    const { state } = useSidebar();
    const isCollapsed = state === 'collapsed';
    const location = useLocation();
    const NAV_OVERVIEW = [
        { to: '/', end: true, icon: <Icons.LayoutDashboard className="w-4 h-4" />, label: 'Dashboard' },
    ];
    const NAV_COLLAPSIBLES = [
        {
            id: 'components',
            icon: <Icons.LayoutDashboard className="w-4 h-4" />,
            label: 'Components',
            defaultOpen: true,
            items: [
                { to: '#', icon: <Icons.AlertCircle className="w-4 h-4" />, label: 'Alert' },
                { to: '#', icon: <Icons.BadgeCheck className="w-4 h-4" />, label: 'Badge' },
                { to: '#', icon: <Icons.CheckCircle2 className="w-4 h-4" />, label: 'Button' },
                { to: '#', icon: <Icons.Bell className="w-4 h-4" />, label: 'Bell' },

            ],
        },
    ];
    return (
        <div className="max-w-5xl">
            <PageHeader title="Sidebar" description="Thanh điều hướng chuyên nghiệp với đầy đủ tính năng (collapsible, groups, menus)." />

            {/* Live Demo */}
            <ShowcaseCard title="Live Demo" description="Click nút toggle hoặc nhấn ⌘B / Ctrl+B để thu/mở sidebar.">
                <div className="rounded-xl border border-border overflow-hidden" style={{ height: 420 }}>
                    <SidebarProvider defaultOpen={open} onOpenChange={setOpen}>
                        <Sidebar collapsible="icon" className="h-[420px]! relative! border-0">
                            <SidebarHeader className="border-b border-border/50">
                                <div className="flex items-center gap-2 px-2 py-1.5">
                                    <div className="w-7 h-7 bg-primary rounded-md flex items-center justify-center shrink-0">
                                        <span className="text-primary-foreground text-xs font-bold">A</span>
                                    </div>
                                    {open && <span className="text-sm font-semibold text-foreground">Acme Inc</span>}
                                </div>
                            </SidebarHeader>

                            <SidebarContent>
                                {/* Overview */}
                                <SidebarGroup>
                                    <SidebarGroupLabel>Overview</SidebarGroupLabel>
                                    <SidebarGroupContent>
                                        <SidebarMenu>
                                            {NAV_OVERVIEW.map((item) => (
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
                                            {NAV_COLLAPSIBLES.map((group) => {
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
                                                                        'badge' in item && !isCollapsed ? (
                                                                            <span className="text-[10px] bg-primary text-primary-foreground rounded px-1.5 py-0.5 font-medium leading-none">
                                                                                {(item as any).badge}
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

                            <SidebarFooter className="border-t border-sidebar-border pb-2">
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <UserMenuPopover
                                            name="admin2"
                                            email="admin@example.com"
                                            avatar="https://i.pravatar.cc/100"
                                        >
                                            <UserMenuItem icon={<Icons.Sparkles className="w-4 h-4" />}>
                                                Upgrade to Pro
                                            </UserMenuItem>
                                            <div className="h-px bg-border/50 my-1" />
                                            <UserMenuItem icon={<Icons.BadgeCheck className="w-4 h-4" />}>
                                                Account
                                            </UserMenuItem>
                                            <UserMenuItem icon={<Icons.CreditCard className="w-4 h-4" />}>
                                                Billing
                                            </UserMenuItem>
                                            <UserMenuItem icon={<Icons.Bell className="w-4 h-4" />}>
                                                Notifications
                                            </UserMenuItem>
                                            <div className="h-px bg-border/50 my-1" />
                                            <UserMenuItem icon={<Icons.LogOut className="w-4 h-4" />} destructive>
                                                Log out
                                            </UserMenuItem>
                                        </UserMenuPopover>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarFooter>
                        </Sidebar>

                        <SidebarInset className="h-[420px]! bg-muted/20">
                            <div className="flex items-center gap-2 px-4 h-12 border-b border-border/50 bg-background">
                                <SidebarTrigger />
                                <span className="text-sm text-muted-foreground">Toggle sidebar</span>
                            </div>
                            <div className="p-4 text-sm text-muted-foreground">Main content area</div>
                        </SidebarInset>
                    </SidebarProvider>
                </div>
            </ShowcaseCard>

            {/* Loading state */}
            <ShowcaseCard title="Loading Skeleton" description="Trạng thái loading với SidebarMenuSkeleton.">
                <div className="w-64 border border-border rounded-xl overflow-hidden bg-background">
                    <div className="p-3 border-b border-border/50">
                        <div className="h-8 w-32 rounded-md bg-muted animate-pulse" />
                    </div>
                    <div className="p-2 space-y-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <SidebarMenuSkeleton key={i} showIcon />
                        ))}
                    </div>
                </div>
            </ShowcaseCard>
        </div>
    );
};

export default SidebarPage;
