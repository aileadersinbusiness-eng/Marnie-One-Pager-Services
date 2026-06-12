import { motion } from 'framer-motion'
import { LogoSVGWhite } from './LogoSVG'

const CALENDLY = 'https://calendly.com/chatwithmarnie/business-with-ai-strategist'
const SERVICES = 'https://businesswithaistrategist.com/services'

export default function Footer() {
  return (
    <footer className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a2e] to-[#120820]" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <LogoSVGWhite height={44} className="opacity-80 hover:opacity-100 transition-opacity" />
          </motion.div>

          {/* Nav */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            <a href="#work-with-me" className="hover:text-purple-300 transition-colors">Services</a>
            <a href="#roadmap" className="hover:text-purple-300 transition-colors">Roadmap</a>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 transition-colors">Book a Call</a>
            <a href={SERVICES} target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 transition-colors">Learn More</a>
          </nav>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <div>
            <span className="text-gray-400 font-medium">Business With AI Strategist</span>
            {' '}·{' '}
            <span>Marnie Wills</span>
          </div>
          <div>
            © {new Date().getFullYear()} All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
