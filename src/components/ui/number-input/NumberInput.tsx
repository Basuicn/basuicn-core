import * as React from 'react';
import { NumberField } from '@base-ui/react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@/lib/utils/cn';
import { Minus, Plus } from 'lucide-react';

// ─── Variants ────────────────────────────────────────────────────────────────

const numberInputVariants = tv({
  slots: {
    root: 'flex flex-col gap-1.5',
    group: 'inline-flex items-center border border-border rounded-lg bg-background overflow-hidden transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20',
    input: [
      'h-full bg-transparent text-center text-sm font-medium text-foreground outline-none',
      'placeholder:text-muted-foreground',
      '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
    ].join(' '),
    button: [
      'inline-flex items-center justify-center shrink-0 border-0 bg-transparent text-muted-foreground',
      'transition-colors hover:bg-muted hover:text-foreground',
      'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset',
    ].join(' '),
    label: 'text-sm font-medium text-foreground leading-none',
    description: 'text-[0.8rem] text-muted-foreground',
    error: 'text-[0.8rem] font-medium text-danger',
  },
  variants: {
    size: {
      sm: {
        group: 'h-8',
        input: 'w-12 text-xs',
        button: 'w-8 h-8',
      },
      md: {
        group: 'h-10',
        input: 'w-14 text-sm',
        button: 'w-10 h-10',
      },
      lg: {
        group: 'h-12',
        input: 'w-16 text-base',
        button: 'w-12 h-12',
      },
    },
    isError: {
      true: { group: 'border-danger focus-within:border-danger focus-within:ring-danger/20' },
    },
    disabled: {
      true: { group: 'opacity-50 cursor-not-allowed' },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

// ─── Types ───────────────────────────────────────────────────────────────────

export interface NumberInputProps extends VariantProps<typeof numberInputVariants> {
  value?: number | null;
  defaultValue?: number;
  onChange?: (value: number | null) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  label?: string;
  description?: string;
  error?: string;
  placeholder?: string;
  className?: string;
}

// ─── Component ───────────────────────────────────────────────────────────────

const NumberInput = React.forwardRef<HTMLDivElement, NumberInputProps>(
  (
    {
      value,
      defaultValue = 0,
      onChange,
      min,
      max,
      step = 1,
      disabled = false,
      label,
      description,
      error,
      placeholder = '0',
      size = 'md',
      className,
    },
    ref,
  ) => {
    const styles = numberInputVariants({ size, isError: !!error, disabled });
    const rootId = React.useId();

    return (
      <NumberField.Root
        ref={ref}
        value={value ?? undefined}
        defaultValue={defaultValue}
        onValueChange={(val) => onChange?.(val)}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className={cn(styles.root(), className)}
      >
        {label && (
          <label htmlFor={rootId} className={styles.label()}>
            {label}
          </label>
        )}

        <NumberField.Group className={styles.group()}>
          <NumberField.Decrement
            className={cn(styles.button(), 'border-r border-border')}
            aria-label="Decrease"
          >
            <Minus className="h-3.5 w-3.5" />
          </NumberField.Decrement>

          <NumberField.Input
            id={rootId}
            placeholder={placeholder}
            className={styles.input()}
          />

          <NumberField.Increment
            className={cn(styles.button(), 'border-l border-border')}
            aria-label="Increase"
          >
            <Plus className="h-3.5 w-3.5" />
          </NumberField.Increment>
        </NumberField.Group>

        {description && !error && (
          <p className={styles.description()}>{description}</p>
        )}
        {error && (
          <p className={styles.error()}>{error}</p>
        )}
      </NumberField.Root>
    );
  },
);

NumberInput.displayName = 'NumberInput';

export { NumberInput, numberInputVariants };
