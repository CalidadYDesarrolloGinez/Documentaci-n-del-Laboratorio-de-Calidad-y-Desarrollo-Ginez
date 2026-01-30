import { chromium } from 'playwright';
import path from 'path';
import os from 'os';

async function run() {
    console.log('Starting Playwright test...');
    console.log('HOME:', process.env.HOME);
    console.log('USERPROFILE:', process.env.USERPROFILE);

    // Fallback HOME if missing
    if (!process.env.HOME) {
        process.env.HOME = process.env.USERPROFILE || os.homedir();
        console.log('Set HOME fallback to:', process.env.HOME);
    }

    const browser = await chromium.launch();
    const page = await browser.newPage();
    console.log('Navigating to http://localhost:3000...');
    await page.goto('http://localhost:3000');

    const title = await page.title();
    console.log('Page title:', title);

    await page.screenshot({ path: 'playwright-test-screenshot.png' });
    console.log('Screenshot saved to playwright-test-screenshot.png');

    await browser.close();
    console.log('Done!');
}

run().catch(err => {
    console.error('FAILED:', err);
    process.exit(1);
});
