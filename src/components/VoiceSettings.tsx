import React, { useState } from 'react';
import { useBrowserVoices, PUTER_VOICES, SpeechSettings } from '../hooks/useSpeech';

interface VoiceSettingsProps {
  settings: SpeechSettings;
  onUpdate: (partial: Partial<SpeechSettings>) => void;
  onPreview: (text?: string) => void;
}

export const VoiceSettings: React.FC<VoiceSettingsProps> = ({ settings, onUpdate, onPreview }) => {
  const [isOpen, setIsOpen] = useState(false);
  const browserVoices = useBrowserVoices();

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
          <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
            {settings.engine === 'puter' ? '🧠 Нейросеть' : '🖥️ Браузер'}
          </span>
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
          
          {/* Engine selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🎙️ Движок озвучки
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onUpdate({ engine: 'puter', voiceId: 'openai:alloy' })}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all border-2 ${
                  settings.engine === 'puter'
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                🧠 Нейросеть
                <span className="block text-xs opacity-70 mt-0.5">OpenAI / AWS Polly</span>
              </button>
              <button
                onClick={() => onUpdate({ engine: 'browser', voiceId: '' })}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all border-2 ${
                  settings.engine === 'browser'
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                🖥️ Браузер
                <span className="block text-xs opacity-70 mt-0.5">Системные голоса</span>
              </button>
            </div>
          </div>

          {/* Voice selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              🗣️ Голос
              <span className="ml-2 text-xs text-gray-400">
                {settings.engine === 'puter' ? `(${PUTER_VOICES.length} нейроголосов)` : `(${browserVoices.length} системных)`}
              </span>
            </label>
            <select
              value={settings.voiceId}
              onChange={(e) => onUpdate({ voiceId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {settings.engine === 'puter' ? (
                <>
                  <optgroup label="🧠 Нейросетевые (OpenAI)">
                    {PUTER_VOICES.filter(v => v.provider === 'OpenAI').map((voice) => (
                      <option key={voice.id} value={voice.id}>
                        {voice.name}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="☁️ Облачные (AWS Polly)">
                    {PUTER_VOICES.filter(v => v.provider === 'AWS Polly').map((voice) => (
                      <option key={voice.id} value={voice.id}>
                        {voice.name}
                      </option>
                    ))}
                  </optgroup>
                </>
              ) : (
                <>
                  {browserVoices.length > 0 ? (
                    browserVoices.map((voice) => (
                      <option key={voice.voiceURI} value={voice.voiceURI}>
                        {voice.name} ({voice.lang})
                      </option>
                    ))
                  ) : (
                    <option value="">Загрузка голосов...</option>
                  )}
                </>
              )}
            </select>
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

          {/* Pitch slider (only for browser) */}
          {settings.engine === 'browser' && (
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
          )}

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
              onClick={() => onUpdate({ rate: 1.0, pitch: 1.0, volume: 1.0, voiceId: settings.engine === 'puter' ? 'openai:alloy' : '' })}
              className="py-2 px-3 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1.5 border border-gray-200"
            >
              <span>↺</span> Сброс
            </button>
          </div>

          {/* Info */}
          <div className="text-xs text-gray-400 bg-gray-50 rounded-lg p-2.5 border border-gray-100">
            {settings.engine === 'puter' ? (
              <p>🧠 <strong>Нейросетевой движок</strong> — голоса от OpenAI и AWS Polly. Высокое качество, естественная речь. Работает через интернет.</p>
            ) : (
              <p>🖥️ <strong>Браузерный движок</strong> — системные голоса вашего устройства. Работает офлайн, но качество зависит от ОС.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
