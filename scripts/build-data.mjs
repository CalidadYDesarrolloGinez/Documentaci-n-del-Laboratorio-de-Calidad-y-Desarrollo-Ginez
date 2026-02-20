#!/usr/bin/env node
/**
 * build-data.mjs
 * Downloads CSV from Google Sheets, validates with Zod, and generates JSON data files.
 * 
 * Environment Variables:
 * - SHEET_MP_CSV_URL: URL to published CSV for Materias Primas
 * - SHEET_PT_CSV_URL: URL to published CSV for Productos Terminados
 */

import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data');

// ============================================================================
// CONFIGURATION
// ============================================================================

const SHEET_MP_CSV_URL = process.env.SHEET_MP_CSV_URL || 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTFKJ54e57piNVk-IBmr3Ykl7-N4LN5QRwo7A83UmbAyF_oclIcQZSgc7QHid91hHb2N_SIi7lRcKZd/pub?gid=1344191871&single=true&output=csv';
const SHEET_PT_CSV_URL = process.env.SHEET_PT_CSV_URL;

// Required columns for MP
const MP_REQUIRED_COLUMNS = [
    'code',
    'name',
    'cas',
    'transport_name',
    'functional_category',
    'chemical_family',
    'disposition'
];

// Required columns for PT
const PT_REQUIRED_COLUMNS = [
    'family',
    'category',
    'sku_code',
    'base_product',
    'variant',
    'status',
    'updated_at'
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Slugify a string for URL-friendly paths
 */
function slugify(text) {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

/**
 * Generate Google Drive view URL from file ID
 */
function getDriveViewUrl(fileId) {
    if (!fileId || fileId.trim() === '') return null;
    return `https://drive.google.com/file/d/${fileId.trim()}/view?usp=sharing`;
}

/**
 * Generate Google Drive download URL from file ID
 */
function getDriveDownloadUrl(fileId) {
    if (!fileId || fileId.trim() === '') return null;
    return `https://drive.google.com/uc?export=download&id=${fileId.trim()}`;
}

/**
 * Validate date format YYYY-MM-DD
 */
function isValidDate(dateString) {
    if (!dateString) return false;
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
}

/**
 * Fetch CSV from URL
 */
async function fetchCSV(url, name) {
    console.log(`📥 Fetching ${name} CSV...`);

    if (!url) {
        console.log(`⚠️  No URL provided for ${name}, using empty data`);
        return null;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        const text = await response.text();
        console.log(`✅ Successfully fetched ${name} CSV (${text.length} bytes)`);
        return text;
    } catch (error) {
        console.error(`❌ Failed to fetch ${name} CSV:`, error.message);
        throw error;
    }
}

/**
 * Parse CSV text to array of objects
 */
function parseCSV(csvText) {
    return parse(csvText, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
    });
}

/**
 * Validate required columns exist
 */
function validateColumns(records, requiredColumns, name) {
    if (records.length === 0) {
        console.log(`⚠️  No records found in ${name}`);
        return;
    }

    const headers = Object.keys(records[0]);
    const missingColumns = requiredColumns.filter(col => !headers.includes(col));

    if (missingColumns.length > 0) {
        throw new Error(
            `❌ Missing required columns in ${name}: ${missingColumns.join(', ')}\n` +
            `   Found columns: ${headers.join(', ')}`
        );
    }

    console.log(`✅ All required columns present in ${name}`);
}

/**
 * Check for duplicate values in a column
 */
function checkDuplicates(records, column, name) {
    const seen = new Set();
    const duplicates = [];

    records.forEach((record, index) => {
        const value = record[column];
        if (value && seen.has(value)) {
            duplicates.push({ value, row: index + 2 }); // +2 for header and 0-index
        }
        seen.add(value);
    });

    if (duplicates.length > 0) {
        throw new Error(
            `❌ Duplicate ${column} values in ${name}:\n` +
            duplicates.map(d => `   Row ${d.row}: "${d.value}"`).join('\n')
        );
    }

    console.log(`✅ No duplicate ${column} values in ${name}`);
}

// ============================================================================
// DATA PROCESSING
// ============================================================================

/**
 * Process Raw Materials data
 */
function processRawMaterials(records) {
    console.log('\n🔬 Processing Raw Materials...');

    validateColumns(records, MP_REQUIRED_COLUMNS, 'MP');
    checkDuplicates(records, 'code', 'MP');

    const items = records.map((record) => ({
        code: record.code,
        name: record.name,
        cas: record.cas || '',
        transport_name: record.transport_name || '',
        functional_category: record.functional_category,
        chemical_family: record.chemical_family,
        disposition: record.disposition,
        provider: record.provider || '',
        provider_code: record.provider_code || '',
        lead_time_days: record.lead_time_days || '',
        // File IDs - handle typo coa_cedis_file_ed from sheet
        tds_file_id: record.tds_file_id || '',
        sds_file_id: record.sds_file_id || '',
        coa_cedis_file_id: record.coa_cedis_file_id || record.coa_cedis_file_ed || '',
        coa_branches_file_id: record.coa_branches_file_id || '',
        label_file_id: record.label_file_id || '',
        // Generated URLs
        tds_view_url: getDriveViewUrl(record.tds_file_id),
        tds_download_url: getDriveDownloadUrl(record.tds_file_id),
        sds_view_url: getDriveViewUrl(record.sds_file_id),
        sds_download_url: getDriveDownloadUrl(record.sds_file_id),
        coa_cedis_view_url: getDriveViewUrl(record.coa_cedis_file_id || record.coa_cedis_file_ed),
        coa_cedis_download_url: getDriveDownloadUrl(record.coa_cedis_file_id || record.coa_cedis_file_ed),
        coa_branches_view_url: getDriveViewUrl(record.coa_branches_file_id),
        coa_branches_download_url: getDriveDownloadUrl(record.coa_branches_file_id),
        label_view_url: getDriveViewUrl(record.label_file_id),
        label_download_url: getDriveDownloadUrl(record.label_file_id),
    }));

    console.log(`✅ Processed ${items.length} raw materials`);

    return {
        items,
        count: items.length,
        lastUpdated: new Date().toISOString(),
    };
}

/**
 * Process Finished Products data
 */
function processFinishedProducts(records) {
    console.log('\n📦 Processing Finished Products...');

    validateColumns(records, PT_REQUIRED_COLUMNS, 'PT');
    checkDuplicates(records, 'sku_code', 'PT');

    // Validate dates
    const invalidDates = records.filter((r, i) => {
        if (!isValidDate(r.updated_at)) {
            console.warn(`⚠️  Invalid date in row ${i + 2}: "${r.updated_at}"`);
            return true;
        }
        return false;
    });

    if (invalidDates.length > 0) {
        throw new Error(
            `❌ Invalid updated_at dates found in PT (expected YYYY-MM-DD format)`
        );
    }

    // Check for empty family/category
    const emptyFamilyCategory = records.filter((r, i) => {
        if (!r.family || !r.category) {
            console.warn(`⚠️  Empty family/category in row ${i + 2}`);
            return true;
        }
        return false;
    });

    if (emptyFamilyCategory.length > 0) {
        throw new Error(`❌ Empty family or category values found in PT`);
    }

    // Group by family and category
    const familyMap = new Map();

    records.forEach((record) => {
        const familySlug = slugify(record.family);
        const categorySlug = slugify(record.category);

        if (!familyMap.has(familySlug)) {
            familyMap.set(familySlug, {
                name: record.family,
                slug: familySlug,
                categories: new Map(),
            });
        }

        const family = familyMap.get(familySlug);

        if (!family.categories.has(categorySlug)) {
            family.categories.set(categorySlug, {
                name: record.category,
                slug: categorySlug,
                family: record.family,
                family_slug: familySlug,
                products: [],
            });
        }

        const category = family.categories.get(categorySlug);

        category.products.push({
            family: record.family,
            family_slug: familySlug,
            category: record.category,
            category_slug: categorySlug,
            sku_code: record.sku_code,
            base_product: record.base_product,
            variant: record.variant,
            status: record.status,
            updated_at: record.updated_at,
            // File IDs
            tds_file_id: record.tds_file_id || '',
            sds_file_id: record.sds_file_id || '',
            internal_qc_file_id: record.internal_qc_file_id || '',
            label_file_id: record.label_file_id || '',
            // Generated URLs
            tds_view_url: getDriveViewUrl(record.tds_file_id),
            tds_download_url: getDriveDownloadUrl(record.tds_file_id),
            sds_view_url: getDriveViewUrl(record.sds_file_id),
            sds_download_url: getDriveDownloadUrl(record.sds_file_id),
            internal_qc_view_url: getDriveViewUrl(record.internal_qc_file_id),
            internal_qc_download_url: getDriveDownloadUrl(record.internal_qc_file_id),
            label_view_url: getDriveViewUrl(record.label_file_id),
            label_download_url: getDriveDownloadUrl(record.label_file_id),
        });
    });

    // Convert maps to arrays
    const families = Array.from(familyMap.values()).map((family) => ({
        name: family.name,
        slug: family.slug,
        categories: Array.from(family.categories.values()).map((cat) => ({
            ...cat,
            count: cat.products.length,
        })),
        count: Array.from(family.categories.values()).reduce(
            (sum, cat) => sum + cat.products.length,
            0
        ),
    }));

    const totalCount = families.reduce((sum, f) => sum + f.count, 0);

    console.log(`✅ Processed ${totalCount} finished products in ${families.length} families`);

    return {
        families,
        count: totalCount,
        lastUpdated: new Date().toISOString(),
    };
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
    console.log('🚀 Starting data build process...\n');

    // Ensure data directory exists
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    let mpData = { items: [], count: 0, lastUpdated: new Date().toISOString() };
    let ptData = { families: [], count: 0, lastUpdated: new Date().toISOString() };

    // Process MP
    try {
        const mpCSV = await fetchCSV(SHEET_MP_CSV_URL, 'MP');
        if (mpCSV) {
            const mpRecords = parseCSV(mpCSV);
            mpData = processRawMaterials(mpRecords);
        }
    } catch (error) {
        if (SHEET_MP_CSV_URL) {
            console.error('❌ MP processing failed:', error.message);
            process.exit(1);
        }
    }

    // Process PT
    try {
        const ptCSV = await fetchCSV(SHEET_PT_CSV_URL, 'PT');
        if (ptCSV) {
            const ptRecords = parseCSV(ptCSV);
            ptData = processFinishedProducts(ptRecords);
        }
    } catch (error) {
        if (SHEET_PT_CSV_URL) {
            console.error('❌ PT processing failed:', error.message);
            process.exit(1);
        }
    }

    // Write output files
    console.log('\n💾 Writing data files...');

    fs.writeFileSync(
        path.join(DATA_DIR, 'raw-materials.json'),
        JSON.stringify(mpData, null, 2)
    );
    console.log('✅ Written data/raw-materials.json');

    fs.writeFileSync(
        path.join(DATA_DIR, 'finished-products.json'),
        JSON.stringify(ptData, null, 2)
    );
    console.log('✅ Written data/finished-products.json');

    console.log('\n🎉 Data build completed successfully!');
    console.log(`   - Raw Materials: ${mpData.count} items`);
    console.log(`   - Finished Products: ${ptData.count} items`);
}

main().catch((error) => {
    console.error('\n💥 Build failed:', error);
    process.exit(1);
});
