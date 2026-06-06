
import React, { useState, useEffect } from 'react';
import { Place } from '../types';
import { getGlobalPlaces, saveGlobalPlace, deleteGlobalPlace } from '../services/storageService';
import { PlaceCard } from './PlaceCard';
import { auth } from '../services/firebase';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onDbUpdate?: () => void;
}

type AdminView = 'LOGIN' | 'DASHBOARD' | 'LIST' | 'FORM' | 'PREVIEW';

const emptyPlace: Place = {
  id: '',
  name: '',
  location: '',
  district: '',
  shortDescription: '',
  images: [''],
  tags: [],
  prompts: [
    { question: 'Ziyaret Sebebi', answer: '' },
    { question: 'Gizli Bilgi', answer: '' }
  ],
  coordinates: { lat: 39.0, lng: 35.0 },
  entryFee: '',
  visitDuration: '',
  bestSeason: '',
  status: 'draft'
};

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose, onDbUpdate }) => {
  const [view, setView] = useState<AdminView>('LOGIN');
  const [places, setPlaces] = useState<Place[]>([]);
  const [editingPlace, setEditingPlace] = useState<Place>(emptyPlace);

  useEffect(() => {
    if (isOpen) {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          setView('DASHBOARD');
          refreshList();
        } else {
          setView('LOGIN');
        }
      });
      return () => unsubscribe();
    }
  }, [isOpen]);

  const refreshList = async () => {
    const data = await getGlobalPlaces();
    setPlaces(data);
  };

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setView('DASHBOARD');
      refreshList();
    } catch (e) {
      console.error(e);
      alert('Giriş başarısız oldu.');
    }
  };
  
  const handleSignOut = async () => {
    await signOut(auth);
    onClose();
  };

  const handleCreateNew = () => {
    setEditingPlace({ ...emptyPlace, id: Math.random().toString(36).substr(2, 9) });
    setView('FORM');
  };

  const handleEdit = (place: Place) => {
    setEditingPlace({ ...place }); // Clone
    setView('FORM');
  };

  const handleDelete = async (id: string) => {
    if (confirm('Silmek istediğine emin misin?')) {
      await deleteGlobalPlace(id);
      refreshList();
      onDbUpdate?.();
    }
  };

  const handlePreview = () => {
    setView('PREVIEW');
  };

  const handlePublish = async () => {
    const finalPlace = { ...editingPlace, status: 'published' as const };
    await saveGlobalPlace(finalPlace);
    refreshList();
    onDbUpdate?.();
    setView('LIST');
  };

  const handleSaveDraft = async () => {
    const draftPlace = { ...editingPlace, status: 'draft' as const };
    await saveGlobalPlace(draftPlace);
    refreshList();
    onDbUpdate?.();
    setView('LIST');
  };

  if (!isOpen) return null;

  // --- Views ---

  if (view === 'LOGIN') {
    return (
      <div className="absolute inset-0 z-[200] bg-black flex flex-col items-center justify-center p-8">
        <h2 className="text-3xl font-serif font-bold text-white mb-2">Admin Panel</h2>
        <p className="text-white/40 text-sm mb-8">İçerik Yönetim Sistemi</p>
        <div className="w-full max-w-xs space-y-4">
           <button onClick={handleLogin} className="w-full py-4 bg-white text-black font-bold rounded-xl active:scale-95 transition-transform flex items-center justify-center gap-3">
             <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
             Google ile Giriş Yap
           </button>
           <button onClick={onClose} className="w-full py-4 text-white/40 text-xs font-bold uppercase tracking-widest">Geri Dön</button>
        </div>
      </div>
    );
  }

  if (view === 'PREVIEW') {
    return (
      <div className="absolute inset-0 z-[200] bg-black">
         <PlaceCard place={editingPlace} mode="VIEW" onClose={() => setView('FORM')} />
         <div className="absolute bottom-6 left-6 right-6 z-[210] flex gap-3">
            <button onClick={() => setView('FORM')} className="flex-1 py-4 bg-black/80 backdrop-blur border border-white/20 text-white font-bold rounded-xl">DÜZENLE</button>
            <button onClick={handlePublish} className="flex-1 py-4 bg-brand-purple text-black font-bold rounded-xl shadow-xl">YAYINLA</button>
         </div>
      </div>
    );
  }

  // Common Header for Dashboard/List/Form
  const renderHeader = (title: string, backAction?: () => void) => (
    <div className="h-16 border-b border-white/10 flex items-center justify-between px-4 bg-brand-dark-card shrink-0">
      <div className="flex items-center gap-3">
        {backAction && (
          <button onClick={backAction} className="p-2 -ml-2 hover:bg-white/5 rounded-full">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
        )}
        <h2 className="font-bold text-white text-sm tracking-wide uppercase">{title}</h2>
      </div>
      <button onClick={handleSignOut} className="text-[10px] font-black text-white/40 bg-white/5 px-2 py-1 rounded hover:bg-white/10">ÇIKIŞ YAP</button>
    </div>
  );

  return (
    <div className="absolute inset-0 z-[200] bg-black flex flex-col font-sans overflow-hidden">
      
      {view === 'DASHBOARD' && (
        <>
          {renderHeader('Dashboard')}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="grid grid-cols-2 gap-4 mb-8">
               <div className="bg-brand-dark-card border border-white/10 p-5 rounded-2xl">
                  <div className="text-3xl font-black text-white mb-1">{places.length}</div>
                  <div className="text-[10px] text-white/40 uppercase font-bold">Toplam Mekan</div>
               </div>
               <div className="bg-brand-dark-card border border-white/10 p-5 rounded-2xl">
                  <div className="text-3xl font-black text-emerald-500 mb-1">{places.filter(p => p.status === 'published' || !p.status).length}</div>
                  <div className="text-[10px] text-white/40 uppercase font-bold">Yayında</div>
               </div>
            </div>

            <div className="space-y-3">
               <button onClick={() => setView('LIST')} className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between group hover:bg-white/10">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center">📋</div>
                     <div className="text-left">
                        <div className="font-bold text-white">Mekan Listesi</div>
                        <div className="text-xs text-white/40">Tüm mekanları yönet</div>
                     </div>
                  </div>
                  <span className="text-white/20 group-hover:translate-x-1 transition-transform">→</span>
               </button>

               <button onClick={handleCreateNew} className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between group hover:bg-white/10">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-brand-purple/20 text-brand-purple rounded-full flex items-center justify-center">+</div>
                     <div className="text-left">
                        <div className="font-bold text-white">Mekan Ekle</div>
                        <div className="text-xs text-white/40">Yeni bir yer keşfet</div>
                     </div>
                  </div>
                  <span className="text-white/20 group-hover:translate-x-1 transition-transform">→</span>
               </button>
            </div>
          </div>
        </>
      )}

      {view === 'LIST' && (
        <>
          {renderHeader('Mekan Listesi', () => setView('DASHBOARD'))}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
             {places.map(place => (
               <div key={place.id} className="p-4 bg-brand-dark-card border border-white/5 rounded-xl flex items-center justify-between">
                  <div className="flex-1 min-w-0 pr-4">
                     <div className="flex items-center gap-2 mb-1">
                        <span className={`w-2 h-2 rounded-full ${place.status === 'draft' ? 'bg-yellow-500' : 'bg-emerald-500'}`} />
                        <h3 className="font-bold text-white truncate">{place.name}</h3>
                     </div>
                     <p className="text-xs text-white/40 truncate">{place.location}</p>
                  </div>
                  <div className="flex gap-2">
                     <button onClick={() => handleEdit(place)} className="p-2 bg-white/5 rounded-lg text-white/60 hover:text-white hover:bg-white/10">
                        ✎
                     </button>
                     <button onClick={() => handleDelete(place.id)} className="p-2 bg-red-500/10 rounded-lg text-red-500 hover:bg-red-500/20">
                        🗑
                     </button>
                  </div>
               </div>
             ))}
             <div className="h-20" /> {/* Spacer */}
          </div>
          <div className="absolute bottom-6 right-6">
             <button onClick={handleCreateNew} className="w-14 h-14 bg-brand-purple text-black rounded-full shadow-2xl flex items-center justify-center text-3xl font-light pb-1 hover:scale-105 transition-transform">+</button>
          </div>
        </>
      )}

      {view === 'FORM' && (
        <>
          {renderHeader(editingPlace.name || 'Yeni Mekan', () => setView('LIST'))}
          <div className="flex-1 p-6 overflow-y-auto">
             <div className="space-y-6 pb-32">
                {/* Basic Info */}
                <section className="space-y-4">
                   <h3 className="text-xs font-black text-brand-purple uppercase tracking-widest border-b border-white/10 pb-2">Temel Bilgiler</h3>
                   <div className="space-y-3">
                      <div>
                         <label className="text-[10px] text-white/40 uppercase font-bold ml-1">Mekan Adı</label>
                         <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-brand-purple outline-none" 
                           value={editingPlace.name} onChange={e => setEditingPlace({...editingPlace, name: e.target.value})} />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                           <label className="text-[10px] text-white/40 uppercase font-bold ml-1">Şehir</label>
                           <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-brand-purple outline-none" 
                             value={editingPlace.location.split(',')[0]} onChange={e => setEditingPlace({...editingPlace, location: `${e.target.value}, Turkey`})} />
                        </div>
                        <div>
                           <label className="text-[10px] text-white/40 uppercase font-bold ml-1">İlçe</label>
                           <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-brand-purple outline-none" 
                             value={editingPlace.district || ''} onChange={e => setEditingPlace({...editingPlace, district: e.target.value})} />
                        </div>
                      </div>
                   </div>
                </section>

                {/* Location */}
                <section className="space-y-4">
                   <h3 className="text-xs font-black text-brand-purple uppercase tracking-widest border-b border-white/10 pb-2">Konum</h3>
                   <div className="grid grid-cols-2 gap-3">
                      <input type="number" placeholder="Lat" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm" 
                         value={editingPlace.coordinates?.lat} onChange={e => setEditingPlace({...editingPlace, coordinates: {...editingPlace.coordinates!, lat: parseFloat(e.target.value)}})} />
                      <input type="number" placeholder="Lng" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm" 
                         value={editingPlace.coordinates?.lng} onChange={e => setEditingPlace({...editingPlace, coordinates: {...editingPlace.coordinates!, lng: parseFloat(e.target.value)}})} />
                   </div>
                   <button onClick={() => { 
                      if (navigator.geolocation) {
                         navigator.geolocation.getCurrentPosition(pos => {
                            setEditingPlace({...editingPlace, coordinates: { lat: pos.coords.latitude, lng: pos.coords.longitude }});
                         });
                      }
                   }} className="w-full py-3 bg-blue-500/20 text-blue-400 font-bold text-xs rounded-xl border border-blue-500/30">
                      📍 Haritadan Çek (Mevcut Konum)
                   </button>
                </section>

                {/* Details */}
                <section className="space-y-4">
                   <h3 className="text-xs font-black text-brand-purple uppercase tracking-widest border-b border-white/10 pb-2">Detaylar</h3>
                   <div>
                      <label className="text-[10px] text-white/40 uppercase font-bold ml-1">Kısa Açıklama (Hook)</label>
                      <textarea className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-brand-purple outline-none h-20" 
                        value={editingPlace.shortDescription} onChange={e => setEditingPlace({...editingPlace, shortDescription: e.target.value})} />
                   </div>
                   <div>
                      <label className="text-[10px] text-white/40 uppercase font-bold ml-1">Uzun Açıklama / Hikaye</label>
                      <textarea className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-brand-purple outline-none h-32" 
                        value={editingPlace.prompts[0]?.answer} 
                        onChange={e => {
                           const newPrompts = [...editingPlace.prompts];
                           newPrompts[0] = { ...newPrompts[0], answer: e.target.value, question: 'Ziyaret Sebebi' };
                           setEditingPlace({...editingPlace, prompts: newPrompts});
                        }} 
                      />
                   </div>
                   <div>
                      <label className="text-[10px] text-white/40 uppercase font-bold ml-1">Görseller (URL, her satıra bir tane)</label>
                      <textarea className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-brand-purple outline-none h-24 font-mono text-xs" 
                        value={editingPlace.images.join('\n')} 
                        onChange={e => setEditingPlace({...editingPlace, images: e.target.value.split('\n')})} 
                      />
                   </div>
                   <div className="grid grid-cols-2 gap-3">
                      <input placeholder="Giriş Ücreti" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm" 
                         value={editingPlace.entryFee || ''} onChange={e => setEditingPlace({...editingPlace, entryFee: e.target.value})} />
                      <input placeholder="Ziyaret Süresi" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm" 
                         value={editingPlace.visitDuration || ''} onChange={e => setEditingPlace({...editingPlace, visitDuration: e.target.value})} />
                   </div>
                   <div>
                      <input placeholder="En İyi Mevsim" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm" 
                         value={editingPlace.bestSeason || ''} onChange={e => setEditingPlace({...editingPlace, bestSeason: e.target.value})} />
                   </div>
                   <div>
                      <label className="text-[10px] text-white/40 uppercase font-bold ml-1">Kategoriler (Virgülle ayır)</label>
                      <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm" 
                         value={editingPlace.tags.join(', ')} onChange={e => setEditingPlace({...editingPlace, tags: e.target.value.split(',').map(s => s.trim())})} />
                   </div>
                </section>
                
                {/* Actions */}
                <div className="flex gap-3 pt-6">
                   <button onClick={handleSaveDraft} className="flex-1 py-4 bg-white/10 border border-white/10 text-white font-bold rounded-xl">TASLAK KAYDET</button>
                   <button onClick={handlePreview} className="flex-1 py-4 bg-white text-black font-bold rounded-xl shadow-lg">ÖNİZLE</button>
                </div>
             </div>
          </div>
        </>
      )}
    </div>
  );
};
