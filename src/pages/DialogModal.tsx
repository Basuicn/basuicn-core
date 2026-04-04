import React from 'react'
import { PageHeader, ShowcaseCard } from '@/components/ui/Showcase'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@components/ui/dialog/Dialog'
import { Button } from '@components/ui/button/Button'
import { Input } from '@components/ui/input/Input'
import { Loader2, Layers } from 'lucide-react'
import { toast } from 'sonner'

const DialogModal = () => {
    const [loading, setLoading] = React.useState(false);
    const handleSave = () => {
        setLoading(true);
        setTimeout(() => { setLoading(false); toast.success('Đã lưu!'); }, 2000);
    };
    return (
        <div className="max-w-4xl">
            <PageHeader title="Dialog (Modal)" description="Hộp thoại bắt buộc người dùng tập trung xử lý." />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ShowcaseCard title="Default Modal" code={`<Dialog>
    <DialogTrigger render={<Button variant="outline">Mở Default</Button>} />
    <DialogContent>
        <DialogHeader>
            <DialogTitle>Thông báo hệ thống</DialogTitle>
            <DialogDescription>Dữ liệu đã được lưu tự động.</DialogDescription>
        </DialogHeader>
        <div className="py-4">
            <p className="text-sm text-muted-foreground">Phiên làm việc sắp hết hạn sau 15 phút.</p>
        </div>
    </DialogContent>
</Dialog>`}>
                    <Dialog>
                        <DialogTrigger render={<Button variant="outline">Mở Default</Button>} />
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Thông báo hệ thống</DialogTitle>
                                <DialogDescription>Dữ liệu đã được lưu tự động.</DialogDescription>
                            </DialogHeader>
                            <div className="py-4">
                                <p className="text-sm text-muted-foreground">Phiên làm việc sắp hết hạn sau 15 phút.</p>
                            </div>
                        </DialogContent>
                    </Dialog>
                </ShowcaseCard>

                <ShowcaseCard title="Custom Footer" code={`<Dialog>
    <DialogTrigger render={<Button variant="secondary">Custom Footer</Button>} />
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Xác nhận thanh toán</DialogTitle>
            </DialogHeader>
            <p className="text-sm py-4">Vui lòng kiểm tra số tiền trước khi tiếp tục.</p>
            <DialogFooter>
                <div className="flex items-center justify-between w-full">
                    <div className="text-sm text-muted-foreground">Phí: <b>12.000đ</b></div>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="sm">Hủy</Button>
                        <Button size="sm">Thanh toán</Button>
                    </div>
                </div>
            </DialogFooter>
        </DialogContent>
    </Dialog>`}>
                    <Dialog>
                        <DialogTrigger render={<Button variant="secondary">Custom Footer</Button>} />
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Xác nhận thanh toán</DialogTitle>
                            </DialogHeader>
                            <p className="text-sm py-4">Vui lòng kiểm tra số tiền trước khi tiếp tục.</p>
                            <DialogFooter>
                                <div className="flex items-center justify-between w-full">
                                    <div className="text-sm text-muted-foreground">Phí: <b>12.000đ</b></div>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="sm">Hủy</Button>
                                        <Button size="sm">Thanh toán</Button>
                                    </div>
                                </div>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </ShowcaseCard>

                <ShowcaseCard title="Loading Submit">
                    <Dialog>
                        <DialogTrigger render={<Button>Loading Demo</Button>} />
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Cập nhật thông tin</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <Input label="Email" defaultValue="admin@example.vn" disabled={loading} />
                                <Input label="SĐT" defaultValue="0987654321" disabled={loading} />
                            </div>
                            <DialogFooter>
                                <div className="flex justify-end gap-2">
                                    <Button variant="outline" disabled={loading}>Hủy</Button>
                                    <Button onClick={handleSave} disabled={loading}>
                                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
                                    </Button>
                                </div>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </ShowcaseCard>

                <ShowcaseCard title="Full Screen">
                    <Dialog>
                        <DialogTrigger render={<Button variant="outline"><Layers className="mr-2 h-4 w-4" />Toàn màn hình</Button>} />
                        <DialogContent size="fullScreen">
                            <DialogHeader>
                                <DialogTitle>Trình soạn thảo</DialogTitle>
                                <DialogDescription>Chế độ tập trung.</DialogDescription>
                            </DialogHeader>
                            <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                                <p>Nội dung full screen ở đây...</p>
                            </div>
                        </DialogContent>
                    </Dialog>
                </ShowcaseCard>
            </div>
        </div>
    );
};

export default DialogModal;
