'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
    Package,
    ClipboardList,
    Shield,
    Warehouse,
    BarChart3,
    Settings,
    FlaskConical,
    Box,
    Archive,
    Book,
    LucideIcon
} from 'lucide-react'
import { getBasePath } from '@/lib/utils'

const iconMap: Record<string, LucideIcon> = {
    package: Package,
    clipboard: ClipboardList,
    shield: Shield,
    warehouse: Warehouse,
    chart: BarChart3,
    settings: Settings,
    flask: FlaskConical,
    box: Box,
    archive: Archive,
    book: Book,
}

interface ModuleCardProps {
    title: string
    description: string
    icon: string
    href: string
    active?: boolean
    badge?: string
    count?: number
    colorClass?: string
}

export function ModuleCard({
    title,
    description,
    icon,
    href,
    active = true,
    badge,
    count,
    colorClass
}: ModuleCardProps) {
    const basePath = getBasePath()
    const Icon = iconMap[icon] || Package

    const cardContent = (
        <Card className={`relative h-full transition-all duration-500 overflow-hidden rounded-[2.5rem] border-slate-200/60 ${active
            ? 'hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:-translate-y-2 cursor-pointer bg-white'
            : 'opacity-75 cursor-not-allowed bg-slate-50/50'
            }`}>
            <CardContent className="p-10 flex flex-col h-full">
                {/* Coming Soon Badge */}
                {!active && (
                    <div className="absolute top-6 right-6">
                        <Badge variant="warning" className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 bg-amber-100 text-amber-700 border-none">
                            Próximamente
                        </Badge>
                    </div>
                )}

                {/* Icon */}
                <div className={`w-16 h-16 rounded-[1.25rem] flex items-center justify-center mb-10 shadow-sm transition-transform duration-500 ${active
                    ? (colorClass || 'bg-blue-50 text-[#0e0c9b]')
                    : 'bg-slate-200 text-slate-400'
                    } group-hover:scale-110`}>
                    <Icon className="h-8 w-8" />
                </div>

                {/* Badge/Count Row */}
                {(badge || count !== undefined) && (
                    <div className="flex items-center gap-3 mb-6">
                        {badge && (
                            <div className="bg-slate-100/80 border border-slate-200 text-slate-500 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-tighter">
                                {badge}
                            </div>
                        )}
                        {count !== undefined && (
                            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-tight">{count} registros</span>
                        )}
                    </div>
                )}

                <h3 className={`font-bold text-2xl mb-4 leading-tight ${active ? 'text-slate-900 group-hover:text-[#0e0c9b]' : 'text-slate-400'
                    }`}>
                    {title}
                </h3>

                <p className="text-sm md:text-base text-slate-500 leading-relaxed font-medium">
                    {description}
                </p>
            </CardContent>
        </Card>
    )

    if (!active) {
        return cardContent
    }

    return (
        <Link href={`${basePath}${href}`}>
            {cardContent}
        </Link>
    )
}
