import { Checkbox as AriaCheckbox, CheckboxGroup as AriaCheckboxGroup, Label, Text, type CheckboxGroupProps, type CheckboxProps as AriaCheckboxProps } from 'react-aria-components';
import { cn } from '@lib/utils/cn';
import React from 'react';

// === CHECBOX ===
export interface CustomCheckboxProps extends Omit<AriaCheckboxProps, 'children'> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  description?: string;
  children?: React.ReactNode;
}

const checkboxSizeClasses = {
  sm: 'w-4 h-4 rounded text-sm',
  md: 'w-5 h-5 rounded text-base',
  lg: 'w-6 h-6 rounded text-lg',
};

const iconSizeClasses = {
  sm: 'w-2.5 h-2.5',
  md: 'w-3.5 h-3.5',
  lg: 'w-4 h-4',
};

export function Checkbox({ variant = 'primary', size = 'md', label, description, className, ...props }: CustomCheckboxProps) {
  return (
    <AriaCheckbox
      {...props}
      className={cn(
        "group flex items-start gap-2.5 text-sm transition-colors outline-none",
        props.isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:opacity-90",
        className
      )}
    >
      <div className={cn(
        "flex shrink-0 items-center justify-center border transition-all duration-200 mt-0.5",
        "bg-white border-gray-300 text-transparent shadow-sm",
        checkboxSizeClasses[size],
        "group-data-[focus-visible]:ring-2 group-data-[focus-visible]:ring-offset-1",
        "group-data-[hovered]:border-gray-400 group-data-[selected]:text-white group-data-[indeterminate]:text-white",
        
        // Variants
        variant === 'primary' && "group-data-[selected]:bg-primary group-data-[selected]:border-primary group-data-[indeterminate]:bg-primary group-data-[indeterminate]:border-primary group-data-[focus-visible]:ring-primary/50",
        variant === 'secondary' && "group-data-[selected]:bg-secondary group-data-[selected]:border-secondary group-data-[indeterminate]:bg-secondary group-data-[indeterminate]:border-secondary group-data-[focus-visible]:ring-secondary/50",
        variant === 'danger' && "group-data-[selected]:bg-danger group-data-[selected]:border-danger group-data-[indeterminate]:bg-danger group-data-[indeterminate]:border-danger group-data-[focus-visible]:ring-danger/50",
        variant === 'success' && "group-data-[selected]:bg-success group-data-[selected]:border-success group-data-[indeterminate]:bg-success group-data-[indeterminate]:border-success group-data-[focus-visible]:ring-success/50",
        variant === 'warning' && "group-data-[selected]:bg-warning group-data-[selected]:border-warning group-data-[indeterminate]:bg-warning group-data-[indeterminate]:border-warning group-data-[focus-visible]:ring-warning/50 group-data-[selected]:text-black group-data-[indeterminate]:text-black",
        
        "group-data-[invalid]:border-danger group-data-[invalid]:group-data-[selected]:bg-danger"
      )}>
        {/* Check Icon */}
        <svg viewBox="0 0 14 14" fill="none" className={cn("group-data-[selected]:block group-data-[indeterminate]:hidden hidden", iconSizeClasses[size])}>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8L6 11L11 3.5"/>
        </svg>
        {/* Indeterminate Icon (Minus) */}
        <svg viewBox="0 0 14 14" fill="none" className={cn("group-data-[indeterminate]:block hidden", iconSizeClasses[size])}>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 7H11"/>
        </svg>
      </div>
      {(label || props.children) && (
        <div className="flex flex-col">
          <span className="text-gray-900 group-data-[disabled]:text-gray-500 font-medium">
            {label || props.children}
          </span>
          {description && (
            <Text slot="description" className="text-xs text-gray-500 mt-0.5">
              {description}
            </Text>
          )}
        </div>
      )}
    </AriaCheckbox>
  );
}

// === CHECKBOX GROUP ===
export interface CustomCheckboxGroupProps extends Omit<CheckboxGroupProps, 'children'> {
  label?: string;
  description?: string;
  errorMessage?: string;
  children: React.ReactNode;
  orientation?: 'vertical' | 'horizontal';
  className?: string;
}

export function CheckboxGroup({ label, description, errorMessage, children, orientation = 'vertical', className, ...props }: CustomCheckboxGroupProps) {
    return (
        <AriaCheckboxGroup {...props} className={cn("flex flex-col gap-2", className)}>
            {label && <Label className="text-sm font-semibold text-gray-800">{label}</Label>}
            <div className={cn("flex", orientation === 'horizontal' ? "flex-row gap-5 flex-wrap" : "flex-col gap-3")}>
                {children}
            </div>
            {description && <Text slot="description" className="text-xs text-gray-500">{description}</Text>}
            {errorMessage && <Text slot="errorMessage" className="text-xs text-danger font-medium">{errorMessage}</Text>}
        </AriaCheckboxGroup>
    );
}

// Export named objects for barrel imports if needed
export default {
    Checkbox,
    CheckboxGroup
}
