import React, { useState } from 'react';
import { useRussianVoices, SpeechSettings } from '../hooks/useSpeech';

interface VoiceSettingsProps {
  settings: SpeechSettings;
  onUpdate: (partial: Partial<SpeechSettings>) => void;
  onPreview: (text?: string) => void;
}

export const VoiceSettings: React.FC<VoiceSettingsProps> = ({ settings, onUpdate, onPreview }) => {
  const [isOpen, setIsOpen] = useState(false);
  const voices = useRussianVoices();

  return (
    <div className="mt-4">
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-all"
      >
        <span className="flex items-center gap-2 text-gray-700 font-medium">
          <span className="text-lg">🎛️</span>
          Настройки голоса
        </span>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Settings panel */}
      {isOpen && (
        <div className="mt-3 p-4 bg-white rounded-xl border border-gray-200 shadow-sm animate-fadeIn space-y-4">
          
          {/* Voice selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              🗣️ Голос
              <span className="ml-2 text-xs text-gray-400">
                ({voices.length} доступно)
              </span>
            </label>
            
            {voices.length > 0 ? (
              <select
                value={settings.voiceURI}
                onChange={(e) => onUpdate({ voiceURI: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {voices.map((voice) => (
                  <option key={voice.voiceURI} value={voice.voiceURI}>
                    {voice.name} ({voice.lang})
                  </option>
                ))}
              </select>
            ) : (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
                ⚠️ Русские голоса не найдены. Используйте Chrome для лучшей поддержки.
              </div>
            )}
          </div>

          {/* Rate slider */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-gray-700">
                🏃 Скорость
              </label>
              <span className="text-sm text-indigo-600 font-mono font-bold">{settings.rate.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.3"
              max="2.5"
              step="0.1"
              value={settings.rate}
              onChange={(e) => onUpdate({ rate: parseFloat(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Медленно</span>
              <span>Быстро</span>
            </div>
          </div>

          {/* Pitch slider */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-gray-700">
                🎵 Тон (высота)
              </label>
              <span className="text-sm text-indigo-600 font-mono font-bold">{settings.pitch.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              value={settings.pitch}
              onChange={(e) => onUpdate({ pitch: parseFloat(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Низкий</span>
              <span>Высокий</span>
            </div>
          </div>

          {/* Volume slider */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-gray-700">
                🔊 Громкость
              </label>
              <span className="text-sm text-indigo-600 font-mono font-bold">{Math.round(settings.volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={settings.volume}
              onChange={(e) => onUpdate({ volume: parseFloat(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Тихо</span>
              <span>Громко</span>
            </div>
          </div>

          {/* Preview & Reset */}
          <div className="flex gap-2">
            <button
              onClick={() => onPreview()}
              className="flex-1 py-2 px-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1.5"
            >
              <span>🔊</span> Прослушать
            </button>
            <button
              onClick={() => onUpdate({ rate: 1.0, pitch: 1.0, volume: 1.0, voiceURI: '' })}
              className="py-2 px-3 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1.5 border border-gray-200"
            >
              <span>↺</span> Сброс
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
