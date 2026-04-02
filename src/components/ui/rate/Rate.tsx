import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { Star } from 'lucide-react';

const rateVariants = tv({
  slots: {
    root: 'inline-flex items-center gap-0.5',
    star: 'relative cursor-pointer transition-transform duration-100 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm',
    starIcon: 'transition-colors duration-150',
  },
  variants: {
    size: {
      sm: { star: 'w-4 h-4', starIcon: 'w-4 h-4' },
      md: { star: 'w-6 h-6', starIcon: 'w-6 h-6' },
      lg: { star: 'w-8 h-8', starIcon: 'w-8 h-8' },
      xl: { star: 'w-10 h-10', starIcon: 'w-10 h-10' },
    },
    readonly: {
      true: { star: 'cursor-default hover:scale-100' },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface RateProps extends VariantProps<typeof rateVariants> {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  count?: number;
  allowHalf?: boolean;
  allowClear?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  character?: React.ReactNode;
  activeColor?: string;
  inactiveColor?: string;
  className?: string;
  'aria-label'?: string;
}

const Rate = React.forwardRef<HTMLDivElement, RateProps>(({
  value: controlledValue,
  defaultValue = 0,
  onChange,
  count = 5,
  allowHalf = false,
  allowClear = true,
  readonly = false,
  disabled = false,
  character,
  activeColor = 'text-amber-400',
  inactiveColor = 'text-muted-foreground/30',
  size,
  className,
  'aria-label': ariaLabel,
}, ref) => {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const [hoverValue, setHoverValue] = React.useState<number | null>(null);

  const value = isControlled ? controlledValue! : internalValue;

  const handleChange = (newVal: number) => {
    if (readonly || disabled) return;
    const next = allowClear && newVal === value ? 0 : newVal;
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  };

  const getStarFraction = (starIndex: number, displayValue: number): number => {
    const full = starIndex + 1;
    const half = starIndex + 0.5;
    if (displayValue >= full) return 1;
    if (allowHalf && displayValue >= half) return 0.5;
    return 0;
  };

  const slots = rateVariants({ size, readonly: readonly || disabled });
  const display = hoverValue ?? value;

  return (
    <div
      ref={ref}
      className={slots.root({ className })}
      role="radiogroup"
      aria-label={ariaLabel || 'Đánh giá'}
    >
      {Array.from({ length: count }, (_, i) => {
        const fraction = getStarFraction(i, display);
        const full = i + 1;
        const half = i + 0.5;

        const renderStar = (frac: number) => {
          if (character) {
            if (frac === 0.5) {
              return (
                <span className="relative inline-flex items-center justify-center w-full h-full">
                  <span className={`absolute inset-0 overflow-hidden ${inactiveColor}`}>{character}</span>
                  <span className="absolute inset-0 overflow-hidden w-1/2" style={{ color: 'inherit' }}>
                    <span className={activeColor}>{character}</span>
                  </span>
                </span>
              );
            }
            return <span className={frac === 1 ? activeColor : inactiveColor}>{character}</span>;
          }

          if (frac === 0.5) {
            return (
              <span className="relative inline-flex items-center justify-center w-full h-full">
                <Star className={`${slots.starIcon()} ${inactiveColor}`} fill="currentColor" />
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: '50%' }}
                  aria-hidden="true"
                >
                  <Star className={`${slots.starIcon()} ${activeColor}`} fill="currentColor" />
                </span>
              </span>
            );
          }

          return (
            <Star
              className={`${slots.starIcon()} ${frac === 1 ? activeColor : inactiveColor}`}
              fill="currentColor"
            />
          );
        };

        return (
          <button
            key={i}
            type="button"
            role="radio"
            aria-checked={full <= value}
            aria-label={`${full} sao`}
            disabled={disabled}
            className={slots.star()}
            onMouseMove={(e) => {
              if (readonly || disabled) return;
              if (allowHalf) {
                const rect = e.currentTarget.getBoundingClientRect();
                const isLeft = e.clientX - rect.left < rect.width / 2;
                setHoverValue(isLeft ? half : full);
              } else {
                setHoverValue(full);
              }
            }}
            onMouseLeave={() => setHoverValue(null)}
            onClick={(e) => {
              if (readonly || disabled) return;
              if (allowHalf) {
                const rect = e.currentTarget.getBoundingClientRect();
                const isLeft = e.clientX - rect.left < rect.width / 2;
                handleChange(isLeft ? half : full);
              } else {
                handleChange(full);
              }
            }}
            onKeyDown={(e) => {
              if (readonly || disabled) return;
              if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
                e.preventDefault();
                handleChange(Math.min(count, value + (allowHalf ? 0.5 : 1)));
              } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
                e.preventDefault();
                handleChange(Math.max(0, value - (allowHalf ? 0.5 : 1)));
              }
            }}
          >
            {renderStar(fraction)}
          </button>
        );
      })}
    </div>
  );
});

Rate.displayName = 'Rate';

export { Rate };
