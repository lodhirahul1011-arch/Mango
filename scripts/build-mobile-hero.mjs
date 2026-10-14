import fs from 'node:fs/promises';
import sharp from 'sharp';

// A sampled, lower-resolution sequence keeps decoded memory manageable on phones.
await fs.mkdir('public/sequence-mobile', { recursive: true });
const frames = [...Array.from({ length: 80 }, (_, index) => index * 3), 239];
for (const index of frames) {
  const name = `frame_${String(index).padStart(4, '0')}`;
  await sharp(`public/sequence-new/${name}.jpg`)
    .resize({ width: 960 })
    .webp({ quality: 76 })
    .toFile(`public/sequence-mobile/${name}.webp`);
}
console.log(`Created ${frames.length} mobile hero frames.`);
