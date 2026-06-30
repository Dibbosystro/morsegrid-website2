import type { ComponentType } from "react";
import type { Industry, IndustryHeroIllustration as IllustrationMeta } from "@/data/industries";

type Props = {
  industry: Industry;
  className?: string;
};

function Retail({ industry }: { industry: Industry }) {
  const { accent, gradientFrom, gradientTo, accentSoft } = industry;
  return (
    <svg viewBox="0 0 360 320" className="w-full h-auto" aria-hidden="true">
      <defs>
        <linearGradient id="retail-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={gradientFrom} stopOpacity="0.15" />
          <stop offset="100%" stopColor={gradientTo} stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="retail-bag" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={gradientFrom} />
          <stop offset="100%" stopColor={gradientTo} />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="360" height="320" rx="24" fill="url(#retail-bg)" />
      {/* product card back */}
      <rect x="36" y="58" width="160" height="200" rx="18" fill="white" stroke={`${accent}22`} />
      <rect x="52" y="74" width="128" height="92" rx="12" fill={accentSoft} />
      <circle cx="116" cy="120" r="22" fill={accent} opacity="0.85" />
      <rect x="52" y="180" width="96" height="10" rx="5" fill={`${accent}33`} />
      <rect x="52" y="198" width="64" height="8" rx="4" fill={`${accent}22`} />
      <rect x="52" y="222" width="50" height="20" rx="10" fill={accent} />
      {/* shopping bag front */}
      <g transform="translate(178 92)">
        <path
          d="M14 38 H132 L120 168 Q118 184 102 184 H44 Q28 184 26 168 Z"
          fill="url(#retail-bag)"
        />
        <path
          d="M44 44 V32 a29 29 0 0 1 58 0 V44"
          fill="none"
          stroke="white"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <circle cx="55" cy="92" r="5" fill="white" opacity="0.9" />
        <circle cx="91" cy="92" r="5" fill="white" opacity="0.9" />
        <path d="M58 116 q15 16 30 0" stroke="white" strokeWidth="4" strokeLinecap="round" fill="none" />
      </g>
      {/* tag */}
      <g transform="translate(232 50) rotate(12)">
        <path d="M0 0 L52 0 L62 14 L52 28 L0 28 Z" fill="white" stroke={`${accent}33`} />
        <circle cx="10" cy="14" r="3.5" fill={accent} />
        <rect x="20" y="10" width="32" height="8" rx="4" fill={`${accent}33`} />
      </g>
    </svg>
  );
}

function Travel({ industry }: { industry: Industry }) {
  const { accent, gradientFrom, gradientTo, accentSoft } = industry;
  return (
    <svg viewBox="0 0 360 320" className="w-full h-auto" aria-hidden="true">
      <defs>
        <linearGradient id="travel-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={gradientFrom} stopOpacity="0.18" />
          <stop offset="100%" stopColor={gradientTo} stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="travel-pass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={gradientFrom} />
          <stop offset="100%" stopColor={gradientTo} />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="360" height="320" rx="24" fill="url(#travel-bg)" />
      {/* dashed flight path */}
      <path
        d="M40 240 Q180 80 320 200"
        fill="none"
        stroke={accent}
        strokeWidth="2"
        strokeDasharray="4 6"
        opacity="0.6"
      />
      <circle cx="40" cy="240" r="6" fill={accent} />
      <circle cx="320" cy="200" r="6" fill={accent} />
      {/* boarding pass */}
      <g transform="translate(48 96)">
        <rect width="264" height="128" rx="14" fill="white" stroke={`${accent}22`} />
        <rect width="86" height="128" rx="14" fill="url(#travel-pass)" />
        {/* plane icon on stub */}
        <path
          d="M22 56 L60 64 L52 44 L60 42 L72 60 L74 78 L72 80 L58 70 L36 76 L32 72 L46 64 Z"
          fill="white"
          opacity="0.95"
        />
        {/* perforation */}
        <line x1="86" y1="14" x2="86" y2="114" stroke={`${accent}55`} strokeDasharray="3 4" />
        {/* details */}
        <rect x="102" y="22" width="60" height="8" rx="4" fill={`${accent}33`} />
        <rect x="102" y="40" width="120" height="14" rx="4" fill={`${accent}66`} />
        <rect x="102" y="68" width="40" height="6" rx="3" fill={`${accent}22`} />
        <rect x="160" y="68" width="40" height="6" rx="3" fill={`${accent}22`} />
        <rect x="102" y="82" width="48" height="10" rx="3" fill={accent} />
        <rect x="160" y="82" width="48" height="10" rx="3" fill={accent} opacity="0.6" />
        <rect x="102" y="104" width="120" height="6" rx="3" fill={accentSoft} />
      </g>
      {/* sun */}
      <circle cx="300" cy="68" r="22" fill={gradientTo} opacity="0.5" />
      <circle cx="300" cy="68" r="14" fill={gradientTo} />
    </svg>
  );
}

