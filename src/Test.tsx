import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Search, Plus, Info, AlertCircle, CheckCircle2,
  Code2, Eye, XCircle, Bell, Settings, Layers, MousePointer2,
  Activity, ShieldCheck, Trash2, Loader2, Mail, Lock, ArrowRight,
  Star, ChevronRight
} from 'lucide-react';
import { type ColumnDef } from '@tanstack/react-table';
import { toast } from 'sonner';

import { DashboardLayout } from './components/ui/layout/DashboardLayout';
import { Button } from './components/ui/button/Button';
import { Input } from './components/ui/input/Input';
import { Select } from './components/ui/select/Select';
import { DatePicker } from './components/ui/datepicker/DatePicker';
import { Checkbox } from './components/ui/checkbox/Checkbox';
import { Switch } from './components/ui/switch/Switch';
import { Tabs } from './components/ui/tabs/Tabs';
import { Dialog } from './components/ui/dialog/Dialog';
import { Tooltip } from './components/ui/tooltip/Tooltip';
import { Table } from './components/ui/table/Table';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './components/ui/accordion/Accordion';
import { Spinner } from './components/ui/spinner/Spinner';
import { Badge } from './components/ui/badge/Badge';
import { Avatar } from './components/ui/avatar/Avatar';
import { Skeleton } from './components/ui/skeleton/Skeleton';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './components/ui/card/Card';
import { Radio } from './components/ui/radio/Radio';
import { RadioGroup } from './components/ui/radio-group/RadioGroup';
import { ComboBox } from './components/ui/combobox/ComboBox';
import { Popover } from './components/ui/popover/Popover';
import { Slider } from './components/ui/slider/Slider';
import { Progress } from './components/ui/progress/Progress';
import { Alert, AlertTitle, AlertDescription } from './components/ui/alert/Alert';
import { AlertDialog } from './components/ui/alret-dialog/AlertDialog';
import { Collapsible } from './components/ui/collapsible/Collapsible';
import { type DateRange } from 'react-day-picker';
import { FormShowcase } from './pages/FormShowcase';

// ─────────────────────────────────────────────────────────────────────────────
// Shared Helpers
// ─────────────────────────────────────────────────────────────────────────────

const ShowcaseCard = ({
  title, description, children, code, dark,
}: {
  title: string; description?: string; children: React.ReactNode; code?: string; dark?: boolean;
}) => (
  <Card className="mb-8 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
    <CardHeader className="bg-muted/50 border-b border-border/50">
      <CardTitle className="text-primary flex items-center gap-2 text-base">
        <Eye className="w-4 h-4" /> {title}
      </CardTitle>
      {description && <CardDescription className="mt-1">{description}</CardDescription>}
    </CardHeader>
    <CardContent className={`p-8 ${dark ? 'bg-zinc-900 rounded-b-xl' : ''}`}>
      <div className="flex flex-wrap gap-4 items-end">
        {children}
      </div>
    </CardContent>
    {code && (
      <Accordion>
        <AccordionItem value="code" className="border-t border-border/50">
          <AccordionTrigger className="px-6 py-3 hover:bg-muted transition-colors" hideChevron>
            <div className="flex items-center gap-2 text-muted-foreground font-medium text-xs uppercase tracking-wider">
              <Code2 className="w-3.5 h-3.5" /> Xem mã nguồn
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-0">
            <pre className="p-6 bg-zinc-950 text-zinc-100 text-xs overflow-auto leading-relaxed max-h-[400px]">
              <code>{code}</code>
            </pre>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )}
  </Card>
);

