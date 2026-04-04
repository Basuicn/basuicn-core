import * as React from 'react';
import { useKeenSlider, type KeenSliderOptions, type KeenSliderPlugin, type KeenSliderInstance } from 'keen-slider/react';
import { tv } from 'tailwind-variants';
import { cn } from '@/lib/utils/cn';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'keen-slider/keen-slider.min.css';

// ─── Variants ─────────────────────────────────────────────────────────────────

const carouselVariants = tv({
  slots: {
    root:     'relative w-full select-none',
    viewport: 'keen-slider overflow-hidden rounded-xl',
    slide:    'keen-slider__slide',
    arrow:    [
      'absolute top-1/2 -translate-y-1/2 z-10',
      'flex items-center justify-center',
      'h-9 w-9 rounded-full',
      'bg-background/80 backdrop-blur-sm border border-border shadow-md',
      'text-foreground transition-all duration-150',
      'hover:bg-background hover:scale-105',
      'disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
    ],
    dotsWrapper: 'flex justify-center gap-1.5 mt-3',
    dot: [
      'h-1.5 rounded-full bg-border transition-all duration-300',
      'hover:bg-muted-foreground cursor-pointer',
    ],
  },
});

const { root, viewport, slide, arrow, dotsWrapper, dot } = carouselVariants();

// ─── Context ──────────────────────────────────────────────────────────────────

interface CarouselContextValue {
  instanceRef: React.MutableRefObject<KeenSliderInstance | null>;
  currentSlide: number;
  slideCount: number;
  loop: boolean;
}

const CarouselContext = React.createContext<CarouselContextValue | null>(null);

function useCarousel() {
  const ctx = React.useContext(CarouselContext);
  if (!ctx) throw new Error('useCarousel must be used within <Carousel>');
  return ctx;
}

// ─── AutoPlay plugin ──────────────────────────────────────────────────────────

export function AutoPlayPlugin(interval = 3000): KeenSliderPlugin {
  return (slider) => {
    let timeout: ReturnType<typeof setTimeout>;
    let mouseOver = false;

    const clearNext = () => clearTimeout(timeout);
    const next = () => {
      clearNext();
      timeout = setTimeout(() => {
        if (!mouseOver) slider.next();
      }, interval);
    };

    slider.on('created', () => {
      slider.container.addEventListener('mouseover', () => { mouseOver = true; clearNext(); });
      slider.container.addEventListener('mouseout',  () => { mouseOver = false; next(); });
      next();
    });
    slider.on('dragStarted',  clearNext);
    slider.on('animationEnded', next);
    slider.on('updated',      next);
    slider.on('destroyed',    clearNext);
  };
}

// ─── WheelControls plugin ────────────────────────────────────────────────────

export const WheelControlsPlugin: KeenSliderPlugin = (slider) => {
  let touchTimeout: ReturnType<typeof setTimeout>;
  let position = { x: 0, y: 0 };
  let wheelActive = false;

  const dispatch = (e: WheelEvent, name: string) => {
    position.x -= e.deltaX;
    position.y -= e.deltaY;
    slider.container.dispatchEvent(new CustomEvent(name, { detail: { x: position.x, y: position.y } }));
  };

  const wheelStart = (e: WheelEvent) => {
    position = { x: e.pageX, y: e.pageY };
    dispatch(e, 'ksDragStart');
  };

  const wheel = (e: WheelEvent) => {
    dispatch(e, 'ksDrag');
  };

  const wheelEnd = (e: WheelEvent) => {
    dispatch(e, 'ksDragEnd');
  };

  const eventWheel = (e: WheelEvent) => {
    if (!wheelActive) {
      wheelStart(e);
      wheelActive = true;
    }
    wheel(e);
    clearTimeout(touchTimeout);
    touchTimeout = setTimeout(() => {
      wheelActive = false;
      wheelEnd(e);
    }, 50);
  };

  slider.on('created', () => {
    slider.container.addEventListener('wheel', eventWheel, { passive: true });
  });
  slider.on('destroyed', () => {
    slider.container.removeEventListener('wheel', eventWheel);
  });
};

// ─── MutationPlugin ───────────────────────────────────────────────────────────

export const MutationPlugin: KeenSliderPlugin = (slider) => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(() => slider.update());
  });
  slider.on('created', () => {
    observer.observe(slider.container, { childList: true });
  });
  slider.on('destroyed', () => observer.disconnect());
};

// ─── Carousel3DPlugin ─────────────────────────────────────────────────────────

