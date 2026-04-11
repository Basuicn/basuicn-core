import * as React from 'react';
import { cn } from '@/lib/utils/cn';
import {
  Users,
  FileText,
  Bell,
  SearchX,
  Database,
  FolderOpen,
  ShoppingCart,
  MessageSquare,
  ImageIcon,
  Inbox,
  Package,
  BarChart3,
  WifiOff,
} from 'lucide-react';

// ─── Preset definitions ───────────────────────────────────────────────────────

export type EmptyPreset =
  | 'users'
  | 'documents'
  | 'notifications'
  | 'search'
  | 'data'
  | 'inbox'
  | 'orders'
  | 'messages'
  | 'images'
  | 'folders'
  | 'stats'
  | 'offline'
  | 'general';

interface PresetConfig {
  icon: React.ElementType;
  title: string;
  description: string;
  /** Tailwind gradient classes for the icon circle background */
  bg: string;
  /** Tailwind bg class for decorative dot accents */
  dot: string;
  /** Tailwind text-color class for the icon */
  iconColor: string;
}

const PRESETS: Record<EmptyPreset, PresetConfig> = {
  users: {
    icon: Users,
    title: 'Chưa có người dùng',
    description: 'Bắt đầu bằng cách mời thành viên đầu tiên vào hệ thống.',
    bg: 'from-blue-100 to-indigo-200 dark:from-blue-900/50 dark:to-indigo-800/50',
    dot: 'bg-indigo-400/50',
    iconColor: 'text-indigo-600 dark:text-indigo-300',
  },
  documents: {
    icon: FileText,
    title: 'Chưa có tài liệu',
    description: 'Tạo tài liệu đầu tiên để bắt đầu quản lý nội dung.',
    bg: 'from-amber-100 to-orange-200 dark:from-amber-900/50 dark:to-orange-800/50',
    dot: 'bg-orange-400/50',
    iconColor: 'text-orange-600 dark:text-orange-300',
  },
  notifications: {
    icon: Bell,
    title: 'Không có thông báo',
    description: 'Bạn đã đọc hết tất cả thông báo. Tuyệt vời!',
    bg: 'from-violet-100 to-purple-200 dark:from-violet-900/50 dark:to-purple-800/50',
    dot: 'bg-purple-400/50',
    iconColor: 'text-purple-600 dark:text-purple-300',
  },
  search: {
    icon: SearchX,
    title: 'Không tìm thấy kết quả',
    description: 'Thử thay đổi từ khóa hoặc điều chỉnh bộ lọc của bạn.',
    bg: 'from-slate-100 to-gray-200 dark:from-slate-800/60 dark:to-gray-700/50',
    dot: 'bg-slate-400/50',
    iconColor: 'text-slate-500 dark:text-slate-400',
  },
  data: {
    icon: Database,
    title: 'Chưa có dữ liệu',
    description: 'Dữ liệu sẽ hiển thị tại đây sau khi bạn thêm thông tin.',
    bg: 'from-teal-100 to-emerald-200 dark:from-teal-900/50 dark:to-emerald-800/50',
    dot: 'bg-emerald-400/50',
    iconColor: 'text-emerald-600 dark:text-emerald-300',
  },
  inbox: {
    icon: Inbox,
    title: 'Hộp thư trống',
    description: 'Không có tin nhắn nào. Thưởng thức khoảnh khắc yên bình!',
    bg: 'from-pink-100 to-rose-200 dark:from-pink-900/50 dark:to-rose-800/50',
    dot: 'bg-rose-400/50',
    iconColor: 'text-rose-600 dark:text-rose-300',
  },
  orders: {
    icon: ShoppingCart,
    title: 'Chưa có đơn hàng',
    description: 'Các đơn hàng sẽ xuất hiện ở đây sau khi được tạo.',
    bg: 'from-emerald-100 to-green-200 dark:from-emerald-900/50 dark:to-green-800/50',
    dot: 'bg-green-400/50',
    iconColor: 'text-green-700 dark:text-green-300',
  },
  messages: {
    icon: MessageSquare,
    title: 'Chưa có tin nhắn',
    description: 'Bắt đầu cuộc trò chuyện mới để kết nối với mọi người.',
    bg: 'from-cyan-100 to-sky-200 dark:from-cyan-900/50 dark:to-sky-800/50',
    dot: 'bg-sky-400/50',
    iconColor: 'text-sky-600 dark:text-sky-300',
  },
  images: {
    icon: ImageIcon,
    title: 'Chưa có hình ảnh',
    description: 'Tải lên hình ảnh đầu tiên để xây dựng thư viện media.',
    bg: 'from-fuchsia-100 to-pink-200 dark:from-fuchsia-900/50 dark:to-pink-800/50',
    dot: 'bg-fuchsia-400/50',
    iconColor: 'text-fuchsia-600 dark:text-fuchsia-300',
  },
  folders: {
    icon: FolderOpen,
    title: 'Thư mục trống',
    description: 'Chưa có file nào. Kéo thả hoặc nhấn để thêm mới.',
    bg: 'from-yellow-100 to-amber-200 dark:from-yellow-900/50 dark:to-amber-800/50',
    dot: 'bg-amber-400/50',
    iconColor: 'text-amber-600 dark:text-amber-300',
  },
  stats: {
    icon: BarChart3,
    title: 'Chưa có thống kê',
    description: 'Dữ liệu phân tích sẽ hiển thị khi có hoạt động.',
    bg: 'from-blue-100 to-violet-200 dark:from-blue-900/50 dark:to-violet-800/50',
    dot: 'bg-violet-400/50',
    iconColor: 'text-blue-600 dark:text-blue-300',
  },
  offline: {
    icon: WifiOff,
    title: 'Mất kết nối',
    description: 'Không thể tải dữ liệu. Kiểm tra kết nối mạng và thử lại.',
    bg: 'from-red-100 to-rose-200 dark:from-red-900/50 dark:to-rose-800/50',
    dot: 'bg-red-400/50',
    iconColor: 'text-red-600 dark:text-red-300',
  },
  general: {
    icon: Package,
    title: 'Không có gì ở đây',
    description: 'Nội dung sẽ xuất hiện sau khi bạn thêm dữ liệu mới.',
    bg: 'from-slate-100 to-gray-200 dark:from-slate-800/60 dark:to-gray-700/50',
    dot: 'bg-slate-400/50',
    iconColor: 'text-slate-500 dark:text-slate-400',
  },
};

