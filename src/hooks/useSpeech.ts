import { useState, useCallback, useEffect, useRef } from 'react';

export interface SpeechSettings {
  rate: number;       // 0.3 - 2.5
  pitch: number;      // 0.1 - 2.0
  volume: number;     // 0 - 1
  voiceURI: string;   // ID голоса
}

const DEFAULT_SETTINGS: SpeechSettings = {
  rate: 1.0,
  pitch: 1.0,
  volume: 1.0,
  voiceURI: '',
};

const STORAGE_KEY = 'github-helper-speech-settings-v3';

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

// Получить русские голоса из Web Speech API (Google)
export function useRussianVoices() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    function loadVoices() {
      const available = window.speechSynthesis.getVoices();
      // Только русские голоса
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

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [settings, setSettings] = useState<SpeechSettings>(loadSettings);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const updateSettings = useCallback((partial: Partial<SpeechSettings>) => {
    setSettings(prev => {
      const next = { ...prev, ...partial };
      saveSettings(next);
      return next;
    });
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  const speak = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) return;

    stop();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ru-RU';
    utterance.rate = settings.rate;
    utterance.pitch = settings.pitch;
    utterance.volume = settings.volume;

    // Apply selected voice if specified
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
  }, [settings, stop]);

  const preview = useCallback((text: string = 'Привет! Так звучит мой голос.') => {
    speak(text);
  }, [speak]);

  return { speak, stop, isSpeaking, settings, updateSettings, preview };
}
