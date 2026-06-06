
import React, { useEffect, useState } from 'react';
import { getWishlist } from '../services/storageService';
import { Place } from '../types';

interface ProfileProps {
  onOpenSettings: () => void;
  onSignOut: () => void;
  onOpenNotifications: () => void;
}

// matchTags uses the same IDs as Onboarding INTERESTS and CityFilter CATEGORIES
const BADGE_DEFINITIONS = [
  {
    icon: '🏛️',
    label: 'Tarihçi',
    matchTags: ['Tarih', 'Antik Kent', 'Tarihi'],
  },
  {
    icon: '🌊',
    label: 'Denizci',
    matchTags: ['Deniz'],
  },
  {
    icon: '🌲',
    label: 'Doğasever',
    matchTags: ['Doğa', 'Macera'],
  },
  {
    icon: '📸',
    label: 'Fotoğrafçı',
    minSaved: 5,
  },
  {
    icon: '🧭',
    label: 'Kaşif',
    minSaved: 10,
  },
];

const getInitials = (name: string): string =>
  name
    .split(' ')
    .map(n => n[0] ?? '')
    .join('')
    .toUpperCase()
    .slice(0, 2);

const computeBadges = (wishlist: Place[]) =>
  BADGE_DEFINITIONS.map(badge => {
    if (badge.matchTags) {
      const active = wishlist.some(p =>
        p.tags.some(tag =>
          badge.matchTags!.some(bt => tag.toLowerCase().includes(bt.toLowerCase()))
        )
      );
      return { ...badge, active };
    }
    if (badge.minSaved !== undefined) {
      return { ...badge, active: wishlist.length >= badge.minSaved };
    }
    return { ...badge, active: false };
  });

export const Profile: React.FC<ProfileProps> = ({ onOpenSettings, onSignOut, onOpenNotifications }) => {
  const [stats, setStats] = useState({ saved: 0, cities: 0, routes: 0 });
  const [isEditing, setIsEditing] = useState(false);
  const [badges, setBadges] = useState(BADGE_DEFINITIONS.map(b => ({ ...b, active: false })));
  const [profile, setProfile] = useState({
    name: 'Gezgin',
    title: 'Keşif Üyesi',
  });

  useEffect(() => {
    const loadStats = async () => {
      const wishlist = await getWishlist();
      const cities = new Set(wishlist.map(p => p.location.split(',')[0].trim()));
      const routes = parseInt(localStorage.getItem('kesif_route_count') || '0', 10);
      setStats({ saved: wishlist.length, cities: cities.size, routes });
      setBadges(computeBadges(wishlist));
    };
    loadStats();

    const savedProfile = localStorage.getItem('kesif_user_profile');
    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile));
      } catch {}
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('kesif_user_profile', JSON.stringify(profile));
    setIsEditing(false);
  };

  const handleSignOut = () => {
    if (confirm('Uygulamayı sıfırlamak istediğine emin misin? Kayıtlı mekanların silinecek.')) {
      onSignOut();
    }
  };

  return (
    <div className="h-full overflow-y-auto no-scrollbar pt-20 pb-32 px-6">

      {/* Header / User Info */}
      <div className="flex flex-col items-center mb-10 relative">
        <div className="relative mb-4">
          <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-brand-purple to-blue-500">
            <div className="w-full h-full rounded-full bg-[#111] border-4 border-[#0a0a0a] flex items-center justify-center">
              <span className="font-serif font-black text-3xl text-white select-none">
                {getInitials(profile.name)}
              </span>
            </div>
          </div>
        </div>

        {isEditing ? (
          <div className="w-full max-w-xs space-y-3">
            <input
              value={profile.name}
              onChange={e => setProfile({ ...profile, name: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-center text-white font-bold font-serif text-xl focus:border-brand-purple outline-none"
              placeholder="İsim"
            />
            <input
              value={profile.title}
              onChange={e => setProfile({ ...profile, title: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-center text-white/60 text-xs font-bold uppercase tracking-widest focus:border-brand-purple outline-none"
              placeholder="Ünvan"
            />
            <div className="flex gap-2 pt-2">
              <button onClick={() => setIsEditing(false)} className="flex-1 py-2 bg-white/5 rounded-lg text-white/60 text-xs font-bold">İptal</button>
              <button onClick={handleSave} className="flex-1 py-2 bg-brand-purple text-black rounded-lg text-xs font-bold">Kaydet</button>
            </div>
          </div>
        ) : (
          <>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white">{profile.name}</h2>
            <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-1">{profile.title}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              PROFİLİ DÜZENLE
            </button>
          </>
        )}
      </div>

      {/* Stats Row */}
      <div className="flex justify-between items-center mb-10 px-4">
        <div className="text-center">
          <div className="text-xl font-black text-gray-900 dark:text-white">{stats.saved}</div>
          <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Mekan</div>
        </div>
        <div className="w-px h-8 bg-gray-200 dark:bg-white/10" />
        <div className="text-center">
          <div className="text-xl font-black text-gray-900 dark:text-white">{stats.cities}</div>
          <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Şehir</div>
        </div>
        <div className="w-px h-8 bg-gray-200 dark:bg-white/10" />
        <div className="text-center">
          <div className="text-xl font-black text-gray-900 dark:text-white">{stats.routes}</div>
          <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Rota</div>
        </div>
      </div>

      {/* Badges */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4 px-1">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Rozetler</h3>
          <span className="text-[10px] font-bold text-brand-purple uppercase">
            {badges.filter(b => b.active).length}/{badges.length}
          </span>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6">
          {badges.map((badge, i) => (
            <div
              key={i}
              className={`flex flex-col items-center gap-2 min-w-[70px] transition-all duration-500 ${badge.active ? 'opacity-100' : 'opacity-30 grayscale'}`}
            >
              <div className={`w-16 h-16 rounded-full bg-gray-100 dark:bg-white/5 border flex items-center justify-center text-2xl shadow-sm transition-all duration-500 ${badge.active ? 'border-white/30 scale-110' : 'border-white/10'}`}>
                {badge.icon}
              </div>
              <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Settings List */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">Ayarlar</h3>

        <button onClick={onOpenSettings} className="w-full flex items-center justify-between p-4 bg-white dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors group">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" /></svg>
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white">Hesap Ayarları</span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-400"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
        </button>

        <button onClick={onOpenNotifications} className="w-full flex items-center justify-between p-4 bg-white dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors group">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 text-purple-500 rounded-lg group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z" clipRule="evenodd" /></svg>
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white">Bildirimler</span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-400"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
        </button>

        <button onClick={handleSignOut} className="w-full flex items-center justify-between p-4 bg-white dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-red-500/5 transition-colors group">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-500/10 text-red-500 rounded-lg group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z" clipRule="evenodd" /></svg>
            </div>
            <span className="text-sm font-medium text-red-500">Sıfırla & Yeniden Başla</span>
          </div>
        </button>
      </div>
    </div>
  );
};
