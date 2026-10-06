import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ---------------------------------------------------------------------------
// 3D FINALE SCENE: LIQUID HALO + TWO CARTONS + FLOATING FRUITS/ICE
// ---------------------------------------------------------------------------

// 3D Mango Carton (Exact Tetra Pack Geometry)
function FinalMangoCarton({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[0, 0.05, 0]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.62, 1.1, 0.38]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.16} metalness={0.06} />
      </mesh>
      {/* Top Gable Seal */}
      <mesh position={[0, 0.58, 0]} castShadow>
        <boxGeometry args={[0.62, 0.07, 0.38]} />
        <meshStandardMaterial color="#d97706" roughness={0.25} />
      </mesh>
      {/* Front Face Details */}
      <mesh position={[0, 0.04, 0.191]}>
        <boxGeometry args={[0.58, 0.32, 0.001]} />
        <meshStandardMaterial color="#fef3c7" roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.22, 0.192]}>
        <boxGeometry args={[0.3, 0.18, 0.001]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} />
      </mesh>
      {/* Rs 10 badge */}
      <mesh position={[-0.18, 0.42, 0.192]}>
        <boxGeometry args={[0.16, 0.12, 0.001]} />
        <meshStandardMaterial color="#07582f" roughness={0.3} />
      </mesh>
      {/* Bottom label */}
      <mesh position={[0, -0.38, 0.192]}>
        <boxGeometry args={[0.58, 0.2, 0.001]} />
        <meshStandardMaterial color="#92400e" roughness={0.3} />
      </mesh>
    </group>
  );
}

// 3D Lychee Carton (Exact Tetra Pack Geometry)
function FinalLycheeCarton({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[0, -0.05, 0]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.62, 1.1, 0.38]} />
        <meshStandardMaterial color="#f43f5e" roughness={0.16} metalness={0.06} />
      </mesh>
      {/* Top Gable Seal */}
      <mesh position={[0, 0.58, 0]} castShadow>
        <boxGeometry args={[0.62, 0.07, 0.38]} />
        <meshStandardMaterial color="#e11d48" roughness={0.25} />
      </mesh>
      {/* Front Face Details */}
      <mesh position={[0, 0.04, 0.191]}>
        <boxGeometry args={[0.58, 0.32, 0.001]} />
        <meshStandardMaterial color="#ffe4e6" roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.22, 0.192]}>
        <boxGeometry args={[0.3, 0.18, 0.001]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} />
      </mesh>
      {/* Rs 10 badge */}
      <mesh position={[-0.18, 0.42, 0.192]}>
        <boxGeometry args={[0.16, 0.12, 0.001]} />
        <meshStandardMaterial color="#07582f" roughness={0.3} />
      </mesh>
      {/* Bottom label */}
      <mesh position={[0, -0.38, 0.192]}>
        <boxGeometry args={[0.58, 0.2, 0.001]} />
        <meshStandardMaterial color="#9f1239" roughness={0.3} />
      </mesh>
    </group>
  );
}

// Giant Liquid Halo behind products (Half Mango Golden, Half Lychee Pink)
function LiquidHalo({ scale }: { scale: number }) {
  const haloRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (haloRef.current) {
      haloRef.current.rotation.z += delta * 0.25;
    }
  });

  return (
    <group ref={haloRef} position={[0, 0.1, -0.6]} scale={scale}>
      {/* Left Golden Mango Liquid Half Torus */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[1.75, 0.16, 24, 48, Math.PI]} />
        <meshPhysicalMaterial
          color="#f59e0b"
          roughness={0.08}
          transmission={0.82}
          thickness={0.8}
          ior={1.42}
          clearcoat={1}
        />
      </mesh>
      {/* Right Pink Lychee Liquid Half Torus */}
      <mesh rotation={[0, 0, -Math.PI / 2]}>
        <torusGeometry args={[1.75, 0.16, 24, 48, Math.PI]} />
        <meshPhysicalMaterial
          color="#fb7185"
          roughness={0.08}
          transmission={0.82}
          thickness={0.8}
          ior={1.42}
          clearcoat={1}
        />
      </mesh>
    </group>
  );
}

