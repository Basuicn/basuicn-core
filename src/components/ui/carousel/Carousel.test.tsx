import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  Carousel, CarouselSlide,
  CarouselPrev, CarouselNext,
  CarouselDots, CarouselProgress, CarouselCounter,
} from './Carousel';

// ─── Mock keen-slider ──────────────────────────────────────────────────────────

const mockPrev   = vi.fn();
const mockNext   = vi.fn();
const mockMoveTo = vi.fn();

let createdCallback:      ((s: unknown) => void) | null = null;
let slideChangedCallback: ((s: unknown) => void) | null = null;

const mockSlides3 = { rel: 0, slides: [{}, {}, {}] };

const mockInstance = {
  prev:      mockPrev,
  next:      mockNext,
  moveToIdx: mockMoveTo,
  track: { details: mockSlides3 },
};

vi.mock('keen-slider/react', () => ({
  useKeenSlider: (options: {
    created?:      (s: unknown) => void;
    slideChanged?: (s: unknown) => void;
    updated?:      (s: unknown) => void;
  }) => {
    createdCallback      = options?.created      ?? null;
    slideChangedCallback = options?.slideChanged  ?? null;

    const refCallback = (_node: HTMLElement | null) => {};
    const instanceRef = { current: mockInstance };
    return [refCallback, instanceRef];
  },
}));

vi.mock('keen-slider/keen-slider.min.css', () => ({}));

// ─── Helpers ──────────────────────────────────────────────────────────────────

const makeSlider = (props = {}) =>
  render(
    <Carousel {...props}>
      <CarouselSlide>Slide 1</CarouselSlide>
      <CarouselSlide>Slide 2</CarouselSlide>
      <CarouselSlide>Slide 3</CarouselSlide>
      <CarouselPrev />
      <CarouselNext />
    </Carousel>
  );

const triggerCreated = () =>
  act(() => {
    createdCallback?.({ ...mockInstance, track: { details: mockSlides3 } });
  });

const triggerSlideChanged = (rel: number) =>
  act(() => {
    slideChangedCallback?.({ ...mockInstance, track: { details: { rel, slides: [{}, {}, {}] } } });
  });

// ─── Tests ────────────────────────────────────────────────────────────────────

beforeEach(() => {
  mockPrev.mockClear();
  mockNext.mockClear();
  mockMoveTo.mockClear();
});

// ── Carousel root ──────────────────────────────────────────────────────────────

describe('Carousel', () => {
  it('renders the carousel container', () => {
    makeSlider();
    expect(screen.getByTestId('carousel')).toBeInTheDocument();
  });

  it('renders all slides', () => {
    makeSlider();
    expect(screen.getByText('Slide 1')).toBeInTheDocument();
    expect(screen.getByText('Slide 2')).toBeInTheDocument();
    expect(screen.getByText('Slide 3')).toBeInTheDocument();
  });

  it('calls onSlideChange with the new index', () => {
    const onSlideChange = vi.fn();
    makeSlider({ onSlideChange });
    triggerSlideChanged(1);
    expect(onSlideChange).toHaveBeenCalledWith(1);
  });

  it('calls onCreated when the slider is ready', () => {
    const onCreated = vi.fn();
    makeSlider({ onCreated });
    triggerCreated();
    expect(onCreated).toHaveBeenCalled();
  });

  it('applies a custom className to the root element', () => {
    makeSlider({ className: 'my-custom' });
    expect(screen.getByTestId('carousel')).toHaveClass('my-custom');
  });

  it('places CarouselSlide inside the viewport and navigation outside', () => {
    render(
      <Carousel>
        <CarouselSlide>Slide</CarouselSlide>
        <CarouselDots />
      </Carousel>
    );
    triggerCreated();
    const viewport = screen.getByTestId('carousel').querySelector('.keen-slider')!;
    expect(viewport).toContainElement(screen.getByText('Slide'));
    // Dots are outside the viewport
    const dots = screen.getByRole('tablist');
    expect(viewport).not.toContainElement(dots);
  });
});

// ── CarouselSlide ──────────────────────────────────────────────────────────────

