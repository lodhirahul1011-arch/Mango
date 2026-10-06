import { Instagram, Facebook, Youtube, MapPin, Phone, Heart, Sparkles } from 'lucide-react';

const LINKS = {
  quick: [
    { label: 'Home', id: 'home' },
    { label: 'Flavours', id: 'flavours' },
    { label: 'Why PIO', id: 'why-pio' },
    { label: 'Flavor Stories', id: 'stories' },
    { label: 'Where to Buy', id: 'where-to-buy' },
    { label: 'Our Story', id: 'story' },
  ],
  support: [
    { label: 'Frequently Asked Questions', id: 'contact' },
    { label: 'Become a Distributor', id: 'partner' },
    { label: 'Retailer Enquiries', id: 'partner' },
    { label: 'Institutional & B2B', id: 'partner' },
    { label: 'Contact Us', id: 'contact' },
  ],
};

export function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden bg-[#eef7f1] border-t border-emerald-900/10 text-slate-800">
      {/* Decorative leaf / garden wave backdrop */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-emerald-100/40 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 items-start">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-black text-4xl tracking-tighter text-[#0b8043] lowercase flex items-center">
                p<span className="inline-block relative">i<span className="absolute -top-1 left-0.5 w-1.5 h-1.5 rounded-full bg-[#f59e0b]" /></span>o
              </span>
              <span className="text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#0b8043]/15 text-[#07582f]">
                SipOhh!
              </span>
            </div>

            <p className="text-lg font-black text-[#083b20]">
              SipOhh! Refresh Always.
            </p>

            <p className="max-w-sm text-sm text-[#385c45] leading-relaxed font-medium">
              Real fruit refreshment in everyday convenient 100ml packs. Made with love in Assam by Repose Agrotech Pvt Ltd, a unit of SRD Group. Just ₹10.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a 
                href="#" 
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-emerald-900/15 text-[#07582f] hover:bg-[#07582f] hover:text-white transition-all shadow-2xs" 
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-emerald-900/15 text-[#07582f] hover:bg-[#07582f] hover:text-white transition-all shadow-2xs" 
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-emerald-900/15 text-[#07582f] hover:bg-[#07582f] hover:text-white transition-all shadow-2xs" 
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#07582f] mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {LINKS.quick.map((l) => (
                <li key={l.label}>
                  <button
                    onClick={() => scrollTo(l.id)}
                    className="text-sm font-semibold text-slate-600 hover:text-[#07582f] transition-colors"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Business */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#07582f] mb-4">
              Support & Trade
            </h4>
            <ul className="space-y-2.5">
              {LINKS.support.map((l) => (
                <li key={l.label}>
                  <button
                    onClick={() => scrollTo(l.id)}
                    className="text-sm font-semibold text-slate-600 hover:text-[#07582f] transition-colors"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-4 border-t border-emerald-900/10 text-xs text-[#385c45] space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-emerald-950">
                <MapPin className="h-3.5 w-3.5 text-[#07582f]" />
                <span>Mangaldai, Darrang, Assam - 784125</span>
              </div>
              <div className="flex items-center gap-1.5 font-bold text-emerald-950">
                <Phone className="h-3.5 w-3.5 text-[#07582f]" />
                <a href="tel:9971918470" className="hover:underline">+91 99719 18470</a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-emerald-900/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} PIO by Repose Agrotech Pvt Ltd. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Crafted with pride in Assam</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </p>
        </div>
      </div>
    </footer>
  );
}
