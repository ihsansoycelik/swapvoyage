
import React, { useEffect, useState } from 'react';

export const SplashScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Sequence: 1.5s display -> fade out -> unmount
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onFinish, 600); // Wait for fade out transition
    }, 1500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div 
      className={`absolute inset-0 z-[999] bg-[#050505] flex items-center justify-center transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div className="flex flex-col items-center">
        <h1 className="font-serif text-7xl font-black text-white tracking-tighter mb-4 animate-in fade-in zoom-in duration-1000">Keşif.</h1>
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/50 to-transparent mb-4" />
        <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.6em] animate-in slide-in-from-bottom-4 duration-1000 delay-300">
          Curated Travel
        </p>
      </div>
    </div>
  );
};
