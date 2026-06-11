import React, { useState, useEffect } from 'react';
import { FilterState } from '../types';

interface CityFilterProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterState) => void;
  currentFilters: FilterState;
}

const DEFAULT_CITIES = [
  "İstanbul", "Antalya", "İzmir", "Muğla", "Nevşehir", 
  "Bursa", "Antakya", "Mardin", "Rize", "Çanakkale"
];

// IDs match Onboarding INTERESTS exactly so user selections persist across both
const CATEGORIES = [
  { id: 'Doğa', label: 'Doğa & Yayla', icon: '🌲' },
  { id: 'Tarih', label: 'Tarihi Yapılar', icon: '🏰' },
  { id: 'Antik Kent', label: 'Antik Kentler', icon: '🏛️' },
  { id: 'Gastronomi', label: 'Gastronomi', icon: '🍽️' },
  { id: 'Deniz', label: 'Deniz & Koylar', icon: '🌊' },
  { id: 'Müze', label: 'Müze & Sanat', icon: '🎨' },
  { id: 'Macera', label: 'Macera', icon: '🧗' },
  { id: 'Sessizlik', label: 'Huzur & Sessizlik', icon: '🧘' },
];

export const CityFilter: React.FC<CityFilterProps> = ({ isOpen, onClose, onApplyFilters, currentFilters }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'denied' | 'error'>('idle');
  const [shouldRender, setShouldRender] = useState(isOpen);
  
  // Local state for categories before applying
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Handle render delay for exit animation & sync state
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setSearchTerm(currentFilters.location && !currentFilters.location.startsWith('COORDS:') ? currentFilters.location : '');
      setSelectedCategories(currentFilters.categories || []);
      setLocationStatus('idle'); // Reset status on open
    } else {
      const timer = setTimeout(() => setShouldRender(false), 400); 
      return () => clearTimeout(timer);
    }
  }, [isOpen, currentFilters]);

  const filteredCities = DEFAULT_CITIES.filter(city => 
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleCategory = (catId: string) => {
    setSelectedCategories(prev => 
      prev.includes(catId) ? prev.filter(id => id !== catId) : [...prev, catId]
    );
  };

  const handleApply = (locationOverride?: string | null) => {
    // If explicit null is passed, clear location. If string, use it. If undefined, use searchTerm.
    let finalLocation = locationOverride;
    if (locationOverride === undefined) {
       finalLocation = searchTerm.trim() || null;
    }

    onApplyFilters({
      location: finalLocation,
      categories: selectedCategories
    });
    onClose();
  };

  const handleReset = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    handleApply(null);
  };

  const handleUseLocation = () => {
    setLocationStatus('loading');

    if (!navigator.geolocation) {
      setLocationStatus('error');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = `COORDS:${position.coords.latitude},${position.coords.longitude}`;
        handleApply(coords);
        setLocationStatus('idle');
      },
      (error) => {
        console.error("Geolocation error:", error);
        if (error.code === error.PERMISSION_DENIED) {
          setLocationStatus('denied');
        } else {
          setLocationStatus('error');
        }
      },
      { timeout: 15000, maximumAge: 60000, enableHighAccuracy: true }
    );
  };

  if (!shouldRender) return null;

  return (
    <div className={`absolute inset-0 z-[80] ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] ${isOpen ? 'opacity-100' : 'opacity-0'}`} 
        onClick={onClose}
      />
      
      {/* Dropdown Menu */}
      <div className="absolute top-14 left-0 right-0 px-3 pt-2 h-[calc(100%-4rem)] pointer-events-none">
        <div className={`
          bg-white dark:bg-brand-dark-card rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-brand-dark-border
          flex flex-col max-h-full w-full pointer-events-auto
          transition-all duration-400 ease-[cubic-bezier(0.19,1,0.22,1)] origin-top
          ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95'}
        `}>
          
          {/* Header */}
          <div className="p-4 border-b border-gray-100 dark:border-brand-dark-border flex justify-between items-center bg-gray-50/50 dark:bg-brand-dark-bg/30">
            <span className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">Filtrele</span>
            
            {/* Reset Button Always Visible */}
            <button 
              onClick={handleReset}
              className="text-xs font-bold text-brand-purple dark:text-brand-lavender hover:underline px-2 py-1"
            >
              Sıfırla
            </button>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar">
            
            {/* Categories Section (New MVP Feature) */}
            <div className="p-4 border-b border-gray-100 dark:border-brand-dark-border">
              <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-3">İlgi Alanları</span>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => {
                   const isActive = selectedCategories.includes(cat.id);
                   return (
                     <button
                       key={cat.id}
                       onClick={() => toggleCategory(cat.id)}
                       className={`px-4 py-2.5 rounded-2xl text-xs font-bold border transition-all active:scale-95 flex items-center gap-1.5
                         ${isActive 
                           ? 'bg-brand-purple text-white border-brand-purple shadow-md shadow-brand-purple/20 scale-105' 
                           : 'bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-400 border-transparent hover:border-brand-purple/30'
                         }`}
                     >
                       <span className={isActive ? 'opacity-100' : 'opacity-70'}>{cat.icon}</span>
                       <span>{cat.label}</span>
                     </button>
                   );
                })}
              </div>
            </div>

            {/* Location Section */}
            <div className="p-4">
               <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-3">Konum</span>
                <form onSubmit={(e) => { e.preventDefault(); handleApply(); }} className="relative group mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" 
                       className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 transition-transform duration-200 group-focus-within:scale-110">
                     <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                  </svg>
                  <input 
                    type="text" 
                    placeholder="Şehir ara..." 
                    className="w-full bg-gray-100 dark:bg-brand-dark-bg rounded-xl py-3 pl-10 pr-10 text-base font-medium text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-purple/20 transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <button 
                      type="button"
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                      </svg>
                    </button>
                  )}
                </form>

                {/* Location Options */}
                <button 
                  onClick={handleUseLocation}
                  disabled={locationStatus === 'loading'}
                  className="w-full px-4 py-3 flex items-center gap-3 bg-blue-50/50 dark:bg-blue-900/10 rounded-xl mb-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-left border border-transparent hover:border-blue-200 dark:hover:border-blue-800"
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0
                    ${currentFilters.location?.startsWith('COORDS') ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-500 dark:bg-blue-800 dark:text-blue-300'}`}>
                     {locationStatus === 'loading' ? (
                       <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                     ) : (
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                         <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                       </svg>
                     )}
                  </div>
                  <span className="text-sm font-bold text-blue-700 dark:text-blue-300">Yakınımda Ara</span>
                </button>

                 {/* Popular Cities */}
                 <div className="space-y-1">
                   {filteredCities.slice(0, 5).map(city => (
                     <button
                       key={city}
                       onClick={() => handleApply(city)}
                       className="w-full text-left px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium"
                     >
                       {city}
                     </button>
                   ))}
                 </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="p-4 border-t border-gray-100 dark:border-brand-dark-border bg-white dark:bg-brand-dark-card z-10">
            <button 
              onClick={() => handleApply()}
              className="w-full py-3.5 bg-brand-purple text-white font-bold rounded-xl shadow-lg hover:bg-brand-purple/90 active:scale-95 transition-all text-sm"
            >
              Uygula ({selectedCategories.length > 0 ? `${selectedCategories.length} Kategori` : 'Tümü'})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};