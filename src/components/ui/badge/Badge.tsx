import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const badgeVariants = tv({
  base: 'inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 w-fit',
  variants: {
    variant: {
      default: 'border-transparent bg-primary text-primary-foreground shadow-sm',
      secondary: 'border-transparent bg-secondary text-secondary-foreground shadow-sm',
      outline: 'border-border text-foreground hover:bg-muted',
      success: 'border-transparent bg-success text-success-foreground shadow-sm',
      warning: 'border-transparent bg-warning text-warning-foreground shadow-sm',
      danger: 'border-transparent bg-danger text-danger-foreground shadow-sm',

      // Soft variants
      'soft-primary': 'border-transparent bg-primary/10 text-primary',
      'soft-success': 'border-transparent bg-success/10 text-success',
      'soft-warning': 'border-transparent bg-warning/10 text-warning',
      'soft-danger': 'border-transparent bg-danger/10 text-danger',

      // Glass variant
      glass: 'border border-white/20 bg-white/10 text-foreground backdrop-blur-md shadow-sm',

      // Gradient variant
      gradient: 'border-transparent bg-gradient-to-r from-primary to-indigo-500 text-white shadow-sm',
    },
    size: {
      sm: 'text-[10px] px-2 py-0.5 leading-4',
      md: 'text-xs px-2.5 py-0.5 leading-5',
      lg: 'text-sm px-3 py-1 leading-6',
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  }
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
  VariantProps<typeof badgeVariants> {
  pulse?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, pulse, children, ...props }, ref) => {
    return (
      <span ref={ref} className={badgeVariants({ variant, size, className })} {...props}>
        {pulse && (
          <span className="relative grid place-items-center h-2 w-2 mr-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-current"></span>
          </span>
        )}
        {children}
      </span>
    );
  }
);
Badge.displayName = 'Badge';

export { Badge, badgeVariants };
