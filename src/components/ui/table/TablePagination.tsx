import React, { useState, useEffect } from 'react';
import { type Table as TanstackTable, type RowData } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import type { PaginationConfig, TableLabels } from './Table';

interface TablePaginationProps<TData extends RowData> {
    table: TanstackTable<TData>;
    totalRows: number;
    totalPageCount: number;
    isServerMode: boolean;
    cfg: PaginationConfig;
    labels?: TableLabels;
}

export function TablePagination<TData extends RowData>({
    table,
    totalRows,
    totalPageCount,
    isServerMode,
    cfg,
    labels,
}: TablePaginationProps<TData>) {
    const currentPageIndex = table.getState().pagination.pageIndex;
    const currentPageSize = table.getState().pagination.pageSize;
    const from = currentPageIndex * currentPageSize + 1;
    const to = Math.min((currentPageIndex + 1) * currentPageSize, totalRows);
    const pageSizeOptions = cfg.pageSizeOptions ?? [5, 10, 20, 50, 100];

    const [inputValue, setInputValue] = useState<string | number>(currentPageIndex + 1);

    useEffect(() => {
        setInputValue(currentPageIndex + 1);
    }, [currentPageIndex]);

    if (totalPageCount <= 0) return null;

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between px-3 py-2.5 border-t border-border bg-muted/50 gap-2">
            {/* showTotal info */}
            <div className="text-xs text-muted-foreground shrink-0 order-2 sm:order-1">
                {cfg.showTotal
                    ? cfg.showTotal(totalRows, [from, to])
                    : <>Show <b>{from}</b>–<b>{to}</b> of <b>{totalRows}</b> results</>
                }
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 overflow-x-auto order-1 sm:order-2 w-full sm:w-auto pb-0.5 sm:pb-0">
                {/* Page size */}
                {(cfg.showSizeChanger !== false) && (
                    <select
                        value={currentPageSize}
                        onChange={e => table.setPageSize(Number(e.target.value))}
                        className="shrink-0 px-2 py-1 text-xs border border-border rounded-md bg-background text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary cursor-pointer"
                    >
                        {pageSizeOptions.map(s => (
                            <option key={s} value={s}>{s}{labels?.perPage ?? ' / page'}</option>
                        ))}
                    </select>
                )}

                {/* Nav buttons */}
                <div className="flex items-center gap-1 shrink-0">
                    <button
                        className="p-1 rounded border border-border text-muted-foreground bg-background hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                        aria-label="First page"
                    >
                        <ChevronsLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                        className="p-1 rounded border border-border text-muted-foreground bg-background hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        aria-label="Previous page"
                    >
                        <ChevronLeft className="w-3.5 h-3.5" />
                    </button>

                    <span className="text-xs font-medium px-2.5 py-1 bg-background border border-border rounded shrink-0 min-w-14 text-center text-foreground">
                        {currentPageIndex + 1} / {totalPageCount}
                    </span>

                    <button
                        className="p-1 rounded border border-border text-muted-foreground bg-background hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        aria-label="Next page"
                    >
                        <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                        className="p-1 rounded border border-border text-muted-foreground bg-background hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        onClick={() => table.setPageIndex(totalPageCount - 1)}
                        disabled={!table.getCanNextPage()}
                        aria-label="Last page"
                    >
                        <ChevronsRight className="w-3.5 h-3.5" />
                    </button>
                </div>

                {/* Go to page */}
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground border-l border-border pl-2 ml-1 shrink-0">
                    <span className="hidden sm:inline">{labels?.page ?? 'Page'}</span>
                    <input
                        type="number"
                        min={1}
                        max={totalPageCount}
                        value={inputValue}
                        onChange={e => {
                            const val = e.target.value;
                            setInputValue(val);
                            const p = val ? Number(val) - 1 : 0;
                            if (val && p >= 0 && p < totalPageCount) {
                                table.setPageIndex(p);
                            }
                        }}
                        onBlur={() => setInputValue(currentPageIndex + 1)}
                        className="w-10 px-1 py-1 text-xs border border-border rounded bg-background text-foreground text-center outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                </div>
            </div>
        </div>
    );
}
