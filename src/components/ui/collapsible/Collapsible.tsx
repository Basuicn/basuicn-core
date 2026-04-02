import * as React from 'react';
import { Collapsible as BaseCollapsible } from '@base-ui/react';
import { ChevronDown } from 'lucide-react';
import { tv } from 'tailwind-variants';

const collapsibleVariants = tv({
  slots: {
    root: 'w-full',
    trigger: 'flex w-full items-center justify-between py-3 px-4 text-sm font-medium rounded-md border border-border bg-background hover:bg-muted/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary [&[data-panel-open]>svg]:rotate-180',
    panel: 'overflow-hidden text-sm data-[open]:animate-accordion-down data-[closed]:animate-accordion-up transition-all',
    content: 'pt-2',
  }
});

export interface CollapsibleProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  triggerClassName?: string;
}

const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(({
  trigger,
  children,
  defaultOpen,
  open,
  onOpenChange,
  className,
  triggerClassName,
}, ref) => {
  const { root, trigger: triggerCls, panel, content } = collapsibleVariants();

  return (
    <BaseCollapsible.Root
      ref={ref}
      className={root({ className })}
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
    >
      <BaseCollapsible.Trigger className={triggerCls({ className: triggerClassName })}>
        {trigger}
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
      </BaseCollapsible.Trigger>
      <BaseCollapsible.Panel className={panel()}>
        <div className={content()}>
          {children}
        </div>
      </BaseCollapsible.Panel>
    </BaseCollapsible.Root>
  );
});

Collapsible.displayName = 'Collapsible';

export { Collapsible };
