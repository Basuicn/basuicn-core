import * as React from 'react';
import { PageHeader, ShowcaseCard } from '@components/ui/Showcase';
import { Watermark } from '@components/ui/watermark/Watermark';

const PreviewBox: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="w-full rounded-lg border border-border bg-card p-6 text-sm leading-relaxed text-foreground">
    {children}
  </div>
);

const SampleContent = () => (
  <>
    <h4 className="mb-2 text-base font-semibold">Báo cáo nội bộ</h4>
    <p className="text-muted-foreground">
      Tài liệu này được tạo ra cho mục đích minh hoạ Watermark component. Lớp watermark
      sẽ phủ lên trên toàn bộ vùng nội dung, không chặn sự kiện chuột nhờ
      <code className="mx-1 rounded bg-muted px-1">pointer-events-none</code>.
    </p>
    <p className="mt-2 text-muted-foreground">
      Bạn có thể tuỳ biến text, ảnh, góc xoay, font, khoảng cách lặp và z-index.
    </p>
  </>
);

const WatermarkPage = () => (
  <div className="max-w-4xl">
    <PageHeader
      title="Watermark"
      description="Phủ lớp watermark (text hoặc ảnh) lên trên nội dung, dùng để bảo vệ bản quyền hoặc đánh dấu môi trường."
    />

    <ShowcaseCard
      title="Default (text)"
      code={`<Watermark content="basuicn">
  <YourContent />
</Watermark>`}
    >
      <Watermark content="basuicn">
        <PreviewBox>
          <SampleContent />
        </PreviewBox>
      </Watermark>
    </ShowcaseCard>

    <ShowcaseCard
      title="Nhiều dòng"
      code={`<Watermark content={["basuicn", "Confidential"]}>
  <YourContent />
</Watermark>`}
    >
      <Watermark content={['basuicn', 'Confidential']}>
        <PreviewBox>
          <SampleContent />
        </PreviewBox>
      </Watermark>
    </ShowcaseCard>

    <ShowcaseCard
      title="Tuỳ chỉnh font & rotate"
      code={`<Watermark
  content="DRAFT"
  rotate={-30}
  font={{ color: 'rgba(113, 50, 245, 0.25)', fontSize: 22, fontWeight: 700 }}
  gap={[140, 120]}
>
  <YourContent />
</Watermark>`}
    >
      <Watermark
        content="DRAFT"
        rotate={-30}
        font={{ color: 'rgba(113, 50, 245, 0.25)', fontSize: 22, fontWeight: 700 }}
        gap={[140, 120]}
      >
        <PreviewBox>
          <SampleContent />
        </PreviewBox>
      </Watermark>
    </ShowcaseCard>

    <ShowcaseCard
      title="Watermark bằng ảnh"
      code={`<Watermark
  image="https://api.iconify.design/lucide/shield-check.svg?color=%237132f5"
  width={64}
  height={64}
  gap={[120, 120]}
  rotate={0}
>
  <YourContent />
</Watermark>`}
    >
      <Watermark
        image="https://api.iconify.design/lucide/shield-check.svg?color=%237132f5"
        width={64}
        height={64}
        gap={[120, 120]}
        rotate={0}
      >
        <PreviewBox>
          <SampleContent />
        </PreviewBox>
      </Watermark>
    </ShowcaseCard>
  </div>
);

export default WatermarkPage;
