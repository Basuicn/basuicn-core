import { useState } from "react";
import {
    DatePicker,
    DateRangePicker,
    Label,
    Group,
    DateInput,
    DateSegment,
    Button as AriaButton,
    Popover,
    Dialog,
    Calendar,
    RangeCalendar,
    CalendarGrid,
    CalendarCell,
    Heading,
    TimeField,
    type DatePickerProps,
    type DateRangePickerProps,
    type DateValue,
} from "react-aria-components";
import { today, now, getLocalTimeZone, toCalendarDateTime } from "@internationalized/date";
import { tv } from "tailwind-variants";
import { cn } from "@lib/utils/cn";
import * as Icons from "@components/icons";

// --- Styles ---

const fieldStyles = tv({
    base: "flex items-center gap-2 bg-white border border-gray-300 rounded-lg shadow-sm outline-none transition-all group focus-within:ring-2",
    variants: {
        variant: {
            primary: "focus-within:border-primary focus-within:ring-primary/20",
            secondary: "focus-within:border-secondary focus-within:ring-secondary/20",
            danger: "focus-within:border-danger focus-within:ring-danger/20",
            success: "focus-within:border-success focus-within:ring-success/20",
            warning: "focus-within:border-warning focus-within:ring-warning/20",
        },
        size: {
            xs: "px-2 py-1 text-xs",
            sm: "px-3 py-1.5 text-sm",
            md: "px-4 py-2 text-sm",
            lg: "px-5 py-2.5 text-base",
        },
        isDisabled: {
            true: "opacity-50 cursor-not-allowed bg-gray-50",
        }
    },
    defaultVariants: {
        variant: "primary",
        size: "md",
    }
});

const segmentStyles = tv({
    base: "px-0.5 rounded-sm outline-none focus:bg-primary focus:text-white tabular-nums",
    variants: {
        isPlaceholder: {
            true: "important:text-gray-400 font-normal",
        },
        type: {
            literal: "px-0",
        }
    }
});

const popoverStyles = tv({
    base: "bg-white border border-gray-200 rounded-xl shadow-lg entering:animate-in entering:fade-in entering:zoom-in-95 exiting:animate-out exiting:fade-out exiting:zoom-out-95 origin-top z-50 outline-none max-h-[calc(var(--visual-viewport-height)-20px)] overflow-y-auto scrollbar-hide",
});

const calendarCellStyles = tv({
    base: "w-9 h-9 flex items-center justify-center rounded-lg text-sm cursor-pointer transition-colors outline-none",
    variants: {
        variant: {
            primary: "hover:bg-primary/10 data-selected:bg-primary data-selected:text-white",
            secondary: "hover:bg-secondary/10 data-selected:bg-secondary data-selected:text-white",
            danger: "hover:bg-danger/10 data-selected:bg-danger data-selected:text-white",
            success: "hover:bg-success/10 data-selected:bg-success data-selected:text-white",
            warning: "hover:bg-warning/10 data-selected:bg-warning data-selected:text-white",
        },
        isToday: {
            true: "font-bold decoration-primary decoration-2 underline-offset-4",
        },
        isDisabled: {
            true: "text-gray-300 cursor-not-allowed",
        },
        isUnavailable: {
            true: "text-red-400 line-through opacity-50",
        },
        isSelected: {
            true: "",
        },
        isOutsideMonth: {
            true: "text-gray-400",
        }
    },
    defaultVariants: {
        variant: "primary",
    }
});

// --- Components ---

interface CustomInputDateProps<T extends DateValue> extends Omit<DatePickerProps<T>, "children"> {
    label?: string;
    variant?: "primary" | "secondary" | "danger" | "success" | "warning";
    size?: "xs" | "sm" | "md" | "lg";
    showTime?: boolean;
    isRange?: boolean;
    className?: string;
}

interface CustomInputDateRangeProps<T extends DateValue> extends Omit<DateRangePickerProps<T>, "children"> {
    label?: string;
    variant?: "primary" | "secondary" | "danger" | "success" | "warning";
    size?: "xs" | "sm" | "md" | "lg";
    showTime?: boolean;
    isRange?: boolean;
    className?: string;
}

type InputDateProps<T extends DateValue> = CustomInputDateProps<T> | CustomInputDateRangeProps<T>;

