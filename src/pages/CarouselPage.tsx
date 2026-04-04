import * as React from 'react';
import { useKeenSlider } from 'keen-slider/react';
import { PageHeader, ShowcaseCard } from "@components/ui/Showcase";
import {
  Carousel, CarouselSlide,
  CarouselPrev, CarouselNext,
  CarouselDots, CarouselProgress, CarouselCounter,
  useCarousel,
  Carousel3DPlugin,
} from "@components/ui/carousel/Carousel";
import { Badge } from "@components/ui/badge/Badge";
import { cn } from "@/lib/utils/cn";

// ─── Shared palette ───────────────────────────────────────────────────────────

const SLIDES = [
  { bg: 'from-violet-500 to-indigo-600',  solid: '#6d28d9', label: 'Violet'  },
  { bg: 'from-rose-500   to-pink-600',    solid: '#e11d48', label: 'Rose'    },
  { bg: 'from-amber-400  to-orange-500',  solid: '#d97706', label: 'Amber'   },
  { bg: 'from-emerald-500 to-teal-600',   solid: '#059669', label: 'Emerald' },
  { bg: 'from-sky-500    to-cyan-600',    solid: '#0284c7', label: 'Sky'     },
];

const GradientSlide = ({ from, label, index }: { from: string; label: string; index: number }) => (
  <div className={cn(
    'flex flex-col items-center justify-center h-52 rounded-xl',
    'bg-linear-to-br text-white font-semibold select-none',
    from,
  )}>
    <span className="text-3xl font-bold mb-1">{index + 1}</span>
    <span className="text-sm opacity-80">{label}</span>
  </div>
);

// ─── Background Rotation helpers ──────────────────────────────────────────────

