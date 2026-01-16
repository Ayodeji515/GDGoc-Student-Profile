
import React, { useState, useRef, useCallback, useMemo } from 'react';
import Form from './components/Form';
import Preview from './components/Preview';
import { SOTMData, defaultData } from './types';
import * as htmlToImage from 'html-to-image';

const App: React.FC = () => {
  const [data, setData] = useState<SOTMData>(defaultData);
  const [isExporting, setIsExporting] = useState(false);
  const graphicRef = useRef<HTMLDivElement>(null);

  const isComplete = useMemo(() => {
    return (
      data.fullName.trim() !== '' &&
      data.profileImage !== null &&
      data.department.trim() !== '' &&
      data.motivationText.trim() !== ''
    );
  }, [data]);

  const handleDownload = useCallback(async () => {
    if (!graphicRef.current) return;
    if (!isComplete) {
      alert("Please fill in the full name, upload a photo, and add your department/motivation!");
      return;
    }
    
    setIsExporting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const dataUrl = await htmlToImage.toPng(graphicRef.current, {
        pixelRatio: 2.5,
        backgroundColor: '#000000',
        cacheBust: true,
      });
      
      const link = document.createElement('a');
      link.download = `GDGoC-FUOYE-${data.fullName.replace(/\s+/g, '-').toLowerCase()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Failed to generate image:', error);
      alert('Error generating image. Try a smaller photo or check your connection.');
    } finally {
      setIsExporting(false);
    }
  }, [data.fullName, isComplete]);

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-10 text-slate-900 bg-slate-50">
      <header className="max-w-[1400px] mx-auto mb-8 lg:mb-12 flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-black rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg border border-white/10 group overflow-hidden">
             <svg width="40" height="26" viewBox="0 0 100 70" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(25, 35)">
                  <rect x="0" y="-7.5" width="40" height="15" rx="7.5" transform="rotate(-45 0 0)" fill="#EA4335" />
                  <rect x="0" y="-7.5" width="40" height="15" rx="7.5" transform="rotate(45 0 0)" fill="#4285F4" />
                </g>
                <g transform="translate(75, 35)">
                  <rect x="-40" y="-7.5" width="40" height="15" rx="7.5" transform="rotate(45 0 0)" fill="#34A853" />
                  <rect x="-40" y="-7.5" width="40" height="15" rx="7.5" transform="rotate(-45 0 0)" fill="#FBBC04" />
                </g>
             </svg>
          </div>
          <div className="text-left">
            <h1 className="text-2xl md:text-4xl font-black tracking-tighter leading-none">
              GDGoC <span className="text-green-600 italic">FUOYE</span>
            </h1>
            <p className="text-slate-400 text-[10px] md:text-[11px] font-bold uppercase tracking-widest mt-1">Official Recognition Portal</p>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-6 w-full sm:w-auto">
          <button
            onClick={handleDownload}
            disabled={isExporting || !isComplete}
            className={`flex-1 sm:flex-initial px-6 md:px-10 py-3 md:py-4 rounded-2xl md:rounded-3xl font-black text-xs md:text-sm tracking-widest uppercase flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-xl ${
              isComplete 
                ? 'bg-green-600 hover:bg-green-700 text-white shadow-green-200' 
                : 'bg-slate-300 text-slate-500 cursor-not-allowed grayscale'
            }`}
          >
            {isExporting ? 'Exporting...' : 'Export Graphic'}
          </button>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-7 order-1 lg:order-2">
          <div className="lg:sticky lg:top-8 flex flex-col items-center">
            <div className="mb-4 flex items-center justify-between w-full px-2">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isComplete ? 'bg-green-500 animate-pulse' : 'bg-amber-400'}`}></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Live Preview</span>
              </div>
              {!isComplete && (
                <span className="text-[10px] font-bold uppercase text-amber-600">Pending Details</span>
              )}
            </div>
            
            <div id="graphic-wrapper" className="bg-black p-3 md:p-6 rounded-[2rem] md:rounded-[3rem] shadow-2xl border border-slate-200">
               <Preview data={data} innerRef={graphicRef} />
            </div>
            
            <p className="mt-4 text-[10px] font-medium text-slate-400 text-center max-w-sm px-4">
              Tip: Ensure you are using a square or portrait photo for the best fit.
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 order-2 lg:order-1">
          <Form 
            data={data} 
            onChange={setData} 
            onDownload={handleDownload}
            isComplete={isComplete}
            isExporting={isExporting}
          />
        </div>
      </main>

      <footer className="max-w-[1400px] mx-auto mt-12 md:mt-24 pb-12 text-center">
        <div className="h-px bg-slate-200 w-full mb-8"></div>
        <p className="text-slate-400 text-[9px] md:text-[11px] font-black uppercase tracking-[0.4em]">GDGoC FUOYE Community Engine &bull; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default App;
