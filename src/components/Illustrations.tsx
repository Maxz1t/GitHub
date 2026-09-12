import React from 'react';

export const RepoIllustration: React.FC = () => (
  <svg viewBox="0 0 200 160" className="w-full h-full">
    <defs>
      <linearGradient id="repoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
    {/* Folder */}
    <rect x="40" y="40" width="120" height="90" rx="8" fill="url(#repoGrad)" opacity="0.9"/>
    <rect x="40" y="30" width="60" height="20" rx="6" fill="url(#repoGrad)"/>
    {/* Files inside */}
    <rect x="55" y="60" width="90" height="12" rx="3" fill="white" opacity="0.8"/>
    <rect x="55" y="80" width="70" height="12" rx="3" fill="white" opacity="0.6"/>
    <rect x="55" y="100" width="80" height="12" rx="3" fill="white" opacity="0.4"/>
    {/* Star */}
    <polygon points="170,25 173,35 183,35 175,41 178,51 170,45 162,51 165,41 157,35 167,35" fill="#fbbf24"/>
    {/* Label */}
    <text x="100" y="150" textAnchor="middle" fontSize="12" fill="#6b7280" fontFamily="sans-serif">Репозиторий</text>
  </svg>
);

export const CommitIllustration: React.FC = () => (
  <svg viewBox="0 0 200 160" className="w-full h-full">
    <defs>
      <linearGradient id="commitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
    </defs>
    {/* Timeline */}
    <line x1="30" y1="80" x2="170" y2="80" stroke="#d1d5db" strokeWidth="3" strokeDasharray="5,5"/>
    {/* Commit nodes */}
    <circle cx="50" cy="80" r="12" fill="url(#commitGrad)"/>
    <text x="50" y="84" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">✓</text>
    
    <circle cx="100" cy="80" r="12" fill="url(#commitGrad)"/>
    <text x="100" y="84" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">✓</text>
    
    <circle cx="150" cy="80" r="12" fill="url(#commitGrad)"/>
    <text x="150" y="84" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">✓</text>
    
    {/* Labels */}
    <text x="50" y="110" textAnchor="middle" fontSize="9" fill="#6b7280" fontFamily="sans-serif">v1.0</text>
    <text x="100" y="110" textAnchor="middle" fontSize="9" fill="#6b7280" fontFamily="sans-serif">v1.1</text>
    <text x="150" y="110" textAnchor="middle" fontSize="9" fill="#6b7280" fontFamily="sans-serif">v1.2</text>
    
    {/* Arrow */}
    <polygon points="175,75 185,80 175,85" fill="#10b981"/>
    
    <text x="100" y="145" textAnchor="middle" fontSize="12" fill="#6b7280" fontFamily="sans-serif">Коммиты</text>
  </svg>
);

export const BranchIllustration: React.FC = () => (
  <svg viewBox="0 0 200 160" className="w-full h-full">
    <defs>
      <linearGradient id="branchMain" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#6366f1" />
      </linearGradient>
      <linearGradient id="branchFeature" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#ef4444" />
      </linearGradient>
    </defs>
    {/* Main branch */}
    <line x1="20" y1="60" x2="180" y2="60" stroke="url(#branchMain)" strokeWidth="3"/>
    {/* Feature branch */}
    <path d="M 60 60 Q 80 60 90 90 Q 100 120 120 120 Q 140 120 150 90 Q 160 60 180 60" 
          fill="none" stroke="url(#branchFeature)" strokeWidth="3"/>
    {/* Merge point */}
    <circle cx="60" cy="60" r="6" fill="#3b82f6"/>
    <circle cx="180" cy="60" r="6" fill="#6366f1"/>
    {/* Branch point */}
    <circle cx="90" cy="90" r="5" fill="#f59e0b"/>
    <circle cx="150" cy="90" r="5" fill="#ef4444"/>
    {/* Labels */}
    <text x="100" y="45" textAnchor="middle" fontSize="10" fill="#3b82f6" fontFamily="sans-serif">main</text>
    <text x="120" y="140" textAnchor="middle" fontSize="10" fill="#f59e0b" fontFamily="sans-serif">feature</text>
    <text x="100" y="155" textAnchor="middle" fontSize="12" fill="#6b7280" fontFamily="sans-serif">Ветки</text>
  </svg>
);

