import * as React from 'react';
import { Field as BaseField } from '@base-ui/react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@/lib/utils/cn';

const textareaVariants = tv({
  base: 'flex min-h-[80px] w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:ring-0 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-shadow',
  variants: {
    variant: {
      default: '',
      filled: 'bg-accent border-transparent focus-visible:border-primary focus-visible:ring-0',
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

/** Props for the Textarea component */
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  VariantProps<typeof textareaVariants> {
  /** Label text displayed above the textarea */
  label?: string;
  /** Error message displayed below the textarea (replaces description) */
  error?: string;
  /** Helper text displayed below the textarea */
  description?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, label, error, description, ...props }, ref) => {
    return (
      <BaseField.Root className="flex flex-col gap-1.5 w-full">
        {label && (
          <BaseField.Label className="text-sm font-medium text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </BaseField.Label>
        )}

        <BaseField.Control render={
          <textarea
            ref={ref}
            className={cn(
              textareaVariants({ variant }),
              error && 'border-danger focus-visible:ring-danger',
              className
            )}
            {...props}
          />
        } />
        
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
Textarea.displayName = 'Textarea';

export { Textarea };
