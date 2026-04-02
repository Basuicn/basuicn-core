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

export interface CalendarProps extends VariantProps<typeof calendarVariants> {
  mode?: CalendarMode;
  selected?: Date | DateRange | Date[];
  onSelect?: (value: Date | DateRange | Date[] | undefined) => void;
  disablePastDates?: boolean;
  disableFutureDates?: boolean;
  disabled?: boolean;
  locale?: keyof typeof locales;
  className?: string;
  wrapperClassName?: string;
  numberOfMonths?: number;
  showOutsideDays?: boolean;
}

const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(({
  mode = 'single',
  selected,
  onSelect,
  disablePastDates = false,
  disableFutureDates = false,
  disabled = false,
  locale = 'vi',
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

  return (
    <div ref={ref} className={wrapperVariants({ className: wrapperClassName })}>
      {mode === 'single' && (
        <DayPicker
          locale={locales[locale as keyof typeof locales]}
          mode="single"
          selected={selected as Date | undefined}
          onSelect={(d) => onSelect?.(d)}
          disabled={getDisabled()}
          numberOfMonths={numberOfMonths}
          showOutsideDays={showOutsideDays}
          className={calendarVariants({ size, className })}
        />
      )}
      {mode === 'range' && (
        <DayPicker
          locale={locales[locale as keyof typeof locales]}
          mode="range"
          selected={selected as DateRange | undefined}
          onSelect={(d) => onSelect?.(d)}
          disabled={getDisabled()}
          numberOfMonths={numberOfMonths}
          showOutsideDays={showOutsideDays}
          className={calendarVariants({ size, className })}
        />
      )}
      {mode === 'multiple' && (
        <DayPicker
          locale={locales[locale as keyof typeof locales]}
          mode="multiple"
          selected={selected as Date[] | undefined}
          onSelect={(d) => onSelect?.(d)}
          disabled={getDisabled()}
          numberOfMonths={numberOfMonths}
          showOutsideDays={showOutsideDays}
          className={calendarVariants({ size, className })}
        />
      )}
    </div>
  );
});

Calendar.displayName = 'Calendar';

export { Calendar };
