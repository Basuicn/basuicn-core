import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { PanelLeft, ChevronRight, ChevronsUpDown } from 'lucide-react';
import { tv } from 'tailwind-variants';
import { Popover as BasePopover } from '@base-ui/react';
import { Tooltip, TooltipTrigger, TooltipContent } from '../tooltip/Tooltip';
import { cn } from '@/lib/utils/cn';

// ─── Constants ────────────────────────────────────────────────────────────────

const SIDEBAR_WIDTH_DEFAULT = 256; // px
const SIDEBAR_WIDTH_MIN = 160; // px
const SIDEBAR_WIDTH_MAX = 480; // px
const SIDEBAR_WIDTH_ICON = '4rem';
const MOBILE_BREAKPOINT = 768;

// ─── Context ──────────────────────────────────────────────────────────────────

type SidebarState = 'expanded' | 'collapsed';

interface SidebarContextValue {
  state: SidebarState;
  open: boolean;
  setOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  isMobile: boolean;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  sidebarWidth: number;
  setSidebarWidth: (w: number) => void;
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

export function useSidebar() {
  const ctx = React.useContext(SidebarContext);
  if (!ctx) throw new Error('useSidebar must be used within SidebarProvider');
  return ctx;
}

// ─── Provider ─────────────────────────────────────────────────────────────────

/** Props for the SidebarProvider that manages sidebar state (open/collapsed, mobile, width) */
export interface SidebarProviderProps {
  children: React.ReactNode;
  /** Initial open state for uncontrolled usage (default: true) */
  defaultOpen?: boolean;
  /** Controlled open state */
  open?: boolean;
  /** Callback fired when the sidebar opens or closes */
  onOpenChange?: (open: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
}

const SidebarProvider = React.forwardRef<HTMLDivElement, SidebarProviderProps>(
  ({ children, defaultOpen = true, open: controlledOpen, onOpenChange, className, style }, ref) => {
    const [isMobile, setIsMobile] = React.useState(false);
    const [openMobile, setOpenMobile] = React.useState(false);
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
    const [sidebarWidth, setSidebarWidth] = React.useState(SIDEBAR_WIDTH_DEFAULT);

    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen! : internalOpen;

    React.useEffect(() => {
      const check = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
      check();
      window.addEventListener('resize', check);
      return () => window.removeEventListener('resize', check);
    }, []);

    const setOpen = React.useCallback(
      (val: boolean) => {
        if (!isControlled) setInternalOpen(val);
        onOpenChange?.(val);
      },
      [isControlled, onOpenChange]
    );

    const toggleSidebar = React.useCallback(() => {
      if (isMobile) setOpenMobile((v) => !v);
      else setOpen(!open);
    }, [isMobile, open, setOpen]);

    React.useEffect(() => {
      const onKey = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
          e.preventDefault();
          toggleSidebar();
        }
      };
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }, [toggleSidebar]);

    const state: SidebarState = open ? 'expanded' : 'collapsed';

