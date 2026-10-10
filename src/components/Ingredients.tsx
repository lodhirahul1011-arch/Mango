import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import { 
  Sparkles, 
  Droplets, 
  Leaf, 
  ShieldCheck, 
  Waves, 
  CheckCircle2, 
  Zap, 
  Scan, 
  Volume2, 
  Flame, 
  RotateCw,
  Heart,
  Smile,
  ArrowRight
} from 'lucide-react';
import { fizzAudio } from '@/utils/audio';

// Ingredient details data
const INGREDIENTS_DATA = {
  mango: {
    id: 'mango',
    name: 'Ratnagiri Alphonso Mango',
    source: 'Western Ghats, Maharashtra',
    highlight: 'Sun-ripened orchard pulp harvested at peak sweetness',
    color: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.25)',
    bgLight: 'from-amber-500/10 via-yellow-100/30 to-emerald-50/20',
    accentText: 'text-amber-800',
    tagBg: 'bg-amber-100 text-amber-900 border-amber-300',
    viscosity: 82,
    purity: 99.4,
    calories: '68 kcal / 100ml',
    packImage: '/images/pio-mango.png',
    traits: [
      { label: 'Real Pulp Content', value: '100% Genuine' },
      { label: 'Artificial Colors', value: '0.00% Zero' },
      { label: 'Sourcing Harvest', value: 'Single Origin' },
      { label: 'Aroma Profile', value: 'Tropical Velvet' },
    ]
  },
  lychee: {
    id: 'lychee',
    name: 'Himalayan Floral Lychee',
    source: 'Dehradun Valley Orchards',
    highlight: 'Translucent aromatic nectar with crisp floral notes',
    color: '#f43f5e',
    glowColor: 'rgba(244, 63, 94, 0.25)',
    bgLight: 'from-rose-500/10 via-pink-100/30 to-emerald-50/20',
    accentText: 'text-rose-800',
    tagBg: 'bg-rose-100 text-rose-900 border-rose-300',
    viscosity: 74,
    purity: 99.8,
    calories: '62 kcal / 100ml',
    packImage: '/images/pio-lychee.png',
    traits: [
      { label: 'Natural Lychee Extract', value: '100% Genuine' },
      { label: 'Artificial Flavors', value: '0.00% Zero' },
      { label: 'Sourcing Harvest', value: 'Valley Fresh' },
      { label: 'Aroma Profile', value: 'Crisp Blossom' },
    ]
  }
};

const PURITY_PILLARS = [
  {
    icon: Sparkles,
    title: '100% Real Fruit First',
    subtitle: 'No Artificial Fillers',
    desc: 'Pure fruit pulp and extracts delivered straight to aseptic blend tanks without watery dilutions.',
    color: 'from-amber-500 to-yellow-400',
    badge: 'Real Fruit',
    accent: '#f59e0b'
  },
  {
    icon: Droplets,
    title: 'Double RO Spring Water',
    subtitle: '7-Stage Micro-Purification',
    desc: 'Crystal-clear water filtered through 0.0001 micron membranes ensuring absolute thirst hydration.',
    color: 'from-cyan-500 to-blue-400',
    badge: 'Pure H2O',
    accent: '#06b6d4'
  },
  {
    icon: Leaf,
    title: 'Botanical Plant Essences',
    subtitle: 'Nature-Identical Purity',
    desc: 'Distilled essential fruit aromatics that retain tree-fresh smell and crisp bouquet.',
    color: 'from-emerald-500 to-green-400',
    badge: 'Botanical',
    accent: '#10b981'
  },
  {
    icon: ShieldCheck,
    title: 'Zero Chemical Preservatives',
    subtitle: 'Protected by 6-Layer Science',
    desc: 'No Sodium Benzoate, no potassium sorbate, no artificial sulphur. Clean label purity for kids & family.',
    color: 'from-violet-500 to-purple-400',
    badge: 'Clean Label',
    accent: '#8b5cf6'
  }
];

