import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Cleanup = () => void;

const transitionPalette = [
  { from: '#f8f6ef', via: '#fff4c7', to: '#ecfdf5' },
  { from: '#fff7df', via: '#ffd990', to: '#fffaf0' },
  { from: '#fff0f5', via: '#ffc2d2', to: '#fff8fb' },
  { from: '#fbfbf2', via: '#d9f99d', to: '#f8fffb' },
  { from: '#f8fffb', via: '#b7f7d6', to: '#ffffff' },
  { from: '#fff8ec', via: '#f4d6a2', to: '#f9f4e8' },
];

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0);

const withinLocalMotion = (el: Element) => Boolean(el.closest('[data-local-motion="true"]'));

const isSelfAnimatedSection = (section: HTMLElement) =>
  ['home', 'flavours', 'inside'].includes(section.id) ||
  section.classList.contains('products-showcase') ||
  Boolean(section.querySelector('.sticky, canvas, [data-local-motion="true"]'));

function revealSelfAnimatedShell(section: HTMLElement, index: number, isDesktop: boolean) {
  if (index === 0 || section.id === 'home') return;

  section.classList.add('pio-cinematic-section');
  section.style.zIndex = String(index + 1);

  gsap.fromTo(
    section,
    {
      yPercent: isDesktop ? 14 : 6,
      scale: isDesktop ? 0.982 : 0.995,
      borderRadius: isDesktop ? '34px 34px 0 0' : '22px 22px 0 0',
      clipPath: isDesktop ? 'inset(4% 1.5% 0 1.5% round 34px)' : 'inset(2% 0.5% 0 0.5% round 22px)',
      boxShadow: isDesktop ? '0 -26px 72px rgba(7, 61, 44, 0.1)' : '0 -14px 36px rgba(7, 61, 44, 0.08)',
    },
    {
      yPercent: 0,
      scale: 1,
      borderRadius: '0px 0px 0px 0px',
      clipPath: 'inset(0% 0% 0% 0% round 0px)',
      boxShadow: '0 0 0 rgba(7, 61, 44, 0)',
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top 104%',
        end: isDesktop ? 'top 24%' : 'top 34%',
        scrub: 0.65,
      },
    }
  );
}

export function revealEyebrow(section: HTMLElement) {
  const eyebrow = section.querySelector<HTMLElement>(
    '.eyebrow, [data-motion="eyebrow"], span[class*="tracking-"], div[class*="tracking-"]'
  );
  if (!eyebrow || withinLocalMotion(eyebrow)) return;

  gsap.fromTo(
    eyebrow,
    { autoAlpha: 0, y: 10 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 78%',
        toggleActions: 'play none none reverse',
      },
    }
  );
}

export function revealHeading(section: HTMLElement) {
  const headings = Array.from(section.querySelectorAll<HTMLElement>('h1, h2')).filter(
    (heading) => !withinLocalMotion(heading)
  );
  if (!headings.length) return;

  gsap.set(headings, {
    clipPath: 'inset(0 0 100% 0)',
    yPercent: 26,
    letterSpacing: '0.01em',
  });

  gsap.to(headings, {
    clipPath: 'inset(0 0 0% 0)',
    yPercent: 0,
    letterSpacing: '-0.03em',
    duration: 1,
    ease: 'power4.out',
    stagger: 0.1,
    scrollTrigger: {
      trigger: section,
      start: 'top 74%',
      toggleActions: 'play none none reverse',
    },
  });
}

export function revealBody(section: HTMLElement) {
  const bodyCopy = Array.from(section.querySelectorAll<HTMLElement>('p')).filter(
    (el) => !withinLocalMotion(el)
  );
  if (!bodyCopy.length) return;

  gsap.fromTo(
    bodyCopy,
    { autoAlpha: 0, y: 24 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.75,
      ease: 'power3.out',
      stagger: 0.06,
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
    }
  );
}

export function revealCards(section: HTMLElement) {
  const candidates = Array.from(section.querySelectorAll<HTMLElement>('article, li, [data-motion-card="true"]')).filter((el) => {
    const className = el.className.toString();
    return (
      !withinLocalMotion(el) &&
      className.includes('rounded') &&
      (className.includes('border') || className.includes('shadow') || className.includes('bg-')) &&
      el.getBoundingClientRect().height > 46
    );
  });

  const cards = candidates.slice(0, 10);
  if (!cards.length) return;

  gsap.fromTo(
    cards,
    { autoAlpha: 0, y: 32, scale: 0.985 },
    {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 0.85,
      ease: 'power3.out',
      stagger: 0.08,
      scrollTrigger: {
        trigger: section,
        start: 'top 68%',
        toggleActions: 'play none none reverse',
      },
    }
  );
}

