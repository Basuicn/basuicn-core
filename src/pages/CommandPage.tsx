import React from 'react';
import { PageHeader, ShowcaseCard } from '@/components/ui/Showcase';
import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command/Command';
import { Button } from '@/components/ui/button/Button';
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
  Search,
  FileText,
  Mail,
  MessageSquare,
  Music,
  Zap,
} from 'lucide-react';

const CommandPage = () => {
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);

  // Keyboard shortcut
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen1((o) => !o);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="max-w-5xl">
      <PageHeader
        title="Command"
        description="Command palette — tìm kiếm nhanh và thực thi lệnh bằng phím tắt Ctrl+K."
      />

      {/* ── Basic ──────────────────────────────────────────────────── */}
      <ShowcaseCard
        title="Cơ bản"
        description="Nhấn nút hoặc Ctrl+K để mở Command Palette."
      >
        <div className="w-full flex flex-col gap-4">
          <Button variant="outline" onClick={() => setOpen1(true)} className="w-fit">
            <Search className="w-4 h-4 mr-2" />
            Tìm kiếm... <kbd className="ml-4 px-1.5 py-0.5 text-xs bg-muted rounded border border-border">⌘K</kbd>
          </Button>

          <Command open={open1} onOpenChange={setOpen1}>
            <CommandInput placeholder="Gõ lệnh hoặc tìm kiếm..." />
            <CommandList>
              <CommandEmpty>Không tìm thấy kết quả.</CommandEmpty>
              <CommandGroup heading="Gợi ý" className='border-b'>
                <CommandItem value="lịch calendar" onSelect={() => setOpen1(false)}>
                  <Calendar className="mr-2 h-4 w-4" /> Lịch
                </CommandItem>
                <CommandItem value="emoji tìm tìm emoji" onSelect={() => setOpen1(false)}>
                  <Smile className="mr-2 h-4 w-4" /> Tìm Emoji
                </CommandItem>
                <CommandItem value="máy tính calculator" onSelect={() => setOpen1(false)}>
                  <Calculator className="mr-2 h-4 w-4" /> Máy tính
                </CommandItem>
              </CommandGroup>
              <CommandGroup heading="Cài đặt">
                <CommandItem value="hồ sơ profile user" onSelect={() => setOpen1(false)}>
                  <User className="mr-2 h-4 w-4" /> Hồ sơ
                  <CommandShortcut>⌘P</CommandShortcut>
                </CommandItem>
                <CommandItem value="thanh toán payment billing" onSelect={() => setOpen1(false)}>
                  <CreditCard className="mr-2 h-4 w-4" /> Thanh toán
                  <CommandShortcut>⌘B</CommandShortcut>
                </CommandItem>
                <CommandItem value="cài đặt settings config" onSelect={() => setOpen1(false)}>
                  <Settings className="mr-2 h-4 w-4" /> Cài đặt
                  <CommandShortcut>⌘S</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </ShowcaseCard>

      {/* ── With categories ─────────────────────────────────────────── */}
      <ShowcaseCard
        title="Nhiều nhóm"
        description="Phân nhóm lệnh theo chức năng."
      >
        <div className="w-full">
          <Button variant="outline" onClick={() => setOpen2(true)} className="w-fit">
            <Zap className="w-4 h-4 mr-2" /> Quick Actions
          </Button>

          <Command open={open2} onOpenChange={setOpen2}>
            <CommandInput placeholder="Bạn muốn làm gì?" />
            <CommandList>
              <CommandEmpty>Không tìm thấy.</CommandEmpty>
              <CommandGroup heading="Tài liệu">
                <CommandItem value="tạo tài liệu mới new document" onSelect={() => setOpen2(false)}>
                  <FileText className="mr-2 h-4 w-4" /> Tạo tài liệu mới
                </CommandItem>
                <CommandItem value="mở tài liệu gần đây recent document" onSelect={() => setOpen2(false)}>
                  <FileText className="mr-2 h-4 w-4" /> Mở tài liệu gần đây
                </CommandItem>
              </CommandGroup>
              
              <CommandGroup heading="Liên lạc">
                <CommandItem value="soạn email compose mail" onSelect={() => setOpen2(false)}>
                  <Mail className="mr-2 h-4 w-4" /> Soạn email
                </CommandItem>
                <CommandItem value="nhắn tin message chat" onSelect={() => setOpen2(false)}>
                  <MessageSquare className="mr-2 h-4 w-4" /> Nhắn tin
                </CommandItem>
              </CommandGroup>
              
              <CommandGroup heading="Giải trí">
                <CommandItem value="phát nhạc music play" onSelect={() => setOpen2(false)}>
                  <Music className="mr-2 h-4 w-4" /> Phát nhạc
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </ShowcaseCard>

      {/* ── Disabled items ──────────────────────────────────────────── */}
      <ShowcaseCard
        title="Disabled Items"
        description="Một số lệnh có thể bị vô hiệu hóa."
      >
        <div className="w-full">
          <Button variant="outline" onClick={() => setOpen3(true)} className="w-fit">
            <Settings className="w-4 h-4 mr-2" /> Cài đặt nâng cao
          </Button>

          <Command open={open3} onOpenChange={setOpen3}>
            <CommandInput placeholder="Tìm cài đặt..." />
            <CommandList>
              <CommandEmpty>Không có cài đặt phù hợp.</CommandEmpty>
              <CommandGroup heading="Tài khoản">
                <CommandItem value="đổi tên hiển thị display name change" onSelect={() => setOpen3(false)}>
                  <User className="mr-2 h-4 w-4" /> Đổi tên hiển thị
                </CommandItem>
                <CommandItem value="đổi email change email" onSelect={() => setOpen3(false)}>
                  <Mail className="mr-2 h-4 w-4" /> Đổi email
                </CommandItem>
                <CommandItem value="nâng cấp gói upgrade" disabled>
                  <CreditCard className="mr-2 h-4 w-4" /> Nâng cấp gói (đã max)
                </CommandItem>
              </CommandGroup>
              
              <CommandGroup heading="Nguy hiểm">
                <CommandItem value="xóa tài khoản delete account danger" onSelect={() => setOpen3(false)}>
                  <Settings className="mr-2 h-4 w-4 text-danger" />
                  <span className="text-danger">Xóa tài khoản</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </ShowcaseCard>
    </div>
  );
};

export default CommandPage;
