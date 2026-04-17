import * as React from 'react';
import { Dialog as BaseDialog } from '@base-ui/react';
import { tv } from 'tailwind-variants';
import { cn } from '@/lib/utils/cn';
import { Search } from 'lucide-react';

// ─── Variants ────────────────────────────────────────────────────────────────

const commandVariants = tv({
  slots: {
    overlay:
      'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0',
    content: [
      'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
      'w-full max-w-lg rounded-xl border border-border bg-background shadow-2xl',
      'data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 ',
      'data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
      'overflow-hidden flex flex-col max-h-[min(80vh,460px)]',
    ].join(' '),
    input: [
      'flex h-12 w-full bg-transparent px-4 text-sm text-foreground outline-none',
      'placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
    ].join(' '),
    list: 'overflow-y-auto overflow-x-hidden flex-1',
    group: 'p-1',
    groupLabel: 'px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider',
    item: [
      'relative flex cursor-pointer select-none items-center gap-3 rounded-md px-3 py-2.5 text-sm outline-none',
      'transition-colors',
      'data-[highlighted=true]:bg-accent data-[highlighted=true]:text-accent-foreground',
      '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-muted-foreground',
    ].join(' '),
    separator: '-mx-1 my-1 h-px bg-border',
    empty: 'py-8 text-center text-sm text-muted-foreground',
    shortcut: 'ml-auto text-xs tracking-widest text-muted-foreground/70',
  },
});

const styles = commandVariants();

// ─── Context ─────────────────────────────────────────────────────────────────

interface CommandContextValue {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  highlightedIndex: number;
  setHighlightedIndex: React.Dispatch<React.SetStateAction<number>>;
}

const CommandContext = React.createContext<CommandContextValue | null>(null);

function useCommand() {
  const ctx = React.useContext(CommandContext);
  if (!ctx) throw new Error('useCommand must be used within <Command>');
  return ctx;
}

// ─── Command (Root) ──────────────────────────────────────────────────────────

export interface CommandProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

const Command: React.FC<CommandProps> = ({ open, onOpenChange, children, className }) => {
  const [search, setSearch] = React.useState('');
  const [highlightedIndex, setHighlightedIndex] = React.useState(0);

  React.useEffect(() => {
    if (open) {
      setSearch('');
      setHighlightedIndex(0);
    }
  }, [open]);

  return (
    <CommandContext.Provider value={{ search, setSearch, highlightedIndex, setHighlightedIndex }}>
      <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
        <BaseDialog.Portal>
          <BaseDialog.Backdrop className={styles.overlay()} />
          <BaseDialog.Popup className={cn(styles.content(), className)}>
            {children}
          </BaseDialog.Popup>
        </BaseDialog.Portal>
      </BaseDialog.Root>
    </CommandContext.Provider>
  );
};
Command.displayName = 'Command';

// ─── CommandInput ────────────────────────────────────────────────────────────

export interface CommandInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onValueChange?: (value: string) => void;
}

const CommandInput = React.forwardRef<HTMLInputElement, CommandInputProps>(
  ({ className, placeholder = 'Type a command or search...', onValueChange, ...props }, ref) => {
    const { search, setSearch, setHighlightedIndex } = useCommand();

    return (
      <div className="flex items-center border-b border-border px-3 shrink-0">
        <Search className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
        <input
          ref={ref}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setHighlightedIndex(0);
            onValueChange?.(e.target.value);
          }}
          placeholder={placeholder}
          className={cn(styles.input(), className)}
          {...props}
        />
      </div>
    );
  },
);
CommandInput.displayName = 'CommandInput';

// ─── CommandList ─────────────────────────────────────────────────────────────

const CommandList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn(styles.list(), className)} role="listbox" {...props}>
      {children}
    </div>
  ),
);
CommandList.displayName = 'CommandList';

// ─── CommandGroup ────────────────────────────────────────────────────────────

export interface CommandGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  heading?: string;
}

const CommandGroup = React.forwardRef<HTMLDivElement, CommandGroupProps>(
  ({ className, heading, children, ...props }, ref) => (
    <div ref={ref} className={cn(styles.group(), className)} role="group" {...props}>
      {heading && <div className={styles.groupLabel()}>{heading}</div>}
      {children}
    </div>
  ),
);
CommandGroup.displayName = 'CommandGroup';

// ─── CommandItem ─────────────────────────────────────────────────────────────

export interface CommandItemProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  keywords?: string[];
  onSelect?: () => void;
  value?: string;
}

const CommandItem = React.forwardRef<HTMLDivElement, CommandItemProps>(
  ({ className, disabled, keywords = [], onSelect, value, children, ...props }, ref) => {
    const { search, highlightedIndex, setHighlightedIndex } = useCommand();
    const [itemIndex] = React.useState(() => Math.random());

    // Filter: check value, text content, and keywords
    const searchable = [value ?? '', ...(typeof children === 'string' ? [children] : []), ...keywords]
      .join(' ')
      .toLowerCase();
    const isVisible = !search || searchable.includes(search.toLowerCase());

    if (!isVisible) return null;

    return (
      <div
        ref={ref}
        role="option"
        aria-disabled={disabled || undefined}
        className={cn(
          styles.item(),
          disabled && 'opacity-50 pointer-events-none',
          className,
        )}
        onClick={() => {
          if (!disabled) onSelect?.();
        }}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
            e.preventDefault();
            onSelect?.();
          }
        }}
        {...props}
      >
        {children}
      </div>
    );
  },
);
CommandItem.displayName = 'CommandItem';

// ─── CommandEmpty ────────────────────────────────────────────────────────────

const CommandEmpty = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children = 'No results found.', ...props }, ref) => (
    <div ref={ref} className={cn(styles.empty(), className)} {...props}>
      {children}
    </div>
  ),
);
CommandEmpty.displayName = 'CommandEmpty';

// ─── CommandSeparator ────────────────────────────────────────────────────────

const CommandSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(styles.separator(), className)} {...props} />
  ),
);
CommandSeparator.displayName = 'CommandSeparator';

// ─── CommandShortcut ─────────────────────────────────────────────────────────

const CommandShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn(styles.shortcut(), className)} {...props} />
);
CommandShortcut.displayName = 'CommandShortcut';

// ─── Exports ─────────────────────────────────────────────────────────────────

export {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
  CommandSeparator,
  CommandShortcut,
};
