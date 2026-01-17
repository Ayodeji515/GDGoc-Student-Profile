
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
      // Small delay to ensure any layout shifts settle
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const dataUrl = await htmlToImage.toPng(graphicRef.current, {
        pixelRatio: 3, // High quality export
        backgroundColor: '#000000',
        cacheBust: true,
        style: {
          transform: 'scale(1)', // Ensure it captures at 1:1 scale
        }
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
    <div className="min-h-screen px-4 md:px-6 lg:px-10 py-6 md:py-10 pb-24 md:pb-32 text-slate-900 bg-slate-50">
      <header className="max-w-[1400px] mx-auto mb-10 lg:mb-16 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-black rounded-2xl flex items-center justify-center shadow-xl border border-white/10 group overflow-hidden">
             <svg width="45" height="24" viewBox="0 0 130 70" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(30, 35)">
                  <rect x="0" y="-7.5" width="40" height="15" rx="7.5" transform="rotate(-45 0 0)" fill="#EA4335" />
                  <rect x="0" y="-7.5" width="40" height="15" rx="7.5" transform="rotate(45 0 0)" fill="#4285F4" />
                </g>
                <g transform="translate(100, 35)">
                  <rect x="-40" y="-7.5" width="40" height="15" rx="7.5" transform="rotate(45 0 0)" fill="#34A853" />
                  <rect x="-40" y="-7.5" width="40" height="15" rx="7.5" transform="rotate(-45 0 0)" fill="#FBBC04" />
                </g>
             </svg>
          </div>
          <div className="text-left">
            <h1 className="text-2xl md:text-3xl font-black tracking-tighter leading-none">
              GDGoC <span className="text-green-600 italic">FUOYE</span>
            </h1>
          </div>
        </div>

        <button
          onClick={handleDownload}
          disabled={isExporting || !isComplete}
          className={`w-full md:w-auto px-10 py-4 rounded-3xl font-black text-xs tracking-widest uppercase flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-2xl ${
            isComplete 
              ? 'bg-green-600 hover:bg-green-700 text-white shadow-green-200' 
              : 'bg-slate-300 text-slate-500 cursor-not-allowed'
          }`}
        >
          {isExporting ? 'Generating PNG...' : 'Download Graphic'}
        </button>
      </header>

      <main className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16">
        {/* Preview Container */}
        <div className="lg:col-span-6 xl:col-span-7 order-1 lg:order-2">
          <div className="lg:sticky lg:top-10 space-y-6">
            <div className="flex items-center justify-between px-4">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isComplete ? 'bg-green-500 animate-pulse' : 'bg-amber-400'}`}></div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Studio Live Render</span>
              </div>
            </div>
            
            <div id="graphic-wrapper" className="relative shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] rounded-[2.5rem] md:rounded-[3rem]">
               <Preview data={data} innerRef={graphicRef} />
            </div>
            
            <div className="flex items-center gap-3 justify-center p-4 bg-slate-100/50 rounded-2xl border border-dashed border-slate-200">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                This is a live preview. Use "Download Graphic" for the high-res result.
              </p>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="lg:col-span-6 xl:col-span-5 order-2 lg:order-1">
          <Form 
            data={data} 
            onChange={setData} 
            onDownload={handleDownload}
            isComplete={isComplete}
            isExporting={isExporting}
          />
        </div>
      </main>

      <footer className="max-w-[1400px] mx-auto mt-20 md:mt-32 pb-12 text-center">
        <div className="h-px bg-slate-200 w-full mb-8"></div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-4">
          <p className="text-slate-400 text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em]">GDG FUOYE COMMUNITY ENGINE &bull; {new Date().getFullYear()}</p>
          <p className="text-slate-300 text-[9px] md:text-[10px] font-bold uppercase tracking-widest">Designed for Innovation & Community</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
