import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
  isOrb: boolean
}

const COLORS = [
  'rgba(181,123,238,',
  'rgba(232,121,249,',
  'rgba(124,58,237,',
  'rgba(168,85,247,',
]

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000, active: false })
  const particlesRef = useRef<Particle[]>([])
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true }
    }
    const onMouseLeave = () => {
      mouseRef.current.active = false
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)

    const count = Math.min(70, Math.floor((window.innerWidth * window.innerHeight) / 16000))
    particlesRef.current = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      size: i < 6 ? Math.random() * 2 + 3 : Math.random() * 1.5 + 0.5,
      opacity: i < 6 ? Math.random() * 0.3 + 0.15 : Math.random() * 0.2 + 0.06,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      isOrb: i < 6,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const particles = particlesRef.current
      const mouse = mouseRef.current

      for (const p of particles) {
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        // Mouse attraction
        if (mouse.active && dist < 160) {
          const force = (160 - dist) / 160 * 0.012
          p.vx += (dx / dist) * force
          p.vy += (dy / dist) * force
        }

        // Speed cap
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed > 1.2) {
          p.vx = (p.vx / speed) * 1.2
          p.vy = (p.vy / speed) * 1.2
        }

        p.vx *= 0.997
        p.vy *= 0.997
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color + p.opacity + ')'
        ctx.fill()
      }

      // Connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          const threshold = 90

          if (dist < threshold) {
            // Boost visibility near mouse
            const midX = (particles[i].x + particles[j].x) / 2
            const midY = (particles[i].y + particles[j].y) / 2
            const mdx = mouse.x - midX
            const mdy = mouse.y - midY
            const mouseDist = Math.sqrt(mdx * mdx + mdy * mdy)
            const proximityBoost = mouse.active ? Math.max(0, 1 - mouseDist / 200) * 0.2 : 0

            const opacity = (1 - dist / threshold) * 0.12 + proximityBoost
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(181,123,238,${opacity})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return <canvas ref={canvasRef} id="particle-canvas" aria-hidden="true" />
}
