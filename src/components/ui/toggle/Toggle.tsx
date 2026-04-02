import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@lib/utils/cn';

const toggleVariants = tv({
  base: [
    'inline-flex items-center justify-center gap-1.5 rounded-md font-medium text-sm',
    'transition-all duration-150 cursor-pointer select-none',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'border',
  ],
  variants: {
    variant: {
      default: [
        'bg-transparent border-border text-muted-foreground',
        'hover:bg-muted hover:text-foreground',
        'data-[state=on]:bg-secondary data-[state=on]:text-foreground data-[state=on]:border-secondary',
      ],
      outline: [
        'bg-transparent border-border text-muted-foreground',
        'hover:border-primary/50 hover:text-primary',
        'data-[state=on]:bg-primary/10 data-[state=on]:text-primary data-[state=on]:border-primary/50',
      ],
      solid: [
        'bg-transparent border-transparent text-muted-foreground',
        'hover:bg-muted hover:text-foreground',
        'data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary',
      ],
      ghost: [
        'bg-transparent border-transparent text-muted-foreground',
        'hover:bg-muted hover:text-foreground',
        'data-[state=on]:bg-muted data-[state=on]:text-foreground',
      ],
    },
    size: {
      sm: 'h-7 px-2 text-xs',
      md: 'h-9 px-3 text-sm',
      lg: 'h-11 px-4 text-base',
      icon: 'h-9 w-9',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

export interface ToggleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'>,
    VariantProps<typeof toggleVariants> {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
}

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      pressed: controlledPressed,
      defaultPressed = false,
      onPressedChange,
      variant,
      size,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const isControlled = controlledPressed !== undefined;
    const [internalPressed, setInternalPressed] = React.useState(defaultPressed);

    const isPressed = isControlled ? controlledPressed! : internalPressed;

    const handleClick = () => {
      const next = !isPressed;
      if (!isControlled) setInternalPressed(next);
      onPressedChange?.(next);
    };

    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={isPressed}
        data-state={isPressed ? 'on' : 'off'}
        onClick={handleClick}
        className={toggleVariants({ variant, size, className })}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Toggle.displayName = 'Toggle';

// ─── ToggleGroup ─────────────────────────────────────────────────────────────

interface ToggleGroupContextValue {
  value: string[];
  onValueChange: (value: string[]) => void;
  type: 'single' | 'multiple';
  variant?: VariantProps<typeof toggleVariants>['variant'];
  size?: VariantProps<typeof toggleVariants>['size'];
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue | null>(null);

export interface ToggleGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  type?: 'single' | 'multiple';
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  variant?: VariantProps<typeof toggleVariants>['variant'];
  size?: VariantProps<typeof toggleVariants>['size'];
  children: React.ReactNode;
  disabled?: boolean;
}

const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  (
    {
      type = 'single',
      value: controlledValue,
      defaultValue = [],
      onValueChange,
      variant = 'default',
      size = 'md',
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = React.useState<string[]>(defaultValue);
    const value = isControlled ? controlledValue! : internalValue;

    const handleValueChange = (newValues: string[]) => {
      if (!isControlled) setInternalValue(newValues);
      onValueChange?.(newValues);
    };

    return (
      <ToggleGroupContext.Provider value={{ value, onValueChange: handleValueChange, type, variant, size }}>
        <div
          ref={ref}
          role="group"
          className={cn('inline-flex items-center gap-1', className)}
          aria-disabled={disabled}
          {...props}
        >
          {children}
        </div>
      </ToggleGroupContext.Provider>
    );
  }
);

ToggleGroup.displayName = 'ToggleGroup';

export interface ToggleGroupItemProps
  extends Omit<ToggleProps, 'pressed' | 'onPressedChange'> {
  value: string;
}

const ToggleGroupItem = React.forwardRef<HTMLButtonElement, ToggleGroupItemProps>(
  ({ value, variant: itemVariant, size: itemSize, children, ...props }, ref) => {
    const ctx = React.useContext(ToggleGroupContext);
    if (!ctx) throw new Error('ToggleGroupItem must be inside ToggleGroup');

    const { value: groupValue, onValueChange, type, variant: ctxVariant, size: ctxSize } = ctx;
    const isPressed = groupValue.includes(value);

    const handlePressedChange = (pressed: boolean) => {
      if (type === 'single') {
        onValueChange(pressed ? [value] : []);
      } else {
        onValueChange(
          pressed ? [...groupValue, value] : groupValue.filter((v) => v !== value)
        );
      }
    };

    return (
      <Toggle
        ref={ref}
        pressed={isPressed}
        onPressedChange={handlePressedChange}
        variant={itemVariant ?? ctxVariant}
        size={itemSize ?? ctxSize}
        {...props}
      >
        {children}
      </Toggle>
    );
  }
);

ToggleGroupItem.displayName = 'ToggleGroupItem';

export { Toggle, ToggleGroup, ToggleGroupItem };
