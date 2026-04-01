import * as React from 'react';
import { Button as BaseButton } from '@base-ui/react';
import { tv, type VariantProps } from 'tailwind-variants';

const buttonVariants = tv({
  base: 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-open:bg-muted cursor-pointer',
  variants: {
    variant: {
      solid: 'bg-primary text-primary-foreground hover:bg-primary/70 shadow-sm',
      outline: 'border border-border bg-transparent hover:bg-secondary/90 hover:text-foreground',
      ghost: 'hover:bg-secondary/90 hover:text-foreground',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/70 shadow-sm',
      danger: 'bg-danger text-danger-foreground hover:bg-danger/70 shadow-sm',
      link: 'text-primary underline-offset-4 hover:underline h-auto px-0 py-0 font-normal',
      // Kính mờ tối — trên nền tối
      glass: 'bg-white/15 backdrop-blur-md border border-white/30 text-white hover:bg-white/25 hover:border-white/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_4px_20px_rgba(0,0,0,0.2)] transition-all',
      // ─── Glossy Bubble Variants ───────────────────────────────────────────────
      // Gradient from white highlight (top-left) → tinted color (bottom-right)
      // + inset top border = hiệu ứng gương bong bóng xà phòng
     'glass-white': 'bg-gradient-to-br from-white/70 to-slate-100/60 backdrop-blur-md border border-black/5 text-slate-700 hover:from-white/85 hover:to-slate-100/70 shadow-[0_4px_12px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.8)] transition-all',
      'glass-amber': 'bg-gradient-to-br from-white/70 to-amber-300/40 backdrop-blur-sm border border-amber-100/80 text-amber-700 hover:from-white/85 hover:to-amber-300/60 shadow-[0_4px_12px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.8)] transition-all',
      'glass-green': 'bg-gradient-to-br from-white/70 to-emerald-300/40 backdrop-blur-sm border border-emerald-100/80 text-emerald-700 hover:from-white/85 hover:to-emerald-300/60 shadow-[0_4px_12px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.8)] transition-all',
      'glass-purple': 'bg-gradient-to-br from-white/70 to-violet-300/40 backdrop-blur-sm border border-violet-100/80 text-violet-700 hover:from-white/85 hover:to-violet-300/60 shadow-[0_4px_12px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.8)] transition-all',
      'glass-pink': 'bg-gradient-to-br from-white/70 to-pink-300/40 backdrop-blur-sm border border-pink-100/80 text-pink-700 hover:from-white/85 hover:to-pink-300/60 shadow-[0_4px_12px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.8)] transition-all',
    },
    size: {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 py-2',
      lg: 'h-11 px-8',
      icon: 'h-10 w-10',
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
  },
});

export interface ButtonProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseButton>, 'className'>,
  VariantProps<typeof buttonVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const Button = React.forwardRef<React.ElementRef<typeof BaseButton>, ButtonProps>(
  ({ className, variant, size, leftIcon, rightIcon, isLoading, children, ...props }, ref) => {
    return (
      <BaseButton
        ref={ref}
        className={buttonVariants({ variant, size, className: className || '' })}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </BaseButton>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
