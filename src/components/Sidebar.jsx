import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ScanLine, 
  LineChart, 
  Bot, 
  User, 
  CloudSun, 
  TrendingUp, 
  Settings as SettingsIcon, 
  Home as HomeIcon,
  Sprout,
  X
} from 'lucide-react';

const Sidebar = ({ mobileOpen, setMobileOpen }) => {
  const navItemClass = ({ isActive }) => 
    `flex items-center gap-3.5 px-4 py-2.5 rounded-2xl font-medium text-sm transition-all duration-200 ${
      isActive 
        ? 'bg-[#3FAE68] text-white shadow-[0_4px_14px_rgba(63,174,104,0.3)] font-semibold' 
        : 'text-[#718078] hover:text-[#24352A] hover:bg-[#F2F6F0]'
    }`;

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/disease", label: "Disease Scanner", icon: ScanLine },
    { to: "/market-prices", label: "Market Prices", icon: LineChart },
    { to: "/voice-assistant", label: "Voice Assistant", icon: Bot },
    { to: "/profile", label: "Profile & Planner", icon: User },
    { to: "/weather", label: "Weather Forecast", icon: CloudSun },
    { to: "/predictions", label: "Yield Prediction", icon: TrendingUp },
    { to: "/settings", label: "Settings", icon: SettingsIcon },
    { to: "/", label: "Home / Overview", icon: HomeIcon },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)} 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden backdrop-blur-xs"
        />
      )}

      <aside className={`
        fixed top-0 left-0 h-screen w-[260px] bg-white border-r border-[#E2ECE4] 
        flex flex-col z-50 transition-transform duration-300 ease-in-out
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Brand Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#3FAE68] flex items-center justify-center text-white shadow-sm shadow-[#3FAE68]/30">
              <Sprout size={20} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#24352A] tracking-tight leading-none font-bricolage">
                AgriVision
              </h1>
              <span className="text-[11px] font-semibold text-[#718078] tracking-wide">
                KrishiMitra AI
              </span>
            </div>
          </div>
          
          <button 
            onClick={() => setMobileOpen(false)}
            className="lg:hidden text-[#718078] hover:text-[#24352A] p-1 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Section */}
        <div className="px-4 py-2">
          <div className="text-[11px] font-bold text-[#9BA8A0] uppercase tracking-wider px-3 mb-2">
            Main Menu
          </div>
          <nav className="space-y-1.5 overflow-y-auto max-h-[calc(100vh-220px)] scrollbar-hide">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen && setMobileOpen(false)}
                  className={navItemClass}
                >
                  <Icon size={19} className="shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Farm Badge */}
        <div className="mt-auto p-4 border-t border-[#E2ECE4]/80">
          <div className="p-3.5 bg-[#F2F6F0] rounded-2xl flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#DDF2E3] flex items-center justify-center text-[#176B3A]">
              <Sprout size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-[#24352A] truncate">Smart Agro Field</div>
              <div className="text-[10px] text-[#718078] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3FAE68] animate-pulse"></span>
                Sensors Online
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