export function Ingredients() {
  const [selectedFlavor, setSelectedFlavor] = useState<'mango' | 'lychee'>('mango');
  const [scanActive, setScanActive] = useState(true);
  const flavor = INGREDIENTS_DATA[selectedFlavor];

  return (
    <section 
      id="inside" 
      className="relative overflow-hidden py-24 lg:py-32 bg-[#fafdfa] border-y border-emerald-900/10"
    >
      {/* Dynamic Ambient Radiant Lighting */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(16,185,129,0.08),transparent_55%),radial-gradient(circle_at_75%_35%,rgba(245,158,11,0.08),transparent_55%),radial-gradient(circle_at_50%_80%,rgba(244,63,94,0.06),transparent_60%)]" />

      {/* Floating Organic Fluid Blur Glows */}
      <div 
        className="pointer-events-none absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full blur-3xl opacity-40 transition-colors duration-1000"
        style={{ background: flavor.glowColor }}
      />
      <div 
        className="pointer-events-none absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full blur-3xl opacity-30 transition-colors duration-1000"
        style={{ background: flavor.glowColor }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        
        {/* Modern Editorial Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-white/95 px-4 py-1.5 shadow-xs backdrop-blur"
          >
            <Sparkles className="h-4 w-4 text-[#0b8043]" />
            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#0b8043]">
              What's Inside & Purity Science
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-['Space_Grotesk',sans-serif] text-[clamp(2.2rem,6vw,4.5rem)] font-black text-[#083b20] tracking-tight leading-[1.05]"
          >
            Simple Ingredients.<br />
            <span className="bg-gradient-to-r from-[#0b8043] via-[#eab308] to-[#f43f5e] bg-clip-text text-transparent">
              Zero Secrets.
            </span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-[#325340] font-medium leading-relaxed max-w-2xl mx-auto"
          >
            Every 160ml carton of PIO is crafted with clean-label transparency: authentic fruit harvest, crystal-purified water, and multi-layer aseptic protection.
          </motion.p>

          {/* Interactive Flavor Selector Pill */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="pt-2 inline-flex items-center gap-2 p-1.5 rounded-full bg-white border border-emerald-900/10 shadow-sm backdrop-blur"
          >
            <button
              onClick={() => { setSelectedFlavor('mango'); fizzAudio.playFizz(); }}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                selectedFlavor === 'mango'
                  ? 'bg-[#f59e0b] text-white shadow-md scale-105'
                  : 'text-[#083b20] hover:bg-amber-50'
              }`}
            >
              <span>🥭</span>
              <span>Alphonso Mango</span>
            </button>

            <button
              onClick={() => { setSelectedFlavor('lychee'); fizzAudio.playFizz(); }}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                selectedFlavor === 'lychee'
                  ? 'bg-[#f43f5e] text-white shadow-md scale-105'
                  : 'text-[#083b20] hover:bg-rose-50'
              }`}
            >
              <span>🌺</span>
              <span>Floral Lychee</span>
            </button>
          </motion.div>
        </div>

        {/* ----------------------------------------------------
            THE BENTO MOTION STAGE (APPLE / STRIPE LEVEL REFINEMENT)
        ---------------------------------------------------- */}
        <div className="mt-14 grid gap-6 lg:grid-cols-12 items-stretch">
          
          {/* Bento Card 1: Interactive Live Liquid Viscosity Lab (Col 7) */}
          <div className="lg:col-span-7 rounded-[36px] bg-white border border-emerald-900/10 shadow-[0_20px_50px_rgba(7,88,47,0.06)] p-7 sm:p-9 flex flex-col justify-between relative overflow-hidden group">
            
            {/* Top Bar */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2.5">
                <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-black uppercase tracking-widest text-[#07582f]">
                  Liquid Viscosity & Sourcing Lab
                </span>
              </div>
              <span className={`text-[11px] font-black uppercase px-3 py-1 rounded-full border ${flavor.tagBg}`}>
                {flavor.source}
              </span>
            </div>

            {/* Middle Title & Description */}
            <div className="my-6 z-10 space-y-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={flavor.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-['Space_Grotesk',sans-serif] text-2xl sm:text-4xl font-black text-[#083b20] tracking-tight">
                    {flavor.name}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-[#385b45] font-medium leading-relaxed max-w-lg">
                    {flavor.highlight}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Interactive Liquid Wave Visualizer Box */}
            <div className="relative w-full h-44 sm:h-52 rounded-3xl overflow-hidden bg-gradient-to-b from-[#f2fcf5] to-[#e6f7ec] border border-emerald-900/10 p-5 flex flex-col justify-between z-10">
              
              {/* Dynamic Animated Liquid Wave SVG (GPU Composited) */}
              <div className="absolute inset-0 pointer-events-none opacity-80 overflow-hidden">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 400">
                  <defs>
                    <linearGradient id={`liquidGrad-${flavor.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={flavor.color} stopOpacity="0.45" />
                      <stop offset="50%" stopColor={flavor.color} stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                  
                  {/* Wave Layer 1 */}
                  <motion.path 
                    fill={`url(#liquidGrad-${flavor.id})`}
                    animate={{ d: [
                      "M0,200 C300,160 600,230 900,180 1200,200 L1200,400 L0,400 Z",
                      "M0,210 C300,190 600,170 900,220 1200,210 L1200,400 L0,400 Z",
                      "M0,200 C300,160 600,230 900,180 1200,200 L1200,400 L0,400 Z"
                    ]}}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  />
                  {/* Wave Layer 2 */}
                  <motion.path 
                    fill={`url(#liquidGrad-${flavor.id})`}
                    opacity="0.6"
                    animate={{ d: [
                      "M0,220 C300,250 600,190 900,240 1200,220 L1200,400 L0,400 Z",
                      "M0,205 C300,210 600,240 900,195 1200,205 L1200,400 L0,400 Z",
                      "M0,220 C300,250 600,190 900,240 1200,220 L1200,400 L0,400 Z"
                    ]}}
                    transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                </svg>
              </div>

              {/* Live Metric Badges Floating over liquid wave */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-900/10 shadow-xs">
                  <Waves className="w-4 h-4 text-emerald-700 animate-spin" style={{ animationDuration: '8s' }} />
                  <span className="text-xs font-black text-[#083b20]">Natural Viscosity: {flavor.viscosity}%</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-900/10 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-xs font-black text-[#083b20]">Lab Purity: {flavor.purity}%</span>
                </div>
              </div>

              {/* Wave Footer Readout */}
              <div className="relative z-10 flex items-center justify-between text-[11px] font-bold text-[#07582f] bg-white/80 backdrop-blur-sm p-2 rounded-xl border border-emerald-900/10">
                <span>Natural Fruit Density</span>
                <span className="font-black text-[#083b20]">{flavor.calories}</span>
              </div>
            </div>

            {/* Bottom 4 Key Fact Tiles */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 z-10">
              {flavor.traits.map((trait) => (
                <div 
                  key={trait.label} 
                  className="rounded-2xl bg-[#f8fdf9] border border-emerald-900/10 p-3 text-center transition-all hover:bg-white hover:shadow-xs"
                >
                  <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    {trait.label}
                  </div>
                  <div className="mt-1 text-xs sm:text-sm font-black text-[#083b20]">
                    {trait.value}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Bento Card 2: Interactive 3D Pack Scanner with Laser Inspection (Col 5) */}
          <div className="lg:col-span-5 rounded-[36px] bg-gradient-to-br from-white via-[#f7fcf9] to-[#edf9f1] border border-emerald-900/10 shadow-[0_20px_50px_rgba(7,88,47,0.06)] p-7 sm:p-9 flex flex-col justify-between relative overflow-hidden">
            
            {/* Header */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <Scan className="w-4 h-4 text-[#0b8043]" />
                <span className="text-[11px] font-black uppercase tracking-widest text-[#07582f]">
                  Aseptic Pack Scanner
                </span>
              </div>
              <button
                onClick={() => setScanActive(!scanActive)}
                className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 hover:bg-emerald-200 transition-colors cursor-pointer"
              >
                {scanActive ? 'Laser ON' : 'Paused'}
              </button>
            </div>

            {/* Center Product Showcase with Real PIO Pack & Scanning Beam */}
            <div className="relative my-8 flex items-center justify-center min-h-[260px]">
              
              {/* Radial Glow Halo */}
              <div 
                className="absolute inset-0 rounded-full blur-2xl opacity-40 transition-colors duration-700 pointer-events-none"
                style={{ background: flavor.glowColor }}
              />

              {/* Real Pack with Hover Float */}
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10"
              >
                <img 
                  src={flavor.packImage} 
                  alt={`PIO ${flavor.name} pack`}
                  className="h-56 sm:h-64 w-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.2)] select-none"
                />

                {/* Animated Laser Scanning Line */}
                {scanActive && (
                  <motion.div 
                    animate={{ y: [0, 220, 0] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-2 inset-x-[-15px] h-1 bg-gradient-to-r from-transparent via-[#10b981] to-transparent shadow-[0_0_15px_#10b981] pointer-events-none"
                  />
                )}
              </motion.div>

              {/* Hotspot 1: Straw Port */}
              <div className="absolute top-6 right-2 sm:right-6 bg-white/95 backdrop-blur-md border border-emerald-900/10 shadow-sm px-3 py-1.5 rounded-2xl flex items-center gap-1.5 z-20">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[10px] font-black text-[#083b20]">Straw Ready</span>
              </div>

              {/* Hotspot 2: 6-Layer Shield */}
              <div className="absolute bottom-6 left-2 sm:left-6 bg-white/95 backdrop-blur-md border border-emerald-900/10 shadow-sm px-3 py-1.5 rounded-2xl flex items-center gap-1.5 z-20">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[10px] font-black text-[#083b20]">Zero Preservatives</span>
              </div>
            </div>

            {/* Bottom Carton Spec Bar */}
            <div className="rounded-2xl bg-white border border-emerald-900/10 p-3.5 flex items-center justify-between text-xs font-black text-[#083b20] shadow-2xs z-10">
              <span className="text-slate-400 font-bold uppercase text-[10px]">Net Volume</span>
              <span className="text-[#07582f]">160 ml Grab & Go</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-400 font-bold uppercase text-[10px]">Price</span>
              <span className="text-amber-600 font-black">₹10 Only</span>
            </div>

          </div>

        </div>

        {/* ----------------------------------------------------
            THE 4 PURITY PILLARS GRID (INTERACTIVE MODERN CARDS)
        ---------------------------------------------------- */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PURITY_PILLARS.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              className="relative overflow-hidden rounded-[28px] bg-white border border-emerald-900/10 shadow-sm hover:shadow-lg p-6 flex flex-col justify-between transition-all group"
            >
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between">
                  <div 
                    className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-md transition-transform group-hover:rotate-6"
                    style={{ background: pillar.accent }}
                  >
                    <pillar.icon className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-[#eef8f1] px-2.5 py-1 rounded-full border border-emerald-900/10">
                    {pillar.badge}
                  </span>
                </div>

                <h4 className="mt-5 text-lg font-black text-[#083b20] tracking-tight">
                  {pillar.title}
                </h4>

                <div className="text-[11px] font-black uppercase tracking-wider text-[#0b8043] mt-0.5">
                  {pillar.subtitle}
                </div>

                <p className="mt-2.5 text-xs sm:text-sm text-[#456852] font-medium leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              {/* Bottom Subtle Checkmark */}
              <div className="mt-5 pt-3 border-t border-emerald-900/5 flex items-center justify-between text-[11px] font-black text-[#07582f]">
                <span>100% Tested Standard</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
            </motion.div>
          ))}
        </div>



      </div>
    </section>
  );
}
