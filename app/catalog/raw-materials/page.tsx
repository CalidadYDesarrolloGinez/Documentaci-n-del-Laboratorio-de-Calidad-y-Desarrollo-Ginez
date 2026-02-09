'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Fuse from 'fuse.js'
import { ColumnDef } from '@tanstack/react-table'
import { FlaskConical, Eye, Download } from 'lucide-react'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { SearchInput } from '@/components/SearchInput'
import { Filters, FilterCategory } from '@/components/Filters'
import { DataTable } from '@/components/DataTable'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getRawMaterials, getUniqueValues } from '@/lib/data'
import { getBasePath } from '@/lib/utils'
import type { RawMaterial } from '@/lib/types'

const columns: ColumnDef<RawMaterial>[] = [
    {
        accessorKey: 'code',
        header: 'Código',
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <FlaskConical className="h-4 w-4 text-[#0e0c9b]" />
                <span className="font-medium text-[#0e0c9b]">{row.getValue('code')}</span>
            </div>
        ),
    },
    {
        accessorKey: 'name',
        header: 'Nombre Químico',
        cell: ({ row }) => (
            <span className="text-[#0e0c9b] hover:underline">{row.getValue('name')}</span>
        ),
    },
    {
        accessorKey: 'transport_name',
        header: 'Nombre Transporte',
        cell: ({ row }) => (
            <span className="text-muted-foreground">{row.getValue('transport_name')}</span>
        ),
    },
    {
        accessorKey: 'functional_category',
        header: 'Categoría Funcional',
        cell: ({ row }) => (
            <Badge variant="info" className="font-normal">
                {row.getValue('functional_category')}
            </Badge>
        ),
    },
    {
        accessorKey: 'chemical_family',
        header: 'Familia Química',
        cell: ({ row }) => (
            <span className="text-muted-foreground">{row.getValue('chemical_family')}</span>
        ),
    },
    {
        accessorKey: 'provider',
        header: 'Proveedor',
        cell: ({ row }) => (
            <span className="text-muted-foreground line-clamp-1 max-w-[200px]" title={row.getValue('provider')}>
                {row.getValue('provider')}
            </span>
        ),
    },
    {
        accessorKey: 'disposition',
        header: 'Disposición',
        cell: ({ row }) => {
            const value = row.getValue('disposition') as string
            const isRestricted = value.toLowerCase().includes('restringido')
            const isCritical = value.toLowerCase().includes('crítico')

            const variant = isRestricted ? 'restricted' :
                isCritical ? 'warning' : 'success'

            return (
                <div className="max-w-[150px]">
                    <Badge variant={variant} className="whitespace-normal text-[10px] leading-tight text-center py-1 px-2">
                        {value}
                    </Badge>
                </div>
            )
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

export default function RawMaterialsPage() {
    const router = useRouter()
    const basePath = getBasePath()
    const materials = getRawMaterials()

    const [searchQuery, setSearchQuery] = useState('')
    const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({})

    // Build filter categories from data
    const filterCategories: FilterCategory[] = useMemo(() => [
        {
            id: 'functional_category',
            label: 'Categoría Funcional',
            options: getUniqueValues(materials, 'functional_category'),
        },
        {
            id: 'chemical_family',
            label: 'Familia Química',
            options: getUniqueValues(materials, 'chemical_family'),
        },
        {
            id: 'disposition',
            label: 'Disposición',
            options: getUniqueValues(materials, 'disposition'),
        },
    ], [materials])

    // Fuse.js search setup
    const fuse = useMemo(() => new Fuse(materials, {
        keys: ['code', 'name', 'cas', 'transport_name', 'functional_category', 'chemical_family', 'disposition'],
        threshold: 0.3,
    }), [materials])

    // Apply search and filters
    const filteredData = useMemo(() => {
        let result = materials

        // Apply search
        if (searchQuery.trim()) {
            result = fuse.search(searchQuery).map(r => r.item)
        }

        // Apply filters
        Object.entries(activeFilters).forEach(([key, values]) => {
            if (values.length > 0) {
                result = result.filter(item =>
                    values.includes((item as any)[key] as string)
                )
            }
        })

        return result
    }, [materials, searchQuery, activeFilters, fuse])

    const handleRowClick = (row: RawMaterial) => {
        router.push(`/catalog/raw-materials/${row.code}`)
    }

    const handleFilterChange = (categoryId: string, values: string[]) => {
        setActiveFilters(prev => ({ ...prev, [categoryId]: values }))
    }

    const handleClearFilters = () => {
        setActiveFilters({})
    }

    return (
        <div>
            <Breadcrumbs items={[
                { label: 'Catálogo', href: '/catalog' },
                { label: 'Materias Primas' }
            ]} />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-foreground mb-1">
                        Materias Primas
                    </h1>
                    <p className="text-muted-foreground">
                        Catálogo de insumos químicos y materiales base
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <SearchInput
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder="Buscar por nombre, código o CAS..."
                        className="w-64"
                    />
                    <Filters
                        categories={filterCategories}
                        activeFilters={activeFilters}
                        onFilterChange={handleFilterChange}
                        onClearFilters={handleClearFilters}
                    />
                </div>
            </div>

            <DataTable
                columns={columns}
                data={filteredData}
                onRowClick={handleRowClick}
                pageSize={7}
            />
        </div>
    )
}
