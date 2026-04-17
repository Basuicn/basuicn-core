'use client';

import * as React from 'react';
import { Popover as BasePopover } from '@base-ui/react';
import { tv } from 'tailwind-variants';
import { cn } from '@/lib/utils/cn';

const popoverVariants = tv({
  slots: {
    popup: 'z-50 w-72 rounded-md border border-border bg-background p-4 text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95 data-ending:animate-out data-ending:fade-out-0 data-ending:zoom-out-95 data-side-bottom:slide-in-from-top-2 data-side-left:slide-in-from-right-2 data-side-right:slide-in-from-left-2 data-side-top:slide-in-from-bottom-2',
    arrow: 'fill-popover stroke-border stroke-[1px]',
  },
});

const { popup, arrow } = popoverVariants();

// ─── Compound Components ─────────────────────────────────────────────────────

const Popover = BasePopover.Root;

const PopoverTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof BasePopover.Trigger>
>(({ children, render: renderProp, ...props }, ref) => {
  // Wrap pattern: <PopoverTrigger><Button /></PopoverTrigger>
  // → forward the element as `render` so Base UI merges trigger props into it (no nested <button>)
  const isElement = React.isValidElement(children);
  return (
    <BasePopover.Trigger
      ref={ref}
      render={renderProp ?? (isElement ? (children as React.ReactElement) : undefined)}
      {...props}
    >
      {isElement ? undefined : children}
    </BasePopover.Trigger>
  );
});
PopoverTrigger.displayName = 'PopoverTrigger';

export interface PopoverContentProps
  extends React.ComponentPropsWithoutRef<typeof BasePopover.Popup> {
  /** Side offset from the trigger (default: 4) */
  sideOffset?: number;
  /** Side to display the popover (default: 'bottom') */
  side?: 'top' | 'right' | 'bottom' | 'left';
  /** Alignment relative to the trigger (default: 'center') */
  align?: 'start' | 'center' | 'end';
  /** Show the arrow indicator */
  showArrow?: boolean;
}

const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ className, sideOffset = 4, side = 'bottom', align = 'center', showArrow = true, children, ...props }, ref) => (
    <BasePopover.Portal>
      <BasePopover.Positioner sideOffset={sideOffset} side={side} align={align}>
        <BasePopover.Popup ref={ref} className={cn(popup(), className)} {...props}>
          {showArrow && <BasePopover.Arrow className={arrow()} />}
          {children}
        </BasePopover.Popup>
      </BasePopover.Positioner>
    </BasePopover.Portal>
  )
);
PopoverContent.displayName = 'PopoverContent';

const PopoverClose = BasePopover.Close;

export { Popover, PopoverTrigger, PopoverContent, PopoverClose };