// ─── Size config ──────────────────────────────────────────────────────────────

export type EmptyStateSize = 'sm' | 'md' | 'lg';

const SIZE = {
  sm: {
    root: 'py-8 px-6 gap-3',
    iconBg: 'w-16 h-16',
    outerRing: 'w-28 h-28',
    iconSize: 'w-7 h-7',
    dot: ['w-2 h-2', 'w-2.5 h-2.5', 'w-1.5 h-1.5'],
    title: 'text-base font-semibold',
    desc: 'text-xs max-w-xs',
  },
  md: {
    root: 'py-12 px-8 gap-4',
    iconBg: 'w-24 h-24',
    outerRing: 'w-40 h-40',
    iconSize: 'w-10 h-10',
    dot: ['w-3 h-3', 'w-3.5 h-3.5', 'w-2 h-2'],
    title: 'text-xl font-semibold',
    desc: 'text-sm max-w-sm',
  },
  lg: {
    root: 'py-20 px-12 gap-5',
    iconBg: 'w-32 h-32',
    outerRing: 'w-52 h-52',
    iconSize: 'w-14 h-14',
    dot: ['w-4 h-4', 'w-5 h-5', 'w-3 h-3'],
    title: 'text-2xl font-bold',
    desc: 'text-base max-w-md',
  },
} satisfies Record<EmptyStateSize, object>;

// ─── Component ────────────────────────────────────────────────────────────────

export interface EmptyStateProps {
  /** Use a predefined empty state design */
  preset?: EmptyPreset;
  /** Override the icon (pass a lucide-react component) */
  icon?: React.ElementType;
  /** Override the title */
  title?: string;
  /** Override the description */
  description?: string;
  /** Action element(s) rendered below the description */
  action?: React.ReactNode;
  size?: EmptyStateSize;
  className?: string;
  /** Extra content rendered after the action */
  children?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  preset = 'general',
  icon: CustomIcon,
  title: customTitle,
  description: customDescription,
  action,
  size = 'md',
  className,
  children,
}) => {
  const cfg = PRESETS[preset];
  const s = SIZE[size];
  const Icon = CustomIcon ?? cfg.icon;
  const title = customTitle ?? cfg.title;
  const description = customDescription ?? cfg.description;

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center',
        'animate-in fade-in slide-in-from-bottom-4 duration-500',
        s.root,
        className,
      )}
    >
      {/* ── Icon area ──────────────────────────────────────────────────── */}
      <div className="relative inline-flex items-center justify-center">
        {/* Outer glow halo */}
        <div
          className={cn(
            'absolute rounded-full opacity-20 bg-gradient-to-br pointer-events-none',
            cfg.bg,
            s.outerRing,
          )}
        />

        {/* Icon circle */}
        <div
          className={cn(
            'relative rounded-full flex items-center justify-center shadow-lg overflow-hidden',
            'bg-gradient-to-br',
            cfg.bg,
            s.iconBg,
          )}
        >
          {/* Gloss highlight */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
          <Icon className={cn(cfg.iconColor, s.iconSize)} strokeWidth={1.5} />
        </div>

        {/* Decorative dot — top-right */}
        <span
          className={cn(
            'absolute rounded-full animate-pulse',
            cfg.dot,
            s.dot[0],
            'top-0.5 right-0.5',
          )}
        />
        {/* Decorative dot — bottom-left */}
        <span
          className={cn(
            'absolute rounded-full animate-pulse [animation-delay:450ms]',
            cfg.dot,
            s.dot[1],
            'bottom-1 left-0.5',
          )}
        />
        {/* Decorative dot — left-middle */}
        <span
          className={cn(
            'absolute rounded-full animate-pulse [animation-delay:900ms]',
            cfg.dot,
            s.dot[2],
            'top-1/3 -left-1',
          )}
        />
      </div>

      {/* ── Text ───────────────────────────────────────────────────────── */}
      <div className="space-y-1.5">
        <h3 className={cn('text-foreground', s.title)}>{title}</h3>
        <p className={cn('text-muted-foreground leading-relaxed mx-auto', s.desc)}>
          {description}
        </p>
      </div>

      {/* ── Actions ────────────────────────────────────────────────────── */}
      {action && (
        <div className="flex flex-wrap gap-3 justify-center">{action}</div>
      )}

      {children}
    </div>
  );
};

EmptyState.displayName = 'EmptyState';
