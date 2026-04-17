import { format } from 'date-fns';

export type TimeFormat = 'HH' | 'HH:mm' | 'HH:mm:ss';

export interface TimeParts {
    h: string;
    m: string;
    s: string;
}

export const DEFAULT_TIME: TimeParts = { h: '00', m: '00', s: '00' };

export function parseTimeParts(timeStr: string): TimeParts {
    const [h = '00', m = '00', s = '00'] = timeStr.split(':');
    return {
        h: h.padStart(2, '0'),
        m: m.padStart(2, '0'),
        s: s.padStart(2, '0'),
    };
}

export function buildTimeString(parts: TimeParts, fmt: TimeFormat): string {
    if (fmt === 'HH') return parts.h;
    if (fmt === 'HH:mm') return `${parts.h}:${parts.m}`;
    return `${parts.h}:${parts.m}:${parts.s}`;
}

export function applyTimeToDate(base: Date, parts: TimeParts): Date {
    const d = new Date(base);
    d.setHours(Number(parts.h), Number(parts.m), Number(parts.s), 0);
    return d;
}

export function dateToTimeParts(d: Date): TimeParts {
    return {
        h: d.getHours().toString().padStart(2, '0'),
        m: d.getMinutes().toString().padStart(2, '0'),
        s: d.getSeconds().toString().padStart(2, '0'),
    };
}

export function formatDateDisplay(d: Date, showTime: boolean, fmt: TimeFormat): string {
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

export const hoursOptions = padOptions(24);
export const minutesOptions = padOptions(60);
export const secondsOptions = padOptions(60);
