import * as React from 'react';
import { AlertDialog as BaseAlertDialog } from '@base-ui/react';
import { tv } from 'tailwind-variants';

const alertDialogVariants = tv({
  slots: {
    overlay:
      'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-open:animate-in data-close:animate-out data-close:fade-out-0 data-open:fade-in-0',
    content:
      'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-border bg-background p-6 shadow-lg duration-200 data-open:animate-in data-close:animate-out data-close:fade-out-0 data-open:fade-in-0 data-close:zoom-out-95 data-open:zoom-in-95 sm:rounded-lg',
    header: 'flex flex-col space-y-2 text-center sm:text-left',
    footer: 'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-2',
    title: 'text-lg font-semibold leading-none tracking-tight',
    description: 'text-sm text-muted-foreground',
  },
});

/* ─── Root ─── */
const AlertDialog = BaseAlertDialog.Root;

/* ─── Trigger ─── */
// Hỗ trợ cả render={} (Base UI) lẫn children trực tiếp.
// Nếu children là một React element (e.g. <Button>), tự động dùng làm render prop
// để tránh nested button (<button><button>…</button></button>).
type BaseTriggerProps = React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Trigger>;

interface AlertDialogTriggerProps extends Omit<BaseTriggerProps, 'render'> {
  render?: BaseTriggerProps['render'];
  children?: React.ReactNode;
}

const AlertDialogTrigger = React.forwardRef<HTMLElement, AlertDialogTriggerProps>(
  ({ render: renderProp, children, ...props }, ref) => {
    const resolvedRender =
      renderProp ?? (React.isValidElement(children) ? children : undefined);

    return (
      <BaseAlertDialog.Trigger
        ref={ref as React.Ref<HTMLButtonElement>}
        render={resolvedRender}
        {...props}
      >
        {resolvedRender ? undefined : children}
      </BaseAlertDialog.Trigger>
    );
  },
);
AlertDialogTrigger.displayName = 'AlertDialogTrigger';

/* ─── Close (wraps BaseAlertDialog.Close for cancel buttons) ─── */
const AlertDialogClose = BaseAlertDialog.Close;

/* ─── Content (Portal + Backdrop + Popup) ─── */
const AlertDialogContent = React.forwardRef<
  HTMLDivElement,
  Omit<React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Popup>, 'className'> & {
    className?: string;
  }
>(({ className, children, ...props }, ref) => {
  const slots = alertDialogVariants();
  return (
    <BaseAlertDialog.Portal>
      <BaseAlertDialog.Backdrop className={slots.overlay()} />
      <BaseAlertDialog.Popup ref={ref} className={slots.content({ className })} {...props}>
        {children}
      </BaseAlertDialog.Popup>
    </BaseAlertDialog.Portal>
  );
});
AlertDialogContent.displayName = 'AlertDialogContent';

/* ─── Header ─── */
const AlertDialogHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const slots = alertDialogVariants();
  return <div ref={ref} className={slots.header({ className })} {...props} />;
});
AlertDialogHeader.displayName = 'AlertDialogHeader';

/* ─── Footer ─── */
const AlertDialogFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const slots = alertDialogVariants();
  return <div ref={ref} className={slots.footer({ className })} {...props} />;
});
AlertDialogFooter.displayName = 'AlertDialogFooter';

/* ─── Title ─── */
const AlertDialogTitle = React.forwardRef<
  HTMLHeadingElement,
  Omit<React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Title>, 'className'> & {
    className?: string;
  }
>(({ className, ...props }, ref) => {
  const slots = alertDialogVariants();
  return <BaseAlertDialog.Title ref={ref} className={slots.title({ className })} {...props} />;
});
AlertDialogTitle.displayName = 'AlertDialogTitle';

/* ─── Description ─── */
const AlertDialogDescription = React.forwardRef<
  HTMLParagraphElement,
  Omit<React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Description>, 'className'> & {
    className?: string;
  }
>(({ className, ...props }, ref) => {
  const slots = alertDialogVariants();
  return (
    <BaseAlertDialog.Description
      ref={ref}
      className={slots.description({ className })}
      {...props}
    />
  );
});
AlertDialogDescription.displayName = 'AlertDialogDescription';

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogClose,
  alertDialogVariants,
};
