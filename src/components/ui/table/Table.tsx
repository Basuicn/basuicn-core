import React, { useEffect, useState } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getExpandedRowModel,
    flexRender,
    type ColumnDef,
    type SortingState,
    type PaginationState,
    type RowSelectionState,
    type RowData,
    type ColumnResizeMode,
} from '@tanstack/react-table';

declare module '@tanstack/react-table' {
    interface ColumnMeta<TData extends RowData, TValue> {
        align?: 'left' | 'center' | 'right';
    }
}
import { cn } from '@lib/utils/cn';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Button } from '../button/Button';
import { Checkbox } from '../checkbox/Checkbox';
import { Spinner } from '../spinner/Spinner';

export interface TableProps<TData> {
    data: TData[];
    columns: ColumnDef<TData, any>[];
    isLoading?: boolean;
    enableSorting?: boolean;
    enableRowSelection?: boolean;
    enablePagination?: boolean;
    enableExpanding?: boolean;
    renderSubComponent?: (props: { row: TData }) => React.ReactNode;
    getRowCanExpand?: (row: TData) => boolean;
    onSelectionChange?: (selectedRows: TData[]) => void;
    className?: string; // wrapper class
    renderPaginationText?: ((from: number, to: number, total: number) => React.ReactNode) | boolean;
    renderPageSizeText?: (pageSize: number) => React.ReactNode;
    goToPageText?: string | boolean;
    alignType?: 'left' | 'center' | 'right';
    enableColumnResizing?: boolean;
    columnResizeMode?: ColumnResizeMode;
}