function Technology({ industry }: { industry: Industry }) {
  const { accent, gradientFrom, gradientTo, accentSoft } = industry;
  return (
    <svg viewBox="0 0 360 320" className="w-full h-auto" aria-hidden="true">
      <defs>
        <linearGradient id="tech-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={gradientFrom} stopOpacity="0.16" />
          <stop offset="100%" stopColor={gradientTo} stopOpacity="0.04" />
        </linearGradient>
        <linearGradient id="tech-bar" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor={gradientFrom} />
          <stop offset="100%" stopColor={gradientTo} />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="360" height="320" rx="24" fill="url(#tech-bg)" />
      {/* dashboard window */}
      <g transform="translate(36 52)">
        <rect width="288" height="216" rx="16" fill="white" stroke={`${accent}22`} />
        <rect width="288" height="32" rx="16" fill={accentSoft} />
        <rect y="16" width="288" height="16" fill={accentSoft} />
        <circle cx="18" cy="16" r="4" fill={accent} opacity="0.5" />
        <circle cx="32" cy="16" r="4" fill={accent} opacity="0.35" />
        <circle cx="46" cy="16" r="4" fill={accent} opacity="0.2" />
        {/* metric tiles */}
        <rect x="16" y="48" width="80" height="56" rx="10" fill={accentSoft} />
        <rect x="24" y="58" width="36" height="6" rx="3" fill={`${accent}66`} />
        <rect x="24" y="72" width="56" height="14" rx="3" fill={accent} />
        <rect x="104" y="48" width="80" height="56" rx="10" fill={accentSoft} />
        <rect x="112" y="58" width="36" height="6" rx="3" fill={`${accent}66`} />
        <rect x="112" y="72" width="56" height="14" rx="3" fill={accent} />
        <rect x="192" y="48" width="80" height="56" rx="10" fill={accentSoft} />
        <rect x="200" y="58" width="36" height="6" rx="3" fill={`${accent}66`} />
        <rect x="200" y="72" width="56" height="14" rx="3" fill={accent} />
        {/* chart */}
        <rect x="16" y="120" width="256" height="80" rx="10" fill="white" stroke={`${accent}1f`} />
        <g transform="translate(28 134)">
          {[36, 22, 48, 30, 56, 40, 62, 50].map((h, i) => (
            <rect
              key={i}
              x={i * 28}
              y={56 - h}
              width="16"
              height={h}
              rx="3"
              fill="url(#tech-bar)"
              opacity={0.55 + i * 0.05}
            />
          ))}
        </g>
      </g>
      {/* notification dot */}
      <circle cx="312" cy="60" r="8" fill={accent} />
      <circle cx="312" cy="60" r="3" fill="white" />
    </svg>
  );
}

