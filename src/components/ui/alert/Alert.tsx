import * as React from 'react';
// Icons can be passed as children by the consumer
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@/lib/utils/cn';

const alertVariants = tv({
  // Kraken: rounded-lg (12px), subtle soft backgrounds
  base: 'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  variants: {
    variant: {
      default:     'bg-background text-foreground border-border',
      destructive: 'border-danger/30 bg-danger/[0.06] text-danger [&>svg]:text-danger',
      success:     'border-success/30 bg-success/[0.06] text-success [&>svg]:text-success',
      warning:     'border-warning/30 bg-warning/[0.06] text-warning [&>svg]:text-warning',
      info:        'border-primary/30 bg-primary/[0.06] text-primary [&>svg]:text-primary',
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

/** Props for the Alert component */
type AlertProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>;

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={alertVariants({ variant, className })}
      {...props}
    />
  )
);
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn('mb-1 font-medium leading-none tracking-tight', className)}
      {...props}
    />
  )
);
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('text-sm [&_p]:leading-relaxed', className)}
      {...props}
    />
  )
);
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };
