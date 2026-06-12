import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Calendar } from 'lucide-react'

const CALENDLY = 'https://calendly.com/chatwithmarnie/business-with-ai-strategist'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const containerVariants: any = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const itemVariants: any = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
}

function SectionReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  )
}

export default function WorkWithMeSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], [-40, 40])

  return (
    <section ref={sectionRef} id="work-with-me" className="relative py-32 section-glow overflow-hidden">
      {/* Background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a2e] via-[#2d1057]/60 to-[#1a0a2e]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-700/10 rounded-full blur-[160px]" />
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
        <SectionReveal>
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-xs font-semibold text-purple-300 uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            Services
          </motion.div>

          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Work With{' '}
            <span className="gradient-text">Me</span>
          </motion.h2>

          <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-300 leading-relaxed mb-12 max-w-2xl mx-auto">
            A clear path from AI clarity to implementation, capability building, and culture change.
          </motion.p>

          {/* Start Here card */}
          <motion.div
            variants={itemVariants}
            className="glass-card glass-card-hover rounded-2xl p-8 md:p-10 relative overflow-hidden text-left"
          >
            {/* Glow corner */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-radial from-purple-500/20 to-transparent rounded-full blur-2xl" />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent rounded-2xl" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="stage-number w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-purple-300">
                  ★
                </div>
                <span className="text-xs font-semibold text-purple-300 uppercase tracking-widest">Start Here</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Complimentary 30-Minute Strategy Call
              </h3>

              <p className="text-gray-300 leading-relaxed mb-8 text-lg max-w-2xl">
                Every engagement begins with a complimentary 30-minute strategy call to understand where your business is now, how AI is currently being used, and what the most sensible next step looks like.
              </p>

              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <Calendar className="w-4 h-4" />
                Book Your Strategy Call
              </a>
            </div>
          </motion.div>
        </SectionReveal>
      </div>
    </section>
  )
}
