import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, Droplets, Leaf } from 'lucide-react';
import { useHeroSequence } from '@/hooks/useHeroSequence';
import { dataConnection, HERO_VARIANTS, heroPoster, selectHeroVariant } from '@/utils/heroSequence';
import './ScrollHero.css';

export function ScrollHero() {
  const [variant, setVariant] = useState(selectHeroVariant);
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { width, height } = HERO_VARIANTS[variant];
  useHeroSequence(sectionRef, canvasRef, variant);

  useEffect(() => {
    const breakpoint = window.matchMedia('(max-width: 767px)');
    const connection = dataConnection();
    const updateVariant = () => setVariant(selectHeroVariant());
    breakpoint.addEventListener('change', updateVariant);
    connection?.addEventListener('change', updateVariant);
    return () => {
      breakpoint.removeEventListener('change', updateVariant);
      connection?.removeEventListener('change', updateVariant);
    };
  }, []);

  return (
    <section ref={sectionRef} id="home" className="pio-hero" data-local-motion="true" data-hero-mode="scroll" data-variant={variant} aria-labelledby="pio-hero-title">
      <div className="pio-hero__viewport">
          <div className="pio-hero__media" aria-hidden="true">
            <img {...{ fetchpriority: 'high' }} className="pio-hero__poster" src={heroPoster(variant)} width={width} height={height} alt="" loading="eager" decoding="async" />
            <canvas ref={canvasRef} className="pio-hero__canvas" width={width} height={height} />
          </div>

        <div className="pio-hero__shell">
          <div className="pio-hero__copy">
            <header className="pio-hero__heading">
              <p className="pio-hero__eyebrow"><span aria-hidden="true" /> REPOSE / PIO <span className="pio-hero__origin">BORN IN ASSAM</span></p>
              <h1 id="pio-hero-title"><span>Har Sip.</span><em>PIO.</em></h1>
              <p className="pio-hero__intro">Real fruit refreshment in every sip. Mango sunshine. Lychee freshness.</p>
            </header>

            <div className="pio-hero__actions">
              <div className="pio-hero__facts"><span><Leaf size={13} /> Real fruit</span><span><Droplets size={13} /> Chilled sip</span><span>160 ml &middot; &#8377;10</span></div>
              <div className="pio-hero__links">
                <a className="pio-hero__primary" href="#flavours">Explore flavours <ArrowRight size={18} /></a>
                <a className="pio-hero__secondary" href="#map">Find near you <ArrowRight size={16} /></a>
              </div>
              <p className="pio-hero__promise">0 Chemical. All refreshment.</p>
            </div>
          </div>

          <div className="pio-hero__footer">
            <div className="pio-hero__flavours"><span><i /> MANGO</span><span><i /> LYCHEE</span></div>
            <div className="pio-hero__scroll-cue"><ArrowDown size={14} /><span>SCROLL TO MAKE A SPLASH</span></div>
            <div className="pio-hero__progress" aria-hidden="true"><span /></div>
            <span className="pio-hero__signature">TWO FLAVOURS. ONE GOOD FEELING.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
