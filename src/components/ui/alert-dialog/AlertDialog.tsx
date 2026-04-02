import * as React from 'react';
import { AlertDialog as BaseAlertDialog } from '@base-ui/react';
import { tv } from 'tailwind-variants';

const alertDialogVariants = tv({
  slots: {
    overlay: 'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-starting:animate-in data-ending:animate-out data-ending:fade-out-0 data-starting:fade-in-0',
    content: 'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-border bg-background p-6 shadow-lg duration-200 data-starting:animate-in data-ending:animate-out data-ending:fade-out-0 data-starting:fade-in-0 data-ending:zoom-out-95 data-starting:zoom-in-95 sm:rounded-lg',
    header: 'flex flex-col space-y-2 text-center sm:text-left',
    footer: 'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-2',
    title: 'text-lg font-semibold leading-none tracking-tight',
    description: 'text-sm text-muted-foreground',
  }
});

const { overlay, content, header, footer, title, description } = alertDialogVariants();

export interface AlertDialogProps extends React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Root> {
  trigger?: React.ReactNode;
  headerTitle?: string;
  headerDescription?: string;
  cancelContent?: React.ReactNode;
  actionContent?: React.ReactNode;
}

const AlertDialog = React.forwardRef<React.ElementRef<typeof BaseAlertDialog.Root>, AlertDialogProps>(
  ({ trigger, headerTitle, headerDescription, cancelContent, actionContent, ...props }, ref) => {
    return (
      <BaseAlertDialog.Root {...props}>
        {trigger && <BaseAlertDialog.Trigger render={trigger as React.ReactElement} />}
        <BaseAlertDialog.Portal>
          <BaseAlertDialog.Backdrop className={overlay()} />
          <BaseAlertDialog.Popup className={content()}>
            {(headerTitle || headerDescription) && (
              <div className={header()}>
                {headerTitle && <BaseAlertDialog.Title className={title()}>{headerTitle}</BaseAlertDialog.Title>}
                {headerDescription && <BaseAlertDialog.Description className={description()}>{headerDescription}</BaseAlertDialog.Description>}
              </div>
            )}
            
            <div className={footer()}>
                {cancelContent && (
                    <BaseAlertDialog.Close render={cancelContent as React.ReactElement} />
                )}
                {actionContent && (
                    actionContent
                )}
            </div>
          </BaseAlertDialog.Popup>
        </BaseAlertDialog.Portal>
      </BaseAlertDialog.Root>
    );
  }
);

AlertDialog.displayName = 'AlertDialog';

export { AlertDialog };
