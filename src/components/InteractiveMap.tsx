import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  MapPin, 
  Search, 
  Store, 
  Truck, 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Navigation, 
  Radio, 
  ShieldCheck, 
  Clock, 
  SlidersHorizontal 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CityHub {
  id: string;
  name: string;
  state: string;
  type: 'factory' | 'central' | 'hub';
  stores: string;
  distributors: string;
  status: string;
  leadTime: string;
  x: number; // percentage in SVG coordinate space
  y: number;
}

interface SearchMatch {
  label: string;
  aliases: string[];
  pinPrefixes: string[];
  hubId: string;
  availability: 'active' | 'expanding';
}

const CITY_HUBS: CityHub[] = [
  {
    id: 'mangaldai',
    name: 'Mangaldai',
    state: 'Assam',
    type: 'factory',
    stores: 'Factory & Origin',
    distributors: 'Main Aseptic Facility',
    status: 'State-of-the-Art Plant',
    leadTime: 'Origin Production',
    x: 72,
    y: 38,
  },
  {
    id: 'guwahati',
    name: 'Guwahati',
    state: 'Assam',
    type: 'central',
    stores: '4,500+ Outlets',
    distributors: '28 Distribution Centers',
    status: 'Next-Day Delivery',
    leadTime: '< 12 Hours',
    x: 69,
    y: 41,
  },
  {
    id: 'dibrugarh',
    name: 'Dibrugarh',
    state: 'Upper Assam',
    type: 'hub',
    stores: '2,200+ Outlets',
    distributors: '14 Depots',
    status: 'Active Network',
    leadTime: 'Daily Dispatch',
    x: 82,
    y: 32,
  },
  {
    id: 'jorhat',
    name: 'Jorhat',
    state: 'Assam',
    type: 'hub',
    stores: '1,950+ Outlets',
    distributors: '11 Depots',
    status: 'Active Network',
    leadTime: 'Daily Dispatch',
    x: 77,
    y: 36,
  },
  {
    id: 'tezpur',
    name: 'Tezpur',
    state: 'Assam',
    type: 'hub',
    stores: '1,600+ Outlets',
    distributors: '9 Depots',
    status: 'Active Network',
    leadTime: 'Daily Dispatch',
    x: 73,
    y: 35,
  },
  {
    id: 'silchar',
    name: 'Silchar',
    state: 'Barak Valley',
    type: 'hub',
    stores: '1,350+ Outlets',
    distributors: '8 Depots',
    status: 'Active Network',
    leadTime: 'Daily Dispatch',
    x: 71,
    y: 49,
  },
  {
    id: 'kolkata',
    name: 'Kolkata',
    state: 'West Bengal',
    type: 'central',
    stores: '3,200+ Outlets',
    distributors: '18 Depots',
    status: 'Regional Distribution',
    leadTime: '24-Hour Corridor',
    x: 58,
    y: 56,
  },
  {
    id: 'patna',
    name: 'Patna',
    state: 'Bihar',
    type: 'hub',
    stores: '1,100+ Outlets',
    distributors: '6 Depots',
    status: 'Expanding Corridor',
    leadTime: 'Express Freight',
    x: 48,
    y: 44,
  },
  {
    id: 'delhi',
    name: 'Delhi NCR',
    state: 'North Hub',
    type: 'central',
    stores: '850+ Outlets',
    distributors: '5 Institutional Hubs',
    status: 'B2B & Modern Retail',
    leadTime: 'Direct Institutional',
    x: 28,
    y: 36,
  },
];

