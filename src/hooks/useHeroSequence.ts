import { useLayoutEffect, type RefObject } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { createHeroFrameLoader, type HeroFrameLoader } from '@/utils/heroFrameLoader';
import { HERO_VARIANTS, dataConnection, heroFrame, type HeroVariant } from '@/utils/heroSequence';
import { measureScrollViewport } from '@/utils/scrollViewport';

gsap.registerPlugin(ScrollTrigger);

export function useHeroSequence(sectionRef: RefObject<HTMLElement>, canvasRef: RefObject<HTMLCanvasElement>, variant: HeroVariant) {
  useLayoutEffect(() => {
    const root = sectionRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d', { alpha: true });
    const viewport = root?.querySelector<HTMLElement>('.pio-hero__viewport');
    const shell = root?.querySelector<HTMLElement>('.pio-hero__shell');
    const heading = root?.querySelector<HTMLElement>('.pio-hero__heading');
    const actions = root?.querySelector<HTMLElement>('.pio-hero__actions');
    if (!root || !canvas || !context || !viewport || !shell || !heading || !actions) return;
    const navigation = document.querySelector<HTMLElement>('[data-pio-nav]');
    const stableViewport = measureScrollViewport(root);
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const connection = dataConnection();
    const config = HERO_VARIANTS[variant];
    let loader: HeroFrameLoader | undefined;
    let trigger: ScrollTrigger | undefined;
    let disposed = false, raf = 0, resizeRaf = 0;
    let target = 0, drawn = -1, progress = 0, signature = '';
    let nextWidth = canvas.width, nextHeight = canvas.height, sizeDirty = false;

    const draw = (index: number, image: CanvasImageSource) => {
      if (disposed || index !== target || (drawn === index && !sizeDirty)) return;
      if (sizeDirty) {
        canvas.width = nextWidth; canvas.height = nextHeight;
        sizeDirty = false;
      }
      const ratio = Math.min(canvas.width / config.width, canvas.height / config.height);
      const width = config.width * ratio, height = config.height * ratio;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
      drawn = index;
      root.dataset.frameReady = 'true';
      if (import.meta.env.DEV) canvas.dataset.frame = String(index);
    };
    const sizeCanvas = () => {
      const bounds = canvas.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio || 1, variant === 'mobile' ? 1 : 1.5);
      // Contain at source resolution: never allocate a fullscreen high-DPR texture.
      const scale = Math.min(dpr, config.width / bounds.width, config.height / bounds.height);
      const width = Math.max(1, Math.round(bounds.width * scale));
      const height = Math.max(1, Math.round(bounds.height * scale));
      // Recalculate even when a pending resize returns to the original size.
      nextWidth = width; nextHeight = height;
      sizeDirty = canvas.width !== width || canvas.height !== height;
      // Keep the last drawing visible until its replacement has decoded.
      if (sizeDirty) loader?.redraw();
    };
    const requestFrame = () => {
      if (disposed || raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        target = Math.min(config.count - 1, Math.max(0, Math.round(progress * (config.count - 1))));
        root.style.setProperty('--hero-progress', String(progress));
        loader?.request(target);
      });
    };
    const setProgress = (next: number) => { progress = next; requestFrame(); };

    const measure = () => {
      resizeRaf = 0;
      if (disposed) return;
      const height = Math.floor(stableViewport.height());
      const navSpace = Math.ceil((navigation?.getBoundingClientRect().bottom || 76) + 20);
      const staticMode = motion.matches || Boolean(connection?.saveData);
      const next = [innerWidth, height, navSpace, heading.offsetHeight, actions.offsetHeight, staticMode, visualViewport?.scale].join(':');
      if (next === signature) { sizeCanvas(); return; }
      trigger?.kill(); trigger = undefined;
      root.style.setProperty('--hero-nav-space', navSpace + 'px');
      root.style.setProperty('--hero-view-height', height + 'px');
      root.style.setProperty('--hero-section-height', Math.round(height * (innerWidth < 768 ? 1.9 : 2.4)) + 'px');
      root.dataset.heroMode = staticMode ? 'static' : 'scroll';
      const viewportTop = viewport.getBoundingClientRect().top;
      const safeBottom = viewportTop + height - parseFloat(getComputedStyle(shell).paddingBottom);
      const contentRects = ['.pio-hero__copy', '.pio-hero__media', '.pio-hero__footer']
        .map(selector => root.querySelector<HTMLElement>(selector)?.getBoundingClientRect())
        .filter((rect): rect is DOMRect => Boolean(rect?.width && rect.height));
      const contentOverlaps = contentRects.some((rect, index) => contentRects.slice(index + 1).some(other =>
        rect.left < other.right - 1 && rect.right > other.left + 1 &&
        rect.top < other.bottom - 1 && rect.bottom > other.top + 1
      ));
      const contentClipped = contentRects.some(rect =>
        rect.top < viewportTop + navSpace - 2 || rect.bottom > safeBottom + 2
      );
      if (!staticMode && (shell.scrollHeight > shell.clientHeight + 2 || contentOverlaps || contentClipped || (visualViewport?.scale || 1) > 1.05)) {
        // Oversized content stays in normal flow; its frames still follow native scroll.
        root.dataset.heroMode = 'flow';
      }
      sizeCanvas();
      if (staticMode) {
        loader?.destroy(); loader = undefined;
        drawn = -1; delete root.dataset.frameReady;
      } else {
        loader ??= createHeroFrameLoader({
          count: config.count, mobile: variant === 'mobile',
          url: index => heroFrame(variant, index), onFrame: draw,
          onStats: import.meta.env.DEV ? stats => { root.dataset.loaderStats = JSON.stringify(stats); } : undefined,
        });
        trigger = ScrollTrigger.create({
          id: 'pio-hero-sequence', trigger: root, start: 'top top',
          end: () => '+=' + (root.dataset.heroMode === 'scroll'
            ? Math.max(1, root.offsetHeight - height)
            : Math.max(height * .35, root.offsetHeight - height)),
          onUpdate: self => setProgress(self.progress),
          onRefresh: self => setProgress(self.progress),
          invalidateOnRefresh: true,
        });
        setProgress(trigger.progress);
      }
      signature = [innerWidth, height, navSpace, heading.offsetHeight, actions.offsetHeight, staticMode, visualViewport?.scale].join(':');
      ScrollTrigger.refresh();
    };
    const scheduleMeasure = () => {
      if (!disposed && !resizeRaf) resizeRaf = requestAnimationFrame(measure);
    };
    const invalidate = () => { signature = ''; scheduleMeasure(); };
    const observer = new ResizeObserver(scheduleMeasure);
    observer.observe(heading); observer.observe(actions); observer.observe(viewport);
    if (navigation) observer.observe(navigation);
    const poster = root.querySelector('img');
    poster?.addEventListener('load', scheduleMeasure);
    motion.addEventListener('change', invalidate);
    connection?.addEventListener('change', invalidate);
    window.addEventListener('resize', scheduleMeasure);
    window.addEventListener('orientationchange', invalidate);
    window.visualViewport?.addEventListener('resize', scheduleMeasure);
    document.fonts?.ready.then(() => { if (!disposed) invalidate(); });
    measure();
    return () => {
      disposed = true;
      trigger?.kill();
      loader?.destroy();
      cancelAnimationFrame(raf); cancelAnimationFrame(resizeRaf);
      observer.disconnect(); stableViewport.destroy();
      motion.removeEventListener('change', invalidate);
      connection?.removeEventListener('change', invalidate);
      window.removeEventListener('resize', scheduleMeasure);
      window.removeEventListener('orientationchange', invalidate);
      window.visualViewport?.removeEventListener('resize', scheduleMeasure);
      poster?.removeEventListener('load', scheduleMeasure);
      delete root.dataset.frameReady;
    };
  }, [sectionRef, canvasRef, variant]);
}
