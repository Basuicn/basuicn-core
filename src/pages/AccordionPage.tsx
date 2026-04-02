import React from 'react'
import { PageHeader, ShowcaseCard } from '@/components/ui/Showcase'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@components/ui/accordion/Accordion'

const AccordionPage = () => (
    <div className="max-w-3xl">
        <PageHeader title="Accordion" description="Co giãn nhóm nội dung, hỗ trợ single và multiple mode." />

        <ShowcaseCard title="Single Mode (mặc định)" description="Chỉ mở một panel."
        
        >
            <div className="w-full">
                <Accordion>
                    <AccordionItem value="q1">
                        <AccordionTrigger>Sản phẩm có miễn phí không?</AccordionTrigger>
                        <AccordionContent>Có gói miễn phí với tính năng cơ bản. Gói Pro có đầy đủ tính năng nâng cao.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="q2">
                        <AccordionTrigger>Có thể hủy đăng ký bất kỳ lúc nào không?</AccordionTrigger>
                        <AccordionContent>Hoàn toàn có thể. Hủy bất cứ lúc nào, không phí phạt.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="q3">
                        <AccordionTrigger>Hỗ trợ kỹ thuật ra sao?</AccordionTrigger>
                        <AccordionContent>Hỗ trợ 24/7 qua Email và Live Chat cho gói Pro trở lên.</AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </ShowcaseCard>

        <ShowcaseCard title="Multiple Mode" description="Mở nhiều panel cùng lúc."
        
        >
            <div className="w-full">
                <Accordion multiple defaultValue={['t1', 't2']}>
                    <AccordionItem value="t1">
                        <AccordionTrigger>Điều khoản sử dụng</AccordionTrigger>
                        <AccordionContent>Người dùng tự chịu trách nhiệm về dữ liệu cá nhân. Nền tảng không bán thông tin cho bên thứ ba.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="t2">
                        <AccordionTrigger>Chính sách bảo mật</AccordionTrigger>
                        <AccordionContent>Dữ liệu được mã hóa và lưu tại Việt Nam, tuân thủ PDPA.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="t3">
                        <AccordionTrigger>Liên hệ hỗ trợ</AccordionTrigger>
                        <AccordionContent>Email: support@example.com | Hotline: 1800-xxxx | 24/7</AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </ShowcaseCard>
    </div>
);

export default AccordionPage;
