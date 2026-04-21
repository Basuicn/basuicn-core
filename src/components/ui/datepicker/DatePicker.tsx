'use client';
import * as React from 'react';
import { Popover as BasePopover } from '@base-ui/react';
import { DayPicker, type DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, ChevronDown, Clock } from 'lucide-react';
import { tv } from 'tailwind-variants';
import * as locales from 'react-day-picker/locale';

import 'react-day-picker/dist/style.css';
import { Button } from '../button/Button';
import { TimePicker, type TimePickerStyle } from './TimePicker';
import {
    type TimeFormat,
    type TimeParts,
    DEFAULT_TIME,
    parseTimeParts,
    buildTimeString,
    applyTimeToDate,
    dateToTimeParts,
    formatDateDisplay,
} from './time-helpers';

// ---------- types ----------

export type { TimeFormat, TimePickerStyle };
export type DatePickerMode = 'single' | 'range' | 'time-only';

export interface DatePickerProps {
    mode?: DatePickerMode;
    date?: Date | DateRange;
    onDateChange?: (date: Date | DateRange | undefined) => void;
    onChange?: (date: Date | DateRange | undefined) => void;
    timeValue?: string;
    onTimeChange?: (time: string) => void;
    label?: string;
    placeholder?: string;
    disablePastDates?: boolean;
    showTime?: boolean;
    timeFormat?: TimeFormat;
    timePickerStyle?: TimePickerStyle;
    disabled?: boolean;
    className?: string;
    description?: string;
    error?: string;
    locale?: keyof typeof locales;
}

// ---------- styles ----------

const popoverContent = tv({
    base: 'z-50 rounded-xl border border-border bg-background text-foreground shadow-xl outline-none data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-side-bottom:slide-in-from-top-2 data-side-left:slide-in-from-right-2 data-side-right:slide-in-from-left-2 data-side-top:slide-in-from-bottom-2',
});

// ---------- main component ----------

