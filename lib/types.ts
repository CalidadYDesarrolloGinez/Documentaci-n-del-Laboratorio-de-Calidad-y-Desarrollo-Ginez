// Raw Material (Materia Prima)
export interface RawMaterial {
    code: string
    name: string
    cas: string
    transport_name: string
    functional_category: string
    chemical_family: string
    disposition: string
    provider?: string
    provider_code?: string
    lead_time_days?: string
    // Document file IDs
    tds_file_id?: string
    sds_file_id?: string
    coa_cedis_file_id?: string
    coa_branches_file_id?: string
    label_file_id?: string
    // Computed URLs (added by build script)
    tds_view_url?: string
    tds_download_url?: string
    sds_view_url?: string
    sds_download_url?: string
    coa_cedis_view_url?: string
    coa_cedis_download_url?: string
    coa_branches_view_url?: string
    coa_branches_download_url?: string
    label_view_url?: string
    label_download_url?: string
}

// Finished Product (Producto Terminado)
export interface FinishedProduct {
    family: string
    family_slug: string
    category: string
    category_slug: string
    sku_code: string
    base_product: string
    variant: string
    status: 'Activo' | 'Inactivo' | string
    updated_at: string
    // Document file IDs
    tds_file_id?: string
    sds_file_id?: string
    internal_qc_file_id?: string
    label_file_id?: string
    // Computed URLs
    tds_view_url?: string
    tds_download_url?: string
    sds_view_url?: string
    sds_download_url?: string
    internal_qc_view_url?: string
    internal_qc_download_url?: string
    label_view_url?: string
    label_download_url?: string
}

// Family grouping for PT navigation
export interface ProductFamily {
    name: string
    slug: string
    categories: ProductCategory[]
    count: number
}

export interface ProductCategory {
    name: string
    slug: string
    family: string
    family_slug: string
    products: FinishedProduct[]
    count: number
}

// Data structure loaded from JSON files
export interface RawMaterialsData {
    items: RawMaterial[]
    count: number
    lastUpdated: string
}

export interface FinishedProductsData {
    families: ProductFamily[]
    count: number
    lastUpdated: string
}

// Filter option type
export interface FilterOption {
    value: string
    label: string
    count?: number
}

// Module for Panel Principal
export interface AppModule {
    id: string
    title: string
    description: string
    icon: string
    href: string
    active: boolean
}
