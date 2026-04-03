'use client';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { tv } from 'tailwind-variants';
import { Check, Circle } from 'lucide-react';

const contextMenuVariants = tv({
  slots: {
    content:
      'fixed z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-background p-1 text-foreground shadow-md animate-in fade-in-0 zoom-in-95',
    item: 'relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    checkboxItem:
      'relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground',
    radioItem:
      'relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground',
    label: 'px-2 py-1.5 text-sm font-semibold',
    separator: '-mx-1 my-1 h-px bg-border',
    shortcut: 'ml-auto text-xs tracking-widest opacity-60',
    indicatorWrapper: 'absolute left-2 flex h-3.5 w-3.5 items-center justify-center',
  },
});

const styles = contextMenuVariants();

// ─── Context ─────────────────────────────────────────────────────────────────

interface ContextMenuState {
  open: boolean;
  position: { x: number; y: number };
}

const ContextMenuContext = React.createContext<{
  state: ContextMenuState;
  close: () => void;
}>({ state: { open: false, position: { x: 0, y: 0 } }, close: () => {} });

// ─── Root ─────────────────────────────────────────────────────────────────────

export interface ContextMenuProps {
  children: React.ReactNode;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ children }) => {
  const [state, setState] = React.useState<ContextMenuState>({
    open: false,
    position: { x: 0, y: 0 },
  });

  const close = React.useCallback(() => setState(s => ({ ...s, open: false })), []);

  // Close on outside click / second right-click / scroll
  React.useEffect(() => {
    if (!state.open) return;
    const handleClose = () => close();
    document.addEventListener('click', handleClose, { capture: true });
    document.addEventListener('contextmenu', handleClose, { capture: true });
    document.addEventListener('scroll', handleClose, { capture: true, passive: true });
    return () => {
      document.removeEventListener('click', handleClose, { capture: true });
      document.removeEventListener('contextmenu', handleClose, { capture: true });
      document.removeEventListener('scroll', handleClose, { capture: true });
    };
  }, [state.open, close]);

  return (
    <ContextMenuContext.Provider value={{ state, close }}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child) && child.type === ContextMenuTrigger) {
          return React.cloneElement(
            child as React.ReactElement<{ onContextMenu?: (e: React.MouseEvent) => void }>,
            {
              onContextMenu: (e: React.MouseEvent) => {
                e.preventDefault();
                e.stopPropagation();
                setState({ open: true, position: { x: e.clientX, y: e.clientY } });
              },
            }
          );
        }
        return child;
      })}
    </ContextMenuContext.Provider>
  );
};
ContextMenu.displayName = 'ContextMenu';

// ─── Trigger ──────────────────────────────────────────────────────────────────

export interface ContextMenuTriggerProps extends React.HTMLAttributes<HTMLDivElement> {}

const ContextMenuTrigger = React.forwardRef<HTMLDivElement, ContextMenuTriggerProps>(
  ({ children, ...props }, ref) => (
    <div ref={ref} {...props}>{children}</div>
  )
);
ContextMenuTrigger.displayName = 'ContextMenuTrigger';

// ─── Content ──────────────────────────────────────────────────────────────────

export interface ContextMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const ContextMenuContent = React.forwardRef<HTMLDivElement, ContextMenuContentProps>(
  ({ className, children, ...props }, ref) => {
    const { state, close } = React.useContext(ContextMenuContext);
    const contentRef = React.useRef<HTMLDivElement>(null);

    // Merge refs
    const mergedRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref]
    );

    // Focus first item on open
    React.useEffect(() => {
      if (state.open) {
        const first = contentRef.current?.querySelector<HTMLElement>('[role="menuitem"],[role="menuitemcheckbox"],[role="menuitemradio"]');
        first?.focus();
      }
    }, [state.open]);

    // Keyboard navigation
    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        const items = Array.from(
          contentRef.current?.querySelectorAll<HTMLElement>(
            '[role="menuitem"]:not([disabled]),[role="menuitemcheckbox"]:not([disabled]),[role="menuitemradio"]:not([disabled])'
          ) ?? []
        );
        const current = document.activeElement as HTMLElement;
        const idx = items.indexOf(current);

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          items[(idx + 1) % items.length]?.focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          items[(idx - 1 + items.length) % items.length]?.focus();
        } else if (e.key === 'Escape') {
          e.preventDefault();
          close();
        } else if (e.key === 'Tab') {
          e.preventDefault();
          close();
        } else if (e.key === 'Home') {
          e.preventDefault();
          items[0]?.focus();
        } else if (e.key === 'End') {
          e.preventDefault();
          items[items.length - 1]?.focus();
        }
      },
      [close]
    );

    if (!state.open) return null;

    // Clamp position to viewport
    const vw = typeof window !== 'undefined' ? window.innerWidth : 0;
    const vh = typeof window !== 'undefined' ? window.innerHeight : 0;
    const MENU_W = 192; // ~min-w-[8rem] generous estimate
    const MENU_H = 300;
    const x = Math.min(state.position.x, vw - MENU_W - 8);
    const y = Math.min(state.position.y, vh - MENU_H - 8);

    return ReactDOM.createPortal(
      <div
        ref={mergedRef}
        className={styles.content({ className })}
        style={{ top: y, left: x }}
        role="menu"
        aria-orientation="vertical"
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </div>,
      document.body
    );
  }
);
ContextMenuContent.displayName = 'ContextMenuContent';

