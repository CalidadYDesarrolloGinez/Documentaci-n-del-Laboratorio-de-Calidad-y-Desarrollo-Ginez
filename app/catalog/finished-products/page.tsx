import Link from 'next/link'
import { Box, Home, WashingMachine, Car, Shield, User } from 'lucide-react'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent } from '@/components/ui/card'
import { getFinishedProductFamilies } from '@/lib/data'
import { getBasePath } from '@/lib/utils'
import { CascadingProductFilter } from '@/components/CascadingProductFilter'

const familyIcons: Record<string, React.ReactNode> = {
    'cuidado-del-hogar': <Home className="h-6 w-6" />,
    'lavanderia': <WashingMachine className="h-6 w-6" />,
    'linea-automotriz': <Car className="h-6 w-6" />,
    'linea-antibacterial': <Shield className="h-6 w-6" />,
    'cuidado-personal': <User className="h-6 w-6" />,
}

const familyColors: Record<string, string> = {
    'cuidado-del-hogar': 'bg-orange-50 text-orange-600',
    'lavanderia': 'bg-blue-50 text-[#0e0c9b]',
    'linea-automotriz': 'bg-gray-100 text-black',
    'linea-antibacterial': 'bg-sky-50 text-sky-500',
    'cuidado-personal': 'bg-green-100 text-green-900',
}

export default function FinishedProductsPage() {
    const basePath = getBasePath()
    const families = getFinishedProductFamilies()

    return (
        <div>
            <Breadcrumbs items={[
                { label: 'Catálogo', href: '/catalog' },
                { label: 'Productos Terminados' }
            ]} />

            <div className="text-center mb-10 max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                    Productos Terminados
                </h1>
                <p className="text-slate-500 text-lg md:text-xl leading-relaxed">
                    Explora nuestro catálogo por familias o usa el buscador rápido para saltar directamente a un producto.
                </p>
            </div>

            <CascadingProductFilter families={families} />

            <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-8 border-l-4 border-[#0e0c9b] pl-4">
                    Navegar por Familia
                </h2>
            </div>

            <div className="flex flex-wrap gap-8 justify-center">
                {families.map((family) => {
                    const colorClass = familyColors[family.slug] || 'bg-blue-50 text-blue-600'

                    return (
                        <Link
                            key={family.slug}
                            href={`/catalog/finished-products/${family.slug}`}
                            className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] min-w-[320px] max-w-[400px]"
                        >
                            <Card className="h-full hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-500 cursor-pointer border-slate-200/60 group overflow-hidden rounded-[2.5rem] bg-white">
                                <CardContent className="p-10 flex flex-col h-full">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${colorClass}`}>
                                        {familyIcons[family.slug] || <Box className="h-7 w-7" />}
                                    </div>

                                    <h3 className="font-bold text-2xl mb-8 text-slate-900 group-hover:text-[#0e0c9b] transition-colors leading-tight">
                                        {family.name}
                                    </h3>

                                    <div className="mt-auto flex items-center gap-3">
                                        <div className="bg-slate-50 border border-slate-100 text-slate-500 text-[11px] font-bold px-4 py-2 rounded-full whitespace-nowrap shadow-sm group-hover:bg-white group-hover:border-slate-200 transition-colors">
                                            {family.categories?.length || 0} {family.categories?.length === 1 ? 'categoría' : 'categorías'}
                                        </div>
                                        <div className="bg-slate-50 border border-slate-100 text-slate-500 text-[11px] font-bold px-4 py-2 rounded-full whitespace-nowrap shadow-sm group-hover:bg-white group-hover:border-slate-200 transition-colors">
                                            {family.count || 0} {family.count === 1 ? 'producto' : 'productos'}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
