import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, ContactShadows, Environment, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Droplets, Leaf, ShieldCheck, Waves, Wind, Eye, CheckCircle2 } from 'lucide-react';
import { fizzAudio } from '@/utils/audio';

gsap.registerPlugin(ScrollTrigger);

// ----------------------------------------------------
// SCROLLTIDE "ORCHID FLOW" SILKY FLUID SHADER
// Fluid ribbons & folding sheets illuminated from behind
// ----------------------------------------------------

const orchidVertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uScroll;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPos;

  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Multi-frequency organic silky ribbon waves
    float t = uTime * 0.7;
    float waveA = sin(pos.x * 1.8 + t * 1.1 + uMouse.x * 1.5) * cos(pos.y * 1.2 + t * 0.9) * 0.45;
    float waveB = cos(pos.x * 3.2 - t * 0.8) * sin(pos.y * 2.8 + t * 1.2 + uMouse.y * 1.2) * 0.22;
    float waveC = sin((pos.x + pos.y) * 2.0 + t * 1.4) * 0.18;
    
    pos.z += waveA + waveB + waveC + (uScroll * 0.4);
    
    vPos = pos;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const orchidFragmentShader = `
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  uniform vec3 uColorD;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPos;

  void main() {
    // Flowing gradient coordinates
    vec2 p = vUv * 2.0 - 1.0;
    float t = uTime * 0.35;
    
    float f1 = sin(p.x * 3.0 + t) * 0.5 + 0.5;
    float f2 = cos(p.y * 2.5 - t * 0.8) * 0.5 + 0.5;
    float f3 = sin((p.x + p.y) * 2.2 + t * 1.2) * 0.5 + 0.5;
    
    // Blend: Deep velvet base -> Emerald freshness -> Orchid violet / Rose flora -> Golden sunburst
    vec3 col = mix(uColorA, uColorB, f1);
    col = mix(col, uColorC, f2 * 0.7);
    col = mix(col, uColorD, f3 * 0.35);
    
    // Backlit sheet lighting & Fresnel rim shimmer (Scrolltide Orchid Flow hallmark)
    vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0) - vPos);
    float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 2.2);
    col += vec3(1.0, 0.85, 0.6) * fresnel * 0.45;
    
    // Soft specular highlight on sheet folds
    float foldLight = smoothstep(-0.2, 0.4, vPos.z);
    col += vec3(0.2, 0.35, 0.25) * foldLight;
    
    // Gentle vignette towards borders for seamless integration
    float borderFade = smoothstep(0.0, 0.2, vUv.x) * smoothstep(1.0, 0.8, vUv.x) *
                       smoothstep(0.0, 0.2, vUv.y) * smoothstep(1.0, 0.8, vUv.y);
    
    gl_FragColor = vec4(col, borderFade * 0.88);
  }
`;

