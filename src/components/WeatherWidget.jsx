import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CloudRain, Sun, Wind, Droplets, MapPin, Search } from 'lucide-react';

const WeatherWidget = () => {
  const { t } = useTranslation();
  const [location, setLocation] = useState('Pune, Maharashtra');

  return (
    <div className="card-panel p-6 flex flex-col justify-between h-full">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-lg font-bold text-[#24352A] font-bricolage flex items-center gap-2">
            <Sun className="text-[#F59E0B]" size={22} />
            {t('weather') || 'Weather Forecast'}
          </h2>
          <div className="flex items-center gap-1 text-[#718078] mt-1 text-xs font-medium">
            <MapPin size={13} className="text-[#3FAE68]" />
            <span>{location}</span>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-4xl font-extrabold text-[#24352A] font-bricolage tracking-tight">32°C</div>
          <p className="text-xs text-[#718078] font-medium mt-0.5">Sunny, Clear Skies</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-[#F2F6F0] rounded-2xl p-3 flex flex-col items-center justify-center border border-[#E2ECE4]/70">
          <Droplets size={18} className="text-[#2563EB] mb-1.5" />
          <span className="text-[10px] text-[#718078] font-semibold">{t('humidity') || 'Humidity'}</span>
          <span className="text-xs font-bold text-[#24352A]">45%</span>
        </div>
        <div className="bg-[#F2F6F0] rounded-2xl p-3 flex flex-col items-center justify-center border border-[#E2ECE4]/70">
          <Wind size={18} className="text-[#3FAE68] mb-1.5" />
          <span className="text-[10px] text-[#718078] font-semibold">Wind</span>
          <span className="text-xs font-bold text-[#24352A]">12 km/h</span>
        </div>
        <div className="bg-[#F2F6F0] rounded-2xl p-3 flex flex-col items-center justify-center border border-[#E2ECE4]/70">
          <CloudRain size={18} className="text-[#6366F1] mb-1.5" />
          <span className="text-[10px] text-[#718078] font-semibold">Rain Prob.</span>
          <span className="text-xs font-bold text-[#24352A]">10%</span>
        </div>
      </div>

      <div className="mt-auto">
        <div className="text-[11px] font-bold text-[#718078] uppercase tracking-wider mb-2">Location Query</div>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search farm sector or city..." 
            className="w-full bg-[#F2F6F0] border border-[#E2ECE4] rounded-full px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#3FAE68] text-[#24352A] pr-10"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3FAE68] hover:text-[#176B3A]">
            <Search size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
