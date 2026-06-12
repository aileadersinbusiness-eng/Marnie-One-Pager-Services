import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Calendar, Menu, X } from 'lucide-react'
import { LogoSVGWhite } from './LogoSVG'

const CALENDLY = 'https://calendly.com/chatwithmarnie/business-with-ai-strategist'

const navLinks = [
  { label: 'Services', href: '#work-with-me' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'Journey', href: '#journey' },
]

export default function Navbar() {
  const { scrollY } = useScroll()
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 1])
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    const unsub = scrollY.on('change', () => {})
    return unsub
  }, [scrollY])

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ opacity: bgOpacity }}
      >
        <div className="absolute inset-0 bg-[#1a0a2e]/90 backdrop-blur-xl border-b border-white/5" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <LogoSVGWhite height={36} />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-white hover:text-purple-200 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
          >
            <Calendar className="w-3.5 h-3.5" />
            Book a Call
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-300 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="md:hidden absolute top-full left-0 right-0 bg-[#1a0a2e]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 space-y-4"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block text-gray-300 hover:text-white py-2"
            >
              {link.label}
            </a>
          ))}
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white w-full justify-center mt-4"
          >
            <Calendar className="w-4 h-4" />
            Book a Call
          </a>
        </motion.div>
      )}
    </motion.header>
  )
}
