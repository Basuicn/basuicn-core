import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card/Card';
import { ChartBar, ChartRadar } from '@/components/ui/chart/Chart';

const barData = [
  { month: 'T1', electronics: 18400, clothing: 12100, food: 9300, furniture: 6200 },
  { month: 'T2', electronics: 21200, clothing: 14800, food: 10100, furniture: 7400 },
  { month: 'T3', electronics: 24600, clothing: 17300, food: 11800, furniture: 8700 },
  { month: 'T4', electronics: 19800, clothing: 15100, food: 10600, furniture: 7100 },
  { month: 'T5', electronics: 28300, clothing: 19600, food: 13400, furniture: 9800 },
  { month: 'T6', electronics: 26100, clothing: 18200, food: 12700, furniture: 9100 },
  { month: 'T7', electronics: 31400, clothing: 22100, food: 14900, furniture: 11200 },
  { month: 'T8', electronics: 29800, clothing: 20700, food: 14100, furniture: 10600 },
];

const radarData = [
  { metric: 'Tốc độ giao hàng', q1: 78, q2: 85 },
  { metric: 'Dịch vụ KH',      q1: 82, q2: 91 },
  { metric: 'Chất lượng SP',   q1: 88, q2: 87 },
  { metric: 'Giá cả',         q1: 65, q2: 72 },
  { metric: 'Độ phủ',         q1: 71, q2: 80 },
  { metric: 'Đổi trả',        q1: 75, q2: 84 },
];

export const SalesBreakdown: React.FC = () => (
  <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
    <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <CardHeader className="px-6 pt-6 pb-2">
        <CardTitle className="text-base font-semibold">Doanh Thu Theo Danh Mục</CardTitle>
        <CardDescription>So sánh 8 tháng gần nhất (stacked bar)</CardDescription>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <ChartBar
          data={barData}
          xKey="month"
          stacked
          height={280}
          series={[
            { key: 'electronics', name: 'Điện tử',   color: '#7132f5' },
            { key: 'clothing',    name: 'Thời trang', color: '#149e61' },
            { key: 'food',        name: 'Thực phẩm',  color: '#2563eb' },
            { key: 'furniture',   name: 'Nội thất',   color: '#f59e0b' },
          ]}
          onClick={(data) => {
            alert(`Bạn vừa click vào: ${JSON.stringify(data.payload)} `);
          }}
        />
      </CardContent>
    </Card>

    <Card className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <CardHeader className="px-6 pt-6 pb-2">
        <CardTitle className="text-base font-semibold">Đánh Giá Hiệu Suất</CardTitle>
        <CardDescription>So sánh Q1 vs Q2 theo 6 tiêu chí</CardDescription>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <ChartRadar
          data={radarData}
          angleKey="metric"
          height={280}
          series={[
            { key: 'q1', name: 'Quý 1', color: '#7132f5' },
            { key: 'q2', name: 'Quý 2', color: '#149e61' },
          ]}
        />
      </CardContent>
    </Card>
  </div>
);
