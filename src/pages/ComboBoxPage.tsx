import React from 'react'
import { PageHeader, ShowcaseCard } from '@/components/ui/Showcase'
import { ComboBox } from '@components/ui/combobox/ComboBox'

const ComboBoxPage = () => {
    const options = [
        { label: 'React', value: 'react' },
        { label: 'Next.js', value: 'nextjs' },
        { label: 'Vite', value: 'vite' },
        { label: 'Tailwind CSS', value: 'tailwind' },
        { label: 'Base UI', value: 'baseui' },
        { label: 'Tanstack Table', value: 'table' },
    ];
    return (
        <div className="max-w-full ">
            <PageHeader title="ComboBox" description="Dropdown kết hợp tìm kiếm, hỗ trợ single và multi-select." />
            <div className="grid grid-cols-2 gap-4">
                <ShowcaseCard title="Single + Autocomplete">
                    <div className="w-80">
                        <ComboBox options={options} label="Framework" placeholder="Tìm kiếm..." />
                    </div>
                </ShowcaseCard>

                <ShowcaseCard title="Multi-select (Chips inside Input)">
                    <div className="w-full">
                        <ComboBox options={options} multiple label="Công nghệ sử dụng" placeholder="Thêm công nghệ..." />
                    </div>
                </ShowcaseCard>

                <ShowcaseCard title="Single (No Autocomplete)" description="Chỉ chọn từ list, không gõ.">
                    <div className="w-80">
                        <ComboBox options={options} autocomplete={false} label="Framework cố định" placeholder="Chọn..." />
                    </div>
                </ShowcaseCard>

                <ShowcaseCard title="Multi (No Autocomplete)">
                    <div className="w-full">
                        <ComboBox className='' options={options} multiple autocomplete={false} label="Danh sách cố định" placeholder="Chọn mục..." />
                    </div>
                </ShowcaseCard>
            </div>
        </div>
    );
};

export default ComboBoxPage;
