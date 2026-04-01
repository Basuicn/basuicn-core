import * as React from 'react';
import { Select as BaseSelect } from '@base-ui/react';
import { tv } from 'tailwind-variants';
import { ChevronDown, Check } from 'lucide-react';

const selectVariants = tv({
    slots: {
        trigger: 'flex h-10 w-full items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:border-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-shadow group',
        content: 'relative z-50 max-h-[300px] min-w-[var(--anchor-width)] overflow-hidden rounded-md border border-border bg-background text-foreground shadow-md data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-side-bottom:slide-in-from-top-2 data-side-left:slide-in-from-right-2 data-side-right:slide-in-from-left-2 data-side-top:slide-in-from-bottom-2',
        viewport: 'p-1',
        item: 'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-muted focus:text-foreground data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-muted data-highlighted:text-foreground',
        label: 'py-1.5 pl-8 pr-2 text-sm font-semibold',
        separator: '-mx-1 my-1 h-px bg-muted',
        icon: 'h-4 w-4 opacity-50 transition-transform duration-200 group-data-open:rotate-180',
    }
});

const { trigger, content, viewport, item, label, separator, icon } = selectVariants();

export interface SelectProps extends React.ComponentPropsWithoutRef<typeof BaseSelect.Root> {
    label?: string;
    description?: string;
    error?: string;
    placeholder?: string;
    options: { label: string; value: string }[];
    id?: string;
    className?: string;
    onChange?: (value: string) => void;
}

const Select = React.forwardRef<React.ElementRef<typeof BaseSelect.Trigger>, SelectProps>(
    ({ label, description, error, placeholder, options, id, className, onChange, onValueChange, ...props }, ref) => {
        const triggerRef = React.useRef<HTMLButtonElement>(null);

        return (
            <div className="flex flex-col gap-1.5 w-full">
                {label && (
                    <label className="text-sm font-medium text-foreground leading-none">
                        {label}
                    </label>
                )}
                <BaseSelect.Root 
                    onValueChange={(val: any) => {
                        if (onChange) onChange(val as string);
                        if (onValueChange) onValueChange(val, {} as any);
                    }} 
                    {...props}
                >
                    <BaseSelect.Trigger
                        ref={(node) => {
                            triggerRef.current = node;
                            if (typeof ref === 'function') ref(node);
                            else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
                        }}
                        className={trigger({ className: `${className || ''} ${error ? 'border-danger focus:border-danger' : ''}` })}
                        id={id}
                    >
                        <BaseSelect.Value placeholder={placeholder} />
                        <BaseSelect.Icon>
                            <ChevronDown className={icon()} />
                        </BaseSelect.Icon>
                    </BaseSelect.Trigger>
                    <BaseSelect.Portal>
                        <BaseSelect.Positioner anchor={triggerRef} className="z-50" sideOffset={4}>
                            <BaseSelect.Popup className={content()}>
                                <div className={viewport()}>
                                    {options.map((option) => (
                                        <BaseSelect.Item key={option.value} value={option.value} className={item()}>
                                            <BaseSelect.ItemIndicator className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                                                <Check className="h-4 w-4" />
                                            </BaseSelect.ItemIndicator>
                                            <BaseSelect.ItemText>{option.label}</BaseSelect.ItemText>
                                        </BaseSelect.Item>
                                    ))}
                                </div>
                            </BaseSelect.Popup>
                        </BaseSelect.Positioner>
                    </BaseSelect.Portal>
                </BaseSelect.Root>
                {description && !error && (
                    <p className="text-[0.8rem] text-muted-foreground">{description}</p>
                )}
                {error && (
                    <p className="text-[0.8rem] font-medium text-danger">{error}</p>
                )}
            </div>
        )
    }
)
Select.displayName = 'Select';

export { Select };
