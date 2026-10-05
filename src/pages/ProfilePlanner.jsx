import React, { useState } from 'react';
import { User, Calendar, Save, Download, FileSpreadsheet, Sprout, CheckCircle2, MapPin } from 'lucide-react';

export default function ProfilePlanner() {
  const [savedNotification, setSavedNotification] = useState(false);

  const handleSave = () => {
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto pb-12 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#DDF2E3] flex items-center justify-center text-[#176B3A]">
            <User size={22} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#24352A] font-bricolage tracking-tight">
              Farmer Profile & Season Planner
            </h1>
            <p className="text-xs sm:text-sm text-[#718078]">
              Manage land records, soil telemetry parameters, and generate automated seasonal cost-revenue plans.
            </p>
          </div>
        </div>

        {savedNotification && (
          <div className="badge-pill-green animate-in fade-in duration-200">
            <CheckCircle2 size={14} /> Profile Saved Successfully
          </div>
        )}
      </div>

      {/* Main Profile Form Card */}
      <div className="card-panel p-6 sm:p-8 mb-6">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E2ECE4]">
          <h2 className="text-lg font-bold text-[#24352A] font-bricolage">
            Agricultural Demographics
          </h2>
          <span className="text-xs text-[#718078]">Agronomist ID #AG-4091</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <InputGroup label="Farmer Full Name" defaultValue="Jack Martell / Raju Kisan" />
          <InputGroup label="Mobile Number" defaultValue="+91 98765 43210" />
          <InputGroup label="District / Region" defaultValue="Pune, Maharashtra" />
          
          <InputGroup label="Cultivated Land Size (Acres)" defaultValue="12 Acres" />
          <SelectGroup label="Preferred Language" options={['English', 'Hindi (हिंदी)', 'Marathi (मराठी)', 'Gujarati (ગુજરાતી)', 'Telugu (తెలుగు)']} />
          <SelectGroup label="Primary Target Crop" options={['Wheat (PBW 550)', 'Rice (Basmati)', 'Soybean (JS 335)', 'Cotton', 'Maize', 'Sugarcane']} />
          
          <SelectGroup label="Predominant Soil Type" options={['Loamy / Alluvial', 'Black Cotton Soil', 'Clay Soil', 'Sandy Loam', 'Red Soil']} />
          <SelectGroup label="Irrigation Infrastructure" options={['Drip Irrigation (Automated)', 'Center Pivot / Sprinkler', 'Canal / Flood', 'Rainfed']} />
          <InputGroup label="Expected Season Budget" defaultValue="₹ 1,50,000" />
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#E2ECE4]">
          <button onClick={handleSave} className="btn-primary text-xs sm:text-sm">
            <Save size={16} /> Save Profile
          </button>
          
          <button className="btn-secondary text-xs sm:text-sm">
            <FileSpreadsheet size={16} /> Generate Seasonal Budget Plan
          </button>

          <button className="btn-secondary text-xs sm:text-sm">
            <Download size={16} /> Export Field Record (PDF)
          </button>
        </div>
      </div>

      {/* Historical Scans and Plans Section */}
      <div className="card-panel p-6 sm:p-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-[#24352A] font-bricolage">
            Historical Sensor Telemetry & Diagnostics
          </h3>
          <span className="badge-pill-green">3 Active Seasons Logged</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E2ECE4] text-[#718078] uppercase text-[10px] font-bold">
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Sector</th>
                <th className="py-3 px-3">Primary Crop</th>
                <th className="py-3 px-3">Soil Health</th>
                <th className="py-3 px-3">Diagnostic Status</th>
                <th className="py-3 px-3 text-right">Report</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2ECE4]/70">
              <tr className="hover:bg-[#F2F6F0]/50 transition-colors">
                <td className="py-3.5 px-3 font-semibold text-[#24352A]">29 Sep 2026</td>
                <td className="py-3.5 px-3">Zone A (Wheat)</td>
                <td className="py-3.5 px-3">Wheat (PBW 550)</td>
                <td className="py-3.5 px-3"><span className="text-[#176B3A] font-bold">Optimal (94%)</span></td>
                <td className="py-3.5 px-3"><span className="badge-pill-green">Completed</span></td>
                <td className="py-3.5 px-3 text-right font-bold text-[#3FAE68] cursor-pointer hover:underline">Download</td>
              </tr>
              <tr className="hover:bg-[#F2F6F0]/50 transition-colors">
                <td className="py-3.5 px-3 font-semibold text-[#24352A]">14 Sep 2026</td>
                <td className="py-3.5 px-3">Zone B (Soybean)</td>
                <td className="py-3.5 px-3">Soybean (JS 335)</td>
                <td className="py-3.5 px-3"><span className="text-[#176B3A] font-bold">Moderate (88%)</span></td>
                <td className="py-3.5 px-3"><span className="badge-pill-green">Completed</span></td>
                <td className="py-3.5 px-3 text-right font-bold text-[#3FAE68] cursor-pointer hover:underline">Download</td>
              </tr>
              <tr className="hover:bg-[#F2F6F0]/50 transition-colors">
                <td className="py-3.5 px-3 font-semibold text-[#24352A]">01 Aug 2026</td>
                <td className="py-3.5 px-3">Zone C (Rice)</td>
                <td className="py-3.5 px-3">Basmati Rice</td>
                <td className="py-3.5 px-3"><span className="text-[#B45309] font-bold">Attention (76%)</span></td>
                <td className="py-3.5 px-3"><span className="bg-[#FEF3C7] text-[#B45309] px-2.5 py-0.5 rounded-full font-semibold">Treated</span></td>
                <td className="py-3.5 px-3 text-right font-bold text-[#3FAE68] cursor-pointer hover:underline">Download</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

function InputGroup({ label, defaultValue }) {
  return (
    <div>
      <label className="block text-xs font-bold text-[#718078] uppercase mb-1.5">{label}</label>
      <input 
        type="text" 
        defaultValue={defaultValue} 
        className="w-full bg-[#F2F6F0] border border-[#E2ECE4] text-[#24352A] text-xs font-semibold rounded-xl py-2.5 px-3.5 focus:outline-none focus:border-[#3FAE68] transition-colors" 
      />
    </div>
  );
}

function SelectGroup({ label, options }) {
  return (
    <div>
      <label className="block text-xs font-bold text-[#718078] uppercase mb-1.5">{label}</label>
      <select className="w-full bg-[#F2F6F0] border border-[#E2ECE4] text-[#24352A] text-xs font-semibold rounded-xl py-2.5 px-3.5 focus:outline-none focus:border-[#3FAE68] transition-colors cursor-pointer">
        {options.map((opt, i) => <option key={i}>{opt}</option>)}
      </select>
    </div>
  );
}
