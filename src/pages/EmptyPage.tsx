import React from 'react';
import { PageHeader, ShowcaseCard } from '@/components/ui/Showcase';
import { EmptyState, type EmptyPreset } from '@/components/ui/empty/Empty';
import { Button } from '@/components/ui/button/Button';
import {
  Plus,
  RefreshCw,
  Upload,
  UserPlus,
  Search,
  FolderPlus,
} from 'lucide-react';

// All available presets
const ALL_PRESETS: EmptyPreset[] = [
  'users',
  'documents',
  'notifications',
  'search',
  'data',
  'inbox',
  'orders',
  'messages',
  'images',
  'folders',
  'stats',
  'offline',
  'general',
];

const EmptyPage = () => {
  return (
    <div className="max-w-5xl">
      <PageHeader
        title="Empty State"
        description="Trạng thái rỗng hiện đại với animation mượt mà cho các tình huống không có dữ liệu."
      />

      {/* ── All presets ───────────────────────────────────────────────── */}
      <ShowcaseCard
        title="Tất cả Preset"
        description="13 tình huống empty state được thiết kế sẵn."
      >
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ALL_PRESETS.map((preset) => (
            <div
              key={preset}
              className="border border-border rounded-xl bg-background hover:shadow-md hover:border-border/80 transition-all duration-200 overflow-hidden"
            >
              <EmptyState preset={preset} size="sm" />
            </div>
          ))}
        </div>
      </ShowcaseCard>

      {/* ── Sizes ────────────────────────────────────────────────────── */}
      <ShowcaseCard
        title="Kích thước"
        description="Ba kích thước: sm, md, lg — dùng tuỳ theo vùng hiển thị."
      >
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <div
              key={size}
              className="border border-border rounded-xl bg-muted/20 overflow-hidden"
            >
              <div className="px-4 pt-3 pb-0">
                <code className="text-xs font-mono text-muted-foreground bg-muted/60 px-2 py-0.5 rounded">
                  size="{size}"
                </code>
              </div>
              <EmptyState preset="documents" size={size} />
            </div>
          ))}
        </div>
      </ShowcaseCard>

      {/* ── With actions ─────────────────────────────────────────────── */}
      <ShowcaseCard
        title="Với Action"
        description="Kết hợp action button để hướng dẫn người dùng bước tiếp theo."
      >
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-border rounded-xl bg-background overflow-hidden">
            <EmptyState
              preset="users"
              size="md"
              action={
                <Button leftIcon={<UserPlus className="w-4 h-4" />}>
                  Mời người dùng
                </Button>
              }
            />
          </div>

          <div className="border border-border rounded-xl bg-background overflow-hidden">
            <EmptyState
              preset="documents"
              size="md"
              action={
                <>
                  <Button leftIcon={<Plus className="w-4 h-4" />}>
                    Tạo tài liệu
                  </Button>
                  <Button
                    variant="outline"
                    leftIcon={<Upload className="w-4 h-4" />}
                  >
                    Tải lên
                  </Button>
                </>
              }
            />
          </div>

          <div className="border border-border rounded-xl bg-background overflow-hidden">
            <EmptyState
              preset="search"
              size="md"
              action={
                <Button
                  variant="ghost"
                  leftIcon={<Search className="w-4 h-4" />}
                >
                  Tìm kiếm khác
                </Button>
              }
            />
          </div>

          <div className="border border-border rounded-xl bg-background overflow-hidden">
            <EmptyState
              preset="offline"
              size="md"
              action={
                <Button
                  variant="outline"
                  leftIcon={<RefreshCw className="w-4 h-4" />}
                >
                  Thử lại
                </Button>
              }
            />
          </div>

          <div className="border border-border rounded-xl bg-background overflow-hidden">
            <EmptyState
              preset="folders"
              size="md"
              action={
                <>
                  <Button
                    variant="solid"
                    leftIcon={<FolderPlus className="w-4 h-4" />}
                  >
                    Tạo thư mục
                  </Button>
                  <Button
                    variant="outline"
                    leftIcon={<Upload className="w-4 h-4" />}
                  >
                    Tải lên file
                  </Button>
                </>
              }
            />
          </div>

          <div className="border border-border rounded-xl bg-background overflow-hidden">
            <EmptyState
              preset="inbox"
              size="md"
              action={
                <Button
                  variant="secondary"
                  leftIcon={<Plus className="w-4 h-4" />}
                >
                  Soạn tin nhắn
                </Button>
              }
            />
          </div>
        </div>
      </ShowcaseCard>

      {/* ── Custom ───────────────────────────────────────────────────── */}
      <ShowcaseCard
        title="Tuỳ chỉnh"
        description="Override icon, title, description tự do mà không cần preset."
      >
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-border rounded-xl bg-background overflow-hidden">
            <EmptyState
              preset="data"
              title="Chưa có báo cáo tháng này"
              description="Báo cáo sẽ tự động tổng hợp vào cuối mỗi tháng từ dữ liệu giao dịch."
              size="md"
            />
          </div>

          <div className="border border-border rounded-xl bg-background overflow-hidden">
            <EmptyState
              preset="notifications"
              title="Mọi thứ đều ổn!"
              description="Không có cảnh báo hay thông báo quan trọng nào cần xử lý."
              size="md"
            />
          </div>
        </div>
      </ShowcaseCard>
    </div>
  );
};

export default EmptyPage;
