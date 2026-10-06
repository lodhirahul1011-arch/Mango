import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Droplets, Leaf, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ----------------------------------------------------
// 3D INGREDIENTS ORBIT & ENVIRONMENT
// ----------------------------------------------------

// Center Carton 1: Mango
function MiniMangoCarton({ position, rotation }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation || [0, -0.15, 0]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.5, 0.9, 0.32]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.18} metalness={0.06} />
      </mesh>
      <mesh position={[0, 0.47, 0]} castShadow>
        <boxGeometry args={[0.5, 0.06, 0.32]} />
        <meshStandardMaterial color="#d97706" roughness={0.3} />
      </mesh>
      {/* Front Label Strip */}
      <mesh position={[0, 0, 0.161]}>
        <boxGeometry args={[0.48, 0.25, 0.001]} />
        <meshStandardMaterial color="#fef3c7" roughness={0.4} />
      </mesh>
    </group>
  );
}

// Center Carton 2: Lychee
function MiniLycheeCarton({ position, rotation }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation || [0, 0.15, 0]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.5, 0.9, 0.32]} />
        <meshStandardMaterial color="#f43f5e" roughness={0.18} metalness={0.06} />
      </mesh>
      <mesh position={[0, 0.47, 0]} castShadow>
        <boxGeometry args={[0.5, 0.06, 0.32]} />
        <meshStandardMaterial color="#e11d48" roughness={0.3} />
      </mesh>
      {/* Front Label Strip */}
      <mesh position={[0, 0, 0.161]}>
        <boxGeometry args={[0.48, 0.25, 0.001]} />
        <meshStandardMaterial color="#ffe4e6" roughness={0.4} />
      </mesh>
    </group>
  );
}

// 1. Realistic Fruit Cluster (Mango + Peeled Lychee)
function FruitCluster({
  hovered,
  onHover,
}: {
  hovered: boolean;
  onHover: (state: boolean) => void;
}) {
  const meshRef = useRef<THREE.Group>(null!);
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
      const targetScale = hovered ? 1.25 : 1.0;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group
      ref={meshRef}
      onPointerOver={() => onHover(true)}
      onPointerOut={() => onHover(false)}
      cursor="pointer"
    >
      {/* Mango slice */}
      <mesh position={[-0.15, 0, 0]} rotation={[0.2, 0.3, 0.4]} castShadow>
        <sphereGeometry args={[0.22, 24, 20]} />
        <meshStandardMaterial
          color={hovered ? '#fbbf24' : '#f59e0b'}
          roughness={0.25}
          metalness={0.05}
          emissive={hovered ? '#f59e0b' : '#000000'}
          emissiveIntensity={0.3}
        />
      </mesh>
      {/* Peeled Lychee orb */}
      <mesh position={[0.18, 0.05, 0.05]} castShadow>
        <sphereGeometry args={[0.16, 24, 20]} />
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.1}
          transmission={0.7}
          thickness={0.5}
          ior={1.38}
          emissive={hovered ? '#fda4af' : '#000000'}
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
}

// 2. Crystal Clear Water Droplet
function WaterDroplet({
  hovered,
  onHover,
}: {
  hovered: boolean;
  onHover: (state: boolean) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.z += delta * 0.2;
      const targetScale = hovered ? 1.3 : 1.0;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => onHover(true)}
      onPointerOut={() => onHover(false)}
      castShadow
    >
      <sphereGeometry args={[0.24, 32, 32]} />
      <meshPhysicalMaterial
        color={hovered ? '#67e8f9' : '#a5f3fc'}
        transparent
        opacity={0.35}
        roughness={0.0}
        metalness={0.05}
        transmission={0.92}
        thickness={0.8}
        ior={1.48}
        clearcoat={1}
        clearcoatRoughness={0.05}
        emissive={hovered ? '#38bdf8' : '#000000'}
        emissiveIntensity={0.25}
      />
    </mesh>
  );
}

// 3. Fresh Natural Green Leaves
function GreenLeaf({
  hovered,
  onHover,
}: {
  hovered: boolean;
  onHover: (state: boolean) => void;
}) {
  const meshRef = useRef<THREE.Group>(null!);
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
      meshRef.current.rotation.z = Math.sin(Date.now() * 0.002) * 0.2;
      const targetScale = hovered ? 1.25 : 1.0;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group
      ref={meshRef}
      onPointerOver={() => onHover(true)}
      onPointerOut={() => onHover(false)}
    >
      <mesh rotation={[0.4, 0, 0.3]} castShadow>
        <cylinderGeometry args={[0.02, 0.2, 0.45, 12]} />
        <meshStandardMaterial
          color={hovered ? '#4ade80' : '#15803d'}
          roughness={0.3}
          metalness={0.05}
          emissive={hovered ? '#22c55e' : '#000000'}
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
}

