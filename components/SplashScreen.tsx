
import React, { useEffect, useState } from 'react';

export const SplashScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [phase, setPhase] = useState<'in' | 'hold' | 'out'>('in');

  useEffect(() => {
    // in: 0–400ms (content fades in)
    // hold: 400–900ms (visible)
    // out: 900–1200ms (fades out), then onFinish
    const holdTimer = setTimeout(() => setPhase('hold'), 400);
    const outTimer = setTimeout(() => setPhase('out'), 900);
    const doneTimer = setTimeout(onFinish, 1200);
    return () => {
      clearTimeout(holdTimer);
      clearTimeout(outTimer);
      clearTimeout(doneTimer);
    };
  }, [onFinish]);

  return (
    <div
      className={`absolute inset-0 z-[999] bg-[#050505] flex items-center justify-center transition-opacity duration-300 ${phase === 'out' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      <div className={`flex flex-col items-center transition-all duration-400 ${phase === 'in' ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
        <h1 className="font-serif text-7xl font-black text-white tracking-tighter mb-4">Keşif.</h1>
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/50 to-transparent mb-4" />
        <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.6em]">
          Curated Travel
        </p>
      </div>
    </div>
  );
};
