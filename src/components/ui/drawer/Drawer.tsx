import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { Dialog as BaseDialog } from '@base-ui/react';
import { X } from 'lucide-react';
import { cn } from '@lib/utils/cn';

const drawerVariants = tv({
  slots: {
    overlay: 'fixed inset-0 z-50 bg-black/40 backdrop-blur-sm data-starting:animate-in data-ending:animate-out data-ending:fade-out-0 data-starting:fade-in-0',
    panel: [
      'fixed z-50 bg-background shadow-2xl flex flex-col',
      'data-starting:animate-in data-ending:animate-out duration-300',
      'outline-none overflow-hidden m-0 p-0 max-w-full max-h-full border-none',
    ],
    header: 'flex items-center justify-between px-6 py-4 border-b border-border/50 shrink-0',
    title: 'text-base font-semibold text-foreground',
    description: 'text-sm text-muted-foreground mt-0.5',
    body: 'flex-1 overflow-y-auto px-6 py-4',
    footer: 'px-6 py-4 border-t border-border/50 shrink-0',
    close: 'rounded-sm opacity-70 hover:opacity-100 transition-opacity ring-offset-background focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
  },
  variants: {
    direction: {
      left: {
        panel: 'inset-y-0 left-0 h-full data-[starting-style]:-translate-x-full data-[ending-style]:-translate-x-full transition-transform',
      },
      right: {
        panel: 'inset-y-0 right-0 h-full data-[starting-style]:translate-x-full data-[ending-style]:translate-x-full transition-transform',
      },
      top: {
        panel: 'inset-x-0 top-0 w-full data-[starting-style]:-translate-y-full data-[ending-style]:-translate-y-full transition-transform',
      },
      bottom: {
        panel: 'inset-x-0 bottom-0 w-full data-[starting-style]:translate-y-full data-[ending-style]:translate-y-full transition-transform',
      },
    },
    size: {
      sm: {},
      md: {},
      lg: {},
      full: {},
    },
  },
  compoundVariants: [
    { direction: 'left', size: 'sm', class: { panel: 'w-64' } },
    { direction: 'left', size: 'md', class: { panel: 'w-80' } },
    { direction: 'left', size: 'lg', class: { panel: 'w-[480px]' } },
    { direction: 'left', size: 'full', class: { panel: 'w-full' } },
    { direction: 'right', size: 'sm', class: { panel: 'w-64' } },
    { direction: 'right', size: 'md', class: { panel: 'w-80' } },
    { direction: 'right', size: 'lg', class: { panel: 'w-[480px]' } },
    { direction: 'right', size: 'full', class: { panel: 'w-full' } },
    { direction: 'top', size: 'sm', class: { panel: 'h-48' } },
    { direction: 'top', size: 'md', class: { panel: 'h-64' } },
    { direction: 'top', size: 'lg', class: { panel: 'h-[480px]' } },
    { direction: 'top', size: 'full', class: { panel: 'h-full' } },
    { direction: 'bottom', size: 'sm', class: { panel: 'h-48' } },
    { direction: 'bottom', size: 'md', class: { panel: 'h-64' } },
    { direction: 'bottom', size: 'lg', class: { panel: 'h-[480px]' } },
    { direction: 'bottom', size: 'full', class: { panel: 'h-full' } },
  ],
  defaultVariants: {
    direction: 'right',
    size: 'md',
  },
});

export interface DrawerProps extends VariantProps<typeof drawerVariants> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footerContent?: React.ReactNode;
  hideClose?: boolean;
  className?: string;
}

const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(({
  open: controlledOpen,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  footerContent,
  direction = 'right',
  size = 'md',
  hideClose = false,
  className,
}, ref) => {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const handleOpenChange = (val: boolean) => {
    if (!isControlled) setInternalOpen(val);
    onOpenChange?.(val);
  };

  const slots = drawerVariants({ direction, size });

  return (
    <BaseDialog.Root open={isOpen} onOpenChange={handleOpenChange}>
      {trigger && (
        <BaseDialog.Trigger
          render={<span style={{ display: 'contents' }}>{trigger}</span>}
        />
      )}

      <BaseDialog.Portal>
        <BaseDialog.Backdrop className={slots.overlay()} />
        <BaseDialog.Popup ref={ref} className={cn(slots.panel({ className }))}>
          {/* Header */}
          {(title || description || !hideClose) && (
            <div className={slots.header()}>
              <div>
                {title && <BaseDialog.Title className={slots.title()}>{title}</BaseDialog.Title>}
                {description && <BaseDialog.Description className={slots.description()}>{description}</BaseDialog.Description>}
              </div>
              {!hideClose && (
                <BaseDialog.Close
                  className={slots.close()}
                  aria-label="Đóng"
                >
                  <X className="h-4 w-4" />
                </BaseDialog.Close>
              )}
            </div>
          )}

          {/* Body */}
          <div className={slots.body()}>{children}</div>

          {/* Footer */}
          {footerContent && (
            <div className={slots.footer()}>{footerContent}</div>
          )}
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
});

Drawer.displayName = 'Drawer';

export { Drawer };
