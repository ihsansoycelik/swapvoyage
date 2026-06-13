import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Place } from '../types';
import { getImageUrl, GENERIC_FALLBACK_IMAGE } from '../services/imageService';

interface JourneyMapProps {
  wishlist: Place[];
  visited: Place[];
  focusPlace?: Place | null;
  onClose?: () => void;
}

const cityToRegion: Record<string, string> = {
  // Marmara
  'İstanbul': 'Marmara', 'Edirne': 'Marmara', 'Kırklareli': 'Marmara', 'Tekirdağ': 'Marmara', 'Çanakkale': 'Marmara', 'Kocaeli': 'Marmara', 'Yalova': 'Marmara', 'Sakarya': 'Marmara', 'Bilecik': 'Marmara', 'Bursa': 'Marmara', 'Balıkesir': 'Marmara',
  // Ege
  'İzmir': 'Ege', 'Manisa': 'Ege', 'Aydın': 'Ege', 'Muğla': 'Ege', 'Denizli': 'Ege', 'Uşak': 'Ege', 'Kütahya': 'Ege', 'Afyonkarahisar': 'Ege', 'Afyon': 'Ege',
  // Akdeniz
  'Antalya': 'Akdeniz', 'Isparta': 'Akdeniz', 'Burdur': 'Akdeniz', 'Mersin': 'Akdeniz', 'Adana': 'Akdeniz', 'Hatay': 'Akdeniz', 'Osmaniye': 'Akdeniz', 'Kahramanmaraş': 'Akdeniz',
  // İç Anadolu
  'Ankara': 'İç Anadolu', 'Konya': 'İç Anadolu', 'Karaman': 'İç Anadolu', 'Aksaray': 'İç Anadolu', 'Kırıkkale': 'İç Anadolu', 'Kırşehir': 'İç Anadolu', 'Nevşehir': 'İç Anadolu', 'Niğde': 'İç Anadolu', 'Yozgat': 'İç Anadolu', 'Çankırı': 'İç Anadolu', 'Sivas': 'İç Anadolu', 'Eskişehir': 'İç Anadolu', 'Kayseri': 'İç Anadolu',
  // Karadeniz
  'Zonguldak': 'Karadeniz', 'Karabük': 'Karadeniz', 'Bartın': 'Karadeniz', 'Kastamonu': 'Karadeniz', 'Sinop': 'Karadeniz', 'Samsun': 'Karadeniz', 'Ordu': 'Karadeniz', 'Giresun': 'Karadeniz', 'Trabzon': 'Karadeniz', 'Rize': 'Karadeniz', 'Artvin': 'Karadeniz', 'Gümüşhane': 'Karadeniz', 'Bayburt': 'Karadeniz', 'Çorum': 'Karadeniz', 'Amasya': 'Karadeniz', 'Tokat': 'Karadeniz', 'Bolu': 'Karadeniz', 'Düzce': 'Karadeniz',
  // Doğu Anadolu
  'Erzurum': 'Doğu Anadolu', 'Erzincan': 'Doğu Anadolu', 'Kars': 'Doğu Anadolu', 'Ardahan': 'Doğu Anadolu', 'Iğdır': 'Doğu Anadolu', 'Ağrı': 'Doğu Anadolu', 'Muş': 'Doğu Anadolu', 'Bingöl': 'Doğu Anadolu', 'Tunceli': 'Doğu Anadolu', 'Elazığ': 'Doğu Anadolu', 'Malatya': 'Doğu Anadolu', 'Hakkari': 'Doğu Anadolu', 'Van': 'Doğu Anadolu', 'Bitlis': 'Doğu Anadolu', 'Şırnak': 'Doğu Anadolu',
  // Güneydoğu Anadolu
  'Gaziantep': 'Güneydoğu / Doğu', 'Şanlıurfa': 'Güneydoğu / Doğu', 'Diyarbakır': 'Güneydoğu / Doğu', 'Mardin': 'Güneydoğu / Doğu', 'Batman': 'Güneydoğu / Doğu', 'Siirt': 'Güneydoğu / Doğu', 'Kilis': 'Güneydoğu / Doğu', 'Adıyaman': 'Güneydoğu / Doğu'
};

const getRegion = (city: string) => cityToRegion[city] || 'Diğer';

