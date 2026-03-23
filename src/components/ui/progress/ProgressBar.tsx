import React from 'react';
import { ProgressBar as AriaProgressBar, Label, type ProgressBarProps } from 'react-aria-components';
import { cn } from '@lib/utils/cn';

export interface CustomProgressBarProps extends ProgressBarProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  label?: string;
  showValueLabel?: boolean;
}

const progressVariantClasses = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  danger: 'bg-danger',
  success: 'bg-success',
  warning: 'bg-warning',
};

export function ProgressBar({ 
  variant = 'primary', 
  label, 
  showValueLabel = true,
  className, 
  ...props 
}: CustomProgressBarProps) {
  return (
    <AriaProgressBar
      {...props}
      className={cn('flex flex-col gap-2 w-full', className)}
    >
      {({ percentage, valueText }) => (
        <>
          {(label || showValueLabel) && (
            <div className="flex justify-between items-center text-sm font-medium">
              {label && <Label className="text-gray-700">{label}</Label>}
              {showValueLabel && <span className="text-gray-600">{valueText}</span>}
            </div>
          )}
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden relative">
            <div
              className={cn(
                "absolute top-0 bottom-0 left-0 rounded-full transition-all duration-300 ease-in-out",
                progressVariantClasses[variant],
                // If indeterminate, apply a pulsing animation or moving strip
                props.isIndeterminate ? "w-1/2 animate-progress-indeterminate" : ""
              )}
              style={!props.isIndeterminate ? { width: `${percentage || 0}%` } : undefined}
            />
          </div>
        </>
      )}
    </AriaProgressBar>
  );
}
