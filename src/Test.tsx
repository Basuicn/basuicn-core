import * as Icons from '@components/icons'
import Spinner from '@components/ui/spinner/Spinner'
import Button from '@components/ui/button/Buton'
import { AutocompleteSelect, CustomSelect, MultiSelect } from '@components/ui/select/Select';
import { Disclosure } from './components/ui/disclosure/Disclosure';
import { Input, InputPassword } from './components/ui/input/Input';
import { Checkbox, CheckboxGroup } from './components/ui/checkbox/Checkbox';
import { Slider } from './components/ui/slider/Slider';
import { ProgressBar } from './components/ui/progress/ProgressBar';
import { ProgressRing } from './components/ui/progress/ProgressRing';
import { Tabs, TabList, Tab, TabPanel } from './components/ui/tabs/Tabs';
import { Popover, PopoverDialog } from './components/ui/popover/Popover';
import { Tooltip, TooltipTrigger } from './components/ui/tooltip/Tooltip';
import { DialogTrigger, Button as AriaButton, Heading } from 'react-aria-components';
import { Switch } from './components/ui/switch/Switch';
import { Radio, RadioGroup } from './components/ui/radio/Radio';
import { Example } from './components/ui/modal/Example';
import { Modal } from './components/ui/modal/Modal';
import { Dialog } from './components/ui/dialog/Dialog';
import InputDate from './components/ui/datepicker/InputDate';
import Tag from './components/ui/tag/Tag';

