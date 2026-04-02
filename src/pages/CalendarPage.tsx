import React from 'react'
import { PageHeader, ShowcaseCard } from '@/components/ui/Showcase'
import { Badge } from '@components/ui/badge/Badge'
import { type DateRange } from 'react-day-picker'
import { Calendar } from '@/components/ui';

const CalendarPage = () => {
    const [single, setSingle] = React.useState<Date | undefined>();
    const [range, setRange] = React.useState<DateRange | undefined>();
    const [multi, setMulti] = React.useState<Date[]>([]);
    return (
        <div className="max-w-5xl">
            <PageHeader title="Calendar" description="Lịch tương tác hỗ trợ 3 chế độ: single, range, multiple." />

            <div className="flex flex-wrap gap-6">
                <ShowcaseCard title="Single Date" description="Chọn một ngày.">
                    <div className="flex flex-col gap-3 items-start w-full overflow-auto">
                        <Calendar mode="single" selected={single} onSelect={(d) => setSingle(d as Date | undefined)} />
                        {single && <Badge variant="soft-primary">{single.toLocaleDateString('vi-VN')}</Badge>}
                    </div>
                </ShowcaseCard>

                <ShowcaseCard title="Date Range" description="Chọn khoảng ngày.">
                    <div className="flex flex-col gap-3 items-start w-full overflow-auto">
                        <Calendar mode="range" selected={range} onSelect={(d) => setRange(d as DateRange | undefined)} />
                        {range?.from && <Badge variant="soft-success">Từ {range.from.toLocaleDateString('vi-VN')}{range.to ? ` đến ${range.to.toLocaleDateString('vi-VN')}` : ''}</Badge>}
                    </div>
                </ShowcaseCard>

                <ShowcaseCard title="Multiple Dates" description="Chọn nhiều ngày.">
                    <div className="flex flex-col gap-3 items-start w-full overflow-auto">
                        <Calendar mode="multiple" selected={multi} onSelect={(d) => setMulti(d as Date[] ?? [])} />
                        {multi.length > 0 && <Badge variant="soft-warning">{multi.length} ngày đã chọn</Badge>}
                    </div>
                </ShowcaseCard>

                <ShowcaseCard title="Chặn Ngày Quá Khứ" description="disablePastDates=true">
                    <div className="flex flex-col gap-3 items-start w-full overflow-auto">
                        <Calendar mode="single" disablePastDates selected={single} onSelect={(d) => setSingle(d as Date | undefined)} />
                    </div>
                </ShowcaseCard>

                <ShowcaseCard title="Chặn Ngày Tương Lai" description="disableFutureDates=true">
                    <div className="flex flex-col gap-3 items-start w-full overflow-auto">
                        <Calendar mode="single" disableFutureDates selected={single} onSelect={(d) => setSingle(d as Date | undefined)} />
                    </div>
                </ShowcaseCard>
            </div>
        </div>
    );
};

export default CalendarPage;
