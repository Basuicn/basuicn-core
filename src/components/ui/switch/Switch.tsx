import * as React from 'react';
import { Switch as BaseSwitch } from '@base-ui/react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@/lib/utils/cn';

const switchVariants = tv({
  slots: {
    root: 'group inline-flex h-6 w-11 shrink-0  items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-checked:bg-primary data-unchecked:bg-switch-background',
    thumb: 'pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-checked:translate-x-5 data-unchecked:translate-x-0',
  },
  variants: {
    size: {
      sm: {
        root: 'h-5 w-9',
        thumb: 'h-4 w-4 data-checked:translate-x-4',
      },
      md: {
        root: 'h-6 w-11',
        thumb: 'h-5 w-5 data-checked:translate-x-5',
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});



export interface SwitchProps
  extends Omit<BaseSwitch.Root.Props, 'className'>,
  VariantProps<typeof switchVariants> {
  label?: string;
  className?: string;
}

const Switch = React.forwardRef<React.ElementRef<typeof BaseSwitch.Root>, SwitchProps>(
  ({ className, size, label, id, ...props }, ref) => {
    const defaultId = React.useId();
    const switchId = id || defaultId;

    const { root, thumb } = switchVariants({ size });

    return (
      <div className={cn(" flex items-center gap-2 w-fit", props.disabled && "opacity-40 cursor-not-allowed")}>
        <BaseSwitch.Root
          ref={ref}
          id={switchId}
          className={root({ className: cn(!props.disabled && "cursor-pointer", className) })}
          {...props}
        >
          <BaseSwitch.Thumb className={thumb()} />
        </BaseSwitch.Root>
        {label && (
          <label
            htmlFor={switchId}
            className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", props.disabled && "cursor-not-allowed")}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';

export { Switch };
