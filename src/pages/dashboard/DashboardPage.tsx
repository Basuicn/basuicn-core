import React from 'react';
import { CalendarDays, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button/Button';
import { Select } from '@/components/ui/select/Select';
import { KpiCards } from './_components/KpiCards';
import { SalesOverview } from './_components/SalesOverview';
import { SalesBreakdown } from './_components/SalesBreakdown';
import { OrdersTrend } from './_components/OrdersTrend';
import { TopProducts } from './_components/TopProducts';
import { ChartClickDemo } from './_components/ChartClickDemo';
import { DatePicker } from '@/components/ui';
import type { DateRange } from 'react-day-picker';

const PERIOD_OPTIONS = [
  { label: 'Tháng này',    value: 'month'   },
  { label: 'Quý này',      value: 'quarter' },
  { label: '6 tháng',      value: 'half'    },
  { label: 'Năm nay',      value: 'year'    },
];

const DashboardPage = () => {
  const [period, setPeriod] = React.useState('year');
 const [range, setRange] = React.useState<DateRange | undefined>();
  return (
    <div className="mx-auto max-w-7xl space-y-6 py-8 px-1">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-in fade-in slide-in-from-left-4 duration-500">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Analytics Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Tổng quan hiệu suất kinh doanh theo thời gian thực
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
         <DatePicker  mode="range"  date={range} onDateChange={(d) => setRange(d as DateRange | undefined)} />
          <Select
          className='w-34'
            options={PERIOD_OPTIONS}
            value={period}
            onChange={setPeriod}
          />
          <Button variant="ghost" size="icon">
            <RefreshCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* ── KPI Cards ──────────────────────────────────────────────────────── */}
      <KpiCards />

      {/* ── Revenue Area + Traffic Pie ─────────────────────────────────────── */}
      <SalesOverview />

      {/* ── Stacked Bar + Radar ────────────────────────────────────────────── */}
      <SalesBreakdown />

      {/* ── Top Products: Horizontal Bar + Line ──────────────────────────── */}
      <TopProducts />

      {/* ── Composed: Bar + Line (orders & revenue) ───────────────────────── */}
      <OrdersTrend />

      {/* ── Demo: Chart Click Events ──────────────────────────────────────── */}
      <ChartClickDemo />
    </div>
  );
};

export default DashboardPage;
