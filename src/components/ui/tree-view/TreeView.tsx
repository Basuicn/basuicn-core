import * as React from 'react';
import { Collapsible } from '@base-ui/react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@/lib/utils/cn';
import { ChevronRight, FileIcon, FolderIcon, FolderOpen } from 'lucide-react';

// ─── Variants ────────────────────────────────────────────────────────────────

const treeViewVariants = tv({
  slots: {
    root: 'flex flex-col text-sm',
    item: [
      'flex items-center gap-1.5 rounded-md px-2 py-1.5 cursor-pointer',
      'transition-colors hover:bg-muted/50',
      'outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset',
    ].join(' '),
    itemActive: 'bg-primary/10 text-primary hover:bg-primary/15',
    chevron: 'h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200',
    chevronOpen: 'rotate-90',
    icon: 'h-4 w-4 shrink-0 text-muted-foreground',
    label: 'truncate select-none',
    children: 'pl-4',
  },
});

const styles = treeViewVariants();

// ─── Types ───────────────────────────────────────────────────────────────────

export interface TreeNode {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: TreeNode[];
  disabled?: boolean;
}

export interface TreeViewProps {
  data: TreeNode[];
  /** Currently selected node id */
  selectedId?: string;
  /** Called when a node is selected */
  onSelect?: (id: string) => void;
  /** Default expanded node ids */
  defaultExpanded?: string[];
  className?: string;
}

// ─── TreeItem (recursive) ──────────────────────────────────────���─────────────

interface TreeItemProps {
  node: TreeNode;
  level: number;
  selectedId?: string;
  onSelect?: (id: string) => void;
  expandedSet: Set<string>;
  toggleExpanded: (id: string) => void;
}

function TreeItem({ node, level, selectedId, onSelect, expandedSet, toggleExpanded }: TreeItemProps) {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedSet.has(node.id);
  const isSelected = selectedId === node.id;

  const handleClick = () => {
    if (node.disabled) return;
    if (hasChildren) {
      toggleExpanded(node.id);
    }
    onSelect?.(node.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
    if (e.key === 'ArrowRight' && hasChildren && !isExpanded) {
      e.preventDefault();
      toggleExpanded(node.id);
    }
    if (e.key === 'ArrowLeft' && hasChildren && isExpanded) {
      e.preventDefault();
      toggleExpanded(node.id);
    }
  };

  const defaultIcon = hasChildren
    ? (isExpanded ? <FolderOpen className={styles.icon()} /> : <FolderIcon className={styles.icon()} />)
    : <FileIcon className={styles.icon()} />;

  return (
    <div role="treeitem" aria-expanded={hasChildren ? isExpanded : undefined} aria-selected={isSelected}>
      <div
        className={cn(
          styles.item(),
          isSelected && styles.itemActive(),
          node.disabled && 'opacity-50 pointer-events-none',
        )}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        tabIndex={node.disabled ? undefined : 0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        {hasChildren ? (
          <ChevronRight className={cn(styles.chevron(), isExpanded && styles.chevronOpen())} />
        ) : (
          <span className="w-4 shrink-0" />
        )}

        {node.icon ?? defaultIcon}
        <span className={styles.label()}>{node.label}</span>
      </div>

      {hasChildren && isExpanded && (
        <div role="group">
          {node.children!.map((child) => (
            <TreeItem
              key={child.id}
              node={child}
              level={level + 1}
              selectedId={selectedId}
              onSelect={onSelect}
              expandedSet={expandedSet}
              toggleExpanded={toggleExpanded}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── TreeView ────────────────────────────────────────────────────────────────

const TreeView = React.forwardRef<HTMLDivElement, TreeViewProps>(
  ({ data, selectedId, onSelect, defaultExpanded = [], className }, ref) => {
    const [expandedSet, setExpandedSet] = React.useState<Set<string>>(
      () => new Set(defaultExpanded),
    );

    const toggleExpanded = React.useCallback((id: string) => {
      setExpandedSet((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    }, []);

    return (
      <div
        ref={ref}
        role="tree"
        aria-label="Tree view"
        className={cn(styles.root(), className)}
      >
        {data.map((node) => (
          <TreeItem
            key={node.id}
            node={node}
            level={0}
            selectedId={selectedId}
            onSelect={onSelect}
            expandedSet={expandedSet}
            toggleExpanded={toggleExpanded}
          />
        ))}
      </div>
    );
  },
);

TreeView.displayName = 'TreeView';

export { TreeView };