const PageHeader = ({ title, description }: { title: string; description: string }) => (
  <div className="mb-10 animate-in fade-in slide-in-from-left-4 duration-500">
    <h1 className="text-3xl font-bold text-foreground tracking-tight">{title}</h1>
    <p className="text-muted-foreground mt-2 max-w-2xl">{description}</p>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Pages
// ─────────────────────────────────────────────────────────────────────────────

const ButtonPage = () => (
  <div className="max-w-5xl">
    <PageHeader title="Button" description="Nút tương tác đa dạng variant, size và trạng thái." />

    <ShowcaseCard title="Variants" code={`<Button variant="solid">Solid</Button>`}>
      <Button variant="solid">Solid</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
    </ShowcaseCard>

    <ShowcaseCard title="Glass Variant" description="Kính mờ — đẹp trên nền tối." dark>
      <Button variant="glass">Glass Button</Button>
      <Button variant="glass" leftIcon={<Star className="w-4 h-4" />}>With Icon</Button>
      <Button variant="glass" size="sm">Small Glass</Button>
      <Button variant="glass" size="lg">Large Glass</Button>
    </ShowcaseCard>

    <ShowcaseCard title="Glossy Bubble Variants" description="Hiệu ứng gương bong bóng xà phòng — gradient trắng → màu, ánh sáng viền trên.">
      <div className="flex flex-wrap gap-4">
        <Button variant="glass-white">White Pearl</Button>
        <Button variant="glass-amber">⚡ Amber Bubble</Button>
        <Button variant="glass-green">🌿 Mint Bubble</Button>
        <Button variant="glass-purple">✨ Lavender Bubble</Button>
        <Button variant="glass-pink">🌸 Rose Bubble</Button>
      </div>
      <div className="flex flex-wrap gap-4 items-center">
        <Button variant="glass-white" size="sm">SM Pearl</Button>
        <Button variant="glass-green" size="sm">SM Mint</Button>
        <Button variant="glass-purple" size="lg">LG Lavender</Button>
        <Button variant="glass-pink" leftIcon={<Star className="w-4 h-4" />}>Rose + Icon</Button>
      </div>
    </ShowcaseCard>

    <ShowcaseCard title="Sizes">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="icon"><Plus className="w-4 h-4" /></Button>
    </ShowcaseCard>

    <ShowcaseCard title="With Icons">
      <Button leftIcon={<Mail className="w-4 h-4" />}>Gửi Email</Button>
      <Button rightIcon={<ArrowRight className="w-4 h-4" />} variant="outline">Tiếp tục</Button>
      <Button leftIcon={<Plus className="w-4 h-4" />} rightIcon={<ChevronRight className="w-4 h-4" />} variant="secondary">Thêm & Đi</Button>
    </ShowcaseCard>

    <ShowcaseCard title="Loading & Disabled States">
      <Button isLoading>Đang xử lý...</Button>
      <Button isLoading variant="outline">Loading Outline</Button>
      <Button isLoading variant="secondary">Loading Secondary</Button>
      <Button disabled>Disabled</Button>
      <Button disabled variant="outline">Disabled Outline</Button>
    </ShowcaseCard>
  </div>
);

const BadgePage = () => (
  <div className="max-w-4xl">
    <PageHeader title="Badge" description="Nhãn trạng thái với nhiều kiểu thiết kế hiện đại." />

    <ShowcaseCard title="Solid Variants">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
    </ShowcaseCard>

    <ShowcaseCard title="Soft Variants" description="Nền nhạt, chữ đậm — phong cách hiện đại.">
      <Badge variant="soft-primary">Soft Primary</Badge>
      <Badge variant="soft-success">Soft Success</Badge>
      <Badge variant="soft-warning">Soft Warning</Badge>
      <Badge variant="soft-danger">Soft Danger</Badge>
    </ShowcaseCard>

    <ShowcaseCard title="Special Variants">
      <Badge variant="glass">Glass</Badge>
      <Badge variant="gradient">Gradient</Badge>
    </ShowcaseCard>

    <ShowcaseCard title="Sizes">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </ShowcaseCard>

    <ShowcaseCard title="Pulse — Trạng thái Sống" description="Hiệu ứng nhấp nháy cho live/active.">
      <Badge variant="success" pulse>Live</Badge>
      <Badge variant="danger" pulse>Critical</Badge>
      <Badge variant="warning" pulse>Pending</Badge>
      <Badge variant="soft-primary" pulse>Processing</Badge>
      <Badge variant="soft-success" pulse>Soft Success Live</Badge>
    </ShowcaseCard>

    <ShowcaseCard title="Use Cases">
      <div className="flex items-center gap-2"><span className="text-sm">Trạng thái:</span><Badge variant="soft-success" pulse>Đang giao</Badge></div>
      <div className="flex items-center gap-2"><span className="text-sm">Phiên bản:</span><Badge variant="gradient">v2.0</Badge></div>
      <div className="flex items-center gap-2"><span className="text-sm">Ưu tiên:</span><Badge variant="danger" size="sm">High</Badge></div>
    </ShowcaseCard>
  </div>
);

const CheckboxPage = () => (
  <div className="max-w-3xl">
    <PageHeader title="Checkbox" description="Lựa chọn nhị phân với đầy đủ trạng thái và kích thước." />

    <ShowcaseCard title="Basic States">
      <Checkbox label="Chưa chọn (default)" />
      <Checkbox label="Đã chọn" defaultChecked />
      <Checkbox label="Lấp lửng (indeterminate)" indeterminate />
      <Checkbox label="Vô hiệu hóa" disabled />
      <Checkbox label="Checked + Disabled" defaultChecked disabled />
    </ShowcaseCard>

    <ShowcaseCard title="Sizes">
      <Checkbox size="sm" label="Small" />
      <Checkbox size="md" label="Medium" defaultChecked />
      <Checkbox size="lg" label="Large" defaultChecked />
    </ShowcaseCard>

    <ShowcaseCard title="Use Case — Form chấp thuận">
      <div className="w-full space-y-3">
        <Checkbox label="Nhận thông báo qua Email" defaultChecked />
        <Checkbox label="Nhận thông báo qua SMS" />
        <Checkbox label="Đăng ký nhận bản tin hàng tuần" />
        <Checkbox label="Đồng ý với điều khoản dịch vụ" defaultChecked />
      </div>
    </ShowcaseCard>
  </div>
);

const RadioPage = () => (
  <div className="max-w-3xl">
    <PageHeader title="Radio Group" description="Chọn một trong nhiều tùy chọn (mutually exclusive)." />

    <ShowcaseCard title="Basic Group">
      <RadioGroup defaultValue="monthly">
        <Radio value="monthly" label="Hàng tháng — 200.000đ/tháng" />
        <Radio value="yearly" label="Hàng năm — 180.000đ/tháng (Tiết kiệm 10%)" />
        <Radio value="lifetime" label="Trọn đời — Thanh toán một lần" />
      </RadioGroup>
    </ShowcaseCard>

    <ShowcaseCard title="Sizes">
      <RadioGroup defaultValue="md">
        <div className="flex items-center gap-8">
          <Radio value="sm" size="sm" label="Small" />
          <Radio value="md" size="md" label="Medium" />
          <Radio value="lg" size="lg" label="Large" />
        </div>
      </RadioGroup>
    </ShowcaseCard>

    <ShowcaseCard title="Disabled State">
      <RadioGroup defaultValue="a">
        <Radio value="a" label="Tùy chọn bình thường" />
        <Radio value="b" label="Tùy chọn bị vô hiệu" disabled />
        <Radio value="c" label="Tùy chọn bình thường khác" />
      </RadioGroup>
    </ShowcaseCard>
  </div>
);

const SwitchPage = () => (
  <div className="max-w-3xl">
    <PageHeader title="Switch" description="Bật/tắt trạng thái, hỗ trợ 2 kích thước." />

    <ShowcaseCard title="Basic States">
      <Switch label="Thông báo Email" />
      <Switch label="Chế độ tối" defaultChecked />
      <Switch label="Bảo trì (Disabled)" disabled />
      <Switch label="Luôn bật (Checked + Disabled)" defaultChecked disabled />
    </ShowcaseCard>

    <ShowcaseCard title="Sizes">
      <Switch size="sm" label="Small Switch" defaultChecked />
      <Switch size="md" label="Medium Switch" defaultChecked />
    </ShowcaseCard>

    <ShowcaseCard title="Settings Panel Use Case">
      <div className="w-full space-y-0 max-w-sm divide-y divide-border">
        {[
          { label: 'Thông báo đẩy', checked: true },
          { label: 'Âm thanh', checked: false },
          { label: 'Đồng bộ dữ liệu', checked: true },
          { label: 'Chế độ an toàn', checked: false },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between py-3">
            <span className="text-sm text-foreground">{item.label}</span>
            <Switch size="sm" defaultChecked={item.checked} />
          </div>
        ))}
      </div>
    </ShowcaseCard>
  </div>
);