export const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(({
    mode = 'single',
    date,
    onDateChange,
    onChange,
    timeValue,
    onTimeChange,
    label,
    placeholder = 'Select date...',
    disablePastDates = false,
    showTime = false,
    timeFormat = 'HH:mm:ss',
    timePickerStyle = 'select',
    disabled = false,
    className,
    description,
    error,
    locale: localeKey = 'vi',
}, ref) => {
    const [open, setOpen] = React.useState(false);
    const triggerRef = React.useRef<HTMLButtonElement>(null);
    const resolvedLocale = locales[localeKey];

    const initParts = React.useMemo<TimeParts>(() => {
        if (mode === 'time-only' && timeValue) return parseTimeParts(timeValue);
        if (date instanceof Date) return dateToTimeParts(date);
        return DEFAULT_TIME;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [timeParts, setTimeParts] = React.useState<TimeParts>(initParts);

    React.useEffect(() => {
        if (mode === 'time-only' && timeValue) {
            setTimeParts(parseTimeParts(timeValue));
        } else if (date instanceof Date) {
            setTimeParts(dateToTimeParts(date));
        }
    }, [date, timeValue, mode]);

    const handlePartsChange = (newParts: TimeParts) => {
        setTimeParts(newParts);
        if (mode === 'time-only') {
            onTimeChange?.(buildTimeString(newParts, timeFormat));
            return;
        }
        if (date instanceof Date) {
            const newDate = applyTimeToDate(date, newParts);
            onDateChange?.(newDate);
            onChange?.(newDate);
        }
    };

    const handleDateSelect = (selectedDate: Date | DateRange | Date[] | undefined) => {
        if (!selectedDate) {
            onDateChange?.(undefined);
            onChange?.(undefined);
            return;
        }
        if (mode === 'single' && showTime && selectedDate instanceof Date) {
            const newDate = applyTimeToDate(selectedDate, timeParts);
            onDateChange?.(newDate);
            onChange?.(newDate);
        } else {
            onDateChange?.(selectedDate as DateRange);
            onChange?.(selectedDate as DateRange);
        }
    };

    const triggerLabel = React.useMemo(() => {
        if (mode === 'time-only') {
            const val = timeValue ?? buildTimeString(timeParts, timeFormat);
            if (!val || val === '00' || val === '00:00' || val === '00:00:00')
                return <span className="text-muted-foreground">{placeholder || 'Select time...'}</span>;
            return <span>{val}</span>;
        }

        if (!date) return <span className="text-muted-foreground">{placeholder}</span>;

        if (mode === 'single' && date instanceof Date) {
            return <span>{formatDateDisplay(date, showTime, timeFormat)}</span>;
        }

        if (mode === 'range') {
            const range = date as DateRange;
            if (range.from && range.to) {
                return (
                    <span>
                        {format(range.from, 'dd/MM/yyyy')} – {format(range.to, 'dd/MM/yyyy')}
                    </span>
                );
            }
            if (range.from) return <span>{format(range.from, 'dd/MM/yyyy')} –</span>;
        }

        return <span className="text-muted-foreground">{placeholder}</span>;
    }, [date, mode, showTime, timeFormat, timeValue, timeParts, placeholder]);

    const isTimeMode = mode === 'time-only';
    const needsTimePicker = isTimeMode || (mode === 'single' && showTime);

    return (
        <div ref={ref} className={`flex flex-col gap-1.5 ${className || ''}`}>
            {label && (
                <label className="text-sm font-medium text-foreground ">
                    {label}
                </label>
            )}

            <BasePopover.Root open={open} onOpenChange={disabled ? undefined : setOpen}>
                <BasePopover.Trigger
                    render={
                        <button
                            ref={triggerRef}
                            type="button"
                            disabled={disabled}
                            className={[
                                'flex h-10 w-full items-center gap-2 rounded-lg border bg-background px-3 py-2 text-sm',
                                'ring-offset-background transition-shadow',
                                'hover:border-primary focus:border-primary focus:outline-none',
                                'disabled:cursor-not-allowed disabled:opacity-50',
                                error ? 'border-danger focus:border-danger' : 'border-border',
                                'group',
                            ].join(' ')}
                        >
                            {isTimeMode ? (
                                <Clock className="h-4 w-4 shrink-0 text-muted-foreground" />
                            ) : (
                                <CalendarIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
                            )}
                            <div className="flex-1 truncate text-left">{triggerLabel}</div>
                            <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-open:rotate-180" />
                        </button>
                    }
                />

                <BasePopover.Portal>
                    <BasePopover.Positioner anchor={triggerRef} sideOffset={6} style={{ zIndex: 9999 }}>
                        <BasePopover.Popup className={popoverContent()}>
                            {!isTimeMode && mode === 'single' && (
                                <div className="p-2 flex justify-center">
                                    <DayPicker
                                        mode="single"
                                        locale={resolvedLocale}
                                        selected={date as Date | undefined}
                                        onSelect={(d) => handleDateSelect(d)}
                                        disabled={disablePastDates ? [{ before: new Date() }] : undefined}
                                        className="rdp-custom"
                                    />
                                </div>
                            )}
                            {!isTimeMode && mode === 'range' && (
                                <div className="p-2 flex justify-center">
                                    <DayPicker
                                        mode="range"
                                        locale={resolvedLocale}
                                        selected={date as DateRange | undefined}
                                        onSelect={(d) => handleDateSelect(d)}
                                        disabled={disablePastDates ? [{ before: new Date() }] : undefined}
                                        className="rdp-custom"
                                    />
                                </div>
                            )}

                            {needsTimePicker && (
                                <div className={`border-t border-border p-3 flex flex-col gap-2 ${isTimeMode ? 'border-t-0' : ''}`}>
                                    <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                                        <Clock className="w-3.5 h-3.5" />
                                        <span>
                                            {timeFormat === 'HH' ? 'Select hour' : timeFormat === 'HH:mm' ? 'Hour : Minute' : 'Hour : Minute : Second'}
                                        </span>
                                    </div>
                                    <TimePicker
                                        parts={timeParts}
                                        onChange={handlePartsChange}
                                        timeFormat={timeFormat}
                                        timePickerStyle={timePickerStyle}
                                    />
                                </div>
                            )}

                            <div className="flex items-center justify-between gap-2 p-3 border-t border-border">
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (mode === 'time-only') {
                                            setTimeParts(DEFAULT_TIME);
                                            onTimeChange?.('');
                                        } else {
                                            onDateChange?.(undefined);
                                        }
                                    }}
                                    className="text-xs text-muted-foreground hover:text-foreground transition-colors underline-offset-2 hover:underline"
                                >
                                    Clear
                                </button>
                                <Button size="sm" onClick={() => setOpen(false)}>
                                    Confirm
                                </Button>
                            </div>
                        </BasePopover.Popup>
                    </BasePopover.Positioner>
                </BasePopover.Portal>
            </BasePopover.Root>
            {description && !error && (
                <p className="text-[0.8rem] text-muted-foreground">{description}</p>
            )}
            {error && (
                <p className="text-[0.8rem] font-medium text-danger">{error}</p>
            )}
        </div>
    );
});

DatePicker.displayName = "DatePicker";