export const PRIllustration: React.FC = () => (
  <svg viewBox="0 0 200 160" className="w-full h-full">
    <defs>
      <linearGradient id="prGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#a855f7" />
      </linearGradient>
    </defs>
    {/* Two boxes merging */}
    <rect x="15" y="45" width="60" height="50" rx="8" fill="#3b82f6" opacity="0.8"/>
    <text x="45" y="75" textAnchor="middle" fontSize="9" fill="white" fontFamily="sans-serif">Ваш код</text>
    
    <rect x="125" y="45" width="60" height="50" rx="8" fill="#10b981" opacity="0.8"/>
    <text x="155" y="75" textAnchor="middle" fontSize="9" fill="white" fontFamily="sans-serif">Проект</text>
    
    {/* Arrow */}
    <path d="M 80 70 L 120 70" stroke="url(#prGrad)" strokeWidth="3" markerEnd="url(#arrowhead)"/>
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6"/>
      </marker>
    </defs>
    
    {/* PR icon */}
    <rect x="85" y="55" width="30" height="30" rx="6" fill="url(#prGrad)"/>
    <text x="100" y="74" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">PR</text>
    
    {/* Check */}
    <circle cx="100" cy="115" r="12" fill="#10b981"/>
    <text x="100" y="120" textAnchor="middle" fontSize="14" fill="white">✓</text>
    
    <text x="100" y="150" textAnchor="middle" fontSize="12" fill="#6b7280" fontFamily="sans-serif">Pull Request</text>
  </svg>
);

export const IssuesIllustration: React.FC = () => (
  <svg viewBox="0 0 200 160" className="w-full h-full">
    <defs>
      <linearGradient id="issueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#f97316" />
      </linearGradient>
    </defs>
    {/* Issue cards */}
    <rect x="30" y="25" width="140" height="30" rx="6" fill="white" stroke="#e5e7eb" strokeWidth="1"/>
    <circle cx="48" cy="40" r="8" fill="#ef4444"/>
    <text x="48" y="44" textAnchor="middle" fontSize="10" fill="white">!</text>
    <rect x="62" y="35" width="80" height="8" rx="2" fill="#d1d5db"/>
    
    <rect x="30" y="62" width="140" height="30" rx="6" fill="white" stroke="#e5e7eb" strokeWidth="1"/>
    <circle cx="48" cy="77" r="8" fill="#f59e0b"/>
    <text x="48" y="81" textAnchor="middle" fontSize="10" fill="white">?</text>
    <rect x="62" y="72" width="60" height="8" rx="2" fill="#d1d5db"/>
    
    <rect x="30" y="99" width="140" height="30" rx="6" fill="white" stroke="#e5e7eb" strokeWidth="1"/>
    <circle cx="48" cy="114" r="8" fill="#10b981"/>
    <text x="48" y="118" textAnchor="middle" fontSize="10" fill="white">✓</text>
    <rect x="62" y="109" width="90" height="8" rx="2" fill="#d1d5db"/>
    
    <text x="100" y="150" textAnchor="middle" fontSize="12" fill="#6b7280" fontFamily="sans-serif">Issues (Задачи)</text>
  </svg>
);