const ProgressPage = () => (
  <div className="max-w-4xl">
    <PageHeader title="Progress" description="Thanh tiến độ với nhiều variant, size và hiệu ứng." />

    <ShowcaseCard title="Variants">
      <div className="w-full space-y-4">
        <Progress value={60} variant="default" labelPosition="outside" label="Default" />
        <Progress value={75} variant="success" labelPosition="outside" label="Success" />
        <Progress value={45} variant="warning" labelPosition="outside" label="Warning" />
        <Progress value={30} variant="danger" labelPosition="outside" label="Danger" />
        <Progress value={88} variant="gradient" labelPosition="outside" label="Gradient" />
      </div>
    </ShowcaseCard>

    <ShowcaseCard title="Sizes (sm / md / lg)">
      <div className="w-full space-y-4">
        <Progress value={55} size="sm" variant="success" labelPosition="outside" label="Small" />
        <Progress value={70} size="md" variant="default" labelPosition="outside" label="Medium" />
        <Progress value={85} size="lg" variant="gradient" labelPosition="outside" label="Large" />
      </div>
    </ShowcaseCard>

    <ShowcaseCard title="Striped & Animated">
      <div className="w-full space-y-4">
        <Progress value={65} striped variant="default" labelPosition="outside" label="Striped" />
        <Progress value={45} striped animated variant="warning" labelPosition="outside" label="Animated" />
        <Progress value={80} striped animated variant="success" labelPosition="outside" label="Success Animated" />
      </div>
    </ShowcaseCard>

    <ShowcaseCard title="Label Positions">
      <div className="w-full space-y-6">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Outside (default)</p>
          <Progress value={72} labelPosition="outside" variant="default" />
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Inside</p>
          <Progress value={72} labelPosition="inside" size="lg" variant="success" />
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">None</p>
          <Progress value={72} labelPosition="none" variant="gradient" />
        </div>
      </div>
    </ShowcaseCard>
  </div>
);

const SliderPage = () => (
  <div className="max-w-4xl">
    <PageHeader title="Slider" description="Thanh trượt chọn giá trị trong khoảng." />

    <ShowcaseCard title="Default">
      <div className="w-full"><Slider defaultValue={[50]} /></div>
    </ShowcaseCard>

    <ShowcaseCard title="Các giá trị khởi đầu">
      <div className="w-full space-y-8">
        <Slider defaultValue={[25]} />
        <Slider defaultValue={[50]} />
        <Slider defaultValue={[80]} />
      </div>
    </ShowcaseCard>

    <ShowcaseCard title="Disabled">
      <div className="w-full"><Slider defaultValue={[60]} disabled /></div>
    </ShowcaseCard>
  </div>
);

const InputPage = () => (
  <div className="max-w-lg">
    <PageHeader title="Input" description="Trường nhập liệu với 3 variant và nhiều trạng thái." />

    <ShowcaseCard title="Variants (default / filled / flushed)">
      <div className="w-full space-y-5">
        <Input label="Default" placeholder="Nhập văn bản..." />
        <Input variant="filled" label="Filled" placeholder="Nhập văn bản..." />
        <Input variant="flushed" label="Flushed" placeholder="Nhập văn bản..." />
      </div>
    </ShowcaseCard>

    <ShowcaseCard title="With Icons">
      <div className="w-full space-y-5">
        <Input label="Tìm kiếm" icon={<Search className="w-4 h-4" />} placeholder="Tìm kiếm..." />
        <Input label="Email" icon={<Mail className="w-4 h-4" />} placeholder="you@example.com" type="email" />
        <Input label="Mật khẩu" icon={<Lock className="w-4 h-4" />} placeholder="••••••••" type="password" />
      </div>
    </ShowcaseCard>

    <ShowcaseCard title="States">
      <div className="w-full space-y-5">
        <Input label="Normal" placeholder="Trạng thái bình thường" />
        <Input label="Error State" error="Email không hợp lệ." placeholder="Nhập email..." />
        <Input label="Disabled" placeholder="Không thể nhập" disabled />
      </div>
    </ShowcaseCard>
  </div>
);

