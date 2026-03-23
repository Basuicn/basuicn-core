import React from 'react';
import { 
  Popover as AriaPopover, 
  Dialog as AriaDialog,
  DialogTrigger,
  type PopoverProps,
  type DialogProps
} from 'react-aria-components';
import { cn } from '@lib/utils/cn';

export interface CustomPopoverProps extends Omit<PopoverProps, 'children'> {
  children: React.ReactNode;
  showArrow?: boolean;
}

export function Popover({ children, showArrow = false, className, ...props }: CustomPopoverProps) {
  return (
    <AriaPopover
      {...props}
      className={(renderProps) => cn(
        "bg-white border border-gray-200 rounded-lg shadow-xl outline-none p-4 z-50",
        renderProps.isEntering ? "animate-in fade-in zoom-in-95 duration-200 ease-out" : "",
        renderProps.isExiting ? "animate-out fade-out zoom-out-95 duration-150 ease-in" : "",
        typeof className === 'function' ? className(renderProps) : className
      )}
    >
      {showArrow && (
        <svg 
          viewBox="0 0 12 12" 
          className="absolute w-3 h-3 fill-white stroke-gray-200 stroke-[1px] -z-10 group-placement-bottom:-top-1.5 group-placement-bottom:rotate-180 group-placement-top:-bottom-1.5 group-placement-left:-right-1.5 group-placement-left:-rotate-90 group-placement-right:-left-1.5 group-placement-right:rotate-90"
        >
          <path d="M0 0 L6 6 L12 0" />
        </svg>
      )}
      {children}
    </AriaPopover>
  );
}

export interface CustomDialogProps extends DialogProps {
  title?: string;
}

export function PopoverDialog({ title, children, className, ...props }: CustomDialogProps) {
  return (
    <AriaDialog {...props} className={cn("outline-none relative", className as string)}>
      {({ close }) => (
        <>
          {title && <h3 className="font-semibold text-gray-900 mb-2 text-lg">{title}</h3>}
          {typeof children === 'function' ? children({ close }) : children}
        </>
      )}
    </AriaDialog>
  );
}

export { DialogTrigger };
