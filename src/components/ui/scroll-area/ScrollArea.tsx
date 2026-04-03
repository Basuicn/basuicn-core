'use client';

import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const scrollAreaVariants = tv({
  slots: {
    root: 'relative overflow-hidden',
    viewport: 'h-full w-full rounded-[inherit] [&>div]:!block',
    scrollbar: 'flex touch-none select-none transition-colors',
    thumb: 'relative rounded-full bg-border hover:bg-muted-foreground/30 transition-colors',
  },
  variants: {
    size: {
      sm: { scrollbar: '', thumb: '' },
      md: {},
      lg: {},
    },
    orientation: {
      vertical: {
        scrollbar: 'h-full w-2.5 border-l border-l-transparent p-[1px]',
        thumb: 'flex-1',
      },
      horizontal: {
        scrollbar: 'h-2.5 flex-col border-t border-t-transparent p-[1px]',
        thumb: '',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    orientation: 'vertical',
  },
});

/** Props for the ScrollArea component */
export interface ScrollAreaProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof scrollAreaVariants>, 'orientation'> {
  /** Scroll direction: vertical, horizontal, or both */
  orientation?: 'vertical' | 'horizontal' | 'both';
  /** Accessible label for the scrollable region */
  'aria-label'?: string;
}

const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className, children, orientation = 'vertical', size, 'aria-label': ariaLabel, ...props }, ref) => {
    const { root, viewport } = scrollAreaVariants({ size });

    const overflowClass =
      orientation === 'both'
        ? 'overflow-auto'
        : orientation === 'horizontal'
          ? 'overflow-x-auto overflow-y-hidden'
          : 'overflow-y-auto overflow-x-hidden';

    return (
      <div
        ref={ref}
        className={root({ className })}
        role="region"
        aria-label={ariaLabel}
        {...props}
      >
        <div
          className={viewport({
            className: `${overflowClass} scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent`,
          })}
        >
          {children}
        </div>
      </div>
    );
  }
);
ScrollArea.displayName = 'ScrollArea';

/** Props for the ScrollBar component */
export interface ScrollBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Scrollbar axis direction */
  orientation?: 'vertical' | 'horizontal';
}

const ScrollBar = React.forwardRef<HTMLDivElement, ScrollBarProps>(
  ({ className, orientation = 'vertical', ...props }, ref) => {
    const { scrollbar, thumb } = scrollAreaVariants({ orientation });
    return (
      <div ref={ref} className={scrollbar({ className })} {...props}>
        <div className={thumb()} />
      </div>
    );
  }
);
ScrollBar.displayName = 'ScrollBar';

export { ScrollArea, ScrollBar, scrollAreaVariants };