const SelectPage = () => (
  <div className="max-w-md">
    <PageHeader title="Select" description="Dropdown chọn một giá trị từ danh sách cố định." />

    <ShowcaseCard title="Basic Select">
      <div className="w-full space-y-5">
        <Select label="Chủ đề" placeholder="Chọn theme" options={[
          { label: 'Sáng (Light)', value: 'light' },
          { label: 'Tối (Dark)', value: 'dark' },
          { label: 'Hệ thống', value: 'system' },
        ]} />
        <Select label="Vai trò" placeholder="Chọn vai trò" options={[
          { label: 'Quản trị viên', value: 'admin' },
          { label: 'Biên tập viên', value: 'editor' },
          { label: 'Người dùng', value: 'user' },
        ]} />
      </div>
    </ShowcaseCard>
  </div>
);

const ComboBoxPage = () => {
  const options = [
    { label: 'React', value: 'react' },
    { label: 'Next.js', value: 'nextjs' },
    { label: 'Vite', value: 'vite' },
    { label: 'Tailwind CSS', value: 'tailwind' },
    { label: 'Base UI', value: 'baseui' },
    { label: 'Tanstack Table', value: 'table' },
  ];
  return (
    <div className="max-w-3xl">
      <PageHeader title="ComboBox" description="Dropdown kết hợp tìm kiếm, hỗ trợ single và multi-select." />

      <ShowcaseCard title="Single + Autocomplete">
        <div className="w-80">
          <ComboBox options={options} label="Framework" placeholder="Tìm kiếm..." />
        </div>
      </ShowcaseCard>

      <ShowcaseCard title="Multi-select (Chips inside Input)">
        <div className="w-full">
          <ComboBox options={options} multiple label="Công nghệ sử dụng" placeholder="Thêm công nghệ..." />
        </div>
      </ShowcaseCard>

      <ShowcaseCard title="Single (No Autocomplete)" description="Chỉ chọn từ list, không gõ.">
        <div className="w-80">
          <ComboBox options={options} autocomplete={false} label="Framework cố định" placeholder="Chọn..." />
        </div>
      </ShowcaseCard>

      <ShowcaseCard title="Multi (No Autocomplete)">
        <div className="w-full">
          <ComboBox options={options} multiple autocomplete={false} label="Danh sách cố định" placeholder="Chọn mục..." />
        </div>
      </ShowcaseCard>
    </div>
  );
};

const DatePickerPage = () => {
  const [single, setSingle] = React.useState<Date | undefined>();
  const [range, setRange] = React.useState<DateRange | undefined>();
  const [dt1, setDt1] = React.useState<Date | undefined>();
  const [dt2, setDt2] = React.useState<Date | undefined>();
  const [future, setFuture] = React.useState<Date | undefined>();
  return (
    <div className="max-w-lg">
      <PageHeader title="DatePicker" description="Bộ chọn ngày tháng đầy đủ tính năng." />

      <ShowcaseCard title="Single Date">
        <DatePicker label="Ngày sinh" date={single} onDateChange={(d) => setSingle(d as Date | undefined)} placeholder="Chọn ngày..." />
      </ShowcaseCard>

      <ShowcaseCard title="Date Range">
        <DatePicker mode="range" label="Khoảng thời gian" date={range} onDateChange={(d) => setRange(d as DateRange | undefined)} placeholder="Từ — Đến" />
      </ShowcaseCard>

      <ShowcaseCard title="Chặn Ngày Quá Khứ">
        <DatePicker label="Lịch hẹn" date={future} onDateChange={(d) => setFuture(d as Date | undefined)} disablePastDates placeholder="Chỉ ngày tương lai..." />
      </ShowcaseCard>

      <ShowcaseCard title="DateTime — Nhập giờ (Input)">
        <DatePicker label="Ngày & Giờ" showTime timePickerStyle="input" date={dt1} onDateChange={(d) => setDt1(d as Date | undefined)} placeholder="Chọn ngày giờ..." />
      </ShowcaseCard>

      <ShowcaseCard title="DateTime — Chọn giờ (Select)">
        <DatePicker label="Ngày & Giờ" showTime timePickerStyle="select" date={dt2} onDateChange={(d) => setDt2(d as Date | undefined)} placeholder="Chọn ngày giờ..." />
      </ShowcaseCard>
    </div>
  );
};

const TabsPage = () => (
  <div className="max-w-3xl">
    <PageHeader title="Tabs" description="Chia nội dung theo nhóm, chuyển tab mượt mà." />

    <ShowcaseCard title="Basic Tabs">
      <Tabs defaultValue="account" items={[
        { label: 'Tài khoản', value: 'account', content: <div className="p-4 bg-muted/50 rounded-md text-sm text-muted-foreground">Cài đặt hồ sơ cá nhân, ảnh đại diện và tên hiển thị.</div> },
        { label: 'Bảo mật', value: 'security', content: <div className="p-4 bg-muted/50 rounded-md text-sm text-muted-foreground">Đổi mật khẩu, bật xác thực 2 bước (2FA).</div> },
        { label: 'Thông báo', value: 'notif', content: <div className="p-4 bg-muted/50 rounded-md text-sm text-muted-foreground">Tùy chỉnh cách nhận thông báo qua Email, SMS, Push.</div> },
        { label: 'Thanh toán', value: 'billing', content: <div className="p-4 bg-muted/50 rounded-md text-sm text-muted-foreground">Quản lý phương thức thanh toán và hóa đơn.</div> },
      ]} />
    </ShowcaseCard>

    <ShowcaseCard title="With Rich Content">
      <Tabs defaultValue="list" items={[
        {
          label: 'Danh sách GD', value: 'list',
          content: (
            <div className="space-y-2 pt-2">
              {['Giao dịch #1001 — 500.000đ', 'Giao dịch #1002 — 1.200.000đ', 'Giao dịch #1003 — 45.000đ'].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                  <span className="text-sm">{item}</span>
                  <Badge variant={i === 0 ? 'success' : i === 1 ? 'warning' : 'soft-primary'} size="sm">
                    {i === 0 ? 'Thành công' : i === 1 ? 'Đang xử lý' : 'Chờ duyệt'}
                  </Badge>
                </div>
              ))}
            </div>
          ),
        },
        {
          label: 'Báo cáo', value: 'report',
          content: (
            <div className="space-y-4 pt-2">
              <Progress value={85} variant="success" labelPosition="outside" label="Thành công" />
              <Progress value={10} variant="warning" labelPosition="outside" label="Đang xử lý" />
              <Progress value={5} variant="danger" labelPosition="outside" label="Thất bại" />
            </div>
          ),
        },
      ]} />
    </ShowcaseCard>
  </div>
);

