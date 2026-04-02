import React from 'react'
import { PageHeader, ShowcaseCard } from '@/components/ui/Showcase'
import { Toggle, ToggleGroup, ToggleGroupItem } from '@components/ui/toggle/Toggle'
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-react'

const TogglePage = () => {
    const [bold, setBold] = React.useState(false);
    const [align, setAlign] = React.useState(['left']);
    const [format, setFormat] = React.useState<string[]>([]);
    return (
        <div className="max-w-4xl">
            <PageHeader title="Toggle" description="Nút bật/tắt hai trạng thái, hỗ trợ ToggleGroup." />

            <ShowcaseCard title="Variants">
                {(['default', 'outline', 'solid', 'ghost'] as const).map((v) => (
                    <Toggle key={v} variant={v}>{v}</Toggle>
                ))}
            </ShowcaseCard>

            <ShowcaseCard title="Single Toggle (Controlled)">
                <Toggle pressed={bold} onPressedChange={setBold} variant="outline">
                    <Bold className="w-4 h-4 mr-2" /> {bold ? 'Bold On' : 'Bold Off'}
                </Toggle>
            </ShowcaseCard>

            <ShowcaseCard title="Toggle Group — Single Selection">
                <ToggleGroup type="single" value={align} onValueChange={setAlign}>
                    <ToggleGroupItem value="left"><AlignLeft className="w-4 h-4" /></ToggleGroupItem>
                    <ToggleGroupItem value="center"><AlignCenter className="w-4 h-4" /></ToggleGroupItem>
                    <ToggleGroupItem value="right"><AlignRight className="w-4 h-4" /></ToggleGroupItem>
                </ToggleGroup>
            </ShowcaseCard>

            <ShowcaseCard title="Toggle Group — Multiple Selection">
                <ToggleGroup type="multiple" value={format} onValueChange={setFormat}>
                    <ToggleGroupItem value="bold"><Bold className="w-4 h-4" /></ToggleGroupItem>
                    <ToggleGroupItem value="italic"><Italic className="w-4 h-4" /></ToggleGroupItem>
                    <ToggleGroupItem value="underline"><Underline className="w-4 h-4" /></ToggleGroupItem>
                </ToggleGroup>
            </ShowcaseCard>
        </div>
    );
};

export default TogglePage;
