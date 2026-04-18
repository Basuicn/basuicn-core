import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@/lib/utils/cn';

// ─── Variants ────────────────────────────────────────────────────────────────

const timelineVariants = tv({
  slots: {
    root: 'relative flex flex-col',
    item: 'group relative flex last:pb-0',
    indicator: [
      'relative z-10 flex shrink-0 items-center justify-center rounded-full',
      'border-[3px] border-background ring-2 ring-transparent',
      'transition-all duration-400 ease-out',
      ' group-hover:ring-2',
    ].join(' '),
    connector: 'absolute left-0 top-0 bottom-0 flex justify-center',
    connectorLine: 'w-[2px] transition-all duration-400 ease-out origin-top rounded-b-full',
    contentWrapper: 'flex-1 transition-all duration-400 ease-out ',
    title: 'text-sm font-semibold tracking-tight text-foreground transition-colors duration-400',
    description: 'mt-1.5 text-sm text-muted-foreground/80 leading-relaxed',
    time: 'mt-2 text-[11px] font-medium text-muted-foreground/60 uppercase tracking-widest flex items-center transition-colors duration-400 group-hover:text-muted-foreground/90',
  },
  variants: {
    size: {
      sm: {
        indicator: 'h-7 w-7 [&_svg]:h-3.5 [&_svg]:w-3.5',
        connector: 'w-7',
        connectorLine: 'mt-7',
        item: 'gap-4 pb-6',
        contentWrapper: 'pt-1.5',
      },
      md: {
        indicator: 'h-9 w-9 [&_svg]:h-4 [&_svg]:w-4',
        connector: 'w-9',
        connectorLine: 'mt-9',
        item: 'gap-5 pb-8',
        contentWrapper: 'pt-2',
      },
      lg: {
        indicator: 'h-11 w-11 [&_svg]:h-5 [&_svg]:w-5',
        connector: 'w-11',
        connectorLine: 'mt-11',
        item: 'gap-6 pb-12',
        contentWrapper: 'pt-2.5',
      },
    },
    variant: {
      default: { 
        indicator: 'bg-muted text-muted-foreground group-hover:bg-accent group-hover:text-accent-foreground group-hover:ring-foreground/5 group-hover:shadow-md group-hover:shadow-foreground/5', 
        connectorLine: 'bg-gradient-to-b from-border/70 to-transparent group-hover:from-foreground/20' 
      },
      primary: { 
        indicator: 'bg-primary/10 text-primary group-hover:bg-primary/20 group-hover:text-primary group-hover:ring-primary/15 group-hover:shadow-md group-hover:shadow-primary/20', 
        connectorLine: 'bg-gradient-to-b from-primary/30 to-transparent group-hover:from-primary/40' 
      },
      success: { 
        indicator: 'bg-success/10 text-success group-hover:bg-success/20 group-hover:text-success group-hover:ring-success/15 group-hover:shadow-md group-hover:shadow-success/20', 
        connectorLine: 'bg-gradient-to-b from-success/30 to-transparent group-hover:from-success/40' 
      },
      warning: { 
        indicator: 'bg-warning/10 text-warning group-hover:bg-warning/20 group-hover:text-warning group-hover:ring-warning/15 group-hover:shadow-md group-hover:shadow-warning/20', 
        connectorLine: 'bg-gradient-to-b from-warning/30 to-transparent group-hover:from-warning/40' 
      },
      danger: { 
        indicator: 'bg-danger/10 text-danger group-hover:bg-danger/20 group-hover:text-danger group-hover:ring-danger/15 group-hover:shadow-md group-hover:shadow-danger/20', 
        connectorLine: 'bg-gradient-to-b from-danger/30 to-transparent group-hover:from-danger/40' 
      },
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
                  <div className={itemStyles.connectorLine()} />
                </div>
              )}

              {/* Indicator dot */}
              <div className={itemStyles.indicator()}>
                {item.icon}
              </div>

              {/* Content */}
              <div className={styles.contentWrapper()}>
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

export { Timeline };