const AccordionPage = () => (
  <div className="max-w-3xl">
    <PageHeader title="Accordion" description="Co giãn nhóm nội dung, hỗ trợ single và multiple mode." />

    <ShowcaseCard title="Single Mode (mặc định)" description="Chỉ mở một panel.">
      <div className="w-full">
        <Accordion>
          <AccordionItem value="q1">
            <AccordionTrigger>Sản phẩm có miễn phí không?</AccordionTrigger>
            <AccordionContent>Có gói miễn phí với tính năng cơ bản. Gói Pro có đầy đủ tính năng nâng cao.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="q2">
            <AccordionTrigger>Có thể hủy đăng ký bất kỳ lúc nào không?</AccordionTrigger>
            <AccordionContent>Hoàn toàn có thể. Hủy bất cứ lúc nào, không phí phạt.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="q3">
            <AccordionTrigger>Hỗ trợ kỹ thuật ra sao?</AccordionTrigger>
            <AccordionContent>Hỗ trợ 24/7 qua Email và Live Chat cho gói Pro trở lên.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </ShowcaseCard>

    <ShowcaseCard title="Multiple Mode" description="Mở nhiều panel cùng lúc.">
      <div className="w-full">
        <Accordion multiple defaultValue={['t1', 't2']}>
          <AccordionItem value="t1">
            <AccordionTrigger>Điều khoản sử dụng</AccordionTrigger>
            <AccordionContent>Người dùng tự chịu trách nhiệm về dữ liệu cá nhân. Nền tảng không bán thông tin cho bên thứ ba.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="t2">
            <AccordionTrigger>Chính sách bảo mật</AccordionTrigger>
            <AccordionContent>Dữ liệu được mã hóa và lưu tại Việt Nam, tuân thủ PDPA.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="t3">
            <AccordionTrigger>Liên hệ hỗ trợ</AccordionTrigger>
            <AccordionContent>Email: support@example.com | Hotline: 1800-xxxx | 24/7</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </ShowcaseCard>
  </div>
);

const CollapsiblePage = () => (
  <div className="max-w-3xl">
    <PageHeader title="Collapsible" description="Ẩn/hiện nội dung tùy chọn, đơn giản hơn Accordion." />

    <ShowcaseCard title="Các ví dụ Collapsible">
      <div className="w-full space-y-3">
        <Collapsible trigger="Xem chi tiết giao dịch">
          <div className="p-4 border border-border rounded-md text-sm text-muted-foreground space-y-1">
            <p>Mã GD: #TX-20240401-001</p>
            <p>Số tiền: 500.000đ | Thời gian: 10:30 01/04/2024</p>
          </div>
        </Collapsible>
        <Collapsible trigger="Điều khoản dịch vụ" defaultOpen>
          <div className="p-4 border border-border rounded-md text-sm text-muted-foreground space-y-1">
            <p>1. Bằng cách sử dụng dịch vụ, bạn đồng ý với các điều khoản này.</p>
            <p>2. Chúng tôi có quyền thay đổi điều khoản bất cứ lúc nào.</p>
          </div>
        </Collapsible>
        <Collapsible trigger="Câu hỏi thường gặp">
          <div className="p-4 border border-border rounded-md text-sm text-muted-foreground">
            <p><b>Q:</b> Làm thế nào nạp tiền?<br /><b>A:</b> Vào Ví → Nạp tiền → Chọn hình thức.</p>
          </div>
        </Collapsible>
      </div>
    </ShowcaseCard>
  </div>
);

const PopoverPage = () => (
  <div className="max-w-4xl">
    <PageHeader title="Popover" description="Nội dung popup khi click, hỗ trợ nội dung tùy ý." />

    <ShowcaseCard title="Basic Popover">
      <Popover trigger={<Button variant="outline"><Settings className="w-4 h-4 mr-2" />Cài đặt</Button>}>
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Cài đặt hiển thị</h4>
          <Switch size="sm" label="Chế độ tối" />
          <Switch size="sm" label="Thông báo đẩy" defaultChecked />
          <Switch size="sm" label="Âm thanh" />
        </div>
      </Popover>

      <Popover trigger={<Button variant="secondary"><Bell className="w-4 h-4 mr-2" />Thông báo <Badge size="sm" variant="danger" className="ml-1">3</Badge></Button>}>
        <div className="w-64 space-y-2">
          <h4 className="font-semibold text-sm mb-3">Thông báo mới</h4>
          {['Giao dịch #1299 thành công', 'Đăng nhập thiết bị mới', 'Báo cáo tháng 3 sẵn sàng'].map((n, i) => (
            <div key={i} className="flex items-start gap-2 p-2 hover:bg-muted rounded-md cursor-pointer">
              <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-success" />
              <p className="text-xs">{n}</p>
            </div>
          ))}
        </div>
      </Popover>
    </ShowcaseCard>
  </div>
);

