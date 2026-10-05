import React from 'react';
import { ResponsiveContainer, Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
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
    <div className="card-panel p-6 h-full flex flex-col justify-between">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-bold text-[#24352A] font-bricolage flex items-center gap-2">
            <BrainCircuit className="text-[#3FAE68]" size={22} />
            AI Moisture & Soil Tension Prediction
          </h2>
          <p className="text-xs text-[#718078] mt-0.5">LSTM Recurrent Neural Network Output</p>
        </div>
        <div className="badge-pill-green">
          Real-time IoT
        </div>
      </div>

      <div className="flex-1 min-h-[220px] w-full mt-2">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <AreaChart data={mockData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorMoistureLight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3FAE68" stopOpacity={0.25}/>
                <stop offset="95%" stopColor="#3FAE68" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorPredictedLight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#176B3A" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#176B3A" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2ECE4" vertical={false} />
            <XAxis dataKey="day" stroke="#718078" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="#718078" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#FFFFFF', 
                borderColor: '#E2ECE4', 
                borderRadius: '12px', 
                color: '#24352A',
                fontSize: '12px'
              }}
            />
            <Area type="monotone" dataKey="moisture" name="Actual Sensor %" stroke="#3FAE68" strokeWidth={3} fillOpacity={1} fill="url(#colorMoistureLight)" />
            <Area type="monotone" dataKey="predicted" name="AI Forecast %" stroke="#176B3A" strokeWidth={2.5} strokeDasharray="4 4" fillOpacity={1} fill="url(#colorPredictedLight)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between text-xs text-[#718078] pt-4 border-t border-[#E2ECE4] mt-4">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3FAE68]"></span> Actual Moisture
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#176B3A]"></span> AI LSTM Forecast
          </span>
        </div>
        <span className="font-semibold text-[#176B3A]">94.2% Confidence</span>
      </div>
    </div>
  );
};

export default PredictiveChart;
