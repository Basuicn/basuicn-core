import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs/Tabs";
import BlockViewer from "@/components/ui/BlockViewer";
import { PageHeader } from "@/components/ui/Showcase";

type LayoutTab = "layout-1" | "layout-2" | "layout-3" | "login";

const TABS: { value: LayoutTab; label: string; src: string; description: string }[] = [
  {
    value: "layout-1",
    label: "Layout 1",
    src: "/preview/layout-demo-1",
    description: "Sidebar có border rõ ràng, nội dung có padding cố định.",
  },
  {
    value: "layout-2",
    label: "Layout 2",
    src: "/preview/layout-demo-2",
    description: "Sidebar thu gọn được, header bám đỉnh, nội dung full-height.",
  },
  {
    value: "layout-3",
    label: "Layout 3",
    src: "/preview/layout-demo-3",
    description: "Sidebar ẩn hoàn toàn khi thu gọn, handle chỉ hiện khi mở.",
  },
  {
    value: "login",
    label: "Login Layout",
    src: "/preview/layout-login",
    description: "Layout full-screen đăng nhập — split branding + form.",
  },
];

export default function LayoutDemoPage() {
  const [active, setActive] = useState<LayoutTab>("layout-1");

  const current = TABS.find((t) => t.value === active)!;

  return (
    <div className="max-w-6xl mx-auto py-8 space-y-6">
      <PageHeader
        title="Layout Demo"
        description="Các mẫu layout ứng dụng — sidebar resizable, header cố định và login fullscreen. Xem preview trực tiếp theo từng thiết bị."
      />

      <Tabs value={active} onValueChange={(v) => setActive(v as LayoutTab)}>
        <TabsList>
          {TABS.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <p className="text-sm text-muted-foreground">{current.description}</p>

      <BlockViewer
        key={active}
        src={current.src}
        fullScreenHref={current.src}
        minHeight={680}
      />
    </div>
  );
}
