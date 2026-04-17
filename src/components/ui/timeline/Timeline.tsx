import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@/lib/utils/cn';

// ─── Variants ────────────────────────────────────────────────────────────────

const timelineVariants = tv({
  slots: {
    root: 'relative flex flex-col',
    item: 'relative flex gap-4 pb-8 last:pb-0',
    indicator: [
      'relative z-10 flex shrink-0 items-center justify-center rounded-full',
      'border-2 border-background bg-muted ring-2 ring-background',
    ].join(' '),
    connector: 'absolute left-0 top-0 bottom-0 flex justify-center',
    connectorLine: 'w-px bg-border',
    content: 'flex-1 pt-0.5',
    title: 'text-sm font-semibold text-foreground leading-none',
    description: 'mt-1 text-sm text-muted-foreground leading-relaxed',
    time: 'mt-1.5 text-xs text-muted-foreground/70',
  },
  variants: {
    size: {
      sm: {
        indicator: 'h-6 w-6 [&_svg]:h-3 [&_svg]:w-3',
        connector: 'w-6',
      },
      md: {
        indicator: 'h-8 w-8 [&_svg]:h-4 [&_svg]:w-4',
        connector: 'w-8',
      },
      lg: {
        indicator: 'h-10 w-10 [&_svg]:h-5 [&_svg]:w-5',
        connector: 'w-10',
      },
    },
    variant: {
      default: { indicator: 'bg-muted text-muted-foreground' },
      primary: { indicator: 'bg-primary/15 text-primary border-primary/30' },
      success: { indicator: 'bg-success/15 text-success border-success/30' },
      warning: { indicator: 'bg-warning/15 text-warning border-warning/30' },
      danger: { indicator: 'bg-danger/15 text-danger border-danger/30' },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
});

// ─── Types ───────────────────────────────────────────────────────────────────

export interface TimelineItemData {
  title: string;
  description?: string;
  time?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
}

export interface TimelineProps extends VariantProps<typeof timelineVariants> {
  items: TimelineItemData[];
  className?: string;
}

// ─── Component ───────────────────────────────────────────────────────────────

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ items, size = 'md', variant: defaultVariant = 'default', className }, ref) => {
    const styles = timelineVariants({ size });

    return (
      <div ref={ref} className={cn(styles.root(), className)} role="list">
        {items.map((item, index) => {
          const itemVariant = item.variant ?? defaultVariant;
          const itemStyles = timelineVariants({ size, variant: itemVariant });
          const isLast = index === items.length - 1;

          return (
            <div key={index} className={styles.item()} role="listitem">
              {/* Connector line */}
              {!isLast && (
                <div className={styles.connector()}>
                  <div className={cn(styles.connectorLine(), 'mt-8')} />
                </div>
              )}

              {/* Indicator dot */}
              <div className={itemStyles.indicator()}>
                {item.icon}
              </div>

              {/* Content */}
              <div className={styles.content()}>
                <p className={styles.title()}>{item.title}</p>
                {item.description && (
                  <p className={styles.description()}>{item.description}</p>
                )}
                {item.time && (
                  <p className={styles.time()}>{item.time}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  },
);

Timeline.displayName = 'Timeline';

export { Timeline, timelineVariants };
