import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <>
      {/* Desktop: vertical right rail */}
      <div className="fixed right-4 top-0 bottom-0 w-0.5 z-50 hidden md:block">
        <div className="absolute inset-0 bg-white/5 rounded-full" />
        <motion.div
          className="absolute top-0 left-0 right-0 origin-top rounded-full"
          style={{
            scaleY,
            background: 'linear-gradient(180deg, #b57bee, #e879f9)',
            boxShadow: '0 0 8px rgba(181,123,238,0.7)',
            height: '100%',
          }}
        />
      </div>

      {/* Mobile: horizontal top bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 z-50 md:hidden">
        <div className="absolute inset-0 bg-white/5" />
        <motion.div
          className="absolute top-0 left-0 bottom-0 origin-left"
          style={{
            scaleX,
            background: 'linear-gradient(90deg, #b57bee, #e879f9)',
            boxShadow: '0 0 8px rgba(181,123,238,0.7)',
            width: '100%',
          }}
        />
      </div>
    </>
  )
}
