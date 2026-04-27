import * as React from 'react';
import { Button as BaseButton } from '@base-ui/react';
import { tv, type VariantProps } from 'tailwind-variants';
import { Spinner } from '../spinner/Spinner';
import { cn } from '@/lib/utils/cn';

const buttonVariants = tv({
  base: 'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-30 disabled:hover:bg-transparent data-open:bg-muted cursor-pointer disabled:cursor-not-allowed data-loading:opacity-50 data-loading:cursor-not-allowed data-loading:pointer-events-none',
  variants: {
    variant: {
      // Kraken Primary Purple
      solid:
        "bg-primary text-primary-foreground hover:bg-primary/80 shadow-[rgba(0,0,0,0.08)_0px_1px_4px]",
      // Kraken Purple Outlined — border + text use primary colour
      outline:
        "border border-primary/40 bg-transparent text-primary hover:bg-primary/5 hover:border-primary/70",
      // Kraken Secondary Gray — subtle bg, neutral text
      ghost: "hover:bg-accent hover:text-accent-foreground",
      // Kraken Purple Subtle — secondary surface
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary/70 shadow-[rgba(0,0,0,0.04)_0px_1px_4px]",
      danger:
        "bg-danger text-danger-foreground hover:bg-danger/80 shadow-[rgba(0,0,0,0.08)_0px_1px_4px]",
      link: "text-primary underline-offset-4 hover:underline h-auto px-0 py-0 font-normal",
      // Kính mờ tối — trên nền tối
      glass:
        "bg-white/15 backdrop-blur-md border border-white/30 text-accent hover:bg-white/25 hover:border-white/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_4px_20px_rgba(0,0,0,0.2)] transition-all",
      // ─── Glossy Bubble Variants ───────────────────────────────────────────────
      // Gradient from white highlight (top-left) → tinted color (bottom-right)
      // + inset top border = hiệu ứng gương bong bóng xà phòng
      "glass-white":
        "bg-gradient-to-br from-white/70 to-slate-100/60 backdrop-blur-md border border-black/5 text-slate-700 hover:from-white/85 hover:to-slate-100/70 shadow-[0_4px_12px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.8)] transition-all",
      "glass-amber":
        "bg-gradient-to-br from-white/70 to-amber-300/40 backdrop-blur-sm border border-amber-100/80 text-amber-700 hover:from-white/85 hover:to-amber-300/60 shadow-[0_4px_12px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.8)] transition-all",
      "glass-green":
        "bg-gradient-to-br from-white/70 to-emerald-300/40 backdrop-blur-sm border border-emerald-100/80 text-emerald-700 hover:from-white/85 hover:to-emerald-300/60 shadow-[0_4px_12px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.8)] transition-all",
      "glass-purple":
        "bg-gradient-to-br from-white/70 to-violet-300/40 backdrop-blur-sm border border-violet-100/80 text-violet-700 hover:from-white/85 hover:to-violet-300/60 shadow-[0_4px_12px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.8)] transition-all",
      "glass-pink":
        "bg-gradient-to-br from-white/70 to-pink-300/40 backdrop-blur-sm border border-pink-100/80 text-pink-700 hover:from-white/85 hover:to-pink-300/60 shadow-[0_4px_12px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.8)] transition-all",

      "danger-outline":
        "border border-danger/40 text-danger hover:bg-danger/10",
      "success-outline":
        "border border-success/40 text-success hover:bg-success/10",
      "warning-outline":
        "border border-warning/40 text-warning hover:bg-warning/10",
      "info-outline": "border border-info/40 text-info hover:bg-info/10",
    },
    size: {
      xs: "h-7 px-2.5 py-1.5 text-xs",
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 py-2",
      lg: "h-11 px-8",
      icon: "h-10 w-10",
      "icon-sm": "h-8 w-8",
    },
  },
  defaultVariants: {
    variant: "solid",
    size: "md",
  },
});

/** Props for the Button component */
export interface ButtonProps
  extends
    Omit<React.ComponentPropsWithoutRef<typeof BaseButton>, "className">,
    VariantProps<typeof buttonVariants> {
  /** Icon rendered before the button label */
  leftIcon?: React.ReactNode;
  /** Icon rendered after the button label */
  rightIcon?: React.ReactNode;
  /** Shows a loading spinner and disables interaction */
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
        data-loading={isLoading || undefined}
        {...props}
      >
        {isLoading && <Spinner size="xs" className={cn('mr-2 text-muted')} />}
        <div className="flex items-center gap-2">
          {!isLoading && leftIcon && <span>{leftIcon}</span>}
          {children}
          {!isLoading && rightIcon && <span>{rightIcon}</span>}
        </div>
      </BaseButton>
    );
  }
);
Button.displayName = 'Button';

export { Button };
