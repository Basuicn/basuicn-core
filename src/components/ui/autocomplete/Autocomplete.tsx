"use client"
import * as React from 'react';
import { Combobox as BaseCombobox } from '@base-ui/react';
import { Check, X, Loader2 } from 'lucide-react';
import { tv } from 'tailwind-variants';
import { cn } from '@/lib/utils/cn';

const autocompleteVariants = tv({
  slots: {
    root: 'flex flex-col gap-1.5 w-full',
    inputContainer: 'flex items-center min-h-10 w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm focus-within:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-shadow transition-colors',
    input: 'flex-1 bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed',
    popup: 'z-50 w-[var(--anchor-width,var(--reference-width))] max-w-[var(--available-width)] overflow-hidden rounded-md border border-border bg-background text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-side-bottom:slide-in-from-top-2 data-side-top:slide-in-from-bottom-2',
    item: 'cursor-pointer relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50',
    indicator: 'absolute left-2 flex h-3.5 w-3.5 items-center justify-center',
  },
});

export interface AutocompleteOption {
  label: string;
  value: string;
  description?: string;
}

export interface AutocompleteProps {
  options: AutocompleteOption[];
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  isLoading?: boolean;
  className?: string;
  emptyText?: string;
  leftIcon?: React.ReactNode;
  clearOnSelect?: boolean;
}

const Autocomplete = React.forwardRef<HTMLInputElement, AutocompleteProps>(
  ({
    options,
    label,
    placeholder,
    value,
    defaultValue,
    onValueChange,
    isLoading,
    className,
    emptyText = 'No results found.',
    leftIcon,
    clearOnSelect = false,
  }, ref) => {
    const [inputValue, setInputValue] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState<string | null>(defaultValue ?? null);
    const inputGroupRef = React.useRef<HTMLDivElement>(null);
    const isSelectingRef = React.useRef(false);

    const activeValue = value !== undefined ? value : internalValue;

    const handleValueChange = (newVal: string | null) => {
      isSelectingRef.current = true;
      if (value === undefined) setInternalValue(clearOnSelect ? null : newVal);
      if (newVal !== null) onValueChange?.(newVal);
    };

    const handleInputValueChange = (val: string) => {
      if (isSelectingRef.current) {
        isSelectingRef.current = false;
        // clearOnSelect: xóa input ngay sau khi chọn, không để label xuất hiện
        if (clearOnSelect) {
          setInputValue('');
          setOpen(false);
        }
        return;
      }
      setInputValue(val);
      setOpen(val.length > 0);
    };

    const handleOpenChange = (newOpen: boolean) => {
      if (!newOpen) setOpen(false);
    };

    const handleClear = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      handleValueChange(null);
      setInputValue('');
      setOpen(false);
    };

    // Đóng popup trước khi browser paint nếu input rỗng — loại bỏ hoàn toàn nháy 1 frame
   React.useLayoutEffect(() => {
      if (!inputValue && open) setOpen(false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputValue]);

    const filteredOptions = React.useMemo(() => {
      if (!inputValue) return [];
      return options.filter(o =>
        o.label.toLowerCase().includes(inputValue.toLowerCase())
      );
    }, [options, inputValue]);

    const { root, inputContainer, input, popup, item, indicator } = autocompleteVariants();

    return (
      <BaseCombobox.Root
        value={activeValue}
        onValueChange={handleValueChange}
        onInputValueChange={handleInputValueChange}
        open={open}
        onOpenChange={handleOpenChange}
        autoHighlight
        itemToStringLabel={(val: string) => options.find(o => o.value === val)?.label ?? val}
      >
        <div className={root({ className })}>
          {label && <label className="text-sm font-medium text-foreground">{label}</label>}

          <div className="relative w-full group">
            <BaseCombobox.InputGroup ref={inputGroupRef} className={cn(inputContainer(), leftIcon && 'pl-9')}>
              {leftIcon && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none">
                  {leftIcon}
                </div>
              )}

              {isLoading ? (
                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
              ) : activeValue && !clearOnSelect && (
                <button
                  type="button"
                  aria-label="Clear selection"
                  onClick={handleClear}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full text-muted-foreground transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}

              <BaseCombobox.Input
                ref={ref}
                placeholder={placeholder}
                className={cn(input(), (isLoading || (activeValue && !clearOnSelect)) && 'pr-8')}
              />
            </BaseCombobox.InputGroup>

            <BaseCombobox.Portal>
              <BaseCombobox.Positioner
                anchor={inputGroupRef}
                sideOffset={4}
                style={{ width: 'var(--anchor-width)' }}
              >
                <BaseCombobox.Popup className={cn(popup(), 'min-w-0')}>
                  <BaseCombobox.List className="p-1 max-h-[300px] overflow-auto">
                    {filteredOptions.length === 0 ? (
                      inputValue ? (
                        <div className="py-2 px-8 text-sm text-muted-foreground italic">{emptyText}</div>
                      ) : null
                    ) : (
                      filteredOptions.map((option) => (
                        <BaseCombobox.Item
                          key={option.value}
                          value={option.value}
                          className={item()}
                        >
                          <BaseCombobox.ItemIndicator className={indicator()}>
                            <Check className="h-4 w-4" />
                          </BaseCombobox.ItemIndicator>
                          {option.description ? (
                            <div className="flex flex-col">
                              <span>{option.label}</span>
                              <span className="text-xs text-muted-foreground">{option.description}</span>
                            </div>
                          ) : option.label}
                        </BaseCombobox.Item>
                      ))
                    )}
                  </BaseCombobox.List>
                </BaseCombobox.Popup>
              </BaseCombobox.Positioner>
            </BaseCombobox.Portal>
          </div>
        </div>
      </BaseCombobox.Root>
    );
  }
);

Autocomplete.displayName = 'Autocomplete';

export { Autocomplete };
