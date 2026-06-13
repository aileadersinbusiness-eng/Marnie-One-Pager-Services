import {
  motion, AnimatePresence,
  useScroll, useSpring, useMotionValueEvent,
  useTransform,
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
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${stage.accentColor}80, transparent)` }}
      />
      {/* Corner glow */}
      <div
        className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl pointer-events-none"
        style={{ background: `${stage.glowColor}0.08)` }}
      />

      <div className={`relative z-10 flex flex-col h-full ${compact ? 'p-4' : 'p-6 lg:p-8'}`}>
        {/* Stage number + icon */}
        <div className="flex items-center justify-between mb-4">
          <div
            className="text-xs font-black uppercase tracking-[0.18em] px-3 py-1.5 rounded-full"
            style={{
              background: `${stage.glowColor}0.15)`,
              border: `1px solid ${stage.glowColor}0.4)`,
              color: stage.accentColor,
            }}
          >
            Stage {stage.number}
          </div>
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: `${stage.glowColor}0.15)`,
              border: `1px solid ${stage.glowColor}0.4)`,
            }}
          >
            <Icon className="w-5 h-5" style={{ color: stage.accentColor }} />
          </div>
        </div>

        {/* Title */}
        <div className="mb-3">
          <h3
            className={`font-black tracking-tight leading-none ${compact ? 'text-3xl' : 'text-4xl lg:text-5xl'}`}
            style={{
              background: `linear-gradient(135deg, #ffffff, ${stage.accentColor})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {stage.title}
          </h3>
          <p className="text-sm font-medium mt-1.5 leading-snug" style={{ color: stage.accentColor + 'cc' }}>
            {stage.subtitle}
          </p>
        </div>

        {/* Description — only on full cards */}
        {!compact && (
          <p className="text-gray-300 leading-relaxed text-sm mb-4">
            {stage.description}
          </p>
        )}

        {/* Offers — only on full cards */}
        {!compact && (
          <div className="space-y-2 mb-5">
            {stage.offers.map((offer) => (
              <div key={offer} className="flex items-start gap-3">
                <div
                  className="w-1 h-1 rounded-full mt-[7px] flex-shrink-0"
                  style={{ background: stage.accentColor }}
                />
                <span className="text-sm text-gray-300 leading-snug">{offer}</span>
              </div>
            ))}
          </div>
        )}

        {/* Spacer to push badge to bottom */}
        <div className="flex-1" />

        {/* Outcome badge */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold self-start"
          style={{
            background: `${stage.glowColor}0.12)`,
            border: `1px solid ${stage.glowColor}0.35)`,
            color: stage.accentColor,
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0" style={{ background: stage.accentColor }} />
          Outcome: {stage.outcome}
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
      <path
        d="M20 20 L20 340"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Animated fill */}
      <motion.path
        d="M20 20 L20 340"
        stroke="url(#pathGrad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={totalLength}
        strokeDashoffset={totalLength - filledLength}
      />
      {/* Stage dots */}
      {stages.map((stage, i) => {
        const y = 20 + i * 106.67
        const isActive = i === activeIndex
        const isDone = i < activeIndex
        return (
          <g key={stage.number}>
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
            <motion.circle
              cx="20" cy={y}
              fill={isDone || isActive ? stage.accentColor : 'rgba(255,255,255,0.15)'}
              animate={{ r: isActive ? 8 : 5 }}
              transition={{ duration: 0.4 }}
              r={isActive ? 8 : 5}
            />
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
    >
      {/* Auto height — content determines card size */}
      <StageCard stage={stage} />
    </motion.div>
  )
}

function MobileRoadmap() {
  return (
    <div className="space-y-5 md:hidden">
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

  const variants = {
    enter: (d: number) => ({ y: d > 0 ? 48 : -48, scale: 0.95, opacity: 0 }),
    center: { y: 0, scale: 1, opacity: 1 },
    exit: (d: number) => ({ y: d > 0 ? -48 : 48, scale: 0.95, opacity: 0 }),
  }

  return (
    <div ref={sectionRef} style={{ height: '500vh' }} className="hidden md:block">
      {/* Sticky viewport — clips to screen but doesn't hide card content */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a2e] via-[#2d1057]/60 to-[#1a0a2e]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(109,40,217,0.1)_0%,transparent_70%)]" />

        <div className="relative z-10 flex flex-col h-full max-w-7xl mx-auto w-full px-8 lg:px-12">

          {/* ── Header ─────────────────────────────────────────── */}
          <motion.div style={{ opacity: navOpacity }} className="pt-8 pb-5 text-center flex-shrink-0">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-xs font-semibold text-purple-300 uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              The Journey
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold leading-tight">
              The AI Transformation{' '}
              <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-gray-400 mt-1.5 text-sm">
              A strategic path from experimentation to embedded capability.
            </p>
          </motion.div>

          {/* ── Main row ────────────────────────────────────────── */}
          {/*
            flex-1 min-h-0 lets this row expand to fill remaining space.
            Each column uses min-h-0 to prevent flex overflow.
          */}
          <div className="flex-1 min-h-0 flex items-stretch gap-6 lg:gap-8 pb-5">

            {/* Neural pathway */}
            <motion.div
              style={{ opacity: navOpacity }}
              className="flex-shrink-0 flex items-center"
            >
              <div className="h-[300px] lg:h-[340px]">
                <NeuralPathway progress={pathwayProgress} activeIndex={activeIndex} />
              </div>
            </motion.div>

            {/* Stage navigator */}
            <motion.div
              style={{ opacity: navOpacity }}
              className="flex-shrink-0 w-24 lg:w-28 flex flex-col justify-around py-2"
            >
              {stages.map((s, i) => (
                <button
                  key={s.number}
                  onClick={() => {
                    if (!sectionRef.current) return
                    const el = sectionRef.current
                    const elTop = el.getBoundingClientRect().top + window.scrollY
                    const targetY = elTop + (i / 4) * el.offsetHeight
                    window.scrollTo({ top: targetY, behavior: 'smooth' })
                  }}
                  className={`text-left transition-all duration-300 ${i === activeIndex ? 'opacity-100' : 'opacity-30 hover:opacity-60'}`}
                >
                  <div
                    className="text-xs font-black uppercase tracking-widest"
                    style={{ color: i === activeIndex ? s.accentColor : '#6b7280' }}
                  >
                    {s.number}
                  </div>
                  <div className={`text-sm font-semibold mt-0.5 ${i === activeIndex ? 'text-white' : 'text-gray-500'}`}>
                    {s.title}
                  </div>
                </button>
              ))}
            </motion.div>

            {/* ── Card stack — fills remaining horizontal space ── */}
            <div className="flex-1 min-h-0 relative" style={{ perspective: '1200px' }}>
              {/* Ghost: two behind */}
              {activeIndex > 1 && (
                <div
                  className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden"
                  style={{
                    transform: 'scale(0.84) translateY(-28px)',
                    opacity: 0.1,
                    filter: 'blur(3px)',
                    zIndex: 1,
                    transformOrigin: 'center center',
                  }}
                >
                  <StageCard stage={stages[activeIndex - 2]} compact />
                </div>
              )}

              {/* Ghost: one behind */}
              {activeIndex > 0 && (
                <div
                  className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden"
                  style={{
                    transform: 'scale(0.92) translateY(-14px)',
                    opacity: 0.2,
                    filter: 'blur(1.5px)',
                    zIndex: 2,
                    transformOrigin: 'center center',
                  }}
                >
                  <StageCard stage={stages[activeIndex - 1]} compact />
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
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute inset-0"
                  style={{ zIndex: 10 }}
                >
                  <StageCard stage={stages[activeIndex]} />
                </motion.div>
              </AnimatePresence>

              {/* Ghost: next emerging */}
              {activeIndex < 3 && (
                <div
                  className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden"
                  style={{
                    transform: 'scale(0.9) translateY(14px)',
                    opacity: 0.16,
                    filter: 'blur(2px)',
                    zIndex: 1,
                    transformOrigin: 'center center',
                  }}
                >
                  <StageCard stage={stages[activeIndex + 1]} compact />
                </div>
              )}
            </div>

            {/* ── Right panel ─────────────────────────────────── */}
            <motion.div
              style={{ opacity: navOpacity }}
              className="flex-shrink-0 w-40 lg:w-48 min-h-0 flex flex-col justify-between py-2"
            >
              {/* Current stage info */}
              <div className="min-h-0">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
                  Current stage
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className="text-3xl lg:text-4xl font-black mb-1 leading-none"
                      style={{ color: stages[activeIndex].accentColor }}
                    >
                      {stages[activeIndex].number}
                    </div>
                    <div className="text-xl lg:text-2xl font-bold text-white mb-2 leading-tight">
                      {stages[activeIndex].title}
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {stages[activeIndex].description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Stage progress pills */}
              <div className="space-y-2.5">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
                  Progress
                </div>
                {stages.map((s, i) => (
                  <div key={s.number} className="flex items-center gap-2">
                    <motion.div
                      className="h-1 rounded-full flex-1"
                      style={{
                        background:
                          i < activeIndex
                            ? s.accentColor
                            : i === activeIndex
                              ? `linear-gradient(90deg, ${s.accentColor}, ${s.accentColor}44)`
                              : 'rgba(255,255,255,0.08)',
                      }}
                      animate={{ opacity: i <= activeIndex ? 1 : 0.3 }}
                    />
                    <span className="text-xs text-gray-500 w-14 leading-none">{s.title}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Scroll hint ─────────────────────────────────────── */}
          <motion.div
            className="flex-shrink-0 pb-4 text-center text-gray-600 text-xs uppercase tracking-widest flex items-center justify-center gap-3"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="w-6 h-px bg-gray-700" />
            Scroll to progress through the journey
            <span className="w-6 h-px bg-gray-700" />
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
      <div className="md:hidden relative py-20 section-glow overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a2e] via-[#2d1057]/40 to-[#1a0a2e]" />
        <div className="relative z-10 max-w-lg mx-auto px-5">
          {/* Mobile header */}
          <div ref={titleRef} className="text-center mb-10">
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
              className="text-3xl font-bold leading-tight"
            >
              Your AI Transformation{' '}
              <span className="gradient-text">Journey</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-sm mt-3 leading-relaxed"
            >
              A strategic path from experimentation to embedded capability.
            </motion.p>
          </div>
          <MobileRoadmap />
        </div>
      </div>
    </section>
  )
}
