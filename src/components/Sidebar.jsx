import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ScanLine, LineChart, Bot, User, PanelLeftClose } from 'lucide-react';

const Sidebar = () => {
  const navItemClass = ({ isActive }) => 
    `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
      isActive 
        ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg shadow-teal-500/20' 
        : 'text-slate-400 hover:text-slate-200 hover:bg-[#1e293b]/50'
    }`;

  return (
    <aside className="w-[280px] h-screen fixed top-0 left-0 flex flex-col bg-[#0f172a] border-r border-slate-800/50 text-slate-300 z-50">
      <div className="flex items-center justify-between px-6 py-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-teal-500/20">
            AI
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight font-bricolage">AgriVision</h1>
        </div>
        <button className="text-slate-500 hover:text-slate-300 transition-colors">
           <PanelLeftClose size={18} />
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        <NavLink to="/" className={navItemClass}>
          <LayoutDashboard size={20} />
          <span className="text-sm">Home</span>
        </NavLink>
        <NavLink to="/dashboard" className={navItemClass}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
          <span className="text-sm">Dashboard</span>
        </NavLink>

        <NavLink to="/market-prices" className={navItemClass}>
          <LineChart size={20} />
          <span className="text-sm">Market Prices</span>
        </NavLink>
        <NavLink to="/voice-assistant" className={navItemClass}>
          <Bot size={20} />
          <span className="text-sm">Voice Assistant</span>
        </NavLink>
        <NavLink to="/profile" className={navItemClass}>
          <User size={20} />
          <span className="text-sm">Profile & Planner</span>
        </NavLink>
      </nav>

      <div className="p-6">
        <div className="inline-flex items-center gap-2 bg-[#1e293b] px-4 py-2 rounded-full border border-slate-700/50">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-xs font-medium text-slate-300">AI Engine Active</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
