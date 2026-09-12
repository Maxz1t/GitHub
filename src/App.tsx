import { useState, useEffect } from 'react';
import { sections } from './data/sections';
import { SectionCard } from './components/SectionCard';
import { useSpeech } from './hooks/useSpeech';
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
  const [autoSpeak, setAutoSpeak] = useState(true);
  const { speak, stop, isSpeaking, settings, updateSettings, preview } = useSpeech();

  useEffect(() => {
    setCompletedSections(prev => new Set([...prev, activeSection]));
  }, [activeSection]);

  // Автостарт озвучки при смене слайда
  useEffect(() => {
    if (showHero) return;
    if (!autoSpeak) return;

    const currentSection = sections.find(s => s.id === activeSection);
    if (currentSection) {
      // Небольшая задержка чтобы контент успел отрисоваться
      const timer = setTimeout(() => {
        speak(currentSection.speechText);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [activeSection, showHero, autoSpeak, speak]);

  const handleStartLearning = () => {
    setShowHero(false);
    setActiveSection('what-is-github');
  };

  const goToNext = () => {
    const idx = sections.findIndex(s => s.id === activeSection);
    if (idx < sections.length - 1) {
      setActiveSection(sections[idx + 1].id);
    } else {
      setShowHero(true);
    }
  };

  const goToPrev = () => {
    const idx = sections.findIndex(s => s.id === activeSection);
    if (idx > 0) setActiveSection(sections[idx - 1].id);
  };

  const currentIdx = sections.findIndex(s => s.id === activeSection);

  // Hero Screen
  if (showHero) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950 flex items-center justify-center p-4">
        <div className="max-w-3xl w-full text-center">
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
                С картинками • С автоозвучкой • Без воды
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <span className="text-3xl mb-2 block">🎨</span>
              <p className="text-white font-medium">Визуально</p>
              <p className="text-gray-400 text-sm">SVG-иллюстрации к каждому разделу</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <span className="text-3xl mb-2 block">🔊</span>
              <p className="text-white font-medium">Автоозвучка</p>
              <p className="text-gray-400 text-sm">Голос читает при переходе</p>
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
              <p className="text-xs text-gray-400 hidden sm:block">
                {completedSections.size}/{sections.length} пройдено
                {isSpeaking && <span className="ml-2 text-indigo-400 animate-pulse">🔊 озвучка...</span>}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Auto-speak toggle */}
            <button
              onClick={() => setAutoSpeak(!autoSpeak)}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                autoSpeak 
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' 
                  : 'bg-gray-700/50 text-gray-400 border border-gray-600'
              }`}
              title={autoSpeak ? 'Автоозвучка включена' : 'Автоозвучка выключена'}
            >
              {autoSpeak ? '🔊' : '🔇'} Авто
            </button>
            {/* Progress */}
            <div className="hidden md:flex items-center gap-2 bg-gray-700/50 rounded-full px-3 py-1.5">
              <div className="w-24 h-2 bg-gray-600 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full transition-all duration-500"
                  style={{width: `${(completedSections.size / sections.length) * 100}%`}}
                />
              </div>
              <span className="text-xs text-gray-300">{Math.round((completedSections.size / sections.length) * 100)}%</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        
        {/* Dropdown для разделов */}
        <div className="mb-6">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-full flex items-center justify-between px-5 py-4 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{sections[currentIdx]?.emoji}</span>
              <div className="text-left">
                <p className="text-xs text-gray-400 uppercase tracking-wider">Раздел {currentIdx + 1} из {sections.length}</p>
                <p className="font-semibold text-gray-800">{sections[currentIdx]?.title}</p>
              </div>
            </div>
            <svg
              className={`w-6 h-6 text-gray-400 transition-transform ${menuOpen ? 'rotate-180' : ''}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Выпадающий список разделов */}
          {menuOpen && (
            <div className="mt-2 bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden animate-fadeIn">
              <ul className="divide-y divide-gray-100">
                {sections.map((section, idx) => (
                  <li key={section.id}>
                    <button
                      onClick={() => {
                        setActiveSection(section.id);
                        setMenuOpen(false);
                      }}
                      className={`w-full text-left px-5 py-3 flex items-center gap-3 transition-all ${
                        activeSection === section.id
                          ? 'bg-indigo-50 border-l-4 border-indigo-500'
                          : 'hover:bg-gray-50 border-l-4 border-transparent'
                      }`}
                    >
                      <span className="text-xl flex-shrink-0">{section.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium truncate ${
                          activeSection === section.id ? 'text-indigo-700' : 'text-gray-800'
                        }`}>
                          {section.title}
                        </p>
                        <p className="text-xs text-gray-500 truncate">{section.shortDesc}</p>
                      </div>
                      {completedSections.has(section.id) && (
                        <span className="text-green-500 text-sm flex-shrink-0">✓</span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Progress dots */}
        <div className="flex items-center gap-1.5 mb-6 overflow-x-auto pb-2 justify-center">
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
          section={sections[currentIdx]}
          illustration={illustrations[activeSection]}
          isActive={true}
          isSpeaking={isSpeaking}
          settings={settings}
          onSpeak={speak}
          onStop={stop}
          onUpdateSettings={updateSettings}
          onPreview={preview}
        />

        {/* Большая кнопка ДАЛЕЕ */}
        <div className="mt-8">
          <button
            onClick={goToNext}
            className="w-full py-5 px-8 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 group"
          >
            <span>
              {currentIdx === sections.length - 1 ? '🎉 Завершить' : 'ДАЛЕЕ'}
            </span>
            <svg 
              className="w-6 h-6 transition-transform group-hover:translate-x-1" 
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
          
          {/* Кнопка назад (маленькая) */}
          {currentIdx > 0 && (
            <button
              onClick={goToPrev}
              className="w-full mt-3 py-3 px-6 rounded-xl bg-white border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
              </svg>
              Назад
            </button>
          )}
        </div>
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
