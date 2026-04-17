import React from 'react';
import { PageHeader, ShowcaseCard } from '@/components/ui/Showcase';
import { NumberInput } from '@/components/ui/number-input/NumberInput';

const NumberInputPage = () => {
  const [val1, setVal1] = React.useState<number | null>(5);
  const [val2, setVal2] = React.useState<number | null>(0);
  const [qty, setQty] = React.useState<number | null>(1);

  return (
    <div className="max-w-5xl">
      <PageHeader
        title="Number Input"
        description="Input số với nút tăng giảm, dựa trên @base-ui/react NumberField."
      />

      {/* ── Basic ──────────────────────────────────────────────────── */}
      <ShowcaseCard
        title="Cơ bản"
        description="Input số đơn giản với label."
      >
        <div className="w-full flex flex-wrap gap-6 items-start">
          <NumberInput
            label="Số lượng"
            value={val1}
            onChange={setVal1}
            min={0}
            max={100}
          />
          <div className="text-sm text-muted-foreground pt-7">
            Giá trị: <strong className="text-foreground">{val1}</strong>
          </div>
        </div>
      </ShowcaseCard>

      {/* ── Sizes ───────────────────────────────────────────────────── */}
      <ShowcaseCard
        title="Kích thước"
        description="Ba kích thước: sm, md, lg."
      >
        <div className="w-full flex flex-wrap gap-8 items-end">
          <NumberInput size="sm" label="Small" defaultValue={3} min={0} max={10} />
          <NumberInput size="md" label="Medium" defaultValue={5} min={0} max={10} />
          <NumberInput size="lg" label="Large" defaultValue={7} min={0} max={10} />
        </div>
      </ShowcaseCard>

      {/* ── Min / Max / Step ─────────────────────────────────────────── */}
      <ShowcaseCard
        title="Min, Max, Step"
        description="Giới hạn giá trị và bước nhảy."
      >
        <div className="w-full flex flex-wrap gap-8 items-end">
          <NumberInput
            label="Tuổi (18-65)"
            defaultValue={25}
            min={18}
            max={65}
            description="Min: 18, Max: 65"
          />
          <NumberInput
            label="Giá (step 0.5)"
            defaultValue={10}
            min={0}
            max={100}
            step={0.5}
            description="Step: 0.5"
          />
          <NumberInput
            label="Điểm (step 10)"
            defaultValue={50}
            min={0}
            max={100}
            step={10}
            description="Step: 10"
          />
        </div>
      </ShowcaseCard>

      {/* ── With description & error ─────────────────────────────────── */}
      <ShowcaseCard
        title="Description & Error"
        description="Hiển thị mô tả và thông báo lỗi."
      >
        <div className="w-full flex flex-wrap gap-8 items-start">
         
          <NumberInput
            label="Số lượng tồn kho"
            value={val2}
            onChange={setVal2}
            min={0}
            error="Số lượng không hợp lệ"
          />
           <NumberInput
            label="Số lượng đặt hàng"
            value={qty}
            onChange={setQty}
            min={1}
            max={99}
            description="Tối thiểu 1, tối đa 99 sản phẩm"
          />
        </div>
      </ShowcaseCard>

      {/* ── Disabled ─────────────────────────────────────────────────── */}
      <ShowcaseCard
        title="Disabled"
        description="Trạng thái vô hiệu hóa."
      >
        <NumberInput
          label="Không thể chỉnh sửa"
          defaultValue={42}
          disabled
        />
      </ShowcaseCard>
    </div>
  );
};

export default NumberInputPage;