const SEARCH_INDEX: SearchMatch[] = [
  {
    label: 'Mangaldai',
    aliases: ['mangaldai', 'darrang', 'ramhari'],
    pinPrefixes: ['7841'],
    hubId: 'mangaldai',
    availability: 'active',
  },
  {
    label: 'Guwahati',
    aliases: ['guwahati', 'gauhati', 'kamrup'],
    pinPrefixes: ['781'],
    hubId: 'guwahati',
    availability: 'active',
  },
  {
    label: 'Dibrugarh',
    aliases: ['dibrugarh', 'upper assam'],
    pinPrefixes: ['7860'],
    hubId: 'dibrugarh',
    availability: 'active',
  },
  {
    label: 'Jorhat',
    aliases: ['jorhat'],
    pinPrefixes: ['7850'],
    hubId: 'jorhat',
    availability: 'active',
  },
  {
    label: 'Tezpur',
    aliases: ['tezpur', 'sonitpur'],
    pinPrefixes: ['7840'],
    hubId: 'tezpur',
    availability: 'active',
  },
  {
    label: 'Silchar',
    aliases: ['silchar', 'cachar', 'barak'],
    pinPrefixes: ['788'],
    hubId: 'silchar',
    availability: 'active',
  },
  {
    label: 'Kolkata',
    aliases: ['kolkata', 'calcutta', 'west bengal'],
    pinPrefixes: ['700', '701'],
    hubId: 'kolkata',
    availability: 'active',
  },
  {
    label: 'Patna',
    aliases: ['patna', 'bihar'],
    pinPrefixes: ['800', '801'],
    hubId: 'patna',
    availability: 'active',
  },
  {
    label: 'Delhi NCR',
    aliases: ['delhi', 'new delhi', 'ncr', 'noida', 'gurgaon', 'gurugram', 'faridabad', 'ghaziabad'],
    pinPrefixes: ['110', '201', '122', '121'],
    hubId: 'delhi',
    availability: 'active',
  },
  {
    label: 'Bhopal',
    aliases: ['bhopal'],
    pinPrefixes: ['462'],
    hubId: 'delhi',
    availability: 'expanding',
  },
  {
    label: 'Mumbai',
    aliases: ['mumbai', 'bombay', 'thane', 'navi mumbai'],
    pinPrefixes: ['400', '401', '410'],
    hubId: 'delhi',
    availability: 'expanding',
  },
  {
    label: 'Bengaluru',
    aliases: ['bengaluru', 'bangalore'],
    pinPrefixes: ['560'],
    hubId: 'kolkata',
    availability: 'expanding',
  },
];

const METRICS = [
  { label: 'Verified Retail Points', value: '15,000+', icon: Store },
  { label: 'Authorized Distributors', value: '120+', icon: Truck },
  { label: 'Canteens & Campus Points', value: '450+', icon: Building2 },
  { label: 'On-Shelf Freshness Rate', value: '99.8%', icon: CheckCircle2 },
];