export const ActionsIllustration: React.FC = () => (
  <svg viewBox="0 0 200 160" className="w-full h-full">
    <defs>
      <linearGradient id="actionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
    </defs>
    {/* Gear icons */}
    <circle cx="50" cy="50" r="18" fill="none" stroke="url(#actionGrad)" strokeWidth="3"/>
    <circle cx="50" cy="50" r="8" fill="url(#actionGrad)"/>
    {/* Gear teeth */}
    <rect x="46" y="28" width="8" height="8" rx="2" fill="url(#actionGrad)"/>
    <rect x="46" y="64" width="8" height="8" rx="2" fill="url(#actionGrad)"/>
    <rect x="28" y="46" width="8" height="8" rx="2" fill="url(#actionGrad)"/>
    <rect x="64" y="46" width="8" height="8" rx="2" fill="url(#actionGrad)"/>
    
    {/* Arrow */}
    <path d="M 75 50 L 105 50" stroke="#06b6d4" strokeWidth="2" strokeDasharray="4,3"/>
    <polygon points="105,45 115,50 105,55" fill="#06b6d4"/>
    
    {/* Result */}
    <rect x="120" y="35" width="55" height="30" rx="6" fill="#10b981" opacity="0.8"/>
    <text x="147" y="54" textAnchor="middle" fontSize="9" fill="white" fontFamily="sans-serif">Deploy!</text>
    
    {/* Pipeline steps */}
    <rect x="30" y="90" width="40" height="20" rx="4" fill="#e0e7ff"/>
    <text x="50" y="104" textAnchor="middle" fontSize="8" fill="#4f46e5" fontFamily="sans-serif">Build</text>
    
    <rect x="80" y="90" width="40" height="20" rx="4" fill="#e0e7ff"/>
    <text x="100" y="104" textAnchor="middle" fontSize="8" fill="#4f46e5" fontFamily="sans-serif">Test</text>
    
    <rect x="130" y="90" width="40" height="20" rx="4" fill="#e0e7ff"/>
    <text x="150" y="104" textAnchor="middle" fontSize="8" fill="#4f46e5" fontFamily="sans-serif">Deploy</text>
    
    <line x1="70" y1="100" x2="80" y2="100" stroke="#4f46e5" strokeWidth="1.5"/>
    <line x1="120" y1="100" x2="130" y2="100" stroke="#4f46e5" strokeWidth="1.5"/>
    
    <text x="100" y="145" textAnchor="middle" fontSize="12" fill="#6b7280" fontFamily="sans-serif">GitHub Actions</text>
  </svg>
);

export const ForkIllustration: React.FC = () => (
  <svg viewBox="0 0 200 160" className="w-full h-full">
    <defs>
      <linearGradient id="forkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#f43f5e" />
      </linearGradient>
    </defs>
    {/* Original repo */}
    <rect x="65" y="15" width="70" height="35" rx="8" fill="#6366f1" opacity="0.9"/>
    <text x="100" y="37" textAnchor="middle" fontSize="9" fill="white" fontFamily="sans-serif">Оригинал</text>
    
    {/* Fork lines */}
    <line x1="80" y1="50" x2="40" y2="80" stroke="#ec4899" strokeWidth="2"/>
    <line x1="120" y1="50" x2="160" y2="80" stroke="#ec4899" strokeWidth="2"/>
    <line x1="100" y1="50" x2="100" y2="80" stroke="#ec4899" strokeWidth="2"/>
    
    {/* Forked repos */}
    <rect x="10" y="80" width="60" height="30" rx="6" fill="url(#forkGrad)" opacity="0.7"/>
    <text x="40" y="99" textAnchor="middle" fontSize="8" fill="white" fontFamily="sans-serif">Ваш fork</text>
    
    <rect x="70" y="80" width="60" height="30" rx="6" fill="url(#forkGrad)" opacity="0.7"/>
    <text x="100" y="99" textAnchor="middle" fontSize="8" fill="white" fontFamily="sans-serif">Ваш fork</text>
    
    <rect x="130" y="80" width="60" height="30" rx="6" fill="url(#forkGrad)" opacity="0.7"/>
    <text x="160" y="99" textAnchor="middle" fontSize="8" fill="white" fontFamily="sans-serif">Ваш fork</text>
    
    {/* Fork icon */}
    <circle cx="100" cy="65" r="10" fill="url(#forkGrad)"/>
    <text x="100" y="69" textAnchor="middle" fontSize="12" fill="white">⑂</text>
    
    <text x="100" y="140" textAnchor="middle" fontSize="12" fill="#6b7280" fontFamily="sans-serif">Форк (копия)</text>
  </svg>
);

