import { chromium } from 'playwright';
import path from 'path';

async function run() {
    console.log('Starting Playwright verification...');
    const browser = await chromium.launch();
    const context = await browser.newContext({
        viewport: { width: 1280, height: 800 }
    });
    const page = await context.newPage();

    const urls = [
        { name: 'families', url: 'http://localhost:3000/catalog/finished-products' },
        { name: 'hogar', url: 'http://localhost:3000/catalog/finished-products/cuidado-del-hogar' },
        { name: 'lavanderia', url: 'http://localhost:3000/catalog/finished-products/lavanderia' },
        { name: 'personal', url: 'http://localhost:3000/catalog/finished-products/cuidado-personal' },
        { name: 'automotriz', url: 'http://localhost:3000/catalog/finished-products/linea-automotriz' },
        { name: 'antibacterial', url: 'http://localhost:3000/catalog/finished-products/linea-antibacterial' }
    ];

    for (const item of urls) {
        try {
            console.log(`Navigating to ${item.url}...`);
            await page.goto(item.url, { waitUntil: 'networkidle' });
            const screenshotPath = `verify-${item.name}.png`;
            await page.screenshot({ path: screenshotPath });
            console.log(`Screenshot saved to ${screenshotPath}`);
        } catch (e) {
            console.error(`Failed to capture ${item.name}: ${e.message}`);
        }
    }

    await browser.close();
    console.log('Done!');
}

run();
