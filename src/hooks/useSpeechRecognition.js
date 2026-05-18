import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for Web Speech API (SpeechRecognition).
 * Best supported in Chrome/Edge.
 * 
 * @param {Object} options
 * @param {number} options.maxSeconds Auto-stop after this many seconds
 * @param {string} options.lang Language code, e.g., 'en-US'
 */
export function useSpeechRecognition({ maxSeconds = 120, lang = 'en-US' } = {}) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [error, setError] = useState(null);
  const [isSupported, setIsSupported] = useState(true);

  const recognitionRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = lang;

    recognition.onresult = (event) => {
      let final = '';
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }
      if (final) {
        setTranscript((prev) => prev + final + ' ');
      }
      setInterimTranscript(interim);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setError(event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      clearTimeout(timerRef.current);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      clearTimeout(timerRef.current);
    };
  }, [lang]);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) return;
    
    setError(null);
    setTranscript('');
    setInterimTranscript('');
    setIsListening(true);
    
    try {
      recognitionRef.current.start();
      
      // Auto-stop timer
      if (maxSeconds > 0) {
        timerRef.current = setTimeout(() => {
          stopListening();
        }, maxSeconds * 1000);
      }
    } catch (e) {
      console.error("Failed to start recognition:", e);
      setError("failed-to-start");
      setIsListening(false);
    }
  }, [maxSeconds]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      clearTimeout(timerRef.current);
    }
  }, [isListening]);

  return {
    isSupported,
    isListening,
    transcript: transcript + interimTranscript, // combined for display
    finalTranscript: transcript,
    interimTranscript,
    error,
    startListening,
    stopListening
  };
}
