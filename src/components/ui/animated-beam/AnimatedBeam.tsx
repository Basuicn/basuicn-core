'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils/cn';

// ─── Defaults ────────────────────────────────────────────────────────────────

const DEFAULT_DURATION = 5;
const DEFAULT_PATH_COLOR = 'gray';
const DEFAULT_PATH_WIDTH = 2;
const DEFAULT_PATH_OPACITY = 0.2;
// Kraken purple theme gradient
const DEFAULT_GRADIENT_START = '#7132f5';
const DEFAULT_GRADIENT_STOP = '#a78bfa';

export interface AnimatedBeamProps {
  className?: string;
  /** The relatively-positioned container both nodes live in. */
  containerRef: React.RefObject<HTMLElement | null>;
  /** Source node. */
  fromRef: React.RefObject<HTMLElement | null>;
  /** Target node. */
  toRef: React.RefObject<HTMLElement | null>;
  /** Vertical bow of the curve in px (default: 0 = straight). */
  curvature?: number;
  /** Reverse the beam's travel direction (default: false). */
  reverse?: boolean;
  /** Base (static) path color (default: 'gray'). */
  pathColor?: string;
  /** Stroke width in px (default: 2). */
  pathWidth?: number;
  /** Base path opacity (default: 0.2). */
  pathOpacity?: number;
  /** Gradient start color (default: Kraken purple #7132f5). */
  gradientStartColor?: string;
  /** Gradient stop color (default: #a78bfa). */
  gradientStopColor?: string;
  /** Animation delay in seconds (default: 0). */
  delay?: number;
  /** Loop duration in seconds (default: 5). */
  duration?: number;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
}

const AnimatedBeam = React.forwardRef<SVGSVGElement, AnimatedBeamProps>(
  (
    {
      className,
      containerRef,
      fromRef,
      toRef,
      curvature = 0,
      reverse = false,
      duration = DEFAULT_DURATION,
      delay = 0,
      pathColor = DEFAULT_PATH_COLOR,
      pathWidth = DEFAULT_PATH_WIDTH,
      pathOpacity = DEFAULT_PATH_OPACITY,
      gradientStartColor = DEFAULT_GRADIENT_START,
      gradientStopColor = DEFAULT_GRADIENT_STOP,
      startXOffset = 0,
      startYOffset = 0,
      endXOffset = 0,
      endYOffset = 0,
    },
    ref
  ) => {
    const id = React.useId();
    const [pathD, setPathD] = React.useState('');
    const [svgDimensions, setSvgDimensions] = React.useState({ width: 0, height: 0 });

    // Animate the gradient stops across the path; reverse flips the direction.
    const gradientCoordinates = reverse
      ? { x1: ['90%', '-10%'], x2: ['100%', '0%'], y1: ['0%', '0%'], y2: ['0%', '0%'] }
      : { x1: ['10%', '110%'], x2: ['0%', '100%'], y1: ['0%', '0%'], y2: ['0%', '0%'] };

    React.useEffect(() => {
      const updatePath = () => {
        if (!containerRef.current || !fromRef.current || !toRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const rectA = fromRef.current.getBoundingClientRect();
        const rectB = toRef.current.getBoundingClientRect();

        setSvgDimensions({ width: containerRect.width, height: containerRect.height });

        const startX = rectA.left - containerRect.left + rectA.width / 2 + startXOffset;
        const startY = rectA.top - containerRect.top + rectA.height / 2 + startYOffset;
        const endX = rectB.left - containerRect.left + rectB.width / 2 + endXOffset;
        const endY = rectB.top - containerRect.top + rectB.height / 2 + endYOffset;

        const controlX = (startX + endX) / 2;
        const controlY = startY - curvature;
        setPathD(`M ${startX},${startY} Q ${controlX},${controlY} ${endX},${endY}`);
      };

      const resizeObserver = new ResizeObserver(() => updatePath());
      const container = containerRef.current;
      if (container) resizeObserver.observe(container);
      window.addEventListener('resize', updatePath);
      updatePath();

      return () => {
        resizeObserver.disconnect();
        window.removeEventListener('resize', updatePath);
      };
    }, [
      containerRef,
      fromRef,
      toRef,
      curvature,
      startXOffset,
      startYOffset,
      endXOffset,
      endYOffset,
    ]);

    return (
      <svg
        ref={ref}
        fill="none"
        width={svgDimensions.width}
        height={svgDimensions.height}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
        className={cn(
          'pointer-events-none absolute left-0 top-0 transform-gpu',
          className
        )}
        aria-hidden="true"
      >
        <path
          d={pathD}
          stroke={pathColor}
          strokeWidth={pathWidth}
          strokeOpacity={pathOpacity}
          strokeLinecap="round"
        />
        <path
          d={pathD}
          stroke={`url(#${id})`}
          strokeWidth={pathWidth}
          strokeOpacity="1"
          strokeLinecap="round"
        />
        <defs>
          <motion.linearGradient
            className="transform-gpu"
            id={id}
            gradientUnits="userSpaceOnUse"
            initial={{ x1: '0%', x2: '0%', y1: '0%', y2: '0%' }}
            animate={{
              x1: gradientCoordinates.x1,
              x2: gradientCoordinates.x2,
              y1: gradientCoordinates.y1,
              y2: gradientCoordinates.y2,
            }}
            transition={{
              delay,
              duration,
              ease: [0.16, 1, 0.3, 1],
              repeat: Infinity,
              repeatDelay: 0,
            }}
          >
            <stop stopColor={gradientStartColor} stopOpacity="0" />
            <stop stopColor={gradientStartColor} />
            <stop offset="32.5%" stopColor={gradientStopColor} />
            <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
          </motion.linearGradient>
        </defs>
      </svg>
    );
  }
);
AnimatedBeam.displayName = 'AnimatedBeam';

export { AnimatedBeam };
