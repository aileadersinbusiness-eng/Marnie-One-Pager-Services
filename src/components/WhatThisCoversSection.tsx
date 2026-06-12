import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Search, Layers, GitBranch, BookOpen, Users,
  Brain, Cpu, Key, Globe
} from 'lucide-react'

const capabilities = [
  { icon: Search, label: 'AI Audits', description: 'Comprehensive review of current AI usage, gaps, and opportunities' },
  { icon: Layers, label: 'AI Infrastructure', description: 'Architecture recommendations for scalable AI integration' },
  { icon: GitBranch, label: 'Workflow Design', description: 'Design and optimisation of AI-enhanced business processes' },
  { icon: BookOpen, label: 'Tool Training', description: 'ChatGPT, Claude, Copilot, Gemini, Perplexity and more' },
  { icon: Users, label: 'AI Literacy', description: 'Building team confidence and capability across the organisation' },
  { icon: Brain, label: 'Adoption Support', description: 'Change management and embedding AI into everyday practice' },
  { icon: Cpu, label: 'AI Agents', description: 'Custom AI agents tailored to your business requirements' },
  { icon: Key, label: 'IP Tools', description: 'Proprietary AI tools that become business assets' },
  { icon: Globe, label: 'Client-Facing AI', description: 'Exceptional AI-powered client experiences and products' },
]

export default function WhatThisCoversSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative py-32 section-glow overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a2e] via-[#1e0c38] to-[#1a0a2e]" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-violet-600/10 rounded-full blur-[128px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div ref={ref} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-xs font-semibold text-purple-300 uppercase tracking-widest mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            Capabilities
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            What This Can{' '}
            <span className="gradient-text">Cover</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gray-300 max-w-xl mx-auto"
          >
            Each engagement is tailored to your organisation's needs and stage of AI maturity.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon
            return (
              <motion.div
                key={cap.label}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.05 * i, ease: "easeOut" }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="glass-card glass-card-hover rounded-xl p-6 relative overflow-hidden group cursor-default"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl stage-number flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-purple-300" />
                  </div>
                  <div>
                    <div className="font-semibold text-white mb-1">{cap.label}</div>
                    <div className="text-sm text-gray-400 leading-relaxed">{cap.description}</div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