const TooltipPage = () => (
  <div className="max-w-4xl">
    <PageHeader title="Tooltip" description="Thông tin phụ khi hover, hỗ trợ 4 hướng × 3 căn chỉnh." />

    <ShowcaseCard title="4 Hướng (top / right / bottom / left)">
      <Tooltip content="Tooltip phía trên" side="top"><Button variant="outline" size="sm">Top</Button></Tooltip>
      <Tooltip content="Tooltip bên phải" side="right"><Button variant="outline" size="sm">Right</Button></Tooltip>
      <Tooltip content="Tooltip phía dưới" side="bottom"><Button variant="outline" size="sm">Bottom</Button></Tooltip>
      <Tooltip content="Tooltip bên trái" side="left"><Button variant="outline" size="sm">Left</Button></Tooltip>
    </ShowcaseCard>

    <ShowcaseCard title="3 Căn chỉnh (start / center / end)">
      <Tooltip content="Căn đầu (start)" side="bottom" align="start"><Button variant="secondary" size="sm">Start</Button></Tooltip>
      <Tooltip content="Căn giữa (center)" side="bottom" align="center"><Button variant="secondary" size="sm">Center</Button></Tooltip>
      <Tooltip content="Căn cuối (end)" side="bottom" align="end"><Button variant="secondary" size="sm">End</Button></Tooltip>
    </ShowcaseCard>

    <ShowcaseCard title="Thực tế — Icon Buttons">
      <Tooltip content="Thêm mới" side="top"><Button size="icon" variant="outline"><Plus className="w-4 h-4" /></Button></Tooltip>
      <Tooltip content="Cài đặt hệ thống" side="top"><Button size="icon" variant="outline"><Settings className="w-4 h-4" /></Button></Tooltip>
      <Tooltip content="Xóa vĩnh viễn (không hoàn tác)" side="top"><Button size="icon" variant="danger"><Trash2 className="w-4 h-4" /></Button></Tooltip>
    </ShowcaseCard>
  </div>
);

const AlertPage = () => (
  <div className="max-w-4xl">
    <PageHeader title="Alert & Toast" description="Thông báo tĩnh (Alert) và thông báo thoáng (Toast)." />

    <ShowcaseCard title="Alert Variants (info / success / warning / destructive / default)">
      <div className="w-full space-y-4">
        <Alert variant="info"><Info className="h-4 w-4" /><AlertTitle>Thông tin</AlertTitle><AlertDescription>Hệ thống bảo trì lúc 2h AM ngày mai.</AlertDescription></Alert>
        <Alert variant="success"><CheckCircle2 className="h-4 w-4" /><AlertTitle>Thành công</AlertTitle><AlertDescription>Hồ sơ đã được duyệt. Chào mừng!</AlertDescription></Alert>
        <Alert variant="warning"><AlertCircle className="h-4 w-4" /><AlertTitle>Cảnh báo</AlertTitle><AlertDescription>Tài khoản sắp hết hạn dùng thử.</AlertDescription></Alert>
        <Alert variant="destructive"><XCircle className="h-4 w-4" /><AlertTitle>Lỗi</AlertTitle><AlertDescription>Không thể kết nối đến máy chủ.</AlertDescription></Alert>
        <Alert><Info className="h-4 w-4" /><AlertTitle>Mặc định</AlertTitle><AlertDescription>Kiểu Alert neutral mặc định.</AlertDescription></Alert>
      </div>
    </ShowcaseCard>

    <ShowcaseCard title="Toast Notifications — Click để kích hoạt">
      <Button onClick={() => toast.success('Thành công!', { description: 'Số tiền 500.000đ đã được chuyển.' })}>Success Toast</Button>
      <Button variant="danger" onClick={() => toast.error('Lỗi!', { description: 'Không thể kết nối ngân hàng.' })}>Error Toast</Button>
      <Button variant="outline" onClick={() => toast.info('Thông báo', { description: 'Phiên làm việc còn 5 phút.' })}>Info Toast</Button>
      <Button variant="secondary" onClick={() => toast.warning('Cảnh báo', { description: 'Số dư ví sắp cạn.' })}>Warning Toast</Button>
    </ShowcaseCard>
  </div>
);

const AvatarPage = () => (
  <div className="max-w-4xl">
    <PageHeader title="Avatar" description="Hình đại diện với ảnh, fallback chữ và group stack." />

    <ShowcaseCard title="Sizes với ảnh (sm / md / lg / xl)">
      <Avatar size="sm" src="https://i.pravatar.cc/150?u=a1" alt="A" />
      <Avatar size="md" src="https://i.pravatar.cc/150?u=b1" alt="B" />
      <Avatar size="lg" src="https://i.pravatar.cc/150?u=c1" alt="C" />
      <Avatar size="xl" src="https://i.pravatar.cc/150?u=d1" alt="D" />
    </ShowcaseCard>

    <ShowcaseCard title="Fallback Text (Initials)">
      <Avatar size="sm" fallback="HT" />
      <Avatar size="md" fallback="AB" />
      <Avatar size="lg" fallback="JD" />
      <Avatar size="xl" fallback="MR" />
    </ShowcaseCard>

    <ShowcaseCard title="Broken Image → Auto Fallback">
      <Avatar src="broken.jpg" alt="Nguyen Van A" size="lg" />
      <Avatar src="404.png" alt="Tran Thi B" size="lg" />
    </ShowcaseCard>

    <ShowcaseCard title="Avatar Group / Stack">
      <div className="flex -space-x-3">
        {['a2', 'b2', 'c2', 'd2', 'e2'].map((u) => (
          <Avatar key={u} size="md" src={`https://i.pravatar.cc/150?u=${u}`} alt={u} className="border-2 border-background" />
        ))}
        <div className="h-10 w-10 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-semibold text-muted-foreground">+8</div>
      </div>
    </ShowcaseCard>
  </div>
);