export default function InputDate<T extends DateValue>(props: InputDateProps<T>) {
    const { label, variant = "primary", size = "md", showTime = false, isRange = false, className, ...rest } = props;

    // Sử dụng state để đồng bộ hóa giữa các thành phần
    const [value, setValue] = useState<any>(props.value || props.defaultValue || null);
    const [isOpen, setIsOpen] = useState(false);

    const handleValueChange = (newVal: any) => {
        let finalVal = newVal;

        // Chuyển đổi CalendarDate sang CalendarDateTime nếu showTime=true để tránh lỗi granularity
        if (showTime && newVal) {
            if (isRange) {
                const start = newVal.start && !('hour' in newVal.start) ? toCalendarDateTime(newVal.start) : newVal.start;
                const end = newVal.end && !('hour' in newVal.end) ? toCalendarDateTime(newVal.end) : newVal.end;
                finalVal = { start, end };
            } else {
                if (!('hour' in newVal)) {
                    finalVal = toCalendarDateTime(newVal);
                }
            }
        }

        setValue(finalVal);
        // @ts-ignore - Hỗ trợ cả DatePicker và DateRangePicker
        props.onChange?.(finalVal);
    };

    const handleNow = () => {
        let current: any = showTime ? now(getLocalTimeZone()) : today(getLocalTimeZone());

        // Chuyển sang CalendarDateTime để không hiện GMT+7
        if (showTime && 'timeZone' in current) {
            current = toCalendarDateTime(current);
        }

        if (isRange) {
            handleValueChange({ start: current, end: current });
        } else {
            handleValueChange(current);
        }
    };

    const renderField = (isRangeField: boolean) => (
        <Group className={fieldStyles({ variant, size, isDisabled: props.isDisabled })}>
            <DateInput slot={isRangeField ? "start" : undefined} className="flex flex-1 items-center">
                {(segment) => (
                    <DateSegment
                        segment={segment}
                        className={segmentStyles({ isPlaceholder: segment.isPlaceholder, type: segment.type === "literal" ? "literal" : undefined })}
                    />
                )}
            </DateInput>
            {isRangeField && <span className="text-gray-400 px-1">—</span>}
            {isRangeField && (
                <DateInput slot="end" className="flex flex-1 items-center">
                    {(segment) => (
                        <DateSegment
                            segment={segment}
                            className={segmentStyles({ isPlaceholder: segment.isPlaceholder, type: segment.type === "literal" ? "literal" : undefined })}
                        />
                    )}
                </DateInput>
            )}
            <AriaButton className="p-1 rounded-md text-gray-400 hover:text-gray-600 outline-none transition-colors">
                <Icons.Calendar className={cn(
                    size === "xs" ? "w-3 h-3" :
                        size === "sm" ? "w-4 h-4" :
                            size === "md" ? "w-5 h-5" : "w-6 h-6"
                )} />
            </AriaButton>
        </Group>
    );

    const renderCalendar = () => (
        <Calendar
            value={value}
            onChange={handleValueChange}
            className="p-4 outline-none"
        >
            <header className="flex items-center justify-between mb-2">
                <AriaButton slot="previous" className="p-1.5 rounded-md hover:bg-gray-100 outline-none">
                    <Icons.ChevronLeft className="w-5 h-5" />
                </AriaButton>
                <Heading className="font-semibold text-sm" />
                <AriaButton slot="next" className="p-1.5 rounded-md hover:bg-gray-100 outline-none">
                    <Icons.ChevronRight className="w-5 h-5" />
                </AriaButton>
            </header>
            <CalendarGrid className="border-separate border-spacing-1">
                {(date) => (
                    <CalendarCell
                        date={date}
                        className={({ isSelected, isToday, isDisabled, isUnavailable, isOutsideMonth }) =>
                            calendarCellStyles({ variant, isSelected, isToday, isDisabled, isUnavailable, isOutsideMonth })
                        }
                    />
                )}
            </CalendarGrid>
        </Calendar>
    );

    const renderRangeCalendar = () => (
        <RangeCalendar
            value={value}
            onChange={handleValueChange}
            className="p-4 outline-none"
        >
            <header className="flex items-center justify-between mb-2">
                <AriaButton slot="previous" className="p-1.5 rounded-md hover:bg-gray-100 outline-none">
                    <Icons.ChevronLeft className="w-5 h-5" />
                </AriaButton>
                <Heading className="font-semibold text-sm" />
                <AriaButton slot="next" className="p-1.5 rounded-md hover:bg-gray-100 outline-none">
                    <Icons.ChevronRight className="w-5 h-5" />
                </AriaButton>
            </header>
            <CalendarGrid className="border-separate border-spacing-1">
                {(date) => (
                    <CalendarCell
                        date={date}
                        className={({ isSelected, isToday, isDisabled, isUnavailable, isOutsideMonth }) =>
                            calendarCellStyles({ variant, isSelected, isToday, isDisabled, isUnavailable, isOutsideMonth })
                        }
                    />
                )}
            </CalendarGrid>
        </RangeCalendar>
    );

    const renderTimeSection = () => {
        if (!showTime) return null;

        return (
            <div className="p-4 border-t border-gray-100 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-500">
                        <Icons.Clock className="w-4 h-4" />
                        <span className="text-xs font-semibold uppercase tracking-wider">Thời gian</span>
                    </div>
                    <AriaButton
                        onPress={handleNow}
                        className="text-xs text-primary font-medium hover:underline underline-offset-2 flex items-center gap-1"
                    >
                        Hiện tại
                    </AriaButton>
                </div>
                <div className="flex items-center gap-2">
                    {isRange ? (
                        <>
                            <TimeField
                                slot="start"
                                granularity="second"
                                value={value?.start}
                                onChange={(val) => handleValueChange({ ...value, start: val })}
                                className="flex-1"
                            >
                                <Group className={cn("flex items-center justify-center border border-gray-200 rounded-md bg-gray-50/50", size === 'xs' ? 'p-1' : 'p-2')}>
                                    <DateInput className="flex items-center">
                                        {(segment) => <DateSegment segment={segment} className="outline-none focus:bg-primary focus:text-white rounded-sm px-0.5 tabular-nums" />}
                                    </DateInput>
                                </Group>
                            </TimeField>
                            <span className="text-gray-400 text-xs">—</span>
                            <TimeField
                                slot="end"
                                granularity="second"
                                value={value?.end}
                                onChange={(val) => handleValueChange({ ...value, end: val })}
                                className="flex-1"
                            >
                                <Group className={cn("flex items-center justify-center border border-gray-200 rounded-md bg-gray-50/50", size === 'xs' ? 'p-1' : 'p-2')}>
                                    <DateInput className="flex items-center">
                                        {(segment) => <DateSegment segment={segment} className="outline-none focus:bg-primary focus:text-white rounded-sm px-0.5 tabular-nums" />}
                                    </DateInput>
                                </Group>
                            </TimeField>
                        </>
                    ) : (
                        <TimeField
                            granularity="second"
                            value={value}
                            onChange={handleValueChange}
                            className="w-full"
                            isDisabled={!value}
                        >
                            <Group className={cn("flex items-center justify-center border border-gray-200 rounded-md bg-gray-50/50", size === 'xs' ? 'p-1' : 'p-2')}>
                                <DateInput className="flex items-center">
                                    {(segment) => <DateSegment segment={segment} className="outline-none focus:bg-primary focus:text-white rounded-sm px-0.5 tabular-nums" />}
                                </DateInput>
                            </Group>
                        </TimeField>
                    )}
                </div>
            </div>
        );
    };

    if (isRange) {
        const rangeProps = rest as DateRangePickerProps<T>;
        return (
            <div className={cn("flex flex-col gap-1.5", className)}>
                {label && <Label className="text-sm font-medium text-gray-700 cursor-default">{label}</Label>}
                <DateRangePicker
                    {...rangeProps}
                    value={value}
                    onChange={handleValueChange}
                    isOpen={isOpen}
                    onOpenChange={setIsOpen}
                    shouldCloseOnSelect={false}
                    granularity={showTime ? "second" : "day"}
                >
                    {renderField(true)}
                    <Popover className={popoverStyles} offset={8}>
                        <Dialog className="outline-none">
                            <div className="flex flex-col">
                                {renderRangeCalendar()}
                                {renderTimeSection()}
                            </div>
                        </Dialog>
                    </Popover>
                </DateRangePicker>
            </div>
        );
    }

    const singleProps = rest as DatePickerProps<T>;
    return (
        <div className={cn("flex flex-col gap-1.5", className)}>
            {label && <Label className="text-sm font-medium text-gray-700 cursor-default">{label}</Label>}
            <DatePicker
                {...singleProps}
                value={value}
                onChange={handleValueChange}
                isOpen={isOpen}
                onOpenChange={setIsOpen}
                shouldCloseOnSelect={false}
                granularity={showTime ? "second" : "day"}
            >
                {renderField(false)}
                <Popover className={popoverStyles} offset={8}>
                    <Dialog className="outline-none">
                        <div className="flex flex-col">
                            {renderCalendar()}
                            {renderTimeSection()}
                        </div>
                    </Dialog>
                </Popover>
            </DatePicker>
        </div>
    );
}
