import React from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingUp, Wheat, Sprout, Tractor, Brain, Download, ShieldCheck } from 'lucide-react';
import PredictiveChart from '../components/PredictiveChart';

const YieldPrediction = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-6xl mx-auto pb-12 animate-in fade-in duration-300">
      
      {/* Header */}
      <header className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#24352A] font-bricolage tracking-tight mb-1">
            {t('predictions') || 'Crop Yield Prediction & Analytics'}
          </h1>
          <p className="text-xs sm:text-sm text-[#718078]">
            Deep Learning (LSTM & Random Forest ensemble) forecasting seasonal crop tonnage and harvest readiness.
          </p>
        </div>

        <button className="btn-primary text-xs sm:text-sm self-start sm:self-center">
          <Download size={16} /> Export Agronomic Forecast
        </button>
      </header>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { icon: <Wheat className="text-[#176B3A]" size={22} />, title: "Expected Yield", val: "+14%", desc: "vs last season average", bg: "bg-[#DDF2E3]" },
          { icon: <TrendingUp className="text-[#3FAE68]" size={22} />, title: "Market Value Trend", val: "High", desc: "Optimal sell window open", bg: "bg-[#DDF2E3]" },
          { icon: <Sprout className="text-[#176B3A]" size={22} />, title: "Crop Health Index", val: "92%", desc: "Excellent foliage condition", bg: "bg-[#DDF2E3]" },
          { icon: <Tractor className="text-[#2563EB]" size={22} />, title: "Harvest Readiness", val: "24 Days", desc: "Estimated mid-November", bg: "bg-[#DBEAFE]" }
        ].map((stat, i) => (
          <div key={i} className="card-panel p-5 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center shrink-0`}>
              {stat.icon}
            </div>
            <div>
              <span className="text-xs font-semibold text-[#718078] block">{stat.title}</span>
              <span className="text-2xl font-extrabold text-[#24352A] font-bricolage tracking-tight">{stat.val}</span>
              <p className="text-[#718078] text-[11px] mt-0.5">{stat.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chart and Confidence Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Chart (8 cols) */}
        <div className="lg:col-span-8">
          <PredictiveChart />
        </div>

        {/* Model Confidence & Reports (4 cols) */}
        <div className="lg:col-span-4 card-panel p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Brain size={20} className="text-[#3FAE68]" />
              <h3 className="text-base font-bold text-[#24352A] font-bricolage">
                AI Model Confidence
              </h3>
            </div>
            
            <p className="text-xs text-[#718078] mb-6 leading-relaxed">
              Our ensemble AI guarantees a 94.2% accuracy bounding for the selected soil profile and climate conditions.
            </p>
            
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-xs font-bold text-[#24352A] mb-1.5">
                  <span>LSTM Time-Series Sequence</span>
                  <span className="text-[#176B3A]">96%</span>
                </div>
                <div className="h-2 w-full bg-[#E2ECE4] rounded-full overflow-hidden">
                  <div className="h-full bg-[#3FAE68] w-[96%] rounded-full"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-[#24352A] mb-1.5">
                  <span>Random Forest (Yield Regressor)</span>
                  <span className="text-[#176B3A]">92%</span>
                </div>
                <div className="h-2 w-full bg-[#E2ECE4] rounded-full overflow-hidden">
                  <div className="h-full bg-[#176B3A] w-[92%] rounded-full"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-[#24352A] mb-1.5">
                  <span>Soil Moisture Telemetry</span>
                  <span className="text-[#176B3A]">95%</span>
                </div>
                <div className="h-2 w-full bg-[#E2ECE4] rounded-full overflow-hidden">
                  <div className="h-full bg-[#3FAE68] w-[95%] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-[#E2ECE4]">
            <button className="w-full btn-primary text-xs sm:text-sm py-3">
              Generate Full Agronomic Report
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default YieldPrediction;
