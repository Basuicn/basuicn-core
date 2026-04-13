import React, { useEffect } from 'react';
import { PageHeader, ShowcaseCard } from '@/components/ui/Showcase';
import { Table } from '@components/ui/table/Table';
import { Badge } from '@components/ui/badge/Badge';
import { Button } from '@components/ui/button/Button';
import { type ColumnDef, type CellContext } from '@tanstack/react-table';
import { Mail, Phone, MapPin, Building2, RefreshCw } from 'lucide-react';

// ─── Kiểu dữ liệu ────────────────────────────────────────────────────────────

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    status: 'Active' | 'Inactive' | 'Pending';
    amount: string;
    department: string;
    phone: string;
    location: string;
    joinDate: string;
}

interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    rating: number;
}

// ─── Dữ liệu mẫu ─────────────────────────────────────────────────────────────

const USERS: User[] = [
    { id: '1', name: 'Huy Tran', email: 'huy@example.com', role: 'Owner', status: 'Active', amount: '1.500.000đ', department: 'Engineering', phone: '0901 234 567', location: 'TP.HCM', joinDate: '01/01/2022' },
    { id: '2', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', amount: '850.000đ', department: 'Marketing', phone: '0912 345 678', location: 'Hà Nội', joinDate: '15/03/2022' },
    { id: '3', name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Inactive', amount: '320.000đ', department: 'Design', phone: '0923 456 789', location: 'Đà Nẵng', joinDate: '20/06/2022' },
    { id: '4', name: 'Bob Wilson', email: 'bob@example.com', role: 'User', status: 'Active', amount: '95.000đ', department: 'Support', phone: '0934 567 890', location: 'Cần Thơ', joinDate: '01/09/2022' },
    { id: '5', name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Pending', amount: '200.000đ', department: 'Sales', phone: '0945 678 901', location: 'Huế', joinDate: '10/12/2022' },
    { id: '6', name: 'Charlie Lee', email: 'charlie@ex.com', role: 'Editor', status: 'Active', amount: '450.000đ', department: 'Engineering', phone: '0956 789 012', location: 'TP.HCM', joinDate: '05/02/2023' },
    { id: '7', name: 'Diana Prince', email: 'diana@ex.com', role: 'Admin', status: 'Active', amount: '720.000đ', department: 'Marketing', phone: '0967 890 123', location: 'Hà Nội', joinDate: '18/04/2023' },
];

const PRODUCTS: Product[] = [
    { id: 'P001', name: 'iPhone 15 Pro', category: 'Smartphone', price: 29990000, stock: 45, rating: 4.8 },
    { id: 'P002', name: 'MacBook Air M3', category: 'Laptop', price: 32990000, stock: 12, rating: 4.9 },
    { id: 'P003', name: 'iPad Pro 12.9"', category: 'Tablet', price: 22990000, stock: 28, rating: 4.7 },
    { id: 'P004', name: 'AirPods Pro 2', category: 'Audio', price: 6490000, stock: 0, rating: 4.6 },
    { id: 'P005', name: 'Apple Watch S9', category: 'Wearable', price: 11990000, stock: 33, rating: 4.5 },
    { id: 'P006', name: 'Samsung Galaxy S24', category: 'Smartphone', price: 25990000, stock: 19, rating: 4.6 },
    { id: 'P007', name: 'Sony WH-1000XM5', category: 'Audio', price: 8490000, stock: 7, rating: 4.8 },
];

// ─── Mock server fetch ────────────────────────────────────────────────────────

const ALL_SERVER_DATA: User[] = Array.from({ length: 53 }, (_, i) => ({
    id: String(i + 1),
    name: `User ${i + 1}`,
    email: `user${i + 1}@company.com`,
    role: ['Admin', 'Editor', 'User', 'Owner'][i % 4],
    status: (['Active', 'Active', 'Inactive', 'Pending'] as const)[i % 4],
    amount: `${((i + 1) * 137_000).toLocaleString('vi-VN')}đ`,
    department: ['Engineering', 'Marketing', 'Design', 'Sales', 'Support'][i % 5],
    phone: `09${String(i).padStart(2, '0')} 000 000`,
    location: ['TP.HCM', 'Hà Nội', 'Đà Nẵng', 'Cần Thơ'][i % 4],
    joinDate: `${String((i % 28) + 1).padStart(2, '0')}/0${(i % 9) + 1}/202${(i % 3) + 2}`,
}));

async function fetchUsers(page: number, pageSize: number) {
    await new Promise(r => setTimeout(r, 600));
    const start = (page - 1) * pageSize;
    return {
        rows: ALL_SERVER_DATA.slice(start, start + pageSize),
        total: ALL_SERVER_DATA.length,
    };
}

// ─── Cell renderers ───────────────────────────────────────────────────────────

type BadgeVariant = 'success' | 'danger' | 'warning';

const statusCell = ({ getValue }: CellContext<User, unknown>) => {
    const s = getValue() as User['status'];
    const variant: BadgeVariant = s === 'Active' ? 'success' : s === 'Inactive' ? 'danger' : 'warning';
    return <Badge variant={variant} size="sm" pulse={s === 'Active'}>{s}</Badge>;
};

// ─── Column định nghĩa ────────────────────────────────────────────────────────

const BASE_COLUMNS: ColumnDef<User>[] = [
    { accessorKey: 'name', header: 'Họ tên', size: 150 },
    { accessorKey: 'email', header: 'Email', size: 200 },
    { accessorKey: 'role', header: 'Vai trò', size: 100 },
    { accessorKey: 'department', header: 'Phòng ban', size: 130 },
    { accessorKey: 'amount', header: 'Giao dịch', size: 120, meta: { align: 'right' } },
    { accessorKey: 'status', header: 'Trạng thái', size: 110, cell: statusCell, meta: { align: 'center' } },
];

const PRODUCT_COLUMNS: ColumnDef<Product>[] = [
    { accessorKey: 'id', header: 'Mã SP', size: 80 },
    { accessorKey: 'name', header: 'Tên sản phẩm', size: 200 },
    { accessorKey: 'category', header: 'Danh mục', size: 120 },
    {
        accessorKey: 'price',
        header: 'Giá',
        size: 130,
        meta: { align: 'right' },
        cell: ({ getValue }) => (
            <span className="font-semibold text-primary">
                {(getValue() as number).toLocaleString('vi-VN')}đ
            </span>
        ),
    },
    {
        accessorKey: 'stock',
        header: 'Tồn kho',
        size: 100,
        meta: { align: 'center' },
        cell: ({ getValue }) => {
            const v = getValue() as number;
            return v === 0
                ? <Badge variant="danger" size="sm">Hết hàng</Badge>
                : v < 10
                    ? <Badge variant="warning" size="sm">{v} còn lại</Badge>
                    : <Badge variant="success" size="sm">{v}</Badge>;
        },
    },
    {
        accessorKey: 'rating',
        header: 'Đánh giá',
        size: 100,
        meta: { align: 'center' },
        cell: ({ getValue }) => (
            <span className="flex items-center justify-center gap-1 text-amber-500 font-medium">
                ★ {(getValue() as number).toFixed(1)}
            </span>
        ),
    },
];

// ─── Server pagination example ────────────────────────────────────────────────

function ServerPaginationTable() {
    const [data, setData] = React.useState<User[]>([]);
    const [total, setTotal] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(5);

    const load = React.useCallback(async (p: number, s: number) => {
        setIsLoading(true);
        try {
            const res = await fetchUsers(p, s);
            setData(res.rows);
            setTotal(res.total);
        } finally {
            setIsLoading(false);
        }
    }, []); // deps rỗng: hàm nhận p,s qua tham số, không đóng biến ngoài

    // Tự động load lại khi page hoặc pageSize thay đổi
    useEffect(() => { load(page, pageSize); }, [page, pageSize]);

    const serverColumns: ColumnDef<User>[] = [
        { accessorKey: 'id', header: '#', size: 10, meta: { align: 'center' } },
        { accessorKey: 'name', header: 'Tên', size: 140 },
        { accessorKey: 'email', header: 'Email', size: 200 },
        { accessorKey: 'role', header: 'Vai trò', size: 100 },
        { accessorKey: 'department', header: 'Phòng ban', size: 130 },
        { accessorKey: 'status', header: 'Trạng thái', size: 110, cell: statusCell, meta: { align: 'center' } },
    ];

    return (
        <div className="space-y-3 w-full">
            <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                    Tổng: <span className="font-semibold text-foreground">{total}</span> người dùng
                </p>
                <Button size="sm" variant="outline" onClick={() => load(page, pageSize)} disabled={isLoading} className="gap-2">
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                    Refresh
                </Button>
            </div>
            <Table
                data={data}
                columns={serverColumns}
                isLoading={isLoading}
                enableSorting={false}
                pagination={{
                    current: page,
                    pageSize,
                    total,                          // có total → tự bật server mode
                    onChange: (p, s) => {
                        setPage(p);
                        setPageSize(s);
                        // useEffect sẽ tự gọi load(p, s) khi state cập nhật
                    },
                    showTotal: (t, range) => `Hiển thị ${range[0]}–${range[1]} / ${t} bản ghi`,
                }}
            />
        </div>
    );
}

// ─── Expandable rows example ──────────────────────────────────────────────────

function ExpandableTable() {
    return (
        <Table
            data={USERS}
            columns={BASE_COLUMNS}
            enableExpanding
            pagination={{ pageSize: 5 }}
            renderSubComponent={({ row }) => (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="w-3.5 h-3.5 shrink-0" /><span>{row.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="w-3.5 h-3.5 shrink-0" /><span>{row.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5 shrink-0" /><span>{row.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Building2 className="w-3.5 h-3.5 shrink-0" /><span>{row.department}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <span className="text-xs font-semibold uppercase tracking-wide">Tham gia:</span>
                        <span>{row.joinDate}</span>
                    </div>
                </div>
            )}
        />
    );
}

// ─── Row selection example ────────────────────────────────────────────────────

function RowSelectionTable() {
    const [selected, setSelected] = React.useState<User[]>([]);
    return (
        <div className="space-y-3 w-full">
            {selected.length > 0 && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-primary/5 border border-primary/20 text-sm">
                    <Badge variant="soft-primary" size="sm">{selected.length} đã chọn</Badge>
                    <span className="text-muted-foreground truncate">{selected.map(u => u.name).join(', ')}</span>
                </div>
            )}
            <Table
                data={USERS}
                columns={BASE_COLUMNS}
                enableRowSelection
                onSelectionChange={setSelected}
                pagination={{ pageSize: 5 }}
            />
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const TablePage = () => (
    <div className="max-w-6xl space-y-2">
        <PageHeader
            title="Data Table"
            description="Bảng dữ liệu với sort, pagination, row selection, expandable rows và server-side pagination."
        />

        {/* 1. Basic */}
        <ShowcaseCard title="Basic Table" description="Sort + pagination client-side mặc định."
            code={`<Table data={data} columns={columns} />`}
        >
            <div className="w-full">
                <Table
                    data={USERS}
                    columns={BASE_COLUMNS}
                    pagination={{ pageSize: 5 }}
                />
            </div>
        </ShowcaseCard>

        {/* 2. Row Selection */}
        <ShowcaseCard title="Row Selection"
            description="Checkbox chọn hàng. Callback onSelectionChange trả về danh sách đã chọn."
            code={`<Table
  data={data}
  columns={columns}
  enableRowSelection
  onSelectionChange={(rows) => console.log(rows)}
  pagination={{ pageSize: 5 }}
/>`}
        >
            <RowSelectionTable />
        </ShowcaseCard>

        {/* 3. Expandable */}
        <ShowcaseCard title="Expandable Rows"
            description="Click mũi tên để mở rộng hàng, hiển thị thông tin chi tiết."
            code={`<Table
  data={data}
  columns={columns}
  enableExpanding
  renderSubComponent={({ row }) => <div>{row.email}</div>}
  pagination={{ pageSize: 5 }}
/>`}
        >
            <ExpandableTable />
        </ShowcaseCard>

        {/* 4. Column Resizing */}
        <ShowcaseCard title="Column Resizing"
            description="Kéo đường viền giữa các cột header để thay đổi kích thước."
            code={`<Table
  data={data}
  columns={columns}
  enableColumnResizing
  pagination={{ pageSize: 5 }}
/>`}
        >
            <div className="w-full">
                <Table
                    data={PRODUCTS}
                    columns={PRODUCT_COLUMNS}
                    enableColumnResizing
                    columnResizeMode="onChange"
                    pagination={{ pageSize: 5 }}
                />
            </div>
        </ShowcaseCard>

        {/* 5. Loading */}
        <ShowcaseCard title="Loading State"
            description="isLoading=true hiển thị overlay spinner."
            code={`<Table data={data} columns={columns} isLoading />`}
        >
            <div className="w-full">
                <Table data={USERS} columns={BASE_COLUMNS} isLoading pagination={{ pageSize: 5 }} />
            </div>
        </ShowcaseCard>

        {/* 6. Empty */}
        <ShowcaseCard title="Empty State"
            description="data=[] tự động hiển thị trạng thái trống."
            code={`<Table data={[]} columns={columns} pagination={false} />`}
        >
            <div className="w-full">
                <Table data={[]} columns={BASE_COLUMNS} pagination={false} />
            </div>
        </ShowcaseCard>

        {/* 7. Server-side */}
        <ShowcaseCard title="Server-side Pagination"
            description="Truyền total từ BE → tự động bật server mode. onChange nhận (page, pageSize) 1-based để gọi API."
            code={`// State quản lý bên ngoài
const [page, setPage] = useState(1);
const [pageSize, setPageSize] = useState(10);
const [data, setData] = useState([]);
const [total, setTotal] = useState(0);

// Fetch khi page/pageSize thay đổi
async function load(p, s) {
  const res = await api.get('/users', { params: { page: p, size: s } });
  setData(res.rows);
  setTotal(res.total);
}

<Table
  data={data}
  columns={columns}
  isLoading={isLoading}
  pagination={{
    current: page,          // trang hiện tại (controlled)
    pageSize,               // size hiện tại
    total,                  // tổng bản ghi từ BE → bật server mode
    onChange: (p, s) => {   // 1-based page, gọi API
      setPage(p);
      setPageSize(s);
      load(p, s);
    },
    showTotal: (total, range) =>
      \`Hiển thị \${range[0]}–\${range[1]} / \${total} bản ghi\`,
  }}
/>`}
        >
            <ServerPaginationTable />
        </ShowcaseCard>

        {/* 8. Custom pagination */}
        <ShowcaseCard title="Tùy biến Pagination"
            description="showTotal, pageSizeOptions, showSizeChanger=false để ẩn size selector."
            code={`<Table
  data={data}
  columns={columns}
  pagination={{
    pageSize: 3,
    pageSizeOptions: [3, 6, 9],
    showTotal: (total, range) => <><b>{range[0]}–{range[1]}</b> / <b>{total}</b></>,
    showSizeChanger: false,   // ẩn page size selector
  }}
/>`}
        >
            <div className="w-full">
                <Table
                    data={USERS}
                    columns={BASE_COLUMNS}
                    pagination={{
                        pageSize: 3,
                        pageSizeOptions: [3, 6, 9],
                        showTotal: (total, range) => <><b>{range[0]}–{range[1]}</b> / <b>{total}</b> kết quả</>,
                    }}
                />
            </div>
        </ShowcaseCard>
    </div>
);

export default TablePage;
