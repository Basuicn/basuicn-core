import * as React from 'react';
import { Tabs as BaseTabs } from '@base-ui/react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@lib/utils/cn';

const tabsVariants = tv({
  slots: {
    rootSlots: 'flex flex-col w-full',
    list: 'relative inline-flex items-center justify-start rounded-lg bg-muted p-1 text-muted-foreground w-fit',
    indicator: 'absolute top-1 bottom-1 left-[var(--active-tab-left)] w-[var(--active-tab-width)] rounded-md bg-background shadow-sm transition-all duration-300 ease-out z-0',
    trigger: 'relative z-10 inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-active:text-foreground data-active:font-semibold',
    panel: 'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
  }
});

const { rootSlots, list, indicator, trigger, panel } = tabsVariants();

export interface TabsProps extends React.ComponentPropsWithoutRef<typeof BaseTabs.Root> {
}

const Tabs = React.forwardRef<React.ElementRef<typeof BaseTabs.Root>, TabsProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseTabs.Root
        ref={ref}
        className={cn(rootSlots(), className)}
        {...props}
      />
    );
  }
);
Tabs.displayName = 'Tabs';

export interface TabsListProps extends React.ComponentPropsWithoutRef<typeof BaseTabs.List> {
}

const TabsList = React.forwardRef<React.ElementRef<typeof BaseTabs.List>, TabsListProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <BaseTabs.List ref={ref} className={cn(list(), className)} {...props}>
        <BaseTabs.Indicator className={indicator()} />
        {children}
      </BaseTabs.List>
    );
  }
);
TabsList.displayName = 'TabsList';

export interface TabsTriggerProps extends React.ComponentPropsWithoutRef<typeof BaseTabs.Tab> {
}

const TabsTrigger = React.forwardRef<React.ElementRef<typeof BaseTabs.Tab>, TabsTriggerProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseTabs.Tab ref={ref} className={cn(trigger(), className)} {...props} />
    );
  }
);
TabsTrigger.displayName = 'TabsTrigger';

export interface TabsContentProps extends React.ComponentPropsWithoutRef<typeof BaseTabs.Panel> {
}

const TabsContent = React.forwardRef<React.ElementRef<typeof BaseTabs.Panel>, TabsContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseTabs.Panel ref={ref} className={cn(panel(), className)} {...props} />
    );
  }
);
TabsContent.displayName = 'TabsContent';

export { Tabs, TabsList, TabsTrigger, TabsContent };
