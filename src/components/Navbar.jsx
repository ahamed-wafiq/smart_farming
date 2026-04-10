import React from 'react';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const getPageInfo = () => {
    switch (location.pathname) {
      case '/dashboard':
        return {
          title: 'Farm Intelligence Console',
          subtitle: 'One place for field health, crop planning, and income decisions.'
        };
      case '/disease-detection':
        return {
          title: 'Plant Health Scan',
          subtitle: 'Capture a leaf image and get treatment recommendations in seconds.'
        };
      case '/market-prices':
        return {
          title: 'Market Price Radar',
          subtitle: 'Compare MSP and mandi prices to decide the right sell timing.'
        };
      case '/voice-assistant':
        return {
          title: 'Farmer Voice Copilot',
          subtitle: 'Ask for weather, fertilizer, crop, and disease help in plain language.'
        };
      case '/profile':
        return {
          title: 'Farmer Profile and Season Planner',
          subtitle: 'Save farmer details, generate crop economics, and review scan history.'
        };
      default:
        return {
          title: 'AgriVision Panel',
          subtitle: 'Manage your farming activities and insights.'
        };
    }
  };

  const { title, subtitle } = getPageInfo();

  return (
    <div className="px-6 pt-6 pb-2 relative z-10 w-full max-w-[1600px] mx-auto">
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-slate-800 to-teal-900/40 border border-slate-700/50 shadow-2xl p-8">
        {/* Decorative subtle background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-[80px] pointer-events-none mix-blend-screen"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-32 h-32 bg-cyan-500/10 rounded-full blur-[60px] pointer-events-none mix-blend-screen"></div>

        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2">
            <div className="text-[10px] font-bold tracking-widest text-teal-400 uppercase">
              AGRIVISION MVP
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight font-bricolage">
              {title}
            </h1>
            <p className="text-slate-300 text-sm md:text-base max-w-2xl">
              {subtitle}
            </p>
          </div>

          <div className="flex flex-col items-end gap-3 w-full md:w-auto">
             <div className="text-xs text-slate-400 font-medium whitespace-nowrap">
                Logged in: <span className="text-slate-300">Demo Farmer (9999999999)</span>
             </div>
             <div className="flex items-center gap-3">
               <button className="px-4 py-1.5 text-xs font-semibold bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-600 rounded-lg transition-colors shadow-sm">
                 Light mode
               </button>
               <button className="px-4 py-1.5 text-xs font-semibold bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-600 rounded-lg transition-colors shadow-sm">
                 Logout
               </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
