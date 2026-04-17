import * as React from 'react';
import { Menu as BaseMenu } from '@base-ui/react';
import { useNavigate, useMatch } from 'react-router-dom';
import { tv } from 'tailwind-variants';
import { ChevronRight, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

/* ─── Types ─────────────────────────────────────────────────────────────── */

/** How the menu item behaves when clicked */
export type MenuBarItemType = 'link' | 'button' | 'modal' | 'external';

/** Config for a single item inside a menu */
export interface MenuBarItemConfig {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  /** @default 'button' */
  type?: MenuBarItemType;
  /** Route path for type='link', full URL for type='external' */
  href?: string;
  /** Called on click for type='button' | 'modal', and as fallback for 'link' | 'external' */
  onClick?: () => void;
  shortcut?: string;
  disabled?: boolean;
  /** Renders a separator line before this item */
  separator?: boolean;
  /** Nested items — renders as a flyout submenu (unlimited depth) */
  children?: MenuBarItemConfig[];
}

/** Config for one top-level menu entry.
 *
 * - Có `items` → dropdown menu bình thường
 * - Không có `items` → click thẳng vào entry (dùng `type` + `href` / `onClick`)
 */
export interface MenuBarMenuConfig {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  /** Nếu có items → render dropdown. Nếu bỏ qua → render trực tiếp như button/link */
  items?: MenuBarItemConfig[];
  disabled?: boolean;
  /** Chỉ dùng khi không có items. @default 'button' */
  type?: MenuBarItemType;
  /** Route path (type='link') hoặc URL (type='external') */
  href?: string;
  /** Callback khi click (type='button' | 'modal') */
  onClick?: () => void;
}

/* ─── Variants ──────────────────────────────────────────────────────────── */

const menuBarVariants = tv({
  slots: {
    root: 'flex items-center gap-0.5 rounded-md border border-border bg-background p-1',
    trigger:
      'inline-flex items-center gap-1.5 rounded-sm px-3 py-1.5 text-sm font-medium outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none',
    content:
      'z-50 min-w-[12rem] overflow-hidden rounded-md border border-border bg-background p-1 text-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
    item:
      'relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    itemActive: 'bg-accent/50 font-medium',
    subTrigger:
      'relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    subContent:
      'z-50 min-w-[12rem] overflow-hidden rounded-md border border-border bg-background p-1 text-foreground shadow-lg animate-in fade-in-0 zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
    separator: '-mx-1 my-1 h-px bg-border',
    label: 'px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider',
    shortcut: 'ml-auto text-xs tracking-widest opacity-60',
  },
});

const styles = menuBarVariants();

/* ─── MenuBar ───────────────────────────────────────────────────────────── */

export interface MenuBarProps extends React.ComponentPropsWithoutRef<'div'> {}

const MenuBar = React.forwardRef<HTMLDivElement, MenuBarProps>(({ className, ...props }, ref) => (
  <div ref={ref} role="menubar" className={styles.root({ className })} {...props} />
));
MenuBar.displayName = 'MenuBar';

/* ─── MenuBarMenu ───────────────────────────────────────────────────────── */

const MenuBarMenu = BaseMenu.Root;

/* ─── MenuBarTrigger ────────────────────────────────────────────────────── */

export interface MenuBarTriggerProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseMenu.Trigger>, 'className'> {
  className?: string;
}

const MenuBarTrigger = React.forwardRef<HTMLButtonElement, MenuBarTriggerProps>(
  ({ className, ...props }, ref) => (
    <BaseMenu.Trigger
      ref={ref as React.Ref<HTMLButtonElement>}
      className={styles.trigger({ className })}
      {...props}
    />
  )
);
MenuBarTrigger.displayName = 'MenuBarTrigger';

/* ─── MenuBarButton (top-level direct item, no dropdown) ───────────────── */

export interface MenuBarButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  /** Highlights the button (e.g. active route) */
  active?: boolean;
}

const MenuBarButton = React.forwardRef<HTMLButtonElement, MenuBarButtonProps>(
  ({ className, active, ...props }, ref) => (
    <button
      ref={ref}
      className={styles.trigger({ className: cn(active && styles.itemActive(), className) })}
      {...props}
    />
  )
);
MenuBarButton.displayName = 'MenuBarButton';

/* ─── MenuBarContent ────────────────────────────────────────────────────── */

export interface MenuBarContentProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseMenu.Popup>, 'className'> {
  className?: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
}