function OrchidFluidBackground({ 
  scrollProgress, 
  pointer,
  colorScheme 
}: { 
  scrollProgress: React.MutableRefObject<number>;
  pointer: React.MutableRefObject<[number, number]>;
  colorScheme: number | null;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  // Custom Shader Uniforms
  const uniforms = useMemo(() => {
    return {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uScroll: { value: 0 },
      uColorA: { value: new THREE.Color('#032814') }, // Deep emerald velvet base
      uColorB: { value: new THREE.Color('#0b6b3a') }, // Fresh botanical green
      uColorC: { value: new THREE.Color('#6d28d9') }, // Orchid / Violet sheet lighting
      uColorD: { value: new THREE.Color('#f59e0b') }, // Mango gold backglow
    };
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.ShaderMaterial;
    mat.uniforms.uTime.value += delta;
    mat.uniforms.uScroll.value = scrollProgress.current;
    
    // Smooth lerp mouse coordinates
    mat.uniforms.uMouse.value.x += (pointer.current[0] - mat.uniforms.uMouse.value.x) * 0.06;
    mat.uniforms.uMouse.value.y += (pointer.current[1] - mat.uniforms.uMouse.value.y) * 0.06;

    // Dynamically shift palette when ingredient is focused
    const targetColorC = colorScheme === 0 
      ? new THREE.Color('#f59e0b') // Mango Gold
      : colorScheme === 1 
      ? new THREE.Color('#06b6d4') // Crystal Cyan
      : colorScheme === 2 
      ? new THREE.Color('#10b981') // Pure Leaf
      : colorScheme === 3 
      ? new THREE.Color('#8b5cf6') // Royal Orchid Shield
      : new THREE.Color('#581c87'); // Default Velvet Orchid

    (mat.uniforms.uColorC.value as THREE.Color).lerp(targetColorC, 0.05);
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -1.8]} rotation={[-0.1, 0, 0]}>
      <planeGeometry args={[11, 7, 64, 48]} />
      <shaderMaterial
        vertexShader={orchidVertexShader}
        fragmentShader={orchidFragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// ----------------------------------------------------
// REAL 3D PIO TETRA PACKS (TEXTURE MAPPED)
// ----------------------------------------------------

function RealisticPioMango({ position, rotation }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  const texture = useTexture('/images/pio-mango.png');
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.generateMipmaps = true;

  const width = 0.68;
  const height = 0.98;
  const depth = 0.38;

  return (
    <group position={position} rotation={rotation || [0, 0, 0]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial attach="material-0" color="#eab308" roughness={0.25} />
        <meshStandardMaterial attach="material-1" color="#ca8a04" roughness={0.25} />
        <meshStandardMaterial attach="material-2" color="#a16207" roughness={0.3} />
        <meshStandardMaterial attach="material-3" color="#78350f" roughness={0.4} />
        <meshStandardMaterial attach="material-4" map={texture} transparent={true} roughness={0.18} />
        <meshStandardMaterial attach="material-5" color="#d97706" roughness={0.3} />
      </mesh>
      {/* Top seal ridge */}
      <mesh position={[0, height / 2 + 0.025, 0]} castShadow>
        <boxGeometry args={[width * 0.98, 0.05, depth * 0.9]} />
        <meshStandardMaterial color="#b45309" roughness={0.3} />
      </mesh>
      {/* Straw */}
      <mesh position={[width * 0.28, height / 2 + 0.04, 0]} rotation={[0, 0, -0.22]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 0.12, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} />
      </mesh>
    </group>
  );
}

function RealisticPioLychee({ position, rotation }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  const texture = useTexture('/images/pio-lychee.png');
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.generateMipmaps = true;

  const width = 0.68;
  const height = 0.98;
  const depth = 0.38;

  return (
    <group position={position} rotation={rotation || [0, 0, 0]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial attach="material-0" color="#f43f5e" roughness={0.25} />
        <meshStandardMaterial attach="material-1" color="#e11d48" roughness={0.25} />
        <meshStandardMaterial attach="material-2" color="#be123c" roughness={0.3} />
        <meshStandardMaterial attach="material-3" color="#881337" roughness={0.4} />
        <meshStandardMaterial attach="material-4" map={texture} transparent={true} roughness={0.18} />
        <meshStandardMaterial attach="material-5" color="#fb7185" roughness={0.3} />
      </mesh>
      {/* Top seal ridge */}
      <mesh position={[0, height / 2 + 0.025, 0]} castShadow>
        <boxGeometry args={[width * 0.98, 0.05, depth * 0.9]} />
        <meshStandardMaterial color="#be123c" roughness={0.3} />
      </mesh>
      {/* Straw */}
      <mesh position={[width * 0.28, height / 2 + 0.04, 0]} rotation={[0, 0, -0.22]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 0.12, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} />
      </mesh>
    </group>
  );
}

// ----------------------------------------------------
// 3D REALISTIC ORBITING INGREDIENT ARTIFACTS
// ----------------------------------------------------

// 1. Organic Mango Fruit & Lychee Blossom
function RealFruitOrb({ hovered, onHover }: { hovered: boolean; onHover: (s: boolean) => void }) {
  const groupRef = useRef<THREE.Group>(null!);
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.6;
      groupRef.current.rotation.x = Math.sin(Date.now() * 0.002) * 0.15;
      const s = hovered ? 1.35 : 1.0;
      groupRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.12);
    }
  });

  return (
    <group 
      ref={groupRef} 
      onPointerOver={() => onHover(true)} 
      onPointerOut={() => onHover(false)}
      cursor="pointer"
    >
      {/* Golden Alphonso Slice */}
      <mesh position={[-0.14, 0, 0]} rotation={[0.4, 0.5, 0.2]} castShadow>
        <sphereGeometry args={[0.26, 32, 24]} />
        <meshStandardMaterial
          color={hovered ? '#fbbf24' : '#f59e0b'}
          roughness={0.2}
          metalness={0.05}
          emissive={hovered ? '#d97706' : '#92400e'}
          emissiveIntensity={hovered ? 0.45 : 0.2}
        />
      </mesh>
      {/* Crystalline Lychee Sphere */}
      <mesh position={[0.18, 0.08, 0.08]} castShadow>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.08}
          transmission={0.82}
          thickness={0.6}
          ior={1.42}
          clearcoat={1}
          emissive={hovered ? '#fda4af' : '#f43f5e'}
          emissiveIntensity={hovered ? 0.35 : 0.15}
        />
      </mesh>
      {/* Ambient Pulsing Glow Halo */}
      <mesh scale={hovered ? 1.4 : 1.1}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="#fbbf24" transparent opacity={hovered ? 0.25 : 0.1} />
      </mesh>
    </group>
  );
}

