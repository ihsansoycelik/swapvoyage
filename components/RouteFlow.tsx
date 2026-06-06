
import React, { useState, useEffect } from 'react';
import { Place, DailyItinerary } from '../types';
import { optimizeRoute } from '../services/geminiService';

interface RouteFlowProps {
  isOpen: boolean;
  onClose: () => void;
  places: Place[];
  cityName: string;
}

type Step = 'DURATION' | 'METHOD' | 'MANUAL_SORT' | 'PREVIEW';

export const RouteFlow: React.FC<RouteFlowProps> = ({ isOpen, onClose, places, cityName }) => {
  const [step, setStep] = useState<Step>('DURATION');
  const [days, setDays] = useState(1);
  const [sortedPlaces, setSortedPlaces] = useState<Place[]>(places);
  const [itinerary, setItinerary] = useState<DailyItinerary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setStep('DURATION');
      setSortedPlaces(places);
      setDays(Math.min(places.length, 3)); // Default intelligent duration
    } else {
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, places]);

  const movePlace = (fromIndex: number, direction: 'up' | 'down') => {
    const toIndex = direction === 'up' ? fromIndex - 1 : fromIndex + 1;
    if (toIndex < 0 || toIndex >= sortedPlaces.length) return;
    const newPlaces = [...sortedPlaces];
    [newPlaces[fromIndex], newPlaces[toIndex]] = [newPlaces[toIndex], newPlaces[fromIndex]];
    setSortedPlaces(newPlaces);
  };

  const incrementRouteCount = () => {
    const current = parseInt(localStorage.getItem('kesif_route_count') || '0', 10);
    localStorage.setItem('kesif_route_count', String(current + 1));
  };

  const generateItinerary = async (useAI: boolean) => {
    setIsLoading(true);
    if (useAI) {
      const result = await optimizeRoute(places, days);
      setItinerary(result);
      incrementRouteCount();
      setStep('PREVIEW');
    } else {
      const perDay = Math.ceil(sortedPlaces.length / days);
      const result: DailyItinerary[] = [];
      for (let i = 0; i < days; i++) {
        const start = i * perDay;
        const chunk = sortedPlaces.slice(start, start + perDay);
        if (chunk.length > 0) result.push({ day: i + 1, places: chunk });
      }
      setItinerary(result);
      incrementRouteCount();
      setStep('PREVIEW');
    }
    setIsLoading(false);
  };

  const handleShare = async () => {
    const text = `🇹🇷 ${cityName} Rota Planım:\n\n` + 
      itinerary.map(d => `Gün ${d.day}:\n` + d.places.map(p => `• ${p.name}`).join('\n')).join('\n\n') +
      `\n\nKeşif App ile oluşturuldu.`;
    
    if (navigator.share) {
      try { await navigator.share({ title: `${cityName} Rotası`, text }); } catch (e) {}
    } else {
      navigator.clipboard.writeText(text);
      alert('Rota panoya kopyalandı!');
    }
  };

  const handleNavigate = () => {
    const allPlaces = itinerary.flatMap(d => d.places);
    if (allPlaces.length === 0) return;
    
    const destination = allPlaces[allPlaces.length - 1];
    const waypoints = allPlaces.slice(0, allPlaces.length - 1).map(p => `${p.coordinates?.lat},${p.coordinates?.lng}`).join('|');
    
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destination.coordinates?.lat},${destination.coordinates?.lng}&waypoints=${waypoints}&travelmode=driving`;
    window.open(url, '_blank');
  };

  if (!shouldRender) return null;

  return (
    <div className={`absolute inset-0 z-[150] flex items-center justify-center p-4 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div 
        className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} 
        onClick={onClose}
      />
      
      <div className={`
        bg-brand-dark-card w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl border border-white/10
        flex flex-col max-h-[90vh] transition-all duration-400 ease-[cubic-bezier(0.19,1,0.22,1)]
        ${isOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-90 translate-y-4 opacity-0'}
      `}>
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex justify-between items-center bg-black/40">
           <div>
             <h2 className="text-lg font-bold text-white font-serif">{cityName} Rotası</h2>
             <p className="text-[10px] text-white/50 uppercase tracking-widest">Adım {step === 'DURATION' ? '1' : step === 'METHOD' ? '2' : step === 'MANUAL_SORT' ? '2b' : '3'} / 3</p>
           </div>
           <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-white/60">✕</button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* ... (Existing Content, no changes needed inside logic, just verifying structure is safe for mobile view) ... */}
          {step === 'DURATION' && (
            <div className="space-y-8 py-4">
              <div className="text-center">
                <span className="text-6xl font-black text-white">{days}</span>
                <span className="text-xl text-white/50 ml-2 font-serif italic">Gün</span>
              </div>
              <input 
                type="range" min="1" max="7" value={days} 
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-purple"
              />
              <p className="text-center text-xs text-white/40">Kaç günlük bir seyahat planlıyorsun?</p>
              
              <button onClick={() => setStep('METHOD')} className="w-full py-4 bg-white text-black font-black rounded-xl uppercase tracking-widest text-xs hover:bg-gray-200 transition-colors">
                Devam Et
              </button>
            </div>
          )}

          {step === 'METHOD' && (
            <div className="space-y-4">
               <button 
                 onClick={() => setStep('MANUAL_SORT')}
                 className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4 hover:bg-white/10 transition-all group"
               >
                 <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">✋</div>
                 <div className="text-left">
                   <h3 className="font-bold text-white">Manuel Sıralama</h3>
                   <p className="text-xs text-white/50">Mekanları kendin sırala, sürükle ve bırak.</p>
                 </div>
               </button>

               <button 
                 onClick={() => generateItinerary(true)}
                 disabled={isLoading}
                 className="w-full p-5 bg-brand-purple/10 border border-brand-purple/20 rounded-2xl flex items-center gap-4 hover:bg-brand-purple/20 transition-all group"
               >
                 <div className="w-12 h-12 bg-brand-purple/20 text-brand-purple rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {isLoading ? <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"/> : '✨'}
                 </div>
                 <div className="text-left">
                   <h3 className="font-bold text-white">AI Optimize</h3>
                   <p className="text-xs text-white/50">Yapay zeka en kısa rotayı hesaplasın.</p>
                 </div>
               </button>
            </div>
          )}

          {step === 'MANUAL_SORT' && (
            <div className="flex flex-col h-full">
              <p className="text-xs text-white/40 mb-4 uppercase tracking-widest text-center">Okları kullanarak sırala</p>
              <div className="flex-1 space-y-2">
                {sortedPlaces.map((place, index) => (
                  <div
                    key={place.id}
                    className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3 transition-colors"
                  >
                    <span className="text-white/40 font-mono text-xs w-5 text-center shrink-0">{index + 1}</span>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-white text-sm truncate">{place.name}</h4>
                      <p className="text-[10px] text-white/40 truncate">{place.location}</p>
                    </div>
                    <div className="flex flex-col gap-1 shrink-0">
                      <button
                        onClick={() => movePlace(index, 'up')}
                        disabled={index === 0}
                        className="p-1.5 rounded-lg bg-white/5 text-white/60 hover:bg-white/15 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed active:scale-90 transition-all"
                        aria-label="Yukarı taşı"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                          <path fillRule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <button
                        onClick={() => movePlace(index, 'down')}
                        disabled={index === sortedPlaces.length - 1}
                        className="p-1.5 rounded-lg bg-white/5 text-white/60 hover:bg-white/15 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed active:scale-90 transition-all"
                        aria-label="Aşağı taşı"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                          <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => generateItinerary(false)} className="w-full mt-6 py-4 bg-white text-black font-black rounded-xl uppercase tracking-widest text-xs hover:bg-gray-200 transition-colors active:scale-95">
                Rotayı Oluştur
              </button>
            </div>
          )}

          {step === 'PREVIEW' && (
            <div className="space-y-6">
               <div className="space-y-6 relative">
                  <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-white/10" />
                  {itinerary.map((dayItem) => (
                    <div key={dayItem.day} className="relative">
                      <div className="flex items-center gap-3 mb-3">
                         <div className="w-10 h-10 bg-brand-purple text-black font-black flex items-center justify-center rounded-full text-xs z-10 shadow-lg border-2 border-[#1C1C1E]">
                           G{dayItem.day}
                         </div>
                         <h3 className="text-white font-serif italic text-lg">Gün {dayItem.day}</h3>
                      </div>
                      <div className="pl-12 space-y-3">
                        {dayItem.places.map((place, i) => (
                          <div key={place.id} className="p-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white/80 flex justify-between items-center">
                             <span>{place.name}</span>
                             {i < dayItem.places.length - 1 && <span className="text-[10px] text-white/30">↓ 🚗</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
               </div>
               
               <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10">
                  <button onClick={handleShare} className="flex flex-col items-center justify-center gap-1 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white"><path fillRule="evenodd" d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z" clipRule="evenodd" /></svg>
                     <span className="text-[9px] text-white/60 font-bold uppercase">Paylaş</span>
                  </button>
                  <button className="flex flex-col items-center justify-center gap-1 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors opacity-50 cursor-not-allowed">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white"><path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z" clipRule="evenodd" /></svg>
                     <span className="text-[9px] text-white/60 font-bold uppercase">Export</span>
                  </button>
                  <button onClick={handleNavigate} className="flex flex-col items-center justify-center gap-1 p-3 bg-brand-purple text-black rounded-xl hover:bg-brand-purple/90 transition-colors">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M8.161 2.58a1.875 1.875 0 011.678 0l4.993 2.498c.106.052.23.052.336 0l3.869-1.935A1.875 1.875 0 0121.75 4.82v12.485c0 .71-.401 1.36-1.037 1.677l-4.875 2.437a1.875 1.875 0 01-1.676 0l-4.994-2.497a.375.375 0 00-.336 0l-3.868 1.935A1.875 1.875 0 012.25 19.18V6.695c0-.71.401-1.36 1.036-1.677l4.875-2.437zM9 6a.75.75 0 01.75.75V15a.75.75 0 01-1.5 0V6.75A.75.75 0 019 6zm6.75 3a.75.75 0 00-1.5 0v8.25a.75.75 0 001.5 0V9z" clipRule="evenodd" /></svg>
                     <span className="text-[9px] font-black uppercase">Harita</span>
                  </button>
               </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
