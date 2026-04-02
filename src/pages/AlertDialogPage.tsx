import React from 'react'
import { PageHeader, ShowcaseCard } from '@/components/ui/Showcase'
import { Button } from '@components/ui/button/Button'
import { Trash2 } from 'lucide-react'
import { AlertDialog } from '@/components/ui/alert-dialog/AlertDialog';

const AlertDialogPage = () => (
    <div className="max-w-3xl">
        <PageHeader title="Alert Dialog" description="Hộp thoại xác nhận bắt buộc, không thể đóng bằng click ngoài." />

        <ShowcaseCard title="Xác nhận Xóa">
            <AlertDialog
                trigger={<Button variant="danger"><Trash2 className="w-4 h-4 mr-2" />Xóa tài khoản</Button>}
                headerTitle="Xóa tài khoản?"
                headerDescription="Hành động này không thể hoàn tác. Toàn bộ dữ liệu sẽ bị xóa vĩnh viễn."
                cancelContent={<Button variant="outline">Hủy bỏ</Button>}
                actionContent={<Button variant="danger"><Trash2 className="w-4 h-4 mr-2" />Xóa vĩnh viễn</Button>}
            />
        </ShowcaseCard>

        <ShowcaseCard title="Xác nhận Gửi">
            <AlertDialog
                trigger={<Button>Gửi yêu cầu duyệt</Button>}
                headerTitle="Xác nhận gửi?"
                headerDescription="Sau khi gửi, bạn không thể chỉnh sửa. Quản trị viên xem xét trong 1-3 ngày."
                cancelContent={<Button variant="ghost">Quay lại</Button>}
                actionContent={<Button>Xác nhận gửi</Button>}
            />
        </ShowcaseCard>
    </div>
);

export default AlertDialogPage;
