import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Zap, Wheat, Box } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function FlavorStories() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mangoSectionRef = useRef<HTMLElement>(null);
  const lycheeSectionRef = useRef<HTMLElement>(null);

  // Mango references
  const mangoHeaderRef = useRef<HTMLDivElement>(null);
  const mangoH2Line1Ref = useRef<HTMLSpanElement>(null);
  const mangoH2Line2Ref = useRef<HTMLSpanElement>(null);
  const mangoCopyRef = useRef<HTMLParagraphElement>(null);
  const mangoNutriRef = useRef<HTMLDivElement>(null);
  const mangoCtaRef = useRef<HTMLDivElement>(null);
  const mangoPackWrapRef = useRef<HTMLDivElement>(null);
  const mangoPackImgRef = useRef<HTMLImageElement>(null);
  const mangoFruitLayer1Ref = useRef<HTMLDivElement>(null);
  const mangoFruitLayer2Ref = useRef<HTMLDivElement>(null);
  const mangoFruitLayer3Ref = useRef<HTMLDivElement>(null);
  const mangoRibbonRef = useRef<SVGPathElement>(null);

  // Lychee references
  const lycheeHeaderRef = useRef<HTMLDivElement>(null);
  const lycheeH2Line1Ref = useRef<HTMLSpanElement>(null);
  const lycheeH2Line2Ref = useRef<HTMLSpanElement>(null);
  const lycheeCopyRef = useRef<HTMLParagraphElement>(null);
  const lycheeNutriRef = useRef<HTMLDivElement>(null);
  const lycheeCtaRef = useRef<HTMLDivElement>(null);
  const lycheePackWrapRef = useRef<HTMLDivElement>(null);
  const lycheePackImgRef = useRef<HTMLImageElement>(null);
  const lycheeFruitLayer1Ref = useRef<HTMLDivElement>(null);
  const lycheeFruitLayer2Ref = useRef<HTMLDivElement>(null);
  const lycheeFruitLayer3Ref = useRef<HTMLDivElement>(null);
  const lycheeRibbonRef = useRef<SVGPathElement>(null);

  // Button hover magnetic effect handler
  const attachMagneticButton = (el: HTMLElement | null) => {
    if (!el) return;
    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
      gsap.to(el, { x, y, duration: 0.3, ease: 'power2.out' });
    };
    const onMouseLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
    };
    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);
    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    const parallaxFactor = isMobile ? 0.2 : isTablet ? 0.6 : 1.0;

    const ctx = gsap.context(() => {
      /* ====================================================
         1. MANGO STORY SCROLLTIMELINE & PARALLAX
         ==================================================== */
      if (mangoSectionRef.current) {
        // Line-by-line headline reveal with clip-path
        const mangoTL = gsap.timeline({
          scrollTrigger: {
            trigger: mangoSectionRef.current,
            start: 'top 75%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
          },
        });

        mangoTL
          .fromTo(
            [mangoH2Line1Ref.current, mangoH2Line2Ref.current],
            { y: '110%', opacity: 0 },
            { y: '0%', opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out' }
          )
          .fromTo(
            mangoCopyRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
            '-=0.4'
          )
          .fromTo(
            mangoNutriRef.current,
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
            '-=0.3'
          )
          .fromTo(
            mangoCtaRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
            '-=0.3'
          );

        // Continuous Scroll-linked parallax & 3D scale over section travel
        gsap.fromTo(
          mangoPackWrapRef.current,
          { scale: 1.08, y: 40 },
          {
            scale: 1.0,
            y: -30,
            ease: 'none',
            scrollTrigger: {
              trigger: mangoSectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );

        // Layered Parallax: Foreground fast, mid leaves medium, background slow
        if (mangoFruitLayer1Ref.current) {
          gsap.fromTo(
            mangoFruitLayer1Ref.current,
            { y: 80 * parallaxFactor },
            {
              y: -120 * parallaxFactor,
              ease: 'none',
              scrollTrigger: {
                trigger: mangoSectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.8,
              },
            }
          );
        }

        if (mangoFruitLayer2Ref.current) {
          gsap.fromTo(
            mangoFruitLayer2Ref.current,
            { y: 40 * parallaxFactor },
            {
              y: -60 * parallaxFactor,
              ease: 'none',
              scrollTrigger: {
                trigger: mangoSectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
              },
            }
          );
        }

        if (mangoFruitLayer3Ref.current) {
          gsap.fromTo(
            mangoFruitLayer3Ref.current,
            { y: 20 * parallaxFactor },
            {
              y: -30 * parallaxFactor,
              ease: 'none',
              scrollTrigger: {
                trigger: mangoSectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.6,
              },
            }
          );
        }

        // Golden Liquid Ribbon scroll motion
        if (mangoRibbonRef.current) {
          gsap.fromTo(
            mangoRibbonRef.current,
            { strokeDashoffset: 1000, opacity: 0.4 },
            {
              strokeDashoffset: 0,
              opacity: 0.85,
              ease: 'none',
              scrollTrigger: {
                trigger: mangoSectionRef.current,
                start: 'top 60%',
                end: 'bottom 40%',
                scrub: 1.5,
              },
            }
          );
        }

        // Floating ambient animation for mango elements (rAF loops / GSAP repeats)
        if (!prefersReducedMotion) {
          gsap.to('.mango-float-slow', {
            y: '-=12',
            rotation: '+=2.5',
            duration: 3.5,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          });
          gsap.to('.mango-float-fast', {
            y: '+=16',
            rotation: '-=4',
            duration: 2.8,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: 0.5,
          });
        }
      }

      /* ====================================================
         2. LYCHEE STORY SCROLLTIMELINE & PARALLAX
         ==================================================== */
      if (lycheeSectionRef.current) {
        // Line-by-line headline reveal with clip-path
        const lycheeTL = gsap.timeline({
          scrollTrigger: {
            trigger: lycheeSectionRef.current,
            start: 'top 75%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
          },
        });

        lycheeTL
          .fromTo(
            [lycheeH2Line1Ref.current, lycheeH2Line2Ref.current],
            { y: '110%', opacity: 0 },
            { y: '0%', opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out' }
          )
          .fromTo(
            lycheeCopyRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
            '-=0.4'
          )
          .fromTo(
            lycheeNutriRef.current,
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
            '-=0.3'
          )
          .fromTo(
            lycheeCtaRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
            '-=0.3'
          );

        // Product slowly moves toward camera (scale up slightly, subtle y)
        gsap.fromTo(
          lycheePackWrapRef.current,
          { scale: 0.94, y: 40 },
          {
            scale: 1.02,
            y: -25,
            ease: 'none',
            scrollTrigger: {
              trigger: lycheeSectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );

        // Layered Parallax: foreground lychees fastest, peeled lychee mid, background slow
        if (lycheeFruitLayer1Ref.current) {
          gsap.fromTo(
            lycheeFruitLayer1Ref.current,
            { y: 80 * parallaxFactor },
            {
              y: -120 * parallaxFactor,
              ease: 'none',
              scrollTrigger: {
                trigger: lycheeSectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.8,
              },
            }
          );
        }

        if (lycheeFruitLayer2Ref.current) {
          gsap.fromTo(
            lycheeFruitLayer2Ref.current,
            { y: 45 * parallaxFactor },
            {
              y: -70 * parallaxFactor,
              ease: 'none',
              scrollTrigger: {
                trigger: lycheeSectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
              },
            }
          );
        }

        if (lycheeFruitLayer3Ref.current) {
          gsap.fromTo(
            lycheeFruitLayer3Ref.current,
            { y: 20 * parallaxFactor },
            {
              y: -30 * parallaxFactor,
              ease: 'none',
              scrollTrigger: {
                trigger: lycheeSectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.6,
              },
            }
          );
        }

        // Pink translucent liquid arc expansion
        if (lycheeRibbonRef.current) {
          gsap.fromTo(
            lycheeRibbonRef.current,
            { strokeDashoffset: 1000, opacity: 0.3 },
            {
              strokeDashoffset: 0,
              opacity: 0.8,
              ease: 'none',
              scrollTrigger: {
                trigger: lycheeSectionRef.current,
                start: 'top 60%',
                end: 'bottom 40%',
                scrub: 1.5,
              },
            }
          );
        }

        // Floating ambient animation for lychee droplets and fruits
        if (!prefersReducedMotion) {
          gsap.to('.lychee-float-slow', {
            y: '-=14',
            rotation: '-=3',
            duration: 3.8,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          });
          gsap.to('.lychee-float-fast', {
            y: '+=15',
            rotation: '+=4',
            duration: 2.6,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: 0.3,
          });
        }
      }

      /* ====================================================
         3. 3D POINTER TILT FOR DESKTOP
         ==================================================== */
      if (!isMobile && !prefersReducedMotion) {
        const handlePointerMoveMango = (e: MouseEvent) => {
          if (!mangoSectionRef.current || !mangoPackImgRef.current) return;
          const rect = mangoSectionRef.current.getBoundingClientRect();
          if (e.clientY < rect.top || e.clientY > rect.bottom) return;
          const normX = (e.clientX - rect.left) / rect.width - 0.5;
          const normY = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to(mangoPackImgRef.current, {
            rotationY: normX * 6,
            rotationX: -normY * 5,
            transformPerspective: 900,
            ease: 'power1.out',
            duration: 0.5,
          });
        };

        const handlePointerMoveLychee = (e: MouseEvent) => {
          if (!lycheeSectionRef.current || !lycheePackImgRef.current) return;
          const rect = lycheeSectionRef.current.getBoundingClientRect();
          if (e.clientY < rect.top || e.clientY > rect.bottom) return;
          const normX = (e.clientX - rect.left) / rect.width - 0.5;
          const normY = (e.clientY - rect.top) / rect.height - 0.5;
          // rotateX max 2deg, rotateY max 3deg as strictly specified
          gsap.to(lycheePackImgRef.current, {
            rotationY: normX * 3,
            rotationX: -normY * 2,
            transformPerspective: 900,
            ease: 'power1.out',
            duration: 0.5,
          });
        };

        window.addEventListener('mousemove', handlePointerMoveMango);
        window.addEventListener('mousemove', handlePointerMoveLychee);

        return () => {
          window.removeEventListener('mousemove', handlePointerMoveMango);
          window.removeEventListener('mousemove', handlePointerMoveLychee);
        };
      }
    }, containerRef);

    // Magnetic CTA button cleanup
    const cleanBtn1 = attachMagneticButton(mangoCtaRef.current?.querySelector('button') || null);
    const cleanBtn2 = attachMagneticButton(lycheeCtaRef.current?.querySelector('button') || null);

    return () => {
      ctx.revert(); // Automatically kills all ScrollTrigger instances & animations on unmount
      cleanBtn1?.();
      cleanBtn2?.();
    };
  }, []);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div ref={containerRef} className="relative w-full bg-white selection:bg-[#07582f] selection:text-white">
      {/* ====================================================
          TOP INTRO HEADER: "Crafted for pure delight."
          ==================================================== */}
      <div id="stories" className="pt-20 sm:pt-28 pb-8 sm:pb-12 text-center max-w-3xl mx-auto px-5 sm:px-8">
        <span className="inline-block text-xs font-black uppercase tracking-[0.25em] text-[#0b8043] bg-[#eef8f1] px-4 py-1.5 rounded-full border border-emerald-200/60 shadow-xs">
          The Flavor Stories
        </span>
        <h2 className="mt-4 text-3xl sm:text-5xl font-black text-[#083b20] tracking-tight leading-tight">
          Crafted for pure delight.
        </h2>
        <p className="mt-3 text-base text-[#3b5e48] font-medium max-w-xl mx-auto">
          Explore each unique recipe, tasting profile, and nutritional breakdown in scroll-linked 3D depth.
        </p>
      </div>

      {/* ====================================================
          SECTION 1: MANGO STORY (Cinematic Scroll Section)
          ==================================================== */}
      <section
        id="mango-story"
        ref={mangoSectionRef}
        className="relative overflow-hidden py-16 sm:py-24 lg:py-28 bg-gradient-to-b from-[#fffbf0] via-[#fef7df] to-[#fdebb8]"
      >
        {/* Ambient golden mango liquid glows & backdrop */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(245,158,11,0.22),transparent_50%),radial-gradient(circle_at_20%_80%,rgba(251,191,36,0.15),transparent_45%)]" />

        {/* Subtle SVG Liquid Ribbon flowing behind/around pack */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-70">
          <svg className="w-full h-full max-w-6xl" viewBox="0 0 1200 800" fill="none" preserveAspectRatio="none">
            <path
              ref={mangoRibbonRef}
              d="M100 650 C 350 720, 600 350, 780 480 C 950 600, 1100 250, 1250 280"
              stroke="url(#mangoGrad)"
              strokeWidth="38"
              strokeLinecap="round"
              strokeDasharray="1000"
              style={{ filter: 'blur(3px)' }}
            />
            <defs>
              <linearGradient id="mangoGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.1" />
                <stop offset="40%" stopColor="#fbbf24" stopOpacity="0.75" />
                <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#d97706" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Floating Fruit Parallax Decoration Layers */}
        {/* Layer 1: Foreground Mango Cubes & Slices (Fastest, blurred depth) */}
        <div ref={mangoFruitLayer1Ref} className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
          {/* Top-right floating mango piece with subtle blur for true depth-of-field */}
          <div className="mango-float-fast absolute right-[8%] top-[12%] w-16 sm:w-20 aspect-square rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 shadow-xl shadow-amber-900/20 rotate-12 flex items-center justify-center text-3xl select-none backdrop-blur-xs filter blur-[0.6px]">
            🥭
          </div>
          {/* Bottom-right foreground mango cube */}
          <div className="mango-float-fast absolute right-[28%] bottom-[8%] w-14 sm:w-16 aspect-square rounded-2xl bg-gradient-to-br from-yellow-300 to-amber-500 shadow-lg shadow-amber-900/20 -rotate-6 flex items-center justify-center text-2xl select-none filter blur-[0.4px]">
            🥭
          </div>
        </div>

        {/* Layer 2: Mid-ground Green Leaves & Fresh Droplets (Medium speed) */}
        <div ref={mangoFruitLayer2Ref} className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
          {/* Fresh tea/mango leaf */}
          <div className="mango-float-slow absolute right-[40%] top-[18%] flex items-center justify-center text-3xl select-none drop-shadow-md rotate-45 opacity-85">
            🍃
          </div>
          {/* Natural glistening droplet */}
          <div className="mango-float-slow absolute right-[18%] bottom-[25%] w-7 h-7 rounded-full bg-white/70 border border-white/90 shadow-inner backdrop-blur-sm" />
          <div className="mango-float-slow absolute left-[45%] top-[14%] w-5 h-5 rounded-full bg-amber-200/60 border border-white/80 shadow-xs backdrop-blur-xs" />
        </div>

        {/* Layer 3: Background soft ambient glow (Slowest) */}
        <div ref={mangoFruitLayer3Ref} className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute right-[15%] top-[25%] w-96 h-96 rounded-full bg-amber-400/25 blur-3xl" />
        </div>

        {/* Main Content Grid */}
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Content Area: Headline line-by-line, story copy, nutrition, CTA */}
            <div className="lg:col-span-6 space-y-6">
              {/* Badge */}
              <div ref={mangoHeaderRef} className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-amber-300 shadow-xs backdrop-blur-md">
                <span className="text-base">🥭</span>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#92400e]">
                  MANGO STORY
                </span>
              </div>

              {/* Headline with clip-path line reveal */}
              <div className="overflow-hidden">
                <h3 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-black text-[#301704] tracking-tight leading-[1.08]">
                  <span ref={mangoH2Line1Ref} className="block overflow-hidden pb-1">
                    A Burst of Tropical
                  </span>
                  <span ref={mangoH2Line2Ref} className="block text-[#b45309] overflow-hidden">
                    Freshness in Every Sip.
                  </span>
                </h3>
              </div>

              {/* Supporting Copy */}
              <p ref={mangoCopyRef} className="text-sm sm:text-base text-[#6b380f]/90 font-medium leading-relaxed max-w-xl">
                Picked at peak harvest, our sun-kissed Alphonso-style mangoes bring that authentic, velvety orchard thickness everyone loves. Golden mango liquid, sunlit vibrancy, and a burst of genuine fruit excitement.
              </p>

              {/* Nutrition Facts Card (Per 100ml) */}
              <div ref={mangoNutriRef} className="rounded-3xl bg-white/95 p-5 border border-amber-200/80 shadow-md shadow-amber-950/5 backdrop-blur-md max-w-lg">
                <div className="flex items-center justify-between mb-3.5">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                    Nutrition Breakdown (Per 100ml)
                  </span>
                  <span className="text-[11px] font-bold text-amber-700 bg-amber-100/80 px-2.5 py-0.5 rounded-full">
                    100% Real Fruit Pulp
                  </span>
                </div>
                <div className="grid grid-cols-3 divide-x divide-slate-100">
                  {/* Energy */}
                  <div className="flex items-center gap-2.5 pr-2">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#fef3c7] text-[#d97706] shadow-xs">
                      <Zap className="h-5 w-5 fill-[#d97706]" />
                    </div>
                    <div>
                      <div className="text-sm sm:text-base font-black text-slate-900 leading-none">50 kcal</div>
                      <div className="text-[11px] font-semibold text-slate-500 mt-0.5">Energy</div>
                    </div>
                  </div>

                  {/* Carbs */}
                  <div className="flex items-center gap-2.5 px-2">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#fef3c7] text-[#d97706] shadow-xs">
                      <Wheat className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm sm:text-base font-black text-slate-900 leading-none">12 g</div>
                      <div className="text-[11px] font-semibold text-slate-500 mt-0.5">Carbs</div>
                    </div>
                  </div>

                  {/* Sugar */}
                  <div className="flex items-center gap-2.5 pl-2">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#fef3c7] text-[#d97706] shadow-xs">
                      <Box className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm sm:text-base font-black text-slate-900 leading-none">10 g</div>
                      <div className="text-[11px] font-semibold text-slate-500 mt-0.5">Sugar</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Magnetic Interactive CTA Button */}
              <div ref={mangoCtaRef} className="pt-2">
                <button
                  onClick={() => go('where-to-buy')}
                  className="group relative inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#78350f] via-[#632a0a] to-[#451a03] hover:from-[#92400e] hover:to-[#572205] text-white px-8 py-4 text-xs sm:text-sm font-black uppercase tracking-wider shadow-lg shadow-amber-950/25 transition-all duration-300"
                >
                  <span>Explore Mango Story</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </button>
              </div>
            </div>

            {/* Right Column: 3D Product Display with Scroll-linked depth & pointer tilt */}
            <div className="lg:col-span-6 flex items-center justify-center relative min-h-[440px] sm:min-h-[520px]">
              <div ref={mangoPackWrapRef} className="relative flex items-center justify-center w-full">
                {/* Crisp 3D Pack Render: No white wash, sharp details */}
                <img
                  ref={mangoPackImgRef}
                  src="/images/pio-mango.png"
                  alt="PIO Mango 100ml Carton 3D pack"
                  className="relative z-10 max-h-[380px] sm:max-h-[460px] lg:max-h-[500px] w-auto object-contain drop-shadow-[0_25px_35px_rgba(120,53,15,0.35)] select-none will-change-transform"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          COLOR MORPH TRANSITION: Mango Golden to Lychee Pink
          Liquid curved wave / organic gradient blend (No hard cut)
          ==================================================== */}
      <div className="relative w-full h-24 sm:h-36 -my-1 overflow-hidden pointer-events-none z-10">
        <svg
          viewBox="0 0 1440 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full preserve-3d"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C320,120 480,180 820,100 C1140,20 1320,140 1440,80 L1440,220 L0,220 Z"
            fill="url(#morphGradient)"
          />
          <defs>
            <linearGradient id="morphGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fdebb8" />
              <stop offset="35%" stopColor="#fed7aa" />
              <stop offset="65%" stopColor="#fed7e2" />
              <stop offset="100%" stopColor="#fce7ec" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ====================================================
          SECTION 2: LYCHEE STORY (Cinematic Scroll Section)
          ==================================================== */}
      <section
        id="lychee-story"
        ref={lycheeSectionRef}
        className="relative overflow-hidden py-16 sm:py-24 lg:py-28 bg-gradient-to-b from-[#fce7ec] via-[#fdf0f4] to-[#fbcfe8]"
      >
        {/* Ambient pink lychee liquid glow & atmosphere */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(244,63,94,0.18),transparent_50%),radial-gradient(circle_at_20%_80%,rgba(251,113,133,0.14),transparent_45%)]" />

        {/* Pink Translucent Liquid Arc flowing around the pack */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-70">
          <svg className="w-full h-full max-w-6xl" viewBox="0 0 1200 800" fill="none" preserveAspectRatio="none">
            <path
              ref={lycheeRibbonRef}
              d="M1100 680 C 850 720, 600 320, 420 460 C 260 580, 150 260, -50 280"
              stroke="url(#lycheeGrad)"
              strokeWidth="36"
              strokeLinecap="round"
              strokeDasharray="1000"
              style={{ filter: 'blur(3px)' }}
            />
            <defs>
              <linearGradient id="lycheeGrad" x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.1" />
                <stop offset="35%" stopColor="#fb7185" stopOpacity="0.7" />
                <stop offset="70%" stopColor="#fda4af" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#e11d48" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Floating Lychee Parallax Decoration Layers */}
        {/* Layer 1: Foreground Lychees (Fastest, subtle depth-of-field blur on decoration only) */}
        <div ref={lycheeFruitLayer1Ref} className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
          {/* Foreground whole lychee badge */}
          <div className="lychee-float-fast absolute right-[10%] top-[14%] w-16 sm:w-20 aspect-square rounded-2xl bg-gradient-to-br from-rose-400 via-rose-500 to-rose-600 shadow-xl shadow-rose-950/20 rotate-12 flex items-center justify-center text-3xl select-none filter blur-[0.6px]">
            🍓
          </div>
          {/* Foreground peeled lychee element */}
          <div className="lychee-float-fast absolute right-[32%] bottom-[8%] w-14 sm:w-16 aspect-square rounded-2xl bg-gradient-to-br from-pink-200 to-rose-400 shadow-lg shadow-rose-950/20 -rotate-12 flex items-center justify-center text-2xl select-none filter blur-[0.4px]">
            🍬
          </div>
        </div>

        {/* Layer 2: Mid-ground Peeled Lychee, Leaves & Ice-like Glass Droplets (Medium speed) */}
        <div ref={lycheeFruitLayer2Ref} className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
          {/* Green leaf accent */}
          <div className="lychee-float-slow absolute right-[42%] top-[16%] flex items-center justify-center text-3xl select-none drop-shadow-md -rotate-45 opacity-85">
            🍃
          </div>
          {/* Subtle translucent ice-glass crystal */}
          <div className="lychee-float-slow absolute right-[20%] bottom-[24%] w-7 h-7 rounded-xl bg-white/70 border border-white/90 shadow-md backdrop-blur-sm rotate-45" />
          <div className="lychee-float-slow absolute left-[46%] top-[16%] w-5 h-5 rounded-full bg-rose-200/60 border border-white/80 shadow-xs backdrop-blur-xs" />
        </div>

        {/* Layer 3: Background Soft Glow (Slowest) */}
        <div ref={lycheeFruitLayer3Ref} className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute right-[15%] top-[25%] w-96 h-96 rounded-full bg-rose-400/25 blur-3xl" />
        </div>

        {/* Main Content Grid */}
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Content Area: Headline line-by-line, story copy, nutrition, CTA */}
            <div className="lg:col-span-6 space-y-6">
              {/* Badge */}
              <div ref={lycheeHeaderRef} className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-rose-300 shadow-xs backdrop-blur-md">
                <span className="text-base">🍓</span>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#9f1239]">
                  LYCHEE STORY
                </span>
              </div>

              {/* Headline with clip-path bottom-to-top reveal */}
              <div className="overflow-hidden">
                <h3 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-black text-[#5c061d] tracking-tight leading-[1.08]">
                  <span ref={lycheeH2Line1Ref} className="block overflow-hidden pb-1">
                    A Deliciously Refreshing
                  </span>
                  <span ref={lycheeH2Line2Ref} className="block text-[#e11d48] overflow-hidden">
                    Taste You'll Love.
                  </span>
                </h3>
              </div>

              {/* Supporting Copy */}
              <p ref={lycheeCopyRef} className="text-sm sm:text-base text-[#881337]/90 font-medium leading-relaxed max-w-xl">
                Crisp, sweet, and imbued with delicate floral fragrance. Lychee offers an invigorating burst of thirst-quenching coolness that revitalizes both body and spirit. Bright, chilled, and exquisitely balanced.
              </p>

              {/* Nutrition Facts Card (Per 100ml) */}
              <div ref={lycheeNutriRef} className="rounded-3xl bg-white/95 p-5 border border-rose-200/80 shadow-md shadow-rose-950/5 backdrop-blur-md max-w-lg">
                <div className="flex items-center justify-between mb-3.5">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                    Nutrition Breakdown (Per 100ml)
                  </span>
                  <span className="text-[11px] font-bold text-rose-700 bg-rose-100/80 px-2.5 py-0.5 rounded-full">
                    Aseptic Pure Quality
                  </span>
                </div>
                <div className="grid grid-cols-3 divide-x divide-slate-100">
                  {/* Energy */}
                  <div className="flex items-center gap-2.5 pr-2">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#ffe4e6] text-[#e11d48] shadow-xs">
                      <Zap className="h-5 w-5 fill-[#e11d48]" />
                    </div>
                    <div>
                      <div className="text-sm sm:text-base font-black text-slate-900 leading-none">54 kcal</div>
                      <div className="text-[11px] font-semibold text-slate-500 mt-0.5">Energy</div>
                    </div>
                  </div>

                  {/* Carbs */}
                  <div className="flex items-center gap-2.5 px-2">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#ffe4e6] text-[#e11d48] shadow-xs">
                      <Wheat className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm sm:text-base font-black text-slate-900 leading-none">14 g</div>
                      <div className="text-[11px] font-semibold text-slate-500 mt-0.5">Carbs</div>
                    </div>
                  </div>

                  {/* Sugar */}
                  <div className="flex items-center gap-2.5 pl-2">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#ffe4e6] text-[#e11d48] shadow-xs">
                      <Box className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm sm:text-base font-black text-slate-900 leading-none">14 g</div>
                      <div className="text-[11px] font-semibold text-slate-500 mt-0.5">Sugar</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Magnetic Interactive CTA Button */}
              <div ref={lycheeCtaRef} className="pt-2">
                <button
                  onClick={() => go('where-to-buy')}
                  className="group relative inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#9f1239] via-[#881337] to-[#700c25] hover:from-[#be123c] hover:to-[#881337] text-white px-8 py-4 text-xs sm:text-sm font-black uppercase tracking-wider shadow-lg shadow-rose-950/25 transition-all duration-300"
                >
                  <span>Explore Lychee Story</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </button>
              </div>
            </div>

            {/* Right Column: 3D Product Display with Scroll-linked depth & pointer tilt */}
            <div className="lg:col-span-6 flex items-center justify-center relative min-h-[440px] sm:min-h-[520px]">
              <div ref={lycheePackWrapRef} className="relative flex items-center justify-center w-full">
                {/* Crisp 3D Pack Render: No white wash, sharp details */}
                <img
                  ref={lycheePackImgRef}
                  src="/images/pio-lychee.png"
                  alt="PIO Lychee 100ml Carton 3D pack"
                  className="relative z-10 max-h-[380px] sm:max-h-[460px] lg:max-h-[500px] w-auto object-contain drop-shadow-[0_25px_35px_rgba(159,18,57,0.35)] select-none will-change-transform"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
