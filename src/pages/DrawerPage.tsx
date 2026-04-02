import React from 'react'
import { PageHeader, ShowcaseCard } from '@/components/ui/Showcase'
import { Drawer } from '@components/ui/drawer/Drawer'
import { Button } from '@components/ui/button/Button'
import { Switch } from '@components/ui/switch/Switch'
import { Input } from '@components/ui/input/Input'
import { Select } from '@components/ui/select/Select'
import { Activity } from 'lucide-react'

const DrawerPage = () => {
    const [openL, setOpenL] = React.useState(false);
    const [openR, setOpenR] = React.useState(false);
    const [openT, setOpenT] = React.useState(false);
    const [openB, setOpenB] = React.useState(false);
    return (
        <div className="max-w-4xl">
            <PageHeader title="Drawer" description="Bảng trượt hỗ trợ 4 hướng với nhiều kích thước." />

            <ShowcaseCard title="4 Hướng (left / right / top / bottom)">
                <Button variant="outline" onClick={() => setOpenL(true)}>← Left</Button>
                <Button variant="outline" onClick={() => setOpenR(true)}>Right →</Button>
                <Button variant="outline" onClick={() => setOpenT(true)}>↑ Top</Button>
                <Button variant="outline" onClick={() => setOpenB(true)}>↓ Bottom</Button>

                <Drawer open={openL} onOpenChange={setOpenL} direction="left" title="Drawer — Left" description="Trượt từ bên trái." footerContent={<div className="flex justify-end gap-2"><Button variant="ghost" size="sm" onClick={() => setOpenL(false)}>Đóng</Button><Button size="sm">Lưu</Button></div>}>
                    <div className="space-y-4"><p className="text-sm text-muted-foreground">Nội dung drawer bên trái. Dùng tốt cho navigation menu, sidebar settings.</p><Switch label="Chế độ tối" /><Switch label="Thông báo" defaultChecked /></div>
                </Drawer>

                <Drawer open={openR} onOpenChange={setOpenR} direction="right" size="lg" title="Drawer — Right (Large)" description="Kéo từ phải, size lg." footerContent={<div className="flex justify-end gap-2"><Button variant="ghost" size="sm" onClick={() => setOpenR(false)}>Hủy</Button><Button size="sm">Áp dụng</Button></div>}>
                    <div className="space-y-4">
                        <Input label="Tên" placeholder="Nhập tên..." />
                        <Input label="Email" placeholder="your@email.com" />
                        <Select label="Vai trò" placeholder="Chọn..." options={[{ label: 'Admin', value: 'admin' }, { label: 'User', value: 'user' }]} />
                    </div>
                </Drawer>

                <Drawer open={openT} onOpenChange={setOpenT} direction="top" size="md" title="Drawer — Top" description="Thường dùng cho filter, search.">
                    <div className="flex gap-4 items-end">
                        <Input label="Tìm kiếm" placeholder="Từ khóa..." className="flex-1" />
                        <Select label="Loại" options={[{ label: 'Tất cả', value: '' }, { label: 'Nạp', value: 'in' }, { label: 'Rút', value: 'out' }]} />
                        <Button onClick={() => setOpenT(false)}>Tìm</Button>
                    </div>
                </Drawer>

                <Drawer open={openB} onOpenChange={setOpenB} direction="bottom" size="md" title="Drawer — Bottom" description="Bottom sheet phong cách mobile-first.">
                    <div className="grid grid-cols-3 gap-3">
                        {['Chia sẻ', 'Chỉnh sửa', 'Xóa', 'Tải về', 'In', 'Yêu thích'].map((item) => (
                            <button key={item} className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors text-sm text-muted-foreground hover:text-foreground">
                                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center"><Activity className="w-4 h-4" /></div>
                                {item}
                            </button>
                        ))}
                    </div>
                </Drawer>
            </ShowcaseCard>

            <ShowcaseCard title="Sizes (sm / md / lg)" description="Tất cả trên hướng right.">
                <Drawer trigger={<Button variant="outline" size="sm">Small</Button>} direction="right" size="sm" title="Right — Small">
                    <p className="text-sm text-muted-foreground">Drawer nhỏ (w-64), phù hợp cài đặt nhanh.</p>
                </Drawer>
                <Drawer trigger={<Button variant="outline">Medium</Button>} direction="right" size="md" title="Right — Medium">
                    <p className="text-sm text-muted-foreground">Drawer vừa (w-80), kích thước mặc định.</p>
                </Drawer>
                <Drawer trigger={<Button variant="outline" size="lg">Large</Button>} direction="right" size="lg" title="Right — Large">
                    <p className="text-sm text-muted-foreground">Drawer lớn (w-[480px]), phù hợp form chi tiết.</p>
                </Drawer>
            </ShowcaseCard>
        </div>
    );
};

export default DrawerPage;
