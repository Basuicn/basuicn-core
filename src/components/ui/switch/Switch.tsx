import { Switch as AriaSwitch, type SwitchProps as AriaSwitchProps } from 'react-aria-components';
import { cn } from '@lib/utils/cn';
import React from 'react';

export interface CustomSwitchProps extends Omit<AriaSwitchProps, 'children'> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  children?: React.ReactNode;
}

const switchSizeClasses = {
  sm: 'w-8 h-4.5',
  md: 'w-10 h-5.5',
  lg: 'w-12 h-6.5',
};

const thumbSizeClasses = {
  sm: 'w-3.5 h-3.5 translate-x-0.5 group-data-[selected]:translate-x-[14px]',
  md: 'w-4.5 h-4.5 translate-x-0.5 group-data-[selected]:translate-x-[18px]',
  lg: 'w-5.5 h-5.5 translate-x-0.5 group-data-[selected]:translate-x-[22px]',
};

export function Switch({ variant = 'primary', size = 'md', label, className, ...props }: CustomSwitchProps) {
  return (
    <AriaSwitch
      {...props}
      className={cn(
        "group flex items-center gap-3 text-sm transition-opacity outline-none",
        props.isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:opacity-90",
        className
      )}
    >
      <div className={cn(
        "relative flex shrink-0 items-center bg-gray-300 rounded-full transition-colors duration-200 shadow-inner",
        switchSizeClasses[size],
        "group-data-[focus-visible]:ring-2 group-data-[focus-visible]:ring-offset-1",
        "group-data-[hovered]:bg-gray-400",
        
        // Variants
        variant === 'primary' && "group-data-[selected]:bg-primary group-data-[focus-visible]:ring-primary/50",
        variant === 'secondary' && "group-data-[selected]:bg-secondary group-data-[focus-visible]:ring-secondary/50",
        variant === 'danger' && "group-data-[selected]:bg-danger group-data-[focus-visible]:ring-danger/50",
        variant === 'success' && "group-data-[selected]:bg-success group-data-[focus-visible]:ring-success/50",
        variant === 'warning' && "group-data-[selected]:bg-warning group-data-[focus-visible]:ring-warning/50",
      )}>
        <span className={cn(
          "bg-white rounded-full transition-transform duration-200 shadow-sm origin-left",
          thumbSizeClasses[size],
          props.isDisabled ? "bg-gray-100" : "bg-white",
          // Scale down click effect
          // "group-data-[pressed]:w-[20%] group-data-[pressed]:group-data-[selected]:-translate-x-[25%]"
        )} />
      </div>
      {(label || props.children) && (
        <span className="text-gray-900 group-data-[disabled]:text-gray-500 font-medium select-none">
          {label || props.children}
        </span>
      )}
    </AriaSwitch>
  );
}

export default Switch;