describe('CarouselSlide', () => {
  it('renders children', () => {
    render(<CarouselSlide>Content</CarouselSlide>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('has the keen-slider__slide class', () => {
    const { container } = render(<CarouselSlide>X</CarouselSlide>);
    expect(container.firstChild).toHaveClass('keen-slider__slide');
  });

  it('forwards extra HTML props', () => {
    render(<CarouselSlide data-testid="my-slide">X</CarouselSlide>);
    expect(screen.getByTestId('my-slide')).toBeInTheDocument();
  });
});

// ── CarouselPrev ───────────────────────────────────────────────────────────────

describe('CarouselPrev', () => {
  it('renders with the correct aria-label', () => {
    makeSlider();
    expect(screen.getByRole('button', { name: /previous slide/i })).toBeInTheDocument();
  });

  it('calls prev() on click', () => {
    makeSlider({ loop: true }); // loop=true → never disabled
    fireEvent.click(screen.getByRole('button', { name: /previous slide/i }));
    expect(mockPrev).toHaveBeenCalledOnce();
  });

  it('is disabled on the first slide when loop=false', () => {
    makeSlider({ loop: false });
    // currentSlide starts at 0 → should be disabled
    expect(screen.getByRole('button', { name: /previous slide/i })).toBeDisabled();
  });

  it('is enabled on the first slide when loop=true', () => {
    makeSlider({ loop: true });
    expect(screen.getByRole('button', { name: /previous slide/i })).not.toBeDisabled();
  });

  it('becomes enabled after moving away from first slide', () => {
    makeSlider({ loop: false });
    triggerCreated();
    triggerSlideChanged(1);
    expect(screen.getByRole('button', { name: /previous slide/i })).not.toBeDisabled();
  });
});

// ── CarouselNext ───────────────────────────────────────────────────────────────

describe('CarouselNext', () => {
  it('renders with the correct aria-label', () => {
    makeSlider();
    expect(screen.getByRole('button', { name: /next slide/i })).toBeInTheDocument();
  });

  it('calls next() on click', () => {
    makeSlider();
    fireEvent.click(screen.getByRole('button', { name: /next slide/i }));
    expect(mockNext).toHaveBeenCalledOnce();
  });

  it('is disabled on the last slide when loop=false', () => {
    makeSlider({ loop: false });
    triggerCreated();
    triggerSlideChanged(2); // index 2 = last of 3
    expect(screen.getByRole('button', { name: /next slide/i })).toBeDisabled();
  });

  it('is enabled on the last slide when loop=true', () => {
    makeSlider({ loop: true });
    triggerCreated();
    triggerSlideChanged(2);
    expect(screen.getByRole('button', { name: /next slide/i })).not.toBeDisabled();
  });
});

// ── CarouselDots ───────────────────────────────────────────────────────────────

describe('CarouselDots', () => {
  const renderWithDots = (props = {}) =>
    render(
      <Carousel {...props}>
        <CarouselSlide>1</CarouselSlide>
        <CarouselSlide>2</CarouselSlide>
        <CarouselSlide>3</CarouselSlide>
        <CarouselDots />
      </Carousel>
    );

  it('renders one dot per slide after created', () => {
    renderWithDots();
    triggerCreated();
    expect(screen.getAllByRole('tab')).toHaveLength(3);
  });

  it('marks slide 0 as selected initially', () => {
    renderWithDots();
    triggerCreated();
    const tabs = screen.getAllByRole('tab');
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'false');
    expect(tabs[2]).toHaveAttribute('aria-selected', 'false');
  });

  it('calls moveToIdx when a dot is clicked', () => {
    renderWithDots();
    triggerCreated();
    fireEvent.click(screen.getAllByRole('tab')[2]);
    expect(mockMoveTo).toHaveBeenCalledWith(2);
  });

  it('updates aria-selected after a slide change', () => {
    renderWithDots();
    triggerCreated();
    triggerSlideChanged(1);
    const tabs = screen.getAllByRole('tab');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[0]).toHaveAttribute('aria-selected', 'false');
  });

  it('has tablist role with accessible label', () => {
    renderWithDots();
    triggerCreated();
    expect(screen.getByRole('tablist', { name: /carousel navigation/i })).toBeInTheDocument();
  });
});

// ── CarouselProgress ───────────────────────────────────────────────────────────

describe('CarouselProgress', () => {
  const renderWithProgress = (props = {}) =>
    render(
      <Carousel {...props}>
        <CarouselSlide>1</CarouselSlide>
        <CarouselSlide>2</CarouselSlide>
        <CarouselSlide>3</CarouselSlide>
        <CarouselProgress />
      </Carousel>
    );

  it('renders a progressbar role', () => {
    renderWithProgress();
    triggerCreated();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('is at 0% on the first slide', () => {
    renderWithProgress();
    triggerCreated();
    // currentSlide=0, slideCount=3 → 0 / (3-1) = 0%
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
  });

  it('is at 50% on the middle slide', () => {
    renderWithProgress();
    triggerCreated();
    triggerSlideChanged(1);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '50');
  });

  it('is at 100% on the last slide', () => {
    renderWithProgress();
    triggerCreated();
    triggerSlideChanged(2);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
  });
});

// ── CarouselCounter ────────────────────────────────────────────────────────────

describe('CarouselCounter', () => {
  const renderWithCounter = (props = {}) =>
    render(
      <Carousel {...props}>
        <CarouselSlide>1</CarouselSlide>
        <CarouselSlide>2</CarouselSlide>
        <CarouselSlide>3</CarouselSlide>
        <CarouselCounter />
      </Carousel>
    );

  it('shows "1 / 3" on the first slide after created', () => {
    renderWithCounter();
    triggerCreated();
    expect(screen.getByText(/1\s*\/\s*3/)).toBeInTheDocument();
  });

  it('updates to "2 / 3" after moving to slide 1', () => {
    renderWithCounter();
    triggerCreated();
    triggerSlideChanged(1);
    expect(screen.getByText(/2\s*\/\s*3/)).toBeInTheDocument();
  });

  it('has aria-live="polite" for screen readers', () => {
    renderWithCounter();
    triggerCreated();
    expect(screen.getByLabelText(/slide counter/i)).toHaveAttribute('aria-live', 'polite');
  });
});

// ── Context guard ──────────────────────────────────────────────────────────────

describe('useCarousel (context guard)', () => {
  it('throws when used outside <Carousel>', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<CarouselPrev />)).toThrow(
      'useCarousel must be used within <Carousel>'
    );
    spy.mockRestore();
  });
});
