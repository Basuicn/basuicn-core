import * as React from 'react';
import { PageHeader, ShowcaseCard } from "@components/ui/Showcase";
import { Slider } from "@components/ui/slider/Slider";

const SliderWithLabel = () => {
  const [value, setValue] = React.useState<number | number[]>([50]);
  
  return (
    <div className="flex items-center gap-4 w-full">
      <div className="flex-1">
        <Slider 
          value={value} 
          onValueChange={(v) => setValue(v as number[])} 
        />
      </div>
      <span className="min-w-[48px] text-sm font-semibold text-primary text-right tabular-nums">
        {Array.isArray(value) ? value.join(' - ') : value}
      </span>
    </div>
  );
};

const SliderPage = () => (
    <div className="max-w-4xl">
        <PageHeader title="Slider" description="Thanh trượt chọn giá trị trong khoảng." />

        <ShowcaseCard title="Default">
            <div className="w-full"><Slider defaultValue={[50]} /></div>
        </ShowcaseCard>

        <ShowcaseCard title="Hiển thị giá trị (Controlled)">
            <div className="w-full">
                <SliderWithLabel />
            </div>
        </ShowcaseCard>

        <ShowcaseCard title="Tooltip khi kéo">
            <div className="w-full space-y-8 pt-4">
                <Slider defaultValue={[30]} showTooltip />
                <Slider defaultValue={[60]} showTooltip />
            </div>
        </ShowcaseCard>

        <ShowcaseCard title="Tooltip – Range (2 thumb)">
            <div className="w-full pt-4">
                <Slider defaultValue={[20, 75]} showTooltip />
            </div>
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
