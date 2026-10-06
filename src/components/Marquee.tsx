import { motion } from 'framer-motion';

const PHRASES = [
  'Har Sip Jio',
  'Born in Assam',
  'No Preservatives',
  'Aseptically Packed',
  'Made for India',
  '160 mL / Rs 10',
  'Generations of Trust',
  'Premium Fruit Beverage',
];

export function Marquee() {
  const items = [...PHRASES, ...PHRASES];
  return (
    <div className="relative overflow-hidden border-y border-emerald-900/10 bg-emerald-50 py-4">
      <div className="absolute inset-x-0 top-0 h-px chrome-line" />
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: [0, '-50%'] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      >
        {items.map((p, i) => (
          <span key={`${p}-${i}`} className="mx-6 flex items-center gap-6 font-display text-lg font-black uppercase tracking-[-0.03em] text-emerald-950/80">
            {p}
            <span className="text-2xl text-emerald-600/60">/</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
