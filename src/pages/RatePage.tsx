import React from 'react'
import { PageHeader, ShowcaseCard } from '@/components/ui/Showcase'
import { Rate } from '@components/ui/rate/Rate'
import { Badge } from '@components/ui/badge/Badge'
import { Avatar } from '@components/ui/avatar/Avatar'
import { Heart, ThumbsUp, Smile } from 'lucide-react'

const RatePage = () => {
    const [val1, setVal1] = React.useState(3);
    const [val2, setVal2] = React.useState(3.5);
    const [val3, setVal3] = React.useState(0);
    return (
        <div className="max-w-4xl">
            <PageHeader title="Rate (Star)" description="Đánh giá sao với half-star, custom icon, readonly." />

            <ShowcaseCard title="Sizes (sm / md / lg / xl)">
                <div className="flex flex-col gap-4 w-full">
                    {(['sm', 'md', 'lg', 'xl'] as const).map((s) => (
                        <div key={s} className="flex items-center gap-4">
                            <span className="text-xs text-muted-foreground w-6">{s}</span>
                            <Rate size={s} defaultValue={3} />
                        </div>
                    ))}
                </div>
            </ShowcaseCard>

            <ShowcaseCard title="Controlled + Giá trị">
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex items-center gap-4">
                        <Rate value={val1} onChange={setVal1} />
                        <Badge variant="soft-primary">{val1} / 5 sao</Badge>
                    </div>
                    <div className="flex items-center gap-4">
                        <Rate value={val2} onChange={setVal2} allowHalf />
                        <Badge variant="soft-warning">{val2} / 5 sao (half)</Badge>
                    </div>
                    <div className="flex items-center gap-4">
                        <Rate value={val3} onChange={setVal3} count={10} />
                        <Badge variant="soft-success">{val3} / 10 sao</Badge>
                    </div>
                </div>
            </ShowcaseCard>

            <ShowcaseCard title="Half Star">
                <Rate defaultValue={2.5} allowHalf />
                <Rate defaultValue={4.5} allowHalf />
                <Rate defaultValue={1.5} allowHalf activeColor="text-rose-500" />
            </ShowcaseCard>

            <ShowcaseCard title="Custom Colors">
                <Rate defaultValue={4} activeColor="text-rose-500" />
                <Rate defaultValue={3} activeColor="text-violet-500" />
                <Rate defaultValue={5} activeColor="text-emerald-500" />
                <Rate defaultValue={2} activeColor="text-sky-500" />
            </ShowcaseCard>

            <ShowcaseCard title="Custom Icon">
                <Rate defaultValue={3} character={<Heart className="w-6 h-6" fill="currentColor" />} activeColor="text-rose-500" />
                <Rate defaultValue={4} character={<ThumbsUp className="w-6 h-6" fill="currentColor" />} activeColor="text-sky-500" />
                <Rate defaultValue={5} character={<Smile className="w-6 h-6" fill="currentColor" />} activeColor="text-amber-400" />
            </ShowcaseCard>

            <ShowcaseCard title="Readonly / Disabled">
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3"><Rate value={4.5} readonly allowHalf /><span className="text-sm text-muted-foreground">Readonly (4.5★)</span></div>
                    <div className="flex items-center gap-3"><Rate value={3} disabled /><span className="text-sm text-muted-foreground">Disabled</span></div>
                </div>
            </ShowcaseCard>

            <ShowcaseCard title="Use Case — Product Reviews">
                <div className="space-y-3 w-full">
                    {[
                        { name: 'Huy Tran', rating: 5, comment: 'Sản phẩm tuyệt vời, giao hàng nhanh!' },
                        { name: 'Jane Doe', rating: 4, comment: 'Chất lượng tốt, đóng gói cẩn thận.' },
                        { name: 'Bob Lee', rating: 3.5, comment: 'Ổn, nhưng giao hàng hơi chậm.', half: true },
                    ].map((r) => (
                        <div key={r.name} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                            <Avatar size="sm" fallback={r.name[0]} />
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium">{r.name}</span>
                                    <Rate value={r.rating} readonly size="sm" allowHalf={r.half} />
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">{r.comment}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </ShowcaseCard>
        </div>
    );
};

export default RatePage;