export const PagesIllustration: React.FC = () => (
  <svg viewBox="0 0 200 160" className="w-full h-full">
    <defs>
      <linearGradient id="pagesGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#14b8a6" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
    </defs>
    {/* Browser window */}
    <rect x="25" y="20" width="150" height="100" rx="8" fill="white" stroke="#d1d5db" strokeWidth="1.5"/>
    {/* Browser bar */}
    <rect x="25" y="20" width="150" height="20" rx="8" fill="#f3f4f6"/>
    <rect x="25" y="32" width="150" height="8" fill="#f3f4f6"/>
    <circle cx="38" cy="30" r="4" fill="#ef4444"/>
    <circle cx="50" cy="30" r="4" fill="#f59e0b"/>
    <circle cx="62" cy="30" r="4" fill="#10b981"/>
    {/* URL bar */}
    <rect x="75" y="25" width="90" height="10" rx="3" fill="white" stroke="#d1d5db" strokeWidth="0.5"/>
    <text x="120" y="33" textAnchor="middle" fontSize="5" fill="#6b7280" fontFamily="monospace">user.github.io</text>
    {/* Page content */}
    <rect x="35" y="48" width="80" height="10" rx="2" fill="url(#pagesGrad)" opacity="0.8"/>
    <rect x="35" y="64" width="130" height="6" rx="2" fill="#e5e7eb"/>
    <rect x="35" y="74" width="110" height="6" rx="2" fill="#e5e7eb"/>
    <rect x="35" y="84" width="120" height="6" rx="2" fill="#e5e7eb"/>
    <rect x="35" y="98" width="50" height="14" rx="4" fill="url(#pagesGrad)" opacity="0.6"/>
    <text x="60" y="108" textAnchor="middle" fontSize="7" fill="white" fontFamily="sans-serif">Click me</text>
    {/* Globe icon */}
    <circle cx="160" cy="140" r="10" fill="none" stroke="url(#pagesGrad)" strokeWidth="1.5"/>
    <line x1="150" y1="140" x2="170" y2="140" stroke="url(#pagesGrad)" strokeWidth="1"/>
    <ellipse cx="160" cy="140" rx="5" ry="10" fill="none" stroke="url(#pagesGrad)" strokeWidth="1"/>
    <text x="100" y="150" textAnchor="middle" fontSize="12" fill="#6b7280" fontFamily="sans-serif">GitHub Pages</text>
  </svg>
);