const Test = () => {

  const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
    { label: 'Option 4', value: '4' },
    { label: 'Option 5', value: '5' },
    { label: 'Option 7', value: '7' },
    { label: 'Option 8', value: '8' },
    { label: 'Option 9', value: '9' },
    { label: 'Option 10', value: '10' },
    { label: 'Option 11', value: '11' },
    { label: 'Option 12', value: '12' },
    { label: 'Option 13', value: '13' },
    { label: 'Option 14', value: '14' },
    { label: 'Option 15', value: '15' },
    { label: 'Option 16', value: '16' },
    { label: 'Option 17', value: '17' },
    { label: 'Option 18', value: '18' },
    { label: 'Option 19', value: '19' },
    { label: 'Option 20', value: '20' },
    { label: 'Option 21', value: '21' },
    { label: 'Option 22', value: '22' },
    { label: 'Option 23', value: '23' },
    { label: 'Option 24', value: '24' },
    { label: 'Option 25', value: '25' },
    { label: 'Option 26', value: '26' },
    { label: 'Option 27', value: '27' },
    { label: 'Option 28', value: '28' },
    { label: 'Option 29', value: '29' },
    { label: 'Option 30', value: '30' },
    { label: 'Option 31', value: '31' },
  ];

  const items = [
    {
      id: '1',
      title: 'Section 1',
      content: 'Content 1',
    },
    {
      id: '2',
      title: 'Section 2',
      content: 'Content 2',
    },
    {
      id: '3',
      title: 'Section 3',
      content: 'Content 3',
    },
  ];
  return (
    <div className="">
      <p className='text-xl font-bold'>1. button</p>
      <div className="space-y-3">
        <div className="space-y-2 border border-gray-100 p-4 rounded-xl bg-gray-100">
          <div className="space-x-1">
            <Button variant='primary' size='lg' isLoading={false} icon={<Icons.Wifi />} >  Click me</Button>
            <Button variant='secondary' isLoading={true} size='md'>Click me</Button>
            <Button variant='danger' isLoading={true} size='sm'>Click me</Button>
            <Button variant='success' isLoading={true} size='xs'>Click me</Button>
            <Button variant='warning' isLoading={true} size='xs'>Click me</Button>
          </div>

          {/* Nhúng Component Disclosure vào đây để làm chức năng Copy Code */}
          <Disclosure
            className="w-full max-w-none shadow-none border border-gray-200 mt-2"
            items={[
              {
                id: 'code-solid-buttons',
                title: 'Xem mã nguồn (Solid Buttons)',
                content: (
                  <pre className="p-4 bg-gray-900 text-blue-300 rounded-lg overflow-x-auto text-xs font-mono leading-relaxed">
                    <code>{`<Button variant="primary" size="lg" isLoading={false} icon={<Icons.Wifi />}>  Click me</Button>
<Button variant="secondary" isLoading={true} size="md">Click me</Button>
<Button variant="danger" isLoading={true} size="sm">Click me</Button>
<Button variant="success" isLoading={true} size="xs">Click me</Button>
<Button variant="warning" isLoading={true} size="xs">Click me</Button>`}</code>
                  </pre>
                )
              }
            ]} />
        </div>
        <div className="space-x-1">

          <Button variant='outline' size='lg' isLoading={false} icon={<Icons.Wifi />} >  Click me</Button>
          <Button variant='outlineSecondary' isLoading={false} size='md'>Click me</Button>
          <Button variant='outlineDanger' isLoading={false} size='sm'>Click me</Button>
          <Button variant='outlineSuccess' isLoading={false} size='xs'>Click me</Button>
          <Button variant='outlineWarning' isLoading={false} size='xs'>Click me</Button>
          <Button variant='outlinePrimary' isLoading={false} size='xs'>Click me</Button>

          <Disclosure
            className="w-full max-w-none shadow-none border border-gray-200 mt-2"
            items={[
              {
                id: 'code-solid-buttons',
                title: 'Xem mã nguồn (Solid Buttons)',
                content: (
                  <pre className="p-4 bg-gray-900 text-blue-300 rounded-lg overflow-x-auto text-xs font-mono leading-relaxed">
                    <code>{`<Button variant='outline' size='lg' isLoading={false} icon={<Icons.Wifi />} >  Click me</Button>
<Button variant='outlineSecondary' isLoading={false} size='md'>Click me</Button>
<Button variant='outlineDanger' isLoading={false} size='sm'>Click me</Button>
<Button variant='outlineSuccess' isLoading={false} size='xs'>Click me</Button>
<Button variant='outlineWarning' isLoading={false} size='xs'>Click me</Button>
<Button variant='outlinePrimary' isLoading={false} size='xs'>Click me</Button>`}</code>
                  </pre>
                )
              }
            ]} />
        </div>
        <div className="space-x-1">

          <Button variant='dashed' isLoading={false} size='xs'>Click me</Button>
          <Button variant='dashedDanger' isLoading={false} size='xs'>Click me</Button>
          <Button variant='dashedSuccess' isLoading={false} size='xs'>Click me</Button>
          <Button variant='dashedWarning' isLoading={false} size='xs'>Click me</Button>
          <Button variant='dashedPrimary' isLoading={false} size='xs'>Click me</Button>
          <Button variant='dashedSecondary' isLoading={false} size='xs'>Click me</Button>
          <Disclosure
            className="w-full max-w-none shadow-none border border-gray-200 mt-2"
            items={[
              {
                id: 'code-solid-buttons',
                title: 'Xem mã nguồn (Solid Buttons)',
                content: (
                  <pre className="p-4 bg-gray-900 text-blue-300 rounded-lg overflow-x-auto text-xs font-mono leading-relaxed">
                    <code>{`<Button variant='dashed' isLoading={false} size='xs'>Click me</Button>
<Button variant='dashedDanger' isLoading={false} size='xs'>Click me</Button>
<Button variant='dashedSuccess' isLoading={false} size='xs'>Click me</Button>
<Button variant='dashedWarning' isLoading={false} size='xs'>Click me</Button>
<Button variant='dashedPrimary' isLoading={false} size='xs'>Click me</Button>
<Button variant='dashedSecondary' isLoading={false} size='xs'>Click me</Button>`}</code>
                  </pre>
                )
              }
            ]} />
        </div>
        <div className="space-x-1">
          <Button variant='ghost' isLoading={false} size='xs'>Click me</Button>
          <Button variant='ghostDanger' isLoading={false} size='xs'>Click me</Button>
          <Button variant='ghostSuccess' isLoading={false} size='xs'>Click me</Button>
          <Button variant='ghostWarning' isLoading={false} size='xs'>Click me</Button>
          <Button variant='ghostPrimary' isLoading={false} size='xs'>Click me</Button>
          <Button variant='ghostSecondary' isLoading={false} size='xs'>Click me</Button>
          <Disclosure
            className="w-full max-w-none shadow-none border border-gray-200 mt-2"
            items={[
              {
                id: 'code-solid-buttons',
                title: 'Xem mã nguồn (Solid Buttons)',
                content: (
                  <pre className="p-4 bg-gray-900 text-blue-300 rounded-lg overflow-x-auto text-xs font-mono leading-relaxed">
                    <code>{`<Button variant='ghost' isLoading={false} size='xs'>Click me</Button>
<Button variant='ghostDanger' isLoading={false} size='xs'>Click me</Button>
<Button variant='ghostSuccess' isLoading={false} size='xs'>Click me</Button>
<Button variant='ghostWarning' isLoading={false} size='xs'>Click me</Button>
<Button variant='ghostPrimary' isLoading={false} size='xs'>Click me</Button>
<Button variant='ghostSecondary' isLoading={false} size='xs'>Click me</Button>`}</code>
                  </pre>
                )
              }
            ]} />
        </div>

      </div>
      <p className='text-xl font-bold'>2. select</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        <div className="flex flex-col gap-4">
          <CustomSelect options={options} label='Select Primary' variant='primary' />
          <CustomSelect options={options} label='Select Success' variant='success' />
        </div>
        <div className="flex flex-col gap-4">
          <MultiSelect options={options} label='Multi Primary' variant='primary' />
          <MultiSelect options={options} label='Multi Danger' variant='danger' />
        </div>
        <div className="flex flex-col gap-4">
          <AutocompleteSelect options={options} label='Autocomplete Primary' variant='primary' />
          <AutocompleteSelect options={options} label='Autocomplete Warning' variant='warning' />
        </div>
        <Disclosure
          className="w-full col-span-1 md:col-span-3 max-w-none shadow-none border border-gray-200 mt-2"
          items={[
            {
              id: 'code-select',
              title: 'Xem mã nguồn (Select Variants)',
              content: (
                <pre className="p-4 bg-gray-900 text-blue-300 rounded-lg overflow-x-auto text-xs font-mono leading-relaxed">
                  <code>{`<CustomSelect options={options} label='Select Success' variant='success' />
<MultiSelect options={options} label='Multi Danger' variant='danger' />
<AutocompleteSelect options={options} label='Autocomplete Warning' variant='warning' />`}</code>
                </pre>
              )
            }
          ]} />
      </div>
      <p className='text-xl font-bold'>3. spinner</p>
      <div className="flex gap-4 items-center">
        <Spinner variant='circle' size='lg' />
        <Spinner variant='circle' size='md' />
        <Spinner variant='circle' size='sm' />
        <Spinner variant='circle' size='xs' />
      </div>
      <Disclosure
        className="w-full col-span-3 max-w-none shadow-none border border-gray-200 mt-2"
        items={[
          {
            id: 'code-spinner',
            title: 'Xem mã nguồn (Spinner)',
            content: (
              <pre className="p-4 bg-gray-900 text-blue-300 rounded-lg overflow-x-auto text-xs font-mono leading-relaxed">
                <code>{`<Spinner variant='circle' size='lg' />
<Spinner variant='circle' size='md' />
<Spinner variant='circle' size='sm' />
<Spinner variant='circle' size='xs' />`}</code>
              </pre>
            )
          }
        ]} />
      <p className='text-xl font-bold'>4. disclosure</p>
      <div className="">
        <Disclosure items={items} />
        <Disclosure
          className="w-full col-span-3 max-w-none shadow-none border border-gray-200 mt-2"
          items={[
            {
              id: 'code-disclosure',
              title: 'Xem mã nguồn (Disclosure)',
              content: (
                <pre className="p-4 bg-gray-900 text-blue-300 rounded-lg overflow-x-auto text-xs font-mono leading-relaxed">
                  <code>{`<Disclosure items={items} />`}</code>
                </pre>
              )
            }
          ]} />
      </div>
      <p className='text-xl font-bold'>5. input</p>
      <div className="space-y-4">
        <Input label='Input normal' size='md' placeholder='nhập....' />
        <InputPassword label='Input password' placeholder='Nhập mật khẩu' />
        <Disclosure
          className="w-full col-span-3 max-w-none shadow-none border border-gray-200 mt-2"
          items={[
            {
              id: 'code-input',
              title: 'Xem mã nguồn (Input)',
              content: (
                <pre className="p-4 bg-gray-900 text-blue-300 rounded-lg overflow-x-auto text-xs font-mono leading-relaxed">
                  <code>{`<Input label='Input normal' size='md' placeholder='nhập....' />
<InputPassword label='Input password' placeholder='Nhập mật khẩu' />`}</code>
                </pre>
              )
            }
          ]} />
      </div>

      <p className='text-xl font-bold mt-8 mb-4 border-b pb-2'>6. Checkbox, Switch, Radio</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4">
        {/* Checkbox Section */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg text-gray-700">Checkbox</h3>
          <CheckboxGroup label="Quyền truy cập" defaultValue={["read", "write"]}>
            <Checkbox value="read" label="Quyền đọc" variant="primary" size="md" />
            <Checkbox value="write" label="Quyền ghi" variant="success" size="md" />
            <Checkbox value="delete" label="Quyền xóa" variant="danger" size="md" description="Thao tác này rất nguy hiểm" />
            <Checkbox value="admin" label="Quản trị viên" variant="warning" size="md" isIndeterminate />
          </CheckboxGroup>

          <div className="flex gap-2 items-center">
            <Checkbox size="sm" />
            <Checkbox size="md" />
            <Checkbox size="lg" />
          </div>
          <Checkbox isDisabled label="Disabled Checkbox" />
        </div>

        {/* Radio Section */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg text-gray-700">Radio</h3>
          <RadioGroup label="Gói dịch vụ" defaultValue="pro" orientation="vertical">
            <Radio value="free" label="Gói Miễn phí" variant="primary" size="md" />
            <Radio value="pro" label="Gói Chuyên nghiệp" variant="success" size="md" description="Khuyên dùng cho nhóm nhỏ" />
            <Radio value="enterprise" label="Gói Doanh nghiệp" variant="warning" size="md" />
            <Radio value="cancel" label="Hủy dịch vụ" variant="danger" size="md" />
          </RadioGroup>

          <RadioGroup aria-label="Sizes" orientation="horizontal">
            <div className="flex gap-2 items-center">
              <Radio size="sm" value="sm" label="Small" />
              <Radio size="md" value="md" label="Medium" />
              <Radio size="lg" value="lg" label="Large" />
            </div>
          </RadioGroup>

          <RadioGroup aria-label="Disabled">
            <Radio value="disabled" isDisabled label="Disabled Radio" />
          </RadioGroup>
        </div>

        {/* Switch Section */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg text-gray-700">Switch</h3>
          <div className="flex flex-col gap-3">
            <Switch variant="primary" label="Bật thông báo (Primary)" defaultSelected />
            <Switch variant="success" label="Chế độ bảo vệ (Success)" defaultSelected />
            <Switch variant="danger" label="Chế độ nguy hiểm (Danger)" defaultSelected />
            <Switch variant="warning" label="Chế độ ban đêm (Warning)" defaultSelected />
            <Switch variant="secondary" label="Chế độ ẩn danh (Secondary)" defaultSelected />
          </div>

          <div className="flex gap-4 items-center mt-2">
            <Switch size="sm" />
            <Switch size="md" />
            <Switch size="lg" />
          </div>
          <Switch isDisabled label="Disabled Switch" />
        </div>
      </div>
      <p className='text-xl font-bold mt-8 mb-4 border-b pb-2'>7. Pickers & Indicators (Slider, Progress)</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
        {/* Slider Section */}
        <div className="space-y-6">
          <h3 className="font-semibold text-lg text-gray-700">Slider</h3>
          <Slider label="Âm lượng (Primary)" defaultValue={50} variant="primary" />
          <Slider label="Độ sáng (Success)" defaultValue={75} variant="success" />
          <Slider label="Quá tải (Danger)" defaultValue={90} variant="danger" />
          <Slider label="Nhiệt độ (Warning)" defaultValue={60} variant="warning" />
          <Slider label="Chế độ (Secondary)" defaultValue={30} variant="secondary" />
          <Slider label="Disabled Slider" defaultValue={50} isDisabled />
        </div>

        {/* ProgressBar Section */}
        <div className="space-y-6">
          <h3 className="font-semibold text-lg text-gray-700">ProgressBar</h3>
          <ProgressBar label="Tải file (Primary)" value={45} variant="primary" />
          <ProgressBar label="Cài đặt (Success)" value={100} variant="success" />
          <ProgressBar label="Xóa dữ liệu (Danger)" value={80} variant="danger" />
          <ProgressBar label="Cảnh báo dung lượng (Warning)" value={85} variant="warning" />
          <ProgressBar label="Bảo trì (Secondary)" value={20} variant="secondary" />
          <ProgressBar label="Indeterminate (Đang xử lý)" isIndeterminate variant="primary" />
        </div>

        {/* ProgressRing Section */}
        <div className="space-y-6">
          <h3 className="font-semibold text-lg text-gray-700">ProgressRing</h3>
          <div className="flex gap-4 flex-wrap items-center">
            <ProgressRing value={75} variant="primary" size="md" showValueLabel />
            <ProgressRing value={100} variant="success" size="lg" showValueLabel />
            <ProgressRing value={90} variant="danger" size="sm" showValueLabel />
            <ProgressRing value={60} variant="warning" size="md" />
            <ProgressRing value={30} variant="secondary" size="md" />
          </div>

          <h4 className="font-medium text-gray-600 mt-4">Indeterminate State</h4>
          <div className="flex gap-4 items-center">
            <ProgressRing isIndeterminate variant="primary" size="sm" />
            <ProgressRing isIndeterminate variant="success" size="md" />
            <ProgressRing isIndeterminate variant="danger" size="lg" />
          </div>
        </div>
      </div>
      <p className='text-xl font-bold mt-8 mb-4 border-b pb-2'>8. Layout & Overlays (Tabs, Modal, Tooltip, Popover)</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4">
        {/* Tabs Section */}
        <div className="space-y-6">
          <h3 className="font-semibold text-lg text-gray-700">Tabs</h3>
          <Tabs variant="primary">
            <TabList>
              <Tab id="tab1">Hồ sơ</Tab>
              <Tab id="tab2">Bảo mật</Tab>
              <Tab id="tab3">Cài đặt</Tab>
            </TabList>
            <TabPanel id="tab1" className="text-gray-600">Nội dung hồ sơ cá nhân của bạn.</TabPanel>
            <TabPanel id="tab2" className="text-gray-600">Cập nhật mật khẩu và bảo mật hai lớp.</TabPanel>
            <TabPanel id="tab3" className="text-gray-600">Cài đặt hiển thị và thông báo.</TabPanel>
          </Tabs>

          <Tabs variant="success">
            <TabList styleType="pill">
              <Tab id="t1" styleType="pill">Kế hoạch</Tab>
              <Tab id="t2" styleType="pill">Thực thi</Tab>
              <Tab id="t3" styleType="pill">Báo cáo</Tab>
            </TabList>
            <TabPanel id="t1" className="text-gray-600">Lên ý tưởng dự án mới.</TabPanel>
            <TabPanel id="t2" className="text-gray-600">Bắt đầu lập trình.</TabPanel>
            <TabPanel id="t3" className="text-gray-600">Hoàn thành đúng KPI đề ra.</TabPanel>
          </Tabs>
        </div>

        {/* Modal Section */}


        {/* Tooltip & Popover Section */}
        <div className="space-y-6">
          <h3 className="font-semibold text-lg text-gray-700">Tooltip & Popover</h3>
          <div className="flex gap-4 items-center flex-wrap">
            {/* Tooltip */}
            <TooltipTrigger>
              <AriaButton className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors outline-none">
                Hover me
              </AriaButton>
              <Tooltip variant="dark" showArrow>Đây là Tooltip Dark</Tooltip>
            </TooltipTrigger>

            <TooltipTrigger delay={1000}>
              <AriaButton className="w-10 h-10 pb-0.5 font-bold flex items-center justify-center bg-danger/10 text-danger rounded-full hover:bg-danger/20 transition-colors outline-none">
                !
              </AriaButton>
              <Tooltip variant="danger" placement="right">Có lỗi xảy ra!</Tooltip>
            </TooltipTrigger>
            <TooltipTrigger delay={0}>
              <AriaButton className="w-10 h-10 pb-0.5 font-bold flex items-center justify-center bg-danger/10 text-danger rounded-full hover:bg-danger/20 transition-colors outline-none">
                !
              </AriaButton>
              <Tooltip variant="danger" placement="left">Có lỗi xảy ra!</Tooltip>
            </TooltipTrigger>

            {/* Popover */}
            <DialogTrigger>
              <AriaButton className="ml-4 px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary-dark transition-colors outline-none">
                Open Popover
              </AriaButton>
              <Popover showArrow placement="bottom">
                <PopoverDialog title="Cài đặt nhanh">
                  <p className="text-sm text-gray-600 mb-4 w-48">Tuỳ chỉnh màu nền và chế độ hiển thị linh hoạt.</p>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 text-sm text-gray-700"><input type="checkbox" className="rounded" /> Giao diện tối</label>
                    <label className="flex items-center gap-2 text-sm text-gray-700"><input type="checkbox" className="rounded" /> Ẩn thông báo</label>
                  </div>
                </PopoverDialog>
              </Popover>
            </DialogTrigger>
          </div>
        </div>
      </div>
      <div className="">
        <h3 className="font-semibold text-lg text-gray-700">Modal</h3>
        <div className="">
          <Example />
        </div>
      </div>

      <p className='text-xl font-bold mt-8 mb-4 border-b pb-2'>9. Date & Time Pickers</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
        <div className="space-y-6">
          <InputDate label="Chọn ngày (Default)" variant="primary" />
          <InputDate label="Chọn ngày (Success)" variant="success" />
        </div>
        <div className="space-y-6">
          <InputDate label="Chọn ngày & giờ" showTime variant="warning" />
          <InputDate label="Chọn ngày & giờ (Danger)" showTime variant="danger" />
        </div>
        <div className="space-y-6">
          <InputDate label="Chọn khoảng ngày" isRange variant="primary" />
          <InputDate label="Chọn khoảng ngày & giờ" isRange showTime variant="success" />
        </div>
      </div>
      <div className="p-4 mt-4 bg-gray-50 rounded-xl space-y-6">
          <h4 className="font-semibold text-gray-700">Kích thước (Sizes)</h4>
          <div className="flex flex-col gap-4">
              <InputDate size="xs" label="Size XS" variant="primary" />
              <InputDate size="sm" label="Size SM" variant="success" />
              <InputDate size="md" label="Size MD (Default)" variant="warning" />
              <InputDate size="lg" label="Size LG" variant="danger" />
          </div>
      </div>
      <p className='text-xl font-bold mt-8 mb-4 border-b pb-2'>10. Tag</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4">
          <Tag variant="primary">Primary</Tag>
          <Tag variant="secondary">Secondary</Tag>
          <Tag variant="danger">Danger</Tag>
          <Tag variant="success">Success</Tag>
          <Tag variant="warning">Warning</Tag>
          <Tag variant="outlinePrimary">Outline Primary</Tag>
          <Tag variant="outlineSecondary">Outline Secondary</Tag>
          <Tag variant="outlineDanger">Outline Danger</Tag>
          <Tag variant="outlineSuccess">Outline Success</Tag>
          <Tag variant="outlineWarning">Outline Warning</Tag>
          <Tag variant="ghostPrimary">Ghost Primary</Tag>
          <Tag variant="ghostSecondary">Ghost Secondary</Tag>
          <Tag variant="ghostDanger">Ghost Danger</Tag>
          <Tag variant="ghostSuccess">Ghost Success</Tag>
          <Tag variant="ghostWarning">Ghost Warning</Tag>
          <Tag variant="outlineGhostPrimary">Outline Ghost Primary</Tag>
          <Tag variant="outlineGhostSecondary">Outline Ghost Secondary</Tag>
          <Tag variant="outlineGhostDanger">Outline Ghost Danger</Tag>
          <Tag variant="outlineGhostSuccess">Outline Ghost Success</Tag>
          <Tag variant="outlineGhostWarning">Outline Ghost Warning</Tag>
        </div>
    </div>
  )
}

export default Test

