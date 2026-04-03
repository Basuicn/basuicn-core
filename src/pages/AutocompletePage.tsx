import React from 'react';
import { PageHeader, ShowcaseCard } from '@/components/ui/Showcase';
import { Autocomplete } from '@components/ui/autocomplete/Autocomplete';
import { MapPin, User, Search } from 'lucide-react';

const COUNTRIES = [
  { label: 'Việt Nam', value: 'vn' },
  { label: 'United States', value: 'us' },
  { label: 'Japan', value: 'jp' },
  { label: 'South Korea', value: 'kr' },
  { label: 'China', value: 'cn' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Canada', value: 'ca' },
  { label: 'Australia', value: 'au' },
  { label: 'Singapore', value: 'sg' },
  { label: 'Thailand', value: 'th' },
];

const USERS = [
  { label: 'Nguyễn Văn An', value: 'u1' },
  { label: 'Trần Thị Bình', value: 'u2' },
  { label: 'Lê Quốc Cường', value: 'u3' },
  { label: 'Phạm Thị Dung', value: 'u4' },
  { label: 'Hoàng Văn Em', value: 'u5' },
  { label: 'Đặng Thị Phương', value: 'u6' },
];

const ControlledDemo = () => {
  const [value, setValue] = React.useState('');
  const selected = COUNTRIES.find(c => c.value === value);

  return (
    <div className="flex flex-col gap-3 w-full max-w-sm">
      <Autocomplete
        options={COUNTRIES}
        placeholder="Tìm quốc gia..."
        leftIcon={<MapPin className="w-4 h-4" />}
        value={value}
        onValueChange={setValue}
      />
      <p className="text-sm text-muted-foreground">
        Đã chọn: <span className="text-foreground font-medium">{selected?.label ?? '—'}</span>
      </p>
    </div>
  );
};

const AutocompletePage = () => (
  <div className="max-w-4xl">
    <PageHeader
      title="Autocomplete"
      description="Chỉ mở dropdown khi người dùng đang gõ — không mở khi click hay focus."
    />

    <ShowcaseCard title="Cơ bản">
      <div className="w-full max-w-sm">
        <Autocomplete
          options={COUNTRIES}
          placeholder="Nhập để tìm quốc gia..."
          label="Quốc gia"
        />
      </div>
    </ShowcaseCard>

    <ShowcaseCard title="Với icon">
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <Autocomplete
          options={COUNTRIES}
          placeholder="Tìm quốc gia..."
          leftIcon={<MapPin className="w-4 h-4" />}
        />
        <Autocomplete
          options={USERS}
          placeholder="Tìm người dùng..."
          leftIcon={<User className="w-4 h-4" />}
        />
      </div>
    </ShowcaseCard>

    <ShowcaseCard title="Controlled">
      <ControlledDemo />
    </ShowcaseCard>

    <ShowcaseCard title="Loading">
      <div className="w-full max-w-sm">
        <Autocomplete
          options={[]}
          placeholder="Đang tải dữ liệu..."
          leftIcon={<Search className="w-4 h-4" />}
          isLoading
        />
      </div>
    </ShowcaseCard>

    <ShowcaseCard title="Custom empty text">
      <div className="w-full max-w-sm">
        <Autocomplete
          options={USERS}
          placeholder="Tìm nhân viên..."
          leftIcon={<User className="w-4 h-4" />}
          emptyText="Không tìm thấy nhân viên phù hợp."
        />
      </div>
    </ShowcaseCard>
  </div>
);

export default AutocompletePage;
