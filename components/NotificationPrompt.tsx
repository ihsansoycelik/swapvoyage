
import React, { useState, useEffect } from 'react';

interface NotificationPromptProps {
  onAccept: () => void;
  onDecline: () => void;
  isOpen: boolean;
}

export const NotificationPrompt: React.FC<NotificationPromptProps> = ({ onAccept, onDecline, isOpen }) => {
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) setShouldRender(true);
    else {
      const timer = setTimeout(() => setShouldRender(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleAccept = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission();
    }
    onAccept();
  };

  if (!shouldRender) return null;

  return (
    <div className={`absolute inset-0 z-[160] flex items-end justify-center pointer-events-none pb-24 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
       <div className={`bg-[#1C1C1E] border border-white/10 w-[90%] max-w-sm rounded-3xl p-6 pointer-events-auto shadow-2xl transform transition-transform duration-500 ${isOpen ? 'translate-y-0' : 'translate-y-10'}`}>
          <div className="w-12 h-12 bg-brand-purple/10 rounded-full flex items-center justify-center text-2xl mb-4 text-brand-purple">
             🔔
          </div>
          <h3 className="text-white font-bold text-lg mb-2">Rota Güncellemeleri</h3>
          <p className="text-white/60 text-xs leading-relaxed mb-6">
             Koleksiyonuna eklediğin yerlerle ilgili fiyat düşüşleri ve seyahat ipuçlarından haberdar ol.
          </p>
          <div className="flex gap-3">
             <button onClick={onDecline} className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white/60 text-xs font-bold rounded-xl transition-colors">
                Belki Sonra
             </button>
             <button onClick={handleAccept} className="flex-1 py-3 bg-brand-purple hover:bg-brand-purple/90 text-black text-xs font-bold rounded-xl transition-colors">
                İzin Ver
             </button>
          </div>
       </div>
    </div>
  );
};
