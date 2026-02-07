'use client'

import { useState, useEffect } from 'react'
import { Filter, ChevronRight, Sparkles, ArrowRight, X, Package, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ProductFamily, ProductCategory, FinishedProduct } from '@/lib/types'
import { getBasePath } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from '@/lib/utils'

interface CascadingProductFilterProps {
    families: ProductFamily[]
}

export function CascadingProductFilter({ families }: CascadingProductFilterProps) {
    const router = useRouter()
    const basePath = getBasePath()

    const [selectedFamily, setSelectedFamily] = useState<ProductFamily | null>(null)
    const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null)
    const [selectedProduct, setSelectedProduct] = useState<FinishedProduct | null>(null)

    const [openFamily, setOpenFamily] = useState(false)
    const [openCategory, setOpenCategory] = useState(false)
    const [openProduct, setOpenProduct] = useState(false)

    // Auto-select category if there's only one (like "General" in Automotriz)
    useEffect(() => {
        if (selectedFamily) {
            if (selectedFamily.categories.length === 1) {
                setSelectedCategory(selectedFamily.categories[0])
            } else {
                setSelectedCategory(null)
            }
            setSelectedProduct(null)
        } else {
            setSelectedCategory(null)
            setSelectedProduct(null)
        }
    }, [selectedFamily])

    const handleGo = () => {
        if (selectedProduct) {
            router.push(`${basePath}/catalog/finished-products/${selectedProduct.family_slug}/${selectedProduct.category_slug}/${selectedProduct.sku_code}`)
        }
    }

    const reset = () => {
        setSelectedFamily(null)
        setSelectedCategory(null)
        setSelectedProduct(null)
    }

    return (
        <div className="w-full max-w-5xl mx-auto mb-16 px-4">
            <div className="bg-white rounded-[2rem] border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-col md:flex-row items-stretch overflow-visible min-h-[80px]">

                {/* Segment: FAMILIA */}
                <div className="flex-1 flex items-center px-6 py-4 md:py-0 border-b md:border-b-0 md:border-r border-slate-100 relative group">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center mr-4 group-hover:bg-slate-100 transition-colors">
                        <Filter className="h-4 w-4 text-slate-400" />
                    </div>
                    <Popover open={openFamily} onOpenChange={setOpenFamily}>
                        <PopoverTrigger asChild>
                            <button className="flex-1 text-left outline-none">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Familia</p>
                                <p className={cn(
                                    "text-sm font-semibold truncate",
                                    selectedFamily ? "text-slate-900" : "text-slate-400"
                                )}>
                                    {selectedFamily ? selectedFamily.name : "Seleccionar..."}
                                </p>
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[300px] p-2 rounded-2xl shadow-2xl border-slate-100" align="start">
                            <div className="space-y-1 max-h-[300px] overflow-y-auto pr-1">
                                {families.map((f) => (
                                    <button
                                        key={f.slug}
                                        onClick={() => {
                                            setSelectedFamily(f)
                                            setOpenFamily(false)
                                        }}
                                        className={cn(
                                            "w-full text-left px-4 py-3 rounded-xl text-sm transition-all hover:bg-blue-50 hover:text-[#0e0c9b]",
                                            selectedFamily?.slug === f.slug ? "bg-blue-50 text-[#0e0c9b] font-bold" : "text-slate-600 font-medium"
                                        )}
                                    >
                                        {f.name}
                                    </button>
                                ))}
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>

                {/* Divider Icon (Desktop) */}
                <div className="hidden md:flex items-center justify-center -mx-4 z-10 w-8 h-8 rounded-full bg-white border border-slate-100 shadow-sm text-slate-300">
                    <ChevronRight className="h-4 w-4" />
                </div>

                {/* Segment: CATEGORÍA */}
                <div className={cn(
                    "flex-1 flex items-center px-6 py-4 md:py-0 border-b md:border-b-0 md:border-r border-slate-100 relative group transition-opacity",
                    !selectedFamily && "opacity-50 pointer-events-none"
                )}>
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center mr-4">
                        <Search className="h-4 w-4 text-slate-400" />
                    </div>
                    <Popover open={openCategory} onOpenChange={setOpenCategory}>
                        <PopoverTrigger asChild>
                            <button className="flex-1 text-left outline-none disabled:cursor-not-allowed">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Categoría</p>
                                <p className={cn(
                                    "text-sm font-semibold truncate",
                                    selectedCategory ? "text-slate-900" : "text-slate-400"
                                )}>
                                    {selectedCategory ? selectedCategory.name : "Seleccionar..."}
                                </p>
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[300px] p-2 rounded-2xl shadow-2xl border-slate-100" align="start">
                            <div className="space-y-1 max-h-[300px] overflow-y-auto pr-1">
                                {selectedFamily?.categories.map((c) => (
                                    <button
                                        key={c.slug}
                                        onClick={() => {
                                            setSelectedCategory(c)
                                            setSelectedProduct(null)
                                            setOpenCategory(false)
                                        }}
                                        className={cn(
                                            "w-full text-left px-4 py-3 rounded-xl text-sm flex justify-between items-center group transition-all hover:bg-blue-50 hover:text-[#0e0c9b]",
                                            selectedCategory?.slug === c.slug ? "bg-blue-50 text-[#0e0c9b] font-bold" : "text-slate-600 font-medium"
                                        )}
                                    >
                                        <span>{c.name}</span>
                                        <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-full text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600">{c.products.length}</span>
                                    </button>
                                ))}
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>

                {/* Divider Icon (Desktop) */}
                <div className="hidden md:flex items-center justify-center -mx-4 z-10 w-8 h-8 rounded-full bg-white border border-slate-100 shadow-sm text-slate-300">
                    <Sparkles className="h-4 w-4" />
                </div>

                {/* Segment: VARIANTE */}
                <div className={cn(
                    "flex-1 flex items-center px-6 py-4 md:py-0 border-b md:border-b-0 border-slate-100 relative group transition-opacity",
                    !selectedCategory && "opacity-50 pointer-events-none"
                )}>
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center mr-4">
                        <Package className="h-4 w-4 text-slate-400" />
                    </div>
                    <Popover open={openProduct} onOpenChange={setOpenProduct}>
                        <PopoverTrigger asChild>
                            <button className="flex-1 text-left outline-none">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Variante</p>
                                <p className={cn(
                                    "text-sm font-semibold truncate",
                                    selectedProduct ? "text-slate-900" : "text-slate-400"
                                )}>
                                    {selectedProduct ? `${selectedProduct.base_product} ${selectedProduct.variant}` : "Seleccionar..."}
                                </p>
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[350px] p-2 rounded-2xl shadow-2xl border-slate-100" align="start">
                            <div className="space-y-1 max-h-[300px] overflow-y-auto pr-1">
                                {selectedCategory?.products.map((p) => (
                                    <button
                                        key={p.sku_code}
                                        onClick={() => {
                                            setSelectedProduct(p)
                                            setOpenProduct(false)
                                        }}
                                        className={cn(
                                            "w-full text-left px-4 py-3 rounded-xl text-xs transition-all hover:bg-blue-50 hover:text-[#0e0c9b] flex items-center justify-between gap-2",
                                            selectedProduct?.sku_code === p.sku_code ? "bg-blue-50 text-[#0e0c9b] font-bold" : "text-slate-600 font-medium"
                                        )}
                                    >
                                        <span className="truncate">{p.base_product} {p.variant}</span>
                                        <span className="text-[9px] font-mono text-slate-400 shrink-0 uppercase">{p.sku_code}</span>
                                    </button>
                                ))}
                            </div>
                        </PopoverContent>
                    </Popover>
                    {selectedProduct && (
                        <button
                            onClick={(e) => { e.stopPropagation(); reset(); }}
                            className="ml-2 p-1 rounded-full hover:bg-slate-100 text-slate-400"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    )}
                </div>

                {/* Action Button: IR */}
                <div className="p-4 flex items-center justify-center">
                    <Button
                        onClick={handleGo}
                        disabled={!selectedProduct}
                        className={cn(
                            "h-14 px-8 rounded-2xl font-bold flex items-center gap-2 shadow-lg transition-all",
                            selectedProduct
                                ? "bg-slate-800 hover:bg-slate-900 border-none text-white hover:scale-105 active:scale-95"
                                : "bg-slate-100 text-slate-400 border-none cursor-not-allowed"
                        )}
                    >
                        <span>Ir</span>
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
