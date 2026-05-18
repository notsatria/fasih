import { useState, useCallback, useEffect, useRef } from 'react';

/**
 * Custom hook for Web Speech Synthesis API.
 */
export function useTextToSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);
  const synthRef = useRef(window.speechSynthesis);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = synthRef.current.getVoices();
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
      }
    };

    loadVoices();
    if (synthRef.current.onvoiceschanged !== undefined) {
      synthRef.current.onvoiceschanged = loadVoices;
    }
  }, []);

  const speak = useCallback((text, lang = 'en-US') => {
    if (!synthRef.current) return;

    // Cancel any ongoing speech
    synthRef.current.cancel();

    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Try to find a good natural English voice
    let selectedVoice = voices.find(v => v.lang === lang && (v.name.includes('Google') || v.name.includes('Natural')));
    if (!selectedVoice) {
      selectedVoice = voices.find(v => v.lang.startsWith(lang.split('-')[0]));
    }
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.lang = lang;
    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (e) => {
      console.error('Speech synthesis error', e);
      setIsSpeaking(false);
    };

    synthRef.current.speak(utterance);
  }, [voices]);

  const stop = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  }, []);

  return {
    isSpeaking,
    speak,
    stop,
    hasVoices: voices.length > 0
  };
}
