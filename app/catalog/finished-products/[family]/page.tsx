import { DEFAULT_FAMILIES, getFamilyBySlug, getFinishedProductFamilies } from '@/lib/data'
import FamilyCategoriesContent from './FamilyCategoriesContent'

export const dynamic = 'force-static'

export async function generateStaticParams() {
    return DEFAULT_FAMILIES.map((family) => ({
        family: family.slug,
    }))
}

interface PageProps {
    params: { family: string }
}

export default function FamilyCategoriesPage({ params }: PageProps) {
    const family = getFamilyBySlug(params.family)

    return <FamilyCategoriesContent familySlug={params.family} family={family} />
}