    return (
      <SidebarContext.Provider
        value={{ state, open, setOpen, toggleSidebar, isMobile, openMobile, setOpenMobile, sidebarWidth, setSidebarWidth }}
      >
        <div
          ref={ref}
          data-sidebar-state={state}
          style={
            {
              '--sidebar-width': `${sidebarWidth}px`,
              '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          className={cn('group/sidebar-wrapper flex min-h-screen w-full has-data-[variant=inset]:bg-muted/30', className)}
        >
          {children}
        </div>
      </SidebarContext.Provider>
    );
  }
);
SidebarProvider.displayName = 'SidebarProvider';

// ─── SidebarTrigger ───────────────────────────────────────────────────────────

const SidebarTrigger = React.forwardRef<
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

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
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
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={() => setOpenMobile(false)}
            />
          )}
          <aside
            ref={ref}
            className={cn(
              'fixed inset-y-0 z-50 flex flex-col bg-sidebar border-r border-sidebar-border shadow-xl',
              'transition-transform duration-300 ease-in-out',
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
          'group relative flex h-screen flex-col bg-sidebar text-sidebar-foreground',
          'border-r border-dashed border-sidebar-border',
          state === 'collapsed' && 'will-change-[width] transition-[width] duration-300 ease-in-out',
          'overflow-hidden shrink-0',
          state === 'collapsed' && collapsible === 'icon' ? 'w-(--sidebar-width-icon)' : 'w-(--sidebar-width)',
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

// ─── SidebarRail — drag handle để resize ──────────────────────────────────────

const SidebarRail = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { state, setSidebarWidth, sidebarWidth } = useSidebar();
    const isDragging = React.useRef(false);
    const startX = React.useRef(0);
    const startWidth = React.useRef(0);

    const onMouseDown = React.useCallback(
      (e: React.MouseEvent) => {
        if (state === 'collapsed') return;
        isDragging.current = true;
        startX.current = e.clientX;
        startWidth.current = sidebarWidth;
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
      },
      [state, sidebarWidth]
    );

    React.useEffect(() => {
      const onMouseMove = (e: MouseEvent) => {
        if (!isDragging.current) return;
        const delta = e.clientX - startX.current;
        const next = Math.min(SIDEBAR_WIDTH_MAX, Math.max(SIDEBAR_WIDTH_MIN, startWidth.current + delta));
        setSidebarWidth(next);
      };

      const onMouseUp = () => {
        if (!isDragging.current) return;
        isDragging.current = false;
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };
    }, [setSidebarWidth]);

    if (state === 'collapsed') return null;

    return (
      <div
        ref={ref}
        data-sidebar="rail"
        aria-label="Resize sidebar"
        onMouseDown={onMouseDown}
        className={cn(
          'absolute inset-y-0 right-0 z-20 w-1 cursor-col-resize',
          'group/rail flex items-center justify-center',
          'after:absolute after:inset-y-0 after:right-0 after:w-1',
          'hover:after:bg-primary/50 transition-colors duration-150',
          className
        )}
        {...props}
      >
      </div>
    );
  }
);
SidebarRail.displayName = 'SidebarRail';

// ─── SidebarInset ─────────────────────────────────────────────────────────────

const SidebarInset = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
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

const SidebarHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
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

const SidebarFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
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

const SidebarContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
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

const SidebarSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
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

// ─── Group ────────────────────────────────────────────────────────────────────

const SidebarGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-sidebar="group"
      className={cn('relative flex flex-col w-full min-w-0 px-2 py-1', className)}
      {...props}
    />
  )
);
SidebarGroup.displayName = 'SidebarGroup';

const SidebarGroupLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { state } = useSidebar();
    return (
      <div
        ref={ref}
        data-sidebar="group-label"
        className={cn(
          'flex h-8 shrink-0 items-center rounded-md px-2',
          'text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider',
          'transition-all duration-200 overflow-hidden whitespace-nowrap select-none',
          state === 'collapsed' ? 'opacity-0 h-0 mb-0 hidden' : 'opacity-100',
          className
        )}
        {...props}
      />
    );
  }
);
SidebarGroupLabel.displayName = 'SidebarGroupLabel';

const SidebarGroupContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-sidebar="group-content"
      className={cn('w-full', className)}
      {...props}
    />
  )
);
SidebarGroupContent.displayName = 'SidebarGroupContent';

// ─── Menu ─────────────────────────────────────────────────────────────────────

const SidebarMenu = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      data-sidebar="menu"
      className={cn('flex flex-col gap-0.5 list-none m-0 p-0 w-full', className)}
      {...props}
    />
  )
);
SidebarMenu.displayName = 'SidebarMenu';

const SidebarMenuItem = React.forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => (
    <li
      ref={ref}
      data-sidebar="menu-item"
      className={cn('group/menu-item relative', className)}
      {...props}
    />
  )
);
SidebarMenuItem.displayName = 'SidebarMenuItem';

