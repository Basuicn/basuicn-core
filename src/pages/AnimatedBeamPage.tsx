import * as React from 'react';
import { PageHeader, ShowcaseCard } from '@components/ui/Showcase';
import { AnimatedBeam } from '@components/ui/animated-beam/AnimatedBeam';
import { cn } from '@/lib/utils/cn';
import * as Icon from '@/components/ui/icons';

// ─── Shared node ─────────────────────────────────────────────────────────────

const Circle = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; className?: string }
>(({ children, className }, ref) => (
  <div
    ref={ref}
    className={cn(
      'z-10 flex size-12 bg-white items-center justify-center rounded-full border-2 border-border  text-foreground shadow-sm',
      className
    )}
  >
    {children}
  </div>
));
Circle.displayName = 'Circle';

// ─── Demo 1: integrations hub ────────────────────────────────────────────────

const HubDemo = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const center = React.useRef<HTMLDivElement>(null);
  const n1 = React.useRef<HTMLDivElement>(null);
  const n2 = React.useRef<HTMLDivElement>(null);
  const n3 = React.useRef<HTMLDivElement>(null);
  const n4 = React.useRef<HTMLDivElement>(null);
  const n5 = React.useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative flex h-[320px] w-full max-w-xl items-stretch justify-between px-6"
    >
      <div className="flex flex-col items-center justify-center gap-5">
        <Circle ref={n1}>
          <Icon.Mail className="h-5 w-5" />
        </Circle>
        <Circle ref={n2}>
          <Icon.MessageSquare className="h-5 w-5" />
        </Circle>
        <Circle ref={n3}>
          <Icon.BarChart3 className="h-5 w-5" />
        </Circle>
        <Circle ref={n4}>
          <Icon.QrCode className="h-5 w-5" />
        </Circle>
        <Circle ref={n5}>
          <Icon.GitBranch className="h-5 w-5" />
        </Circle>
      </div>

      <div className="flex flex-col justify-center">
        <Circle ref={center} className="size-16 border-primary/40 bg-amber-50">
          <Icon.Sparkles className="h-7 w-7 text-primary" />
        </Circle>
      </div>

      <AnimatedBeam containerRef={containerRef} fromRef={n1} toRef={center} curvature={-10} duration={4} />
      <AnimatedBeam containerRef={containerRef} fromRef={n2} toRef={center} curvature={-5} duration={5} />
      <AnimatedBeam containerRef={containerRef} fromRef={n3} toRef={center} duration={6} />
      <AnimatedBeam containerRef={containerRef} fromRef={n4} toRef={center} curvature={-5} duration={5.5} />
      <AnimatedBeam containerRef={containerRef} fromRef={n5} toRef={center} curvature={-10} duration={4.5} />
    </div>
  );
};

// ─── Demo 2: simple A → B ────────────────────────────────────────────────────

const SimpleDemo = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const from = React.useRef<HTMLDivElement>(null);
  const to = React.useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative flex h-[180px] w-full max-w-md items-center justify-between px-10"
    >
      <Circle ref={from}>
        <Icon.Home className="h-5 w-5" />
      </Circle>
      <Circle ref={to}>
        <Icon.Settings className="h-5 w-5" />
      </Circle>
      <AnimatedBeam containerRef={containerRef} fromRef={from} toRef={to} />
    </div>
  );
};

// ─── Demo 3: bidirectional ───────────────────────────────────────────────────

const BidirectionalDemo = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const left = React.useRef<HTMLDivElement>(null);
  const right = React.useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative flex h-[200px] w-full max-w-md items-center justify-between px-10"
    >
      <Circle ref={left}>
        <Icon.Upload className="h-5 w-5" />
      </Circle>
      <Circle ref={right}>
        <Icon.Terminal className="h-5 w-5" />
      </Circle>
      <AnimatedBeam containerRef={containerRef} fromRef={left} toRef={right} curvature={40} duration={4} />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={left}
        toRef={right}
        curvature={-40}
        reverse
        duration={4}
      />
    </div>
  );
};

// ─── Page ────────────────────────────────────────────────────────────────────

const AnimatedBeamPage = () => (
  <div className="max-w-4xl">
    <PageHeader
      title="Animated Beam"
      description="Tia gradient động nối hai phần tử DOM bất kỳ. Tự tính đường cong SVG giữa các ref và vẽ lại khi layout đổi (ResizeObserver). Dùng để minh hoạ luồng dữ liệu, tích hợp, sơ đồ kết nối."
    />

    <ShowcaseCard
      title="Integrations hub"
      description="Nhiều node nối về một node trung tâm, mỗi tia một tốc độ để tạo cảm giác tự nhiên."
      code={`<div ref={containerRef} className="relative ...">
  <Circle ref={n1}><Icon.Mail /></Circle>
  <Circle ref={center}><Icon.Sparkles /></Circle>
  <AnimatedBeam containerRef={containerRef} fromRef={n1} toRef={center} curvature={-75} />
</div>`}
    >
      <HubDemo />
    </ShowcaseCard>

    <ShowcaseCard
      title="Hai node đơn giản"
      description="Tia thẳng A → B với các props mặc định."
      code={`<div ref={containerRef} className="relative ...">
  <Circle ref={from}><Icon.Home /></Circle>
  <Circle ref={to}><Icon.Settings /></Circle>
  <AnimatedBeam containerRef={containerRef} fromRef={from} toRef={to} />
</div>`}
    >
      <SimpleDemo />
    </ShowcaseCard>

    <ShowcaseCard
      title="Bidirectional"
      description="Hai tia cong ngược chiều — tia thứ hai dùng prop `reverse`."
      code={`<AnimatedBeam containerRef={containerRef} fromRef={left} toRef={right} curvature={40} />
<AnimatedBeam containerRef={containerRef} fromRef={left} toRef={right} curvature={-40} reverse />`}
    >
      <BidirectionalDemo />
    </ShowcaseCard>
  </div>
);

export default AnimatedBeamPage;