const SkeletonPage = () => (
  <div className="max-w-4xl">
    <PageHeader title="Skeleton" description="Placeholder loading thay thế nội dung đang tải." />

    <ShowcaseCard title="Shapes cơ bản">
      <Skeleton className="h-12 w-12 rounded-full" />
      <Skeleton className="h-12 w-48 rounded-md" />
      <Skeleton className="h-4 w-64 rounded" />
    </ShowcaseCard>

    <ShowcaseCard title="User Card Skeleton">
      <div className="flex items-center space-x-4 w-full">
        <Skeleton className="h-12 w-12 rounded-full shrink-0" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-3 w-1/4" />
        </div>
      </div>
    </ShowcaseCard>

    <ShowcaseCard title="Article Skeleton">
      <div className="space-y-4 w-full">
        <Skeleton className="h-48 w-full rounded-lg" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </div>
    </ShowcaseCard>
  </div>
);

const SpinnerPage = () => (
  <div className="max-w-4xl">
    <PageHeader title="Spinner" description="Vòng xoay chờ tải, 5 kích thước × 4 màu sắc." />

    <ShowcaseCard title="Sizes (xs → xl)">
      <div className="flex items-end gap-8">
        {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
          <div key={s} className="flex flex-col items-center gap-2">
            <Spinner size={s} />
            <span className="text-xs text-muted-foreground">{s}</span>
          </div>
        ))}
      </div>
    </ShowcaseCard>

    <ShowcaseCard title="Variants (primary / secondary / muted / white)">
      <div className="flex items-center gap-8">
        {([['primary', ''], ['secondary', ''], ['muted', ''], ['white', 'bg-foreground p-2 rounded-md']] as const).map(([v, cls]) => (
          <div key={v} className="flex flex-col items-center gap-2">
            <div className={cls}><Spinner variant={v} /></div>
            <span className="text-xs text-muted-foreground">{v}</span>
          </div>
        ))}
      </div>
    </ShowcaseCard>
  </div>
);

const DialogModal = () => {
  const [loading, setLoading] = React.useState(false);
  const handleSave = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); toast.success('Đã lưu!'); }, 2000);
  };
  return (
    <div className="max-w-4xl">
      <PageHeader title="Dialog (Modal)" description="Hộp thoại bắt buộc người dùng tập trung xử lý." />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ShowcaseCard title="Default Modal">
          <Dialog trigger={<Button variant="outline">Mở Default</Button>} headerTitle="Thông báo hệ thống" headerDescription="Dữ liệu đã được lưu tự động.">
            <div className="py-4"><p className="text-sm text-muted-foreground">Phiên làm việc sắp hết hạn sau 15 phút.</p></div>
          </Dialog>
        </ShowcaseCard>

        <ShowcaseCard title="Custom Footer">
          <Dialog
            trigger={<Button variant="secondary">Custom Footer</Button>}
            headerTitle="Xác nhận thanh toán"
            footerContent={
              <div className="flex items-center justify-between w-full">
                <div className="text-sm text-muted-foreground">Phí: <b>12.000đ</b></div>
                <div className="flex gap-2"><Button variant="ghost" size="sm">Hủy</Button><Button size="sm">Thanh toán</Button></div>
              </div>
            }
          >
            <p className="text-sm py-4">Vui lòng kiểm tra số tiền trước khi tiếp tục.</p>
          </Dialog>
        </ShowcaseCard>

        <ShowcaseCard title="Loading Submit">
          <Dialog
            trigger={<Button>Loading Demo</Button>}
            headerTitle="Cập nhật thông tin"
            footerContent={
              <div className="flex justify-end gap-2">
                <Button variant="outline" disabled={loading}>Hủy</Button>
                <Button onClick={handleSave} disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
                </Button>
              </div>
            }
          >
            <div className="space-y-4 py-4">
              <Input label="Email" defaultValue="admin@example.vn" disabled={loading} />
              <Input label="SĐT" defaultValue="0987654321" disabled={loading} />
            </div>
          </Dialog>
        </ShowcaseCard>

        <ShowcaseCard title="Full Screen">
          <Dialog size="fullScreen" trigger={<Button variant="outline"><Layers className="mr-2 h-4 w-4" />Toàn màn hình</Button>} headerTitle="Trình soạn thảo" headerDescription="Chế độ tập trung.">
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
              <p>Nội dung full screen ở đây...</p>
            </div>
          </Dialog>
        </ShowcaseCard>
      </div>
    </div>
  );
};

const AlertDialogPage = () => (
  <div className="max-w-3xl">
    <PageHeader title="Alert Dialog" description="Hộp thoại xác nhận bắt buộc, không thể đóng bằng click ngoài." />

    <ShowcaseCard title="Xác nhận Xóa">
      <AlertDialog
        trigger={<Button variant="danger"><Trash2 className="w-4 h-4 mr-2" />Xóa tài khoản</Button>}
        headerTitle="Xóa tài khoản?"
        headerDescription="Hành động này không thể hoàn tác. Toàn bộ dữ liệu sẽ bị xóa vĩnh viễn."
        cancelContent={<Button variant="outline">Hủy bỏ</Button>}
        actionContent={<Button variant="danger"><Trash2 className="w-4 h-4 mr-2" />Xóa vĩnh viễn</Button>}
      />
    </ShowcaseCard>

    <ShowcaseCard title="Xác nhận Gửi">
      <AlertDialog
        trigger={<Button>Gửi yêu cầu duyệt</Button>}
        headerTitle="Xác nhận gửi?"
        headerDescription="Sau khi gửi, bạn không thể chỉnh sửa. Quản trị viên xem xét trong 1-3 ngày."
        cancelContent={<Button variant="ghost">Quay lại</Button>}
        actionContent={<Button>Xác nhận gửi</Button>}
      />
    </ShowcaseCard>
  </div>
);

