import { getCategoryBySlug, getFinishedProductFamilies } from '@/lib/data'
import CategoryProductsContent from './CategoryProductsContent'

export const dynamic = 'force-static'

export async function generateStaticParams() {
    const families = getFinishedProductFamilies()
    const paths: { family: string; category: string }[] = []

    families.forEach((family) => {
        family.categories.forEach((category) => {
            paths.push({
                family: family.slug,
                category: category.slug,
            })
        })
    })

    return paths
}

interface PageProps {
    params: { family: string; category: string }
}

export default function CategoryProductsPage({ params }: PageProps) {
    const category = getCategoryBySlug(params.family, params.category)

    return (
        <CategoryProductsContent
            familySlug={params.family}
            categorySlug={params.category}
            category={category}
        />
    )
}
