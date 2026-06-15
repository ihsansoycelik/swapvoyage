
import React, { useMemo } from 'react';
import { Place } from '../types';
import { getImageUrl, GENERIC_FALLBACK_IMAGE } from '../services/imageService';

interface GezmisimListProps {
  visited: Place[];
  onShowMap: (focusPlace?: Place) => void;
}

const getCity = (location: string) => location?.split(',')[0].trim() || 'Diğer';

const relativeDate = (ts?: number): string => {
  if (!ts) return '';
  const diff = Date.now() - ts;
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'Bugün';
  if (days === 1) return 'Dün';
  if (days < 7) return `${days} gün önce`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks} hafta önce`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} ay önce`;
  return `${Math.floor(months / 12)} yıl önce`;
};

export const GezmisimList: React.FC<GezmisimListProps> = ({ visited, onShowMap }) => {
  const groupedByCity = useMemo(() => {
    const groups: Record<string, Place[]> = {};
    visited.forEach(p => {
      const city = getCity(p.location);
      if (!groups[city]) groups[city] = [];
      groups[city].push(p);
    });
    return groups;
  }, [visited]);

  const sortedCities = useMemo(() => Object.keys(groupedByCity).sort(), [groupedByCity]);

  if (visited.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center px-10 opacity-40 h-full pb-32">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-9 h-9 text-white/30">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="font-serif text-lg italic text-gray-900 dark:text-white">Henüz hiçbir yeri gezmediniz.</p>
        <p className="text-[10px] text-gray-500 dark:text-white/40 mt-2 uppercase tracking-widest leading-loose">
          Listemden bir mekana<br/>uzun basıp "Gezdim!" de.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-full pb-32 pt-6 flex flex-col overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="px-6 mb-6 flex items-end justify-between">
        <div>
          <h2 className="font-serif text-4xl font-bold text-white tracking-tight">Geçmişim</h2>
          <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mt-2">
            {visited.length} yer gezildi
          </p>
        </div>
        <button
          onClick={() => onShowMap()}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/10 rounded-full text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/15 transition-all active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
            <path fillRule="evenodd" d="M8.161 2.58a1.875 1.875 0 011.678 0l4.993 2.498c.106.052.23.052.336 0l3.869-1.935A1.875 1.875 0 0121.75 4.82v12.485c0 .71-.401 1.36-1.037 1.677l-4.875 2.437a1.875 1.875 0 01-1.676 0l-4.994-2.497a.375.375 0 00-.336 0l-3.868 1.935A1.875 1.875 0 012.25 19.18V6.695c0-.71.401-1.36 1.036-1.677l4.875-2.437zM9 6a.75.75 0 01.75.75V15a.75.75 0 01-1.5 0V6.75A.75.75 0 019 6zm6.75 3a.75.75 0 00-1.5 0v8.25a.75.75 0 001.5 0V9z" clipRule="evenodd" />
          </svg>
          Haritayı Gör
        </button>
      </div>

      {/* City-grouped list */}
      <div className="space-y-10 px-4 pb-4">
        {sortedCities.map(city => (
          <div key={city}>
            <div className="flex items-center gap-3 px-2 mb-4">
              <span className="w-1 h-5 bg-white/20 rounded-full" />
              <h3 className="font-serif text-2xl font-bold text-gray-200">{city}</h3>
              <span className="text-[9px] font-black text-white/30 uppercase mt-1">
                {groupedByCity[city].length} MEKAN
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {groupedByCity[city].map(place => (
                <div key={place.id} className="flex items-center gap-3 px-2">
                  <div className="w-[60px] h-[60px] flex-shrink-0 rounded-xl overflow-hidden bg-white/5">
                    <img
                      src={place.images?.[0] ? getImageUrl(place.images[0], 0) : GENERIC_FALLBACK_IMAGE}
                      alt={place.name}
                      className="w-full h-full object-cover"
                      onError={e => { e.currentTarget.src = GENERIC_FALLBACK_IMAGE; }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-serif font-bold text-sm text-white leading-tight line-clamp-1">{place.name}</p>
                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider mt-0.5">{place.location}</p>
                    {place.visitedAt ? (
                      <p className="text-[10px] text-emerald-400/70 mt-0.5">{relativeDate(place.visitedAt)}</p>
                    ) : null}
                  </div>

                  {place.coordinates ? (
                    <button
                      onClick={() => onShowMap(place)}
                      className="flex-shrink-0 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-[9px] font-black uppercase tracking-wider hover:bg-emerald-500/20 transition-all active:scale-95"
                    >
                      Haritada
                    </button>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
