import React, { useState } from 'react';
import { 
  Upload, 
  Image as ImageIcon, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  ArrowRight, 
  RefreshCw, 
  Smartphone,
  Sprout,
  ShieldCheck,
  Zap
} from 'lucide-react';

export default function DiseaseDetection() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setResult(null);
    setError(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const mlUrl = import.meta.env.VITE_ML_URL || 'http://localhost:5005';
      const response = await fetch(`${mlUrl}/predict_disease`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to analyze image. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="max-w-5xl mx-auto pb-12 animate-in fade-in duration-300">
      
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-[#DDF2E3] flex items-center justify-center text-[#176B3A]">
            <Sprout size={22} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#24352A] font-bricolage tracking-tight">
              Plant Disease Scanner
            </h1>
            <p className="text-xs sm:text-sm text-[#718078]">
              Optical leaf diagnosis powered by 38-class Deep Learning Computer Vision.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Upload Column (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          <div className="card-panel p-6">
            <h3 className="font-bold text-base text-[#24352A] font-bricolage mb-4 flex items-center justify-between">
              <span>Leaf Photograph</span>
              {previewUrl && (
                <button 
                  onClick={reset}
                  className="text-xs text-[#DC2626] hover:underline flex items-center gap-1 font-semibold"
                >
                  <RefreshCw size={13} /> Reset
                </button>
              )}
            </h3>

            {/* Upload Drag/Drop Box */}
            <div 
              className={`relative rounded-3xl border-2 border-dashed transition-all flex flex-col items-center justify-center p-6 h-[340px] overflow-hidden ${
                previewUrl 
                  ? 'border-[#3FAE68] bg-[#F2F6F0]' 
                  : 'border-[#C3DFC9] hover:border-[#3FAE68] bg-[#F8FAF7]'
              }`}
            >
              {previewUrl ? (
                <div className="relative w-full h-full group flex items-center justify-center">
                  <img 
                    src={previewUrl} 
                    alt="Leaf Preview" 
                    className="w-full h-full object-contain rounded-2xl shadow-sm"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                    <button 
                      onClick={reset} 
                      className="p-3 bg-[#DC2626] rounded-full text-white hover:scale-110 transition-transform shadow-lg"
                    >
                      <RefreshCw size={20} />
                    </button>
                  </div>
                </div>
              ) : (
                <label className="cursor-pointer flex flex-col items-center gap-4 text-center w-full h-full justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#DDF2E3] text-[#176B3A] flex items-center justify-center transition-transform hover:scale-110 shadow-xs">
                    <Upload size={30} />
                  </div>
                  <div>
                    <p className="text-base font-bold text-[#24352A] mb-1">Click or Drag & Drop Leaf Image</p>
                    <p className="text-xs text-[#718078]">Supports JPG, PNG, WEBP (Max 5MB)</p>
                  </div>
                  <input type="file" className="hidden" onChange={onFileChange} accept="image/*" />
                </label>
              )}
            </div>

            {/* Action Button */}
            <div className="mt-5">
              <button
                disabled={!selectedFile || loading}
                onClick={handleUpload}
                className={`w-full py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                  !selectedFile || loading 
                    ? 'bg-[#E2ECE4] text-[#9BA8A0] cursor-not-allowed' 
                    : 'btn-primary'
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Analyzing Neural Model (38 Classes)...
                  </>
                ) : (
                  <>
                    <Zap size={18} />
                    Diagnose Plant Pathology
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Guidelines Card */}
          <div className="card-panel p-5 bg-[#F8FAF7] border-[#E2ECE4]">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#718078] mb-3">
              Best Scanning Practices
            </h4>
            <ul className="text-xs text-[#718078] space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3FAE68]"></span>
                Focus directly on affected spots, discoloration, or leaf lesions.
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3FAE68]"></span>
                Use natural bright daylight to prevent false color tinting.
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3FAE68]"></span>
                Keep leaf flat against a neutral background if possible.
              </li>
            </ul>
          </div>
        </div>

        {/* Diagnosis Results Column (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          
          {error && (
            <div className="card-panel p-5 border-[#FECACA] bg-[#FEF2F2] text-[#DC2626] rounded-2xl flex items-start gap-3">
              <AlertCircle size={20} className="shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-sm">Diagnosis Error</div>
                <div className="text-xs mt-1">{error}</div>
              </div>
            </div>
          )}

          {result ? (
            <div className="card-panel p-6 space-y-6 animate-in fade-in duration-300">
              
              {/* Primary Diagnosis Header */}
              <div className="flex items-start justify-between pb-5 border-b border-[#E2ECE4]">
                <div>
                  <span className="badge-pill-green mb-2">Primary Diagnosis</span>
                  <h3 className="text-2xl font-bold text-[#24352A] font-bricolage">
                    {result.disease ? result.disease.replace(/___/g, ' - ').replace(/_/g, ' ') : "Leaf Inspected"}
                  </h3>
                  <p className="text-xs text-[#718078] mt-1">
                    Index #{result.index ?? 0} • Evaluated across 38 crop condition models
                  </p>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-extrabold text-[#176B3A] font-bricolage">
                    {result.confidence ? result.confidence.toFixed(1) : 0}%
                  </div>
                  <div className="text-[10px] text-[#718078] uppercase font-bold">Confidence</div>
                </div>
              </div>

              {/* Status pill */}
              <div className={`p-4 rounded-2xl border flex items-center gap-3 ${
                result.disease && result.disease.toLowerCase().includes('healthy')
                  ? 'bg-[#DDF2E3] border-[#C3DFC9] text-[#176B3A]'
                  : 'bg-[#FEF3C7] border-[#FDE68A] text-[#B45309]'
              }`}>
                {result.disease && result.disease.toLowerCase().includes('healthy') ? (
                  <CheckCircle size={22} className="shrink-0" />
                ) : (
                  <AlertCircle size={22} className="shrink-0" />
                )}
                <div className="text-xs font-semibold">
                  {result.disease && result.disease.toLowerCase().includes('healthy')
                    ? "Specimen appears healthy. Maintain standard irrigation and nutrient plan."
                    : "Symptoms indicate pathogen or blight activity. Consider organic fungicide or biological spray."
                  }
                </div>
              </div>

              {/* Top 3 Alternative Probabilities */}
              {result.top3 && result.top3.length > 0 && (
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#718078] mb-3">
                    Top Neural Predictions
                  </h4>
                  <div className="space-y-3">
                    {result.top3.map((pred, i) => (
                      <div key={i} className="p-3.5 bg-[#F2F6F0] rounded-xl border border-[#E2ECE4]">
                        <div className="flex justify-between text-xs font-semibold mb-1.5">
                          <span className="text-[#24352A]">
                            {pred.disease.replace(/___/g, ' • ').replace(/_/g, ' ')}
                          </span>
                          <span className="text-[#176B3A] font-bold">
                            {pred.confidence.toFixed(1)}%
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-[#E2ECE4] rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#3FAE68] rounded-full"
                            style={{ width: `${Math.min(pred.confidence, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Treatment Action Recommendation */}
              <div className="pt-2">
                <button 
                  onClick={() => window.location.href = '/voice-assistant'}
                  className="w-full py-2.5 bg-[#EAF2E8] hover:bg-[#DDF2E3] text-[#176B3A] font-bold text-xs rounded-full transition-colors flex items-center justify-center gap-1.5"
                >
                  Consult AI Voice Assistant for Treatment Plan <ArrowRight size={14} />
                </button>
              </div>

            </div>
          ) : (
            /* Placeholder when no result yet */
            <div className="card-panel p-10 flex flex-col items-center justify-center text-center h-[380px] border-dashed border-[#C3DFC9]">
              <div className="w-16 h-16 rounded-full bg-[#F2F6F0] text-[#718078] flex items-center justify-center mb-4">
                <ImageIcon size={30} />
              </div>
              <h3 className="font-bold text-base text-[#24352A] font-bricolage mb-1">
                Awaiting Leaf Sample
              </h3>
              <p className="text-xs text-[#718078] max-w-xs">
                Upload a plant leaf photograph on the left and run analysis to view instant disease diagnosis and treatment steps.
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