/**
 * 3-D rotating carousel plugin.
 * Wrap the `keen-slider` div inside a perspective scene:
 *   <div style={{ perspective: '1000px' }}>
 *     <div ref={sliderRef} style={{ transformStyle: 'preserve-3d' }} …>
 *       {slides}
 *     </div>
 *   </div>
 *
 * @param depth  translateZ radius in px (default 280). For N slides of width W:
 *               depth ≈ (W / 2) / Math.tan(Math.PI / N)
 */
export function Carousel3DPlugin(depth = 280): KeenSliderPlugin {
  return (slider) => {
    function applyRotation() {
      const deg = 360 * slider.track.details.progress;
      slider.container.style.transform = `translateZ(-${depth}px) rotateY(${-deg}deg)`;
    }

    slider.on('created', () => {
      const perSlide = 360 / slider.slides.length;
      slider.slides.forEach((el, i) => {
        el.style.transform = `rotateY(${perSlide * i}deg) translateZ(${depth}px)`;
      });
      applyRotation();
    });

    slider.on('detailsChanged', applyRotation);
  };
}

// ─── ResizePlugin ─────────────────────────────────────────────────────────────

export const ResizePlugin: KeenSliderPlugin = (slider) => {
  const observer = new ResizeObserver(() => slider.update());
  slider.on('created',   () => observer.observe(slider.container));
  slider.on('destroyed', () => observer.disconnect());
};

// ─── Root ─────────────────────────────────────────────────────────────────────

export interface CarouselProps {
  children: React.ReactNode;
  /** Loop back to start after last slide */
  loop?: boolean;
  /** Auto-advance interval in ms; `false` to disable */
  autoPlay?: number | false;
  /** Initial slide index */
  initial?: number;
  /** Slides to show per view */
  slidesPerView?: number;
  /** Gap between slides in px */
  spacing?: number;
  /** Drag / swipe enabled */
  drag?: boolean;
  /** Vertical orientation — must also provide `height` */
  vertical?: boolean;
  /** Explicit height for the viewport (required for vertical mode) e.g. "320px" */
  height?: string;
  /** Scroll mode */
  mode?: 'snap' | 'free' | 'free-snap';
  /** Enable mouse-wheel navigation */
  wheelControls?: boolean;
  /** Watch DOM mutations and auto-update */
  mutationObserver?: boolean;
  /** Breakpoint overrides — keyed by media query string */
  breakpoints?: KeenSliderOptions['breakpoints'];
  /** Called when the active slide changes */
  onSlideChange?: (index: number) => void;
  /** Called on every position change — provides progress 0-1 */
  onDetailsChanged?: (progress: number, rel: number) => void;
  /** Called once the slider is ready */
  onCreated?: (instance: CarouselContextValue['instanceRef']['current']) => void;
  /** Extra className applied to the inner viewport div */
  viewportClassName?: string;
  className?: string;
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      children,
      loop = false,
      autoPlay = false,
      initial = 0,
      slidesPerView = 1,
      spacing = 16,
      drag = true,
      vertical = false,
      height,
      mode = 'snap',
      wheelControls = false,
      mutationObserver = false,
      breakpoints,
      onSlideChange,
      onDetailsChanged,
      onCreated,
      viewportClassName,
      className,
    },
    ref
  ) => {
    const [currentSlide, setCurrentSlide] = React.useState(initial);
    const [slideCount, setSlideCount] = React.useState(0);

    const plugins: KeenSliderPlugin[] = [];
    if (autoPlay !== false) plugins.push(AutoPlayPlugin(autoPlay));
    if (wheelControls)      plugins.push(WheelControlsPlugin);
    if (mutationObserver)   plugins.push(MutationPlugin);
    plugins.push(ResizePlugin);

    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
      {
        loop,
        initial,
        drag,
        vertical,
        mode,
        breakpoints,
        slides: { perView: slidesPerView, spacing },
        slideChanged(s) {
          setCurrentSlide(s.track.details.rel);
          onSlideChange?.(s.track.details.rel);
        },
        detailsChanged(s) {
          onDetailsChanged?.(s.track.details.progress, s.track.details.rel);
        },
        created(s) {
          setSlideCount(s.track.details.slides.length);
          onCreated?.(s);
        },
        updated(s) {
          setSlideCount(s.track.details.slides.length);
        },
      },
      plugins
    );

    // Separate CarouselSlide children from navigation children
    const slides: React.ReactNode[] = [];
    const navigation: React.ReactNode[] = [];
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && (child.type as { displayName?: string }).displayName === 'CarouselSlide') {
        slides.push(child);
      } else {
        navigation.push(child);
      }
    });

    return (
      <CarouselContext.Provider value={{ instanceRef, currentSlide, slideCount, loop }}>
        <div ref={ref} className={root({ className })} data-testid="carousel">
          <div
            ref={sliderRef}
            className={cn(viewport(), viewportClassName)}
            style={height ? { height } : undefined}
          >
            {slides}
          </div>
          {navigation}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = 'Carousel';

// ─── CarouselSlide ────────────────────────────────────────────────────────────

export interface CarouselSlideProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

const CarouselSlide = React.forwardRef<HTMLDivElement, CarouselSlideProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={slide({ className })} {...props}>
      {children}
    </div>
  )
);
CarouselSlide.displayName = 'CarouselSlide';

