import * as React from 'react';
import { RadioGroup as BaseRadioGroup } from '@base-ui/react';
import { tv, type VariantProps } from 'tailwind-variants';

const radioGroupVariants = tv({
  base: 'grid gap-2',
  variants: {
    orientation: {
      vertical: 'grid-flow-row',
      horizontal: 'grid-flow-col auto-cols-auto',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
  },
});

/** Props for the RadioGroup component */
export interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof BaseRadioGroup>,
    VariantProps<typeof radioGroupVariants> {
  className?: string;
}

const RadioGroup = React.forwardRef<React.ElementRef<typeof BaseRadioGroup>, RadioGroupProps>(
  ({ className, orientation, ...props }, ref) => {
    return (
      <BaseRadioGroup
        ref={ref}
        className={radioGroupVariants({ orientation, className })}
        aria-orientation={orientation ?? 'vertical'}
        {...props}
      />
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

export { RadioGroup };
