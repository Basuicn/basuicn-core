import * as React from 'react';
import { Input as BaseInput, Field as BaseField } from '@base-ui/react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@/lib/utils/cn';
import * as Icon from "@/components/ui/icons";
import { Toggle } from '@/components/ui/toggle/Toggle';

const inputVariants = tv({
  base: 'flex h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:border-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-shadow',
  variants: {
    variant: {
      default: '',
      filled: 'bg-accent border-transparent focus:border-primary',
      flushed: 'border-b-2 border-transparent border-b-border rounded-none px-0 focus:outline-none focus:ring-0 focus:border-transparent focus:border-b-primary bg-transparent',
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

/** Props for the Input component */
export interface InputProps extends Omit<React.ComponentPropsWithoutRef<typeof BaseInput>, 'className'>, VariantProps<typeof inputVariants> {
  /** Label text displayed above the input */
  label?: string;
  /** Error message displayed below the input; also applies danger styling */
  error?: string;
  /** Helper text displayed below the input (hidden when error is present) */
  description?: string;
  /** Icon rendered at the start (left side) of the input */
  icon?: React.ReactNode;
  /** Icon rendered at the end (right side) of the input; ignored for password type */
  endIcon?: React.ReactNode;
  placeholder?: string;
  className?: string;
}

const Input = React.forwardRef<React.ElementRef<typeof BaseInput>, InputProps>(
  ({ className, variant, label, error, description, icon, endIcon, id, type, ...props }, ref) => {
    const defaultId = React.useId();
    const inputId = id || defaultId;
    const [showPassword, setShowPassword] = React.useState(false);

    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

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
            type={inputType}
            className={cn(
              inputVariants({ variant }),
              icon && 'pl-9',
              (isPassword || endIcon) && 'pr-10',
              error && 'border-danger focus:border-danger',
              className
            )}
            {...props}
          />} />
          {isPassword ? (
            <Toggle
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground"
              pressed={showPassword}
              onPressedChange={setShowPassword}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <Icon.EyeOff className="h-4 w-4" /> : <Icon.Eye className="h-4 w-4" />}
            </Toggle>
          ) : endIcon ? (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {endIcon}
            </div>
          ) : null}
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
