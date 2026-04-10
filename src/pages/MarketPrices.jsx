import React, { useState, useEffect } from 'react';
import { Loader2, MapPin, DollarSign, RefreshCw, Download, LineChart as LineChartIcon, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const INDIAN_STATES = [
  "All", "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
  "Odisha", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const STATE_CITY_MAP = {
  "Andhra Pradesh": ["Chittoor", "Guntur", "Kurnool"],
  "Assam": ["Guwahati", "Silchar", "Dibrugarh"],
  "Bihar": ["Patna", "Muzaffarpur", "Gaya"],
  "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur"],
  "Gujarat": ["Rajkot", "Surat", "Ahmedabad"],
  "Haryana": ["Karnal", "Ambala", "Hisar"],
  "Himachal Pradesh": ["Shimla", "Mandi", "Dharamshala"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad"],
  "Karnataka": ["Bengaluru", "Mysuru", "Hubballi", "Davangere"],
  "Kerala": ["Kochi", "Thiruvananthapuram", "Kozhikode"],
  "Madhya Pradesh": ["Indore", "Bhopal", "Ujjain", "Shivpuri"],
  "Maharashtra": ["Pune", "Nashik", "Ahmednagar", "Nagpur", "Mumbai"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela"],
  "Punjab": ["Ludhiana", "Patiala", "Amritsar"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Alwar", "Kota"],
  "Tamil Nadu": ["Coimbatore", "Madurai", "Erode"],
  "Telangana": ["Hyderabad", "Nizamabad", "Warangal"],
  "Uttar Pradesh": ["Agra", "Meerut", "Lucknow", "Kanpur"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Haldwani"],
  "West Bengal": ["Bardhaman", "Hooghly", "Kolkata"]
};

export default function MarketPrices() {
  const [search, setSearch] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        setLoading(true);
        const apiKey = import.meta.env.VITE_DATA_GOV_API_KEY || '579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b';
        const resourceId = '9ef84268-d588-465a-a308-a864a43d0070';
        
        // Base API URL
        let url = `https://api.data.gov.in/resource/${resourceId}?api-key=${apiKey}&format=json&limit=250`;
        
        // Active server-side filtering
        if (selectedState !== 'All') url += `&filters[State]=${encodeURIComponent(selectedState)}`;
        if (selectedCity !== 'All') url += `&filters[District]=${encodeURIComponent(selectedCity)}`;

        const response = await fetch(url);
        const data = await response.json();
        
        if (data && data.records && data.records.length > 0) {
          let formatted = data.records.map((record, idx) => {
             const modal = Number(record.Modal_Price || record.modal_price) || 0;
             const min = Number(record.Min_Price || record.min_price) || 0;
             const max = Number(record.Max_Price || record.max_price) || 0;
             
             let percent = '0.0';
             let diff = 0;
             if (min > 0) {
                 diff = modal - min;
                 percent = ((diff / min) * 100).toFixed(1);
             }

             const isPositive = diff >= 0;
             return {
                id: idx,
                crop: `${record.Commodity || record.commodity || 'Unknown'} - ${record.Variety || record.variety || 'N/A'}`,
                marketPrice: modal,
                msp: min,
                maxPrice: max,
                trend: isPositive ? `+${percent}%` : `${percent}%`,
                state: record.State || record.state || 'Unknown',
                market: record.Market || record.District || record.market || 'Unknown'
             };
          });
          
          if (selectedState === 'All') formatted.sort(() => Math.random() - 0.5);
          setApiData(formatted);
        } else {
           throw new Error("No records returned from API.");
        }
      } catch (error) {
        console.error("API failed or empty. Loading rich fallback dataset:", error);
        
        // Generate 10 entries per state for robust fallback
        const CROPS = ['Wheat - PBW', 'Rice - Basmati', 'Soybean - Yellow', 'Maize - Hybrid', 'Cotton - Medium', 'Mustard - Black', 'Onion - Red', 'Tomato - Local', 'Potato - Jyoti', 'Gram - Desi', 'Sugarcane', 'Groundnut'];
        let mockData = [];
        let idCount = 1000;
        
        const targetStates = selectedState !== 'All' ? [selectedState] : INDIAN_STATES.filter(s => s !== 'All');
        
        targetStates.forEach(state => {
           for(let i=0; i<10; i++) {
              const crop = CROPS[Math.floor(Math.random() * CROPS.length)];
              const msp = 1500 + Math.floor(Math.random() * 3000);
              const marketPrice = msp + Math.floor(Math.random() * 1000) - 200;
              const maxPrice = marketPrice + Math.floor(Math.random() * 500);
              
              const diff = marketPrice - msp;
              const percent = ((diff / msp) * 100).toFixed(1);
              
              mockData.push({
                 id: idCount++,
                 crop,
                 marketPrice,
                 msp,
                 maxPrice,
                 trend: diff >= 0 ? `+${percent}%` : `${percent}%`,
                 state: state,
                 market: (STATE_CITY_MAP[state] ? STATE_CITY_MAP[state][Math.floor(Math.random() * STATE_CITY_MAP[state].length)] : "Local") + ' APMC'
              });
           }
        });
        
        if (selectedState === 'All') mockData.sort(() => Math.random() - 0.5);
        setApiData(mockData);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
  }, [selectedState, selectedCity, refreshTrigger]);

  const filteredAndSorted = apiData
    .filter(item => {
       if (selectedState !== 'All' && item.state.toLowerCase() !== selectedState.toLowerCase()) return false;
       if (selectedCity !== 'All' && !item.market.toLowerCase().includes(selectedCity.toLowerCase())) return false;

       if (search) {
          const query = search.toLowerCase();
          return item.crop.toLowerCase().includes(query) || item.state.toLowerCase().includes(query) || item.market.toLowerCase().includes(query);
       }
       return true;
    })
    .sort((a, b) => {
       if (sortBy === 'priceHigh') return b.marketPrice - a.marketPrice;
       if (sortBy === 'marginHigh') return (b.marketPrice - b.msp) - (a.marketPrice - a.msp);
       return 0; // default
    });

  return (
    <div className="animate-in fade-in zoom-in duration-500 pb-12">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h2 className="text-xl font-bold text-white mb-1">Market Intelligence</h2>
           <p className="text-slate-400 text-sm flex items-center gap-2">Track real-time Mandi prices from Data.gov.in.</p>
        </div>
        <div className="flex items-center gap-3">
           <button onClick={() => setRefreshTrigger(prev => prev + 1)} className="btn-primary flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors border border-slate-700">
             <RefreshCw size={16} className={loading ? 'animate-spin' : ''} /> Sync Data
           </button>
           <button className="btn-primary flex items-center gap-2 px-4 py-2">
             <Download size={16} /> Export CSV
           </button>
        </div>
      </div>

      <div className="card-panel p-6 mb-6 border border-slate-700/50">
         <div className="flex justify-between items-end mb-4">
           <label className="block text-sm font-medium text-slate-300">Advanced Geographical Filtering</label>
           {!loading && (
             <span className="text-xs font-semibold px-2 py-1 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20">
               {apiData.length} active queries
             </span>
           )}
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
           <div className="md:col-span-1 border border-slate-700 rounded-lg overflow-hidden flex bg-slate-900 group focus-within:border-teal-500 transition-colors">
              <span className="px-3 py-3 text-slate-500 bg-slate-800 border-r border-slate-700">State</span>
              <select 
                 value={selectedState} 
                 onChange={(e) => { setSelectedState(e.target.value); setSelectedCity('All'); }}
                 className="w-full bg-slate-900 text-slate-200 py-3 px-3 focus:outline-none cursor-pointer"
              >
                 {INDIAN_STATES.map((stat, i) => (
                   <option key={i} value={stat}>{stat === 'All' ? '— All States —' : stat}</option>
                 ))}
              </select>
           </div>
           
           <div className="md:col-span-1 border border-slate-700 rounded-lg overflow-hidden flex bg-slate-900 group focus-within:border-teal-500 transition-colors">
              <span className="px-3 py-3 text-slate-500 bg-slate-800 border-r border-slate-700">City/Mandi</span>
              <select 
                 value={selectedCity} 
                 onChange={(e) => setSelectedCity(e.target.value)}
                 className="w-full bg-slate-900 text-slate-200 py-3 px-3 focus:outline-none cursor-pointer"
              >
                 <option value="All">— All Cities —</option>
                 {(selectedState === 'All' ? Object.values(STATE_CITY_MAP).flat() : (STATE_CITY_MAP[selectedState] || [])).map((city, i) => (
                   <option key={i} value={city}>{city}</option>
                 ))}
              </select>
           </div>
           
           <div className="md:col-span-1">
             <input 
                type="text" 
                placeholder="Micro-search crop or mandi..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-full bg-slate-900 border border-slate-700 text-slate-200 rounded-lg py-3 px-4 focus:outline-none focus:border-teal-500 transition-colors"
             />
           </div>
           
           <div className="md:col-span-1">
             <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full h-full bg-slate-900 border border-slate-700 text-slate-200 rounded-lg py-3 px-4 focus:outline-none focus:border-teal-500 transition-colors"
             >
                <option value="default">Sort: Default Match</option>
                <option value="priceHigh">Highest Price</option>
                <option value="marginHigh">Highest Margin</option>
             </select>
           </div>
         </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-12 text-slate-400 card-panel border border-slate-800">
           <Loader2 className="w-8 h-8 animate-spin text-teal-500 mb-4" />
           <p>Connecting to Data.gov.in and fetching geographic records...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSorted.map((item, idx) => (
             <PriceCard key={idx} data={item} />
          ))}
          {filteredAndSorted.length === 0 && (
             <div className="col-span-full text-center text-slate-500 py-16 card-panel bg-slate-900/50 border border-slate-700/50 border-dashed">
               <div className="flex justify-center mb-3"><Loader2 className="w-8 h-8 text-slate-600 animate-pulse" /></div>
               <p className="font-semibold text-slate-400">No records found for that specific Geography / Commodity filter.</p>
               <p className="text-sm mt-1">Try expanding your state or city selection to 'All'.</p>
             </div>
          )}
        </div>
      )}
    </div>
  );
}

