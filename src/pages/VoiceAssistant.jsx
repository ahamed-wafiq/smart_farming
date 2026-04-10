import React, { useState } from 'react';

export default function VoiceAssistant() {
  const [messages, setMessages] = useState([
    { text: "Namaste! I am AgriVision, your farming assistant. How can I help today?", isBot: true }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { text: input, isBot: false }]);
    setInput("");
    
    // Mock response
    setTimeout(() => {
      setMessages(prev => [...prev, { text: "I can assist you with that! Processing your request based on current agricultural data...", isBot: true }]);
    }, 1000);
  };

  const prompts = [
    "Weather update", 
    "Best crop for next season", 
    "Current market prices", 
    "Fertilizer recommendation"
  ];

  return (
    <div className="animate-in fade-in zoom-in duration-500 pb-12">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-2">Voice Assistant</h2>
        <p className="text-slate-400 text-sm">Multilingual farmer support assistant for weather, crops, prices, and disease guidance.</p>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        {prompts.map((prompt, idx) => (
           <button key={idx} onClick={() => setInput(prompt)} className="bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300 px-4 py-2 rounded-lg text-sm transition-colors">
              {prompt}
           </button>
        ))}
      </div>

      <div className="card-panel border border-slate-700/50 bg-[#0f172a]/80 min-h-[500px] flex flex-col">
        <div className="flex-1 p-6 space-y-4 overflow-y-auto">
           {messages.map((msg, idx) => (
             <div key={idx} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
               <div className={`max-w-[80%] rounded-xl px-5 py-3 text-sm ${msg.isBot ? 'bg-slate-800/80 text-slate-300' : 'bg-teal-600/90 text-white'}`}>
                  {msg.text}
               </div>
             </div>
           ))}
        </div>
        
        <div className="p-4 border-t border-slate-700/50 bg-slate-900/50">
           <div className="relative flex items-center">
             <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Hello farmer! Ask me about weather, crops, prices, or diseases." 
                className="w-full bg-[#1e293b] border border-slate-700 text-slate-200 rounded-lg py-3 pl-4 pr-24 focus:outline-none focus:border-teal-500"
             />
             <button onClick={handleSend} className="absolute right-2 top-1/2 -translate-y-1/2 btn-primary py-1.5 px-4 text-sm font-semibold rounded-md">
               Ask
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}
