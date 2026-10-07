import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Building2, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const STORY_SEQUENCE_PATH = '/pio_website_jpg_sequence_24fps/pio_website_jpg_sequence';
const STORY_SEQUENCE_FRAME_COUNT = 121;

function getStoryFrameSrc(frame: number) {
  return `${STORY_SEQUENCE_PATH}/frame_${String(frame).padStart(4, '0')}.jpg`;
}

// ---------------------------------------------------------------------------
// 3D HERITAGE SCENE (1931 Mangaldai Tea Stall -> Modern PIO)
// ---------------------------------------------------------------------------

// Historical Tea Kettle & Stall Environment
function HeritageTeaStall({ opacity }: { opacity: number }) {
  return (
    <group position={[0, -0.4, 0]}>
      {/* Wooden stall bench / counter */}
      <mesh position={[0, -0.4, 0]} receiveShadow>
        <boxGeometry args={[3.2, 0.25, 1.4]} />
        <meshStandardMaterial
          color="#5c3a21"
          roughness={0.8}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* Brass Tea Kettle */}
      <group position={[-0.6, 0.1, 0]}>
        {/* Kettle body */}
        <mesh castShadow>
          <sphereGeometry args={[0.35, 24, 20]} />
          <meshStandardMaterial
            color="#d4af37"
            roughness={0.25}
            metalness={0.85}
            transparent
            opacity={opacity}
          />
        </mesh>
        {/* Kettle lid */}
        <mesh position={[0, 0.35, 0]}>
          <cylinderGeometry args={[0.16, 0.2, 0.08, 20]} />
          <meshStandardMaterial
            color="#b8860b"
            roughness={0.3}
            metalness={0.8}
            transparent
            opacity={opacity}
          />
        </mesh>
        {/* Spout */}
        <mesh position={[0.3, 0.1, 0]} rotation={[0, 0, -0.5]}>
          <cylinderGeometry args={[0.04, 0.08, 0.4, 16]} />
          <meshStandardMaterial
            color="#d4af37"
            roughness={0.25}
            metalness={0.85}
            transparent
            opacity={opacity}
          />
        </mesh>
      </group>

      {/* Traditional clay / brass tea cups */}
      <mesh position={[0.5, -0.15, 0.2]} castShadow>
        <cylinderGeometry args={[0.09, 0.06, 0.22, 16]} />
        <meshStandardMaterial
          color="#a0522d"
          roughness={0.7}
          transparent
          opacity={opacity}
        />
      </mesh>
      <mesh position={[0.8, -0.15, 0.1]} castShadow>
        <cylinderGeometry args={[0.09, 0.06, 0.22, 16]} />
        <meshStandardMaterial
          color="#a0522d"
          roughness={0.7}
          transparent
          opacity={opacity}
        />
      </mesh>
    </group>
  );
}

// Rising Steam Particles from Kettle
function RisingSteam({ opacity }: { opacity: number }) {
  const count = 35;
  const particlesRef = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = -0.6 + (Math.random() - 0.5) * 0.25;
      arr[i * 3 + 1] = 0.3 + Math.random() * 1.5;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 0.25;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (!particlesRef.current) return;
    const pos = particlesRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += delta * 0.4;
      if (pos[i * 3 + 1] > 2.0) {
        pos[i * 3 + 1] = 0.3;
      }
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#fef3c7"
        transparent
        opacity={opacity * 0.45}
        sizeAttenuation
      />
    </points>
  );
}

// Modern PIO Products (Emerge as heritage morphs into modern)
function ModernPioProducts({ opacity }: { opacity: number }) {
  return (
    <group position={[0, 0, 0]}>
      {/* Mango Carton */}
      <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.25}>
        <group position={[-0.55, 0, 0]} rotation={[0, -0.18, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.55, 0.98, 0.35]} />
            <meshStandardMaterial
              color="#f59e0b"
              roughness={0.2}
              metalness={0.06}
              transparent
              opacity={opacity}
            />
          </mesh>
          <mesh position={[0, 0.51, 0]}>
            <boxGeometry args={[0.55, 0.06, 0.35]} />
            <meshStandardMaterial color="#d97706" transparent opacity={opacity} />
          </mesh>
          {/* Label area */}
          <mesh position={[0, 0, 0.176]}>
            <boxGeometry args={[0.52, 0.28, 0.001]} />
            <meshStandardMaterial color="#fef3c7" transparent opacity={opacity} />
          </mesh>
        </group>
      </Float>

      {/* Lychee Carton */}
      <Float speed={1.7} rotationIntensity={0.05} floatIntensity={0.28}>
        <group position={[0.55, 0, 0]} rotation={[0, 0.18, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.55, 0.98, 0.35]} />
            <meshStandardMaterial
              color="#f43f5e"
              roughness={0.2}
              metalness={0.06}
              transparent
              opacity={opacity}
            />
          </mesh>
          <mesh position={[0, 0.51, 0]}>
            <boxGeometry args={[0.55, 0.06, 0.35]} />
            <meshStandardMaterial color="#e11d48" transparent opacity={opacity} />
          </mesh>
          {/* Label area */}
          <mesh position={[0, 0, 0.176]}>
            <boxGeometry args={[0.52, 0.28, 0.001]} />
            <meshStandardMaterial color="#ffe4e6" transparent opacity={opacity} />
          </mesh>
        </group>
      </Float>

      {/* Modern Fresh Floating Leaves */}
      <Float speed={2.0} rotationIntensity={0.15} floatIntensity={0.35}>
        <mesh position={[1.4, 0.6, 0.2]} castShadow>
          <cylinderGeometry args={[0.02, 0.16, 0.35, 12]} />
          <meshStandardMaterial color="#16a34a" transparent opacity={opacity} />
        </mesh>
      </Float>
      <Float speed={1.8} rotationIntensity={0.12} floatIntensity={0.3}>
        <mesh position={[-1.3, -0.4, 0.3]} castShadow>
          <cylinderGeometry args={[0.02, 0.14, 0.32, 12]} />
          <meshStandardMaterial color="#22c55e" transparent opacity={opacity} />
        </mesh>
      </Float>
    </group>
  );
}

