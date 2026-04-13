import * as React from 'react';
import { cn } from '@/lib/utils/cn';

// ─── Types ────────────────────────────────────────────────────────────────────
export type TocItem = {
  id: string;
  label: string;
  level?: 1 | 2 | 3;
};

export interface TableContentsProps {
  items: TocItem[];
  /** Offset (px) từ top khi scroll — dành cho sticky header */
  offset?: number;
  /** Title hiển thị trên danh sách */
  title?: string;
  className?: string;
}

// ─── Helper: tìm scrollable ancestor gần nhất ────────────────────────────────
function getScrollParent(el: HTMLElement | null): HTMLElement | null {
  let node = el?.parentElement ?? null;
  while (node && node !== document.body) {
    const { overflow, overflowY } = getComputedStyle(node);
    if (/auto|scroll/.test(overflow + overflowY)) return node;
    node = node.parentElement;
  }
  return null;
}

// ─── Hook: theo dõi section đang active qua IntersectionObserver ──────────────
function useActiveSection(ids: string[], offset: number): string {
  const [activeId, setActiveId] = React.useState('');

  React.useEffect(() => {
    if (!ids.length) return;

    // Dùng scrollable container làm root để rootMargin hoạt động đúng
    const firstEl = document.getElementById(ids[0]);
    const root = firstEl ? getScrollParent(firstEl) : null;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { root, rootMargin: `-${offset + 8}px 0px -70% 0px`, threshold: 0 },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids, offset]);

  return activeId;
}

// ─── Component ────────────────────────────────────────────────────────────────
export const TableContents: React.FC<TableContentsProps> = ({
  items,
  offset = 80,
  title = 'Trên trang này',
  className,
}) => {
  const ids = React.useMemo(() => items.map((i) => i.id), [items]);
  const activeId = useActiveSection(ids, offset);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const container = getScrollParent(el);
    if (!container) {
      // Fallback: window scroll
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - offset,
        behavior: 'smooth',
      });
      return;
    }

    const top =
      el.getBoundingClientRect().top -
      container.getBoundingClientRect().top +
      container.scrollTop -
      offset;
    container.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <nav className={cn('select-none', className)} aria-label="Table of contents">
      {title && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {title}
        </p>
      )}

      <ul className="space-y-0.5 border-l border-border">
        {items.map((item) => {
          const level = item.level ?? 1;
          const isActive = activeId === item.id;

          return (
            <li key={item.id}>
              <button
                onClick={() => scrollTo(item.id)}
                className={cn(
                  'block w-full text-left text-sm leading-5 transition-all duration-150',
                  'py-1 pr-2 hover:text-foreground',
                  // Indentation theo level
                  level === 1 && 'pl-3 font-medium',
                  level === 2 && 'pl-5 font-normal',
                  level === 3 && 'pl-8 font-normal text-xs',
                  // Border left indicator
                  isActive
                    ? '-ml-px border-l-2 border-primary pl-[calc(theme(spacing.3)-1px)] text-primary'
                    : 'text-muted-foreground',
                  level === 2 && isActive && 'pl-[calc(theme(spacing.5)-1px)]',
                  level === 3 && isActive && 'pl-[calc(theme(spacing.8)-1px)]',
                )}
                aria-current={isActive ? 'location' : undefined}
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default TableContents;
