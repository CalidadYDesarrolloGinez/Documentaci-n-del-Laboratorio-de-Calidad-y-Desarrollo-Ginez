import Link from 'next/link'
import { Box, Home, WashingMachine, Car, Shield, User } from 'lucide-react'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent } from '@/components/ui/card'
import { getFinishedProductFamilies } from '@/lib/data'
import { getBasePath } from '@/lib/utils'

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

            <h1 className="text-2xl font-bold text-foreground mb-1">
                Productos Terminados
            </h1>
            <p className="text-muted-foreground mb-12">
                Seleccione una familia de productos
            </p>

            <div className="flex flex-wrap gap-8 justify-center">
                {families.map((family) => {
                    const colorClass = familyColors[family.slug] || 'bg-blue-50 text-blue-600'

                    return (
                        <Link
                            key={family.slug}
                            href={`${basePath}/catalog/finished-products/${family.slug}`}
                            className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] min-w-[320px] max-w-[400px]"
                        >
                            <Card className="h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border-slate-200 group">
                                <CardContent className="p-10">
                                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 ${colorClass}`}>
                                        {familyIcons[family.slug] || <Box className="h-7 w-7" />}
                                    </div>

                                    <h3 className="font-bold text-xl mb-8 text-slate-900 group-hover:text-[#0e0c9b] transition-colors">
                                        {family.name}
                                    </h3>

                                    <div className="flex items-center gap-3">
                                        <div className="bg-slate-50 border border-slate-200 text-slate-500 text-[11px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap">
                                            {family.categories?.length || 0} {family.categories?.length === 1 ? 'categoría' : 'categorías'}
                                        </div>
                                        <div className="bg-slate-50 border border-slate-200 text-slate-500 text-[11px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap">
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
