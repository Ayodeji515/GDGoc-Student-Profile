
import React from 'react';
import { SOTMData } from '../types.ts';

interface PreviewProps {
  data: SOTMData;
  innerRef: React.RefObject<HTMLDivElement>;
}

const GDGBrackets = ({ size = 80 }: { size?: number }) => (
  <svg width={size} height={size * 0.7} viewBox="0 0 100 70" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(25, 35)">
      <rect x="0" y="-7.5" width="40" height="15" rx="7.5" transform="rotate(-45 0 0)" fill="#EA4335" />
      <rect x="0" y="-7.5" width="40" height="15" rx="7.5" transform="rotate(45 0 0)" fill="#4285F4" />
    </g>
    <g transform="translate(75, 35)">
      <rect x="-40" y="-7.5" width="40" height="15" rx="7.5" transform="rotate(45 0 0)" fill="#34A853" />
      <rect x="-40" y="-7.5" width="40" height="15" rx="7.5" transform="rotate(-45 0 0)" fill="#FBBC04" />
    </g>
  </svg>
);

const Preview: React.FC<PreviewProps> = ({ data, innerRef }) => {
  return (
    <div 
      ref={innerRef}
      id="graphic-canvas" 
      className="relative flex flex-col font-montserrat overflow-hidden select-none"
      style={{
        background: 'linear-gradient(135deg, #020617, #000000)',
        padding: 'clamp(20px, 5vw, 50px)',
        color: 'white'
      }}
    >
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px' }}></div>

      {/* Top Header Section */}
      <div className="flex justify-between items-start mb-10 z-10">
        <div className="relative">
            <div className="flex items-center gap-3 md:gap-5">
                <GDGBrackets size={80} />
                <div className="flex flex-col leading-tight">
                    <span className="text-[14px] md:text-[20px] font-black text-white tracking-tight break-words max-w-[180px] md:max-w-none">
                      {data.organizationName || 'Google Developer Groups'}
                    </span>
                    <span className="text-[10px] md:text-[12px] font-bold text-gray-500 uppercase tracking-[0.2em]">
                      {data.subTitle || 'Community Member'}
                    </span>
                </div>
            </div>
        </div>

        <div className="text-right leading-none uppercase">
          <div className="text-[8px] md:text-[11px] font-black tracking-[0.3em] text-gray-500 mb-1">RECOGNITION</div>
          <div className="text-2xl md:text-5xl font-black italic text-white leading-none">STUDENT</div>
          <div className="text-[9px] md:text-[13px] font-bold bg-green-500 text-white inline-block px-3 py-1 mt-1 rounded-sm tracking-widest whitespace-nowrap">OF THE MONTH</div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="grid grid-cols-12 gap-6 md:gap-10 items-start flex-grow z-10">
        
        {/* Left Area: Profile & Name (Cols 1-6) */}
        <div className="col-span-6 flex flex-col space-y-4 md:space-y-6">
           <div className="relative bg-white/5 rounded-[1.5rem] md:rounded-[2.5rem] p-1.5 border border-white/10 overflow-hidden shadow-2xl aspect-[1/1.2]">
             {data.profileImage ? (
                <img src={data.profileImage} alt="Profile" className="w-full h-full object-cover rounded-[1.2rem] md:rounded-[2.2rem]" />
             ) : (
                <div className="w-full h-full bg-slate-900 rounded-[1.2rem] md:rounded-[2.2rem] flex items-center justify-center text-slate-700 font-bold uppercase text-[8px] md:text-xs tracking-widest px-4 text-center">No Photo Selected</div>
             )}
             <div className="absolute bottom-4 right-4 bg-green-500 w-8 h-8 md:w-11 md:h-11 rounded-full flex items-center justify-center border-4 border-[#020617] shadow-lg">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
             </div>
           </div>
           
           <div className="bg-white py-3 md:py-5 px-3 md:px-5 rounded-2xl md:rounded-3xl text-center shadow-xl border-b-[4px] md:border-b-[6px] border-slate-200">
             <h3 className="text-sm md:text-2xl font-black uppercase tracking-wide leading-tight text-black line-clamp-2">{data.fullName || 'Full Name'}</h3>
           </div>

           <div className="space-y-2 md:space-y-3 bg-white/5 p-4 md:p-6 rounded-2xl md:rounded-3xl border border-white/5">
             <div className="text-green-400 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] border-l-3 border-green-500 pl-2">
                {data.motivationTitle}
             </div>
             <p className="text-[10px] md:text-[14px] font-medium leading-relaxed italic opacity-80 text-gray-200 line-clamp-4">
               {data.motivationText ? `"${data.motivationText}"` : 'Your motivation quote will appear here...'}
             </p>
           </div>
        </div>

        {/* Right Area: Attribute Rows (Cols 7-12) */}
        <div className="col-span-6 flex flex-col space-y-2 md:space-y-4 pt-1">
          <AttributeRow label="DEPT" value={data.department} />
          <AttributeRow label="LEVEL" value={data.level} />
          <AttributeRow label="ROLE" value={data.business} />
          <AttributeRow label="BRAND" value={data.brandName} />
          <AttributeRow label="HOBBY" value={data.hobby} />
          <AttributeRow label="TECH" value={data.techStory} />
          <AttributeRow label="INFO" value={data.personality} />
        </div>
      </div>

      {/* Footer Section */}
      <div className="mt-8 border-t border-white/5 pt-6 flex flex-col items-center space-y-4 md:space-y-6 z-10">
        <div className="font-signature text-2xl md:text-4xl text-green-400 drop-shadow-lg">{data.signatureText}</div>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-10 text-[9px] md:text-[12px] font-bold tracking-widest text-gray-500 uppercase">
          <div className="flex items-center gap-2">
            <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            <span>{data.instagramHandle || 'Instagram'}</span>
          </div>
          <div className="flex items-center gap-2">
             <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.31-.81.51-1.36 1.43-1.4 2.39-.01 1.13.62 2.21 1.55 2.82.78.51 1.73.74 2.65.64 1.12-.13 2.13-.81 2.65-1.81.25-.51.35-1.07.34-1.64-.02-3.93-.01-7.86-.02-11.79z"/></svg>
            <span>{data.tiktokHandle || 'TikTok'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const AttributeRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex items-stretch min-h-[36px] md:min-h-[52px] bg-white/5 rounded-lg md:rounded-2xl overflow-hidden border border-white/10 group shadow-lg">
    <div className="bg-green-600 text-white flex items-center justify-center text-[7px] md:text-[10px] font-black w-[40px] md:w-[80px] px-1 text-center uppercase leading-none shrink-0 tracking-widest">
      {label}
    </div>
    <div className="flex-grow flex items-center px-2 md:px-4 py-1">
      <span className="text-gray-100 text-[9px] md:text-[13px] font-bold leading-snug line-clamp-2">{value || '---'}</span>
    </div>
  </div>
);

export default Preview;
