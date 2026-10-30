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
      className="relative overflow-hidden border-t border-emerald-900/10 bg-[#f7f3df] py-10 text-[#0b2218] sm:py-14 lg:py-16"
    >
      <div className="pointer-events-none absolute -left-16 top-0 h-64 w-64 rounded-full bg-[#2f6d20]/25 blur-[80px]" />
      <div className="pointer-events-none absolute -right-16 top-10 h-80 w-80 rounded-full bg-[#f9b51d]/25 blur-[90px]" />

      <div className="relative z-10 mx-auto max-w-[1560px] px-4 sm:px-6 lg:px-8">
        <div
          ref={mapStageRef}
          className="relative min-h-0 overflow-hidden rounded-[2rem] border border-white/70 bg-[radial-gradient(circle_at_68%_28%,rgba(255,214,74,0.26),transparent_19%),radial-gradient(circle_at_60%_62%,rgba(25,122,70,0.22),transparent_32%),linear-gradient(120deg,#faf9eb_0%,#eef6e5_54%,#fff3c7_100%)] pb-6 shadow-[0_32px_90px_-34px_rgba(10,61,35,0.45)] md:min-h-[760px] md:pb-0 lg:min-h-[720px]"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,transparent_58%,rgba(255,255,255,0.66)_100%)]" />
          <div className="pointer-events-none absolute -left-10 -top-10 h-44 w-44 rounded-full bg-[#1d5c23]/35 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 left-[42%] h-44 w-[44rem] rounded-full bg-[#125f37]/18 blur-3xl" />

          <div className="pio-map-story relative z-20 max-w-none p-5 sm:p-7 md:absolute md:left-10 md:top-20 md:max-w-[33rem] md:p-0 lg:left-16 lg:top-28">
            <div className="inline-flex items-center gap-3 rounded-full bg-white/48 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#264336] shadow-sm backdrop-blur-md">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e6f1dc] text-[#1f8a46]">
                <Leaf className="h-4 w-4" />
              </span>
              PIO in Assam
            </div>

            <h2 className="mt-6 font-['Cormorant_Garamond',serif] text-[clamp(3.05rem,15vw,4.35rem)] font-bold leading-[0.88] tracking-tight text-[#0a1f16] md:text-[clamp(3.1rem,5.7vw,5.6rem)]">
              From Assam,<br />
              <span className="text-[#237849]">For Assam.</span>
            </h2>

            <p className="mt-5 max-w-[29rem] text-base font-semibold leading-relaxed text-[#526258] sm:text-lg">
              Born in Mangaldai, PIO brings refreshing mango and lychee drinks to retailers and communities across Assam.
            </p>
          </div>

          <AssamMap className="relative z-10 mx-auto mt-3 w-[min(76%,360px)] md:absolute md:left-[54%] md:top-[2%] md:mt-0 md:h-[96%] md:w-auto" />
        </div>
      </div>
    </section>
  );
}
