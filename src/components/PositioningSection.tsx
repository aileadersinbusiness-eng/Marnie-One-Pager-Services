import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function PositioningSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5])

  const words = [
    'Helping', 'AI-active', 'businesses', 'move', 'from',
    'scattered', 'tools', 'to', 'structured', 'strategy,',
    'implementation,', 'and', 'proprietary',
    'AI', 'capability.'
  ]

  return (
    <section ref={ref} className="relative py-40 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a2e] via-[#3d1a6e]/40 to-[#1a0a2e]" />
      <div className="absolute inset-0 bg-gradient-radial from-purple-700/15 via-transparent to-transparent" />

      {/* Decorative orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-violet-600/15 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-pink-500/10 rounded-full blur-[100px]" />

      <motion.div style={{ scale, opacity }} className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-xs font-semibold text-purple-300 uppercase tracking-widest mb-12"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
          The Mission
        </motion.div>

        <div className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.15] tracking-tight">
          {words.map((word, i) => {
            const isHighlight = ['AI-active', 'structured', 'proprietary', 'AI', 'capability.'].includes(word)
            return (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className={`inline-block mr-[0.25em] ${isHighlight ? 'gradient-text' : 'text-white'}`}
              >
                {word}
              </motion.span>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-12 mx-auto w-48 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(181,123,238,0.6), rgba(232,121,249,0.6), transparent)' }}
        />
      </motion.div>
    </section>
  )
}