// 4. Transparent "No Preservatives" Shield
function PreservativeShield({
  hovered,
  onHover,
}: {
  hovered: boolean;
  onHover: (state: boolean) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.35;
      const targetScale = hovered ? 1.3 : 1.0;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => onHover(true)}
      onPointerOut={() => onHover(false)}
      castShadow
    >
      <sphereGeometry args={[0.26, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.7]} />
      <meshPhysicalMaterial
        color={hovered ? '#86efac' : '#bbf7d0'}
        transparent
        opacity={0.4}
        roughness={0.08}
        metalness={0.05}
        transmission={0.75}
        thickness={0.6}
        ior={1.42}
        clearcoat={1}
        emissive={hovered ? '#10b981' : '#000000'}
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

// Orbiting Scene Group reacting to scroll
function IngredientsOrbitScene({
  scrollProgress,
  activeIngredient,
  setActiveIngredient,
}: {
  scrollProgress: React.MutableRefObject<number>;
  activeIngredient: number | null;
  setActiveIngredient: (idx: number | null) => void;
}) {
  const orbitGroupRef = useRef<THREE.Group>(null!);
  const cartonsRef = useRef<THREE.Group>(null!);
  const { camera } = useThree();

  useFrame((state) => {
    const t = scrollProgress.current; // 0 to 1
    const time = state.clock.elapsedTime;

    // Camera move based on scroll: 0-25% starts high, moves down, pushes forward
    camera.position.y = THREE.MathUtils.lerp(1.8, 0.4, t);
    camera.position.z = THREE.MathUtils.lerp(5.2, 4.3, t);

    // Orbit group rotation: continuous gentle spin + scroll scrub
    if (orbitGroupRef.current) {
      orbitGroupRef.current.rotation.y = time * 0.15 + t * Math.PI * 1.5;
    }

    // Cartons subtle float
    if (cartonsRef.current) {
      cartonsRef.current.position.y = Math.sin(time * 1.2) * 0.08;
      cartonsRef.current.rotation.y = Math.sin(time * 0.6) * 0.05;
    }
  });

  const orbitRadius = 2.0;

  return (
    <group position={[0, 0, 0]}>
      {/* Center 2 PIO Cartons */}
      <group ref={cartonsRef}>
        <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.2}>
          <MiniMangoCarton position={[-0.45, 0, 0]} />
        </Float>
        <Float speed={1.7} rotationIntensity={0.05} floatIntensity={0.22}>
          <MiniLycheeCarton position={[0.45, 0, 0]} />
        </Float>
      </group>

      {/* 4 Orbiting 3D Objects on circular path */}
      <group ref={orbitGroupRef}>
        {/* Ingredient 0: Real Mango / Lychee (angle = 0) */}
        <group position={[orbitRadius, 0.2, 0]}>
          <FruitCluster
            hovered={activeIngredient === 0}
            onHover={(st) => setActiveIngredient(st ? 0 : null)}
          />
        </group>

        {/* Ingredient 1: Purified Water (angle = PI/2) */}
        <group position={[0, -0.15, orbitRadius]}>
          <WaterDroplet
            hovered={activeIngredient === 1}
            onHover={(st) => setActiveIngredient(st ? 1 : null)}
          />
        </group>

        {/* Ingredient 2: Natural Green Leaves (angle = PI) */}
        <group position={[-orbitRadius, 0.35, 0]}>
          <GreenLeaf
            hovered={activeIngredient === 2}
            onHover={(st) => setActiveIngredient(st ? 2 : null)}
          />
        </group>

        {/* Ingredient 3: No Preservatives Shield (angle = 3PI/2) */}
        <group position={[0, 0.1, -orbitRadius]}>
          <PreservativeShield
            hovered={activeIngredient === 3}
            onHover={(st) => setActiveIngredient(st ? 3 : null)}
          />
        </group>
      </group>

      {/* Contact Shadow beneath products */}
      <ContactShadows position={[0, -0.65, 0]} opacity={0.3} scale={4.5} blur={2.2} far={2.5} />
    </group>
  );
}

// ----------------------------------------------------
// INGREDIENTS LIST DATA FOR HTML CARDS
// ----------------------------------------------------
const ingredientsList = [
  {
    idx: 0,
    icon: Sparkles,
    name: 'Real Mango & Lychee',
    detail: 'Sun-ripened fruit pulp puree delivering authentic texture, vibrant aroma and natural nutrients.',
    badge: 'Fruit-First',
    color: 'text-amber-600',
    border: 'border-amber-200',
    bg: 'bg-amber-50/70',
  },
  {
    idx: 1,
    icon: Droplets,
    name: 'Purified Water',
    detail: 'Multi-stage RO filtered pure crystal water ensuring crisp, hygienic thirst refreshment in every pack.',
    badge: 'Ultra-Pure',
    color: 'text-cyan-600',
    border: 'border-cyan-200',
    bg: 'bg-cyan-50/70',
  },
  {
    idx: 2,
    icon: Leaf,
    name: 'Natural Flavours',
    detail: 'Nature-identical botanicals and fruit oils that preserve genuine orchard freshness without bitterness.',
    badge: 'Wholesome',
    color: 'text-emerald-700',
    border: 'border-emerald-200',
    bg: 'bg-emerald-50/70',
  },
  {
    idx: 3,
    icon: ShieldCheck,
    name: 'No Added Preservatives',
    detail: 'State-of-the-art multi-barrier aseptic packaging locks in freshness naturally without chemical additives.',
    badge: 'Clean Label',
    color: 'text-green-700',
    border: 'border-green-200',
    bg: 'bg-green-50/70',
  },
];

