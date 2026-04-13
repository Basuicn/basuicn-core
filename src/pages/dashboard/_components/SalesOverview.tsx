import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card/Card';
import { ChartArea, ChartPie } from '@/components/ui/chart/Chart';

const areaData = [
  { month: 'T1', revenue: 68400, cost: 42100 },
  { month: 'T2', revenue: 72100, cost: 44800 },
  { month: 'T3', revenue: 85300, cost: 51200 },
  { month: 'T4', revenue: 78900, cost: 48500 },
  { month: 'T5', revenue: 94200, cost: 56300 },
  { month: 'T6', revenue: 88600, cost: 54100 },
  { month: 'T7', revenue: 102400, cost: 61800 },
  { month: 'T8', revenue: 98700, cost: 59400 },
  { month: 'T9', revenue: 115800, cost: 67200 },
  { month: 'T10', revenue: 108300, cost: 65100 },
  { month: 'T11', revenue: 121500, cost: 72400 },
  { month: 'T12', revenue: 128430, cost: 76900 },
];

const pieData = [
  { name: 'Organic', value: 38, color: '#7132f5' },
  { name: 'Paid Ads', value: 27, color: '#149e61' },
  { name: 'Referral', value: 18, color: '#2563eb' },
  { name: 'Social', value: 11, color: '#f59e0b' },
  { name: 'Direct', value: 6, color: '#ef4444' },
];

export const SalesOverview: React.FC = () => (
  <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
    <Card className="lg:col-span-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <CardHeader className="px-6 pt-6 pb-2">
        <CardTitle className="text-base font-semibold">Doanh Thu & Chi Phí</CardTitle>
        <CardDescription>Xu hướng 12 tháng (triệu VND)</CardDescription>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <ChartArea
          data={areaData}
          xKey="month"
          height={280}
          series={[
            { key: 'revenue', name: 'Doanh thu', color: '#7132f5' },
            { key: 'cost', name: 'Chi phí', color: '#149e61' },
          ]}
          onClick={(data) => {
            alert(`Bạn vừa click vào: ${data.payload?.month} ${data.payload?.revenue} ${data.payload?.cost}`);
          }}
        />
      </CardContent>
    </Card>

    <Card className="lg:col-span-2 animate-in fade-in slide-in-from-bottom-4 duration-700 ">
      <CardHeader className="px-6 pt-6 pb-2">
        <CardTitle className="text-base font-semibold">Nguồn Lưu Lượng</CardTitle>
        <CardDescription>Phân bổ kênh tiếp cận (%)</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ChartPie data={pieData} donut showLabel={true} height={280}
          onClick={(data, index) => {
            alert(`Bạn vừa click vào mảng: ${data?.payload?.name} giá trị ${data?.payload?.value}%`);
          }} />
      </CardContent>
    </Card>
  </div>
);
