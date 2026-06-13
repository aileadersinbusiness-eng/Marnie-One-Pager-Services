import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import { useRef, useMemo, Suspense } from 'react'
import * as THREE from 'three'
import { NeuralSphere } from './FloatingObject3D'

/* ── node positions in 3-space ─────────────────────────────── */
const RAW_NODES: [number, number, number][] = [
  [0, 0, 0],
  [1.3, 0.5, 0.4],
  [-1.2, 0.6, 0.1],
  [0.3, 1.4, 0.3],
  [0.4, -1.3, 0.1],
  [0.8, 0.7, 1.1],
  [-0.7, 0.8, -1.0],
  [-0.2, -0.6, 1.2],
  [1.0, -0.5, -0.8],
]

const CONNECTION_THRESHOLD = 2.2

/* ── Rings ─────────────────────────────────────────────────── */
function OrbRing({
  radius, tube, rotation, color, opacity, speed,
}: {
  radius: number; tube: number; rotation: [number, number, number]
  color: string; opacity: number; speed: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((_, d) => {
    if (!ref.current) return
    ref.current.rotation.x += d * speed * 0.4
    ref.current.rotation.z += d * speed * 0.2
  })
  return (
    <mesh ref={ref} rotation={rotation}>
      <torusGeometry args={[radius, tube, 8, 140]} />
      <meshBasicMaterial color={new THREE.Color(color)} transparent opacity={opacity} />
    </mesh>
  )
}

/* ── Main scene ─────────────────────────────────────────────── */
function OrbScene({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const coreRef = useRef<THREE.Mesh>(null)
  const { pointer } = useThree()

  const connections = useMemo(() => {
    const lines: [number, number, number][][] = []
    for (let i = 0; i < RAW_NODES.length; i++) {
      for (let j = i + 1; j < RAW_NODES.length; j++) {
        const a = new THREE.Vector3(...RAW_NODES[i])
        const b = new THREE.Vector3(...RAW_NODES[j])
        if (a.distanceTo(b) < CONNECTION_THRESHOLD) {
          lines.push([RAW_NODES[i], RAW_NODES[j]])
        }
      }
    }
    return lines
  }, [])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    // Gentle auto-rotation
    groupRef.current.rotation.y += delta * 0.09
    // Mouse-influenced tilt
    groupRef.current.rotation.x += (pointer.y * 0.25 - groupRef.current.rotation.x) * 0.04
    groupRef.current.rotation.y += pointer.x * 0.008
    // Scroll-based: tighten slightly as user scrolls
    groupRef.current.scale.setScalar(1 - scrollProgress * 0.15)
    // Core pulse
    if (coreRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.07
      coreRef.current.scale.setScalar(pulse)
    }
  })

  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.25} />
      <pointLight position={[3, 3, 3]} intensity={0.8} color="#b57bee" />
      <pointLight position={[-3, -2, -3]} intensity={0.5} color="#e879f9" />
      <pointLight position={[0, 0, 3]} intensity={0.4} color="#c4b5fd" />

      <group ref={groupRef}>
        {/* Central glass sphere */}
        <mesh>
          <sphereGeometry args={[0.72, 40, 40]} />
          <meshPhysicalMaterial
            color={new THREE.Color('#1e0753')}
            emissive={new THREE.Color('#5b21b6')}
            emissiveIntensity={0.35}
            metalness={0.05}
            roughness={0.08}
            transparent
            opacity={0.72}
          />
        </mesh>

        {/* Inner glow core */}
        <mesh ref={coreRef}>
          <sphereGeometry args={[0.28, 16, 16]} />
          <meshBasicMaterial color={new THREE.Color('#e879f9')} transparent opacity={0.55} />
        </mesh>

        {/* Rings */}
        <OrbRing radius={1.25} tube={0.014} rotation={[Math.PI / 2, 0, 0]} color="#b57bee" opacity={0.85} speed={0.3} />
        <OrbRing radius={1.6}  tube={0.01}  rotation={[Math.PI / 4, Math.PI / 6, 0]} color="#a855f7" opacity={0.55} speed={-0.2} />
        <OrbRing radius={1.95} tube={0.007} rotation={[-Math.PI / 3, Math.PI / 4, 0.3]} color="#c026d3" opacity={0.3} speed={0.15} />

        {/* Nodes */}
        {RAW_NODES.map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]}>
            <sphereGeometry args={[i === 0 ? 0 : 0.055, 10, 10]} />
            <meshBasicMaterial
              color={new THREE.Color(i === 0 ? '#f0abfc' : '#ddd6fe')}
              transparent
              opacity={0.9}
            />
          </mesh>
        ))}

        {/* Connection lines */}
        {connections.map((pair, i) => (
          <Line
            key={i}
            points={pair as [number, number, number][]}
            color="#a78bfa"
            lineWidth={0.6}
            transparent
            opacity={0.25}
          />
        ))}
      </group>
    </>
  )
}

/* ── Canvas wrapper ─────────────────────────────────────────── */
export default function HeroOrb({ className = '' }: { className?: string }) {

  // Check WebGL support
  if (typeof window !== 'undefined') {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) return <NeuralSphere className={className} />
    } catch {
      return <NeuralSphere className={className} />
    }
  }

  return (
    <div className={`w-full h-full ${className}`} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <OrbScene scrollProgress={0} />
        </Suspense>
      </Canvas>
    </div>
  )
}
