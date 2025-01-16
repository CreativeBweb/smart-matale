import React, { useState } from "react";
import { Mic, MicOff, Send, ArrowLeft } from "lucide-react";

const response = await fetch("/.netlify/functions/server", { 
  // ... rest of your fetch options ...
});
const VoiceChatbot = ({ selectedLanguage, placeName, locationId, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState("");

  // Language codes for speech recognition
  const languageCodes = {
    en: "en-US",
    si: "si-LK",
    ta: "ta-LK",
  };

  const handleSendMessage = async (text) => {
    
    if (text.trim()) {
      const userMessage = { type: "user", text: text.trim() };
      setMessages((prev) => [...prev, userMessage]);
      setInputText("");

      try {
        console.log("Sending request to backend:", {
          message: text,
          location: locationId,
          language: selectedLanguage,
        });

        const response = await fetch("http://localhost:3001/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: text,
            location: locationId,
            language: selectedLanguage,
          }),
        });

        console.log("Response status:", response.status);

        if (!response.ok) {
          const errorData = await response.text();
          console.error("Server error response:", errorData);
          throw new Error(errorData || "Server error");
        }

        const data = await response.json();
        console.log("Server response:", data);

        if (data.error) {
          throw new Error(data.error);
        }

        const botResponse = {
          type: "bot",
          text: data.response,
        };

        setMessages((prev) => [...prev, botResponse]);
        speakBotResponse(botResponse.text);
      } catch (error) {
        console.error("Error details:", error);
        const errorResponse = {
          type: "bot",
          text: `Error: ${
            error.message || "Unknown error"
          }. Please try again.`,
        };
        setMessages((prev) => [...prev, errorResponse]);
        speakBotResponse(errorResponse.text);
      }
    }
  };

  const speakBotResponse = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = languageCodes[selectedLanguage];
    window.speechSynthesis.speak(utterance);
  };

  const startListening = async () => {
    setError("");

    try {
      const SpeechRecognition =
        window.webkitSpeechRecognition || window.SpeechRecognition;

      if (!SpeechRecognition) {
        setError(
          "Speech recognition is not supported. Please use Chrome.",
        );
        return;
      }

      const recognition = new SpeechRecognition();

      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = languageCodes[selectedLanguage] || "en-US";

      recognition.onstart = () => {
        console.log("Speech recognition started");
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const current = event.resultIndex;
        const transcriptText = event.results[current][0].transcript;
        console.log("Transcript:", transcriptText);
        setInputText(transcriptText);

        if (event.results[current].isFinal) {
          handleSendMessage(transcriptText);
        }
      };

      recognition.onerror = (event) => {
        console.error("Recognition error:", event.error);
        setError(`Error: ${event.error}`);
        setIsListening(false);
      };

      recognition.onend = () => {
        console.log("Speech recognition ended");
        setIsListening(false);
      };

      await recognition.start();
    } catch (err) {
      console.error("Speech recognition error:", err);
      setError(`Failed to start speech recognition: ${err.message}`);
      setIsListening(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-md mx-auto bg-white h-screen flex flex-col">
        {/* Header */}
        <div className="bg-blue-500 p-4 text-white">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-1 hover:bg-blue-600 rounded-full transition"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-xl font-semibold">{placeName}</h1>
              <p className="text-sm text-blue-100">
                Hi! Welcome to Smart Matale assistant center. Ask me anything.
              </p>
            </div>
          </div>
          {error && <p className="text-sm text-red-200 mt-1">{error}</p>}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.type === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input area */}
        <div className="border-t p-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={isListening ? () => setIsListening(false) : startListening}
              className={`p-2 rounded-full ${
                isListening ? "bg-red-500" : "bg-gray-200"
              }`}
            >
              {isListening ? (
                <MicOff className="w-6 h-6 text-white" />
              ) : (
                <Mic className="w-6 h-6 text-gray-600" />
              )}
            </button>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={() => handleSendMessage(inputText)}
              className="p-2 bg-blue-500 text-white rounded-full"
            >
              <Send className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceChatbot;