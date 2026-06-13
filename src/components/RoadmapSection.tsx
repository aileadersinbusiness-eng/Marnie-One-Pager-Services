import {
  motion, AnimatePresence,
  useScroll, useTransform, useSpring, useMotionValueEvent,
} from 'framer-motion'
import { useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { Target, Zap, Wrench, TrendingUp } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/* ── Stage data ─────────────────────────────────────────────── */
interface Stage {
  number: string
  title: string
  subtitle: string
  description: string
  offers: string[]
  outcome: string
  icon: LucideIcon
  accentColor: string
  glowColor: string
  gradientFrom: string
  gradientTo: string
}

const stages: Stage[] = [
  {
    number: '01',
    title: 'Clarify',
    subtitle: 'Diagnose. Discover. Direct.',
    description: 'Diagnose where AI is now and identify the highest-value opportunities for your organisation with expert guidance.',
    offers: ['Complimentary Strategy Call', 'AI Power Hour — £295', 'In-Person Strategy Session — £600'],
    outcome: 'Direction and confidence',
    icon: Target,
    accentColor: '#a78bfa',
    glowColor: 'rgba(139,92,246,',
    gradientFrom: '#1e0d3e',
    gradientTo: '#2e1065',
  },
  {
    number: '02',
    title: 'Align',
    subtitle: 'Strategy. Ownership. Momentum.',
    description: 'Move from fragmented experimentation to shared strategic focus with a clear roadmap and defined ownership.',
    offers: ['AI Business Transformation Workshop — £1,200', '30-min planning call', 'Post-workshop support session'],
    outcome: 'Ownership and momentum',
    icon: Zap,
    accentColor: '#e879f9',
    glowColor: 'rgba(217,70,239,',
    gradientFrom: '#1f0d3d',
    gradientTo: '#3b0764',
  },
  {
    number: '03',
    title: 'Implement',
    subtitle: 'Systems. Workflows. Capability.',
    description: 'Transform strategy into embedded systems, AI workflows, and practical capability your team can own and scale.',
    offers: ['Consultancy Packages — £5,000–£15,000', 'AI agents & IP tools', 'Tool training & adoption support'],
    outcome: 'Capability and execution',
    icon: Wrench,
    accentColor: '#c084fc',
    glowColor: 'rgba(192,132,252,',
    gradientFrom: '#1a0c38',
    gradientTo: '#2d1b69',
  },
  {
    number: '04',
    title: 'Scale',
    subtitle: 'Influence. Culture. Advantage.',
    description: 'Expand capability across your organisation, strengthen AI culture, and amplify your influence in the market.',
    offers: ['Keynotes — £1,500–£5,000', 'AI Clinics & JV Days — from £1,500/day', 'Industry programmes & roundtables'],
    outcome: 'Leadership and advantage',
    icon: TrendingUp,
    accentColor: '#f0abfc',
    glowColor: 'rgba(236,72,153,',
    gradientFrom: '#1e0d3e',
    gradientTo: '#4a044e',
  },
]

/* ── Stage card ─────────────────────────────────────────────── */
function StageCard({ stage, compact = false }: { stage: Stage; compact?: boolean }) {
  const Icon = stage.icon
  return (
    <div
      className="h-full w-full rounded-2xl relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${stage.gradientFrom}, ${stage.gradientTo})`,
        border: `1px solid ${stage.glowColor}0.3)`,
        boxShadow: `0 0 60px ${stage.glowColor}0.12), 0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)`,
      }}
    >
      {/* Top shimmer */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${stage.accentColor}80, transparent)` }} />
      {/* Corner glow */}
      <div className="absolute top-0 right-0 w-56 h-56 rounded-full blur-3xl pointer-events-none" style={{ background: `${stage.glowColor}0.08)` }} />

      <div className={`relative z-10 flex flex-col h-full ${compact ? 'p-5' : 'p-8 md:p-10'}`}>
        {/* Stage number + icon */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div
              className="text-xs font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full"
              style={{ background: `${stage.glowColor}0.15)`, border: `1px solid ${stage.glowColor}0.4)`, color: stage.accentColor }}
            >
              Stage {stage.number}
            </div>
          </div>
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ background: `${stage.glowColor}0.15)`, border: `1px solid ${stage.glowColor}0.4)` }}
          >
            <Icon className="w-5 h-5" style={{ color: stage.accentColor }} />
          </div>
        </div>

        {/* Title */}
        <div className="mb-2">
          <h3
            className={`font-black tracking-tight leading-none ${compact ? 'text-4xl' : 'text-5xl md:text-6xl'}`}
            style={{
              background: `linear-gradient(135deg, #ffffff, ${stage.accentColor})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {stage.title}
          </h3>
          <p className="text-sm font-medium mt-1" style={{ color: stage.accentColor + 'cc' }}>
            {stage.subtitle}
          </p>
        </div>

        {/* Description */}
        {!compact && (
          <p className="text-gray-300 leading-relaxed text-base mb-6 max-w-lg">
            {stage.description}
          </p>
        )}

        {/* Offers */}
        {!compact && (
          <div className="flex-1 space-y-2 mb-6">
            {stage.offers.map((offer) => (
              <div key={offer} className="flex items-start gap-3">
                <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ background: stage.accentColor }} />
                <span className="text-sm text-gray-300">{offer}</span>
              </div>
            ))}
          </div>
        )}

        {/* Outcome badge */}
        <div className="mt-auto">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
            style={{ background: `${stage.glowColor}0.12)`, border: `1px solid ${stage.glowColor}0.35)`, color: stage.accentColor }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: stage.accentColor }} />
            Outcome: {stage.outcome}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Neural pathway SVG ─────────────────────────────────────── */
