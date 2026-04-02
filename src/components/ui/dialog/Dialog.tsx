import * as React from 'react';
import { Dialog as BaseDialog } from '@base-ui/react';
import { X } from 'lucide-react';
import { tv, type VariantProps } from 'tailwind-variants';

const dialogVariants = tv({
  slots: {
    overlay: 'fixed inset-0! z-50 bg-black/30 backdrop-blur-sm data-starting:animate-in data-ending:animate-out data-ending:fade-out-0 data-starting:fade-in-0',
    content: 'fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border border-border bg-background p-6 shadow-lg duration-200 data-starting:animate-in data-ending:animate-out data-ending:fade-out-0 data-starting:fade-in-0 data-ending:zoom-out-95 data-starting:zoom-in-95 ',
    header: 'flex flex-col space-y-1.5 text-center sm:text-left',
    footer: 'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-auto',
    title: 'text-lg font-semibold leading-none tracking-tight',
    description: 'text-sm text-muted-foreground',
    close: 'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:pointer-events-none data-starting:bg-accent data-starting:text-muted-foreground',
  },
  variants: {
    size: {
      default: {
        content: 'max-w-lg sm:rounded-lg',
      },
      fullScreen: {
        content: 'inset-0 left-0 top-0 translate-x-0 translate-y-0 max-w-none h-full rounded-none border-none',
      },
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

const { overlay, content, header, footer, title, description, close } = dialogVariants();

export interface DialogProps extends React.ComponentPropsWithoutRef<typeof BaseDialog.Root>, VariantProps<typeof dialogVariants> {
  trigger?: React.ReactNode;
  headerTitle?: string;
  headerDescription?: string;
  children?: React.ReactNode;
  footerContent?: React.ReactNode;
  contentClassName?: string;
}

const Dialog = React.forwardRef<React.ElementRef<typeof BaseDialog.Root>, DialogProps>(
  ({ trigger, headerTitle, headerDescription, children, footerContent, size, contentClassName, ...props }, ref) => {
    const slots = dialogVariants({ size });

    return (
      <BaseDialog.Root {...props}>
        {trigger && <BaseDialog.Trigger render={trigger as React.ReactElement} />}
        <BaseDialog.Portal>
          <BaseDialog.Backdrop className={slots.overlay()} />
          <BaseDialog.Popup className={slots.content({ className: contentClassName })}>
            {(headerTitle || headerDescription) && (
              <div className={slots.header()}>
                {headerTitle && <BaseDialog.Title className={slots.title()}>{headerTitle}</BaseDialog.Title>}
                {headerDescription && <BaseDialog.Description className={slots.description()}>{headerDescription}</BaseDialog.Description>}
              </div>
            )}
            {children}
            {footerContent && <div className={slots.footer()}>{footerContent}</div>}
            <BaseDialog.Close className={slots.close()}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </BaseDialog.Close>
          </BaseDialog.Popup>
        </BaseDialog.Portal>
      </BaseDialog.Root>
    );
  }
);

Dialog.displayName = 'Dialog';

export { Dialog };
