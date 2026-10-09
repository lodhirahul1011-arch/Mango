import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, MapPin, Phone, Send, Mail, CheckCircle2, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    q: 'How should PIO packs be stored?',
    a: 'PIO is an aseptically processed, shelf-stable beverage. Unopened packs can be stored safely at room temperature in a cool, dry place away from direct sunlight. No refrigeration is needed before opening! For best refreshment, chill for an hour before drinking.',
  },
  {
    q: 'What is the shelf life of PIO drinks?',
    a: 'Because of our multilayer aseptic carton packaging that locks out oxygen and light: PIO Mango has a shelf life of 9 months, and PIO Lychee has a shelf life of 6 months from the date of manufacture.',
  },
  {
    q: 'Does PIO contain added artificial preservatives?',
    a: 'No! PIO does not require chemical preservatives. The sterilization process combined with sealed aseptic barrier cartons protects the beverage naturally.',
  },
  {
    q: 'Where is PIO manufactured?',
    a: 'PIO is proudly developed and manufactured in Mangaldai, Assam by Repose Agrotech Pvt Ltd, a unit of the SRD Group with over 90 years of food processing expertise.',
  },
];

const PARTNER_OPTIONS = [
  'Become a Distributor',
  'Become a Retailer',
  'B2B / Institutional',
  'Export Enquiries',
  'General Consumer Feedback',
];

export function Contact() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', type: PARTNER_OPTIONS[0], message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', phone: '', type: PARTNER_OPTIONS[0], message: '' });
    }, 4500);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#ffffff] border-t border-emerald-900/10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-[#0b8043] bg-[#eef8f1] px-4 py-1.5 rounded-full">
            Get in Touch
          </span>
          <h2 className="mt-4 font-['Space_Grotesk',sans-serif] text-[clamp(2.2rem,6vw,3.75rem)] font-black text-[#083b20] tracking-tight">
            Contact & FAQs
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#3b5e48]">
            Have a question, feedback, or business enquiry? We’d love to hear from you.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 items-start">
          
          {/* Left Column: FAQ Accordion */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2 mb-4 text-[#07582f] font-extrabold text-sm uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>Frequently Asked Questions</span>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <div
                    key={faq.q}
                    className="overflow-hidden rounded-2xl border border-emerald-900/10 bg-[#f9fcf9] transition-all"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="flex w-full items-center justify-between p-5 text-left font-extrabold text-sm sm:text-base text-[#083b20] hover:text-[#0b8043] transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-[#07582f] transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="px-5 pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium"
                        >
                          {faq.a}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Quick Contact Info Cards */}
            <div className="mt-8 grid sm:grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-[#eef8f1] border border-[#cbe8d3] flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#07582f] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <div className="font-black text-[#083b20]">Factory & Office</div>
                  <div className="text-slate-600 mt-0.5">Mangaldai, Darrang, Assam - 784125</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#eef8f1] border border-[#cbe8d3] flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#07582f] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <div className="font-black text-[#083b20]">Direct Helpline</div>
                  <a href="tel:9971918470" className="text-[#07582f] font-bold mt-0.5 block hover:underline">
                    +91 99719 18470
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-6">
            <div className="rounded-[32px] border border-emerald-900/10 bg-[#f4faf5] p-7 sm:p-10 shadow-lg">
              <h3 className="text-2xl font-black text-[#083b20] mb-2">
                Send Us a Message
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-6">
                Fill in your details and our team will get back to you within 24 hours.
              </p>

              {submitted ? (
                <div className="py-12 text-center space-y-3">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h4 className="text-lg font-black text-emerald-950">Thank you!</h4>
                  <p className="text-xs text-slate-600 max-w-xs mx-auto">
                    Your enquiry has been received. Our sales and distribution team will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Rahul Sharma"
                        className="w-full rounded-2xl border border-emerald-900/15 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#07582f] focus:ring-1 focus:ring-[#07582f]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full rounded-2xl border border-emerald-900/15 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#07582f] focus:ring-1 focus:ring-[#07582f]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="rahul@example.com"
                      className="w-full rounded-2xl border border-emerald-900/15 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#07582f] focus:ring-1 focus:ring-[#07582f]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1.5">
                      Enquiry Purpose
                    </label>
                    <select
                      id="partner-type-select"
                      value={form.type}
                      onChange={(e) => setForm({ ...form, type: e.target.value })}
                      className="w-full rounded-2xl border border-emerald-900/15 bg-white px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-[#07582f] focus:ring-1 focus:ring-[#07582f]"
                    >
                      {PARTNER_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1.5">
                      Message / City & Details
                    </label>
                    <textarea
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Please mention your location and requirement details..."
                      className="w-full rounded-2xl border border-emerald-900/15 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#07582f] focus:ring-1 focus:ring-[#07582f] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[#07582f] hover:bg-[#0a6d3b] text-white py-3.5 text-xs font-black uppercase tracking-wider shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                  >
                    <span>Submit Enquiry</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
