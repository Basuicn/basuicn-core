import React from 'react'
import { PageHeader, ShowcaseCard } from '@/components/ui/Showcase'
import { Avatar } from '@components/ui/avatar/Avatar'

const AvatarPage = () => (
    <div className="max-w-4xl mx-auto">
        <PageHeader title="Avatar" description="Hình đại diện với ảnh, fallback chữ và group stack." />

        <ShowcaseCard title="Sizes với ảnh (sm / md / lg / xl)">
            <Avatar size="sm" src="https://i.pravatar.cc/150?u=a1" alt="A" />
            <Avatar size="md" src="https://i.pravatar.cc/150?u=b1" alt="B" />
            <Avatar size="lg" src="https://i.pravatar.cc/150?u=c1" alt="C" />
            <Avatar size="xl" src="https://i.pravatar.cc/150?u=d1" alt="D" />
        </ShowcaseCard>

        <ShowcaseCard title="Fallback Text (Initials)">
            <Avatar size="sm" fallback="HT" />
            <Avatar size="md" fallback="AB" />
            <Avatar size="lg" fallback="JD" />
            <Avatar size="xl" fallback="MR" />
        </ShowcaseCard>

        <ShowcaseCard title="Broken Image → Auto Fallback">
            <Avatar src="broken.jpg" alt="Nguyen Van A" size="lg" />
            <Avatar src="404.png" alt="Tran Thi B" size="lg" />
        </ShowcaseCard>

        <ShowcaseCard title="Avatar Group / Stack">
            <div className="flex -space-x-3">
                {['a2', 'b2', 'c2', 'd2', 'e2'].map((u) => (
                    <Avatar key={u} size="md" src={`https://i.pravatar.cc/150?u=${u}`} alt={u} className="border-2 border-background" />
                ))}
                <div className="h-10 w-10 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-semibold text-muted-foreground">+8</div>
            </div>
        </ShowcaseCard>
    </div>
);

export default AvatarPage;
