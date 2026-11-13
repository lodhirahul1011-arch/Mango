import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Leaf, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function AssamMap({ className }: { className: string }) {
  return (
    <div className={`relative aspect-[768/976] overflow-visible ${className}`}>
      <img
        src="/images/india-network-map.svg"
        alt="Map of India with Assam marked"
        draggable={false}
        className="pio-india-shape absolute inset-0 h-full w-full select-none object-fill"
      />
      <div
        role="img"
        aria-label="PIO distribution point in Assam"
        className="pio-assam-marker absolute z-10 -translate-x-1/2 -translate-y-1/2"
        style={{ left: '88%', top: '31%' }}
      >
        <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#207d46] text-white shadow-[0_12px_22px_rgba(23,85,49,0.28)]">
          <MapPin className="h-5 w-5" />
        </span>
        <span className="mt-1 block rounded-xl bg-[#fffbe9]/95 px-3 py-1.5 text-center text-xs font-extrabold uppercase tracking-wide text-[#15241b] shadow-[0_10px_18px_rgba(14,54,31,0.12)]">
          Assam
        </span>
      </div>
    </div>
  );
}

export function InteractiveMap() {
  const mapStageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = mapStageRef.current;
    if (!stage || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const context = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: 'top 76%',
          once: true,
        },
      })
        .from('.pio-map-story', { autoAlpha: 0, y: 22, duration: 0.7, ease: 'power3.out' })
        .from('.pio-india-shape', { autoAlpha: 0, scale: 0.94, y: 12, duration: 0.8, ease: 'power3.out' }, 0.08)
        .from('.pio-assam-marker', { autoAlpha: 0, scale: 0.68, duration: 0.5, ease: 'back.out(1.8)' }, 0.55);
    }, stage);

    return () => context.revert();
  }, []);

  return (
    <section
      id="map"
      data-local-motion="true"
      className="relative flex min-h-[100svh] items-center overflow-hidden border-t border-emerald-900/10 bg-[#f7f5e8] py-8 text-[#0b2218] sm:py-10"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1480px] px-4 sm:px-8 lg:px-12">
        <div
          ref={mapStageRef}
          className="relative grid min-h-[min(70svh,720px)] w-full items-center gap-3 overflow-hidden rounded-[1.5rem] border border-[#dce6d7] bg-[linear-gradient(120deg,#fbfcf5_0%,#f1f6e9_100%)] p-6 shadow-[0_20px_55px_-34px_rgba(10,61,35,0.24)] sm:rounded-[2rem] sm:p-9 md:grid-cols-[0.9fr_1.1fr] md:gap-2 lg:px-12 lg:py-10"
        >
          <div className="pio-map-story relative z-20 min-w-0 py-2 md:py-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/48 px-3 py-2 text-[9px] sm:gap-3 sm:px-4 sm:text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#264336] shadow-sm backdrop-blur-md">
              <span className="flex h-7 w-7 shrink-0 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#e6f1dc] text-[#1f8a46]">
                <Leaf className="h-4 w-4" />
              </span>
              PROUDLY ROOTED IN ASSAM
            </div>

            <h2 className="mt-6 font-['Cormorant_Garamond',serif] text-[clamp(2.75rem,12vw,4.35rem)] font-bold leading-[0.88] tracking-tight text-[#0a1f16] md:text-[clamp(3rem,5.2vw,5.2rem)]">
              From Assam.<br />
              <span className="text-[#237849]">For Assam.</span>
            </h2>

            <p className="mt-5 max-w-[32rem] text-[15px] font-medium leading-relaxed text-[#526258] sm:text-base lg:text-lg">
              Born in Mangaldai, PIO is a homegrown beverage brand bringing people together through refreshing experiences. Proudly rooted in Assam, we're on a journey to reach every corner of the state.
            </p>
          </div>

          <AssamMap className="relative z-10 mx-auto w-[min(82%,340px)] sm:w-[min(76%,420px)] md:w-full md:max-w-[min(100%,560px,62svh)]" />
        </div>
      </div>
    </section>
  );
}
