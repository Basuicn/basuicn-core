import * as React from "react";
import * as Icon from "@/components/ui/icons";
import { FormShowcase } from "./src/pages/FormShowcase";
import TypographyPage from "./src/pages/TypographyPage";
import CarouselPage from "./src/pages/CarouselPage";
import ButtonPage from "./src/pages/ButtonPage";
import BadgePage from "./src/pages/BadgePage";
import CheckboxPage from "./src/pages/CheckboxPage";
import RadioPage from "./src/pages/RadioPage";
import SwitchPage from "./src/pages/SwitchPage";
import ProgressPage from "./src/pages/ProgressPage";
import SliderPage from "./src/pages/SliderPage";
import InputPage from "./src/pages/InputPage";
import SelectPage from "./src/pages/SelectPage";
import ComboBoxPage from "./src/pages/ComboBoxPage";
import AutocompletePage from "./src/pages/AutocompletePage";
import DatePickerPage from "./src/pages/DatePickerPage";
import TabsPage from "./src/pages/TabsPage";
import AccordionPage from "./src/pages/AccordionPage";
import CollapsiblePage from "./src/pages/CollapsiblePage";
import PopoverPage from "./src/pages/PopoverPage";
import TooltipPage from "./src/pages/TooltipPage";
import AlertPage from "./src/pages/AlertPage";
import AvatarPage from "./src/pages/AvatarPage";
import SkeletonPage from "./src/pages/SkeletonPage";
import SpinnerPage from "./src/pages/SpinnerPage";
import DialogModal from "./src/pages/DialogModal";
import AlertDialogPage from "./src/pages/AlertDialogPage";
import TablePage from "./src/pages/TablePage";
import CalendarPage from "./src/pages/CalendarPage";
import DrawerPage from "./src/pages/DrawerPage";
import PreviewCardPage from "./src/pages/PreviewCardPage";
import RatePage from "./src/pages/RatePage";
import TogglePage from "./src/pages/TogglePage";
import SidebarPage from "./src/pages/SidebarPage";
import TextareaPage from "./src/pages/TextareaPage";
import SeparatorPage from "./src/pages/SeparatorPage";
import ScrollAreaPage from "./src/pages/ScrollAreaPage";
import BreadcrumbPage from "./src/pages/BreadcrumbPage";
import PaginationPage from "./src/pages/PaginationPage";
import DropdownMenuPage from "./src/pages/DropdownMenuPage";
import ContextMenuPage from "./src/pages/ContextMenuPage";
import MenuBarPage from "./src/pages/MenuBarPage";
import AspectRatioPage from "./src/pages/AspectRatioPage";
import SheetPage from "./src/pages/SheetPage";
import InputOTPPage from "./src/pages/InputOTPPage";
import ResizablePage from "./src/pages/ResizablePage";
import EmptyPage from "./src/pages/EmptyPage";
import TimelinePage from "./src/pages/TimelinePage";
import CommandPage from "./src/pages/CommandPage";
import FileUploadPage from "./src/pages/FileUploadPage";
import NumberInputPage from "./src/pages/NumberInputPage";
import TreeViewPage from "./src/pages/TreeViewPage";
import TableContentsPage from "./src/pages/TableContentsPage";
import LoginPage from "./src/pages/form-login/LoginPage";
import LayoutDemoPage from "./src/pages/LayoutDemoPage";
import LayoutDemo1Preview from "./src/pages/preview/LayoutDemo1Preview";
import LayoutDemo2Preview from "./src/pages/preview/LayoutDemo2Preview";
import LayoutDemo3Preview from "./src/pages/preview/LayoutDemo3Preview";
import LayoutLoginPreview from "./src/pages/preview/LayoutLoginPreview";
import {
  FORM_PREFIX,
  GENERAL_PREFIX,
  ROUTES_CONSTANT,
} from "@/constants/Routes.constant";
import DashboardPage from "@/pages/dashboard/DashboardPage";

export interface RouteConfig {
  path: string;
  label: string;
  icon?: React.ReactNode;
  element?: React.ReactNode; // Optional for parent grouping routes
  category?: string;
  badge?: string;
  end?: boolean;
  standalone?: boolean;
  prefix?: string;
  children?: RouteConfig[]; // Nested items (Level 2, Level 3, etc.)
}