// ─── SidebarMenuButton ────────────────────────────────────────────────────────

const menuButtonVariants = tv({
  base: [
    'peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md',
    'text-sm font-medium outline-none ring-sidebar-ring transition-all duration-150',
    'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
    'focus-visible:ring-2 active:bg-sidebar-accent/80',
    'disabled:pointer-events-none disabled:opacity-50',
    'group-has-data-[sidebar=menu-action]/menu-item:pr-8',
    // Data state active
    'data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[active=true]:font-semibold',
  ],
  variants: {
    size: {
      sm: 'h-7 text-xs px-2',
      md: 'h-9 px-2',
      lg: 'h-11 text-base px-3',
    },
    collapsed: {
      true: 'justify-center px-0',
      false: 'justify-start',
    },
  },
  defaultVariants: { size: 'md', collapsed: false },
});

/** Props for a sidebar menu button */
export interface SidebarMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Render as child element instead of a button */
  asChild?: boolean;
  /** Marks the button as the currently active item */
  isActive?: boolean;
  /** Tooltip text shown when the sidebar is collapsed */
  tooltip?: string;
  /** Button size variant */
  size?: 'sm' | 'md' | 'lg';
}

const SidebarMenuButton = React.forwardRef<HTMLButtonElement, SidebarMenuButtonProps>(
  ({ className, isActive = false, tooltip, size = 'md', children, ...props }, ref) => {
    const { state } = useSidebar();
    const isCollapsed = state === 'collapsed';

    const button = (
      <button
        ref={ref}
        type="button"
        data-sidebar="menu-button"
        data-active={isActive}
        data-size={size}
        className={menuButtonVariants({ size, collapsed: isCollapsed, className })}
        {...props}
      >
        {isCollapsed
          ? React.Children.toArray(children)[0]
          : children}
      </button>
    );

    if (isCollapsed && tooltip) {
      return (
        <Tooltip>
          <TooltipTrigger render={button} />
          <TooltipContent side="right">{tooltip}</TooltipContent>
        </Tooltip>
      );
    }

    return button;
  }
);
SidebarMenuButton.displayName = 'SidebarMenuButton';

// ─── SidebarNavLink — wraps React Router NavLink ─────────────────────────────

/** Props for a sidebar navigation link (wraps React Router NavLink) */
export interface SidebarNavLinkProps {
  /** Route path for the link */
  to: string;
  /** Icon rendered before the label */
  icon?: React.ReactNode;
  /** Display text for the link; also used as tooltip when collapsed */
  label: string;
  /** Match route exactly (React Router `end` prop) */
  end?: boolean;
  /** Badge element rendered after the label */
  badge?: React.ReactNode;
  /** Link size variant */
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SidebarNavLink: React.FC<SidebarNavLinkProps> = ({
  to,
  icon,
  label,
  end = false,
  badge,
  size = 'md',
  className,
}) => {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  const link = (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => cn(
        menuButtonVariants({ size, collapsed: isCollapsed, className }),
        isActive ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold' : 'text-sidebar-foreground/70'
      )}
    >
      {icon && (
        <span className="shrink-0 flex h-4 w-4 items-center justify-center">
          {icon}
        </span>
      )}
      {!isCollapsed && (
        <>
          <span className="flex-1 truncate">{label}</span>
          {badge && <span className="ml-auto shrink-0">{badge}</span>}
        </>
      )}
    </NavLink>
  );

  if (isCollapsed && label) {
    return (
      <Tooltip>
        <TooltipTrigger render={link} />
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    );
  }

  return link;
};
SidebarNavLink.displayName = 'SidebarNavLink';

// ─── SidebarMenuCollapsible — nhóm có sub-items ───────────────────────────────

