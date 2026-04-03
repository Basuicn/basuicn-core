import React from 'react'
import { PageHeader, ShowcaseCard } from '@/components/ui/Showcase'
import { Button } from '@components/ui/button/Button'
import { Trash2 } from 'lucide-react'
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogClose,
} from '@/components/ui/alert-dialog/AlertDialog';

const AlertDialogPage = () => (
    <div className="max-w-3xl">
        <PageHeader title="Alert Dialog" description="Hộp thoại xác nhận bắt buộc, không thể đóng bằng click ngoài." />

        <ShowcaseCard title="Xác nhận Xóa">
            <AlertDialog>
                <AlertDialogTrigger render={<Button variant="danger"><Trash2 className="w-4 h-4 mr-2" />Xóa tài khoản</Button>} />
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Xóa tài khoản?</AlertDialogTitle>
                        <AlertDialogDescription>Hành động này không thể hoàn tác. Toàn bộ dữ liệu sẽ bị xóa vĩnh viễn.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogClose render={<Button variant="outline">Hủy bỏ</Button>} />
                        <Button variant="danger"><Trash2 className="w-4 h-4 mr-2" />Xóa vĩnh viễn</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </ShowcaseCard>

        <ShowcaseCard title="Xác nhận Gửi">
            <AlertDialog>
                <AlertDialogTrigger render={<Button>Gửi yêu cầu duyệt</Button>} />
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Xác nhận gửi?</AlertDialogTitle>
                        <AlertDialogDescription>Sau khi gửi, bạn không thể chỉnh sửa. Quản trị viên xem xét trong 1-3 ngày.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogClose render={<Button variant="ghost">Quay lại</Button>} />
                        <Button>Xác nhận gửi</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </ShowcaseCard>
    </div>
);

export default AlertDialogPage;
