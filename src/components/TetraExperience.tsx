import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import { 
  Sparkles, 
  ShieldCheck, 
  Leaf, 
  Droplets, 
  Check, 
  RotateCw, 
  Volume2, 
  Zap, 
  Heart, 
  Layers, 
  ArrowRight,
  Smile
} from 'lucide-react';
import { fizzAudio } from '@/utils/audio';

// Flavor configuration data
const FLAVORS = {
  mango: {
    id: 'mango',
    name: 'Alphonso Mango',
    subtitle: 'Golden Sunburst Puree',
    tagline: 'Sun-ripened Ratnagiri aroma with silky tropical sweetness in every straw-sip.',
    accent: '#f59e0b',
    accentLight: '#fef3c7',
    accentDark: '#b45309',
    gradient: 'from-amber-400/20 via-yellow-100/40 to-emerald-50/60',
    packImage: '/images/pio-mango.png',
    cardBorder: 'border-amber-200',
    pillBg: 'bg-amber-500/10 text-amber-900 border-amber-300/40',
    badgeColor: 'bg-amber-500',
    flavorNotes: ['Alphonso Pulp', 'Zero Preservatives', 'Vitamin C Rich', '160ml Net'],
    facts: {
      volume: '160 ml',
      price: '₹10',
      shelfLife: '6 Months',
      fruitJuice: 'Real Alphonso Pulp'
    }
  },
  lychee: {
    id: 'lychee',
    name: 'Royal Floral Lychee',
    subtitle: 'Dehradun Valley Blossom',
    tagline: 'Crisp, aromatic translucent orchard sweetness with an exhilarating floral burst.',
    accent: '#f43f5e',
    accentLight: '#ffe4e6',
    accentDark: '#be123c',
    gradient: 'from-rose-400/20 via-pink-100/40 to-emerald-50/60',
    packImage: '/images/pio-lychee.png',
    cardBorder: 'border-rose-200',
    pillBg: 'bg-rose-500/10 text-rose-900 border-rose-300/40',
    badgeColor: 'bg-rose-500',
    flavorNotes: ['Valley Lychee', 'Ultra Fresh Aroma', 'Natural Refreshment', '160ml Net'],
    facts: {
      volume: '160 ml',
      price: '₹10',
      shelfLife: '6 Months',
      fruitJuice: 'Natural Lychee Extract'
    }
  }
};

// 6-Layer Tetra Pak Technology Hotspots
const ANATOMY_LAYERS = [
  {
    layer: 1,
    title: 'Polyethylene Outer',
    desc: 'Waterproof seal protecting against external humidity & scuffs.',
    icon: ShieldCheck,
    tag: 'Moisture Lock'
  },
  {
    layer: 2,
    title: 'Print Ink & Paperboard',
    desc: 'High-definition FSC paperboard providing carton rigidity & shape.',
    icon: Leaf,
    tag: 'Eco Structure'
  },
  {
    layer: 3,
    title: 'Lamination Layer',
    desc: 'Adhesion layer binding paperboard directly to protective aluminum.',
    icon: Layers,
    tag: 'Thermo-Bond'
  },
  {
    layer: 4,
    title: 'Micro Aluminum Barrier',
    desc: 'Ultra-thin shield blocking 100% light & oxygen — preserving taste without chemicals.',
    icon: Zap,
    tag: 'Zero Preservatives'
  },
  {
    layer: 5,
    title: 'Aseptic Inner Liner',
    desc: 'Food-grade sterile polymer locking pure juice freshness.',
    icon: Droplets,
    tag: 'Food Safety'
  },
  {
    layer: 6,
    title: 'Straw Hole Foil Seal',
    desc: 'Hygienic puncture-ready foil allowing effortless on-the-go sipping.',
    icon: Sparkles,
    tag: 'Straw Attached'
  }
];

