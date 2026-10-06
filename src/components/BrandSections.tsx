import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Droplets, Leaf, ShieldCheck, Sparkles, MapPin, School, Users, Plane, Check, Info } from 'lucide-react';

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
                  <span className="px-2.5 py-1 rounded-lg bg-white/70 border border-amber-300/60">100ml Pack</span>
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

            {/* Standalone Mango 3D Pack on right */}
            <div className="absolute right-0 bottom-0 top-6 w-[50%] sm:w-[52%] flex items-end justify-center pointer-events-none">
              <div className="relative h-full w-full flex items-end justify-center">
                <img 
                  src="/images/pio-mango.png" 
                  alt="PIO Mango single pack" 
                  className="max-h-[92%] w-auto object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-2"
                />
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
                  <span className="px-2.5 py-1 rounded-lg bg-white/70 border border-rose-300/60">100ml Pack</span>
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

            {/* Standalone Lychee 3D Pack on right */}
            <div className="absolute right-0 bottom-0 top-6 w-[50%] sm:w-[52%] flex items-end justify-center pointer-events-none">
              <div className="relative h-full w-full flex items-end justify-center">
                <img 
                  src="/images/pio-lychee.png" 
                  alt="PIO Lychee single pack" 
                  className="max-h-[92%] w-auto object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-2"
                />
              </div>
            </div>
          </motion.article>

        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------
   2. WHY PIO? SECTION (Lush Forest Green Banner)
---------------------------------------------------- */
const whyPioBadges = [
  { 
    number: '₹10',
    title: 'Just ₹10', 
    desc: 'Pocket-friendly price point for everyday pocket money, school recesses, and afternoon refreshment.' 
  },
  { 
    number: '100%',
    title: 'Made with Real Fruit', 
    desc: 'Pure fruit pulp blend delivering authentic taste, natural aroma, and rich fruit mouthfeel.' 
  },
  { 
    number: '0%',
    title: 'No Added Preservatives', 
    desc: 'Protected naturally through state-of-the-art aseptic multilayer carton processing.' 
  },
  { 
    number: '★',
    title: 'Refreshing Taste', 
    desc: 'Perfect balance of vibrant fruit tanginess and gentle sweetness that quenches thirst instantly.' 
  },
];

