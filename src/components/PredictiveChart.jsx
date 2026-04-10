import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { BrainCircuit } from 'lucide-react';

const mockData = [
  { day: 'Mon', moisture: 40, predicted: 35 },
  { day: 'Tue', moisture: 38, predicted: 32 },
  { day: 'Wed', moisture: 35, predicted: 28 },
  { day: 'Thu', moisture: 30, predicted: 25 },
  { day: 'Fri', moisture: 45, predicted: 42 }, // irrigated
  { day: 'Sat', moisture: 42, predicted: 38 },
  { day: 'Sun', moisture: 38, predicted: 35 },
];

const PredictiveChart = () => {
  return (
    <div className="glass-panel p-6 h-full flex flex-col hover:shadow-2xl hover:shadow-accent-purple/10 transition-shadow duration-300">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <BrainCircuit className="text-accent-purple" size={24} />
            AI Moisture Prediction
          </h2>
          <p className="text-sm text-slate-400 mt-1">LSTM Time Series Model Output</p>
        </div>
        <div className="px-3 py-1 bg-accent-purple/10 border border-accent-purple/30 rounded-full text-xs font-semibold text-accent-purple">
          Real-time
        </div>
      </div>

      <div className="flex-1 min-h-[200px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorMoisture" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', borderRadius: '12px', color: '#f8fafc' }}
              itemStyle={{ color: '#f8fafc' }}
            />
            <Area type="monotone" dataKey="moisture" name="Actual %" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorMoisture)" />
            <Area type="monotone" dataKey="predicted" name="AI Forecast %" stroke="#8B5CF6" strokeWidth={3} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorPredicted)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PredictiveChart;
