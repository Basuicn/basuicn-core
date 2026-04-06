import * as React from 'react';
import { PageHeader, ShowcaseCard } from '@components/ui/Showcase';
import {
  MenuBar,
  MenuBarMenu,
  MenuBarTrigger,
  MenuBarButton,
  MenuBarContent,
  MenuBarItem,
  MenuBarSeparator,
  MenuBarLabel,
  MenuBarShortcut,
  MenuBarSub,
  MenuBarSubTrigger,
  MenuBarSubContent,
  MenuBarNav,
  type MenuBarMenuConfig,
} from '@components/ui/menu-bar/MenuBar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@components/ui/dialog/Dialog';
import {
  Bold,
  Italic,
  Underline,
  Copy,
  Scissors,
  Clipboard,
  Undo2,
  Redo2,
  ZoomIn,
  ZoomOut,
  Maximize,
  FileText,
  FolderOpen,
  Save,
  SaveAll,
  FilePlus,
  Printer,
  Settings,
  HelpCircle,
  Info,
  LayoutDashboard,
  Square,
  Tag,
  ChevronDown,
  ExternalLink,
  MousePointerClick,
  Layers,
} from 'lucide-react';

/* ─── Demo 1: Classic app-style menu bar (config-driven) ────────────────── */

const AppMenuDemo = () => {
  const [lastAction, setLastAction] = React.useState('');

  const act = (label: string) => () => setLastAction(label);

  const menus: MenuBarMenuConfig[] = [
    {
      id: 'file',
      label: 'File',
      items: [
        { id: 'new', label: 'New File', icon: <FilePlus />, type: 'button', onClick: act('New File'), shortcut: '⌘N' },
        { id: 'open', label: 'Open…', icon: <FolderOpen />, type: 'button', onClick: act('Open'), shortcut: '⌘O' },
        {
          id: 'recent',
          label: 'Open Recent',
          icon: <FileText />,
          children: [
            { id: 'r1', label: 'project-alpha.json', type: 'button', onClick: act('project-alpha') },
            { id: 'r2', label: 'design-tokens.ts', type: 'button', onClick: act('design-tokens') },
            { id: 'r3', label: 'routes.tsx', type: 'button', onClick: act('routes.tsx') },
          ],
        },
        {
          id: 'save',
          label: 'Save',
          icon: <Save />,
          type: 'button',
          onClick: act('Save'),
          shortcut: '⌘S',
          separator: true,
        },
        { id: 'save-all', label: 'Save All', icon: <SaveAll />, type: 'button', onClick: act('Save All'), shortcut: '⇧⌘S' },
        {
          id: 'print',
          label: 'Print…',
          icon: <Printer />,
          type: 'button',
          onClick: act('Print'),
          separator: true,
        },
      ],
    },
    {
      id: 'edit',
      label: 'Edit',
      items: [
        { id: 'undo', label: 'Undo', icon: <Undo2 />, type: 'button', onClick: act('Undo'), shortcut: '⌘Z' },
        { id: 'redo', label: 'Redo', icon: <Redo2 />, type: 'button', onClick: act('Redo'), shortcut: '⇧⌘Z' },
        {
          id: 'cut',
          label: 'Cut',
          icon: <Scissors />,
          type: 'button',
          onClick: act('Cut'),
          shortcut: '⌘X',
          separator: true,
        },
        { id: 'copy', label: 'Copy', icon: <Copy />, type: 'button', onClick: act('Copy'), shortcut: '⌘C' },
        { id: 'paste', label: 'Paste', icon: <Clipboard />, type: 'button', onClick: act('Paste'), shortcut: '⌘V' },
        {
          id: 'format',
          label: 'Format',
          separator: true,
          children: [
            { id: 'bold', label: 'Bold', icon: <Bold />, type: 'button', onClick: act('Bold'), shortcut: '⌘B' },
            { id: 'italic', label: 'Italic', icon: <Italic />, type: 'button', onClick: act('Italic'), shortcut: '⌘I' },
            { id: 'underline', label: 'Underline', icon: <Underline />, type: 'button', onClick: act('Underline'), shortcut: '⌘U' },
            {
              id: 'advanced',
              label: 'Advanced',
              children: [
                { id: 'strikethrough', label: 'Strikethrough', type: 'button', onClick: act('Strikethrough') },
                { id: 'superscript', label: 'Superscript', type: 'button', onClick: act('Superscript') },
                { id: 'subscript', label: 'Subscript', type: 'button', onClick: act('Subscript') },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'view',
      label: 'View',
      items: [
        { id: 'zoom-in', label: 'Zoom In', icon: <ZoomIn />, type: 'button', onClick: act('Zoom In'), shortcut: '⌘+' },
        { id: 'zoom-out', label: 'Zoom Out', icon: <ZoomOut />, type: 'button', onClick: act('Zoom Out'), shortcut: '⌘-' },
        { id: 'fullscreen', label: 'Full Screen', icon: <Maximize />, type: 'button', onClick: act('Full Screen'), shortcut: 'F11', separator: true },
      ],
    },
    {
      id: 'help',
      label: 'Help',
      items: [
        { id: 'docs', label: 'Documentation', icon: <HelpCircle />, type: 'external', href: 'https://base-ui.com' },
        { id: 'about', label: 'About', icon: <Info />, type: 'button', onClick: act('About'), separator: true },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      <MenuBarNav menus={menus} />
      {lastAction && (
        <p className="text-sm text-muted-foreground">
          Last action: <span className="font-medium text-foreground">{lastAction}</span>
        </p>
      )}
    </div>
  );
};

/* ─── Demo 2: Navigation menu bar with route links + active state ────────── */

const NavigationMenuDemo = () => {
  const navMenus: MenuBarMenuConfig[] = [
    {
      id: 'overview',
      label: 'Overview',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard />, type: 'link', href: '/' },
      ],
    },
    {
      id: 'general',
      label: 'General',
      items: [
        { id: 'button', label: 'Button', icon: <Square />, type: 'link', href: '/general/button' },
        { id: 'badge', label: 'Badge', icon: <Tag />, type: 'link', href: '/general/badge' },
        { id: 'typography', label: 'Typography', icon: <FileText />, type: 'link', href: '/general/typography' },
        { id: 'carousel', label: 'Carousel', icon: <Layers />, type: 'link', href: '/general/carousel', separator: true },
      ],
    },
    {
      id: 'overlays',
      label: 'Overlays',
      items: [
        { id: 'dropdown', label: 'Dropdown Menu', icon: <ChevronDown />, type: 'link', href: '/overlays/dropdown-menu' },
        { id: 'menubar', label: 'Menu Bar', icon: <Layers />, type: 'link', href: '/overlays/menu-bar' },
      ],
    },
    {
      id: 'external',
      label: 'External',
      items: [
        { id: 'base-ui', label: 'Base UI Docs', type: 'external', href: 'https://base-ui.com' },
        { id: 'tailwind', label: 'Tailwind CSS', type: 'external', href: 'https://tailwindcss.com' },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      <MenuBarNav menus={navMenus} />
      <p className="text-xs text-muted-foreground">
        Active routes are highlighted. Items with external links open in a new tab.
      </p>
    </div>
  );
};

/* ─── Demo 3: Mixed types — button / link / modal / external ─────────────── */

const MixedTypesDemo = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [lastClick, setLastClick] = React.useState('');

  return (
    <>
      <div className="flex flex-col gap-3">
        <MenuBar>
          <MenuBarMenu>
            <MenuBarTrigger>
              <MousePointerClick className="size-4" /> Actions
            </MenuBarTrigger>
            <MenuBarContent>
              <MenuBarLabel>Item Types</MenuBarLabel>
              <MenuBarSeparator />

              {/* Button */}
              <MenuBarItem onClick={() => setLastClick('Button clicked')}>
                <Square className="size-4" />
                Button item
                <MenuBarShortcut>⌘1</MenuBarShortcut>
              </MenuBarItem>

              {/* Link (router) */}
              <MenuBarItem
                active={window.location.pathname === '/'}
                onClick={() => setLastClick('Navigated to /')}
              >
                <LayoutDashboard className="size-4" />
                Link → Dashboard
                <MenuBarShortcut>⌘2</MenuBarShortcut>
              </MenuBarItem>

              {/* Modal */}
              <MenuBarItem onClick={() => { setModalOpen(true); setLastClick('Modal opened'); }}>
                <Layers className="size-4" />
                Open modal
                <MenuBarShortcut>⌘3</MenuBarShortcut>
              </MenuBarItem>

              <MenuBarSeparator />

              {/* External */}
              <MenuBarItem onClick={() => window.open('https://base-ui.com', '_blank', 'noopener')}>
                <ExternalLink className="size-4" />
                External link
                <ExternalLink className="ml-auto !size-3 opacity-50" />
              </MenuBarItem>

              <MenuBarSeparator />

              {/* Nested submenu */}
              <MenuBarSub>
                <MenuBarSubTrigger>
                  <ChevronDown className="size-4" /> Submenu L1
                </MenuBarSubTrigger>
                <MenuBarSubContent>
                  <MenuBarItem onClick={() => setLastClick('L1 Item A')}>Item A</MenuBarItem>
                  <MenuBarItem onClick={() => setLastClick('L1 Item B')}>Item B</MenuBarItem>
                  <MenuBarSub>
                    <MenuBarSubTrigger>Submenu L2</MenuBarSubTrigger>
                    <MenuBarSubContent>
                      <MenuBarItem onClick={() => setLastClick('L2 Item X')}>Item X</MenuBarItem>
                      <MenuBarItem onClick={() => setLastClick('L2 Item Y')}>Item Y</MenuBarItem>
                      <MenuBarSub>
                        <MenuBarSubTrigger>Submenu L3</MenuBarSubTrigger>
                        <MenuBarSubContent>
                          <MenuBarItem onClick={() => setLastClick('L3 Deep item')}>Deep item</MenuBarItem>
                        </MenuBarSubContent>
                      </MenuBarSub>
                    </MenuBarSubContent>
                  </MenuBarSub>
                </MenuBarSubContent>
              </MenuBarSub>

              <MenuBarItem disabled>
                <Settings className="size-4" /> Disabled item
              </MenuBarItem>
            </MenuBarContent>
          </MenuBarMenu>
        </MenuBar>

        {lastClick && (
          <p className="text-sm text-muted-foreground">
            Last: <span className="font-medium text-foreground">{lastClick}</span>
          </p>
        )}
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Opened from Menu Bar</DialogTitle>
            <DialogDescription>
              This dialog was triggered by a menu item of type <code className="bg-muted px-1 rounded text-xs">modal</code>.
              You can pass any <code className="bg-muted px-1 rounded text-xs">onClick</code> handler to control state.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

/* ─── Demo 4: Direct items (no dropdown) ────────────────────────────────── */

const DirectItemDemo = () => {
  const [lastClick, setLastClick] = React.useState('');

  const menus: MenuBarMenuConfig[] = [
    // Direct items — không có dropdown
    { id: 'home',   label: 'Home',   type: 'link',   href: '/',              icon: <LayoutDashboard /> },
    { id: 'notify', label: 'Notify', type: 'button', onClick: () => setLastClick('Notify clicked'), icon: <Info /> },
    { id: 'docs',   label: 'Docs',   type: 'external', href: 'https://base-ui.com', icon: <ExternalLink /> },
    // Dropdown bình thường — vẫn có items
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings />,
      items: [
        { id: 'profile',  label: 'Profile',  type: 'link',   href: '/general/avatar' },
        { id: 'theme',    label: 'Theme',    type: 'button', onClick: () => setLastClick('Theme') },
        { id: 'keyboard', label: 'Keyboard', type: 'button', onClick: () => setLastClick('Keyboard'), shortcut: '⌘,' },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      {/* Config-driven */}
      <div className="flex flex-col gap-1">
        <p className="text-xs text-muted-foreground font-medium">Config-driven (MenuBarNav)</p>
        <MenuBarNav menus={menus} />
      </div>

      {/* Primitive */}
      <div className="flex flex-col gap-1">
        <p className="text-xs text-muted-foreground font-medium">Primitive (MenuBarButton)</p>
        <MenuBar>
          <MenuBarButton onClick={() => setLastClick('Home (primitive)')}>
            <LayoutDashboard className="size-4" /> Home
          </MenuBarButton>
          <MenuBarButton onClick={() => setLastClick('Notify (primitive)')}>
            <Info className="size-4" /> Notify
          </MenuBarButton>
          <MenuBarMenu>
            <MenuBarTrigger>
              <Settings className="size-4" /> Settings
            </MenuBarTrigger>
            <MenuBarContent>
              <MenuBarItem onClick={() => setLastClick('Profile')}>Profile</MenuBarItem>
              <MenuBarItem onClick={() => setLastClick('Theme')}>Theme</MenuBarItem>
            </MenuBarContent>
          </MenuBarMenu>
        </MenuBar>
      </div>

      {lastClick && (
        <p className="text-sm text-muted-foreground">
          Last: <span className="font-medium text-foreground">{lastClick}</span>
        </p>
      )}
    </div>
  );
};

/* ─── Page ──────────────────────────────────────────────────────────────── */

const MenuBarPage = () => (
  <div className="max-w-4xl">
    <PageHeader
      title="Menu Bar"
      description="A horizontal menu bar with multi-level dropdowns. Supports link, button, modal, and external item types. Fully config-driven or composable with primitives."
    />

    <ShowcaseCard
      title="App-style menu bar (config-driven)"
      description="Pass a menus config array — nested children render as flyout submenus (unlimited depth)."
      code={`const menus: MenuBarMenuConfig[] = [
  {
    id: 'file', label: 'File',
    items: [
      { id: 'new',  label: 'New',  type: 'button', onClick: handleNew, shortcut: '⌘N', icon: <FilePlus /> },
      { id: 'open', label: 'Open', type: 'button', onClick: handleOpen, shortcut: '⌘O' },
      {
        id: 'recent', label: 'Open Recent',
        children: [
          { id: 'r1', label: 'project.json', type: 'button', onClick: () => {} },
          { id: 'r2', label: 'routes.tsx',   type: 'button', onClick: () => {} },
        ],
      },
      { id: 'save', label: 'Save', type: 'button', onClick: handleSave, separator: true },
    ],
  },
];

<MenuBarNav menus={menus} />`}
    >
      <AppMenuDemo />
    </ShowcaseCard>

    <ShowcaseCard
      title="Navigation menu bar with router links"
      description="Use type='link' with href to navigate. Active route is automatically highlighted."
      code={`<MenuBarNav menus={[
  {
    id: 'general', label: 'General',
    items: [
      { id: 'button', label: 'Button', type: 'link', href: '/general/button' },
      { id: 'badge',  label: 'Badge',  type: 'link', href: '/general/badge'  },
    ],
  },
  {
    id: 'external', label: 'External',
    items: [
      { id: 'docs', label: 'Base UI Docs', type: 'external', href: 'https://base-ui.com' },
    ],
  },
]} />`}
    >
      <NavigationMenuDemo />
    </ShowcaseCard>

    <ShowcaseCard
      title="Primitive API — all item types + 3-level submenu"
      description="Compose MenuBar primitives directly for full control. Mix button, link, modal, external, and nested submenus."
      code={`<MenuBar>
  <MenuBarMenu>
    <MenuBarTrigger>Actions</MenuBarTrigger>
    <MenuBarContent>
      <MenuBarLabel>Item Types</MenuBarLabel>
      <MenuBarSeparator />

      {/* button */}
      <MenuBarItem onClick={handleClick}>
        Button item <MenuBarShortcut>⌘1</MenuBarShortcut>
      </MenuBarItem>

      {/* modal */}
      <MenuBarItem onClick={() => setModalOpen(true)}>
        Open modal
      </MenuBarItem>

      {/* external */}
      <MenuBarItem onClick={() => window.open(url, '_blank')}>
        External link <ExternalLink className="ml-auto size-3" />
      </MenuBarItem>

      <MenuBarSeparator />

      {/* nested submenu */}
      <MenuBarSub>
        <MenuBarSubTrigger>Submenu L1</MenuBarSubTrigger>
        <MenuBarSubContent>
          <MenuBarItem>Item A</MenuBarItem>
          <MenuBarSub>
            <MenuBarSubTrigger>Submenu L2</MenuBarSubTrigger>
            <MenuBarSubContent>
              <MenuBarItem>Deep item</MenuBarItem>
            </MenuBarSubContent>
          </MenuBarSub>
        </MenuBarSubContent>
      </MenuBarSub>

      <MenuBarItem disabled>Disabled item</MenuBarItem>
    </MenuBarContent>
  </MenuBarMenu>
</MenuBar>`}
    >
      <MixedTypesDemo />
    </ShowcaseCard>

    <ShowcaseCard
      title="Direct item — không có dropdown"
      description="Bỏ qua 'items' trong config (hoặc dùng MenuBarButton primitive) để click thẳng vào entry mà không mở dropdown."
      code={`// Config-driven: bỏ items → click thẳng
<MenuBarNav menus={[
  { id: 'home',      label: 'Home',      type: 'link',    href: '/'          },
  { id: 'docs',      label: 'Docs',      type: 'external', href: 'https://...' },
  { id: 'notify',   label: 'Notify',   type: 'button',  onClick: handleNotify },
  {
    id: 'settings',
    label: 'Settings',
    items: [  // ← có items → vẫn là dropdown bình thường
      { id: 'profile', label: 'Profile', type: 'link', href: '/profile' },
    ],
  },
]} />

// Primitive: dùng MenuBarButton
<MenuBar>
  <MenuBarButton onClick={handleHome}>Home</MenuBarButton>
  <MenuBarMenu>
    <MenuBarTrigger>Settings</MenuBarTrigger>
    <MenuBarContent>...</MenuBarContent>
  </MenuBarMenu>
</MenuBar>`}
    >
      <DirectItemDemo />
    </ShowcaseCard>
  </div>
);

export default MenuBarPage;
