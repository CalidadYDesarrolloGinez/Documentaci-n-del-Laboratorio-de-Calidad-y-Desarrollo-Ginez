'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Fuse from 'fuse.js'
import { ColumnDef } from '@tanstack/react-table'
import { Sparkles, Box, Eye, Download } from 'lucide-react'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { SearchInput } from '@/components/SearchInput'
import { DataTable } from '@/components/DataTable'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getBasePath, unslugify } from '@/lib/utils'
import type { FinishedProduct, ProductCategory } from '@/lib/types'

const columns: ColumnDef<FinishedProduct>[] = [
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
        accessorKey: 'variant',
        header: 'Variante / Aroma',
        cell: ({ row }) => {
            const variant = row.getValue('variant') as string
            return (
                <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-amber-500" />
                    <Badge variant="secondary" className="font-normal">{variant}</Badge>
                </div>
            )
        },
    },
    {
        accessorKey: 'base_product',
        header: 'Producto Base',
        cell: ({ row }) => (
            <span className="text-[#0e0c9b] hover:underline">{row.getValue('base_product')}</span>
        ),
    },
    {
        accessorKey: 'status',
        header: 'Estado',
        cell: ({ row }) => {
            const status = row.getValue('status') as string
            const variant = status === 'Activo' ? 'success' : 'secondary'
            return <Badge variant={variant}>{status}</Badge>
        },
    },
    {
        accessorKey: 'updated_at',
        header: 'Actualizado',
        cell: ({ row }) => (
            <span className="text-muted-foreground">{row.getValue('updated_at')}</span>
        ),
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

interface CategoryProductsContentProps {
    familySlug: string
    categorySlug: string
    category: ProductCategory | undefined
}

export default function CategoryProductsContent({ familySlug, categorySlug, category }: CategoryProductsContentProps) {
    const router = useRouter()
    const basePath = getBasePath()

    const products = category?.products || []
    const categoryName = category?.name || unslugify(categorySlug)
    const familyName = category?.family || unslugify(familySlug)

    const [searchQuery, setSearchQuery] = useState('')

    // Fuse.js search
    const fuse = useMemo(() => new Fuse(products, {
        keys: ['sku_code', 'base_product', 'variant'],
        threshold: 0.3,
    }), [products])

    const filteredData = useMemo(() => {
        if (!searchQuery.trim()) return products
        return fuse.search(searchQuery).map(r => r.item)
    }, [products, searchQuery, fuse])

    const handleRowClick = (row: FinishedProduct) => {
        router.push(`${basePath}/catalog/finished-products/${familySlug}/${categorySlug}/${row.sku_code}`)
    }

    return (
        <div>
            <Breadcrumbs items={[
                { label: 'Catálogo', href: '/catalog' },
                { label: 'Productos Terminados', href: '/catalog/finished-products' },
                { label: familyName, href: `/catalog/finished-products/${familySlug}` },
                { label: categoryName }
            ]} />

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-foreground mb-1">
                    {categoryName}
                </h1>
                <p className="text-muted-foreground">
                    {products.length} variante{products.length !== 1 ? 's' : ''} disponible{products.length !== 1 ? 's' : ''}
                </p>
            </div>

            <div className="mb-4">
                <SearchInput
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Buscar por aroma, nombre o código..."
                    className="max-w-sm"
                />
            </div>

            <DataTable
                columns={columns}
                data={filteredData}
                onRowClick={handleRowClick}
            />
        </div>
    )
}
