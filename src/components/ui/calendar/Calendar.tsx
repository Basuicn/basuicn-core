'use client';

import * as React from 'react';
import { DayPicker, type DateRange, type Matcher } from 'react-day-picker';
import { tv, type VariantProps } from 'tailwind-variants';
import * as locales from 'react-day-picker/locale';

import 'react-day-picker/dist/style.css';

const calendarVariants = tv({
  base: 'rdp-custom',
  variants: {
    size: {
      sm: '[&_.rdp-day]:h-7 [&_.rdp-day]:w-7 [&_.rdp-day]:text-xs',
      md: '[&_.rdp-day]:h-9 [&_.rdp-day]:w-9 [&_.rdp-day]:text-sm',
      lg: '[&_.rdp-day]:h-11 [&_.rdp-day]:w-11 [&_.rdp-day]:text-base',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const wrapperVariants = tv({
  base: 'inline-block rounded-xl border border-border bg-background p-3 shadow-sm',
});

export type CalendarMode = 'single' | 'range' | 'multiple';

/** Props for the Calendar component */
export interface CalendarProps extends VariantProps<typeof calendarVariants> {
  /** Selection mode: single date, date range, or multiple dates */
  mode?: CalendarMode;
  /** Currently selected value (Date, DateRange, or Date[] depending on mode) */
  selected?: Date | DateRange | Date[];
  /** Callback fired when the selection changes */
  onSelect?: (value: Date | DateRange | Date[] | undefined) => void;
  /** Disable all dates before today */
  disablePastDates?: boolean;
  /** Disable all dates after today */
  disableFutureDates?: boolean;
  /** Disable the entire calendar */
  disabled?: boolean;
  /** Locale key from react-day-picker/locale (defaults to 'enUS') */
  locale?: keyof typeof locales;
  className?: string;
  /** Additional class name for the outer wrapper */
  wrapperClassName?: string;
  /** Number of months to display side by side */
  numberOfMonths?: number;
  /** Show days from adjacent months */
  showOutsideDays?: boolean;
}

const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(({
  mode = 'single',
  selected,
  onSelect,
  disablePastDates = false,
  disableFutureDates = false,
  disabled = false,
  locale = 'enUS',
  className,
  wrapperClassName,
  size,
  numberOfMonths = 1,
  showOutsideDays = true,
}, ref) => {
  const getDisabled = (): Matcher | Matcher[] | undefined => {
    if (disabled) return true;
    if (disablePastDates && disableFutureDates) return () => true;
    if (disablePastDates) return { before: new Date() };
    if (disableFutureDates) return { after: new Date() };
    return undefined;
  };

  const commonProps = {
    locale: locales[locale as keyof typeof locales],
    disabled: getDisabled(),
    numberOfMonths,
    showOutsideDays,
    className: calendarVariants({ size, className }),
  };

  return (
    <div ref={ref} className={wrapperVariants({ className: wrapperClassName })}>
      {mode === 'range' ? (
        <DayPicker
          {...commonProps}
          mode="range"
          selected={selected as DateRange | undefined}
          onSelect={(d) => onSelect?.(d)}
        />
      ) : mode === 'multiple' ? (
        <DayPicker
          {...commonProps}
          mode="multiple"
          selected={selected as Date[] | undefined}
          onSelect={(d) => onSelect?.(d)}
        />
      ) : (
        <DayPicker
          {...commonProps}
          mode="single"
          selected={selected as Date | undefined}
          onSelect={(d) => onSelect?.(d)}
        />
      )}
    </div>
  );
});

Calendar.displayName = 'Calendar';

export { Calendar };
