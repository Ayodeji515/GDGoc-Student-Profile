
import React from 'react';
import { SOTMData, defaultData } from '../types';

interface FormProps {
  data: SOTMData;
  onChange: (newData: SOTMData) => void;
  onDownload: () => void;
  isComplete: boolean;
  isExporting: boolean;
}

const Form: React.FC<FormProps> = ({ data, onChange, onDownload, isComplete, isExporting }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ ...data, profileImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all data?")) {
      onChange(defaultData);
    }
  };

  return (
    <div className="space-y-8 p-6 md:p-8 bg-white rounded-3xl shadow-xl border border-slate-200">
      <div className="flex justify-between items-center border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-xl font-black text-slate-800 tracking-tight">Configuration</h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Fill in the details for the graphic</p>
        </div>
        <button 
          onClick={handleReset}
          className="px-3 py-1.5 bg-slate-50 text-[10px] font-bold text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg uppercase tracking-widest transition-all"
        >
          Reset All
        </button>
      </div>
      
      {/* 1. Identity Section */}
      <div className="space-y-5">
        <h3 className="text-[11px] font-black text-green-600 uppercase tracking-[0.2em] flex items-center gap-2">
          <span className="w-4 h-px bg-green-600"></span> 01. Identity
        </h3>
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="relative group">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-200 overflow-hidden flex-shrink-0 shadow-inner group-hover:border-green-400 transition-colors">
              {data.profileImage ? (
                <img src={data.profileImage} className="w-full h-full object-cover" alt="Profile" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 p-4">
                  <svg className="w-8 h-8 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-[8px] font-black uppercase text-center">Photo</span>
                </div>
              )}
            </div>
            <input type="file" id="file-upload" accept="image/*" onChange={handleImageUpload} className="hidden" />
            <label htmlFor="file-upload" className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-green-700 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
            </label>
          </div>
          <div className="flex-grow w-full space-y-4">
            <FormField label="Full Name" name="fullName" value={data.fullName} onChange={handleInputChange} required placeholder="e.g. John Doe" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <FormField label="Organization" name="organizationName" value={data.organizationName} readOnly className="bg-slate-50 opacity-60" />
               <FormField label="Status" name="subTitle" value={data.subTitle} readOnly className="bg-slate-50 opacity-60" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Academic Section */}
      <div className="space-y-5">
        <h3 className="text-[11px] font-black text-green-600 uppercase tracking-[0.2em] flex items-center gap-2">
          <span className="w-4 h-px bg-green-600"></span> 02. Professional Info
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Department" name="department" value={data.department} onChange={handleInputChange} required placeholder="e.g. Computer Engineering" />
          <FormField label="Level" name="level" value={data.level} onChange={handleInputChange} placeholder="e.g. 400 Level" />
          <FormField label="Primary Role" name="business" value={data.business} onChange={handleInputChange} placeholder="e.g. Frontend Developer" />
          <FormField label="Brand/Alias" name="brandName" value={data.brandName} onChange={handleInputChange} placeholder="e.g. The Code Wizard" />
        </div>
      </div>

      {/* 3. Personal Section */}
      <div className="space-y-5">
        <h3 className="text-[11px] font-black text-green-600 uppercase tracking-[0.2em] flex items-center gap-2">
          <span className="w-4 h-px bg-green-600"></span> 03. About You
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Hobbies" name="hobby" value={data.hobby} onChange={handleInputChange} placeholder="e.g. Chess & Bass Guitar" />
          <FormField label="Info Snippet" name="personality" value={data.personality} onChange={handleInputChange} placeholder="e.g. Team Player / Leader" />
          <div className="sm:col-span-2">
            <FormField label="Current Tech Focus" name="techStory" value={data.techStory} onChange={handleInputChange} placeholder="e.g. Mastering Machine Learning with Python" />
          </div>
        </div>
      </div>

      {/* 4. Inspiration Section */}
      <div className="space-y-5">
        <h3 className="text-[11px] font-black text-green-600 uppercase tracking-[0.2em] flex items-center gap-2">
          <span className="w-4 h-px bg-green-600"></span> 04. Inspiration
        </h3>
        <div className="space-y-2">
          <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">
            Motivation Text <span className="text-red-500">*</span>
          </label>
          <textarea 
            name="motivationText" 
            value={data.motivationText} 
            onChange={handleInputChange} 
            rows={4}
            placeholder="A short quote or sentence about what keeps you going..."
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm italic focus:ring-2 focus:ring-green-500 focus:bg-white outline-none transition-all shadow-inner" 
          ></textarea>
        </div>
      </div>

      {/* 5. Connect Section */}
      <div className="space-y-5">
        <h3 className="text-[11px] font-black text-green-600 uppercase tracking-[0.2em] flex items-center gap-2">
          <span className="w-4 h-px bg-green-600"></span> 05. Connect
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <span className="absolute left-3 top-[34px] text-slate-400 text-xs font-bold">@</span>
            <FormField label="Instagram" name="instagramHandle" value={data.instagramHandle} onChange={handleInputChange} placeholder="username" className="pl-7" />
          </div>
          <div className="relative">
            <span className="absolute left-3 top-[34px] text-slate-400 text-xs font-bold">@</span>
            <FormField label="TikTok" name="tiktokHandle" value={data.tiktokHandle} onChange={handleInputChange} placeholder="username" className="pl-7" />
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-slate-100">
        <FormField label="Graphic Authentication" name="signatureText" value={data.signatureText} readOnly className="bg-slate-50 opacity-60 border-dashed" />
      </div>
    </div>
  );
};

const FormField = ({ label, name, value, onChange, required = false, placeholder = "", readOnly = false, className = "" }: any) => (
  <div className="space-y-2">
    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input 
      type="text" 
      name={name} 
      value={value} 
      onChange={onChange} 
      placeholder={placeholder}
      readOnly={readOnly}
      className={`w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-green-500 focus:bg-white outline-none transition-all ${className}`} 
    />
  </div>
);

export default Form;