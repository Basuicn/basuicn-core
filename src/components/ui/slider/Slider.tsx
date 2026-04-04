import * as React from 'react';
import { Slider as BaseSlider } from '@base-ui/react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@/lib/utils/cn';

const sliderVariants = tv({
  slots: {
    root: 'relative flex w-full touch-none select-none items-center py-4 data-disabled:opacity-50 data-disabled:cursor-not-allowed',
    control: 'relative flex w-full items-center',
    track: 'relative h-1.5 w-full grow overflow-hidden rounded-full bg-secondary data-disabled:bg-muted',
    indicator: 'absolute h-full bg-primary data-disabled:bg-muted-foreground/30',
    thumb: 'block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 data-disabled:border-muted-foreground data-disabled:bg-muted data-disabled:pointer-events-none',
  }
});

const { root, control, track, indicator, thumb } = sliderVariants();

/** Props for the Slider component */
export interface SliderProps extends React.ComponentPropsWithoutRef<typeof BaseSlider.Root> {
    className?: string;
    /** Hiển thị tooltip số khi kéo / hover thumb */
    showTooltip?: boolean;
}

const toArray = (v: unknown): number[] => {
  if (Array.isArray(v)) return v as number[];
  if (typeof v === 'number') return [v];
  return [0];
};

const Slider = React.forwardRef<React.ElementRef<typeof BaseSlider.Root>, SliderProps>(
  ({ className, showTooltip, value: valueProp, defaultValue, onValueChange, ...props }, ref) => {
    const isControlled = valueProp !== undefined;
    const [internalValues, setInternalValues] = React.useState<number[]>(
      () => toArray(isControlled ? valueProp : defaultValue)
    );

    // Sync khi prop value thay đổi từ bên ngoài (controlled)
    React.useEffect(() => {
      if (isControlled) setInternalValues(toArray(valueProp));
    }, [isControlled, valueProp]);

    const currentValues = isControlled ? toArray(valueProp) : internalValues;

    const handleValueChange: NonNullable<SliderProps['onValueChange']> = (newValues, eventDetails) => {
      if (!isControlled) setInternalValues(toArray(newValues));
      onValueChange?.(newValues, eventDetails);
    };

    return (
      <BaseSlider.Root
        ref={ref}
        className={root({ className })}
        aria-label={props['aria-label'] ?? 'Slider'}
        value={valueProp}
        defaultValue={defaultValue}
        onValueChange={handleValueChange}
        {...props}
      >
        <BaseSlider.Control className={control()}>
          <BaseSlider.Track className={track()}>
            <BaseSlider.Indicator className={indicator()} />
          </BaseSlider.Track>

          {currentValues.map((val, index) => (
            <BaseSlider.Thumb
              key={index}
              className={cn(thumb(), showTooltip && 'relative group')}
            >
              {showTooltip && (
                <span className="
                  absolute -top-9 left-1/2 -translate-x-1/2
                  min-w-[28px] text-center
                  bg-primary text-primary-foreground
                  text-xs font-medium leading-none
                  px-1.5 py-1 rounded shadow-sm
                  opacity-0 group-hover:opacity-100 group-data-[dragging]:opacity-100
                  transition-opacity duration-150
                  pointer-events-none select-none
                ">
                  {val}
                </span>
              )}
            </BaseSlider.Thumb>
          ))}
        </BaseSlider.Control>
      </BaseSlider.Root>
    );
  }
);
Slider.displayName = 'Slider';

export { Slider };