const MenuBarContent = React.forwardRef<
  React.ComponentRef<typeof BaseMenu.Popup>,
  MenuBarContentProps
>(({ className, side = 'bottom', align = 'start', sideOffset = 4, ...props }, ref) => (
  <BaseMenu.Portal>
    <BaseMenu.Positioner side={side} align={align} sideOffset={sideOffset}>
      <BaseMenu.Popup ref={ref} className={styles.content({ className })} {...props} />
    </BaseMenu.Positioner>
  </BaseMenu.Portal>
));
MenuBarContent.displayName = 'MenuBarContent';

/* ─── MenuBarItem ───────────────────────────────────────────────────────── */

export interface MenuBarItemProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseMenu.Item>, 'className'> {
  className?: string;
  /** Applies active/highlighted styling (e.g. current route) */
  active?: boolean;
}

const MenuBarItem = React.forwardRef<React.ComponentRef<typeof BaseMenu.Item>, MenuBarItemProps>(
  ({ className, active, children, ...props }, ref) => (
    <BaseMenu.Item
      ref={ref}
      className={styles.item({ className: cn(active && styles.itemActive(), className) })}
      {...props}
    >
      {children}
    </BaseMenu.Item>
  )
);
MenuBarItem.displayName = 'MenuBarItem';

/* ─── MenuBarSeparator ──────────────────────────────────────────────────── */

export interface MenuBarSeparatorProps extends React.ComponentPropsWithoutRef<'div'> {}

const MenuBarSeparator = React.forwardRef<HTMLDivElement, MenuBarSeparatorProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={styles.separator({ className })} {...props} />
  )
);
MenuBarSeparator.displayName = 'MenuBarSeparator';

/* ─── MenuBarLabel ──────────────────────────────────────────────────────── */

export interface MenuBarLabelProps extends React.ComponentPropsWithoutRef<'div'> {}

const MenuBarLabel = React.forwardRef<HTMLDivElement, MenuBarLabelProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={styles.label({ className })} {...props} />
  )
);
MenuBarLabel.displayName = 'MenuBarLabel';

/* ─── MenuBarShortcut ───────────────────────────────────────────────────── */

const MenuBarShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={styles.shortcut({ className })} {...props} />
);
MenuBarShortcut.displayName = 'MenuBarShortcut';

/* ─── MenuBarSub ────────────────────────────────────────────────────────── */

const MenuBarSub = BaseMenu.SubmenuRoot;

/* ─── MenuBarSubTrigger ─────────────────────────────────────────────────── */

export interface MenuBarSubTriggerProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseMenu.SubmenuTrigger>, 'className'> {
  className?: string;
}

const MenuBarSubTrigger = React.forwardRef<
  React.ComponentRef<typeof BaseMenu.SubmenuTrigger>,
  MenuBarSubTriggerProps
>(({ className, children, ...props }, ref) => (
  <BaseMenu.SubmenuTrigger ref={ref} className={styles.subTrigger({ className })} {...props}>
    {children}
    <ChevronRight className="ml-auto" />
  </BaseMenu.SubmenuTrigger>
));
MenuBarSubTrigger.displayName = 'MenuBarSubTrigger';

/* ─── MenuBarSubContent ─────────────────────────────────────────────────── */

export interface MenuBarSubContentProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseMenu.Popup>, 'className'> {
  className?: string;
}

const MenuBarSubContent = React.forwardRef<
  React.ComponentRef<typeof BaseMenu.Popup>,
  MenuBarSubContentProps
>(({ className, ...props }, ref) => (
  <BaseMenu.Portal>
    <BaseMenu.Positioner sideOffset={-4}>
      <BaseMenu.Popup ref={ref} className={styles.subContent({ className })} {...props} />
    </BaseMenu.Positioner>
  </BaseMenu.Portal>
));
MenuBarSubContent.displayName = 'MenuBarSubContent';

/* ─── MenuBarGroup ──────────────────────────────────────────────────────── */

const MenuBarGroup = BaseMenu.Group;

/* ─── Config-driven layer ───────────────────────────────────────────────── */

/**
 * Internal recursive renderer for MenuBarItemConfig.
 * Handles all 4 item types, separators, and unlimited submenu depth.
 */