// ─── Item ─────────────────────────────────────────────────────────────────────

export interface ContextMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  inset?: boolean;
  disabled?: boolean;
}

const ContextMenuItem = React.forwardRef<HTMLDivElement, ContextMenuItemProps>(
  ({ className, inset, disabled, onClick, ...props }, ref) => {
    const { close } = React.useContext(ContextMenuContext);
    return (
      <div
        ref={ref}
        role="menuitem"
        tabIndex={disabled ? undefined : -1}
        aria-disabled={disabled || undefined}
        className={styles.item({
          className: `${inset ? 'pl-8' : ''} ${disabled ? 'opacity-50 pointer-events-none' : ''} ${className ?? ''}`,
        })}
        onClick={(e) => {
          if (disabled) return;
          onClick?.(e);
          close();
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (!disabled) {
              onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
              close();
            }
          }
        }}
        {...props}
      />
    );
  }
);
ContextMenuItem.displayName = 'ContextMenuItem';

// ─── CheckboxItem ─────────────────────────────────────────────────────────────

export interface ContextMenuCheckboxItemProps extends React.HTMLAttributes<HTMLDivElement> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const ContextMenuCheckboxItem = React.forwardRef<HTMLDivElement, ContextMenuCheckboxItemProps>(
  ({ className, children, checked, onCheckedChange, ...props }, ref) => (
    <div
      ref={ref}
      role="menuitemcheckbox"
      tabIndex={-1}
      aria-checked={checked}
      className={styles.checkboxItem({ className })}
      onClick={() => onCheckedChange?.(!checked)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onCheckedChange?.(!checked);
        }
      }}
      {...props}
    >
      <span className={styles.indicatorWrapper()}>
        {checked && <Check className="h-4 w-4" />}
      </span>
      {children}
    </div>
  )
);
ContextMenuCheckboxItem.displayName = 'ContextMenuCheckboxItem';

// ─── RadioGroup + RadioItem ───────────────────────────────────────────────────

const ContextMenuRadioContext = React.createContext<{
  value?: string;
  onValueChange?: (value: string) => void;
}>({});

export interface ContextMenuRadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  onValueChange?: (value: string) => void;
}

const ContextMenuRadioGroup = React.forwardRef<HTMLDivElement, ContextMenuRadioGroupProps>(
  ({ value, onValueChange, ...props }, ref) => (
    <ContextMenuRadioContext.Provider value={{ value, onValueChange }}>
      <div ref={ref} role="group" {...props} />
    </ContextMenuRadioContext.Provider>
  )
);
ContextMenuRadioGroup.displayName = 'ContextMenuRadioGroup';

export interface ContextMenuRadioItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const ContextMenuRadioItem = React.forwardRef<HTMLDivElement, ContextMenuRadioItemProps>(
  ({ className, children, value, ...props }, ref) => {
    const ctx = React.useContext(ContextMenuRadioContext);
    const isChecked = ctx.value === value;
    return (
      <div
        ref={ref}
        role="menuitemradio"
        tabIndex={-1}
        aria-checked={isChecked}
        className={styles.radioItem({ className })}
        onClick={() => ctx.onValueChange?.(value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            ctx.onValueChange?.(value);
          }
        }}
        {...props}
      >
        <span className={styles.indicatorWrapper()}>
          {isChecked && <Circle className="h-2 w-2 fill-current" />}
        </span>
        {children}
      </div>
    );
  }
);
ContextMenuRadioItem.displayName = 'ContextMenuRadioItem';

// ─── Label ────────────────────────────────────────────────────────────────────

const ContextMenuLabel = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={styles.label({ className })} {...props} />
  )
);
ContextMenuLabel.displayName = 'ContextMenuLabel';

// ─── Separator ────────────────────────────────────────────────────────────────

const ContextMenuSeparator = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} role="separator" className={styles.separator({ className })} {...props} />
  )
);
ContextMenuSeparator.displayName = 'ContextMenuSeparator';

// ─── Shortcut ─────────────────────────────────────────────────────────────────

const ContextMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span aria-hidden="true" className={styles.shortcut({ className })} {...props} />
);
ContextMenuShortcut.displayName = 'ContextMenuShortcut';

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  contextMenuVariants,
};
