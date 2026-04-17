import React from 'react';
import {
    flexRender,
    type Row,
    type ColumnDef,
    type RowData,
} from '@tanstack/react-table';
import { useVirtualizer, type Virtualizer } from '@tanstack/react-virtual';
import { cn } from '@lib/utils/cn';

// ─── Empty State ────────────────────────────────────────────────────────────

interface TableEmptyProps {
    colSpan: number;
    text: string;
}

export function TableEmpty({ colSpan, text }: TableEmptyProps) {
    return (
        <tr>
            <td colSpan={colSpan} className="px-4 py-16 text-center text-muted-foreground">
                <div className="flex flex-col items-center justify-center space-y-2">
                    <span className="text-muted-foreground/50">
                        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                    </span>
                    <span>{text}</span>
                </div>
            </td>
        </tr>
    );
}

// ─── Row Cell Renderer ──────────────────────────────────────────────────────

interface TableRowCellsProps<TData extends RowData> {
    row: Row<TData>;
    enableColumnResizing: boolean;
}

function TableRowCells<TData extends RowData>({ row, enableColumnResizing }: TableRowCellsProps<TData>) {
    return (
        <>
            {row.getVisibleCells().map(cell => {
                const meta = cell.column.columnDef.meta;
                const align = meta?.align || 'left';
                return (
                    <td
                        key={cell.id}
                        style={{ width: enableColumnResizing ? cell.column.getSize() : cell.column.columnDef.size }}
                        className={cn(
                            cell.column.id === 'select' || cell.column.id === 'expander' ? "px-1" : "px-2",
                            "py-3 border border-border align-middle",
                            align === 'center' ? "text-center" : align === 'right' ? "text-right" : "text-left"
                        )}
                    >
                        <div className={cn(
                            "flex items-center",
                            align === 'center' ? "justify-center" : align === 'right' ? "justify-end" : "justify-start"
                        )}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </div>
                    </td>
                );
            })}
        </>
    );
}

// ─── Normal Rows ────────────────────────────────────────────────────────────

interface TableNormalRowsProps<TData extends RowData> {
    rows: Row<TData>[];
    enableColumnResizing: boolean;
    renderSubComponent?: (props: { row: TData }) => React.ReactNode;
}

export function TableNormalRows<TData extends RowData>({
    rows,
    enableColumnResizing,
    renderSubComponent,
}: TableNormalRowsProps<TData>) {
    return (
        <>
            {rows.map(row => (
                <React.Fragment key={row.id}>
                    <tr
                        className={cn(
                            "hover:bg-muted/50 transition-colors group",
                            row.getIsSelected() ? "bg-primary/5 hover:bg-primary/10" : "",
                            row.getIsExpanded() ? "bg-primary/5" : ""
                        )}
                    >
                        <TableRowCells row={row} enableColumnResizing={enableColumnResizing} />
                    </tr>
                    {row.getIsExpanded() && renderSubComponent && (
                        <tr>
                            <td colSpan={row.getVisibleCells().length} className="p-0 border-b border-border whitespace-normal">
                                <div className="bg-muted/50 px-4 py-5 shadow-inner w-full border-l-4 border-l-primary/40 wrap-break-word">
                                    {renderSubComponent({ row: row.original })}
                                </div>
                            </td>
                        </tr>
                    )}
                </React.Fragment>
            ))}
        </>
    );
}

// ─── Virtual Rows ───────────────────────────────────────────────────────────

interface TableVirtualRowsProps<TData extends RowData> {
    allRows: Row<TData>[];
    rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
    enableColumnResizing: boolean;
    colSpan: number;
}

export function TableVirtualRows<TData extends RowData>({
    allRows,
    rowVirtualizer,
    enableColumnResizing,
    colSpan,
}: TableVirtualRowsProps<TData>) {
    const virtualItems = rowVirtualizer.getVirtualItems();

    return (
        <>
            {rowVirtualizer.getTotalSize() > 0 && (
                <tr aria-hidden="true">
                    <td style={{ height: virtualItems[0]?.start ?? 0, padding: 0, border: 0 }} colSpan={colSpan} />
                </tr>
            )}
            {virtualItems.map(virtualRow => {
                const row = allRows[virtualRow.index];
                if (!row) return null;
                return (
                    <tr
                        key={row.id}
                        data-index={virtualRow.index}
                        ref={rowVirtualizer.measureElement}
                        className={cn(
                            "hover:bg-muted/50 transition-colors",
                            row.getIsSelected() ? "bg-primary/5 hover:bg-primary/10" : ""
                        )}
                    >
                        <TableRowCells row={row} enableColumnResizing={enableColumnResizing} />
                    </tr>
                );
            })}
            {rowVirtualizer.getTotalSize() > 0 && (
                <tr aria-hidden="true">
                    <td
                        style={{
                            height: rowVirtualizer.getTotalSize() - (virtualItems[virtualItems.length - 1]?.end ?? 0),
                            padding: 0,
                            border: 0,
                        }}
                        colSpan={colSpan}
                    />
                </tr>
            )}
        </>
    );
}
