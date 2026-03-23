import { type ReactNode } from 'react';
import { 
  Tooltip as AriaTooltip, 
  TooltipTrigger as AriaTooltipTrigger, 
  OverlayArrow,
  type TooltipProps,
  type TooltipTriggerComponentProps
} from 'react-aria-components';
import { cn } from '@lib/utils/cn';

export interface CustomTooltipProps extends Omit<TooltipProps, 'children'> {
  children: ReactNode;
  variant?: 'dark' | 'light' | 'primary' | 'success' | 'danger' | 'warning';
  showArrow?: boolean;
}

const tooltipVariantClasses = {
  dark: 'bg-gray-800 text-white',
  light: 'bg-white text-gray-800 border border-gray-200 shadow-md',
  primary: 'bg-primary text-white',
  success: 'bg-success text-white',
  danger: 'bg-danger text-white',
  warning: 'bg-warning text-gray-900',
};

const arrowFillClasses = {
  dark: 'fill-gray-800',
  light: 'fill-white stroke-gray-200 stroke-[1px]',
  primary: 'fill-primary',
  success: 'fill-success',
  danger: 'fill-danger',
  warning: 'fill-warning',
};

export function Tooltip({ 
  children, 
  variant = 'dark', 
  showArrow = true,
  className, 
  ...props 
}: CustomTooltipProps) {
  return (
    <AriaTooltip
      {...props}
      offset={props.offset ?? 8}
      className={({ isEntering, isExiting, placement, defaultClassName, state }) => cn(
        "px-3 py-1.5 text-sm rounded-md shadow-sm font-medium z-50",
        isEntering ? "animate-in fade-in zoom-in-95 duration-150 ease-out" : "",
        isExiting ? "animate-out fade-out zoom-out-95 duration-120 ease-in" : "",
        tooltipVariantClasses[variant],
        typeof className === 'function' ? className({ isEntering, isExiting, placement, defaultClassName, state }) : className
      )}
    >
      {showArrow && (
        <OverlayArrow className="group">
          <svg 
            width={12} 
            height={12} 
            viewBox="0 0 12 12"
            className={cn(
              "block group-data-[placement=bottom]:rotate-180 group-data-[placement=left]:-rotate-90 group-data-[placement=right]:rotate-90",
              arrowFillClasses[variant]
            )}
          >
            <path d="M0 0 L6 6 L12 0" />
          </svg>
        </OverlayArrow>
      )}
      {children}
    </AriaTooltip>
  );
}

export function TooltipTrigger({ delay = 300, ...props }: TooltipTriggerComponentProps) {
  return <AriaTooltipTrigger delay={delay} {...props} />;
}
