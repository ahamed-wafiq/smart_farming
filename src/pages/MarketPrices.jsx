import React, { useState } from 'react';

const mockData = [
  { crop: 'Rice (Basmati)', marketPrice: 2650, msp: 2183, trend: '+8.2%' },
  { crop: 'Wheat (PBW-550)', marketPrice: 2410, msp: 2275, trend: '+3.1%' },
  { crop: 'Soybean', marketPrice: 4320, msp: 4600, trend: '-2.4%' },
  { crop: 'Maize', marketPrice: 2180, msp: 2090, trend: '+1.5%' },
  { crop: 'Cotton (Medium)', marketPrice: 7100, msp: 6620, trend: '+5.8%' },
  { crop: 'Mustard', marketPrice: 5920, msp: 5650, trend: '+2.9%' }
];

export default function MarketPrices() {
  const [search, setSearch] = useState('');

  const filtered = mockData.filter(item => item.crop.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="animate-in fade-in zoom-in duration-500 pb-12">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-2">Market Intelligence</h2>
        <p className="text-slate-400 text-sm">Track MSP gaps, crop trends, and pick the best selling window.</p>
      </div>

      <div className="card-panel p-6 mb-6">
         <label className="block text-sm font-medium text-slate-400 mb-2">Search crop</label>
         <input 
            type="text" 
            placeholder="Type crop name" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-lg py-3 px-4 focus:outline-none focus:border-teal-500"
         />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((item, idx) => (
           <PriceCard key={idx} data={item} />
        ))}
      </div>
    </div>
  );
}

function PriceCard({ data }) {
  const diff = data.marketPrice - data.msp;
  const isPositive = diff > 0;

  return (
    <div className="card-panel p-6 flex flex-col justify-between">
       <div className="flex justify-between items-start mb-6">
          <h3 className="text-lg font-bold text-white">{data.crop}</h3>
          <div className={`px-2 py-0.5 rounded text-xs font-semibold ${data.trend.startsWith('+') ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
            {data.trend}
          </div>
       </div>

       <div className="flex justify-between items-end mb-4">
          <div>
            <div className="text-xs text-slate-400 mb-1">Market</div>
            <div className="text-xl font-bold text-white">{data.marketPrice} <span className="text-sm font-medium text-slate-400">INR/quintal</span></div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-400 mb-1">MSP</div>
            <div className="text-sm font-bold text-slate-200">{data.msp} <span className="text-xs font-medium text-slate-400">INR/quintal</span></div>
          </div>
       </div>

       <div className="text-sm text-slate-300">
          {Math.abs(diff)} INR/quintal {isPositive ? 'above' : 'below'} MSP
       </div>
    </div>
  );
}