// 2. Pure Liquid Splash Droplet
function PureWaterOrb({ hovered, onHover }: { hovered: boolean; onHover: (s: boolean) => void }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.4;
      meshRef.current.rotation.z += delta * 0.3;
      const s = hovered ? 1.4 : 1.0;
      meshRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.12);
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      onPointerOver={() => onHover(true)} 
      onPointerOut={() => onHover(false)}
      castShadow
      cursor="pointer"
    >
      <sphereGeometry args={[0.28, 32, 32]} />
      <meshPhysicalMaterial
        color={hovered ? '#38bdf8' : '#7dd3fc'}
        transparent
        opacity={0.4}
        roughness={0.0}
        metalness={0.05}
        transmission={0.94}
        thickness={0.9}
        ior={1.48}
        clearcoat={1}
        clearcoatRoughness={0.02}
        emissive={hovered ? '#0284c7' : '#0369a1'}
        emissiveIntensity={hovered ? 0.4 : 0.15}
      />
    </mesh>
  );
}

// 3. Crisp Botanical Leaf
function BotanicalLeafOrb({ hovered, onHover }: { hovered: boolean; onHover: (s: boolean) => void }) {
  const groupRef = useRef<THREE.Group>(null!);
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.55;
      groupRef.current.rotation.z = Math.sin(Date.now() * 0.003) * 0.25;
      const s = hovered ? 1.35 : 1.0;
      groupRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.12);
    }
  });

  return (
    <group 
      ref={groupRef} 
      onPointerOver={() => onHover(true)} 
      onPointerOut={() => onHover(false)}
      cursor="pointer"
    >
      <mesh rotation={[0.4, 0, 0.4]} castShadow>
        <cylinderGeometry args={[0.02, 0.24, 0.52, 16]} />
        <meshStandardMaterial
          color={hovered ? '#4ade80' : '#16a34a'}
          roughness={0.25}
          metalness={0.05}
          emissive={hovered ? '#22c55e' : '#15803d'}
          emissiveIntensity={hovered ? 0.4 : 0.15}
        />
      </mesh>
    </group>
  );
}

// 4. Multi-Layer Aseptic Shield
function AsepticShieldOrb({ hovered, onHover }: { hovered: boolean; onHover: (s: boolean) => void }) {
  const groupRef = useRef<THREE.Group>(null!);
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.7;
      groupRef.current.rotation.x = Math.sin(Date.now() * 0.002) * 0.2;
      const s = hovered ? 1.4 : 1.0;
      groupRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.12);
    }
  });

  return (
    <group 
      ref={groupRef} 
      onPointerOver={() => onHover(true)} 
      onPointerOut={() => onHover(false)}
      cursor="pointer"
    >
      {/* Outer Holographic Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.26, 0.03, 16, 32]} />
        <meshStandardMaterial 
          color={hovered ? '#c084fc' : '#8b5cf6'} 
          emissive="#7c3aed" 
          emissiveIntensity={hovered ? 0.6 : 0.3} 
          roughness={0.1} 
        />
      </mesh>
      {/* Core Protective Crystal */}
      <mesh castShadow>
        <octahedronGeometry args={[0.18, 0]} />
        <meshPhysicalMaterial
          color={hovered ? '#e9d5ff' : '#ddd6fe'}
          roughness={0.05}
          transmission={0.88}
          thickness={0.5}
          ior={1.45}
          clearcoat={1}
          emissive="#6d28d9"
          emissiveIntensity={hovered ? 0.45 : 0.2}
        />
      </mesh>
    </group>
  );
}

