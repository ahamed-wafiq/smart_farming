import React, { useState, useEffect } from 'react';
import { CloudRain, Wind, Droplets, Leaf, Activity, Users, AlertCircle, Droplet, Sprout, Wheat } from 'lucide-react';

export default function Dashboard() {
  const [waterStress, setWaterStress] = useState(42);
  const [rainProb, setRainProb] = useState(33);
  const [mlData, setMlData] = useState(null);
  const [loading, setLoading] = useState(true);

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
        const response = await fetch("http://localhost:5001/api/predict", {
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

  return (
    <div className="animate-in fade-in zoom-in duration-500 space-y-6 pb-12">
      {/* Farm Dashboard Section */}
      <div className="card-panel p-6">
        <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-xl font-bold text-white">Farm Dashboard</h2>
            <p className="text-sm text-slate-400">Real-time insights for smarter farming</p>
          </div>
          <div className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2 border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Live
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={<Sprout size={18} className="text-emerald-500" />} bg="bg-emerald-500/10" value="2" label="Season Plans" trend="+12%" />
          <StatCard icon={<Activity size={18} className="text-blue-500" />} bg="bg-blue-500/10" value="0" label="Scans Logged" trend="+28%" />
          <StatCard icon={<AlertCircle size={18} className="text-rose-500" />} bg="bg-rose-500/10" value="0" label="Severe Alerts" trend="+2.1%" />
          <StatCard icon={<Users size={18} className="text-orange-500" />} bg="bg-orange-500/10" value="18.4K" label="Farmers Helped" trend="+340" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Weather Card */}
          <div className="card-panel p-6">
             <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-2">
                   <span className="text-2xl">⛅</span>
                   <h3 className="font-bold text-white">Weather</h3>
                </div>
                <div className="text-right flex flex-col items-end gap-1">
                   <select 
                       value={soilData.city}
                       onChange={(e) => setSoilData({ ...soilData, city: e.target.value })}
                       className="bg-slate-800/50 border border-slate-700 text-white text-xs font-medium rounded-lg px-2.5 py-1 outline-none focus:border-emerald-500 cursor-pointer hover:bg-slate-800 transition-colors"
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
                   <span className="text-[10px] font-medium text-emerald-500/70">{mlData ? "Live ML Sync" : "Connecting..."}</span>
                </div>
             </div>
             
             <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 border-b border-slate-800 pb-6">
                <div className="flex items-center gap-4">
                   <div className="text-5xl font-bold text-white tracking-tighter">
                     {loading ? "--" : Math.round(mlData?.weather?.temperature || 32)}°
                   </div>
                   <div className="text-sm text-slate-400">Partly<br/>Cloudy</div>
                </div>
                <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                   <div className="text-slate-400">Humidity</div>
                   <div className="text-right text-white font-medium">{loading ? "--" : Math.round(mlData?.weather?.humidity || 68)}%</div>
                   <div className="text-slate-400">Rainfall</div>
                   <div className="text-right text-white font-medium">{loading ? "--" : mlData?.weather?.rainfall?.toFixed(1) || 12}mm</div>
                   <div className="text-slate-400">Wind</div>
                   <div className="text-right text-white font-medium">14 km/h</div>
                </div>
             </div>

             <div className="grid grid-cols-5 gap-2 text-center text-sm">
                <ForecastDay day="Mon" state="Sunny" temp="33°" />
                <ForecastDay day="Tue" state="Cloudy" temp="30°" />
                <ForecastDay day="Wed" state="Rain" temp="28°" />
                <ForecastDay day="Thu" state="Cloudy" temp="31°" />
                <ForecastDay day="Fri" state="Sunny" temp="34°" />
             </div>
          </div>

          {/* Auto-Irrigation Copilot */}
          <div className="card-panel p-6">
             <h3 className="font-bold text-white mb-4">Auto-Irrigation Copilot</h3>
             <p className="text-sm text-slate-400 mb-6">WOW Feature: Simulates irrigation actions using weather and soil stress.</p>
             
             <div className="space-y-6 mb-6">
                <div>
                   <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-slate-300">Water stress Index: {waterStress}</span>
                   </div>
                   <input type="range" min="0" max="100" value={waterStress} onChange={(e) => setWaterStress(e.target.value)} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />
                </div>
                <div>
                   <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-slate-300">Rain probability (%): {rainProb}</span>
                   </div>
                   <input type="range" min="0" max="100" value={rainProb} onChange={(e) => setRainProb(e.target.value)} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-300" />
                </div>
             </div>

             <div className="pt-4 border-t border-slate-800">
                <div className="text-white font-bold mb-3">
                   Decision: {
                     waterStress > 70 && rainProb < 40 ? "Activate Irrigation (High Stress)" :
                     rainProb > 60 ? "Postpone Irrigation (Rain Expected)" :
                     "Delay Irrigation and monitor for 24h"
                   }
                </div>
                <div className="grid grid-cols-3 text-xs text-slate-400">
                   <div>Water Plan: <span className="text-slate-200">2982 L/acre</span></div>
                   <div>Fuel Saved: <span className="text-slate-200">7%</span></div>
                   <div>Expected Yield Lift: <span className="text-slate-200">+6%</span></div>
                </div>
             </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Soil Analysis */}
          <div className="card-panel p-6">
             <div className="flex items-center gap-2 mb-6">
                <span className="text-xl">🧪</span>
                <h3 className="font-bold text-white">Soil Analysis</h3>
             </div>
             
             <div className="space-y-6">
                <SoilBar label="Nitrogen (N)" value="42 kg/ha" percent={60} color="bg-emerald-500" />
                <SoilBar label="Phosphorus (P)" value="28 kg/ha" percent={40} color="bg-blue-500" />
                <SoilBar label="Potassium (K)" value="55 kg/ha" percent={75} color="bg-indigo-500" />
                <SoilBar label="pH Level" value="6.8" percent={68} color="bg-orange-500" />
                <SoilBar label="Moisture" value="38 %" percent={38} color="bg-cyan-500" />
             </div>
          </div>
        </div>
      </div>

      {/* AI Crop Recommendations */}
      <div>
        <div className="flex items-center gap-2 mb-4 px-2">
            <span className="text-xl">🌾</span>
            <h3 className="font-bold text-white">AI Crop Recommendations (Live)</h3>
        </div>
        <p className="text-sm text-slate-400 mb-4 px-2">Live prediction fetched from backend ML model based on your soil and weather data.</p>
        
        {loading ? (
            <div className="p-8 text-center text-slate-400 text-sm animate-pulse w-full card-panel border-dashed border-slate-700">
               <Sprout className="w-8 h-8 mx-auto mb-2 text-emerald-500 animate-bounce" />
               Running Deep Learning Models...
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {mlData?.result?.predictions && mlData.result.predictions.length > 0 ? (
                   mlData.result.predictions.map((p, idx) => (
                       <CropCard 
                           key={idx}
                           crop={p.crop.charAt(0).toUpperCase() + p.crop.slice(1)} 
                           variant={idx === 0 ? "Top AI Match" : idx === 1 ? "Great Alternative" : "Viable Option"} 
                           score={p.score} 
                           season="Current" 
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
                             variant="AI Recommended Match" 
                             score="96" 
                             season="Current" 
                             water={mlData.result.irrigation || "Optimal"} 
                             soil="Current Profile" 
                             yieldAmt="Optimal" 
                         />
                     )}
                     <CropCard crop="Rice" variant="Rice (Basmati)" score="94" season="Kharif" water="High" soil="Alluvial / Clay" yieldAmt="4.2 tons/hectare" />
                     <CropCard crop="Soy" variant="Soybean" score="89" season="Kharif" water="Medium" soil="Black / Loamy" yieldAmt="2.8 tons/hectare" />
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
    <div className="bg-[#1e293b]/50 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:bg-[#1e293b] transition-colors">
      <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold text-white mb-1">{value}</div>
        <div className="text-xs text-slate-400">{label}</div>
        <div className="text-xs text-emerald-500 mt-2 font-medium">{trend}</div>
      </div>
    </div>
  );
}

function ForecastDay({ day, state, temp }) {
  return (
    <div className="bg-slate-800/50 rounded-lg py-3 flex flex-col items-center justify-center gap-1 border border-slate-800/50">
      <div className="text-slate-400">{day}</div>
      <div className="text-white font-medium">{state}</div>
      <div className="font-bold text-white">{temp}</div>
    </div>
  );
}

function SoilBar({ label, value, percent, color }) {
  return (
    <div>
       <div className="flex justify-between text-xs font-medium mb-2">
         <span className="text-slate-300">{label}</span>
         <span className="text-white">{value}</span>
       </div>
       <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
         <div className={`h-full ${color} rounded-full`} style={{ width: `${percent}%` }}></div>
       </div>
    </div>
  );
}

function CropCard({ crop, variant, score, season, water, soil, yieldAmt }) {
  return (
    <div className="card-panel p-6 hover:border-teal-500/50 transition-colors group cursor-pointer relative overflow-hidden">
       {/* bg accent */}
       <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-3xl group-hover:bg-teal-500/10 transition-colors"></div>
       
       <div className="flex justify-between items-start mb-6">
          <h4 className="font-bold text-lg text-white">{crop}</h4>
          <div className="w-10 h-10 rounded-full border-2 border-orange-500 flex items-center justify-center text-sm font-bold text-orange-400">
             {score}%
          </div>
       </div>
       
       <div className="font-bold text-slate-200 mb-4">{variant}</div>
       
       <div className="space-y-2 text-sm text-slate-400">
          <div className="flex items-center gap-2"><span className="w-4 h-4 bg-slate-800 rounded flex items-center justify-center text-[10px]">🗓️</span> {season}</div>
          <div className="flex items-center gap-2"><span className="w-4 h-4 bg-slate-800 rounded flex items-center justify-center text-[10px]">💧</span> {water}</div>
          <div className="flex items-center gap-2"><span className="w-4 h-4 bg-slate-800 rounded flex items-center justify-center text-[10px]">🌍</span> {soil}</div>
          <div className="flex items-center gap-2"><span className="w-4 h-4 bg-slate-800 rounded flex items-center justify-center text-[10px]">📦</span> {yieldAmt}</div>
       </div>
    </div>
  );
}
