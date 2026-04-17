import React from 'react';
import { PageHeader, ShowcaseCard } from '@/components/ui/Showcase';
import { TreeView, type TreeNode } from '@/components/ui/tree-view/TreeView';
import {
  Folder,
  FileCode,
  FileJson,
  FileImage,
  Settings,
  Globe,
  Database,
  Lock,
} from 'lucide-react';

const projectTree: TreeNode[] = [
  {
    id: 'src',
    label: 'src',
    children: [
      {
        id: 'components',
        label: 'components',
        children: [
          {
            id: 'ui',
            label: 'ui',
            children: [
              { id: 'button', label: 'Button.tsx', icon: <FileCode className="h-4 w-4 text-blue-500" /> },
              { id: 'input', label: 'Input.tsx', icon: <FileCode className="h-4 w-4 text-blue-500" /> },
              { id: 'dialog', label: 'Dialog.tsx', icon: <FileCode className="h-4 w-4 text-blue-500" /> },
              { id: 'table', label: 'Table.tsx', icon: <FileCode className="h-4 w-4 text-blue-500" /> },
            ],
          },
          {
            id: 'layout',
            label: 'layout',
            children: [
              { id: 'sidebar', label: 'Sidebar.tsx', icon: <FileCode className="h-4 w-4 text-blue-500" /> },
              { id: 'header', label: 'Header.tsx', icon: <FileCode className="h-4 w-4 text-blue-500" /> },
            ],
          },
        ],
      },
      {
        id: 'pages',
        label: 'pages',
        children: [
          { id: 'home', label: 'HomePage.tsx', icon: <FileCode className="h-4 w-4 text-green-500" /> },
          { id: 'about', label: 'AboutPage.tsx', icon: <FileCode className="h-4 w-4 text-green-500" /> },
          { id: 'dashboard', label: 'DashboardPage.tsx', icon: <FileCode className="h-4 w-4 text-green-500" /> },
        ],
      },
      {
        id: 'hooks',
        label: 'hooks',
        children: [
          { id: 'useCopy', label: 'useCopy.ts', icon: <FileCode className="h-4 w-4 text-purple-500" /> },
          { id: 'useTheme', label: 'useTheme.ts', icon: <FileCode className="h-4 w-4 text-purple-500" /> },
        ],
      },
      { id: 'app', label: 'App.tsx', icon: <FileCode className="h-4 w-4 text-blue-500" /> },
      { id: 'main', label: 'main.tsx', icon: <FileCode className="h-4 w-4 text-blue-500" /> },
    ],
  },
  { id: 'package', label: 'package.json', icon: <FileJson className="h-4 w-4 text-yellow-500" /> },
  { id: 'tsconfig', label: 'tsconfig.json', icon: <FileJson className="h-4 w-4 text-yellow-500" /> },
  { id: 'readme', label: 'README.md', icon: <FileCode className="h-4 w-4 text-muted-foreground" /> },
];

const settingsTree: TreeNode[] = [
  {
    id: 'general',
    label: 'Cài đặt chung',
    icon: <Settings className="h-4 w-4 text-muted-foreground" />,
    children: [
      { id: 'lang', label: 'Ngôn ngữ', icon: <Globe className="h-4 w-4 text-blue-500" /> },
      { id: 'theme', label: 'Giao diện', icon: <Settings className="h-4 w-4 text-purple-500" /> },
    ],
  },
  {
    id: 'data',
    label: 'Dữ liệu',
    icon: <Database className="h-4 w-4 text-muted-foreground" />,
    children: [
      { id: 'backup', label: 'Sao lưu' },
      { id: 'export', label: 'Xuất dữ liệu' },
      { id: 'import', label: 'Nhập dữ liệu' },
    ],
  },
  {
    id: 'security',
    label: 'Bảo mật',
    icon: <Lock className="h-4 w-4 text-muted-foreground" />,
    children: [
      { id: 'password', label: 'Đổi mật khẩu' },
      { id: '2fa', label: 'Xác thực 2 bước' },
      { id: 'sessions', label: 'Phiên đăng nhập' },
    ],
  },
];

const mediaTree: TreeNode[] = [
  {
    id: 'images',
    label: 'Hình ảnh',
    children: [
      { id: 'avatar', label: 'avatar.png', icon: <FileImage className="h-4 w-4 text-pink-500" /> },
      { id: 'banner', label: 'banner.jpg', icon: <FileImage className="h-4 w-4 text-pink-500" /> },
      { id: 'logo', label: 'logo.svg', icon: <FileImage className="h-4 w-4 text-orange-500" /> },
      {
        id: 'icons',
        label: 'icons',
        children: [
          { id: 'icon-home', label: 'home.svg', icon: <FileImage className="h-4 w-4 text-orange-500" /> },
          { id: 'icon-user', label: 'user.svg', icon: <FileImage className="h-4 w-4 text-orange-500" /> },
          { id: 'icon-star', label: 'star.svg', icon: <FileImage className="h-4 w-4 text-orange-500" /> },
        ],
      },
    ],
  },
  {
    id: 'docs-folder',
    label: 'Tài liệu',
    children: [
      { id: 'doc-api', label: 'API.md' },
      { id: 'doc-guide', label: 'Guide.md' },
    ],
  },
];

const TreeViewPage = () => {
  const [selectedProject, setSelectedProject] = React.useState<string>('button');
  const [selectedSettings, setSelectedSettings] = React.useState<string>('');

  return (
    <div className="max-w-5xl">
      <PageHeader
        title="Tree View"
        description="Component hiển thị dữ liệu phân cấp dạng cây với expand/collapse và keyboard navigation."
      />

      {/* ── File explorer ─────────────────────────────────────────── */}
      <ShowcaseCard
        title="File Explorer"
        description="Cây thư mục giống IDE — click node để chọn, click folder để expand/collapse."
      >
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-border rounded-lg p-3 bg-background">
            <TreeView
              data={projectTree}
              selectedId={selectedProject}
              onSelect={setSelectedProject}
              defaultExpanded={['src', 'components', 'ui']}
            />
          </div>
          <div className="flex items-start pt-4">
            <div className="text-sm">
              <p className="text-muted-foreground">File đang chọn:</p>
              <p className="font-semibold text-foreground mt-1">{selectedProject || '(chưa chọn)'}</p>
            </div>
          </div>
        </div>
      </ShowcaseCard>

      {/* ── Settings tree ─────────────────────────────────────────── */}
      <ShowcaseCard
        title="Cây cài đặt"
        description="Dùng TreeView cho menu cài đặt phân cấp."
      >
        <div className="w-full max-w-sm border border-border rounded-lg p-3 bg-background">
          <TreeView
            data={settingsTree}
            selectedId={selectedSettings}
            onSelect={setSelectedSettings}
            defaultExpanded={['general']}
          />
        </div>
      </ShowcaseCard>

      {/* ── Media library ─────────────────────────────────────────── */}
      <ShowcaseCard
        title="Thư viện media"
        description="TreeView với icons custom cho từng loại file."
      >
        <div className="w-full max-w-sm border border-border rounded-lg p-3 bg-background">
          <TreeView
            data={mediaTree}
            defaultExpanded={['images', 'icons']}
          />
        </div>
      </ShowcaseCard>
    </div>
  );
};

export default TreeViewPage;
