import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, LineChart, Bot, User, ArrowRight, Sprout, ShieldCheck, Zap, ScanLine, CloudSun } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, badge }) => (
  <div className="card-panel p-6 sm:p-8 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="w-14 h-14 rounded-2xl bg-[#DDF2E3] flex items-center justify-center text-[#176B3A] group-hover:scale-110 transition-transform duration-300 shadow-2xs">
          <Icon size={26} />
        </div>
        {badge && (
          <span className="badge-pill-green text-[11px]">
            {badge}
          </span>
        )}
      </div>
      
      <h3 className="text-xl font-bold text-[#24352A] mb-2.5 font-bricolage tracking-tight group-hover:text-[#176B3A] transition-colors">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-[#718078] leading-relaxed">
        {description}
      </p>
    </div>

    <div className="mt-6 pt-4 border-t border-[#E2ECE4] flex items-center gap-1.5 text-xs font-bold text-[#176B3A] group-hover:gap-2.5 transition-all">
      <span>Explore feature</span>
      <ArrowRight size={14} />
    </div>
  </div>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F2F6F0] text-[#24352A] font-sans selection:bg-[#3FAE68]/20">
      
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-[#F2F6F0]/90 backdrop-blur-md px-6 py-4 border-b border-[#E2ECE4]/70">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#3FAE68] flex items-center justify-center text-white shadow-xs">
              <Sprout size={20} />
            </div>
            <div>
              <span className="text-xl font-bold text-[#24352A] tracking-tight font-bricolage">AgriVision</span>
              <span className="hidden sm:inline-block ml-2 text-xs font-bold text-[#718078]">KrishiMitra</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#718078]">
            <a href="#features" className="hover:text-[#176B3A] transition-colors">Platform Features</a>
            <a href="#about" className="hover:text-[#176B3A] transition-colors">Agronomy AI</a>
            <NavLink to="/weather" className="hover:text-[#176B3A] transition-colors">Weather</NavLink>
            <NavLink to="/market-prices" className="hover:text-[#176B3A] transition-colors">Mandi Rates</NavLink>
          </div>

          <div className="flex items-center gap-3">
            <NavLink 
              to="/dashboard" 
              className="btn-primary text-xs sm:text-sm py-2 px-5 shadow-xs"
            >
              Open Dashboard <ArrowRight size={15} />
            </NavLink>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="pt-16 pb-20 md:pt-24 md:pb-28 px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-[#DDF2E3] text-[#176B3A] px-4 py-1.5 rounded-full text-xs font-bold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#3FAE68] animate-pulse"></span>
              Next-Generation Agronomic Intelligence
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#24352A] tracking-tight leading-[1.15] font-bricolage">
              Farming Decoded <br className="hidden sm:block"/>
              with <span className="text-[#176B3A]">Predictive AI.</span>
            </h1>
            
            <p className="text-base sm:text-lg text-[#718078] max-w-2xl mx-auto leading-relaxed">
              Empowering farmers with state-of-the-art machine learning. Predict optimal crop yields, diagnose plant diseases via computer vision, analyze real-time market prices, and consult a multilingual voice assistant.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
              <NavLink 
                to="/dashboard" 
                className="btn-primary text-sm sm:text-base py-3 px-8 shadow-sm w-full sm:w-auto"
              >
                Launch Smart Farm Dashboard <ArrowRight size={18} />
              </NavLink>

              <NavLink 
                to="/disease" 
                className="btn-secondary text-sm sm:text-base py-3 px-6 w-full sm:w-auto"
              >
                <ScanLine size={18} className="text-[#3FAE68]" /> Scan Plant Leaf
              </NavLink>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-[#718078] font-semibold">
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-[#3FAE68]" /> Integrated with Data.gov.in
              </div>
              <div className="flex items-center gap-1.5">
                <Zap size={16} className="text-[#3FAE68]" /> 38-Class Leaf Pathogen Model
              </div>
              <div className="flex items-center gap-1.5">
                <CloudSun size={16} className="text-[#3FAE68]" /> Live OpenWeather IoT Sync
              </div>
            </div>

          </div>
        </section>

        {/* Dashboard Preview Showcase Card */}
        <section className="px-6 pb-20 max-w-6xl mx-auto">
          <div className="rounded-3xl overflow-hidden border border-[#E2ECE4] shadow-[0_12px_40px_rgba(36,53,42,0.08)] bg-white p-2">
            <div className="bg-[#F2F6F0] rounded-2xl p-4 sm:p-6 border border-[#E2ECE4]/60">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E2ECE4]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#EF4444]"></span>
                  <span className="w-3 h-3 rounded-full bg-[#F59E0B]"></span>
                  <span className="w-3 h-3 rounded-full bg-[#10B981]"></span>
                  <span className="text-xs font-bold text-[#718078] ml-2">AgriVision Unified Dashboard</span>
                </div>
                <span className="badge-pill-green text-[11px]">Live Sensor Stream</span>
              </div>
              
              {/* Preview Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="h-44 rounded-2xl relative overflow-hidden group">
                  <img 
                    src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=600&q=80" 
                    alt="Wheat field preview" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 p-4 flex flex-col justify-between text-white">
                    <span className="text-xs font-bold bg-white/20 backdrop-blur-xs px-2.5 py-0.5 rounded-full w-fit">Wheat Sector A</span>
                    <div className="font-bold text-sm font-bricolage">Moisture: 68% • Soil pH: 6.8</div>
                  </div>
                </div>

                <div className="card-panel p-4 flex flex-col justify-between">
                  <div className="text-xs font-bold text-[#718078]">Auto-Irrigation Copilot</div>
                  <div className="text-lg font-bold text-[#176B3A] my-2">Delay Irrigation & Monitor for 24h</div>
                  <div className="text-xs text-[#718078]">Rain expected in 48h. Saves 2,982 L/acre.</div>
                </div>

                <div className="card-panel p-4 flex flex-col justify-between">
                  <div className="text-xs font-bold text-[#718078]">Deep Learning Recommendation</div>
                  <div className="text-xl font-bold text-[#24352A] my-1 font-bricolage">Wheat (PBW 550)</div>
                  <div className="badge-pill-green w-fit text-[11px]">96% Soil Compatibility</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Features Grid */}
        <section id="features" className="py-20 bg-white border-t border-[#E2ECE4] px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#24352A] mb-3 font-bricolage tracking-tight">
                Engineered for Modern Agriculture
              </h2>
              <p className="text-xs sm:text-sm text-[#718078] max-w-xl mx-auto">
                Comprehensive data tooling designed to maximize farm yield, stabilize market returns, and simplify agro-science.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard 
                icon={LayoutDashboard}
                title="AI Farm Dashboard"
                description="Live deep-learning crop predictions based on exact soil NPK levels and micro-climates."
                badge="Random Forest ML"
              />
              <FeatureCard 
                icon={ScanLine}
                title="Leaf Disease Scanner"
                description="Detect 38 plant foliage diseases instantly using deep neural computer vision."
                badge="TensorFlow Vision"
              />
              <FeatureCard 
                icon={LineChart}
                title="APMC Mandi Radar"
                description="Track live mandi modal prices universally across 20+ Indian states with MSP comparisons."
                badge="Data.gov.in Live"
              />
              <FeatureCard 
                icon={Bot}
                title="Voice & Chat Copilot"
                description="Multilingual agronomy bot powered by Google Gemini supporting Hindi & English queries."
                badge="Gemini 2.5 Flash"
              />
            </div>
          </div>
        </section>
        
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E2ECE4] bg-[#F2F6F0] py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#718078]">
          <div className="flex items-center gap-2 font-medium">
            <span className="font-bold text-[#24352A]">© 2026 AgriVision (KrishiMitra)</span>
            <span>• Intelligent Precision Agriculture</span>
          </div>
          <div className="flex gap-4 font-semibold">
            <NavLink to="/dashboard" className="hover:text-[#176B3A]">Dashboard</NavLink>
            <NavLink to="/disease" className="hover:text-[#176B3A]">Disease Scanner</NavLink>
            <NavLink to="/market-prices" className="hover:text-[#176B3A]">Market Radar</NavLink>
            <NavLink to="/settings" className="hover:text-[#176B3A]">Settings</NavLink>
          </div>
        </div>
      </footer>

    </div>
  );
}
