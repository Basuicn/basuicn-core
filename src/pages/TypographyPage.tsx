import { PageHeader, ShowcaseCard } from "@components/ui/Showcase";
import {
  Text, Heading, Paragraph, Lead, Blockquote,
  Code, Kbd, Link, Mark,
} from "@components/ui/typography/Typography";

const TypographyPage = () => (
  <div className="max-w-full">
    <PageHeader title="Typography" description="Hệ thống typography đầy đủ — text, heading, paragraph, code, kbd và hơn thế nữa." />

    {/* ── Heading ────────────────────────────────────────────── */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

    <ShowcaseCard
      title="Heading"
      code={`<Heading level={1}>Heading 1</Heading>\n<Heading level={2}>Heading 2</Heading>\n<Heading level={3}>Heading 3</Heading>\n<Heading level={4}>Heading 4</Heading>\n<Heading level={5}>Heading 5</Heading>\n<Heading level={6}>Heading 6</Heading>`}
    >
      <div className="w-full space-y-3">
        <Heading level={1}>Heading 1 — The quick brown fox</Heading>
        <Heading level={2}>Heading 2 — The quick brown fox</Heading>
        <Heading level={3}>Heading 3 — The quick brown fox</Heading>
        <Heading level={4}>Heading 4 — The quick brown fox</Heading>
        <Heading level={5}>Heading 5 — The quick brown fox</Heading>
        <Heading level={6}>Heading 6 — The quick brown fox</Heading>
      </div>
    </ShowcaseCard>

    {/* ── Text Sizes ─────────────────────────────────────────── */}
    <ShowcaseCard
      title="Text — Sizes"
      code={`<Text size="xs">Extra Small</Text>\n<Text size="sm">Small</Text>\n<Text size="md">Medium (default)</Text>\n<Text size="lg">Large</Text>\n<Text size="xl">Extra Large</Text>\n<Text size="2xl">2XL</Text>\n<Text size="3xl">3XL</Text>`}
    >
      <div className="w-full flex flex-col gap-2">
        <Text size="xs">Extra Small (xs)</Text>
        <Text size="sm">Small (sm)</Text>
        <Text size="md">Medium — default (md)</Text>
        <Text size="lg">Large (lg)</Text>
        <Text size="xl">Extra Large (xl)</Text>
        <Text size="2xl">2XL</Text>
        <Text size="3xl">3XL</Text>
      </div>
    </ShowcaseCard>

    {/* ── Text Weights ───────────────────────────────────────── */}
    <ShowcaseCard
      title="Text — Weights"
      code={`<Text weight="thin">Thin</Text>\n<Text weight="light">Light</Text>\n<Text weight="normal">Normal</Text>\n<Text weight="medium">Medium</Text>\n<Text weight="semibold">Semibold</Text>\n<Text weight="bold">Bold</Text>\n<Text weight="extrabold">Extrabold</Text>`}
    >
      <div className="w-full flex flex-col gap-2">
        <Text weight="thin">Thin (100)</Text>
        <Text weight="light">Light (300)</Text>
        <Text weight="normal">Normal (400)</Text>
        <Text weight="medium">Medium (500)</Text>
        <Text weight="semibold">Semibold (600)</Text>
        <Text weight="bold">Bold (700)</Text>
        <Text weight="extrabold">Extrabold (800)</Text>
      </div>
    </ShowcaseCard>

    {/* ── Text Colors ────────────────────────────────────────── */}
    <ShowcaseCard
      title="Text — Colors"
      code={`<Text color="default">Default</Text>\n<Text color="muted">Muted</Text>\n<Text color="primary">Primary</Text>\n<Text color="success">Success</Text>\n<Text color="warning">Warning</Text>\n<Text color="danger">Danger</Text>`}
    >
      <Text color="default">Default</Text>
      <Text color="muted">Muted</Text>
      <Text color="primary">Primary</Text>
      <Text color="success">Success</Text>
      <Text color="warning">Warning</Text>
      <Text color="danger">Danger</Text>
    </ShowcaseCard>

    {/* ── Decorations & Modifiers ────────────────────────────── */}
    <ShowcaseCard
      title="Decorations & Modifiers"
      code={`<Text strong>Strong / Bold</Text>\n<Text italic>Italic text</Text>\n<Text underline>Underlined</Text>\n<Text strikethrough>Strikethrough</Text>\n<Text gradient>Gradient text</Text>\n<Text mark>Marked / Highlighted</Text>\n<Text code>inline code</Text>\n<Text numeric>1,234,567.89</Text>`}
    >
      <div className="w-full flex flex-col gap-2">
        <Text size="lg" strong>Strong — Bold text</Text>
        <Text size="lg" italic>Italic — slanted text</Text>
        <Text size="lg" underline>Underlined text</Text>
        <Text size="lg" strikethrough>Strikethrough text</Text>
        <Text size="lg" gradient>Gradient text effect</Text>
        <Text size="lg" mark>Marked / Highlighted text</Text>
        <Text size="md" code>const hello = "inline code"</Text>
        <Text size="lg" numeric>1,234,567.89</Text>
      </div>
    </ShowcaseCard>

    {/* ── Copyable ───────────────────────────────────────────── */}
    <ShowcaseCard
      title="Copyable"
      description="Hover để thấy icon copy. Click để sao chép nội dung."
      code={`<Text copyable>Hover me and click to copy this text</Text>\n<Heading level={3} copyable>Copyable Heading</Heading>\n<Code copyable>npm install @ui/components</Code>`}
    >
      <div className="w-full flex flex-col gap-4">
        <Text size="md" copyable>Hover và click để copy text này</Text>
        <Heading level={3} copyable>Copyable Heading — click me</Heading>
        <div><Code copyable>npm install @ui/components</Code></div>
      </div>
    </ShowcaseCard>

    {/* ── Truncate & Line Clamp ──────────────────────────────── */}
    <ShowcaseCard
      title="Truncate & Line Clamp"
      code={`<Text truncate>Very long text...</Text>\n<Text as="p" lines={2}>Multi-line clamped text...</Text>\n<Text as="p" lines={3}>Three lines...</Text>`}
    >
      <div className="w-full space-y-4">
        <div className="max-w-xs border border-dashed border-border rounded p-2">
          <Text truncate>
            Đây là một đoạn văn bản rất dài sẽ bị cắt bớt khi vượt quá chiều rộng container với dấu ba chấm ở cuối.
          </Text>
        </div>
        <div className="max-w-sm border border-dashed border-border rounded p-2">
          <Text as="p" lines={2}>
            Đây là đoạn văn nhiều dòng được giới hạn tối đa 2 dòng. Nếu nội dung dài hơn 2 dòng sẽ bị ẩn đi và hiển thị dấu ba chấm ở cuối dòng thứ hai.
          </Text>
        </div>
        <div className="max-w-sm border border-dashed border-border rounded p-2">
          <Text as="p" lines={3}>
            Ba dòng tối đa. Nội dung dài hơn sẽ bị cắt. Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation.
          </Text>
        </div>
      </div>
    </ShowcaseCard>

    {/* ── Paragraph & Lead ───────────────────────────────────── */}
    <ShowcaseCard
      title="Paragraph & Lead"
      code={`<Lead>Lead paragraph — intro text larger than body.</Lead>\n<Paragraph>Regular paragraph with relaxed line height...</Paragraph>\n<Paragraph color="muted">Muted paragraph...</Paragraph>`}
    >
      <div className="w-full space-y-4">
        <Lead>Lead paragraph — intro text dành cho phần mở đầu, lớn hơn body.</Lead>
        <Paragraph>
          Regular paragraph với line-height relaxed. Typography tốt giúp người đọc dễ theo dõi nội dung hơn, giảm mỏi mắt và tạo cảm giác chuyên nghiệp cho giao diện.
        </Paragraph>
        <Paragraph color="muted">
          Muted paragraph — dùng cho chú thích, mô tả phụ hoặc nội dung ít quan trọng hơn.
        </Paragraph>
      </div>
    </ShowcaseCard>

    {/* ── Blockquote ─────────────────────────────────────────── */}
    <ShowcaseCard
      title="Blockquote"
      code={`<Blockquote cite="Steve Jobs">\n  Design is not just what it looks like. Design is how it works.\n</Blockquote>`}
    >
      <div className="w-full space-y-4">
        <Blockquote cite="Steve Jobs">
          Design is not just what it looks like and feels like. Design is how it works.
        </Blockquote>
        <Blockquote>
          Without a cite attribute — trích dẫn không có nguồn, chỉ hiển thị nội dung với border.
        </Blockquote>
      </div>
    </ShowcaseCard>

    {/* ── Code (inline) ──────────────────────────────────────── */}
    <ShowcaseCard
      title="Code — Inline"
      code={`<Code>const x = 42</Code>\n<Code copyable>npm install react</Code>`}
    >
      <div className="w-full flex flex-col gap-3">
        <Paragraph>
          Sử dụng <Code>useState</Code> hook để quản lý state trong React functional component.
        </Paragraph>
        <Paragraph>
          Chạy lệnh <Code copyable>npm install @base-ui/react</Code> để cài đặt thư viện.
        </Paragraph>
        <Paragraph>
          Giá trị <Code>null</Code> và <Code>undefined</Code> khác nhau trong JavaScript.
        </Paragraph>
      </div>
    </ShowcaseCard>

    {/* ── Kbd ────────────────────────────────────────────────── */}
    <ShowcaseCard
      title="Kbd — Keyboard Shortcut"
      code={`<Kbd keys={['Ctrl', 'C']} />\n<Kbd keys={['⌘', 'Shift', 'P']} />\n<Kbd keys={['Alt', 'F4']} />`}
    >
      <div className="w-full flex flex-col gap-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">Copy <Kbd keys={['Ctrl', 'C']} /></div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">Paste <Kbd keys={['Ctrl', 'V']} /></div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">Undo <Kbd keys={['Ctrl', 'Z']} /></div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">Save <Kbd keys={['Ctrl', 'S']} /></div>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">Command Palette <Kbd keys={['⌘', 'Shift', 'P']} /></div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">Close Tab <Kbd keys={['⌘', 'W']} /></div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">Search <Kbd keys={['⌘', 'K']} /></div>
        </div>
      </div>
    </ShowcaseCard>

    {/* ── Link ───────────────────────────────────────────────── */}
    <ShowcaseCard
      title="Link"
      code={`<Link href="#">Internal link</Link>\n<Link href="https://example.com" external>External link</Link>\n<Link href="#" underline="always">Always underlined</Link>\n<Link href="#" color="danger">Danger link</Link>`}
    >
      <div className="w-full flex flex-col gap-3">
        <div className="flex flex-wrap gap-4">
          <Link href="#">Internal link (hover)</Link>
          <Link href="https://example.com" external>External link</Link>
          <Link href="#" underline="always">Always underlined</Link>
          <Link href="#" underline="none">No underline</Link>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link href="#" color="primary">Primary</Link>
          <Link href="#" color="muted">Muted</Link>
          <Link href="#" color="danger">Danger</Link>
          <Link href="#" color="foreground">Foreground</Link>
        </div>
      </div>
    </ShowcaseCard>

    {/* ── Mark ───────────────────────────────────────────────── */}
    <ShowcaseCard
      title="Mark — Highlight"
      code={`<Mark>default highlight</Mark>\n<Mark variant="primary">primary</Mark>\n<Mark variant="success">success</Mark>\n<Mark variant="warning">warning</Mark>\n<Mark variant="danger">danger</Mark>`}
    >
      <div className="w-full space-y-3">
        <Paragraph>
          Tìm kiếm kết quả cho "<Mark>typography</Mark>" — 12 kết quả được tìm thấy trong tài liệu.
        </Paragraph>
        <div className="flex flex-wrap gap-2 items-center">
          <Mark>default</Mark>
          <Mark variant="primary">primary</Mark>
          <Mark variant="success">success</Mark>
          <Mark variant="warning">warning</Mark>
          <Mark variant="danger">danger</Mark>
        </div>
      </div>
    </ShowcaseCard>

    {/* ── Text Alignment ─────────────────────────────────────── */}
    <ShowcaseCard
      title="Alignment"
      code={`<Paragraph align="left">Left aligned</Paragraph>\n<Paragraph align="center">Center aligned</Paragraph>\n<Paragraph align="right">Right aligned</Paragraph>\n<Paragraph align="justify">Justify aligned...</Paragraph>`}
    >
      <div className="w-full space-y-2">
        <Paragraph align="left">Left — Văn bản căn trái (mặc định).</Paragraph>
        <Paragraph align="center">Center — Văn bản căn giữa.</Paragraph>
        <Paragraph align="right">Right — Văn bản căn phải.</Paragraph>
        <Paragraph align="justify">
          Justify — Văn bản căn đều hai bên. Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam.
        </Paragraph>
      </div>
    </ShowcaseCard>

    {/* ── Combined ───────────────────────────────────────────── */}
    <ShowcaseCard
      title="Combined Usage"
      description="Kết hợp nhiều component trong một đoạn nội dung thực tế."
      code={`<Heading level={2}>Getting Started</Heading>\n<Lead>Build modern UIs with our component library.</Lead>\n<Paragraph>Install with <Code copyable>npm install @ui/lib</Code>...</Paragraph>`}
    >
      <div className="w-full space-y-4 max-w-2xl">
        <Heading level={2}>Getting Started</Heading>
        <Lead>Build modern UIs with our component library — fast, accessible, customizable.</Lead>
        <Paragraph>
          Cài đặt bằng lệnh <Code copyable>npm install @ui/components</Code> rồi import các component cần dùng.
          Xem tài liệu đầy đủ tại <Link href="https://example.com" external>docs.example.com</Link>.
        </Paragraph>
        <Blockquote cite="Documentation">
          All components follow WAI-ARIA guidelines and support keyboard navigation out of the box.
        </Blockquote>
        <Paragraph color="muted" size="sm">
          Phím tắt: <Kbd keys={['⌘', 'K']} /> để mở command palette, <Kbd keys={['⌘', '/']} /> để tìm kiếm nhanh.
        </Paragraph>
      </div>
    </ShowcaseCard>
    </div>
  </div>
);

export default TypographyPage;