// ─── CarouselPrev / CarouselNext ──────────────────────────────────────────────

export interface CarouselArrowProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const CarouselPrev = React.forwardRef<HTMLButtonElement, CarouselArrowProps>(
  ({ className, ...props }, ref) => {
    const { instanceRef, currentSlide, loop } = useCarousel();
    const disabled = !loop && currentSlide === 0;

    return (
      <button
        ref={ref}
        aria-label="Previous slide"
        disabled={disabled}
        onClick={() => instanceRef.current?.prev()}
        className={arrow({ className: cn('left-2', className) })}
        {...props}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
    );
  }
);
CarouselPrev.displayName = 'CarouselPrev';

const CarouselNext = React.forwardRef<HTMLButtonElement, CarouselArrowProps>(
  ({ className, ...props }, ref) => {
    const { instanceRef, currentSlide, slideCount, loop } = useCarousel();
    const disabled = !loop && currentSlide === slideCount - 1;

    return (
      <button
        ref={ref}
        aria-label="Next slide"
        disabled={disabled}
        onClick={() => instanceRef.current?.next()}
        className={arrow({ className: cn('right-2', className) })}
        {...props}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    );
  }
);
CarouselNext.displayName = 'CarouselNext';

// ─── CarouselDots ─────────────────────────────────────────────────────────────

export interface CarouselDotsProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const CarouselDots = React.forwardRef<HTMLDivElement, CarouselDotsProps>(
  ({ className, ...props }, ref) => {
    const { instanceRef, currentSlide, slideCount } = useCarousel();

    if (slideCount === 0) return null;

    return (
      <div ref={ref} className={dotsWrapper({ className })} role="tablist" aria-label="Carousel navigation" {...props}>
        {Array.from({ length: slideCount }).map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === currentSlide}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => instanceRef.current?.moveToIdx(i)}
            className={dot({
              className: cn(
                i === currentSlide
                  ? 'w-6 bg-primary'
                  : 'w-1.5 bg-border hover:bg-muted-foreground'
              ),
            })}
          />
        ))}
      </div>
    );
  }
);
CarouselDots.displayName = 'CarouselDots';

// ─── CarouselProgress ─────────────────────────────────────────────────────────

export interface CarouselProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const CarouselProgress = React.forwardRef<HTMLDivElement, CarouselProgressProps>(
  ({ className, ...props }, ref) => {
    const { currentSlide, slideCount } = useCarousel();

    const pct = slideCount > 1
      ? Math.round((currentSlide / (slideCount - 1)) * 100)
      : 100;

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Carousel progress"
        className={cn('w-full h-1 bg-border rounded-full overflow-hidden mt-3', className)}
        {...props}
      >
        <div
          className="h-full bg-primary rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    );
  }
);
CarouselProgress.displayName = 'CarouselProgress';

// ─── CarouselCounter ──────────────────────────────────────────────────────────

export interface CarouselCounterProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
}

const CarouselCounter = React.forwardRef<HTMLSpanElement, CarouselCounterProps>(
  ({ className, ...props }, ref) => {
    const { currentSlide, slideCount } = useCarousel();

    return (
      <span
        ref={ref}
        aria-live="polite"
        aria-label="Slide counter"
        className={cn('text-xs text-muted-foreground tabular-nums', className)}
        {...props}
      >
        {currentSlide + 1} / {slideCount}
      </span>
    );
  }
);
CarouselCounter.displayName = 'CarouselCounter';

// ─── Exports ──────────────────────────────────────────────────────────────────

export {
  Carousel,
  CarouselSlide,
  CarouselPrev,
  CarouselNext,
  CarouselDots,
  CarouselProgress,
  CarouselCounter,
  useCarousel,
};
