import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Calendar, ExternalLink, ArrowRight } from 'lucide-react'

const CALENDLY = 'https://calendly.com/chatwithmarnie/business-with-ai-strategist'
const SERVICES = 'https://businesswithaistrategist.com/services'

export default function FinalCTASection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-40 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a2e] via-[#2d1057]/80 to-[#1a0a2e]" />

      {/* Immersive background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-purple-700/20 rounded-full blur-[160px]" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-pink-500/15 rounded-full blur-[100px] animate-float-slow" />
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-violet-600/15 rounded-full blur-[80px] animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Top border glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-xs font-semibold text-purple-300 uppercase tracking-widest mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          Take the first step
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
        >
          Ready to make AI{' '}
          <span className="gradient-text">work for your</span>
          <br />
          business?
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-300 leading-relaxed mb-12 max-w-2xl mx-auto"
        >
          Start with a complimentary strategy call and identify the most valuable next step for your organisation.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-5 justify-center mb-12"
        >
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-semibold text-white text-lg group"
          >
            <Calendar className="w-5 h-5" />
            Book Your Strategy Call
            <ArrowRight className="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href={SERVICES}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-semibold text-white text-lg"
          >
            Learn More
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-8 text-sm text-gray-500"
        >
          {['No commitment required', 'Tailored to your business', 'Expert guidance from day one'].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <span className="text-purple-400">✓</span>
              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
