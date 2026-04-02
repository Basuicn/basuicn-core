import { PageHeader, ShowcaseCard } from "@components/ui/Showcase";
import { Progress } from "@components/ui/progress/Progress";
const ProgressPage = () => (
    <div className="max-w-4xl">
        <PageHeader title="Progress" description="Thanh tiến độ với nhiều variant, size và hiệu ứng." />

        <ShowcaseCard title="Variants">
            <div className="w-full space-y-4">
                <Progress value={60} variant="default" labelPosition="outside" label="Default" />
                <Progress value={75} variant="success" labelPosition="outside" label="Success" />
                <Progress value={45} variant="warning" labelPosition="outside" label="Warning" />
                <Progress value={30} variant="danger" labelPosition="outside" label="Danger" />
                <Progress value={88} variant="gradient" labelPosition="outside" label="Gradient" />
            </div>
        </ShowcaseCard>

        <ShowcaseCard title="Sizes (sm / md / lg)">
            <div className="w-full space-y-4">
                <Progress value={55} size="sm" variant="success" labelPosition="outside" label="Small" />
                <Progress value={70} size="md" variant="default" labelPosition="outside" label="Medium" />
                <Progress value={85} size="lg" variant="gradient" labelPosition="outside" label="Large" />
            </div>
        </ShowcaseCard>

        <ShowcaseCard title="Striped & Animated">
            <div className="w-full space-y-4">
                <Progress value={65} striped variant="default" labelPosition="outside" label="Striped" />
                <Progress value={45} striped animated variant="warning" labelPosition="outside" label="Animated" />
                <Progress value={80} striped animated variant="success" labelPosition="outside" label="Success Animated" />
            </div>
        </ShowcaseCard>

        <ShowcaseCard title="Label Positions">
            <div className="w-full space-y-6">
                <div className="space-y-1">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Outside (default)</p>
                    <Progress value={72} labelPosition="outside" variant="default" />
                </div>
                <div className="space-y-1">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Inside</p>
                    <Progress value={72} labelPosition="inside" size="lg" variant="success" />
                </div>
                <div className="space-y-1">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">None</p>
                    <Progress value={72} labelPosition="none" variant="gradient" />
                </div>
            </div>
        </ShowcaseCard>
    </div>
);

export default ProgressPage;
