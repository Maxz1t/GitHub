import { useState, useCallback, useEffect, useRef } from 'react';

export type TTSEngine = 'browser' | 'puter';

export interface SpeechSettings {
  rate: number;       // 0.3 - 2.5
  pitch: number;      // 0.1 - 2.0 (только для browser)
  volume: number;     // 0 - 1
  voiceURI: string;   // ID голоса (для browser)
  engine: TTSEngine;  // 'browser' или 'puter'
  puterVoice: string; // ID голоса для puter
}

const DEFAULT_SETTINGS: SpeechSettings = {
  rate: 1.0,
  pitch: 1.0,
  volume: 1.0,
  voiceURI: '',
  engine: 'puter',
  puterVoice: 'openai:alloy',
};

const STORAGE_KEY = 'github-helper-speech-settings-v4';

function loadSettings(): SpeechSettings {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
    }
  } catch (e) {
    // ignore
  }
  return DEFAULT_SETTINGS;
}

function saveSettings(settings: SpeechSettings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    // ignore
  }
}

// Получить русские голоса из Web Speech API
export function useRussianVoices() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    function loadVoices() {
      const available = window.speechSynthesis.getVoices();
      const russian = available.filter(v => v.lang.startsWith('ru'));
      if (russian.length > 0) {
        setVoices(russian);
      }
    }

    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    };
  }, []);

  return voices;
}

// Проверить доступность Puter.js
function isPuterAvailable(): boolean {
  return typeof window !== 'undefined' && !!(window as any).puter?.ai?.txt2speech;
}

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [settings, setSettings] = useState<SpeechSettings>(loadSettings);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const updateSettings = useCallback((partial: Partial<SpeechSettings>) => {
    setSettings(prev => {
      const next = { ...prev, ...partial };
      saveSettings(next);
      return next;
    });
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setIsSpeaking(false);
  }, []);

  // Озвучка через Puter.js (OpenAI / AWS Polly)
  const speakWithPuter = useCallback(async (text: string) => {
    if (!isPuterAvailable()) {
      console.warn('Puter.js недоступен, переключаемся на браузерный TTS');
      speakWithBrowser(text);
      return;
    }

    try {
      setIsSpeaking(true);
      
      const voiceId = settings.puterVoice;
      let provider = 'openai';
      let voice = 'alloy';

      if (voiceId.startsWith('polly:')) {
        provider = 'polly';
        voice = voiceId.replace('polly:', '');
      } else if (voiceId.startsWith('openai:')) {
        provider = 'openai';
        voice = voiceId.replace('openai:', '');
      }

      const audio = await (window as any).puter.ai.txt2speech(text, {
        provider: provider,
        voice: voice,
        engine: 'neural',
        language: 'ru-RU',
      });

      audio.playbackRate = settings.rate;
      audio.volume = settings.volume;
      audioRef.current = audio;

      audio.onended = () => {
        setIsSpeaking(false);
        audioRef.current = null;
      };
      audio.onerror = () => {
        setIsSpeaking(false);
        audioRef.current = null;
      };

      audio.play();
    } catch (error) {
      console.error('Puter TTS error:', error);
      setIsSpeaking(false);
      // Fallback на браузер
      speakWithBrowser(text);
    }
  }, [settings]);

  // Озвучка через Web Speech API (системные голоса)
  const speakWithBrowser = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ru-RU';
    utterance.rate = settings.rate;
    utterance.pitch = settings.pitch;
    utterance.volume = settings.volume;

    if (settings.voiceURI) {
      const voices = window.speechSynthesis.getVoices();
      const selectedVoice = voices.find(v => v.voiceURI === settings.voiceURI);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [settings]);

  const speak = useCallback((text: string) => {
    stop();

    if (settings.engine === 'puter' && isPuterAvailable()) {
      speakWithPuter(text);
    } else {
      speakWithBrowser(text);
    }
  }, [settings, stop, speakWithPuter, speakWithBrowser]);

  const preview = useCallback((text: string = 'Привет! Так звучит мой голос.') => {
    speak(text);
  }, [speak]);

  return { speak, stop, isSpeaking, settings, updateSettings, preview, isPuterAvailable: isPuterAvailable() };
}
