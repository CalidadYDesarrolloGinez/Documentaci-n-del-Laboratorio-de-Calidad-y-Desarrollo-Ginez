'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Fuse from 'fuse.js'
import { Package, Box, Eye, Download } from 'lucide-react'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent } from '@/components/ui/card'
import { DataTable } from '@/components/DataTable'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SearchInput } from '@/components/SearchInput'
import { getBasePath, unslugify } from '@/lib/utils'
import type { FinishedProduct, ProductFamily, ProductCategory } from '@/lib/types'
import { ColumnDef } from '@tanstack/react-table'

const categoryColorMap: Record<string, string> = {
    'cuidado-del-hogar': 'bg-orange-50 text-orange-600',
    'lavanderia': 'bg-blue-50 text-[#0e0c9b]',
    'linea-automotriz': 'bg-gray-100 text-black',
    'linea-antibacterial': 'bg-sky-50 text-sky-500',
    'cuidado-personal': 'bg-green-100 text-green-900',
}

const autoColumns: ColumnDef<FinishedProduct>[] = [
    {
        accessorKey: 'sku_code',
        header: 'Código',
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <Box className="h-4 w-4 text-[#0e0c9b]" />
                <span className="font-medium text-[#0e0c9b] font-mono">{row.getValue('sku_code')}</span>
            </div>
        ),
    },
    {
        accessorKey: 'base_product',
        header: 'Producto',
        cell: ({ row }) => (
            <span className="font-medium">{row.getValue('base_product')}</span>
        ),
    },
    {
        accessorKey: 'variant',
        header: 'Variante',
        cell: ({ row }) => (
            <Badge variant="secondary" className="font-normal">{row.getValue('variant')}</Badge>
        ),
    },
    {
        accessorKey: 'status',
        header: 'Estatus',
        cell: ({ row }) => {
            const status = row.getValue('status') as string
            const variant = status === 'Activo' ? 'success' : 'secondary'
            return <Badge variant={variant}>{status}</Badge>
        },
    },
    {
        id: 'tds',
        header: 'Ficha Técnica',
        cell: ({ row }) => {
            const viewUrl = row.original.tds_view_url
            const downloadUrl = row.original.tds_download_url

            if (!viewUrl && !downloadUrl) return <span className="text-muted-foreground text-xs italic">No disponible</span>

            return (
                <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    {viewUrl && (
                        <Button variant="ghost" size="icon" asChild className="h-8 w-8 text-[#0e0c9b] hover:text-[#0e0c9b] hover:bg-blue-50">
                            <a href={viewUrl} target="_blank" rel="noopener noreferrer" title="Ver Ficha Técnica">
                                <Eye className="h-4 w-4" />
                            </a>
                        </Button>
                    )}
                    {downloadUrl && (
                        <Button variant="ghost" size="icon" asChild className="h-8 w-8 text-[#0e0c9b] hover:text-[#0e0c9b] hover:bg-blue-50">
                            <a href={downloadUrl} download title="Descargar Ficha Técnica">
                                <Download className="h-4 w-4" />
                            </a>
                        </Button>
                    )}
                </div>
            )
        },
    },
    {
        id: 'sds',
        header: 'HDS',
        cell: ({ row }) => {
            const viewUrl = row.original.sds_view_url
            const downloadUrl = row.original.sds_download_url

            if (!viewUrl && !downloadUrl) return <span className="text-muted-foreground text-xs italic">No disponible</span>

            return (
                <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    {viewUrl && (
                        <Button variant="ghost" size="icon" asChild className="h-8 w-8 text-[#0e0c9b] hover:text-[#0e0c9b] hover:bg-blue-50">
                            <a href={viewUrl} target="_blank" rel="noopener noreferrer" title="Ver HDS">
                                <Eye className="h-4 w-4" />
                            </a>
                        </Button>
                    )}
                    {downloadUrl && (
                        <Button variant="ghost" size="icon" asChild className="h-8 w-8 text-[#0e0c9b] hover:text-[#0e0c9b] hover:bg-blue-50">
                            <a href={downloadUrl} download title="Descargar HDS">
                                <Download className="h-4 w-4" />
                            </a>
                        </Button>
                    )}
                </div>
            )
        },
    },
]

interface FamilyCategoriesContentProps {
    familySlug: string
    family: ProductFamily | undefined
}

export default function FamilyCategoriesContent({ familySlug, family }: FamilyCategoriesContentProps) {
    const router = useRouter()
    const basePath = getBasePath()

    const familyName = family?.name || unslugify(familySlug)
    const categories = family?.categories || []
    const colorClass = categoryColorMap[familySlug] || 'bg-blue-50 text-[#0e0c9b]'

    const isDirectTable = familySlug === 'linea-automotriz' || familySlug === 'linea-antibacterial'
    const tableProducts = useMemo(() => isDirectTable ? (family?.categories[0]?.products || []) : [], [isDirectTable, family])

    const [searchQuery, setSearchQuery] = useState('')

    // Fuse.js search for direct table products
    const fuse = useMemo(() => new Fuse(tableProducts, {
        keys: ['sku_code', 'base_product', 'variant'],
        threshold: 0.3,
    }), [tableProducts])

    const filteredData = useMemo(() => {
        if (!searchQuery.trim()) return tableProducts
        return fuse.search(searchQuery).map(r => r.item)
    }, [tableProducts, searchQuery, fuse])

    const handleRowClick = (row: FinishedProduct) => {
        router.push(`/catalog/finished-products/${familySlug}/general/${row.sku_code}`)
    }

    return (
        <div>
            <Breadcrumbs items={[
                { label: 'Catálogo', href: '/catalog' },
                { label: 'Productos Terminados', href: '/catalog/finished-products' },
                { label: familyName }
            ]} />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-foreground mb-1">
                        {familyName}
                    </h1>
                    <p className="text-muted-foreground">
                        {isDirectTable ? 'Listado de productos disponibles' : 'Seleccione una categoría de productos'}
                    </p>
                </div>

                {isDirectTable && (
                    <div className="flex items-center gap-3">
                        <SearchInput
                            value={searchQuery}
                            onChange={setSearchQuery}
                            placeholder="Buscar por nombre o código..."
                            className="w-64"
                        />
                    </div>
                )}
            </div>

            {isDirectTable ? (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <DataTable
                        columns={autoColumns}
                        data={filteredData}
                        onRowClick={handleRowClick}
                    />
                </div>
            ) : categories.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <Link
                            key={category.slug}
                            href={`/catalog/finished-products/${familySlug}/${category.slug}`}
                        >
                            <Card className="h-full hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-500 cursor-pointer border-slate-200/60 overflow-hidden rounded-[2.5rem] group">
                                <CardContent className="p-10 flex flex-col h-full">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${colorClass}`}>
                                        <Package className="h-7 w-7" />
                                    </div>
                                    <h3 className="font-bold text-xl mb-6 text-slate-900 group-hover:text-[#0e0c9b] transition-colors leading-tight">
                                        {category.name}
                                    </h3>
                                    <div className="mt-auto">
                                        <span className="bg-slate-50 border border-slate-100 text-slate-500 text-[11px] font-bold px-4 py-2 rounded-full whitespace-nowrap shadow-sm group-hover:bg-white group-hover:border-slate-200 transition-colors">
                                            {category.count} producto{category.count !== 1 ? 's' : ''}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            ) : (
                <Card className="p-8 text-center">
                    <p className="text-muted-foreground">
                        No hay categorías disponibles aún para esta familia.
                    </p>
                </Card>
            )}
        </div>
    )
}
