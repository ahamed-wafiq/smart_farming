import React, { useState } from 'react';
import { Bot, Send, User, Sparkles, MessageSquare, Mic, Volume2 } from 'lucide-react';

export default function VoiceAssistant() {
  const [messages, setMessages] = useState([
    { 
      text: "Namaste! I am AgriVision, your smart agricultural assistant powered by Google Gemini. Ask me about crop diseases, weather trends, APMC mandi rates, or soil fertility.", 
      isBot: true 
    }
  ]);
  const [input, setInput] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input;
    setMessages(prev => [...prev, { text: userText, isBot: false }]);
    setInput("");
    setIsTranslating(true);

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5007';
      const response = await fetch(`${backendUrl}/api/assistant`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: userText }),
      });

      const data = await response.json();
      
      if (data.translation) {
        setMessages(prev => [...prev, { 
          text: `[Translation]: ${data.translation}`, 
          isBot: true,
          isSystem: true 
        }]);
      }

      setTimeout(() => {
        setMessages(prev => [...prev, { 
          text: data.answer || "I could not generate an answer to that. Please check your query or backend connection.", 
          isBot: true 
        }]);
        setIsTranslating(false);
      }, 400);

    } catch (error) {
      console.error("Assistant error:", error);
      setIsTranslating(false);
      setMessages(prev => [...prev, { 
        text: "Sorry, I am having trouble connecting to the Gemini AI backend. Please verify your backend server is active.", 
        isBot: true 
      }]);
    }
  };

  const prompts = [
    "Weather update for today", 
    "Best crop for next season", 
    "Current APMC market prices", 
    "Fertilizer NPK recommendation",
    "Tomato early blight treatment"
  ];

  return (
    <div className="max-w-4xl mx-auto pb-12 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#DDF2E3] flex items-center justify-center text-[#176B3A]">
            <Bot size={22} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#24352A] font-bricolage tracking-tight">
              Multilingual Voice & Chat Copilot
            </h1>
            <p className="text-xs sm:text-sm text-[#718078]">
              Powered by Google Gemini AI with Hindi, English, and regional dialect translation.
            </p>
          </div>
        </div>

        <div className="badge-pill-green self-start sm:self-center">
          <Sparkles size={13} /> Gemini 2.5 Flash Connected
        </div>
      </div>

      {/* Suggested Prompts Pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {prompts.map((prompt, idx) => (
          <button 
            key={idx} 
            onClick={() => setInput(prompt)} 
            className="bg-white hover:bg-[#DDF2E3] border border-[#E2ECE4] text-[#24352A] hover:text-[#176B3A] px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shadow-2xs"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat Container */}
      <div className="card-panel overflow-hidden flex flex-col min-h-[520px] shadow-sm">
        
        {/* Messages Stream */}
        <div className="flex-1 p-5 sm:p-6 space-y-4 overflow-y-auto max-h-[520px] bg-[#F8FAF7]/50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex items-start gap-2.5 ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
              {msg.isBot && (
                <div className="w-8 h-8 rounded-full bg-[#DDF2E3] text-[#176B3A] flex items-center justify-center shrink-0 mt-1 shadow-2xs">
                  <Bot size={17} />
                </div>
              )}

              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.isSystem 
                  ? 'bg-[#FEF3C7] text-[#B45309] text-xs font-mono rounded-xl' 
                  : msg.isBot 
                    ? 'bg-white text-[#24352A] border border-[#E2ECE4] shadow-xs' 
                    : 'bg-[#3FAE68] text-white shadow-xs font-medium'
              }`}>
                {msg.text}
              </div>

              {!msg.isBot && (
                <div className="w-8 h-8 rounded-full bg-[#176B3A] text-white flex items-center justify-center shrink-0 mt-1 shadow-2xs">
                  <User size={16} />
                </div>
              )}
            </div>
          ))}

          {isTranslating && (
            <div className="flex items-center gap-2 text-xs text-[#718078] bg-white border border-[#E2ECE4] px-4 py-2.5 rounded-full w-fit shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#3FAE68] animate-ping"></span>
              AgriVision Gemini AI is analyzing query...
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-[#E2ECE4]">
          <div className="relative flex items-center gap-2">
            <input 
              type="text" 
              disabled={isTranslating}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything about farming, crops, weather, or mandi prices (Hindi / English)..." 
              className="w-full bg-[#F2F6F0] border border-[#E2ECE4] text-[#24352A] placeholder-[#9BA8A0] rounded-full py-3 pl-5 pr-28 text-sm focus:outline-none focus:border-[#3FAE68] focus:ring-2 focus:ring-[#3FAE68]/20 transition-all shadow-xs"
            />
            
            <button 
              onClick={handleSend} 
              disabled={isTranslating || !input.trim()}
              className="absolute right-2 btn-primary py-2 px-4 text-xs font-bold shadow-xs"
            >
              <span>Ask</span>
              <Send size={14} />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
