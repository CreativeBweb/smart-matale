// src/components/TestMic.js
import React, { useState, useEffect } from 'react';

const TestMic = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');

  // Check browser compatibility immediately
  useEffect(() => {
    if (!window.webkitSpeechRecognition && !window.SpeechRecognition) {
      setError('Speech recognition is not supported in this browser. Please use Chrome.');
    }
  }, []);

  const checkMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      return true;
    } catch (err) {
      console.error('Microphone permission error:', err);
      setError('Microphone permission denied. Please allow microphone access.');
      return false;
    }
  };

  const startListening = async () => {
    setError('');
    
    // First check microphone permission
    const hasPermission = await checkMicrophonePermission();
    if (!hasPermission) return;

    try {
      // Create recognition instance
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();

      // Configure recognition
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      // Setup handlers
      recognition.onstart = () => {
        console.log('Speech recognition started');
        setIsListening(true);
        setError('Listening... Please speak');
      };

      recognition.onresult = (event) => {
        console.log('Got result:', event.results);
        const current = event.resultIndex;
        const transcriptText = event.results[current][0].transcript;
        console.log('Transcript:', transcriptText);
        setTranscript(transcriptText);
      };

      recognition.onerror = (event) => {
        console.error('Recognition error:', event.error);
        setError(`Error: ${event.error}`);
        setIsListening(false);
      };

      recognition.onend = () => {
        console.log('Speech recognition ended');
        setIsListening(false);
        setError('Stopped listening');
      };

      // Start recognition
      await recognition.start();
      console.log('Recognition started successfully');

    } catch (err) {
      console.error('Speech recognition error:', err);
      setError(`Failed to start speech recognition: ${err.message}`);
      setIsListening(false);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl mb-4 font-bold">Microphone Test</h1>
      
      {/* Status and Error Display */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">Status: {isListening ? 'Listening' : 'Not Listening'}</p>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>

      {/* Control Button */}
      <button 
        onClick={startListening}
        disabled={isListening}
        className={`mb-4 px-4 py-2 rounded ${
          isListening 
            ? 'bg-red-500 text-white' 
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        {isListening ? 'Listening...' : 'Start Test'}
      </button>

      {/* Transcript Display */}
      <div className="mt-4 p-4 border rounded bg-gray-50">
        <h2 className="font-bold mb-2">Transcript:</h2>
        <p className="break-words">{transcript || 'No transcript yet'}</p>
      </div>

      {/* Debug Info */}
      <div className="mt-4 p-4 border rounded bg-gray-100">
        <h2 className="font-bold mb-2">Debug Info:</h2>
        <p>Browser: {navigator.userAgent}</p>
        <p>Speech Recognition Available: {
          (window.webkitSpeechRecognition || window.SpeechRecognition) ? 'Yes' : 'No'
        }</p>
      </div>
    </div>
  );
};

export default TestMic;