import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, LineChart, Bot, User, ArrowRight, Sprout, ShieldCheck, Zap } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, colorClass, delay }) => (
  <div 
    className={`group relative overflow-hidden bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-${colorClass}-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-${colorClass}-500/10 animate-in fade-in slide-in-from-bottom-8 cursor-default`}
    style={{ animationDelay: delay, animationFillMode: 'both' }}
  >
    <div className={`absolute top-0 right-0 w-32 h-32 bg-${colorClass}-500/10 rounded-full blur-3xl group-hover:bg-${colorClass}-500/20 transition-colors duration-500`}></div>
    
    <div className={`w-14 h-14 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
      <Icon className={`text-${colorClass}-400 group-hover:text-${colorClass}-300`} size={28} />
    </div>
    
    <h3 className="text-2xl font-bold text-white mb-3 tracking-tight font-bricolage">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed mb-6">
      {description}
    </p>
  </div>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 overflow-x-hidden font-sans relative selection:bg-teal-500/30">
      
      {/* Background Ambience */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-teal-500/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute top-[40%] right-[-10%] w-[40%] h-[50%] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Landing Navbar */}
      <header className="absolute top-0 w-full z-50 px-6 py-6 border-b border-white/5 bg-black/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-teal-500/20">
              AI
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight font-bricolage">AgriVision</h1>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
             <a href="#features" className="hover:text-teal-400 transition-colors">Features</a>
             <a href="#about" className="hover:text-teal-400 transition-colors">About</a>
             <a href="#api" className="hover:text-teal-400 transition-colors">Data.gov API</a>
          </div>
          <div className="flex items-center gap-4">
             <span className="text-slate-400 text-sm hidden sm:inline">v2.0 MVP</span>
             <NavLink to="/dashboard" className="px-5 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-white font-semibold transition-all backdrop-blur-sm">
               Login
             </NavLink>
          </div>
        </div>
      </header>

      <main>
        {/* Massive Hero Section */}
        <section className="relative pt-40 pb-24 md:pt-52 md:pb-32 px-6">
          <div className="max-w-5xl mx-auto text-center space-y-8 animate-in fade-in zoom-in duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-bold tracking-wide uppercase mb-4 shadow-[0_0_20px_rgba(20,184,166,0.15)]">
              <Sprout size={16} /> Intelligent Farming Ecosystem
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tighter leading-[1.1] font-bricolage drop-shadow-2xl">
              Farming Decoded <br className="hidden md:block"/>
              with <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500">Predictive AI.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Empowering farmers with state-of-the-art machine learning. Predict optimal crop yields, analyze real-time market prices, and utilize a multilingual smart assistant—all in one centralized platform.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-8">
              <NavLink to="/dashboard" className="group px-8 py-4 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-bold text-lg hover:shadow-2xl hover:shadow-teal-500/30 hover:scale-105 transition-all flex items-center gap-2 w-full sm:w-auto justify-center">
                Get Started Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </NavLink>
              <div className="px-8 py-4 rounded-xl bg-slate-800/80 border border-slate-700 font-semibold text-slate-300 w-full sm:w-auto text-center flex items-center justify-center gap-3 backdrop-blur-sm cursor-default">
                 <ShieldCheck size={20} className="text-emerald-500" /> Backed by Data.gov API
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid Explanation */}
        <section id="features" className="py-24 bg-[#0a0f1c] border-t border-white/5 relative z-10 px-6">
           <div className="max-w-7xl mx-auto">
             <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-10" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
               <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 font-bricolage tracking-tight">Our Core Features</h2>
               <p className="text-slate-400 text-lg max-w-2xl mx-auto">Discover the toolset engineered to maximize your yield, stabilize your revenue, and demystify agricultural science.</p>
             </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard 
                icon={LayoutDashboard}
                title="AI Dashboards"
                description="Live deep-learning crop predictions based on exact soil NPk conditions."
                colorClass="teal"
                delay="300ms"
              />
              <FeatureCard 
                icon={LineChart}
                title="Market Radar"
                description="Track live APMC Mandi prices universally. Compare live pricing vs MSP."
                colorClass="blue"
                delay="400ms"
              />
              <FeatureCard 
                icon={Bot}
                title="Voice Assistant"
                description="Multilingual AI-powered text and voice bot for agricultural strategy."
                colorClass="purple"
                delay="500ms"
              />
              <FeatureCard 
                icon={User}
                title="Farmer Profile"
                description="Build detailed crop season records and generate automated cost plans."
                colorClass="orange"
                delay="600ms"
              />
            </div>
           </div>
        </section>
        
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-white/5 bg-black/20 py-12 px-6 mt-12 backdrop-blur-md relative z-10">
         <div className="max-w-7xl mx-auto flex justify-between items-center opacity-50">
            <div className="text-sm font-medium">© 2026 AgriVision. Intelligent Farming.</div>
            <div className="flex gap-4 text-sm">
               <span>Privacy Policy</span>
               <span>Terms of Service</span>
            </div>
         </div>
      </footer>
    </div>
  );
}