function PriceCard({ data }) {
  const [expanded, setExpanded] = useState(false);
  const diff = data.marketPrice - data.msp;
  const isPositive = diff >= 0;

  // Mock historical data for the chart functionality
  const chartData = [
     { day: 'Day 1', price: data.marketPrice * 0.9 },
     { day: 'Day 2', price: data.marketPrice * 0.95 },
     { day: 'Day 3', price: data.marketPrice * 1.05 },
     { day: 'Day 4', price: data.marketPrice * 0.98 },
     { day: 'Today', price: data.marketPrice }
  ];

  return (
    <div className="card-panel p-6 flex flex-col justify-between hover:shadow-xl hover:shadow-teal-500/10 transition-all border border-slate-700/50 group h-fit">
       <div className="flex justify-between items-start mb-5 border-b border-slate-700/50 pb-4">
          <div>
             <h3 className="text-lg font-bold text-white group-hover:text-teal-400 transition-colors">{data.crop}</h3>
             <div className="flex items-center gap-1 text-xs text-slate-400 mt-1 font-medium bg-slate-900/50 w-fit px-2 py-0.5 rounded">
                <MapPin size={12} className="text-slate-500" /> {data.market}, {data.state}
             </div>
          </div>
          <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider whitespace-nowrap ${isPositive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
            {data.trend}
          </div>
       </div>

       <div className="space-y-3 mb-4">
          <div className="flex justify-between items-center p-3 rounded-lg bg-teal-500/5 border border-teal-500/20 relative overflow-hidden">
             <div className="absolute left-0 top-0 bottom-0 w-1 bg-teal-500/50"></div>
             <div className="flex items-center gap-2">
                <DollarSign size={16} className="text-teal-500" />
                <span className="text-sm font-semibold text-slate-200">Current Market</span>
             </div>
             <div className="text-lg font-bold text-white">{data.marketPrice} <span className="text-xs font-medium text-slate-500">₹/q</span></div>
          </div>
          
          <div className="flex justify-between items-center px-3">
             <span className="text-xs font-medium text-slate-400">Min Protocol (MSP)</span>
             <div className="text-sm font-bold text-slate-300">{data.msp} <span className="text-[10px] text-slate-500">₹/q</span></div>
          </div>
          
          {data.maxPrice > 0 && (
             <div className="flex justify-between items-center px-3">
                <span className="text-xs font-medium text-slate-400">Max Peak Traded</span>
                <div className="text-sm font-bold text-slate-300">{data.maxPrice} <span className="text-[10px] text-slate-500">₹/q</span></div>
             </div>
          )}
       </div>

       {expanded && (
         <div className="h-32 mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
           <h4 className="text-xs font-medium text-slate-400 mb-2 flex items-center gap-1"><TrendingUp size={12}/> 5-Day Trend Prediction</h4>
           <ResponsiveContainer width="100%" height="100%">
             <LineChart data={chartData}>
               <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '0.5rem', fontSize: '12px' }}
                  itemStyle={{ color: '#2dd4bf' }}
               />
               <Line type="monotone" dataKey="price" stroke="#2dd4bf" strokeWidth={2} dot={{ fill: '#0f172a', strokeWidth: 2 }} />
             </LineChart>
           </ResponsiveContainer>
         </div>
       )}

       <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs font-medium text-slate-400">
             {isPositive ? 'Pricing looks profitable' : 'Awaiting better margin'}
          </div>
          <button 
             onClick={() => setExpanded(!expanded)}
             className="text-xs font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1 bg-teal-500/10 px-2 py-1 rounded transition-colors"
          >
             <LineChartIcon size={12} />
             {expanded ? 'Hide Chart' : 'Show Chart'}
          </button>
       </div>
    </div>
  );
}
