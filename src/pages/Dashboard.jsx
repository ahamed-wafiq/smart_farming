import React, { useState, useEffect } from 'react';
import { 
  CloudRain, 
  Wind, 
  Droplets, 
  Leaf, 
  Activity, 
  Users, 
  AlertCircle, 
  Droplet, 
  Sprout, 
  Wheat, 
  Sliders, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Maximize2,
  Filter,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';

export default function Dashboard() {
  const [waterStress, setWaterStress] = useState(42);
  const [rainProb, setRainProb] = useState(33);
  const [mlData, setMlData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [growthTimeframe, setGrowthTimeframe] = useState('3d');

  // Default parameters matching the UI's soil inputs
  const [soilData, setSoilData] = useState({
    city: "Pune",
    N: 42,
    P: 28,
    K: 55,
    ph: 6.8
  });

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        setLoading(true);
        const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5007";
        const response = await fetch(`${backendUrl}/api/predict`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(soilData)
        });
        const data = await response.json();
        setMlData(data);
      } catch (error) {
        console.error("Failed to fetch ML Prediction:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrediction();
  }, [soilData]);

  // Fertilizer Efficiency Dual-Line Chart Data (matching reference image)
  const fertilizerData = [
    { month: 'Mar', fertA: 6.8, fertB: 6.0 },
    { month: 'Apr', fertA: 7.2, fertB: 6.5 },
    { month: 'May', fertA: 8.5, fertB: 7.5 },
    { month: 'Jun', fertA: 9.8, fertB: 8.4 }, // Peak around Jun
    { month: 'Jul', fertA: 8.2, fertB: 7.6 },
    { month: 'Aug', fertA: 7.8, fertB: 7.2 },
    { month: 'Sep', fertA: 7.5, fertB: 6.8 },
    { month: 'Oct', fertA: 7.2, fertB: 6.4 },
  ];

  // Growth rate pill bars
  const growthBars = [
    { height: '48%', color: 'bg-[#3FAE68]' },
    { height: '32%', color: 'bg-[#A7E4BA]' },
    { height: '88%', color: 'bg-[#176B3A]' },
    { height: '62%', color: 'bg-[#3FAE68]' },
    { height: '72%', color: 'bg-[#A7E4BA]' },
    { height: '42%', color: 'bg-[#3FAE68]' },
  ];

  const irrigationDecision = 
    waterStress > 70 && rainProb < 40 
      ? "Activate Irrigation (High Stress)" 
      : rainProb > 60 
        ? "Postpone Irrigation (Rain Expected)" 
        : "Delay Irrigation & Monitor for 24h";

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: TOP MONITORING GRID (MATCHING REFERENCE IMAGE)
         ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT / CENTER: Large Wheat Field Monitoring Card (8 Cols) */}
        <div className="lg:col-span-8 rounded-[28px] overflow-hidden relative shadow-[0_8px_30px_rgba(36,53,42,0.08)] min-h-[460px] flex flex-col justify-between group">
          {/* Real Agricultural Background Image */}
          <img 
            src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1400&q=80" 
            alt="Wheat Field Monitoring" 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {/* Subtle natural dark-green gradient overlay for perfect readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/60 pointer-events-none"></div>

          {/* Card Top Header */}
          <div className="relative z-10 p-6 sm:p-8 flex items-start justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-bricolage tracking-tight drop-shadow-md">
                Wheat Field Monitoring
              </h2>
              <p className="text-white/80 text-xs sm:text-sm font-medium mt-1">
                12 ha • {soilData.city} Smart Sector • Live IoT Stream
              </p>
              
              {/* Pills below title */}
              <div className="flex flex-wrap items-center gap-2 mt-3.5">
                <span className="bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/20 shadow-xs">
                  📏 15cm
                </span>
                <span className="bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/20 shadow-xs">
                  ☁️ 800 ppm
                </span>
                <span className="bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/20 shadow-xs">
                  🌡️ {loading ? "26" : Math.round(mlData?.weather?.temperature || 26)}°C
                </span>
              </div>
            </div>

            {/* Live Indicator Pill */}
            <div className="bg-[#EF4444] text-white px-3.5 py-1 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              live
            </div>
          </div>

          {/* Center Target Scanning Radar Overlay (Matching Reference Image) */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center p-4">
            <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full border border-white/30 flex items-center justify-center">
              {/* Radar crosshairs */}
              <div className="absolute w-full h-[1px] bg-white/20"></div>
              <div className="absolute h-full w-[1px] bg-white/20"></div>
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border border-white/40 animate-ping opacity-25"></div>
              
              {/* Target Data Nodes on circumference */}
              {/* Top-Right: Growth */}
              <div className="absolute -top-3 -right-6 sm:-right-8 bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md">
                <span className="w-2 h-2 rounded-full bg-[#3FAE68]"></span>
                Growth: 56%
              </div>

              {/* Left: Moisture */}
              <div className="absolute left-[-20px] sm:left-[-35px] top-1/2 -translate-y-1/2 bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md">
                <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
                Moisture: {loading ? "68%" : `${Math.round(mlData?.weather?.humidity || 68)}%`}
              </div>

              {/* Right: Soil pH */}
              <div className="absolute right-[-15px] sm:right-[-25px] top-2/3 bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md">
                <span className="w-2 h-2 rounded-full bg-[#F59E0B]"></span>
                Soil pH: {soilData.ph}
              </div>
            </div>

            {/* Scanning bracket label */}
            <div className="mt-4 flex items-center gap-2 text-white/90 text-sm font-semibold tracking-wider font-mono">
              <span className="text-[#3FAE68] text-lg font-bold">[</span>
              Scanning...
              <span className="text-[#3FAE68] text-lg font-bold">]</span>
            </div>
          </div>

          {/* Card Bottom status note */}
          <div className="relative z-10 px-6 sm:px-8 py-4 bg-black/30 backdrop-blur-xs flex items-center justify-between text-xs text-white/80">
            <span>High-resolution optical crop sensor</span>
            <span className="font-semibold text-[#A7E4BA]">Zone 4 • All Clear</span>
          </div>
        </div>

        {/* RIGHT COLUMN: 3 Clean Analytical Cards (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Card 1: Growth rate */}
          <div className="card-panel p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-[#24352A] text-base font-bricolage">
                Growth rate
              </h3>
              <button className="text-[#718078] hover:text-[#24352A] p-1 rounded-lg">
                <Filter size={16} />
              </button>
            </div>

            {/* Pill Bar Chart representation */}
            <div className="py-2">
              <div className="h-28 flex items-end justify-between px-4 border-b border-dashed border-[#E2ECE4] pb-2">
                {growthBars.map((bar, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 h-full justify-end">
                    <div 
                      className={`w-3.5 sm:w-4 ${bar.color} rounded-full transition-all duration-500`}
                      style={{ height: bar.height }}
                    ></div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-[#718078] px-2 pt-1 font-medium">
                <span>8k</span>
                <span>6k</span>
                <span>4k</span>
                <span>2k</span>
                <span>0</span>
              </div>
            </div>

            {/* Timeframe pill selector (24h, 1d, 3d, 1w, 3w, 1m) */}
            <div className="flex items-center justify-between gap-1 pt-3 border-t border-[#E2ECE4] mt-2">
              {['24h', '1d', '3d', '1w', '3w', '1m'].map((tf) => (
                <button
                  key={tf}
                  onClick={() => setGrowthTimeframe(tf)}
                  className={`text-xs px-2.5 py-1 rounded-full font-semibold transition-all ${
                    growthTimeframe === tf 
                      ? 'bg-[#3FAE68] text-white shadow-xs' 
                      : 'text-[#718078] hover:text-[#24352A] hover:bg-[#F2F6F0]'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* Card 2: AI Recommendations */}
          <div className="card-panel p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-[#24352A] text-base font-bricolage">
                AI Recommendations
              </h3>
              <span className="w-2 h-2 rounded-full bg-[#3FAE68] animate-pulse"></span>
            </div>

            {/* Stacked curved green pills with subtle arrows */}
            <div className="space-y-2.5">
              <div className="bg-[#DDF2E3]/70 hover:bg-[#DDF2E3] text-[#176B3A] p-3 rounded-2xl text-xs font-semibold flex items-center justify-between gap-2 transition-colors cursor-pointer group">
                <span className="truncate">Possible pest activity detected near zone C2</span>
                <ArrowRight size={14} className="shrink-0 group-hover:translate-x-1 transition-transform" />
              </div>

              <div className="bg-[#DDF2E3] hover:bg-[#CBEBD4] text-[#176B3A] p-3 rounded-2xl text-xs font-semibold flex items-center justify-between gap-2 transition-colors cursor-pointer group">
                <span className="truncate">Nitrogen levels low in section B3 - apply fertilizer soon</span>
                <ArrowRight size={14} className="shrink-0 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Card 3: Fertilizer Efficiency Comparison */}
          <div className="card-panel p-5">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-[#24352A] text-sm sm:text-base font-bricolage">
                Fertilizer Efficiency Comparison
              </h3>
            </div>

            <div className="relative h-28 w-full mt-2">
              {/* Peak indicator badge */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 bg-[#24352A] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                Average 57%
              </div>

              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <LineChart data={fertilizerData} margin={{ top: 12, right: 4, left: 4, bottom: 0 }}>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#FFFFFF', 
                      borderRadius: '12px', 
                      border: '1px solid #E2ECE4', 
                      fontSize: '12px', 
                      color: '#24352A' 
                    }} 
                  />
                  <Line type="monotone" dataKey="fertA" stroke="#176B3A" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="fertB" stroke="#3FAE68" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Months and Legend */}
            <div className="flex items-center justify-between text-[10px] text-[#718078] pt-2 border-t border-[#E2ECE4] mt-1 font-medium">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#176B3A]"></span> Fertilizer A
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#3FAE68]"></span> Fertilizer B
                </span>
              </div>
              <span>Mar - Oct</span>
            </div>
          </div>

        </div>
      </div>


      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: FOUR OPERATIONAL CARDS (MATCHING REFERENCE BOTTOM ROW)
         ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Card 1: Field scanning */}
        <div className="card-panel overflow-hidden relative rounded-2xl group cursor-pointer hover:shadow-md transition-all">
          <div className="h-32 sm:h-36 relative overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80" 
              alt="Field scanning" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div className="absolute top-3 right-3 bg-[#DDF2E3] text-[#176B3A] text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3FAE68]"></span>
              completed
            </div>
            <div className="absolute bottom-2.5 left-3 text-white text-xs sm:text-sm font-bold font-bricolage">
              Field scanning
            </div>
          </div>
        </div>

        {/* Card 2: Smart seeding */}
        <div className="card-panel overflow-hidden relative rounded-2xl group cursor-pointer hover:shadow-md transition-all">
          <div className="h-32 sm:h-36 relative overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=600&q=80" 
              alt="Smart seeding" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div className="absolute top-3 right-3 bg-[#DDF2E3] text-[#176B3A] text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3FAE68]"></span>
              completed
            </div>
            <div className="absolute bottom-2.5 left-3 text-white text-xs sm:text-sm font-bold font-bricolage">
              Smart seeding
            </div>
          </div>
        </div>

        {/* Card 3: Crop monitoring */}
        <div className="card-panel overflow-hidden relative rounded-2xl group cursor-pointer hover:shadow-md transition-all">
          <div className="h-32 sm:h-36 relative overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=600&q=80" 
              alt="Crop monitoring" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div className="absolute top-3 right-3 bg-[#FEF3C7] text-[#B45309] text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"></span>
              in progress
            </div>
            <div className="absolute bottom-2.5 left-3 text-white text-xs sm:text-sm font-bold font-bricolage">
              Crop monitoring
            </div>
          </div>
        </div>

        {/* Card 4: Targeted treatment */}
        <div className="card-panel overflow-hidden relative rounded-2xl group cursor-pointer hover:shadow-md transition-all">
          <div className="h-32 sm:h-36 relative overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80" 
              alt="Targeted treatment" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div className="absolute top-3 right-3 bg-[#E0E7FF] text-[#3730A3] text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6366F1]"></span>
              to do
            </div>
            <div className="absolute bottom-2.5 left-3 text-white text-xs sm:text-sm font-bold font-bricolage">
              Targeted treatment
            </div>
          </div>
        </div>
      </div>


      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: REAL-TIME CONTROLS (WEATHER, COPILOT, SOIL, KPIS)
         ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          icon={<Sprout size={18} className="text-[#176B3A]" />} 
          bg="bg-[#DDF2E3]" 
          value="2" 
          label="Season Plans" 
          trend="+12% vs last year" 
        />
        <StatCard 
          icon={<Activity size={18} className="text-[#2563EB]" />} 
          bg="bg-[#DBEAFE]" 
          value="14" 
          label="Scans Logged" 
          trend="+28% this month" 
        />
        <StatCard 
          icon={<AlertCircle size={18} className="text-[#3FAE68]" />} 
          bg="bg-[#DDF2E3]" 
          value="0" 
          label="Severe Alerts" 
          trend="Field optimal" 
        />
        <StatCard 
          icon={<Users size={18} className="text-[#D97706]" />} 
          bg="bg-[#FEF3C7]" 
          value="18.4K" 
          label="Farmers Helped" 
          trend="+340 joined" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Weather and Auto-Irrigation Copilot */}
        <div className="space-y-6">
          
          {/* Weather Card */}
          <div className="card-panel p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">⛅</span>
                <div>
                  <h3 className="font-bold text-[#24352A] text-lg font-bricolage">Live Weather Intelligence</h3>
                  <p className="text-xs text-[#718078]">Connected to OpenWeatherMap</p>
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-1">
                <select 
                  value={soilData.city}
                  onChange={(e) => setSoilData({ ...soilData, city: e.target.value })}
                  className="bg-[#F2F6F0] border border-[#E2ECE4] text-[#24352A] text-xs font-semibold rounded-full px-3.5 py-1.5 outline-none focus:border-[#3FAE68] cursor-pointer hover:bg-[#EAF2E8] transition-colors shadow-xs"
                >
                  <option value="Pune">Pune, MH</option>
                  <option value="Mumbai">Mumbai, MH</option>
                  <option value="Delhi">Delhi, DL</option>
                  <option value="Bangalore">Bangalore, KA</option>
                  <option value="Chennai">Chennai, TN</option>
                  <option value="Hyderabad">Hyderabad, TS</option>
                  <option value="Ahmedabad">Ahmedabad, GJ</option>
                  <option value="Kolkata">Kolkata, WB</option>
                  <option value="Jaipur">Jaipur, RJ</option>
                </select>
                <span className="text-[10px] font-semibold text-[#176B3A]">
                  {mlData ? "● Live ML Sync Active" : "Connecting..."}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-6 pb-6 border-b border-[#E2ECE4]">
              <div className="flex items-center gap-4">
                <div className="text-5xl font-extrabold text-[#24352A] tracking-tighter font-bricolage">
                  {loading ? "--" : Math.round(mlData?.weather?.temperature || 27)}°
                </div>
                <div>
                  <div className="text-sm font-bold text-[#24352A]">Partly Cloudy</div>
                  <div className="text-xs text-[#718078]">High 32° • Low 22°</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-xs">
                <div className="text-[#718078]">Humidity</div>
                <div className="text-right text-[#24352A] font-bold">
                  {loading ? "--" : Math.round(mlData?.weather?.humidity || 68)}%
                </div>
                <div className="text-[#718078]">Rainfall</div>
                <div className="text-right text-[#24352A] font-bold">
                  {loading ? "--" : mlData?.weather?.rainfall?.toFixed(1) || 12} mm
                </div>
                <div className="text-[#718078]">Wind Speed</div>
                <div className="text-right text-[#24352A] font-bold">14 km/h</div>
                <div className="text-[#718078]">Air Quality</div>
                <div className="text-right text-[#3FAE68] font-bold">Good (42)</div>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-2 text-center text-xs">
              <ForecastDay day="Mon" state="Sunny" temp="33°" />
              <ForecastDay day="Tue" state="Cloudy" temp="30°" />
              <ForecastDay day="Wed" state="Rain" temp="28°" />
              <ForecastDay day="Thu" state="Cloudy" temp="31°" />
              <ForecastDay day="Fri" state="Sunny" temp="34°" />
            </div>
          </div>

          {/* Auto-Irrigation Copilot */}
          <div className="card-panel p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-[#24352A] text-lg font-bricolage">
                Auto-Irrigation Copilot
              </h3>
              <span className="badge-pill-green">Automated</span>
            </div>
            <p className="text-xs text-[#718078] mb-6">
              Simulates precise watering schedules by correlating soil moisture tension and predicted rainfall.
            </p>
            
            <div className="space-y-5 mb-6">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-[#24352A]">Water Stress Index: <strong className="text-[#176B3A]">{waterStress}</strong></span>
                  <span className="text-[#718078]">{waterStress > 70 ? 'High' : waterStress > 35 ? 'Moderate' : 'Low'}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={waterStress} 
                  onChange={(e) => setWaterStress(e.target.value)} 
                  className="w-full h-2 bg-[#E2ECE4] rounded-lg appearance-none cursor-pointer accent-[#3FAE68]" 
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-[#24352A]">Rain Probability (%): <strong className="text-[#176B3A]">{rainProb}%</strong></span>
                  <span className="text-[#718078]">{rainProb > 50 ? 'Rain Likely' : 'Dry Forecast'}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={rainProb} 
                  onChange={(e) => setRainProb(e.target.value)} 
                  className="w-full h-2 bg-[#E2ECE4] rounded-lg appearance-none cursor-pointer accent-[#176B3A]" 
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#E2ECE4]">
              <div className="p-3.5 bg-[#F2F6F0] rounded-2xl mb-4 border border-[#E2ECE4]/80">
                <div className="text-xs text-[#718078] uppercase font-bold tracking-wider mb-1">
                  Automated Recommendation
                </div>
                <div className="text-sm font-bold text-[#176B3A]">
                  {irrigationDecision}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2.5 bg-white border border-[#E2ECE4] rounded-xl">
                  <div className="text-[#718078] text-[10px]">Water Plan</div>
                  <div className="font-bold text-[#24352A] mt-0.5">2,982 L/acre</div>
                </div>
                <div className="p-2.5 bg-white border border-[#E2ECE4] rounded-xl">
                  <div className="text-[#718078] text-[10px]">Fuel Saved</div>
                  <div className="font-bold text-[#3FAE68] mt-0.5">7%</div>
                </div>
                <div className="p-2.5 bg-white border border-[#E2ECE4] rounded-xl">
                  <div className="text-[#718078] text-[10px]">Expected Lift</div>
                  <div className="font-bold text-[#176B3A] mt-0.5">+6% Yield</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Soil Analysis and Field Parameters */}
        <div className="space-y-6">
          
          {/* Soil Analysis Card */}
          <div className="card-panel p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">🧪</span>
                <h3 className="font-bold text-[#24352A] text-lg font-bricolage">Soil Chemical Profile</h3>
              </div>
              <span className="text-xs text-[#718078] font-medium">Zone A1 Sensor Grid</span>
            </div>
            
            <p className="text-xs text-[#718078] mb-6">
              Real-time NPK ratio and acidity calibrated against recommended ranges for optimal yield.
            </p>

            <div className="space-y-5">
              <SoilBar label="Nitrogen (N)" value="42 kg/ha" percent={60} target="Target: 50-70" color="bg-[#3FAE68]" />
              <SoilBar label="Phosphorus (P)" value="28 kg/ha" percent={40} target="Target: 25-45" color="bg-[#176B3A]" />
              <SoilBar label="Potassium (K)" value="55 kg/ha" percent={75} target="Target: 50-80" color="bg-[#3FAE68]" />
              <SoilBar label="Soil pH Level" value="6.8" percent={68} target="Neutral (6.5 - 7.5)" color="bg-[#176B3A]" />
            </div>

            <div className="mt-6 pt-5 border-t border-[#E2ECE4] grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#F2F6F0] rounded-xl">
                <span className="text-[#718078] block text-[11px]">Organic Matter</span>
                <strong className="text-[#24352A] font-bold text-sm">3.4% (Optimal)</strong>
              </div>
              <div className="p-3 bg-[#F2F6F0] rounded-xl">
                <span className="text-[#718078] block text-[11px]">Electrical Cond.</span>
                <strong className="text-[#24352A] font-bold text-sm">0.82 dS/m</strong>
              </div>
            </div>
          </div>

          {/* Quick Farm Actions & IoT Status */}
          <div className="card-panel p-6">
            <h3 className="font-bold text-[#24352A] text-lg font-bricolage mb-3">
              Automated Agronomy Copilot
            </h3>
            <p className="text-xs text-[#718078] mb-4">
              Real-time edge computing checks soil moisture every 15 minutes.
            </p>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3.5 bg-[#F2F6F0] rounded-2xl border border-[#E2ECE4]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#DDF2E3] flex items-center justify-center text-[#176B3A]">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#24352A]">Irrigation Valves</div>
                    <div className="text-[10px] text-[#718078]">Connected to Solenoid #4</div>
                  </div>
                </div>
                <span className="badge-pill-green">Ready</span>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-[#F2F6F0] rounded-2xl border border-[#E2ECE4]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#DDF2E3] flex items-center justify-center text-[#176B3A]">
                    <Clock size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#24352A]">Fertigation Cycle</div>
                    <div className="text-[10px] text-[#718078]">Scheduled for tomorrow 06:00 AM</div>
                  </div>
                </div>
                <span className="bg-[#FEF3C7] text-[#B45309] text-xs font-semibold px-3 py-1 rounded-full">Scheduled</span>
              </div>
            </div>
          </div>

        </div>

      </div>


      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: AI CROP RECOMMENDATIONS (LIVE PYTHON ML ENGINE)
         ───────────────────────────────────────────────────────────── */}
      <div className="pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-[#24352A] font-bricolage flex items-center gap-2">
              <Sprout className="text-[#3FAE68]" size={22} />
              AI Crop Recommendations (Live Random Forest Model)
            </h3>
            <p className="text-xs text-[#718078] mt-0.5">
              Predicted by backend deep learning models based on current soil NPK, acidity, and live {soilData.city} weather.
            </p>
          </div>
          
          <div className="mt-2 sm:mt-0 flex items-center gap-2">
            <span className="badge-pill-green">
              {mlData ? "Synced with Python ML" : "Loading predictions..."}
            </span>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-[#718078] text-sm card-panel border-dashed border-[#C3DFC9] flex flex-col items-center justify-center gap-3">
            <Sprout className="w-9 h-9 text-[#3FAE68] animate-bounce" />
            <div className="font-semibold text-[#24352A]">Evaluating ML Crop Classification...</div>
            <div className="text-xs text-[#718078]">Processing N={soilData.N}, P={soilData.P}, K={soilData.K}, pH={soilData.ph}</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {mlData?.result?.predictions && mlData.result.predictions.length > 0 ? (
              mlData.result.predictions.slice(0, 4).map((p, idx) => (
                <CropCard 
                  key={idx}
                  crop={p.crop.charAt(0).toUpperCase() + p.crop.slice(1)} 
                  variant={idx === 0 ? "Top AI Match" : idx === 1 ? "Great Alternative" : idx === 2 ? "Viable Option" : "Secondary Option"} 
                  score={p.score} 
                  season="Current Kharif" 
                  water={p.irrigation || "Optimal"} 
                  soil="Current Profile" 
                  yieldAmt="Optimal Yield" 
                />
              ))
            ) : (
              <>
                {mlData?.result?.crop && (
                  <CropCard 
                    crop={mlData.result.crop.charAt(0).toUpperCase() + mlData.result.crop.slice(1)} 
                    variant="Top AI Match" 
                    score="96" 
                    season="Current Kharif" 
                    water={mlData.result.irrigation || "Optimal"} 
                    soil="Current Profile" 
                    yieldAmt="Optimal Yield" 
                  />
                )}
                <CropCard crop="Wheat" variant="Wheat (PBW 550)" score="94" season="Rabi Season" water="Medium" soil="Alluvial / Loamy" yieldAmt="4.8 tons/hectare" />
                <CropCard crop="Rice" variant="Rice (Basmati)" score="91" season="Kharif Season" water="High" soil="Clay / Alluvial" yieldAmt="4.2 tons/hectare" />
                <CropCard crop="Soybean" variant="Soybean (JS 335)" score="88" season="Kharif Season" water="Medium" soil="Black / Loamy" yieldAmt="2.8 tons/hectare" />
              </>
            )}
          </div>
        )}
      </div>

    </div>
  );
}

function StatCard({ icon, bg, value, label, trend }) {
  return (
    <div className="card-panel p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center shrink-0`}>
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-2xl font-extrabold text-[#24352A] font-bricolage tracking-tight leading-none mb-1">
          {value}
        </div>
        <div className="text-xs font-semibold text-[#718078] truncate">{label}</div>
        <div className="text-[11px] text-[#3FAE68] font-bold mt-1">{trend}</div>
      </div>
    </div>
  );
}

function ForecastDay({ day, state, temp }) {
  return (
    <div className="bg-[#F2F6F0] rounded-2xl py-3 px-1 flex flex-col items-center justify-center gap-1 border border-[#E2ECE4]/70">
      <div className="text-[#718078] font-medium text-[11px]">{day}</div>
      <div className="text-[#24352A] font-bold text-xs">{state}</div>
      <div className="font-extrabold text-[#176B3A] text-sm">{temp}</div>
    </div>
  );
}

function SoilBar({ label, value, percent, target, color }) {
  return (
    <div>
      <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
        <span className="text-[#24352A]">{label}</span>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[#718078]">{target}</span>
          <span className="text-[#176B3A] font-bold">{value}</span>
        </div>
      </div>
      <div className="w-full h-2 bg-[#E2ECE4] rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-500`} style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
}

function CropCard({ crop, variant, score, season, water, soil, yieldAmt }) {
  return (
    <div className="card-panel p-5 hover:border-[#3FAE68] transition-all group cursor-pointer relative overflow-hidden flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-3">
          <div>
            <h4 className="font-bold text-lg text-[#24352A] font-bricolage group-hover:text-[#176B3A] transition-colors">
              {crop}
            </h4>
            <div className="text-xs font-semibold text-[#3FAE68]">{variant}</div>
          </div>
          <div className="w-11 h-11 rounded-full bg-[#DDF2E3] border border-[#3FAE68]/30 flex items-center justify-center text-xs font-extrabold text-[#176B3A] shadow-xs">
            {score}%
          </div>
        </div>
        
        <div className="space-y-1.5 text-xs text-[#718078] mt-4 pt-3 border-t border-[#E2ECE4]">
          <div className="flex items-center justify-between">
            <span>🗓️ Season:</span>
            <span className="font-semibold text-[#24352A]">{season}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>💧 Water:</span>
            <span className="font-semibold text-[#24352A]">{water}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>🌍 Soil:</span>
            <span className="font-semibold text-[#24352A]">{soil}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>📦 Yield:</span>
            <span className="font-semibold text-[#176B3A]">{yieldAmt}</span>
          </div>
        </div>
      </div>

      <button className="mt-4 w-full py-2 bg-[#F2F6F0] hover:bg-[#DDF2E3] text-[#176B3A] rounded-xl text-xs font-bold transition-colors">
        View Cultivation Plan
      </button>
    </div>
  );
}