export function Table<TData>({
    data,
    columns,
    isLoading = false,
    enableSorting = true,
    enableRowSelection = false,
    enablePagination = true,
    enableExpanding = false,
    renderSubComponent,
    getRowCanExpand,
    onSelectionChange,
    className,
    renderPaginationText = (from, to, total) => (
        <>
            Show <span className="font-medium text-foreground">{from}</span> to <span className="font-medium text-foreground">{to}</span> of <span className="font-medium text-foreground">{total}</span> results
        </>
    ),
    renderPageSizeText = (size) => `${size} / page`,
    goToPageText = "Go to page",
    enableColumnResizing = false,
    columnResizeMode = 'onChange'
}: TableProps<TData>) {

    const [sorting, setSorting] = useState<SortingState>([]);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
    const finalColumns = React.useMemo(() => {
        const cols = [...columns];
        if (enableRowSelection) {
            cols.unshift({
                id: 'select',
                size: 10,
                minSize: 5,
                maxSize: 10,
                meta: {
                    align: 'center'
                },
                header: ({ table }) => (
                    <div className="flex items-center justify-center">
                        <Checkbox
                            size="sm"
                            checked={table.getIsAllRowsSelected()}
                            indeterminate={table.getIsSomeRowsSelected()}
                            onCheckedChange={(checked) => table.toggleAllRowsSelected(!!checked)}
                        />
                    </div>
                ),
                cell: ({ row }) => (
                    <div className="flex items-center justify-center">
                        <Checkbox
                            size="sm"
                            checked={row.getIsSelected()}
                            disabled={!row.getCanSelect()}
                            onCheckedChange={(checked) => row.toggleSelected(!!checked)}
                        />
                    </div>
                ),
                enableSorting: false,
            });
        }
        if (enableExpanding) {
            cols.unshift({
                id: 'expander',
                header: () => null,
                size: 10,
                minSize: 10,
                maxSize: 10,
                meta: {
                    align: 'center'
                },
                cell: ({ row }) => {
                    return row.getCanExpand() ? (
                        <div className="flex items-center justify-center">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={row.getToggleExpandedHandler()}
                                className="p-0.5 hover:bg-muted text-muted-foreground transition-colors cursor-pointer outline-none focus:ring-2 focus:ring-primary/50"
                            >
                                {row.getIsExpanded() ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                            </Button>
                        </div>
                    ) : null;
                },
                enableSorting: false,
            });
        }
        return cols;
    }, [columns, enableRowSelection, enableExpanding]);

    const table = useReactTable({

        data,
        columns: finalColumns,
        state: { sorting, rowSelection, pagination },
        onSortingChange: setSorting,
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
        getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
        getFilteredRowModel: getFilteredRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        columnResizeMode,
        enableColumnResizing,
        enableRowSelection,
        getRowCanExpand: getRowCanExpand ? (row) => getRowCanExpand(row.original) : () => !!renderSubComponent,
    });
    const [inputValue, setInputValue] = useState(table.getState().pagination.pageIndex + 1);
    useEffect(() => {
        setInputValue(table.getState().pagination.pageIndex + 1);
    }, [table.getState().pagination.pageIndex]);
    useEffect(() => {
        if (onSelectionChange) {
            const selected = table.getSelectedRowModel().rows.map(row => row.original);
            onSelectionChange(selected);
        }
    }, [rowSelection, onSelectionChange, table]);

    return (
        <div className={cn("relative w-full rounded-md border border-border bg-background flex flex-col overflow-hidden", className)}>

            {/* Loading Overlay */}
            {isLoading && (
                <div className="absolute inset-0 bg-black/10 z-10 flex items-center justify-center backdrop-blur-[2px]">
                    <Spinner size="lg" variant="primary" />
                </div>
            )}

            <div className="overflow-x-auto w-full">
                <table
                    className="w-full text-sm text-left text-foreground whitespace-nowrap"
                    style={{
                        width: enableColumnResizing ? table.getCenterTotalSize() : undefined,
                        tableLayout: enableColumnResizing ? 'fixed' : 'auto'
                    }}
                >
                    <thead className="text-xs text-muted-foreground bg-muted/50 border-b border-border">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id} >
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
                    <tbody className="">
                        {!isLoading && data.length === 0 ? (
                            <tr>
                                <td colSpan={finalColumns.length} className=" px-4 py-16 text-center text-muted-foreground">
                                    <div className="flex flex-col items-center justify-center space-y-2">
                                        <span className="text-muted-foreground/50">
                                            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                            </svg>
                                        </span>
                                        <span>Không có dữ liệu</span>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            table.getRowModel().rows.map(row => (
                                <React.Fragment key={row.id}>
                                    <tr
                                        className={cn(
                                            "hover:bg-muted/50 transition-colors group",
                                            row.getIsSelected() ? "bg-primary/5 hover:bg-primary/10" : "",
                                            row.getIsExpanded() ? "bg-primary/5" : ""
                                        )}
                                    >
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
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {enablePagination && table.getPageCount() > 0 && (
                <div className="flex flex-wrap sm:flex-nowrap items-center justify-between px-2 py-3 border-t border-border bg-muted/50 gap-4">
                    <div className="text-sm text-muted-foreground w-full sm:w-auto text-center sm:text-left">
                        {renderPaginationText !== false && (
                            typeof renderPaginationText === 'function' ? renderPaginationText(
                                table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1,
                                Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, data.length),
                                data.length
                            ) : renderPaginationText
                        )}
                    </div>

                    <div className="flex items-center justify-center sm:justify-end gap-3 w-full sm:w-auto">
                        <select
                            value={table.getState().pagination.pageSize}
                            onChange={e => {
                                table.setPageSize(Number(e.target.value))
                            }}
                            className="px-2 py-1.5 text-sm border border-border rounded-md bg-background text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary cursor-pointer"
                        >
                            {[5, 10, 20, 50, 100].map(pageSize => (
                                <option key={pageSize} value={pageSize}>
                                    {renderPageSizeText(pageSize)}
                                </option>
                            ))}
                        </select>

                        <div className="flex items-center gap-1">
                            <button
                                className="p-1.5 rounded-md border border-border text-muted-foreground bg-background hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                onClick={() => table.setPageIndex(0)}
                                disabled={!table.getCanPreviousPage()}
                                aria-label="First block"
                            >
                                <ChevronsLeft className="w-4 h-4" />
                            </button>
                            <button
                                className="p-1.5 rounded-md border border-border text-muted-foreground bg-background hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed  transition-colors"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                                aria-label="Previous block"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>

                            <span className="text-sm font-medium px-3 py-1 bg-background border border-border rounded-md h-full flex items-center min-w-20 justify-center text-foreground">
                                {table.getState().pagination.pageIndex + 1} / {table.getPageCount() || 1}
                            </span>

                            <button
                                className="p-1.5 rounded-md border border-border text-muted-foreground bg-background hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                                aria-label="Next block"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                            <button
                                className="p-1.5 rounded-md border border-border text-muted-foreground bg-background hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                disabled={!table.getCanNextPage()}
                                aria-label="Last block"
                            >
                                <ChevronsRight className="w-4 h-4" />
                            </button>
                        </div>
                        {goToPageText !== false && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground border-l border-border pl-3 ml-1">
                                {typeof goToPageText === 'string' && <span>{goToPageText}</span>}
                                <input
                                    type="number"
                                    min={1}
                                    max={table.getPageCount() || 1}
                                    value={inputValue}
                                    onChange={e => {
                                        const val = e.target.value;
                                        setInputValue(val as any);

                                        const page = val ? Number(val) - 1 : 0;
                                        if (val && page >= 0 && page < table.getPageCount()) {
                                            table.setPageIndex(page);
                                        }
                                    }}
                                    onBlur={() => {
                                        setInputValue(table.getState().pagination.pageIndex + 1);
                                    }}
                                    className="w-12 px-1 py-1 text-sm border border-border rounded-md bg-background text-foreground text-center outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
