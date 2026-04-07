import { RadioGroup } from "@components/ui/radio-group/RadioGroup";
import { Radio } from "@components/ui/radio/Radio";
import { PageHeader, ShowcaseCard } from "@components/ui/Showcase";
import { HardDrive, Cpu, Server } from "lucide-react";
export const paymentMethods = [
    {
        value: "card",
        label: "Thẻ",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="mb-3 h-6 w-6">
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
                <path d="M6 15h2" />
            </svg>
        ),
    },
    {
        value: "paypal",
        label: "PayPal",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="mb-3 h-6 w-6">
                <path d="M7 11C7 11 6.5 15 11 15H14C16 15 17.5 13.5 17.5 11.5C17.5 9.5 16 8 14 8H10C8 8 7 9.5 7 11Z" />
                <path d="M5 16C5 16 4.5 20 9 20H12C14 20 15.5 18.5 15.5 16.5" />
            </svg>
        ),
    },
    {
        value: "apple",
        label: "Apple",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="mb-3 h-6 w-6">
                <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
                <path d="M10 2c1 .5 2 2 2 3.22c-1.18.22-2.95-.5-3-3.22Z" />
            </svg>
        ),
    },
];
const RadioPage = () => (
    <div className="max-w-3xl">
        <PageHeader title="Radio Group" description="Chọn một trong nhiều tùy chọn (mutually exclusive)." />

        <ShowcaseCard title="Basic Group">
            <RadioGroup defaultValue="monthly">
                <Radio value="monthly" label="Hàng tháng — 200.000đ/tháng" />
                <Radio value="yearly" label="Hàng năm — 180.000đ/tháng (Tiết kiệm 10%)" />
                <Radio value="lifetime" label="Trọn đời — Thanh toán một lần" />
            </RadioGroup>
        </ShowcaseCard>

        <ShowcaseCard title="Sizes">
            <RadioGroup defaultValue="md">
                <div className="flex items-center gap-8">
                    <Radio value="sm" size="sm" label="Small" />
                    <Radio value="md" size="md" label="Medium" />
                    <Radio value="lg" size="lg" label="Large" />
                </div>
            </RadioGroup>
        </ShowcaseCard>

        <ShowcaseCard title="Disabled State">
            <RadioGroup defaultValue="a">
                <Radio value="a" label="Tùy chọn bình thường" />
                <Radio value="b" label="Tùy chọn bị vô hiệu" disabled />
                <Radio value="c" label="Tùy chọn bình thường khác" />
            </RadioGroup>
        </ShowcaseCard>

        <ShowcaseCard title="Radio Cards">
            <RadioGroup defaultValue="card" className="grid grid-cols-3 gap-4" orientation="horizontal">
                {paymentMethods.map(({ value, label, icon }) => (
                    <Radio
                        key={value}
                        variant="card"
                        value={value}
                        className="flex-col items-center justify-between p-4 w-full"
                    >
                        <div className="flex flex-col items-center">
                            {icon}
                            <span className="text-sm font-medium">{label}</span>
                        </div>
                    </Radio>
                ))}
            </RadioGroup>




            <RadioGroup defaultValue="pro" className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Radio
                    variant="card"
                    value="standard"
                    showIndicator
                >
                    <div className="flex flex-col gap-2 w-full">
                        <div className="flex items-center gap-2 text-foreground font-semibold">
                            <HardDrive className="h-5 w-5 text-muted-foreground group-data-checked/card:text-primary transition-colors" />
                            Tiêu chuẩn
                        </div>
                        <span className="text-sm text-muted-foreground">Phù hợp cá nhân và dự án nhỏ. 10GB SSD, 1GB RAM.</span>
                        <div className="mt-2 text-2xl font-bold">150k<span className="text-sm font-normal text-muted-foreground">/tháng</span></div>
                    </div>
                </Radio>

                <Radio
                    variant="card"
                    value="pro"
                    showIndicator
                    className="relative overflow-hidden border-primary/50 bg-primary/5"
                >
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] uppercase font-bold px-2 py-1 rounded-bl-lg">Phổ biến</div>
                    <div className="flex flex-col gap-2 w-full text-left">
                        <div className="flex items-center gap-2 text-foreground font-semibold">
                            <Cpu className="h-5 w-5 text-muted-foreground group-data-checked/card:text-primary transition-colors" />
                            Chuyên nghiệp
                        </div>
                        <span className="text-sm text-muted-foreground">Hiệu năng cao cho team. 100GB NVMe, 8GB RAM.</span>
                        <div className="mt-2 text-2xl font-bold">450k<span className="text-sm font-normal text-muted-foreground">/tháng</span></div>
                    </div>
                </Radio>

                <Radio
                    variant="card"
                    value="enterprise"
                    showIndicator
                >
                    <div className="flex flex-col gap-2 w-full text-left">
                        <div className="flex items-center gap-2 text-foreground font-semibold">
                            <Server className="h-5 w-5 text-muted-foreground group-data-checked/card:text-primary transition-colors" />
                            Doanh nghiệp
                        </div>
                        <span className="text-sm text-muted-foreground">Tài nguyên không giới hạn, hỗ trợ riêng biệt 24/7.</span>
                        <div className="mt-2 text-2xl font-bold">1M5<span className="text-sm font-normal text-muted-foreground">/tháng</span></div>
                    </div>
                </Radio>
            </RadioGroup>


        </ShowcaseCard>

    </div>
);

export default RadioPage;
