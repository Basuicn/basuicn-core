import React from 'react'
import { PageHeader, ShowcaseCard } from '@/components/ui/Showcase'
import { Alert, AlertTitle, AlertDescription } from '@components/ui/alert/Alert'
import { Button } from '@components/ui/button/Button'
import { Info, CheckCircle2, AlertCircle, XCircle } from 'lucide-react'
import { toast } from 'sonner'

const AlertPage = () => (
    <div className="max-w-4xl">
        <PageHeader title="Alert & Toast" description="Thông báo tĩnh (Alert) và thông báo thoáng (Toast)." />

        <ShowcaseCard title="Alert Variants (info / success / warning / destructive / default)">
            <div className="w-full space-y-4">
                <Alert variant="info"><Info className="h-4 w-4" /><AlertTitle>Thông tin</AlertTitle><AlertDescription>Hệ thống bảo trì lúc 2h AM ngày mai.</AlertDescription></Alert>
                <Alert variant="success"><CheckCircle2 className="h-4 w-4" /><AlertTitle>Thành công</AlertTitle><AlertDescription>Hồ sơ đã được duyệt. Chào mừng!</AlertDescription></Alert>
                <Alert variant="warning"><AlertCircle className="h-4 w-4" /><AlertTitle>Cảnh báo</AlertTitle><AlertDescription>Tài khoản sắp hết hạn dùng thử.</AlertDescription></Alert>
                <Alert variant="destructive"><XCircle className="h-4 w-4" /><AlertTitle>Lỗi</AlertTitle><AlertDescription>Không thể kết nối đến máy chủ.</AlertDescription></Alert>
                <Alert><Info className="h-4 w-4" /><AlertTitle>Mặc định</AlertTitle><AlertDescription>Kiểu Alert neutral mặc định.</AlertDescription></Alert>
            </div>
        </ShowcaseCard>

        <ShowcaseCard title="Toast Notifications — Click để kích hoạt">
            <Button onClick={() => toast.success('Thành công!', { description: 'Số tiền 500.000đ đã được chuyển.' })}>Success Toast</Button>
            <Button variant="danger" onClick={() => toast.error('Lỗi!', { description: 'Không thể kết nối ngân hàng.' })}>Error Toast</Button>
            <Button variant="outline" onClick={() => toast.info('Thông báo', { description: 'Phiên làm việc còn 5 phút.' })}>Info Toast</Button>
            <Button variant="secondary" onClick={() => toast.warning('Cảnh báo', { description: 'Số dư ví sắp cạn.' })}>Warning Toast</Button>
        </ShowcaseCard>
    </div>
);

export default AlertPage;
