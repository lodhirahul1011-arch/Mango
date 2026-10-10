import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { MapPin, Minus, Plus, ShieldCheck } from 'lucide-react';

const FAQ_ITEMS = [
  {
    question: 'How should Pio be stored?',
    answer: (
      <>
        <p>
          Pio is an aseptically processed, shelf-stable beverage, so an unopened pack can be stored at room temperature in a cool, dry place away from direct sunlight and heat.
        </p>
        <p>
          There is no need to refrigerate an unopened pack. Once opened, refrigerate and consume promptly.
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-[10px] font-black uppercase tracking-[0.15em] text-[#073D2C]">
          <span className="rounded-full border border-[#0a3d2d]/15 bg-[#f5f8f1] px-2.5 py-1.5">Unopened: Store at room temperature</span>
          <span className="rounded-full border border-[#0a3d2d]/15 bg-[#f5f8f1] px-2.5 py-1.5">Opened: Refrigerate &amp; consume promptly</span>
        </div>
      </>
    ),
  },
  {
    question: 'What is the shelf life?',
    answer: (
      <>
        <p>
          Pio has an extended shelf life because it is aseptically processed and packed in a multilayer Tetra Pak carton that helps protect the beverage from light, oxygen and microbial contamination.
        </p>
        <p>
          Consumers should always follow the best-before date printed on the pack.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-[#f5a623]/40 bg-[#fff7e9] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-[#7c4b00]">Mango 9 months</span>
          <span className="rounded-full border border-[#eb5574]/40 bg-[#fff2f5] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-[#8a2149]">Lychee 6 months</span>
        </div>
      </>
    ),
  },
  {
    question: 'Does Pio contain preservatives?',
    answer: (
      <>
        <p>
          No. Pio does not require added preservatives to achieve its shelf stability.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#0a3d2d]/15 bg-[#eff7f1] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-[#073D2C]">
          <ShieldCheck className="h-3.5 w-3.5 text-[#167A4A]" />
          <span>No added preservatives</span>
        </div>
      </>
    ),
  },
  {
    question: 'Is Pio made in Assam?',
    answer: (
      <>
        <p>
          Yes. Pio is proudly made in Assam. It is developed and manufactured in Assam by the SRD Group, building on generations of experience in food manufacturing.
        </p>
        <div className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#073D2C]">
          <MapPin className="h-3.5 w-3.5 text-[#167A4A]" />
          <span>Assam, India</span>
        </div>
      </>
    ),
  },
];

export function ConsumerFaqs() {
  const [openIndex, setOpenIndex] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.faq-eyebrow',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.faq-title',
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.faq-item',
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.12 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleFaq = (index: number) => {
    setOpenIndex((current) => (current === index ? -1 : index));
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative overflow-hidden bg-[#F8F6EF] py-[140px] text-[#10352B]"
    >
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#167A4A]/8 blur-3xl" />
        <div className="absolute right-10 top-24 h-80 w-80 rounded-full bg-[#F5A623]/10 blur-3xl" />
        <div className="absolute bottom-8 left-1/3 h-64 w-64 rounded-full bg-[#EB5574]/8 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[38%_62%] lg:gap-16">
          <div className="lg:sticky lg:top-[140px]">
            <div className="faq-eyebrow eyebrow text-[#167A4A]">Consumer FAQ’s</div>
            <h2 className="faq-title mt-5 max-w-[420px] text-[clamp(3.1rem,6vw,6.8rem)] leading-[0.82] text-[#073D2C]" style={{ fontFamily: 'var(--font-display)' }}>
              Everything You
              <br />
              Need to Know.
            </h2>
            <p className="mt-5 max-w-md text-base leading-[1.65] text-[#5d6d65]">
              Simple answers about storage, shelf life, preservatives and where PIO is made.
            </p>

            <div className="relative mt-12 h-[290px] overflow-hidden rounded-[2rem] border border-[#0a3d2d]/8 bg-[radial-gradient(circle_at_30%_30%,rgba(22,122,74,0.10),transparent_40%),linear-gradient(180deg,rgba(255,255,255,0.38),rgba(255,255,255,0.08))]">
              <div className="absolute left-10 top-14 h-36 w-36 rounded-full border border-[#0a3d2d]/10 bg-[#dff5ea]/20 blur-[2px]" />
              <div className="absolute left-20 top-16 h-14 w-14 rounded-full bg-[#d5f4e7]/50 blur-sm" />
              <div className="absolute right-10 top-14 h-32 w-32 rounded-full border border-[#eb5574]/10 bg-[#fff2f5]/30" />

              <div className="absolute left-16 top-20 h-24 w-12 rotate-[18deg] rounded-[40%_40%_50%_50%] border border-[#0a3d2d]/15 bg-[#e6f4eb]/30" />
              <div className="absolute right-24 top-20 h-24 w-16 rotate-[-18deg] rounded-[38%_38%_58%_52%] border border-[#0a3d2d]/15 bg-[#ecf9f0]/20" />

              <div className="absolute left-1/2 top-16 h-16 w-16 -translate-x-1/2 rounded-full border border-[#0a3d2d]/10 bg-[#f4f7ef]/60 blur-[1px]" />
              <div className="absolute left-1/2 top-24 h-28 w-24 -translate-x-1/2 rounded-[24%_24%_30%_30%] border border-[#0a3d2d]/8 bg-transparent" style={{ boxShadow: 'inset 0 0 0 1px rgba(10,61,45,0.08)' }} />

              <div className="absolute bottom-8 left-8 flex flex-wrap gap-2">
                {['ASEPTICALLY PACKED', 'MADE IN ASSAM', 'NO ADDED PRESERVATIVES'].map((label) => (
                  <span
                    key={label}
                    className="rounded-full border border-[#0a3d2d]/10 bg-white/55 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-[#073D2C] backdrop-blur-sm"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="faq-list">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;
              const answerId = `faq-panel-${index}`;

              return (
                <div
                  key={item.question}
                  className={`faq-item border-t border-[#0a3d2d]/12 py-0 transition-colors duration-300 ${
                    isOpen ? 'bg-[#f2f7f1]' : 'hover:bg-[#0a3d2d]/[0.02]'
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => toggleFaq(index)}
                    className="flex w-full items-center gap-4 py-[26px] text-left transition-all duration-300 hover:translate-x-[4px]"
                  >
                    <span className="w-10 text-[11px] font-black uppercase tracking-[0.2em] text-[#6a776e]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1 text-[clamp(1.25rem,2vw,1.8rem)] font-medium leading-[1.2] text-[#073D2C] transition-colors duration-300">
                      {item.question}
                    </span>
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full border border-[#0a3d2d]/10 bg-white/55 text-[#073D2C] transition-transform duration-300 ${
                        isOpen ? 'rotate-45' : 'rotate-0'
                      }`}
                    >
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>

                  <div
                    id={answerId}
                    className={`grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div
                        className={`pb-7 pl-14 pr-4 text-[15px] leading-[1.7] text-[#425a50] transition-all duration-500 ${
                          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        }`}
                      >
                        <div className="max-w-[780px] space-y-4">{item.answer}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
