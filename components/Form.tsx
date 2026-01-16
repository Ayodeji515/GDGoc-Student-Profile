
import React from 'react';
import { SOTMData, defaultData } from '../types.ts';

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
    if (confirm("Reset all form data?")) {
      onChange(defaultData);
    }
  };

  return (
    <div className="space-y-6 md:space-y-8 p-5 md:p-8 bg-white rounded-2xl md:rounded-[2.5rem] shadow-sm border border-slate-200">
      <div className="flex justify-between items-center border-b border-slate-100 pb-4">
        <h2 className="text-lg md:text-xl font-black text-slate-800 tracking-tight">Configuration</h2>
        <button 
          onClick={handleReset}
          className="text-[10px] font-bold text-slate-400 hover:text-red-500 uppercase tracking-widest transition-colors"
        >
          Reset
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        {/* Profile Section */}
        <div className="col-span-1 sm:col-span-2">
          <label className="block text-[10px] md:text-[11px] font-black text-slate-500 uppercase tracking-widest mb-3">
            Profile Portrait <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-slate-50 border-2 border-slate-200 overflow-hidden flex-shrink-0 shadow-inner">
              {data.profileImage ? (
                <img src={data.profileImage} className="w-full h-full object-cover" alt="Profile" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-300">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
            <div className="w-full">
              <input 
                type="file" 
                id="file-upload"
                accept="image/*" 
                onChange={handleImageUpload}
                className="hidden"
              />
              <label 
                htmlFor="file-upload"
                className="w-full flex items-center justify-center py-3 px-6 bg-slate-900 hover:bg-black text-white rounded-xl text-[10px] font-bold uppercase tracking-widest cursor-pointer transition-all shadow-md"
              >
                Choose Image
              </label>
              <p className="mt-2 text-[9px] text-slate-400 text-center sm:text-left">Recommended: Square format</p>
            </div>
          </div>
        </div>

        {/* Text Fields */}
        <div className="col-span-1 sm:col-span-2">
          <FormField label="Full Name" name="fullName" value={data.fullName} onChange={handleInputChange} required />
        </div>

        <FormField label="Organization" name="organizationName" value={data.organizationName} onChange={handleInputChange} placeholder="Google Developer Groups" />
        <FormField label="Chapter/Subtitle" name="subTitle" value={data.subTitle} onChange={handleInputChange} placeholder="Community Member" />
        <FormField label="Department" name="department" value={data.department} onChange={handleInputChange} required placeholder="Computer Science" />
        <FormField label="Level" name="level" value={data.level} onChange={handleInputChange} placeholder="300 Level" />
        <FormField label="Role" name="business" value={data.business} onChange={handleInputChange} placeholder="UI/UX Designer" />
        <FormField label="Brand/Nickname" name="brandName" value={data.brandName} onChange={handleInputChange} placeholder="Creative Mind" />
        <FormField label="Hobby" name="hobby" value={data.hobby} onChange={handleInputChange} placeholder="Coding & Music" />
        <FormField label="Personality" name="personality" value={data.personality} onChange={handleInputChange} placeholder="Introvert / Leader" />

        <div className="col-span-1 sm:col-span-2">
          <label className="block text-[10px] md:text-[11px] font-black text-slate-500 uppercase tracking-widest mb-1.5">
            Tech Story
          </label>
          <input 
            type="text"
            name="techStory" 
            value={data.techStory} 
            onChange={handleInputChange} 
            placeholder="Learning React & Flutter"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-green-500 outline-none transition-all" 
          />
        </div>

        <div className="col-span-1 sm:col-span-2">
          <label className="block text-[10px] md:text-[11px] font-black text-slate-500 uppercase tracking-widest mb-1.5">
            Motivation Text <span className="text-red-500">*</span>
          </label>
          <textarea 
            name="motivationText" 
            value={data.motivationText} 
            onChange={handleInputChange} 
            rows={3}
            placeholder="What drives you to learn more?"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm italic focus:ring-2 focus:ring-green-500 outline-none transition-all" 
          ></textarea>
        </div>

        <div className="col-span-1 sm:col-span-2 pt-4 border-t border-slate-50">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Instagram" name="instagramHandle" value={data.instagramHandle} onChange={handleInputChange} placeholder="username" />
            <FormField label="TikTok" name="tiktokHandle" value={data.tiktokHandle} onChange={handleInputChange} placeholder="username" />
          </div>
        </div>

        <div className="col-span-1 sm:col-span-2 pt-4">
          <FormField label="Signature / Credits" name="signatureText" value={data.signatureText} onChange={handleInputChange} />
        </div>
      </div>
    </div>
  );
};

const FormField = ({ label, name, value, onChange, required = false, placeholder = "" }: any) => (
  <div className="space-y-1.5">
    <label className="block text-[10px] md:text-[11px] font-black text-slate-500 uppercase tracking-widest">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input 
      type="text" 
      name={name} 
      value={value} 
      onChange={onChange} 
      placeholder={placeholder}
      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-green-500 outline-none transition-all" 
    />
  </div>
);

export default Form;
