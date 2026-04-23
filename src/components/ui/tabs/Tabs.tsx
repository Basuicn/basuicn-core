import * as React from 'react';
import { Tabs as BaseTabs } from '@base-ui/react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@/lib/utils/cn';

const tabsVariants = tv({
  slots: {
    rootSlots: 'flex flex-col w-full',
    list: 'relative inline-flex items-center justify-start rounded-lg bg-muted p-1 text-muted-foreground w-fit',
    indicator: 'absolute top-1 bottom-1 left-[var(--active-tab-left)] w-[var(--active-tab-width)] rounded-md bg-background shadow-sm transition-all duration-300 ease-out z-0',
    trigger: 'relative z-10 inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-active:text-foreground data-active:font-semibold',
    panel: 'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
  },
  variants: {
    size: {
      xs: { trigger: 'px-2 py-1 text-xs' },
      sm: { trigger: 'px-3 py-1.5 text-sm' },
      md: { trigger: 'px-4 py-2 text-base'  },
      lg: { trigger: 'px-5 py-2.5 text-lg'  },
    },
  },
  defaultVariants: {
    size: 'sm',
  },
});

type TabsSize = NonNullable<VariantProps<typeof tabsVariants>['size']>;

const TabsSizeContext = React.createContext<TabsSize>('sm');

const { rootSlots, list, indicator, panel } = tabsVariants();

type TabsRootProps = React.ComponentPropsWithoutRef<typeof BaseTabs.Root>;

export interface TabsProps extends TabsRootProps {}

const Tabs = React.forwardRef<React.ElementRef<typeof BaseTabs.Root>, TabsProps>(
  ({ className, value: valueProp, defaultValue, onValueChange, ...props }, ref) => {
    const isControlled = valueProp !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = React.useState<TabsRootProps['defaultValue']>(
      defaultValue ?? false,
    );

    const handleValueChange = React.useCallback<NonNullable<TabsRootProps['onValueChange']>>(
      (val, event) => {
        if (!isControlled) setUncontrolledValue(val);
        onValueChange?.(val, event);
      },
      [isControlled, onValueChange],
    );

    return (
      <BaseTabs.Root
        ref={ref}
        className={cn(rootSlots(), className)}
        value={isControlled ? valueProp : uncontrolledValue}
        onValueChange={handleValueChange}
        {...props}
      />
    );
  },
);
Tabs.displayName = 'Tabs';

export interface TabsListProps extends React.ComponentPropsWithoutRef<typeof BaseTabs.List> {
  size?: TabsSize;
}

const TabsList = React.forwardRef<React.ElementRef<typeof BaseTabs.List>, TabsListProps>(
  ({ className, size = 'sm', children, ...props }, ref) => (
    <TabsSizeContext.Provider value={size}>
      <BaseTabs.List ref={ref} className={cn(list(), className)} {...props}>
        <BaseTabs.Indicator className={indicator()} />
        {children}
      </BaseTabs.List>
    </TabsSizeContext.Provider>
  ),
);
TabsList.displayName = 'TabsList';

export interface TabsTriggerProps extends React.ComponentPropsWithoutRef<typeof BaseTabs.Tab> {}

const TabsTrigger = React.forwardRef<React.ElementRef<typeof BaseTabs.Tab>, TabsTriggerProps>(
  ({ className, ...props }, ref) => {
    const size = React.useContext(TabsSizeContext);
    const { trigger } = tabsVariants({ size });
    return (
      <BaseTabs.Tab ref={ref} className={cn(trigger(), className)} {...props} />
    );
  },
);
TabsTrigger.displayName = 'TabsTrigger';

export interface TabsContentProps extends React.ComponentPropsWithoutRef<typeof BaseTabs.Panel> {}

const TabsContent = React.forwardRef<React.ElementRef<typeof BaseTabs.Panel>, TabsContentProps>(
  ({ className, ...props }, ref) => (
    <BaseTabs.Panel ref={ref} className={cn(panel(), className)} {...props} />
  ),
);
TabsContent.displayName = 'TabsContent';

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsVariants };
export type { TabsSize };
