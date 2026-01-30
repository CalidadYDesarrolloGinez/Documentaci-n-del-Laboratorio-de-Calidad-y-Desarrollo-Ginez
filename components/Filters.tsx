'use client'

import { useState } from 'react'
import { Filter, X, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'

export interface FilterCategory {
    id: string
    label: string
    options: string[]
}

interface FiltersProps {
    categories: FilterCategory[]
    activeFilters: Record<string, string[]>
    onFilterChange: (categoryId: string, values: string[]) => void
    onClearFilters: () => void
}

export function Filters({
    categories,
    activeFilters,
    onFilterChange,
    onClearFilters
}: FiltersProps) {
    const [open, setOpen] = useState(false)

    const totalActiveFilters = Object.values(activeFilters).reduce(
        (sum, arr) => sum + arr.length,
        0
    )

    const toggleOption = (categoryId: string, option: string) => {
        const current = activeFilters[categoryId] || []
        const updated = current.includes(option)
            ? current.filter(v => v !== option)
            : [...current, option]
        onFilterChange(categoryId, updated)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="h-4 w-4" />
                    {totalActiveFilters > 0 && (
                        <Badge variant="secondary" className="ml-1 px-1.5 py-0 text-xs">
                            {totalActiveFilters}
                        </Badge>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="font-medium">Filtros</h4>
                        {totalActiveFilters > 0 && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={onClearFilters}
                                className="h-auto py-1 px-2 text-xs"
                            >
                                Limpiar todo
                            </Button>
                        )}
                    </div>

                    {categories.map((category) => (
                        <div key={category.id} className="space-y-2">
                            <h5 className="text-sm font-medium text-muted-foreground">
                                {category.label}
                            </h5>
                            <div className="flex flex-wrap gap-1.5">
                                {category.options.map((option) => {
                                    const isActive = (activeFilters[category.id] || []).includes(option)
                                    return (
                                        <button
                                            key={option}
                                            onClick={() => toggleOption(category.id, option)}
                                            className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-md border transition-colors ${isActive
                                                    ? 'bg-primary text-primary-foreground border-primary'
                                                    : 'bg-background hover:bg-accent border-border'
                                                }`}
                                        >
                                            {isActive && <Check className="h-3 w-3" />}
                                            {option}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    )
}
