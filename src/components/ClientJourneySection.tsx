import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const journeySteps = [
  {
    stage: 'Start',
    offer: 'Complimentary Strategy Call',
    outcome: 'Identify needs and next step',
    color: '#b57bee',
  },
  {
    stage: 'Clarify',
    offer: 'AI Power Hour',
    outcome: 'Fast diagnosis and direction',
    color: '#9b5cf6',
  },
  {
    stage: 'Align',
    offer: 'Strategy Session / Workshop',
    outcome: 'Strategic clarity and ownership',
    color: '#c026d3',
  },
  {
    stage: 'Implement',
    offer: 'Consultancy Package',
    outcome: 'Embed systems and capability',
    color: '#a855f7',
  },
  {
    stage: 'Scale',
    offer: 'Keynotes / AI Clinics',
    outcome: 'Expand influence and culture',
    color: '#e879f9',
  },
]

function JourneyStep({ step, index, total }: { step: typeof journeySteps[0]; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref} className="relative flex items-start gap-6 group">
      {/* Connector line */}
      {index < total - 1 && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="absolute left-[1.6rem] top-14 w-px h-16 roadmap-line opacity-30 origin-top"
          style={{ background: `linear-gradient(180deg, ${step.color}80, ${journeySteps[index + 1].color}80)` }}
        />
      )}

      {/* Step number */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center relative z-10"
        style={{
          background: `linear-gradient(135deg, ${step.color}30, ${step.color}10)`,
          border: `1px solid ${step.color}60`,
          boxShadow: `0 0 20px ${step.color}20`,
        }}
      >
        <span className="text-sm font-bold" style={{ color: step.color }}>
          {String(index + 1).padStart(2, '0')}
        </span>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1 + 0.1 }}
        className="flex-1 pb-12"
      >
        <div className="glass-card rounded-xl p-5 group-hover:border-purple-500/20 transition-all duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
            <div>
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: step.color }}
              >
                {step.stage}
              </span>
              <h4 className="text-lg font-semibold text-white mt-0.5">{step.offer}</h4>
            </div>
            <div className="text-sm text-gray-300 px-3 py-1 rounded-full bg-white/5 border border-white/10 whitespace-nowrap self-start sm:self-auto">
              {step.outcome}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function ClientJourneySection() {
  const titleRef = useRef<HTMLDivElement>(null)
  const inView = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section className="relative py-32 section-glow overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a2e] via-[#2d1057]/30 to-[#1a0a2e]" />
      <div className="absolute left-0 top-1/2 w-72 h-72 bg-violet-600/10 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
        <div ref={titleRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-xs font-semibold text-purple-300 uppercase tracking-widest mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            The Path
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Your{' '}
            <span className="gradient-text">Client Journey</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-gray-300 max-w-xl mx-auto"
          >
            A structured, progressive path from initial conversation to lasting organisational capability.
          </motion.p>
        </div>

        <div className="relative">
          {journeySteps.map((step, i) => (
            <JourneyStep key={step.stage} step={step} index={i} total={journeySteps.length} />
          ))}
        </div>
      </div>
    </section>
  )
}
