
import { Place } from "../types";
import { db, auth, handleFirestoreError, OperationType } from "./firebase";
import { collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";
import localforage from "localforage";

const LOCAL_STORAGE_KEY = 'swapvoyage_local_db_v1';
const WISHLIST_KEY = 'swapvoyage_wishlist_v1';
const ADMIN_EMAIL = 'soycelikihsan@gmail.com';

// Initialize localforage
localforage.config({
  name: 'SwapVoyageApp',
  storeName: 'swapvoyage_store'
});

// --- Global Mekan Havuzu (CMS Verileri) ---
export const getGlobalPlaces = async (): Promise<Place[]> => {
  try {
    const isAdmin = auth.currentUser?.email === ADMIN_EMAIL;
    let querySnapshot;
    if (isAdmin) {
       querySnapshot = await getDocs(collection(db, "places"));
    } else {
       const { query, where } = await import("firebase/firestore");
       const q = query(collection(db, "places"), where("status", "==", "published"));
       querySnapshot = await getDocs(q);
    }
    const data: Place[] = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data() as Place);
    });
    return data;
  } catch (error) {
    console.error("Firestore getGlobalPlaces failed, falling back to localforage.", error);
    // Silent fail over to local storage
  }
  
  const localData = await localforage.getItem<Place[]>(LOCAL_STORAGE_KEY);
  return localData || [];
};

export const saveGlobalPlace = async (place: Place): Promise<void> => {
  try {
    await setDoc(doc(db, "places", place.id), place);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, "places");
  }

  const current = await localforage.getItem<Place[]>(LOCAL_STORAGE_KEY) || [];
  const index = current.findIndex(p => p.id === place.id);
  let updated;
  if (index >= 0) {
    updated = [...current];
    updated[index] = place;
  } else {
    updated = [place, ...current];
  }
  await localforage.setItem(LOCAL_STORAGE_KEY, updated);
};

export const deleteGlobalPlace = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, "places", id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, "places");
  }

  const current = await localforage.getItem<Place[]>(LOCAL_STORAGE_KEY) || [];
  const updated = current.filter(p => p.id !== id);
  await localforage.setItem(LOCAL_STORAGE_KEY, updated);
};

// --- Kullanıcı Wishlist ---
export const getWishlist = async (): Promise<Place[]> => {
  const data = await localforage.getItem<Place[]>(WISHLIST_KEY);
  return data || [];
};

export const addToWishlist = async (place: Place): Promise<void> => {
  const current = await getWishlist();
  if (!current.some(p => p.id === place.id)) {
    const updated = [place, ...current];
    await localforage.setItem(WISHLIST_KEY, updated);
    
    if (auth.currentUser) {
      try {
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        const wishlistIds = updated.map(p => p.id);
        const visitedIds = (await getVisited()).map(p => p.id);
        await setDoc(userDocRef, {
          wishlist: wishlistIds,
          visited: visitedIds,
          updatedAt: new Date().toISOString()
        }, { merge: true });
      } catch (err) {
        console.error("Failed to sync wishlist to Firestore:", err);
      }
    }
  }
};

export const removeFromWishlist = async (id: string): Promise<void> => {
  const current = await getWishlist();
  const updated = current.filter(p => p.id !== id);
  await localforage.setItem(WISHLIST_KEY, updated);

  if (auth.currentUser) {
    try {
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      const wishlistIds = updated.map(p => p.id);
      const visitedIds = (await getVisited()).map(p => p.id);
      await setDoc(userDocRef, {
        wishlist: wishlistIds,
        visited: visitedIds,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (err) {
      console.error("Failed to sync wishlist removal to Firestore:", err);
    }
  }
};

export const clearWishlist = async (): Promise<void> => {
  await localforage.removeItem(WISHLIST_KEY);
};

// --- Kullanıcı Gezdim (Visited) ---
const VISITED_KEY = 'swapvoyage_visited_v1';

export const getVisited = async (): Promise<Place[]> => {
  const data = await localforage.getItem<Place[]>(VISITED_KEY);
  return data || [];
};

export const addToVisited = async (place: Place): Promise<void> => {
  const current = await getVisited();
  if (!current.some(p => p.id === place.id)) {
    const stamped = { ...place, visitedAt: Date.now() };
    const updated = [stamped, ...current];
    await localforage.setItem(VISITED_KEY, updated);

    if (auth.currentUser) {
      try {
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        const wishlistIds = (await getWishlist()).map(p => p.id);
        const visitedIds = updated.map(p => p.id);
        await setDoc(userDocRef, {
          wishlist: wishlistIds,
          visited: visitedIds,
          updatedAt: new Date().toISOString()
        }, { merge: true });
      } catch (err) {
        console.error("Failed to sync visited to Firestore:", err);
      }
    }
  }
};

export const removeFromVisited = async (id: string): Promise<void> => {
  const current = await getVisited();
  const updated = current.filter(p => p.id !== id);
  await localforage.setItem(VISITED_KEY, updated);

  if (auth.currentUser) {
    try {
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      const wishlistIds = (await getWishlist()).map(p => p.id);
      const visitedIds = updated.map(p => p.id);
      await setDoc(userDocRef, {
        wishlist: wishlistIds,
        visited: visitedIds,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (err) {
      console.error("Failed to sync visited removal to Firestore:", err);
    }
  }
};

export const clearVisited = async (): Promise<void> => {
  await localforage.removeItem(VISITED_KEY);
};
