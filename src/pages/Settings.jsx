import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Settings as SettingsIcon, 
  Bell, 
  User, 
  Globe, 
  Smartphone, 
  MapPin, 
  Zap, 
  Mail, 
  MessageSquare,
  CheckCircle2,
  Save
} from 'lucide-react';

const Settings = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('Profile & Farm');
  
  const [autoIrrigate, setAutoIrrigate] = useState(false);
  const [aiYieldAlerts, setAiYieldAlerts] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [pushAlerts, setPushAlerts] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const tabs = [
    { name: 'Profile & Farm', icon: User },
    { name: 'AI Preferences', icon: Zap },
    { name: 'Notifications', icon: Bell },
    { name: 'Mobile Alerts', icon: Smartphone },
    { name: 'Language & Region', icon: Globe },
  ];

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto pb-12 animate-in fade-in duration-300">
      
      {/* Header */}
      <header className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#24352A] font-bricolage tracking-tight mb-1">
            System Settings & Preferences
          </h1>
          <p className="text-xs sm:text-sm text-[#718078]">
            Configure farm telemetry, AI decision thresholds, alert routing, and multi-language localization.
          </p>
        </div>

        {saveSuccess && (
          <div className="badge-pill-green animate-in fade-in duration-200">
            <CheckCircle2 size={14} /> Settings Saved
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Sidebar Nav (4 cols) */}
        <div className="md:col-span-4 card-panel p-3 space-y-1 h-fit">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.name;
            return (
              <button 
                key={tab.name} 
                onClick={() => setActiveTab(tab.name)}
                className={`w-full text-left px-4 py-3 rounded-2xl font-medium text-xs sm:text-sm transition-all flex items-center gap-3 ${
                  isActive 
                    ? 'bg-[#3FAE68] text-white shadow-sm font-semibold' 
                    : 'text-[#718078] hover:text-[#24352A] hover:bg-[#F2F6F0]'
                }`}
              >
                <Icon size={17} />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area (8 cols) */}
        <div className="md:col-span-8">
          
          {/* PROFILE & FARM */}
          {activeTab === 'Profile & Farm' && (
            <div className="card-panel p-6 animate-in fade-in duration-200">
              <h3 className="text-base font-bold text-[#24352A] font-bricolage flex items-center gap-2 mb-6 pb-4 border-b border-[#E2ECE4]">
                <User className="text-[#3FAE68]" size={18} />
                Farm Demographics & Spatial Profile
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#718078] uppercase mb-1.5">Farm Name</label>
                    <input 
                      type="text" 
                      defaultValue="TerraScan Agro Research Farm" 
                      className="w-full bg-[#F2F6F0] border border-[#E2ECE4] rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#3FAE68] text-[#24352A]" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#718078] uppercase mb-1.5">Owner / Agronomist Name</label>
                    <input 
                      type="text" 
                      defaultValue="Jack Martell" 
                      className="w-full bg-[#F2F6F0] border border-[#E2ECE4] rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#3FAE68] text-[#24352A]" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#718078] uppercase mb-1.5">Primary Farm Location</label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3FAE68]" />
                    <input 
                      type="text" 
                      defaultValue="Pune, Maharashtra, India" 
                      className="w-full bg-[#F2F6F0] border border-[#E2ECE4] rounded-xl pl-9 pr-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#3FAE68] text-[#24352A]" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#718078] uppercase mb-1.5">Land Area (Acres)</label>
                    <input 
                      type="number" 
                      defaultValue={12} 
                      className="w-full bg-[#F2F6F0] border border-[#E2ECE4] rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#3FAE68] text-[#24352A]" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#718078] uppercase mb-1.5">Monitored Crop Season</label>
                    <select className="w-full bg-[#F2F6F0] border border-[#E2ECE4] rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#3FAE68] text-[#24352A] cursor-pointer">
                      <option>Wheat (PBW 550)</option>
                      <option>Basmati Rice</option>
                      <option>Soybean (JS 335)</option>
                      <option>Cotton</option>
                      <option>Sugarcane</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 mt-2 border-t border-[#E2ECE4]">
                  <button onClick={handleSave} className="btn-primary text-xs sm:text-sm">
                    <Save size={15} /> Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* AI PREFERENCES */}
          {activeTab === 'AI Preferences' && (
            <div className="card-panel p-6 animate-in fade-in duration-200">
              <h3 className="text-base font-bold text-[#24352A] font-bricolage flex items-center gap-2 mb-6 pb-4 border-b border-[#E2ECE4]">
                <Zap className="text-[#3FAE68]" size={18} />
                Edge AI & Rule-Based Automation
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#F2F6F0] rounded-2xl border border-[#E2ECE4]">
                  <div>
                    <h4 className="text-[#24352A] font-bold text-sm mb-0.5">Smart Irrigation Automation</h4>
                    <p className="text-xs text-[#718078] max-w-sm">Allow the Auto-Irrigation Copilot to automatically regulate solenoid valves based on rain probability.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={autoIrrigate} 
                      onChange={() => setAutoIrrigate(!autoIrrigate)} 
                    />
                    <div className="w-11 h-6 bg-[#D4E2D7] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3FAE68]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#F2F6F0] rounded-2xl border border-[#E2ECE4]">
                  <div>
                    <h4 className="text-[#24352A] font-bold text-sm mb-0.5">Deep Learning Yield Trajectory Check</h4>
                    <p className="text-xs text-[#718078] max-w-sm">Run neural Random Forest models automatically each week to re-estimate final harvest output.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={aiYieldAlerts} 
                      onChange={() => setAiYieldAlerts(!aiYieldAlerts)} 
                    />
                    <div className="w-11 h-6 bg-[#D4E2D7] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3FAE68]"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* NOTIFICATIONS */}
          {activeTab === 'Notifications' && (
            <div className="card-panel p-6 animate-in fade-in duration-200">
              <h3 className="text-base font-bold text-[#24352A] font-bricolage flex items-center gap-2 mb-6 pb-4 border-b border-[#E2ECE4]">
                <Bell className="text-[#3FAE68]" size={18} />
                Real-Time Anomaly Routing
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-[#F2F6F0] rounded-2xl border border-[#E2ECE4]">
                  <div className="w-10 h-10 rounded-full bg-[#DDF2E3] text-[#176B3A] flex items-center justify-center shrink-0">
                    <Mail size={18} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[#24352A] font-bold text-sm">Daily Agronomy Digest</h4>
                    <p className="text-xs text-[#718078]">Receive morning soil telemetry and weather warnings via email.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={emailAlerts} onChange={() => setEmailAlerts(!emailAlerts)} />
                    <div className="w-11 h-6 bg-[#D4E2D7] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3FAE68]"></div>
                  </label>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-[#F2F6F0] rounded-2xl border border-[#E2ECE4]">
                  <div className="w-10 h-10 rounded-full bg-[#DDF2E3] text-[#176B3A] flex items-center justify-center shrink-0">
                    <MessageSquare size={18} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[#24352A] font-bold text-sm">Critical SMS Outbreaks</h4>
                    <p className="text-xs text-[#718078]">Urgent text alerts for pest risk and sudden frost occurrences.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={smsAlerts} onChange={() => setSmsAlerts(!smsAlerts)} />
                    <div className="w-11 h-6 bg-[#D4E2D7] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3FAE68]"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* MOBILE ALERTS */}
          {activeTab === 'Mobile Alerts' && (
            <div className="card-panel p-6 animate-in fade-in duration-200">
              <h3 className="text-base font-bold text-[#24352A] font-bricolage flex items-center gap-2 mb-6 pb-4 border-b border-[#E2ECE4]">
                <Smartphone className="text-[#3FAE68]" size={18} />
                Mobile Device Integration
              </h3>
              
              <div className="bg-[#F8FAF7] border border-[#E2ECE4] rounded-2xl p-6 text-center">
                <Smartphone size={40} className="mx-auto text-[#3FAE68] mb-3" />
                <h4 className="text-[#24352A] font-bold text-base mb-1">Connect Farmer Mobile App</h4>
                <p className="text-xs text-[#718078] max-w-sm mx-auto mb-6">
                  Sync with the Android / iOS companion app to receive offline Mandi price notifications and GPS soil mapping.
                </p>
                
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button className="btn-secondary text-xs">Download Android APK</button>
                  <button className="btn-secondary text-xs">Download iOS Build</button>
                </div>
                
                <div className="mt-8 pt-5 border-t border-[#E2ECE4] flex justify-between items-center text-left">
                  <div>
                    <h5 className="text-[#24352A] text-xs font-bold">Browser Push Notifications</h5>
                    <p className="text-[11px] text-[#718078]">Instant in-app alerts on this device.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={pushAlerts} onChange={() => setPushAlerts(!pushAlerts)} />
                    <div className="w-11 h-6 bg-[#D4E2D7] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3FAE68]"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* LANGUAGE & REGION */}
          {activeTab === 'Language & Region' && (
            <div className="card-panel p-6 animate-in fade-in duration-200">
              <h3 className="text-base font-bold text-[#24352A] font-bricolage flex items-center gap-2 mb-6 pb-4 border-b border-[#E2ECE4]">
                <Globe className="text-[#3FAE68]" size={18} />
                Multi-Language Localization
              </h3>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-[#718078] uppercase mb-1.5">
                    User Interface Language (12 Indian Languages Configured)
                  </label>
                  <select 
                    value={i18n.language}
                    onChange={(e) => i18n.changeLanguage(e.target.value)}
                    className="w-full bg-[#F2F6F0] border border-[#E2ECE4] rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#3FAE68] text-[#24352A] cursor-pointer"
                  >
                    {Object.keys(i18n.options.resources || {}).map((lang) => (
                      <option key={lang} value={lang}>
                        {t(`languages.${lang}`, { defaultValue: lang.toUpperCase() })}
                      </option>
                    ))}
                  </select>
                  <p className="text-[11px] text-[#718078] mt-1.5">
                    Translations apply dynamically across dashboard navigation, weather indicators, and assistant output.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#718078] uppercase mb-1.5">Theme Appearance</label>
                  <select className="w-full bg-[#F2F6F0] border border-[#E2ECE4] rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#3FAE68] text-[#24352A] cursor-pointer">
                    <option>TerraScan Light Sage (Active)</option>
                    <option>High-Contrast Agronomy Mode</option>
                  </select>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default Settings;
