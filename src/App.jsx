import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Link, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import MarketPrices from './pages/MarketPrices';
import DiseaseDetection from './pages/DiseaseDetection';
import VoiceAssistant from './pages/VoiceAssistant';
import ProfilePlanner from './pages/ProfilePlanner';
import Weather from './pages/Weather';
import YieldPrediction from './pages/YieldPrediction';
import Settings from './pages/Settings';
import { Search, Bell, Settings as SettingsIcon, Menu, X, Sprout } from 'lucide-react';

const AppLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#F2F6F0] text-[#24352A] flex font-sans antialiased">
      {/* Sidebar for Desktop */}
      <Sidebar mobileOpen={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} />

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-[260px] flex flex-col min-h-screen relative">
        {/* Top Header matching reference image */}
        <header className="sticky top-0 z-30 bg-[#F2F6F0]/90 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-[#E2ECE4]/60">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            {/* Mobile menu toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white border border-[#E2ECE4] text-[#24352A] hover:bg-[#EAF2E8] transition-colors"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Reference search bar: clean rounded-full pill */}
            <div className="relative w-full max-w-md hidden sm:block">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#718078]">
                <Search size={17} />
              </div>
              <input
                type="text"
                placeholder="Search farm fields, crops, mandi prices, pests..."
                className="w-full bg-white border border-[#E2ECE4] text-[#24352A] placeholder-[#9BA8A0] text-sm rounded-full pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#3FAE68] focus:ring-2 focus:ring-[#3FAE68]/20 transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Right Header: Profile, Notifications, Settings */}
          <div className="flex items-center gap-3">
            {/* Quick Status Pill */}
            <div className="hidden md:flex items-center gap-2 bg-white border border-[#E2ECE4] px-3.5 py-1.5 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#3FAE68] animate-pulse"></span>
              <span className="text-xs font-semibold text-[#176B3A]">AI Engine Active</span>
            </div>

            {/* Profile area inspired by reference: Avatar + Name + Role */}
            <Link to="/profile" className="flex items-center gap-2.5 bg-white border border-[#E2ECE4] hover:border-[#3FAE68]/50 px-2.5 py-1.5 rounded-full shadow-sm transition-all group">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80" 
                alt="Jack Martell" 
                className="w-8 h-8 rounded-full object-cover border border-[#3FAE68]/30"
              />
              <div className="text-left hidden sm:block pr-2">
                <div className="text-xs font-bold text-[#24352A] group-hover:text-[#176B3A] transition-colors leading-tight">Jack Martell</div>
                <div className="text-[10px] text-[#718078] leading-tight">Agronomist</div>
              </div>
            </Link>

            {/* Notification Bell */}
            <button className="w-10 h-10 rounded-full bg-white border border-[#E2ECE4] hover:border-[#3FAE68] text-[#718078] hover:text-[#24352A] shadow-sm flex items-center justify-center transition-colors relative">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#EF4444] rounded-full"></span>
            </button>

            {/* Settings Link */}
            <Link to="/settings" className="w-10 h-10 rounded-full bg-white border border-[#E2ECE4] hover:border-[#3FAE68] text-[#718078] hover:text-[#24352A] shadow-sm flex items-center justify-center transition-colors">
              <SettingsIcon size={18} />
            </Link>
          </div>
        </header>

        {/* Main Routed Page Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
          <Outlet />
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
          <Route path="/disease" element={<DiseaseDetection />} />
          <Route path="/market-prices" element={<MarketPrices />} />
          <Route path="/voice-assistant" element={<VoiceAssistant />} />
          <Route path="/profile" element={<ProfilePlanner />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/predictions" element={<YieldPrediction />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
