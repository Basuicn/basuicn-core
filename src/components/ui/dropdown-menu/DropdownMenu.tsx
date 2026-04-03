import * as React from 'react';
import { Menu as BaseMenu } from '@base-ui/react';
import { tv } from 'tailwind-variants';
import { Check, ChevronRight, Circle } from 'lucide-react';

const dropdownMenuVariants = tv({
  slots: {
    content:
      'z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-background p-1 text-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-side-bottom:slide-in-from-top-2 data-side-left:slide-in-from-right-2 data-side-right:slide-in-from-left-2 data-side-top:slide-in-from-bottom-2',
    item: 'relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    checkboxItem:
      'relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50',
    radioItem:
      'relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50',
    label: 'px-2 py-1.5 text-sm font-semibold',
    separator: '-mx-1 my-1 h-px bg-border',
    shortcut: 'ml-auto text-xs tracking-widest opacity-60',
    subTrigger:
      'flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-open:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    subContent:
      'z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-background p-1 text-foreground shadow-lg animate-in fade-in-0 zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-side-bottom:slide-in-from-top-2 data-side-left:slide-in-from-right-2 data-side-right:slide-in-from-left-2 data-side-top:slide-in-from-bottom-2',
    indicatorWrapper: 'absolute left-2 flex h-3.5 w-3.5 items-center justify-center',
  },
});

const styles = dropdownMenuVariants();

/* ─── Root ──────────────────────────────────────────────────────────── */

const DropdownMenu = BaseMenu.Root;

/* ─── Trigger ───────────────────────────────────────────────────────── */

export interface DropdownMenuTriggerProps
  extends React.ComponentPropsWithoutRef<typeof BaseMenu.Trigger> { }

const DropdownMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  DropdownMenuTriggerProps
>(({ ...props }, ref) => <BaseMenu.Trigger ref={ref as React.Ref<HTMLButtonElement>} {...props} />);
DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

/* ─── Content ───────────────────────────────────────────────────────── */

/** Props for the DropdownMenuContent component */
export interface DropdownMenuContentProps extends Omit<React.ComponentPropsWithoutRef<typeof BaseMenu.Popup>, 'className'> {
  /** Which side of the trigger to render the menu */
  side?: 'top' | 'right' | 'bottom' | 'left';
  /** Alignment relative to the trigger */
  align?: 'start' | 'center' | 'end';
  /** Distance in px between the trigger and the menu */
  sideOffset?: number;
  className?: string;
}

const DropdownMenuContent = React.forwardRef<
  React.ComponentRef<typeof BaseMenu.Popup>,
  DropdownMenuContentProps
>(({ className, side = 'bottom', align = 'start', sideOffset = 4, ...props }, ref) => (
  <BaseMenu.Portal>
    <BaseMenu.Positioner side={side} align={align} sideOffset={sideOffset}>
      <BaseMenu.Popup ref={ref} className={styles.content({ className })} {...props} />
    </BaseMenu.Positioner>
  </BaseMenu.Portal>
));
DropdownMenuContent.displayName = 'DropdownMenuContent';

/* ─── Item ──────────────────────────────────────────────────────────── */

/** Props for the DropdownMenuItem component */
export interface DropdownMenuItemProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseMenu.Item>, 'className'> {
  /** Add left padding to align with items that have icons */
  inset?: boolean;
  className?: string;
}

const DropdownMenuItem = React.forwardRef<
  React.ComponentRef<typeof BaseMenu.Item>,
  DropdownMenuItemProps
>(({ className, inset, ...props }, ref) => (
  <BaseMenu.Item
    ref={ref}
    className={styles.item({ className: `${inset ? 'pl-8' : ''} ${className ?? ''}` })}
    {...props}
  />
));
DropdownMenuItem.displayName = 'DropdownMenuItem';

/* ─── CheckboxItem ──────────────────────────────────────────────────── */

export interface DropdownMenuCheckboxItemProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseMenu.CheckboxItem>, 'className'> {
  className?: string;
}

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ComponentRef<typeof BaseMenu.CheckboxItem>,
  DropdownMenuCheckboxItemProps
