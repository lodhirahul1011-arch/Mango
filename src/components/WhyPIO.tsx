import React, { useRef, useEffect, useMemo, Suspense, lazy } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, ContactShadows, Environment, MeshTransmissionMaterial } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ---------------------------------------------------------------------------
// 3D SCENE ELEMENTS (inside Canvas)
// ---------------------------------------------------------------------------

// Product carton: textured box with correct branding colors
function MangoCarton({ position, rotation }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  // Mango golden carton color scheme
  const cartonColor = '#f59e0b';
  const accentColor = '#78350f';

  return (
    <group position={position} rotation={rotation as [number, number, number] ?? [0, -0.15, 0]}>
      {/* Main carton body */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[0.55, 1.0, 0.35]} />
        <meshStandardMaterial color={cartonColor} roughness={0.18} metalness={0.06} />
      </mesh>
      {/* Top sealed part (darker gold) */}
      <mesh position={[0, 0.52, 0]} castShadow>
        <boxGeometry args={[0.55, 0.08, 0.35]} />
        <meshStandardMaterial color="#d97706" roughness={0.3} metalness={0.04} />
      </mesh>
      {/* Straw port accent */}
      <mesh position={[0.1, 0.52, 0]} castShadow>
        <cylinderGeometry args={[0.025, 0.025, 0.14, 12]} />
        <meshStandardMaterial color="#92400e" roughness={0.4} metalness={0.15} />
      </mesh>
      {/* Front face color band */}
      <mesh position={[0, 0, 0.176]} castShadow>
        <boxGeometry args={[0.54, 0.28, 0.001]} />
        <meshStandardMaterial color="#fde68a" roughness={0.5} metalness={0.02} />
      </mesh>
      {/* PIO logo area (bright white) */}
      <mesh position={[0, 0.16, 0.177]} castShadow>
        <boxGeometry args={[0.28, 0.18, 0.001]} />
        <meshStandardMaterial color="#ffffff" roughness={0.5} metalness={0.02} />
      </mesh>
      {/* Rs 10 badge (green) */}
      <mesh position={[-0.16, 0.36, 0.177]} castShadow>
        <boxGeometry args={[0.14, 0.12, 0.001]} />
        <meshStandardMaterial color="#07582f" roughness={0.4} metalness={0.06} />
      </mesh>
      {/* Bottom label */}
      <mesh position={[0, -0.34, 0.177]} castShadow>
        <boxGeometry args={[0.54, 0.18, 0.001]} />
        <meshStandardMaterial color="#92400e" roughness={0.5} />
      </mesh>
    </group>
  );
}

function LycheeCarton({ position, rotation }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  return (
    <group position={position} rotation={rotation as [number, number, number] ?? [0, 0.15, 0]}>
      {/* Main carton body */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[0.55, 1.0, 0.35]} />
        <meshStandardMaterial color="#f43f5e" roughness={0.18} metalness={0.06} />
      </mesh>
      {/* Top sealed part */}
      <mesh position={[0, 0.52, 0]} castShadow>
        <boxGeometry args={[0.55, 0.08, 0.35]} />
        <meshStandardMaterial color="#e11d48" roughness={0.3} metalness={0.04} />
      </mesh>
      {/* Straw port */}
      <mesh position={[0.1, 0.52, 0]} castShadow>
        <cylinderGeometry args={[0.025, 0.025, 0.14, 12]} />
        <meshStandardMaterial color="#881337" roughness={0.4} metalness={0.15} />
      </mesh>
      {/* Front face color band */}
      <mesh position={[0, 0, 0.176]} castShadow>
        <boxGeometry args={[0.54, 0.28, 0.001]} />
        <meshStandardMaterial color="#fda4af" roughness={0.5} metalness={0.02} />
      </mesh>
      {/* PIO logo area */}
      <mesh position={[0, 0.16, 0.177]} castShadow>
        <boxGeometry args={[0.28, 0.18, 0.001]} />
        <meshStandardMaterial color="#ffffff" roughness={0.5} metalness={0.02} />
      </mesh>
      {/* Rs 10 badge */}
      <mesh position={[-0.16, 0.36, 0.177]} castShadow>
        <boxGeometry args={[0.14, 0.12, 0.001]} />
        <meshStandardMaterial color="#07582f" roughness={0.4} metalness={0.06} />
      </mesh>
      {/* Bottom label */}
      <mesh position={[0, -0.34, 0.177]} castShadow>
        <boxGeometry args={[0.54, 0.18, 0.001]} />
        <meshStandardMaterial color="#9f1239" roughness={0.5} />
      </mesh>
    </group>
  );
}

