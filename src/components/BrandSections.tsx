import { useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Droplets, Leaf, ShieldCheck, Sparkles, MapPin, School, Users, Plane, Check, Info, Zap, Wheat, Box } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
};

const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const PRODUCT_ASSETS = {
  mango: '/assets/products/pio-mango.png',
  lychee: '/assets/products/pio-lychee.png',
};

const FEATURE_BADGES = ['160ml Pack', 'Rs 10', 'Made in Assam'];

function FeatureBadges() {
  return (
    <div className="products-badges mt-6 flex flex-wrap gap-2.5">
      {FEATURE_BADGES.map((badge) => (
        <span
          key={badge}
          className="rounded-full border border-[#064F32]/10 bg-white/65 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#064F32] shadow-[0_12px_28px_rgba(6,79,50,0.08)] backdrop-blur-md"
        >
          {badge}
        </span>
      ))}
    </div>
  );
}

function AnimatedCTA() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const moveMagnet = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current;
    if (!button) return;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    gsap.to(button, { x: x * 0.12, y: y * 0.18, duration: 0.35, ease: 'power3.out' });
  };

  const resetMagnet = () => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, { x: 0, y: 0, duration: 0.45, ease: 'elastic.out(1, 0.45)' });
    }
  };

  return (
    <button
      ref={buttonRef}
      onMouseMove={moveMagnet}
      onMouseLeave={resetMagnet}
      onClick={() => go('partner')}
      className="products-cta group mt-8 inline-flex min-h-[52px] items-center gap-3 rounded-full bg-[#064F32] px-7 py-3 text-xs font-black uppercase tracking-[0.2em] text-white shadow-[0_22px_48px_rgba(6,79,50,0.22)] transition-colors duration-300 hover:bg-[#043b25] focus:outline-none focus:ring-2 focus:ring-[#064F32]/35"
    >
      <span>Partner With PIO</span>
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/14 transition-transform duration-300 group-hover:translate-x-1">
        <ArrowRight className="h-4 w-4" />
      </span>
    </button>
  );
}

function FruitLayer({ tone, className = '' }: { tone: 'mango' | 'lychee' | 'leaf'; className?: string }) {
  const toneClass = {
    mango: 'bg-[#FFC83D]',
    lychee: 'bg-[#F6ABC5]',
    leaf: 'bg-[#0F7A43]',
  }[tone];

  return (
    <span
      data-placeholder="fruit-or-leaf-asset"
      className={`fruit-layer absolute block ${toneClass} ${className}`}
      aria-hidden="true"
    />
  );
}

function LiquidSplashLayer({ tone }: { tone: 'mango' | 'lychee' }) {
  const color = tone === 'mango' ? 'rgba(255,200,61,0.42)' : 'rgba(246,171,197,0.46)';
  const accent = tone === 'mango' ? 'rgba(255,154,31,0.2)' : 'rgba(219,52,96,0.2)';

  return (
    <div className={`liquid-splash liquid-splash-${tone} pointer-events-none absolute inset-0`} aria-hidden="true">
      <span
        data-placeholder="transparent-liquid-splash-asset"
        className="absolute inset-x-[8%] top-[24%] h-[44%] rounded-[54%_46%_58%_42%] blur-[2px]"
        style={{
          background: `radial-gradient(circle at 36% 44%, ${color}, transparent 38%), radial-gradient(circle at 64% 52%, ${accent}, transparent 42%)`,
          clipPath: 'polygon(4% 48%, 20% 28%, 42% 38%, 64% 18%, 88% 42%, 76% 70%, 48% 62%, 22% 78%)',
        }}
      />
      <span
        className="absolute left-[20%] top-[28%] h-14 w-14 rounded-full border border-white/50 bg-white/20 backdrop-blur-sm"
      />
    </div>
  );
}

function FlavourInfo({
  tone,
  title,
  copy,
  className = '',
}: {
  tone: 'mango' | 'lychee';
  title: string;
  copy: string;
  className?: string;
}) {
  const palette = tone === 'mango' ? 'text-[#8A5200] border-[#FFC83D]/35 bg-[#fff7d7]/70' : 'text-[#8a2149] border-[#F6ABC5]/45 bg-[#fff2f7]/72';

  return (
    <div className={`flavour-info absolute z-30 w-[180px] rounded-2xl border px-4 py-3 shadow-[0_18px_42px_rgba(6,79,50,0.12)] backdrop-blur-xl ${palette} ${className}`}>
      <div className="text-[10px] font-black uppercase tracking-[0.22em]">{title}</div>
      <p className="mt-1 text-xs font-bold leading-snug opacity-80">{copy}</p>
    </div>
  );
}

