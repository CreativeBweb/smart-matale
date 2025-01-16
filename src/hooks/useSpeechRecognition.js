// src/hooks/useSpeechRecognition.js
import { useState, useEffect } from 'react';

const useSpeechRecognition = (language = 'en-US') => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      setError('Speech recognition is not supported in this browser.');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = language;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setTranscript(transcript);
    };

    recognition.onerror = (event) => {
      setError(event.error);
      setIsListening(false);
    };

    const startListening = () => {
      setTranscript('');
      setError(null);
      recognition.start();
    };

    const stopListening = () => {
      recognition.stop();
    };

    return { isListening, transcript, error, startListening, stopListening };
  }, [language]);

  return { isListening, transcript, error };
};

export default useSpeechRecognition;