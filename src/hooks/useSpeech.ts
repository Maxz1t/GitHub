import { useState, useCallback, useEffect, useRef } from 'react';

export interface SpeechSettings {
  rate: number;     // 0.1 - 10, default 1
  pitch: number;    // 0 - 2, default 1
  volume: number;   // 0 - 1, default 1
  voiceURI: string; // selected voice URI
}

const DEFAULT_SETTINGS: SpeechSettings = {
  rate: 1.0,
  pitch: 1.0,
  volume: 1.0,
  voiceURI: '',
};

const STORAGE_KEY = 'github-helper-speech-settings';

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

export function useVoices() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    function loadVoices() {
      const available = window.speechSynthesis.getVoices();
      if (available.length > 0) {
        setVoices(available);
      }
    }

    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    };
  }, []);

  // Prefer Russian voices, then others
  const russianVoices = voices.filter(v => v.lang.startsWith('ru'));
  const otherVoices = voices.filter(v => !v.lang.startsWith('ru'));
  const sortedVoices = [...russianVoices, ...otherVoices];

  return sortedVoices;
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

  const speak = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) return;
    
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ru-RU';
    utterance.rate = settings.rate;
    utterance.pitch = settings.pitch;
    utterance.volume = settings.volume;

    // Apply selected voice
    if (settings.voiceURI) {
      const voices = window.speechSynthesis.getVoices();
      const selectedVoice = voices.find(v => v.voiceURI === settings.voiceURI);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
        utterance.lang = selectedVoice.lang;
      }
    }
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [settings]);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  // Preview voice with current settings
  const preview = useCallback((text: string = 'Привет! Так звучит мой голос.') => {
    speak(text);
  }, [speak]);

  return { speak, stop, isSpeaking, settings, updateSettings, preview };
}