function ProductVisual({
  src,
  alt,
  tone,
  className = '',
}: {
  src: string;
  alt: string;
  tone: 'mango' | 'lychee';
  className?: string;
}) {
  return (
    <div className={`product-visual absolute ${className}`}>
      <div className="absolute inset-x-[8%] bottom-2 h-14 rounded-full bg-[#062816]/22 blur-2xl" />
      <img
        src={src}
        alt={alt}
        className={`relative z-10 h-full w-full object-contain ${tone === 'mango' ? 'drop-shadow-[0_34px_46px_rgba(149,91,0,0.22)]' : 'drop-shadow-[0_34px_46px_rgba(128,20,54,0.24)]'}`}
        draggable={false}
      />
    </div>
  );
}

export function Flavours() {
  return <ProductsShowcase />;
}

function ProductsShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    const visual = visualRef.current;
    if (!section || !visual) return;

    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (prefersReducedMotion.current) {
        gsap.set('.products-heading-line, .products-copy, .products-badges, .products-cta, .product-visual, .liquid-splash, .fruit-layer, .flavour-info', {
          clearProps: 'all',
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          rotate: 0,
        });
        return;
      }

      const enter = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 72%',
          once: true,
        },
      });

      enter
        .from('.products-heading-line', { yPercent: 112, opacity: 0, duration: 0.9, stagger: 0.11, ease: 'power4.out' })
        .from('.products-copy', { y: 22, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.45')
        .from('.products-badges span', { y: 18, opacity: 0, duration: 0.55, stagger: 0.08, ease: 'power3.out' }, '-=0.35')
        .from('.liquid-splash', { clipPath: 'inset(0 100% 0 0)', opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' }, '-=0.35')
        .from('.product-mango', { y: 120, rotate: -5, opacity: 0, duration: 0.95, ease: 'power3.out' }, '-=0.55')
        .from('.product-lychee', { y: 130, rotate: 5, opacity: 0, duration: 0.95, ease: 'power3.out' }, '-=0.68')
        .from('.fruit-layer', { y: 28, scale: 0.72, opacity: 0, duration: 0.75, stagger: 0.06, ease: 'back.out(1.7)' }, '-=0.62')
        .from('.flavour-info', { y: 24, scale: 0.95, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out' }, '-=0.42')
        .from('.products-cta', { y: 20, opacity: 0, duration: 0.55, ease: 'power3.out' }, '-=0.38');

      gsap.to('.product-mango', {
        y: -28,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
      });
      gsap.to('.product-lychee', {
        y: 26,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
      });
      gsap.to('.fruit-layer.depth-far', {
        y: -54,
        x: 18,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.1 },
      });
      gsap.to('.fruit-layer.depth-near', {
        y: 46,
        x: -26,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 0.9 },
      });
      gsap.to('.products-bg-shift', {
        backgroundPosition: '64% 52%',
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
      });
    }, section);

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const tick = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      gsap.set(visual.querySelectorAll('.product-visual'), {
        rotateY: currentX * 5,
        rotateX: currentY * -4,
        transformPerspective: 900,
      });
      gsap.set(visual.querySelectorAll('.depth-near'), { x: currentX * -26, y: currentY * -18 });
      gsap.set(visual.querySelectorAll('.depth-far'), { x: currentX * 16, y: currentY * 12 });
      raf = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      if (prefersReducedMotion.current || window.innerWidth < 900) return;
      const rect = visual.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    if (!prefersReducedMotion.current) {
      raf = requestAnimationFrame(tick);
      visual.addEventListener('pointermove', onMove);
      visual.addEventListener('pointerleave', onLeave);
    }

    return () => {
      visual.removeEventListener('pointermove', onMove);
      visual.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="flavours"
      className="products-showcase relative isolate overflow-hidden bg-[#FAFCF7] py-20 text-[#064F32] sm:py-24 lg:min-h-[100svh] lg:py-0"
    >
      <div className="products-bg-shift pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,rgba(246,171,197,0.30),transparent_26%),radial-gradient(circle_at_56%_54%,rgba(255,200,61,0.30),transparent_30%),linear-gradient(120deg,#FAFCF7_0%,#F4FAF0_52%,#ECF7EE_100%)] bg-[length:140%_140%]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-[linear-gradient(180deg,rgba(250,252,247,0.96),transparent)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:min-h-[100svh] lg:grid-cols-[0.88fr_1.12fr] lg:gap-8 lg:py-24">
        <div className="relative z-20 max-w-xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#064F32]/10 bg-white/70 px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-[#064F32] shadow-[0_16px_38px_rgba(6,79,50,0.08)] backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" />
            Products
          </div>

          <h2 className="overflow-hidden font-['Space_Grotesk',sans-serif] text-[clamp(3.2rem,7vw,6.35rem)] font-black uppercase leading-[0.86] tracking-tight text-[#064F32]">
            <span className="products-heading-line block">Real fruit,</span>
            <span className="products-heading-line block">ready to</span>
            <span className="products-heading-line block text-[#0F7A43]">shine.</span>
          </h2>

          <p className="products-copy mt-6 max-w-md text-base font-semibold leading-relaxed text-[#315b47] sm:text-lg">
            Mango brings golden tropical depth. Lychee adds a bright floral chill. Both arrive in premium 160ml cartons made for everyday refreshment.
          </p>

          <FeatureBadges />
          <AnimatedCTA />
        </div>

        <div ref={visualRef} className="relative z-10 min-h-[540px] overflow-visible sm:min-h-[650px] lg:min-h-[760px]">
          <LiquidSplashLayer tone="mango" />
          <LiquidSplashLayer tone="lychee" />

          <FruitLayer tone="leaf" className="depth-far left-[12%] top-[10%] h-14 w-28 rotate-[-28deg] rounded-[90%_10%_90%_10%]" />
          <FruitLayer tone="leaf" className="depth-near right-[5%] top-[13%] h-16 w-32 rotate-[32deg] rounded-[90%_10%_90%_10%]" />
          <FruitLayer tone="mango" className="depth-near left-[3%] bottom-[22%] h-20 w-24 rotate-[-14deg] rounded-[58%_42%_52%_48%]" />
          <FruitLayer tone="lychee" className="depth-far right-[8%] bottom-[18%] h-20 w-20 rounded-full border-[10px] border-white/30" />
          <FruitLayer tone="leaf" className="depth-far left-[44%] bottom-[7%] h-10 w-24 rotate-[18deg] rounded-[90%_10%_90%_10%]" />

          <ProductVisual
            src={PRODUCT_ASSETS.mango}
            alt="PIO Mango original carton"
            tone="mango"
            className="product-mango left-[2%] top-[14%] h-[430px] w-[48%] max-w-[360px] -rotate-[5deg] sm:left-[10%] sm:h-[560px] lg:left-[7%] lg:top-[12%] lg:h-[610px]"
          />
          <ProductVisual
            src={PRODUCT_ASSETS.lychee}
            alt="PIO Lychee original carton"
            tone="lychee"
            className="product-lychee right-[0%] top-[22%] h-[420px] w-[48%] max-w-[350px] rotate-[5deg] sm:right-[8%] sm:h-[545px] lg:right-[5%] lg:top-[20%] lg:h-[590px]"
          />

          <FlavourInfo
            tone="mango"
            title="Mango"
            copy="Golden tropical sip with a smooth fruit finish."
            className="left-[2%] top-[6%] hidden sm:block"
          />
          <FlavourInfo
            tone="lychee"
            title="Lychee"
            copy="Fresh floral sweetness with a chilled feel."
            className="right-[0%] bottom-[8%] hidden sm:block"
          />
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------
   1. OUR FLAVOURS SECTION
---------------------------------------------------- */
function LegacyProductsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 86%', 'end 16%'],
  });

  const mangoY = useTransform(scrollYProgress, [0, 0.45, 1], [80, -18, -74]);
  const lycheeY = useTransform(scrollYProgress, [0, 0.55, 1], [130, 0, -92]);
  const mangoRotate = useTransform(scrollYProgress, [0, 1], [-5, 3]);
  const lycheeRotate = useTransform(scrollYProgress, [0, 1], [6, -4]);
  const mangoScale = useTransform(scrollYProgress, [0, 0.45, 1], [0.94, 1.03, 0.98]);
  const lycheeScale = useTransform(scrollYProgress, [0, 0.56, 1], [0.9, 1.04, 1]);
  const mangoPackY = useTransform(scrollYProgress, [0, 1], [24, -34]);
  const lycheePackY = useTransform(scrollYProgress, [0, 1], [30, -40]);
  const headlineY = useTransform(scrollYProgress, [0, 0.36], [46, 0]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.24], [0.25, 1]);

  return (
    <section ref={sectionRef} id="flavours" className="relative min-h-[150vh] md:min-h-[190vh] lg:min-h-[210vh] overflow-visible bg-white">
      <div className="sticky top-[60px] lg:top-[74px] min-h-[calc(100svh-60px)] lg:min-h-[calc(100vh-74px)] overflow-hidden border-y border-emerald-900/10 bg-[#fbfff8]">
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            style={{ scale: mangoScale }}
            className="absolute -left-28 top-10 h-[360px] sm:h-[520px] w-[360px] sm:w-[520px] rounded-full bg-[radial-gradient(circle,#ffe36c_0%,rgba(255,227,108,0.62)_34%,transparent_68%)] blur-2xl"
          />
          <motion.div
            style={{ scale: lycheeScale }}
            className="absolute -right-24 bottom-0 h-[380px] sm:h-[560px] w-[380px] sm:w-[560px] rounded-full bg-[radial-gradient(circle,#ffc3d2_0%,rgba(255,195,210,0.56)_35%,transparent_70%)] blur-2xl"
          />
          <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.72)_42%,rgba(239,255,244,0.78)_100%)]" />
          <div className="hidden sm:block absolute left-[6%] top-[20%] h-20 w-28 rounded-[70%_30%_62%_38%] bg-[#f8c33b]/70 blur-[1px] animate-[floatSubtle_4.5s_ease-in-out_infinite]" />
          <div className="hidden sm:block absolute right-[11%] top-[19%] h-20 w-20 rounded-full border-[10px] border-rose-200/80 animate-[spin_18s_linear_infinite]" />
        </div>

        <div className="relative mx-auto grid min-h-[calc(100svh-60px)] lg:min-h-[calc(100vh-74px)] max-w-7xl items-center gap-6 sm:gap-8 px-4 sm:px-8 py-6 sm:py-10 lg:grid-cols-12 lg:gap-10 lg:py-14">
          <motion.div style={{ y: headlineY, opacity: headlineOpacity }} className="z-20 max-w-[500px] lg:col-span-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-white/80 px-3.5 py-1.5 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.25em] text-[#0b8043] shadow-[0_12px_34px_rgba(7,88,47,0.08)] backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Products
            </span>
            <h2 className="mt-3 sm:mt-5 max-w-[470px] font-['Space_Grotesk',sans-serif] text-[clamp(2.4rem,7vw,5.35rem)] font-black uppercase leading-[0.92] tracking-tight text-[#082416]">
              Real fruit,<br />
              <span className="text-[#07582f]">ready to shine.</span>
            </h2>
            <p className="mt-3 sm:mt-5 max-w-md text-sm sm:text-base font-semibold leading-relaxed text-[#385b45]">
              Mango brings golden tropical depth. Lychee adds a bright floral chill. Both arrive in handy 160ml packs at Rs 10.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-[10px] font-black uppercase tracking-[0.16em] text-[#07582f] sm:mt-6">
              <span className="rounded-full border border-emerald-900/10 bg-white/75 px-3 py-1.5 shadow-2xs">160ml Pack</span>
              <span className="rounded-full border border-emerald-900/10 bg-white/75 px-3 py-1.5 shadow-2xs">Rs 10</span>
              <span className="rounded-full border border-emerald-900/10 bg-white/75 px-3 py-1.5 shadow-2xs">Made in Assam</span>
            </div>
            <div className="mt-5 sm:mt-7 flex items-center gap-3">
              <span className="h-2 w-16 overflow-hidden rounded-full bg-emerald-100">
                <motion.span style={{ scaleX: scrollYProgress }} className="block h-full origin-left rounded-full bg-[#07582f]" />
              </span>
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.22em] text-[#07582f]">Scroll</span>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: RESPONSIVE CARDS CONTAINER */}
          <div className="relative z-10 lg:col-span-7 w-full">
            
            {/* DESKTOP VIEW: PARALLAX SIDE-BY-SIDE CARDS */}
            <div className="hidden lg:block relative min-h-[650px] w-full">
              <motion.article
                style={{ y: mangoY, rotate: mangoRotate, scale: mangoScale }}
                className="group absolute left-[1%] top-4 min-h-[470px] w-[55%] xl:w-[52%] overflow-hidden rounded-[34px] border border-amber-300/80 bg-[linear-gradient(135deg,rgba(255,251,235,0.98),rgba(255,236,157,0.92))] p-6 shadow-[0_36px_90px_rgba(146,64,14,0.18)] backdrop-blur"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(255,255,255,0.9),transparent_24%),radial-gradient(circle_at_80%_80%,rgba(245,158,11,0.2),transparent_34%)]" />
                <motion.img
                  style={{ y: mangoPackY }}
                  src="/images/pio-mango.png"
                  alt="PIO Mango pack"
                  className="absolute -right-8 bottom-8 z-20 w-[45%] max-w-[250px] rotate-[8deg] object-contain drop-shadow-[0_26px_34px_rgba(120,53,15,0.24)] transition-transform duration-500 group-hover:rotate-[4deg] group-hover:scale-105"
                />
                <div className="relative z-10 flex min-h-[420px] max-w-[62%] flex-col justify-between">
                  <div>
                    <span className="rounded-full bg-white/70 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest text-[#92400e]">01 / Tropical Classic</span>
                    <h3 className="mt-3 font-['Space_Grotesk',sans-serif] text-5xl font-black uppercase leading-none text-[#78350f]">Mango</h3>
                    <p className="mt-2 text-base font-black text-[#92400e]">Tropical sweetness in every sip.</p>
                    <p className="mt-1.5 text-xs sm:text-sm font-semibold leading-relaxed text-[#78350f]/75">Rich, sun-ripened Alphonso-style puree blended for silky, juicy perfection.</p>
                    <div className="mt-3 flex flex-wrap gap-1.5 text-[11px] font-black text-amber-900">
                      <span className="rounded-lg border border-amber-300/70 bg-white/70 px-2 py-0.5">160ml Pack</span>
                      <span className="rounded-lg border border-amber-300/70 bg-white/70 px-2 py-0.5">₹10 Price</span>
                      <span className="rounded-lg border border-amber-300/70 bg-white/70 px-2 py-0.5">Real Pulp</span>
                    </div>
                  </div>

                  <div className="pt-3">
                    <button
                      onClick={() => go('partner')}
                      className="inline-flex items-center gap-2 rounded-full bg-[#92400e] px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-[0_14px_30px_rgba(146,64,14,0.22)] active:scale-95 transition-all hover:-translate-y-0.5 hover:bg-[#78350f] min-h-[44px] cursor-pointer"
                    >
                      <span>Enquire Mango</span> <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </motion.article>

              <motion.article
                style={{ y: lycheeY, rotate: lycheeRotate, scale: lycheeScale }}
                className="group absolute right-[1%] bottom-4 min-h-[470px] w-[55%] xl:w-[52%] overflow-hidden rounded-[34px] border border-rose-300/80 bg-[linear-gradient(135deg,rgba(255,247,249,0.98),rgba(255,214,226,0.92))] p-6 shadow-[0_36px_90px_rgba(157,23,77,0.18)] backdrop-blur"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,rgba(255,255,255,0.92),transparent_24%),radial-gradient(circle_at_78%_80%,rgba(225,29,72,0.18),transparent_34%)]" />
                <motion.img
                  style={{ y: lycheePackY }}
                  src="/images/pio-lychee.png"
                  alt="PIO Lychee pack"
                  className="absolute -right-8 bottom-8 z-20 w-[45%] max-w-[250px] rotate-[7deg] object-contain drop-shadow-[0_26px_34px_rgba(131,24,67,0.22)] transition-transform duration-500 group-hover:rotate-[3deg] group-hover:scale-105"
                />
                <div className="relative z-10 flex min-h-[420px] max-w-[62%] flex-col justify-between">
                  <div>
                    <span className="rounded-full bg-white/70 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest text-[#9d174d]">02 / Exotic Refresh</span>
                    <h3 className="mt-3 font-['Space_Grotesk',sans-serif] text-5xl font-black uppercase leading-none text-[#831843]">Lychee</h3>
                    <p className="mt-2 text-base font-black text-[#9d174d]">Fruity, fresh and full of fun.</p>
                    <p className="mt-1.5 text-xs sm:text-sm font-semibold leading-relaxed text-[#831843]/75">Delicate floral notes and crisp, thirst-quenching juicy sweetness.</p>
                    <div className="mt-3 flex flex-wrap gap-1.5 text-[11px] font-black text-rose-900">
                      <span className="rounded-lg border border-rose-300/70 bg-white/70 px-2 py-0.5">160ml Pack</span>
                      <span className="rounded-lg border border-rose-300/70 bg-white/70 px-2 py-0.5">₹10 Price</span>
                      <span className="rounded-lg border border-rose-300/70 bg-white/70 px-2 py-0.5">Floral Nectar</span>
                    </div>
                  </div>

                  <div className="pt-3">
                    <button
                      onClick={() => go('partner')}
                      className="inline-flex items-center gap-2 rounded-full bg-[#9d174d] px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-[0_14px_30px_rgba(157,23,77,0.22)] active:scale-95 transition-all hover:-translate-y-0.5 hover:bg-[#831843] min-h-[44px] cursor-pointer"
                    >
                      <span>Enquire Lychee</span> <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </motion.article>
            </div>

            {/* MOBILE & TABLET VIEW: CLEAN VERTICAL STACK OR DEDICATED CARDS (ZERO OVERLAP) */}
            <div className="lg:hidden flex flex-col gap-5 w-full">
              {/* Mango Card */}
              <article className="relative w-full overflow-hidden rounded-[28px] border border-amber-300/80 bg-[linear-gradient(135deg,rgba(255,251,235,0.98),rgba(255,236,157,0.92))] p-5 shadow-[0_20px_54px_rgba(146,64,14,0.12)] backdrop-blur">
                <img src="/images/pio-mango.png" alt="PIO Mango pack" className="absolute -right-5 bottom-4 w-[34%] min-w-[112px] rotate-6 object-contain drop-shadow-[0_18px_24px_rgba(120,53,15,0.18)]" />
                <div className="relative z-10 flex min-h-[250px] max-w-[70%] flex-col justify-between space-y-4">
                  <div>
                    <span className="rounded-full bg-white/80 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest text-[#92400e]">01 / Tropical Classic</span>
                    <h3 className="mt-2 font-['Space_Grotesk',sans-serif] text-3xl sm:text-4xl font-black uppercase text-[#78350f]">Mango</h3>
                    <p className="mt-1 text-sm font-black text-[#92400e]">Tropical sweetness in every sip.</p>
                    <p className="mt-1 text-xs font-semibold text-[#78350f]/80 leading-relaxed">Rich, sun-ripened Alphonso-style puree blended for silky, juicy perfection.</p>
                    <div className="mt-3 flex flex-wrap gap-1.5 text-[10px] font-black text-amber-900">
                      <span className="rounded-lg border border-amber-300/70 bg-white/70 px-2 py-0.5">160ml Pack</span>
                      <span className="rounded-lg border border-amber-300/70 bg-white/70 px-2 py-0.5">₹10 Price</span>
                      <span className="rounded-lg border border-amber-300/70 bg-white/70 px-2 py-0.5">Real Pulp</span>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => go('partner')}
                      className="inline-flex items-center gap-2 rounded-full bg-[#92400e] px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-xs active:scale-95 cursor-pointer min-h-[44px]"
                    >
                      <span>Enquire</span> <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </article>

              {/* Lychee Card */}
              <article className="relative w-full overflow-hidden rounded-[28px] border border-rose-300/80 bg-[linear-gradient(135deg,rgba(255,247,249,0.98),rgba(255,214,226,0.92))] p-5 shadow-[0_20px_54px_rgba(157,23,77,0.12)] backdrop-blur">
                <img src="/images/pio-lychee.png" alt="PIO Lychee pack" className="absolute -right-5 bottom-4 w-[34%] min-w-[112px] rotate-6 object-contain drop-shadow-[0_18px_24px_rgba(131,24,67,0.18)]" />
                <div className="relative z-10 flex min-h-[250px] max-w-[70%] flex-col justify-between space-y-4">
                  <div>
                    <span className="rounded-full bg-white/80 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest text-[#9d174d]">02 / Exotic Refresh</span>
                    <h3 className="mt-2 font-['Space_Grotesk',sans-serif] text-3xl sm:text-4xl font-black uppercase text-[#831843]">Lychee</h3>
                    <p className="mt-1 text-sm font-black text-[#9d174d]">Fruity, fresh and full of fun.</p>
                    <p className="mt-1 text-xs font-semibold text-[#831843]/80 leading-relaxed">Delicate floral notes and crisp, thirst-quenching juicy sweetness.</p>
                    <div className="mt-3 flex flex-wrap gap-1.5 text-[10px] font-black text-rose-900">
                      <span className="rounded-lg border border-rose-300/70 bg-white/70 px-2 py-0.5">160ml Pack</span>
                      <span className="rounded-lg border border-rose-300/70 bg-white/70 px-2 py-0.5">₹10 Price</span>
                      <span className="rounded-lg border border-rose-300/70 bg-white/70 px-2 py-0.5">Floral Nectar</span>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => go('partner')}
                      className="inline-flex items-center gap-2 rounded-full bg-[#9d174d] px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-xs active:scale-95 cursor-pointer min-h-[44px]"
                    >
                      <span>Enquire</span> <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

