'use client'

import { useState, useMemo } from 'react'
import { Search, X, ChevronRight, Package } from 'lucide-react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { FinishedProduct } from '@/lib/types'
import { getBasePath } from '@/lib/utils'
import Fuse from 'fuse.js'

interface ProductQuickSearchProps {
    products: FinishedProduct[]
}

export function ProductQuickSearch({ products }: ProductQuickSearchProps) {
    const [query, setQuery] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const basePath = getBasePath()

    const fuse = useMemo(() => {
        return new Fuse(products, {
            keys: [
                { name: 'sku_code', weight: 0.5 },
                { name: 'base_product', weight: 0.3 },
                { name: 'variant', weight: 0.2 }
            ],
            threshold: 0.3,
            includeMatches: true
        })
    }, [products])

    const results = useMemo(() => {
        if (!query) return []
        return fuse.search(query).slice(0, 8)
    }, [fuse, query])

    const handleClear = () => {
        setQuery('')
        setIsOpen(false)
    }

    return (
        <div className="relative w-full max-w-2xl mx-auto mb-10">
            <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                    type="text"
                    placeholder="Buscar por nombre, variante o SKU (ej. Pino, PT-CH...)"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value)
                        setIsOpen(true)
                    }}
                    onFocus={() => setIsOpen(true)}
                    className="pl-12 pr-10 h-14 text-lg rounded-2xl border-slate-200 shadow-sm focus:ring-primary/20 focus:border-primary transition-all bg-white"
                />
                {query && (
                    <button
                        onClick={handleClear}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>

            {isOpen && query && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200 shadow-2xl z-20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                        {results.length > 0 ? (
                            <div className="py-2">
                                <div className="px-4 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-50">
                                    Resultados encontrados
                                </div>
                                {results.map(({ item }) => (
                                    <Link
                                        key={item.sku_code}
                                        href={`${basePath}/catalog/finished-products/${item.family_slug}/${item.category_slug}/${item.sku_code}`}
                                        className="flex items-center gap-4 px-4 py-3 hover:bg-blue-50 transition-colors group"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                                            <Package className="h-5 w-5 text-slate-500 group-hover:text-[#0e0c9b]" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-0.5">
                                                <span className="font-bold text-slate-900 group-hover:text-[#0e0c9b] transition-colors truncate">
                                                    {item.base_product} {item.variant}
                                                </span>
                                                <span className="text-[10px] font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 uppercase">
                                                    {item.sku_code}
                                                </span>
                                            </div>
                                            <div className="flex items-center text-[11px] text-slate-500 gap-1">
                                                <span>{item.family}</span>
                                                <ChevronRight className="h-3 w-3" />
                                                <span>{item.category}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="p-8 text-center">
                                <Search className="h-10 w-10 text-slate-200 mx-auto mb-3" />
                                <p className="text-slate-500 font-medium">No se encontraron productos para "{query}"</p>
                                <p className="text-slate-400 text-sm">Pruebe con otros términos o revise el SKU.</p>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}