>(({ className, children, checked, ...props }, ref) => (
  <BaseMenu.CheckboxItem
    ref={ref}
    className={styles.checkboxItem({ className })}
    checked={checked}
    {...props}
  >
    <span className={styles.indicatorWrapper()}>
      <BaseMenu.CheckboxItemIndicator>
        <Check className="h-4 w-4" />
      </BaseMenu.CheckboxItemIndicator>
    </span>
    {children}
  </BaseMenu.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem';

/* ─── RadioGroup ────────────────────────────────────────────────────── */

const DropdownMenuRadioGroup = BaseMenu.RadioGroup;

/* ─── RadioItem ─────────────────────────────────────────────────────── */

export interface DropdownMenuRadioItemProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseMenu.RadioItem>, 'className'> {
  className?: string;
}

const DropdownMenuRadioItem = React.forwardRef<
  React.ComponentRef<typeof BaseMenu.RadioItem>,
  DropdownMenuRadioItemProps
>(({ className, children, ...props }, ref) => (
  <BaseMenu.RadioItem ref={ref} className={styles.radioItem({ className })} {...props}>
    <span className={styles.indicatorWrapper()}>
      <BaseMenu.RadioItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </BaseMenu.RadioItemIndicator>
    </span>
    {children}
  </BaseMenu.RadioItem>
));
DropdownMenuRadioItem.displayName = 'DropdownMenuRadioItem';

/* ─── Label ─────────────────────────────────────────────────────────── */

/** Props for the DropdownMenuLabel component */
export interface DropdownMenuLabelProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Add left padding to align with items that have icons */
  inset?: boolean;
}

const DropdownMenuLabel = React.forwardRef<HTMLDivElement, DropdownMenuLabelProps>(
  ({ className, inset, ...props }, ref) => (
    <div ref={ref} className={styles.label({ className: `${inset ? 'pl-8' : ''} ${className ?? ''}` })} {...props} />
  )
);
DropdownMenuLabel.displayName = 'DropdownMenuLabel';

/* ─── Separator ─────────────────────────────────────────────────────── */

export interface DropdownMenuSeparatorProps extends React.ComponentPropsWithoutRef<'div'> { }

const DropdownMenuSeparator = React.forwardRef<HTMLDivElement, DropdownMenuSeparatorProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={styles.separator({ className })} {...props} />
  )
);
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

/* ─── Shortcut ──────────────────────────────────────────────────────── */

const DropdownMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={styles.shortcut({ className })} {...props} />
);
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

/* ─── Sub ───────────────────────────────────────────────────────────── */

const DropdownMenuSub = BaseMenu.SubmenuRoot;

/** Props for the DropdownMenuSubTrigger component */
export interface DropdownMenuSubTriggerProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseMenu.SubmenuTrigger>, 'className'> {
  /** Add left padding to align with items that have icons */
  inset?: boolean;
  className?: string;
}

const DropdownMenuSubTrigger = React.forwardRef<
  React.ComponentRef<typeof BaseMenu.SubmenuTrigger>,
  DropdownMenuSubTriggerProps
>(({ className, inset, children, ...props }, ref) => (
  <BaseMenu.SubmenuTrigger
    ref={ref}
    className={styles.subTrigger({ className: `${inset ? 'pl-8' : ''} ${className ?? ''}` })}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto" />
  </BaseMenu.SubmenuTrigger>
));
DropdownMenuSubTrigger.displayName = 'DropdownMenuSubTrigger';

export interface DropdownMenuSubContentProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseMenu.Popup>, 'className'> {
  className?: string;
}

const DropdownMenuSubContent = React.forwardRef<
  React.ComponentRef<typeof BaseMenu.Popup>,
  DropdownMenuSubContentProps
>(({ className, ...props }, ref) => (
  <BaseMenu.Portal>
    <BaseMenu.Positioner sideOffset={-4}>
      <BaseMenu.Popup ref={ref} className={styles.subContent({ className })} {...props} />
    </BaseMenu.Positioner>
  </BaseMenu.Portal>
));
DropdownMenuSubContent.displayName = 'DropdownMenuSubContent';

/* ─── Group ─────────────────────────────────────────────────────────── */

const DropdownMenuGroup = BaseMenu.Group;

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuGroup,
  dropdownMenuVariants,
};
