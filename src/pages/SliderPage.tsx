import { PageHeader, ShowcaseCard } from "@components/ui/Showcase";
import { Slider } from "@components/ui/slider/Slider";
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

export default SliderPage;
