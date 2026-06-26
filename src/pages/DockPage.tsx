import * as React from 'react';
import { PageHeader, ShowcaseCard } from '@components/ui/Showcase';
import { Dock, DockIcon, DockSeparator } from '@components/ui/dock/Dock';
import * as Icon from '@/components/ui/icons';

const Stage: React.FC<{ children: React.ReactNode; tall?: boolean }> = ({ children, tall }) => (
  <div
    className={`flex w-full items-center justify-center ${tall ? 'min-h-56' : 'min-h-32'}`}
  >
    {children}
  </div>
);

const DockPage = () => (
  <div className="max-w-4xl">
    <PageHeader
      title="Dock"
      description="Thanh dock kiểu macOS: các icon phóng to mượt theo khoảng cách con trỏ. Hỗ trợ orientation ngang/dọc, tooltip nhãn, separator và cả API compound lẫn prop-based."
    />

    <ShowcaseCard
      title="Mặc định (compound)"
      description="Di chuột ngang qua dock để thấy hiệu ứng phóng to. Mỗi DockIcon có label hiển thị tooltip khi hover."
      code={`<Dock>
  <DockIcon label="Home"><Icon.Home className="h-5 w-5" /></DockIcon>
  <DockIcon label="Search"><Icon.Search className="h-5 w-5" /></DockIcon>
  <DockSeparator />
  <DockIcon label="Mail"><Icon.Mail className="h-5 w-5" /></DockIcon>
  <DockIcon label="Settings"><Icon.Settings className="h-5 w-5" /></DockIcon>
</Dock>`}
    >
      <Stage>
        <Dock>
          <DockIcon label="Home">
            <Icon.Home className="h-5 w-5" />
          </DockIcon>
          <DockIcon label="Search">
            <Icon.Search className="h-5 w-5" />
          </DockIcon>
          <DockIcon label="Messages">
            <Icon.MessageSquare className="h-5 w-5" />
          </DockIcon>
          <DockSeparator />
          <DockIcon label="Calendar">
            <Icon.CalendarDays className="h-5 w-5" />
          </DockIcon>
          <DockIcon label="Mail">
            <Icon.Mail className="h-5 w-5" />
          </DockIcon>
          <DockIcon label="Settings">
            <Icon.Settings className="h-5 w-5" />
          </DockIcon>
        </Dock>
      </Stage>
    </ShowcaseCard>

    <ShowcaseCard
      title="Prop-based (items)"
      description="Dùng nhanh một dòng qua prop `items` — render tương đương compound."
      code={`<Dock
  items={[
    { icon: <Icon.Home className="h-5 w-5" />, label: 'Home' },
    { icon: <Icon.BarChart3 className="h-5 w-5" />, label: 'Analytics' },
    { icon: <Icon.Bell className="h-5 w-5" />, label: 'Alerts' },
    { icon: <Icon.Settings className="h-5 w-5" />, label: 'Settings' },
  ]}
/>`}
    >
      <Stage>
        <Dock
          items={[
            { icon: <Icon.Home className="h-5 w-5" />, label: 'Home' },
            { icon: <Icon.BarChart3 className="h-5 w-5" />, label: 'Analytics' },
            { icon: <Icon.Bell className="h-5 w-5" />, label: 'Alerts' },
            { icon: <Icon.Sparkles className="h-5 w-5" />, label: 'Assistant' },
            { icon: <Icon.Settings className="h-5 w-5" />, label: 'Settings' },
          ]}
        />
      </Stage>
    </ShowcaseCard>

    <ShowcaseCard
      title="Dọc (vertical)"
      description="orientation='vertical' theo dõi trục Y; tooltip xuất hiện bên phải."
      code={`<Dock orientation="vertical">
  <DockIcon label="Home"><Icon.Home className="h-5 w-5" /></DockIcon>
  <DockIcon label="Search"><Icon.Search className="h-5 w-5" /></DockIcon>
  <DockSeparator />
  <DockIcon label="Settings"><Icon.Settings className="h-5 w-5" /></DockIcon>
</Dock>`}
    >
      <Stage tall>
        <Dock orientation="vertical">
          <DockIcon label="Home">
            <Icon.Home className="h-5 w-5" />
          </DockIcon>
          <DockIcon label="Search">
            <Icon.Search className="h-5 w-5" />
          </DockIcon>
          <DockIcon label="Upload">
            <Icon.Upload className="h-5 w-5" />
          </DockIcon>
          <DockSeparator />
          <DockIcon label="Terminal">
            <Icon.Terminal className="h-5 w-5" />
          </DockIcon>
          <DockIcon label="Settings">
            <Icon.Settings className="h-5 w-5" />
          </DockIcon>
        </Dock>
      </Stage>
    </ShowcaseCard>

    <ShowcaseCard
      title="Tuỳ biến độ phóng"
      description="Điều chỉnh iconSize, iconMagnification và iconDistance để đổi cảm giác phóng to."
      code={`<Dock iconSize={36} iconMagnification={72} iconDistance={120}>
  {/* ...DockIcon */}
</Dock>`}
    >
      <Stage tall>
        <Dock iconSize={36} iconMagnification={72} iconDistance={120}>
          <DockIcon label="Home">
            <Icon.Home className="h-5 w-5" />
          </DockIcon>
          <DockIcon label="Analytics">
            <Icon.BarChart3 className="h-5 w-5" />
          </DockIcon>
          <DockIcon label="Messages">
            <Icon.MessageSquare className="h-5 w-5" />
          </DockIcon>
          <DockIcon label="QR Code">
            <Icon.QrCode className="h-5 w-5" />
          </DockIcon>
          <DockIcon label="Settings">
            <Icon.Settings className="h-5 w-5" />
          </DockIcon>
        </Dock>
      </Stage>
    </ShowcaseCard>
  </div>
);

export default DockPage;