// Glass water droplet
function GlassDroplet({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <mesh position={position} scale={scale} castShadow>
      <sphereGeometry args={[0.18, 32, 32]} />
      <meshPhysicalMaterial
        color="#a7f3d0"
        transparent
        opacity={0.35}
        roughness={0.0}
        metalness={0.05}
        transmission={0.88}
        thickness={0.6}
        ior={1.45}
        clearcoat={1}
        clearcoatRoughness={0.05}
      />
    </mesh>
  );
}

// ₹10 glossy golden coin/symbol
function RupeeBadge({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.32, 0.32, 0.08, 48]} />
        <meshStandardMaterial color="#fbbf24" roughness={0.05} metalness={0.9} />
      </mesh>
      {/* Inner ring */}
      <mesh position={[0, 0.041, 0]}>
        <cylinderGeometry args={[0.26, 0.26, 0.005, 48]} />
        <meshStandardMaterial color="#d97706" roughness={0.06} metalness={0.9} />
      </mesh>
      {/* Rim edge */}
      <mesh castShadow>
        <torusGeometry args={[0.32, 0.025, 12, 48]} />
        <meshStandardMaterial color="#92400e" roughness={0.08} metalness={0.8} />
      </mesh>
    </group>
  );
}

// Glass shield for "No Preservatives"
function GlassShield({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position} castShadow>
      <sphereGeometry args={[0.22, 16, 8, 0, Math.PI * 2, 0, Math.PI * 0.65]} />
      <meshPhysicalMaterial
        color="#86efac"
        transparent
        opacity={0.4}
        roughness={0.08}
        metalness={0.05}
        transmission={0.7}
        thickness={0.5}
        ior={1.4}
        clearcoat={1}
      />
    </mesh>
  );
}

// Mango fruit shape (simplified stylized form)
function MangoFruit({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position} rotation={[0, 0, 0.3]} castShadow>
      <sphereGeometry args={[0.15, 16, 12]} />
      <meshStandardMaterial color="#f59e0b" roughness={0.45} metalness={0.0} />
    </mesh>
  );
}

// Lychee fruit shape
function LycheeFruit({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position} castShadow>
      <sphereGeometry args={[0.13, 16, 12]} />
      <meshStandardMaterial color="#fb7185" roughness={0.5} metalness={0.0} />
    </mesh>
  );
}

// Ambient floating particles
function AmbientParticles() {
  const count = 30;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return arr;
  }, []);

  const particlesRef = useRef<THREE.Points>(null!);
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.015;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#86efac" transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

