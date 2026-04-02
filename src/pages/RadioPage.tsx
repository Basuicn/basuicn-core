import { RadioGroup } from "@components/ui/radio-group/RadioGroup";
import { Radio } from "@components/ui/radio/Radio";
import { PageHeader, ShowcaseCard } from "@components/ui/Showcase";

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

export default RadioPage;
