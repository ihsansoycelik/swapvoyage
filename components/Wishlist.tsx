
import React, { useState, useMemo } from 'react';
import { Place } from '../types';
import { PlaceCard } from './PlaceCard';
import { RouteFlow } from './RouteFlow';
import { logAnalyticsEvent } from '../services/analyticsService';
import { getImageUrl, GENERIC_FALLBACK_IMAGE } from '../services/imageService';

interface WishlistProps {
  items: Place[];
  onRemove: (id: string) => void;
  onMarkVisited: (place: Place) => void;
  visitedIds: Set<string>;
}

export const Wishlist: React.FC<WishlistProps> = ({ items, onRemove, onMarkVisited, visitedIds }) => {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [longPressActive, setLongPressActive] = useState<Place | null>(null);
  const longPressTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isLongPressTriggered, setIsLongPressTriggered] = useState(false);
  const [noCoordsBanner, setNoCoordsBanner] = useState(false);

  const startPress = (place: Place) => {
    setIsLongPressTriggered(false);
    longPressTimeoutRef.current = setTimeout(() => {
      setLongPressActive(place);
      setIsLongPressTriggered(true);
    }, 600);
  };

  const endPress = (place: Place, e: React.MouseEvent | React.TouchEvent) => {
    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current);
      longPressTimeoutRef.current = null;
    }
  };

  const handleCardClick = (place: Place, e: React.MouseEvent) => {
    if (isLongPressTriggered) {
      e.preventDefault();
      e.stopPropagation();
      setIsLongPressTriggered(false);
    } else {
      setSelectedPlace(place);
    }
  };
  
  // Route Flow State
  const [isRouteFlowOpen, setIsRouteFlowOpen] = useState(false);
  const [routeCity, setRouteCity] = useState('');
  const [routePlaces, setRoutePlaces] = useState<Place[]>([]);

  // Lokasyon stringinden şehir ismini çeken yardımcı fonksiyon
  const getCity = (location: string) => {
    if (!location) return "Diğer";
    return location.split(',')[0].trim();
  };

  // Mekanları şehirlere göre grupla
  const groupedItems = useMemo(() => {
    const groups: Record<string, Place[]> = {};
    items.forEach(item => {
      const city = getCity(item.location);
      if (!groups[city]) groups[city] = [];
      groups[city].push(item);
    });
    return groups;
  }, [items]);

  const sortedCities = useMemo(() => Object.keys(groupedItems).sort(), [groupedItems]);

  const handleStartRouteFlow = (city: string, cityItems: Place[]) => {
    if (cityItems.length === 0) return;
    logAnalyticsEvent('route_generated', { placeCount: cityItems.length });
    
    // Filter out places without coordinates for safety
    const validItems = cityItems.filter(p => p.coordinates);
    if (validItems.length === 0) {
      setNoCoordsBanner(true);
      setTimeout(() => setNoCoordsBanner(false), 3000);
      return;
    }

    setRouteCity(city);
    setRoutePlaces(validItems);
    setIsRouteFlowOpen(true);
  };

  return (
    <>
    <div className="bg-transparent min-h-full pb-32 pt-6 flex flex-col h-full overflow-y-auto no-scrollbar">
      {/* No-coordinates toast */}
      {noCoordsBanner && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[300] px-4 py-2 bg-red-500/90 backdrop-blur-sm text-white text-xs font-bold rounded-full shadow-lg animate-fade-in">
          Bu şehirdeki mekanların koordinat bilgisi eksik
        </div>
      )}
      {/* Route Wizard Modal */}
      <RouteFlow
        isOpen={isRouteFlowOpen} 
        onClose={() => setIsRouteFlowOpen(false)} 
        places={routePlaces} 
        cityName={routeCity} 
      />

      {/* Başlık */}
      <div className="px-6 mb-8">
        <h2 className="font-serif text-4xl font-bold text-gray-900 dark:text-white tracking-tight">Koleksiyon</h2>
        <p className="text-gray-500 dark:text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mt-2">
          {items.length} Kayıtlı Mekan / {sortedCities.length} Bölge
        </p>
      </div>
      
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 text-center px-10 opacity-40 py-20">
          <div className="w-20 h-20 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-9 h-9 text-gray-400 dark:text-white/30">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </div>
          <p className="font-serif text-lg italic text-gray-900 dark:text-white">Seyahat listeniz boş görünüyor.</p>
          <p className="text-[10px] text-gray-500 mt-2 uppercase tracking-widest leading-loose">Keşfetmeye başla ve beğendiklerini<br/>sağa kaydırarak buraya ekle.</p>
        </div>
      ) : (
        <div className="space-y-12 pb-10">
          {sortedCities.map(city => (
            <div key={city} className="px-4">
              {/* Şehir Başlığı ve Rota Butonu */}
              <div className="flex justify-between items-end px-2 mb-4">
                <div className="flex items-center gap-3">
                    <span className="w-1 h-5 bg-white/20 dark:bg-white/10 rounded-full"></span>
                    <h3 className="font-serif text-2xl font-bold text-gray-800 dark:text-gray-200">{city}</h3>
                    <span className="text-[9px] font-black text-white/30 uppercase mt-1">
                        {groupedItems[city].length} MEKAN
                    </span>
                </div>
                
                {groupedItems[city].length > 1 && (
                    <button 
                        onClick={() => handleStartRouteFlow(city, groupedItems[city])}
                        className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 text-white rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95"
                    >
                        ROTA ÇİZ
                    </button>
                )}
              </div>

              {/* Şehir İçindeki Mekanlar Izgarası */}
              <div className="grid grid-cols-2 gap-3">
                {groupedItems[city].map((place) => (
                  <div 
                    key={place.id} 
                    className="relative group cursor-pointer select-none"
                    onClick={(e) => handleCardClick(place, e)}
                    onMouseDown={() => startPress(place)}
                    onMouseUp={(e) => endPress(place, e)}
                    onMouseLeave={(e) => endPress(place, e)}
                    onTouchStart={() => startPress(place)}
                    onTouchEnd={(e) => endPress(place, e)}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setLongPressActive(place);
                    }}
                  >
                    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gray-200 dark:bg-white/5 shadow-lg border border-white/5 group-hover:border-white/20 transition-all">
                        <img
                          src={place.images?.[0] ? getImageUrl(place.images[0], 0) : GENERIC_FALLBACK_IMAGE}
                          alt={place.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          onError={(e) => {
                            e.currentTarget.src = GENERIC_FALLBACK_IMAGE;
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
                        
                        <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                           <h3 className="font-serif font-bold text-xs leading-tight line-clamp-2 drop-shadow-md">{place.name}</h3>
                        </div>

                        {/* Silme Butonu */}
                        <button
                          onClick={(e) => { e.stopPropagation(); onRemove(place.id); }}
                          className="absolute top-2 right-2 p-2 bg-black/30 backdrop-blur-md rounded-full text-white/60 hover:bg-red-500 hover:text-white transition-all transform active:scale-90"
                          aria-label="Sil"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3"><path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4z" clipRule="evenodd" /></svg>
                        </button>

                        {/* Visited Badge */}
                        {visitedIds.has(place.id) && (
                          <div className="absolute top-2 left-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg border border-black/20">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-3.5 h-3.5">
                              <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>

    {/* Place detail overlay — outside scroll container so scroll offset doesn't shift it */}
    {selectedPlace && (
      <div className="absolute inset-0 z-[120] animate-in slide-in-from-bottom-10 fade-in duration-300">
        <PlaceCard
          place={selectedPlace}
          mode="VIEW"
          onClose={() => setSelectedPlace(null)}
          onRemove={() => { onRemove(selectedPlace.id); setSelectedPlace(null); }}
          onMarkVisited={() => { onMarkVisited(selectedPlace); setSelectedPlace(null); }}
        />
      </div>
    )}

    {/* Long-press Overlay Menu */}
    {longPressActive && (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[200] flex items-center justify-center p-6 animate-in fade-in duration-300" onClick={() => setLongPressActive(null)}>
        <div className="bg-[#1c1c1e] border border-white/10 rounded-3xl w-full max-w-xs overflow-hidden shadow-2xl p-5 text-center space-y-4 animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
          <h4 className="font-serif text-lg font-bold text-white leading-snug">{longPressActive.name}</h4>
          <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-[0.2em]">{longPressActive.location}</p>

          <div className="flex flex-col gap-2 pt-2">
            <button
              onClick={() => {
                onMarkVisited(longPressActive);
                setLongPressActive(null);
              }}
              className="w-full py-3 bg-brand-purple hover:bg-brand-purple/90 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all active:scale-95 flex items-center justify-center gap-1.5"
            >
              Gezdim! ✓
            </button>
            <button
              onClick={() => {
                onRemove(longPressActive.id);
                setLongPressActive(null);
              }}
              className="w-full py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl text-xs font-black uppercase tracking-wider transition-all active:scale-95"
            >
              Listeden Çıkar
            </button>
            <button
              onClick={() => setLongPressActive(null)}
              className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-bold transition-all active:scale-95"
            >
              Vazgeç
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
};