function LegacyFlavours() {
  return (
    <section id="flavours" className="relative py-20 lg:py-28 bg-[#fdfdfd] overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header matching reference */}
        <motion.div {...reveal} className="mb-14 text-center max-w-2xl mx-auto">
          <span className="inline-block text-xs font-black uppercase tracking-[0.25em] text-[#0b8043] bg-[#eef8f1] px-4 py-1.5 rounded-full">
            Our Flavours
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-black text-[#083b20] tracking-tight">
            Two refreshing flavours.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#3b5e48] font-medium">
            Same amazing taste. Pure fruit excitement. Just ₹10.
          </p>
        </motion.div>

        {/* 2 Distinct Flavor Cards using SINGLE PACKS */}
        <div className="grid gap-8 lg:grid-cols-2">
          
          {/* MANGO CARD (Single Mango Pack) */}
          <motion.article 
            {...reveal}
            className="group relative overflow-hidden rounded-[32px] border border-[#fde68a] bg-gradient-to-br from-[#fefbf1] via-[#fff8db] to-[#fdebb3] p-8 sm:p-10 shadow-lg shadow-amber-950/5 hover:shadow-xl transition-all duration-300"
          >
            <div className="relative z-10 flex flex-col justify-between h-full min-h-[420px] max-w-[280px] sm:max-w-[320px]">
              <div>
                <span className="text-[11px] font-black uppercase tracking-widest text-[#92400e] bg-amber-200/60 px-3 py-1 rounded-full">
                  01 / Tropical Classic
                </span>
                <h3 className="mt-4 text-4xl sm:text-5xl font-black uppercase tracking-tight text-[#78350f]">
                  Mango
                </h3>
                <p className="mt-2 text-base sm:text-lg font-bold text-[#92400e]/90">
                  Tropical sweetness in every sip.
                </p>
                <p className="mt-3 text-sm text-[#78350f]/75 leading-relaxed">
                  Rich, sun-ripened Alphonso-style puree blended for silky, juicy perfection. Perfect companion for sunny days.
                </p>

                <div className="mt-6 flex flex-wrap gap-2 text-xs font-black text-amber-900">
                  <span className="px-2.5 py-1 rounded-lg bg-white/70 border border-amber-300/60">160ml Pack</span>
                  <span className="px-2.5 py-1 rounded-lg bg-white/70 border border-amber-300/60">50 kcal</span>
                  <span className="px-2.5 py-1 rounded-lg bg-white/70 border border-amber-300/60">Real Pulp</span>
                </div>
              </div>

              <div className="pt-8">
                <button 
                  onClick={() => go('mango-story')} 
                  className="inline-flex items-center gap-2 rounded-full bg-[#92400e] hover:bg-[#78350f] text-white px-6 py-3 text-xs font-extrabold uppercase tracking-wider shadow-md hover:-translate-y-0.5 transition-all"
                >
                  Explore Mango <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.article>

          {/* LYCHEE CARD (Single Lychee Pack) */}
          <motion.article 
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.1 }}
            className="group relative overflow-hidden rounded-[32px] border border-[#fbcfe8] bg-gradient-to-br from-[#fff7f9] via-[#fdeff3] to-[#fadbe4] p-8 sm:p-10 shadow-lg shadow-rose-950/5 hover:shadow-xl transition-all duration-300"
          >
            <div className="relative z-10 flex flex-col justify-between h-full min-h-[420px] max-w-[280px] sm:max-w-[320px]">
              <div>
                <span className="text-[11px] font-black uppercase tracking-widest text-[#9d174d] bg-rose-200/60 px-3 py-1 rounded-full">
                  02 / Exotic Refresh
                </span>
                <h3 className="mt-4 text-4xl sm:text-5xl font-black uppercase tracking-tight text-[#831843]">
                  Lychee
                </h3>
                <p className="mt-2 text-base sm:text-lg font-bold text-[#9d174d]/90">
                  Fruity, fresh and full of fun.
                </p>
                <p className="mt-3 text-sm text-[#831843]/75 leading-relaxed">
                  Delicate floral notes and crisp, thirst-quenching juicy sweetness. Light, uplifting and delicious chilled.
                </p>

                <div className="mt-6 flex flex-wrap gap-2 text-xs font-black text-rose-900">
                  <span className="px-2.5 py-1 rounded-lg bg-white/70 border border-rose-300/60">160ml Pack</span>
                  <span className="px-2.5 py-1 rounded-lg bg-white/70 border border-rose-300/60">54 kcal</span>
                  <span className="px-2.5 py-1 rounded-lg bg-white/70 border border-rose-300/60">Pure Floral Taste</span>
                </div>
              </div>

              <div className="pt-8">
                <button 
                  onClick={() => go('lychee-story')} 
                  className="inline-flex items-center gap-2 rounded-full bg-[#9d174d] hover:bg-[#831843] text-white px-6 py-3 text-xs font-extrabold uppercase tracking-wider shadow-md hover:-translate-y-0.5 transition-all"
                >
                  Explore Lychee <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.article>

        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------
   2. WHY PIO? SECTION — Re-exported from dedicated 3D component
---------------------------------------------------- */
export { WhyPIO } from './WhyPIO';



// Re-export dedicated cinematic FlavorStories component
export { FlavorStories } from './FlavorStories';


/* ----------------------------------------------------
   4. BIG REFRESHMENT JUST ₹10 BANNER
---------------------------------------------------- */
export function PriceBanner() {
  return (
    <section id="price" className="relative overflow-hidden bg-[#f4faf5] py-20 lg:py-24 border-y border-emerald-900/10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          
          <motion.div {...reveal} className="lg:col-span-6 space-y-5">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#07582f] bg-[#e3f4e8] px-3.5 py-1.5 rounded-full">
              Value That Delights
            </span>
            <h2 className="text-4xl sm:text-6xl font-black text-[#083b20] tracking-tight leading-[0.95]">
              Big Refreshment<br />
              <span className="text-[#eab308]">JUST ₹10</span>
            </h2>
            <p className="text-base sm:text-lg text-[#325340] leading-relaxed font-medium">
              We believe pure, high quality fruit refreshment should be within everyone’s reach. No compromises on multilayer aseptic carton packaging, food safety, or genuine fruit taste.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 border border-emerald-900/10 text-xs font-extrabold text-emerald-950 shadow-2xs">
                <Check className="w-4 h-4 text-[#0b8043]" />
                160ml Convenient Tetra Pack
              </div>
              <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 border border-emerald-900/10 text-xs font-extrabold text-emerald-950 shadow-2xs">
                <Check className="w-4 h-4 text-[#0b8043]" />
                Includes Straw Attached
              </div>
            </div>
          </motion.div>

          <motion.div {...reveal} className="lg:col-span-6 overflow-hidden rounded-[32px] border border-emerald-900/10 bg-white p-3 shadow-xl">
            <img 
              src="/images/price-board.jpg" 
              alt="Big Refreshment Just ₹10 wooden sign board and store" 
              className="w-full h-auto rounded-[24px] object-cover"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------
   5. WHAT'S INSIDE? (INGREDIENTS) — Re-exported from dedicated 3D component
---------------------------------------------------- */
export { Ingredients } from './Ingredients';


/* ----------------------------------------------------
   6. SIPOHH! MOMENTS
---------------------------------------------------- */
const momentsList = [
  {
    icon: School,
    title: 'School & Recess',
    text: 'Fits right in the school bag. The ultimate tasty recess break energy.'
  },
  {
    icon: Users,
    title: 'Friends & Hangouts',
    text: 'A ₹10 treat to share with the entire crew without breaking the bank.'
  },
  {
    icon: Plane,
    title: 'Travel & Commute',
    text: 'Spill-free, straw-equipped carton that is ready for on-the-go refreshment.'
  },
  {
    icon: Sparkles,
    title: 'Afternoon Pick-Me-Up',
    text: 'Chill and enjoy a cool fruit burst when the afternoon sun hits.'
  },
];

export function Moments() {
  return (
    <section id="moments" className="py-20 lg:py-28 bg-[#f5fbf7] border-y border-emerald-900/10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          
          <motion.div {...reveal} className="lg:col-span-5 space-y-6">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#0b8043] bg-[#eef8f1] px-4 py-1.5 rounded-full">
              SipOhh! Moments
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#083b20] tracking-tight leading-tight">
              For school, friends, travel or anytime you need a refresh.
            </h2>
            <p className="text-base text-[#385b45] leading-relaxed font-medium">
              Whether you are rushing to class, unwinding after sports, or heading on a road trip, PIO brings that instant fruity spark.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {momentsList.map((m) => (
                <div key={m.title} className="rounded-2xl bg-white p-4 border border-emerald-900/10 shadow-2xs">
                  <m.icon className="h-5 w-5 text-[#07582f]" />
                  <h4 className="mt-2 text-sm font-black text-[#083b20]">{m.title}</h4>
                  <p className="mt-1 text-xs text-slate-500 leading-snug">{m.text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...reveal} className="lg:col-span-7 overflow-hidden rounded-[32px] border border-emerald-900/10 shadow-xl bg-white p-3">
            <img 
              src="/images/moments-card.jpg" 
              alt="PIO SipOhh Moments friends enjoying drinks" 
              className="w-full h-auto rounded-[24px] object-cover"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------
   7. WHERE TO BUY SECTION — Re-exported from dedicated 3D component
---------------------------------------------------- */
