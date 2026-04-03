import React from 'react'
import { PageHeader, ShowcaseCard } from '@/components/ui/Showcase'
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerBody, DrawerFooter } from '@components/ui/drawer/Drawer'
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

                <Drawer open={openL} onOpenChange={setOpenL}>
                    <DrawerContent direction="left">
                        <DrawerHeader>
                            <DrawerTitle>Drawer — Left</DrawerTitle>
                            <DrawerDescription>Trượt từ bên trái.</DrawerDescription>
                        </DrawerHeader>
                        <DrawerBody>
                            <div className="space-y-4">
                                <p className="text-sm text-muted-foreground">Nội dung drawer bên trái. Dùng tốt cho navigation menu, sidebar settings.</p>
                                <Switch label="Chế độ tối" />
                                <Switch label="Thông báo" defaultChecked />
                            </div>
                        </DrawerBody>
                        <DrawerFooter>
                            <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="sm" onClick={() => setOpenL(false)}>Đóng</Button>
                                <Button size="sm">Lưu</Button>
                            </div>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>

                <Drawer open={openR} onOpenChange={setOpenR}>
                    <DrawerContent direction="right" size="lg">
                        <DrawerHeader>
                            <DrawerTitle>Drawer — Right (Large)</DrawerTitle>
                            <DrawerDescription>Kéo từ phải, size lg.</DrawerDescription>
                        </DrawerHeader>
                        <DrawerBody>
                            <div className="space-y-4">
                                <Input label="Tên" placeholder="Nhập tên..." />
                                <Input label="Email" placeholder="your@email.com" />
                                <Select label="Vai trò" placeholder="Chọn..." options={[{ label: 'Admin', value: 'admin' }, { label: 'User', value: 'user' }]} />
                            </div>
                        </DrawerBody>
                        <DrawerFooter>
                            <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="sm" onClick={() => setOpenR(false)}>Hủy</Button>
                                <Button size="sm">Áp dụng</Button>
                            </div>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>

                <Drawer open={openT} onOpenChange={setOpenT}>
                    <DrawerContent direction="top" size="md">
                        <DrawerHeader>
                            <DrawerTitle>Drawer — Top</DrawerTitle>
                            <DrawerDescription>Thường dùng cho filter, search.</DrawerDescription>
                        </DrawerHeader>
                        <DrawerBody>
                            <div className="flex gap-4 items-end">
                                <Input label="Tìm kiếm" placeholder="Từ khóa..." className="flex-1" />
                                <Select label="Loại" options={[{ label: 'Tất cả', value: '' }, { label: 'Nạp', value: 'in' }, { label: 'Rút', value: 'out' }]} />
                                <Button onClick={() => setOpenT(false)}>Tìm</Button>
                            </div>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>

                <Drawer open={openB} onOpenChange={setOpenB}>
                    <DrawerContent direction="bottom" size="md">
                        <DrawerHeader>
                            <DrawerTitle>Drawer — Bottom</DrawerTitle>
                            <DrawerDescription>Bottom sheet phong cách mobile-first.</DrawerDescription>
                        </DrawerHeader>
                        <DrawerBody>
                            <div className="grid grid-cols-3 gap-3">
                                {['Chia sẻ', 'Chỉnh sửa', 'Xóa', 'Tải về', 'In', 'Yêu thích'].map((item) => (
                                    <button key={item} className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors text-sm text-muted-foreground hover:text-foreground">
                                        <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center"><Activity className="w-4 h-4" /></div>
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </ShowcaseCard>

            <ShowcaseCard title="Sizes (sm / md / lg)" description="Tất cả trên hướng right.">
                <Drawer>
                    <DrawerTrigger render={<Button variant="outline" size="sm">Small</Button>} />
                    <DrawerContent direction="right" size="sm">
                        <DrawerHeader><DrawerTitle>Right — Small</DrawerTitle></DrawerHeader>
                        <DrawerBody><p className="text-sm text-muted-foreground">Drawer nhỏ (w-64), phù hợp cài đặt nhanh.</p></DrawerBody>
                    </DrawerContent>
                </Drawer>
                <Drawer>
                    <DrawerTrigger render={<Button variant="outline">Medium</Button>} />
                    <DrawerContent direction="right" size="md">
                        <DrawerHeader><DrawerTitle>Right — Medium</DrawerTitle></DrawerHeader>
                        <DrawerBody><p className="text-sm text-muted-foreground">Drawer vừa (w-80), kích thước mặc định.</p></DrawerBody>
                    </DrawerContent>
                </Drawer>
                <Drawer>
                    <DrawerTrigger render={<Button variant="outline" size="lg">Large</Button>} />
                    <DrawerContent direction="right" size="lg">
                        <DrawerHeader><DrawerTitle>Right — Large</DrawerTitle></DrawerHeader>
                        <DrawerBody><p className="text-sm text-muted-foreground">Drawer lớn (w-[480px]), phù hợp form chi tiết.</p></DrawerBody>
                    </DrawerContent>
                </Drawer>
            </ShowcaseCard>
        </div>
    );
};

export default DrawerPage;
