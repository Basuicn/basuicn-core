"use client";

import React, { useState, useRef } from "react";
import {
  Button,
  Separator,
  Code,
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
import {
  Monitor,
  Tablet,
  Smartphone,
  Maximize,
  RotateCw,
  Terminal,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

type DeviceType = "desktop" | "tablet" | "mobile";

interface BlockViewerProps {
  /** URL preview route, ví dụ "/preview/sidebar-1" */
  src: string;
  cliCommand?: string;
  defaultDevice?: DeviceType;
  /** href để mở full screen trong tab mới — mặc định dùng src */
  fullScreenHref?: string;
  minHeight?: number | string;
}

/** Tailwind v4 default breakpoints: sm=640, md=768, lg=1024, xl=1280 */
const DEVICE_WIDTHS: Record<DeviceType, string> = {
  desktop: "100%",
  tablet: "768px", // md
  mobile: "640px", // sm
};

const DEVICE_LABELS: Record<DeviceType, string> = {
  desktop: "Desktop",
  tablet: "Tablet (md · 768px)",
  mobile: "Mobile (sm · 640px)",
};

export default function BlockViewer({
  src,
  cliCommand,
  defaultDevice = "desktop",
  fullScreenHref,
  minHeight = 800,
}: BlockViewerProps) {
  const [device, setDevice] = useState<DeviceType>(defaultDevice);
  const [key, setKey] = useState(0);

  // Base UI Tabs gọi focus() khi mount không có preventScroll,
  // khiến browser scroll đến BlockViewer khi navigate client-side.
  // Capture scrollY trước render, restore sau paint.
  const savedScrollY = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  React.useEffect(() => {
    window.scrollTo({ top: savedScrollY.current, behavior: "instant" });
  }, []);

  const resolvedHeight =
    typeof minHeight === "number" ? `${minHeight}px` : minHeight;

  const handleReload = () => setKey((k) => k + 1);

  const handleFullScreen = () => {
    window.open(fullScreenHref ?? src, "_blank");
  };

  return (
    <div className="space-y-3">
      {/* ── Toolbar ─────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1.5">
          <Tabs
            value={device}
            onValueChange={(v) => setDevice(v as DeviceType)}
          >
            <TabsList>
              <TabsTrigger value="desktop">
                <Monitor className="w-4 h-4" />
              </TabsTrigger>
              <TabsTrigger value="tablet">
                <Tablet className="w-4 h-4" />
              </TabsTrigger>
              <TabsTrigger value="mobile">
                <Smartphone className="w-4 h-4" />
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Separator orientation="vertical" className="h-6 mx-1" />

          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleReload}
            title="Reload"
            className="p-2"
          >
            <RotateCw className="w-4 h-4" />
          </Button>

          <Button
            variant="secondary"
            size="icon-sm"
            onClick={handleFullScreen}
            title="Full screen"
            className="p-2"
          >
            <Maximize className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground hidden sm:block">
            {DEVICE_LABELS[device]}
          </span>

          {cliCommand && (
            <Code copyable>
              <Terminal className="w-4 h-4" /> {cliCommand}
            </Code>
          )}
        </div>
      </div>

      {/* ── Stage ───────────────────────────────────────────────── */}
      <div
        className={cn(
          "relative border border-border rounded-xl bg-muted/30 overflow-hidden",
          "flex justify-center",
        )}
        style={{ minHeight: resolvedHeight }}
      >
        <iframe
          key={key}
          src={src}
          title="Block preview"
          style={{
            width: DEVICE_WIDTHS[device],
            height: resolvedHeight,
            border: "none",
            transition: "width 300ms ease-in-out",
          }}
        />
      </div>
    </div>
  );
}
