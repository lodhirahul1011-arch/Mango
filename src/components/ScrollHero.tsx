import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';

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
      const img = imagesRef.current[index];
      if (!img || !loadedRef.current.has(index)) return;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
        const w = img.naturalWidth * scale;
        const h = img.naturalHeight * scale;
        const x = (canvas.width - w) / 2;
        const y = (canvas.height - h) / 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
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
      const radius = innerWidth < 768 ? 10 : 20;
      for (let i = Math.max(0, center - radius); i <= Math.min(FRAME_COUNT - 1, center + radius); i++) {
        load(i);
      }
    };

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.round(innerWidth * dpr);
      canvas.height = Math.round(innerHeight * dpr);
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
      draw(frameRef.current);
    };

    // Initial priority frames
    [0, 15, 30, 60, 90, 120, 150, 180, 210, 239].forEach((i) => load(i, i === 0));
    preload(0);
    resize();

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const trigger = ScrollTrigger.create({
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

      gsap.fromTo('.scroll-hero-copy', 
        { y: 25, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );
      
      gsap.to('.scroll-hero-copy', {
        y: -60,
        opacity: 0.1,
        scrollTrigger: {
          trigger: section,
          start: '20% top',
          end: '50% top',
          scrub: true,
        },
      });

      return () => trigger.kill();
    });

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      mm.revert();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const go = () => document.getElementById('product-showcase')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section ref={sectionRef} id="home" className="relative h-[320vh] bg-white">
      <div className="sticky top-0 h-screen overflow-hidden bg-white">
        {/* Fullscreen scrub canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full bg-white object-cover"
          aria-label="PIO 3D scrolling animation"
        />

        {/* Soft gradient mask for text readability */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent sm:w-2/3" />

        {/* Overlay Copy */}
        <div className="scroll-hero-copy relative z-10 mx-auto flex h-full max-w-7xl items-center px-5 sm:px-8">
          <div className="max-w-xl space-y-5 rounded-3xl bg-white/80 p-6 sm:p-10 backdrop-blur-md border border-emerald-900/10 shadow-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eef8f1] border border-emerald-900/10 text-[#07582f] text-xs font-black tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>3D Interactive Scroll Experience</span>
            </div>

            <div className="space-y-1">
              <span className="font-serif italic text-3xl sm:text-4xl text-[#0b8043] font-bold block">
                Small Sip
              </span>
              <h1 className="text-4xl sm:text-6xl font-black text-[#083b20] tracking-tight leading-[0.95]">
                Big Refreshment
              </h1>
            </div>

            <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed">
              Real Fruit. Real Fun. Just ₹10. Scroll down to experience the 3D pack journey and pure fruit explosion.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={go}
                className="inline-flex items-center gap-2 rounded-full bg-[#07582f] hover:bg-[#0a6d3b] text-white px-7 py-3.5 text-xs font-black uppercase tracking-wider shadow-md hover:-translate-y-0.5 transition-all"
              >
                <span>Explore Showcase</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Scroll Cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none z-20">
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-950 bg-white/90 px-3 py-1 rounded-full border border-emerald-900/10 shadow-xs">
            Scroll To Animate 3D
          </span>
          <div className="w-5 h-8 rounded-full border-2 border-emerald-800/40 flex items-start justify-center p-1 bg-white/60">
            <div className="w-1.5 h-2 rounded-full bg-emerald-800 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
