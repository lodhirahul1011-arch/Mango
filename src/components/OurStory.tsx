import { motion } from 'framer-motion';
import { ArrowRight, Award, Heart, Sparkles, Building2 } from 'lucide-react';

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
};

export function OurStory() {
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="story" className="relative py-20 lg:py-28 bg-[#fdfdfd] border-t border-emerald-900/10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          
          {/* Left Text Story */}
          <motion.div {...reveal} className="lg:col-span-6 space-y-6">
            <span className="inline-block text-xs font-black uppercase tracking-[0.25em] text-[#0b8043] bg-[#eef8f1] px-4 py-1.5 rounded-full">
              Our Story
            </span>

            <h2 className="text-3xl sm:text-5xl font-black text-[#083b20] tracking-tight leading-tight">
              Born from a love for real fruit and refreshing moments.
            </h2>

            <p className="text-base sm:text-lg text-[#325340] leading-relaxed font-medium">
              PIO by REPOSE is made to bring joy to every sip. Rooted in the heart of Assam, backed by decades of food manufacturing excellence under the SRD Group, we set out to craft a fruit drink that delivers true orchard taste at an accessible ₹10 price.
            </p>

            {/* Heritage Highlights */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="rounded-2xl bg-[#f4faf5] border border-emerald-900/10 p-4">
                <Building2 className="w-5 h-5 text-[#07582f]" />
                <h4 className="mt-2 text-sm font-black text-[#083b20]">Assam Heritage</h4>
                <p className="mt-1 text-xs text-slate-500">From a humble beginning to high-tech manufacturing.</p>
              </div>

              <div className="rounded-2xl bg-[#f4faf5] border border-emerald-900/10 p-4">
                <Award className="w-5 h-5 text-[#07582f]" />
                <h4 className="mt-2 text-sm font-black text-[#083b20]">Quality First</h4>
                <p className="mt-1 text-xs text-slate-500">Aseptic multilayer Tetra Pak for uncompromising safety.</p>
              </div>
            </div>

            <div className="pt-2">
              <button 
                onClick={() => go('contact')}
                className="inline-flex items-center gap-2 rounded-full bg-[#07582f] hover:bg-[#0a6d3b] text-white px-7 py-3.5 text-xs font-black uppercase tracking-wider shadow-md hover:-translate-y-0.5 transition-all"
              >
                Know Our Story <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>

          {/* Right Image Graphic */}
          <motion.div {...reveal} className="lg:col-span-6 overflow-hidden rounded-[36px] border border-emerald-900/10 bg-white p-3 shadow-xl">
            <img 
              src="/images/our-story-card.jpg" 
              alt="Our Story PIO by REPOSE illustration" 
              className="w-full h-auto rounded-[28px] object-cover"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
