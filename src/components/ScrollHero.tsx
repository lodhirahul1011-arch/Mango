import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Droplets, Leaf, MapPin, Play, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 240;
const frameSrc = (index: number) => `/sequence-new/frame_${String(index).padStart(4, '0')}.jpg?v=4`;

export function ScrollHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedRef = useRef<Set<number>>(new Set());
  const rafRef = useRef<number>();

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!section || !canvas || !ctx) return;

    const draw = (index: number) => {
      // Find nearest loaded frame if current frame is still downloading
      let targetIndex = index;
      if (!loadedRef.current.has(targetIndex)) {
        let nearest = -1;
        let minDiff = Infinity;
        for (const loadedIdx of loadedRef.current) {
          const diff = Math.abs(loadedIdx - index);
          if (diff < minDiff) {
            minDiff = diff;
            nearest = loadedIdx;
          }
        }
        if (nearest !== -1) {
          targetIndex = nearest;
        } else {
          return;
        }
      }

      const img = imagesRef.current[targetIndex];
      if (!img) return;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const isMobile = window.innerWidth < 768;
        const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
        const w = img.naturalWidth * scale;
        const h = img.naturalHeight * scale;
        const x = (canvas.width - w) / 2;
        // On mobile portrait, shift canvas image down slightly so product sits comfortably in lower 65% of viewport
        const yOffset = isMobile ? canvas.height * 0.05 : 0;
        const y = (canvas.height - h) / 2 + yOffset;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.imageSmoothingEnabled = true;
        ctx.drawImage(img, x, y, w, h);
      });
    };

    const load = (i: number, high = false) => {
      if (imagesRef.current[i]) return;
      const img = new Image();
      img.decoding = 'async';
      if (high) img.fetchPriority = 'high';
      img.onload = () => {
        loadedRef.current.add(i);
        if (i === frameRef.current || i === 0) draw(i);
      };
      img.src = frameSrc(i);
      imagesRef.current[i] = img;
    };

    const preload = (center: number) => {
      const isMobile = window.innerWidth < 768;
      const radius = isMobile ? 14 : 28;
      for (let i = Math.max(0, center - radius); i <= Math.min(FRAME_COUNT - 1, center + radius); i++) {
        load(i);
      }
    };

    const resize = () => {
      const isMobile = window.innerWidth < 768;
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.35 : 1.75);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      draw(frameRef.current);
    };

    // Preload key frames immediately
    load(0, true);
    [5, 15, 30, 50, 75, 100, 130, 160, 190, 220, 239].forEach((i) => load(i));
    preload(0);
    resize();

    const mm = gsap.matchMedia();

    // 1. Desktop & Tablet Configuration (>= 768px)
    mm.add('(min-width: 768px)', () => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.35,
        onUpdate: ({ progress }) => {
          const frame = Math.round(progress * (FRAME_COUNT - 1));
          frameRef.current = frame;
          preload(frame);
          draw(frame);
        },
      });

      gsap.fromTo(
        '.hero-desktop-box',
        { y: 0, opacity: 1 },
        {
          y: -30,
          opacity: 0,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '18% top',
            scrub: 0.25,
            onLeaveBack: () => {
              gsap.to('.hero-desktop-box', { opacity: 1, y: 0, duration: 0.25, overwrite: 'auto' });
            },
            onEnterBack: () => {
              gsap.to('.hero-desktop-box', { opacity: 1, y: 0, duration: 0.25, overwrite: 'auto' });
            },
          },
        }
      );
    });

    // 2. Mobile Configuration (< 768px)
    mm.add('(max-width: 767px)', () => {
      gsap.fromTo(
        '.hero-mobile-art > *',
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.72, stagger: 0.08, ease: 'power3.out' }
      );
    });

    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);

    window.addEventListener('resize', resize);
    return () => {
      clearTimeout(refreshTimeout);
      window.removeEventListener('resize', resize);
      mm.revert();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section 
      ref={sectionRef} 
      id="home" 
      className="relative h-[100svh] md:h-[220vh] lg:h-[300vh] w-full"
    >
      <div 
        className="sticky top-0 h-[100svh] min-h-[100svh] w-full overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${frameSrc(0)})` }}
      >
        {/* Fullscreen 3D Canvas with enhanced saturation & crisp contrast */}
        <canvas
          ref={canvasRef}
          style={{
            filter: 'contrast(1.08) saturate(1.24) brightness(1.02)',
          }}
          className="absolute inset-0 hidden h-full w-full object-cover transition-all md:block"
          aria-label="PIO 3D animated cans and fruit splash"
        />

        {/* Subtle cinematic vignette that makes center cartons pop with depth */}
        <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(6,46,25,0.12)_100%)]" />

        {/* Mobile editorial hero: static, readable, product-first composition */}
        <div className="hero-mobile-art absolute inset-0 z-10 overflow-hidden px-5 pb-5 pt-[92px] text-center md:hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_52%_20%,rgba(255,248,209,0.94),transparent_34%),radial-gradient(circle_at_18%_72%,rgba(22,122,74,0.30),transparent_28%),radial-gradient(circle_at_86%_66%,rgba(255,200,61,0.42),transparent_26%),linear-gradient(180deg,#fbfff1_0%,#fff4bc_42%,#ecffd9_100%)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[36%] bg-[linear-gradient(180deg,transparent,#092f1c_88%)]" />
          <div className="pointer-events-none absolute -left-20 top-4 h-56 w-44 rotate-12 rounded-[55%_45%_45%_55%] bg-[#0f7a43]/45 blur-xl" />
          <div className="pointer-events-none absolute -right-10 top-16 h-20 w-11 rotate-[28deg] rounded-[80%_10%_80%_10%] bg-[#167A4A]/70 shadow-[0_12px_28px_rgba(7,61,44,0.20)]" />
          <div className="pointer-events-none absolute left-7 bottom-[28%] h-28 w-28 rounded-[42%_58%_44%_56%] bg-[#ffc83d] shadow-[inset_-12px_-10px_0_rgba(180,94,0,0.15),0_18px_34px_rgba(146,64,14,0.22)]" />
          <div className="pointer-events-none absolute left-9 bottom-[30%] grid h-20 w-20 rotate-[-12deg] grid-cols-3 gap-1 opacity-80">
            {Array.from({ length: 9 }).map((_, index) => (
              <span key={index} className="rounded-[7px] bg-[#ffe27a]/80 shadow-[inset_-2px_-2px_0_rgba(146,64,14,0.12)]" />
            ))}
          </div>
          <div className="pointer-events-none absolute right-5 bottom-[29%] h-32 w-12 rotate-[38deg] rounded-[100%_0_100%_0] bg-[#ffcf44] shadow-[inset_-10px_-6px_0_rgba(168,82,0,0.14),0_18px_34px_rgba(146,64,14,0.16)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-[17%] h-[34%] bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.76),transparent_10%),radial-gradient(circle_at_38%_52%,rgba(255,200,61,0.42),transparent_30%),radial-gradient(circle_at_65%_48%,rgba(255,255,255,0.54),transparent_25%)] opacity-90" />

          <div className="relative z-10 mx-auto max-w-[340px]">
            <p className="text-[10px] font-black uppercase tracking-[0.34em] text-[#167A4A]">Born in Assam</p>
            <h1 className="mt-2 text-[clamp(4rem,18vw,5.9rem)] leading-[0.76] text-[#073D2C]" style={{ fontFamily: 'var(--font-display)' }}>
              Har Sip.
              <span className="block text-[#F5A623]">PIO.</span>
            </h1>
            <p className="mx-auto mt-2 max-w-[230px] text-[15px] font-semibold leading-[1.08] text-[#28503e]">
              Real fruit refreshment in every sip.
            </p>
          </div>

          <img
            src="/images/pio-mango.png"
            alt="PIO Mango 160ml carton"
            draggable={false}
            className="absolute left-1/2 top-[37%] z-10 h-[38dvh] min-h-[245px] max-h-[360px] -translate-x-1/2 -rotate-[2deg] object-contain drop-shadow-[0_26px_36px_rgba(7,61,44,0.30)]"
          />

          <div className="absolute inset-x-5 bottom-[72px] z-20 mx-auto flex max-w-[310px] flex-col gap-2.5">
            <button
              onClick={() => go('flavours')}
              className="inline-flex min-h-[48px] items-center justify-center gap-3 rounded-full bg-[#073D2C] px-6 py-3 text-[12px] font-black uppercase tracking-[0.18em] text-white shadow-[0_18px_38px_rgba(7,61,44,0.26)] active:scale-95"
            >
              <span>Explore PIO</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => go('map')}
              className="inline-flex min-h-[44px] items-center justify-center gap-2.5 rounded-full border border-white/70 bg-white/88 px-6 py-2.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#073D2C] shadow-[0_12px_28px_rgba(7,61,44,0.14)] backdrop-blur-md active:scale-95"
            >
              <MapPin className="h-4 w-4" />
              <span>Find Near You</span>
            </button>
          </div>

          <div className="absolute inset-x-4 bottom-4 z-20 grid grid-cols-3 items-center gap-2 text-white/90">
            {[
              { icon: Leaf, label: 'Real fruit juice' },
              { icon: Droplets, label: 'Refreshing goodness' },
              { icon: ShieldCheck, label: 'Born in Assam' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center justify-center gap-1.5 border-r border-white/35 last:border-r-0">
                <Icon className="h-4 w-4 shrink-0 text-white/80" />
                <span className="max-w-[68px] text-left text-[8px] font-black uppercase leading-[1.05] tracking-[0.12em]">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ====================================================
            DESKTOP & TABLET LAYOUT (>= 768px): PRESERVED EXACTLY
        ==================================================== */}
        <div className="hidden md:flex relative z-10 w-full h-full items-center px-6 sm:px-10 lg:px-14 xl:px-20 pointer-events-none">
          <div className="hero-desktop-box pointer-events-auto mt-14 sm:mt-8 max-w-sm sm:max-w-md lg:max-w-[440px] xl:max-w-[480px] space-y-5 rounded-[32px] border border-white/70 bg-white/78 p-6 sm:p-7 shadow-[0_24px_70px_rgba(7,88,47,0.15)] backdrop-blur-md">

            {/* 2. Main Title: Har Sip PIO! */}
            <div className="space-y-0 select-none">
              <span className="block display-heading text-[#073D2C] leading-[0.72]">
                Har Sip.
              </span>
              <div className="flex items-center gap-2 text-[#073D2C] leading-[0.72]">
                <span className="display-heading">PIO.</span>
                <Leaf className="w-8 h-8 sm:w-10 sm:h-10 text-[#167A4A] fill-[#167A4A] -rotate-12 inline-block shrink-0" />
              </div>
            </div>

            {/* 3. Subtitle */}
            <div className="space-y-2">
              <p className="eyebrow text-[#167A4A]">REPOSE / PIO</p>
              <p className="text-base sm:text-lg text-[#264b34] font-medium leading-relaxed max-w-md">
                Real fruit refreshment in every sip.
              </p>
            </div>

            {/* 4. Four Badges */}
            <div className="grid grid-cols-4 gap-2 pt-1">
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-emerald-900/15 bg-white flex items-center justify-center text-[#07582f] shadow-2xs">
                  <Leaf className="w-4 h-4 text-[#07582f]" />
                </div>
                <span className="mt-1 text-[9px] sm:text-[10px] font-extrabold text-[#0a2e1c] leading-tight">
                  Real Fruit
                </span>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-emerald-900/15 bg-white flex items-center justify-center text-[#07582f] shadow-2xs">
                  <Droplets className="w-4 h-4 text-[#07582f]" />
                </div>
                <span className="mt-1 text-[9px] sm:text-[10px] font-extrabold text-[#0a2e1c] leading-tight">
                  Chilled Sip
                </span>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-emerald-900/15 bg-white flex items-center justify-center text-[#07582f] shadow-2xs">
                  <ShieldCheck className="w-4 h-4 text-[#07582f]" />
                </div>
                <span className="mt-1 text-[9px] sm:text-[10px] font-extrabold text-[#0a2e1c] leading-tight">
                  0 Chemical
                </span>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-emerald-900/15 bg-white flex items-center justify-center text-[#07582f] shadow-2xs font-black text-sm">
                  ₹10
                </div>
                <span className="mt-1 text-[9px] sm:text-[10px] font-extrabold text-[#0a2e1c] leading-tight">
                  Pocket Price
                </span>
              </div>
            </div>

            {/* 5. Action Buttons & Quick Flavor Badges */}
            <div className="pt-2 space-y-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => go('flavours')}
                  className="inline-flex items-center gap-2 rounded-full bg-[#073D2C] hover:bg-[#0d4e3e] active:scale-95 text-white px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.18em] shadow-[0_18px_40px_rgba(7,61,44,0.18)] hover:-translate-y-0.5 transition-all cursor-pointer min-h-[44px]"
                >
                  <span>Explore Flavours</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => go('map')}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/80 hover:bg-white text-[#073D2C] border border-[#0a3d2d]/15 px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.18em] shadow-[0_8px_20px_rgba(7,61,44,0.06)] hover:-translate-y-0.5 transition-all cursor-pointer min-h-[44px]"
                >
                  <Play className="w-3 h-3 fill-[#073D2C]" />
                  <span>Find Near You</span>
                </button>
              </div>

              <div className="flex items-center gap-2 text-[11px] font-bold">
                <span className="bg-amber-100/90 text-amber-900 px-2.5 py-1 rounded-lg border border-amber-300/60 shadow-2xs">
                  🥭 Mango 160ml &bull; ₹10
                </span>
                <span className="bg-rose-100/90 text-rose-900 px-2.5 py-1 rounded-lg border border-rose-300/60 shadow-2xs">
                  🌺 Lychee 160ml &bull; ₹10
                </span>
              </div>
            </div>

          </div>
        </div>



        {/* Desktop Bottom Center: Scroll Cue */}
        <div className="hidden md:flex absolute bottom-5 left-1/2 -translate-x-1/2 flex-col items-center gap-1 pointer-events-none z-20 opacity-90">
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-950 bg-white/95 px-3 py-1 rounded-full border border-emerald-900/15 shadow-xs">
            Scroll To Animate 3D
          </span>
          <div className="w-5 h-8 rounded-full border-2 border-emerald-800/40 flex items-start justify-center p-1 bg-white/80 shadow-xs">
            <div className="w-1.5 h-2 rounded-full bg-emerald-800 animate-bounce" />
          </div>
        </div>

      </div>
    </section>
  );
}
