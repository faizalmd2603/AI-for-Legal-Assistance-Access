/**
 * In-browser Text-to-Speech Accessibility Service
 * Uses HTML5 Web Speech API (speechSynthesis) to narrate plain English or vernacular translations
 */

export interface SpeechState {
  isPlaying: boolean;
  isPaused: boolean;
  currentText: string;
}

type SpeechCallback = (state: SpeechState) => void;

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private listeners: Set<SpeechCallback> = new Set();
  private state: SpeechState = {
    isPlaying: false,
    isPaused: false,
    currentText: ''
  };

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public subscribe(callback: SpeechCallback): () => void {
    this.listeners.add(callback);
    callback(this.state);
    return () => this.listeners.delete(callback);
  }

  private notify() {
    this.listeners.forEach((cb) => cb(this.state));
  }

  public speak(text: string, langCode: string = 'en', rate: number = 1.0) {
    if (!this.synth) {
      console.warn('Speech synthesis is not supported on this device/browser.');
      return;
    }

    this.stop();

    if (!text || text.trim() === '') return;

    const utterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance = utterance;

    // Map short codes to standard BCP 47 locale codes
    const langMap: Record<string, string> = {
      en: 'en-US',
      hi: 'hi-IN',
      es: 'es-ES',
      ta: 'ta-IN'
    };

    utterance.lang = langMap[langCode] || langCode;
    utterance.rate = Math.max(0.7, Math.min(1.5, rate));

    utterance.onstart = () => {
      this.state = { isPlaying: true, isPaused: false, currentText: text };
      this.notify();
    };

    utterance.onend = () => {
      this.state = { isPlaying: false, isPaused: false, currentText: '' };
      this.notify();
    };

    utterance.onerror = (e) => {
      console.warn('TTS playback error:', e);
      this.state = { isPlaying: false, isPaused: false, currentText: '' };
      this.notify();
    };

    this.synth.speak(utterance);
  }

  public pause() {
    if (this.synth && this.state.isPlaying && !this.state.isPaused) {
      this.synth.pause();
      this.state = { ...this.state, isPaused: true };
      this.notify();
    }
  }

  public resume() {
    if (this.synth && this.state.isPaused) {
      this.synth.resume();
      this.state = { ...this.state, isPaused: false };
      this.notify();
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.state = { isPlaying: false, isPaused: false, currentText: '' };
      this.notify();
    }
  }

  public isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }
}

export const speechService = new SpeechService();
