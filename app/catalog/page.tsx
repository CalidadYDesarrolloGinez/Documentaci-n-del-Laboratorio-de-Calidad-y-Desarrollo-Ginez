import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ModuleCard } from '@/components/ModuleCard'
import { getRawMaterialsCount, getFinishedProductsCount } from '@/lib/data'
import { Info } from 'lucide-react'

export default function CatalogPage() {
    const mpCount = getRawMaterialsCount()
    const ptCount = getFinishedProductsCount()

    const categories = [
        {
            id: 'raw-materials',
            title: 'Materias Primas',
            description: 'Insumos químicos y materiales base para producción',
            icon: 'flask',
            href: '/catalog/raw-materials',
            active: true,
            badge: 'MP',
            count: mpCount,
            colorClass: 'bg-red-50 text-[#c41f1a]',
        },
        {
            id: 'finished-products',
            title: 'Productos Terminados',
            description: 'Productos finales listos para distribución y venta.',
            icon: 'archive',
            href: '/catalog/finished-products',
            active: true,
            badge: 'PT',
            count: ptCount,
            colorClass: 'bg-orange-50 text-orange-600',
        },
    ]

    return (
        <div>
            <Breadcrumbs items={[
                { label: 'Catálogo' }
            ]} />

            <h1 className="text-2xl font-bold text-foreground mb-1">
                Catálogo
            </h1>
            <p className="text-muted-foreground mb-8">
                Gestión de materias primas y productos terminados
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
                {categories.map((category) => (
                    <ModuleCard
                        key={category.id}
                        title={category.title}
                        description={category.description}
                        icon={category.icon}
                        href={category.href}
                        active={category.active}
                        badge={category.badge}
                        count={category.count}
                        colorClass={category.colorClass}
                    />
                ))}
            </div>

            <div className="mt-20 flex items-center gap-2 text-[13px] text-slate-500">
                <Info className="h-4 w-4 text-blue-500" />
                <span>Seleccione un módulo para ver el listado detallado de ítems.</span>
            </div>
        </div>
    )
}
