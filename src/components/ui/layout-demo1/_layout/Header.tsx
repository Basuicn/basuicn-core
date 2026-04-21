import { SidebarTrigger } from "@/components/ui/sidebar/Sidebar";

/**
 * Header chỉ hiển thị trên mobile (< 768px).
 * Desktop không có header — sidebar luôn hiện sẵn.
 */
const Header = () => {
  return (
    <header className="md:hidden flex items-center gap-3 h-12 px-4 border-b border-border bg-background shrink-0">
      <SidebarTrigger />
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center shrink-0">
          <span className="text-primary-foreground text-xs font-bold select-none">
            UI
          </span>
        </div>
        <span className="text-sm font-semibold text-foreground">UI Library</span>
      </div>
    </header>
  );
};

export default Header;
