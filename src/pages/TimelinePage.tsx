import React from 'react';
import { PageHeader, ShowcaseCard } from '@/components/ui/Showcase';
import { Timeline, type TimelineItemData } from '@/components/ui/timeline/Timeline';
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  Package,
  Truck,
  CreditCard,
  ShoppingCart,
  Star,
  GitCommit,
  GitBranch,
  GitMerge,
  Bug,
} from 'lucide-react';

const orderTimeline: TimelineItemData[] = [
  {
    title: 'Đơn hàng đã đặt',
    description: 'Đơn hàng #12345 đã được xác nhận.',
    time: '10:30 AM — 15/04/2026',
    icon: <ShoppingCart className="h-4 w-4" />,
    variant: 'primary',
  },
  {
    title: 'Thanh toán thành công',
    description: 'Visa ****4242 — 1,250,000đ',
    time: '10:31 AM — 15/04/2026',
    icon: <CreditCard className="h-4 w-4" />,
    variant: 'success',
  },
  {
    title: 'Đang chuẩn bị hàng',
    description: 'Kho Hà Nội đang đóng gói sản phẩm.',
    time: '02:00 PM — 15/04/2026',
    icon: <Package className="h-4 w-4" />,
    variant: 'primary',
  },
  {
    title: 'Đang vận chuyển',
    description: 'Giao hàng nhanh — dự kiến 17/04/2026.',
    time: '08:00 AM — 16/04/2026',
    icon: <Truck className="h-4 w-4" />,
    variant: 'warning',
  },
  {
    title: 'Chờ giao hàng',
    time: 'Dự kiến 17/04/2026',
    icon: <Clock className="h-4 w-4" />,
    variant: 'default',
  },
];

const gitTimeline: TimelineItemData[] = [
  {
    title: 'Merge PR #42: Add Timeline component',
    description: 'Merged by @huy — 3 files changed, +180 -0',
    time: '2 giờ trước',
    icon: <GitMerge className="h-4 w-4" />,
    variant: 'success',
  },
  {
    title: 'Fix: DatePicker locale hardcode',
    description: 'Thêm locale prop, xóa dead code.',
    time: '3 giờ trước',
    icon: <Bug className="h-4 w-4" />,
    variant: 'danger',
  },
  {
    title: 'feat: Command palette component',
    time: '5 giờ trước',
    icon: <GitCommit className="h-4 w-4" />,
    variant: 'primary',
  },
  {
    title: 'Branch: feature/new-components',
    description: 'Tạo branch mới từ main.',
    time: '6 giờ trước',
    icon: <GitBranch className="h-4 w-4" />,
    variant: 'default',
  },
];

const simpleTimeline: TimelineItemData[] = [
  { title: 'Tạo tài khoản', variant: 'success', icon: <CheckCircle2 className="h-4 w-4" /> },
  { title: 'Xác minh email', variant: 'success', icon: <CheckCircle2 className="h-4 w-4" /> },
  { title: 'Thiết lập hồ sơ', variant: 'primary', icon: <Star className="h-4 w-4" /> },
  { title: 'Chờ duyệt', variant: 'warning', icon: <AlertTriangle className="h-4 w-4" /> },
];

const TimelinePage = () => {
  return (
    <div className="max-w-5xl">
      <PageHeader
        title="Timeline"
        description="Component hiển thị chuỗi sự kiện theo thời gian với nhiều variant và kích thước."
      />

      {/* ── Order tracking ────────────────────────────────────────── */}
      <ShowcaseCard
        title="Theo dõi đơn hàng"
        description="Timeline theo dõi trạng thái giao hàng."
      >
        <div className="w-full max-w-lg">
          <Timeline items={orderTimeline} />
        </div>
      </ShowcaseCard>

      {/* ── Git history ───────────────────────────────────────────── */}
      <ShowcaseCard
        title="Git History"
        description="Timeline hiển thị lịch sử commit/merge."
      >
        <div className="w-full max-w-lg">
          <Timeline items={gitTimeline} size="sm" />
        </div>
      </ShowcaseCard>

      {/* ── Sizes ─────────────────────────────────────────────────── */}
      <ShowcaseCard
        title="Kích thước"
        description="Ba kích thước: sm, md, lg."
      >
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <div key={size}>
              <p className="text-xs font-mono text-muted-foreground mb-4 bg-muted px-2 py-1 rounded w-fit">
                size="{size}"
              </p>
              <Timeline items={simpleTimeline} size={size} />
            </div>
          ))}
        </div>
      </ShowcaseCard>

      {/* ── Variants ──────────────────────────────────────────────── */}
      <ShowcaseCard
        title="Variants"
        description="Mỗi item có thể dùng variant riêng hoặc dùng chung default variant."
      >
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          {(['default', 'primary', 'success', 'warning', 'danger'] as const).map((v) => (
            <div key={v}>
              <p className="text-xs font-mono text-muted-foreground mb-3 bg-muted px-2 py-1 rounded w-fit">
                variant="{v}"
              </p>
              <Timeline
                variant={v}
                items={[
                  { title: 'Bước 1: Khởi tạo', description: 'Thiết lập cấu hình ban đầu.' },
                  { title: 'Bước 2: Xử lý', description: 'Đang thực hiện tác vụ.' },
                  { title: 'Bước 3: Hoàn tất' },
                ]}
                size="sm"
              />
            </div>
          ))}
        </div>
      </ShowcaseCard>
    </div>
  );
};

export default TimelinePage;
