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

export const PARIS_BARS_PROFILE: AppContentProfile = {
  id: 'paris_bars',
  name: 'Hidden Bars in Paris',
  systemPromptRole: 'You are a local Parisian nightlife connoisseur and mixology expert.',
  basePrompt: 'Curate 3 unique, "under the radar" speakeasies or hidden bars in Paris, France.',
  constraints: [
    'EXCLUDE: Very famous tourist bars like Harry\'s New York Bar, Hemingway Bar, or Buddha Bar.',
    'Focus on hidden entrances, speakeasies, experimental mixology, or highly curated local spots.',
    '\'shortDescription\': EXACTLY 1 or 2 short sentences. Must be a "hook". E.g., "Walk through the freezer door in the pizzeria to find this candlelit cocktail haven."',
    '\'images\': 5 English keywords. ADD "cinematic, moody lighting, cocktail, speakeasy" to ensure high quality style.',
    '\'prompts\': 2 Q&A pairs. Question: Short (e.g. "Signature Drink", "How to Enter"). Answer: Actionable tip or secret password.'
  ],
  fallbackPlaces: [
    {
      id: "p1",
      name: "Lavomatic",
      location: "10th Arrondissement, Paris",
      shortDescription: "Hidden behind a washing machine in a fully functional laundromat. Ascend the tiny staircase to a pop-art cocktail haven.",
      images: ["hidden bar entrance laundromat cinematic", "quirky cocktail swing seat paris", "moody lighting mixology speakeasy", "neon lights cozy hidden bar", "colorful cocktail ingredients cinematic"],
      tags: ["Speakeasy", "Cocktails", "Quirky"],
      prompts: [
        { question: "How to Enter", answer: "Look for the washing machine that doubles as a secret door. Pull the machine on the far left." },
        { question: "Signature Drink", answer: "Try the 'Basil Smash', incredibly refreshing." }
      ],
      coordinates: { lat: 48.8687, lng: 2.3601 }
    },
    {
      id: "p2",
      name: "Moonshiner",
      location: "11th Arrondissement, Paris",
      shortDescription: "Step through the walk-in fridge of Da Vito pizzeria to enter a Prohibition-era jazz bar.",
      images: ["candlelit prohibition bar cinematic", "vintage leather sofa speakeasy", "jazz club paris hidden", "moonshiner whiskey glass cinematic", "pizzeria secret entrance mood"],
      tags: ["Jazz", "Prohibition", "Whiskey"],
      prompts: [
        { question: "Secret Entrance", answer: "Walk confidently to the back of Da Vito pizzeria and open the metal freezer door." },
        { question: "Vibe", answer: "Very dark, intimate, with jazz playing in the background." }
      ],
      coordinates: { lat: 48.8569, lng: 2.3734 }
    },
    {
      id: "p3",
      name: "Le Syndicat",
      location: "10th Arrondissement, Paris",
      shortDescription: "Disguised behind an unassuming, poster-covered façade. Once inside, it's a sleek temple celebrating 100% French spirits.",
      images: ["grungy facade hidden bar paris", "sleek modern bar interior cinematic", "french spirits cocktails mixology", "moody speakeasy golden hour light", "bartender shaking cocktail cinematic"],
      tags: ["French Spirits", "Hip Hop", "Modern"],
      prompts: [
        { question: "Music", answer: "Expect an incredible playlist of old-school and modern hip hop." },
        { question: "What to Drink", answer: "Ask for something made with Eau de Vie; they specialize in rare French liquors." }
      ],
      coordinates: { lat: 48.8732, lng: 2.3524 }
    }
  ]
};

// CURRENT ACTIVE PROFILE
// To switch to Paris Bars, change this to PARIS_BARS_PROFILE
export const ACTIVE_PROFILE = TURKEY_HIDDEN_GEMS_PROFILE;
