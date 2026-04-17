import React from 'react';
import {
    flexRender,
    type HeaderGroup,
    type RowData,
} from '@tanstack/react-table';
import { cn } from '@lib/utils/cn';
import { ChevronDown, ChevronUp } from 'lucide-react';

export interface TableHeaderProps<TData extends RowData> {
    headerGroups: HeaderGroup<TData>[];
    enableSorting: boolean;
    enableColumnResizing: boolean;
}

export function TableHeader<TData extends RowData>({
    headerGroups,
    enableSorting,
    enableColumnResizing,
}: TableHeaderProps<TData>) {
    return (
        <thead className="text-xs text-muted-foreground bg-muted/50 border-b border-border">
            {headerGroups.map(headerGroup => (
                <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => {
                        const meta = header.column.columnDef.meta;
                        const align = meta?.align || 'left';
                        const canSort = header.column.getCanSort() && enableSorting && header.column.id !== 'select';

                        return (
                            <th
                                key={header.id}
                                colSpan={header.colSpan}
                                style={{
                                    width: enableColumnResizing ? header.getSize() : header.column.columnDef.size,
                                    position: 'relative'
                                }}
                                aria-sort={
                                    canSort
                                        ? header.column.getIsSorted() === 'desc'
                                            ? 'descending'
                                            : header.column.getIsSorted() === 'asc'
                                                ? 'ascending'
                                                : 'none'
                                        : undefined
                                }
                                className={cn(
                                    header.column.id === 'select' || header.column.id === 'expander' ? "px-1" : "px-2",
                                    "py-3 font-semibold tracking-wide border border-border transition-colors group/header",
                                    canSort ? "cursor-pointer select-none hover:bg-muted" : "",
                                    align === 'center' ? "text-center" : align === 'right' ? "text-right" : "text-left"
                                )}
                            >
                                <div
                                    className={cn("flex flex-col h-full")}
                                    onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                                >
                                    {header.isPlaceholder ? null : (
                                        <div className={cn(
                                            "flex items-center gap-2",
                                            align === 'center' ? "justify-center" : align === 'right' ? "justify-end" : "justify-between"
                                        )}>
                                            <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
                                            {canSort && (
                                                <span className="shrink-0">
                                                    {{
                                                        asc: <ChevronUp className="w-4 h-4 text-primary" />,
                                                        desc: <ChevronDown className="w-4 h-4 text-primary" />,
                                                    }[header.column.getIsSorted() as string] ?? (
                                                            <div className="flex flex-col opacity-30 -space-y-1 hover:opacity-100 transition-opacity">
                                                                <ChevronUp className="w-3 h-3" />
                                                                <ChevronDown className="w-3 h-3" />
                                                            </div>
                                                        )}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Resize Handle */}
                                {enableColumnResizing && header.column.getCanResize() && (
                                    <div
                                        {...{
                                            onMouseDown: header.getResizeHandler(),
                                            onTouchStart: header.getResizeHandler(),
                                            className: cn(
                                                "absolute right-0 top-0 h-full w-1 cursor-col-resize select-none touch-none hover:bg-primary/50 transition-colors",
                                                header.column.getIsResizing() ? "bg-primary w-1.5 z-10" : "bg-transparent"
                                            ),
                                        }}
                                    />
                                )}
                            </th>
                        );
                    })}
                </tr>
            ))}
        </thead>
    );
}
