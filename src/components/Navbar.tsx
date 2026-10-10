import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import { useScrolled, useActiveSection } from '@/hooks/useScrollReveal';
import { fizzAudio } from '@/utils/audio';

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'story', label: 'Our Story' },
  { id: 'flavours', label: 'Products' },
  { id: 'tetra-experience', label: 'Manufacturing & Quality' },
  { id: 'partner', label: 'Partner With Us' },
  { id: 'contact', label: 'Contact Us' },
];

export function Navbar() {
  const scrolled = useScrolled(20);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(NAV_LINKS.map((l) => l.id));

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const go = (id: string) => { 
    setOpen(false); 
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); 
  };

  const handleFizz = () => {
    fizzAudio.playFizz();
  };

  return (
    <>
      <header 
        className={`fixed z-50 transition-all duration-300 ${
          'top-2.5 left-3 right-3 lg:top-0 lg:left-0 lg:right-0 lg:w-full'
        }`}
      >
        <div 
          className={`mx-auto max-w-7xl transition-all duration-300 rounded-full lg:rounded-[1.25rem] ${
            scrolled || open
              ? 'bg-[#f8f6ef]/80 backdrop-blur-xl shadow-[0_12px_35px_rgba(7,61,44,0.12)] border border-[#0a3d2d]/10' 
              : 'bg-[#f8f6ef]/70 backdrop-blur-md border border-[#0a3d2d]/10'
          }`}
        >
          <nav className="flex items-center justify-between px-4 py-2.5 sm:px-6 lg:px-8 lg:py-3 min-h-[56px] lg:min-h-[64px]">
            
            {/* Brand Logo */}
            <button 
              onClick={() => go('home')} 
              className="group flex items-center gap-2 cursor-pointer focus:outline-none" 
              aria-label="Go to PIO home"
            >
              <span className="relative flex h-11 w-[82px] items-center justify-center rounded-full border border-emerald-900/10 bg-white/70 px-3 shadow-[0_10px_26px_rgba(7,61,44,0.08)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_16px_34px_rgba(7,61,44,0.14)] sm:h-12 sm:w-[96px]">
                <img
                  src="/brand/pio-logo-trim.png"
                  alt="PIO"
                  className="brand-logo-lift h-8 w-auto object-contain sm:h-9"
                />
              </span>
            </button>

            {/* Center Desktop Links */}
            <ul className="hidden items-center gap-1 xl:gap-2 lg:flex">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <button 
                    onClick={() => go(link.id)} 
                    className={`relative px-3.5 py-1.5 rounded-full text-[10px] xl:text-xs font-semibold uppercase tracking-[0.16em] transition-all duration-200 cursor-pointer ${
                      active === link.id 
                        ? 'text-[#0d3c2d] bg-[#eef6ef] font-bold shadow-[0_8px_18px_rgba(7,61,44,0.08)]' 
                        : 'text-[#1d3c2a]/75 hover:text-[#0d3c2d] hover:bg-[#f3f0e8]'
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Refreshing Fizz Sound Synthesizer Button */}
              <button
                onClick={handleFizz}
                title="Play fresh fizzy sip sound"
                className="flex h-10 w-10 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-[#eef8f1] text-[#07582f] border border-emerald-900/15 hover:bg-[#07582f] hover:text-white transition-colors duration-200 shadow-2xs cursor-pointer active:scale-95"
                aria-label="Play fresh fizz sound"
              >
                <Sparkles className="h-4 w-4" />
              </button>

              <button 
                onClick={() => go('partner')} 
                className="hidden sm:inline-flex items-center justify-center gap-1.5 rounded-full bg-[#07582f] hover:bg-[#096d3a] active:scale-95 text-white text-xs font-black uppercase tracking-wider px-5 py-2.5 shadow-sm transition-all duration-200 cursor-pointer min-h-[44px]"
              >
                <span>Partner With Us</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Mobile Menu Hamburger */}
              <button 
                onClick={() => setOpen(!open)} 
                className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-900/10 bg-white text-emerald-950 shadow-xs lg:hidden cursor-pointer active:scale-95" 
                aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={open}
              >
                {open ? <X className="h-5 w-5 text-[#07582f]"/> : <Menu className="h-5 w-5 text-[#07582f]"/>}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer (Clean Fullscreen Glass Sheet) */}
      <div 
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <div 
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-emerald-950/30 backdrop-blur-sm transition-opacity" 
        />

        {/* Sheet Content */}
        <div 
          className={`absolute top-20 inset-x-3 bottom-4 max-h-[82svh] rounded-3xl bg-white/98 border border-emerald-900/10 p-5 shadow-2xl backdrop-blur-xl flex flex-col justify-between overflow-y-auto transition-transform duration-300 ${
            open ? 'translate-y-0' : '-translate-y-4'
          }`}
        >
          <div className="space-y-1 pt-2">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#07582f] px-3 block mb-3">
              Navigation
            </span>
            {NAV_LINKS.map((link) => (
              <button 
                key={link.id} 
                onClick={() => go(link.id)} 
                className={`w-full rounded-2xl px-4 py-3.5 text-left text-base font-bold transition-all cursor-pointer flex items-center justify-between min-h-[48px] ${
                  active === link.id 
                    ? 'bg-[#eef8f1] text-[#07582f] font-black' 
                    : 'text-[#082416] hover:bg-emerald-50/70 active:bg-emerald-100'
                }`}
              >
                <span>{link.label}</span>
                {active === link.id && <span className="h-2 w-2 rounded-full bg-[#10b981]" />}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-emerald-900/10 space-y-3">
            <button 
              onClick={() => go('partner')} 
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[#07582f] px-5 py-4 text-sm font-black text-white text-center shadow-md active:scale-98 cursor-pointer min-h-[48px]"
            >
              <span>Partner With Us</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <p className="text-center text-[11px] text-slate-500 font-semibold">
              PIO &bull; ₹10 Refreshment &bull; Made in Assam
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
