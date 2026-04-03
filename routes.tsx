import * as React from 'react';
import * as Icon from '@/components/ui/icons';
import { FormShowcase } from './src/pages/FormShowcase';
import ButtonPage from './src/pages/ButtonPage';
import BadgePage from './src/pages/BadgePage';
import CheckboxPage from './src/pages/CheckboxPage';
import RadioPage from './src/pages/RadioPage';
import SwitchPage from './src/pages/SwitchPage';
import ProgressPage from './src/pages/ProgressPage';
import SliderPage from './src/pages/SliderPage';
import InputPage from './src/pages/InputPage';
import SelectPage from './src/pages/SelectPage';
import ComboBoxPage from './src/pages/ComboBoxPage';
import DatePickerPage from './src/pages/DatePickerPage';
import TabsPage from './src/pages/TabsPage';
import AccordionPage from './src/pages/AccordionPage';
import CollapsiblePage from './src/pages/CollapsiblePage';
import PopoverPage from './src/pages/PopoverPage';
import TooltipPage from './src/pages/TooltipPage';
import AlertPage from './src/pages/AlertPage';
import AvatarPage from './src/pages/AvatarPage';
import SkeletonPage from './src/pages/SkeletonPage';
import SpinnerPage from './src/pages/SpinnerPage';
import DialogModal from './src/pages/DialogModal';
import AlertDialogPage from './src/pages/AlertDialogPage';
import TablePage from './src/pages/TablePage';
import TransactionPage from './src/pages/TransactionPage';
import CalendarPage from './src/pages/CalendarPage';
import DrawerPage from './src/pages/DrawerPage';
import PreviewCardPage from './src/pages/PreviewCardPage';
import RatePage from './src/pages/RatePage';
import TogglePage from './src/pages/TogglePage';
import SidebarPage from './src/pages/SidebarPage';
import TextareaPage from './src/pages/TextareaPage';
import SeparatorPage from './src/pages/SeparatorPage';
import ScrollAreaPage from './src/pages/ScrollAreaPage';
import BreadcrumbPage from './src/pages/BreadcrumbPage';
import PaginationPage from './src/pages/PaginationPage';
import DropdownMenuPage from './src/pages/DropdownMenuPage';
import ContextMenuPage from './src/pages/ContextMenuPage';
import AspectRatioPage from './src/pages/AspectRatioPage';
import SheetPage from './src/pages/SheetPage';
import { VsCodeIDE } from './src/components/ui/vs-code/VsCodeIDE';

export interface RouteConfig {
  path: string;
  label: string;
  icon?: React.ReactNode;
  element?: React.ReactNode; // Optional for parent grouping routes
  category?: 'overview' | 'general' | 'forms' | 'complex' | 'overlays' | 'none';
  badge?: string;
  end?: boolean;
  standalone?: boolean;
  prefix?: string;
  children?: RouteConfig[]; // Nested items (Level 2, Level 3, etc.)
}

