export const HERO_ASSET_VERSION = 'pio-hq-20261025-v3';
export const HERO_VARIANTS = {
  desktop: { count: 193, start: 24, width: 2200, height: 940 },
  mobile: { count: 121, start: 15, width: 1100, height: 470 },
} as const;
export type HeroVariant = keyof typeof HERO_VARIANTS;
export type DataConnection = EventTarget & { saveData?: boolean };
export const dataConnection = () =>
  (navigator as Navigator & { connection?: DataConnection }).connection;
export const selectHeroVariant = (): HeroVariant =>
  window.innerWidth < 768 || dataConnection()?.saveData ? 'mobile' : 'desktop';
export const heroFrame = (variant: HeroVariant, index: number) => {
  const frame = Math.max(0, Math.min(HERO_VARIANTS[variant].count - 1, Math.round(index)));
  return '/Herosection%20new/' + variant + '/frame-' + String(frame).padStart(4, '0') + '.webp?v=' + HERO_ASSET_VERSION;
};
// The opening second is a soft reveal; start on the first clear splash.
export const heroPoster = (variant: HeroVariant) => heroFrame(variant, HERO_VARIANTS[variant].start);