export function TetraExperience() {
  const [flavor, setFlavor] = useState<'mango' | 'lychee'>('mango');
  const [strawPopped, setStrawPopped] = useState(false);
  const [sipCount, setSipCount] = useState(0);
  const [activeLayer, setActiveLayer] = useState(3);
  const [isHovered, setIsHovered] = useState(false);
  const [splashes, setSplashes] = useState<{ id: number; x: number; y: number; color: string }[]>([]);

  // 3D Parallax tilt springs
  const mouseX = useSpring(0, { stiffness: 180, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 180, damping: 20 });

  const containerRef = useRef<HTMLDivElement>(null);

  const current = FLAVORS[flavor];

  // Mouse move handler for 3D gyro perspective
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x * 24);
    mouseY.set(-y * 24);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  // Pop straw with sound and burst animation
  const handleStrawPop = () => {
    fizzAudio.playFizz();
    setStrawPopped(true);
    setSipCount((prev) => Math.min(prev + 1, 10));

    // Spawn 6 burst particles
    const newSplashes = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 160,
      y: -60 - Math.random() * 80,
      color: flavor === 'mango' ? '#f59e0b' : '#f43f5e'
    }));
    setSplashes(newSplashes);

    setTimeout(() => {
      setSplashes([]);
    }, 1200);
  };

  // Reset straw
  const handleResetStraw = () => {
    setStrawPopped(false);
    setSipCount(0);
  };

  return (
    <section 
      id="tetra-experience" 
      className="relative overflow-hidden py-24 lg:py-32 bg-[#f8fdf9] border-y border-emerald-900/10"
    >
      {/* Dynamic Ambient Radiant Glow */}
      <div 
        className={`pointer-events-none absolute inset-0 transition-opacity duration-1000 bg-gradient-to-br ${current.gradient}`} 
      />
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-emerald-300/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-[500px] w-[500px] rounded-full bg-amber-300/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-white/90 px-4 py-1.5 shadow-xs backdrop-blur"
          >
            <Sparkles className="h-4 w-4 text-[#0b8043]" />
            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#0b8043]">
              Interactive Tetra Studio
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-['Space_Grotesk',sans-serif] text-4xl sm:text-6xl font-black text-[#083b20] tracking-tight leading-[1.05]"
          >
            The ₹10 Tetra Pak.<br />
            <span className="bg-gradient-to-r from-[#0b8043] via-[#eab308] to-[#f43f5e] bg-clip-text text-transparent">
              Engineered For Pure Joy.
            </span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-[#325340] font-medium leading-relaxed"
          >
            6-layer aseptic packaging shields pure fruit goodness from sunlight & air. 
            Straw attached, zero preservatives required, and delightfully chilled at just ₹10.
          </motion.p>

          {/* Flavor Switcher Pills */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="pt-3 inline-flex items-center gap-3 p-1.5 rounded-full bg-white/90 border border-emerald-900/10 shadow-sm backdrop-blur"
          >
            <button
              onClick={() => { setFlavor('mango'); fizzAudio.playFizz(); }}
              className={`flex items-center gap-2.5 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                flavor === 'mango'
                  ? 'bg-[#f59e0b] text-white shadow-md scale-105'
                  : 'text-[#083b20] hover:bg-amber-50'
              }`}
            >
              <span>🥭</span>
              <span>Alphonso Mango</span>
            </button>

            <button
              onClick={() => { setFlavor('lychee'); fizzAudio.playFizz(); }}
              className={`flex items-center gap-2.5 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                flavor === 'lychee'
                  ? 'bg-[#f43f5e] text-white shadow-md scale-105'
                  : 'text-[#083b20] hover:bg-rose-50'
              }`}
            >
              <span>🌺</span>
              <span>Royal Lychee</span>
            </button>
          </motion.div>
        </div>

        {/* Main Interactive Stage (Grid Layout) */}
        <div className="mt-14 grid items-center gap-10 lg:grid-cols-12">
          
          {/* Left Column: Interactive 6-Layer Packaging Breakdown */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center justify-between pb-1">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#07582f] flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#0b8043]" />
                6-Layer Aseptic Shield
              </span>
              <span className="text-[11px] font-bold text-slate-500 bg-white px-2.5 py-0.5 rounded-full border border-emerald-900/10">
                Layer {activeLayer} / 6
              </span>
            </div>

            {/* Layer Selector Cards */}
            <div className="space-y-2.5">
              {ANATOMY_LAYERS.map((layer) => {
                const isSelected = activeLayer === layer.layer;
                return (
                  <button
                    key={layer.layer}
                    onClick={() => {
                      setActiveLayer(layer.layer);
                      fizzAudio.playFizz();
                    }}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-start gap-3.5 ${
                      isSelected
                        ? 'bg-white shadow-md border-emerald-500/50 scale-[1.02]'
                        : 'bg-white/60 hover:bg-white border-emerald-900/10 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div 
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-black text-xs transition-colors ${
                        isSelected 
                          ? 'bg-[#07582f] text-white shadow-xs' 
                          : 'bg-emerald-50 text-[#07582f]'
                      }`}
                    >
                      <layer.icon className="h-4 w-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs font-black text-[#083b20] truncate">
                          {layer.title}
                        </h4>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md shrink-0">
                          {layer.tag}
                        </span>
                      </div>
                      <p className="mt-1 text-[11px] text-slate-500 leading-snug line-clamp-2">
                        {layer.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Center Column: Interactive 3D Holographic Animated Tetra Pak */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            
            <div 
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-[360px] aspect-[4/5] rounded-[36px] bg-gradient-to-b from-white/95 via-white/80 to-white/50 border border-emerald-900/10 shadow-[0_24px_50px_rgba(7,88,47,0.12)] p-6 flex flex-col items-center justify-center overflow-visible select-none backdrop-blur-md"
              style={{ perspective: 1000 }}
            >
              {/* Radial Backlight Burst */}
              <div 
                className="absolute inset-0 rounded-[36px] opacity-40 blur-2xl transition-colors duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${current.accent} 0%, transparent 70%)`
                }}
              />

              {/* Floating Orbit Rings */}
              <div className="absolute inset-8 rounded-full border border-dashed border-emerald-900/15 pointer-events-none animate-[spin_40s_linear_infinite]" />
              <div className="absolute inset-14 rounded-full border border-dotted border-amber-900/10 pointer-events-none animate-[spin_25s_linear_infinite_reverse]" />

              {/* Floating Price Medallion (Top Left) */}
              <motion.div 
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-5 left-5 z-20 flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 border border-emerald-900/10 shadow-md"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-amber-950 text-[10px] font-black">
                  ₹
                </span>
                <span className="text-xs font-black text-[#083b20]">₹10 Only</span>
              </motion.div>

              {/* Volume & Net Badge (Top Right) */}
              <motion.div 
                animate={{ y: [4, -4, 4] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-5 right-5 z-20 flex items-center gap-1 rounded-full bg-emerald-900 text-white px-3 py-1.5 text-[10px] font-black uppercase tracking-wider shadow-md"
              >
                <span>160 ml</span>
              </motion.div>

              {/* 3D Tilting Tetra Pack Container */}
              <motion.div 
                style={{
                  rotateX: mouseY,
                  rotateY: mouseX,
                  transformStyle: 'preserve-3d'
                }}
                className="relative z-10 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing"
              >
                
                {/* Straw Pop Spring Element */}
                <motion.div
                  initial={false}
                  animate={{
                    y: strawPopped ? -28 : 10,
                    opacity: strawPopped ? 1 : 0.4,
                    scale: strawPopped ? 1.05 : 0.9,
                    rotate: strawPopped ? -12 : -5
                  }}
                  transition={{ type: 'spring', stiffness: 350, damping: 18 }}
                  className="z-30 mb-[-14px]"
                >
                  <div className="relative flex flex-col items-center">
                    {/* Plastic Straw Tube */}
                    <div className="w-2.5 h-16 rounded-full bg-gradient-to-r from-red-500 via-white to-red-500 shadow-md border border-white/60" />
                    {/* Bend joint */}
                    <div className="w-3 h-2 rounded bg-red-400 -mt-1 shadow-xs" />
                  </div>
                </motion.div>

                {/* Burst Splash Particles */}
                {splashes.map((s) => (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                    animate={{ 
                      opacity: 0, 
                      scale: [0, 1.4, 0.8], 
                      x: s.x, 
                      y: s.y 
                    }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                    className="absolute top-8 z-40 h-3.5 w-3.5 rounded-full shadow-lg"
                    style={{ backgroundColor: s.color }}
                  />
                ))}

                {/* Real High-Resolution Carton Image with Lighting Reflection */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                    transition={{ duration: 0.45 }}
                    className="relative group"
                  >
                    <img 
                      src={current.packImage} 
                      alt={`PIO ${current.name} 160ml Tetra Pack`}
                      className="h-64 sm:h-72 w-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.22)] select-none pointer-events-none transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Dynamic Glare Overlay */}
                    <div 
                      className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" 
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Floating Realistic Ground Drop Shadow */}
                <motion.div 
                  animate={{
                    scale: isHovered ? [1, 1.08, 1] : 1,
                    opacity: isHovered ? 0.35 : 0.2
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mt-3 h-4 w-44 rounded-full bg-emerald-950 blur-md"
                />

              </motion.div>

              {/* Bottom Interactive Straw Action */}
              <div className="mt-4 z-20 flex flex-col items-center gap-2">
                <button
                  onClick={handleStrawPop}
                  className="group flex items-center gap-2 rounded-full bg-[#07582f] hover:bg-[#0a6d3b] text-white px-5 py-2.5 text-xs font-black uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>{strawPopped ? 'Take Another Sip!' : 'Pop Straw & Sip'}</span>
                </button>

                {strawPopped && (
                  <button
                    onClick={handleResetStraw}
                    className="text-[10px] font-bold text-slate-500 hover:text-emerald-800 transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <RotateCw className="w-3 h-3" />
                    Reset Carton
                  </button>
                )}
              </div>

              {/* Hover Gyro Indicator */}
              <div className="absolute bottom-3 text-[9px] font-bold uppercase tracking-widest text-slate-400">
                Move cursor to inspect in 3D
              </div>

            </div>

          </div>

          {/* Right Column: Flavor Specs, Sip Meter & Quick Facts */}
          <div className="lg:col-span-3 space-y-5">
            
            {/* Active Flavor Card */}
            <div className={`p-5 rounded-3xl bg-white border ${current.cardBorder} shadow-sm space-y-3`}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0b8043]">
                  {current.subtitle}
                </span>
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${current.pillBg}`}>
                  100% Food Grade
                </span>
              </div>

              <h3 className="text-xl font-black text-[#083b20] tracking-tight">
                {current.name}
              </h3>

              <p className="text-xs text-[#385b45] leading-relaxed font-medium">
                {current.tagline}
              </p>

              {/* Flavor tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {current.flavorNotes.map((note) => (
                  <span 
                    key={note}
                    className="text-[10px] font-bold bg-[#f4faf5] text-[#07582f] border border-emerald-900/10 px-2.5 py-1 rounded-lg"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Interactive Sip Meter */}
            <div className="p-5 rounded-3xl bg-white border border-emerald-900/10 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-[#083b20] flex items-center gap-1.5">
                  <Smile className="w-4 h-4 text-amber-500" />
                  Refreshment Meter
                </span>
                <span className="text-xs font-black text-[#0b8043]">
                  {Math.min(sipCount * 10, 100)}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-3 w-full rounded-full bg-emerald-50 overflow-hidden border border-emerald-900/10 p-0.5">
                <motion.div 
                  initial={{ width: '0%' }}
                  animate={{ width: `${Math.min(sipCount * 10, 100)}%` }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 to-[#0b8043]"
                />
              </div>

              <p className="text-[11px] text-slate-500 leading-snug">
                {sipCount === 0 
                  ? 'Click "Pop Straw & Sip" to charge your fruit energy!'
                  : sipCount >= 10 
                  ? '🎉 Fully recharged! Pure ₹10 goodness experienced!' 
                  : `Delicious! ${10 - sipCount} more sips until bottle empty.`}
              </p>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 rounded-2xl bg-white border border-emerald-900/10 text-center">
                <div className="text-[10px] font-black uppercase text-slate-400">Price</div>
                <div className="text-base font-black text-[#083b20]">₹10 Only</div>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-emerald-900/10 text-center">
                <div className="text-[10px] font-black uppercase text-slate-400">Net Vol</div>
                <div className="text-base font-black text-[#083b20]">160 ml</div>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-emerald-900/10 text-center">
                <div className="text-[10px] font-black uppercase text-slate-400">Packaging</div>
                <div className="text-xs font-black text-[#083b20]">6-Layer Aseptic</div>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-emerald-900/10 text-center">
                <div className="text-[10px] font-black uppercase text-slate-400">Preservatives</div>
                <div className="text-xs font-black text-[#0b8043]">Zero Added</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
