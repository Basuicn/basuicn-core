import React from 'react'
import { PageHeader, ShowcaseCard } from '@/components/ui/Showcase'
import { Skeleton } from '@components/ui/skeleton/Skeleton'

const SkeletonPage = () => (
    <div className="max-w-4xl">
        <PageHeader title="Skeleton" description="Placeholder loading thay thế nội dung đang tải." />

        <ShowcaseCard title="Shapes cơ bản">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-12 w-48 rounded-md" />
            <Skeleton className="h-4 w-64 rounded" />
        </ShowcaseCard>

        <ShowcaseCard title="User Card Skeleton">
            <div className="flex items-center space-x-4 w-full">
                <Skeleton className="h-12 w-12 rounded-full shrink-0" />
                <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="h-3 w-1/4" />
                </div>
            </div>
        </ShowcaseCard>

        <ShowcaseCard title="Article Skeleton">
            <div className="space-y-4 w-full">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <div className="flex gap-2 pt-2">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                </div>
            </div>
        </ShowcaseCard>
    </div>
);

export default SkeletonPage;
