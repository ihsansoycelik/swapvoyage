import { Place } from '../types';

export interface AppContentProfile {
  id: string;
  name: string;
  systemPromptRole: string;
  basePrompt: string;
  constraints: string[];
  fallbackPlaces: Place[];
}

export const TURKEY_HIDDEN_GEMS_PROFILE: AppContentProfile = {
  id: 'turkey_hidden_gems',
  name: 'Hidden Gems of Turkey',
  systemPromptRole: 'You are a premium travel concierge.',
  basePrompt: 'Curate 3 unique, "hidden gem" travel destinations in Turkey.',
  constraints: [
    'EXCLUDE: Cappadocia, Ephesus, Pamukkale, Hagia Sophia (unless specifically requested).',
    'Focus on places like Sagalassos, Aizanoi, hidden Lycian bays, yaylas, çıralı, ruins, canyon hikes.',
    '\'shortDescription\': EXACTLY 1 or 2 short sentences. Must be a "hook". E.g., "Mermer gün batımında pembeye döner."',
    '\'tags\': Use ONLY these Turkish category IDs (pick 2-3 that fit best): Doğa, Tarih, Antik Kent, Gastronomi, Deniz, Müze, Macera, Sessizlik.',
    '\'images\': 5 English keywords. ADD "cinematic", "scenic", "no people" to keywords to ensure high quality style.',
    '\'prompts\': 2 Q&A pairs. Question: Short (e.g. "Büyülü Saat"). Answer: Actionable tip.'
  ],
  fallbackPlaces: [
    {
      id: "1",
      name: "Sagalassos",
      location: "Ağlasun, Burdur",
      shortDescription: "Bulutların üzerindeki imparatorluk. Antoninler Çeşmesi'nden akan suyun sesi bin yıldır değişmedi.",
      images: ["sagalassos antonin fountain cinematic", "ancient roman theater mountain view", "marble statues dramatic lighting", "stone ruins sunset", "turkey ancient city landscape"],
      tags: ["Antik Kent", "Tarih", "Sessizlik"],
      prompts: [
        { question: "Büyüleyici An", answer: "Sislerin dağıldığı sabah saatlerinde çeşmenin sesiyle uyanmak." },
        { question: "Yerel Lezzet", answer: "Ağlasun meydanında ceviz ezmesi yemeden dönmeyin." }
      ],
      coordinates: { lat: 37.6766, lng: 30.5194 }
    },
    {
      id: "2",
      name: "Aizanoi",
      location: "Çavdarhisar, Kütahya",
      shortDescription: "Dünyanın en iyi korunmuş Zeus tapınağı. Sütunların altındaki yer altı galerisi mistik bir deneyim.",
      images: ["temple of zeus aizanoi cinematic", "roman bridge reflection water", "ancient stadium dramatic", "stone columns night sky", "historic ruins turkey"],
      tags: ["Antik Kent", "Tarih", "Macera"],
      prompts: [
        { question: "Fotoğraf İpucu", answer: "Tapınağın arkasındaki dolunay manzarası ödüllük kareler verir." },
        { question: "Gizli Köşe", answer: "Tapınağın altındaki tonozlu galeri, dünyanın en mistik yerlerinden biri." }
      ],
      coordinates: { lat: 39.2017, lng: 29.6105 }
    },
    {
      id: "3",
      name: "Titus Tüneli",
      location: "Samandağ, Hatay",
      shortDescription: "Roma mühendisliğinin çılgın projesi. Dağı elle oyarak yapılan bu tünel doğayla bütünleşmiş.",
      images: ["titus tunnel hatay cinematic", "cave tombs rock cut", "ancient engineering light shaft", "green canyon turkey nature", "mossy rock tunnel"],
      tags: ["Doğa", "Macera", "Tarih"],
      prompts: [
        { question: "Dikkat", answer: "Tünelin sonundaki Beşikli Mağara'daki kaya mezarları tüyler ürpertici güzellikte." },
        { question: "Hazırlık", answer: "Zemin kaygan olabilir, mutlaka iyi bir yürüyüş ayakkabısı giy." }
      ],
      coordinates: { lat: 36.1228, lng: 35.9287 }
    }
  ]
};

export const ACTIVE_PROFILE = TURKEY_HIDDEN_GEMS_PROFILE;
