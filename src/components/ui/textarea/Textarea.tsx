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
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

/** Props for the Textarea component */
export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'maxLength' | 'minLength'>,
    VariantProps<typeof textareaVariants> {
  /** Label text displayed above the textarea */
  label?: string;
  /** Error message displayed below the textarea (replaces description) */
  error?: string;
  /** Helper text displayed below the textarea */
  description?: string;
  /** Show count of characters */
  showCount?: boolean;
  /** Max characters — enforced natively, displayed as count/max when showCount is true */
  maxLength?: number;
  /** Min characters — shows hint when current count is below min */
  minLength?: number;
  required?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant,
      label,
      error,
      description,
      showCount,
      maxLength,
      minLength,
      required,
      onChange,
      value,
      defaultValue,
      ...rest
    },
    ref,
  ) => {
    const isControlled = value !== undefined;

    const [charCount, setCharCount] = React.useState<number>(() => {
      if (isControlled) return String(value ?? '').length;
      if (defaultValue !== undefined) return String(defaultValue).length;
      return 0;
    });

    React.useEffect(() => {
      if (isControlled) setCharCount(String(value ?? '').length);
    }, [isControlled, value]);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(event.target.value.length);
      onChange?.(event);
    };

    const isNearLimit = maxLength !== undefined && charCount >= Math.floor(maxLength * 0.9);
    const isAtLimit = maxLength !== undefined && charCount >= maxLength;
    const isBelowMin = minLength !== undefined && charCount > 0 && charCount < minLength;

    const hasFooter = error ?? description ?? isBelowMin;

    return (
      <BaseField.Root className="flex w-full flex-col gap-1.5">
        {label && (
          <BaseField.Label className="text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
            {required && <span className="ml-0.5 text-danger">*</span>}
          </BaseField.Label>
        )}

        <div className="relative">
          <BaseField.Control
            render={
              <textarea
                ref={ref}
                className={cn(
                  textareaVariants({ variant }),
                  error && 'border-danger focus-visible:ring-danger',
                  showCount && 'pb-6',
                  className,
                )}
                value={value}
                defaultValue={!isControlled ? defaultValue : undefined}
                maxLength={maxLength}
                minLength={minLength}
                required={required}
                onChange={handleChange}
                {...rest}
              />
            }
          />

          {showCount && (
            <span
              className={cn(
                'pointer-events-none absolute bottom-1 right-3 select-none text-[0.7rem] tabular-nums text-muted-foreground',
                isNearLimit && 'font-medium text-warning',
                isAtLimit && 'text-danger',
              )}
            >
              {charCount}
              {maxLength !== undefined && `/${maxLength}`}
            </span>
          )}
        </div>

        {hasFooter && (
          <div className="flex flex-col gap-0.5">
            {error ? (
              <p className="text-[0.8rem] font-medium text-danger">{error}</p>
            ) : (
              <>
                {description && (
                  <BaseField.Description className="text-[0.8rem] text-muted-foreground">
                    {description}
                  </BaseField.Description>
                )}
                {isBelowMin && (
                  <p className="text-[0.8rem] text-warning">Tối thiểu {minLength} ký tự</p>
                )}
              </>
            )}
          </div>
        )}
      </BaseField.Root>
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
