import * as React from 'react';
import { TableContents } from '@/components/ui/table-contents/TableContents';
import type { TocItem } from '@/components/ui/table-contents/TableContents';

// ─── TOC definition ──────────────────────────────────────────────────────────
const TOC_ITEMS: TocItem[] = [
  { id: 'gioi-thieu', label: 'Giới thiệu', level: 1 },
  { id: 'cai-dat', label: 'Cài đặt', level: 1 },
  { id: 'co-ban', label: 'Cơ bản', level: 2 },
  { id: 'nang-cao', label: 'Nâng cao', level: 2 },
  { id: 'su-dung', label: 'Cách sử dụng', level: 1 },
  { id: 'props', label: 'Props & API', level: 2 },
  { id: 'vi-du', label: 'Ví dụ thực tế', level: 2 },
  { id: 'accessibility', label: 'Accessibility', level: 3 },
  { id: 'tuy-chinh', label: 'Tuỳ chỉnh giao diện', level: 1 },
  { id: 'cau-hoi', label: 'Câu hỏi thường gặp', level: 1 },
];

// ─── Section helper ───────────────────────────────────────────────────────────
const Section: React.FC<{ id: string; title: string; level?: 1 | 2 | 3; children: React.ReactNode }> = ({
  id, title, level = 1, children,
}) => {
  const Tag = level === 1 ? 'h2' : level === 2 ? 'h3' : 'h4';
  const sizeClass =
    level === 1 ? 'text-2xl font-bold mt-8 mb-4' :
      level === 2 ? 'text-xl font-semibold mt-8 mb-3' :
        'text-base font-semibold mt-6 mb-2 text-muted-foreground';

  return (
    <section id={id}>
      <Tag className={sizeClass}>{title}</Tag>
      {children}
    </section>
  );
};

// ─── Prose helpers ────────────────────────────────────────────────────────────
const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="mb-4 leading-7 text-muted-foreground">{children}</p>
);

const Code: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">{children}</code>
);

const CodeBlock: React.FC<{ children: string }> = ({ children }) => (
  <pre className="mb-4 overflow-x-auto rounded-lg border border-border bg-muted/60 p-4 text-sm leading-6 text-foreground">
    <code>{children}</code>
  </pre>
);

