
import React, { useState } from 'react';

interface OnboardingProps {
  onComplete: (selectedInterests: string[]) => void;
}

const STEPS = [
  {
    title: "Keşfet",
    description: "Turistik kalabalıklardan uzak, sadece yerellerin bildiği saklı kalmış antik kentleri ve koyları keşfet.",
    image: "https://images.unsplash.com/photo-1527838832702-585f237f6671?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Kaydır",
    description: "Beğendiğin yerleri sağa kaydırarak kişisel koleksiyonuna ekle. Beğenmediklerini sola kaydır.",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Rotanı Oluştur",
    description: "Kaydettiğin noktaları tek tıkla optimize edilmiş bir rotaya dönüştür ve Google Maps ile yola çık.",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1000&auto=format&fit=crop",
  }
];

// IDs intentionally match CityFilter CATEGORIES so filters work end-to-end
const INTERESTS = [
  { id: 'Doğa', label: 'Doğa & Yayla', icon: '🌲' },
  { id: 'Tarih', label: 'Tarihi Yapılar', icon: '🏰' },
  { id: 'Antik Kent', label: 'Antik Kentler', icon: '🏛️' },
  { id: 'Gastronomi', label: 'Gastronomi', icon: '🍽️' },
  { id: 'Deniz', label: 'Deniz & Koylar', icon: '🌊' },
  { id: 'Müze', label: 'Müze & Sanat', icon: '🎨' },
  { id: 'Macera', label: 'Macera', icon: '🧗' },
  { id: 'Sessizlik', label: 'Huzur & Sessizlik', icon: '🧘' },
];

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0); // 0-2: Tutorial, 3: Interests
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(prev => prev + 1);
      setIsAnimating(false);
    }, 300);
  };

  const handleDevSkip = () => {
    onComplete(['Doğa', 'Tarih']);
  };

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const isTutorial = currentStep < 3;
  const isInterests = currentStep === 3;

  return (
    <div className="absolute inset-0 z-[200] bg-black text-white font-sans overflow-hidden">
      
      {/* DEV SKIP BUTTON — only visible in development */}
      {import.meta.env.DEV && (
        <button
          onClick={handleDevSkip}
          className="absolute top-12 right-6 z-[250] text-[9px] font-black text-white/20 hover:text-white uppercase tracking-widest border border-white/10 hover:border-white/40 px-3 py-1.5 rounded-full bg-black/20 backdrop-blur transition-all active:scale-95"
        >
          Dev Skip
        </button>
      )}

      {/* Background Image with Blur/Transition */}
      <div className={`absolute inset-0 transition-all duration-700 ease-in-out ${isAnimating ? 'opacity-50 scale-105' : 'opacity-100 scale-100'}`}>
        {isTutorial && (
          <img 
            src={STEPS[currentStep].image} 
            className="w-full h-full object-cover opacity-60 scale-110 blur-[2px] transition-transform duration-[10s] ease-linear" 
            alt="background"
            style={{ transform: isAnimating ? 'scale(1.15)' : 'scale(1.1)' }}
          />
        )}
        {isInterests && (
          <div className="w-full h-full bg-[#080808] relative overflow-hidden">
            <div className="absolute -top-[20%] -left-[20%] w-[70%] h-[70%] bg-brand-purple/5 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute -bottom-[20%] -right-[20%] w-[70%] h-[70%] bg-blue-500/5 rounded-full blur-[100px] animate-pulse" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      {/* Tutorial Content */}
      {isTutorial && (
        <div className={`absolute inset-0 flex flex-col justify-end p-10 pb-24 transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
          <div className="space-y-6">
            <div className="flex gap-2 mb-8">
              {STEPS.map((_, i) => (
                <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i === currentStep ? 'w-8 bg-white' : 'w-2 bg-white/30'}`} />
              ))}
            </div>
            <h1 className="font-serif text-5xl font-bold leading-tight tracking-tight drop-shadow-lg">
              {STEPS[currentStep].title}
            </h1>
            <p className="text-white/80 text-lg leading-relaxed max-w-xs font-medium drop-shadow-md">
              {STEPS[currentStep].description}
            </p>
            <button 
              onClick={handleNext}
              className="w-full py-5 bg-white text-black font-black uppercase tracking-widest text-xs rounded-2xl shadow-2xl active:scale-95 transition-transform hover:bg-gray-100"
            >
              Devam Et
            </button>
          </div>
        </div>
      )}

      {/* Interests Selection Screen */}
      {isInterests && (
        <div className={`absolute inset-0 flex flex-col p-8 pt-20 transition-all duration-500 ${isAnimating ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}>
          <h2 className="font-serif text-4xl font-bold mb-4 leading-tight">İlgi Alanların?</h2>
          <p className="text-white/40 text-sm mb-8">Sana en uygun gizli hazineleri bulmamıza yardımcı ol.</p>
          
          <div className="grid grid-cols-2 gap-3 flex-1 overflow-y-auto no-scrollbar pb-10 content-start">
            {INTERESTS.map(interest => {
              const isActive = selectedInterests.includes(interest.id);
              return (
                <button
                  key={interest.id}
                  onClick={() => toggleInterest(interest.id)}
                  className={`p-4 rounded-3xl border text-left transition-all duration-300 relative overflow-hidden group active:scale-95
                    ${isActive 
                      ? 'bg-white text-black border-white shadow-xl' 
                      : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}
                >
                  <span className="text-2xl block mb-2">{interest.icon}</span>
                  <span className="font-bold text-xs uppercase tracking-wider">{interest.label}</span>
                  {isActive && (
                    <div className="absolute top-3 right-3 w-2 h-2 bg-brand-purple rounded-full animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-6 pb-4">
            <button 
              onClick={() => onComplete(selectedInterests)}
              className={`w-full py-5 bg-brand-purple text-black font-black uppercase tracking-widest text-xs rounded-2xl shadow-2xl transition-all duration-300 ${selectedInterests.length > 0 ? 'opacity-100 active:scale-95' : 'opacity-50 grayscale cursor-not-allowed'}`}
              disabled={selectedInterests.length === 0}
            >
              Hadi Başlayalım
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