export function revealImage(section: HTMLElement) {
  const images = Array.from(section.querySelectorAll<HTMLImageElement>('img')).filter(
    (img) => !withinLocalMotion(img)
  );
  if (!images.length) return;

  gsap.fromTo(
    images,
    { autoAlpha: 0, scale: 1.06, y: 28 },
    {
      autoAlpha: 1,
      scale: 1,
      y: 0,
      duration: 1,
      ease: 'power4.out',
      stagger: 0.08,
      scrollTrigger: {
        trigger: section,
        start: 'top 72%',
        toggleActions: 'play none none reverse',
      },
    }
  );
}

export function parallaxElement(section: HTMLElement, isDesktop: boolean) {
  if (!isDesktop) return;

  const depthElements = Array.from(
    section.querySelectorAll<HTMLElement>('img[src*="pio-"], [class*="absolute"][class*="blur"], [data-parallax]')
  ).filter((el) => !withinLocalMotion(el));

  depthElements.slice(0, 6).forEach((el, index) => {
    const distance = el.tagName === 'IMG' ? 18 : 34 + index * 4;
    gsap.to(el, {
      y: index % 2 === 0 ? -distance : distance,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });
  });
}

export function sectionTransition(section: HTMLElement, index: number) {
  const palette = ['#f8f6ef', '#fff7df', '#fff0f5', '#fbfbf2', '#f8fffb', '#fff8ec'];
  const color = palette[index % palette.length];

  gsap.to(document.documentElement, {
    '--warm-white': color,
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
      end: 'top 20%',
      scrub: 1.2,
    },
  });
}

function createScrollVeil(root: HTMLElement) {
  const existing = root.querySelector<HTMLElement>('.pio-scroll-veil');
  if (existing) return existing;

  const veil = document.createElement('div');
  veil.className = 'pio-scroll-veil';
  veil.innerHTML = `
    <div class="pio-scroll-veil__wash"></div>
    <div class="pio-scroll-veil__line"></div>
  `;
  root.appendChild(veil);
  return veil;
}

export function pageSectionReveal(section: HTMLElement, index: number, isDesktop: boolean) {
  if (withinLocalMotion(section)) return;
  if (index === 0 || isSelfAnimatedSection(section)) {
    section.classList.add('pio-cinematic-section');
    section.style.zIndex = String(index + 1);
    revealSelfAnimatedShell(section, index, isDesktop);
    return;
  }

  const isSignature = [1, 2, 4, 6].includes(index);
  const yStart = isDesktop ? (isSignature ? 22 : 14) : 8;
  const radius = isSignature ? 38 : 28;

  section.classList.add('pio-cinematic-section');
  section.style.zIndex = String(index + 1);

  gsap.fromTo(
    section,
    {
      yPercent: yStart,
      scale: isDesktop ? (isSignature ? 0.955 : 0.972) : 0.99,
      borderRadius: `${radius}px ${radius}px 0 0`,
      clipPath: `inset(${isSignature ? 10 : 7}% ${isDesktop ? 3 : 1}% 0 ${isDesktop ? 3 : 1}% round ${radius}px)`,
      boxShadow: isDesktop ? '0 -30px 80px rgba(7, 61, 44, 0.08)' : '0 -18px 42px rgba(7, 61, 44, 0.07)',
      filter: isDesktop ? 'saturate(0.92) brightness(0.98)' : 'none',
    },
    {
      yPercent: 0,
      scale: 1,
      borderRadius: '0px 0px 0px 0px',
      clipPath: 'inset(0% 0% 0% 0% round 0px)',
      boxShadow: '0 0 0 rgba(7, 61, 44, 0)',
      filter: 'saturate(1) brightness(1)',
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top 102%',
        end: isDesktop ? 'top 8%' : 'top 18%',
        scrub: 0.7,
      },
    }
  );

  if (index === 0) return;

  const previous = section.previousElementSibling as HTMLElement | null;
  if (!previous) return;

  gsap.to(previous, {
    scale: isDesktop ? (isSignature ? 0.94 : 0.965) : 0.99,
    y: isDesktop ? (isSignature ? -40 : -22) : -12,
    autoAlpha: isSignature ? 0.68 : 0.82,
    borderRadius: isDesktop ? (isSignature ? 24 : 16) : 12,
    filter: isDesktop ? (isSignature ? 'blur(1.2px) saturate(0.78) brightness(0.94)' : 'saturate(0.84) brightness(0.97)') : 'none',
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top 96%',
      end: isDesktop ? 'top 20%' : 'top 34%',
      scrub: 0.7,
    },
  });

  const sectionVisuals = Array.from(
    section.querySelectorAll<HTMLElement>('img[src*="pio-"], canvas, [data-parallax]')
  ).filter((el) => !withinLocalMotion(el));

  sectionVisuals.slice(0, 4).forEach((visual, visualIndex) => {
    gsap.fromTo(
      visual,
      {
        y: isDesktop ? 34 + visualIndex * 6 : 16,
        x: isDesktop && isSignature ? (index % 2 === 0 ? 28 : -28) : 0,
        scale: 0.96,
        rotate: isDesktop ? (index % 2 === 0 ? 1.5 : -1.5) : 0,
      },
      {
        y: 0,
        x: 0,
        scale: 1,
        rotate: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 92%',
          end: 'top 28%',
          scrub: 0.9,
        },
      }
    );
  });
}

