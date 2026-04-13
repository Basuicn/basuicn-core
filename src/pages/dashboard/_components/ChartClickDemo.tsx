import * as React from 'react';
import { MousePointerClick } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card/Card';
import { ChartLine, ChartBar, ChartArea, ChartPie } from '@/components/ui/chart/Chart';
import type { ChartClickEvent, PieDataItem } from '@/components/ui/chart/Chart';

// ─── Sample data ──────────────────────────────────────────────────────────────
const monthlyData = [
  { id: 1, month: 'T1', revenue: 68, cost: 42, profit: 26 },
  { id: 2, month: 'T2', revenue: 72, cost: 44, profit: 28 },
  { id: 3, month: 'T3', revenue: 85, cost: 51, profit: 34 },
  { id: 4, month: 'T4', revenue: 78, cost: 48, profit: 30 },
  { id: 5, month: 'T5', revenue: 94, cost: 56, profit: 38 },
  { id: 6, month: 'T6', revenue: 88, cost: 54, profit: 34 },
];

const barData = [
  { id: 1, product: 'MacBook', sales: 4820, returns: 120 },
  { id: 2, product: 'iPhone',  sales: 3945, returns: 210 },
  { id: 3, product: 'iPad',    sales: 2870, returns: 95  },
  { id: 4, product: 'Watch',   sales: 1980, returns: 60  },
  { id: 5, product: 'AirPods', sales: 2340, returns: 45  },
];

const pieData: PieDataItem[] = [
  { name: 'Organic',  value: 38, color: '#7132f5' },
  { name: 'Paid Ads', value: 27, color: '#149e61' },
  { name: 'Referral', value: 18, color: '#2563eb' },
  { name: 'Social',   value: 11, color: '#f59e0b' },
  { name: 'Direct',   value: 6,  color: '#ef4444' },
];

// ─── ClickResult: hiển thị data trả về ───────────────────────────────────────
const ClickResult: React.FC<{ event: ChartClickEvent | null; label: string }> = ({ event, label }) => {
  if (!event) {
    return (
      <div className="mt-3 flex items-center gap-2 rounded-lg border border-dashed border-border px-3 py-2 text-xs text-muted-foreground">
        <MousePointerClick className="h-3.5 w-3.5 shrink-0" />
        <span>Hover lên điểm dữ liệu rồi click để xem {label}</span>
      </div>
    );
  }
  return (
    <div className="mt-3 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-xs">
      <div className="mb-1 flex flex-wrap items-center gap-2">
        <span className="font-semibold text-primary">
          Clicked: <span className="font-normal text-foreground">{String(event.activeLabel ?? '—')}</span>
        </span>
        {event.dataKey && (
          <span className="rounded bg-primary/15 px-1.5 py-0.5 font-mono font-semibold text-primary">
            series: {event.dataKey}
          </span>
        )}
        <span className="text-muted-foreground">index {event.activeIndex ?? '—'}</span>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-muted-foreground">
        {Object.entries(event.payload ?? {}).map(([k, v]) => (
          <span key={k}>
            <span className="font-medium text-foreground">{k}:</span>{' '}
            {typeof v === 'number' ? v.toLocaleString() : String(v)}
          </span>
        ))}
      </div>
    </div>
  );
};

// ─── Main Demo ────────────────────────────────────────────────────────────────
export const ChartClickDemo: React.FC = () => {
  const [lineEvt,  setLineEvt]  = React.useState<ChartClickEvent | null>(null);
  const [barEvt,   setBarEvt]   = React.useState<ChartClickEvent | null>(null);
  const [areaEvt,  setAreaEvt]  = React.useState<ChartClickEvent | null>(null);
  const [pieEvt,   setPieEvt]   = React.useState<ChartClickEvent | null>(null);

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Demo: Chart Click Events</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Hover lên điểm dữ liệu rồi click — nhận đúng object data tại điểm đó
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* ── ChartLine ─────────────────────────────────────────────────────── */}
        <Card>
          <CardHeader className="px-6 pt-5 pb-2">
            <CardTitle className="text-sm font-semibold">ChartLine — click vào điểm</CardTitle>
            <CardDescription className="text-xs">activeDot.onClick → trả đúng data point</CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-5">
            <ChartLine
              data={monthlyData}
              xKey="month"
              height={220}
              series={[
                { key: 'revenue', name: 'Doanh thu', color: '#7132f5' },
                { key: 'cost',    name: 'Chi phí',   color: '#149e61' },
                { key: 'profit',  name: 'Lợi nhuận', color: '#f59e0b' },
              ]}
              onClick={(data) => {
                setLineEvt(data)
                alert( `id: ${data?.payload?.id}, type: ${data?.dataKey}`)
              }}
            />
            <ClickResult event={lineEvt} label="line point" />
          </CardContent>
        </Card>

        {/* ── ChartBar ──────────────────────────────────────────────────────── */}
        <Card>
          <CardHeader className="px-6 pt-5 pb-2">
            <CardTitle className="text-sm font-semibold">ChartBar — click vào cột</CardTitle>
            <CardDescription className="text-xs">Bar.onClick → trả toàn bộ row tại cột được click</CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-5">
            <ChartBar
              data={barData}
              xKey="product"
              height={220}
              series={[
                { key: 'sales',   name: 'Doanh số', color: '#7132f5' },
                { key: 'returns', name: 'Hoàn trả', color: '#ef4444' },
              ]}
              onClick={(data) => {
                setBarEvt(data)
                alert(data?.payload?.id)
              }}
            />
            <ClickResult event={barEvt} label="bar column" />
          </CardContent>
        </Card>

        {/* ── ChartArea ─────────────────────────────────────────────────────── */}
        <Card>
          <CardHeader className="px-6 pt-5 pb-2">
            <CardTitle className="text-sm font-semibold">ChartArea — click vào điểm</CardTitle>
            <CardDescription className="text-xs">activeDot.onClick → giống ChartLine, click chính xác từng điểm</CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-5">
            <ChartArea
              data={monthlyData}
              xKey="month"
              height={220}
              series={[
                { key: 'revenue', name: 'Doanh thu', color: '#7132f5' },
                { key: 'profit',  name: 'Lợi nhuận', color: '#149e61' },
              ]}
              onClick={setAreaEvt}
            />
            <ClickResult event={areaEvt} label="area point" />
          </CardContent>
        </Card>

        {/* ── ChartPie ──────────────────────────────────────────────────────── */}
        <Card>
          <CardHeader className="px-6 pt-5 pb-2">
            <CardTitle className="text-sm font-semibold">ChartPie — click vào slice</CardTitle>
            <CardDescription className="text-xs">Pie.onClick → trả data của slice được click</CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-5">
            <ChartPie
              data={pieData}
              donut
              height={220}
              showLabel={false}
              onClick={(evt) => setPieEvt(evt)}
            />
            <ClickResult event={pieEvt} label="pie slice" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
