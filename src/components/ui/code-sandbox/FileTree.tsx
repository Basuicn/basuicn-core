import React, { useState, useMemo } from 'react';
import { useSandpack } from '@codesandbox/sandpack-react';
import {
  ChevronRight,
  ChevronDown,
  FilePlus,
  FolderPlus,
  Trash2,
  Folder,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';

// ─── Tree data structure ─────────────────────────────────────

interface TreeNode {
  name: string;
  path: string;
  type: 'file' | 'folder';
  children?: TreeNode[];
}

function buildFileTree(paths: string[]): TreeNode[] {
  const root: TreeNode[] = [];

  for (const filePath of paths) {
    const parts = filePath.split('/').filter(Boolean);
    let level = root;
    let currentPath = '';

    for (let i = 0; i < parts.length; i++) {
      currentPath += '/' + parts[i];
      const isLast = i === parts.length - 1;

      if (isLast) {
        level.push({ name: parts[i], path: currentPath, type: 'file' });
      } else {
        let folder = level.find(
          (n) => n.type === 'folder' && n.name === parts[i],
        );
        if (!folder) {
          folder = {
            name: parts[i],
            path: currentPath,
            type: 'folder',
            children: [],
          };
          level.push(folder);
        }
        level = folder.children!;
      }
    }
  }

  function sortNodes(nodes: TreeNode[]): TreeNode[] {
    return nodes
      .sort((a, b) => {
        if (a.type !== b.type) return a.type === 'folder' ? -1 : 1;
        return a.name.localeCompare(b.name);
      })
      .map((n) => {
        if (n.children) n.children = sortNodes(n.children);
        return n;
      });
  }

  return sortNodes(root);
}

// ─── File icon by extension ──────────────────────────────────

function getFileIcon(name: string): { label: string; color: string } {
  const ext = name.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'js':
    case 'mjs':
      return { label: 'JS', color: '#f7df1e' };
    case 'jsx':
      return { label: 'JSX', color: '#61dafb' };
    case 'ts':
      return { label: 'TS', color: '#3178c6' };
    case 'tsx':
      return { label: 'TSX', color: '#3178c6' };
    case 'css':
    case 'scss':
      return { label: '#', color: '#264de4' };
    case 'html':
      return { label: '<>', color: '#e34f26' };
    case 'json':
      return { label: '{ }', color: '#5b5b5b' };
    case 'md':
      return { label: 'M', color: '#083fa1' };
    case 'svg':
      return { label: 'SVG', color: '#ffb13b' };
    default:
      return { label: '\u00B7', color: '#6b7280' };
  }
}

// ─── Single tree node ────────────────────────────────────────

function TreeItem({
  node,
  depth,
  activeFile,
  openFile,
  deleteFile,
  expanded,
  toggleFolder,
}: {
  node: TreeNode;
  depth: number;
  activeFile: string;
  openFile: (p: string) => void;
  deleteFile: (p: string) => void;
  expanded: Set<string>;
  toggleFolder: (p: string) => void;
}) {
  const pl = 12 + depth * 16;

  if (node.type === 'folder') {
    const isOpen = expanded.has(node.path);
    return (
      <>
        <div
          className="flex items-center py-1 px-2 cursor-pointer hover:bg-muted/50 text-[13px] group"
          style={{ paddingLeft: pl }}
          onClick={() => toggleFolder(node.path)}
        >
          {isOpen ? (
            <ChevronDown className="w-3.5 h-3.5 mr-1 shrink-0 text-muted-foreground" />
          ) : (
            <ChevronRight className="w-3.5 h-3.5 mr-1 shrink-0 text-muted-foreground" />
          )}
          <Folder className="w-3.5 h-3.5 mr-1.5 shrink-0 text-amber-500" />
          <span className="truncate">{node.name}</span>
        </div>
        {isOpen &&
          node.children?.map((child) => (
            <TreeItem
              key={child.path}
              node={child}
              depth={depth + 1}
              activeFile={activeFile}
              openFile={openFile}
              deleteFile={deleteFile}
              expanded={expanded}
              toggleFolder={toggleFolder}
            />
          ))}
      </>
    );
  }

  const icon = getFileIcon(node.name);
  const isActive = node.path === activeFile;

  return (
    <div
      className={cn(
        'flex items-center py-1 px-2 cursor-pointer text-[13px] group',
        isActive
          ? 'bg-primary/10 text-primary font-medium'
          : 'hover:bg-muted/50',
      )}
      style={{ paddingLeft: pl }}
      onClick={() => openFile(node.path)}
    >
      <span
        className="w-5 mr-1.5 shrink-0 text-[9px] font-bold text-center leading-none"
        style={{ color: icon.color }}
      >
        {icon.label}
      </span>
      <span className="truncate flex-1">{node.name}</span>
      <button
        className="opacity-0 group-hover:opacity-100 p-0.5 hover:text-danger shrink-0 transition-opacity"
        onClick={(e) => {
          e.stopPropagation();
          deleteFile(node.path);
        }}
      >
        <Trash2 className="w-3 h-3" />
      </button>
    </div>
  );
}

// ─── File Tree ───────────────────────────────────────────────

export function FileTree() {
  const { sandpack } = useSandpack();
  const { files, activeFile, openFile, addFile, deleteFile } = sandpack;

  const [expanded, setExpanded] = useState<Set<string>>(
    () =>
      new Set([
        '/',
        '/src',
        '/components',
        '/examples',
        '/public',
      ]),
  );
  const [creating, setCreating] = useState<'file' | 'folder' | null>(null);
  const [newName, setNewName] = useState('');

  const filePaths = Object.keys(files).filter((p) => !p.endsWith('.gitkeep'));
  const tree = useMemo(() => buildFileTree(filePaths), [filePaths]);

  const toggleFolder = (path: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const path = newName.startsWith('/') ? newName : '/' + newName;
    if (creating === 'file') {
      addFile(path, '');
      openFile(path);
    } else {
      addFile(`${path}/.gitkeep`, '');
      setExpanded((prev) => new Set([...prev, path]));
    }
    setNewName('');
    setCreating(null);
  };

  return (
    <div className="flex flex-col h-full text-foreground select-none">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground shrink-0 group">
        <span>Explorer</span>
        <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setCreating('file')}
            className="p-1 hover:bg-muted rounded"
            title="New File"
          >
            <FilePlus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setCreating('folder')}
            className="p-1 hover:bg-muted rounded"
            title="New Folder"
          >
            <FolderPlus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Create input */}
      {creating && (
        <form onSubmit={handleCreate} className="px-3 pb-2">
          <input
            autoFocus
            type="text"
            placeholder={
              creating === 'file'
                ? '/src/NewFile.tsx'
                : '/src/newfolder'
            }
            className="w-full bg-muted border border-primary text-foreground text-[13px] px-2 py-1 rounded outline-none font-mono"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onBlur={() => setCreating(null)}
          />
        </form>
      )}

      {/* Tree */}
      <div className="flex-1 overflow-y-auto">
        {tree.map((node) => (
          <TreeItem
            key={node.path}
            node={node}
            depth={0}
            activeFile={activeFile}
            openFile={openFile}
            deleteFile={deleteFile}
            expanded={expanded}
            toggleFolder={toggleFolder}
          />
        ))}
      </div>
    </div>
  );
}
