import { ModuleCard } from '@/components/ModuleCard'
import { PromoCarousel } from '@/components/PromoCarousel'

const modules = [
    {
        id: 'catalog',
        title: 'Catálogo',
        description: 'Materias primas y productos terminados con documentación técnica y de seguridad.',
        icon: 'package',
        href: '/catalog',
        active: true,
    },
    {
        id: 'bitacora',
        title: 'Bitácora de Producción',
        description: 'Registro y seguimiento de lotes de producción.',
        icon: 'clipboard',
        href: '/bitacora',
        active: false,
    },
    {
        id: 'control',
        title: 'Control de Calidad',
        description: 'Análisis, inspecciones y reportes de calidad.',
        icon: 'shield',
        href: '/control',
        active: false,
    },
    {
        id: 'formulas',
        title: 'Manual de Formulación Ginez',
        description: 'Guías de fabricación y fórmulas maestras de productos.',
        icon: 'book',
        href: '/formulas',
        active: false,
    },
    {
        id: 'reportes',
        title: 'Reportes',
        description: 'Estadísticas y análisis de operaciones.',
        icon: 'chart',
        href: '/reportes',
        active: false,
    },
    {
        id: 'configuracion',
        title: 'Configuración',
        description: 'Ajustes del sistema y administración de usuarios.',
        icon: 'settings',
        href: '/configuracion',
        active: false,
    },
]

export default function HomePage() {
    return (
        <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">
                Panel Principal
            </h1>
            <p className="text-muted-foreground mb-8">
                Seleccione un módulo para comenzar
            </p>

            <PromoCarousel />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {modules.map((module) => (
                    <ModuleCard
                        key={module.id}
                        title={module.title}
                        description={module.description}
                        icon={module.icon}
                        href={module.href}
                        active={module.active}
                    />
                ))}
            </div>
        </div>
    )
}
