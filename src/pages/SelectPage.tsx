import { Select } from "@components/ui/select/Select";
import { PageHeader, ShowcaseCard } from "@components/ui/Showcase";

const SelectPage = () => (
  <div className="max-w-md">
    <PageHeader title="Select" description="Dropdown chọn một giá trị từ danh sách cố định." />

    <ShowcaseCard title="Basic Select">
      <div className="w-full space-y-5">
        <Select label="Chủ đề" placeholder="Chọn theme" options={[
          { label: 'Sáng (Light)', value: 'light' },
          { label: 'Tối (Dark)', value: 'dark' },
          { label: 'Hệ thống', value: 'system' },
        ]} />
        <Select label="Vai trò" placeholder="Chọn vai trò" options={[
          { label: 'Quản trị viên', value: 'admin' },
          { label: 'Biên tập viên', value: 'editor' },
          { label: 'Người dùng', value: 'user' },
        ]} />
      </div>
    </ShowcaseCard>
  </div>
);
export default SelectPage;
