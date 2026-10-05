import React from 'react';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, CheckCircle2, Zap, ArrowRight } from 'lucide-react';

const recommendations = [
  {
    id: 1,
    type: 'alert',
    icon: <AlertTriangle className="text-[#D97706]" size={18} />,
    title: 'Delay Irrigation 24h',
    desc: 'AI predicts 80% chance of rain in 48 hours. Delaying irrigation saves approx 2,982 L/acre.',
    action: 'Postpone 2 Days',
    bg: 'bg-[#FEF3C7]'
  },
  {
    id: 2,
    type: 'success',
    icon: <CheckCircle2 className="text-[#176B3A]" size={18} />,
    title: 'Optimal Fertilizer Window',
    desc: 'Soil temperature and humidity (68%) are optimal for Nitrogen top-dressing today.',
    action: 'Mark Applied',
    bg: 'bg-[#DDF2E3]'
  },
  {
    id: 3,
    type: 'action',
    icon: <Zap className="text-[#2563EB]" size={18} />,
    title: 'Pest Advisory in Nearby Sector',
    desc: 'Nearby farms reported aphid outbreaks. Consider preventative neem oil spray.',
    action: 'View Details',
    bg: 'bg-[#DBEAFE]'
  }
];

const RecommendationFeed = () => {
  const { t } = useTranslation();

  return (
    <div className="card-panel p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-bold text-[#24352A] font-bricolage">{t('recommendations') || 'AI Recommendations'}</h2>
        <span className="badge-pill-green">
          <Zap size={12} />
          Rule-Base + ML Active
        </span>
      </div>

      <div className="space-y-3">
        {recommendations.map((rec) => (
          <div key={rec.id} className="p-3.5 rounded-2xl bg-[#F2F6F0] border border-[#E2ECE4] hover:bg-[#EAF2E8] transition-colors flex items-start gap-3.5 group">
            <div className={`mt-0.5 p-2 rounded-xl ${rec.bg} shrink-0`}>
              {rec.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-[#24352A] font-bold text-xs sm:text-sm">{rec.title}</h3>
              <p className="text-[#718078] text-xs mt-0.5 leading-relaxed">{rec.desc}</p>
            </div>
            <button className="text-xs font-bold text-[#176B3A] px-3 py-1.5 bg-white border border-[#E2ECE4] rounded-full hover:bg-[#DDF2E3] transition-colors shrink-0 shadow-2xs">
              {rec.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationFeed;
