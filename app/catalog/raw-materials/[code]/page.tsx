import { notFound } from 'next/navigation'
import { FlaskConical, Atom, AlertTriangle, Warehouse } from 'lucide-react'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { DocCard } from '@/components/DocCard'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { getRawMaterials, getRawMaterialByCode } from '@/lib/data'
import type { RawMaterial } from '@/lib/types'

export const dynamic = 'force-static'
export const dynamicParams = false

// Generate static paths for all raw materials
export async function generateStaticParams() {
    const materials = getRawMaterials()

    if (!materials || materials.length === 0) {
        return [{ code: 'placeholder' }]
    }

    return materials.map((material) => ({
        code: material.code,
    }))
}

interface PageProps {
    params: { code: string }
}

export default function RawMaterialDetailPage({ params }: PageProps) {
    const material = getRawMaterialByCode(params.code)

    if (!material) {
        notFound()
    }

    const dispositionVariant = material.disposition === 'Restringido' ? 'restricted' :
        material.disposition === 'Crítico' ? 'warning' : 'success'

    return (
        <div>
            <Breadcrumbs items={[
                { label: 'Catálogo', href: '/catalog' },
                { label: 'Materias Primas', href: '/catalog/raw-materials' },
                { label: material.name }
            ]} />

            {/* Header Card */}
            <Card className="mb-6 bg-gradient-to-r from-slate-50 to-blue-50 border-[#0e0c9b]/20">
                <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                            <FlaskConical className="h-8 w-8 text-[#0e0c9b]" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <Badge variant="secondary">{material.code}</Badge>
                                <Badge variant="info">{material.functional_category}</Badge>
                                <Badge variant={dispositionVariant}>{material.disposition}</Badge>
                            </div>
                            <h1 className="text-2xl font-bold text-foreground mb-1">
                                {material.name}
                            </h1>
                            <p className="text-muted-foreground">
                                CAS: {material.cas || 'N/A'} • Nombre de Transporte: {material.transport_name || 'N/A'}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Info Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {/* Chemical Classification */}
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-4">
                            <Atom className="h-5 w-5 text-[#0e0c9b]" />
                            <h3 className="font-semibold">Clasificación Química</h3>
                        </div>
                        <dl className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">Categoría Funcional:</dt>
                                <dd className="font-medium text-[#0e0c9b]">{material.functional_category}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">Familia Química:</dt>
                                <dd className="font-medium">{material.chemical_family}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">CAS:</dt>
                                <dd className="font-medium font-mono">{material.cas || 'N/A'}</dd>
                            </div>
                        </dl>
                    </CardContent>
                </Card>

                {/* Safety and Transport */}
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-4">
                            <AlertTriangle className="h-5 w-5 text-amber-600" />
                            <h3 className="font-semibold">Seguridad y Transporte</h3>
                        </div>
                        <dl className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">Disposición de Uso:</dt>
                                <dd className="font-medium">{material.disposition}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">Nombre Transporte:</dt>
                                <dd className="font-medium">{material.transport_name || 'N/A'}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">EPP Requerido:</dt>
                                <dd className="font-medium text-[#0e0c9b]">Consultar SDS</dd>
                            </div>
                        </dl>
                    </CardContent>
                </Card>

                {/* Storage Info */}
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-4">
                            <Warehouse className="h-5 w-5 text-green-600" />
                            <h3 className="font-semibold">Información de Almacén</h3>
                        </div>
                        <dl className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">Proveedor:</dt>
                                <dd className="font-medium">{material.provider || 'N/A'}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">Código Proveedor:</dt>
                                <dd className="font-medium font-mono">{material.provider_code || 'N/A'}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">Lead Time:</dt>
                                <dd className="font-medium">{material.lead_time_days ? `${material.lead_time_days} días` : 'N/A'}</dd>
                            </div>
                        </dl>
                    </CardContent>
                </Card>
            </div>

            {/* Documentation Section */}
            <div>
                <h2 className="text-lg font-semibold mb-4">Documentación</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DocCard
                        title="Ficha Técnica (TDS)"
                        subtitle="Technical Data Sheet"
                        viewUrl={material.tds_view_url}
                        downloadUrl={material.tds_download_url}
                        icon="tds"
                    />
                    <DocCard
                        title="Hoja de Seguridad (SDS)"
                        subtitle="Safety Data Sheet"
                        viewUrl={material.sds_view_url}
                        downloadUrl={material.sds_download_url}
                        icon="sds"
                    />
                    <DocCard
                        title="Certificado de Análisis - CEDIS"
                        subtitle={material.coa_cedis_file_id ? 'Disponible' : undefined}
                        viewUrl={material.coa_cedis_view_url}
                        downloadUrl={material.coa_cedis_download_url}
                        icon="coa"
                    />
                    <DocCard
                        title="Certificado de Análisis - Sucursales"
                        subtitle={material.coa_branches_file_id ? 'Disponible' : undefined}
                        viewUrl={material.coa_branches_view_url}
                        downloadUrl={material.coa_branches_download_url}
                        icon="coa"
                    />
                    <DocCard
                        title="Información de Etiquetado"
                        subtitle="Etiqueta del producto"
                        viewUrl={material.label_view_url}
                        downloadUrl={material.label_download_url}
                        icon="label"
                    />
                </div>
            </div>
        </div>
    )
}
