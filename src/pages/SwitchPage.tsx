import { PageHeader, ShowcaseCard } from "@components/ui/Showcase";
import { Switch } from "@components/ui/switch/Switch";

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

export default SwitchPage;