export function scrollPageVeil(root: HTMLElement, sections: HTMLElement[]) {
  const veil = createScrollVeil(root);
  const wash = veil.querySelector<HTMLElement>('.pio-scroll-veil__wash');
  const line = veil.querySelector<HTMLElement>('.pio-scroll-veil__line');
  if (!wash || !line) return;

  gsap.set(veil, { autoAlpha: 0, yPercent: 100 });
  gsap.set(line, { scaleX: 0, transformOrigin: 'center' });

  sections.slice(1).forEach((section, index) => {
    if (section.id === 'flavours') return;
    const colors = transitionPalette[index % transitionPalette.length];
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 92%',
        end: 'top 52%',
        scrub: 0.65,
      },
    });

    tl.set(wash, {
      background: `linear-gradient(115deg, ${colors.from} 0%, ${colors.via} 42%, ${colors.to} 100%)`,
    })
      .to(veil, { autoAlpha: 1, yPercent: 0, duration: 0.38, ease: 'power3.out' }, 0)
      .to(line, { scaleX: 1, duration: 0.34, ease: 'power3.out' }, 0.04)
      .to(veil, { yPercent: -100, duration: 0.5, ease: 'power4.inOut' }, 0.5)
      .to(line, { scaleX: 0, duration: 0.2, ease: 'power2.out' }, 0.68)
      .to(veil, { autoAlpha: 0, duration: 0.1 }, 0.95);
  });
}

export function magneticButton(root: ParentNode): Cleanup {
  if (isTouchDevice() || prefersReducedMotion()) return () => undefined;

  const buttons = Array.from(
    root.querySelectorAll<HTMLElement>('button, a[href]')
  ).filter((el) => {
    const className = el.className.toString();
    return !withinLocalMotion(el) && className.includes('rounded') && el.getBoundingClientRect().width > 34;
  });

  const cleanups: Cleanup[] = buttons.map((button) => {
    const xTo = gsap.quickTo(button, 'x', { duration: 0.35, ease: 'power3.out' });
    const yTo = gsap.quickTo(button, 'y', { duration: 0.35, ease: 'power3.out' });
    const arrow = button.querySelector<HTMLElement>('svg:last-child');
    const arrowXTo = arrow ? gsap.quickTo(arrow, 'x', { duration: 0.25, ease: 'power3.out' }) : null;
    const arrowYTo = arrow ? gsap.quickTo(arrow, 'y', { duration: 0.25, ease: 'power3.out' }) : null;

    const move = (event: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 8;
      xTo(gsap.utils.clamp(-6, 6, x));
      yTo(gsap.utils.clamp(-5, 5, y));
      arrowXTo?.(3);
      arrowYTo?.(-2);
    };

    const leave = () => {
      xTo(0);
      yTo(0);
      arrowXTo?.(0);
      arrowYTo?.(0);
    };

    button.addEventListener('mousemove', move);
    button.addEventListener('mouseleave', leave);

    return () => {
      button.removeEventListener('mousemove', move);
      button.removeEventListener('mouseleave', leave);
      gsap.set(button, { clearProps: 'x,y' });
      if (arrow) gsap.set(arrow, { clearProps: 'x,y' });
    };
  });

  return () => cleanups.forEach((cleanup) => cleanup());
}

export function initPioMotion(root: HTMLElement): Cleanup {
  if (prefersReducedMotion()) return () => undefined;

  const mm = gsap.matchMedia();
  let magneticCleanup: Cleanup = () => undefined;

  const ctx = gsap.context(() => {
    mm.add(
      {
        isDesktop: '(min-width: 1024px)',
        isMobile: '(max-width: 1023px)',
      },
      (context) => {
        const isDesktop = Boolean(context.conditions?.isDesktop);
        const sections = Array.from(root.querySelectorAll<HTMLElement>('main > section'));

        sections.forEach((section, index) => {
          const selfAnimated = isSelfAnimatedSection(section);
          pageSectionReveal(section, index, isDesktop);
          if (!selfAnimated) {
            revealEyebrow(section);
            revealHeading(section);
            revealBody(section);
            revealCards(section);
            revealImage(section);
            parallaxElement(section, isDesktop);
          }
          sectionTransition(section, index);
        });

        scrollPageVeil(root, sections);

        magneticCleanup = magneticButton(root);
      }
    );
  }, root);

  return () => {
    magneticCleanup();
    mm.revert();
    ctx.revert();
  };
}
