import React from 'react';
import { Section } from '../data/sections';
import { SpeechSettings } from '../hooks/useSpeech';
import { VoiceSettings } from './VoiceSettings';

interface SectionCardProps {
  section: Section;
  illustration: React.ReactNode;
  isActive: boolean;
  isSpeaking: boolean;
  settings: SpeechSettings;
  onSpeak: (text: string) => void;
  onStop: () => void;
  onUpdateSettings: (partial: Partial<SpeechSettings>) => void;
  onPreview: (text?: string) => void;
  isPuterAvailable: boolean;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  section,
  illustration,
  isActive,
  isSpeaking,
  settings,
  onStop,
  onUpdateSettings,
  onPreview,
  isPuterAvailable,
}) => {
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

      {/* Stop button (если идёт озвучка) */}
      {isSpeaking && (
        <button
          onClick={onStop}
          className="w-full py-3 px-6 rounded-xl font-semibold text-base transition-all duration-300 flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl animate-pulse mb-4"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
          </svg>
          ⏹ Остановить озвучку
        </button>
      )}

      {/* Voice Settings Panel */}
      <VoiceSettings
        settings={settings}
        onUpdate={onUpdateSettings}
        onPreview={onPreview}
        isPuterAvailable={isPuterAvailable}
      />
    </div>
  );
};
