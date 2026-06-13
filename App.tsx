import React, { useState, useEffect, useCallback, Suspense, lazy, useRef, useMemo } from 'react';
import { Place, ViewMode, FilterState } from './types';
import { fetchHiddenGems } from './services/geminiService';
import { getWishlist, addToWishlist, removeFromWishlist, getGlobalPlaces, clearWishlist, getVisited, addToVisited, removeFromVisited, clearVisited } from './services/storageService';
import { auth } from './services/firebase';
import { signOut } from 'firebase/auth';
import { PlaceCard } from './components/PlaceCard';
import { Navigation } from './components/Navigation';
import { SplashScreen } from './components/SplashScreen';
import { SkeletonCard } from './components/SkeletonCard';
import { JourneyMap } from './components/JourneyMap';
import { GezmisimList } from './components/GezmisimList';
import ErrorBoundary from './components/ErrorBoundary';

const Wishlist = lazy(() => import('./components/Wishlist').then(m => ({ default: m.Wishlist })));
const Profile = lazy(() => import('./components/Profile').then(m => ({ default: m.Profile })));
const Onboarding = lazy(() => import('./components/Onboarding').then(m => ({ default: m.Onboarding })));
const CityFilter = lazy(() => import('./components/CityFilter').then(m => ({ default: m.CityFilter })));
const SettingsModal = lazy(() => import('./components/SettingsModal').then(m => ({ default: m.SettingsModal })));
const AdminPanel = lazy(() => import('./components/AdminPanel').then(m => ({ default: m.AdminPanel })));
const NotificationPrompt = lazy(() => import('./components/NotificationPrompt').then(m => ({ default: m.NotificationPrompt })));

