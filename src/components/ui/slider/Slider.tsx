import React from 'react';
import { Slider as AriaSlider, SliderOutput, SliderThumb, SliderTrack, Label, type SliderProps } from 'react-aria-components';
import { cn } from '@lib/utils/cn';

export interface CustomSliderProps<T extends number | number[]> extends SliderProps<T> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  label?: string;
  showValueLabel?: boolean;
  typeSlider?: 'default' | 'point' ;
}

const sliderVariantClasses = {
  primary: {
    trackFill: 'bg-primary group-data-[disabled]:bg-gray-300',
    thumb: 'bg-primary border-primary outline-primary/50 group-data-[dragging]:bg-primary-dark group-data-[disabled]:bg-gray-400 group-data-[disabled]:border-gray-400'
  },
  secondary: {
    trackFill: 'bg-secondary group-data-[disabled]:bg-gray-300',
    thumb: 'bg-secondary border-secondary outline-secondary/50 group-data-[dragging]:bg-secondary-dark group-data-[disabled]:bg-gray-400 group-data-[disabled]:border-gray-400'
  },
  danger: {
    trackFill: 'bg-danger group-data-[disabled]:bg-gray-300',
    thumb: 'bg-danger border-danger outline-danger/50 group-data-[dragging]:bg-danger-dark group-data-[disabled]:bg-gray-400 group-data-[disabled]:border-gray-400'
  },
  success: {
    trackFill: 'bg-success group-data-[disabled]:bg-gray-300',
    thumb: 'bg-success border-success outline-success/50 group-data-[dragging]:bg-success-dark group-data-[disabled]:bg-gray-400 group-data-[disabled]:border-gray-400'
  },
  warning: {
    trackFill: 'bg-warning group-data-[disabled]:bg-gray-300',
    thumb: 'bg-warning border-warning outline-warning/50 group-data-[dragging]:bg-warning-dark group-data-[disabled]:bg-gray-400 group-data-[disabled]:border-gray-400'
  }
};

export function Slider<T extends number | number[]>({
  variant = 'primary',
  label,
  showValueLabel = true,
  className,
  typeSlider = 'default',
  ...props
}: CustomSliderProps<T>) {
  return (
    <AriaSlider
      {...props}
      className={cn(
        'group flex flex-col gap-2 w-full touch-none',
        className
      )}
    >
      {(label || showValueLabel) && (
        <div className="flex justify-between items-center text-sm font-medium">
          {label && <Label className="text-gray-700 group-data-[disabled]:text-gray-400">{label}</Label>}
          {showValueLabel && <SliderOutput className="text-gray-600 group-data-[disabled]:text-gray-400" />}
        </div>
      )}

      <SliderTrack className="relative w-full h-6 flex items-center cursor-pointer group-data-[disabled]:cursor-default">
        {({ state }) => (
          <>
            {/* Background Track */}
            <div className="absolute top-1/2 -translate-y-1/2 w-full h-2 rounded-full bg-gray-200" />

            {/* Fill Track */}
            <div
              className={cn(
                "absolute top-1/2 -translate-y-1/2 h-2 rounded-full transition-colors",
                sliderVariantClasses[variant].trackFill
              )}
              style={{ width: state.getThumbPercent(0) * 100 + '%' }}
            />

            {/* Thumb */}
            <SliderThumb
              className={cn(
                "relative rounded-full border-2 shadow-sm",
                typeSlider === 'point' && "w-5 h-5",
                typeSlider === 'default' && "w-4 h-4",
                "focus-visible:ring-2 focus-visible:ring-offset-2 outline-none transition-colors",
                typeSlider === 'point' && "-top-2",
                typeSlider === 'default' && "top-3",
                sliderVariantClasses[variant].thumb
              )}
            >
              {/* Downward Arrow */}
              {typeSlider === 'point' &&(

                <div
                  className={cn(
                    "absolute -bottom-[8px] left-1/2 -translate-x-1/2 w-0 h-0",
                    "border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent",
                    "border-t-8",
  
                    {
                      'border-t-primary': variant === 'primary',
                      'border-t-secondary': variant === 'secondary' ,
                      'border-t-danger': variant === 'danger',
                      'border-t-success': variant === 'success',
                      'border-t-warning': variant === 'warning',
                      'border-t-gray-400': props.isDisabled
                    }
                  )}
                />

              ) }
            </SliderThumb>
          </>
        )}
      </SliderTrack>
    </AriaSlider>
  );
}
