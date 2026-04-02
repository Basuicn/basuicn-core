import React from 'react'
import { PageHeader, ShowcaseCard } from '@/components/ui/Showcase'
import { Popover } from '@components/ui/popover/Popover'
import { Button } from '@components/ui/button/Button'
import { Switch } from '@components/ui/switch/Switch'
import { Badge } from '@components/ui/badge/Badge'
import { Settings, Bell, CheckCircle2 } from 'lucide-react'

const PopoverPage = () => (
    <div className="max-w-4xl">
        <PageHeader title="Popover" description="Nội dung popup khi click, hỗ trợ nội dung tùy ý." />

        <ShowcaseCard title="Basic Popover">
            <Popover trigger={<Button variant="outline"><Settings className="w-4 h-4 mr-2" />Cài đặt</Button>}>
                <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Cài đặt hiển thị</h4>
                    <Switch size="sm" label="Chế độ tối" />
                    <Switch size="sm" label="Thông báo đẩy" defaultChecked />
                    <Switch size="sm" label="Âm thanh" />
                </div>
            </Popover>

            <Popover trigger={<Button variant="secondary"><Bell className="w-4 h-4 mr-2" />Thông báo <Badge size="sm" variant="danger" className="ml-1">3</Badge></Button>}>
                <div className="w-64 space-y-2">
                    <h4 className="font-semibold text-sm mb-3">Thông báo mới</h4>
                    {['Giao dịch #1299 thành công', 'Đăng nhập thiết bị mới', 'Báo cáo tháng 3 sẵn sàng'].map((n, i) => (
                        <div key={i} className="flex items-start gap-2 p-2 hover:bg-muted rounded-md cursor-pointer">
                            <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-success" />
                            <p className="text-xs">{n}</p>
                        </div>
                    ))}
                </div>
            </Popover>
        </ShowcaseCard>
    </div>
);

export default PopoverPage;
