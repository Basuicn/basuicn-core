import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card/Card';
import { ChartBar, ChartLine } from '@/components/ui/chart/Chart';

const horizontalData = [
  { product: 'MacBook Pro M3',    sales: 4820 },
  { product: 'iPhone 15 Pro',     sales: 3945 },
  { product: 'iPad Air',          sales: 2870 },
  { product: 'AirPods Pro',       sales: 2340 },
  { product: 'Apple Watch Ultra', sales: 1980 },
  { product: 'Samsung Galaxy S24',sales: 1650 },
];

const lineData = [
  { week: 'W1', product_a: 420, product_b: 310, product_c: 280 },
  { week: 'W2', product_a: 480, product_b: 350, product_c: 310 },
  { week: 'W3', product_a: 440, product_b: 380, product_c: 290 },
  { week: 'W4', product_a: 520, product_b: 320, product_c: 340 },
  { week: 'W5', product_a: 490, product_b: 410, product_c: 360 },
  { week: 'W6', product_a: 580, product_b: 390, product_c: 380 },
  { week: 'W7', product_a: 610, product_b: 430, product_c: 400 },
  { week: 'W8', product_a: 570, product_b: 460, product_c: 420 },
];

export const TopProducts: React.FC = () => (
  <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
    <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <CardHeader className="px-6 pt-6 pb-2">
        <CardTitle className="text-base font-semibold">Top Sản Phẩm Bán Chạy</CardTitle>
        <CardDescription>Xếp hạng theo doanh số (horizontal bar)</CardDescription>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <ChartBar
          data={horizontalData}
          xKey="product"
          layout="vertical"
          height={280}
          series={[{ key: 'sales', name: 'Doanh số', color: '#7132f5' }]}
        />
      </CardContent>
    </Card>

    <Card className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <CardHeader className="px-6 pt-6 pb-2">
        <CardTitle className="text-base font-semibold">Xu Hướng Sản Phẩm Top 3</CardTitle>
        <CardDescription>Biến động 8 tuần gần nhất (line chart)</CardDescription>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <ChartLine
          data={lineData}
          xKey="week"
          height={280}
          series={[
            { key: 'product_a', name: 'MacBook Pro',  color: '#7132f5' },
            { key: 'product_b', name: 'iPhone 15',    color: '#149e61' },
            { key: 'product_c', name: 'iPad Air',     color: '#2563eb' },
          ]}
        />
      </CardContent>
    </Card>
  </div>
);