export const MarkdownIllustration: React.FC = () => (
  <svg viewBox="0 0 200 160" className="w-full h-full">
    <defs>
      <linearGradient id="mdGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
    </defs>
    {/* Code editor */}
    <rect x="15" y="15" width="80" height="110" rx="6" fill="#1e293b"/>
    <rect x="15" y="15" width="80" height="15" rx="6" fill="#334155"/>
    <rect x="15" y="24" width="80" height="6" fill="#334155"/>
    <circle cx="24" cy="22" r="3" fill="#ef4444"/>
    <circle cx="33" cy="22" r="3" fill="#f59e0b"/>
    <circle cx="42" cy="22" r="3" fill="#10b981"/>
    {/* Markdown code */}
    <text x="22" y="45" fontSize="7" fill="#f59e0b" fontFamily="monospace"># Заголовок</text>
    <text x="22" y="57" fontSize="7" fill="#94a3b8" fontFamily="monospace">Обычный текст</text>
    <text x="22" y="69" fontSize="7" fill="#10b981" fontFamily="monospace">**жирный**</text>
    <text x="22" y="81" fontSize="7" fill="#60a5fa" fontFamily="monospace">- пункт 1</text>
    <text x="22" y="93" fontSize="7" fill="#60a5fa" fontFamily="monospace">- пункт 2</text>
    <text x="22" y="105" fontSize="7" fill="#c084fc" fontFamily="monospace">[ссылка](url)</text>
    
    {/* Arrow */}
    <path d="M 100 70 L 115 70" stroke="#f59e0b" strokeWidth="2"/>
    <polygon points="115,66 122,70 115,74" fill="#f59e0b"/>
    
    {/* Result */}
    <rect x="125" y="15" width="65" height="110" rx="6" fill="white" stroke="#e5e7eb" strokeWidth="1"/>
    <text x="132" y="35" fontSize="9" fill="#1e293b" fontWeight="bold" fontFamily="sans-serif">Заголовок</text>
    <text x="132" y="48" fontSize="7" fill="#6b7280" fontFamily="sans-serif">Обычный текст</text>
    <text x="132" y="61" fontSize="7" fill="#1e293b" fontWeight="bold" fontFamily="sans-serif">жирный</text>
    <text x="132" y="76" fontSize="7" fill="#6b7280" fontFamily="sans-serif">• пункт 1</text>
    <text x="132" y="88" fontSize="7" fill="#6b7280" fontFamily="sans-serif">• пункт 2</text>
    <text x="132" y="101" fontSize="7" fill="#3b82f6" fontFamily="sans-serif" textDecoration="underline">ссылка</text>
    
    <text x="100" y="150" textAnchor="middle" fontSize="12" fill="#6b7280" fontFamily="sans-serif">Markdown</text>
  </svg>
);

export const CollabIllustration: React.FC = () => (
  <svg viewBox="0 0 200 160" className="w-full h-full">
    <defs>
      <linearGradient id="collabGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
    </defs>
    {/* People */}
    <circle cx="40" cy="40" r="15" fill="#3b82f6" opacity="0.8"/>
    <text x="40" y="44" textAnchor="middle" fontSize="14" fill="white">👩</text>
    
    <circle cx="100" cy="30" r="15" fill="#10b981" opacity="0.8"/>
    <text x="100" y="34" textAnchor="middle" fontSize="14" fill="white">👨</text>
    
    <circle cx="160" cy="40" r="15" fill="#f59e0b" opacity="0.8"/>
    <text x="160" y="44" textAnchor="middle" fontSize="14" fill="white">🧑</text>
    
    {/* Lines to central repo */}
    <line x1="40" y1="55" x2="100" y2="85" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3,3"/>
    <line x1="100" y1="45" x2="100" y2="85" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3,3"/>
    <line x1="160" y1="55" x2="100" y2="85" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3,3"/>
    
    {/* Central repo */}
    <rect x="70" y="80" width="60" height="35" rx="8" fill="url(#collabGrad)"/>
    <text x="100" y="100" textAnchor="middle" fontSize="8" fill="white" fontFamily="sans-serif">Проект</text>
    <text x="100" y="110" textAnchor="middle" fontSize="7" fill="white" opacity="0.7" fontFamily="sans-serif">main</text>
    
    {/* Merge arrows */}
    <path d="M 85 115 Q 85 130 100 130" fill="none" stroke="#8b5cf6" strokeWidth="1.5"/>
    <path d="M 115 115 Q 115 130 100 130" fill="none" stroke="#8b5cf6" strokeWidth="1.5"/>
    
    {/* Check */}
    <circle cx="100" cy="135" r="8" fill="#10b981"/>
    <text x="100" y="139" textAnchor="middle" fontSize="10" fill="white">✓</text>
    
    <text x="100" y="155" textAnchor="middle" fontSize="12" fill="#6b7280" fontFamily="sans-serif">Команда</text>
  </svg>
);

export const GithubLogo: React.FC<{className?: string}> = ({className}) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);
