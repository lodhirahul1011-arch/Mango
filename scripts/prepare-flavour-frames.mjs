import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

// The last lychee source frame is black; finish on the last product frame.
for (const [source, destination, count] of [['mango', 'mango', 89], ['lichey', 'lychee', 57]]) {
  await mkdir(`public/frames/${destination}`, { recursive: true });
  for (let frame = 1; frame <= count; frame++) {
    const name = `frame_${String(frame).padStart(4, '0')}`;
    await sharp(`public/${source}/${name}.jpg`)
      .resize({ width: 540 })
      .webp({ quality: 78 })
      .toFile(`public/frames/${destination}/${name}.webp`);
  }
}
