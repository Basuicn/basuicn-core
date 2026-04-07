import * as React from 'react';
import { Radio as BaseRadio } from '@base-ui/react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@/lib/utils/cn';

const radioVariants = tv({
  slots: {
    root: 'group flex shrink-0 items-center justify-center rounded-full border border-border bg-background transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[checked]:border-primary data-checked:border-primary',
    indicator: 'flex items-center justify-center',
    dot: 'rounded-full bg-primary',
    card: 'group/card relative flex flex-row items-start gap-4 cursor-pointer rounded-xl border border-border bg-card p-4 w-full shadow-sm outline-none transition-all hover:bg-accent/50 hover:text-accent-foreground data-[checked]:border-primary data-[checked]:bg-primary/5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 overflow-hidden',
    cardCircle: 'flex shrink-0 items-center justify-center rounded-full border border-border bg-background transition-all group-data-[checked]/card:border-primary group-data-[checked]/card:text-primary mt-0.5',
  },
  variants: {
    size: {
      sm: { root: 'h-4 w-4', cardCircle: 'h-4 w-4', dot: 'h-1.5 w-1.5' },
      md: { root: 'h-5 w-5', cardCircle: 'h-5 w-5', dot: 'h-2 w-2' },
      lg: { root: 'h-6 w-6', cardCircle: 'h-6 w-6', dot: 'h-2.5 w-2.5' },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface RadioProps
  extends Omit<BaseRadio.Root.Props, 'className'>,
    VariantProps<typeof radioVariants> {
  variant?: 'default' | 'card';
  label?: string;
  className?: string;
  /** Hiện/ẩn indicator (circle). Card variant mặc định ẩn. */
  showIndicator?: boolean;
}

const Radio = React.forwardRef<React.ElementRef<typeof BaseRadio.Root>, RadioProps>(
  ({ variant = 'default', className, size, label, id, children, showIndicator, ...props }, ref) => {
    const defaultId = React.useId();
    const radioId = id || defaultId;

    const { root, indicator, dot, card, cardCircle } = radioVariants({ size });

    if (variant === 'card') {
      return (
        <BaseRadio.Root
          ref={ref}
          id={radioId}
          className={card({ className })}
          {...props}
        >
          {showIndicator && (
            <div className={cardCircle()}>
              <BaseRadio.Indicator className={indicator()}>
                <div className={dot()} />
              </BaseRadio.Indicator>
            </div>
          )}
          {children}
        </BaseRadio.Root>
      );
    }

    return (
      <div className="flex items-center gap-2 w-fit">
        <BaseRadio.Root
          ref={ref}
          id={radioId}
          className={root({ className })}
          {...props}
        >
          <BaseRadio.Indicator className={indicator()}>
            <div className={dot()} />
          </BaseRadio.Indicator>
        </BaseRadio.Root>
        {children}
        {label && (
          <label
            htmlFor={radioId}
            className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Radio.displayName = 'Radio';

export { Radio };
