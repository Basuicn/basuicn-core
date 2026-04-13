import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@components/ui/card/Card'
import { Badge } from '@components/ui/badge/Badge'
import { Table } from '@components/ui/table/Table'
import { type ColumnDef } from '@tanstack/react-table'

const TransactionPage = () => {
    const data = React.useMemo(() => [
        { id: '1', date: '2024-03-31 10:30', user: 'huy_tran_01', type: 'Sản lượng ví', amount: '500.000đ', status: 'Thành công' },
        { id: '2', date: '2024-03-31 09:15', user: 'admin_test', type: 'Chuyển tiền', amount: '1.200.000đ', status: 'Đang xử lý' },
        { id: '3', date: '2024-03-30 22:45', user: 'user_vips', type: 'Thanh toán', amount: '45.000đ', status: 'Thành công' },
    ], []);
    const columns: ColumnDef<any>[] = [
        { accessorKey: 'date', header: 'Thời gian' },
        { accessorKey: 'user', header: 'Người dùng' },
        { accessorKey: 'type', header: 'Loại GD' },
        { accessorKey: 'amount', header: 'Số tiền' },
        { accessorKey: 'status', header: 'Trạng thái', cell: ({ getValue }: any) => <Badge size='sm' variant={getValue() === 'Thành công' ? 'soft-success' : 'soft-warning'}>{getValue()}</Badge> },
    ];
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card><CardContent className="p-6"><p className="text-xs font-semibold text-muted-foreground uppercase">Tổng doanh thu</p><p className="text-3xl font-bold mt-2 text-primary">124.500.000đ</p><Badge variant="success" className="mt-2">+12% tháng trước</Badge></CardContent></Card>
                <Card><CardContent className="p-6"><p className="text-xs font-semibold text-muted-foreground uppercase">Giao dịch mới</p><p className="text-3xl font-bold mt-2 text-blue-500">1,240</p><Badge variant="secondary" className="mt-2">40 GD/ngày</Badge></CardContent></Card>
                <Card><CardContent className="p-6"><p className="text-xs font-semibold text-muted-foreground uppercase">Tỉ lệ thành công</p><p className="text-3xl font-bold mt-2 text-success">99.8%</p><Badge variant="success" className="mt-2" pulse>Rất ổn định</Badge></CardContent></Card>
            </div>
            <Card>
                <CardHeader><CardTitle>Danh sách giao dịch</CardTitle><CardDescription>Cập nhật mỗi 30 giây.</CardDescription></CardHeader>
                <CardContent className="p-0 border-t border-border/50">
                    <Table data={data} columns={columns} enableRowSelection />
                </CardContent>
            </Card>
        </div>
    );
};

export default TransactionPage;
