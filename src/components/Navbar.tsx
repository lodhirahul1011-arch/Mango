import { useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { useScrolled, useActiveSection } from '@/hooks/useScrollReveal';

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'flavours', label: 'Flavours' },
  { id: 'why-pio', label: 'Why PIO' },
  { id: 'stories', label: 'Stories' },
  { id: 'inside', label: "What's Inside" },
  { id: 'moments', label: 'Moments' },
  { id: 'where-to-buy', label: 'Where to Buy' },
  { id: 'story', label: 'Our Story' },
];

export function Navbar() {
  const scrolled = useScrolled(25);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(NAV_LINKS.map((l) => l.id));
  const go = (id: string) => { 
    setOpen(false); 
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); 
  };

  return (
    <header className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-white/95 py-2.5 shadow-sm backdrop-blur-md border-b border-emerald-900/10' : 'bg-white/80 py-4 backdrop-blur-sm'}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8">
        {/* Brand Logo matching packaging */}
        <button onClick={() => go('home')} className="flex items-center gap-2.5 text-left group" aria-label="Go to PIO home">
          <div className="relative flex items-center justify-center">
            <span className="font-black text-3xl sm:text-4xl tracking-tighter text-[#0b8043] lowercase flex items-center">
              p<span className="inline-block relative">i<span className="absolute -top-1 left-0.5 w-1.5 h-1.5 rounded-full bg-[#f59e0b]" /></span>o
            </span>
            <span className="ml-1.5 hidden sm:inline-block text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-[#0b8043]/10 text-[#0b8043]">
              SipOhh!
            </span>
          </div>
        </button>

        {/* Desktop Links */}
        <ul className="hidden items-center gap-1 xl:gap-2 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <button 
                onClick={() => go(link.id)} 
                className={`relative px-3 py-1.5 rounded-full text-xs xl:text-sm font-bold transition-all duration-200 ${
                  active === link.id 
                    ? 'text-[#07582f] bg-[#eef8f1]' 
                    : 'text-[#1c3e2b]/75 hover:text-[#07582f] hover:bg-[#f4faf5]'
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fef3c7] border border-[#fde68a] text-[#b45309] text-xs font-black shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Just ₹10</span>
          </div>

          <button 
            onClick={() => go('contact')} 
            className="hidden sm:inline-flex items-center justify-center rounded-full bg-[#07582f] hover:bg-[#096d3a] active:scale-95 text-white text-xs font-extrabold uppercase tracking-wider px-5 py-2.5 shadow-sm transition-all duration-200"
          >
            Contact Us
          </button>

          {/* Mobile menu hamburger */}
          <button 
            onClick={() => setOpen(!open)} 
            className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-900/10 bg-white text-emerald-950 shadow-xs lg:hidden" 
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5"/> : <Menu className="h-5 w-5"/>}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`overflow-hidden transition-all duration-300 lg:hidden ${open ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="mx-4 my-3 space-y-1 rounded-3xl border border-emerald-900/10 bg-white/98 p-4 shadow-xl backdrop-blur-xl">
          {NAV_LINKS.map((link) => (
            <button 
              key={link.id} 
              onClick={() => go(link.id)} 
              className={`block w-full rounded-2xl px-4 py-2.5 text-left text-sm font-bold transition-colors ${
                active === link.id ? 'bg-[#eef8f1] text-[#07582f]' : 'text-emerald-950 hover:bg-emerald-50'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2">
            <button 
              onClick={() => go('contact')} 
              className="w-full rounded-2xl bg-[#07582f] px-4 py-3 text-sm font-extrabold text-white text-center shadow-xs"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
