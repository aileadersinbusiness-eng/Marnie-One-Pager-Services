interface LogoSVGProps {
  className?: string
  height?: number
}

export default function LogoSVG({ className = '', height = 48 }: LogoSVGProps) {
  const aspectRatio = 380 / 80
  const width = height * aspectRatio

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 380 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Business With AI Strategist"
      role="img"
    >
      {/* Atom icon */}
      <defs>
        <linearGradient id="atomGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="40%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
        <linearGradient id="atomGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="60%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#db2777" />
        </linearGradient>
      </defs>

      {/* Atom orbital rings */}
      <g transform="translate(40, 40)">
        {/* Ring 1 - diagonal left */}
        <ellipse cx="0" cy="0" rx="30" ry="12" stroke="url(#atomGrad)" strokeWidth="2.5" fill="none" transform="rotate(-30)" />
        {/* Ring 2 - diagonal right */}
        <ellipse cx="0" cy="0" rx="30" ry="12" stroke="url(#atomGrad2)" strokeWidth="2.5" fill="none" transform="rotate(30)" />
        {/* Ring 3 - vertical */}
        <ellipse cx="0" cy="0" rx="30" ry="12" stroke="url(#atomGrad)" strokeWidth="2.5" fill="none" transform="rotate(90)" />

        {/* Center circle with "AI" text */}
        <circle cx="0" cy="0" r="13" fill="url(#atomGrad)" opacity="0.15" />
        <circle cx="0" cy="0" r="13" stroke="url(#atomGrad)" strokeWidth="1.5" fill="none" />
        <text x="0" y="4.5" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif" fontWeight="800" fontSize="9" fill="white">
          AI
        </text>
      </g>

      {/* BUSINESS WITH AI text */}
      <text x="90" y="32" fontFamily="Inter, system-ui, sans-serif" fontWeight="800" fontSize="22" fill="#1e293b" letterSpacing="-0.5">
        BUSINESS
      </text>
      <text x="90" y="56" fontFamily="Inter, system-ui, sans-serif" fontWeight="800" fontSize="22" fill="#1e293b" letterSpacing="-0.5">
        WITH AI
      </text>
      {/* STRATEGIST label */}
      <text x="91" y="72" fontFamily="Inter, system-ui, sans-serif" fontWeight="500" fontSize="11" fill="#7c3aed" letterSpacing="3">
        STRATEGIST
      </text>
    </svg>
  )
}

// White version for dark backgrounds
export function LogoSVGWhite({ className = '', height = 48 }: LogoSVGProps) {
  const aspectRatio = 380 / 80
  const width = height * aspectRatio

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 380 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Business With AI Strategist"
      role="img"
    >
      <defs>
        <linearGradient id="atomGradW" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="40%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#f472b6" />
        </linearGradient>
        <linearGradient id="atomGrad2W" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="60%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>

      <g transform="translate(40, 40)">
        <ellipse cx="0" cy="0" rx="30" ry="12" stroke="url(#atomGradW)" strokeWidth="2.5" fill="none" transform="rotate(-30)" />
        <ellipse cx="0" cy="0" rx="30" ry="12" stroke="url(#atomGrad2W)" strokeWidth="2.5" fill="none" transform="rotate(30)" />
        <ellipse cx="0" cy="0" rx="30" ry="12" stroke="url(#atomGradW)" strokeWidth="2.5" fill="none" transform="rotate(90)" />
        <circle cx="0" cy="0" r="13" fill="url(#atomGradW)" opacity="0.2" />
        <circle cx="0" cy="0" r="13" stroke="url(#atomGradW)" strokeWidth="1.5" fill="none" />
        <text x="0" y="4.5" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif" fontWeight="800" fontSize="9" fill="white">
          AI
        </text>
      </g>

      <text x="90" y="32" fontFamily="Inter, system-ui, sans-serif" fontWeight="800" fontSize="22" fill="white" letterSpacing="-0.5">
        BUSINESS
      </text>
      <text x="90" y="56" fontFamily="Inter, system-ui, sans-serif" fontWeight="800" fontSize="22" fill="white" letterSpacing="-0.5">
        WITH AI
      </text>
      <text x="91" y="72" fontFamily="Inter, system-ui, sans-serif" fontWeight="500" fontSize="11" fill="#c084fc" letterSpacing="3">
        STRATEGIST
      </text>
    </svg>
  )
}
