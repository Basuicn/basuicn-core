'use client';

import * as React from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type HTMLMotionProps,
  type MotionValue,
} from 'motion/react';
import { tv } from 'tailwind-variants';
import { cn } from '@/lib/utils/cn';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip/Tooltip';

// ─── Defaults (match Magic UI) ───────────────────────────────────────────────

const DEFAULT_SIZE = 40;
const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;
const SPRING = { mass: 0.1, stiffness: 150, damping: 12 } as const;

type Orientation = 'horizontal' | 'vertical';

// ─── Styling ─────────────────────────────────────────────────────────────────

const dockVariants = tv({
  base: 'flex w-max gap-3 rounded-2xl border border-border/60 bg-background/70 p-3 backdrop-blur-md',
  variants: {
    orientation: {
      horizontal: 'flex-row items-end',
      vertical: 'flex-col items-center',
    },
  },
  defaultVariants: { orientation: 'horizontal' },
});

const dockIconVariants = tv({
  base: 'flex aspect-square cursor-pointer items-center justify-center rounded-full bg-muted/60 text-foreground outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring',
});

// ─── Context ─────────────────────────────────────────────────────────────────

interface DockContextValue {
  /** Pointer position along the active axis (clientX or clientY); Infinity when idle */
  pointer: MotionValue<number>;
  orientation: Orientation;
  iconSize: number;
  iconMagnification: number;
  iconDistance: number;
}

const DockContext = React.createContext<DockContextValue | null>(null);

const useDockContext = (): DockContextValue => {
  const ctx = React.useContext(DockContext);
  if (!ctx) throw new Error('Dock sub-components must be used within <Dock>');
  return ctx;
};

// ─── Prop-based item ─────────────────────────────────────────────────────────

export interface DockItem {
  icon: React.ReactNode;
  label?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

// ─── Dock ────────────────────────────────────────────────────────────────────

export interface DockProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Layout axis (default: 'horizontal') */
  orientation?: Orientation;
  /** Resting icon size in px (default: 40) */
  iconSize?: number;
  /** Peak magnified icon size in px (default: 60) */
  iconMagnification?: number;
  /** Cursor distance over which magnification falls off, in px (default: 140) */
  iconDistance?: number;
  /** Prop-based convenience API. When provided, renders instead of `children`. */
  items?: DockItem[];
}

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      orientation = 'horizontal',
      iconSize = DEFAULT_SIZE,
      iconMagnification = DEFAULT_MAGNIFICATION,
      iconDistance = DEFAULT_DISTANCE,
      items,
      className,
      children,
      onMouseMove,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const pointer = useMotionValue(Infinity);

    const ctx = React.useMemo<DockContextValue>(
      () => ({ pointer, orientation, iconSize, iconMagnification, iconDistance }),
      [pointer, orientation, iconSize, iconMagnification, iconDistance]
    );

    return (
      <DockContext.Provider value={ctx}>
        <TooltipProvider>
          <div
            ref={ref}
            role="toolbar"
            aria-orientation={orientation}
            className={cn(dockVariants({ orientation }), className)}
            onMouseMove={(e) => {
              pointer.set(orientation === 'horizontal' ? e.clientX : e.clientY);
              onMouseMove?.(e);
            }}
            onMouseLeave={(e) => {
              pointer.set(Infinity);
              onMouseLeave?.(e);
            }}
            {...props}
          >
            {items
              ? items.map((item, i) => (
                  <DockIcon
                    key={i}
                    label={item.label}
                    onClick={item.onClick}
                    className={item.className}
                  >
                    {item.icon}
                  </DockIcon>
                ))
              : children}
          </div>
        </TooltipProvider>
      </DockContext.Provider>
    );
  }
);
Dock.displayName = 'Dock';

// ─── DockIcon ────────────────────────────────────────────────────────────────

export interface DockIconProps
  extends Omit<HTMLMotionProps<'button'>, 'style' | 'ref'> {
  /** Accessible label; also shown as a tooltip on hover */
  label?: string;
}

const DockIcon = React.forwardRef<HTMLButtonElement, DockIconProps>(
  ({ label, className, children, 'aria-label': ariaLabel, ...props }, forwardedRef) => {
    const { pointer, orientation, iconSize, iconMagnification, iconDistance } =
      useDockContext();
    const internalRef = React.useRef<HTMLButtonElement>(null);

    const setRefs = React.useCallback(
      (node: HTMLButtonElement | null) => {
        internalRef.current = node;
        if (typeof forwardedRef === 'function') forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      },
      [forwardedRef]
    );

    // Distance from the cursor to this icon's center along the active axis.
    const distance = useTransform(pointer, (val) => {
      const bounds = internalRef.current?.getBoundingClientRect() ?? {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      };
      const center =
        orientation === 'horizontal'
          ? bounds.x + bounds.width / 2
          : bounds.y + bounds.height / 2;
      return val - center;
    });

    const sizeTarget = useTransform(
      distance,
      [-iconDistance, 0, iconDistance],
      [iconSize, iconMagnification, iconSize]
    );
    const size = useSpring(sizeTarget, SPRING);

    const button = (
      <motion.button
        ref={setRefs}
        type="button"
        style={{ width: size, height: size }}
        className={cn(dockIconVariants(), className)}
        aria-label={ariaLabel ?? label}
        {...props}
      >
        {children}
      </motion.button>
    );

    if (!label) return button;

    return (
      <Tooltip>
        <TooltipTrigger render={button} />
        <TooltipContent side={orientation === 'horizontal' ? 'top' : 'right'}>
          {label}
        </TooltipContent>
      </Tooltip>
    );
  }
);
DockIcon.displayName = 'DockIcon';

// ─── DockSeparator ───────────────────────────────────────────────────────────

export type DockSeparatorProps = React.HTMLAttributes<HTMLDivElement>;

const DockSeparator = React.forwardRef<HTMLDivElement, DockSeparatorProps>(
  ({ className, ...props }, ref) => {
    const { orientation } = useDockContext();
    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={orientation === 'horizontal' ? 'vertical' : 'horizontal'}
        className={cn(
          'shrink-0 self-center bg-border/70',
          orientation === 'horizontal' ? 'mx-1 h-8 w-px' : 'my-1 h-px w-8',
          className
        )}
        {...props}
      />
    );
  }
);
DockSeparator.displayName = 'DockSeparator';

export { Dock, DockIcon, DockSeparator };
