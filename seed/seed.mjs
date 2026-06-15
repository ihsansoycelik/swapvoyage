/**
 * SwapVoyage — Firestore Seed Script
 *
 * Kullanım:
 *   FIREBASE_PASSWORD=şifreniz node seed/seed.mjs
 *
 * Veya .env.seed dosyası:
 *   FIREBASE_PASSWORD=şifreniz
 *   node seed/seed.mjs
 */

import { places } from './places_data.mjs';

// ─── Config ──────────────────────────────────────────────────────────────────

const FIREBASE_API_KEY   = 'AIzaSyABLVWpFipr9x8ttdsXY4Inb8BGTzLyevo';
const FIREBASE_PROJECT   = 'gen-lang-client-0292486468';
const FIREBASE_DATABASE  = 'ai-studio-0573f744-ee51-405d-bf56-06d28ca43a1e';
const ADMIN_EMAIL        = 'soycelikihsan@gmail.com';
const ADMIN_PASSWORD     = process.env.FIREBASE_PASSWORD;

if (!ADMIN_PASSWORD) {
  console.error('\n❌  FIREBASE_PASSWORD ortam değişkeni eksik.\n');
  console.error('   Çalıştırma:  FIREBASE_PASSWORD=şifreniz node seed/seed.mjs\n');
  process.exit(1);
}

// ─── Firebase Auth ─────────────────────────────────────────────────────────

async function signIn() {
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD, returnSecureToken: true }),
    }
  );
  const data = await res.json();
  if (!data.idToken) {
    console.error('Auth hatası:', JSON.stringify(data, null, 2));
    process.exit(1);
  }
  console.log(`✅  ${ADMIN_EMAIL} olarak giriş yapıldı.`);
  return data.idToken;
}

// ─── Firestore REST Helpers ────────────────────────────────────────────────

const FIRESTORE_BASE = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT}/databases/${FIREBASE_DATABASE}/documents`;

/** JS değerini Firestore REST API formatına çevirir */
function toFirestore(value) {
  if (value === null || value === undefined) return { nullValue: null };
  if (typeof value === 'boolean')   return { booleanValue: value };
  if (typeof value === 'number')    return { doubleValue: value };
  if (typeof value === 'string')    return { stringValue: value };
  if (Array.isArray(value)) {
    return { arrayValue: { values: value.map(toFirestore) } };
  }
  if (typeof value === 'object') {
    const fields = {};
    for (const [k, v] of Object.entries(value)) {
      fields[k] = toFirestore(v);
    }
    return { mapValue: { fields } };
  }
  return { stringValue: String(value) };
}

/** Place nesnesini Firestore document'ına çevirir */
function placeToDoc(place) {
  const fields = {};
  for (const [k, v] of Object.entries(place)) {
    fields[k] = toFirestore(v);
  }
  return { fields };
}

/** Firestore'a bir place yazar (upsert) */
async function writePlace(idToken, place) {
  const url = `${FIRESTORE_BASE}/places/${place.id}`;
  const res = await fetch(url, {
    method: 'PATCH',  // PATCH = upsert (create or overwrite)
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`,
    },
    body: JSON.stringify(placeToDoc(place)),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(`${place.id}: ${JSON.stringify(err.error?.message || err)}`);
  }
  return await res.json();
}

// ─── Main ──────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🌍  SwapVoyage Seed — ${places.length} mekan yükleniyor...\n`);

  const idToken = await signIn();

  let success = 0;
  let failed = 0;
  const errors = [];

  for (const place of places) {
    try {
      await writePlace(idToken, place);
      console.log(`  ✅  ${place.name} (${place.location})`);
      success++;
    } catch (err) {
      console.error(`  ❌  ${place.name}: ${err.message}`);
      errors.push({ id: place.id, name: place.name, error: err.message });
      failed++;
    }

    // Rate limiting: 2 istek/saniye — Firestore ücretsiz tier için yeterli
    await new Promise(r => setTimeout(r, 500));
  }

  console.log(`\n─────────────────────────────────`);
  console.log(`✅  Başarılı : ${success}`);
  console.log(`❌  Hata     : ${failed}`);
  if (errors.length > 0) {
    console.log('\nHata detayları:');
    errors.forEach(e => console.log(`  - [${e.id}] ${e.name}: ${e.error}`));
  }
  console.log(`─────────────────────────────────\n`);
}

main().catch(err => {
  console.error('Beklenmedik hata:', err);
  process.exit(1);
});
