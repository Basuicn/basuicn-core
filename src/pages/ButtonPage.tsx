import React from 'react'
import { PageHeader, ShowcaseCard } from '@/components/ui/Showcase'
import { Button } from '@components/ui/button/Button'
import { Mail, Star, Plus, ArrowRight, ChevronRight, Code2, Eye, Maximize2, Minimize2 } from 'lucide-react'
import { LiveProvider, LiveEditor, LivePreview, LiveError } from 'react-live'

const ButtonPage = () => {
    const [isExpanded, setIsExpanded] = React.useState(false);

    return (
        <div className="max-w-5xl">
            <PageHeader title="Button" description="Nút tương tác đa dạng variant, size và trạng thái." />

            <ShowcaseCard title="Variants">
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
    )
}

export default ButtonPage;