// Floating Accents: Mango cube, lychee fruit, ice crystals, glass spheres
function FloatingFinaleAccents() {
  return (
    <group>
      {/* Mango cube - top left */}
      <Float speed={1.8} floatIntensity={0.35} rotationIntensity={0.2}>
        <mesh position={[-2.1, 1.2, 0.2]} castShadow>
          <boxGeometry args={[0.26, 0.26, 0.26]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.3} />
        </mesh>
      </Float>

      {/* Lychee fruit - top right */}
      <Float speed={1.6} floatIntensity={0.3} rotationIntensity={0.15}>
        <mesh position={[2.1, 1.1, 0.3]} castShadow>
          <sphereGeometry args={[0.2, 20, 16]} />
          <meshStandardMaterial color="#f43f5e" roughness={0.4} />
        </mesh>
      </Float>

      {/* Ice Crystal - bottom left */}
      <Float speed={2.0} floatIntensity={0.4} rotationIntensity={0.25}>
        <mesh position={[-1.8, -0.8, 0.4]} rotation={[0.4, 0.4, 0.2]} castShadow>
          <boxGeometry args={[0.28, 0.28, 0.28]} />
          <meshPhysicalMaterial
            color="#e0f2fe"
            transparent
            opacity={0.55}
            roughness={0.0}
            transmission={0.9}
            thickness={0.6}
            ior={1.45}
            clearcoat={1}
          />
        </mesh>
      </Float>

      {/* Refracting Glass Droplet - bottom right */}
      <Float speed={1.9} floatIntensity={0.35}>
        <mesh position={[1.8, -0.7, 0.5]} castShadow>
          <sphereGeometry args={[0.22, 24, 20]} />
          <meshPhysicalMaterial
            color="#ffffff"
            transparent
            opacity={0.4}
            roughness={0.0}
            transmission={0.92}
            thickness={0.7}
            ior={1.48}
            clearcoat={1}
          />
        </mesh>
      </Float>

      {/* Natural Green Leaves */}
      <Float speed={2.2} floatIntensity={0.25} rotationIntensity={0.3}>
        <mesh position={[0, 1.6, -0.2]} rotation={[0.3, 0.2, 0.5]}>
          <cylinderGeometry args={[0.02, 0.16, 0.35, 12]} />
          <meshStandardMaterial color="#16a34a" roughness={0.4} />
        </mesh>
      </Float>
    </group>
  );
}

