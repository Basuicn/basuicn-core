import React, { useEffect, useRef, useState } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getExpandedRowModel,
    type ColumnDef,
    type SortingState,
    type PaginationState,
    type RowSelectionState,
    type RowData,
    type ColumnResizeMode,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';

declare module '@tanstack/react-table' {
    interface ColumnMeta<TData extends RowData, TValue> {
        align?: 'left' | 'center' | 'right';
    }
}
import { cn } from '@lib/utils/cn';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Checkbox } from '../checkbox/Checkbox';
import { Spinner } from '../spinner/Spinner';
import { TableHeader } from './TableHeader';
import { TableEmpty, TableNormalRows, TableVirtualRows } from './TableBody';
import { TablePagination } from './TablePagination';

// ─── Pagination Config ───────────────────────────────────────────────────────

export interface PaginationConfig {
    current?: number;
    pageSize?: number;
    total?: number;
    pageSizeOptions?: number[];
    showTotal?: (total: number, range: [number, number]) => React.ReactNode;
    showSizeChanger?: boolean;
    onChange?: (page: number, pageSize: number) => void;
}

export interface TableLabels {
    page?: string;
    perPage?: string;
    empty?: string;
}

export interface TableProps<TData, TValue = unknown> {
    data: TData[];
    columns: ColumnDef<TData, TValue>[];
    isLoading?: boolean;
    enableSorting?: boolean;
    enableRowSelection?: boolean;
    enableExpanding?: boolean;
    renderSubComponent?: (props: { row: TData }) => React.ReactNode;
    getRowCanExpand?: (row: TData) => boolean;
    onSelectionChange?: (selectedRows: TData[]) => void;
    className?: string;
    enableColumnResizing?: boolean;
    columnResizeMode?: ColumnResizeMode;
    pagination?: PaginationConfig | false;
    /** @deprecated Use `labels.empty` instead */
    emptyText?: string;
    labels?: TableLabels;
    virtualize?: boolean;
    virtualHeight?: number;
    estimatedRowHeight?: number;
}

