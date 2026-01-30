# Quality Hub GINEZ

Portal estático para consulta y descarga de documentación de **Materias Primas (MP)** y **Productos Terminados (PT)**.

[![Deploy to GitHub Pages](https://github.com/YOUR_USERNAME/quality-hub/actions/workflows/deploy.yml/badge.svg)](https://github.com/YOUR_USERNAME/quality-hub/actions/workflows/deploy.yml)

## 🚀 Características

- 📦 **Catálogo de Materias Primas**: Tabla con búsqueda fuzzy y filtros avanzados
- 🏭 **Catálogo de Productos Terminados**: Navegación por familia → categoría → producto
- 📄 **Documentación integrada**: Fichas técnicas, hojas de seguridad, certificados
- 🔗 **Integración con Google Drive**: Ver y descargar PDFs directamente
- ⚡ **100% Estático**: Desplegable en GitHub Pages sin backend

## 📋 Requisitos Previos

- Node.js 18+
- Cuenta de Google para Sheets y Drive
- Repositorio en GitHub con Pages habilitado

## 🔧 Configuración

### 1. Crear el Google Sheet

Crea un Google Sheet con **dos pestañas**:

#### Pestaña `MP` (Materias Primas)

| Columna | Requerido | Descripción |
|---------|-----------|-------------|
| `code` | ✅ | Código único (ej: MP-001) |
| `name` | ✅ | Nombre químico |
| `cas` | ✅ | Número CAS |
| `transport_name` | ✅ | Nombre de transporte |
| `functional_category` | ✅ | Categoría funcional |
| `chemical_family` | ✅ | Familia química |
| `disposition` | ✅ | Disposición (General/Restringido/Crítico) |
| `provider` | ❌ | Nombre del proveedor |
| `provider_code` | ❌ | Código del proveedor |
| `lead_time_days` | ❌ | Tiempo de entrega en días |
| `tds_file_id` | ❌ | ID de archivo Drive para TDS |
| `sds_file_id` | ❌ | ID de archivo Drive para SDS |
| `coa_cedis_file_id` | ❌ | ID de archivo Drive para COA CEDIS |
| `coa_branches_file_id` | ❌ | ID de archivo Drive para COA Sucursales |
| `label_file_id` | ❌ | ID de archivo Drive para etiqueta |

#### Pestaña `PT` (Productos Terminados)

| Columna | Requerido | Descripción |
|---------|-----------|-------------|
| `family` | ✅ | Familia del producto |
| `category` | ✅ | Categoría del producto |
| `sku_code` | ✅ | Código SKU único (ej: PT-H-001-01) |
| `base_product` | ✅ | Nombre del producto base |
| `variant` | ✅ | Variante o aroma |
| `status` | ✅ | Estado (Activo/Inactivo) |
| `updated_at` | ✅ | Fecha de actualización (YYYY-MM-DD) |
| `tds_file_id` | ❌ | ID de archivo Drive para TDS |
| `sds_file_id` | ❌ | ID de archivo Drive para SDS |
| `internal_qc_file_id` | ❌ | ID de archivo Drive para QC interno |
| `label_file_id` | ❌ | ID de archivo Drive para etiqueta |

### 2. Publicar el Sheet como CSV

1. Abre tu Google Sheet
2. Ve a **Archivo → Compartir → Publicar en la web**
3. Selecciona la pestaña `MP` → formato `CSV` → **Publicar**
4. Copia la URL generada (será `SHEET_MP_CSV_URL`)
5. Repite para la pestaña `PT` (será `SHEET_PT_CSV_URL`)

### 3. Obtener IDs de archivos de Drive

Para cada PDF en Drive:
1. Abre el archivo en Drive
2. Haz clic en **Compartir** y establece "Cualquiera con el enlace puede ver"
3. Copia el ID del enlace: `https://drive.google.com/file/d/{FILE_ID}/view`
4. Pega solo el `FILE_ID` en la columna correspondiente del Sheet

### 4. Configurar Variables en GitHub

Ve a tu repositorio → **Settings** → **Secrets and variables** → **Actions** → **Variables** y agrega:

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `SHEET_MP_CSV_URL` | URL del CSV publicado para MP | `https://docs.google.com/spreadsheets/d/.../pub?gid=0&output=csv` |
| `SHEET_PT_CSV_URL` | URL del CSV publicado para PT | `https://docs.google.com/spreadsheets/d/.../pub?gid=123&output=csv` |
| `NEXT_PUBLIC_BASE_PATH` | Ruta base del sitio | `/quality-hub` (si el repo se llama quality-hub) |

### 5. Habilitar GitHub Pages

1. Ve a **Settings** → **Pages**
2. En **Source**, selecciona **GitHub Actions**

## 🛠️ Desarrollo Local

```bash
# Instalar dependencias
npm install

# Ejecutar build de datos (opcional, usa datos vacíos si no hay URLs)
node scripts/build-data.mjs

# Iniciar servidor de desarrollo
npm run dev

# Build de producción
npm run build
```

## 📁 Estructura del Proyecto

```
quality-hub/
├── app/
│   ├── page.tsx                           # Panel Principal
│   ├── layout.tsx                         # Layout raíz
│   └── catalog/
│       ├── page.tsx                       # Catálogo
│       ├── raw-materials/
│       │   ├── page.tsx                   # Tabla MP
│       │   └── [code]/page.tsx            # Detalle MP
│       └── finished-products/
│           ├── page.tsx                   # Familias
│           ├── [family]/page.tsx          # Categorías
│           ├── [family]/[category]/page.tsx      # Tabla PT
│           └── [family]/[category]/[sku]/page.tsx # Detalle PT
├── components/                            # Componentes UI
├── data/                                  # JSON generados
├── lib/                                   # Utilidades y tipos
├── scripts/
│   └── build-data.mjs                     # Script de build
└── .github/workflows/
    └── deploy.yml                         # CI/CD
```

## 🔄 Actualizar el Catálogo

1. **Edita el Google Sheet** con los nuevos datos
2. **Sube PDFs a Drive** y actualiza los `*_file_id` en el Sheet
3. **Push a main** o ejecuta el workflow manualmente
4. El sitio se actualiza automáticamente

## 📝 Validaciones del Build

El build fallará si:
- ❌ Faltan columnas requeridas en el Sheet
- ❌ Hay códigos duplicados (`code` en MP, `sku_code` en PT)
- ❌ Las fechas `updated_at` no tienen formato YYYY-MM-DD
- ❌ Hay valores vacíos en `family` o `category` de PT

## 🛡️ Seguridad

- El sitio es **público** (sin autenticación en MVP)
- Los PDFs en Drive deben tener permiso "Cualquiera con el enlace puede ver"
- Las URLs de CSV publicadas son de solo lectura

## 📄 Licencia

Proyecto interno de GINEZ.
