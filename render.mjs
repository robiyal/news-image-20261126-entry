// Render broadsheet.html (2400x3200) to PNG with Playwright, then
// downscale to 768x1024 with Pillow. Written fresh in-session for the
// news-image-20261126 entry (stable broadsheet template, new content).
// Usage: node render.mjs <broadsheet.html> <entry-2400.png> <entry.png>
import { chromium } from 'playwright';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const [htmlPath, bigPath, smallPath] = process.argv.slice(2);
if (!htmlPath || !bigPath || !smallPath) {
  console.error('usage: node render.mjs <html> <big.png> <entry.png>');
  process.exit(2);
}

const browser = await chromium.launch({
  executablePath:
    process.env.CHROMIUM_PATH ||
    '/home/hatch/.cache/ms-playwright/chromium-1148/chrome-linux/chrome',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});
const page = await browser.newPage({
  viewport: { width: 2400, height: 3200 },
  deviceScaleFactor: 1,
});
await page.goto('file://' + path.resolve(htmlPath), {
  waitUntil: 'networkidle',
});
await page.waitForTimeout(800);
await page.screenshot({ path: bigPath });
await browser.close();

// Downscale to the gate size: 768x1024, PNG, optimised.
execFileSync('python3', [
  '-c',
  'import sys; from PIL import Image; '
  + 'im = Image.open(sys.argv[1]).convert("RGB"); '
  + 'im = im.resize((768, 1024), Image.LANCZOS); '
  + 'im.save(sys.argv[2], "PNG", optimize=True)',
  bigPath,
  smallPath,
]);
const st = fs.statSync(smallPath);
console.log(`rendered ${smallPath}: ${st.size} bytes`);
if (st.size > 1048576) {
  console.error('FAIL: entry.png exceeds 1 MiB');
  process.exit(1);
}