// Master Scene for Final CTA
function FinaleScene({
  scrollProgress,
  pointer,
}: {
  scrollProgress: React.MutableRefObject<number>;
  pointer: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const mangoRef = useRef<THREE.Group>(null!);
  const lycheeRef = useRef<THREE.Group>(null!);
  const [haloScale, setHaloScale] = React.useState(0);

  useFrame((state) => {
    const p = scrollProgress.current; // 0 to 1

    // Camera moves forward into scene
    state.camera.position.z = THREE.MathUtils.lerp(5.4, 4.4, p);

    // 0-40%: Mango rises from lower-left, Lychee from lower-right
    if (mangoRef.current) {
      const targetMangoY = THREE.MathUtils.lerp(-1.6, 0, Math.min(1, p * 2.5));
      const targetMangoX = THREE.MathUtils.lerp(-1.2, -0.55, Math.min(1, p * 2.2));
      mangoRef.current.position.y = THREE.MathUtils.lerp(mangoRef.current.position.y, targetMangoY, 0.08);
      mangoRef.current.position.x = THREE.MathUtils.lerp(mangoRef.current.position.x, targetMangoX, 0.08);
    }

    if (lycheeRef.current) {
      const targetLycheeY = THREE.MathUtils.lerp(-1.6, 0, Math.min(1, p * 2.5));
      const targetLycheeX = THREE.MathUtils.lerp(1.2, 0.55, Math.min(1, p * 2.2));
      lycheeRef.current.position.y = THREE.MathUtils.lerp(lycheeRef.current.position.y, targetLycheeY, 0.08);
      lycheeRef.current.position.x = THREE.MathUtils.lerp(lycheeRef.current.position.x, targetLycheeX, 0.08);
    }

    // 40-80%: Liquid halo forms behind products
    if (p > 0.35) {
      const scaleProg = Math.min(1, (p - 0.35) * 2.2);
      setHaloScale(scaleProg);
    } else {
      setHaloScale(0);
    }

    // 80-100%: Motion settles, products front-facing lockup
    if (groupRef.current) {
      const isMobile = window.innerWidth < 768;
      // Pointer reaction max 4 degrees
      if (!isMobile && p > 0.4) {
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          pointer.current.x * 0.06,
          0.05
        );
        groupRef.current.rotation.x = THREE.MathUtils.lerp(
          groupRef.current.rotation.x,
          -pointer.current.y * 0.05,
          0.05
        );
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Two Center Floating Cartons */}
      <group ref={mangoRef} position={[-1.2, -1.6, 0]}>
        <Float speed={1.3} floatIntensity={0.15}>
          <FinalMangoCarton position={[0, 0, 0]} />
        </Float>
      </group>

      <group ref={lycheeRef} position={[1.2, -1.6, 0]}>
        <Float speed={1.4} floatIntensity={0.16}>
          <FinalLycheeCarton position={[0, 0, 0]} />
        </Float>
      </group>

      {/* 3D Liquid Halo behind */}
      <LiquidHalo scale={haloScale} />

      {/* Floating Accents */}
      <FloatingFinaleAccents />

      {/* Ground Contact Shadow */}
      <ContactShadows position={[0, -0.75, 0]} opacity={0.35} scale={5} blur={2.2} far={2.5} />
    </group>
  );
}

// ---------------------------------------------------------------------------
// MAIN FINAL CTA COMPONENT
// ---------------------------------------------------------------------------
export function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null!);
  const textRef = useRef<HTMLDivElement>(null!);
  const scrollProgress = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (prefersReduced) return;

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      end: 'bottom 20%',
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
      },
    });

    const handlePointer = (e: MouseEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handlePointer);

    const ctx = gsap.context(() => {
      if (textRef.current) {
        gsap.fromTo(
          textRef.current.children,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => {
      window.removeEventListener('mousemove', handlePointer);
      ctx.revert();
    };
  }, []);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="final-cta"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#ffffff] overflow-hidden border-t border-emerald-900/10"
    >
      {/* Soft Ambient Glow backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(7,88,47,0.06),transparent_65%),radial-gradient(circle_at_25%_65%,rgba(245,158,11,0.08),transparent_50%),radial-gradient(circle_at_75%_65%,rgba(244,63,94,0.08),transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        
        {/* Top Text Brand Lockup */}
        <div ref={textRef} className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-[#0b8043] bg-[#eef8f1] px-4 py-1.5 rounded-full border border-emerald-200/60 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            The PIO Experience
          </span>

          <h2 className="text-4xl sm:text-6xl font-black text-[#083b20] tracking-tight leading-tight">
            TWO FLAVOURS.<br />
            <span className="text-[#07582f]">ONE PIO.</span>
          </h2>

          <p className="text-lg sm:text-xl font-bold text-[#325340]">
            Small Sip. Big Refreshment.
          </p>

          <p className="text-sm sm:text-base text-[#4b6d57] max-w-md mx-auto font-medium">
            Whether you crave golden tropical mango or crisp floral lychee, refreshment is always just ₹10 away.
          </p>
        </div>

        {/* 3D Liquid Halo Finale Canvas */}
        <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[520px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#fbfdfc] via-[#f4faf6] to-[#edf7f1] border border-emerald-900/10 shadow-lg flex items-center justify-center mb-10">
          {!prefersReduced ? (
            <Canvas
              dpr={[1, Math.min(window.devicePixelRatio || 1, 2)]}
              camera={{ position: [0, 0.4, 5.0], fov: 42 }}
              gl={{ antialias: true, alpha: true }}
              style={{ background: 'transparent' }}
            >
              <ambientLight intensity={0.8} />
              <directionalLight position={[4, 8, 5]} intensity={1.3} color="#ffffff" castShadow />
              <directionalLight position={[-4, 2, -2]} intensity={0.4} color="#86efac" />
              <pointLight position={[0, 4, 3]} intensity={0.5} color="#fde68a" />
              <Environment preset="studio" />
              <FinaleScene scrollProgress={scrollProgress} pointer={pointer} />
            </Canvas>
          ) : (
            <div className="w-full h-full flex items-center justify-center gap-8">
              <img src="/images/pio-mango.png" alt="PIO Mango" className="h-52 object-contain drop-shadow-2xl" />
              <img src="/images/pio-lychee.png" alt="PIO Lychee" className="h-52 object-contain drop-shadow-2xl" />
            </div>
          )}
        </div>

        {/* Interactive Dual CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => go('flavours')}
            className="group inline-flex items-center gap-2.5 rounded-full bg-[#07582f] hover:bg-[#0a6d3b] text-white px-8 py-4 text-xs sm:text-sm font-black uppercase tracking-wider shadow-lg shadow-emerald-950/20 hover:-translate-y-0.5 transition-all"
          >
            <span>EXPLORE FLAVOURS</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => go('where-to-buy')}
            className="group inline-flex items-center gap-2.5 rounded-full bg-white hover:bg-slate-50 text-[#07582f] border-2 border-[#07582f] px-8 py-4 text-xs sm:text-sm font-black uppercase tracking-wider shadow-md hover:-translate-y-0.5 transition-all"
          >
            <span>FIND NEAR YOU</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 text-[#07582f]" />
          </button>
        </div>

      </div>
    </section>
  );
}
