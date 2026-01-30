import { notFound } from 'next/navigation'
import { Box, Info, FileText } from 'lucide-react'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { DocCard } from '@/components/DocCard'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { getProductBySku, getFinishedProductFamilies } from '@/lib/data'
import { unslugify } from '@/lib/utils'
import type { FinishedProduct } from '@/lib/types'

export async function generateStaticParams() {
    const families = getFinishedProductFamilies()
    const paths: { family: string; category: string; sku: string }[] = []

    families.forEach((family) => {
        family.categories.forEach((category) => {
            category.products.forEach((product) => {
                paths.push({
                    family: family.slug,
                    category: category.slug,
                    sku: product.sku_code,
                })
            })
        })
    })

    return paths
}

interface PageProps {
    params: { family: string; category: string; sku: string }
}

export default function ProductDetailPage({ params }: PageProps) {
    const product = getProductBySku(params.family, params.category, params.sku)

    // Get display names from params
    const familyName = product?.family || unslugify(params.family)
    const categoryName = product?.category || unslugify(params.category)

    if (!product) {
        notFound()
    }

    const statusVariant = product.status === 'Activo' ? 'success' : 'secondary'

    return (
        <div>
            <Breadcrumbs items={[
                { label: 'Catálogo', href: '/catalog' },
                { label: 'Productos Terminados', href: '/catalog/finished-products' },
                { label: familyName, href: `/catalog/finished-products/${params.family}` },
                { label: categoryName, href: `/catalog/finished-products/${params.family}/${params.category}` },
                { label: product.sku_code }
            ]} />

            {/* Header Card */}
            <Card className="mb-6 bg-gradient-to-r from-slate-50 to-blue-50 border-[#0e0c9b]/20">
                <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                            <Box className="h-8 w-8 text-[#0e0c9b]" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <Badge variant="secondary" className="font-mono">{product.sku_code}</Badge>
                                <Badge variant="info">{product.variant}</Badge>
                                <Badge variant={statusVariant}>{product.status}</Badge>
                            </div>
                            <h1 className="text-2xl font-bold text-foreground mb-1">
                                {product.base_product}
                            </h1>
                            <p className="text-muted-foreground">
                                Variante: {product.variant} • Familia: {familyName} • Actualizado: {product.updated_at}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Info Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {/* General Information */}
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-4">
                            <Info className="h-5 w-5 text-[#0e0c9b]" />
                            <h3 className="font-semibold">Información General</h3>
                        </div>
                        <dl className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">SKU:</dt>
                                <dd className="font-medium font-mono">{product.sku_code}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">Producto Base:</dt>
                                <dd className="font-medium">{product.base_product}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">Variante/Aroma:</dt>
                                <dd className="font-medium">{product.variant}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">Estado:</dt>
                                <dd className="font-medium">{product.status}</dd>
                            </div>
                        </dl>
                    </CardContent>
                </Card>

                {/* Classification */}
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-4">
                            <FileText className="h-5 w-5 text-green-600" />
                            <h3 className="font-semibold">Clasificación</h3>
                        </div>
                        <dl className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">Familia:</dt>
                                <dd className="font-medium">{familyName}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">Categoría:</dt>
                                <dd className="font-medium">{categoryName}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">Última actualización:</dt>
                                <dd className="font-medium">{product.updated_at}</dd>
                            </div>
                        </dl>
                    </CardContent>
                </Card>
            </div>

            {/* Documentation Section */}
            <div>
                <h2 className="text-lg font-semibold mb-4">Documentación del Producto</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DocCard
                        title="Ficha Técnica (TDS)"
                        subtitle="Technical Data Sheet"
                        viewUrl={product.tds_view_url}
                        downloadUrl={product.tds_download_url}
                        icon="tds"
                    />
                    <DocCard
                        title="Hoja de Seguridad (SDS)"
                        subtitle="Safety Data Sheet"
                        viewUrl={product.sds_view_url}
                        downloadUrl={product.sds_download_url}
                        icon="sds"
                    />
                    <DocCard
                        title="Parámetros de Calidad Internos"
                        subtitle="Internal Quality Control"
                        viewUrl={product.internal_qc_view_url}
                        downloadUrl={product.internal_qc_download_url}
                        icon="qc"
                    />
                    <DocCard
                        title="Información de Etiquetado"
                        subtitle="Etiqueta del producto"
                        viewUrl={product.label_view_url}
                        downloadUrl={product.label_download_url}
                        icon="label"
                    />
                </div>
            </div>
        </div>
    )
}