function NeuralPathway({ progress, activeIndex }: { progress: number; activeIndex: number }) {
  const totalLength = 360
  const filledLength = progress * totalLength

  return (
    <svg viewBox="0 0 40 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-full">
      {/* Track */}
      <path d="M20 20 Q20 110 20 110 Q20 120 20 120 Q20 130 20 130 Q20 220 20 220 Q20 230 20 230 Q20 240 20 240 Q20 330 20 330 Q20 340 20 340"
        stroke="rgba(255,255,255,0.06)" strokeWidth="2" strokeLinecap="round" />

      {/* Animated fill */}
      <motion.path
        d="M20 20 Q20 110 20 110 Q20 120 20 120 Q20 130 20 130 Q20 220 20 220 Q20 230 20 230 Q20 240 20 240 Q20 330 20 330 Q20 340 20 340"
        stroke="url(#pathGrad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={totalLength}
        strokeDashoffset={totalLength - filledLength}
      />

      {/* Stage dots */}
      {stages.map((stage, i) => {
        const y = 20 + i * 110
        const isActive = i === activeIndex
        const isDone = i < activeIndex
        return (
          <g key={stage.number}>
            {/* Glow ring */}
            {isActive && (
              <motion.circle
                cx="20" cy={y} r="14"
                fill="none"
                stroke={stage.accentColor}
                strokeWidth="1"
                opacity="0.4"
                animate={{ r: [12, 16, 12], opacity: [0.4, 0.1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
            {/* Dot */}
            <motion.circle
              cx="20" cy={y} r={isActive ? 8 : 5}
              fill={isDone || isActive ? stage.accentColor : 'rgba(255,255,255,0.15)'}
              animate={{ r: isActive ? 8 : 5 }}
              transition={{ duration: 0.4 }}
            />
            {/* Number label */}
            <text
              x="20" y={y + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="5"
              fontWeight="700"
              fill={isActive || isDone ? '#1a0a2e' : 'rgba(255,255,255,0.4)'}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {stage.number}
            </text>
          </g>
        )
      })}

      <defs>
        <linearGradient id="pathGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="50%" stopColor="#e879f9" />
          <stop offset="100%" stopColor="#f0abfc" />
        </linearGradient>
      </defs>
    </svg>
  )
}

/* ── Mobile: linear cards ────────────────────────────────────── */
function MobileStageCard({ stage }: { stage: Stage }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.05 }}
      className="h-[460px]"
    >
      <StageCard stage={stage} />
    </motion.div>
  )
}

function MobileRoadmap() {
  return (
    <div className="space-y-6 md:hidden">
      {stages.map((stage) => (
        <MobileStageCard key={stage.number} stage={stage} />
      ))}
    </div>
  )
}

/* ── Desktop: immersive sticky scroll ───────────────────────── */
function DesktopJourney() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 55, damping: 22 })
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [pathwayProgress, setPathwayProgress] = useState(0)
  const prevIndex = useRef(0)

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(3, Math.floor(v * 4))
    if (next !== prevIndex.current) {
      setDirection(next > prevIndex.current ? 1 : -1)
      setActiveIndex(next)
      prevIndex.current = next
    }
    setPathwayProgress(v)
  })

  const navOpacity = useTransform(smoothProgress, [0, 0.05], [0, 1])

  /* card enter/exit variants */
  const variants = {
    enter: (d: number) => ({
      y: d > 0 ? 60 : -60,
      scale: 0.93,
      opacity: 0,
    }),
    center: { y: 0, scale: 1, opacity: 1 },
    exit: (d: number) => ({
      y: d > 0 ? -60 : 60,
      scale: 0.93,
      opacity: 0,
    }),
  }

  return (
    // Tall scroll container
    <div ref={sectionRef} style={{ height: '500vh' }} className="hidden md:block">
      {/* Sticky inner */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a2e] via-[#2d1057]/60 to-[#1a0a2e]" />
        <div className="absolute inset-0 bg-gradient-radial from-purple-700/10 via-transparent to-transparent" />

        <div className="relative z-10 flex flex-col h-full max-w-7xl mx-auto px-8 lg:px-12">
          {/* Title row */}
          <motion.div style={{ opacity: navOpacity }} className="pt-12 pb-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-xs font-semibold text-purple-300 uppercase tracking-widest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              The Journey
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold">
              The AI Transformation{' '}
              <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-gray-400 mt-2 text-sm">A strategic path from experimentation to embedded capability.</p>
          </motion.div>

          {/* Main layout: pathway + card stack + info */}
          <div className="flex-1 flex items-center gap-8 pb-8">
            {/* Neural pathway */}
            <motion.div style={{ opacity: navOpacity }} className="flex-shrink-0 h-[340px]">
              <NeuralPathway progress={pathwayProgress} activeIndex={activeIndex} />
            </motion.div>

            {/* Stage labels column */}
            <motion.div style={{ opacity: navOpacity }} className="flex-shrink-0 w-28 h-[340px] flex flex-col justify-between">
              {stages.map((s, i) => (
                <button
                  key={s.number}
                  onClick={() => {
                    if (!sectionRef.current) return
                    const rect = sectionRef.current.getBoundingClientRect()
                    const targetY = window.scrollY + rect.top + (i / 4) * sectionRef.current.offsetHeight
                    window.scrollTo({ top: targetY, behavior: 'smooth' })
                  }}
                  className={`text-left transition-all duration-300 ${i === activeIndex ? 'opacity-100' : 'opacity-35 hover:opacity-60'}`}
                >
                  <div className="text-xs font-black uppercase tracking-widest" style={{ color: i === activeIndex ? s.accentColor : '#6b7280' }}>
                    {s.number}
                  </div>
                  <div className={`text-sm font-semibold mt-0.5 ${i === activeIndex ? 'text-white' : 'text-gray-500'}`}>
                    {s.title}
                  </div>
                </button>
              ))}
            </motion.div>

            {/* Card stack */}
            <div className="flex-1 relative" style={{ height: '520px', perspective: '1200px' }}>
              {/* Ghost: stage behind (previous) */}
              {activeIndex > 0 && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    transform: 'scale(0.91) translateY(-18px)',
                    opacity: 0.22,
                    filter: 'blur(1.5px)',
                    zIndex: 1,
                  }}
                >
                  <StageCard stage={stages[activeIndex - 1]} compact />
                </div>
              )}

              {/* Ghost: two stages behind */}
              {activeIndex > 1 && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    transform: 'scale(0.83) translateY(-35px)',
                    opacity: 0.1,
                    filter: 'blur(3px)',
                    zIndex: 0,
                  }}
                >
                  <StageCard stage={stages[activeIndex - 2]} compact />
                </div>
              )}

              {/* Active card */}
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute inset-0"
                  style={{ zIndex: 10 }}
                >
                  <StageCard stage={stages[activeIndex]} />
                </motion.div>
              </AnimatePresence>

              {/* Ghost: next stage (emerging hint) */}
              {activeIndex < 3 && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    transform: 'scale(0.89) translateY(18px)',
                    opacity: 0.18,
                    filter: 'blur(2px)',
                    zIndex: 1,
                  }}
                >
                  <StageCard stage={stages[activeIndex + 1]} compact />
                </div>
              )}
            </div>

            {/* Right: outcome + progress */}
            <motion.div style={{ opacity: navOpacity }} className="flex-shrink-0 w-44 h-[340px] flex flex-col justify-between">
              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Current stage</div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35 }}
                  >
                    <div
                      className="text-4xl font-black mb-1"
                      style={{ color: stages[activeIndex].accentColor }}
                    >
                      {stages[activeIndex].number}
                    </div>
                    <div className="text-2xl font-bold text-white mb-3">
                      {stages[activeIndex].title}
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {stages[activeIndex].description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Stage progress pills */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Progress</div>
                {stages.map((s, i) => (
                  <div key={s.number} className="flex items-center gap-2">
                    <motion.div
                      className="h-1 rounded-full flex-1"
                      style={{
                        background: i < activeIndex
                          ? s.accentColor
                          : i === activeIndex
                            ? `linear-gradient(90deg, ${s.accentColor}, ${s.accentColor}44)`
                            : 'rgba(255,255,255,0.08)',
                      }}
                      animate={{ opacity: i <= activeIndex ? 1 : 0.3 }}
                    />
                    <span className="text-xs text-gray-500 w-14">{s.title}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Scroll hint */}
          <motion.div
            className="pb-6 text-center text-gray-600 text-xs uppercase tracking-widest flex items-center justify-center gap-2"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="w-4 h-px bg-gray-600" />
            Scroll to progress through the journey
            <span className="w-4 h-px bg-gray-600" />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

/* ── Section export ─────────────────────────────────────────── */
export default function RoadmapSection() {
  const titleRef = useRef<HTMLDivElement>(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section id="roadmap">
      {/* Desktop immersive */}
      <DesktopJourney />

      {/* Mobile: standard scroll */}
      <div className="md:hidden relative py-24 section-glow overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a2e] via-[#2d1057]/40 to-[#1a0a2e]" />
        <div className="relative z-10 max-w-lg mx-auto px-6">
          <div ref={titleRef} className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-xs font-semibold text-purple-300 uppercase tracking-widest mb-4"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              The Journey
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-3xl font-bold"
            >
              Your AI Transformation{' '}
              <span className="gradient-text">Journey</span>
            </motion.h2>
          </div>
          <MobileRoadmap />
        </div>
      </div>
    </section>
  )
}
