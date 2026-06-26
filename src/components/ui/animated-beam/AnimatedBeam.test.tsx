import * as React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, beforeAll, vi } from 'vitest';
import { AnimatedBeam, type AnimatedBeamProps } from './AnimatedBeam';

beforeAll(() => {
  // jsdom has no ResizeObserver; the component constructs one on mount.
  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  );
});

type HarnessProps = Omit<AnimatedBeamProps, 'containerRef' | 'fromRef' | 'toRef'>;

const Harness = (props: HarnessProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const fromRef = React.useRef<HTMLDivElement>(null);
  const toRef = React.useRef<HTMLDivElement>(null);
  return (
    <div ref={containerRef} className="relative">
      <div ref={fromRef} data-testid="from" />
      <div ref={toRef} data-testid="to" />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={fromRef}
        toRef={toRef}
        {...props}
      />
    </div>
  );
};

describe('AnimatedBeam', () => {
  it('mounts without throwing and renders an svg overlay', () => {
    const { container } = render(<Harness />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('pointer-events-none');
  });

  it('applies pathColor and pathWidth to the base path', () => {
    const { container } = render(<Harness pathColor="red" pathWidth={6} />);
    const basePath = container.querySelector('path');
    expect(basePath).toHaveAttribute('stroke', 'red');
    expect(basePath).toHaveAttribute('stroke-width', '6');
  });

  it('renders a gradient referenced by the stroked path', () => {
    const { container } = render(<Harness />);
    const gradient = container.querySelector('linearGradient');
    expect(gradient).toBeInTheDocument();

    const id = gradient?.getAttribute('id');
    expect(id).toBeTruthy();

    const strokedPath = container.querySelectorAll('path')[1];
    expect(strokedPath).toHaveAttribute('stroke', `url(#${id})`);
  });

  it('uses the Kraken purple gradient stops by default', () => {
    const { container } = render(<Harness />);
    const stops = container.querySelectorAll('stop');
    const colors = Array.from(stops).map((s) => s.getAttribute('stop-color'));
    expect(colors).toContain('#7132f5');
    expect(colors).toContain('#a78bfa');
  });

  it('is hidden from assistive tech (decorative overlay)', () => {
    const { container } = render(<Harness />);
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });
});
