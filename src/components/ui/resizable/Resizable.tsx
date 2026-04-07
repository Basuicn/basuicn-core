import * as React from 'react';
import { Group, Panel, Separator } from 'react-resizable-panels';
import type { GroupProps, PanelProps, SeparatorProps } from 'react-resizable-panels';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@/lib/utils/cn';

// ─── Direction Context ────────────────────────────────────────

interface ResizableContextValue {
  direction: 'horizontal' | 'vertical';
}

const ResizableContext = React.createContext<ResizableContextValue>({
  direction: 'horizontal',
});

// ─── Grip Dots ────────────────────────────────────────────────

function GripDots({ isVerticalHandle, className }: { isVerticalHandle: boolean; className?: string }) {
  if (isVerticalHandle) {
    return (
      <div className={cn('flex flex-col gap-[3px]', className)}>
        {[0, 1, 2].map((r) => (
          <div key={r} className="flex gap-[3px]">
            <div className="w-[3px] h-[3px] rounded-full bg-current" />
            <div className="w-[3px] h-[3px] rounded-full bg-current" />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className={cn('flex gap-[3px]', className)}>
      {[0, 1, 2].map((c) => (
        <div key={c} className="flex flex-col gap-[3px]">
          <div className="w-[3px] h-[3px] rounded-full bg-current" />
          <div className="w-[3px] h-[3px] rounded-full bg-current" />
        </div>
      ))}
    </div>
  );
}

// ─── Handle Variants ─────────────────────────────────────────

const handleVariants = tv({
  base: [
    'relative flex items-center justify-center shrink-0',
    'select-none touch-none outline-none',
    'group/handle',
  ].join(' '),
  variants: {
    variant: {
      line: '',
      bar: '',
      handle: '',
      ghost: '',
    },
  },
  defaultVariants: { variant: 'line' },
});

// ─── Types ────────────────────────────────────────────────────

export type ResizablePanelGroupProps = Omit<GroupProps, 'orientation'> & {
  direction?: 'horizontal' | 'vertical';
};

export type ResizablePanelProps = PanelProps;

export type ResizableHandleProps = Omit<SeparatorProps, 'className'> &
  VariantProps<typeof handleVariants> & {
    withGrip?: boolean;
    className?: string;
  };

// ─── ResizablePanelGroup ──────────────────────────────────────

function ResizablePanelGroup({
  direction = 'horizontal',
  className,
  children,
  ...props
}: ResizablePanelGroupProps) {
  return (
    <ResizableContext.Provider value={{ direction }}>
      <Group
        orientation={direction}
        className={cn('flex h-full w-full data-[panel-group-direction=vertical]:flex-col', className)}
        {...props}
      >
        {children}
      </Group>
    </ResizableContext.Provider>
  );
}
ResizablePanelGroup.displayName = 'ResizablePanelGroup';

// ─── ResizablePanel ───────────────────────────────────────────

function ResizablePanel({ className, ...props }: ResizablePanelProps) {
  return <Panel className={cn('overflow-auto', className)} {...props} />;
}
ResizablePanel.displayName = 'ResizablePanel';

// ─── ResizableHandle ─────────────────────────────────────────

function ResizableHandle({
  variant = 'line',
  withGrip = false,
  className,
  disabled,
  ...props
}: ResizableHandleProps) {
  const { direction } = React.useContext(ResizableContext);
  const [isDragging, setIsDragging] = React.useState(false);

  const isVerticalHandle = direction === 'horizontal';

  // Shared thin-line indicator position styles
  const linePos = isVerticalHandle
    ? 'absolute inset-y-0 left-1/2 -translate-x-1/2 w-px'
    : 'absolute inset-x-0 top-1/2 -translate-y-1/2 h-px';

  return (
    <Separator
      disabled={disabled}
      onPointerDown={() => setIsDragging(true)}
      onPointerUp={() => setIsDragging(false)}
      onPointerLeave={() => setIsDragging(false)}
      className={cn(
        handleVariants({ variant }),

        // ── orientation & cursor ──────────────────────────────
        isVerticalHandle
          ? 'h-full cursor-col-resize'
          : 'w-full cursor-row-resize',

        // ── per-variant zone width ────────────────────────────
        // line: 4 px transparent zone
        variant === 'line' && (isVerticalHandle ? 'w-1' : 'h-1'),

        // bar: 8 px transparent zone — easy to grab anywhere along sidebar edge
        variant === 'bar' && (isVerticalHandle ? 'w-2' : 'h-2'),

        // handle: 12 px zone with visible pill on hover
        variant === 'handle' && (isVerticalHandle ? 'w-3' : 'h-3'),

        // ghost: 8 px invisible zone
        variant === 'ghost' && (isVerticalHandle ? 'w-2' : 'h-2'),

        // all non-ghost: transparent background
        variant !== 'ghost' && 'bg-transparent',

        // drag shadow — secondary tint
        isDragging && variant !== 'ghost' && 'shadow-[0_0_0_1px] shadow-secondary/30',

        className,
      )}
      {...props}
    >
      {/* ── LINE: thin border-colored line ────────────────── */}
      {variant === 'line' && (
        <div
          className={cn(
            linePos,
            'transition-colors duration-150 rounded-full',
            isDragging
              ? 'bg-secondary/70'
              : 'bg-border group-hover/handle:bg-secondary/50',
          )}
        />
      )}

      {/* ── BAR: full-height thin line + centered grip pill ── */}
      {variant === 'bar' && (
        <>
          {/* full-height thin line */}
          <div
            className={cn(
              linePos,
              'transition-colors duration-150',
              isDragging
                ? 'bg-secondary/60'
                : 'bg-border/70 group-hover/handle:bg-secondary/40',
            )}
          />
          {/* centered grip pill */}
          <div
            className={cn(
              'relative z-10 rounded-full transition-colors duration-150',
              isVerticalHandle ? 'w-[3px] h-6' : 'h-[3px] w-6',
              isDragging
                ? 'bg-secondary/70'
                : 'bg-muted-foreground/25 group-hover/handle:bg-secondary/50',
            )}
          />
        </>
      )}

      {/* ── HANDLE: bordered pill on hover ────────────────── */}
      {variant === 'handle' && (
        <div
          className={cn(
            'z-10 flex items-center justify-center rounded-sm border border-border bg-background',
            'opacity-0 group-hover/handle:opacity-100 transition-opacity duration-150',
            isDragging && 'opacity-100 border-secondary/60',
            'shadow-sm',
            isVerticalHandle ? 'w-5 h-8' : 'h-5 w-8',
          )}
        >
          <GripDots
            isVerticalHandle={isVerticalHandle}
            className={isDragging ? 'text-secondary/70' : 'text-muted-foreground/70'}
          />
        </div>
      )}

      {/* ── withGrip: overlay dots on line / ghost ─────────── */}
      {withGrip && variant !== 'handle' && variant !== 'bar' && (
        <div className="z-10 opacity-0 group-hover/handle:opacity-100 transition-opacity duration-150">
          <GripDots
            isVerticalHandle={isVerticalHandle}
            className="text-muted-foreground/50 group-hover/handle:text-muted-foreground/70 transition-colors"
          />
        </div>
      )}
    </Separator>
  );
}
ResizableHandle.displayName = 'ResizableHandle';

// ─── Exports ─────────────────────────────────────────────────

export {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
  handleVariants,
};