// ----------------------------------------------------
// MAIN INGREDIENTS COMPONENT
// ----------------------------------------------------
export function Ingredients() {
  const sectionRef = useRef<HTMLElement>(null!);
  const cardsRef = useRef<HTMLDivElement>(null!);
  const scrollProgress = useRef(0);
  const [activeIngredient, setActiveIngredient] = useState<number | null>(null);

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

    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        gsap.fromTo(
          Array.from(cardsRef.current.children),
          { opacity: 0, y: 30, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="inside"
      ref={sectionRef}
      className="relative overflow-hidden py-20 lg:py-28 bg-[#ffffff]"
    >
      {/* Soft volumetric green/fresh glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(7,88,47,0.06),transparent_60%),radial-gradient(circle_at_85%_80%,rgba(251,191,36,0.06),transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-[#0b8043] bg-[#eef8f1] px-4 py-1.5 rounded-full border border-emerald-200/60 shadow-xs">
            What's Inside?
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-black text-[#083b20] tracking-tight leading-tight">
            Simple ingredients.<br />
            <span className="text-[#0b8043]">Real goodness.</span>
          </h2>
          <p className="mt-3 text-base text-[#3b5e48] font-medium">
            Hover over any orbiting 3D ingredient to explore its natural purity.
          </p>
        </div>

        {/* 3D Interactive Ingredient Universe Canvas */}
        <div className="relative w-full h-[360px] sm:h-[440px] lg:h-[480px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#f9fdfa] via-[#f1f9f4] to-[#eaf5ee] border border-emerald-900/10 shadow-sm mb-12">
          {!prefersReduced ? (
            <Canvas
              dpr={[1, Math.min(window.devicePixelRatio || 1, 2)]}
              camera={{ position: [0, 0.8, 5.0], fov: 42 }}
              gl={{ antialias: true, alpha: true }}
              style={{ background: 'transparent' }}
            >
              <ambientLight intensity={0.75} />
              <directionalLight
                position={[3, 8, 5]}
                intensity={1.2}
                color="#ffffff"
                castShadow
              />
              <directionalLight position={[-4, 2, -2]} intensity={0.4} color="#86efac" />
              <pointLight position={[0, 4, 3]} intensity={0.45} color="#fef08a" />
              <Environment preset="city" />
              <IngredientsOrbitScene
                scrollProgress={scrollProgress}
                activeIngredient={activeIngredient}
                setActiveIngredient={setActiveIngredient}
              />
            </Canvas>
          ) : (
            <div className="w-full h-full flex items-center justify-center gap-6">
              <img
                src="/images/pio-mango.png"
                alt="PIO Mango"
                className="h-44 object-contain drop-shadow-xl"
              />
              <img
                src="/images/pio-lychee.png"
                alt="PIO Lychee"
                className="h-44 object-contain drop-shadow-xl"
              />
            </div>
          )}

          {/* Interactive Floating Tooltip Indicator */}
          {activeIngredient !== null && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full bg-white/95 border border-emerald-600/30 shadow-lg backdrop-blur-md text-xs font-black text-[#083b20] transition-all">
              ✨ Viewing: {ingredientsList[activeIngredient].name}
            </div>
          )}
        </div>

        {/* 4 Interactive Feature Cards below 3D scene */}
        <div
          ref={cardsRef}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {ingredientsList.map((item) => {
            const isHovered = activeIngredient === item.idx;
            return (
              <div
                key={item.name}
                onMouseEnter={() => setActiveIngredient(item.idx)}
                onMouseLeave={() => setActiveIngredient(null)}
                className={`rounded-3xl border ${item.border} ${item.bg} p-6 text-center transition-all duration-300 cursor-pointer ${
                  isHovered ? 'scale-[1.03] shadow-lg -translate-y-1 bg-white' : 'hover:shadow-md'
                }`}
              >
                <div
                  className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${
                    isHovered ? 'bg-[#07582f] text-white shadow-md' : 'bg-white text-[#07582f]'
                  } transition-all duration-300 shadow-2xs`}
                >
                  <item.icon className="h-7 w-7" />
                </div>
                <span className="mt-4 inline-block text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-white/80 px-2.5 py-0.5 rounded-md border border-emerald-900/10">
                  {item.badge}
                </span>
                <h3 className="mt-2 text-lg font-black text-[#083b20]">
                  {item.name}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#456852] leading-relaxed">
                  {item.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
