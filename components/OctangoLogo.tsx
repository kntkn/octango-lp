"use client";

export default function OctangoLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Head - main body */}
      <ellipse
        cx="100"
        cy="80"
        rx="35"
        ry="40"
        fill="none"
        stroke="#00ff41"
        strokeWidth="1.5"
        opacity="0.8"
        filter="url(#glow)"
      >
        <animate
          attributeName="ry"
          values="40;42;40"
          dur="3s"
          repeatCount="indefinite"
        />
      </ellipse>

      {/* Eye left */}
      <circle cx="88" cy="72" r="6" fill="none" stroke="#00d4ff" strokeWidth="1.5">
        <animate
          attributeName="r"
          values="6;5;6"
          dur="4s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="88" cy="72" r="2" fill="#00d4ff" opacity="0.8" />

      {/* Eye right */}
      <circle cx="112" cy="72" r="6" fill="none" stroke="#00d4ff" strokeWidth="1.5">
        <animate
          attributeName="r"
          values="6;5;6"
          dur="4s"
          repeatCount="indefinite"
          begin="0.5s"
        />
      </circle>
      <circle cx="112" cy="72" r="2" fill="#00d4ff" opacity="0.8" />

      {/* Tentacle 1 - bottom left far */}
      <path
        d="M70 110 Q50 140 35 170"
        fill="none"
        stroke="#00ff41"
        strokeWidth="1.5"
        opacity="0.6"
        strokeLinecap="round"
      >
        <animate
          attributeName="d"
          values="M70 110 Q50 140 35 170;M70 110 Q45 140 30 165;M70 110 Q50 140 35 170"
          dur="4s"
          repeatCount="indefinite"
        />
      </path>

      {/* Tentacle 2 - bottom left */}
      <path
        d="M75 115 Q60 145 55 175"
        fill="none"
        stroke="#00ff41"
        strokeWidth="1.5"
        opacity="0.6"
        strokeLinecap="round"
      >
        <animate
          attributeName="d"
          values="M75 115 Q60 145 55 175;M75 115 Q55 145 50 180;M75 115 Q60 145 55 175"
          dur="3.5s"
          repeatCount="indefinite"
        />
      </path>

      {/* Tentacle 3 - bottom center left */}
      <path
        d="M85 118 Q80 150 75 180"
        fill="none"
        stroke="#00ff41"
        strokeWidth="1.5"
        opacity="0.6"
        strokeLinecap="round"
      >
        <animate
          attributeName="d"
          values="M85 118 Q80 150 75 180;M85 118 Q78 155 80 185;M85 118 Q80 150 75 180"
          dur="5s"
          repeatCount="indefinite"
        />
      </path>

      {/* Tentacle 4 - bottom center */}
      <path
        d="M95 120 Q95 155 92 185"
        fill="none"
        stroke="#00ff41"
        strokeWidth="1.5"
        opacity="0.6"
        strokeLinecap="round"
      >
        <animate
          attributeName="d"
          values="M95 120 Q95 155 92 185;M95 120 Q98 155 95 188;M95 120 Q95 155 92 185"
          dur="4.5s"
          repeatCount="indefinite"
        />
      </path>

      {/* Tentacle 5 - bottom center */}
      <path
        d="M105 120 Q105 155 108 185"
        fill="none"
        stroke="#00ff41"
        strokeWidth="1.5"
        opacity="0.6"
        strokeLinecap="round"
      >
        <animate
          attributeName="d"
          values="M105 120 Q105 155 108 185;M105 120 Q102 155 105 188;M105 120 Q105 155 108 185"
          dur="3.8s"
          repeatCount="indefinite"
        />
      </path>

      {/* Tentacle 6 - bottom center right */}
      <path
        d="M115 118 Q120 150 125 180"
        fill="none"
        stroke="#00ff41"
        strokeWidth="1.5"
        opacity="0.6"
        strokeLinecap="round"
      >
        <animate
          attributeName="d"
          values="M115 118 Q120 150 125 180;M115 118 Q122 155 120 185;M115 118 Q120 150 125 180"
          dur="4.2s"
          repeatCount="indefinite"
        />
      </path>

      {/* Tentacle 7 - bottom right */}
      <path
        d="M125 115 Q140 145 145 175"
        fill="none"
        stroke="#00ff41"
        strokeWidth="1.5"
        opacity="0.6"
        strokeLinecap="round"
      >
        <animate
          attributeName="d"
          values="M125 115 Q140 145 145 175;M125 115 Q145 145 150 180;M125 115 Q140 145 145 175"
          dur="3.2s"
          repeatCount="indefinite"
        />
      </path>

      {/* Tentacle 8 - bottom right far */}
      <path
        d="M130 110 Q150 140 165 170"
        fill="none"
        stroke="#00ff41"
        strokeWidth="1.5"
        opacity="0.6"
        strokeLinecap="round"
      >
        <animate
          attributeName="d"
          values="M130 110 Q150 140 165 170;M130 110 Q155 140 170 165;M130 110 Q150 140 165 170"
          dur="4.8s"
          repeatCount="indefinite"
        />
      </path>

      {/* Code characters floating around tentacles */}
      <text
        x="30"
        y="160"
        fill="#00ff41"
        opacity="0.3"
        fontSize="8"
        fontFamily="monospace"
      >
        {"{ }"}
        <animate
          attributeName="opacity"
          values="0.3;0.6;0.3"
          dur="3s"
          repeatCount="indefinite"
        />
      </text>
      <text
        x="155"
        y="155"
        fill="#00ff41"
        opacity="0.3"
        fontSize="8"
        fontFamily="monospace"
      >
        {"</>"}
        <animate
          attributeName="opacity"
          values="0.3;0.6;0.3"
          dur="4s"
          repeatCount="indefinite"
        />
      </text>
      <text
        x="60"
        y="180"
        fill="#00d4ff"
        opacity="0.2"
        fontSize="7"
        fontFamily="monospace"
      >
        0x1F
        <animate
          attributeName="opacity"
          values="0.2;0.5;0.2"
          dur="5s"
          repeatCount="indefinite"
        />
      </text>
      <text
        x="120"
        y="185"
        fill="#00d4ff"
        opacity="0.2"
        fontSize="7"
        fontFamily="monospace"
      >
        ::run
        <animate
          attributeName="opacity"
          values="0.2;0.5;0.2"
          dur="3.5s"
          repeatCount="indefinite"
        />
      </text>
    </svg>
  );
}
