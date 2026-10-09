import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

const METRICS = [
  { label: 'Verified Retail Points', value: '15,000+', icon: Store },
  { label: 'Authorized Distributors', value: '120+', icon: Truck },
  { label: 'Canteens & Campus Points', value: '450+', icon: Building2 },
  { label: 'On-Shelf Freshness Rate', value: '99.8%', icon: CheckCircle2 },
];

export function InteractiveMap() {
  const [activeHub, setActiveHub] = useState<CityHub>(CITY_HUBS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFeedback, setSearchFeedback] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'central' | 'hub'>('all');

  const filteredHubs = CITY_HUBS.filter((h) => {
    if (filterType === 'all') return true;
    if (filterType === 'central') return h.type === 'factory' || h.type === 'central';
    return h.type === 'hub';
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const q = searchQuery.toLowerCase().trim();
    const found = CITY_HUBS.find(
      (h) => h.name.toLowerCase().includes(q) || h.state.toLowerCase().includes(q)
    );

    if (found) {
      setActiveHub(found);
      setSearchFeedback(`Matched: ${found.name} (${found.status})`);
    } else {
      setSearchFeedback(`Route mapped for "${searchQuery}" via nearest regional corridor`);
    }
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="map" 
      className="relative py-12 sm:py-16 lg:py-20 overflow-hidden bg-gradient-to-b from-[#03150c] via-[#062013] to-[#04170d] text-white border-t border-emerald-500/15"
    >
      {/* 1. Ambient Luxury Glows */}
      <div className="pointer-events-none absolute -top-24 left-1/4 h-80 w-80 rounded-full bg-emerald-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-24 right-1/4 h-80 w-80 rounded-full bg-amber-400/10 blur-[110px]" />
      
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
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-950/60 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.25em] text-[#34d399] shadow-inner backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              Dispatch Radar & Store Locator
            </div>

            <h2 className="mt-3 font-['Space_Grotesk',sans-serif] text-[clamp(1.9rem,4.5vw,3.2rem)] font-extrabold uppercase tracking-tight text-white leading-[1.05]">
              PIO <span className="bg-gradient-to-r from-emerald-400 via-teal-200 to-amber-300 bg-clip-text text-transparent">Near You.</span>
            </h2>

            <p className="mt-1.5 text-xs sm:text-sm text-emerald-100/70 max-w-xl font-medium leading-relaxed">
              Real-time dispatch corridors from Mangaldai aseptic plant across 15,000+ verified neighborhood retail points.
            </p>
          </div>

          {/* Luxury Compact KPI Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 bg-white/[0.04] border border-white/10 rounded-2xl p-2.5 backdrop-blur-md">
            {METRICS.map((m) => {
              const Icon = m.icon;
              return (
                <div key={m.label} className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-black/20 border border-white/5">
                  <div className="h-7 w-7 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm sm:text-base font-black font-['Space_Grotesk',sans-serif] text-white leading-none">
                      {m.value}
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-emerald-200/60 truncate font-semibold mt-0.5">
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
        <div className="relative rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-[#0a2919]/80 via-[#051c11]/90 to-[#03150c]/95 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] backdrop-blur-xl overflow-hidden">
          
          {/* Top Console Bar */}
          <div className="flex items-center justify-between flex-wrap gap-3 px-5 py-3.5 border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-300">
                <Radio className="h-4 w-4 text-emerald-400 animate-pulse" />
                <span>Live Logistics Grid</span>
              </div>
              <span className="hidden sm:inline-block h-3 w-px bg-white/15" />
              <span className="hidden sm:inline-flex text-[10px] uppercase font-bold text-emerald-200/50 tracking-wider">
                9 Corridors Synchronized
              </span>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10 text-xs">
              {(['all', 'central', 'hub'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilterType(tab)}
                  className={`relative px-3 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-colors duration-200 ${
                    filterType === tab ? 'text-white' : 'text-emerald-200/50 hover:text-white'
                  }`}
                >
                  {filterType === tab && (
                    <motion.div
                      layoutId="mapTabActive"
                      className="absolute inset-0 rounded-lg bg-emerald-600/80 border border-emerald-400/30 shadow-xs"
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
            <div className="lg:col-span-7 relative p-4 sm:p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 min-h-[340px] sm:min-h-[400px]">
              
              {/* Radar Stage Container */}
              <div className="relative w-full h-full min-h-[300px] sm:min-h-[350px] rounded-2xl bg-black/40 border border-emerald-500/15 overflow-hidden flex items-center justify-center">
                
                {/* 1. Radar Circular Target Rings */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="h-[90%] aspect-square rounded-full border border-emerald-500/10" />
                  <div className="absolute h-[65%] aspect-square rounded-full border border-emerald-500/15" />
                  <div className="absolute h-[40%] aspect-square rounded-full border border-emerald-500/20" />
                  <div className="absolute h-[15%] aspect-square rounded-full border border-emerald-400/30" />
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
                      background: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(16, 185, 129, 0.18) 360deg)',
                    }}
                  />
                </motion.div>

                {/* 3. Subtle India & Transit Vector Lines */}
                <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full pointer-events-none">
                  {/* Subtle Coastline outline */}
                  <path
                    d="M 20 25 Q 35 18, 55 26 T 70 34 Q 85 30, 92 42 T 75 56 Q 60 62, 54 78 T 40 85 Q 28 65, 20 45 Z"
                    fill="none"
                    stroke="#059669"
                    strokeWidth="0.6"
                    strokeDasharray="2 3"
                    className="opacity-30"
                  />

                  {/* Flowing Laser Transit Lines radiating from Mangaldai (72, 38) */}
                  <g className="opacity-70">
                    <line x1="72" y1="38" x2="69" y2="41" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="1.5 2" />
                    <line x1="72" y1="38" x2="82" y2="32" stroke="#10b981" strokeWidth="0.6" strokeDasharray="1 2" />
                    <line x1="72" y1="38" x2="77" y2="36" stroke="#10b981" strokeWidth="0.6" strokeDasharray="1 2" />
                    <line x1="72" y1="38" x2="73" y2="35" stroke="#10b981" strokeWidth="0.6" strokeDasharray="1 2" />
                    <line x1="72" y1="38" x2="71" y2="49" stroke="#10b981" strokeWidth="0.6" strokeDasharray="1 2" />
                    <line x1="69" y1="41" x2="58" y2="56" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="2 2" />
                    <line x1="58" y1="56" x2="48" y2="44" stroke="#10b981" strokeWidth="0.6" strokeDasharray="2 2" />
                    <line x1="48" y1="44" x2="28" y2="36" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="2 2" />
                  </g>
                </svg>

                {/* 4. Interactive Glowing City Hub Nodes */}
                {filteredHubs.map((hub) => {
                  const isSelected = activeHub.id === hub.id;
                  const isFactory = hub.type === 'factory';

                  return (
                    <button
                      key={hub.id}
                      onClick={() => setActiveHub(hub)}
                      style={{ left: `${hub.x}%`, top: `${hub.y}%` }}
                      className="group absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none z-20 cursor-pointer p-2"
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
                            ? 'h-8 w-8 bg-gradient-to-tr from-emerald-500 to-teal-300 text-black shadow-[0_0_20px_rgba(16,185,129,0.8)] ring-2 ring-white'
                            : isFactory
                            ? 'h-7 w-7 bg-gradient-to-tr from-amber-500 to-yellow-300 text-black shadow-[0_0_15px_rgba(245,158,11,0.6)] ring-1 ring-amber-200'
                            : 'h-5 w-5 bg-[#041a10] text-emerald-400 border border-emerald-400/40 hover:border-emerald-300 hover:scale-110 shadow-xs'
                        }`}
                      >
                        <MapPin className={`${isSelected ? 'h-4 w-4' : isFactory ? 'h-3.5 w-3.5' : 'h-3 w-3'}`} />
                      </motion.div>

                      {/* Micro Pill Label */}
                      <span
                        className={`absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md px-1.5 py-0.5 text-[8.5px] font-extrabold uppercase tracking-wider transition-all pointer-events-none shadow-md ${
                          isSelected
                            ? 'bg-emerald-400 text-black font-black scale-105 ring-1 ring-white/50'
                            : 'bg-black/80 text-emerald-100/80 border border-white/10 group-hover:text-white group-hover:border-emerald-400/40'
                        }`}
                      >
                        {hub.name}
                      </span>
                    </button>
                  );
                })}

                {/* Map Bottom Quick Indicator */}
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[10px] text-emerald-200/60 pointer-events-none bg-black/40 px-2.5 py-1 rounded-lg backdrop-blur-xs border border-white/5">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5 font-bold text-amber-300">
                      <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b]" />
                      Factory & Origin
                    </span>
                    <span className="flex items-center gap-1.5 font-bold text-emerald-300">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]" />
                      Active Hubs
                    </span>
                  </div>
                  <span className="hidden sm:inline-block text-[9px] uppercase tracking-widest text-emerald-200/40">
                    Touch any node
                  </span>
                </div>

              </div>

            </div>

            {/* ----------------------------------------------------
                RIGHT: LUXURY HUB INSPECTOR & SMART LOCATOR
                ---------------------------------------------------- */}
            <div className="lg:col-span-5 p-5 sm:p-6 flex flex-col justify-between bg-black/20 gap-5">
              
              {/* Quick Hub Switcher Strip (Horizontal Scroll on Mobile) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-200/50">
                    Quick Select Hub
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400">
                    {CITY_HUBS.length} Verified Locations
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
                            : 'bg-white/5 text-emerald-100/70 hover:bg-white/10 hover:text-white border border-white/5'
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
                  className="rounded-2xl border border-emerald-400/20 bg-gradient-to-br from-emerald-950/60 via-black/40 to-black/60 p-4 sm:p-5 shadow-lg relative overflow-hidden"
                >
                  {/* Subtle card glow */}
                  <div className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full bg-emerald-500/15 blur-2xl" />

                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-300 bg-emerald-900/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                      <Sparkles className="h-3 w-3 text-amber-300" />
                      {activeHub.status}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-200/60">
                      {activeHub.state}
                    </span>
                  </div>

                  <h3 className="font-['Space_Grotesk',sans-serif] text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-tight">
                    {activeHub.name}
                  </h3>
                  <p className="text-xs text-emerald-200/80 font-medium mt-0.5">
                    {activeHub.distributors}
                  </p>

                  {/* 2-Cell Mini Specs */}
                  <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-white/10">
                    <div className="rounded-xl bg-white/[0.03] border border-white/5 p-2.5">
                      <div className="flex items-center gap-1 text-[9px] uppercase tracking-wider text-emerald-200/50 font-bold">
                        <Store className="h-3 w-3 text-emerald-400" />
                        Network Capacity
                      </div>
                      <div className="text-xs sm:text-sm font-black text-white mt-1">
                        {activeHub.stores}
                      </div>
                    </div>

                    <div className="rounded-xl bg-white/[0.03] border border-white/5 p-2.5">
                      <div className="flex items-center gap-1 text-[9px] uppercase tracking-wider text-emerald-200/50 font-bold">
                        <Clock className="h-3 w-3 text-amber-300" />
                        Fulfillment Lead
                      </div>
                      <div className="text-xs sm:text-sm font-black text-amber-300 mt-1">
                        {activeHub.leadTime}
                      </div>
                    </div>
                  </div>

                  {/* Quick Action Button */}
                  <button
                    onClick={() => scrollToSection('partner')}
                    className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-black py-2.5 px-4 text-xs font-black uppercase tracking-wider shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all active:scale-[0.99] cursor-pointer"
                  >
                    <span>Supply PIO to Your Counter in {activeHub.name}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </motion.div>
              </AnimatePresence>

              {/* Integrated Sleek Search Bar */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 sm:p-3.5">
                <form onSubmit={handleSearch} className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-emerald-200/40" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setSearchFeedback(null);
                      }}
                      placeholder="Search city, district, or pin code..."
                      className="w-full rounded-xl border border-white/10 bg-black/40 pl-8 pr-3 py-2 text-xs text-white placeholder:text-emerald-200/40 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="rounded-xl bg-white/10 hover:bg-emerald-500 hover:text-black text-white px-3 py-2 text-xs font-bold transition-all shrink-0 cursor-pointer"
                  >
                    Locate
                  </button>
                </form>

                {searchFeedback && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-2 text-[11px] text-emerald-300 font-semibold flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
                    <span>{searchFeedback}</span>
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
