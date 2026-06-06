
import React, { useState, useEffect } from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onOpenAdmin?: () => void;
  isAdmin?: boolean;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, isDarkMode, toggleDarkMode, onOpenAdmin, isAdmin = false }) => {
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div className={`absolute inset-0 z-[80] flex items-center justify-center p-4 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/30 backdrop-blur-[2px] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} 
        onClick={onClose}
      />

      {/* Modal */}
      <div className={`
        bg-white dark:bg-brand-dark-card w-full max-w-[320px] rounded-3xl p-6 relative z-10 shadow-2xl 
        transform transition-all duration-400 ease-[cubic-bezier(0.19,1,0.22,1)]
        ${isOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-90 translate-y-4 opacity-0'}
      `}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white transition-colors">Ayarlar</h2>
          <button 
            onClick={onClose} 
            className="p-2 bg-gray-50 dark:bg-brand-dark-bg rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-4">
           {/* Night Mode Toggle */}
           <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-brand-dark-bg rounded-2xl border border-gray-100/50 dark:border-brand-dark-border transition-colors">
             <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${isDarkMode ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-indigo-500 shadow-sm border border-gray-100'}`}>
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                     <path fillRule="evenodd" d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z" clipRule="evenodd" />
                   </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-gray-900 dark:text-white text-sm transition-colors">Gece Modu</span>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium transition-colors">Koyu tema görünümü</span>
                </div>
             </div>
             
             <button 
               onClick={toggleDarkMode}
               className={`w-11 h-6 rounded-full transition-colors relative duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-brand-purple/20 ${isDarkMode ? 'bg-brand-purple' : 'bg-gray-200 dark:bg-gray-700'}`}
             >
                <div className={`w-4 h-4 bg-white rounded-full shadow-sm absolute top-1 transition-all duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] ${isDarkMode ? 'left-6' : 'left-1'}`} />
             </button>
           </div>

           {/* Admin Mode Toggle — only visible to admin users */}
           {onOpenAdmin && isAdmin && (
             <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-brand-dark-bg rounded-2xl border border-gray-100/50 dark:border-brand-dark-border transition-colors cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800" onClick={onOpenAdmin}>
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-black text-white shadow-md">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                       <path fillRule="evenodd" d="M2.24 6.8a.75.75 0 001.06-.04l1.95-2.1v8.59a.75.75 0 001.5 0V4.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0L2.2 5.74a.75.75 0 00.04 1.06zm8 6.4a.75.75 0 00-.04 1.06l3.25 3.5a.75.75 0 001.1 0l3.25-3.5a.75.75 0 10-1.1-1.02l-1.95 2.1V6.75a.75.75 0 00-1.5 0v8.59l-1.95-2.1a.75.75 0 00-1.06-.04z" clipRule="evenodd" />
                     </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900 dark:text-white text-sm transition-colors">Admin Panel</span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium transition-colors">İçerik Yönetimi</span>
                  </div>
               </div>
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-400"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
             </div>
           )}
           
           <div className="pt-2">
             <p className="text-[10px] text-center text-gray-400 dark:text-gray-600 font-medium uppercase tracking-wide transition-colors">
               Keşif v1.2.0
             </p>
           </div>
        </div>
      </div>
    </div>
  );
};
