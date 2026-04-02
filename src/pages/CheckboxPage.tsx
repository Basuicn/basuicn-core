import { Checkbox } from "@components/ui/checkbox/Checkbox";
import { PageHeader, ShowcaseCard } from "@components/ui/Showcase";

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
export default CheckboxPage;
