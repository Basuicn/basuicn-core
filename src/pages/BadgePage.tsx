import { PageHeader, ShowcaseCard } from "@components/ui/Showcase";
import { Badge } from "@components/ui/badge/Badge";

const BadgePage = () => (
    <div className="max-w-4xl">
        <PageHeader title="Badge" description="Nhãn trạng thái với nhiều kiểu thiết kế hiện đại." />

        <ShowcaseCard
            title="Solid Variants"
            code={`<Badge>Default</Badge>\n<Badge variant="secondary">Secondary</Badge>\n<Badge variant="outline">Outline</Badge>\n<Badge variant="success">Success</Badge>\n<Badge variant="warning">Warning</Badge>\n<Badge variant="danger">Danger</Badge>`}
        >
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
        </ShowcaseCard>

        <ShowcaseCard
            title="Soft Variants"
            description="Nền nhạt, chữ đậm — phong cách hiện đại."
            code={`<Badge variant="soft-primary">Soft Primary</Badge>\n<Badge variant="soft-success">Soft Success</Badge>\n<Badge variant="soft-warning">Soft Warning</Badge>\n<Badge variant="soft-danger">Soft Danger</Badge>`}
        >
            <Badge variant="soft-primary">Soft Primary</Badge>
            <Badge variant="soft-success">Soft Success</Badge>
            <Badge variant="soft-warning">Soft Warning</Badge>
            <Badge variant="soft-danger">Soft Danger</Badge>
        </ShowcaseCard>

        <ShowcaseCard
            title="Special Variants"
            code={`<Badge variant="glass">Glass</Badge>\n<Badge variant="gradient">Gradient</Badge>`}
        >
            <Badge variant="glass">Glass</Badge>
            <Badge variant="gradient">Gradient</Badge>
        </ShowcaseCard>

        <ShowcaseCard
            title="Sizes"
            code={`<Badge size="sm">Small</Badge>\n<Badge size="md">Medium</Badge>\n<Badge size="lg">Large</Badge>`}
        >
            <Badge size="sm">Small</Badge>
            <Badge size="md">Medium</Badge>
            <Badge size="lg">Large</Badge>
        </ShowcaseCard>

        <ShowcaseCard
            title="Pulse — Trạng thái Sống"
            description="Hiệu ứng nhấp nháy cho live/active."
            code={`<Badge variant="success" pulse>Live</Badge>\n<Badge variant="danger" pulse>Critical</Badge>\n<Badge variant="warning" pulse>Pending</Badge>\n<Badge variant="soft-primary" pulse>Processing</Badge>`}
        >
            <Badge variant="success" pulse>Live</Badge>
            <Badge variant="danger" pulse>Critical</Badge>
            <Badge variant="warning" pulse>Pending</Badge>
            <Badge variant="soft-primary" pulse>Processing</Badge>
            <Badge variant="soft-success" pulse>Soft Success Live</Badge>
        </ShowcaseCard>

        <ShowcaseCard
            title="Use Cases"
            code={`<div className="flex items-center gap-2">\n  <span className="text-sm">Trạng thái:</span>\n  <Badge variant="soft-success" pulse>Đang giao</Badge>\n</div>\n<div className="flex items-center gap-2">\n  <span className="text-sm">Phiên bản:</span>\n  <Badge variant="gradient">v2.0</Badge>\n</div>\n<div className="flex items-center gap-2">\n  <span className="text-sm">Ưu tiên:</span>\n  <Badge variant="danger" size="sm">High</Badge>\n</div>`}
        >
            <div className="flex items-center gap-2"><span className="text-sm">Trạng thái:</span><Badge variant="soft-success" pulse>Đang giao</Badge></div>
            <div className="flex items-center gap-2"><span className="text-sm">Phiên bản:</span><Badge variant="gradient">v2.0</Badge></div>
            <div className="flex items-center gap-2"><span className="text-sm">Ưu tiên:</span><Badge variant="danger" size="sm">High</Badge></div>
        </ShowcaseCard>
    </div>
);

export default BadgePage;
