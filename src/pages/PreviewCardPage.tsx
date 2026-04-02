import React from 'react'
import { PageHeader, ShowcaseCard } from '@/components/ui/Showcase'
import { PreviewCard } from '@components/ui/preview-card/PreviewCard'
import { Button } from '@components/ui/button/Button'
import { Badge } from '@components/ui/badge/Badge'
import { Avatar } from '@components/ui/avatar/Avatar'

const PreviewCardPage = () => (
    <div className="max-w-4xl">
        <PageHeader title="Preview Card" description="Card preview nội dung phong phú khi click hoặc hover." />

        <ShowcaseCard title="Click to Open — 4 Hướng">
            <PreviewCard
                side="top" align="start" sideOffset={8}
                trigger={<Button variant="outline" size="sm">Top-Start</Button>}
                title="Người dùng — Nguyen Van A"
                description="Tài khoản Vàng | Member từ 2021. Email: nva@example.com"
                coverImage="https://i.pravatar.cc/300?u=top"
                coverHeight={100}
                footerContent={<div className="flex gap-2"><Button size="sm">Xem hồ sơ</Button><Button size="sm" variant="outline">Nhắn tin</Button></div>}
            />
            <PreviewCard
                side="bottom" align="center" sideOffset={8}
                trigger={<Button variant="outline" size="sm">Bottom-Center</Button>}
                title="Thẻ tín dụng — **** 4242"
                description="Visa | Hạn sử dụng: 08/2027 | Hạn mức: 50.000.000đ"
                footerContent={<Badge variant="success">Đang hoạt động</Badge>}
            />
            <PreviewCard
                side="right" align="start" sideOffset={8}
                trigger={<Button variant="outline" size="sm">Right-Start</Button>}
                title="Giao dịch #TX-20240401"
                description="Số tiền: 500.000đ | Trạng thái: Thành công | Thời gian: 10:30 01/04/2024"
                footerContent={<div className="flex gap-2"><Badge variant="success">Thành công</Badge><span className="text-xs text-muted-foreground">2 phút trước</span></div>}
            />
            <PreviewCard
                side="left" align="end" sideOffset={8}
                trigger={<Button variant="outline" size="sm">Left-End</Button>}
                title="Sản phẩm — Premium Plan"
                description="Bao gồm tất cả tính năng Pro + Priority Support 24/7."
                coverImage="https://picsum.photos/seed/plan/288/100"
                coverHeight={90}
                footerContent={<div className="flex items-center justify-between w-full"><span className="text-sm font-bold text-primary">500.000đ/tháng</span><Button size="sm">Đăng ký</Button></div>}
            />
        </ShowcaseCard>

        <ShowcaseCard title="Hover to Open" description="openOnHover=true — preview xuất hiện khi di chuột qua.">
            {[
                { u: 'a1', name: 'Huy Tran', role: 'Admin' },
                { u: 'b2', name: 'Jane Doe', role: 'Editor' },
                { u: 'c3', name: 'Bob Lee', role: 'User' },
            ].map((user) => (
                <PreviewCard
                    key={user.u}
                    openOnHover
                    trigger={
                        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                            <Avatar size="sm" src={`https://i.pravatar.cc/150?u=${user.u}`} alt={user.name} />
                            <span className="text-sm font-medium">{user.name}</span>
                        </div>
                    }
                    title={user.name}
                    description={`Vai trò: ${user.role} | Đã tham gia từ 2022`}
                    coverImage={`https://i.pravatar.cc/288/100?u=${user.u}`}
                    coverHeight={80}
                    footerContent={<Badge variant={user.role === 'Admin' ? 'danger' : user.role === 'Editor' ? 'warning' : 'secondary'} size="sm">{user.role}</Badge>}
                />
            ))}
        </ShowcaseCard>
    </div>
);

export default PreviewCardPage;
