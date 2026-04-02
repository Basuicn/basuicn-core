import * as React from 'react';
import { Select as BaseSelect } from '@base-ui/react';
import { tv } from 'tailwind-variants';
import { cn } from '@lib/utils/cn';
import { ChevronDown, Check, X } from 'lucide-react';

const selectVariants = tv({
    slots: {
        trigger: 'flex h-10 w-full items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background focus:border-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-shadow group cursor-pointer',
        content: 'relative z-50 max-h-[300px] min-w-[var(--anchor-width)] overflow-hidden rounded-md border border-border bg-background text-foreground shadow-md data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-side-bottom:slide-in-from-top-2 data-side-left:slide-in-from-right-2 data-side-right:slide-in-from-left-2 data-side-top:slide-in-from-bottom-2',
        viewport: 'p-1',
        item: 'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-muted focus:text-foreground data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-muted data-highlighted:text-foreground',
        icon: 'h-4 w-4 opacity-50 transition-transform duration-200 group-data-open:rotate-180',
    }
});

const { trigger, content, viewport, item, icon } = selectVariants();

export interface SelectProps extends Omit<React.ComponentPropsWithoutRef<typeof BaseSelect.Root>, 'value' | 'defaultValue'> {
    label?: string;
    description?: string;
    error?: string;
    placeholder?: string;
    options: { label: string; value: string }[];
    id?: string;
    className?: string;
    value?: string;
    defaultValue?: string;
    clearable?: boolean;
    onChange?: (value: string) => void;
    emptyText?: string;
    clearLabel?: string;
}

const Select = React.forwardRef<React.ElementRef<typeof BaseSelect.Trigger>, SelectProps>(
    ({ label, description, error, placeholder = 'Chọn...', options, id, className, clearable = true, onChange, onValueChange, value, defaultValue, emptyText = 'Không tìm thấy kết quả.', clearLabel = 'Xóa lựa chọn', ...props }, ref) => {
        const triggerRef = React.useRef<HTMLButtonElement>(null);

        const [selectedValue, setSelectedValue] = React.useState<string>(value ?? defaultValue ?? '');

        React.useEffect(() => {
            if (value !== undefined) setSelectedValue(value);
        }, [value]);

        const handleValueChange = (val: unknown) => {
            const strVal = val as string;
            setSelectedValue(strVal);
            onChange?.(strVal);
            // @ts-expect-error Base UI type mapping for onValueChange expects strict context which is internal
            onValueChange?.(strVal, {
                event: new Event('change')
            });
        };

        const handleClear = (e: React.MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setSelectedValue('');
            onChange?.('');
            // @ts-expect-error Base UI type mapping for onValueChange expects strict context which is internal
            onValueChange?.('', {
                event: new Event('change')
            });
        };

        const selectedLabel = options.find((o) => o.value === selectedValue)?.label;

        return (
            <div className="flex flex-col gap-1.5 w-full">
                {label && (
                    <label className="text-sm font-medium text-foreground leading-none">
                        {label}
                    </label>
                )}

                {/*
                  * Wrapper relative: nút X nằm NGOÀI BaseSelect.Trigger (absolute)
                  * → click X không bao giờ bubble lên Trigger → popup không mở
                  */}
                <div className="relative w-full">
                    <BaseSelect.Root
                        value={value}
                        defaultValue={defaultValue}
                        onValueChange={handleValueChange}
                        {...props}
                    >
                        <BaseSelect.Trigger
                            ref={(node) => {
                                triggerRef.current = node;
                                if (typeof ref === 'function') ref(node);
                                else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
                            }}
                            className={trigger({ className: cn(className, error ? 'border-danger focus:border-danger' : '') })}
                            id={id}
                        >
                            <span className={selectedLabel ? 'text-foreground' : 'text-muted-foreground'}>
                                {selectedLabel ?? placeholder}
                            </span>
                            <BaseSelect.Icon>
                                <ChevronDown className={icon()} />
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
                                                <BaseSelect.Item key={option.value} value={option.value} className={item()}>
                                                    <BaseSelect.ItemIndicator className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                                                        <Check className="h-4 w-4" />
                                                    </BaseSelect.ItemIndicator>
                                                    <BaseSelect.ItemText>{option.label}</BaseSelect.ItemText>
                                                </BaseSelect.Item>
                                            ))
                                        )}
                                    </div>
                                </BaseSelect.Popup>
                            </BaseSelect.Positioner>
                        </BaseSelect.Portal>
                    </BaseSelect.Root>

                    {/* Nút X đặt NGOÀI Trigger, absolute position — click không bubble lên Trigger */}
                    {clearable && selectedValue && (
                        <button
                            type="button"
                            aria-label={clearLabel}
                            onMouseDown={handleClear}
                            className="cursor-pointer absolute right-8 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full text-muted-foreground hover:bg-red-50 hover:text-red-500 transition-colors z-10"
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

Select.displayName = 'Select';

export { Select };
