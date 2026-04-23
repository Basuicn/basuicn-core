import * as React from 'react';
import { Checkbox as BaseCheckbox } from '@base-ui/react';
import { Check, Minus } from 'lucide-react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@/lib/utils/cn';

const checkboxVariants = tv({
  slots: {
    root: 'group flex shrink-0 items-center justify-center rounded border transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed border-border bg-background dark:data-checked:bg-primary/90 dark:data-checked:border-primary/90 dark:data-indeterminate:bg-primary/90 dark:data-indeterminate:border-primary/90',
    indicator: 'dark:text-primary-foreground text-primary flex items-center justify-center',
    icon: 'h-full w-full stroke-[4]',
  },
  variants: {
    size: {
      sm: { root: 'h-4 w-4' },
      md: { root: 'h-5 w-5' },
      lg: { root: 'h-6 w-6' },
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

const { root, indicator, icon } = checkboxVariants();

/** Props for the Checkbox component */
export interface CheckboxProps
  extends Omit<BaseCheckbox.Root.Props, 'className'>,
  VariantProps<typeof checkboxVariants> {
  /** Text label displayed next to the checkbox */
  label?: string;
  className?: string;
}

const Checkbox = React.forwardRef<React.ElementRef<typeof BaseCheckbox.Root>, CheckboxProps>(
  (allProps, ref) => {
    const { className, size = 'md', label, id, indeterminate, checked, defaultChecked, ...restProps } = allProps;
    const defaultId = React.useId();
    const checkboxId = id || defaultId;
    const { root, indicator, icon } = checkboxVariants({ size });

    // Nếu checked được truyền tường minh (kể cả undefined), normalize về false
    // để tránh chuyển từ uncontrolled → controlled trong suốt vòng đời component
    const normalizedChecked = 'checked' in allProps ? (checked ?? false) : undefined;

    return (
      <div className={cn("flex items-center gap-2", restProps.disabled && "opacity-50 cursor-not-allowed")}>
        <BaseCheckbox.Root
          ref={ref}
          id={checkboxId}
          className={root({ className: cn(!restProps.disabled && 'cursor-pointer', className) })}
          indeterminate={indeterminate}
          checked={normalizedChecked}
          defaultChecked={defaultChecked}
          {...restProps}
        >
          <BaseCheckbox.Indicator className={indicator()}>
            {indeterminate ? (
              <Minus className={icon()} />
            ) : (
              <Check className={icon()} />
            )}
          </BaseCheckbox.Indicator>
        </BaseCheckbox.Root>
        {label && (
          <label
            htmlFor={checkboxId}
            className={cn("text-sm font-medium leading-none select-none", restProps.disabled ? "cursor-not-allowed" : "cursor-pointer")}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };
