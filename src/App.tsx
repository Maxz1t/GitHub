import { useState, useEffect } from 'react';
import { sections } from './data/sections';
import { SectionCard } from './components/SectionCard';
import {
  RepoIllustration,
  CommitIllustration,
  BranchIllustration,
  PRIllustration,
  IssuesIllustration,
  ActionsIllustration,
  ForkIllustration,
  PagesIllustration,
  MarkdownIllustration,
  CollabIllustration,
  GithubLogo,
} from './components/Illustrations';

const illustrations: Record<string, React.ReactNode> = {
  'what-is-github': <GithubLogo className="w-32 h-32 mx-auto text-gray-800" />,
  'repositories': <RepoIllustration />,
  'commits': <CommitIllustration />,
  'branches': <BranchIllustration />,
  'pull-requests': <PRIllustration />,
  'issues': <IssuesIllustration />,
  'actions': <ActionsIllustration />,
  'forks': <ForkIllustration />,
  'github-pages': <PagesIllustration />,
  'markdown': <MarkdownIllustration />,
  'collaboration': <CollabIllustration />,
};

function App() {
  const [activeSection, setActiveSection] = useState('what-is-github');
  const [menuOpen, setMenuOpen] = useState(false);
  const [showHero, setShowHero] = useState(true);
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Mark section as visited
    setCompletedSections(prev => new Set([...prev, activeSection]));
  }, [activeSection]);

  const handleStartLearning = () => {
    setShowHero(false);
    setActiveSection('what-is-github');
  };

  // Hero Screen
  if (showHero) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950 flex items-center justify-center p-4">
        <div className="max-w-3xl w-full text-center">
          {/* Floating icons animation */}
          <div className="relative mb-8">
            <div className="absolute -top-4 -left-4 text-4xl animate-bounce" style={{animationDelay: '0s'}}>📁</div>
            <div className="absolute -top-2 -right-4 text-3xl animate-bounce" style={{animationDelay: '0.2s'}}>🔀</div>
            <div className="absolute -bottom-2 -left-8 text-3xl animate-bounce" style={{animationDelay: '0.4s'}}>⚡</div>
            <div className="absolute -bottom-4 -right-8 text-4xl animate-bounce" style={{animationDelay: '0.6s'}}>🌿</div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20">
              <GithubLogo className="w-20 h-20 mx-auto text-white mb-6" />
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                GitHub <span className="text-indigo-400">Помощник</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-2">
                Изучите GitHub простыми словами
              </p>
              <p className="text-gray-400 mb-8 text-lg">
                С картинками • С озвучкой • Без воды
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                {sections.slice(0, 4).map((s) => (
                  <div key={s.id} className="bg-white/5 rounded-xl p-3 border border-white/10">
                    <span className="text-2xl">{s.emoji}</span>
                    <p className="text-xs text-gray-300 mt-1">{s.title}</p>
                  </div>
                ))}
              </div>
              
              <button
                onClick={handleStartLearning}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl text-xl font-bold shadow-2xl shadow-indigo-500/30 transition-all duration-300 hover:scale-105 hover:shadow-indigo-500/50"
              >
                🚀 Начать изучение
              </button>
              
              <p className="text-gray-500 text-sm mt-4">
                {sections.length} разделов • ~5 минут чтения
              </p>
            </div>
          </div>
          
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <span className="text-3xl mb-2 block">🎨</span>
              <p className="text-white font-medium">Визуально</p>
              <p className="text-gray-400 text-sm">SVG-иллюстрации к каждому разделу</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <span className="text-3xl mb-2 block">🔊</span>
              <p className="text-white font-medium">С озвучкой</p>
              <p className="text-gray-400 text-sm">Нажмите кнопку — послушайте</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <span className="text-3xl mb-2 block">💡</span>
              <p className="text-white font-medium">Просто</p>
              <p className="text-gray-400 text-sm">Аналогии из жизни, без терминов</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GithubLogo className="w-7 h-7" />
            <div>
              <h1 className="text-lg md:text-xl font-bold">GitHub Помощник</h1>
              <p className="text-xs text-gray-400 hidden sm:block">Простыми словами • {completedSections.size}/{sections.length} пройдено</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Progress bar */}
            <div className="hidden md:flex items-center gap-2 bg-gray-700/50 rounded-full px-3 py-1.5">
              <div className="w-24 h-2 bg-gray-600 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full transition-all duration-500"
                  style={{width: `${(completedSections.size / sections.length) * 100}%`}}
                />
              </div>
              <span className="text-xs text-gray-300">{Math.round((completedSections.size / sections.length) * 100)}%</span>
            </div>
            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
        {/* Sidebar Navigation */}
        <nav className={`${menuOpen ? 'block' : 'hidden'} md:block md:w-60 flex-shrink-0`}>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 sticky top-20">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">Разделы</p>
            <ul className="space-y-1">
              {sections.map((section, idx) => (
                <li key={section.id}>
                  <button
                    onClick={() => {
                      setActiveSection(section.id);
                      setMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2.5 text-sm ${
                      activeSection === section.id
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-lg flex-shrink-0">{section.emoji}</span>
                    <span className="font-medium truncate flex-1">{section.title}</span>
                    {completedSections.has(section.id) && activeSection !== section.id && (
                      <span className="text-green-500 text-xs flex-shrink-0">✓</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {/* Progress dots */}
          <div className="flex items-center gap-1.5 mb-6 overflow-x-auto pb-2">
            {sections.map((section, idx) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  activeSection === section.id
                    ? 'bg-indigo-600 text-white scale-110 shadow-lg ring-2 ring-indigo-300'
                    : completedSections.has(section.id)
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                }`}
                title={section.title}
              >
                {completedSections.has(section.id) && activeSection !== section.id ? '✓' : idx + 1}
              </button>
            ))}
          </div>

          {/* Section Content */}
          <SectionCard
            section={sections.find(s => s.id === activeSection)!}
            illustration={illustrations[activeSection]}
            isActive={true}
          />

          {/* Navigation buttons */}
          <div className="flex justify-between mt-6 gap-4">
            <button
              onClick={() => {
                const idx = sections.findIndex(s => s.id === activeSection);
                if (idx > 0) setActiveSection(sections[idx - 1].id);
              }}
              disabled={activeSection === sections[0].id}
              className="px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm flex-1 max-w-[150px]"
            >
              ← Назад
            </button>
            <button
              onClick={() => {
                const idx = sections.findIndex(s => s.id === activeSection);
                if (idx < sections.length - 1) {
                  setActiveSection(sections[idx + 1].id);
                } else {
                  setShowHero(true);
                }
              }}
              className="px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:from-indigo-600 hover:to-purple-700 transition-all shadow-md flex-1 max-w-[150px]"
            >
              {activeSection === sections[sections.length - 1].id ? '🎉 Готово!' : 'Далее →'}
            </button>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="mt-12 py-6 bg-gray-900 text-gray-400 text-center text-sm">
        <div className="max-w-6xl mx-auto px-4">
          <p className="mb-1">Создано с ❤️ для тех, кто изучает GitHub</p>
          <p className="text-xs text-gray-500">
            Основано на <a href="https://docs.github.com/ru" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">документации GitHub</a> • Простыми словами
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
