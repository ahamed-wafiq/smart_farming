import React from 'react';
import { useTranslation } from 'react-i18next';
import { Cloud, CloudLightning, Droplets, Sun, Wind, MapPin, CloudRain } from 'lucide-react';
import WeatherWidget from '../components/WeatherWidget';

const Weather = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-6xl mx-auto pb-12 animate-in fade-in duration-300">
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#24352A] font-bricolage tracking-tight mb-1">
          {t('weather') || 'Weather Forecast & Agro-Meteorology'}
        </h1>
        <p className="text-xs sm:text-sm text-[#718078]">
          Advanced 7-day meteorological prediction and micro-climate forecasting driven by live IoT sensors.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-1">
          <WeatherWidget />
        </div>
        
        <div className="lg:col-span-2 card-panel p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-[#24352A] font-bricolage flex items-center gap-2 mb-4">
              <Sun className="text-[#F59E0B]" size={20} /> Today's Hourly Trajectory
            </h3>
            
            <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide">
              {[
                { time: '10:00', icon: <Sun size={20} className="text-[#F59E0B]" />, temp: '32°C' },
                { time: '11:00', icon: <Sun size={20} className="text-[#F59E0B]" />, temp: '34°C' },
                { time: '12:00', icon: <Cloud size={20} className="text-[#718078]" />, temp: '35°C' },
                { time: '13:00', icon: <CloudLightning size={20} className="text-[#6366F1]" />, temp: '32°C' },
                { time: '14:00', icon: <Droplets size={20} className="text-[#2563EB]" />, temp: '29°C' },
                { time: '15:00', icon: <Droplets size={20} className="text-[#2563EB]" />, temp: '28°C' },
                { time: '16:00', icon: <Cloud size={20} className="text-[#718078]" />, temp: '29°C' },
              ].map((hour, idx) => (
                <div key={idx} className="shrink-0 bg-[#F2F6F0] rounded-2xl p-3.5 min-w-[85px] flex flex-col items-center gap-2 border border-[#E2ECE4]/70 hover:bg-[#DDF2E3]/50 transition-colors">
                  <span className="text-[11px] font-bold text-[#718078]">{hour.time}</span>
                  {hour.icon}
                  <span className="text-sm font-extrabold text-[#24352A]">{hour.temp}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-[#E2ECE4] flex items-center justify-between text-xs text-[#718078]">
            <span>Optimal spray window: <strong className="text-[#176B3A]">07:00 AM - 10:30 AM</strong></span>
            <span className="badge-pill-green">Low Evapotranspiration</span>
          </div>
        </div>
      </div>

      {/* 7-Day Radar */}
      <div className="card-panel p-6">
        <h3 className="text-base font-bold text-[#24352A] font-bricolage mb-4">
          7-Day Weather & Soil Evaporation Impact
        </h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {[
            { day: 'Mon', condition: 'Sunny', temp: '33°', rain: '0%', icon: '☀️' },
            { day: 'Tue', condition: 'Cloudy', temp: '31°', rain: '15%', icon: '⛅' },
            { day: 'Wed', condition: 'Light Rain', temp: '28°', rain: '65%', icon: '🌧️' },
            { day: 'Thu', condition: 'Partly Cloudy', temp: '30°', rain: '20%', icon: '🌤️' },
            { day: 'Fri', condition: 'Clear Sky', temp: '34°', rain: '5%', icon: '☀️' },
            { day: 'Sat', condition: 'Sunny', temp: '35°', rain: '0%', icon: '☀️' },
            { day: 'Sun', condition: 'Cloudy', temp: '32°', rain: '10%', icon: '⛅' },
          ].map((item, i) => (
            <div key={i} className="p-4 bg-[#F2F6F0] rounded-2xl border border-[#E2ECE4] flex flex-col items-center justify-center gap-1.5 text-center">
              <span className="text-xs font-bold text-[#718078]">{item.day}</span>
              <span className="text-2xl my-1">{item.icon}</span>
              <span className="text-sm font-extrabold text-[#24352A]">{item.temp}</span>
              <span className="text-[10px] text-[#2563EB] font-semibold">{item.rain} Rain</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Weather;
