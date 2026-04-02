import React from 'react'
import { PageHeader, ShowcaseCard } from '@/components/ui/Showcase'
import { Dialog } from '@components/ui/dialog/Dialog'
import { Button } from '@components/ui/button/Button'
import { Input } from '@components/ui/input/Input'
import { Select } from '@components/ui/select/Select'
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
                <ShowcaseCard title="Default Modal">
                    <Dialog trigger={<Button variant="outline">Mở Default</Button>} headerTitle="Thông báo hệ thống" headerDescription="Dữ liệu đã được lưu tự động.">
                        <div className="py-4"><p className="text-sm text-muted-foreground">Phiên làm việc sắp hết hạn sau 15 phút.</p></div>
                    </Dialog>
                </ShowcaseCard>

                <ShowcaseCard title="Custom Footer">
                    <Dialog
                        trigger={<Button variant="secondary">Custom Footer</Button>}
                        headerTitle="Xác nhận thanh toán"
                        footerContent={
                            <div className="flex items-center justify-between w-full">
                                <div className="text-sm text-muted-foreground">Phí: <b>12.000đ</b></div>
                                <div className="flex gap-2"><Button variant="ghost" size="sm">Hủy</Button><Button size="sm">Thanh toán</Button></div>
                            </div>
                        }
                    >
                        <p className="text-sm py-4">Vui lòng kiểm tra số tiền trước khi tiếp tục.</p>
                    </Dialog>
                </ShowcaseCard>

                <ShowcaseCard title="Loading Submit">
                    <Dialog
                        trigger={<Button>Loading Demo</Button>}
                        headerTitle="Cập nhật thông tin"
                        footerContent={
                            <div className="flex justify-end gap-2">
                                <Button variant="outline" disabled={loading}>Hủy</Button>
                                <Button onClick={handleSave} disabled={loading}>
                                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
                                </Button>
                            </div>
                        }
                    >
                        <div className="space-y-4 py-4">
                            <Input label="Email" defaultValue="admin@example.vn" disabled={loading} />
                            <Input label="SĐT" defaultValue="0987654321" disabled={loading} />
                        </div>
                    </Dialog>
                </ShowcaseCard>

                <ShowcaseCard title="Full Screen">
                    <Dialog size="fullScreen" trigger={<Button variant="outline"><Layers className="mr-2 h-4 w-4" />Toàn màn hình</Button>} headerTitle="Trình soạn thảo" headerDescription="Chế độ tập trung.">
                        <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                            <p>Nội dung full screen ở đây...</p>
                        </div>
                    </Dialog>
                </ShowcaseCard>
            </div>
        </div>
    );
};

export default DialogModal;