// ----------------------------------------------------
// ORBIT SCENE COMPOSITION
// ----------------------------------------------------

function IngredientsOrbitScene({
  scrollProgress,
  pointer,
  activeIngredient,
  setActiveIngredient,
}: {
  scrollProgress: React.MutableRefObject<number>;
  pointer: React.MutableRefObject<[number, number]>;
  activeIngredient: number | null;
  setActiveIngredient: (idx: number | null) => void;
}) {
  const orbitGroupRef = useRef<THREE.Group>(null!);
  const cartonsGroupRef = useRef<THREE.Group>(null!);
  const { camera } = useThree();

  useFrame((state, delta) => {
    const t = scrollProgress.current;
    const time = state.clock.elapsedTime;

    // Smooth cinematic camera tracking
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.4 + pointer.current[1] * 0.4, 0.05);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.current[0] * 0.5, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 4.4 - t * 0.3, 0.05);

    // Continuous orbital rotation with scroll acceleration
    if (orbitGroupRef.current) {
      orbitGroupRef.current.rotation.y += delta * 0.2 + t * 0.01;
    }

    // Floating carton bounce & gyro sway
    if (cartonsGroupRef.current) {
      cartonsGroupRef.current.position.y = Math.sin(time * 1.4) * 0.06;
      cartonsGroupRef.current.rotation.y = Math.sin(time * 0.8) * 0.08 + pointer.current[0] * 0.2;
    }
  });

  const orbitRadius = 2.15;

  return (
    <group position={[0, 0, 0]}>
      {/* Background Scrolltide-inspired Orchid Fluid Flow Shader Mesh */}
      <OrchidFluidBackground 
        scrollProgress={scrollProgress} 
        pointer={pointer} 
        colorScheme={activeIngredient}
      />

      {/* Centerpiece Real Tetra Packs with Floating Physics */}
      <group ref={cartonsGroupRef} position={[0, -0.05, 0]}>
        <Float speed={2.0} rotationIntensity={0.06} floatIntensity={0.25}>
          <RealisticPioMango position={[-0.48, 0, 0.1]} rotation={[0, 0.18, -0.04]} />
        </Float>
        <Float speed={2.2} rotationIntensity={0.06} floatIntensity={0.28}>
          <RealisticPioLychee position={[0.48, 0, -0.1]} rotation={[0, -0.18, 0.04]} />
        </Float>
      </group>

      {/* 4 Orbiting 3D Pure Ingredient Artifacts */}
      <group ref={orbitGroupRef} position={[0, 0, 0]}>
        {/* 0. Real Fruit Cluster (Mango + Lychee) */}
        <group position={[orbitRadius, 0.15, 0]}>
          <RealFruitOrb 
            hovered={activeIngredient === 0} 
            onHover={(st) => setActiveIngredient(st ? 0 : null)} 
          />
        </group>

        {/* 1. Purified Water Crystal */}
        <group position={[0, -0.1, orbitRadius]}>
          <PureWaterOrb 
            hovered={activeIngredient === 1} 
            onHover={(st) => setActiveIngredient(st ? 1 : null)} 
          />
        </group>

        {/* 2. Botanical Leaf */}
        <group position={[-orbitRadius, 0.25, 0]}>
          <BotanicalLeafOrb 
            hovered={activeIngredient === 2} 
            onHover={(st) => setActiveIngredient(st ? 2 : null)} 
          />
        </group>

        {/* 3. Aseptic Shield */}
        <group position={[0, 0.1, -orbitRadius]}>
          <AsepticShieldOrb 
            hovered={activeIngredient === 3} 
            onHover={(st) => setActiveIngredient(st ? 3 : null)} 
          />
        </group>
      </group>

      {/* Realistic Soft Contact Shadows */}
      <ContactShadows position={[0, -0.72, 0]} opacity={0.35} scale={4.8} blur={2.5} far={3} />
    </group>
  );
}

