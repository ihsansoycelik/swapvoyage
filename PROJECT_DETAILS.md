# Proje Detayları

## Proje Amacı
Türkiye'deki az bilinen, "gizli kalmış" (hidden gem) turizm noktalarını keşfetmek, seyahat planları/güzergahları hazırlamak ve bunları harita üzerinde görselleştirmek için geliştirilmiş yapay zeka (Google Gemini) destekli bir seyahat PWA (Progressive Web App) uygulamasıdır.

## Öne Çıkan Özellikler
* **Yapay Zeka Destekli Öneri Motoru (`geminiService.ts`)**: `gemini-2.5-flash-preview` modeli ile kullanıcının konumuna (koordinatlarına) veya seçtiği kategorilere (Tarih, Doğa, Gastronomi vb.) göre özelleştirilmiş, reklam içermeyen seyahat noktaları üretir.
* **Yapay Zeka ile Görsel Üretimi**: `gemini-2.5-flash-image` modelini kullanarak keşfedilen yerler için otomatik ve yüksek kaliteli seyahat fotoğrafları üretir.
* **Rota Optimizasyonu**: Seçilen mekanları, seyahat edilecek gün sayısına göre coğrafi yakınlıklarına bakarak yapay zeka aracılığıyla günlük rotalara böler.
* **İnteraktif Harita Desteği (`JourneyMap`)**: Leaflet kütüphanesi kullanarak seyahat noktalarını ve planlanan günlük rotaları harita üzerinde görselleştirir.
* **Yerel Depolama (Offline First)**: `localforage` aracılığıyla istek listesi, ziyaret edilen yerler ve keşif geçmişini cihaz hafızasında tutarak internet olmadığında da çalışır.
* **PWA Desteği**: `vite-plugin-pwa` entegrasyonu sayesinde mobil ve masaüstü cihazlara kurulabilir.
* **Yönetici Paneli & Firebase**: Firebase Auth tabanlı admin girişi ve yerel verileri yönetmek/düzenlemek için Firestore kuralları.

## Eksikler & Engeller
* **API Anahtarı Bağımlılığı**: Uygulamanın çalışması için geçerli bir `GEMINI_API_KEY` gereklidir. API anahtarı olmadığında veya limit aşıldığında sistem statik yedek veri (fallback) kümesini kullanır.
* **API Zaman Aşımı Sınırları**: Yavaş internet bağlantılarında yapay zeka ve görsel üretimi API'leri zaman aşımına (6s / 3s) uğrayarak yedek planlara geçebilir.

## Teknoloji Yığını
* **Frontend**: React 19, TypeScript, Tailwind CSS, Leaflet (Harita)
* **Yapay Zeka**: `@google/genai` (Gemini 2.5 Flash / Flash Image modelleri)
* **Veri & Kimlik Doğrulama**: Firebase Auth, Cloud Firestore, localforage (IndexedDB)
* **Derleme ve Dağıtım**: Vite, Vite PWA Plugin, Workbox (Service Worker önbellekleme)
