import * as React from 'react';
import { Select as BaseSelect } from '@base-ui/react';
import { tv } from 'tailwind-variants';
import { cn } from '@/lib/utils/cn';
import { ChevronDown, Check, X } from 'lucide-react';

const multiSelectVariants = tv({
    slots: {
        trigger: 'flex min-h-10 w-full items-start justify-between rounded-lg border border-border bg-background px-3 py-2 text-sm ring-offset-background focus:border-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-shadow group cursor-pointer gap-2',
        content: 'relative z-50 max-h-[300px] min-w-[var(--anchor-width)] overflow-hidden rounded-lg border border-border bg-background text-foreground shadow-[rgba(0,0,0,0.08)_0px_4px_16px] data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-side-bottom:slide-in-from-top-2 data-side-left:slide-in-from-right-2 data-side-right:slide-in-from-left-2 data-side-top:slide-in-from-bottom-2',
        viewport: 'p-1',
        item: 'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-muted focus:text-foreground data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-muted data-highlighted:text-foreground',
        icon: 'h-4 w-4 opacity-50 transition-transform duration-200 group-data-open:rotate-180',
    }
});

const { trigger, content, viewport, item, icon } = multiSelectVariants();

/** Props for the MultiSelect component */
export interface MultiSelectProps extends Omit<React.ComponentPropsWithoutRef<typeof BaseSelect.Root>, 'value' | 'defaultValue'> {
    /** Label text displayed above the select trigger */
    label?: string;
    /** Helper text displayed below the select (hidden when error is present) */
    description?: string;
    /** Error message displayed below the select; also applies danger styling */
    error?: string;
    /** Placeholder shown when no option is selected */
    placeholder?: string;
    /** Array of selectable options */
    options: { label: string; value: string }[];
    id?: string;
    className?: string;
    /** Controlled selected values */
    value?: string[];
    /** Initial selected values for uncontrolled usage */
    defaultValue?: string[];
    /** Whether a clear button is shown when value is selected */
    clearable?: boolean;
    /** Callback fired when the selected values change */
    onChange?: (values: string[]) => void;
    /** Text shown when the options array is empty */
    emptyText?: string;
    /** Accessible label for the clear button */
    clearLabel?: string;
    /** Max tags displayed before showing "+N more" */
    maxTags?: number;
}

const MultiSelect = React.forwardRef<React.ElementRef<typeof BaseSelect.Trigger>, MultiSelectProps>(
    ({ label, description, error, placeholder = 'Select...', options, id, className, clearable = true, onChange, value, defaultValue, emptyText = 'No results found.', clearLabel = 'Clear selection', maxTags = 2, ...props }, ref) => {
        const triggerRef = React.useRef<HTMLButtonElement>(null);

        const [selectedValues, setSelectedValues] = React.useState<string[]>(value ?? defaultValue ?? []);

        React.useEffect(() => {
            if (value !== undefined) setSelectedValues(value);
        }, [value]);

        const handleValueChange = (val: string) => {
            const newValues = selectedValues.includes(val)
                ? selectedValues.filter((v) => v !== val)
                : [...selectedValues, val];
            setSelectedValues(newValues);
            onChange?.(newValues);
        };

        const handleClear = (e: React.MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setSelectedValues([]);
            onChange?.([]);
        };

        const selectedLabels = selectedValues
            .map((v) => options.find((o) => o.value === v)?.label)
            .filter(Boolean) as string[];

        const displayLabels = selectedLabels.slice(0, maxTags);
        const moreCount = selectedLabels.length - maxTags;

        return (
            <div className="flex flex-col gap-1.5 w-full">
                {label && (
                    <label className="text-sm font-medium text-foreground">
                        {label}
                    </label>
                )}

                <div className="relative w-full">
                    <BaseSelect.Root
                        value={undefined}
                        onValueChange={handleValueChange as (value: unknown) => void}
                        {...props}
                    >
                        <BaseSelect.Trigger
                            ref={(node) => {
                                triggerRef.current = node;
                                if (typeof ref === 'function') ref(node);
                                else if (ref) (ref as React.RefObject <HTMLButtonElement | null>).current = node;
                            }}
                            className={trigger({ className: cn(className, error ? 'border-danger focus:border-danger' : '') })}
                            id={id}
                        >
                            <div className="flex flex-wrap gap-1.5 items-center">
                                {selectedLabels.length === 0 ? (
                                    <span className="text-muted-foreground">{placeholder}</span>
                                ) : (
                                    <>
                                        {displayLabels.map((label) => (
                                            <span
                                                key={label}
                                                className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs font-medium text-foreground"
                                            >
                                                {label}
                                            </span>
                                        ))}
                                        {moreCount > 0 && (
                                            <span className="text-xs text-muted-foreground">
                                                +{moreCount} more
                                            </span>
                                        )}
                                    </>
                                )}
                            </div>
                            <BaseSelect.Icon>
                                { selectedValues.length <= 0 &&<ChevronDown className={icon()} />}
                            </BaseSelect.Icon>
                        </BaseSelect.Trigger>
                        <BaseSelect.Portal>
                            <BaseSelect.Positioner anchor={triggerRef} className="z-50" sideOffset={4}>
                                <BaseSelect.Popup className={content()}>
                                    <div className={viewport()}>
                                        {options.length === 0 ? (
                                            <div className="py-2 px-8 text-sm text-muted-foreground italic text-center">
                                                {emptyText}
                                            </div>
                                        ) : (
                                            options.map((option) => (
                                                <button
                                                    key={option.value}
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleValueChange(option.value);
                                                    }}
                                                    className={cn(
                                                        item(),
                                                        'text-left',
                                                        selectedValues.includes(option.value) && 'bg-muted text-foreground'
                                                    )}
                                                >
                                                    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                                                        {selectedValues.includes(option.value) && <Check className="h-4 w-4" />}
                                                    </span>
                                                    <span>{option.label}</span>
                                                </button>
                                            ))
                                        )}
                                    </div>
                                </BaseSelect.Popup>
                            </BaseSelect.Positioner>
                        </BaseSelect.Portal>
                    </BaseSelect.Root>

                    {clearable && selectedValues.length > 0 && (
                        <button
                            type="button"
                            aria-label={clearLabel}
                            onMouseDown={handleClear}
                            className="cursor-pointer absolute right-1 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full text-muted-foreground hover:bg-red-50 hover:text-red-500 transition-colors z-10"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    )}
                </div>

                {description && !error && (
                    <p className="text-[0.8rem] text-muted-foreground">{description}</p>
                )}
                {error && (
                    <p className="text-[0.8rem] font-medium text-danger">{error}</p>
                )}
            </div>
        );
    }
);

MultiSelect.displayName = 'MultiSelect';

export { MultiSelect };