export function Table<TData, TValue = unknown>({
    data = [],
    columns,
    isLoading = false,
    enableSorting = true,
    enableRowSelection = false,
    enableExpanding = false,
    renderSubComponent,
    getRowCanExpand,
    onSelectionChange,
    className,
    enableColumnResizing = false,
    columnResizeMode = 'onChange',
    pagination: paginationProp = {},
    emptyText,
    labels,
    virtualize = false,
    virtualHeight = 400,
    estimatedRowHeight = 45,
}: TableProps<TData>) {
    const resolvedEmptyText = emptyText ?? labels?.empty ?? 'No data';
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const paginationEnabled = paginationProp !== false;
    const cfg = paginationEnabled ? (paginationProp as PaginationConfig) : {};

    const isServerMode = paginationEnabled && cfg.total !== undefined;
    const [page, setPage] = useState(cfg.current ?? 1);
    const [pageSize, setPageSize] = useState(cfg.pageSize ?? 10);

    useEffect(() => {
        if (cfg.current !== undefined) setPage(cfg.current);
    }, [cfg.current]);

    useEffect(() => {
        if (cfg.pageSize !== undefined) setPageSize(cfg.pageSize);
    }, [cfg.pageSize]);

    const pageIndex = page - 1;
    const totalRows = isServerMode ? cfg.total! : data.length;
    const pageCount = isServerMode ? Math.ceil(totalRows / pageSize) : undefined;
    const tanstackPagination: PaginationState = { pageIndex, pageSize };

    const handlePaginationChange = (updater: PaginationState | ((prev: PaginationState) => PaginationState)) => {
        const next = typeof updater === 'function' ? updater(tanstackPagination) : updater;
        const newPage = next.pageIndex + 1;
        const newPageSize = next.pageSize;

        if (!isServerMode) {
            setPage(newPage);
            setPageSize(newPageSize);
        }
        cfg.onChange?.(newPage, newPageSize);
    };

    const [sorting, setSorting] = useState<SortingState>([]);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

    const finalColumns = React.useMemo(() => {
        const cols = [...columns];
        if (enableRowSelection) {
            cols.unshift({
                id: 'select',
                size: 10,
                minSize: 5,
                maxSize: 10,
                meta: { align: 'center' },
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
                meta: { align: 'center' },
                cell: ({ row }) => row.getCanExpand() ? (
                    <div className="flex items-center justify-center">
                        <span
                            onClick={row.getToggleExpandedHandler()}
                            className="hover:bg-muted text-muted-foreground transition-colors cursor-pointer outline-none focus:ring-2 focus:ring-primary/50 p-1 rounded-md border border-border"
                        >
                            {row.getIsExpanded() ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                        </span>
                    </div>
                ) : null,
                enableSorting: false,
            });
        }
        return cols;
    }, [columns, enableRowSelection, enableExpanding]);

    const table = useReactTable({
        data,
        columns: finalColumns,
        state: { sorting, rowSelection, pagination: tanstackPagination },
        onSortingChange: setSorting,
        onRowSelectionChange: setRowSelection,
        onPaginationChange: handlePaginationChange,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
        getPaginationRowModel: paginationEnabled ? getPaginationRowModel() : undefined,
        getFilteredRowModel: getFilteredRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        columnResizeMode,
        enableColumnResizing,
        enableRowSelection,
        manualPagination: isServerMode,
        pageCount: isServerMode ? pageCount : undefined,
        getRowCanExpand: getRowCanExpand ? (row) => getRowCanExpand(row.original) : () => !!renderSubComponent,
    });

    useEffect(() => {
        if (onSelectionChange) {
            const selected = table.getSelectedRowModel().rows.map(row => row.original);
            onSelectionChange(selected);
        }
    }, [rowSelection, onSelectionChange, table]);

    const totalPageCount = isServerMode ? (pageCount ?? 1) : (table.getPageCount() || 1);

    // Virtualizer
    const allRows = virtualize ? table.getCoreRowModel().rows : [];
    const rowVirtualizer = useVirtualizer({
        count: virtualize ? allRows.length : 0,
        getScrollElement: () => scrollContainerRef.current,
        estimateSize: () => estimatedRowHeight,
        overscan: 8,
        enabled: virtualize,
    });

    return (
        <div className={cn("relative w-full rounded-md border border-border bg-background flex flex-col overflow-hidden", className)}>
            {isLoading && (
                <div className="absolute inset-0 bg-white/60 z-10 flex items-center justify-center backdrop-blur-[0.5px]">
                    <Spinner size="lg" variant="primary" />
                </div>
            )}

            <div
                ref={scrollContainerRef}
                className="overflow-x-auto w-full"
                style={virtualize ? { overflowY: 'auto', maxHeight: virtualHeight } : undefined}
            >
                <table
                    className="w-full text-sm text-left text-foreground whitespace-nowrap"
                    style={{
                        width: enableColumnResizing ? table.getCenterTotalSize() : undefined,
                        tableLayout: enableColumnResizing ? 'fixed' : 'auto'
                    }}
                >
                    <TableHeader
                        headerGroups={table.getHeaderGroups()}
                        enableSorting={enableSorting}
                        enableColumnResizing={enableColumnResizing}
                    />
                    <tbody>
                        {!isLoading && data.length === 0 ? (
                            <TableEmpty colSpan={finalColumns.length} text={resolvedEmptyText} />
                        ) : virtualize ? (
                            <TableVirtualRows
                                allRows={allRows}
                                rowVirtualizer={rowVirtualizer}
                                enableColumnResizing={enableColumnResizing}
                                colSpan={finalColumns.length}
                            />
                        ) : (
                            <TableNormalRows
                                rows={table.getRowModel().rows}
                                enableColumnResizing={enableColumnResizing}
                                renderSubComponent={renderSubComponent}
                            />
                        )}
                    </tbody>
                </table>
            </div>

            {!virtualize && paginationEnabled && (
                <TablePagination
                    table={table}
                    totalRows={totalRows}
                    totalPageCount={totalPageCount}
                    isServerMode={isServerMode}
                    cfg={cfg}
                    labels={labels}
                />
            )}
        </div>
    );
}