// ----------------------------------------------------
// INGREDIENTS LIST DATA
// ----------------------------------------------------
const ingredientsList = [
  {
    idx: 0,
    icon: Sparkles,
    name: 'Real Mango & Lychee',
    detail: 'Sun-ripened Ratnagiri Alphonso puree & Dehradun floral lychees with zero artificial pulp filler.',
    badge: '100% Real Fruit',
    accentColor: '#f59e0b',
    border: 'hover:border-amber-400',
    activeGlow: 'from-amber-500/15 to-transparent',
    pill: 'bg-amber-100 text-amber-900',
  },
  {
    idx: 1,
    icon: Droplets,
    name: 'Multi-Stage RO Water',
    detail: 'Double RO-purified crystal spring water delivering crisp, clean hydration without metallic aftertaste.',
    badge: 'Ultra-Filtered',
    accentColor: '#06b6d4',
    border: 'hover:border-cyan-400',
    activeGlow: 'from-cyan-500/15 to-transparent',
    pill: 'bg-cyan-100 text-cyan-900',
  },
  {
    idx: 2,
    icon: Leaf,
    name: 'Botanical Extracts',
    detail: 'Nature-identical plant aromatics capturing the crisp garden bouquet in every straw sip.',
    badge: 'Natural Aroma',
    accentColor: '#10b981',
    border: 'hover:border-emerald-400',
    activeGlow: 'from-emerald-500/15 to-transparent',
    pill: 'bg-emerald-100 text-emerald-900',
  },
  {
    idx: 3,
    icon: ShieldCheck,
    name: 'Zero Preservatives',
    detail: '6-layer aseptic packaging technology eliminates the need for chemical preservatives, sodium benzoate or sulphur.',
    badge: 'Aseptic Shield',
    accentColor: '#8b5cf6',
    border: 'hover:border-violet-400',
    activeGlow: 'from-violet-500/15 to-transparent',
    pill: 'bg-purple-100 text-purple-900',
  },
];

