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
        <Card className={`relative h-full transition-all duration-200 ${active
            ? 'hover:shadow-lg hover:border-blue-300 cursor-pointer'
            : 'opacity-75 cursor-not-allowed'
            }`}>
            <CardContent className="p-6">
                {/* Coming Soon Badge */}
                {!active && (
                    <div className="absolute top-4 right-4">
                        <Badge variant="warning" className="text-xs">
                            Próximamente
                        </Badge>
                    </div>
                )}

                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-8 ${active
                    ? (colorClass || 'bg-blue-50 text-[#0e0c9b]')
                    : 'bg-gray-100 text-gray-400'
                    }`}>
                    <Icon className="h-7 w-7" />
                </div>

                {/* Badge/Count Row */}
                <div className="flex items-center gap-3 mb-4">
                    {badge && (
                        <div className="bg-slate-50 border border-slate-200 text-slate-500 text-[11px] font-bold px-1.5 py-0.5 rounded leading-none">
                            {badge}
                        </div>
                    )}
                    {count !== undefined && (
                        <span className="text-[13px] text-slate-400 font-medium">{count} registros</span>
                    )}
                </div>

                <h3 className={`font-bold text-xl mb-3 ${active ? 'text-slate-900' : 'text-slate-400'
                    }`}>
                    {title}
                </h3>

                <p className="text-sm text-slate-500 leading-relaxed max-w-[90%]">
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
