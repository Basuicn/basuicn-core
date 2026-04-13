import * as React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Users, ShoppingCart, BarChart3 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card/Card';
import { Badge } from '@/components/ui/badge/Badge';

interface KpiCardProps {
  title: string | React.ReactNode;
  value: string;
  change: number;
  changeLabel: string;
  icon: React.ReactNode;
  iconBg: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, change, changeLabel, icon, iconBg }) => {
  const isPositive = change >= 0;
  return (
    <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1 min-w-0 flex-1">
            <p className="text-sm font-medium text-muted-foreground truncate">{title}</p>
            <p className="text-2xl font-bold tracking-tight text-foreground truncate">{value}</p>
          </div>
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconBg}`}>
            {icon}
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <Badge
            variant={isPositive ? 'soft-success' : 'soft-danger'}
            className="gap-1"
          >
            {isPositive
              ? <TrendingUp className="h-3 w-3" />
              : <TrendingDown className="h-3 w-3" />
            }
            {isPositive ? '+' : ''}{change}%
          </Badge>
          <span className="text-xs text-muted-foreground">{changeLabel}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export const KpiCards: React.FC = () => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
    <KpiCard
      title="Tổng Doanh Thu"
      value="$128,430"
      change={12.5}
      changeLabel="so với tháng trước"
      icon={<DollarSign className="h-5 w-5 text-[#7132f5]" />}
      iconBg="bg-[#7132f5]/10"
    />
    <KpiCard
      title="Người Dùng Hoạt Động"
      value="24,581"
      change={8.2}
      changeLabel="so với tháng trước"
      icon={<Users className="h-5 w-5 text-[#149e61]" />}
      iconBg="bg-[#149e61]/10"
    />
    <KpiCard
      title="Đơn Hàng Mới"
      value="3,247"
      change={5.7}
      changeLabel="so với tháng trước"
      icon={<ShoppingCart className="h-5 w-5 text-[#2563eb]" />}
      iconBg="bg-[#2563eb]/10"
    />
    <KpiCard
      title="Tỷ Lệ Chuyển Đổi"
      value="3.42%"
      change={-1.1}
      changeLabel="so với tháng trước"
      icon={<BarChart3 className="h-5 w-5 text-[#f59e0b]" />}
      iconBg="bg-[#f59e0b]/10"
    />
  </div>
);
