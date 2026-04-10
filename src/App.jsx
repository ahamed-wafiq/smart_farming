import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import MarketPrices from './pages/MarketPrices';
import VoiceAssistant from './pages/VoiceAssistant';
import ProfilePlanner from './pages/ProfilePlanner';

const AppLayout = () => {
  return (
      <div className="min-h-screen bg-[#0f172a] text-slate-200 flex font-sans overflow-hidden">
        <Sidebar />
        <div className="ml-[280px] flex-1 flex flex-col relative h-screen">
          {/* Subtle Ambient Gradients */}
          <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none"></div>
          
          <Navbar />
          
          <main className="flex-1 overflow-y-auto p-6 relative z-10 scrollbar-hide">
             <div className="max-w-[1600px] mx-auto w-full">
                <Outlet />
             </div>
          </main>
        </div>
      </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/market-prices" element={<MarketPrices />} />
          <Route path="/voice-assistant" element={<VoiceAssistant />} />
          <Route path="/profile" element={<ProfilePlanner />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
