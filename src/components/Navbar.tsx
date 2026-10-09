import { useState } from 'react';
import { Menu, X, ArrowRight, Sparkles, MapPin } from 'lucide-react';
import { useScrolled, useActiveSection } from '@/hooks/useScrollReveal';
import { fizzAudio } from '@/utils/audio';

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'flavours', label: 'Flavours' },
  { id: 'tetra-experience', label: 'Tetra Pack' },
  { id: 'inside', label: "What's Inside" },
  { id: 'map', label: 'Store Locator' },
  { id: 'story', label: 'Our Story' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar() {
  const scrolled = useScrolled(25);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(NAV_LINKS.map((l) => l.id));

  const go = (id: string) => { 
    setOpen(false); 
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); 
  };

  const handleFizz = () => {
    fizzAudio.playFizz();
  };

  return (
    <header className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 py-2.5 shadow-sm backdrop-blur-md border-b border-emerald-900/10' 
        : 'bg-white/85 py-3.5 backdrop-blur-sm'
    }`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        
        {/* Brand Logo */}
        <button onClick={() => go('home')} className="flex items-center gap-2 group cursor-pointer" aria-label="Go to PIO home">
          <span className="font-black text-3xl sm:text-4xl tracking-tighter text-[#0b6b3a] lowercase flex items-center">
            P<span className="inline-block relative">i<span className="absolute -top-1 left-0.5 w-1.5 h-1.5 rounded-full bg-[#10b981]" /></span>o
          </span>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#07582f] bg-[#eef8f1] px-2 py-0.5 rounded-md border border-emerald-900/10 hidden sm:inline-block">
            SipOhh!
          </span>
        </button>

        {/* Center Desktop Links */}
        <ul className="hidden items-center gap-1 xl:gap-2 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <button 
                onClick={() => go(link.id)} 
                className={`relative px-3 py-1.5 rounded-full text-xs xl:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  active === link.id 
                    ? 'text-[#07582f] bg-[#eef8f1] font-bold shadow-2xs' 
                    : 'text-[#1d3c2a]/80 hover:text-[#07582f] hover:bg-[#f4faf5]'
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
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eef8f1] text-[#07582f] border border-emerald-900/15 hover:bg-[#07582f] hover:text-white transition-colors duration-200 shadow-2xs cursor-pointer"
            aria-label="Play fresh fizz sound"
          >
            <Sparkles className="h-4 w-4" />
          </button>

          <button 
            onClick={() => go('partner')} 
            className="hidden sm:inline-flex items-center justify-center gap-1.5 rounded-full bg-[#07582f] hover:bg-[#096d3a] active:scale-95 text-white text-xs font-black uppercase tracking-wider px-5 py-2.5 shadow-sm transition-all duration-200 cursor-pointer"
          >
            <span>Partner</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile menu hamburger */}
          <button 
            onClick={() => setOpen(!open)} 
            className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-900/10 bg-white text-emerald-950 shadow-xs lg:hidden cursor-pointer" 
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
              className={`block w-full rounded-2xl px-4 py-2.5 text-left text-sm font-bold transition-colors cursor-pointer ${
                active === link.id ? 'bg-[#eef8f1] text-[#07582f]' : 'text-emerald-950 hover:bg-emerald-50'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2">
            <button 
              onClick={() => go('partner')} 
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[#07582f] px-4 py-3 text-sm font-extrabold text-white text-center shadow-xs cursor-pointer"
            >
              <span>Partner With Us</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
