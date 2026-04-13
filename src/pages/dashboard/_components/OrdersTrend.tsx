import * as React from 'react';
import {
  ComposedChart, Bar, Line,
  XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card/Card';
import { ChartTooltip } from '@/components/ui/chart/Chart';

const data = [
  { month: 'T1', orders: 1234, revenue: 68400, avgOrder: 55 },
  { month: 'T2', orders: 1380, revenue: 72100, avgOrder: 52 },
  { month: 'T3', orders: 1621, revenue: 85300, avgOrder: 53 },
  { month: 'T4', orders: 1498, revenue: 78900, avgOrder: 53 },
  { month: 'T5', orders: 1874, revenue: 94200, avgOrder: 50 },
  { month: 'T6', orders: 1732, revenue: 88600, avgOrder: 51 },
  { month: 'T7', orders: 2108, revenue: 102400, avgOrder: 49 },
  { month: 'T8', orders: 1987, revenue: 98700, avgOrder: 50 },
  { month: 'T9', orders: 2341, revenue: 115800, avgOrder: 49 },
  { month: 'T10', orders: 2213, revenue: 108300, avgOrder: 49 },
  { month: 'T11', orders: 2478, revenue: 121500, avgOrder: 49 },
  { month: 'T12', orders: 2634, revenue: 128430, avgOrder: 49 },
];

const AX  = { fontSize: 12, fill: '#9497a9' } as const;
const GRD = { stroke: '#dedee5', strokeDasharray: '4 4' } as const;

export const OrdersTrend: React.FC = () => (
  <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500">
    <CardHeader className="px-6 pt-6 pb-2">
      <CardTitle className="text-base font-semibold">Đơn Hàng & Doanh Thu Kết Hợp</CardTitle>
      <CardDescription>
        Bar = số đơn hàng · Line = doanh thu (USD) · Dashed line = giá trị đơn TB (×1000)
      </CardDescription>
    </CardHeader>
    <CardContent className="px-6 pb-6">
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid {...GRD} vertical={false} />
          <XAxis dataKey="month" tick={AX} axisLine={false} tickLine={false} />
          <YAxis yAxisId="left"  tick={AX} axisLine={false} tickLine={false} width={42} />
          <YAxis yAxisId="right" orientation="right" tick={AX} axisLine={false} tickLine={false} width={56} />
          <Tooltip content={ChartTooltip} cursor={{ fill: 'rgba(113,50,245,0.04)' }} />
          <Legend wrapperStyle={{ fontSize: 12 }} />

          <Bar  yAxisId="left"  dataKey="orders"   name="Đơn hàng"   fill="#7132f5" radius={[4,4,0,0]} opacity={0.85} />
          <Line yAxisId="right" dataKey="revenue"  name="Doanh thu"  stroke="#149e61" strokeWidth={2} dot={false} activeDot={{ r: 4, strokeWidth: 0 }} type="monotone"  />
          <Line yAxisId="right" dataKey="avgOrder" name="Giá TB (×1k)" stroke="#f59e0b" strokeWidth={2} strokeDasharray="6 3" dot={false} type="monotone" />
        </ComposedChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);
