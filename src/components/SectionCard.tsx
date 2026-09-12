import React from 'react';
import { Section } from '../data/sections';
import { useSpeech } from '../hooks/useSpeech';

interface SectionCardProps {
  section: Section;
  illustration: React.ReactNode;
  isActive: boolean;
}

export const SectionCard: React.FC<SectionCardProps> = ({ section, illustration, isActive }) => {
  const { speak, stop, isSpeaking } = useSpeech();

  const handleSpeak = () => {
    if (isSpeaking) {
      stop();
    } else {
      speak(section.speechText);
    }
  };

  if (!isActive) return null;

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className={`bg-gradient-to-r ${section.color} rounded-2xl p-6 md:p-8 text-white mb-6 shadow-xl`}>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">{section.emoji}</span>
          <h2 className="text-2xl md:text-3xl font-bold">{section.title}</h2>
        </div>
        <p className="text-white/90 text-lg">{section.shortDesc}</p>
      </div>

      {/* Illustration */}
      <div className={`bg-gradient-to-br ${section.bgGradient} rounded-2xl p-6 mb-6 border border-gray-100 shadow-sm`}>
        <div className="max-w-xs mx-auto">
          {illustration}
        </div>
      </div>

      {/* Analogy */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
        <p className="text-amber-900 text-base md:text-lg leading-relaxed">{section.analogy}</p>
      </div>

      {/* Key Points */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6 shadow-sm">
        <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
          <span className="text-xl">💡</span> Ключевые моменты:
        </h3>
        <ul className="space-y-2">
          {section.keyPoints.map((point, idx) => (
            <li key={idx} className="flex items-start gap-2 text-gray-700">
              <span className="text-green-500 mt-1 flex-shrink-0">●</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Speak button */}
      <button
        onClick={handleSpeak}
        className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl ${
          isSpeaking
            ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
            : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white'
        }`}
      >
        {isSpeaking ? (
          <>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
            </svg>
            Остановить озвучку
          </>
        ) : (
          <>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
            🔊 Озвучить текст
          </>
        )}
      </button>
    </div>
  );
};