function Financial({ industry }: { industry: Industry }) {
  const { accent, gradientFrom, gradientTo } = industry;
  return (
    <svg viewBox="0 0 360 320" className="w-full h-auto" aria-hidden="true">
      <defs>
        <linearGradient id="fin-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={gradientFrom} stopOpacity="0.16" />
          <stop offset="100%" stopColor={gradientTo} stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="fin-card" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={gradientFrom} />
          <stop offset="100%" stopColor={gradientTo} />
        </linearGradient>
        <linearGradient id="fin-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={gradientFrom} />
          <stop offset="100%" stopColor={gradientTo} />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="360" height="320" rx="24" fill="url(#fin-bg)" />
      {/* chart panel */}
      <g transform="translate(36 56)">
        <rect width="288" height="124" rx="14" fill="white" stroke={`${accent}22`} />
        <rect x="16" y="18" width="80" height="10" rx="5" fill={`${accent}55`} />
        <rect x="16" y="34" width="56" height="6" rx="3" fill={`${accent}33`} />
        {/* gridlines */}
        {[60, 78, 96].map((y) => (
          <line key={y} x1="16" y1={y} x2="272" y2={y} stroke={`${accent}15`} />
        ))}
        {/* line chart */}
        <path
          d="M16 96 L60 80 L100 86 L140 64 L184 70 L224 50 L272 56"
          fill="none"
          stroke="url(#fin-line)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 96 L60 80 L100 86 L140 64 L184 70 L224 50 L272 56 L272 110 L16 110 Z"
          fill={accent}
          opacity="0.1"
        />
        <circle cx="224" cy="50" r="5" fill="white" stroke={accent} strokeWidth="2.5" />
      </g>
      {/* card */}
      <g transform="translate(72 198)">
        <rect width="216" height="100" rx="14" fill="url(#fin-card)" />
        <circle cx="36" cy="34" r="10" fill="white" opacity="0.85" />
        <circle cx="50" cy="34" r="10" fill="white" opacity="0.55" />
        <rect x="20" y="64" width="64" height="8" rx="4" fill="white" opacity="0.85" />
        <rect x="20" y="78" width="40" height="6" rx="3" fill="white" opacity="0.6" />
        <g transform="translate(168 64)" fill="white" opacity="0.9">
          <rect width="18" height="14" rx="2" />
          <rect x="6" y="-4" width="6" height="6" rx="1" />
        </g>
      </g>
      {/* check badge */}
      <g transform="translate(294 38)">
        <circle r="20" fill="white" stroke={accent} strokeWidth="2" />
        <path d="M-8 0 L-2 6 L8 -6" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

function Health({ industry }: { industry: Industry }) {
  const { accent, gradientFrom, gradientTo, accentSoft } = industry;
  return (
    <svg viewBox="0 0 360 320" className="w-full h-auto" aria-hidden="true">
      <defs>
        <linearGradient id="health-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={gradientFrom} stopOpacity="0.18" />
          <stop offset="100%" stopColor={gradientTo} stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="health-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={gradientFrom} />
          <stop offset="100%" stopColor={gradientTo} />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="360" height="320" rx="24" fill="url(#health-bg)" />
      {/* device card */}
      <g transform="translate(36 52)">
        <rect width="288" height="216" rx="20" fill="white" stroke={`${accent}22`} />
        {/* activity rings */}
        <g transform="translate(76 108)">
          <circle r="56" fill="none" stroke={accentSoft} strokeWidth="14" />
          <circle
            r="56"
            fill="none"
            stroke="url(#health-ring)"
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray="280 80"
            transform="rotate(-90)"
          />
          <circle r="38" fill="none" stroke={accentSoft} strokeWidth="12" />
          <circle
            r="38"
            fill="none"
            stroke={accent}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray="180 80"
            transform="rotate(-90)"
            opacity="0.75"
          />
          <circle r="22" fill="none" stroke={accentSoft} strokeWidth="10" />
          <circle
            r="22"
            fill="none"
            stroke={accent}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray="100 50"
            transform="rotate(-90)"
            opacity="0.55"
          />
        </g>
        {/* heart + pulse */}
        <g transform="translate(168 40)">
          <path
            d="M40 28 a16 16 0 0 1 30 0 a16 16 0 0 1 30 0 c0 18 -30 38 -30 38 c0 0 -30 -20 -30 -38 Z"
            fill={accent}
            opacity="0.9"
          />
          <path
            d="M0 100 L24 100 L34 80 L52 124 L66 92 L80 108 L104 108"
            fill="none"
            stroke={accent}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="0" y="142" width="100" height="8" rx="4" fill={`${accent}33`} />
          <rect x="0" y="156" width="60" height="6" rx="3" fill={`${accent}22`} />
        </g>
      </g>
    </svg>
  );
}

function Media({ industry }: { industry: Industry }) {
  const { accent, gradientFrom, gradientTo, accentSoft } = industry;
  return (
    <svg viewBox="0 0 360 320" className="w-full h-auto" aria-hidden="true">
      <defs>
        <linearGradient id="media-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={gradientFrom} stopOpacity="0.18" />
          <stop offset="100%" stopColor={gradientTo} stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="media-play" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={gradientFrom} />
          <stop offset="100%" stopColor={gradientTo} />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="360" height="320" rx="24" fill="url(#media-bg)" />
      {/* video player */}
      <g transform="translate(36 52)">
        <rect width="288" height="160" rx="14" fill="#0d0d0d" />
        <rect width="288" height="160" rx="14" fill="url(#media-play)" opacity="0.25" />
        <circle cx="144" cy="76" r="30" fill="white" opacity="0.95" />
        <path d="M136 62 L160 76 L136 90 Z" fill={accent} />
        {/* progress bar */}
        <rect x="20" y="134" width="248" height="4" rx="2" fill="white" opacity="0.25" />
        <rect x="20" y="134" width="120" height="4" rx="2" fill="white" />
        <circle cx="140" cy="136" r="6" fill="white" />
      </g>
      {/* article card */}
      <g transform="translate(36 224)">
        <rect width="160" height="76" rx="12" fill="white" stroke={`${accent}22`} />
        <rect x="14" y="14" width="50" height="6" rx="3" fill={accent} />
        <rect x="14" y="28" width="120" height="10" rx="3" fill={`${accent}66`} />
        <rect x="14" y="46" width="100" height="6" rx="3" fill={`${accent}33`} />
        <rect x="14" y="58" width="74" height="6" rx="3" fill={`${accent}22`} />
      </g>
      {/* audio waveform card */}
      <g transform="translate(208 224)">
        <rect width="116" height="76" rx="12" fill={accentSoft} />
        {[12, 24, 18, 32, 22, 36, 20, 28, 14, 30, 18].map((h, i) => (
          <rect
            key={i}
            x={10 + i * 9}
            y={(76 - h) / 2}
            width="5"
            height={h}
            rx="2.5"
            fill={accent}
            opacity={0.5 + (i % 3) * 0.15}
          />
        ))}
      </g>
    </svg>
  );
}

const map: Record<IllustrationMeta["kind"], ComponentType<{ industry: Industry }>> = {
  retail: Retail,
  technology: Technology,
  "health-wellness": Health,
};

export function IndustryHeroIllustration({ industry, className }: Props) {
  const Component = map[industry.hero.illustration.kind];
  if (!Component) return null;
  return (
    <div className={className} data-testid={`illustration-${industry.hero.illustration.kind}`}>
      <Component industry={industry} />
    </div>
  );
}