// Main 3D group reacting to mouse + scroll progress
function SceneGroup({ scrollY }: { scrollY: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null!);
  const { viewport } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouse);
    return () => window.removeEventListener('mousemove', onMouse);
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = scrollY.current;
    const isMobile = window.innerWidth < 768;

    // Scroll-driven camera push (group Z)
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, -t * 0.8, 0.04);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, -1.2 + t * 1.8, 0.04);

    // Subtle mouse tilt (desktop only, max 2deg X, 3deg Y)
    if (!isMobile) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouse.current.x * (Math.PI / 60), // max 3deg
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -mouse.current.y * (Math.PI / 90), // max 2deg
        0.05
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, -1.2, 0]}>
      {/* Two PIO Cartons Center */}
      <Float speed={1.4} rotationIntensity={0.06} floatIntensity={0.2}>
        <MangoCarton position={[-0.72, 0, 0]} />
      </Float>
      <Float speed={1.6} rotationIntensity={0.06} floatIntensity={0.25} floatingRange={[0, 0.12]}>
        <LycheeCarton position={[0.72, 0, 0]} />
      </Float>

      {/* Benefit Objects */}
      {/* ₹10 golden coin – left */}
      <Float speed={1.2} floatIntensity={0.3}>
        <RupeeBadge position={[-2.2, 0.3, 0.4]} />
      </Float>

      {/* Mango + Lychee fruits – orbiting top-right */}
      <Float speed={1.8} rotationIntensity={0.15} floatIntensity={0.4}>
        <MangoFruit position={[1.8, 0.95, 0.2]} />
      </Float>
      <Float speed={2.0} rotationIntensity={0.12} floatIntensity={0.35} floatingRange={[0, 0.1]}>
        <LycheeFruit position={[2.3, 0.5, -0.3]} />
      </Float>
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <LycheeFruit position={[2.0, 1.3, 0.4]} />
      </Float>

      {/* Glass shield – No Preservatives – back right */}
      <Float speed={1.1} floatIntensity={0.25}>
        <GlassShield position={[2.4, -0.2, -0.6]} />
      </Float>

      {/* Crystal water droplet – Refreshing Taste – left-ish */}
      <Float speed={1.7} floatIntensity={0.45}>
        <GlassDroplet position={[-2.0, 1.1, 0.5]} scale={0.9} />
      </Float>
      <Float speed={2.2} floatIntensity={0.35}>
        <GlassDroplet position={[-1.5, -0.6, 0.8]} scale={0.65} />
      </Float>

      {/* Ambient tiny particles */}
      <AmbientParticles />

      {/* Contact shadow under cartons */}
      <ContactShadows position={[0, -0.7, 0]} opacity={0.35} scale={5} blur={2.5} far={3} />
    </group>
  );
}

// ---------------------------------------------------------------------------
// HTML TEXT LAYER (outside WebGL, overlaid via absolute positioning)
// ---------------------------------------------------------------------------

const benefitItems = [
  {
    emoji: '₹10',
    title: 'Just ₹10',
    desc: 'Pocket-friendly price point for everyday school recesses and afternoon refreshment.',
    color: 'text-amber-600',
    bg: 'bg-amber-50 border-amber-200',
  },
  {
    emoji: '🥭',
    title: 'Made with Real Fruit',
    desc: 'Pure fruit pulp delivering authentic taste, natural aroma, and rich fruit mouthfeel.',
    color: 'text-emerald-700',
    bg: 'bg-emerald-50 border-emerald-200',
  },
  {
    emoji: '🛡️',
    title: 'No Added Preservatives',
    desc: 'Protected naturally through state-of-the-art aseptic multilayer carton processing.',
    color: 'text-sky-700',
    bg: 'bg-sky-50 border-sky-200',
  },
  {
    emoji: '💧',
    title: 'Refreshing Taste',
    desc: 'Perfect balance of vibrant fruit tanginess and gentle sweetness that quenches thirst.',
    color: 'text-rose-600',
    bg: 'bg-rose-50 border-rose-200',
  },
];

// ---------------------------------------------------------------------------
// MAIN EXPORT
// ---------------------------------------------------------------------------