export function InteractiveMap() {
  const [activeHub, setActiveHub] = useState<CityHub>(CITY_HUBS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFeedback, setSearchFeedback] = useState<{
    title: string;
    body: string;
    tone: 'success' | 'expanding' | 'neutral';
  } | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'central' | 'hub'>('all');
  const mapStageRef = useRef<HTMLDivElement>(null);

  const filteredHubs = CITY_HUBS.filter((h) => {
    if (filterType === 'all') return true;
    if (filterType === 'central') return h.type === 'factory' || h.type === 'central';
    return h.type === 'hub';
  });

  useEffect(() => {
    const stage = mapStageRef.current;
    if (!stage) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const routes = gsap.utils.toArray<SVGPathElement>('.pio-route-path');
      routes.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: 'top 76%',
          once: true,
        },
      });

      tl.from('.pio-map-grid', { autoAlpha: 0, duration: 0.55, ease: 'power2.out' })
        .from('.pio-map-story', { autoAlpha: 0, y: 18, duration: 0.65, ease: 'power3.out' }, 0.05)
        .from('.pio-origin-node', { autoAlpha: 0, scale: 0.72, duration: 0.8, ease: 'back.out(1.7)' }, 0.18)
        .to(routes, {
          strokeDashoffset: 0,
          duration: 1.35,
          ease: 'power2.out',
          stagger: 0.12,
        }, 0.5)
        .from('.pio-city-node', { autoAlpha: 0, scale: 0.68, duration: 0.55, ease: 'back.out(1.8)', stagger: 0.06 }, 0.9)
        .from('.pio-map-product', { autoAlpha: 0, y: 18, scale: 0.9, duration: 0.7, ease: 'power3.out' }, 1.05)
        .from('.pio-map-legend', { autoAlpha: 0, y: 12, duration: 0.5, ease: 'power3.out' }, 1.2);

      gsap.to('.pio-expansion-ring', {
        scale: 1.08,
        autoAlpha: 0,
        duration: 5.5,
        ease: 'sine.out',
        repeat: -1,
        stagger: 1.6,
        transformOrigin: 'center',
      });

      gsap.to('.pio-route-bead', {
        autoAlpha: 1,
        duration: 0.8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 0.45,
      });
    }, stage);

    return () => ctx.revert();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const q = searchQuery.toLowerCase().trim();
    const digits = q.replace(/\D/g, '');
    const match = SEARCH_INDEX.find(
      (item) =>
        item.aliases.some((alias) => alias.includes(q) || q.includes(alias)) ||
        item.pinPrefixes.some((prefix) => digits.startsWith(prefix))
    );

    if (match) {
      const hub = CITY_HUBS.find((item) => item.id === match.hubId);
      if (!hub) return;

      setActiveHub(hub);
      setSearchFeedback(
        match.availability === 'active'
          ? {
              title: `${match.label} is in the active PIO network`,
              body: `Nearest serving hub: ${hub.name}. ${hub.leadTime} dispatch is mapped for this location.`,
              tone: 'success',
            }
          : {
              title: `${match.label} is being mapped for expansion`,
              body: `Nearest regional corridor: ${hub.name}. Send a supply request and the team can confirm distributor availability.`,
              tone: 'expanding',
            }
      );
      return;
    }

    setSearchFeedback({
      title: `No active hub found for "${searchQuery}" yet`,
      body: 'Share your city through the partner form and the distribution team can check supply options for your area.',
      tone: 'neutral',
    });
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="map" 
      className="relative py-10 sm:py-16 lg:py-20 overflow-hidden bg-gradient-to-b from-[#fbfaf2] via-[#eff8ef] to-[#fff7df] text-[#083b20] border-t border-emerald-900/10"
    >
      {/* 1. Ambient Luxury Glows */}
      <div className="pointer-events-none absolute -top-24 left-1/4 h-80 w-80 rounded-full bg-emerald-300/22 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-24 right-1/4 h-80 w-80 rounded-full bg-amber-300/24 blur-[110px]" />
      
      {/* Subtle Luxury Carbon Pattern */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #10b981 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================
            COMPACT LUXURY HEADER & STATS RIBBON
            ========================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 lg:mb-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-white/80 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.25em] text-[#0b8043] shadow-sm backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              Dispatch Radar & Store Locator
            </div>

            <h2 className="mt-3 font-['Space_Grotesk',sans-serif] text-[clamp(1.9rem,4.5vw,3.2rem)] font-extrabold uppercase tracking-tight text-[#083b20] leading-[1.05]">
              PIO <span className="bg-gradient-to-r from-[#0b8043] via-[#18a464] to-[#d97706] bg-clip-text text-transparent">Near You.</span>
            </h2>

            <p className="mt-1.5 text-xs sm:text-sm text-[#3b5e48] max-w-xl font-medium leading-relaxed">
              Real-time dispatch corridors from Mangaldai aseptic plant across 15,000+ verified neighborhood retail points.
            </p>
          </div>

          {/* Luxury Compact KPI Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 bg-white/70 border border-emerald-900/10 rounded-2xl p-2.5 backdrop-blur-md shadow-sm">
            {METRICS.map((m) => {
              const Icon = m.icon;
              return (
                <div key={m.label} className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#f8fdf9] border border-emerald-900/10">
                  <div className="h-7 w-7 rounded-lg bg-emerald-100 text-[#07582f] flex items-center justify-center shrink-0">
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm sm:text-base font-black font-['Space_Grotesk',sans-serif] text-[#083b20] leading-none">
                      {m.value}
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-[#3b5e48] truncate font-semibold mt-0.5">
                      {m.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================
            MAIN INTEGRATED LUXURY RADAR CONSOLE
            ========================================================= */}
        <div className="relative rounded-3xl border border-emerald-900/10 bg-white/82 shadow-[0_24px_60px_-20px_rgba(7,61,44,0.22)] backdrop-blur-xl overflow-hidden">
          
          {/* Top Console Bar */}
          <div className="flex items-center justify-between flex-wrap gap-3 px-5 py-3.5 border-b border-emerald-900/10 bg-[#f8fdf9]/85">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-300">
                <Radio className="h-4 w-4 text-[#0b8043] animate-pulse" />
                <span>Live Logistics Grid</span>
              </div>
              <span className="hidden sm:inline-block h-3 w-px bg-emerald-900/15" />
              <span className="hidden sm:inline-flex text-[10px] uppercase font-bold text-[#3b5e48] tracking-wider">
                9 Corridors Synchronized
              </span>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-emerald-50 p-1 rounded-xl border border-emerald-900/10 text-xs">
              {(['all', 'central', 'hub'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilterType(tab)}
                  className={`relative px-3 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-colors duration-200 ${
                    filterType === tab ? 'text-white' : 'text-[#3b5e48] hover:text-[#07582f]'
                  }`}
                >
                  {filterType === tab && (
                    <motion.div
                      layoutId="mapTabActive"
                      className="absolute inset-0 rounded-lg bg-[#07582f] border border-emerald-600/30 shadow-xs"
                      transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">
                    {tab === 'all' ? 'All Hubs' : tab === 'central' ? 'Metro / Plant' : 'Regional'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Cockpit Content: Split Left (Radar Map) and Right (Hub Inspector) */}
          <div className="grid lg:grid-cols-12 gap-0 items-stretch">
            
            {/* ----------------------------------------------------
                LEFT: LUXURY RADAR VECTOR MAP (Compact, High-Visual)
                ---------------------------------------------------- */}
            <div className="lg:col-span-7 relative p-3.5 sm:p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-emerald-900/10 min-h-[300px] sm:min-h-[400px]">
              
              {/* Radar Stage Container */}
              <div ref={mapStageRef} className="relative w-full h-full min-h-[260px] sm:min-h-[350px] rounded-2xl bg-[radial-gradient(circle_at_72%_38%,rgba(245,158,11,0.22),transparent_18%),radial-gradient(circle_at_28%_36%,rgba(16,185,129,0.12),transparent_26%),linear-gradient(135deg,#fffaf0_0%,#fbfff8_48%,#f4ecd2_100%)] border border-emerald-900/10 overflow-hidden flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.92),inset_0_-40px_80px_rgba(7,61,44,0.05)]">
                <div className="pio-map-grid pointer-events-none absolute inset-0 opacity-[0.018]" style={{ backgroundImage: 'linear-gradient(#073d2c 1px, transparent 1px), linear-gradient(90deg, #073d2c 1px, transparent 1px)', backgroundSize: '34px 34px' }} />
                <div className="pointer-events-none absolute left-[8%] top-[10%] h-[58%] w-[38%] rotate-[4deg] rounded-[30%_70%_55%_45%] bg-emerald-200/20 blur-[1px]" />
                <div className="pointer-events-none absolute right-[6%] top-[18%] h-[46%] w-[34%] rounded-full bg-white/42 blur-2xl" />
                <div className="pointer-events-none absolute inset-x-[18%] bottom-[10%] h-24 rounded-full bg-emerald-900/10 blur-3xl" />
                <div className="pio-map-story pointer-events-none absolute left-4 top-4 z-20 max-w-[220px] rounded-2xl border border-white/75 bg-white/62 p-4 text-left shadow-[0_18px_42px_rgba(7,61,44,0.10)] backdrop-blur-md">
                  <div className="text-[9px] font-black uppercase tracking-[0.24em] text-[#0b8043]">PIO Distribution Network</div>
                  <div className="mt-2 text-2xl font-black leading-[0.95] tracking-tight text-[#073d2c]" style={{ fontFamily: 'var(--font-display)' }}>
                    From Assam,<br />Across India.
                  </div>
                  <p className="mt-2 text-[11px] font-semibold leading-relaxed text-[#3b5e48]">
                    Born in Mangaldai and moving outward through a growing distribution network.
                  </p>
                </div>
                
                {/* 1. Radar Circular Target Rings */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="h-[90%] aspect-square rounded-full border border-emerald-500/10 shadow-[0_0_60px_rgba(16,185,129,0.08)]" />
                  <div className="absolute h-[65%] aspect-square rounded-full border border-emerald-500/16" />
                  <div className="absolute h-[40%] aspect-square rounded-full border border-emerald-500/24" />
                  <div className="absolute h-[15%] aspect-square rounded-full border border-emerald-400/40 bg-white/25" />
                  {/* Crosshairs */}
                  <div className="absolute w-full h-px bg-emerald-500/10" />
                  <div className="absolute h-full w-px bg-emerald-500/10" />
                </div>

                {/* 2. Rotating Radar Sweep Light Beam */}
                <motion.div
                  className="pointer-events-none absolute inset-0 flex items-center justify-center origin-center"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                >
                  <div 
                    className="w-1/2 h-1/2 absolute top-0 right-0 origin-bottom-left"
                    style={{
                      background: 'conic-gradient(from 0deg, transparent 0deg, transparent 268deg, rgba(245, 158, 11, 0.16) 326deg, rgba(16,185,129,0.16) 346deg, transparent 360deg)',
                    }}
                  />
                </motion.div>

                {/* 3. Subtle India & Transit Vector Lines */}
                <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full pointer-events-none">
                  <defs>
                    <linearGradient id="routeGold" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.75" />
                    </linearGradient>
                    <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="0.7" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <path
                    d="M 21 22 C 36 13, 60 15, 74 25 C 91 37, 82 55, 64 61 C 49 66, 44 84, 37 84 C 30 76, 26 61, 20 47 C 16 38, 14 29, 21 22 Z"
                    fill="rgba(255,255,255,0.32)"
                    stroke="#073d2c"
                    strokeWidth="0.28"
                    className="opacity-20"
                  />
                  {/* Subtle Coastline outline */}
                  <path
                    d="M 20 25 Q 35 18, 55 26 T 70 34 Q 85 30, 92 42 T 75 56 Q 60 62, 54 78 T 40 85 Q 28 65, 20 45 Z"
                    fill="rgba(16,185,129,0.055)"
                    stroke="#059669"
                    strokeWidth="0.45"
                    strokeDasharray="1.6 2.4"
                    className="opacity-55"
                  />

                  {/* Flowing Laser Transit Lines radiating from Mangaldai (72, 38) */}
                  <g className="opacity-90" filter="url(#routeGlow)">
                    <path className="pio-route-path" d="M72 38 C70 40,70 40,69 41" fill="none" stroke="url(#routeGold)" strokeWidth="1" strokeLinecap="round" />
                    <path className="pio-route-path" d="M72 38 C76 33,79 31,82 32" fill="none" stroke="#10b981" strokeWidth="0.78" strokeLinecap="round" />
                    <path className="pio-route-path" d="M72 38 C74 35,76 35,77 36" fill="none" stroke="#10b981" strokeWidth="0.78" strokeLinecap="round" />
                    <path className="pio-route-path" d="M72 38 C73 36,73 35,73 35" fill="none" stroke="#10b981" strokeWidth="0.78" strokeLinecap="round" />
                    <path className="pio-route-path" d="M72 38 C74 44,73 48,71 49" fill="none" stroke="#10b981" strokeWidth="0.78" strokeLinecap="round" />
                    <path className="pio-route-path" d="M69 41 C66 48,62 53,58 56" fill="none" stroke="url(#routeGold)" strokeWidth="1" strokeLinecap="round" />
                    <path className="pio-route-path" d="M58 56 C55 49,52 45,48 44" fill="none" stroke="#10b981" strokeWidth="0.78" strokeLinecap="round" />
                    <path className="pio-route-path" d="M48 44 C40 36,34 34,28 36" fill="none" stroke="url(#routeGold)" strokeWidth="1" strokeLinecap="round" />
                    <circle className="pio-route-bead" r="1.2" fill="#fff7ad" opacity="0">
                      <animateMotion dur="5.6s" repeatCount="indefinite" path="M72 38 C76 33,79 31,82 32" />
                    </circle>
                    <circle className="pio-route-bead" r="1.1" fill="#10b981" opacity="0">
                      <animateMotion dur="6.8s" repeatCount="indefinite" path="M69 41 C66 48,62 53,58 56" />
                    </circle>
                  </g>
                </svg>

                <div className="pointer-events-none absolute left-[67%] top-[32%] h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-400/25 bg-emerald-300/10 shadow-[0_0_48px_rgba(16,185,129,0.22)]" />
                <div className="pio-expansion-ring pointer-events-none absolute left-[72%] top-[38%] h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-400/40 bg-amber-300/10" />
                <div className="pio-expansion-ring pointer-events-none absolute left-[72%] top-[38%] h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-400/25" />
                <div className="pio-map-product pointer-events-none absolute right-[8%] bottom-[16%] z-10 hidden items-end gap-0 sm:flex">
                  <img src="/images/pio-mango.png" alt="" draggable={false} className="h-24 w-auto -rotate-[7deg] object-contain drop-shadow-[0_18px_24px_rgba(7,61,44,0.20)]" />
                  <img src="/images/pio-lychee.png" alt="" draggable={false} className="-ml-8 h-20 w-auto rotate-[7deg] object-contain drop-shadow-[0_18px_24px_rgba(7,61,44,0.18)]" />
                </div>

                {/* 4. Interactive Glowing City Hub Nodes */}
                {filteredHubs.map((hub) => {
                  const isSelected = activeHub.id === hub.id;
                  const isFactory = hub.type === 'factory';

                  return (
                    <button
                      key={hub.id}
                      onClick={() => setActiveHub(hub)}
                      style={{ left: `${hub.x}%`, top: `${hub.y}%` }}
                      className={`${isFactory ? 'pio-origin-node' : 'pio-city-node'} group absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none z-20 cursor-pointer p-2`}
                      aria-label={`Select hub ${hub.name}`}
                    >
                      {/* Pulse Ping */}
                      <span
                        className={`absolute inset-1 rounded-full animate-ping ${
                          isFactory 
                            ? 'bg-amber-400 opacity-70' 
                            : isSelected 
                            ? 'bg-emerald-400 opacity-60' 
                            : 'bg-emerald-500/20 opacity-0 group-hover:opacity-40'
                        }`}
                      />

                      {/* Luxury Pin Ring */}
                      <motion.div
                        animate={{ scale: isSelected ? 1.25 : 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        className={`relative flex items-center justify-center rounded-full transition-all duration-200 ${
                          isSelected
                            ? 'h-9 w-9 bg-gradient-to-tr from-emerald-500 to-teal-300 text-[#042414] shadow-[0_0_26px_rgba(16,185,129,0.75)] ring-4 ring-white/85'
                            : isFactory
                            ? 'h-11 w-11 bg-gradient-to-tr from-amber-500 to-yellow-200 text-[#422006] shadow-[0_0_34px_rgba(245,158,11,0.72)] ring-4 ring-white/90'
                            : 'h-5 w-5 bg-[#04301f] text-emerald-200 border border-white/50 hover:border-emerald-300 hover:scale-110 shadow-[0_8px_18px_rgba(7,61,44,0.18)]'
                        }`}
                      >
                        <MapPin className={`${isSelected ? 'h-4 w-4' : isFactory ? 'h-3.5 w-3.5' : 'h-3 w-3'}`} />
                      </motion.div>

                      {/* Micro Pill Label */}
                      <span
                        className={`absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-2 py-1 text-[8.5px] font-extrabold uppercase tracking-wider transition-all pointer-events-none shadow-md ${
                          isSelected
                            ? 'bg-emerald-400 text-[#042414] font-black scale-105 ring-2 ring-white/70'
                            : isFactory
                            ? 'bg-amber-100 text-[#7c4a03] border border-amber-300/60'
                            : 'bg-white/95 text-[#07582f] border border-emerald-900/10 opacity-0 group-hover:opacity-100 group-hover:text-[#083b20] group-hover:border-emerald-500/40'
                        }`}
                      >
                        {isFactory ? (
                          <>
                            <span className="block">{hub.name}</span>
                            <span className="block text-[7px] tracking-[0.18em] opacity-70">ORIGIN / ASSAM</span>
                          </>
                        ) : hub.name}
                      </span>
                    </button>
                  );
                })}

                {/* Floating Legend */}
                <div className="pio-map-legend absolute bottom-4 left-4 z-20 flex flex-wrap items-center gap-3 text-[10px] font-black uppercase tracking-[0.16em] text-[#3b5e48] pointer-events-none">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.75)]" />
                    Origin
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.65)]" />
                    Active Hub
                  </span>
                  <span className="hidden sm:flex items-center gap-1.5">
                    <span className="h-px w-5 bg-gradient-to-r from-amber-400 to-emerald-400" />
                    Expanding Network
                  </span>
                </div>

              </div>

            </div>

            {/* ----------------------------------------------------
                RIGHT: LUXURY HUB INSPECTOR & SMART LOCATOR
                ---------------------------------------------------- */}
            <div className="lg:col-span-5 p-3.5 sm:p-5 lg:p-6 flex flex-col justify-start bg-[#f8fdf9] gap-3.5 sm:gap-5 min-w-0">
              
              {/* Quick Hub Switcher Strip (Horizontal Scroll on Mobile) */}
              <div className="min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#3b5e48]">
                    Quick Select Hub
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400">
                    {CITY_HUBS.length} Locations
                  </span>
                </div>

                <div className="flex gap-1.5 overflow-x-auto pb-1.5 scrollbar-none no-scrollbar">
                  {CITY_HUBS.map((hub) => {
                    const isSelected = activeHub.id === hub.id;
                    return (
                      <button
                        key={hub.id}
                        onClick={() => {
                          setActiveHub(hub);
                          setSearchFeedback(null);
                        }}
                        className={`relative px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all duration-150 shrink-0 ${
                          isSelected 
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-black shadow-xs font-black' 
                            : 'bg-white text-[#3b5e48] hover:bg-emerald-50 hover:text-[#07582f] border border-emerald-900/10'
                        }`}
                      >
                        {hub.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Hub Card (Fluid Motion Transition) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeHub.id}
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.98 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="rounded-2xl border border-emerald-900/10 bg-white p-3.5 sm:p-5 shadow-lg relative overflow-hidden min-w-0"
                >
                  {/* Subtle card glow */}
                  <div className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full bg-emerald-500/15 blur-2xl" />

                  <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 text-[9.5px] sm:text-[10px] font-black uppercase tracking-wider text-[#07582f] bg-emerald-50 border border-emerald-900/10 px-2.5 py-0.5 rounded-full">
                      <Sparkles className="h-3 w-3 text-amber-300 shrink-0" />
                      <span>{activeHub.status}</span>
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-bold text-[#3b5e48]">
                      {activeHub.state}
                    </span>
                  </div>

                  <h3 className="font-['Space_Grotesk',sans-serif] text-xl sm:text-2xl lg:text-3xl font-black uppercase tracking-tight text-[#083b20] leading-tight break-words">
                    {activeHub.name}
                  </h3>
                  <p className="text-xs text-[#3b5e48] font-medium mt-0.5 break-words">
                    {activeHub.distributors}
                  </p>

                  {/* 2-Cell Mini Specs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 sm:mt-4 pt-3 border-t border-white/10">
                    <div className="rounded-xl bg-white/[0.03] border border-white/5 p-2 sm:p-2.5">
                      <div className="flex items-center gap-1 text-[9px] uppercase tracking-wider text-[#3b5e48] font-bold">
                        <Store className="h-3 w-3 text-emerald-400 shrink-0" />
                        <span>Network Capacity</span>
                      </div>
                      <div className="text-xs sm:text-sm font-black text-[#083b20] mt-1">
                        {activeHub.stores}
                      </div>
                    </div>

                    <div className="rounded-xl bg-white/[0.03] border border-white/5 p-2 sm:p-2.5">
                      <div className="flex items-center gap-1 text-[9px] uppercase tracking-wider text-[#3b5e48] font-bold">
                        <Clock className="h-3 w-3 text-amber-300 shrink-0" />
                        <span>Fulfillment Lead</span>
                      </div>
                      <div className="text-xs sm:text-sm font-black text-amber-300 mt-1">
                        {activeHub.leadTime}
                      </div>
                    </div>
                  </div>

                  {/* Quick Action Button */}
                  <button
                    onClick={() => scrollToSection('partner')}
                    className="mt-3.5 sm:mt-4 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-black py-2.5 px-3 text-[11px] sm:text-xs font-black uppercase tracking-wider shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all active:scale-[0.99] cursor-pointer text-center"
                  >
                    <span className="truncate">Supply PIO to Your Counter in {activeHub.name}</span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                  </button>
                </motion.div>
              </AnimatePresence>

              {/* Integrated Sleek Search Bar */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 sm:p-3.5">
                <form onSubmit={handleSearch} className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#07582f]/50" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setSearchFeedback(null);
                      }}
                      placeholder="Search city, district, or pin code..."
                      className="w-full rounded-xl border border-emerald-900/10 bg-white pl-8 pr-3 py-2 text-xs text-[#083b20] placeholder:text-[#3b5e48]/50 focus:outline-none focus:border-[#07582f] focus:ring-1 focus:ring-[#07582f]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="rounded-xl bg-[#07582f] hover:bg-[#096d3a] text-white px-3 py-2 text-xs font-bold transition-all shrink-0 cursor-pointer"
                  >
                    Locate
                  </button>
                </form>

                {searchFeedback && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className={`mt-2 rounded-xl border p-2.5 text-[11px] font-semibold ${
                      searchFeedback.tone === 'success'
                        ? 'border-emerald-400/20 bg-emerald-500/10 text-emerald-200'
                        : searchFeedback.tone === 'expanding'
                        ? 'border-amber-300/20 bg-amber-300/10 text-amber-100'
                        : 'border-white/10 bg-white/[0.04] text-emerald-100/75'
                    }`}
                  >
                    <div className="flex items-start gap-1.5">
                      <CheckCircle2 className="mt-0.5 h-3 w-3 text-emerald-400 shrink-0" />
                      <div>
                        <div className="font-black">{searchFeedback.title}</div>
                        <div className="mt-0.5 leading-relaxed">{searchFeedback.body}</div>
                      </div>
                    </div>
                    {searchFeedback.tone !== 'success' && (
                      <button
                        type="button"
                        onClick={() => scrollToSection('partner')}
                        className="mt-2 inline-flex items-center gap-1 rounded-lg bg-white/10 px-2.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-white transition-colors hover:bg-emerald-500 hover:text-black"
                      >
                        Send Supply Request
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    )}
                  </motion.div>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
