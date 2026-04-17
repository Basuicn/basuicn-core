import React from 'react';
import type { TimeParts, TimeFormat } from './time-helpers';
import { hoursOptions, minutesOptions, secondsOptions } from './time-helpers';

export type TimePickerStyle = 'input' | 'select';

// ─── NativeScrollSelect ───────��─────────────────────────────────────────────

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

// ─── TimePicker ──────���──────────────────────────────────────────────────────

export interface TimePickerProps {
    parts: TimeParts;
    onChange: (parts: TimeParts) => void;
    timeFormat: TimeFormat;
    timePickerStyle: TimePickerStyle;
}

export const TimePicker: React.FC<TimePickerProps> = ({ parts, onChange, timeFormat, timePickerStyle }) => {
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
