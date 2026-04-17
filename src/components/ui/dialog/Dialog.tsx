import * as React from 'react';
import { Dialog as BaseDialog } from '@base-ui/react';
import { X } from 'lucide-react';
import { tv, type VariantProps } from 'tailwind-variants';

const dialogVariants = tv({
  slots: {
    overlay:
      'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0',
   content: [
      'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 p-6',
      'w-full max-w-lg rounded-xl border border-border bg-background shadow-2xl',
      'data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 ',
      'data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
    ].join(' '),
    header: 'flex flex-col space-y-1.5 text-center sm:text-left',
    footer: 'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-auto',
    title: 'text-lg font-semibold leading-none tracking-tight',
    description: 'text-sm text-muted-foreground',
    close:
      'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:pointer-events-none data-open:bg-accent data-open:text-muted-foreground',
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
// Hỗ trợ cả render={} (Base UI) lẫn children trực tiếp.
// Nếu children là một React element (e.g. <Button>), tự động dùng làm render prop
// để tránh nested button (<button><button>…</button></button>).
type BaseTriggerProps = React.ComponentPropsWithoutRef<typeof BaseDialog.Trigger>;

interface DialogTriggerProps extends Omit<BaseTriggerProps, 'render'> {
  render?: BaseTriggerProps['render'];
  children?: React.ReactNode;
}

const DialogTrigger = React.forwardRef<HTMLElement, DialogTriggerProps>(
  ({ render: renderProp, children, ...props }, ref) => {
    const resolvedRender =
      renderProp ?? (React.isValidElement(children) ? children : undefined);

    return (
      <BaseDialog.Trigger
        ref={ref as React.Ref<HTMLButtonElement>}
        render={resolvedRender}
        {...props}
      >
        {resolvedRender ? undefined : children}
      </BaseDialog.Trigger>
    );
  },
);
DialogTrigger.displayName = 'DialogTrigger';


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
};
