import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Autocomplete } from '../ui/autocomplete/Autocomplete';
import { flattenSearchableRoutes } from '../../../routes';
import * as Icon from '@/components/ui/icons';

const HeaderSearch: React.FC = () => {
  const navigate = useNavigate();
  const searchItems = React.useMemo(() => flattenSearchableRoutes(), []);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex-1 max-w-sm mx-4 relative group hidden md:block">
      <Autocomplete
        ref={inputRef}
        options={searchItems}
        placeholder="Tìm kiếm component... (Ctrl + K)"
        leftIcon={<Icon.Search className="w-4 h-4" />}
        className="w-full"
        onValueChange={(val) => navigate(val)}
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded border border-border bg-muted/50 text-[10px] font-medium text-muted-foreground pointer-events-none group-focus-within:opacity-0 transition-opacity">
        <span className="text-[8px]">⌘</span>K
      </div>
    </div>
  );
};

export { HeaderSearch };
