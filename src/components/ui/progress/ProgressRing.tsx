import React from 'react';
import { ProgressBar as AriaProgressBar, type ProgressBarProps } from 'react-aria-components';
import { cn } from '@lib/utils/cn';

export interface CustomProgressRingProps extends ProgressBarProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  showValueLabel?: boolean;
}

const ringVariantClasses = {
  primary: 'stroke-primary',
  secondary: 'stroke-secondary',
  danger: 'stroke-danger',
  success: 'stroke-success',
  warning: 'stroke-warning',
};

const ringSizeMap = {
  sm: { size: 32, strokeWidth: 3 },
  md: { size: 48, strokeWidth: 4 },
  lg: { size: 64, strokeWidth: 5 },
};

export function ProgressRing({
  variant = 'primary',
  size = 'md',
  showValueLabel = false,
  className,
  ...props
}: CustomProgressRingProps) {
  const { size: svgSize, strokeWidth } = ringSizeMap[size];
  const center = svgSize / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;

  return (
    <AriaProgressBar {...props} className={cn("relative flex items-center justify-center", className)}>
      {({ percentage, isIndeterminate }) => {
        const offset = isIndeterminate ? 0 : circumference - ((percentage || 0) / 100) * circumference;
        
        return (
          <>
            <svg
              width={svgSize}
              height={svgSize}
              viewBox={`0 0 ${svgSize} ${svgSize}`}
              className={cn("transform -rotate-90", isIndeterminate ? "animate-[spin_1.5s_linear_infinite]" : "")}
            >
              <circle
                cx={center}
                cy={center}
                r={radius}
                className="stroke-gray-200 fill-none"
                strokeWidth={strokeWidth}
              />
              <circle
                cx={center}
                cy={center}
                r={radius}
                className={cn(
                  "fill-none transition-all duration-300 ease-in-out",
                  ringVariantClasses[variant],
                  isIndeterminate ? "animate-[progress-ring-indeterminate_1.5s_ease-in-out_infinite]" : ""
                )}
                strokeWidth={strokeWidth}
                strokeDasharray={isIndeterminate ? `${circumference * 0.7} ${circumference}` : circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
              />
            </svg>
            {showValueLabel && !isIndeterminate && (
              <span className="absolute text-xs font-semibold text-gray-700 select-none">
                {Math.round(percentage || 0)}%
              </span>
            )}
            {/* For accessibility to announce value text if needed */}
            <span className="sr-only">
               {isIndeterminate ? 'Loading...' : `${Math.round(percentage || 0)}%`}
            </span>
          </>
        );
      }}
    </AriaProgressBar>
  );
}
