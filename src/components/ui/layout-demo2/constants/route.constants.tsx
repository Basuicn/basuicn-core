import React from "react";
import {
  BookOpen,
  ChevronsUpDown,
  FormInput,
  Info,
  LayoutGrid,
  ListChecks,
  Minus,
  ScrollText,
  Settings,
  Square,
  Tag,
  TextCursorInput,
  UserCircle,
} from "lucide-react";

interface SidebarItem {
  title: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string;
}

interface SidebarSection {
  title: string;
  icon?: React.ReactNode;
  collapsible: boolean;
  defaultOpen?: boolean;
  items: SidebarItem[];
}

export const routesConfig: SidebarSection[] = [
  {
    title: "Tổng quan",
    icon: <BookOpen className="w-4 h-4" />,
    collapsible: false,
    items: [
      {
        title: "Giới thiệu",
        href: "/blocks",
        icon: <Info className="w-4 h-4" />,
      },
      {
        title: "Guideline & Cài đặt CLI",
        href: "/#",
        icon: <Settings className="w-4 h-4" />,
        badge: "CLI",
      },
    ],
  },
  {
    title: "General",
    icon: <LayoutGrid className="w-4 h-4" />,
    collapsible: true,
    defaultOpen: true,
    items: [
      {
        title: "Button",
        href: "/#",
        icon: <Square className="w-4 h-4" />,
      },
      {
        title: "Badge",
        href: "/#",
        icon: <Tag className="w-4 h-4" />,
      },
      {
        title: "Avatar",
        href: "/#",
        icon: <UserCircle className="w-4 h-4" />,
      },
      {
        title: "Separator",
        href: "/#",
        icon: <Minus className="w-4 h-4" />,
      },
    ],
  },
  {
    title: "Forms",
    icon: <FormInput className="w-4 h-4" />,
    collapsible: true,
    defaultOpen: true,
    items: [
      {
        title: "Input",
        href: "/components-page/input",
        icon: <TextCursorInput className="w-4 h-4" />,
      },
      {
        title: "Textarea",
        href: "/components-page/textarea",
        icon: <ScrollText className="w-4 h-4" />,
      },
      {
        title: "Select",
        href: "/components-page/select",
        icon: <ChevronsUpDown className="w-4 h-4" />,
      },
      {
        title: "Checkbox",
        href: "/components-page/checkbox",
        icon: <ListChecks className="w-4 h-4" />,
      },
    ],
  },
];
