
import React, { useState, useEffect, useRef } from 'react';
import { Place } from '../types';
import { generateImage } from '../services/geminiService';
import { getImageUrl, GENERIC_FALLBACK_IMAGE } from '../services/imageService';

interface PlaceCardProps {
  place: Place;
  onLike?: () => void;
  onPass?: () => void;
  onUndo?: () => void;
  mode?: 'SWIPE' | 'VIEW';
  onClose?: () => void;
  onRemove?: () => void;
  canUndo?: boolean;
}

// --- Constants ---
const SWIPE_THRESHOLD = 110;

// --- Helper: Premium Haptics ---
const triggerHaptic = (type: 'selection' | 'impact' | 'light' | 'success' | 'warning') => {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    switch (type) {
      case 'selection': navigator.vibrate(8); break;
      case 'light': navigator.vibrate(5); break;
      case 'impact': navigator.vibrate(30); break;
      case 'success': navigator.vibrate([10, 20, 10]); break;
      case 'warning': navigator.vibrate([35, 40, 35]); break;
    }
  }
};


export const PlaceCard: React.FC<PlaceCardProps> = ({ 
  place, 
  onLike, 
  onPass, 
  onUndo,
  mode = 'SWIPE',
  onClose,
  onRemove,
  canUndo = false
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [dragStart, setDragStart] = useState<{x: number, y: number} | null>(null);
  const [dragOffset, setDragOffset] = useState({x: 0, y: 0});
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [hasCrossedThreshold, setHasCrossedThreshold] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [validImages, setValidImages] = useState<string[]>(() => {
     if (place.images && place.images.length > 0) {
         return place.images.map((kw, i) => getImageUrl(kw, i));
     }
     return [GENERIC_FALLBACK_IMAGE];
  });

  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const isSwipeMode = mode === 'SWIPE';

  useEffect(() => {
    let isMounted = true;
    setCurrentHeroIndex(0);
    const upgradeHeroImage = async () => {
      if (validImages[0].startsWith('data:')) return; 
      try {
        const heroPrompt = `${place.name} in ${place.location}, travel photography, cinematic 8k, majestic scenery, wide angle`;
        const heroImage = await generateImage(heroPrompt);
        if (isMounted && heroImage) {
           setValidImages(prev => {
              const updated = [...prev];
              updated[0] = heroImage;
              return updated;
           });
        }
      } catch (e) {}
    };
    upgradeHeroImage();
    return () => { isMounted = false; };
  }, [place.id]); 

  // Auto-cycle hero images
  useEffect(() => {
    if (validImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentHeroIndex(prev => (prev + 1) % Math.min(validImages.length, 5)); 
    }, 3500); 
    return () => clearInterval(interval);
  }, [validImages.length]);

  // Preload next image
  useEffect(() => {
    if (validImages.length > 1) {
      const nextIndex = (currentHeroIndex + 1) % Math.min(validImages.length, 5);
      const img = new Image();
      img.src = validImages[nextIndex];
    }
  }, [currentHeroIndex, validImages]);

  const currentImageSrc = validImages[currentHeroIndex] || validImages[0];
  const isCurrentLoaded = loadedImages.has(currentImageSrc);

  const handleImageLoad = (src: string) => {
    setLoadedImages(prev => new Set(prev).add(src));
  };

  const triggerExit = (direction: 'left' | 'right') => {
    if (!isSwipeMode) return;
    if (direction === 'right') triggerHaptic('success');
    else triggerHaptic('impact');
    setExitDirection(direction);
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
    let exitX = direction === 'right' ? screenWidth * 1.8 : -screenWidth * 1.8;
    let exitY = dragOffset.y + (Math.random() * 200 - 100);
    setDragOffset({ x: exitX, y: exitY });
    setTimeout(() => {
      if (direction === 'right') onLike?.();
      else onPass?.();
    }, 450); 
  };

  const handleStart = (clientX: number, clientY: number, target: EventTarget | null) => {
    if (!isSwipeMode || exitDirection) return;
    if (target && (target as HTMLElement).closest('button')) return;
    setDragStart({ x: clientX, y: clientY });
    setIsScrolling(false);
    setHasCrossedThreshold(false);
  };

  const handleMove = (clientX: number, clientY: number, isTouch: boolean, e?: any) => {
    if (!isSwipeMode || !dragStart || exitDirection) return;
    const dx = clientX - dragStart.x;
    const dy = clientY - dragStart.y;
    if (!isScrolling) {
        if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 12) {
            setIsScrolling(true);
            return;
        }
    }
    if (isScrolling) return;
    if (Math.abs(dx) > 2) {
       if (isTouch && e && e.cancelable) e.preventDefault();
       setDragOffset({ x: dx, y: dy * 0.4 }); 
       if (Math.abs(dx) > SWIPE_THRESHOLD && !hasCrossedThreshold) {
         triggerHaptic('selection');
         setHasCrossedThreshold(true);
       } else if (Math.abs(dx) < SWIPE_THRESHOLD && hasCrossedThreshold) {
         setHasCrossedThreshold(false);
         triggerHaptic('light');
       }
    }
  };

  const handleEnd = () => {
    if (!isSwipeMode || !dragStart || exitDirection) return;
    if (isScrolling) {
        setDragStart(null);
        setIsScrolling(false);
        return;
    }
    if (Math.abs(dragOffset.x) > SWIPE_THRESHOLD) {
      triggerExit(dragOffset.x > 0 ? 'right' : 'left');
    } else {
      triggerHaptic('light'); 
      setDragOffset({ x: 0, y: 0 });
    }
    setDragStart(null);
    setHasCrossedThreshold(false);
  };

  const onTouchStart = (e: React.TouchEvent) => handleStart(e.touches[0].clientX, e.touches[0].clientY, e.target);
  const onTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX, e.touches[0].clientY, true, e);
  const onTouchEnd = () => handleEnd();
  const onMouseDown = (e: React.MouseEvent) => { if (e.button !== 0) return; handleStart(e.clientX, e.clientY, e.target); };
  const onMouseMove = (e: React.MouseEvent) => { if (e.buttons !== 1) return; handleMove(e.clientX, e.clientY, false, e); };
  const onMouseUp = () => handleEnd();
  const onMouseLeave = () => { if (dragStart) handleEnd(); };

  const getCardStyle = () => {
    if (!isSwipeMode) return { position: 'absolute' as 'absolute', inset: '0', zIndex: 100, borderRadius: '0px' };
    const rotate = dragOffset.x * 0.035; 
    const opacity = exitDirection ? 0 : 1;
    let scale = dragStart ? Math.max(0.95, 1 - Math.abs(dragOffset.x) / 4000) : 1;
    if (exitDirection) scale = exitDirection === 'right' ? 0.35 : 0.95;
    const springReturn = 'transform 0.65s cubic-bezier(0.19, 1, 0.22, 1), border-radius 0.6s ease, opacity 0.4s ease'; 
    const glideExit = 'transform 0.5s cubic-bezier(0.32, 0, 0.2, 1), opacity 0.4s ease-in, scale 0.5s cubic-bezier(0.32, 0, 0.2, 1)'; 
    return { 
      transform: `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0) rotate(${rotate}deg) scale(${scale})`,
      transition: !dragStart ? (exitDirection ? glideExit : springReturn) : 'none',
      opacity,
      transformOrigin: '50% 120%',
      cursor: dragStart ? 'grabbing' : 'grab',
      position: 'absolute' as 'absolute',
      inset: 0,
      zIndex: 50,
      borderRadius: '2.5rem'
    };
  };

  const swipeProgress = Math.min(Math.abs(dragOffset.x) / SWIPE_THRESHOLD, 1.2);
  const isOverThreshold = Math.abs(dragOffset.x) > SWIPE_THRESHOLD;
  const opacityNope = isSwipeMode && dragOffset.x < 0 ? Math.pow(swipeProgress, 2) * 0.5 : 0;
  const opacityLike = isSwipeMode && dragOffset.x > 0 ? Math.pow(swipeProgress, 2) * 0.5 : 0;

  const handleOpenMap = () => {
    if (place.coordinates) {
      window.open(`https://www.google.com/maps/search/?api=1&query=${place.coordinates.lat},${place.coordinates.lng}`, '_blank');
    }
  };

  return (
    <div 
      className={`flex flex-col h-full bg-black relative overflow-hidden shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)] ring-1 ring-white/10`}
      style={getCardStyle()}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
    >
      {/* Dynamic Threshold Overlays */}
      {isSwipeMode && (
        <>
           <div 
             className="absolute inset-0 z-50 pointer-events-none transition-opacity duration-200"
             style={{ 
               opacity: opacityLike,
               background: `radial-gradient(circle at 100% 50%, rgba(16, 185, 129, ${isOverThreshold ? 0.7 : 0.35}) 0%, transparent 75%)` 
             }} 
           />
           <div 
             className="absolute inset-0 z-50 pointer-events-none transition-opacity duration-200"
             style={{ 
               opacity: opacityNope,
               background: `radial-gradient(circle at 0% 50%, rgba(239, 68, 68, ${isOverThreshold ? 0.7 : 0.35}) 0%, transparent 75%)`
             }} 
           />
           <div className={`absolute top-28 right-12 px-5 py-1.5 border-[2px] rounded-lg z-50 pointer-events-none transform transition-all duration-400 ${isOverThreshold ? 'border-red-500 text-red-500 scale-110' : 'border-red-500/30 text-red-500/30'}`} 
                style={{ opacity: swipeProgress > 0.35 ? 1 : 0, transform: `rotate(15deg) scale(${0.8 + (swipeProgress * 0.3)})` }}>
            <span className="font-black text-2xl tracking-[0.2em] uppercase">GEÇ</span>
          </div>
          <div className={`absolute top-28 left-12 px-5 py-1.5 border-[2px] rounded-lg z-50 pointer-events-none transform transition-all duration-400 ${isOverThreshold ? 'border-emerald-500 text-emerald-500 scale-110' : 'border-emerald-500/30 text-emerald-500/30'}`} 
               style={{ opacity: swipeProgress > 0.35 ? 1 : 0, transform: `rotate(-15deg) scale(${0.8 + (swipeProgress * 0.3)})` }}>
            <span className="font-black text-2xl tracking-[0.2em] uppercase">KAYDET</span>
          </div>
        </>
      )}

      {/* Close button for View Mode */}
      {!isSwipeMode && onClose && (
        <button 
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="absolute top-6 right-6 z-[110] p-3 bg-white/10 backdrop-blur-3xl rounded-full text-white border border-white/20 active:scale-90 transition-transform"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      )}

      {/* Main Content Area */}
      <div ref={scrollRef} className="h-full w-full overflow-y-auto no-scrollbar bg-brand-offwhite dark:bg-[#000000] relative">
        <div className="relative h-full w-full overflow-hidden bg-gray-950 select-none">
           {/* Image Loading State / Blur Overlay */}
           <div className={`absolute inset-0 z-10 transition-opacity duration-1000 bg-black/60 backdrop-blur-xl flex flex-col items-center justify-center ${isCurrentLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              <div className="w-10 h-10 border-[3px] border-white/20 border-t-white/80 rounded-full animate-spin mb-4" />
              <div className="text-[9px] font-mono tracking-[0.2em] uppercase text-white/50">Görsel Oluşturuluyor</div>
           </div>
           
           <div className={`absolute inset-0 z-0 transition-opacity duration-700 ${isCurrentLoaded ? 'opacity-0' : 'opacity-100'}`}>
              <div className="w-full h-full animate-pulse bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
              <div className="absolute top-[20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-brand-purple/5 blur-[120px] animate-pulse" />
           </div>
           {validImages.map((src, idx) => (
              <img 
                  key={src}
                  src={src} 
                  alt={place.name}
                  loading={idx === 0 ? "eager" : "lazy"}
                  onLoad={() => handleImageLoad(src)}
                  className={`w-full h-full object-cover origin-center absolute inset-0 transition-all duration-1000 ease-in-out
                     ${idx === currentHeroIndex && loadedImages.has(src) ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-110 blur-xl'}
                  `}
                  draggable={false}
                  onError={(e) => { e.currentTarget.src = GENERIC_FALLBACK_IMAGE; }}
              />
           ))}
           {/* Image counter — positioned bottom-right to avoid header overlap */}
           <div className="absolute bottom-4 right-4 z-20 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full text-[9px] text-white/70 font-mono pointer-events-none border border-white/10">
             {currentHeroIndex + 1}/{validImages.length}
           </div>
        </div>

        {/* Detailed Info Sections (Below the fold) */}
        {/* These only show up if you scroll "down", but since we fixed h-full, this acts as the "rest of the profile" */}
        <div className="bg-white dark:bg-[#000000] relative z-10">
          <div className="px-8 py-16 select-text border-t border-white/5">
              <div className="max-w-md mx-auto text-center">
                  <span className="text-[7px] font-black text-gray-400 dark:text-white/20 uppercase tracking-[0.4em] block mb-5">E D I T O R I A L</span>
                  <p className="font-serif text-lg md:text-xl font-medium text-gray-900 dark:text-gray-200 leading-snug">{place.prompts[0]?.answer}</p>
                  <div className="mt-5 text-[8px] font-black text-brand-purple/30 italic uppercase tracking-[0.2em]">— {place.prompts[0]?.question}</div>
              </div>
          </div>

          <div className="px-8 py-16 bg-white dark:bg-[#080808] border-t border-gray-100 dark:border-white/5 select-text">
               <div className="max-w-md mx-auto">
                  <span className="text-[7px] font-black text-gray-400 dark:text-white/20 uppercase tracking-[0.4em] block mb-5">I N S I D E R</span>
                  <div className="flex gap-5 items-start">
                      <div className="w-8 h-8 rounded-full bg-brand-offwhite dark:bg-white/5 text-gray-400 flex items-center justify-center shrink-0 text-lg font-serif italic border border-gray-100 dark:border-white/10">?</div>
                      <div className="pt-0.5">
                          <p className="font-serif text-base text-gray-800 dark:text-gray-300 leading-snug">"{place.prompts[1]?.answer}"</p>
                          <span className="text-[7px] font-black text-gray-400 uppercase tracking-[0.2em] block mt-3">{place.prompts[1]?.question}</span>
                      </div>
                  </div>
               </div>
          </div>

          <div className="p-8 pb-56 bg-white dark:bg-[#000000]">
              <button onClick={handleOpenMap} className="w-full h-16 bg-brand-offwhite dark:bg-white/5 rounded-xl flex items-center justify-between px-5 border border-transparent hover:border-white/10 active:scale-95 transition-all">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-lg bg-zinc-900 text-white flex items-center justify-center shadow-md border border-white/5">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>
                       </div>
                       <div className="text-left">
                          <div className="text-[7px] text-zinc-500 font-black uppercase tracking-[0.1em] mb-0.5">M A P //</div>
                          <div className="text-sm font-serif font-bold text-gray-900 dark:text-white">{place.location}</div>
                       </div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-gray-400"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
              </button>
              <div className="mt-16 text-center opacity-10">
                 <div className="w-px bg-gray-400 dark:bg-white h-12 mx-auto mb-4"></div>
                 <p className="text-[7px] font-black uppercase tracking-[0.8em]">F I N I S</p>
              </div>
          </div>
        </div>
      </div>

      {/* --- BOTTOM SHEET & ACTION DOCK --- */}
      {/* This overlay sits on top of the scroll container to provide the info and buttons */}
      <div className="absolute bottom-0 left-0 right-0 z-30 flex flex-col justify-end pointer-events-none">
          {/* Gradient Sheet Background */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/95 to-transparent h-[50vh] mt-auto pointer-events-none" />
          
          <div className="relative z-40 px-6 pb-36 pt-12 flex flex-col pointer-events-auto">
             
             {/* Info Section */}
             <div className="mb-6 select-text">
                <div className="flex justify-between items-start">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {place.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="px-2 py-0.5 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-full text-[7px] font-black text-white uppercase tracking-[0.1em]">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Undo Button - Floating nicely near content */}
                    {isSwipeMode && onUndo && (
                       <button 
                         onClick={(e) => { e.stopPropagation(); if (canUndo) { triggerHaptic('selection'); onUndo(); } }} 
                         disabled={!canUndo} 
                         className={`p-2 rounded-full border transition-all duration-300 ${canUndo ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' : 'opacity-0 scale-0 border-transparent'}`}
                       >
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M9.53 2.47a.75.75 0 010 1.06L4.81 8.25H15a6.75 6.75 0 010 13.5h-3a.75.75 0 010-1.5h3a5.25 5.25 0 100-10.5H4.81l4.72 4.72a.75.75 0 11-1.06 1.06l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 011.06 0z" clipRule="evenodd" /></svg>
                       </button>
                    )}
                </div>

                <h1 className="font-serif text-[2.2rem] font-bold text-white leading-[1.1] mb-2 drop-shadow-2xl tracking-tight">{place.name}</h1>
                <div className="flex items-center text-white/50 font-black text-[9px] mb-3 tracking-[0.2em] uppercase">
                    <svg className="w-3 h-3 mr-1.5" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>
                    <span>{place.location}</span>
                </div>
                <p className="font-serif text-sm text-white/90 leading-relaxed italic opacity-90 transition-all border-l-2 border-white/30 pl-3">
                  "{place.shortDescription}"
                </p>
             </div>

             {/* Action Dock */}
             {isSwipeMode && (
                <div className="flex items-center gap-3 h-14">
                   {/* Pass Button - Neutral/Glass */}
                   <button 
                      onClick={(e) => { e.stopPropagation(); triggerExit('left'); }} 
                      className={`flex-1 h-full rounded-2xl border border-white/10 backdrop-blur-md flex items-center justify-center gap-2 transition-all active:scale-95 group overflow-hidden relative ${dragOffset.x < 0 ? 'bg-red-500/20 border-red-500/30' : 'bg-white/5 hover:bg-white/10'}`}
                   >
                      <span className={`text-xs font-black uppercase tracking-widest ${dragOffset.x < 0 ? 'text-red-400' : 'text-white/60 group-hover:text-white'}`}>Geç</span>
                   </button>

                   {/* Save Button - Accent (White) */}
                   <button 
                      onClick={(e) => { e.stopPropagation(); triggerExit('right'); }} 
                      className={`flex-1 h-full rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.15)] ${dragOffset.x > 0 ? 'bg-emerald-400 scale-105' : 'bg-white hover:bg-gray-100'}`}
                   >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5 ${dragOffset.x > 0 ? 'text-white' : 'text-black'}`}>
                         <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                      </svg>
                      <span className={`text-xs font-black uppercase tracking-widest ${dragOffset.x > 0 ? 'text-white' : 'text-black'}`}>Kaydet</span>
                   </button>
                </div>
             )}
          </div>
      </div>
    </div>
  );
};
