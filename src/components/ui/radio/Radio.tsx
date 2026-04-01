import * as React from 'react';
import { Radio as BaseRadio } from '@base-ui/react';
import { tv, type VariantProps } from 'tailwind-variants';

const radioVariants = tv({
  slots: {
    root: 'group flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border bg-background transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50  data-checked:border-primary',
    indicator: 'flex items-center justify-center',
    dot: 'h-2 w-2 rounded-full  bg-primary',
  },
  variants: {
    size: {
      sm: { root: 'h-4 w-4', dot: 'h-1.5 w-1.5' },
      md: { root: 'h-5 w-5', dot: 'h-2 w-2' },
      lg: { root: 'h-6 w-6', dot: 'h-2.5 w-2.5' },
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

export interface RadioProps
  extends Omit<BaseRadio.Root.Props, 'className'>,
  VariantProps<typeof radioVariants> {
  label?: string;
  className?: string;
}

const Radio = React.forwardRef<React.ElementRef<typeof BaseRadio.Root>, RadioProps>(
  ({ className, size, label, id, ...props }, ref) => {
    const defaultId = React.useId();
    const radioId = id || defaultId;

    const { root, indicator, dot } = radioVariants({ size });

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
