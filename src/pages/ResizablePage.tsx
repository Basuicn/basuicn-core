import * as React from 'react';
import { PageHeader, ShowcaseCard } from '@components/ui/Showcase';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@components/ui/resizable/Resizable';

// ─── Shared placeholder panel content ────────────────────────

function Pane({
  label,
  sub,
  color = 'default',
  className,
}: {
  label: string;
  sub?: string;
  color?: 'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger';
  className?: string;
}) {
  const colorMap = {
    default: 'bg-muted/60 text-foreground',
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary text-secondary-foreground',
    accent: 'bg-accent text-accent-foreground',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    danger: 'bg-danger/10 text-danger',
  };

  return (
    <div
      className={`h-full w-full flex flex-col items-center justify-center gap-1 ${colorMap[color]} ${className ?? ''}`}
    >
      <span className="text-sm font-semibold">{label}</span>
      {sub && <span className="text-xs opacity-60">{sub}</span>}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────

const ResizablePage = () => (
  <div className="max-w-4xl">
    <PageHeader
      title="Resizable"
      description="Panels có thể kéo để thay đổi kích thước, hỗ trợ nhiều layout và kiểu handle."
    />

    {/* ── Horizontal two-panel ──────────────────────────────── */}
    <ShowcaseCard
      title="Horizontal — hai panel trái / phải"
      description="Kéo thanh ở giữa để thay đổi kích thước."
    >
      <div className="w-full h-48 rounded-lg border border-border overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={50} minSize={20}>
            <Pane label="Left" sub="defaultSize 50%" color="primary" />
          </ResizablePanel>
          <ResizableHandle variant="handle" />
          <ResizablePanel defaultSize={50} minSize={20}>
            <Pane label="Right" sub="defaultSize 50%" color="secondary" />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </ShowcaseCard>

    {/* ── Vertical two-panel ───────────────────────────────── */}
    <ShowcaseCard
      title="Vertical — hai panel trên / dưới"
      description="Kéo thanh ngang để resize."
    >
      <div className="w-full h-64 rounded-lg border border-border overflow-hidden">
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={60} minSize={20}>
            <Pane label="Top" sub="defaultSize 60%" color="primary" />
          </ResizablePanel>
          <ResizableHandle variant="handle" />
          <ResizablePanel defaultSize={40} minSize={20}>
            <Pane label="Bottom" sub="defaultSize 40%" color="secondary" />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </ShowcaseCard>

    {/* ── Three panels ─────────────────────────────────────── */}
    <ShowcaseCard
      title="Ba panel — Sidebar + Content + Aside"
      description="Layout điển hình cho editor hoặc dashboard."
    >
      <div className="w-full h-56 rounded-lg border border-border overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={20} minSize={10} maxSize={35}>
            <Pane label="Sidebar" sub="20%" color="accent" />
          </ResizablePanel>
          <ResizableHandle variant="line" />
          <ResizablePanel defaultSize={55} minSize={25}>
            <Pane label="Content" sub="55%" color="primary" />
          </ResizablePanel>
          <ResizableHandle variant="line" />
          <ResizablePanel defaultSize={25} minSize={10} maxSize={40}>
            <Pane label="Aside" sub="25%" color="secondary" />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </ShowcaseCard>

    {/* ── Nested panels ────────────────────────────────────── */}
    <ShowcaseCard
      title="Nested — Editor + Terminal / Preview"
      description="Panels lồng nhau cho layout phức tạp kiểu IDE."
    >
      <div className="w-full h-72 rounded-lg border border-border overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          {/* Left: editor + terminal */}
          <ResizablePanel defaultSize={55} minSize={25}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={70} minSize={20}>
                <Pane label="Editor" sub="code area" color="primary" />
              </ResizablePanel>
              <ResizableHandle variant="bar" />
              <ResizablePanel defaultSize={30} minSize={10}>
                <Pane label="Terminal" sub="output" color="default" />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
          <ResizableHandle variant="handle" />
          {/* Right: live preview */}
          <ResizablePanel defaultSize={45} minSize={20}>
            <Pane label="Preview" sub="live output" color="success" />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </ShowcaseCard>

    {/* ── Handle variants ──────────────────────────────────── */}
    <ShowcaseCard
      title="Handle Variants"
      description="line · bar · handle · ghost — mỗi variant có kiểu hiển thị khác nhau."
    >
      <div className="w-full grid grid-cols-2 gap-4">
        {(
          [
            { variant: 'line', label: 'line', desc: 'Thanh mảnh mặc định' },
            { variant: 'bar', label: 'bar', desc: 'Dày hơn, pill centered' },
            { variant: 'handle', label: 'handle', desc: 'Grip pill hiện khi hover' },
            { variant: 'ghost', label: 'ghost', desc: 'Vô hình, chỉ đổi cursor' },
          ] as const
        ).map(({ variant, label, desc }) => (
          <div key={variant} className="space-y-1">
            <div className="text-xs font-mono font-semibold text-primary">
              variant=&quot;{label}&quot;
            </div>
            <div className="text-[11px] text-muted-foreground mb-2">{desc}</div>
            <div className="h-32 rounded-lg border border-border overflow-hidden">
              <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={50} minSize={20}>
                  <Pane label="A" color="primary" />
                </ResizablePanel>
                <ResizableHandle variant={variant} />
                <ResizablePanel defaultSize={50} minSize={20}>
                  <Pane label="B" color="secondary" />
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </div>
        ))}
      </div>
    </ShowcaseCard>

    {/* ── Collapsible panels ───────────────────────────────── */}
    <ShowcaseCard
      title="Collapsible Panels"
      description="Panel có thể thu nhỏ hoàn toàn khi kéo đến minSize."
    >
      <div className="w-full h-52 rounded-lg border border-border overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            defaultSize={25}
            minSize={5}
            collapsible
            collapsedSize={4}
          >
            <Pane label="Collapsible Sidebar" sub="kéo trái để thu nhỏ" color="accent" />
          </ResizablePanel>
          <ResizableHandle variant="handle" withGrip />
          <ResizablePanel defaultSize={50} minSize={20}>
            <Pane label="Main" color="primary" />
          </ResizablePanel>
          <ResizableHandle variant="handle" withGrip />
          <ResizablePanel
            defaultSize={25}
            minSize={5}
            collapsible
            collapsedSize={4}
          >
            <Pane label="Collapsible Panel" sub="kéo phải để thu nhỏ" color="warning" />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </ShowcaseCard>

    {/* ── Persistent layout ────────────────────────────────── */}
    <ShowcaseCard
      title="Three-Panel Equal Split"
      description="Ba panel cân bằng với handle variant bar."
    >
      <div className="w-full h-48 rounded-lg border border-border overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={33} minSize={15}>
            <Pane label="Panel A" sub="defaultSize 33%" color="primary" />
          </ResizablePanel>
          <ResizableHandle variant="bar" />
          <ResizablePanel defaultSize={34} minSize={15}>
            <Pane label="Panel B" sub="defaultSize 34%" color="secondary" />
          </ResizablePanel>
          <ResizableHandle variant="bar" />
          <ResizablePanel defaultSize={33} minSize={15}>
            <Pane label="Panel C" sub="defaultSize 33%" color="success" />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </ShowcaseCard>

    {/* ── withGrip on line/ghost ───────────────────────────── */}
    <ShowcaseCard
      title="withGrip prop"
      description="Thêm grip dots vào bất kỳ variant nào bằng withGrip."
    >
      <div className="w-full h-40 rounded-lg border border-border overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={50} minSize={20}>
            <Pane label="Panel A" color="primary" />
          </ResizablePanel>
          <ResizableHandle variant="line" withGrip />
          <ResizablePanel defaultSize={50} minSize={20}>
            <Pane label="Panel B" color="secondary" />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </ShowcaseCard>

    {/* ── Disabled ─────────────────────────────────────────── */}
    <ShowcaseCard
      title="Disabled Handle"
      description="Handle bị vô hiệu hoá — không thể kéo."
    >
      <div className="w-full h-40 rounded-lg border border-border overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={40} minSize={20}>
            <Pane label="Fixed 40%" sub="không thể resize" color="danger" />
          </ResizablePanel>
          <ResizableHandle variant="line" disabled />
          <ResizablePanel defaultSize={60} minSize={20}>
            <Pane label="Fixed 60%" color="default" />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </ShowcaseCard>
  </div>
);

export default ResizablePage;
