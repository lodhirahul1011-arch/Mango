import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Award, 
  ArrowRight, 
  Sparkles, 
  Play, 
  Pause, 
  RotateCcw, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Flame 
} from 'lucide-react';

const STORY_SEQUENCE_PATH = '/pio_website_jpg_sequence_24fps/pio_website_jpg_sequence';
const STORY_SEQUENCE_FRAME_COUNT = 121;

function getStoryFrameSrc(frame: number) {
  return `${STORY_SEQUENCE_PATH}/frame_${String(frame).padStart(4, '0')}.jpg`;
}

interface Era {
  id: string;
  year: string;
  tag: string;
  title: string;
  frameTarget: number;
  description: string;
  statLabel: string;
  statValue: string;
  accent: string;
}

const ERAS: Era[] = [
  {
    id: '1931',
    year: '1931',
    tag: 'Origins in Assam',
    title: 'The Mangaldai Tea Hearth',
    frameTarget: 1,
    description:
      'Ninety-three years ago, in the small town of Mangaldai, Assam, a humble roadside tea stall began serving commuters with authentic warmth and uncompromised purity.',
    statLabel: 'Hearth Foundation',
    statValue: '1931 Assam',
    accent: '#f59e0b',
  },
  {
    id: '1985',
    year: '1980s – 2000s',
    tag: 'Industrial Craft',
    title: 'The Repose Food Legacy',
    frameTarget: 60,
    description:
      'The tea stall evolved into Repose Agrotech and the venerable SRD Group — becoming the Northeast’s gold standard for confectionery, baking, and community nutrition.',
    statLabel: 'Food-Grade Trust',
    statValue: '90+ Years',
    accent: '#d97706',
  },
  {
    id: 'today',
    year: 'Today',
    tag: 'Modern Aseptic Era',
    title: 'Har Sip PIO! ₹10 Beverage',
    frameTarget: 121,
    description:
      'From tea roots to state-of-the-art aseptic beverage packaging. Real Alphonso mango and floral lychee delivered in sterile 6-layer cartons across 15,000+ retail points.',
    statLabel: 'Aseptic Purity',
    statValue: '100% Sterile',
    accent: '#10b981',
  },
];

