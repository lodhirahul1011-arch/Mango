import { useRef } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { frameUrl, useFlavourFrames } from '@/hooks/useFlavourFrames';
import './FlavourFrameStories.css';



const flavours = [
  { id: 'mango', count: 89, number: '01', label: 'PIO MANGO', title: 'A little sip.\nA lot of sunshine.', description: 'Rich mango flavour. Golden moments. Take a slow scroll into your fruity favourite.', note: 'SUNSHINE, PACKED.', next: 'lychee-story', nextLabel: 'Meet lychee' },
  { id: 'lychee', count: 57, number: '02', label: 'PIO LYCHEE', title: 'Sweet escape.\nFresh perspective.', description: 'Delicate lychee flavour with a refreshing finish. A little everyday escape, in every sip.', note: 'REFRESHINGLY YOURS.', next: 'inside', nextLabel: 'Discover the ingredients' },
] as const;


function FlavourScene({ flavour }: { flavour: typeof flavours[number] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useFlavourFrames({ flavour: flavour.id, count: flavour.count, sectionRef, canvasRef, progressRef });

  return (
    <section ref={sectionRef} id={`${flavour.id}-story`} className={`flavour-film flavour-film--${flavour.id}`} data-local-motion="true" aria-labelledby={`${flavour.id}-film-title`}>
      <div className="flavour-film__sticky">
        <div className="flavour-film__backdrop" aria-hidden="true">
          <img src={`/images/${flavour.id}-story-bg-v1.webp`} alt="" loading="lazy" decoding="async" width="1672" height="941" />
        </div>
        <div className="flavour-film__wash" aria-hidden="true" />
        <div className="flavour-film__copy">
          <p className="flavour-film__eyebrow"><span>{flavour.number} /</span> {flavour.label}</p>
          <h2 id={`${flavour.id}-film-title`}>{flavour.title.split('\n').map(line => <span key={line}>{line}</span>)}</h2>
          <p className="flavour-film__description">{flavour.description}</p>
          <div className="flavour-film__facts"><span>160 ml of happy</span><span>&#8377;10 a pack</span></div>
          <a className="flavour-film__link" href={`#${flavour.next}`}>{flavour.nextLabel}<ArrowUpRight size={18} /></a>
          <div className="flavour-film__scroll"><ArrowDown size={16} /><span>Scroll to savour the moment</span></div>
        </div>
        <div className="flavour-film__visual">
          <div className="flavour-film__picture">
            <img src={frameUrl(flavour.id, 0)} alt={`PIO ${flavour.id === 'mango' ? 'Mango' : 'Lychee'} juice pack surrounded by fresh fruit`} loading="lazy" width="540" height="960" />
            <canvas ref={canvasRef} width="540" height="960" aria-hidden="true" />
            <div className="flavour-film__caption"><span>{flavour.note}</span><span>PIO</span></div>
            <div className="flavour-film__track" aria-hidden="true"><div ref={progressRef} /></div>
          </div>
          <span className="flavour-film__side-note">HAR SIP JIO &middot; {flavour.label}</span>
        </div>
      </div>
    </section>
  );
}

export function FlavourFrameStories() {
  return <>{flavours.map(flavour => <FlavourScene key={flavour.id} flavour={flavour} />)}</>;
}

