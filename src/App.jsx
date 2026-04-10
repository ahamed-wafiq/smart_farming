import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import DiseaseDetection from './pages/DiseaseDetection';
import MarketPrices from './pages/MarketPrices';
import VoiceAssistant from './pages/VoiceAssistant';
import ProfilePlanner from './pages/ProfilePlanner';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[var(--color-bg-dark)] text-slate-200 flex font-sans overflow-hidden">
        <Sidebar />
        <div className="ml-[280px] flex-1 flex flex-col relative h-screen">
          {/* Subtle Ambient Gradients */}
          <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#06b6d4]/10 rounded-full blur-[140px] pointer-events-none"></div>
          
          <Navbar />
          
          <main className="flex-1 overflow-y-auto p-6 relative z-10 scrollbar-hide">
             <div className="max-w-[1600px] mx-auto w-full">
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/disease-detection" element={<DiseaseDetection />} />
                  <Route path="/market-prices" element={<MarketPrices />} />
                  <Route path="/voice-assistant" element={<VoiceAssistant />} />
                  <Route path="/profile" element={<ProfilePlanner />} />
                </Routes>
             </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