// Lerp between two hex colours for smooth bg transition
function lerpHex(a: string, b: string, t: number): string {
  const parse = (h: string) => [
    parseInt(h.slice(1, 3), 16),
    parseInt(h.slice(3, 5), 16),
    parseInt(h.slice(5, 7), 16),
  ];
  const [ar, ag, ab] = parse(a);
  const [br, bg, bb] = parse(b);
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bv = Math.round(ab + (bb - ab) * t);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${bv.toString(16).padStart(2, '0')}`;
}

const COLORS = SLIDES.map((s) => s.solid);

const BG_LABELS = ['Violet', 'Rose', 'Amber', 'Emerald', 'Sky'];

function BackgroundRotationDemo() {
  const [bgColor, setBgColor] = React.useState(COLORS[0]);
  const [currentIdx, setCurrentIdx] = React.useState(0);

  const handleDetails = (progress: number) => {
    // progress goes 0→1 across all slides (with loop it wraps)
    const total = COLORS.length;
    const rawPos = progress * total;
    const fromIdx = Math.floor(rawPos) % total;
    const toIdx   = (fromIdx + 1) % total;
    const t       = rawPos - Math.floor(rawPos);
    setBgColor(lerpHex(COLORS[fromIdx], COLORS[toIdx], t));
  };

  return (
    <div
      className="rounded-2xl p-6 transition-none"
      style={{ background: bgColor }}
    >
      <Carousel
        loop
        onDetailsChanged={handleDetails}
        onSlideChange={setCurrentIdx}
        viewportClassName="rounded-lg"
      >
        {SLIDES.map((s, i) => (
          <CarouselSlide key={i}>
            <div className="flex flex-col items-center justify-center h-44 text-white select-none">
              <span className="text-5xl font-black mb-2">{i + 1}</span>
              <span className="text-base font-medium opacity-80">{s.label}</span>
            </div>
          </CarouselSlide>
        ))}
        <CarouselPrev className="border-white/30 bg-white/15 hover:bg-white/30 text-white" />
        <CarouselNext className="border-white/30 bg-white/15 hover:bg-white/30 text-white" />
        <CarouselDots className="mt-4" />
      </Carousel>
      <p className="text-center text-white/70 text-xs mt-3 font-medium tracking-wide">
        {BG_LABELS[currentIdx]}
      </p>
    </div>
  );
}

// ─── Thumbnail navigation ─────────────────────────────────────────────────────

function ThumbnailNav() {
  const [activeIdx, setActiveIdx] = React.useState(0);
  const mainRef   = React.useRef<ReturnType<typeof useCarousel>['instanceRef']['current']>(null);
  const thumbRef  = React.useRef<ReturnType<typeof useCarousel>['instanceRef']['current']>(null);

  return (
    <div className="space-y-2">
      <Carousel
        loop
        onSlideChange={(i) => {
          setActiveIdx(i);
          thumbRef.current?.moveToIdx(i);
        }}
        onCreated={(s) => { mainRef.current = s; }}
      >
        {SLIDES.map((s, i) => (
          <CarouselSlide key={i}>
            <GradientSlide from={s.bg} label={s.label} index={i} />
          </CarouselSlide>
        ))}
        <CarouselPrev />
        <CarouselNext />
      </Carousel>

      {/* Thumbnail strip */}
      <Carousel
        slidesPerView={5}
        spacing={8}
        drag={false}
        onCreated={(s) => { thumbRef.current = s; }}
      >
        {SLIDES.map((s, i) => (
          <CarouselSlide key={i}>
            <button
              onClick={() => {
                setActiveIdx(i);
                mainRef.current?.moveToIdx(i);
              }}
              className={cn(
                'w-full h-14 rounded-lg bg-gradient-to-br transition-all duration-200',
                s.bg,
                i === activeIdx
                  ? 'ring-2 ring-primary ring-offset-2 opacity-100'
                  : 'opacity-50 hover:opacity-80',
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          </CarouselSlide>
        ))}
      </Carousel>
    </div>
  );
}

// ─── Number input navigation ──────────────────────────────────────────────────

function NumberInputNav() {
  const [inputVal, setInputVal] = React.useState('1');
  const instanceRef = React.useRef<ReturnType<typeof useCarousel>['instanceRef']['current']>(null);
  const total = SLIDES.length;

  const goTo = (raw: string) => {
    const n = parseInt(raw);
    if (!isNaN(n) && n >= 1 && n <= total) {
      instanceRef.current?.moveToIdx(n - 1);
    }
  };

  return (
    <div className="space-y-3">
      <Carousel
        loop={false}
        onSlideChange={(i) => setInputVal(String(i + 1))}
        onCreated={(s) => { instanceRef.current = s; }}
      >
        {SLIDES.map((s, i) => (
          <CarouselSlide key={i}>
            <GradientSlide from={s.bg} label={s.label} index={i} />
          </CarouselSlide>
        ))}
        <CarouselPrev />
        <CarouselNext />
      </Carousel>

      <div className="flex items-center justify-center gap-2">
        <span className="text-sm text-muted-foreground">Đến slide</span>
        <input
          type="number"
          min={1}
          max={total}
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && goTo(inputVal)}
          onBlur={() => goTo(inputVal)}
          className="w-16 h-8 text-center text-sm rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <span className="text-sm text-muted-foreground">/ {total}</span>
        <button
          onClick={() => goTo(inputVal)}
          className="h-8 px-3 text-sm rounded-md bg-primary text-primary-foreground hover:bg-primary/80 transition-colors"
        >
          Go
        </button>
      </div>
    </div>
  );
}

// ─── 3D Carousel ─────────────────────────────────────────────────────────────

const CELL_SLIDES = [
  { bg: 'from-violet-500 to-indigo-600', label: '01' },
  { bg: 'from-rose-500   to-pink-600',   label: '02' },
  { bg: 'from-amber-400  to-orange-500', label: '03' },
  { bg: 'from-emerald-500 to-teal-600',  label: '04' },
  { bg: 'from-sky-500    to-cyan-600',   label: '05' },
  { bg: 'from-fuchsia-500 to-purple-600',label: '06' },
];
/**
 * 
 * @param CELL_SIZE Kích thước của slide
 * @param DEPTH Khoảng cách giữa các slide
 */
const CELL_SIZE = 300;
// Increase multiplier for more spacing between slides (visible depth effect)
const DEPTH = Math.round((CELL_SIZE / 2) / Math.tan(Math.PI / CELL_SLIDES.length) * 1.6);//điều chỉnh 1.6 lên nếu muốn xa hơn

function Carousel3DDemo() {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      renderMode: 'custom',
      mode: 'free-snap',
      selector: '.carousel-3d__cell',
      slides: { perView: 1 },
    },
    [Carousel3DPlugin(DEPTH)]
  );

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Scene — provides 3D perspective */}
      <div
        style={{
          perspective: '1200px',
          perspectiveOrigin: '50% 50%',
          width: CELL_SIZE * 2.2,
          height: CELL_SIZE,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          ref={sliderRef}
          className="keen-slider"
          style={{
            width: CELL_SIZE,
            height: CELL_SIZE,
            position: 'relative',
            transformStyle: 'preserve-3d',
            overflow: 'visible',
          }}
        >
          {CELL_SLIDES.map((s, i) => (
            <div
              key={i}
              className={cn(
                'carousel-3d__cell',
                'flex items-center justify-center',
                'rounded-2xl bg-linear-to-br text-white font-black text-4xl',
                'border-4 border-white/20 shadow-2xl',
                s.bg,
              )}
              style={{
                position: 'absolute',
                width: CELL_SIZE,
                height: CELL_SIZE,
                top: 0,
                left: 0,
                backfaceVisibility: 'visible',
              }}
            >
              {s.label}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => instanceRef.current?.prev()}
          className="h-9 w-9 rounded-full border border-border bg-background shadow-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
          aria-label="Previous"
        >
          ‹
        </button>
        <span className="text-sm text-muted-foreground">Kéo hoặc dùng nút</span>
        <button
          onClick={() => instanceRef.current?.next()}
          className="h-9 w-9 rounded-full border border-border bg-background shadow-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
          aria-label="Next"
        >
          ›
        </button>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const CarouselPage = () => (
  <div className="max-w-full">
    <PageHeader
      title="Carousel"
      description="Slider/carousel đa năng dùng keen-slider — loop, autoplay, vertical, dots, progress, counter, background rotation và hơn thế nữa."
    />

    {/* ── Default + Arrows + Dots ──────────────────────────── */}
    <ShowcaseCard title="Default — Arrows & Dots"
      code={`<Carousel loop>
  <CarouselSlide>…</CarouselSlide>
  <CarouselPrev />
  <CarouselNext />
  <CarouselDots />
</Carousel>`}
    >
      <div className="w-full">
        <Carousel loop>
          {SLIDES.map((s, i) => (
            <CarouselSlide key={i}><GradientSlide from={s.bg} label={s.label} index={i} /></CarouselSlide>
          ))}
          <CarouselPrev />
          <CarouselNext />
          <CarouselDots />
        </Carousel>
      </div>
    </ShowcaseCard>

    {/* ── AutoPlay ─────────────────────────────────────────── */}
    <ShowcaseCard title="AutoPlay" description="Tự động chuyển mỗi 2.5s. Hover để tạm dừng."
      code={`<Carousel loop autoPlay={2500}>
  …
  <CarouselDots />
</Carousel>`}
    >
      <div className="w-full">
        <Carousel loop autoPlay={2500}>
          {SLIDES.map((s, i) => (
            <CarouselSlide key={i}><GradientSlide from={s.bg} label={s.label} index={i} /></CarouselSlide>
          ))}
          <CarouselDots />
        </Carousel>
      </div>
    </ShowcaseCard>

    {/* ── Progress + Counter ───────────────────────────────── */}
    <ShowcaseCard title="Progress Bar + Counter"
      code={`<Carousel loop>
  …
  <CarouselPrev />
  <CarouselNext />
  <div className="flex items-center gap-3 mt-3">
    <CarouselCounter />
    <CarouselProgress className="flex-1 mt-0" />
  </div>
</Carousel>`}
    >
      <div className="w-full">
        <Carousel loop>
          {SLIDES.map((s, i) => (
            <CarouselSlide key={i}><GradientSlide from={s.bg} label={s.label} index={i} /></CarouselSlide>
          ))}
          <CarouselPrev />
          <CarouselNext />
          <div className="flex items-center gap-3 mt-3 px-1">
            <CarouselCounter />
            <CarouselProgress className="flex-1 mt-0" />
          </div>
        </Carousel>
      </div>
    </ShowcaseCard>

    {/* ── Multiple per view ────────────────────────────────── */}
    <ShowcaseCard title="Multiple Per View" description="Responsive breakpoints — 1→2→3 slides."
      code={`<Carousel loop slidesPerView={1} spacing={16}
  breakpoints={{
    '(min-width: 640px)':  { slides: { perView: 2, spacing: 16 } },
    '(min-width: 1024px)': { slides: { perView: 3, spacing: 16 } },
  }}
>…</Carousel>`}
    >
      <div className="w-full">
        <Carousel loop slidesPerView={1} spacing={16} breakpoints={{
          '(min-width: 640px)':  { slides: { perView: 2, spacing: 16 } },
          '(min-width: 1024px)': { slides: { perView: 3, spacing: 16 } },
        }}>
          {SLIDES.map((s, i) => (
            <CarouselSlide key={i}><GradientSlide from={s.bg} label={s.label} index={i} /></CarouselSlide>
          ))}
          <CarouselPrev />
          <CarouselNext />
          <CarouselDots />
        </Carousel>
      </div>
    </ShowcaseCard>

    {/* ── Vertical ─────────────────────────────────────────── */}
    <ShowcaseCard title="Vertical Orientation"
      description='Dùng prop `height` để đặt chiều cao container — bắt buộc cho vertical mode.'
      code={`<Carousel vertical loop height="280px">
  …
  <CarouselDots />
</Carousel>`}
    >
      <div className="w-full max-w-sm mx-auto">
        <Carousel vertical loop height="280px">
          {SLIDES.map((s, i) => (
            <CarouselSlide key={i}>
              <div className={cn(
                'flex flex-col items-center justify-center h-full',
                'bg-gradient-to-br text-white font-semibold rounded-xl',
                s.bg,
              )}>
                <span className="text-4xl font-black">{i + 1}</span>
                <span className="text-sm opacity-80 mt-1">{s.label}</span>
              </div>
            </CarouselSlide>
          ))}
          <CarouselDots />
        </Carousel>
      </div>
    </ShowcaseCard>

    {/* ── Free scroll ──────────────────────────────────────── */}
    <ShowcaseCard title="Free Scroll" description='mode="free-snap" — kéo tự do, snap về gần nhất.'
      code={`<Carousel mode="free-snap" slidesPerView={2} spacing={12}>…</Carousel>`}
    >
      <div className="w-full">
        <Carousel mode="free-snap" slidesPerView={1} spacing={12}
          breakpoints={{ '(min-width: 640px)': { slides: { perView: 2, spacing: 12 } } }}
        >
          {SLIDES.map((s, i) => (
            <CarouselSlide key={i}><GradientSlide from={s.bg} label={s.label} index={i} /></CarouselSlide>
          ))}
          <CarouselDots />
        </Carousel>
      </div>
    </ShowcaseCard>

    {/* ── No loop — edge disabled ───────────────────────────── */}
    <ShowcaseCard title="No Loop — Edge Disabled" description="Prev/Next tự disable ở slide đầu/cuối."
      code={`<Carousel loop={false}>…</Carousel>`}
    >
      <div className="w-full">
        <Carousel loop={false}>
          {SLIDES.map((s, i) => (
            <CarouselSlide key={i}><GradientSlide from={s.bg} label={s.label} index={i} /></CarouselSlide>
          ))}
          <CarouselPrev />
          <CarouselNext />
          <CarouselDots />
        </Carousel>
      </div>
    </ShowcaseCard>

    {/* ── Card content ─────────────────────────────────────── */}
    <ShowcaseCard title="Card Content" description="Nội dung thực tế với card, ảnh, badge."
      code={`<Carousel loop slidesPerView={1} breakpoints={…}>
  <CarouselSlide>
    <div className="rounded-xl border …">…</div>
  </CarouselSlide>
</Carousel>`}
    >
      <div className="w-full">
        <Carousel loop slidesPerView={1} spacing={16}
          breakpoints={{ '(min-width: 640px)': { slides: { perView: 2, spacing: 16 } } }}
        >
          {[
            { title: 'Thiết kế giao diện',  tag: 'UI/UX',   color: 'from-violet-500 to-indigo-600' },
            { title: 'Phát triển Frontend', tag: 'React',   color: 'from-rose-500 to-pink-600'     },
            { title: 'Tối ưu hiệu năng',    tag: 'Perf',    color: 'from-amber-400 to-orange-500'  },
            { title: 'Kiểm thử tự động',    tag: 'Testing', color: 'from-emerald-500 to-teal-600'  },
          ].map((item, i) => (
            <CarouselSlide key={i}>
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                <div className={cn('h-32 bg-gradient-to-br', item.color)} />
                <div className="p-4 space-y-2">
                  <Badge variant="soft-primary" size="sm">{item.tag}</Badge>
                  <p className="font-semibold text-foreground text-sm">{item.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">Mô tả ngắn gọn về nội dung card này trong carousel.</p>
                </div>
              </div>
            </CarouselSlide>
          ))}
          <CarouselPrev />
          <CarouselNext />
          <CarouselDots />
        </Carousel>
      </div>
    </ShowcaseCard>

    {/* ── 3D Rotation ──────────────────────────────────────── */}
    <ShowcaseCard
      title="3D Rotation Carousel"
      description="renderMode='custom' + Carousel3DPlugin — mỗi slide được đặt xung quanh vòng tròn 3D bằng rotateY + translateZ."
      code={`import { Carousel3DPlugin } from '@/components/ui/carousel/Carousel';

const DEPTH = 180; // translateZ radius in px

const [sliderRef] = useKeenSlider(
  {
    loop: true,
    renderMode: 'custom',
    mode: 'free-snap',
    selector: '.carousel-3d__cell',
  },
  [Carousel3DPlugin(DEPTH)]
);

// Scene wrapper cần perspective + preserve-3d
<div style={{ perspective: '1000px', width: '200px', height: '200px' }}>
  <div ref={sliderRef}
       className="keen-slider"
       style={{ transformStyle: 'preserve-3d' }}>
    <div className="carousel-3d__cell keen-slider__slide">1</div>
    …
  </div>
</div>`}
    >
      <div className="w-full py-4">
        <Carousel3DDemo />
      </div>
    </ShowcaseCard>

    {/* ── Wheel controls ───────────────────────────────────── */}
    <ShowcaseCard title="Wheel Controls" description="Cuộn chuột để chuyển slide."
      code={`<Carousel loop wheelControls>…</Carousel>`}
    >
      <div className="w-full">
        <Carousel loop wheelControls>
          {SLIDES.map((s, i) => (
            <CarouselSlide key={i}><GradientSlide from={s.bg} label={s.label} index={i} /></CarouselSlide>
          ))}
          <CarouselDots />
        </Carousel>
      </div>
    </ShowcaseCard>

    {/* ════════════════════════════════════════════════════════
        BACKGROUND ROTATION
    ════════════════════════════════════════════════════════ */}
    <ShowcaseCard
      title="Background Rotation"
      description="Background lerp màu mượt theo progress — dùng onDetailsChanged."
      code={`function BackgroundRotationDemo() {
  const [bgColor, setBgColor] = React.useState('#6d28d9');

  const handleDetails = (progress: number) => {
    const rawPos = progress * COLORS.length;
    const from = Math.floor(rawPos) % COLORS.length;
    const to   = (from + 1) % COLORS.length;
    const t    = rawPos - Math.floor(rawPos);
    setBgColor(lerpHex(COLORS[from], COLORS[to], t));
  };

  return (
    <div style={{ background: bgColor }} className="rounded-2xl p-6">
      <Carousel loop onDetailsChanged={handleDetails}>
        …
        <CarouselPrev className="border-white/30 bg-white/15 text-white" />
        <CarouselNext className="border-white/30 bg-white/15 text-white" />
        <CarouselDots />
      </Carousel>
    </div>
  );
}`}
    >
      <div className="w-full">
        <BackgroundRotationDemo />
      </div>
    </ShowcaseCard>

    {/* ════════════════════════════════════════════════════════
        MISC
    ════════════════════════════════════════════════════════ */}

    {/* Thumbnail navigation */}
    <ShowcaseCard
      title="Misc — Thumbnail Navigation"
      description="Main carousel + thumbnail strip liên kết với nhau qua ref."
      code={`// Two Carousel instances linked by shared instanceRef
<Carousel onCreated={(s) => { mainRef.current = s; }}
          onSlideChange={(i) => thumbRef.current?.moveToIdx(i)}>
  {slides}
</Carousel>

<Carousel slidesPerView={5} drag={false}
          onCreated={(s) => { thumbRef.current = s; }}>
  {slides.map((_, i) => (
    <CarouselSlide key={i}>
      <button onClick={() => mainRef.current?.moveToIdx(i)} />
    </CarouselSlide>
  ))}
</Carousel>`}
    >
      <div className="w-full">
        <ThumbnailNav />
      </div>
    </ShowcaseCard>

    {/* Number input navigation */}
    <ShowcaseCard
      title="Misc — Number Input Navigation"
      description="Nhập số vào ô input rồi Enter / click Go để nhảy đến slide."
      code={`<Carousel loop={false} onCreated={(s) => { instanceRef.current = s; }}>
  …
</Carousel>
<input type="number" value={inputVal} onKeyDown={(e) => {
  if (e.key === 'Enter') instanceRef.current?.moveToIdx(Number(inputVal) - 1);
}} />`}
    >
      <div className="w-full">
        <NumberInputNav />
      </div>
    </ShowcaseCard>

    {/* Drag disabled */}
    <ShowcaseCard
      title="Misc — Drag Disabled"
      description="Chỉ điều hướng bằng nút — không kéo được."
      code={`<Carousel drag={false} loop>…</Carousel>`}
    >
      <div className="w-full">
        <Carousel drag={false} loop>
          {SLIDES.map((s, i) => (
            <CarouselSlide key={i}><GradientSlide from={s.bg} label={s.label} index={i} /></CarouselSlide>
          ))}
          <CarouselPrev />
          <CarouselNext />
        </Carousel>
      </div>
    </ShowcaseCard>

    {/* Mixed content */}
    <ShowcaseCard
      title="Misc — Mixed Content Slides"
      description="Mỗi slide có layout và nội dung khác nhau."
      code={`<Carousel loop>
  <CarouselSlide>
    <div className="h-52 flex items-center justify-center …">
      <Badge>Notification</Badge> …
    </div>
  </CarouselSlide>
  …
</Carousel>`}
    >
      <div className="w-full">
        <Carousel loop>
          {/* Slide 1: notification style */}
          <CarouselSlide>
            <div className="h-52 rounded-xl border border-border bg-card flex flex-col items-center justify-center gap-3 p-6">
              <Badge variant="soft-primary" pulse>Live Update</Badge>
              <p className="text-xl font-bold text-foreground text-center">12 new notifications</p>
              <p className="text-sm text-muted-foreground text-center">Tap to review your latest activity</p>
            </div>
          </CarouselSlide>
          {/* Slide 2: stat card */}
          <CarouselSlide>
            <div className="h-52 rounded-xl bg-gradient-to-br from-primary to-indigo-600 text-white flex flex-col items-center justify-center gap-2 p-6">
              <p className="text-sm font-medium opacity-80 uppercase tracking-widest">Total Revenue</p>
              <p className="text-4xl font-black">$124,592</p>
              <Badge variant="glass" size="sm">+18.4% this month</Badge>
            </div>
          </CarouselSlide>
          {/* Slide 3: quote */}
          <CarouselSlide>
            <div className="h-52 rounded-xl border border-border bg-muted/30 flex flex-col items-center justify-center gap-3 p-8 text-center">
              <p className="text-2xl">"</p>
              <p className="text-base font-medium text-foreground italic leading-relaxed">
                Design is not just what it looks like. Design is how it works.
              </p>
              <p className="text-sm text-muted-foreground">— Steve Jobs</p>
            </div>
          </CarouselSlide>
          {/* Slide 4: cta */}
          <CarouselSlide>
            <div className="h-52 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex flex-col items-center justify-center gap-4 p-6">
              <Badge variant="glass" size="sm">Special Offer</Badge>
              <p className="text-2xl font-bold">Get 3 months free</p>
              <button className="px-6 py-2 rounded-full bg-white text-emerald-700 font-semibold text-sm hover:bg-white/90 transition-colors">
                Claim Now
              </button>
            </div>
          </CarouselSlide>
          <CarouselPrev />
          <CarouselNext />
          <CarouselDots />
        </Carousel>
      </div>
    </ShowcaseCard>
  </div>
);

export default CarouselPage;