export function WhyPIO() {
  return (
    <section id="why-pio" className="relative overflow-hidden bg-[#07582f] py-20 lg:py-28 text-white">
      {/* Decorative radial glows */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(252,181,44,.18),transparent_35%),radial-gradient(circle_at_10%_90%,rgba(255,255,255,.08),transparent_30%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div {...reveal} className="grid gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-4">
            <span className="inline-block text-xs font-black uppercase tracking-[0.25em] text-[#fde047] bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15">
              Why PIO?
            </span>
            <h2 className="text-3xl sm:text-5xl font-black leading-tight tracking-tight text-white">
              More than just a drink.
            </h2>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed font-medium">
              It’s a refreshing experience for everyone. Born in Assam, crafted with food-grade purity, and designed to bring a big smile in every small sip.
            </p>

            <div className="pt-2">
              <button 
                onClick={() => go('inside')}
                className="inline-flex items-center gap-2 rounded-full bg-[#fde047] hover:bg-[#facc15] text-[#07582f] px-6 py-3 text-xs font-black uppercase tracking-wider shadow-md hover:-translate-y-0.5 transition-all"
              >
                See What's Inside <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: 4 Circular Badge Cards */}
          <div className="lg:col-span-7 grid gap-4 sm:grid-cols-2">
            {whyPioBadges.map((badge, idx) => (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-md hover:bg-white/15 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#07582f] font-black text-lg shadow-xs">
                    {badge.number}
                  </div>
                  <h3 className="text-lg font-black text-white">{badge.title}</h3>
                </div>
                <p className="mt-3 text-sm text-white/75 leading-relaxed font-medium">
                  {badge.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------
   3. FLAVOR STORIES (Mango Story & Lychee Story)
---------------------------------------------------- */
export function FlavorStories() {
  const [selectedNutrition, setSelectedNutrition] = useState<'mango' | 'lychee' | null>(null);

  return (
    <section id="stories" className="py-20 lg:py-28 bg-[#ffffff]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        
        <motion.div {...reveal} className="mb-14 text-center max-w-2xl mx-auto">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-[#0b8043] bg-[#eef8f1] px-4 py-1.5 rounded-full">
            The Flavor Stories
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-black text-[#083b20] tracking-tight">
            Crafted for pure delight.
          </h2>
          <p className="mt-3 text-base text-[#3b5e48]">
            Explore each unique recipe, tasting profile and nutritional breakdown.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2">
          
          {/* THE MANGO STORY CARD */}
          <motion.div 
            id="mango-story"
            {...reveal}
            className="rounded-[36px] border border-amber-200 bg-gradient-to-br from-[#fffbeb] via-[#fef3c7] to-[#fde68a] p-8 sm:p-12 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="relative z-10 max-w-md">
              <span className="text-xs font-black uppercase tracking-widest text-amber-900/80 bg-white/70 px-3 py-1 rounded-full">
                The Mango Story
              </span>
              <h3 className="mt-4 text-3xl sm:text-4xl font-black text-amber-950 tracking-tight">
                A burst of tropical freshness in every sip.
              </h3>
              <p className="mt-4 text-sm sm:text-base text-amber-900/85 leading-relaxed font-medium">
                Picked at peak harvest, our sun-kissed mangoes bring that authentic, velvety orchard thickness everyone loves. Smooth, rich, and deeply satisfying.
              </p>

              {/* Nutrition Facts Highlight */}
              <div className="mt-6 rounded-2xl bg-white/85 p-4 border border-amber-300/60 backdrop-blur-xs">
                <div className="flex items-center justify-between text-xs font-black text-amber-950 mb-2 border-b border-amber-200 pb-1.5">
                  <span>Nutrition Facts (Per 100ml)</span>
                  <span className="text-amber-700">₹10 Pack</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div>
                    <div className="font-extrabold text-amber-900">50 kcal</div>
                    <div className="text-[10px] text-amber-700">Energy</div>
                  </div>
                  <div>
                    <div className="font-extrabold text-amber-900">12 g</div>
                    <div className="text-[10px] text-amber-700">Carbs</div>
                  </div>
                  <div>
                    <div className="font-extrabold text-amber-900">10 g</div>
                    <div className="text-[10px] text-amber-700">Sugar</div>
                  </div>
                  <div>
                    <div className="font-extrabold text-emerald-800">9 Mo</div>
                    <div className="text-[10px] text-emerald-700">Shelf Life</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-3">
                <button 
                  onClick={() => go('where-to-buy')}
                  className="rounded-full bg-amber-900 hover:bg-amber-950 text-white px-6 py-3 text-xs font-black uppercase tracking-wider shadow-sm transition-all"
                >
                  Buy Mango Now
                </button>
              </div>
            </div>

            {/* Mango Pack Graphic */}
            <div className="mt-8 sm:mt-0 sm:absolute sm:right-4 sm:bottom-6 sm:top-auto flex justify-center">
              <img 
                src="/images/pio-mango.png" 
                alt="PIO Mango Pack" 
                className="h-56 sm:h-72 w-auto object-contain drop-shadow-xl"
              />
            </div>
          </motion.div>

          {/* THE LYCHEE STORY CARD */}
          <motion.div 
            id="lychee-story"
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.1 }}
            className="rounded-[36px] border border-rose-200 bg-gradient-to-br from-[#fff1f2] via-[#ffe4e6] to-[#fecdd3] p-8 sm:p-12 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="relative z-10 max-w-md">
              <span className="text-xs font-black uppercase tracking-widest text-rose-900/80 bg-white/70 px-3 py-1 rounded-full">
                The Lychee Story
              </span>
              <h3 className="mt-4 text-3xl sm:text-4xl font-black text-rose-950 tracking-tight">
                A deliciously refreshing taste you'll love.
              </h3>
              <p className="mt-4 text-sm sm:text-base text-rose-900/85 leading-relaxed font-medium">
                Crisp, sweet, and imbued with delicate floral fragrance. Lychee offers a crisp burst of thirst-quenching cool that revitalizes body and spirit.
              </p>

              {/* Nutrition Facts Highlight */}
              <div className="mt-6 rounded-2xl bg-white/85 p-4 border border-rose-300/60 backdrop-blur-xs">
                <div className="flex items-center justify-between text-xs font-black text-rose-950 mb-2 border-b border-rose-200 pb-1.5">
                  <span>Nutrition Facts (Per 100ml)</span>
                  <span className="text-rose-700">₹10 Pack</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div>
                    <div className="font-extrabold text-rose-900">54 kcal</div>
                    <div className="text-[10px] text-rose-700">Energy</div>
                  </div>
                  <div>
                    <div className="font-extrabold text-rose-900">14 g</div>
                    <div className="text-[10px] text-rose-700">Carbs</div>
                  </div>
                  <div>
                    <div className="font-extrabold text-rose-900">14 g</div>
                    <div className="text-[10px] text-rose-700">Sugar</div>
                  </div>
                  <div>
                    <div className="font-extrabold text-emerald-800">6 Mo</div>
                    <div className="text-[10px] text-emerald-700">Shelf Life</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-3">
                <button 
                  onClick={() => go('where-to-buy')}
                  className="rounded-full bg-rose-900 hover:bg-rose-950 text-white px-6 py-3 text-xs font-black uppercase tracking-wider shadow-sm transition-all"
                >
                  Buy Lychee Now
                </button>
              </div>
            </div>

            {/* Lychee Pack Graphic */}
            <div className="mt-8 sm:mt-0 sm:absolute sm:right-4 sm:bottom-6 sm:top-auto flex justify-center">
              <img 
                src="/images/pio-lychee.png" 
                alt="PIO Lychee Pack" 
                className="h-56 sm:h-72 w-auto object-contain drop-shadow-xl"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

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
                100ml Convenient Tetra Pack
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
   5. WHAT'S INSIDE? (INGREDIENTS)
---------------------------------------------------- */
const ingredientsList = [
  {
    icon: Sparkles,
    name: 'Real Fruit Pulp',
    detail: 'Authentic Mango & Lychee fruit puree for true natural flavour and goodness.',
    tag: 'Fruit-First'
  },
  {
    icon: Droplets,
    name: 'Purified Water',
    detail: 'Multi-stage RO filtered pure water ensuring crisp, safe thirst refreshment.',
    tag: 'Ultra-Pure'
  },
  {
    icon: Leaf,
    name: 'Natural Flavours',
    detail: 'Nature-identical aromatics that capture the essence of fresh fruit blossoms.',
    tag: 'Wholesome'
  },
  {
    icon: ShieldCheck,
    name: 'Zero Preservatives',
    detail: 'Multi-barrier aseptic packaging protects freshness without added preservatives.',
    tag: 'Clean Label'
  },
];

export function Ingredients() {
  return (
    <section id="inside" className="py-20 lg:py-28 bg-[#ffffff]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        
        <motion.div {...reveal} className="mb-14 text-center max-w-2xl mx-auto">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-[#0b8043] bg-[#eef8f1] px-4 py-1.5 rounded-full">
            What's Inside?
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-black text-[#083b20] tracking-tight">
            Simple ingredients. Real goodness.
          </h2>
          <p className="mt-3 text-base text-[#3b5e48]">
            Transparency in every sip. Here is exactly what goes into every pack of PIO.
          </p>
        </motion.div>

        {/* Reference Banner Visual */}
        <motion.div {...reveal} className="mb-10 overflow-hidden rounded-[28px] border border-emerald-900/10 shadow-sm">
          <img 
            src="/images/whats-inside-banner.jpg" 
            alt="What's Inside Ingredients Illustration" 
            className="w-full h-auto object-cover max-h-72"
          />
        </motion.div>

        {/* 4 Feature Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ingredientsList.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="rounded-3xl border border-emerald-900/10 bg-[#f8fbf9] p-6 text-center hover:bg-white hover:shadow-md transition-all duration-300"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8f6ed] text-[#07582f] shadow-2xs">
                <item.icon className="h-7 w-7" />
              </div>
              <span className="mt-4 inline-block text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100/60 px-2.5 py-0.5 rounded-md">
                {item.tag}
              </span>
              <h3 className="mt-2 text-lg font-black text-[#083b20]">
                {item.name}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#456852] leading-relaxed">
                {item.detail}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

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
   7. WHERE TO BUY SECTION
---------------------------------------------------- */
export function WhereToBuy() {
  const [pincode, setPincode] = useState('');
  const [searched, setSearched] = useState(false);

  return (
    <section id="where-to-buy" className="py-20 lg:py-28 bg-[#ffffff]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        
        <div className="grid items-center gap-10 lg:grid-cols-12 rounded-[36px] border border-emerald-900/10 bg-gradient-to-br from-[#f8fdf9] via-[#edf7f0] to-[#e6f4ea] p-8 sm:p-12 lg:p-16 overflow-hidden relative shadow-lg">
          
          <div className="lg:col-span-7 space-y-5 relative z-10">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#07582f] bg-white px-3.5 py-1.5 rounded-full shadow-2xs">
              Where to Buy
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#083b20] tracking-tight">
              Available at your nearby stores.
            </h2>
            <p className="text-base sm:text-lg text-[#30523d] leading-relaxed font-medium">
              Found across local grocery stores, modern retail shops, and school canteens across Assam and Northeast India — and expanding rapidly!
            </p>

            {/* Quick Locator Box */}
            <div className="max-w-md pt-2">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={pincode}
                  onChange={(e) => { setPincode(e.target.value); setSearched(false); }}
                  placeholder="Enter your Pincode or City (e.g. 784125, Guwahati)"
                  className="flex-1 rounded-full border border-emerald-900/20 bg-white px-5 py-3 text-sm font-semibold text-emerald-950 placeholder:text-slate-400 focus:outline-none focus:border-[#07582f]"
                />
                <button 
                  onClick={() => setSearched(true)}
                  className="rounded-full bg-[#07582f] hover:bg-[#0a6d3b] text-white px-6 py-3 text-xs font-black uppercase tracking-wider shadow-sm transition-all shrink-0"
                >
                  Locate
                </button>
              </div>

              {searched && (
                <div className="mt-3 p-3.5 rounded-2xl bg-white border border-emerald-900/10 text-xs text-[#07582f] font-bold shadow-2xs">
                  ✓ Available at 500+ verified retail points in your area. Look for the green PIO counter rack!
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={() => go('partner')}
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#07582f] hover:underline"
              >
                Become a Retailer / Distributor <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex justify-center">
            <img 
              src="/images/where-to-buy-card.jpg" 
              alt="Where to Buy Store Kiosk Illustration" 
              className="w-full max-w-sm rounded-3xl object-cover shadow-md border border-white"
            />
          </div>

        </div>

      </div>
    </section>
  );
}
