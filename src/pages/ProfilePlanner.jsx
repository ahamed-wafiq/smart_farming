import React from 'react';

export default function ProfilePlanner() {
  return (
    <div className="animate-in fade-in zoom-in duration-500 pb-12">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-2">Farmer Profile and Planner</h2>
        <p className="text-slate-400 text-sm">Save farmer details, generate cost-revenue plans, and review disease scan history.</p>
      </div>

      <div className="card-panel p-6 border border-slate-700/50 bg-[#0f172a]/80 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <InputGroup label="Farmer Name" placeholder="Demo Farmer" />
          <InputGroup label="Mobile" placeholder="9999999999" />
          <InputGroup label="Region" placeholder="Pune" />
          
          <InputGroup label="Farm Size (acres)" placeholder="3" />
          <SelectGroup label="Language" options={['Hindi', 'English', 'Marathi', 'Gujarati']} />
          <SelectGroup label="Current Crop" options={['Rice', 'Wheat', 'Soybean']} />
          
          <SelectGroup label="Soil Type" options={['Loamy', 'Alluvial', 'Clay', 'Sandy']} />
          <SelectGroup label="Irrigation" options={['Drip', 'Sprinkler', 'Canal']} />
        </div>

        <div className="flex flex-wrap gap-3 mb-4">
           <button className="btn-primary px-6">Save Profile</button>
           <button className="bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300 px-6 py-2 rounded-lg font-medium transition-colors">Load Profile</button>
           <button className="bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300 px-6 py-2 rounded-lg font-medium transition-colors">Generate Season Plan</button>
           <button className="bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300 px-6 py-2 rounded-lg font-medium transition-colors">Load Disease History</button>
        </div>
        
        <p className="text-sm text-slate-500">Fill profile and generate a plan.</p>
      </div>

      <div className="card-panel p-6 border border-slate-700/50 bg-[#0f172a]/80">
        <h3 className="text-lg font-bold text-white mb-4">Disease Scan History</h3>
        <p className="text-slate-400 text-sm">No records yet.</p>
      </div>
    </div>
  );
}

function InputGroup({ label, placeholder }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-300 mb-2">{label}</label>
      <input type="text" placeholder={placeholder} className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-teal-500" />
    </div>
  );
}

function SelectGroup({ label, options }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-300 mb-2">{label}</label>
      <select className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-teal-500">
        {options.map((opt, i) => <option key={i}>{opt}</option>)}
      </select>
    </div>
  );
}