const ADMIN_EMAIL = 'soycelikihsan@gmail.com';

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [view, setView] = useState<ViewMode>('DISCOVER');
  const [stack, setStack] = useState<Place[]>([]);
  const [history, setHistory] = useState<Place[]>([]);
  const [wishlist, setWishlist] = useState<Place[]>([]);
  const [visited, setVisited] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const isFetchingRef = useRef(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({ location: null, categories: [] });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const stored = localStorage.getItem('swapvoyage_dark_mode');
    return stored !== null ? stored === 'true' : true;
  });
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showNotificationPrompt, setShowNotificationPrompt] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [historySubView, setHistorySubView] = useState<'LIST' | 'MAP'>('LIST');
  const [mapFocusPlace, setMapFocusPlace] = useState<Place | null>(null);
  const [visitedSnackbar, setVisitedSnackbar] = useState<Place | null>(null);
  const visitedSnackbarTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Apply dark mode to DOM and persist
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('swapvoyage_dark_mode', String(isDarkMode));
  }, [isDarkMode]);

  // Track admin auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsAdminUser(user?.email === ADMIN_EMAIL);
    });
    return unsubscribe;
  }, []);

  // Check onboarding status on mount
  useEffect(() => {
    const isOnboardingCompleted = localStorage.getItem('swapvoyage_onboarding_completed');
    if (!isOnboardingCompleted) {
      setShowOnboarding(true);
    }
  }, []);

  // Reset history sub-view when navigating away
  useEffect(() => {
    if (view !== 'HISTORY') {
      setHistorySubView('LIST');
      setMapFocusPlace(null);
    }
  }, [view]);

  const loadDiscoveryStack = useCallback(async (currentWishlist: Place[], currentFilters: FilterState) => {
    setLoading(true);
    setLoadError(false);
    try {
      const dbPlaces = await getGlobalPlaces();

      let filtered = dbPlaces.filter(p =>
        !currentWishlist.some(w => w.id === p.id) &&
        (p.status === 'published' || !p.status)
      );

      if (currentFilters.location) {
        if (currentFilters.location.startsWith('COORDS:')) {
          const [lat, lng] = currentFilters.location.replace('COORDS:', '').split(',').map(Number);
          const NEAR_ME_PRIMARY_KM = 50;
          const NEAR_ME_FALLBACK_KM = 100;
          const nearby50 = filtered.filter(p =>
            p.coordinates && calculateDistance(lat, lng, p.coordinates.lat, p.coordinates.lng) <= NEAR_ME_PRIMARY_KM
          );
          filtered = nearby50.length >= 3
            ? nearby50
            : filtered.filter(p => p.coordinates && calculateDistance(lat, lng, p.coordinates.lat, p.coordinates.lng) <= NEAR_ME_FALLBACK_KM);
        } else {
          filtered = filtered.filter(p => p.location.toLowerCase().includes(currentFilters.location!.toLowerCase()));
        }
      }

      if (currentFilters.categories.length > 0) {
        filtered = filtered.filter(p => p.tags.some(tag => currentFilters.categories.includes(tag)));
      }

      if (filtered.length < 3) {
        const geminiPlaces = await fetchHiddenGems(currentWishlist.map(p => p.id), currentFilters);
        setStack([...filtered, ...geminiPlaces]);
      } else {
        setStack(filtered);
      }
    } catch (e) {
      console.error("Stack loading failed", e);
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const triggerBackgroundFetch = useCallback(async (
    currentWishlist: Place[],
    currentStack: Place[],
    currentHistory: Place[],
    currentFilters: FilterState
  ) => {
    try {
      const excludeIds = [
        ...currentWishlist.map(p => p.id),
        ...currentStack.map(p => p.id),
        ...currentHistory.map(p => p.id),
      ];
      const geminiPlaces = await fetchHiddenGems(excludeIds, currentFilters);
      setStack(prev => [...prev, ...geminiPlaces]);
    } catch (e) {
      console.error("Background fetch failed", e);
    }
  }, []);

  // Background fetch when stack is running low — useRef guard prevents double-fetch in React Strict Mode
  useEffect(() => {
    if (view === 'DISCOVER' && stack.length === 2 && !loading && !isFetchingRef.current) {
      isFetchingRef.current = true;
      triggerBackgroundFetch(wishlist, stack, history, filters).finally(() => {
        isFetchingRef.current = false;
      });
    }
  }, [stack.length, loading, view, wishlist, stack, history, filters, triggerBackgroundFetch]);

  // Initial load — mount only
  useEffect(() => {
    const init = async () => {
      const savedWishlist = await getWishlist();
      setWishlist(savedWishlist);
      const savedVisited = await getVisited();
      setVisited(savedVisited);
      if (localStorage.getItem('swapvoyage_onboarding_completed')) {
        await loadDiscoveryStack(savedWishlist, filters);
      } else {
        setLoading(false);
      }
    };
    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadDiscoveryStack]);

  // Reload stack when filters change (after initial mount)
  // Use a ref to skip the very first render
  const filtersReadyRef = React.useRef(false);
  useEffect(() => {
    if (!filtersReadyRef.current) { filtersReadyRef.current = true; return; }
    if (localStorage.getItem('swapvoyage_onboarding_completed')) {
      // Read fresh wishlist from localforage to avoid stale closure
      getWishlist().then(freshWishlist => {
        loadDiscoveryStack(freshWishlist, filters);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const handleOnboardingComplete = async (selectedInterests: string[]) => {
    localStorage.setItem('swapvoyage_onboarding_completed', 'true');
    setShowOnboarding(false);

    const newFilters = { ...filters, categories: selectedInterests };
    setFilters(newFilters);

    await loadDiscoveryStack(wishlist, newFilters);

    setTimeout(() => setIsFilterOpen(true), 800);

    setTimeout(() => {
      const hasPrompted = localStorage.getItem('swapvoyage_notif_prompted');
      if (!hasPrompted) setShowNotificationPrompt(true);
    }, 4000);
  };

  const handleLike = useCallback(async () => {
    if (stack.length === 0) return;
    const place = stack[0];
    setHistory(prev => [...prev, place]);
    const updatedWishlist = [place, ...wishlist];
    setWishlist(updatedWishlist);
    setStack(prev => prev.slice(1));
    await addToWishlist(place);
  }, [stack, wishlist]);

  const handlePass = useCallback(() => {
    if (stack.length === 0) return;
    const place = stack[0];
    setHistory(prev => [...prev, place]);
    setStack(prev => prev.slice(1));
  }, [stack]);

  const handleUndo = useCallback(async () => {
    if (history.length === 0) return;
    const lastPlace = history[history.length - 1];
    const wasLiked = wishlist.some(p => p.id === lastPlace.id);
    if (wasLiked) {
      const updatedWishlist = wishlist.filter(p => p.id !== lastPlace.id);
      setWishlist(updatedWishlist);
      await removeFromWishlist(lastPlace.id);
    }
    setStack(prev => [lastPlace, ...prev]);
    setHistory(prev => prev.slice(0, -1));
  }, [history, wishlist]);

  const handleRemoveFromWishlist = useCallback(async (id: string) => {
    setWishlist(prev => prev.filter(p => p.id !== id));
    await removeFromWishlist(id);
  }, []);

  const handleMarkVisited = useCallback(async (place: Place) => {
    // Add to visited — do NOT remove from wishlist (badge shown instead)
    setVisited(prev => {
      if (prev.some(p => p.id === place.id)) return prev;
      return [place, ...prev];
    });
    await addToVisited(place);

    // Clear any existing snackbar timer
    if (visitedSnackbarTimerRef.current) clearTimeout(visitedSnackbarTimerRef.current);
    setVisitedSnackbar(place);
    visitedSnackbarTimerRef.current = setTimeout(() => {
      setVisitedSnackbar(null);
      visitedSnackbarTimerRef.current = null;
    }, 5000);
  }, []);

  const handleUndoVisited = useCallback(async () => {
    if (!visitedSnackbar) return;
    if (visitedSnackbarTimerRef.current) clearTimeout(visitedSnackbarTimerRef.current);
    visitedSnackbarTimerRef.current = null;
    const place = visitedSnackbar;
    setVisitedSnackbar(null);
    setVisited(prev => prev.filter(p => p.id !== place.id));
    await removeFromVisited(place.id);
  }, [visitedSnackbar]);

  const handleOpenNotifications = useCallback(() => {
    const hasPrompted = localStorage.getItem('swapvoyage_notif_prompted');
    if (!hasPrompted) {
      setShowNotificationPrompt(true);
    } else if (Notification.permission === 'default') {
      // Already dismissed before but hasn't granted — offer again
      localStorage.removeItem('swapvoyage_notif_prompted');
      setShowNotificationPrompt(true);
    } else if (Notification.permission === 'granted') {
      alert('Bildirimler zaten aktif ✓');
    } else {
      alert('Bildirim izni tarayıcı ayarlarından etkinleştirilebilir.');
    }
  }, []);

  const handleSignOut = useCallback(async () => {
    try {
      await signOut(auth);
    } catch {}
    // Clear localStorage
    localStorage.removeItem('swapvoyage_onboarding_completed');
    localStorage.removeItem('swapvoyage_user_profile');
    localStorage.removeItem('swapvoyage_notif_prompted');
    localStorage.removeItem('swapvoyage_route_count');
    localStorage.removeItem('swapvoyage_dark_mode');
    // Clear IndexedDB wishlist (localforage)
    await clearWishlist();
    await clearVisited();
    // Reset React state
    setWishlist([]);
    setVisited([]);
    setStack([]);
    setHistory([]);
    setFilters({ location: null, categories: [] });
    setIsDarkMode(true);
    setShowOnboarding(true);
    setView('DISCOVER');
  }, []);

  const visitedIds = useMemo(() => new Set(visited.map(p => p.id)), [visited]);

  const renderContent = () => {
    if (view === 'DISCOVER') {
      // Don't render discover content while onboarding is still active
      if (showOnboarding) return null;
      if (loading) return <SkeletonCard />;

      if (loadError) {
        return (
          <div className="flex flex-col items-center justify-center h-full text-center p-8 pb-32">
            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-red-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <p className="font-serif text-2xl font-bold mb-2 text-white">Bağlantı Sorunu</p>
            <p className="text-xs text-white/40 mb-8 uppercase tracking-widest max-w-[220px] leading-loose">
              Mekanlar yüklenemedi. Bağlantını kontrol edip tekrar dene.
            </p>
            <button
              onClick={() => loadDiscoveryStack(wishlist, filters)}
              className="py-4 px-8 bg-white text-black font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl active:scale-95 transition-all"
            >
              Tekrar Dene
            </button>
          </div>
        );
      }

      return stack.length > 0 ? (
        <ErrorBoundary key={stack[0].id}>
          <PlaceCard key={stack[0].id} place={stack[0]} onLike={handleLike} onPass={handlePass} onUndo={handleUndo} canUndo={history.length > 0} />
        </ErrorBoundary>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-center p-8 pb-32">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-white/40"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <p className="font-serif text-3xl font-bold mb-2">Deste Bitti</p>
          <p className="text-xs text-white/40 mb-10 uppercase tracking-widest max-w-[200px]">Bu aramadaki tüm mekanları keşfettin.</p>

          <div className="flex flex-col gap-4 w-full max-w-[260px]">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="w-full py-4 bg-white text-black font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" /></svg>
              Yeni Bir Arama?
            </button>

            <button
              onClick={() => setView('WISHLIST')}
              className="w-full py-4 bg-white/5 text-white border border-white/10 font-bold uppercase tracking-widest text-xs rounded-2xl active:scale-95 transition-all hover:bg-white/10 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M8.161 2.58a1.875 1.875 0 011.678 0l4.993 2.498c.106.052.23.052.336 0l3.869-1.935A1.875 1.875 0 0121.75 4.82v12.485c0 .71-.401 1.36-1.037 1.677l-4.875 2.437a1.875 1.875 0 01-1.676 0l-4.994-2.497a.375.375 0 00-.336 0l-3.868 1.935A1.875 1.875 0 012.25 19.18V6.695c0-.71.401-1.36 1.036-1.677l4.875-2.437zM9 6a.75.75 0 01.75.75V15a.75.75 0 01-1.5 0V6.75A.75.75 0 019 6zm6.75 3a.75.75 0 00-1.5 0v8.25a.75.75 0 001.5 0V9z" clipRule="evenodd" /></svg>
              Rotanı Gör
            </button>

            {history.length > 0 && (
              <button
                onClick={handleUndo}
                className="w-full py-4 text-white/50 font-bold uppercase tracking-widest text-xs rounded-2xl active:scale-95 transition-all hover:text-white flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M9.53 2.47a.75.75 0 010 1.06L4.81 8.25H15a6.75 6.75 0 010 13.5h-3a.75.75 0 010-1.5h3a5.25 5.25 0 100-10.5H4.81l4.72 4.72a.75.75 0 11-1.06 1.06l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 011.06 0z" clipRule="evenodd" /></svg>
                Geri Al
              </button>
            )}
          </div>
        </div>
      );
    }

    if (view === 'WISHLIST') {
      return (
        <Suspense fallback={<SkeletonCard />}>
          <Wishlist items={wishlist} onRemove={handleRemoveFromWishlist} onMarkVisited={handleMarkVisited} visitedIds={visitedIds} />
        </Suspense>
      );
    }

    if (view === 'HISTORY') {
      if (historySubView === 'MAP') {
        return (
          <JourneyMap
            wishlist={wishlist}
            visited={visited}
            focusPlace={mapFocusPlace}
            onClose={() => { setHistorySubView('LIST'); setMapFocusPlace(null); }}
          />
        );
      }
      return (
        <GezmisimList
          visited={visited}
          onShowMap={(place) => { setMapFocusPlace(place ?? null); setHistorySubView('MAP'); }}
        />
      );
    }

    if (view === 'PROFILE') {
      return (
        <Suspense fallback={<SkeletonCard />}>
          <Profile onOpenSettings={() => setIsSettingsOpen(true)} onSignOut={handleSignOut} onOpenNotifications={handleOpenNotifications} />
        </Suspense>
      );
    }
  };

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <div className="flex items-center justify-center w-full h-full">
      {/* Mobile Frame Container */}
      <div className="w-full h-full md:w-[414px] md:h-[896px] md:max-h-[95vh] aurora-bg flex flex-col overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] relative transition-colors duration-500 text-brand-black dark:text-white md:rounded-[40px] md:border-[8px] md:border-[#1a1a1a]">

        {/* Onboarding Overlay */}
        <Suspense fallback={null}>
          {showOnboarding && <Onboarding onComplete={handleOnboardingComplete} />}

          {/* Admin Panel Overlay */}
          {isAdminOpen && (
            <AdminPanel
              isOpen={isAdminOpen}
              onClose={() => setIsAdminOpen(false)}
              onDbUpdate={() => loadDiscoveryStack(wishlist, filters)}
            />
          )}

          {/* Notification Permission Prompt */}
          {showNotificationPrompt && (
            <NotificationPrompt
              isOpen={showNotificationPrompt}
              onAccept={() => { setShowNotificationPrompt(false); localStorage.setItem('swapvoyage_notif_prompted', 'true'); }}
              onDecline={() => { setShowNotificationPrompt(false); localStorage.setItem('swapvoyage_notif_prompted', 'true'); }}
            />
          )}
        </Suspense>

        {/* Header / Search Bar */}
        {view === 'DISCOVER' && (
          <div className="absolute top-0 left-0 right-0 h-24 flex items-end justify-between px-6 pb-4 z-50 pointer-events-none bg-gradient-to-b from-black/80 to-transparent">
            <button onClick={() => setIsSettingsOpen(true)} className="p-2.5 pointer-events-auto bg-white/5 backdrop-blur-md rounded-full text-white/90 hover:bg-white/10 border border-white/10 transition-all active:scale-95">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" /></svg>
            </button>

            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex-1 mx-4 h-11 pointer-events-auto bg-white/10 backdrop-blur-md rounded-full border border-white/10 flex items-center px-4 gap-2 hover:bg-white/15 transition-all active:scale-95 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-white/50 group-hover:text-white/80"><path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" /></svg>
              <span className="text-xs font-medium text-white/50 group-hover:text-white/90">
                {filters.location
                  ? filters.location.startsWith('COORDS:')
                    ? 'Yakınımda Ara'
                    : filters.location
                  : 'Şehir, bölge veya mekan ara...'}
              </span>
            </button>

            <button onClick={() => setIsFilterOpen(true)} className="p-2.5 pointer-events-auto bg-white/5 backdrop-blur-md rounded-full text-white/90 hover:bg-white/10 border border-white/10 transition-all active:scale-95">
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z" clipRule="evenodd" /></svg>
                {filters.categories.length > 0 && <span className="absolute -top-1 -right-1 w-2 h-2 bg-brand-purple rounded-full"></span>}
              </div>
            </button>
          </div>
        )}

        <Suspense fallback={null}>
          {isSettingsOpen && (
            <SettingsModal
              isOpen={isSettingsOpen}
              onClose={() => setIsSettingsOpen(false)}
              isDarkMode={isDarkMode}
              toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
              onOpenAdmin={() => { setIsSettingsOpen(false); setIsAdminOpen(true); }}
              isAdmin={isAdminUser}
            />
          )}
          {isFilterOpen && (
            <CityFilter isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} onApplyFilters={setFilters} currentFilters={filters} />
          )}
        </Suspense>

        {/* Content Area */}
        <main className="flex-1 relative overflow-hidden h-full">
          {renderContent()}
          <Navigation currentView={view} setView={setView} wishlistCount={wishlist.length} />

          {/* Visited Undo Snackbar */}
          {visitedSnackbar && (
            <div className="absolute bottom-24 left-4 right-4 z-[75] animate-in slide-in-from-bottom-4 fade-in duration-300 pointer-events-auto">
              <div className="bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-2xl">
                <div className="w-8 h-8 flex-shrink-0 bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#10b981" className="w-4 h-4">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs font-bold truncate">{visitedSnackbar.name}</p>
                  <p className="text-white/40 text-[10px]">Gezilen mekanlara eklendi</p>
                </div>
                <button
                  onClick={handleUndoVisited}
                  className="flex-shrink-0 px-3 py-1.5 text-emerald-400 text-[10px] font-black uppercase tracking-wider hover:text-emerald-300 transition-colors active:scale-95"
                >
                  Geri Al
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
