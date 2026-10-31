import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const source = resolve(process.argv[2] || '../WealthVision/Requirements/store_screenshots/appstore/raw/iphone');
const captures = {
  home: 'home2.png',
  kids: 'kid-main.png',
};
await mkdir('images/screens', { recursive: true });
const provenance = {};
for (const [name, filename] of Object.entries(captures)) {
  await sharp(resolve(source, filename)).resize({ width: 660 }).webp({ quality: 85 }).toFile(`images/screens/${name}.webp`);
  provenance[`screens/${name}.webp`] = { source: `WealthVision/Requirements/store_screenshots/appstore/raw/iphone/${filename}`, captured: '2026-10-22', treatment: 'Resized to 660px wide; WebP quality 85. App content unchanged.' };
}
provenance['google-play.png'] = { source: 'https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png', retrieved: '2026-10-31', treatment: 'Official English Google Play download badge, unchanged.' };
await writeFile('images/provenance.json', `${JSON.stringify(provenance, null, 2)}\n`);
console.log(`Prepared ${Object.keys(captures).length} current app screenshots without changing the website design.`);