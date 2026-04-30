
import React from 'react';
import { PageHeader, ShowcaseCard } from '@/components/ui/Showcase';
import { QRCode, type QRCodeLevel } from '@components/ui/qrcode/QRCode';

const DEMO_URL = 'https://basuicn.dev';
const GITHUB_URL = 'https://github.com/Basuicn/basuicn-core';

const SIZES = [
  { size: 'sm', label: 'sm — 96px' },
  { size: 'md', label: 'md — 128px' },
  { size: 'lg', label: 'lg — 192px' },
  { size: 'xl', label: 'xl — 256px' },
] as const;

const ERROR_LEVELS: { level: QRCodeLevel; desc: string }[] = [
  { level: 'L', desc: '~7% phục hồi' },
  { level: 'M', desc: '~15% phục hồi' },
  { level: 'Q', desc: '~25% phục hồi' },
  { level: 'H', desc: '~30% phục hồi' },
];

const CUSTOM_COLORS = [
  { fgColor: '#7132f5', bgColor: '#ffffff', label: 'Brand Purple' },
  { fgColor: '#149e61', bgColor: '#ffffff', label: 'Success Green' },
  { fgColor: '#ffffff', bgColor: '#101114', label: 'Dark Theme' },
  { fgColor: '#ffffff', bgColor: '#7132f5', label: 'Inverted' },
];