const PropRow: React.FC<{ name: string; type: string; def?: string; desc: string }> = ({ name, type, def, desc }) => (
  <tr className="border-b border-border last:border-0">
    <td className="py-2 pr-4 font-mono text-sm font-medium text-primary">{name}</td>
    <td className="py-2 pr-4 font-mono text-sm text-muted-foreground">{type}</td>
    <td className="py-2 pr-4 text-sm text-muted-foreground">{def ?? '—'}</td>
    <td className="py-2 text-sm text-foreground">{desc}</td>
  </tr>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
const TableContentsPage: React.FC = () => (
  <div className="mx-auto max-w-7xl  ">
    {/* Header */}
    

    {/* Two-column layout */}
    <div className="flex gap-20">
      
      {/* ── Main content ─────────────────────────────────────────────────── */}
      <article className="min-w-0 flex-1">

        <Section id="gioi-thieu" title="Giới thiệu">
          <P>
            <Code>TableContents</Code> là component điều hướng kiểu "On this page" — phổ biến
            trong trang tài liệu kỹ thuật như GitHub Docs, MDN, hay Tailwind CSS. Nó theo dõi
            section nào đang trong viewport và highlight item tương ứng trong danh sách.
          </P>
          <P>
            Component dùng <Code>IntersectionObserver</Code> để phát hiện section đang active,
            và <Code>window.scrollTo</Code> với <Code>behavior: smooth</Code> để scroll mượt khi
            click. Không phụ thuộc thư viện ngoài, hoàn toàn headless.
          </P>
        </Section>

        <Section id="cai-dat" title="Cài đặt">
          <P>Component nằm trong thư mục UI và có thể import trực tiếp:</P>
          <CodeBlock>{`import { TableContents } from '@/components/ui/table-contents/TableContents';
import type { TocItem } from '@/components/ui/table-contents/TableContents';`}</CodeBlock>
        </Section>

        <Section id="co-ban" title="Cơ bản" level={2}>
          <P>
            Truyền mảng <Code>items</Code> với <Code>id</Code> khớp với thuộc tính <Code>id</Code>
            của các heading/section trong trang. Component tự quan sát và cập nhật trạng thái active.
          </P>
          <CodeBlock>{`const TOC: TocItem[] = [
  { id: 'intro',    label: 'Giới thiệu',  level: 1 },
  { id: 'install',  label: 'Cài đặt',     level: 1 },
  { id: 'basic',    label: 'Cơ bản',      level: 2 },
  { id: 'advanced', label: 'Nâng cao',    level: 2 },
];

<TableContents items={TOC} />`}</CodeBlock>
        </Section>

        <Section id="nang-cao" title="Nâng cao" level={2}>
          <P>
            Khi layout có sticky header, truyền <Code>offset</Code> bằng chiều cao header để
            scroll dừng đúng vị trí. Mặc định là <Code>80</Code>px.
          </P>
          <CodeBlock>{`<TableContents
  items={TOC}
  offset={64}            // chiều cao header = 64px
  title="Trong bài này"  // custom tiêu đề, mặc định "Trên trang này"
  className="w-56"       // tuỳ chỉnh width
/>`}</CodeBlock>
          <P>
            Component hỗ trợ 3 cấp độ đầu mục thông qua trường <Code>level</Code>. Cấp 1 là
            heading chính, cấp 2 và 3 được thụt vào để thể hiện phân cấp:
          </P>
          <CodeBlock>{`{ id: 'section',    label: 'Section',    level: 1 }  // pl-3
{ id: 'subsection', label: 'Subsection', level: 2 }  // pl-5
{ id: 'detail',     label: 'Detail',     level: 3 }  // pl-8 text-xs`}</CodeBlock>
        </Section>

        <Section id="su-dung" title="Cách sử dụng">
          <P>
            Kết hợp <Code>TableContents</Code> với layout hai cột — content bên trái, TOC sticky
            bên phải. Đây là pattern phổ biến nhất trong documentation sites:
          </P>
          <CodeBlock>{`const Page = () => (
  <div className="flex gap-12">
    {/* Main content */}
    <article className="min-w-0 flex-1">
      <section id="intro">
        <h2>Giới thiệu</h2>
        <p>Nội dung section 1...</p>
      </section>
      <section id="install">
        <h2>Cài đặt</h2>
        <p>Nội dung section 2...</p>
      </section>
    </article>

    {/* Sticky TOC */}
    <aside className="hidden xl:block w-52 shrink-0">
      <div className="sticky top-24">
        <TableContents items={TOC_ITEMS} offset={80} />
      </div>
    </aside>
  </div>
);`}</CodeBlock>
        </Section>

        <Section id="props" title="Props & API" level={2}>
          <P>Tất cả props của <Code>TableContents</Code>:</P>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-left">
              <thead className="border-b border-border bg-muted/50 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-3 py-2.5">Prop</th>
                  <th className="px-3 py-2.5">Type</th>
                  <th className="px-3 py-2.5">Default</th>
                  <th className="px-3 py-2.5">Mô tả</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border px-3">
                <PropRow name="items" type="TocItem[]" desc="Danh sách các mục điều hướng" />
                <PropRow name="offset" type="number" def="80" desc="Khoảng cách (px) từ top khi scroll — dành cho sticky header" />
                <PropRow name="title" type="string" def="'Trên trang này'" desc="Tiêu đề hiển thị phía trên danh sách" />
                <PropRow name="className" type="string" desc="Class CSS tùy chỉnh cho thẻ nav ngoài cùng" />
              </tbody>
            </table>
          </div>

          <div className="mt-4 overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-left">
              <thead className="border-b border-border bg-muted/50 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-3 py-2.5">TocItem field</th>
                  <th className="px-3 py-2.5">Type</th>
                  <th className="px-3 py-2.5">Mô tả</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border px-3">
                <PropRow name="id" type="string" def="" desc="Khớp với id của phần tử DOM tương ứng" />
                <PropRow name="label" type="string" def="" desc="Văn bản hiển thị trong TOC" />
                <PropRow name="level" type="1 | 2 | 3" def="1" desc="Cấp độ heading — ảnh hưởng thụt lề và font size" />
              </tbody>
            </table>
          </div>
        </Section>

        <Section id="vi-du" title="Ví dụ thực tế" level={2}>
          <P>
            Component đang được dùng ngay trên trang này. Hãy scroll xuống hoặc click vào các mục
            bên phải để thấy hiệu ứng highlight và scroll mượt. Trên màn hình nhỏ (<Code>xl</Code>),
            TOC sẽ bị ẩn — chỉ hiện từ breakpoint <Code>xl</Code> (1280px) trở lên.
          </P>
        </Section>

        <Section id="accessibility" title="Accessibility" level={3}>
          <P>
            Component render một thẻ <Code>{'<nav>'}</Code> với <Code>aria-label="Table of contents"</Code>,
            giúp screen reader nhận diện đúng. Mỗi item là một <Code>{'<button>'}</Code> với
            <Code>aria-current="location"</Code> khi đang active — tiêu chuẩn WAI-ARIA cho điều hướng
            nội trang. Màu active dùng token <Code>primary</Code> đảm bảo contrast ratio ≥ 4.5:1.
          </P>
        </Section>

        <Section id="tuy-chinh" title="Tuỳ chỉnh giao diện">
          <P>
            TOC dùng <Code>border-l border-border</Code> cho dải dọc bên trái và <Code>-ml-px border-l-2
              border-primary</Code> cho item active — tạo hiệu ứng "fill in" trên border mà không cần
            position absolute. Để thay màu active, override biến CSS <Code>--primary</Code> trong theme.
          </P>
          <CodeBlock>{`/* Thay màu active indicator */
:root {
  --primary: 261 84% 57%; /* hsl */
}

/* Hoặc thêm className để override trực tiếp */
<TableContents
  items={TOC}
  className="[--primary:theme(colors.rose.500)]"
/>`}</CodeBlock>
        </Section>

        <Section id="cau-hoi" title="Câu hỏi thường gặp">
          <P>
            <strong className="text-foreground">TOC không highlight đúng section?</strong>{' '}
            Kiểm tra <Code>id</Code> của section khớp chính xác với <Code>id</Code> trong <Code>TocItem</Code>.
            Nếu section quá ngắn, IntersectionObserver có thể không kích hoạt — thêm <Code>min-h-[200px]</Code>
            hoặc điều chỉnh <Code>rootMargin</Code> trong hook.
          </P>
          <P>
            <strong className="text-foreground">Scroll không đúng vị trí?</strong>{' '}
            Truyền <Code>offset</Code> bằng chiều cao thực của sticky header. Nếu dùng layout
            này (header 64px), set <Code>offset={'{'}64{'}'}</Code>.
          </P>
          <P>
            <strong className="text-foreground">Muốn TOC luôn hiện trên mobile?</strong>{' '}
            Bỏ class <Code>hidden xl:block</Code> trên thẻ <Code>aside</Code>, hoặc đặt TOC vào
            một <Code>Drawer</Code> / <Code>Sheet</Code> kích hoạt bằng nút "Mục lục".
          </P>
        </Section>
      </article>

      {/* ── Sticky TOC ────────────────────────────────────────────────────── */}
      <aside className="hidden xl:block w-52 shrink-0">
        <div className="sticky top-10">
          <TableContents items={TOC_ITEMS} offset={80} />
        </div>
      </aside>
    </div>

  </div>
);

export default TableContentsPage;
