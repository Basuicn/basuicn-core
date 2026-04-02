import { PageHeader, ShowcaseCard } from "@components/ui/Showcase";
import { Input } from "@components/ui/input/Input";
import *as Icon from "@components/ui/icons";

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
                <Input label="Tìm kiếm" icon={<Icon.Search className="w-4 h-4" />} placeholder="Tìm kiếm..." />
                <Input label="Email" icon={<Icon.Mail className="w-4 h-4" />} placeholder="you@example.com" type="email" />
                <Input label="Mật khẩu" icon={<Icon.Lock className="w-4 h-4" />} placeholder="••••••••" type="password" />
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
export default InputPage;
