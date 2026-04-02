import React from 'react'
import { PageHeader, ShowcaseCard } from '@/components/ui/Showcase'
import { Spinner } from '@components/ui/spinner/Spinner'

const SpinnerPage = () => (
    <div className="max-w-4xl">
        <PageHeader title="Spinner" description="Vòng xoay chờ tải, 5 kích thước × 4 màu sắc." />

        <ShowcaseCard title="Sizes (xs → xl)">
            <div className="flex items-end gap-8">
                {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
                    <div key={s} className="flex flex-col items-center gap-2">
                        <Spinner size={s} />
                        <span className="text-xs text-muted-foreground">{s}</span>
                    </div>
                ))}
            </div>
        </ShowcaseCard>

        <ShowcaseCard title="Variants (primary / secondary / muted / white)">
            <div className="flex items-center gap-8">
                {([['primary', ''], ['secondary', ''], ['muted', ''], ['white', 'bg-foreground p-2 rounded-md']] as const).map(([v, cls]) => (
                    <div key={v} className="flex flex-col items-center gap-2">
                        <div className={cls}><Spinner variant={v} /></div>
                        <span className="text-xs text-muted-foreground">{v}</span>
                    </div>
                ))}
            </div>
        </ShowcaseCard>
    </div>
);

export default SpinnerPage;