export function OurStory() {
  const [currentFrame, setCurrentFrame] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeEraIndex, setActiveEraIndex] = useState(0);
  const playTimerRef = useRef<number | null>(null);

  // Staged preload: Only fetch key milestone frames on initial load
  useEffect(() => {
    const keyFrames = [1, 30, 60, 90, 121];
    keyFrames.forEach((i) => {
      const img = new Image();
      img.src = getStoryFrameSrc(i);
    });
  }, []);

  // Frame Player Loop
  const stopPlayback = useCallback(() => {
    if (playTimerRef.current) {
      window.clearInterval(playTimerRef.current);
      playTimerRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const startPlayback = useCallback(() => {
    stopPlayback();
    setIsPlaying(true);
    playTimerRef.current = window.setInterval(() => {
      setCurrentFrame((prev) => {
        if (prev >= STORY_SEQUENCE_FRAME_COUNT) {
          stopPlayback();
          return 1;
        }
        const next = prev + 1;
        // Sync active era based on frame
        if (next < 45) setActiveEraIndex(0);
        else if (next < 85) setActiveEraIndex(1);
        else setActiveEraIndex(2);
        return next;
      });
    }, 45); // ~22fps smooth cinematic playback
  }, [stopPlayback]);

  useEffect(() => {
    return () => {
      if (playTimerRef.current) {
        clearInterval(playTimerRef.current);
      }
    };
  }, []);

  const selectEra = (index: number) => {
    stopPlayback();
    setActiveEraIndex(index);
    const target = ERAS[index].frameTarget;
    setCurrentFrame(target);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    stopPlayback();
    const val = parseInt(e.target.value, 10);
    setCurrentFrame(val);
    if (val < 45) setActiveEraIndex(0);
    else if (val < 85) setActiveEraIndex(1);
    else setActiveEraIndex(2);
  };

  const activeEra = ERAS[activeEraIndex];
  const progressPercent = ((currentFrame - 1) / (STORY_SEQUENCE_FRAME_COUNT - 1)) * 100;

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="story" 
      className="relative py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-[#03150c] via-[#051f12] to-[#020e07] text-white border-t border-amber-500/15 overflow-hidden"
    >
      {/* Ambient Luxury Atmospheric Light Rays */}
      <div className="pointer-events-none absolute -top-32 left-1/3 h-96 w-96 rounded-full bg-amber-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 right-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px]" />

      {/* Subtle Archival Texture Grid */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #f59e0b 1px, transparent 0)`,
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================
            HEADER: EDITORIAL PRESTIGE & BRAND PROVENANCE
            ========================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-950/40 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.25em] text-amber-300 shadow-inner backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
            <span>Heritage Chronicle · Assam Est. 1931</span>
          </div>

          <h2 className="mt-4 font-['Space_Grotesk',sans-serif] text-[clamp(2.1rem,5.5vw,3.85rem)] font-extrabold uppercase tracking-tight text-white leading-[1.02]">
            From Tea Stall Roots <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-amber-300 via-yellow-100 to-emerald-400 bg-clip-text text-transparent">
              To Fresh Refreshment.
            </span>
          </h2>

          <p className="mt-3 text-xs sm:text-sm lg:text-base text-emerald-100/70 max-w-2xl mx-auto font-medium leading-relaxed">
            A 93-year journey from a humble tea kettle in Mangaldai to state-of-the-art aseptic fruit beverage manufacturing across Northeast and India.
          </p>
        </div>

        {/* =========================================================
            INTERACTIVE CHRONICLE THEATRE (Two-Column Split Console)
            ========================================================= */}
        <div className="rounded-3xl border border-amber-500/20 bg-gradient-to-br from-[#0c2e1b]/80 via-[#061e12]/90 to-[#03140b]/95 p-5 sm:p-7 lg:p-9 shadow-[0_25px_80px_rgba(0,0,0,0.7)] backdrop-blur-xl">
          
          {/* Era Navigation Tabs */}
          <div className="flex items-center justify-between flex-wrap gap-3 pb-6 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-400" />
              <span className="text-xs font-black uppercase tracking-wider text-amber-200">
                Interactive Era Scrubber
              </span>
            </div>

            {/* Era Tabs with Sliding Indicator */}
            <div className="flex items-center gap-1.5 bg-black/40 p-1.5 rounded-2xl border border-white/10">
              {ERAS.map((era, index) => {
                const isCurrent = activeEraIndex === index;
                return (
                  <button
                    key={era.id}
                    onClick={() => selectEra(index)}
                    className={`relative px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-colors duration-200 cursor-pointer ${
                      isCurrent ? 'text-black' : 'text-emerald-100/60 hover:text-white'
                    }`}
                  >
                    {isCurrent && (
                      <motion.div
                        layoutId="activeEraPill"
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-300 shadow-md"
                        transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{era.year}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Display: Left (Archival Narrative) + Right (Cinematic Frame Portal) */}
          <div className="grid lg:grid-cols-12 gap-8 items-center pt-6 sm:pt-8">
            
            {/* ----------------------------------------------------
                LEFT: EDITORIAL NARRATIVE & STATS
                ---------------------------------------------------- */}
            <div className="lg:col-span-5 space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeEra.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-white/5 border border-amber-400/30 text-amber-300">
                    <Flame className="h-3 w-3 text-amber-400" />
                    <span>{activeEra.tag}</span>
                  </div>

                  <h3 className="font-['Space_Grotesk',sans-serif] text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-white leading-tight">
                    {activeEra.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed font-medium">
                    {activeEra.description}
                  </p>

                  {/* Highlight Specs Pill */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="rounded-2xl bg-black/40 border border-white/10 p-3.5">
                      <span className="text-[10px] uppercase tracking-wider text-emerald-200/50 font-bold block">
                        Milestone Anchor
                      </span>
                      <span className="text-sm sm:text-base font-black text-amber-300 mt-0.5 block font-['Space_Grotesk',sans-serif]">
                        {activeEra.statValue}
                      </span>
                    </div>

                    <div className="rounded-2xl bg-black/40 border border-white/10 p-3.5">
                      <span className="text-[10px] uppercase tracking-wider text-emerald-200/50 font-bold block">
                        Core Value
                      </span>
                      <span className="text-sm sm:text-base font-black text-emerald-400 mt-0.5 block font-['Space_Grotesk',sans-serif]">
                        Zero Preservative
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={scrollToContact}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-black px-6 py-3.5 text-xs font-black uppercase tracking-wider shadow-[0_0_25px_rgba(245,158,11,0.35)] transition-transform duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer min-h-[44px]"
                >
                  <span>Connect With Our Heritage</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* ----------------------------------------------------
                RIGHT: CINEMATIC FILMSTRIP SEQUENCE PORTAL
                ---------------------------------------------------- */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Image Frame Viewport with Glass Specular Rims */}
              <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full rounded-2xl sm:rounded-3xl border border-amber-400/25 bg-black overflow-hidden shadow-2xl flex items-center justify-center">
                
                {/* Current Rendered Film Frame */}
                <img
                  src={getStoryFrameSrc(currentFrame)}
                  alt="PIO heritage journey film sequence"
                  className="h-full w-full object-cover object-center select-none"
                  loading="eager"
                />

                {/* Subtle vignette and cinematic grade */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                {/* Top Corner Frame Badge */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-2 bg-black/60 border border-white/10 px-3 py-1 rounded-full backdrop-blur-md text-[10px] font-black uppercase tracking-wider text-amber-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
                  <span>Timeline Archive {activeEra.year}</span>
                </div>

                {/* Bottom Frame Counter */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-xs text-white/80 pointer-events-none">
                  <div className="bg-black/60 border border-white/10 px-3 py-1 rounded-full backdrop-blur-md text-[10px] font-bold tracking-widest text-emerald-300">
                    Frame {currentFrame} / {STORY_SEQUENCE_FRAME_COUNT}
                  </div>
                  <div className="bg-black/60 border border-white/10 px-3 py-1 rounded-full backdrop-blur-md text-[10px] font-bold text-amber-200/70">
                    Mangaldai Origin
                  </div>
                </div>

              </div>

              {/* Interactive Player Controls & Timeline Scrubber */}
              <div className="rounded-2xl bg-black/40 border border-white/10 p-3 sm:p-4 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  
                  {/* Play / Pause Toggle Button */}
                  <button
                    onClick={isPlaying ? stopPlayback : startPlayback}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400 text-black hover:bg-yellow-300 active:scale-95 transition-transform duration-150 shrink-0 cursor-pointer shadow-md"
                    aria-label={isPlaying ? 'Pause timeline playback' : 'Play timeline sequence'}
                  >
                    {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current ml-0.5" />}
                  </button>

                  {/* Reset to 1931 */}
                  <button
                    onClick={() => selectEra(0)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 active:scale-95 transition-transform duration-150 shrink-0 cursor-pointer"
                    aria-label="Reset sequence to 1931"
                    title="Reset to 1931"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>

                  {/* Interactive Scrub Range Bar */}
                  <div className="relative flex-1 flex items-center">
                    <input
                      type="range"
                      min={1}
                      max={STORY_SEQUENCE_FRAME_COUNT}
                      value={currentFrame}
                      onChange={handleSliderChange}
                      className="w-full h-2 bg-emerald-950/90 rounded-lg appearance-none cursor-pointer accent-amber-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                      aria-label="Scrub through heritage journey sequence"
                    />
                  </div>

                </div>

                {/* Milestone Tick Marks */}
                <div className="flex justify-between items-center text-[10px] font-bold text-emerald-200/50 px-1">
                  <span className={activeEraIndex === 0 ? 'text-amber-300 font-black' : ''}>1931 Stall</span>
                  <span className={activeEraIndex === 1 ? 'text-amber-300 font-black' : ''}>1985 Growth</span>
                  <span className={activeEraIndex === 2 ? 'text-emerald-400 font-black' : ''}>Today (PIO)</span>
                </div>
              </div>

            </div>

          </div>

          {/* 3 Luxury Heritage Provenance Cards */}
          <div className="grid sm:grid-cols-3 gap-3.5 mt-8 pt-6 border-t border-white/10">
            <div className="p-4 rounded-2xl bg-black/30 border border-white/5 flex items-start gap-3">
              <div className="h-8 w-8 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                <Building2 className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-black text-white">Assam Hearth Heritage</h4>
                <p className="text-[11px] text-emerald-200/60 mt-0.5 font-medium leading-relaxed">
                  Deep regional roots in Mangaldai with 90+ years of food manufacturing trust.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-black/30 border border-white/5 flex items-start gap-3">
              <div className="h-8 w-8 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-black text-white">6-Layer Sterile Science</h4>
                <p className="text-[11px] text-emerald-200/60 mt-0.5 font-medium leading-relaxed">
                  No artificial preservatives needed. Multi-layer packaging locks in raw freshness.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-black/30 border border-white/5 flex items-start gap-3">
              <div className="h-8 w-8 rounded-xl bg-yellow-500/15 text-yellow-300 flex items-center justify-center shrink-0 mt-0.5">
                <Award className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-black text-white">₹10 Daily Accessible Luxury</h4>
                <p className="text-[11px] text-emerald-200/60 mt-0.5 font-medium leading-relaxed">
                  Premium tropical refreshment priced so every child and family can enjoy daily.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
