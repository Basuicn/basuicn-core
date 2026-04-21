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

// ---------- types ----------

export type TimeFormat = 'HH' | 'HH:mm' | 'HH:mm:ss';
export type DatePickerMode = 'single' | 'range' | 'time-only';
export type TimePickerStyle = 'input' | 'select';

interface TimeParts {
    h: string;
    m: string;
    s: string;
}

/** Props for the DatePicker component */
export interface DatePickerProps {
    /** Picker mode: single date, date range, or time-only */
    mode?: DatePickerMode;
    /** Selected date (Date for single, DateRange for range) */
    date?: Date | DateRange;
    /** Callback fired when the date changes */
    onDateChange?: (date: Date | DateRange | undefined) => void;
    /** Alternative callback (alias for onDateChange) */
    onChange?: (date: Date | DateRange | undefined) => void;
    /** Current time string, only used when mode is 'time-only' */
    timeValue?: string;
    /** Callback fired when the time value changes (time-only mode) */
    onTimeChange?: (time: string) => void;
    /** Label text displayed above the picker */
    label?: string;
    /** Placeholder text when no date is selected */
    placeholder?: string;
    /** Disable all dates before today */
    disablePastDates?: boolean;
    /** Show time picker alongside the calendar */
    showTime?: boolean;
    /** Time format: hours only, hours:minutes, or hours:minutes:seconds */
    timeFormat?: TimeFormat;
    /** Time picker UI style: native input or dropdown selects */
    timePickerStyle?: TimePickerStyle;
    /** Disable the entire picker */
    disabled?: boolean;
    className?: string;
    /** Helper text displayed below the picker */
    description?: string;
    /** Error message displayed below the picker (replaces description) */
    error?: string;
    required?: boolean;
}

// ---------- helpers ----------

const DEFAULT_TIME: TimeParts = { h: '00', m: '00', s: '00' };

function parseTimeParts(timeStr: string): TimeParts {
    const [h = '00', m = '00', s = '00'] = timeStr.split(':');
    return {
        h: h.padStart(2, '0'),
        m: m.padStart(2, '0'),
        s: s.padStart(2, '0'),
    };
}

function buildTimeString(parts: TimeParts, fmt: TimeFormat): string {
    if (fmt === 'HH') return parts.h;
    if (fmt === 'HH:mm') return `${parts.h}:${parts.m}`;
    return `${parts.h}:${parts.m}:${parts.s}`;
}

function applyTimeToDate(base: Date, parts: TimeParts): Date {
    const d = new Date(base);
    d.setHours(Number(parts.h), Number(parts.m), Number(parts.s), 0);
    return d;
}

function dateToTimeParts(d: Date): TimeParts {
    return {
        h: d.getHours().toString().padStart(2, '0'),
        m: d.getMinutes().toString().padStart(2, '0'),
        s: d.getSeconds().toString().padStart(2, '0'),
    };
}

function formatDateDisplay(d: Date, showTime: boolean, fmt: TimeFormat): string {
    const datePart = format(d, 'dd/MM/yyyy');
    if (!showTime) return datePart;
    if (fmt === 'HH') return `${datePart} ${format(d, 'HH')}h`;
    if (fmt === 'HH:mm') return `${datePart} ${format(d, 'HH:mm')}`;
    return `${datePart} ${format(d, 'HH:mm:ss')}`;
}

function padOptions(count: number) {
    return Array.from({ length: count }, (_, i) => ({
        label: i.toString().padStart(2, '0'),
        value: i.toString().padStart(2, '0'),
    }));
}

const hoursOptions = padOptions(24);
const minutesOptions = padOptions(60);
const secondsOptions = padOptions(60);

// ---------- styles ----------

const popoverContent = tv({
    base: 'z-50  rounded-xl border border-border bg-background text-foreground shadow-xl outline-none data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-side-bottom:slide-in-from-top-2 data-side-left:slide-in-from-right-2 data-side-right:slide-in-from-left-2 data-side-top:slide-in-from-bottom-2',
});

// ---------- sub-components ----------

interface NativeSelectProps {
    value: string;
    options: { label: string; value: string }[];
    onChange: (val: string) => void;
    'aria-label'?: string;
}

