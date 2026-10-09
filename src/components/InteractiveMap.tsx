import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Search, Building2, Store, Truck, CheckCircle2, ArrowRight, Sparkles, Navigation } from 'lucide-react';

interface CityHub {
  id: string;
  name: string;
  state: string;
  type: 'factory' | 'central' | 'hub';
  stores: string;
  distributors: string;
  status: string;
  x: number; // percentage in SVG map coordinate space
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
    x: 28,
    y: 36,
  },
];

const METRICS = [
  { label: 'Verified Retail Points', value: '15,000+', icon: Store },
  { label: 'Authorized Distributors', value: '120+', icon: Truck },
  { label: 'School & College Canteens', value: '450+', icon: Building2 },
  { label: 'On-Shelf Freshness Rate', value: '99.8%', icon: CheckCircle2 },
];

export function InteractiveMap() {
  const [activeHub, setActiveHub] = useState<CityHub>(CITY_HUBS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const query = searchQuery.toLowerCase().trim();
    const found = CITY_HUBS.find(
      (h) => h.name.toLowerCase().includes(query) || h.state.toLowerCase().includes(query)
    );

    if (found) {
      setActiveHub(found);
      setSearchResult(`Found active distribution hub in ${found.name}, ${found.state}! Over ${found.stores} active.`);
    } else {
      setSearchResult(`PIO is expanding to "${searchQuery}"! We deliver bulk orders to your location via our regional hub.`);
    }
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="map" className="relative py-20 lg:py-28 overflow-hidden bg-[#f7fbf8] border-t border-emerald-900/10">
      {/* Decorative ambient gradients */}
      <div className="pointer-events-none absolute top-10 left-10 h-96 w-96 rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-96 w-96 rounded-full bg-amber-200/25 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-900/15 bg-white/95 px-4 py-1.5 text-xs font-black uppercase tracking-[0.25em] text-[#07582f] shadow-xs backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-[#f59e0b]" />
            Retail Network & Store Locator
          </span>
          <h2 className="mt-4 font-['Space_Grotesk',sans-serif] text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#083b20] leading-[0.95]">
            Where to Find
            <span className="block text-[#07582f]">PIO Near You.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#325340] font-semibold leading-relaxed">
            From our state-of-the-art aseptic plant in Mangaldai to 15,000+ everyday neighborhood grocery counters and school canteens across India.
          </p>
        </div>

        {/* 4 Metric Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {METRICS.map((m) => (
            <motion.div
              key={m.label}
              whileHover={{ y: -4 }}
              className="p-5 rounded-3xl bg-white border border-emerald-900/10 shadow-sm flex items-center gap-4 transition-all"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef8f1] text-[#07582f] shrink-0">
                <m.icon className="h-6 w-6" />
              </div>
              <div>
                <div className="font-['Space_Grotesk',sans-serif] text-2xl sm:text-3xl font-black text-[#083b20]">
                  {m.value}
                </div>
                <div className="text-xs font-bold text-slate-500 leading-snug">
                  {m.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Map & Hub Explorer Split Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Interactive Vector Map Visual */}
          <div className="lg:col-span-7 relative rounded-[32px] border border-emerald-900/15 bg-gradient-to-br from-[#ffffff] via-[#f4faf5] to-[#ebf8ee] p-6 sm:p-8 shadow-md flex flex-col justify-between overflow-hidden">
            
            {/* Map Top Bar */}
            <div className="flex items-center justify-between flex-wrap gap-2 mb-4 relative z-10">
              <div className="flex items-center gap-2">
                <Navigation className="h-4 w-4 text-[#07582f]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#083b20]">
                  Interactive Distribution Network
                </span>
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#07582f] bg-emerald-100/80 px-2.5 py-1 rounded-full">
                Live Hubs: 9 Key Centers
              </span>
            </div>

            {/* Stylized SVG Map Container */}
            <div className="relative w-full h-[360px] sm:h-[440px] rounded-2xl bg-[#093d22]/5 border border-emerald-900/10 overflow-hidden flex items-center justify-center">
              
              {/* Subtle Map Grid Lines */}
              <svg className="absolute inset-0 h-full w-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#07582f" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#mapGrid)" />
              </svg>

              {/* Stylized India & Assam Regional Outline Curves */}
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full pointer-events-none opacity-40">
                <path
                  d="M 20 25 Q 35 18, 55 26 T 70 34 Q 85 30, 92 42 T 75 56 Q 60 62, 54 78 T 40 85 Q 28 65, 20 45 Z"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="0.8"
                  strokeDasharray="2 2"
                />
                {/* Connecting Transit Network Corridors */}
                <path
                  d="M 28 36 L 48 44 L 58 56 L 69 41 L 72 38 L 82 32"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="0.6"
                />
              </svg>

              {/* Pulsating City Pins on the Map */}
              {CITY_HUBS.map((hub) => {
                const isSelected = activeHub.id === hub.id;
                const isFactory = hub.type === 'factory';

                return (
                  <button
                    key={hub.id}
                    onClick={() => setActiveHub(hub)}
                    style={{ left: `${hub.x}%`, top: `${hub.y}%` }}
                    className="group absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none z-20 cursor-pointer"
                  >
                    {/* Pulsing Radar Ring */}
                    <span
                      className={`absolute -inset-2 rounded-full animate-ping opacity-60 ${
                        isFactory ? 'bg-amber-400' : isSelected ? 'bg-emerald-400' : 'bg-emerald-200'
                      }`}
                    />

                    {/* Pin Outer Ring */}
                    <div
                      className={`relative flex items-center justify-center rounded-full transition-all duration-200 shadow-md ${
                        isSelected
                          ? 'h-9 w-9 bg-[#07582f] text-white ring-4 ring-emerald-200 scale-110'
                          : isFactory
                          ? 'h-8 w-8 bg-amber-500 text-white ring-2 ring-amber-200'
                          : 'h-6 w-6 bg-white text-[#07582f] border border-emerald-900/20 hover:scale-110'
                      }`}
                    >
                      <MapPin className={`${isSelected ? 'h-5 w-5' : 'h-3.5 w-3.5'}`} />
                    </div>

                    {/* City Floating Label Tag */}
                    <span
                      className={`absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider transition-all shadow-xs ${
                        isSelected
                          ? 'bg-[#07582f] text-white scale-105'
                          : 'bg-white/95 text-[#083b20] border border-emerald-900/10 group-hover:bg-[#07582f] group-hover:text-white'
                      }`}
                    >
                      {hub.name}
                    </span>
                  </button>
                );
              })}

            </div>

            {/* Map Legend */}
            <div className="mt-4 pt-3 border-t border-emerald-900/10 flex items-center justify-between text-xs text-slate-600 flex-wrap gap-2">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 font-bold">
                  <span className="h-3 w-3 rounded-full bg-amber-500" />
                  Factory & HQ (Mangaldai)
                </span>
                <span className="flex items-center gap-1.5 font-bold">
                  <span className="h-3 w-3 rounded-full bg-[#07582f]" />
                  Active Distribution Hubs
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-semibold">
                Click any pin to view details
              </span>
            </div>

          </div>

          {/* Right Column: Active Hub Info Card & Search Locator */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Pincode & City Search Form */}
            <div className="rounded-3xl border border-emerald-900/10 bg-white p-6 shadow-sm">
              <h3 className="font-['Space_Grotesk',sans-serif] text-xl font-black uppercase text-[#083b20] mb-2">
                Locate Nearby Retailer
              </h3>
              <p className="text-xs text-slate-600 mb-4 font-medium">
                Enter your city or pin code to find verified PIO stockists and retail racks.
              </p>

              <form onSubmit={handleSearch} className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setSearchResult(null);
                    }}
                    placeholder="e.g. Guwahati, Jorhat, 784125"
                    className="w-full rounded-2xl border border-emerald-900/15 bg-[#f9fdfa] pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#07582f] focus:ring-1 focus:ring-[#07582f]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[#07582f] hover:bg-[#096d3a] text-white py-3 text-xs font-black uppercase tracking-wider shadow-sm transition-all"
                >
                  <span>Search Availability</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </form>

              {searchResult && (
                <div className="mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-[#07582f] font-bold">
                  {searchResult}
                </div>
              )}
            </div>

            {/* Selected Active Hub Detail Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeHub.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl border border-emerald-900/15 bg-gradient-to-br from-[#ffffff] to-[#f3faf5] p-6 sm:p-7 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#07582f] bg-emerald-100/90 px-3 py-1 rounded-full">
                    {activeHub.status}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    {activeHub.state}
                  </span>
                </div>

                <div>
                  <h3 className="font-['Space_Grotesk',sans-serif] text-2xl sm:text-3xl font-black uppercase text-[#083b20]">
                    {activeHub.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-[#294e36] mt-0.5">
                    {activeHub.distributors}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-emerald-900/10">
                  <div className="p-3 rounded-2xl bg-white border border-emerald-900/10">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                      Active Presence
                    </span>
                    <span className="text-base font-black text-[#07582f]">
                      {activeHub.stores}
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-white border border-emerald-900/10">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                      Replenishment
                    </span>
                    <span className="text-base font-black text-amber-700">
                      Daily Aseptic
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => scrollToSection('partner')}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[#082416] hover:bg-[#07582f] text-white py-3 text-xs font-black uppercase tracking-wider shadow-sm transition-all"
                >
                  <span>Supply PIO to Your Counter in {activeHub.name}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </motion.div>
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