const TablePage = () => {
  const data = React.useMemo(() => [
    { id: '1', name: 'Huy Tran', email: 'huy@example.com', role: 'Owner', status: 'Active', amount: '1.500.000đ' },
    { id: '2', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', amount: '850.000đ' },
    { id: '3', name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Inactive', amount: '320.000đ' },
    { id: '4', name: 'Bob Wilson', email: 'bob@example.com', role: 'User', status: 'Active', amount: '95.000đ' },
    { id: '5', name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Pending', amount: '200.000đ' },
  ], []);
  const columns: ColumnDef<any>[] = [
    { accessorKey: 'name', header: 'Họ tên' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'role', header: 'Vai trò' },
    { accessorKey: 'amount', header: 'Giao dịch' },
    {
      accessorKey: 'status', header: 'Trạng thái',
      cell: ({ getValue }: any) => {
        const s = getValue() as string;
        const v = s === 'Active' ? 'success' : s === 'Inactive' ? 'danger' : 'warning';
        return <Badge variant={v as any} size="sm" pulse={s === 'Active'}>{s}</Badge>;
      }
    },
  ];
  return (
    <div className="max-w-5xl">
      <PageHeader title="Data Table" description="Bảng dữ liệu mạnh mẽ với sort, pagination, row selection." />
      <Table data={data} columns={columns} enableRowSelection enablePagination />
    </div>
  );
};

const TransactionPage = () => {
  const data = React.useMemo(() => [
    { id: '1', date: '2024-03-31 10:30', user: 'huy_tran_01', type: 'Sản lượng ví', amount: '500.000đ', status: 'Thành công' },
    { id: '2', date: '2024-03-31 09:15', user: 'admin_test', type: 'Chuyển tiền', amount: '1.200.000đ', status: 'Đang xử lý' },
    { id: '3', date: '2024-03-30 22:45', user: 'user_vips', type: 'Thanh toán', amount: '45.000đ', status: 'Thành công' },
  ], []);
  const columns: ColumnDef<any>[] = [
    { accessorKey: 'date', header: 'Thời gian' },
    { accessorKey: 'user', header: 'Người dùng' },
    { accessorKey: 'type', header: 'Loại GD' },
    { accessorKey: 'amount', header: 'Số tiền' },
    { accessorKey: 'status', header: 'Trạng thái', cell: ({ getValue }: any) => <Badge variant={getValue() === 'Thành công' ? 'success' : 'warning'}>{getValue()}</Badge> },
  ];
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card><CardContent className="p-6"><p className="text-xs font-semibold text-muted-foreground uppercase">Tổng doanh thu</p><p className="text-3xl font-bold mt-2 text-primary">124.500.000đ</p><Badge variant="success" className="mt-2">+12% tháng trước</Badge></CardContent></Card>
        <Card><CardContent className="p-6"><p className="text-xs font-semibold text-muted-foreground uppercase">Giao dịch mới</p><p className="text-3xl font-bold mt-2 text-blue-500">1,240</p><Badge variant="secondary" className="mt-2">40 GD/ngày</Badge></CardContent></Card>
        <Card><CardContent className="p-6"><p className="text-xs font-semibold text-muted-foreground uppercase">Tỉ lệ thành công</p><p className="text-3xl font-bold mt-2 text-success">99.8%</p><Badge variant="success" className="mt-2" pulse>Rất ổn định</Badge></CardContent></Card>
      </div>
      <Card>
        <CardHeader><CardTitle>Danh sách giao dịch</CardTitle><CardDescription>Cập nhật mỗi 30 giây.</CardDescription></CardHeader>
        <CardContent className="p-0 border-t border-border/50">
          <Table data={data} columns={columns} enableRowSelection />
        </CardContent>
      </Card>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Root
// ─────────────────────────────────────────────────────────────────────────────

const Test = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<TransactionPage />} />

        <Route path="components/button" element={<ButtonPage />} />
        <Route path="components/badge" element={<BadgePage />} />
        <Route path="components/checkbox" element={<CheckboxPage />} />
        <Route path="components/radio" element={<RadioPage />} />
        <Route path="components/switch" element={<SwitchPage />} />
        <Route path="components/progress" element={<ProgressPage />} />
        <Route path="components/slider" element={<SliderPage />} />
        <Route path="components/input" element={<InputPage />} />
        <Route path="components/select" element={<SelectPage />} />
        <Route path="components/combobox" element={<ComboBoxPage />} />
        <Route path="components/datepicker" element={<DatePickerPage />} />
        <Route path="components/tabs" element={<TabsPage />} />
        <Route path="components/accordion" element={<AccordionPage />} />
        <Route path="components/collapsible" element={<CollapsiblePage />} />
        <Route path="components/popover" element={<PopoverPage />} />
        <Route path="components/tooltip" element={<TooltipPage />} />
        <Route path="components/alert" element={<AlertPage />} />
        <Route path="components/avatar" element={<AvatarPage />} />
        <Route path="components/skeleton" element={<SkeletonPage />} />
        <Route path="components/spinner" element={<SpinnerPage />} />
        <Route path="components/dialog" element={<DialogModal />} />
        <Route path="components/alert-dialog" element={<AlertDialogPage />} />
        <Route path="components/table" element={<TablePage />} />
        <Route path="components/advanced-form" element={<FormShowcase />} />

        <Route path="*" element={<div className="p-20 text-center text-muted-foreground">Đang xây dựng...</div>} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Test;