const PROPS_DOC = [
  { prop: 'value', type: 'string', default: '—', description: 'Nội dung cần mã hoá (URL, text, ...)' },
  { prop: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Preset kích thước: 96 / 128 / 192 / 256px' },
  { prop: 'pixelSize', type: 'number', default: '—', description: 'Ghi đè kích thước pixel (ưu tiên hơn size)' },
  { prop: 'level', type: "'L' | 'M' | 'Q' | 'H'", default: "'L'", description: 'Mức độ sửa lỗi — L thấp, H cao (dùng H khi có logo)' },
  { prop: 'bgColor', type: 'string', default: "'#ffffff'", description: 'Màu nền (hex hoặc rgb)' },
  { prop: 'fgColor', type: 'string', default: "'#000000'", description: 'Màu module QR (hex hoặc rgb)' },
  { prop: 'marginSize', type: 'number', default: '2', description: 'Số module khoảng trắng xung quanh QR' },
  { prop: 'imageSettings', type: 'QRCodeImageSettings', default: '—', description: 'Logo/ảnh nhúng vào giữa — khuyên dùng kèm level H' },
  { prop: 'renderer', type: "'svg' | 'canvas'", default: "'svg'", description: 'SVG: sắc nét mọi kích thước; Canvas: download PNG' },
  { prop: 'title', type: 'string', default: 'auto', description: 'Tiêu đề accessibility cho screen reader' },
  { prop: 'label', type: 'string', default: '—', description: 'Nhãn hiển thị phía trên QR code' },
  { prop: 'description', type: 'string', default: '—', description: 'Chú thích hiển thị phía dưới QR code' },
  { prop: 'downloadable', type: 'boolean', default: 'false', description: 'Hiển thị nút tải xuống (SVG hoặc PNG)' },
  { prop: 'downloadFilename', type: 'string', default: "'qrcode'", description: 'Tên file khi tải (không có đuôi mở rộng)' },
  { prop: 'className', type: 'string', default: '—', description: 'Class tuỳ chỉnh cho container ngoài cùng' },
] as const;

const QRCodePage = () => (
  <div className="max-w-4xl mx-auto">
    <PageHeader
      title="QR Code"
      description="Tạo mã QR từ URL, text, hay bất kỳ chuỗi nào. Hỗ trợ SVG & Canvas, tuỳ chỉnh màu sắc, logo nhúng, và tải xuống."
    />

    <ShowcaseCard title="Basic Usage">
      <QRCode value={DEMO_URL} />
    </ShowcaseCard>

    <ShowcaseCard title="Sizes — sm / md / lg / xl">
      <div className="flex flex-wrap items-end gap-8">
        {SIZES.map(({ size, label }) => (
          <QRCode key={size} value={DEMO_URL} size={size} label={label} />
        ))}
      </div>
    </ShowcaseCard>

    <ShowcaseCard
      title="Error Correction Level"
      description="Level cao hơn giúp QR vẫn đọc được khi bị che khuất một phần. Dùng level H khi nhúng logo."
    >
      <div className="flex flex-wrap items-end gap-8">
        {ERROR_LEVELS.map(({ level, desc }) => (
          <QRCode key={level} value={DEMO_URL} level={level} label={`Level ${level}`} description={desc} />
        ))}
      </div>
    </ShowcaseCard>

    <ShowcaseCard title="Custom Colors">
      <div className="flex flex-wrap items-end gap-8">
        {CUSTOM_COLORS.map(({ fgColor, bgColor, label }) => (
          <QRCode key={label} value={GITHUB_URL} fgColor={fgColor} bgColor={bgColor} label={label} />
        ))}
      </div>
    </ShowcaseCard>

    <ShowcaseCard
      title="With Logo (imageSettings)"
      description="Dùng level H để đảm bảo QR vẫn đọc được khi có ảnh che giữa."
    >
      <QRCode
        value={GITHUB_URL}
        size="lg"
        level="H"
        label="GitHub — level H + logo"
        imageSettings={{
          src: 'https://github.githubassets.com/favicons/favicon.svg',
          width: 40,
          height: 40,
          excavate: true,
        }}
      />
    </ShowcaseCard>

    <ShowcaseCard title="Renderer & Download">
      <div className="flex flex-wrap items-end gap-10">
        <QRCode
          value={DEMO_URL}
          renderer="svg"
          downloadable
          label="SVG renderer"
          description="Tải xuống định dạng .svg"
          downloadFilename="basuicn-qr"
        />
        <QRCode
          value={DEMO_URL}
          renderer="canvas"
          downloadable
          label="Canvas renderer"
          description="Tải xuống định dạng .png"
          downloadFilename="basuicn-qr"
        />
      </div>
    </ShowcaseCard>

    <ShowcaseCard title="Label & Description">
      <QRCode
        value={DEMO_URL}
        label="Basuicn Design System"
        description="Quét để truy cập trang web chính thức"
        size="lg"
      />
    </ShowcaseCard>

    <ShowcaseCard title="Custom Pixel Size">
      <QRCode value={DEMO_URL} pixelSize={180} label="pixelSize={180}" />
    </ShowcaseCard>

    {/* Props reference */}
    <div className="mt-10 rounded-xl border border-border overflow-hidden">
      <div className="bg-muted/50 px-6 py-4 border-b border-border">
        <h2 className="text-base font-semibold text-foreground">Props</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/30">
            <tr>
              <th className="text-left px-6 py-3 font-medium text-foreground">Prop</th>
              <th className="text-left px-6 py-3 font-medium text-foreground">Type</th>
              <th className="text-left px-6 py-3 font-medium text-foreground">Default</th>
              <th className="text-left px-6 py-3 font-medium text-foreground">Mô tả</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {PROPS_DOC.map((row) => (
              <tr key={row.prop} className="hover:bg-muted/20 transition-colors">
                <td className="px-6 py-3 font-mono text-primary">{row.prop}</td>
                <td className="px-6 py-3 font-mono text-xs text-muted-foreground whitespace-nowrap">{row.type}</td>
                <td className="px-6 py-3 font-mono text-xs text-muted-foreground">{row.default}</td>
                <td className="px-6 py-3 text-foreground/80">{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Usage guide */}
    <div className="mt-10 rounded-xl border border-border overflow-hidden">
      <div className="bg-muted/50 px-6 py-4 border-b border-border">
        <h2 className="text-base font-semibold text-foreground">Cách dùng</h2>
      </div>
      <div className="p-6 space-y-4 text-sm text-foreground/80">
        <div>
          <p className="font-medium text-foreground mb-1">1. Basic</p>
          <pre className="bg-muted rounded-lg px-4 py-3 text-xs overflow-x-auto font-mono">{`import { QRCode } from '@components/ui/qrcode';

<QRCode value="https://example.com" />`}</pre>
        </div>
        <div>
          <p className="font-medium text-foreground mb-1">2. Tuỳ chỉnh kích thước & màu sắc</p>
          <pre className="bg-muted rounded-lg px-4 py-3 text-xs overflow-x-auto font-mono">{`<QRCode
  value="https://example.com"
  size="lg"
  fgColor="#7132f5"
  bgColor="#ffffff"
  label="Website của tôi"
/>`}</pre>
        </div>
        <div>
          <p className="font-medium text-foreground mb-1">3. Nhúng logo</p>
          <pre className="bg-muted rounded-lg px-4 py-3 text-xs overflow-x-auto font-mono">{`<QRCode
  value="https://example.com"
  level="H"
  size="lg"
  imageSettings={{
    src: '/logo.png',
    width: 40,
    height: 40,
    excavate: true,
  }}
/>`}</pre>
        </div>
        <div>
          <p className="font-medium text-foreground mb-1">4. Cho phép tải xuống</p>
          <pre className="bg-muted rounded-lg px-4 py-3 text-xs overflow-x-auto font-mono">{`{/* SVG → tải .svg */}
<QRCode value="https://example.com" downloadable downloadFilename="my-qr" />

{/* Canvas → tải .png */}
<QRCode value="https://example.com" renderer="canvas" downloadable />`}</pre>
        </div>
      </div>
    </div>
  </div>
);

export default QRCodePage;
