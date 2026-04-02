import React from 'react'
import { PageHeader, ShowcaseCard } from '@/components/ui/Showcase'
import { Tooltip } from '@components/ui/tooltip/Tooltip'
import { Button } from '@components/ui/button/Button'
import { Plus, Settings, Trash2 } from 'lucide-react'

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

export default TooltipPage;
