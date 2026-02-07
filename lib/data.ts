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
            {
                name: 'Limpiadores Líquidos Multiusos',
                slug: 'limpiadores-liquidos-multiusos',
                products: [
                    { sku_code: 'PT-CH-LLM-001', base_product: 'Limpiador Líquido Multiusos', variant: 'Limón', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-LLM-002', base_product: 'Limpiador Líquido Multiusos', variant: 'Violetas', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-LLM-003', base_product: 'Limpiador Líquido Multiusos', variant: 'Mar Fresco', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-LLM-004', base_product: 'Limpiador Líquido Multiusos', variant: 'Cascadas', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-LLM-005', base_product: 'Limpiador Líquido Multiusos', variant: 'Brisas', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-LLM-006', base_product: 'Limpiador Líquido Multiusos', variant: 'Canela', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-LLM-007', base_product: 'Limpiador Líquido Multiusos', variant: 'Chicle', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-LLM-008', base_product: 'Limpiador Líquido Multiusos', variant: 'Bosques', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-LLM-009', base_product: 'Limpiador Líquido Multiusos', variant: 'Lavanda Francesa', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-LLM-010', base_product: 'Limpiador Líquido Multiusos', variant: 'Peras y Manzanas', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-LLM-011', base_product: 'Limpiador Líquido Multiusos', variant: 'Menta', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-LLM-012', base_product: 'Limpiador Líquido Multiusos', variant: 'Stephany', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-LLM-013', base_product: 'Limpiador Líquido Multiusos', variant: 'Frutal', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-LLM-014', base_product: 'Limpiador Líquido Multiusos', variant: 'Gpoet', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-LLM-015', base_product: 'Limpiador Líquido Multiusos', variant: 'Manzana- Canela', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-LLM-016', base_product: 'Limpiador Líquido Multiusos', variant: 'Floralis', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-LLM-017', base_product: 'Limpiador Líquido Multiusos', variant: 'Alaska', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-LLM-018', base_product: 'Limpiador Líquido Multiusos', variant: 'Pino Cristalino', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-LLM-019', base_product: 'Limpiador Líquido Multiusos', variant: 'Pino Lechoso Blanco', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-LLM-020', base_product: 'Limpiador Líquido Multiusos', variant: 'Pino Lechoso Verde', status: 'Activo', updated_at: '2024-01-28' },
                ]
            } as any,
            {
                name: 'Detergentes Líquidos para Trastes',
                slug: 'detergentes-liquidos-para-trastes',
                products: [
                    { sku_code: 'PT-CH-DLT-001', base_product: 'Detergente líquido para Trastes', variant: 'Limón', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-DLT-002', base_product: 'Detergente líquido para Trastes', variant: 'Mandarina', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-DLT-003', base_product: 'Detergente líquido para Trastes', variant: 'Naranja', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-DLT-004', base_product: 'Detergente líquido para Trastes', variant: 'Toronja', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-DLT-005', base_product: 'Detergente líquido para Trastes', variant: 'Complete blue', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-DLT-006', base_product: 'Detergente líquido para Trastes', variant: 'Xpumax', status: 'Activo', updated_at: '2024-01-28' },
                ]
            } as any,
            {
                name: 'Aromatizantes Ambientales',
                slug: 'aromatizantes-ambientales',
                products: [
                    { sku_code: 'PT-CH-AA-001', base_product: 'Aromatizante ambiental líquido', variant: 'LUX', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-AA-002', base_product: 'Aromatizante ambiental líquido', variant: 'ETERGÍN', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-AA-003', base_product: 'Aromatizante ambiental líquido', variant: 'NÓRDICO', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-AA-004', base_product: 'Aromatizante ambiental líquido', variant: 'CHICA FRESA', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-AA-005', base_product: 'Aromatizante ambiental líquido', variant: 'FERRAGÍN', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-AA-006', base_product: 'Aromatizante ambiental líquido', variant: 'CANELA', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-AA-007', base_product: 'Aromatizante ambiental líquido', variant: 'HUGO', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-AA-008', base_product: 'Aromatizante ambiental líquido', variant: 'POLO', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-AA-009', base_product: 'Aromatizante ambiental líquido', variant: 'CAROLINA', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-AA-010', base_product: 'Aromatizante ambiental líquido', variant: 'DRAGÍN', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-AA-011', base_product: 'Aromatizante ambiental líquido', variant: 'ESTERGÍN', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-AA-012', base_product: 'Aromatizante ambiental líquido', variant: 'ANIMAL', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-AA-013', base_product: 'Aromatizante ambiental líquido', variant: 'GARDENIAS', status: 'Activo', updated_at: '2024-01-28' },
                ]
            } as any,
            { name: 'Bases de Limpiadores Líquidos Multiusos', slug: 'bases-de-limpiadores-liquidos-multiusos' },
            {
                name: 'Bases de Aromatizantes Ambientales',
                slug: 'bases-de-aromatizantes-ambientales',
                family: 'Cuidado del Hogar',
                family_slug: 'cuidado-del-hogar',
                products: [
                    { sku_code: 'PT-CH-BAA-001', base_product: 'Aromatizante ambiental líquido', variant: 'LUX', status: 'Activo', updated_at: '2024-01-29' },
                    { sku_code: 'PT-CH-BAA-002', base_product: 'Aromatizante ambiental líquido', variant: 'ETERGÍN', status: 'Activo', updated_at: '2024-01-29' },
                    { sku_code: 'PT-CH-BAA-003', base_product: 'Aromatizante ambiental líquido', variant: 'NÓRDICO', status: 'Activo', updated_at: '2024-01-29' },
                    { sku_code: 'PT-CH-BAA-004', base_product: 'Aromatizante ambiental líquido', variant: 'CHICA FRESA', status: 'Activo', updated_at: '2024-01-29' },
                    { sku_code: 'PT-CH-BAA-005', base_product: 'Aromatizante ambiental líquido', variant: 'FERRAGÍN', status: 'Activo', updated_at: '2024-01-29' },
                    { sku_code: 'PT-CH-BAA-006', base_product: 'Aromatizante ambiental líquido', variant: 'CANELA', status: 'Activo', updated_at: '2024-01-29' },
                    { sku_code: 'PT-CH-BAA-007', base_product: 'Aromatizante ambiental líquido', variant: 'HUGO', status: 'Activo', updated_at: '2024-01-29' },
                    { sku_code: 'PT-CH-BAA-008', base_product: 'Aromatizante ambiental líquido', variant: 'POLO', status: 'Activo', updated_at: '2024-01-29' },
                    { sku_code: 'PT-CH-BAA-010', base_product: 'Aromatizante ambiental líquido', variant: 'CAROLINA', status: 'Activo', updated_at: '2024-01-29' },
                    { sku_code: 'PT-CH-BAA-011', base_product: 'Aromatizante ambiental líquido', variant: 'DRAGÍN', status: 'Activo', updated_at: '2024-01-29' },
                    { sku_code: 'PT-CH-BAA-012', base_product: 'Aromatizante ambiental líquido', variant: 'ESTERGÍN', status: 'Activo', updated_at: '2024-01-29' },
                    { sku_code: 'PT-CH-BAA-013', base_product: 'Aromatizante ambiental líquido', variant: 'ANIMAL', status: 'Activo', updated_at: '2024-01-29' },
                    { sku_code: 'PT-CH-BAA-014', base_product: 'Aromatizante ambiental líquido', variant: 'GARDENIAS', status: 'Activo', updated_at: '2024-01-29' },
                ],
                count: 13
            } as any,
            {
                name: 'Especialidades Cuidado del Hogar',
                slug: 'especialidades-cuidado-del-hogar',
                products: [
                    { sku_code: 'PT-CH-ECH-001', base_product: 'Especialidad Cuidado del Hogar', variant: 'Aceite para Muebles', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-ECH-002', base_product: 'Especialidad Cuidado del Hogar', variant: 'Cloro en gel', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-ECH-003', base_product: 'Especialidad Cuidado del Hogar', variant: 'Cloro', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-ECH-004', base_product: 'Especialidad Cuidado del Hogar', variant: 'Quita Cochambre en Pasta', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-ECH-005', base_product: 'Especialidad Cuidado del Hogar', variant: 'Sarricida', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-ECH-006', base_product: 'Especialidad Cuidado del Hogar', variant: 'Sarrigel', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-ECH-007', base_product: 'Especialidad Cuidado del Hogar', variant: 'Detergente Líquido Neutro', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-ECH-008', base_product: 'Especialidad Cuidado del Hogar', variant: 'Insecticida', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-ECH-009', base_product: 'Especialidad Cuidado del Hogar', variant: 'Detergín', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-ECH-010', base_product: 'Especialidad Cuidado del Hogar', variant: 'Líquido para Mops', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-ECH-011', base_product: 'Especialidad Cuidado del Hogar', variant: 'Desengrasante líquido tipo Brasso', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-ECH-012', base_product: 'Especialidad Cuidado del Hogar', variant: 'Limpiador Líquido para Vidrios', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-ECH-013', base_product: 'Especialidad Cuidado del Hogar', variant: 'Detergente Líquido con Amoniaco', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-ECH-014', base_product: 'Especialidad Cuidado del Hogar', variant: 'Desengrasante líquido industrial', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-ECH-015', base_product: 'Especialidad Cuidado del Hogar', variant: 'Teflón Líquido', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-ECH-016', base_product: 'Especialidad Cuidado del Hogar', variant: 'Teflón Espeso', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-ECH-017', base_product: 'Especialidad Cuidado del Hogar', variant: 'Shampoo para Mascotas', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-CH-ECH-018', base_product: 'Especialidad Cuidado del Hogar', variant: 'Limpiador Líquido Multiusos c/acción Repelente', status: 'Activo', updated_at: '2024-01-28' },
                ]
            } as any,
        ]
    },
    {
        name: 'Lavandería',
        slug: 'lavanderia',
        categories: [
            {
                name: 'Detergentes Líquidos de Ropa',
                slug: 'detergentes-liquidos-de-ropa',
                family: 'Lavandería',
                family_slug: 'lavanderia',
                products: [
                    { sku_code: 'PT-LA-DLR-001', base_product: 'Detergente Líquido para Ropa', variant: 'Colorgín cristalino', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-LA-DLR-002', base_product: 'Detergente Líquido para Ropa', variant: 'Colorgin blanco', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-LA-DLR-003', base_product: 'Detergente Líquido para Ropa', variant: 'Colorgin negro', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-LA-DLR-004', base_product: 'Detergente Líquido para Ropa', variant: 'Giriel Clásico', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-LA-DLR-005', base_product: 'Detergente Líquido para Ropa', variant: 'Giriel Doble Poder', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-LA-DLR-006', base_product: 'Detergente Líquido para Ropa', variant: 'Pergín', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-LA-DLR-007', base_product: 'Detergente Líquido para Ropa', variant: 'Vivagin', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-LA-DLR-008', base_product: 'Detergente Líquido para Ropa', variant: 'Giriel Oxianillos', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-LA-DLR-009', base_product: 'Detergente Líquido para Ropa', variant: 'Sunset', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-LA-DLR-010', base_product: 'Detergente Líquido para Ropa', variant: 'Shampoo Ginez', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-LA-DLR-011', base_product: 'Detergente Líquido para Ropa', variant: 'Zotgin Rosa Ginez', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-LA-DLR-012', base_product: 'Detergente Líquido para Ropa', variant: 'Zotgin Blanco Ginez', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-LA-DLR-013', base_product: 'Detergente Líquido para Ropa', variant: 'Zotgin Azul Ginez', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-LA-DLR-014', base_product: 'Detergente Líquido para Ropa', variant: 'Aqua', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-LA-DLR-015', base_product: 'Detergente Líquido para Ropa', variant: 'Doncella', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-LA-DLR-016', base_product: 'Detergente Líquido para Ropa', variant: 'Perla', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-LA-DLR-017', base_product: 'Detergente Líquido para Ropa', variant: 'Encanto', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-LA-DLR-018', base_product: 'Detergente Líquido para Ropa', variant: 'Velgín', status: 'Activo', updated_at: '2024-01-28' },
                ],
                count: 18
            } as any,
            {
                name: 'Suavizantes Líquidos para Telas',
                slug: 'suavizantes-liquidos-para-telas',
                family: 'Lavandería',
                family_slug: 'lavanderia',
                products: [
                    { sku_code: 'PT-LA-SLT-001', base_product: 'Suavizante Líquido para Telas', variant: 'Sueño', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-LA-SLT-002', base_product: 'Suavizante Líquido para Telas', variant: 'Libre enjuague', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-LA-SLT-003', base_product: 'Suavizante Líquido para Telas', variant: 'Mágico', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-LA-SLT-004', base_product: 'Suavizante Líquido para Telas', variant: 'Intensity', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-LA-SLT-005', base_product: 'Suavizante Líquido para Telas', variant: 'Fresca naturaleza & confort', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-LA-SLT-006', base_product: 'Suavizante Líquido para Telas', variant: 'Suavidad de luna', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-LA-SLT-007', base_product: 'Suavizante Líquido para Telas', variant: 'Blue softener', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-LA-SLT-008', base_product: 'Suavizante Líquido para Telas', variant: 'Pasión', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-LA-SLT-009', base_product: 'Suavizante Líquido para Telas', variant: 'Sensación', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-LA-SLT-010', base_product: 'Suavizante Líquido para Telas', variant: 'Fresca primavera', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-LA-SLT-011', base_product: 'Suavizante Líquido para Telas', variant: 'Baby plus', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-LA-SLT-012', base_product: 'Suavizante Líquido para Telas', variant: 'Neutro', status: 'Activo', updated_at: '2024-01-28' },
                    { sku_code: 'PT-LA-SLT-013', base_product: 'Suavizante Líquido para Telas', variant: 'Deleite', status: 'Activo', updated_at: '2024-01-28' },
                ],
                count: 13
            } as any,
            { name: 'Reforzadores de Aroma', slug: 'reforzadores-de-aroma' },
            {
                name: 'Especialidades Lavandería',
                slug: 'especialidades-lavanderia',
                family: 'Lavandería',
                family_slug: 'lavanderia',
                products: [
                    { sku_code: 'PT-LA-EL-001', base_product: 'Especialidad Lavandería', variant: 'Desmugrador Ginez', status: 'Activo', updated_at: '2024-01-29' },
                    { sku_code: 'PT-LA-EL-002', base_product: 'Especialidad Lavandería', variant: 'Detergente líquido con aceite de pino', status: 'Activo', updated_at: '2024-01-29' },
                    { sku_code: 'PT-LA-EL-003', base_product: 'Especialidad Lavandería', variant: 'Quita manchas líquido Ginesh', status: 'Activo', updated_at: '2024-01-29' },
                    { sku_code: 'PT-LA-EL-004', base_product: 'Especialidad Lavandería', variant: 'Reforzador de aroma Ginez', status: 'Activo', updated_at: '2024-01-29' },
                    { sku_code: 'PT-LA-EL-005', base_product: 'Especialidad Lavandería', variant: 'Plancha fácil Ginez', status: 'Activo', updated_at: '2024-01-29' },
                ],
                count: 5
            } as any,
        ]
    },
    {
        name: 'Línea Automotriz',
        slug: 'linea-automotriz',
        categories: [
            {
                name: 'General',
                slug: 'general',
                family: 'Línea Automotriz',
                family_slug: 'linea-automotriz',
                products: [
                    { sku_code: 'PT-AU-001', base_product: 'Shampoo para carros con cera', variant: 'General', status: 'Activo', updated_at: '2024-01-24', tds_file_id: '1', sds_file_id: '1', internal_qc_file_id: '1' },
                    { sku_code: 'PT-AU-002', base_product: 'Alto Brillo', variant: 'General', status: 'Activo', updated_at: '2024-01-24', tds_file_id: '1', sds_file_id: '1', internal_qc_file_id: '1' },
                    { sku_code: 'PT-AU-003', base_product: 'Ginerol Líquido', variant: 'General', status: 'Activo', updated_at: '2024-01-24', tds_file_id: '1', sds_file_id: '1', internal_qc_file_id: '1' },
                    { sku_code: 'PT-AU-004', base_product: 'Ginerol Espeso', variant: 'General', status: 'Activo', updated_at: '2024-01-24', tds_file_id: '1', sds_file_id: '1', internal_qc_file_id: '1' },
                    { sku_code: 'PT-AU-005', base_product: 'Abrillantador Líquido', variant: 'General', status: 'Activo', updated_at: '2024-01-24', tds_file_id: '1', sds_file_id: '1', internal_qc_file_id: '1' },
                    { sku_code: 'PT-AU-006', base_product: 'Abrillantador Gel', variant: 'General', status: 'Activo', updated_at: '2024-01-24', tds_file_id: '1', sds_file_id: '1', internal_qc_file_id: '1' },
                ],
                count: 6
            } as any
        ]
    },
    {
        name: 'Línea Antibacterial',
        slug: 'linea-antibacterial',
        categories: [
            {
                name: 'General',
                slug: 'general',
                family: 'Línea Antibacterial',
                family_slug: 'linea-antibacterial',
                products: [
                    { sku_code: 'PT-AB-001', base_product: 'Gel antibacterial para manos Ginez', variant: 'General', status: 'Activo', updated_at: '2024-01-29' },
                    { sku_code: 'PT-AB-002', base_product: 'Líquido sanitizante Bakter Ginez', variant: 'General', status: 'Activo', updated_at: '2024-01-29' },
                    { sku_code: 'PT-AB-003', base_product: 'Limpiador líquido multiusos SAK Ginez', variant: 'General', status: 'Activo', updated_at: '2024-01-29' },
                    { sku_code: 'PT-AB-004', base_product: 'Jabón líquido para manos antibacterial MAKAZH', variant: 'General', status: 'Activo', updated_at: '2024-01-29' },
                    { sku_code: 'PT-AB-005', base_product: 'Detergente líquido para trastes GRAZO Ginez', variant: 'General', status: 'Activo', updated_at: '2024-01-29' },
                ],
                count: 5
            } as any
        ]
    },
    {
        name: 'Cuidado Personal',
        slug: 'cuidado-personal',
        categories: [
            {
                name: 'Jabones Líquidos para Manos',
                slug: 'jabones-liquidos-para-manos',
                family: 'Cuidado Personal',
                family_slug: 'cuidado-personal',
                products: [
                    { sku_code: 'PT-CP-JLM-001', base_product: 'Jabón Líquido para Manos', variant: 'JLM Peras y manzanas', status: 'Activo', updated_at: '2024-01-29' },
                    { sku_code: 'PT-CP-JLM-002', base_product: 'Jabón Líquido para Manos', variant: 'JLM Neutro', status: 'Activo', updated_at: '2024-01-29' },
                    { sku_code: 'PT-CP-JLM-003', base_product: 'Jabón Líquido para Manos', variant: 'JLM Cereza', status: 'Activo', updated_at: '2024-01-29' },
                    { sku_code: 'PT-CP-JLM-004', base_product: 'Jabón Líquido para Manos', variant: 'JLM Uva', status: 'Activo', updated_at: '2024-01-29' },
                    { sku_code: 'PT-CP-JLM-005', base_product: 'Jabón Líquido para Manos', variant: 'JLM Hierbas', status: 'Activo', updated_at: '2024-01-29' },
                    { sku_code: 'PT-CP-JLM-006', base_product: 'Jabón Líquido para Manos', variant: 'JLM Coco', status: 'Activo', updated_at: '2024-01-29' },
                ],
                count: 6
            } as any,
            {
                name: 'Shampoos Capilares',
                slug: 'shampoos-capilares',
                family: 'Cuidado Personal',
                family_slug: 'cuidado-personal',
                products: [
                    { sku_code: 'PT-CP-SC-001', base_product: 'Shampoo Capilar', variant: 'Shampoo Capilar Ginepant', status: 'Activo', updated_at: '2024-01-29' },
                    { sku_code: 'PT-CP-SC-002', base_product: 'Shampoo Capilar', variant: 'Shampoo Capilar Ginhead', status: 'Activo', updated_at: '2024-01-29' },
                ],
                count: 2
            } as any,
            {
                name: 'Enjuagues Capilares',
                slug: 'enjuagues-capilares',
                family: 'Cuidado Personal',
                family_slug: 'cuidado-personal',
                products: [
                    { sku_code: 'PT-CP-EC-001', base_product: 'Enjuague Capilar', variant: 'Enjuague capilar Ginez Rosas', status: 'Activo', updated_at: '2024-01-29' },
                ],
                count: 1
            } as any,
            {
                name: 'Cremas Corporales',
                slug: 'cremas-corporales',
                family: 'Cuidado Personal',
                family_slug: 'cuidado-personal',
                products: [
                    { sku_code: 'PT-CP-CC-001', base_product: 'Crema Corporal', variant: 'Delicatezza', status: 'Activo', updated_at: '2024-01-29' },
                ],
                count: 1
            } as any,
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
    const dataFamilies = (finishedProductsData as FinishedProductsData).families || []

    return DEFAULT_FAMILIES.map(df => {
        const dataFamily = dataFamilies.find(f => f.slug === df.slug)

        // Map categories from defaults
        const categories: ProductCategory[] = df.categories.map(dc => {
            const dataCat = dataFamily?.categories.find(c => c.slug === dc.slug)

            // Merge products: priority to dataCat, fallback to dc.products
            const products = dataCat?.products || (dc as any).products || []
            const count = dataCat?.count || (dc as any).count || products.length

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
