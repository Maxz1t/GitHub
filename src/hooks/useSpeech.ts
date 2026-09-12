import { useState, useCallback, useEffect, useRef } from 'react';

export interface SpeechSettings {
  rate: number;       // 0.3 - 2.5
  pitch: number;      // 0.1 - 2.0 (только для Web Speech API)
  volume: number;     // 0 - 1
  engine: 'puter' | 'browser'; // puter = Puter.js (качественный), browser = Web Speech API
  voiceId: string;    // ID голоса
}

const DEFAULT_SETTINGS: SpeechSettings = {
  rate: 1.0,
  pitch: 1.0,
  volume: 1.0,
  engine: 'puter',
  voiceId: 'openai:alloy',
};

const STORAGE_KEY = 'github-helper-speech-settings-v2';

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

// Русские голоса для Puter.js (AWS Polly + OpenAI)
export const PUTER_VOICES = [
  { id: 'openai:alloy', name: 'Алой (нейросеть)', provider: 'OpenAI', lang: 'ru' },
  { id: 'openai:echo', name: 'Эхо (нейросеть)', provider: 'OpenAI', lang: 'ru' },
  { id: 'openai:fable', name: 'Фейбл (нейросеть)', provider: 'OpenAI', lang: 'ru' },
  { id: 'openai:onyx', name: 'Оникс (мужской)', provider: 'OpenAI', lang: 'ru' },
  { id: 'openai:nova', name: 'Нова (женский)', provider: 'OpenAI', lang: 'ru' },
  { id: 'openai:shimmer', name: 'Шиммер (мягкий)', provider: 'OpenAI', lang: 'ru' },
  { id: 'polly:Tatyana', name: 'Татьяна (AWS)', provider: 'AWS Polly', lang: 'ru-RU' },
  { id: 'polly:Maxim', name: 'Максим (AWS)', provider: 'AWS Polly', lang: 'ru-RU' },
];

// Получить русские голоса из Web Speech API
export function useBrowserVoices() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    function loadVoices() {
      const available = window.speechSynthesis.getVoices();
      // Только русские голоса
      const russian = available.filter(v => v.lang.startsWith('ru'));
      if (russian.length > 0) {
        setVoices(russian);
      } else if (available.length > 0) {
        // Если русских нет, берём все
        setVoices(available);
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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const updateSettings = useCallback((partial: Partial<SpeechSettings>) => {
    setSettings(prev => {
      const next = { ...prev, ...partial };
      saveSettings(next);
      return next;
    });
  }, []);

  const stop = useCallback(() => {
    // Stop Puter audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    // Stop Web Speech API
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  const speak = useCallback(async (text: string) => {
    stop();

    if (settings.engine === 'puter' && typeof window !== 'undefined' && (window as any).puter?.ai?.txt2speech) {
      // Puter.js TTS
      try {
        setIsSpeaking(true);
        const voiceId = settings.voiceId;
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
        // Fallback to browser
        speakWithBrowser(text);
      }
    } else {
      // Browser Web Speech API
      speakWithBrowser(text);
    }
  }, [settings, stop]);

  const speakWithBrowser = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ru-RU';
    utterance.rate = settings.rate;
    utterance.pitch = settings.pitch;
    utterance.volume = settings.volume;

    // Apply selected voice if browser engine
    if (settings.engine === 'browser' && settings.voiceId) {
      const voices = window.speechSynthesis.getVoices();
      const selectedVoice = voices.find(v => v.voiceURI === settings.voiceId || v.name === settings.voiceId);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
    } else {
      // Find Russian voice
      const voices = window.speechSynthesis.getVoices();
      const ruVoice = voices.find(v => v.lang.startsWith('ru'));
      if (ruVoice) {
        utterance.voice = ruVoice;
      }
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [settings]);

  const preview = useCallback((text: string = 'Привет! Так звучит мой голос.') => {
    speak(text);
  }, [speak]);

  return { speak, stop, isSpeaking, settings, updateSettings, preview };
}
