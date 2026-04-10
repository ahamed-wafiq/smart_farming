import React, { useState } from 'react';
import { UploadCloud, CheckCircle2 } from 'lucide-react';

export default function DiseaseDetection() {
  const [file, setFile] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);

  const handleScan = () => {
    if (!file) return;
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setResult({ status: 'Healthy', confidence: '92%', recommendations: 'Maintain current irrigation and fertilizer plan.' });
    }, 2000);
  };

  return (
    <div className="animate-in fade-in zoom-in duration-500 max-w-5xl">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-2">Disease Detection</h2>
        <p className="text-slate-400 text-sm">Upload a crop image and get instant diagnosis with treatment recommendations.</p>
      </div>

      <div className="card-panel p-6 border border-slate-700/50 bg-[#0f172a]/80">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-300">Crop Type</label>
            <select className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-lg py-3 px-4 focus:outline-none focus:border-teal-500">
              <option>Rice</option>
              <option>Wheat</option>
              <option>Soybean</option>
            </select>
            
            <div className="pt-8">
               <button 
                  onClick={handleScan}
                  disabled={!file || scanning}
                  className="btn-primary w-40 disabled:opacity-50 disabled:cursor-not-allowed"
               >
                  {scanning ? 'Scanning...' : 'Run AI Scan'}
               </button>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-300">Leaf Image</label>
            <div 
               className="border-2 border-dashed border-slate-700 hover:border-teal-500/50 rounded-xl h-48 flex flex-col items-center justify-center text-slate-400 bg-slate-900/50 cursor-pointer transition-colors"
               onClick={() => {
                  // mock setting a file
                  setFile({ name: 'leaf_scan.jpg' });
                  setResult(null);
               }}
            >
               {file ? (
                  <div className="text-teal-400 flex flex-col items-center gap-2">
                     <CheckCircle2 size={32} />
                     <span className="text-sm font-medium">{file.name} ready</span>
                  </div>
               ) : (
                  <>
                     <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center mb-3">
                        <UploadCloud size={20} className="text-slate-300" />
                     </div>
                     <p className="text-sm font-medium text-slate-300">Drag and drop a crop image</p>
                     <p className="text-xs text-slate-500">or click to browse files</p>
                  </>
               )}
            </div>
          </div>
        </div>
        
        {/* Mock Results */}
        {result && (
           <div className="mt-8 pt-6 border-t border-slate-800 animate-in slide-in-from-bottom-4">
              <h3 className="font-bold text-white mb-4">Scan Results</h3>
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-sm text-emerald-400">
                 <div className="font-bold mb-1 flex items-center gap-2"><CheckCircle2 size={16} /> {result.status} (Confidence: {result.confidence})</div>
                 <p className="text-slate-300">{result.recommendations}</p>
              </div>
           </div>
        )}
      </div>
    </div>
  );
}
