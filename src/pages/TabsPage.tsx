import React from 'react'
import { PageHeader, ShowcaseCard } from '@/components/ui/Showcase'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@components/ui/tabs/Tabs'
import { Badge } from '@components/ui/badge/Badge'
import { Progress } from '@components/ui/progress/Progress'

const TabsPage = () => (
    <div className="max-w-3xl">
        <PageHeader title="Tabs" description="Chia nội dung theo nhóm, chuyển tab mượt mà." />

        <ShowcaseCard title="Basic Tabs">
            <Tabs defaultValue="account">
                <TabsList>
                    <TabsTrigger value="account">Tài khoản</TabsTrigger>
                    <TabsTrigger value="security">Bảo mật</TabsTrigger>
                    <TabsTrigger value="notif">Thông báo</TabsTrigger>
                    <TabsTrigger value="billing">Thanh toán</TabsTrigger>
                </TabsList>
                
                <TabsContent value="account">
                    <div className="p-4 bg-muted/50 rounded-md text-sm text-muted-foreground">Cài đặt hồ sơ cá nhân, ảnh đại diện và tên hiển thị.</div>
                </TabsContent>
                <TabsContent value="security">
                    <div className="p-4 bg-muted/50 rounded-md text-sm text-muted-foreground">Đổi mật khẩu, bật xác thực 2 bước (2FA).</div>
                </TabsContent>
                <TabsContent value="notif">
                    <div className="p-4 bg-muted/50 rounded-md text-sm text-muted-foreground">Tùy chỉnh cách nhận thông báo qua Email, SMS, Push.</div>
                </TabsContent>
                <TabsContent value="billing">
                    <div className="p-4 bg-muted/50 rounded-md text-sm text-muted-foreground">Quản lý phương thức thanh toán và hóa đơn.</div>
                </TabsContent>
            </Tabs>
        </ShowcaseCard>

        <ShowcaseCard title="With Rich Content">
            <Tabs defaultValue="list">
                <TabsList>
                    <TabsTrigger value="list">Danh sách GD</TabsTrigger>
                    <TabsTrigger value="report">Báo cáo</TabsTrigger>
                </TabsList>

                <TabsContent value="list">
                    <div className="space-y-2 pt-2">
                        {['Giao dịch #1001 — 500.000đ', 'Giao dịch #1002 — 1.200.000đ', 'Giao dịch #1003 — 45.000đ'].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                                <span className="text-sm">{item}</span>
                                <Badge variant={i === 0 ? 'success' : i === 1 ? 'warning' : 'soft-primary'} size="sm">
                                    {i === 0 ? 'Thành công' : i === 1 ? 'Đang xử lý' : 'Chờ duyệt'}
                                </Badge>
                            </div>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="report">
                    <div className="space-y-4 pt-2">
                        <Progress value={85} variant="success" labelPosition="outside" label="Thành công" />
                        <Progress value={10} variant="warning" labelPosition="outside" label="Đang xử lý" />
                        <Progress value={5} variant="danger" labelPosition="outside" label="Thất bại" />
                    </div>
                </TabsContent>
            </Tabs>
        </ShowcaseCard>
    </div>
);

export default TabsPage;