export function WhyPIO() {
  const sectionRef = useRef<HTMLElement>(null!);
  const headlineRef = useRef<HTMLDivElement>(null!);
  const subRef = useRef<HTMLParagraphElement>(null!);
  const ctaRef = useRef<HTMLDivElement>(null!);
  const benefitsRef = useRef<HTMLDivElement>(null!);
  const scrollY = useRef(0); // 0–1 normalised scroll progress
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (prefersReduced) return;

    // Scroll progress tracker fed to the 3D scene
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      end: 'bottom 20%',
      onUpdate: (self) => { scrollY.current = self.progress; },
    });

    // GSAP text animations
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo(headlineRef.current, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' })
        .fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.45')
        .fromTo(ctaRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.35');

      // Benefit cards stagger
      if (benefitsRef.current) {
        gsap.fromTo(
          Array.from(benefitsRef.current.children),
          { opacity: 0, y: 28, scale: 0.96 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.55,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: benefitsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="why-pio"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-20 lg:py-28"
    >
      {/* Soft green ambient background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_60%_30%,rgba(7,88,47,0.06),transparent_55%),radial-gradient(ellipse_at_10%_80%,rgba(251,191,36,0.08),transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-12 lg:mb-16">
          <div className="lg:max-w-lg">
            <span className="inline-block text-xs font-black uppercase tracking-[0.25em] text-[#07582f] bg-[#eef8f1] px-4 py-1.5 rounded-full border border-emerald-200/60 mb-4">
              Why PIO?
            </span>
            <div ref={headlineRef}>
              <h2 className="text-3xl sm:text-5xl font-black text-[#083b20] tracking-tight leading-tight">
                More than just<br />
                <span className="text-[#07582f]">a drink.</span>
              </h2>
            </div>
            <p ref={subRef} className="mt-4 text-base sm:text-lg text-[#325340] leading-relaxed font-medium max-w-md">
              It's a refreshing experience for everyone. Born in Assam, crafted with food-grade purity, and designed to bring a big smile in every small sip.
            </p>
            <div ref={ctaRef} className="mt-6">
              <button
                onClick={() => go('inside')}
                className="group inline-flex items-center gap-2 rounded-full bg-[#07582f] hover:bg-[#0a6d3b] text-white px-6 py-3 text-xs font-black uppercase tracking-wider shadow-md transition-all duration-200 hover:-translate-y-0.5"
              >
                See What's Inside
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* 3D Canvas – fills the right side */}
          <div className="relative w-full lg:w-[55%] h-[380px] sm:h-[440px] lg:h-[520px] flex-shrink-0 rounded-3xl overflow-hidden bg-gradient-to-br from-[#f0fdf4] via-[#f8ffe8] to-[#fefce8]">
            {!prefersReduced ? (
              <Canvas
                dpr={[1, Math.min(window.devicePixelRatio, 2)]}
                camera={{ position: [0, 0.5, 5.5], fov: 38 }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
              >
                <ambientLight intensity={0.7} />
                <directionalLight
                  position={[3, 8, 5]}
                  intensity={1.2}
                  color="#ffffff"
                  castShadow
                  shadow-mapSize={[1024, 1024]}
                />
                <directionalLight position={[-4, 2, -2]} intensity={0.35} color="#86efac" />
                <pointLight position={[0, 4, 3]} intensity={0.5} color="#fde68a" />
                <Environment preset="studio" />
                <SceneGroup scrollY={scrollY} />
              </Canvas>
            ) : (
              // Reduced-motion fallback: static product renders
              <div className="w-full h-full flex items-center justify-center gap-6">
                <img src="/images/pio-mango.png" alt="PIO Mango" className="h-40 object-contain drop-shadow-2xl" />
                <img src="/images/pio-lychee.png" alt="PIO Lychee" className="h-40 object-contain drop-shadow-2xl" />
              </div>
            )}
          </div>
        </div>

        {/* Four benefit cards – HTML, outside WebGL */}
        <div ref={benefitsRef} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefitItems.map((item) => (
            <div
              key={item.title}
              className={`group rounded-3xl border p-5 sm:p-6 ${item.bg} backdrop-blur-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-default`}
            >
              <div className={`text-2xl mb-3 ${item.color} font-black`}>{item.emoji}</div>
              <h3 className={`text-base font-black ${item.color} mb-2`}>{item.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
