import React from 'react';
import { 
  Tabs as AriaTabs, 
  TabList as AriaTabList, 
  Tab as AriaTab, 
  TabPanel as AriaTabPanel,
  type TabsProps,
  type TabListProps,
  type TabProps,
  type TabPanelProps
} from 'react-aria-components';
import { cn } from '@lib/utils/cn';

export interface CustomTabsProps extends TabsProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
}

const TabsContext = React.createContext<{ variant: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' }>({ variant: 'primary' });

const tabVariantClasses = {
  primary: 'data-[selected]:bg-primary data-[selected]:text-white',
  secondary: 'data-[selected]:bg-secondary data-[selected]:text-white',
  danger: 'data-[selected]:bg-danger data-[selected]:text-white',
  success: 'data-[selected]:bg-success data-[selected]:text-white',
  warning: 'data-[selected]:bg-warning data-[selected]:text-white',
};

const underlineVariantClasses = {
  primary: 'data-[selected]:border-b-2 data-[selected]:border-primary data-[selected]:text-primary',
  secondary: 'data-[selected]:border-b-2 data-[selected]:border-secondary data-[selected]:text-secondary',
  danger: 'data-[selected]:border-b-2 data-[selected]:border-danger data-[selected]:text-danger',
  success: 'data-[selected]:border-b-2 data-[selected]:border-success data-[selected]:text-success',
  warning: 'data-[selected]:border-b-2 data-[selected]:border-warning data-[selected]:text-warning',
};

export function Tabs({ variant = 'primary', className, ...props }: CustomTabsProps) {
  return (
    <TabsContext.Provider value={{ variant }}>
      <AriaTabs 
        {...props} 
        className={cn("flex flex-col w-full", className as string)} 
      />
    </TabsContext.Provider>
  );
}

export interface CustomTabListProps<T> extends TabListProps<T> {
  styleType?: 'pill' | 'underline';
}

export function TabList<T extends object>({ styleType = 'underline', className, ...props }: CustomTabListProps<T>) {
  return (
    <AriaTabList 
      {...props} 
      className={cn(
        "flex gap-4 border-b border-gray-200 w-full overflow-x-auto no-scrollbar",
        styleType === 'pill' ? "border-none gap-2 bg-gray-100 p-1 rounded-lg w-fit" : "",
        className as string
      )} 
    />
  );
}

export interface CustomTabProps extends TabProps {
  styleType?: 'pill' | 'underline';
}

export function Tab({ styleType = 'underline', className, ...props }: CustomTabProps) {
  const { variant } = React.useContext(TabsContext);
  
  return (
    <AriaTab 
      {...props} 
      className={cn(
        "px-4 py-2 cursor-pointer outline-none transition-all duration-200 text-sm font-medium",
        "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded-sm",
        "text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed",
        styleType === 'pill' 
          ? cn("rounded-md px-4 py-1.5", tabVariantClasses[variant])
          : cn("rounded-none border-b-2 border-transparent", underlineVariantClasses[variant]),
        className as string
      )} 
    />
  );
}

export function TabPanel(props: TabPanelProps) {
  return (
    <AriaTabPanel 
      {...props} 
      className={cn(
        "p-4 pt-6 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md",
        props.className as string
      )} 
    />
  );
}