export const ROUTES: RouteConfig[] = [
  // Overview
 
 {
    path: ROUTES_CONSTANT.DASHBOARD,
    label: "Dashboard",
    icon: <Icon.User className="w-4 h-4" />,
    element: <DashboardPage />,
    category: "demo",
    // standalone: true,
  },
  // General Components
  {
    path: GENERAL_PREFIX,
    label: "General",
    icon: <Icon.BookOpen className="w-4 h-4" />,
    category: "general",
    children: [
      {
        path: ROUTES_CONSTANT.GENERAL.BUTTON,
        label: "Button",
        icon: <Icon.Square className="w-4 h-4" />,
        element: <ButtonPage />,
      },
      {
        path: ROUTES_CONSTANT.GENERAL.ALERT,
        label: "Alert",
        icon: <Icon.AlertCircle className="w-4 h-4" />,
        element: <AlertPage />,
      },
      {
        path: ROUTES_CONSTANT.GENERAL.BADGE,
        label: "Badge",
        icon: <Icon.Tag className="w-4 h-4" />,
        element: <BadgePage />,
      },
      {
        path: ROUTES_CONSTANT.GENERAL.AVATAR,
        label: "Avatar",
        icon: <Icon.UserCircle className="w-4 h-4" />,
        element: <AvatarPage />,
      },
      {
        path: ROUTES_CONSTANT.GENERAL.SKELETON,
        label: "Skeleton",
        icon: <Icon.Layers3 className="w-4 h-4" />,
        element: <SkeletonPage />,
      },
      {
        path: ROUTES_CONSTANT.GENERAL.SPINNER,
        label: "Spinner",
        icon: <Icon.Loader2 className="w-4 h-4" />,
        element: <SpinnerPage />,
      },
      {
        path: ROUTES_CONSTANT.GENERAL.SEPARATOR,
        label: "Separator",
        icon: <Icon.Minus className="w-4 h-4" />,
        element: <SeparatorPage />,
      },
      {
        path: ROUTES_CONSTANT.GENERAL.BREADCRUMB,
        label: "Breadcrumb",
        icon: <Icon.Navigation className="w-4 h-4" />,
        element: <BreadcrumbPage />,
      },
      {
        path: ROUTES_CONSTANT.GENERAL.ASPECT_RATIO,
        label: "Aspect Ratio",
        icon: <Icon.Square className="w-4 h-4" />,
        element: <AspectRatioPage />,
      },
      {
        path: ROUTES_CONSTANT.GENERAL.CALENDAR,
        label: "Calendar",
        icon: <Icon.CalendarDays className="w-4 h-4" />,
        element: <CalendarPage />,
      },
      {
        path: ROUTES_CONSTANT.GENERAL.RATE,
        label: "Rate",
        icon: <Icon.Star className="w-4 h-4" />,
        element: <RatePage />,
      },
      {
        path: ROUTES_CONSTANT.GENERAL.TOGGLE,
        label: "Toggle",
        icon: <Icon.ToggleLeft className="w-4 h-4" />,
        element: <TogglePage />,
      },
      {
        path: ROUTES_CONSTANT.GENERAL.PREVIEW_CARD,
        label: "Preview Card",
        icon: <Icon.Square className="w-4 h-4" />,
        element: <PreviewCardPage />,
      },
      {
        path: ROUTES_CONSTANT.GENERAL.TYPOGRAPHY,
        label: "Typography",
        icon: <Icon.Type className="w-4 h-4" />,
        element: <TypographyPage />,
      },
      {
        path: ROUTES_CONSTANT.GENERAL.CAROUSEL,
        label: "Carousel",
        icon: <Icon.GalleryHorizontal className="w-4 h-4" />,
        element: <CarouselPage />,
      },
      {
        path: ROUTES_CONSTANT.GENERAL.EMPTY,
        label: "Empty State",
        icon: <Icon.PackageOpen className="w-4 h-4" />,
        element: <EmptyPage />,
      },
      {
        path: ROUTES_CONSTANT.GENERAL.TIMELINE,
        label: "Timeline",
        icon: <Icon.GitBranch className="w-4 h-4" />,
        element: <TimelinePage />,
        badge: "New",
      },
    ],
  },

  // Form Components
  {
    path: FORM_PREFIX,
    label: "Forms",
    icon: <Icon.Users className="w-4 h-4" />,
    category: "forms",
    children: [
      {
        path: ROUTES_CONSTANT.FORM.INPUT,
        label: "Input",
        icon: <Icon.Type className="w-4 h-4" />,
        element: <InputPage />,
      },
      {
        path: ROUTES_CONSTANT.FORM.TEXTAREA,
        label: "Textarea",
        icon: <Icon.TextCursorInput className="w-4 h-4" />,
        element: <TextareaPage />,
      },
      {
        path: ROUTES_CONSTANT.FORM.SELECT,
        label: "Select",
        icon: <Icon.ChevronsUpDown className="w-4 h-4" />,
        element: <SelectPage />,
      },
      {
        path: ROUTES_CONSTANT.FORM.DATEPICKER,
        label: "DatePicker",
        icon: <Icon.CalendarDays className="w-4 h-4" />,
        element: <DatePickerPage />,
      },
      {
        path: ROUTES_CONSTANT.FORM.CHECKBOX,
        label: "Checkbox",
        icon: <Icon.ListChecks className="w-4 h-4" />,
        element: <CheckboxPage />,
      },
      {
        path: ROUTES_CONSTANT.FORM.RADIO,
        label: "Radio Group",
        icon: <Icon.Circle className="w-4 h-4" />,
        element: <RadioPage />,
      },
      {
        path: ROUTES_CONSTANT.FORM.COMBOBOX,
        label: "ComboBox",
        icon: <Icon.Columns3 className="w-4 h-4" />,
        element: <ComboBoxPage />,
      },
      {
        path: ROUTES_CONSTANT.FORM.AUTOCOMPLETE,
        label: "Autocomplete",
        icon: <Icon.Search className="w-4 h-4" />,
        element: <AutocompletePage />,
      },
      {
        path: ROUTES_CONSTANT.FORM.SWITCH,
        label: "Switch",
        icon: <Icon.ToggleLeft className="w-4 h-4" />,
        element: <SwitchPage />,
      },
      {
        path: ROUTES_CONSTANT.FORM.SLIDER,
        label: "Slider",
        icon: <Icon.SlidersHorizontal className="w-4 h-4" />,
        element: <SliderPage />,
      },
      {
        path: ROUTES_CONSTANT.FORM.INPUT_OTP,
        label: "Input OTP",
        icon: <Icon.KeyRound className="w-4 h-4" />,
        element: <InputOTPPage />,
      },
      {
        path: ROUTES_CONSTANT.FORM.NUMBER_INPUT,
        label: "Number Input",
        icon: <Icon.Hash className="w-4 h-4" />,
        element: <NumberInputPage />,
        badge: "New",
      },
      {
        path: ROUTES_CONSTANT.FORM.FILE_UPLOAD,
        label: "File Upload",
        icon: <Icon.Upload className="w-4 h-4" />,
        element: <FileUploadPage />,
        badge: "New",
      },
    ],
  },

  // Navigation & Layout
  {
    path: ROUTES_CONSTANT.COMPLEX.PAGINATION,
    label: "Pagination",
    icon: <Icon.Hash className="w-4 h-4" />,
    element: <PaginationPage />,
    category: "complex",
  },
  {
    path: ROUTES_CONSTANT.COMPLEX.SCROLL_AREA,
    label: "Scroll Area",
    icon: <Icon.ScrollText className="w-4 h-4" />,
    element: <ScrollAreaPage />,
    category: "complex",
  },

  // Complex
  {
    path: ROUTES_CONSTANT.COMPLEX.TABLE,
    label: "Data Table",
    icon: <Icon.Table2 className="w-4 h-4" />,
    element: <TablePage />,
    category: "complex",
  },
  {
    path: ROUTES_CONSTANT.COMPLEX.TABS,
    label: "Tabs",
    icon: <Icon.Layers3 className="w-4 h-4" />,
    element: <TabsPage />,
    category: "complex",
  },
  {
    path: ROUTES_CONSTANT.COMPLEX.ACCORDION,
    label: "Accordion",
    icon: <Icon.ChevronRight className="w-4 h-4" />,
    element: <AccordionPage />,
    category: "complex",
  },
  {
    path: ROUTES_CONSTANT.COMPLEX.COLLAPSIBLE,
    label: "Collapsible",
    icon: <Icon.Menu className="w-4 h-4" />,
    element: <CollapsiblePage />,
    category: "complex",
  },
  {
    path: ROUTES_CONSTANT.COMPLEX.SIDEBAR,
    label: "Sidebar",
    icon: <Icon.PanelLeft className="w-4 h-4" />,
    element: <SidebarPage />,
    category: "complex",
  },
  {
    path: ROUTES_CONSTANT.COMPLEX.RESIZABLE,
    label: "Resizable",
    icon: <Icon.PanelLeft className="w-4 h-4" />,
    element: <ResizablePage />,
    category: "complex",
  },
  {
    path: ROUTES_CONSTANT.COMPLEX.TABLE_CONTENTS,
    label: "Table of Contents",
    icon: <Icon.ScrollText className="w-4 h-4" />,
    element: <TableContentsPage />,
    category: "complex",
  },
  {
    path: ROUTES_CONSTANT.COMPLEX.COMMAND,
    label: "Command",
    icon: <Icon.Terminal className="w-4 h-4" />,
    element: <CommandPage />,
    category: "complex",
    badge: "New",
  },
  {
    path: ROUTES_CONSTANT.COMPLEX.TREE_VIEW,
    label: "Tree View",
    icon: <Icon.FolderTree className="w-4 h-4" />,
    element: <TreeViewPage />,
    category: "complex",
    badge: "New",
  },

  // Overlays
  {
    path: ROUTES_CONSTANT.OVERLAYS.DIALOG,
    label: "Dialog (Modal)",
    icon: <Icon.MessageSquare className="w-4 h-4" />,
    element: <DialogModal />,
    category: "overlays",
  },
  {
    path: ROUTES_CONSTANT.OVERLAYS.ALERT_DIALOG,
    label: "Alert Dialog",
    icon: <Icon.AlertTriangle className="w-4 h-4" />,
    element: <AlertDialogPage />,
    category: "overlays",
  },
  {
    path: ROUTES_CONSTANT.OVERLAYS.POPOVER,
    label: "Popover",
    icon: <Icon.Lightbulb className="w-4 h-4" />,
    element: <PopoverPage />,
    category: "overlays",
  },
  {
    path: ROUTES_CONSTANT.OVERLAYS.TOOLTIP,
    label: "Tooltip",
    icon: <Icon.Info className="w-4 h-4" />,
    element: <TooltipPage />,
    category: "overlays",
  },
  {
    path: ROUTES_CONSTANT.OVERLAYS.DRAWER,
    label: "Drawer",
    icon: <Icon.PanelLeft className="w-4 h-4" />,
    element: <DrawerPage />,
    category: "overlays",
  },
  {
    path: ROUTES_CONSTANT.OVERLAYS.DROPDOWN_MENU,
    label: "Dropdown Menu",
    icon: <Icon.ChevronDown className="w-4 h-4" />,
    element: <DropdownMenuPage />,
    category: "overlays",
  },
  {
    path: ROUTES_CONSTANT.OVERLAYS.CONTEXT_MENU,
    label: "Context Menu",
    icon: <Icon.Menu className="w-4 h-4" />,
    element: <ContextMenuPage />,
    category: "overlays",
  },
  {
    path: ROUTES_CONSTANT.OVERLAYS.MENU_BAR,
    label: "Menu Bar",
    icon: <Icon.Menu className="w-4 h-4" />,
    element: <MenuBarPage />,
    category: "overlays",
  },
  {
    path: ROUTES_CONSTANT.OVERLAYS.SHEET,
    label: "Sheet",
    icon: <Icon.PanelLeft className="w-4 h-4" />,
    element: <SheetPage />,
    category: "overlays",
  },
  {
    path: ROUTES_CONSTANT.OVERLAYS.PROGRESS,
    label: "Progress",
    icon: <Icon.SlidersHorizontal className="w-4 h-4" />,
    element: <ProgressPage />,
    category: "overlays",
  },
  // Standalone

  {
    path: ROUTES_CONSTANT.DEMO.LOGIN,
    label: "Login",
    icon: <Icon.User className="w-4 h-4" />,
    element: <LoginPage />,
    category: "demo",
    // standalone: true,
  },
  {
    path: ROUTES_CONSTANT.DEMO.LAYOUT_DEMO,
    label: "Layout Demo",
    icon: <Icon.PanelLeft className="w-4 h-4" />,
    element: <LayoutDemoPage />,
    category: "demo",
  },
  // Preview routes (standalone — rendered inside iframes)
  {
    path: ROUTES_CONSTANT.PREVIEW.LAYOUT_DEMO_1,
    label: "Preview Layout Demo 1",
    element: <LayoutDemo1Preview />,
    standalone: true,
  },
  {
    path: ROUTES_CONSTANT.PREVIEW.LAYOUT_DEMO_2,
    label: "Preview Layout Demo 2",
    element: <LayoutDemo2Preview />,
    standalone: true,
  },
  {
    path: ROUTES_CONSTANT.PREVIEW.LAYOUT_DEMO_3,
    label: "Preview Layout Demo 3",
    element: <LayoutDemo3Preview />,
    standalone: true,
  },
  {
    path: ROUTES_CONSTANT.PREVIEW.LAYOUT_LOGIN,
    label: "Preview Layout Login",
    element: <LayoutLoginPreview />,
    standalone: true,
  },
];

/**
 * Hàm flattenSearchableRoutes: Lấy tất cả các route có element (cần search) thành mảng phẳng.
 */
export const flattenSearchableRoutes = (
  routes: RouteConfig[] = ROUTES,
  parentPath = "",
): { label: string; value: string; icon?: React.ReactNode }[] => {
  let flat: { label: string; value: string; icon?: React.ReactNode }[] = [];

  routes.forEach((route) => {
    const combinedPath = [parentPath, route.prefix, route.path]
      .filter(Boolean)
      .join("/")
      .replace(/\/+/g, "/");

    if (route.element) {
      flat.push({
        label: route.label,
        value: combinedPath === "" ? "/" : combinedPath,
        icon: route.icon,
      });
    }

    if (route.children) {
      flat = [
        ...flat,
        ...flattenSearchableRoutes(route.children, combinedPath),
      ];
    }
  });

  return flat;
};
