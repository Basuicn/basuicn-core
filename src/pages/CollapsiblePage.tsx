import React from 'react'
import { PageHeader, ShowcaseCard } from '@/components/ui/Showcase'
import { Collapsible } from '@components/ui/collapsible/Collapsible'

const CollapsiblePage = () => (
    <div className="max-w-3xl">
        <PageHeader title="Collapsible" description="Ẩn/hiện nội dung tùy chọn, đơn giản hơn Accordion." />

        <ShowcaseCard title="Các ví dụ Collapsible">
            <div className="w-full space-y-3">
                <Collapsible trigger="Xem chi tiết giao dịch">
                    <div className="p-4 border border-border rounded-md text-sm text-muted-foreground space-y-1">
                        <p>Mã GD: #TX-20240401-001</p>
                        <p>Số tiền: 500.000đ | Thời gian: 10:30 01/04/2024</p>
                    </div>
                </Collapsible>
                <Collapsible trigger="Điều khoản dịch vụ" defaultOpen>
                    <div className="p-4 border border-border rounded-md text-sm text-muted-foreground space-y-1">
                        <p>1. Bằng cách sử dụng dịch vụ, bạn đồng ý với các điều khoản này.</p>
                        <p>2. Chúng tôi có quyền thay đổi điều khoản bất cứ lúc nào.</p>
                    </div>
                </Collapsible>
                <Collapsible trigger="Câu hỏi thường gặp">
                    <div className="p-4 border border-border rounded-md text-sm text-muted-foreground">
                        <p><b>Q:</b> Làm thế nào nạp tiền?<br /><b>A:</b> Vào Ví → Nạp tiền → Chọn hình thức.</p>
                    </div>
                </Collapsible>
            </div>
        </ShowcaseCard>
    </div>
);

export default CollapsiblePage;
