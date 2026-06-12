import { motion } from 'framer-motion'

interface Props {
  className?: string
}

// Neural network sphere for hero section
export function NeuralSphere({ className = '' }: Props) {
  const nodes = [
    { cx: 80, cy: 30 },
    { cx: 140, cy: 55 },
    { cx: 160, cy: 120 },
    { cx: 110, cy: 155 },
    { cx: 45, cy: 140 },
    { cx: 20, cy: 80 },
    { cx: 90, cy: 95 },
    { cx: 130, cy: 90 },
  ]
  const edges = [
    [0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[0,6],[1,6],[2,7],[3,7],[6,7],[4,6],[5,7],[1,7],[0,7]
  ]

  return (
    <motion.div
      className={`pointer-events-none select-none ${className}`}
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
    >
      <motion.svg
        width="180"
        height="180"
        viewBox="0 0 180 180"
        fill="none"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{ opacity: 0.5 }}
      >
        {/* Outer orbit ring */}
        <ellipse cx="90" cy="90" rx="82" ry="30" stroke="url(#orbGrad)" strokeWidth="1" opacity="0.3" />
        <ellipse cx="90" cy="90" rx="60" ry="82" stroke="url(#orbGrad)" strokeWidth="1" opacity="0.2" transform="rotate(35 90 90)" />

        <defs>
          <linearGradient id="orbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#b57bee" />
            <stop offset="100%" stopColor="#e879f9" />
          </linearGradient>
          <radialGradient id="nodeGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e879f9" />
            <stop offset="100%" stopColor="#7c3aed" />
          </radialGradient>
        </defs>

        {/* Edges */}
        {edges.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={nodes[a].cx} y1={nodes[a].cy}
            x2={nodes[b].cx} y2={nodes[b].cy}
            stroke="url(#orbGrad)"
            strokeWidth="0.8"
            initial={{ opacity: 0.15 }}
            animate={{ opacity: [0.15, 0.4, 0.15] }}
            transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
          />
        ))}

        {/* Nodes */}
        {nodes.map((n, i) => (
          <motion.circle
            key={i}
            cx={n.cx} cy={n.cy} r={i === 6 || i === 7 ? 5 : 3.5}
            fill="url(#nodeGrad)"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 1, 0.5], r: [i === 6 ? 5 : 3.5, (i === 6 ? 5 : 3.5) + 1.5, i === 6 ? 5 : 3.5] }}
            transition={{ duration: 2 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
          />
        ))}
      </motion.svg>
    </motion.div>
  )
}

// Strategy cube for roadmap
export function StrategyCube({ className = '' }: Props) {
  return (
    <motion.div
      className={`pointer-events-none select-none ${className}`}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      style={{ opacity: 0.4 }}
    >
      <motion.svg
        width="120" height="120" viewBox="0 0 120 120" fill="none"
        animate={{ rotate: [0, 4, -4, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <defs>
          <linearGradient id="cubeTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" stopOpacity="0.7"/>
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.4"/>
          </linearGradient>
          <linearGradient id="cubeLeft" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#4f108a" stopOpacity="0.3"/>
          </linearGradient>
          <linearGradient id="cubeRight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#6b21a8" stopOpacity="0.25"/>
          </linearGradient>
        </defs>
        {/* Top face */}
        <polygon points="60,15 95,35 60,55 25,35" fill="url(#cubeTop)" stroke="rgba(181,123,238,0.5)" strokeWidth="1"/>
        {/* Left face */}
        <polygon points="25,35 60,55 60,90 25,70" fill="url(#cubeLeft)" stroke="rgba(181,123,238,0.3)" strokeWidth="1"/>
        {/* Right face */}
        <polygon points="60,55 95,35 95,70 60,90" fill="url(#cubeRight)" stroke="rgba(181,123,238,0.3)" strokeWidth="1"/>
        {/* Edges glow */}
        <line x1="60" y1="15" x2="60" y2="55" stroke="rgba(232,121,249,0.4)" strokeWidth="0.5"/>
        <line x1="25" y1="35" x2="95" y2="35" stroke="rgba(181,123,238,0.3)" strokeWidth="0.5"/>
      </motion.svg>
    </motion.div>
  )
}

// Network nodes for capabilities section
export function NetworkNodes({ className = '' }: Props) {
  const nodePositions = [
    { x: 70, y: 25 }, { x: 130, y: 50 }, { x: 110, y: 110 },
    { x: 50, y: 110 }, { x: 30, y: 55 },
  ]
  const connections = [[0,1],[1,2],[2,3],[3,4],[4,0],[0,2],[1,3]]

  return (
    <motion.div
      className={`pointer-events-none select-none ${className}`}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      style={{ opacity: 0.35 }}
    >
      <svg width="160" height="140" viewBox="0 0 160 140" fill="none">
        <defs>
          <linearGradient id="netGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bfa"/>
            <stop offset="100%" stopColor="#f0abfc"/>
          </linearGradient>
        </defs>
        {connections.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={nodePositions[a].x} y1={nodePositions[a].y}
            x2={nodePositions[b].x} y2={nodePositions[b].y}
            stroke="url(#netGrad)" strokeWidth="1"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
          />
        ))}
        {nodePositions.map((n, i) => (
          <motion.circle
            key={i} cx={n.x} cy={n.y} r="5"
            fill="url(#netGrad)"
            animate={{ r: [5, 6.5, 5] }}
            transition={{ duration: 1.8 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
          />
        ))}
      </svg>
    </motion.div>
  )
}
