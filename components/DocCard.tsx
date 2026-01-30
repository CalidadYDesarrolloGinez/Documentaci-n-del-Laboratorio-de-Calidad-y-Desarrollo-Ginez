'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Download, Eye, AlertCircle, FileCheck, Tag } from 'lucide-react'

interface DocCardProps {
    title: string
    subtitle?: string
    viewUrl?: string | null
    downloadUrl?: string | null
    icon?: 'tds' | 'sds' | 'coa' | 'label' | 'qc'
    lastUpdate?: string
}

const iconMap = {
    tds: FileText,
    sds: AlertCircle,
    coa: FileCheck,
    label: Tag,
    qc: FileCheck,
}

const iconColorMap = {
    tds: 'text-blue-600 bg-blue-50',
    sds: 'text-red-600 bg-red-50',
    coa: 'text-green-600 bg-green-50',
    label: 'text-purple-600 bg-purple-50',
    qc: 'text-amber-600 bg-amber-50',
}

export function DocCard({
    title,
    subtitle,
    viewUrl,
    downloadUrl,
    icon = 'tds',
    lastUpdate
}: DocCardProps) {
    const Icon = iconMap[icon] || FileText
    const iconColor = iconColorMap[icon] || 'text-blue-600 bg-blue-50'
    const hasDocument = viewUrl || downloadUrl

    return (
        <Card className={`p-4 ${!hasDocument ? 'opacity-60' : ''}`}>
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${iconColor}`}>
                        <Icon className="h-5 w-5" />
                    </div>

                    {/* Content */}
                    <div className="min-w-0">
                        <h4 className="font-medium text-foreground">
                            {title}
                        </h4>
                        {subtitle && (
                            <p className="text-sm text-muted-foreground">
                                {subtitle}
                            </p>
                        )}
                        {lastUpdate && (
                            <p className="text-xs text-muted-foreground mt-1">
                                Última actualización: {lastUpdate}
                            </p>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 flex-shrink-0">
                    {hasDocument ? (
                        <>
                            {viewUrl && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    asChild
                                >
                                    <a href={viewUrl} target="_blank" rel="noopener noreferrer" title="Ver documento">
                                        <Eye className="h-4 w-4" />
                                    </a>
                                </Button>
                            )}
                            {downloadUrl && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    asChild
                                >
                                    <a href={downloadUrl} target="_blank" rel="noopener noreferrer" title="Descargar documento">
                                        <Download className="h-4 w-4" />
                                    </a>
                                </Button>
                            )}
                        </>
                    ) : (
                        <span className="text-xs text-muted-foreground italic px-2">
                            No disponible
                        </span>
                    )}
                </div>
            </div>
        </Card>
    )
}
