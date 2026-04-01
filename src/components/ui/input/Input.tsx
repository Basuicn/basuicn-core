import * as React from 'react';
import { Input as BaseInput, Field as BaseField } from '@base-ui/react';
import { tv } from 'tailwind-variants';

const inputVariants = tv({
  base: 'flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:border-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-shadow',
  variants: {
    variant: {
      default: '',
      filled: 'bg-muted border-transparent focus-visible:border-primary',
      flushed: 'border-b-2 border-transparent border-b-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-b-primary bg-transparent',
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

export interface InputProps extends Omit<React.ComponentPropsWithoutRef<typeof BaseInput>, 'className'> {
  label?: string;
  error?: string;
  description?: string;
  variant?: 'default' | 'filled' | 'flushed';
  icon?: React.ReactNode;
  placeholder?: string;
  className?: string;
}

const Input = React.forwardRef<React.ElementRef<typeof BaseInput>, InputProps>(
  ({ className, variant, label, error, description, icon, id, ...props }, ref) => {
    const defaultId = React.useId();
    const inputId = id || defaultId;

    return (
      <BaseField.Root className="flex flex-col gap-1.5 w-full">
        {label && (
          <BaseField.Label htmlFor={inputId} className="text-sm font-medium text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </BaseField.Label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {icon}
            </div>
          )}
          <BaseField.Control render={<BaseInput
            ref={ref}
            id={inputId}
            className={inputVariants({ 
              variant, 
              className: `${icon ? 'pl-9 ' : ''}${className || ''} ${error ? 'border-danger focus:border-danger' : ''}`.trim() 
            })}
            {...props}
          />} />
        </div>
        {description && !error && (
          <BaseField.Description className="text-[0.8rem] text-muted-foreground">
            {description}
          </BaseField.Description>
        )}
        {error && (
          <p className="text-[0.8rem] font-medium text-danger">
            {error}
          </p>
        )}
      </BaseField.Root>
    );
  }
);
Input.displayName = 'Input';

export { Input };
