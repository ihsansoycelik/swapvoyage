
import React, { useEffect, useState, useRef } from 'react';
import { ViewMode } from '../types';

interface NavigationProps {
  currentView: ViewMode;
  setView: (view: ViewMode) => void;
  wishlistCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, setView, wishlistCount }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const prevCountRef = useRef(wishlistCount);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevCountRef.current = wishlistCount;
      return;
    }

    if (wishlistCount > prevCountRef.current) {
      setIsAnimating(false);
      const startTimer = setTimeout(() => setIsAnimating(true), 10);
      const endTimer = setTimeout(() => setIsAnimating(false), 510); 
      prevCountRef.current = wishlistCount;
      return () => {
        clearTimeout(startTimer);
        clearTimeout(endTimer);
      };
    }
    prevCountRef.current = wishlistCount;
  }, [wishlistCount]);

  return (
    <div className="absolute bottom-6 left-0 right-0 z-[70] flex justify-center pointer-events-none pb-[env(safe-area-inset-bottom)]">
      <nav className="pointer-events-auto bg-white/10 dark:bg-black/40 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] rounded-full px-2 py-2 flex items-center gap-1 transition-all duration-300 transform">
        
        {/* Discover Tab */}
        <button 
          onClick={() => setView('DISCOVER')}
          className={`relative px-5 py-3 rounded-full flex items-center gap-2 transition-all duration-300 ${
            currentView === 'DISCOVER' 
              ? 'bg-white text-black shadow-lg' 
              : 'text-white/60 hover:bg-white/5 hover:text-white'
          }`}
        >
          {/* Sparkles icon — evokes discovery and hidden gems */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={currentView === 'DISCOVER' ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
          </svg>
          {currentView === 'DISCOVER' && (
            <span className="text-xs font-bold tracking-wider uppercase animate-in fade-in slide-in-from-left-2 duration-300">Keşfet</span>
          )}
        </button>

        {/* Wishlist Tab */}
        <button 
          onClick={() => setView('WISHLIST')}
          className={`relative px-5 py-3 rounded-full flex items-center gap-2 transition-all duration-300 ${
            currentView === 'WISHLIST' 
              ? 'bg-brand-purple text-white shadow-lg shadow-brand-purple/40' 
              : 'text-white/60 hover:bg-white/5 hover:text-white'
          }`}
        >
          <div className={`relative transition-transform duration-200 ${isAnimating ? 'animate-bounce' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={currentView === 'WISHLIST' ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2.5} className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            {wishlistCount > 0 && currentView !== 'WISHLIST' && (
              <span className="absolute -top-1.5 -right-1.5 bg-brand-purple text-white text-[9px] font-bold h-3.5 w-3.5 flex items-center justify-center rounded-full border border-black shadow-sm">
                {wishlistCount}
              </span>
            )}
          </div>
          {currentView === 'WISHLIST' && (
            <span className="text-xs font-bold tracking-wider uppercase animate-in fade-in zoom-in duration-300">Listem</span>
          )}
        </button>

        {/* Profile Tab */}
        <button 
          onClick={() => setView('PROFILE')}
          className={`relative px-5 py-3 rounded-full flex items-center gap-2 transition-all duration-300 ${
            currentView === 'PROFILE' 
              ? 'bg-white text-black shadow-lg' 
              : 'text-white/60 hover:bg-white/5 hover:text-white'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={currentView === 'PROFILE' ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2.5} className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
          {currentView === 'PROFILE' && (
            <span className="text-xs font-bold tracking-wider uppercase animate-in fade-in slide-in-from-right-2 duration-300">Profil</span>
          )}
        </button>

      </nav>
    </div>
  );
};
