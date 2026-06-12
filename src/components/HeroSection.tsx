import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { ArrowDown, Calendar, ExternalLink } from 'lucide-react'
import { LogoSVGWhite } from './LogoSVG'
import { NeuralSphere } from './FloatingObject3D'

const CALENDLY = 'https://calendly.com/chatwithmarnie/business-with-ai-strategist'
const SERVICES = 'https://businesswithaistrategist.com/services'

function FadeUp({ i, children, className }: { i: number; children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.15, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function RoadmapVisual() {
  const stages = ['Clarify', 'Align', 'Implement', 'Scale']
  return (
    <div className="relative w-full max-w-sm mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
        className="relative"
        style={{ perspective: '1000px' }}
      >
        <div className="absolute inset-0 bg-gradient-radial from-purple-600/30 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 rounded-2xl" />
          <div className="relative z-10">
            <div className="text-xs font-semibold text-purple-300 uppercase tracking-widest mb-4 opacity-80">
              AI Transformation Roadmap
            </div>
            <div className="space-y-3">
              {stages.map((stage, i) => (
                <motion.div
                  key={stage}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + i * 0.12, duration: 0.6 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex items-center justify-center w-7 h-7 rounded-full stage-number text-xs font-bold text-purple-300 flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="flex-1 bg-white/5 rounded-lg px-3 py-2 text-sm font-medium text-white/90">
                    {stage}
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
              className="mt-4 pt-4 border-t border-white/5 text-xs text-gray-400"
            >
              From AI-curious → AI-embedded
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  // Layered parallax at different speeds
  const textY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 100]), { stiffness: 80, damping: 20 })
  const visualY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 60]), { stiffness: 80, damping: 20 })
  const bgOrbY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 40]), { stiffness: 60, damping: 20 })
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])
  const cardRotateX = useTransform(scrollYProgress, [0, 0.5], [0, 5])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 pb-12">
      {/* Parallax background orbs */}
      <motion.div style={{ y: bgOrbY }} className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a2e] via-[#2d1057] to-[#1a0a2e]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px] animate-float-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-[96px] animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-800/10 rounded-full blur-[160px]" />
      </motion.div>

      {/* Neural sphere — decorative top-right */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -60]), opacity }}
        className="absolute top-24 right-8 lg:right-20 z-10 hidden lg:block pointer-events-none"
      >
        <NeuralSphere />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: text content at faster parallax */}
          <motion.div style={{ y: textY }} className="text-center lg:text-left">
            <FadeUp i={0} className="mb-10">
              <LogoSVGWhite height={60} className="mx-auto lg:mx-0" />
            </FadeUp>

            <FadeUp i={1} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-xs font-semibold text-purple-300 uppercase tracking-widest mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              AI Implementation Expert
            </FadeUp>

            <FadeUp i={2}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
                From{' '}
                <span className="gradient-text">AI-Curious</span>
                <br />
                to{' '}
                <span className="gradient-text">AI-Embedded</span>
              </h1>
            </FadeUp>

            <FadeUp i={3}>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
                Your trusted AI implementation expert helping businesses move from scattered AI tools to structured strategy, implementation, and proprietary capability.
              </p>
            </FadeUp>

            <FadeUp i={4} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <Calendar className="w-4 h-4" />
                Book Your Complimentary Strategy Call
              </a>
              <a href={SERVICES} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                Learn More
                <ExternalLink className="w-4 h-4" />
              </a>
            </FadeUp>

            <FadeUp i={5} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 justify-center lg:justify-start text-sm text-gray-400">
              {['Strategy & Implementation', 'Keynote Speaker', 'UK-Based Expert'].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <span className="text-purple-400 font-semibold">✓</span>
                  {t}
                </div>
              ))}
            </FadeUp>
          </motion.div>

          {/* Right: roadmap visual at slower parallax with scroll tilt */}
          <motion.div
            style={{ y: visualY, rotateX: cardRotateX }}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
            className="hidden lg:block"
          >
            <RoadmapVisual />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          style={{ opacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500"
        >
          <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
