import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Zap, Target, Wrench, TrendingUp } from 'lucide-react'

const stages = [
  {
    number: '01',
    title: 'Clarify',
    purpose: 'Diagnose where AI is now',
    icon: Target,
    color: 'from-violet-500/20 to-violet-800/5',
    borderColor: 'rgba(139,92,246,0.4)',
    glowColor: 'rgba(139,92,246,0.15)',
    offers: [
      {
        name: 'AI Power Hour',
        price: '£295',
        description: 'Focused online session designed to identify gaps, opportunities, and quick wins.',
        bestFor: ['Leaders wanting expert direction', 'Teams already experimenting with AI', 'Businesses seeking clarity'],
      },
      {
        name: 'In-Person Strategy Session',
        price: '£600',
        description: '2-hour strategic working session.',
        bestFor: ['Leadership alignment', 'Priority setting', 'External strategic perspective'],
      },
    ],
  },
  {
    number: '02',
    title: 'Align',
    purpose: 'Set strategy and ownership',
    icon: Zap,
    color: 'from-fuchsia-500/20 to-fuchsia-800/5',
    borderColor: 'rgba(217,70,239,0.4)',
    glowColor: 'rgba(217,70,239,0.15)',
    offers: [
      {
        name: 'AI Business Transformation Workshop',
        price: '£1,200',
        description: 'Includes 30-minute planning call, 60-minute post-workshop strategy session, and follow-up support within 4–6 weeks.',
        bestFor: ['Shared understanding', 'Defining ownership', 'Strategic momentum'],
      },
    ],
  },
  {
    number: '03',
    title: 'Implement',
    purpose: 'Build systems and workflows',
    icon: Wrench,
    color: 'from-purple-500/20 to-purple-800/5',
    borderColor: 'rgba(168,85,247,0.4)',
    glowColor: 'rgba(168,85,247,0.15)',
    offers: [
      {
        name: 'Consultancy Package',
        price: '£5,000 – £15,000',
        description: '4–6 month engagement covering AI audits, infrastructure recommendations, workflow design, adoption support, done-with-you and done-for-you implementation.',
        bestFor: ['AI audits & infrastructure', 'Workflow design & adoption', 'AI agents & IP tools', 'Client-facing AI experiences'],
      },
    ],
  },
  {
    number: '04',
    title: 'Scale & Influence',
    purpose: 'Expand capability and influence',
    icon: TrendingUp,
    color: 'from-pink-500/20 to-pink-800/5',
    borderColor: 'rgba(236,72,153,0.4)',
    glowColor: 'rgba(236,72,153,0.15)',
    offers: [
      {
        name: 'Keynotes',
        price: '£1,500 – £5,000',
        description: 'Topics: AI mindset, market shifts, AI trends, practical implementation. Optional mini-courses and roundtables.',
        bestFor: ['Thought leadership', 'Conference & event speaking', 'Team inspiration'],
      },
      {
        name: 'AI Clinics / Joint Venture Days',
        price: 'From £1,500/day',
        description: 'Industry engagement events for shared learning and lead generation.',
        bestFor: ['Industry engagement', 'Shared learning', 'Lead generation'],
      },
    ],
  },
]

function StageCard({ stage }: { stage: typeof stages[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const Icon = stage.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, rotateX: 8 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
      className="relative"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        whileHover={{ y: -4, rotateX: 2 }}
        transition={{ duration: 0.3 }}
        className="glass-card rounded-2xl p-7 relative overflow-hidden h-full"
        style={{
          borderColor: inView ? stage.borderColor : 'rgba(255,255,255,0.08)',
          transition: 'border-color 0.5s ease',
        }}
      >
        {/* Background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${stage.color} rounded-2xl`} />
        {/* Top glow line */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${stage.borderColor}, transparent)` }} />
        {/* Corner glow */}
        <div className="absolute top-0 left-0 w-32 h-32 rounded-full blur-3xl" style={{ background: stage.glowColor }} />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: stage.borderColor.replace('0.4', '0.9') }}>
                Stage {stage.number}
              </div>
              <h3 className="text-2xl font-bold text-white">{stage.title}</h3>
              <p className="text-sm text-gray-400 mt-1">{stage.purpose}</p>
            </div>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ml-4" style={{ background: stage.glowColor, border: `1px solid ${stage.borderColor}` }}>
              <Icon className="w-5 h-5 text-white opacity-80" />
            </div>
          </div>

          {/* Offers */}
          <div className="space-y-4">
            {stage.offers.map((offer) => (
              <div key={offer.name} className="bg-black/20 rounded-xl p-4">
                <div className="flex items-start justify-between mb-2 gap-2">
                  <div className="font-semibold text-white text-sm">{offer.name}</div>
                  <div className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/10 text-purple-200 whitespace-nowrap flex-shrink-0">
                    {offer.price}
                  </div>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed mb-3">{offer.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {offer.bestFor.map((item) => (
                    <span key={item} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-300 border border-white/10">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function RoadmapSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section ref={sectionRef} id="roadmap" className="relative py-32 section-glow overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a2e] via-[#2d1057]/40 to-[#1a0a2e]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[128px]" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-pink-500/8 rounded-full blur-[96px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-xs font-semibold text-purple-300 uppercase tracking-widest mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            The Journey
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Your{' '}
            <span className="gradient-text">AI Transformation</span>
            {' '}Roadmap
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            A structured progression from initial clarity through to scaled AI capability and influence.
          </motion.p>
        </div>

        {/* Vertical roadmap connector on desktop */}
        <div className="relative">
          {/* Center line - desktop only */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 roadmap-line opacity-20" />

          {/* Stage cards grid */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {stages.map((stage, i) => (
              <StageCard key={stage.number} stage={stage} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
