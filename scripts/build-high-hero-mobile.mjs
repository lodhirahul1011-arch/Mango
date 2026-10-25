import fs from 'node:fs/promises';
import sharp from 'sharp';

const source = 'public/new Herosection high';
await fs.mkdir(`${source}/mobile`, { recursive: true });
// Every second source frame plus the exact final frame. No color adjustments.
for (const index of [...Array.from({ length: 96 }, (_, i) => i * 2), 191]) {
  const file = `frame_${String(index).padStart(4, '0')}.jpg`;
  await sharp(`${source}/${file}`).resize({ width: 960 }).jpeg({ quality: 92, chromaSubsampling: '4:4:4' }).toFile(`${source}/mobile/${file}`);
}
console.log('Created 97 mobile JPG frames at 960x540.');
