export const HERO_ASSET_VERSION = 'pio-20261025';
export const HERO_VARIANTS = {
  desktop: { count: 193, width: 1440, height: 616 },
  mobile: { count: 97, width: 768, height: 328 },
} as const;
export type HeroVariant = keyof typeof HERO_VARIANTS;
export type DataConnection = EventTarget & { saveData?: boolean };
export const dataConnection = () =>
  (navigator as Navigator & { connection?: DataConnection }).connection;
export const selectHeroVariant = (): HeroVariant =>
  window.innerWidth < 768 || dataConnection()?.saveData ? 'mobile' : 'desktop';
export const heroPoster = (variant: HeroVariant) =>
  `/Herosection/poster-${variant}.webp?v=${HERO_ASSET_VERSION}`;
export const heroFrame = (variant: HeroVariant, index: number) =>
  `/Herosection/${variant}/frame-${String(index).padStart(4, '0')}.webp?v=${HERO_ASSET_VERSION}`;
