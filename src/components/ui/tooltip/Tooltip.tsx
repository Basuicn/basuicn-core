'use client';

import * as React from 'react';
import { Tooltip as BaseTooltip } from '@base-ui/react';
import { tv } from 'tailwind-variants';
import { cn } from '@/lib/utils/cn';

const tooltipVariants = tv({
  slots: {
    popup: 'z-50 overflow-hidden rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-side-bottom:slide-in-from-top-2 data-side-left:slide-in-from-right-2 data-side-right:slide-in-from-left-2 data-side-top:slide-in-from-bottom-2',
    arrow: 'fill-popover',
  },
});

const { popup, arrow } = tooltipVariants();

// ─── Compound Components ─────────────────────────────────────────────────────

/** Wrap multiple Tooltip instances in a shared provider for better performance */
const TooltipProvider = BaseTooltip.Provider;

const Tooltip = BaseTooltip.Root;

const TooltipTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof BaseTooltip.Trigger>
>(({ children, render, ...props }, ref) => (
  <BaseTooltip.Trigger
    ref={ref}
    render={render ?? (React.isValidElement(children) ? children : undefined)}
    {...props}
  >
    {React.isValidElement(children) ? undefined : children}
  </BaseTooltip.Trigger>
));
TooltipTrigger.displayName = 'TooltipTrigger';

export interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof BaseTooltip.Popup> {
  /** Side offset from the trigger (default: 4) */
  sideOffset?: number;
  /** Side to display the tooltip (default: 'top') */
  side?: 'top' | 'right' | 'bottom' | 'left';
  /** Alignment relative to the trigger (default: 'center') */
  align?: 'start' | 'center' | 'end';
  /** Show the arrow indicator */
  showArrow?: boolean;
}

const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ className, sideOffset = 4, side = 'top', align = 'center', showArrow = true, children, ...props }, ref) => (
    <BaseTooltip.Portal>
      <BaseTooltip.Positioner side={side} align={align} sideOffset={sideOffset}>
        <BaseTooltip.Popup ref={ref} className={cn(popup(), className)} role="tooltip" {...props}>
          {showArrow && <BaseTooltip.Arrow className={arrow()} />}
          {children}
        </BaseTooltip.Popup>
      </BaseTooltip.Positioner>
    </BaseTooltip.Portal>
  )
);
TooltipContent.displayName = 'TooltipContent';

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, tooltipVariants };
