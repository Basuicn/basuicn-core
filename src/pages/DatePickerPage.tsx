import React from 'react'
import { PageHeader, ShowcaseCard } from '@/components/ui/Showcase'
import { type DateRange } from 'react-day-picker'
import { DatePicker } from '@components/ui/datepicker/DatePicker';

const DatePickerPage = () => {
    const [single, setSingle] = React.useState<Date | undefined>();
    const [range, setRange] = React.useState<DateRange | undefined>();
    const [dt1, setDt1] = React.useState<Date | undefined>();
    const [dt2, setDt2] = React.useState<Date | undefined>();
    const [future, setFuture] = React.useState<Date | undefined>();
    return (
        <div className="max-w-4xl mx-auto">
            <PageHeader title="DatePicker" description="Bộ chọn ngày tháng đầy đủ tính năng." />

            <ShowcaseCard title="Single Date">
                <DatePicker label="Ngày sinh" date={single} onDateChange={(d) => setSingle(d as Date | undefined)} placeholder="Chọn ngày..." />
            </ShowcaseCard>

            <ShowcaseCard title="Date Range">
                <DatePicker mode="range" label="Khoảng thời gian" date={range} onDateChange={(d) => setRange(d as DateRange | undefined)} placeholder="Từ — Đến" />
            </ShowcaseCard>

            <ShowcaseCard title="Chặn Ngày Quá Khứ">
                <DatePicker label="Lịch hẹn" date={future} onDateChange={(d) => setFuture(d as Date | undefined)} disablePastDates placeholder="Chỉ ngày tương lai..." />
            </ShowcaseCard>

            <ShowcaseCard title="DateTime — Nhập giờ (Input)">
                <DatePicker label="Ngày & Giờ" showTime timePickerStyle="input" date={dt1} onDateChange={(d) => setDt1(d as Date | undefined)} placeholder="Chọn ngày giờ..." />
            </ShowcaseCard>

            <ShowcaseCard title="DateTime — Chọn giờ (Select)">
                <DatePicker label="Ngày & Giờ" showTime timePickerStyle="select" date={dt2} onDateChange={(d) => setDt2(d as Date | undefined)} placeholder="Chọn ngày giờ..." />
            </ShowcaseCard>
        </div>
    );
};

export default DatePickerPage;
