import * as React from 'react';
import { Combobox as BaseCombobox } from '@base-ui/react';
import { Check, ChevronDown, X, Loader2 } from 'lucide-react';
import { tv } from 'tailwind-variants';
import { cn } from '@/lib/utils/cn';

const comboboxVariants = tv({
  slots: {
    root: 'flex flex-col gap-1.5 w-full',
    inputContainer: 'flex flex-wrap items-center gap-1.5 min-h-10 w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm focus-within:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-shadow transition-colors',
    input: 'flex-1 min-w-[120px] bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed',
    popup: 'z-50 w-[var(--anchor-width,var(--reference-width))] max-w-[var(--available-width)] overflow-hidden rounded-md border border-border bg-background text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-side-bottom:slide-in-from-top-2 data-side-left:slide-in-from-right-2 data-side-right:slide-in-from-left-2 data-side-top:slide-in-from-bottom-2',
    item: 'cursor-pointer relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50',
    indicator: 'absolute left-2 flex h-3.5 w-3.5 items-center justify-center',
    chip: 'inline-flex items-center gap-1 rounded bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground outline-none focus:ring-1 focus:ring-primary',
    chipRemove: 'hover:bg-primary/20 rounded-full p-0.5 transition-colors cursor-pointer',
    actionsHeader: 'flex items-center gap-1 p-1 border-b border-border sticky top-0 bg-background z-10',
    actionButton: 'flex-1 text-[10px] uppercase tracking-wider font-bold py-1.5 px-2 rounded-sm hover:bg-accent hover:text-accent-foreground text-muted-foreground transition-colors text-center',
  }
});

/** A single option in the ComboBox dropdown */
export interface ComboBoxOption {
  /** Display text for the option */
  label: string;
  /** Unique value identifying the option */
  value: string;
}

/** Props for the ComboBox component */
export interface ComboBoxProps {
  /** Array of selectable options */
  options: ComboBoxOption[];
  /** Label text displayed above the combobox */
  label?: string;
  placeholder?: string;
  /** Controlled selected value (string for single, string[] for multiple) */
  value?: string | string[];
  /** Initial value for uncontrolled usage */
  defaultValue?: string | string[];
  /** Callback fired when the selected value changes */
  onValueChange?: (value: string | string[]) => void;
  /** Enable multi-select mode with chip display */
  multiple?: boolean;
  /** Shows a loading spinner on the dropdown trigger */
  isLoading?: boolean;
  className?: string;
  /** Enable type-ahead filtering of options (default: true) */
  autocomplete?: boolean;
  /** Text shown when no options match the filter */
  emptyText?: string;
  /** Label for the "select all" action in multi-select mode */
  selectAllText?: string;
  /** Label for the "clear all" action in multi-select mode */
  clearAllText?: string;
  /** Icon rendered at the start (left side) of the input */
  leftIcon?: React.ReactNode;
}