export const ROUTES: RouteConfig[] = [
  // Overview
  {
    path: '/',
    label: 'Dashboard',
    icon: <Icon.LayoutDashboard className="w-4 h-4" />,
    element: <TransactionPage />,
    category: 'overview',
    end: true,
  },

  // General Components
  {
    path: '/general',
    label: 'General',
    icon: <Icon.BookOpen className="w-4 h-4" />,
    category: 'general',
    children: [
      {
        path: '/button',
        label: 'Button',
        icon: <Icon.Square className="w-4 h-4" />,
        element: <ButtonPage />,
      },
      {
        path: '/badge',
        label: 'Badge',
        icon: <Icon.Tag className="w-4 h-4" />,
        element: <BadgePage />,
      },
      {
        path: '/avatar',
        label: 'Avatar',
        icon: <Icon.UserCircle className="w-4 h-4" />,
        element: <AvatarPage />,
      },
      {
        path: '/skeleton',
        label: 'Skeleton',
        icon: <Icon.Layers3 className="w-4 h-4" />,
        element: <SkeletonPage />,
      },
      {
        path: '/spinner',
        label: 'Spinner',
        icon: <Icon.Loader2 className="w-4 h-4" />,
        element: <SpinnerPage />,
      },
      {
        path: '/separator',
        label: 'Separator',
        icon: <Icon.Minus className="w-4 h-4" />,
        element: <SeparatorPage />,
      },
      {
        path: '/breadcrumb',
        label: 'Breadcrumb',
        icon: <Icon.Navigation className="w-4 h-4" />,
        element: <BreadcrumbPage />,
      },
      {
        path: '/aspect-ratio',
        label: 'Aspect Ratio',
        icon: <Icon.Square className="w-4 h-4" />,
        element: <AspectRatioPage />,
      },
      {
        path: '/calendar',
        label: 'Calendar',
        icon: <Icon.CalendarDays className="w-4 h-4" />,
        element: <CalendarPage />,
      },
      {
        path: '/rate',
        label: 'Rate',
        icon: <Icon.Star className="w-4 h-4" />,
        element: <RatePage />,
      },
      {
        path: '/toggle',
        label: 'Toggle',
        icon: <Icon.ToggleLeft className="w-4 h-4" />,
        element: <TogglePage />,
      },
      {
        path: '/preview-card',
        label: 'Preview Card',
        icon: <Icon.Square className="w-4 h-4" />,
        element: <PreviewCardPage />,
      },
      {
        path: '/scroll-area',
        label: 'Scroll Area',
        icon: <Icon.ScrollText className="w-4 h-4" />,
        element: <ScrollAreaPage />,
      },
     
     
      
    ]
  },

  // Form Components
  {
    path: '/forms',
    label: 'Forms',
    icon: <Icon.Users className="w-4 h-4" />,
    category: 'forms',
    children: [
      {
        path: '/input',
        label: 'Input',
        icon: <Icon.Type className="w-4 h-4" />,
        element: <InputPage />,
      },
      {
        path: '/textarea',
        label: 'Textarea',
        icon: <Icon.TextCursorInput className="w-4 h-4" />,
        element: <TextareaPage />,
      },
      {
        path: '/select',
        label: 'Select',
        icon: <Icon.ChevronsUpDown className="w-4 h-4" />,
        element: <SelectPage />,
      },
      {
        path: '/datepicker',
        label: 'DatePicker',
        icon: <Icon.CalendarDays className="w-4 h-4" />,
        element: <DatePickerPage />,
      },
      {
        path: '/checkbox',
        label: 'Checkbox',
        icon: <Icon.ListChecks className="w-4 h-4" />,
        element: <CheckboxPage />,
      },
      {
        path: '/radio',
        label: 'Radio Group',
        icon: <Icon.Circle className="w-4 h-4" />,
        element: <RadioPage />,
      },
      {
        path: '/combobox',
        label: 'ComboBox',
        icon: <Icon.Columns3 className="w-4 h-4" />,
        element: <ComboBoxPage />,
      },
      {
        path: '/switch',
        label: 'Switch',
        icon: <Icon.ToggleLeft className="w-4 h-4" />,
        element: <SwitchPage />,
      },
      {
        path: '/slider',
        label: 'Slider',
        icon: <Icon.SlidersHorizontal className="w-4 h-4" />,
        element: <SliderPage />,
      },
      {
        path: '/textarea',
        label: 'Textarea',
        icon: <Icon.TextCursorInput className="w-4 h-4" />,
        element: <TextareaPage />,
      },
    ]
  },

  // Navigation & Layout
  {
    path: '/components/pagination',
    label: 'Pagination',
    icon: <Icon.Hash className="w-4 h-4" />,
    element: <PaginationPage />,
    category: 'complex',
  },
  {
    path: '/components/scroll-area',
    label: 'Scroll Area',
    icon: <Icon.ScrollText className="w-4 h-4" />,
    element: <ScrollAreaPage />,
    category: 'complex',
  },

  // Complex
  {
    path: '/components/table',
    label: 'Data Table',
    icon: <Icon.Table2 className="w-4 h-4" />,
    element: <TablePage />,
    category: 'complex',
  },
  {
    path: '/components/tabs',
    label: 'Tabs',
    icon: <Icon.Layers3 className="w-4 h-4" />,
    element: <TabsPage />,
    category: 'complex',
  },
  {
    path: '/components/accordion',
    label: 'Accordion',
    icon: <Icon.ChevronRight className="w-4 h-4" />,
    element: <AccordionPage />,
    category: 'complex',
  },
  {
    path: '/components/collapsible',
    label: 'Collapsible',
    icon: <Icon.Menu className="w-4 h-4" />,
    element: <CollapsiblePage />,
    category: 'complex',
  },
  {
    path: '/components/sidebar',
    label: 'Sidebar',
    icon: <Icon.PanelLeft className="w-4 h-4" />,
    element: <SidebarPage />,
    category: 'complex',
  },
  

  // Overlays
  {
    path: '/components/dialog',
    label: 'Dialog (Modal)',
    icon: <Icon.MessageSquare className="w-4 h-4" />,
    element: <DialogModal />,
    category: 'overlays',
  },
  {
    path: '/components/alert-dialog',
    label: 'Alert Dialog',
    icon: <Icon.AlertTriangle className="w-4 h-4" />,
    element: <AlertDialogPage />,
    category: 'overlays',
  },
  {
    path: '/components/popover',
    label: 'Popover',
    icon: <Icon.Lightbulb className="w-4 h-4" />,
    element: <PopoverPage />,
    category: 'overlays',
  },
  {
    path: '/components/tooltip',
    label: 'Tooltip',
    icon: <Icon.Info className="w-4 h-4" />,
    element: <TooltipPage />,
    category: 'overlays',
  },
  {
    path: '/components/drawer',
    label: 'Drawer',
    icon: <Icon.PanelLeft className="w-4 h-4" />,
    element: <DrawerPage />,
    category: 'overlays',
  },
  {
    path: '/components/dropdown-menu',
    label: 'Dropdown Menu',
    icon: <Icon.ChevronDown className="w-4 h-4" />,
    element: <DropdownMenuPage />,
    category: 'overlays',
  },
  {
    path: '/components/context-menu',
    label: 'Context Menu',
    icon: <Icon.Menu className="w-4 h-4" />,
    element: <ContextMenuPage />,
    category: 'overlays',
  },
  {
    path: '/components/sheet',
    label: 'Sheet',
    icon: <Icon.PanelLeft className="w-4 h-4" />,
    element: <SheetPage />,
    category: 'overlays',
  },

  // Standalone
  {
    path: '/components/vscode',
    label: 'VS Code IDE',
    element: <VsCodeIDE />,
    standalone: true,
  },
  
];

/**
 * Hàm flattenSearchableRoutes: Lấy tất cả các route có element (cần search) thành mảng phẳng.
 */
export const flattenSearchableRoutes = (routes: RouteConfig[] = ROUTES, parentPath = ''): { label: string; value: string; icon?: React.ReactNode }[] => {
  let flat: { label: string; value: string; icon?: React.ReactNode }[] = [];

  routes.forEach((route) => {
    const combinedPath = [parentPath, route.prefix, route.path]
      .filter(Boolean)
      .join('/')
      .replace(/\/+/g, '/');

    if (route.element && route.label !== 'Dashboard') {
      flat.push({
        label: route.label,
        value: combinedPath === '' ? '/' : combinedPath,
        icon: route.icon,
      });
    }

    if (route.children) {
      flat = [...flat, ...flattenSearchableRoutes(route.children, combinedPath)];
    }
  });

  return flat;
};
