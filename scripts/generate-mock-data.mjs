import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data');

const mockMP = {
    items: [
        {
            code: "MP-001",
            name: "Ácido Sulfúrico 98%",
            cas: "7664-93-9",
            transport_name: "Ácido Sulfúrico, Solución",
            functional_category: "Ácidos Inorgánicos",
            chemical_family: "Ácidos Fuertes",
            disposition: "Restringido",
            provider: "ChemCorp",
            provider_code: "CHM-001",
            lead_time_days: "5"
        },
        {
            code: "MP-002",
            name: "Hidróxido de Sodio 50%",
            cas: "1310-73-2",
            transport_name: "Hidróxido de Sodio, Solución",
            functional_category: "Bases Inorgánicas",
            chemical_family: "Bases Fuertes",
            disposition: "Crítico",
            provider: "Alkali Inc",
            provider_code: "ALK-50",
            lead_time_days: "3"
        },
        {
            code: "MP-003",
            name: "Glicerina USP",
            cas: "56-81-5",
            transport_name: "Glicerol",
            functional_category: "Humectantes",
            chemical_family: "Alcoholes Polihídricos",
            disposition: "General",
            provider: "BioGlycerin",
            provider_code: "GLY-USP",
            lead_time_days: "7"
        }
    ],
    count: 3,
    lastUpdated: new Date().toISOString()
};

const mockPT = {
    families: [
        {
            name: "Cuidado del Hogar",
            slug: "cuidado-del-hogar",
            count: 2,
            categories: [
                {
                    name: "Limpiadores Multiusos",
                    slug: "limpiadores-multiusos",
                    family: "Cuidado del Hogar",
                    family_slug: "cuidado-del-hogar",
                    count: 2,
                    products: [
                        {
                            sku_code: "PT-H-001-01",
                            base_product: "Limpiador Lavanda",
                            variant: "Lavanda",
                            status: "Activo",
                            updated_at: "2024-01-20"
                        },
                        {
                            sku_code: "PT-H-001-02",
                            base_product: "Limpiador Pino",
                            variant: "Pino",
                            status: "Activo",
                            updated_at: "2024-01-21"
                        }
                    ]
                }
            ]
        },
        {
            name: "Lavandería",
            slug: "lavanderia",
            count: 1,
            categories: [
                {
                    name: "Detergentes Líquidos",
                    slug: "detergentes-liquidos",
                    family: "Lavandería",
                    family_slug: "lavanderia",
                    count: 1,
                    products: [
                        {
                            sku_code: "PT-L-001-01",
                            base_product: "Detergente Ultra",
                            variant: "Original",
                            status: "Activo",
                            updated_at: "2024-01-22"
                        }
                    ]
                }
            ]
        }
    ],
    count: 3,
    lastUpdated: new Date().toISOString()
};

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);

fs.writeFileSync(path.join(DATA_DIR, 'raw-materials.json'), JSON.stringify(mockMP, null, 2));
fs.writeFileSync(path.join(DATA_DIR, 'finished-products.json'), JSON.stringify(mockPT, null, 2));

console.log("✅ Mock data generated successfully!");
