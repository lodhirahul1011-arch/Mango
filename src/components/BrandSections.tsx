import { useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Droplets, Leaf, ShieldCheck, Sparkles, MapPin, School, Users, Plane, Check, Info, Zap, Wheat, Box } from 'lucide-react';

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
};

const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

/* ----------------------------------------------------
   1. OUR FLAVOURS SECTION
---------------------------------------------------- */
export function Flavours() {
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
  const headlineY = useTransform(scrollYProgress, [0, 0.36], [46, 0]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.24], [0.25, 1]);

  return (
    <section ref={sectionRef} id="flavours" className="relative min-h-[210vh] overflow-visible bg-white">
      <div className="sticky top-[74px] min-h-[calc(100vh-74px)] overflow-hidden border-y border-emerald-900/10 bg-[#fbfff8]">
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            style={{ scale: mangoScale }}
            className="absolute -left-28 top-10 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,#ffe36c_0%,rgba(255,227,108,0.62)_34%,transparent_68%)] blur-2xl"
          />
          <motion.div
            style={{ scale: lycheeScale }}
            className="absolute -right-24 bottom-0 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,#ffc3d2_0%,rgba(255,195,210,0.56)_35%,transparent_70%)] blur-2xl"
          />
          <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.72)_42%,rgba(239,255,244,0.78)_100%)]" />
          <div className="absolute left-[6%] top-[20%] h-20 w-28 rounded-[70%_30%_62%_38%] bg-[#f8c33b]/70 blur-[1px] animate-[floatSubtle_4.5s_ease-in-out_infinite]" />
          <div className="absolute right-[11%] top-[19%] h-20 w-20 rounded-full border-[10px] border-rose-200/80 animate-[spin_18s_linear_infinite]" />
          <div className="absolute bottom-[18%] left-[35%] h-12 w-7 rotate-45 rounded-[80%_0_80%_0] bg-[#0b8043]/70" />
          <div className="absolute right-[35%] top-[13%] h-3 w-3 rounded-full bg-[#f97316]" />
          <div className="absolute left-[48%] bottom-[16%] h-4 w-4 rounded-full bg-[#fb7185]" />
        </div>

        <div className="relative mx-auto grid min-h-[calc(100vh-74px)] max-w-7xl items-center gap-8 px-5 py-10 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:py-14">
          <motion.div style={{ y: headlineY, opacity: headlineOpacity }} className="z-20 max-w-[500px] lg:col-span-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-white/80 px-4 py-2 text-[11px] font-black uppercase tracking-[0.28em] text-[#0b8043] shadow-[0_12px_34px_rgba(7,88,47,0.08)] backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Our Flavours
            </span>
            <h2 className="mt-5 max-w-[470px] font-['Space_Grotesk',sans-serif] text-[clamp(3rem,4.4vw,5.35rem)] font-black uppercase leading-[0.86] tracking-normal text-[#082416]">
              Two flavours,
              <span className="block text-[#07582f]">one juicy stage.</span>
            </h2>
            <p className="mt-6 max-w-md text-base font-semibold leading-7 text-[#385b45] sm:text-lg">
              Mango rolls in warm and golden. Lychee answers with a bright pink splash. Scroll through the flavour switch.
            </p>
            <div className="mt-7 flex items-center gap-3">
              <span className="h-2 w-16 overflow-hidden rounded-full bg-emerald-100">
                <motion.span style={{ scaleX: scrollYProgress }} className="block h-full origin-left rounded-full bg-[#07582f]" />
              </span>
              <span className="text-[11px] font-black uppercase tracking-[0.22em] text-[#07582f]">Scroll</span>
            </div>
          </motion.div>

          <div className="relative z-10 min-h-[560px] lg:col-span-7 lg:min-h-[650px]">
            <motion.article
              style={{ y: mangoY, rotate: mangoRotate, scale: mangoScale }}
              className="group absolute left-0 top-8 min-h-[450px] w-[88%] overflow-hidden rounded-[28px] border border-amber-300/80 bg-[linear-gradient(135deg,rgba(255,251,235,0.97),rgba(255,236,157,0.92))] p-6 shadow-[0_34px_90px_rgba(146,64,14,0.18)] backdrop-blur sm:p-8 lg:left-[4%] lg:w-[54%] xl:w-[52%]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(255,255,255,0.9),transparent_24%),radial-gradient(circle_at_80%_80%,rgba(245,158,11,0.2),transparent_34%)]" />
              <div className="relative z-10 flex min-h-[400px] flex-col justify-between">
                <div className="max-w-[270px] sm:max-w-[300px] lg:max-w-[260px] xl:max-w-[300px]">
                  <span className="rounded-full bg-white/70 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-[#92400e]">01 / Tropical Classic</span>
                  <h3 className="mt-4 font-['Space_Grotesk',sans-serif] text-5xl font-black uppercase leading-none text-[#78350f] sm:text-7xl lg:text-6xl xl:text-7xl">Mango</h3>
                  <p className="mt-3 text-lg font-black text-[#92400e]">Tropical sweetness in every sip.</p>
                  <p className="mt-3 text-sm font-semibold leading-6 text-[#78350f]/75">Rich, sun-ripened Alphonso-style puree blended for silky, juicy perfection.</p>
                  <div className="mt-5 flex flex-wrap gap-2 text-xs font-black text-amber-900">
                    <span className="rounded-lg border border-amber-300/70 bg-white/70 px-2.5 py-1">160ml Pack</span>
                    <span className="rounded-lg border border-amber-300/70 bg-white/70 px-2.5 py-1">50 kcal</span>
                    <span className="rounded-lg border border-amber-300/70 bg-white/70 px-2.5 py-1">Real Pulp</span>
                  </div>
                </div>

                <button
                  onClick={() => go('mango-story')}
                  className="relative z-20 inline-flex w-fit items-center gap-2 rounded-full bg-[#92400e] px-6 py-3 text-xs font-extrabold uppercase tracking-wider text-white shadow-[0_16px_32px_rgba(146,64,14,0.24)] transition-all hover:-translate-y-1 hover:bg-[#78350f]"
                >
                  Explore Mango <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.article>

            <motion.article
              style={{ y: lycheeY, rotate: lycheeRotate, scale: lycheeScale }}
              className="group absolute bottom-8 right-0 min-h-[450px] w-[88%] overflow-hidden rounded-[28px] border border-rose-300/80 bg-[linear-gradient(135deg,rgba(255,247,249,0.97),rgba(255,214,226,0.92))] p-6 shadow-[0_34px_90px_rgba(157,23,77,0.18)] backdrop-blur sm:p-8 lg:right-[2%] lg:w-[54%] xl:w-[52%]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,rgba(255,255,255,0.92),transparent_24%),radial-gradient(circle_at_78%_80%,rgba(225,29,72,0.18),transparent_34%)]" />
              <div className="relative z-10 flex min-h-[400px] flex-col justify-between">
                <div className="max-w-[270px] sm:max-w-[300px] lg:max-w-[260px] xl:max-w-[300px]">
                  <span className="rounded-full bg-white/70 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-[#9d174d]">02 / Exotic Refresh</span>
                  <h3 className="mt-4 font-['Space_Grotesk',sans-serif] text-5xl font-black uppercase leading-none text-[#831843] sm:text-7xl lg:text-6xl xl:text-7xl">Lychee</h3>
                  <p className="mt-3 text-lg font-black text-[#9d174d]">Fruity, fresh and full of fun.</p>
                  <p className="mt-3 text-sm font-semibold leading-6 text-[#831843]/75">Delicate floral notes and crisp, thirst-quenching juicy sweetness.</p>
                  <div className="mt-5 flex flex-wrap gap-2 text-xs font-black text-rose-900">
                    <span className="rounded-lg border border-rose-300/70 bg-white/70 px-2.5 py-1">160ml Pack</span>
                    <span className="rounded-lg border border-rose-300/70 bg-white/70 px-2.5 py-1">54 kcal</span>
                    <span className="rounded-lg border border-rose-300/70 bg-white/70 px-2.5 py-1">Pure Floral Taste</span>
                  </div>
                </div>

                <button
                  onClick={() => go('lychee-story')}
                  className="relative z-20 inline-flex w-fit items-center gap-2 rounded-full bg-[#9d174d] px-6 py-3 text-xs font-extrabold uppercase tracking-wider text-white shadow-[0_16px_32px_rgba(157,23,77,0.24)] transition-all hover:-translate-y-1 hover:bg-[#831843]"
                >
                  Explore Lychee <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.article>
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
