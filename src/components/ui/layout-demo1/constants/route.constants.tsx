import React from "react";
import { BookOpen, Info, Settings } from "lucide-react";

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
];