const NativeScrollSelect: React.FC<NativeSelectProps> = ({ value, options, onChange, 'aria-label': ariaLabel }) => (
    <select
        aria-label={ariaLabel}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 w-full rounded-md border border-border bg-background px-2 text-sm text-foreground focus:border-primary focus:outline-none"
    >
        {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
        ))}
    </select>
);

interface TimePickerProps {
    parts: TimeParts;
    onChange: (parts: TimeParts) => void;
    timeFormat: TimeFormat;
    timePickerStyle: TimePickerStyle;
}

const TimePicker: React.FC<TimePickerProps> = ({ parts, onChange, timeFormat, timePickerStyle }) => {
    const showMinutes = timeFormat === 'HH:mm' || timeFormat === 'HH:mm:ss';
    const showSeconds = timeFormat === 'HH:mm:ss';

    if (timePickerStyle === 'input') {
        const step = showSeconds ? 1 : 60;
        const rawValue = showSeconds
            ? `${parts.h}:${parts.m}:${parts.s}`
            : `${parts.h}:${parts.m}`;

        return (
            <input
                type="time"
                value={rawValue}
                step={step}
                onChange={(e) => {
                    const [h = '00', m = '00', s = '00'] = e.target.value.split(':');
                    onChange({ h: h.padStart(2, '0'), m: m.padStart(2, '0'), s: s.padStart(2, '0') });
                }}
                className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground focus:border-primary focus:outline-none"
            />
        );
    }

    return (
        <div className="flex items-center gap-1.5">
            <div className="flex-1">
                <NativeScrollSelect
                    aria-label="Hours"
                    value={parts.h}
                    options={hoursOptions}
                    onChange={(val) => onChange({ ...parts, h: val })}
                />
            </div>
            {showMinutes && (
                <>
                    <span className="text-sm font-bold text-muted-foreground">:</span>
                    <div className="flex-1">
                        <NativeScrollSelect
                            aria-label="Minutes"
                            value={parts.m}
                            options={minutesOptions}
                            onChange={(val) => onChange({ ...parts, m: val })}
                        />
                    </div>
                </>
            )}
            {showSeconds && (
                <>
                    <span className="text-sm font-bold text-muted-foreground">:</span>
                    <div className="flex-1">
                        <NativeScrollSelect
                            aria-label="Seconds"
                            value={parts.s}
                            options={secondsOptions}
                            onChange={(val) => onChange({ ...parts, s: val })}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

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
    required,
}, ref) => {
    const [open, setOpen] = React.useState(false);
    const triggerRef = React.useRef<HTMLButtonElement>(null);

    const timeParts = React.useMemo<TimeParts>(() => {
        if (mode === 'time-only' && timeValue) return parseTimeParts(timeValue);
        if (date instanceof Date) return dateToTimeParts(date);
        return DEFAULT_TIME;
    }, [date, timeValue, mode]);

    const rangeTimeParts = React.useMemo<{ from: TimeParts; to: TimeParts }>(() => {
        if (mode !== 'range') return { from: DEFAULT_TIME, to: DEFAULT_TIME };
        const range = date as DateRange | undefined;
        return {
            from: range?.from ? dateToTimeParts(range.from) : DEFAULT_TIME,
            to: range?.to ? dateToTimeParts(range.to) : DEFAULT_TIME,
        };
    }, [date, mode]);

    const emitRange = (newRange: DateRange | undefined) => {
        onDateChange?.(newRange);
        onChange?.(newRange);
    };

    const handlePartsChange = (newParts: TimeParts) => {
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

    const handleRangePartsChange = (newParts: TimeParts, which: 'from' | 'to') => {
        const range = date as DateRange | undefined;
        const target = range?.[which];
        if (!range || !target) return;
        emitRange({ ...range, [which]: applyTimeToDate(target, newParts) });
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
            return;
        }
        if (mode === 'range' && showTime) {
            const newRange = selectedDate as DateRange;
            const preserved: DateRange = {
                from: newRange.from ? applyTimeToDate(newRange.from, rangeTimeParts.from) : undefined,
                to: newRange.to ? applyTimeToDate(newRange.to, rangeTimeParts.to) : undefined,
            };
            emitRange(preserved);
            return;
        }
        // Because of our mode checking, we can be confident here
        onDateChange?.(selectedDate as DateRange);
        onChange?.(selectedDate as DateRange);
    };

    // ---------- render trigger label ----------
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
            const fmtOne = (d: Date) => (showTime ? formatDateDisplay(d, true, timeFormat) : format(d, 'dd/MM/yyyy'));
            if (range.from && range.to) {
                return <span>{fmtOne(range.from)} – {fmtOne(range.to)}</span>;
            }
            if (range.from) return <span>{fmtOne(range.from)} –</span>;
        }

        return <span className="text-muted-foreground">{placeholder}</span>;
    }, [date, mode, showTime, timeFormat, timeValue, timeParts, placeholder]);

    const isTimeMode = mode === 'time-only';
    const isRangeWithTime = mode === 'range' && showTime;
    const needsTimePicker = isTimeMode || (mode === 'single' && showTime);
    const timeLegend = timeFormat === 'HH' ? 'Select hour' : timeFormat === 'HH:mm' ? 'Hour : Minute' : 'Hour : Minute : Second';

    return (
        <div ref={ref} className={`flex flex-col gap-1.5 w-full ${className || ''}`}>
            {label && (
                <label className="text-sm font-medium text-foreground">
                    {label}
                    {required && <span className="ml-0.5 text-destructive">*</span>}
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
                    <BasePopover.Positioner anchor={triggerRef} sideOffset={6} className="z-50">
                        <BasePopover.Popup className={popoverContent()}>
                            {!isTimeMode && mode === 'single' && (
                                <div className="p-2 flex justify-center">
                                    <DayPicker
                                        mode="single"
                                        locale={locales.vi}
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
                                        locale={locales.vi}
                                        selected={date as DateRange | undefined}
                                        onSelect={(d) => handleDateSelect(d)}
                                        disabled={disablePastDates ? [{ before: new Date() }] : undefined}
                                        className="rdp-custom"
                                    />
                                </div>
                            )}

                            {/* Time picker — single / time-only */}
                            {needsTimePicker && (
                                <div className={`border-t border-border p-3 flex flex-col gap-2 ${isTimeMode ? 'border-t-0' : ''}`}>
                                    <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                                        <Clock className="w-3.5 h-3.5" />
                                        <span>{timeLegend}</span>
                                    </div>
                                    <TimePicker
                                        parts={timeParts}
                                        onChange={handlePartsChange}
                                        timeFormat={timeFormat}
                                        timePickerStyle={timePickerStyle}
                                    />
                                </div>
                            )}

                            {/* Time picker — range (2 bộ: Từ / Đến) */}
                            {isRangeWithTime && (() => {
                                const range = date as DateRange | undefined;
                                const hasFrom = !!range?.from;
                                const hasTo = !!range?.to;
                                return (
                                    <div className="border-t border-border p-3 flex flex-col gap-3">
                                        <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                                            <Clock className="w-3.5 h-3.5" />
                                            <span>{timeLegend}</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="flex flex-col gap-1.5">
                                                <span className="text-[11px] font-medium text-muted-foreground">Từ</span>
                                                <div className={!hasFrom ? 'pointer-events-none opacity-50' : ''}>
                                                    <TimePicker
                                                        parts={rangeTimeParts.from}
                                                        onChange={(p) => handleRangePartsChange(p, 'from')}
                                                        timeFormat={timeFormat}
                                                        timePickerStyle={timePickerStyle}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-1.5">
                                                <span className="text-[11px] font-medium text-muted-foreground">Đến</span>
                                                <div className={!hasTo ? 'pointer-events-none opacity-50' : ''}>
                                                    <TimePicker
                                                        parts={rangeTimeParts.to}
                                                        onChange={(p) => handleRangePartsChange(p, 'to')}
                                                        timeFormat={timeFormat}
                                                        timePickerStyle={timePickerStyle}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })()}

                            {/* Footer actions */}
                            <div className="flex items-center justify-between gap-2 p-3 border-t border-border">
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (mode === 'time-only') {
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
