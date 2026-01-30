'use client'

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    SortingState,
    PaginationState,
    useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import { ChevronRight, ChevronLeft, ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    onRowClick?: (row: TData) => void
    pageSize?: number
}

export function DataTable<TData, TValue>({
    columns,
    data,
    onRowClick,
    pageSize = 10,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: pageSize,
    })

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        state: {
            sorting,
            pagination,
        },
    })

    const pageCount = table.getPageCount()
    const currentPage = table.getState().pagination.pageIndex + 1

    // Generate page numbers for pagination
    const getVisiblePages = () => {
        const pages: (number | string)[] = []
        if (pageCount <= 7) {
            for (let i = 1; i <= pageCount; i++) pages.push(i)
        } else {
            if (currentPage <= 4) {
                pages.push(1, 2, 3, 4, 5, '...', pageCount)
            } else if (currentPage >= pageCount - 3) {
                pages.push(1, '...', pageCount - 4, pageCount - 3, pageCount - 2, pageCount - 1, pageCount)
            } else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', pageCount)
            }
        }
        return pages
    }

    return (
        <div className="space-y-4">
            <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
                <table className="w-full">
                    <thead className="bg-[#1a1f2e] text-white">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="px-4 py-4 text-left text-[11px] font-bold uppercase tracking-wider border-b border-white/10"
                                    >
                                        {header.isPlaceholder ? null : (
                                            <div
                                                className={`flex items-center gap-1 ${header.column.getCanSort()
                                                    ? 'cursor-pointer select-none hover:text-gray-300'
                                                    : ''
                                                    }`}
                                                onClick={header.column.getToggleSortingHandler()}
                                            >
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {header.column.getCanSort() && (
                                                    <ArrowUpDown className="h-3 w-3 opacity-50" />
                                                )}
                                            </div>
                                        )}
                                    </th>
                                ))}
                                {onRowClick && <th className="w-8 border-b border-white/10"></th>}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <tr
                                    key={row.id}
                                    className={`${onRowClick
                                        ? 'cursor-pointer hover:bg-slate-50/80 transition-colors'
                                        : ''
                                        }`}
                                    onClick={() => onRowClick?.(row.original)}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <td
                                            key={cell.id}
                                            className="px-4 py-4 text-[13px] text-slate-600 font-medium"
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                    {onRowClick && (
                                        <td className="px-2 py-4 text-slate-300">
                                            <ChevronRight className="h-4 w-4" />
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={columns.length + (onRowClick ? 1 : 0)}
                                    className="h-32 text-center text-slate-400 text-sm italic"
                                >
                                    No se encontraron resultados.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination UI */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2 px-1">
                <div className="text-[13px] text-slate-500 font-medium">
                    Mostrando{' '}
                    <span className="text-slate-900">
                        {data.length === 0 ? 0 : pagination.pageIndex * pagination.pageSize + 1}
                    </span>{' '}
                    a{' '}
                    <span className="text-slate-900">
                        {Math.min((pagination.pageIndex + 1) * pagination.pageSize, data.length)}
                    </span>{' '}
                    de <span className="text-slate-900 font-bold">{data.length}</span> resultados
                </div>

                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 text-slate-400 hover:text-slate-900"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </Button>

                    <div className="flex items-center">
                        {getVisiblePages().map((page, index) => {
                            if (page === '...') {
                                return (
                                    <div key={`dots-${index}`} className="flex items-center justify-center w-9 h-9">
                                        <MoreHorizontal className="h-4 w-4 text-slate-300" />
                                    </div>
                                )
                            }
                            return (
                                <Button
                                    key={`page-${page}`}
                                    variant={currentPage === page ? 'default' : 'ghost'}
                                    className={`h-9 w-9 p-0 text-[13px] font-bold ${currentPage === page
                                        ? 'bg-[#0e0c9b] text-white hover:bg-[#0e0c9b]/90 rounded-md'
                                        : 'text-slate-500 hover:text-slate-900'
                                        }`}
                                    onClick={() => table.setPageIndex((page as number) - 1)}
                                >
                                    {page}
                                </Button>
                            )
                        })}
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 text-slate-400 hover:text-slate-900"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronRight className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