// Liquid Ribbon connecting Heritage to Modern
function LiquidRibbon({ progress }: { progress: number }) {
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.6, 0.35, 0),
      new THREE.Vector3(-0.2, 0.8, 0.4),
      new THREE.Vector3(0.2, 0.5, 0.8),
      new THREE.Vector3(0.0, 0.1, 1.2),
      new THREE.Vector3(0.4, -0.1, 1.6),
    ]);
  }, []);

  const tubeGeo = useMemo(() => {
    return new THREE.TubeGeometry(curve, 64, 0.06, 12, false);
  }, [curve]);

  // Color transforms from warm amber/tea gold to PIO green
  const ribbonColor = progress > 0.5 ? '#16a34a' : '#d97706';
  const ribbonOpacity = Math.sin(progress * Math.PI) * 0.85;

  return (
    <mesh geometry={tubeGeo}>
      <meshPhysicalMaterial
        color={ribbonColor}
        transparent
        opacity={Math.max(0, ribbonOpacity)}
        roughness={0.1}
        transmission={0.7}
        thickness={0.5}
        ior={1.4}
      />
    </mesh>
  );
}

// Master Scene combining both eras based on scroll progress
function StoryScene({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const [prog, setProg] = React.useState(0);

  useFrame((state) => {
    const p = scrollProgress.current;
    setProg(p);

    // Camera travels forward through time
    state.camera.position.z = THREE.MathUtils.lerp(5.8, 4.2, p);
    state.camera.position.y = THREE.MathUtils.lerp(0.8, 0.2, p);
    state.camera.lookAt(0, 0, 0);
  });

  // Era transition: 0 to 0.55 is 1931 Tea Stall; 0.45 to 1.0 is Modern PIO
  const heritageOpacity = Math.max(0, 1 - prog * 1.8);
  const modernOpacity = Math.min(1, Math.max(0, (prog - 0.45) * 2.2));

  return (
    <group>
      {/* 1931 Heritage typography floating deep in environment */}
      <Text
        position={[0, 1.5, -1.8]}
        fontSize={1.4}
        color="#78350f"
        font="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
        fillOpacity={Math.max(0, 0.4 - prog * 0.8)}
      >
        1931
      </Text>

      {/* Era 1: 1931 Heritage Stall & Kettle */}
      {heritageOpacity > 0.01 && (
        <>
          <HeritageTeaStall opacity={heritageOpacity} />
          <RisingSteam opacity={heritageOpacity} />
        </>
      )}

      {/* Liquid Ribbon connecting eras */}
      <LiquidRibbon progress={prog} />

      {/* Era 2: Modern PIO Products */}
      {modernOpacity > 0.01 && (
        <ModernPioProducts opacity={modernOpacity} />
      )}

      {/* Ground contact shadow */}
      <ContactShadows position={[0, -0.65, 0]} opacity={0.3} scale={5} blur={2.2} far={2.5} />
    </group>
  );
}

// ---------------------------------------------------------------------------
// MAIN OUR STORY COMPONENT
// ---------------------------------------------------------------------------
export function OurStory() {
  const sectionRef = useRef<HTMLElement>(null!);
  const scrollProgress = useRef(0);
  const textColRef = useRef<HTMLDivElement>(null!);
  const [sequenceFrame, setSequenceFrame] = React.useState(1);

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (prefersReduced || !sectionRef.current) return;

    const sequenceImages = Array.from({ length: STORY_SEQUENCE_FRAME_COUNT }, (_, index) => {
      const image = new Image();
      image.src = getStoryFrameSrc(index + 1);
      return image;
    });

    const sequenceTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      end: 'bottom 20%',
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
        const nextFrame = Math.min(
          STORY_SEQUENCE_FRAME_COUNT,
          Math.max(1, Math.round(self.progress * (STORY_SEQUENCE_FRAME_COUNT - 1)) + 1)
        );
        setSequenceFrame((current) => (current === nextFrame ? current : nextFrame));
      },
    });

    const ctx = gsap.context(() => {
      if (textColRef.current) {
        gsap.fromTo(
          textColRef.current.children,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textColRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => {
      sequenceTrigger.kill();
      sequenceImages.length = 0;
      ctx.revert();
    };
  }, []);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative py-20 lg:py-28 bg-[#fdfdfd] border-t border-emerald-900/10 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0">
        <img
          src={getStoryFrameSrc(sequenceFrame)}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover opacity-80 saturate-125 contrast-105"
        />
        <div className="absolute inset-0 bg-[#fff8ed]/15" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.88)_0%,rgba(255,255,255,0.58)_36%,rgba(255,255,255,0.16)_70%,rgba(255,255,255,0.42)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_38%,rgba(255,255,255,0.72),transparent_36%),radial-gradient(circle_at_78%_32%,rgba(255,241,214,0.28),transparent_34%)]" />
      </div>

      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(217,119,6,0.06),transparent_60%),radial-gradient(circle_at_20%_80%,rgba(7,88,47,0.06),transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          
          {/* Left Text Story Column */}
          <div ref={textColRef} className="lg:col-span-6 space-y-6 rounded-[28px] border border-white/70 bg-white/48 p-5 shadow-[0_24px_80px_rgba(7,88,47,0.12)] backdrop-blur-[3px] sm:p-7">
            <span className="inline-block text-xs font-black uppercase tracking-[0.25em] text-[#0b8043] bg-[#eef8f1] px-4 py-1.5 rounded-full border border-emerald-200/60 shadow-xs">
              Our Story
            </span>

            <h2 className="text-3xl sm:text-5xl font-black text-[#083b20] tracking-tight leading-tight">
              FROM A TEA STALL IN MANGALDAI<br />
              <span className="text-[#07582f]">TO A NEW GENERATION OF REFRESHMENT.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#325340] leading-relaxed font-medium">
              In 1931, our journey began at a humble roadside tea stall in Mangaldai, Assam. Guided by hard work, unwavering community trust, and food-grade excellence under the SRD Group, that single stall grew across decades. Today, PIO brings that same heritage into modern tetra-pack refreshment.
            </p>

            {/* Heritage Highlights */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="rounded-2xl bg-white/70 border border-emerald-900/10 p-4 shadow-sm backdrop-blur-sm">
                <Building2 className="w-5 h-5 text-[#07582f]" />
                <h4 className="mt-2 text-sm font-black text-[#083b20]">1931 Assam Roots</h4>
                <p className="mt-1 text-xs text-slate-500">From a roadside tea kettle to state-of-the-art aseptic food plants.</p>
              </div>

              <div className="rounded-2xl bg-white/70 border border-emerald-900/10 p-4 shadow-sm backdrop-blur-sm">
                <Award className="w-5 h-5 text-[#07582f]" />
                <h4 className="mt-2 text-sm font-black text-[#083b20]">Repose Excellence</h4>
                <p className="mt-1 text-xs text-slate-500">Multilayer packaging preserving authentic taste at ₹10.</p>
              </div>
            </div>

            <div className="pt-2">
              <button 
                onClick={() => go('contact')}
                className="group inline-flex items-center gap-2 rounded-full bg-[#07582f] hover:bg-[#0a6d3b] text-white px-7 py-3.5 text-xs font-black uppercase tracking-wider shadow-md hover:-translate-y-0.5 transition-all"
              >
                Know Our Story 
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Scroll Sequence Showcase */}
          <div className="lg:col-span-6 relative w-full h-[400px] sm:h-[480px] lg:h-[540px] overflow-hidden rounded-[30px] border border-white/70 bg-white/40 shadow-[0_28px_90px_rgba(7,88,47,0.24)] backdrop-blur-md">
            <div className="pointer-events-none absolute inset-0">
              <img
                src={getStoryFrameSrc(sequenceFrame)}
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover opacity-100 saturate-125 contrast-105"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_48%,rgba(7,88,47,0.1)_100%)]" />
              <div className="absolute inset-x-10 bottom-7 h-16 rounded-full bg-emerald-950/16 blur-2xl" />
            </div>
            <div className="pointer-events-none absolute left-5 top-5 z-10 rounded-full border border-emerald-700/15 bg-white/75 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-[#07582f] shadow-sm backdrop-blur">
              1931 to Today
            </div>
            <div className="pointer-events-none absolute bottom-5 left-5 right-5 z-10 flex items-center justify-between rounded-2xl border border-white/65 bg-white/70 px-5 py-4 shadow-lg backdrop-blur-md">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#0b8043]">
                  PIO Journey
                </p>
                <p className="mt-1 text-sm font-bold text-[#083b20]">
                  Scroll to reveal the story frame by frame
                </p>
              </div>
              <div className="h-2 w-24 overflow-hidden rounded-full bg-emerald-100">
                <div
                  className="h-full rounded-full bg-[#07582f] transition-[width] duration-150"
                  style={{ width: `${(sequenceFrame / STORY_SEQUENCE_FRAME_COUNT) * 100}%` }}
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