export const JourneyMap: React.FC<JourneyMapProps> = ({ wishlist, visited, focusPlace, onClose }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  // Compute stats
  const totalVisited = visited.length;
  const visitedCities = new Set(visited.map(p => p.location.split(',')[0].trim()));
  const visitedRegions = new Set(visited.map(p => getRegion(p.location.split(',')[0].trim())));
  const citiesCount = visitedCities.size;
  const regionsCount = visitedRegions.size;

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Center of Turkey
    const defaultCenter: L.LatLngExpression = [39.0, 35.5];
    const defaultZoom = 6;

    // Bounding box for Turkey to restrict panning
    const bounds = L.latLngBounds([33.5, 24.5], [43.5, 46.5]);

    const map = L.map(mapContainerRef.current, {
      center: defaultCenter,
      zoom: defaultZoom,
      minZoom: 5,
      maxZoom: 12,
      maxBounds: bounds,
      maxBoundsViscosity: 0.8,
      zoomControl: false,
    });

    mapRef.current = map;

    // Premium Dark Tile layer (CartoDB Dark Matter)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map);

    // Custom icons
    const hollowHeartIcon = L.divIcon({
      className: 'custom-heart-pin',
      html: `
        <div class="relative flex items-center justify-center transform -translate-y-4">
          <div class="w-8 h-8 rounded-full bg-black/85 border border-purple-500/40 flex items-center justify-center shadow-lg transition-transform active:scale-95">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="#a855f7" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </div>
          <div class="w-1.5 h-1.5 bg-purple-500 rounded-full border border-black absolute top-7.5"></div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });

    const filledCheckmarkIcon = L.divIcon({
      className: 'custom-checkmark-pin',
      html: `
        <div class="relative flex items-center justify-center transform -translate-y-4">
          <div class="w-8 h-8 rounded-full bg-black/85 border border-emerald-500/40 flex items-center justify-center shadow-lg transition-transform active:scale-95">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#10b981" class="w-4.5 h-4.5">
              <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-9.75 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="w-1.5 h-1.5 bg-emerald-500 rounded-full border border-black absolute top-7.5"></div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });

    const markers: L.Marker[] = [];

    // Helper: Add marker to map
    const addPlaceMarker = (place: Place, isVisited: boolean) => {
      if (!place.coordinates) return;

      const marker = L.marker([place.coordinates.lat, place.coordinates.lng], {
        icon: isVisited ? filledCheckmarkIcon : hollowHeartIcon
      }).addTo(map);

      const thumbUrl = place.images?.[0] ? getImageUrl(place.images[0], 0) : GENERIC_FALLBACK_IMAGE;

      const popupContent = `
        <div class="p-1 max-w-[150px] text-center select-none font-sans">
          <div class="w-full h-20 rounded-lg overflow-hidden bg-zinc-800 mb-1.5">
            <img src="${thumbUrl}" class="w-full h-full object-cover" onerror="this.src='${GENERIC_FALLBACK_IMAGE}'" />
          </div>
          <div class="font-serif font-bold text-xs text-white leading-tight">${place.name}</div>
          <div class="text-[8px] text-zinc-400 font-bold uppercase tracking-wider mt-1">${place.location}</div>
        </div>
      `;

      marker.bindPopup(popupContent, {
        closeButton: false,
        offset: L.point(0, -5)
      });

      markers.push(marker);
    };

    // Render Wishlist markers (only if they have coordinates)
    wishlist.forEach(p => addPlaceMarker(p, false));

    // Render Visited markers (only if they have coordinates)
    visited.forEach(p => addPlaceMarker(p, true));

    // If a focusPlace is provided, pan to it; otherwise fit all markers
    if (focusPlace?.coordinates) {
      map.setView([focusPlace.coordinates.lat, focusPlace.coordinates.lng], 11);
    } else if (markers.length > 0) {
      const group = L.featureGroup(markers);
      map.fitBounds(group.getBounds().pad(0.15));
    }

    return () => {
      map.remove();
    };
  }, [wishlist, visited, focusPlace]);

  return (
    <div className="w-full h-full relative flex flex-col bg-[#050505] text-white">
      {/* Custom popup dark styles injected locally */}
      <style dangerouslySetInnerHTML={{ __html: `
        .leaflet-popup-content-wrapper {
          background: rgba(20, 20, 20, 0.95) !important;
          color: white !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          backdrop-filter: blur(12px) !important;
          border-radius: 1.25rem !important;
          padding: 2px !important;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5) !important;
        }
        .leaflet-popup-tip {
          background: rgba(20, 20, 20, 0.95) !important;
          border: 1px solid rgba(255, 255, 255, 0.05) !important;
        }
        .leaflet-container {
          background: #050505 !important;
          font-family: inherit;
        }
      `}} />

      {/* Top Banner Stats */}
      <div className="absolute top-6 left-4 right-4 z-[100] pointer-events-none">
        <div className="w-full bg-black/75 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-xl text-center pointer-events-auto select-none max-w-md mx-auto">
          <div className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em] mb-1">YOLCULUK HARİTAM</div>
          <div className="font-serif text-sm font-medium text-white leading-relaxed">
            <span className="text-emerald-400 font-bold">{totalVisited}</span> gizli yer keşfettin · <span className="text-purple-400 font-bold">{citiesCount}</span> şehir · <span className="text-blue-400 font-bold">{regionsCount}</span> bölge
          </div>
        </div>
      </div>

      {/* Close button */}
      {onClose && (
        <button 
          onClick={onClose}
          className="absolute bottom-28 right-6 z-[100] p-3.5 bg-black/80 backdrop-blur-xl border border-white/10 rounded-full text-white shadow-lg active:scale-90 transition-transform"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {/* Map Container */}
      <div ref={mapContainerRef} className="w-full h-full z-10" />
    </div>
  );
};