const ComboBox = React.forwardRef<HTMLInputElement, ComboBoxProps>(
  ({ options, label, placeholder, value, defaultValue, onValueChange, multiple, isLoading, className, autocomplete = true, emptyText = 'No results found.', selectAllText = 'Select all', clearAllText = 'Clear all', leftIcon }, ref) => {
    const [inputValue, setInputValue] = React.useState('');
    const [internalValue, setInternalValue] = React.useState<string | string[] | null>(defaultValue || (multiple ? [] : null));
    const isSelectingRef = React.useRef(false);

    const activeValue = value !== undefined ? value : internalValue;

    const handleValueChange = (newVal: string | string[] | null) => {
      isSelectingRef.current = true;
      if (value === undefined) {
        setInternalValue(newVal);
      }
      if (newVal !== null) {
        onValueChange?.(newVal);
      }
    };

    const handleInputValueChange = (val: string) => {
      // Bỏ qua cập nhật inputValue khi đang chọn item để tránh nháy popup
      if (isSelectingRef.current) {
        isSelectingRef.current = false;
        return;
      }
      setInputValue(val);
    };

    const handleClear = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      handleValueChange(multiple ? [] : null);
      setInputValue('');
    };

    const hasValue = multiple
      ? Array.isArray(activeValue) && activeValue.length > 0
      : !!activeValue;

    // Lọc options theo text người dùng đang gõ
    const filteredOptions = React.useMemo(() => {
      if (!inputValue || !autocomplete) return options;
      // Khi đã có value được chọn, input hiển thị label → không filter theo label đó
      if (!multiple && activeValue) {
        const selectedOption = options.find((o) => o.value === activeValue);
        if (selectedOption && inputValue === selectedOption.label) return options;
      }
      return options.filter(opt =>
        opt.label.toLowerCase().includes(inputValue.toLowerCase())
      );
    }, [options, inputValue, autocomplete, multiple, activeValue]);

    const { root, inputContainer, input, popup, item, indicator, chip, chipRemove, actionsHeader, actionButton } = comboboxVariants();
    const inputGroupRef = React.useRef<HTMLDivElement>(null);

    return (
      <BaseCombobox.Root
        value={activeValue}
        onValueChange={handleValueChange}
        multiple={multiple}
        onInputValueChange={handleInputValueChange}
        autoHighlight
        itemToStringLabel={(val: string) => options.find((o) => o.value === val)?.label ?? val}
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
              {multiple ? (
                <BaseCombobox.Chips className="flex flex-wrap items-center gap-1.5 flex-1 w-full min-w-0">
                  {Array.isArray(activeValue) && activeValue.map((val) => {
                    const option = options.find(o => o.value === val);
                    return (
                      <BaseCombobox.Chip key={val} className={chip()}>
                        {option?.label || val}
                        <BaseCombobox.ChipRemove className={chipRemove()}>
                          <X className="h-3 w-3" />
                        </BaseCombobox.ChipRemove>
                      </BaseCombobox.Chip>
                    );
                  })}
                  <BaseCombobox.Input
                    ref={ref}
                    readOnly={!autocomplete}
                    placeholder={Array.isArray(activeValue) && activeValue.length > 0 ? '' : placeholder}
                    className={input()}
                  />
                </BaseCombobox.Chips>
              ) : (
                <BaseCombobox.Input
                  ref={ref}
                  readOnly={!autocomplete}
                  placeholder={placeholder}
                  className={cn(input(), !autocomplete && 'cursor-pointer')}
                />
              )}

              {hasValue && (
                <button
                  type="button"
                  aria-label="Clear selection"
                  onClick={handleClear}
                  className="p-1 hover:bg-muted rounded-full text-muted-foreground transition-colors mr-1"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}

              <BaseCombobox.Trigger className="text-muted-foreground transition-transform group-data-open:rotate-180 ml-auto">
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ChevronDown className="h-4 w-4" />}
              </BaseCombobox.Trigger>
            </BaseCombobox.InputGroup>

            <BaseCombobox.Portal>
              <BaseCombobox.Positioner
                anchor={inputGroupRef}
                sideOffset={4}
                style={{ width: 'var(--anchor-width)' }}
              >
                <BaseCombobox.Popup className={cn(popup(), 'min-w-0')}>
                  {multiple && options.length > 0 && (
                    <div className={actionsHeader()}>
                      <button
                        type="button"
                        aria-label={selectAllText}
                        onClick={(e) => {
                          e.preventDefault();
                          handleValueChange(options.map((o) => o.value));
                        }}
                        className={actionButton()}
                      >
                        {selectAllText}
                      </button>
                      <div className="w-px h-3 bg-border" />
                      <button
                        type="button"
                        aria-label={clearAllText}
                        onClick={(e) => {
                          e.preventDefault();
                          handleValueChange([]);
                        }}
                        className={actionButton()}
                      >
                        {clearAllText}
                      </button>
                    </div>
                  )}
                  <BaseCombobox.List className="p-1 max-h-[300px] overflow-auto">
                    {filteredOptions.length === 0 ? (
                      <div className="py-2 px-8 text-sm text-muted-foreground italic">{emptyText}</div>
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
                          {option.label}
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

ComboBox.displayName = 'ComboBox';

export { ComboBox };
