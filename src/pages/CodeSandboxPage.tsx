import { CodeSandbox } from '@components/ui/code-sandbox/CodeSandbox';

// Trang này dùng -m-6 để cancel p-6 của DashboardLayout,
// cho phép IDE chiếm toàn bộ không gian nội dung.
const CodeSandboxPage = () => (
  <div
    className="-m-6 flex flex-col border-t border-border/50"
    style={{ height: 'calc(100vh - 60px)' }}
  >
    {/* Compact header */}
    <div className="px-6 py-3 shrink-0 bg-background border-b border-border flex items-center gap-4">
      <div>
        <h1 className="text-base font-semibold leading-none">Code Sandbox</h1>
        <p className="text-xs text-muted-foreground mt-1">
          Viết, chạy và test React components trực tiếp trên trình duyệt
        </p>
      </div>
    </div>

    {/* IDE fills remaining height */}
    <div className="flex-1 min-h-0">
      <CodeSandbox />
    </div>
  </div>
);

export default CodeSandboxPage;
