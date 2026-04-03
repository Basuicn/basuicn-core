import * as React from 'react';
import { Dialog as BaseDialog } from '@base-ui/react';
import { X } from 'lucide-react';
import { tv, type VariantProps } from 'tailwind-variants';

const dialogVariants = tv({
  slots: {
    overlay:
      'fixed inset-0! z-50 bg-black/30 backdrop-blur-sm data-starting:animate-in data-ending:animate-out data-ending:fade-out-0 data-starting:fade-in-0',
    content:
      'fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border border-border bg-background p-6 shadow-lg duration-200 data-starting:animate-in data-ending:animate-out data-ending:fade-out-0 data-starting:fade-in-0 data-ending:zoom-out-95 data-starting:zoom-in-95',
    header: 'flex flex-col space-y-1.5 text-center sm:text-left',
    footer: 'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-auto',
    title: 'text-lg font-semibold leading-none tracking-tight',
    description: 'text-sm text-muted-foreground',
    close:
      'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:pointer-events-none data-starting:bg-accent data-starting:text-muted-foreground',
  },
  variants: {
    size: {
      default: {
        content: 'max-w-lg sm:rounded-lg',
      },
      fullScreen: {
        content:
          'inset-0 left-0 top-0 translate-x-0 translate-y-0 max-w-none h-full rounded-none border-none',
      },
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

/* ─── Root ─── */
const Dialog = BaseDialog.Root;

/* ─── Trigger ─── */
const DialogTrigger = BaseDialog.Trigger;

/* ─── Close (re-export for custom close buttons) ─── */
const DialogClose = BaseDialog.Close;

/* ─── Content (Portal + Backdrop + Popup + default X button) ─── */
interface DialogContentProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseDialog.Popup>, 'className'>,
    VariantProps<typeof dialogVariants> {
  className?: string;
}

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, size, ...props }, ref) => {
    const slots = dialogVariants({ size });
    return (
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className={slots.overlay()} />
        <BaseDialog.Popup ref={ref} className={slots.content({ className })} {...props}>
          {children}
          <BaseDialog.Close className={slots.close()}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </BaseDialog.Close>
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    );
  },
);
DialogContent.displayName = 'DialogContent';

/* ─── Header ─── */
const DialogHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const slots = dialogVariants();
    return <div ref={ref} className={slots.header({ className })} {...props} />;
  },
);
DialogHeader.displayName = 'DialogHeader';

/* ─── Footer ─── */
const DialogFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const slots = dialogVariants();
    return <div ref={ref} className={slots.footer({ className })} {...props} />;
  },
);
DialogFooter.displayName = 'DialogFooter';

/* ─── Title ─── */
const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  Omit<React.ComponentPropsWithoutRef<typeof BaseDialog.Title>, 'className'> & { className?: string }
>(({ className, ...props }, ref) => {
  const slots = dialogVariants();
  return <BaseDialog.Title ref={ref} className={slots.title({ className })} {...props} />;
});
DialogTitle.displayName = 'DialogTitle';

/* ─── Description ─── */
const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  Omit<React.ComponentPropsWithoutRef<typeof BaseDialog.Description>, 'className'> & { className?: string }
>(({ className, ...props }, ref) => {
  const slots = dialogVariants();
  return (
    <BaseDialog.Description ref={ref} className={slots.description({ className })} {...props} />
  );
});
DialogDescription.displayName = 'DialogDescription';

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  dialogVariants,
};
