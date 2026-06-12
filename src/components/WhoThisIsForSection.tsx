import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { Crown, Briefcase, Users, Building2, ArrowDown } from 'lucide-react'

const cards = [
  {
    icon: Crown,
    title: 'Leaders & Decision Makers',
    description: 'For founders, directors, and leadership teams who want to make informed decisions about AI without chasing every new tool.',
    lookingFor: ['Strategic clarity', 'Reduced risk', 'Smarter investment decisions', 'Greater organisational alignment'],
    color: 'rgba(139,92,246,',
    gradient: 'from-violet-600/15 to-violet-900/5',
  },
  {
    icon: Briefcase,
    title: 'Consultants & Service Providers',
    description: 'For experts who want to enhance delivery, improve efficiency, or create new client experiences using AI.',
    lookingFor: ['AI-enhanced delivery', 'Proprietary tools', 'Scalable expertise', 'Stronger client outcomes'],
    color: 'rgba(217,70,239,',
    gradient: 'from-fuchsia-600/15 to-fuchsia-900/5',
  },
  {
    icon: Users,
    title: 'Membership Organisations & Communities',
    description: 'For organisations seeking to educate, support, and inspire their members through practical AI initiatives.',
    lookingFor: ['AI clinics', 'Industry roundtables', 'Speaking engagements', 'Tailored learning experiences'],
    color: 'rgba(168,85,247,',
    gradient: 'from-purple-600/15 to-purple-900/5',
  },
  {
    icon: Building2,
    title: 'Professional Services Firms',
    description: 'For businesses wanting to embed AI into workflows while maintaining trust, quality, and compliance.',
    lookingFor: ['Workflow optimisation', 'Team capability building', 'Implementation support', 'Sustainable adoption'],
    color: 'rgba(236,72,153,',
    gradient: 'from-pink-600/15 to-pink-900/5',
  },
]

function AudienceCard({ card, index }: { card: typeof cards[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const Icon = card.icon

  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 150, damping: 20 })
  const springY = useSpring(rotateY, { stiffness: 150, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const dx = (e.clientX - centerX) / (rect.width / 2)
    const dy = (e.clientY - centerY) / (rect.height / 2)
    rotateY.set(dx * 6)
    rotateX.set(-dy * 6)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        style={{ rotateX: springX, rotateY: springY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3 }}
        className={`glass-card rounded-2xl p-7 relative overflow-hidden h-full cursor-default bg-gradient-to-br ${card.gradient}`}
      >
        {/* Top border glow */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${card.color}0.5), transparent)` }} />
        {/* Corner glow */}
        <div className="absolute top-0 left-0 w-40 h-40 rounded-full blur-3xl pointer-events-none" style={{ background: `${card.color}0.1)` }} />

        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.12 + 0.2 }}
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 stage-number"
            style={{ background: `${card.color}0.15)`, border: `1px solid ${card.color}0.4)` }}
          >
            <Icon className="w-6 h-6 text-white opacity-85" />
          </motion.div>

          <h3 className="text-xl font-bold text-white mb-3 leading-tight">{card.title}</h3>
          <p className="text-sm text-gray-400 leading-relaxed mb-5">{card.description}</p>

          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3">You might be looking for</div>
            <ul className="space-y-1.5">
              {card.lookingFor.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: card.color + '0.8)' }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function WhoThisIsForSection() {
  const titleRef = useRef<HTMLDivElement>(null)
  const inView = useInView(titleRef, { once: true, margin: '-80px' })
  const closingRef = useRef<HTMLDivElement>(null)
  const closingInView = useInView(closingRef, { once: true, margin: '-60px' })

  return (
    <section className="relative py-32 section-glow overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a2e] via-[#281050]/60 to-[#1a0a2e]" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-[140px]" />
      <div className="absolute bottom-1/3 left-0 w-72 h-72 bg-fuchsia-600/8 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div ref={titleRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-xs font-semibold text-purple-300 uppercase tracking-widest mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            The Right Fit
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-5"
          >
            Who This Is{' '}
            <span className="gradient-text">For</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            If your organisation is already exploring AI but needs clearer direction, stronger implementation, or greater confidence in how it is being used, you're in the right place.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          {cards.map((card, i) => (
            <AudienceCard key={card.title} card={card} index={i} />
          ))}
        </div>

        {/* Closing statement */}
        <div ref={closingRef} className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={closingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="glass-card rounded-2xl p-8 md:p-10 max-w-3xl mx-auto relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/8 to-transparent rounded-2xl" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent" />
            <div className="relative z-10">
              <p className="text-xl md:text-2xl font-light text-gray-200 leading-relaxed mb-8 italic">
                "You do not need to have everything figured out. Whether you are exploring your first structured approach to AI or looking to scale what already exists, there is a clear next step."
              </p>
              <a
                href="#work-with-me"
                className="btn-primary inline-flex items-center gap-2"
                onClick={(e) => { e.preventDefault(); document.getElementById('work-with-me')?.scrollIntoView({ behavior: 'smooth' }) }}
              >
                Find Your Next Step
                <ArrowDown className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