// ----------------------------------------------------
// MAIN ENHANCED INGREDIENTS COMPONENT
// ----------------------------------------------------
export function Ingredients() {
  const sectionRef = useRef<HTMLElement>(null!);
  const scrollProgress = useRef(0);
  const pointer = useRef<[number, number]>([0, 0]);
  const [activeIngredient, setActiveIngredient] = useState<number | null>(null);
  const [fluidIntensity, setFluidIntensity] = useState<'calm' | 'active'>('active');

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (prefersReduced) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 85%',
      end: 'bottom 15%',
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
      },
    });

    return () => trigger.kill();
  }, [prefersReduced]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    pointer.current = [x * 2, -y * 2];
  };

  const handleSelectIngredient = (idx: number) => {
    setActiveIngredient(idx === activeIngredient ? null : idx);
    fizzAudio.playFizz();
  };

  return (
    <section
      id="inside"
      ref={sectionRef}
      className="relative overflow-hidden py-24 lg:py-32 bg-[#ffffff]"
    >
      {/* Scrolltide-inspired Ambient Luminous Lighting Background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_25%,rgba(7,88,47,0.08),transparent_65%),radial-gradient(circle_at_85%_75%,rgba(109,40,217,0.06),transparent_55%),radial-gradient(circle_at_15%_75%,rgba(245,158,11,0.06),transparent_55%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="mb-12 text-center max-w-3xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-white/90 px-4 py-1.5 shadow-xs backdrop-blur"
          >
            <Waves className="h-4 w-4 text-[#0b8043] animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#0b8043]">
              Liquid Orchid Flow & Natural Ingredients
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-['Space_Grotesk',sans-serif] text-4xl sm:text-6xl font-black text-[#083b20] tracking-tight leading-[1.05]"
          >
            Pure Ingredients.<br />
            <span className="bg-gradient-to-r from-[#0b8043] via-[#7c3aed] to-[#f59e0b] bg-clip-text text-transparent">
              Flowing In Harmony.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-[#325340] font-medium leading-relaxed max-w-2xl mx-auto"
          >
            Interact with the fluid orchid wave canvas below. Move your cursor to stir the liquid silky sheets and hover any orbiting element to reveal its purity.
          </motion.p>
        </div>

        {/* 3D Interactive Stage Canvas Container */}
        <div 
          onPointerMove={handlePointerMove}
          onPointerLeave={() => { pointer.current = [0, 0]; }}
          className="relative w-full h-[420px] sm:h-[500px] lg:h-[540px] rounded-[36px] overflow-hidden bg-[#02180c] border border-emerald-900/20 shadow-[0_30px_70px_rgba(2,24,12,0.25)] mb-14 transition-all duration-500"
        >
          {!prefersReduced ? (
            <Canvas
              dpr={[1, Math.min(window.devicePixelRatio || 1, 2)]}
              camera={{ position: [0, 0.4, 4.4], fov: 42 }}
              gl={{ antialias: true, alpha: true }}
              style={{ background: '#02180c' }}
            >
              <ambientLight intensity={0.9} />
              <directionalLight position={[4, 8, 5]} intensity={1.5} color="#ffffff" castShadow />
              <directionalLight position={[-4, 2, -2]} intensity={0.6} color="#86efac" />
              <pointLight position={[0, 4, 3]} intensity={0.6} color="#fef08a" />
              <pointLight position={[2, -2, 2]} intensity={0.5} color="#c084fc" />
              <Environment preset="city" />
              
              <IngredientsOrbitScene
                scrollProgress={scrollProgress}
                pointer={pointer}
                activeIngredient={activeIngredient}
                setActiveIngredient={setActiveIngredient}
              />
            </Canvas>
          ) : (
            <div className="w-full h-full flex items-center justify-center gap-8 bg-gradient-to-br from-[#064e3b] via-[#022c22] to-[#0f172a]">
              <img src="/images/pio-mango.png" alt="PIO Mango" className="h-56 object-contain drop-shadow-2xl" />
              <img src="/images/pio-lychee.png" alt="PIO Lychee" className="h-56 object-contain drop-shadow-2xl" />
            </div>
          )}

          {/* Floating Flow Control Badge */}
          <div className="absolute top-5 left-5 z-20 flex items-center gap-2 rounded-full bg-black/40 backdrop-blur-md px-3.5 py-1.5 border border-white/10 text-white/90 text-xs font-bold">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>GPU Orchid Flow Active</span>
          </div>

          {/* Interactive Inspection Pill */}
          <AnimatePresence>
            {activeIngredient !== null && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 px-6 py-2.5 rounded-full bg-white/95 border border-emerald-500/40 shadow-xl backdrop-blur-md text-xs font-black text-[#083b20] flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Inspecting: {ingredientsList[activeIngredient].name}</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                  {ingredientsList[activeIngredient].badge}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hint Overlay */}
          <div className="absolute bottom-4 right-5 z-20 text-[10px] font-bold uppercase tracking-widest text-white/50 pointer-events-none">
            Drag mouse to stir fluid sheets
          </div>
        </div>

        {/* 4 Enhanced Interactive Glassmorphism Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ingredientsList.map((item) => {
            const isSelected = activeIngredient === item.idx;
            return (
              <motion.div
                key={item.name}
                onClick={() => handleSelectIngredient(item.idx)}
                onMouseEnter={() => {
                  setActiveIngredient(item.idx);
                  fizzAudio.playFizz();
                }}
                onMouseLeave={() => setActiveIngredient(null)}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`relative overflow-hidden rounded-[28px] border p-6 transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-white shadow-[0_20px_45px_rgba(7,88,47,0.15)] border-emerald-500 ring-2 ring-emerald-500/20'
                    : 'bg-[#fcfdfc] hover:bg-white border-emerald-900/10 shadow-sm hover:shadow-md'
                }`}
              >
                {/* Dynamic Inner Glow Gradient */}
                <div 
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-b opacity-0 transition-opacity duration-300 ${
                    isSelected ? 'opacity-100' : 'group-hover:opacity-40'
                  } ${item.activeGlow}`} 
                />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center justify-between">
                    <div 
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300 ${
                        isSelected 
                          ? 'bg-[#07582f] text-white shadow-md rotate-6' 
                          : 'bg-[#eef8f1] text-[#07582f]'
                      }`}
                    >
                      <item.icon className="h-6 w-6" />
                    </div>

                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${item.pill}`}>
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-black text-[#083b20] tracking-tight">
                    {item.name}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-[#456852] font-medium leading-relaxed flex-1">
                    {item.detail}
                  </p>

                  <div className="mt-4 pt-3 border-t border-emerald-900/5 flex items-center justify-between text-[11px] font-bold text-[#07582f]">
                    <span>{isSelected ? 'Currently Viewing' : 'Hover / Tap to Focus'}</span>
                    <span className="text-sm">→</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
