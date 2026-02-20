import rawMaterialsData from '@/data/raw-materials.json'
import finishedProductsData from '@/data/finished-products.json'
import type {
    RawMaterial,
    FinishedProduct,
    RawMaterialsData,
    FinishedProductsData,
    ProductFamily,
    ProductCategory
} from './types'

export const DEFAULT_FAMILIES = [
    {
        name: 'Cuidado del Hogar',
        slug: 'cuidado-del-hogar',
        categories: [
            { name: 'Limpiador Líquido Multiusos', slug: 'limpiador-liquido-multiusos' },
            { name: 'Detergente líquido para Trates', slug: 'detergente-liquido-para-trates' },
            { name: 'Aromatizantes Ambientales', slug: 'aromatizantes-ambientales' },
            { name: 'Bases de Limpiadores Líquidos Multiusos', slug: 'bases-de-limpiadores-liquidos-multiusos' },
            { name: 'Bases de Aromatizantes Ambientales', slug: 'bases-de-aromatizantes-ambientales' },
            { name: 'Especialidad Cuidado del Hogar', slug: 'especialidad-cuidado-del-hogar' },
        ]
    },
    {
        name: 'Lavandería',
        slug: 'lavanderia',
        categories: [
            { name: 'Detergente Líquido para Ropa', slug: 'detergente-liquido-para-ropa' },
            { name: 'Suavizantes Líquidos para Telas', slug: 'suavizantes-liquidos-para-telas' },
            { name: 'Especialidad Lavandería', slug: 'especialidad-lavanderia' },
        ]
    },
    {
        name: 'Línea Automotriz',
        slug: 'linea-automotriz',
        categories: [
            { name: 'Automotriz', slug: 'automotriz' }
        ]
    },
    {
        name: 'Línea Antibacterial',
        slug: 'linea-antibacterial',
        categories: [
            { name: 'General', slug: 'general' }
        ]
    },
    {
        name: 'Cuidado Personal',
        slug: 'cuidado-personal',
        categories: [
            { name: 'Jabón Líquido para Manos', slug: 'jabon-liquido-para-manos' },
            { name: 'Shampoo Capilar', slug: 'shampoo-capilar' },
            { name: 'Enjuague Capilar', slug: 'enjuague-capilar' },
            { name: 'Crema Corporal', slug: 'crema-corporal' },
        ]
    },
]

export function getRawMaterials(): RawMaterial[] {
    return (rawMaterialsData as unknown as RawMaterialsData).items || []
}

export function getRawMaterialByCode(code: string): RawMaterial | undefined {
    const materials = getRawMaterials()
    return materials.find(m => m.code === code)
}

export function getRawMaterialsCount(): number {
    return (rawMaterialsData as unknown as RawMaterialsData).count || 0
}

export function getFinishedProductFamilies(): ProductFamily[] {
    const dataFamilies = (finishedProductsData as unknown as FinishedProductsData).families || []

    return DEFAULT_FAMILIES.map(df => {
        const dataFamily = dataFamilies.find(f => f.slug === df.slug)

        // Map categories from defaults
        const categories: ProductCategory[] = df.categories.map(dc => {
            const dataCat = dataFamily?.categories.find(c => c.slug === dc.slug)

            // Normalize products: prioritize dataCat (spreadsheet)
            // Use specific SKU or Name matching to avoid duplicates during merge if necessary
            let products = [...(dataCat?.products || [])]
            const spreadsheetSkus = new Set(products.map(p => p.sku_code))

            // Add fallback products from defaults that aren't in spreadsheet
            if ((dc as any).products) {
                (dc as any).products.forEach((p: any) => {
                    if (!spreadsheetSkus.has(p.sku_code)) {
                        products.push(p)
                    }
                })
            }

            // Fix for Especialidades: use base_product from spreadsheet if variant is missing
            products = products.map(p => {
                const isEspecialidad = p.category?.includes('Especialidad') || dc.name.includes('Especialidad')
                if (isEspecialidad && p.base_product && (!p.variant || p.variant === 'General')) {
                    // Swap them if it looks like the spreadsheet format where base_product is the specific name
                    return {
                        ...p,
                        variant: p.base_product,
                        base_product: dc.name // Or keep it as is if preferred
                    }
                }
                return p
            })

            const count = dataCat?.count || products.length

            return {
                ...dc,
                products: products.map((p: any) => ({
                    ...p,
                    family: df.name,
                    family_slug: df.slug,
                    category: dc.name,
                    category_slug: dc.slug
                })),
                count,
                family: df.name,
                family_slug: df.slug
            } as ProductCategory
        })

        // Add any data categories not in defaults
        if (dataFamily) {
            dataFamily.categories.forEach(dc => {
                if (!categories.find(c => c.slug === dc.slug)) {
                    categories.push({
                        ...dc,
                        family: df.name,
                        family_slug: df.slug
                    } as ProductCategory)
                }
            })
        }

        const totalCount = categories.reduce((sum, c) => sum + (c.count || 0), 0)

        return {
            ...df,
            categories,
            count: totalCount
        } as ProductFamily
    })
}

export function getAllFinishedProducts(): FinishedProduct[] {
    const families = getFinishedProductFamilies()
    const allProducts: FinishedProduct[] = []

    families.forEach(family => {
        family.categories?.forEach(category => {
            category.products?.forEach(product => {
                allProducts.push(product)
            })
        })
    })

    return allProducts
}

export function getFinishedProductsCount(): number {
    const families = getFinishedProductFamilies()
    return families.reduce((sum, f) => sum + (f.count || 0), 0)
}

export function getFamilyBySlug(slug: string): ProductFamily | undefined {
    const families = getFinishedProductFamilies()
    return families.find(f => f.slug === slug)
}

export function getCategoryBySlug(familySlug: string, categorySlug: string): ProductCategory | undefined {
    const family = getFamilyBySlug(familySlug)
    if (!family) return undefined
    return family.categories.find(c => c.slug === categorySlug)
}

export function getProductBySku(familySlug: string, categorySlug: string, sku: string): FinishedProduct | undefined {
    const category = getCategoryBySlug(familySlug, categorySlug)
    if (!category) return undefined
    return category.products.find(p => p.sku_code === sku)
}

export function getUniqueValues(items: RawMaterial[], field: keyof RawMaterial): string[] {
    const values = new Set<string>()
    items.forEach(item => {
        const value = item[field]
        if (value && typeof value === 'string') {
            values.add(value)
        }
    })
    return Array.from(values).sort()
}