/** Props for a collapsible sidebar menu group with sub-items */
export interface SidebarMenuCollapsibleProps {
  /** Unique identifier for the group */
  id: string;
  /** Icon displayed next to the group label */
  icon: React.ReactNode;
  /** Display text for the collapsible group header */
  label: string;
  children: React.ReactNode;
  /** Whether the group is initially expanded */
  defaultOpen?: boolean;
  /** When true, the group auto-expands and shows an active indicator */
  isChildActive?: boolean;
}

const SidebarMenuCollapsible: React.FC<SidebarMenuCollapsibleProps> = ({
  icon,
  label,
  children,
  defaultOpen = false,
  isChildActive = false,
}) => {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  const [isOpen, setIsOpen] = React.useState(defaultOpen || isChildActive);
  const prevOpenRef = React.useRef(isOpen);

  // Khi sidebar collapse → đóng tất cả sub-menu, ghi nhớ state
  // Khi sidebar expand → khôi phục state cũ
  React.useEffect(() => {
    if (isCollapsed) {
      prevOpenRef.current = isOpen;
      setIsOpen(false);
    } else {
      setIsOpen(prevOpenRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCollapsed]);

  // Khi có child active, mở group
  React.useEffect(() => {
    if (isChildActive && !isCollapsed) {
      setIsOpen(true);
      prevOpenRef.current = true;
    }
  }, [isChildActive, isCollapsed]);

  const trigger = (
    <button
      type="button"
      aria-expanded={isOpen}
      data-active={isChildActive && isCollapsed}
      onClick={() => {
        if (!isCollapsed) {
          const next = !isOpen;
          setIsOpen(next);
          prevOpenRef.current = next;
        }
      }}
      className={menuButtonVariants({
        collapsed: isCollapsed,
        className:
          isChildActive && isCollapsed
            ? 'text-sidebar-accent-foreground'
            : 'text-sidebar-foreground/70',
      })}
    >
      <span className="shrink-0 flex h-4 w-4 items-center justify-center">{icon}</span>
      {!isCollapsed && (
        <>
          <span className="flex-1 truncate text-left">{label}</span>
          <ChevronRight
            className={cn(
              'ml-auto h-3.5 w-3.5 shrink-0 text-sidebar-foreground/40',
              'transition-transform duration-200',
              isOpen && 'rotate-90'
            )}
          />
        </>
      )}
    </button>
  );

  return (
    <>
      {isCollapsed ? (
        <Tooltip>
          <TooltipTrigger render={trigger} />
          <TooltipContent side="right">{label}</TooltipContent>
        </Tooltip>
      ) : (
        trigger
      )}

      {/* Sub-items với animation mượt - Sử dụng SidebarMenuSub (ul) để hợp lệ HTML */}
      <SidebarMenuSub
        className={cn(
          'overflow-hidden transition-all duration-200 ease-in-out',
          !isCollapsed && isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        {children}
      </SidebarMenuSub>
    </>
  );
};
SidebarMenuCollapsible.displayName = 'SidebarMenuCollapsible';

// ─── SidebarMenuSub ───────────────────────────────────────────────────────────

const SidebarMenuSub = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
  ({ className, ...props }, ref) => {
    const { state } = useSidebar();
    if (state === 'collapsed') return null;
    return (
      <ul
        ref={ref}
        data-sidebar="menu-sub"
        className={cn('mx-3.5 flex min-w-0 flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5 list-none', className)}
        {...props}
      />
    );
  }
);
SidebarMenuSub.displayName = 'SidebarMenuSub';

const SidebarMenuSubItem = React.forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement>>(
  (props, ref) => <li ref={ref} {...props} />
);
SidebarMenuSubItem.displayName = 'SidebarMenuSubItem';

// ─── Badge & Skeleton ─────────────────────────────────────────────────────────

const SidebarMenuBadge = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-sidebar="menu-badge"
      className={cn('ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-primary/10 px-1 text-xs font-medium text-primary', className)}
      {...props}
    />
  )
);
SidebarMenuBadge.displayName = 'SidebarMenuBadge';

const SidebarMenuSkeleton: React.FC<{ showIcon?: boolean }> = ({ showIcon = true }) => (
  <div className="flex h-9 items-center gap-2 rounded-md px-2">
    {showIcon && <div className="h-4 w-4 rounded bg-sidebar-accent animate-pulse shrink-0" />}
    <div className="h-4 flex-1 rounded bg-sidebar-accent animate-pulse" />
  </div>
);

// ─── User Menu Popover (shadcn style) ─────────────────────────────────────────

interface UserMenuPopoverProps {
  name: string;
  email: string;
  avatar?: string;
  children?: React.ReactNode;
}

const UserMenuPopover: React.FC<UserMenuPopoverProps> = ({ name, email, avatar, children }) => {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';
  const [open, setOpen] = React.useState(false);

  const trigger = (
    <BasePopover.Trigger
      render={
        <button
          type="button"
          data-active={open}
          className={cn(
            menuButtonVariants({ size: 'lg', collapsed: isCollapsed }),
            'data-[active=true]:bg-sidebar-accent'
          )}
        >
          <img
            src={avatar || 'https://i.pravatar.cc/100'}
            alt={name}
            className="w-8 h-8 rounded-lg shrink-0 object-cover border border-sidebar-border"
          />
          {!isCollapsed && (
            <>
              <div className="flex-1 text-left overflow-hidden grid">
                <span className="text-sm font-semibold truncate leading-tight">{name}</span>
                <span className="text-xs text-sidebar-foreground/50 truncate leading-tight">{email}</span>
              </div>
              <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 text-sidebar-foreground/40" />
            </>
          )}
        </button>
      }
    />
  );

  return (
    <BasePopover.Root open={open} onOpenChange={setOpen}>
      {isCollapsed ? (
        <Tooltip>
          <TooltipTrigger render={trigger} />
          <TooltipContent side="right">{name}</TooltipContent>
        </Tooltip>
      ) : (
        trigger
      )}
      <BasePopover.Portal>
        <BasePopover.Positioner side="right" align="end" sideOffset={8}>
          <BasePopover.Popup
            className={cn(
              'z-50 w-64 rounded-xl border border-border bg-popover shadow-xl outline-none p-1',
              'data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95',
              'data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95'
            )}
          >
            {/* User info header */}
            <div className="flex items-center gap-3 p-3 pb-2 border-b border-border/50">
              <img
                src={avatar || 'https://i.pravatar.cc/100'}
                alt={name}
                className="w-10 h-10 rounded-lg object-cover border border-border"
              />
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-semibold truncate">{name}</p>
                <p className="text-xs text-muted-foreground truncate">{email}</p>
              </div>
            </div>

            {/* Menu items */}
            <div className="py-1">{children}</div>
          </BasePopover.Popup>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  );
};

// ─── UserMenuItem (item trong popover) ───────────────────────────────────────

interface UserMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  destructive?: boolean;
}

const UserMenuItem: React.FC<UserMenuItemProps> = ({ icon, children, destructive, className, ...props }) => (
  <button
    type="button"
    className={cn(
      'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors',
      'hover:bg-muted outline-none focus-visible:bg-muted',
      destructive ? 'text-destructive hover:text-destructive' : 'text-foreground',
      className
    )}
    {...props}
  >
    {icon && <span className="shrink-0 h-4 w-4 flex items-center justify-center">{icon}</span>}
    {children}
  </button>
);

// ─── Exports ──────────────────────────────────────────────────────────────────

export {
  SidebarProvider,
  SidebarTrigger,
  Sidebar,
  SidebarRail,
  SidebarInset,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarSeparator,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarNavLink,
  SidebarMenuCollapsible,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuBadge,
  SidebarMenuSkeleton,
  UserMenuPopover,
  UserMenuItem,
};
