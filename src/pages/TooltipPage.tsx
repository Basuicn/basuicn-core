import React from 'react'
import { PageHeader, ShowcaseCard } from '@/components/ui/Showcase'
import { Tooltip, TooltipContent, TooltipTrigger } from '@components/ui/tooltip/Tooltip'
import { Button } from '@components/ui/button/Button'
import { Plus, Settings, Trash2 } from 'lucide-react'

const TooltipPage = () => (
    <div className="max-w-4xl">
        <PageHeader title="Tooltip" description="Thông tin phụ khi hover, hỗ trợ 4 hướng × 3 căn chỉnh." />

        <ShowcaseCard title="4 Hướng (top / right / bottom / left)">
            <Tooltip>
                <TooltipTrigger><Button variant="outline" size="sm">Top</Button></TooltipTrigger>
                <TooltipContent side="top">Tooltip phía trên</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger><Button variant="outline" size="sm">Right</Button></TooltipTrigger>
                <TooltipContent side="right">Tooltip bên phải</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger><Button variant="outline" size="sm">Bottom</Button></TooltipTrigger>
                <TooltipContent side="bottom">Tooltip phía dưới</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger><Button variant="outline" size="sm">Left</Button></TooltipTrigger>
                <TooltipContent side="left">Tooltip bên trái</TooltipContent>
            </Tooltip>
        </ShowcaseCard>

        <ShowcaseCard title="3 Căn chỉnh (start / center / end)">
            <Tooltip>
                <TooltipTrigger><Button variant="secondary" size="sm">Start</Button></TooltipTrigger>
                <TooltipContent align="start">Căn đầu (start)</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger><Button variant="secondary" size="sm">Center</Button></TooltipTrigger>
                <TooltipContent align="center">Căn giữa (center)</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger><Button variant="secondary" size="sm">End</Button></TooltipTrigger>
                <TooltipContent align="end">Căn cuối (end)</TooltipContent>
            </Tooltip>
        </ShowcaseCard>

        <ShowcaseCard title="Thực tế — Icon Buttons">
            <Tooltip>
                <TooltipTrigger><Button size="icon" variant="outline"><Plus className="w-4 h-4" /></Button></TooltipTrigger>
                <TooltipContent>Thêm mới</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger><Button size="icon" variant="outline"><Settings className="w-4 h-4" /></Button></TooltipTrigger>
                <TooltipContent>Cài đặt hệ thống</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger><Button size="icon" variant="danger"><Trash2 className="w-4 h-4" /></Button></TooltipTrigger>
                <TooltipContent>Xóa vĩnh viễn (không hoàn tác)</TooltipContent>
            </Tooltip>
        </ShowcaseCard>
    </div>
);

export default TooltipPage;
