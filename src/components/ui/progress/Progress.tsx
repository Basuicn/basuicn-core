import * as React from 'react';
import { Progress as BaseProgress } from '@base-ui/react';
import { tv, type VariantProps } from 'tailwind-variants';

const progressVariants = tv({
  slots: {
    base: 'flex flex-col gap-1.5 w-full',
    labelContainer: 'flex justify-between items-center text-sm font-medium',
    root: 'relative w-full overflow-hidden rounded-full bg-secondary',
    indicator: 'rounded-full h-full w-full flex-1 transition-all duration-500 ease-in-out relative overflow-hidden flex items-center justify-end',
    innerLabel: 'text-[10px] font-bold text-white drop-shadow-md pr-2',
  },
  variants: {
    size: {
      sm: { root: 'h-3', innerLabel: 'text-[10px] pr-1' },
      md: { root: 'h-4', innerLabel: 'text-[10px] pr-1' },
      lg: { root: 'h-6', innerLabel: 'text-xs pr-3' },
    },
    variant: {
      default: { indicator: 'bg-primary' },
      success: { indicator: 'bg-success' },
      warning: { indicator: 'bg-warning' },
      danger: { indicator: 'bg-danger' },
      gradient: { indicator: 'bg-gradient-to-r from-primary to-indigo-400' },
    },
    striped: {
      true: { 
        indicator: 'bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem]' 
      }
    },
    animated: {
      true: {
        indicator: 'animate-progress-stripes'
      }
    }
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  }
});

export interface ProgressProps 
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseProgress.Root>, 'value'>, 
    VariantProps<typeof progressVariants> {
    className?: string;
    value?: number | null;
    showLabel?: boolean;
    labelPosition?: 'inside' | 'outside' | 'none';
    label?: string;
}

const Progress = React.forwardRef<React.ElementRef<typeof BaseProgress.Root>, ProgressProps>(
  ({ className, value, size, variant, striped, animated, showLabel = false, labelPosition = 'none', label, ...props }, ref) => {
    const { base, root, indicator, labelContainer, innerLabel } = progressVariants({ size, variant, striped, animated });
    
    // Auto-enable striped if string animated is true, unless explicitly turned off
    const isStriped = striped !== undefined ? striped : animated;
    const { indicator: finalIndicator } = progressVariants({ size, variant, striped: isStriped, animated });

    const displayValue = value ?? 0;

    return (
      <div className={base({ className })}>
        {(labelPosition === 'outside' || label) && (
          <div className={labelContainer()}>
            {label && <span>{label}</span>}
            {labelPosition === 'outside' && <span>{Math.round(displayValue)}%</span>}
          </div>
        )}
        <BaseProgress.Root
          ref={ref}
          className={root()}
          value={value ?? null}
          {...props}
        >
          <BaseProgress.Indicator 
            className={finalIndicator()} 
            style={{ transform: `translateX(-${100 - displayValue}%)` }} 
          >
            {labelPosition === 'inside' && displayValue > 5 && (
              <span className={innerLabel()}>{Math.round(displayValue)}%</span>
            )}
          </BaseProgress.Indicator>
        </BaseProgress.Root>
      </div>
    )
  }
)
Progress.displayName = 'Progress';

export { Progress };