const MenuBarItemRenderer = ({ item }: { item: MenuBarItemConfig }) => {
  const navigate = useNavigate();
  const isLinkType = item.type === 'link' && !!item.href;
  const match = useMatch(isLinkType ? item.href! : '__NO_MATCH__');
  const isActive = isLinkType && !!match;

  const handleClick = React.useCallback(() => {
    if (item.type === 'link' && item.href) {
      navigate(item.href);
    } else if (item.type === 'external' && item.href) {
      window.open(item.href, '_blank', 'noopener,noreferrer');
    } else {
      item.onClick?.();
    }
  }, [item, navigate]);

  if (item.children && item.children.length > 0) {
    return (
      <>
        {item.separator && <MenuBarSeparator />}
        <MenuBarSub>
          <MenuBarSubTrigger disabled={item.disabled}>
            {item.icon}
            {item.label}
          </MenuBarSubTrigger>
          <MenuBarSubContent>
            {item.children.map((child) => (
              <MenuBarItemRenderer key={child.id} item={child} />
            ))}
          </MenuBarSubContent>
        </MenuBarSub>
      </>
    );
  }

  return (
    <>
      {item.separator && <MenuBarSeparator />}
      <MenuBarItem active={isActive} onClick={handleClick} disabled={item.disabled}>
        {item.icon}
        {item.label}
        {item.shortcut && <MenuBarShortcut>{item.shortcut}</MenuBarShortcut>}
        {item.type === 'external' && <ExternalLink className="ml-auto !size-3 opacity-50" />}
      </MenuBarItem>
    </>
  );
};

/** Props for the config-driven MenuBarNav component */
export interface MenuBarNavProps extends Omit<MenuBarProps, 'children'> {
  /** Array of top-level menus, each with nested items supporting unlimited depth */
  menus: MenuBarMenuConfig[];
}

/**
 * Config-driven menu bar. Pass a `menus` array and it renders everything —
 * triggers, dropdowns, submenus, separators, active link states.
 *
 * @example
 * ```tsx
 * <MenuBarNav menus={[
 *   {
 *     id: 'file', label: 'File',
 *     items: [
 *       { id: 'new', label: 'New', type: 'button', onClick: handleNew, shortcut: '⌘N' },
 *       { id: 'open', label: 'Open', type: 'link', href: '/open' },
 *       { id: 'sep', label: '---', separator: true, ... },
 *     ],
 *   },
 * ]} />
 * ```
 */
/** Internal: renders a direct (no-dropdown) top-level entry */
const MenuBarDirectRenderer = ({ menu }: { menu: MenuBarMenuConfig }) => {
  const navigate = useNavigate();
  const isLink = menu.type === 'link' && !!menu.href;
  const match = useMatch(isLink ? menu.href! : '__NO_MATCH__');

  const handleClick = React.useCallback(() => {
    if (menu.type === 'link' && menu.href) navigate(menu.href);
    else if (menu.type === 'external' && menu.href) window.open(menu.href, '_blank', 'noopener,noreferrer');
    else menu.onClick?.();
  }, [menu, navigate]);

  return (
    <MenuBarButton active={isLink && !!match} disabled={menu.disabled} onClick={handleClick}>
      {menu.icon}
      {menu.label}
      {menu.type === 'external' && <ExternalLink className="!size-3 opacity-50" />}
    </MenuBarButton>
  );
};

const MenuBarNav = React.forwardRef<HTMLDivElement, MenuBarNavProps>(
  ({ menus, className, ...props }, ref) => (
    <MenuBar ref={ref} className={className} {...props}>
      {menus.map((menu) =>
        !menu.items || menu.items.length === 0 ? (
          // Direct item — không có dropdown
          <MenuBarDirectRenderer key={menu.id} menu={menu} />
        ) : (
          // Dropdown menu bình thường
          <MenuBarMenu key={menu.id}>
            <MenuBarTrigger disabled={menu.disabled}>
              {menu.icon}
              {menu.label}
            </MenuBarTrigger>
            <MenuBarContent>
              {menu.items.map((item) => (
                <MenuBarItemRenderer key={item.id} item={item} />
              ))}
            </MenuBarContent>
          </MenuBarMenu>
        )
      )}
    </MenuBar>
  )
);
MenuBarNav.displayName = 'MenuBarNav';

/* ─── Exports ───────────────────────────────────────────────────────────── */

export {
  menuBarVariants,
  // Primitive API
  MenuBar,
  MenuBarMenu,
  MenuBarTrigger,
  MenuBarButton,
  MenuBarContent,
  MenuBarItem,
  MenuBarSeparator,
  MenuBarLabel,
  MenuBarShortcut,
  MenuBarSub,
  MenuBarSubTrigger,
  MenuBarSubContent,
  MenuBarGroup,
  // Config-driven API
  MenuBarNav,
};
