/**
 * SwapVoyage — Curated Turkish destination dataset
 * 60 hand-picked places, all required fields, status: 'published'
 */

export const places = [

  // ─── EGE / AEGEAN ────────────────────────────────────────────────────────

  {
    id: "afrodisias",
    name: "Afrodisias",
    location: "Karacasu, Aydın",
    district: "Karacasu",
    shortDescription: "Roma dünyasının heykel başkenti. Müzedeki mermer yüzler iki bin yıldır aynı bakışla sizi seyrediyor.",
    images: ["aphrodisias ancient ruins marble cinematic", "roman theater ruins mountain backdrop scenic", "aphrodisias museum statues dramatic lighting", "ancient greek city aydın turkey atmospheric no people", "marble columns ruins golden hour"],
    prompts: [
      { question: "Kaçırma", answer: "Sebasteion frizlerindeki İmparator Augustus kabartmaları, bugüne ulaşmış en mükemmel Roma heykel döngüsü." },
      { question: "Zamanlama", answer: "Müze sabah 8'de açılıyor; ilk yarım saatte tüm salona neredeyse tek başınıza kalabilirsiniz." }
    ],
    tags: ["Antik Kent", "Tarih", "Müze"],
    coordinates: { lat: 37.7108, lng: 28.7239 },
    entryFee: "₺400",
    visitDuration: "3-4 saat",
    bestSeason: "Nisan–Haziran, Eylül–Ekim",
    status: "published"
  },

  {
    id: "priene",
    name: "Priene",
    location: "Güllübahçe, Aydın",
    district: "Söke",
    shortDescription: "Büyük İskender'in taşını taşa koyduğu Athena tapınağı, Büyük Menderes ovasına beş sütunuyla hâlâ meydan okuyor.",
    images: ["priene ancient ruins athena temple cinematic", "hellenistic theater hillside scenic", "stone columns aegean valley dramatic", "ancient greek city hilltop atmospheric", "priene sunset ruins no people"],
    prompts: [
      { question: "Panorama", answer: "Tapınaktan Büyük Menderes Ovası'na bakan görüş, antik haritaları canlandırır." },
      { question: "Gizli Spot", answer: "Tiyatronun üst basamaklarından altta eski nehir yatağının izlerini görebilirsiniz." }
    ],
    tags: ["Antik Kent", "Tarih", "Sessizlik"],
    coordinates: { lat: 37.6580, lng: 27.2950 },
    entryFee: "₺200",
    visitDuration: "2-3 saat",
    bestSeason: "Mart–Haziran, Eylül–Kasım",
    status: "published"
  },

  {
    id: "labranda",
    name: "Labranda",
    location: "Milas, Muğla",
    district: "Milas",
    shortDescription: "Zeytinlikler arasında saklı bu Zeus kutsal alanı, Karia Krallığı'nın en özel sırrı. Yol bulması zor, görünce anlaşılıyor neden.",
    images: ["labranda zeus sanctuary ruins cinematic", "ancient temple olive grove muğla scenic", "remote archaeological site turkey dramatic", "hellenistic ruins forest no people atmospheric", "labranda milas ruins golden light"],
    prompts: [
      { question: "Nasıl Gidilir", answer: "Milas'tan güneye, Labranda tabelasını takip edin; son 5 km bozuk asfalt ama tamamen değer." },
      { question: "Bağlam", answer: "Karia Krallığı'nın en kutsal noktasıydı; Maussollos burada yıllık festivaller düzenledi." }
    ],
    tags: ["Antik Kent", "Tarih", "Macera"],
    coordinates: { lat: 37.3789, lng: 27.8542 },
    entryFee: "Ücretsiz",
    visitDuration: "1-2 saat",
    bestSeason: "Nisan–Haziran",
    status: "published"
  },

  {
    id: "latmos_herakleia",
    name: "Latmos Dağı & Herakleia",
    location: "Bafa Gölü, Muğla",
    district: "Milas",
    shortDescription: "Bafa Gölü kıyısında dev granit kütleleri arasında saklı antik bir liman kenti. Ay tanrısı Selene'nin Endymion'u izlediği dağ.",
    images: ["herakleia latmos ruins lake bafa cinematic", "granite rocks ancient ruins dramatic", "bafa lake reflection ruins turkey scenic", "moon god sanctuary stone walls atmospheric no people", "aegean lake mountain ruins golden hour"],
    prompts: [
      { question: "Tekne Turu", answer: "Bafa Gölü'nde tekne tutarak su üzerinden antik surları ve Endymion Mağarası'na ulaşabilirsiniz." },
      { question: "Kaya Resimleri", answer: "Rehber eşliğinde dağdaki prehistorik kaya resimlerini bulmak mümkün — erken rezervasyon şart." }
    ],
    tags: ["Tarih", "Doğa", "Macera"],
    coordinates: { lat: 37.4867, lng: 27.5583 },
    entryFee: "Ücretsiz",
    visitDuration: "Yarım gün",
    bestSeason: "Nisan–Haziran, Eylül–Ekim",
    status: "published"
  },

  {
    id: "teos",
    name: "Teos",
    location: "Sığacık, İzmir",
    district: "Seferihisar",
    shortDescription: "Antik dünyada şarap ve müziğin şehri. Dionysos Tapınağı'nın iki sütunu bugün de Sığacık rüzgarında titreşiyor.",
    images: ["teos dionysus temple ruins izmir cinematic", "ancient city seferihisar scenic ruins", "marble columns dionysus dramatic lighting", "aegean archaeological site no people atmospheric", "teos ruins sea view golden hour"],
    prompts: [
      { question: "Kombin Et", answer: "Ziyaret sonrası 3 km uzaktaki Sığacık limanında taze balık yemek ritüeli olsun." },
      { question: "Az Bilinen", answer: "Şair Anakreon'un doğduğu şehir; tiyatrosu antik dünyanın en büyüklerinden biriydi." }
    ],
    tags: ["Antik Kent", "Tarih", "Sessizlik"],
    coordinates: { lat: 38.1722, lng: 26.7853 },
    entryFee: "Ücretsiz",
    visitDuration: "1-2 saat",
    bestSeason: "Tüm yıl",
    status: "published"
  },

  {
    id: "sirince",
    name: "Şirince",
    location: "Selçuk, İzmir",
    district: "Selçuk",
    shortDescription: "Beyaz badanalı evleri ve meyve şaraplarıyla İzmir'in gizlisi artık değil ama sakin sabahları hâlâ sihir dolu.",
    images: ["sirince village white houses izmir cinematic", "greek revival houses vineyard scenic", "cobblestone village turkey dramatic hillside", "authentic greek turkish village no people atmospheric", "sirince morning mist village golden light"],
    prompts: [
      { question: "Doğru Saat", answer: "Turlar 10-17 arası geliyor; sabah 8-10 ve akşam 17 sonrası tamamen farklı bir köy." },
      { question: "Tadın", answer: "Erik, çilek ve böğürtlen şarapları olan yerel şaraphaneleri es geçmeyin." }
    ],
    tags: ["Gastronomi", "Tarih", "Sessizlik"],
    coordinates: { lat: 37.9415, lng: 27.4390 },
    entryFee: "Ücretsiz",
    visitDuration: "2-3 saat",
    bestSeason: "Mayıs–Haziran, Eylül–Ekim",
    status: "published"
  },

  {
    id: "euromos",
    name: "Euromos Zeus Tapınağı",
    location: "Selimiye, Muğla",
    district: "Milas",
    shortDescription: "Otoyol kenarında duran bu on altı sütunlu tapınak yüzde doksan tam. Bir camla ayrılmış olsaydı müzeye koyarlardı.",
    images: ["euromos zeus temple ruins muğla cinematic", "roman temple sixteen columns dramatic", "ancient temple roadside turkey scenic no people", "milas ruins countryside atmospheric", "corinthian columns ruins golden hour"],
    prompts: [
      { question: "Pratik", answer: "D550 karayolu üzerinde, park yeri var; geçerken bile durulabilir." },
      { question: "Neden Özel", answer: "Sütunların çoğu orijinal; hiç 'restorasyon' görmemiş nadir antik yapılardan biri." }
    ],
    tags: ["Antik Kent", "Tarih"],
    coordinates: { lat: 37.3467, lng: 27.7000 },
    entryFee: "₺60",
    visitDuration: "30-45 dakika",
    bestSeason: "Tüm yıl",
    status: "published"
  },

  // ─── AKDENİZ / MEDITERRANEAN ─────────────────────────────────────────────

  {
    id: "kabak_koyu",
    name: "Kabak Koyu",
    location: "Faralya, Muğla",
    district: "Fethiye",
    shortDescription: "Ölüdeniz'in bilinen tarafından 8 km güneyde, ulaşılması güç bu cennet koy arabalara kapalı. Yürüyerek ya da tekneyle.",
    images: ["kabak bay fethiye turquoise sea cinematic", "hidden cove turkey mediterranean scenic", "steep cliff bay dramatic aerial", "remote beach türkiye no people atmospheric", "kabak camping beach sunset golden hour"],
    prompts: [
      { question: "Nasıl Gidilir", answer: "Faralya'dan yaklaşık 45 dakikalık dik yürüyüş veya günlük tekne turlarıyla ulaşılır." },
      { question: "Konaklama", answer: "Koyda birkaç bungalov ve kamp alanı var; rezervasyon olmadan sezon boyunca zor." }
    ],
    tags: ["Deniz", "Doğa", "Macera"],
    coordinates: { lat: 36.5200, lng: 29.1283 },
    entryFee: "Ücretsiz",
    visitDuration: "1-2 gün",
    bestSeason: "Mayıs–Ekim",
    status: "published"
  },

  {
    id: "cirali",
    name: "Çıralı & Kimera",
    location: "Kemer, Antalya",
    district: "Kemer",
    shortDescription: "Gece yakılmayan ateşler sabaha kadar yanıyor. Çıralı'nın kumullarında sonsuzmuş gibi hissedilir.",
    images: ["chimaera flames night cirali cinematic", "eternal fire lycian coast dramatic", "cirali beach sea turtles scenic", "antalya coast lycian ruins atmospheric no people", "chimaera flames night sky stars"],
    prompts: [
      { question: "Gece Yürüyüşü", answer: "Kimera'daki sonsuz alevler (metan gazı) akşam karanlığında en dramatik halini alıyor; 45 dakikalık tırmanış ödüllendirici." },
      { question: "Deniz Kaplumbağaları", answer: "Haziran–Ağustos arası Caretta caretta kaplumbağaları kumula yumurtluyor; gece sahile ışık tutmayın." }
    ],
    tags: ["Doğa", "Deniz", "Sessizlik"],
    coordinates: { lat: 36.4174, lng: 30.4733 },
    entryFee: "Ücretsiz",
    visitDuration: "1-2 gün",
    bestSeason: "Nisan–Haziran, Eylül–Ekim",
    status: "published"
  },

  {
    id: "termessos",
    name: "Termessos",
    location: "Güllük Dağı, Antalya",
    district: "Korkuteli",
    shortDescription: "Büyük İskender bile zaptedemedi bu dağ şehrini. 1050 metre yüksekte, sis içinde yükselen tiyatronun seyrettikleri hep hep değişti.",
    images: ["termessos ancient theater mountain cinematic", "antalya ruins misty dramatic", "hellenistic city cliffside scenic", "mountain ruins turkey no people atmospheric", "termessos theater sunrise golden hour"],
    prompts: [
      { question: "Yürüyüş", answer: "Kapıdan tiyatroya yükselen 4 km'lik yol zorlu; iyi ayakkabı ve su şart." },
      { question: "Ekstra", answer: "Tiyatronun arkasındaki nekropolde pek çok lahit vadiye yuvarlanmış durumda — gizemli bir atmosfer." }
    ],
    tags: ["Antik Kent", "Doğa", "Macera"],
    coordinates: { lat: 37.0392, lng: 30.4578 },
    entryFee: "₺150",
    visitDuration: "3-4 saat",
    bestSeason: "Mart–Mayıs, Eylül–Kasım",
    status: "published"
  },

  {
    id: "simena_kalekoy",
    name: "Simena / Kaleköy",
    location: "Kaş, Antalya",
    district: "Kaş",
    shortDescription: "Tekne olmadan ulaşılamayan bu köyde kale, ev ve hamam denize yarım metre mesafede. Sualtındaki başları hâlâ eski yüzlerini koruyor.",
    images: ["simena kekova sunken ruins cinematic", "lycian underwater ruins dramatic", "kaleköy castle sea antalya scenic", "submerged ancient city turkey no people atmospheric", "kekova island ruins sunset golden hour"],
    prompts: [
      { question: "Tekne", answer: "Kaş veya Üçağız'dan günlük teknelerle Kekova körfezini gezerken sualtı Likya kalıntılarını görürsünüz." },
      { question: "Yüzmek", answer: "Batık Şehir bölgesinde yüzmek yasak ama şnorkelle hafifçe yüzebilir, kalıntıları görebilirsiniz." }
    ],
    tags: ["Deniz", "Tarih", "Sessizlik"],
    coordinates: { lat: 36.1978, lng: 29.8792 },
    entryFee: "Ücretsiz (tekne ücreti ayrı)",
    visitDuration: "Yarım gün",
    bestSeason: "Nisan–Ekim",
    status: "published"
  },

  {
    id: "arycanda",
    name: "Arycanda",
    location: "Arif, Antalya",
    district: "Elmalı",
    shortDescription: "Antalya'nın en az bilinen antik kenti vadinin başında basamak basamak yükseliyor. Hâlâ neredeyse hiç kimse gelmiyor.",
    images: ["arycanda ancient ruins antalya cinematic", "lycian city hillside ruins scenic", "remote archaeological site dramatic", "stone theater mountain backdrop atmospheric no people", "arycanda ruins green valley"],
    prompts: [
      { question: "Nerede", answer: "Finike-Elmalı yolundaki Arif köyünden 3 km'lik toprak yol; işaret levhası var." },
      { question: "Highlight", answer: "Hamamın çift katlı soğukluk bölümü ve stadyum görece iyi korunmuş; bakımsız doğallığı şaşırtıcı." }
    ],
    tags: ["Antik Kent", "Macera", "Sessizlik"],
    coordinates: { lat: 36.6325, lng: 29.9597 },
    entryFee: "₺100",
    visitDuration: "2-3 saat",
    bestSeason: "Nisan–Haziran, Eylül–Kasım",
    status: "published"
  },

  {
    id: "adrasan",
    name: "Adrasan Koyu",
    location: "Kumluca, Antalya",
    district: "Kumluca",
    shortDescription: "Fırtınalı günlerde tekne tutmaz, sakin günlerde suyu düz cam gibi. Kalabalık kaçkınlarının son sığınağı.",
    images: ["adrasan bay antalya turquoise cinematic", "mediterranean cove mountain backdrop scenic", "peaceful beach turkey dramatic sunset", "hidden bay lycian coast no people atmospheric", "adrasan morning calm sea golden hour"],
    prompts: [
      { question: "Sessizlik", answer: "Haziran sonuna kadar plajda çok az kişi var; temmuz ağustosta biraz hareketleniyor." },
      { question: "Çevre", answer: "Olympos antik kentine ve Yanartaş'a buradan da gidilebilir; günlük mini turlar var." }
    ],
    tags: ["Deniz", "Doğa", "Sessizlik"],
    coordinates: { lat: 36.3600, lng: 30.4500 },
    entryFee: "Ücretsiz",
    visitDuration: "1-2 gün",
    bestSeason: "Mayıs–Haziran, Eylül–Ekim",
    status: "published"
  },

  {
    id: "letoon",
    name: "Letoon",
    location: "Kumluova, Muğla",
    district: "Fethiye",
    shortDescription: "Leto, Apollo ve Artemis'in üç tapınağı; bazı mekânlar hâlâ su altında. UNESCO miras listesinde gözden kaçan bir eşsiz yer.",
    images: ["letoon ruins lycian turkey cinematic", "three temples sunken water scenic", "lycian archaeological site dramatic", "fethiye ancient ruins no people atmospheric", "letoon sunset ruins reflections"],
    prompts: [
      { question: "Su Altı", answer: "Tapınakların bir kısmı yükselen taban suyu nedeniyle su altında; bazen kurbağalar yüzüyor." },
      { question: "Kombine Et", answer: "Xanthos antik kentiyle aynı günde ziyaret edilebilir; aralarındaki yol 5 km." }
    ],
    tags: ["Antik Kent", "Tarih", "Sessizlik"],
    coordinates: { lat: 36.3733, lng: 29.2567 },
    entryFee: "₺150",
    visitDuration: "1-2 saat",
    bestSeason: "Nisan–Haziran, Eylül–Kasım",
    status: "published"
  },

  // ─── HATAY & GÜNEYDOĞU ───────────────────────────────────────────────────

  {
    id: "titus_tuneli",
    name: "Titus Tüneli",
    location: "Samandağ, Hatay",
    district: "Samandağ",
    shortDescription: "Roma mühendisliğinin çılgın projesi. Dağı elle oyarak yapılan bu tünel doğayla bütünleşmiş.",
    images: ["titus tunnel hatay cinematic scenic", "roman rock cut channel cave dramatic", "ancient engineering light shaft green", "mossy rock tunnel archaeology atmospheric no people", "hatay cave ruins forest"],
    prompts: [
      { question: "Dikkat Et", answer: "Tünelin sonundaki Beşikli Mağara'daki kaya mezarları tüyler ürpertici güzellikte." },
      { question: "Hazırlık", answer: "Zemin ıslak ve kaygan olabilir; mutlaka sağlam yürüyüş ayakkabısı giy." }
    ],
    tags: ["Doğa", "Macera", "Tarih"],
    coordinates: { lat: 36.1228, lng: 35.9287 },
    entryFee: "Ücretsiz",
    visitDuration: "1-2 saat",
    bestSeason: "Ekim–Nisan",
    status: "published"
  },

  {
    id: "antakya_mozaik",
    name: "Hatay Arkeoloji Müzesi",
    location: "Antakya, Hatay",
    district: "Antakya",
    shortDescription: "Dünyanın en büyük in situ mozaik koleksiyonuna ev sahipliği yapan müze. Her karo bir ömrün hikayesi.",
    images: ["hatay archaeology museum mosaics cinematic", "ancient roman mosaics antakya dramatic", "museum floor mosaics scenic detailed", "antioch mosaics turkey atmospheric", "roman art mosaic collection no people"],
    prompts: [
      { question: "Öne Çıkan", answer: "Ganimede mozaiği ve Yakamoz sahnesi, Roma döneminin en etkileyici mozaikleri arasında." },
      { question: "Rehber Al", answer: "Kendi başınıza bağlamı anlamak zor; müze rehberi veya sesli rehber almanızı öneririm." }
    ],
    tags: ["Müze", "Tarih"],
    coordinates: { lat: 36.1900, lng: 36.1600 },
    entryFee: "₺200",
    visitDuration: "2-3 saat",
    bestSeason: "Tüm yıl",
    status: "published"
  },

  {
    id: "mardin_tarihi",
    name: "Mardin Eski İlçesi",
    location: "Mardin",
    district: "Merkez",
    shortDescription: "Sarı taştan oyulmuş bu şehir Mezopotamya ovasına öyle bakar ki güneş batarken fotoğraf makinesi donup kalır.",
    images: ["mardin old city stone houses cinematic", "mesopotamia view mardin dramatic sunset", "yellow limestone architecture turkey scenic", "mardin skyline minaret atmospheric", "mardin old city aerial golden hour no people"],
    prompts: [
      { question: "Kaybol", answer: "Şehrin arka sokakları (mahalleler) Kasım Padişah Camii'nin arkasında saatlerce keşfedilebilir." },
      { question: "Yemek", answer: "İçli köfte, kaburga dolması ve Süryani şarabı deneyin; dükkanlar küçük ve yerel." }
    ],
    tags: ["Tarih", "Gastronomi", "Müze"],
    coordinates: { lat: 37.3130, lng: 40.7350 },
    entryFee: "Ücretsiz",
    visitDuration: "1-2 gün",
    bestSeason: "Mart–Mayıs, Eylül–Kasım",
    status: "published"
  },

  {
    id: "mor_gabriel",
    name: "Mor Gabriel Manastırı",
    location: "Midyat, Mardin",
    district: "Midyat",
    shortDescription: "MS 397'de kurulan dünyanın hâlâ aktif en eski Hristiyan manastırı. Çan sesinde yüzyıllar üst üste yığılmış.",
    images: ["mor gabriel monastery mardin cinematic", "ancient christian monastery dramatic stone", "syriac orthodox monastery turkey scenic", "midyat religious site atmospheric no people", "monastery courtyard golden hour historic"],
    prompts: [
      { question: "Ziyaret Kuralları", answer: "Sabah ve öğleden sonra ziyarete açık; başörtüsü ve saygılı kıyafet gerekli." },
      { question: "Bağlam", answer: "Süryani Hristiyanların kadim yurdu Tur Abdin bölgesinin merkezindedir; Aramice (İsa'nın dili) hâlâ konuşuluyor." }
    ],
    tags: ["Tarih", "Sessizlik"],
    coordinates: { lat: 37.2900, lng: 41.5400 },
    entryFee: "Ücretsiz (bağış kutusu var)",
    visitDuration: "1-2 saat",
    bestSeason: "Nisan–Ekim",
    status: "published"
  },

  {
    id: "dara",
    name: "Dara Antik Kenti",
    location: "Oğuz, Mardin",
    district: "Midyat",
    shortDescription: "Bizans'ın Pers sınırındaki karakol kenti. Yer altı sarnıçları ve dev nekropol, Mezopotamya ufkuna bakıyor.",
    images: ["dara ancient city mardin cinematic", "byzantine ruins cistern dramatic", "mesopotamia archaeological site scenic", "dara necropolis rock cut tombs atmospheric no people", "ancient frontier city turkey golden hour"],
    prompts: [
      { question: "Sarnıçlar", answer: "Yeraltı su deposu (sarnıç) şaşırtıcı büyüklükte; içi serin, dışarısı 40 derece bile olsa." },
      { question: "Ulaşım", answer: "Midyat'tan 20 km güneyde; servis yok, araç kiralamak en pratik yol." }
    ],
    tags: ["Antik Kent", "Tarih", "Macera"],
    coordinates: { lat: 37.1800, lng: 41.0000 },
    entryFee: "₺100",
    visitDuration: "1-2 saat",
    bestSeason: "Ekim–Nisan",
    status: "published"
  },

  {
    id: "gobekli_tepe",
    name: "Göbekli Tepe",
    location: "Örencik, Şanlıurfa",
    district: "Haliliye",
    shortDescription: "Tarihin sıfır noktası. İnsanlık bu tepede 12.000 yıl önce inşa etmeye başladı; neden hâlâ bilinmiyor.",
    images: ["gobekli tepe turkey neolithic cinematic", "ancient pillars t shaped dramatic", "urfa archaeology site scenic", "world oldest temple dawn no people atmospheric", "göbekli tepe stones sunrise golden hour"],
    prompts: [
      { question: "Bağlam", answer: "Stonehenge'den 7.000 yıl daha eski; avcı-toplayıcı dönemine ait, fakat inanılmaz mimari." },
      { question: "Dikkat", answer: "Yeni bölümler hâlâ kazılıyor; ortaya çıkarılanın yüzde onu dahi değil henüz." }
    ],
    tags: ["Tarih", "Antik Kent"],
    coordinates: { lat: 37.2231, lng: 38.9228 },
    entryFee: "₺300",
    visitDuration: "2-3 saat",
    bestSeason: "Ekim–Nisan",
    status: "published"
  },

  {
    id: "harran",
    name: "Harran",
    location: "Harran, Şanlıurfa",
    district: "Harran",
    shortDescription: "Koni biçimli petek evleri binlerce yıldır değişmedi. Hz. İbrahim'in yurdu olan bu kadim şehirde zaman yavaş akar.",
    images: ["harran beehive houses urfa cinematic", "cone houses mesopotamia dramatic", "harran village historic architecture scenic", "ancient village turkey atmospheric no people", "harran ruins sunset mesopotamia"],
    prompts: [
      { question: "Petek Evler", answer: "İçleri yazın serin, kışın ılıktır; çifte yalıtım etkisi yüzlerce yıllık bilgelik." },
      { question: "Tarihi Cami", answer: "Harran Ulu Camii, dünyanın bilinen en eski camilerinden biri; minaresi yıkık ama yine de etkileyici." }
    ],
    tags: ["Tarih", "Sessizlik"],
    coordinates: { lat: 36.8653, lng: 39.0278 },
    entryFee: "₺60",
    visitDuration: "2-3 saat",
    bestSeason: "Ekim–Nisan",
    status: "published"
  },

  {
    id: "zeugma_muzesi",
    name: "Zeugma Mozaik Müzesi",
    location: "Gaziantep",
    district: "Şahinbey",
    shortDescription: "Dünyanın en büyük mozaik müzesi, Fırat barajının altında kalan Roma şehrinden kurtarıldı. Çingene Kız sizi kapıda karşılıyor.",
    images: ["zeugma mosaic museum gaziantep cinematic", "roman mosaics museum collection dramatic", "gypsy girl mosaic turkey scenic", "zeugma archaeological museum atmospheric", "roman art mosaic interior no people"],
    prompts: [
      { question: "Çingene Kız", answer: "Bakışları yönünüzde her yerden sizi izliyor gibi hissettiren bu yüz, Roma dönemi portreciliğinin zirvesi." },
      { question: "Köprü Şehir", answer: "Zeugma, 'köprü' anlamına gelir; Fırat'ın iki yakasını bağlayan Roma ticaret merkeziydi." }
    ],
    tags: ["Müze", "Tarih"],
    coordinates: { lat: 37.0617, lng: 37.3828 },
    entryFee: "₺200",
    visitDuration: "2-3 saat",
    bestSeason: "Tüm yıl",
    status: "published"
  },

  {
    id: "gaziantep_mutfagi",
    name: "Gaziantep Mutfak Kültürü",
    location: "Gaziantep",
    district: "Şahinbey",
    shortDescription: "UNESCO Gastronomi Şehri. Baklavası, Antep fıstığı katmerlisi ve yüzlerce çeşit yemeği ile bir şehrin kendisi neredeyse bir lezzet müzesi.",
    images: ["gaziantep baklava pistachio cinematic", "turkish cuisine gastronomy dramatic food", "antep bazaar copper pots scenic", "gastronomy capital turkey atmospheric", "baklava shop golden light traditional"],
    prompts: [
      { question: "Nereye Git", answer: "İmam Çağdaş veya Güllüoğlu'nda taze baklava; Tahmis Kahvesi'nde sabah kahvesi." },
      { question: "Az Bilinen", answer: "Şehrin düzinelerce yemek türü var; limonlu, ekşili ve kırmızıbiberli tatlar İstanbul mutfağından çok farklı." }
    ],
    tags: ["Gastronomi"],
    coordinates: { lat: 37.0594, lng: 37.3825 },
    entryFee: "Ücretsiz",
    visitDuration: "1-2 gün",
    bestSeason: "Tüm yıl",
    status: "published"
  },

  // ─── ORTA ANADOLU / CENTRAL ANATOLIA ─────────────────────────────────────

  {
    id: "sagalassos",
    name: "Sagalassos",
    location: "Ağlasun, Burdur",
    district: "Ağlasun",
    shortDescription: "Bulutların üzerindeki imparatorluk. Antoninler Çeşmesi'nden akan suyun sesi bin yıldır değişmedi.",
    images: ["sagalassos antonin fountain cinematic", "ancient roman theater mountain view scenic", "marble statues dramatic lighting ruins", "stone ruins sunset mountain turkey atmospheric", "sagalassos ancient city no people"],
    prompts: [
      { question: "Büyüleyici An", answer: "Sislerin dağıldığı sabah saatlerinde çeşmenin sesiyle uyanmak." },
      { question: "Yerel Lezzet", answer: "Ağlasun meydanında ceviz ezmesi yemeden dönmeyin." }
    ],
    tags: ["Antik Kent", "Tarih", "Sessizlik"],
    coordinates: { lat: 37.6766, lng: 30.5194 },
    entryFee: "₺200",
    visitDuration: "3-4 saat",
    bestSeason: "Nisan–Haziran, Eylül–Ekim",
    status: "published"
  },

  {
    id: "aizanoi",
    name: "Aizanoi",
    location: "Çavdarhisar, Kütahya",
    district: "Çavdarhisar",
    shortDescription: "Dünyanın en iyi korunmuş Zeus tapınağı. Sütunların altındaki yer altı galerisi mistik bir deneyim.",
    images: ["aizanoi zeus temple kütahya cinematic", "roman bridge reflection water scenic", "ancient stadium ruins dramatic", "stone columns night sky atmospheric", "historic ruins turkey no people"],
    prompts: [
      { question: "Fotoğraf İpucu", answer: "Tapınağın arkasındaki dolunay manzarası ödüllük kareler verir." },
      { question: "Gizli Köşe", answer: "Tapınağın altındaki tonozlu galeri, dünyanın en mistik yerlerinden biri." }
    ],
    tags: ["Antik Kent", "Tarih", "Macera"],
    coordinates: { lat: 39.2017, lng: 29.6105 },
    entryFee: "₺100",
    visitDuration: "2-3 saat",
    bestSeason: "Nisan–Ekim",
    status: "published"
  },

  {
    id: "hattusha",
    name: "Hattuşa",
    location: "Boğazkale, Çorum",
    district: "Boğazkale",
    shortDescription: "3.500 yıl önce Hitit imparatorluğunun başkenti. Aslan Kapısı'nda taş hayvanlar bugün de girenlere bakar.",
    images: ["hattusa hittite ruins cinematic", "lion gate ancient city dramatic", "boğazkale archaeological site scenic", "hittite capital stone walls atmospheric no people", "hattusa ruins sunset golden hour"],
    prompts: [
      { question: "UNESCO", answer: "Büyük Tapınak (Büyük Mabet 1), tahıl ambarları ve depo odalarıyla sarayın çevresini sarmış." },
      { question: "Yazılıkaya", answer: "3 km uzaktaki kaya sığınağı Yazılıkaya'yı eklemeyin dönmeyin; tanrı kabartmaları eşsiz." }
    ],
    tags: ["Antik Kent", "Tarih"],
    coordinates: { lat: 40.0178, lng: 34.6158 },
    entryFee: "₺200",
    visitDuration: "3-4 saat",
    bestSeason: "Nisan–Ekim",
    status: "published"
  },

  {
    id: "yazilikaya",
    name: "Yazılıkaya Kaya Tapınağı",
    location: "Boğazkale, Çorum",
    district: "Boğazkale",
    shortDescription: "Açık hava kayaya oyulmuş bu galeri, Hititlerin en büyük dinî törenlerinin sahnesi. 70'ten fazla tanrı figürü hâlâ dimdik ayakta.",
    images: ["yazilikaya rock sanctuary hittite cinematic", "ancient rock carved relief dramatic", "hittite gods relief sculpture scenic", "boğazkale open air temple atmospheric no people", "rock carved deity figures golden hour"],
    prompts: [
      { question: "Neyi İzle", answer: "Kral IV. Tuthaliya kabartması, 3.000 yılı aşkın süredir korunmuş en iyi Hitit portresinden biri." },
      { question: "Zaman", answer: "Sabah erken saatlerde ziyaret edin; gün ortasında taş duvarlarda yansıma fotoğrafçılığı zor." }
    ],
    tags: ["Antik Kent", "Tarih", "Sessizlik"],
    coordinates: { lat: 40.0200, lng: 34.6300 },
    entryFee: "₺150 (Hattuşa bileti kapsar)",
    visitDuration: "1-2 saat",
    bestSeason: "Nisan–Ekim",
    status: "published"
  },

  {
    id: "ihlara_vadisi",
    name: "İhlara Vadisi",
    location: "İhlara, Aksaray",
    district: "İhlara",
    shortDescription: "14 km boyunca Melendiz Çayı'nın oyduğu vadinin duvarlarına kazınmış 100'den fazla kilise. Ayak sesi yok, kuş sesi var.",
    images: ["ihlara valley canyon aksaray cinematic", "cave churches melendiz river dramatic", "volcanic rock canyon turkey scenic", "cappadocia cave valley atmospheric no people", "ihlara valley sunrise golden hour"],
    prompts: [
      { question: "Kiliseler", answer: "Ağaçaltı Kilisesi (Daniel Pantonim) ve Pürenli Seki Kilisesi fresklerini mutlaka görün." },
      { question: "Yürüyüş", answer: "Vadinin tamamı 14 km; Ihlara'dan girerek Selime'de çıkmak ya da tam tersi popüler güzergah." }
    ],
    tags: ["Doğa", "Tarih", "Macera"],
    coordinates: { lat: 38.2267, lng: 34.2906 },
    entryFee: "₺100",
    visitDuration: "3-5 saat",
    bestSeason: "Nisan–Haziran, Eylül–Kasım",
    status: "published"
  },

  {
    id: "soganli_vadisi",
    name: "Soğanlı Vadisi",
    location: "Soğanlı, Nevşehir",
    district: "Yeşilhisar",
    shortDescription: "Kapadokya'nın tanınmamış ikizi. Oyulmuş kiliseler, mantar şapkalı kayalar ve neredeyse sıfır turist.",
    images: ["soganli valley cappadocia cinematic", "cave churches nevşehir dramatic", "fairy chimneys hidden valley scenic", "cappadocia alternative village atmospheric no people", "soganli sunrise ruins golden hour"],
    prompts: [
      { question: "Neden Burası", answer: "Kapadokya fiyatlarının onda biri, manzaranın yüzde doksanı; insan neredeyse yok." },
      { question: "Kilise", answer: "Karabaş Kilisesi'ndeki 11. yüzyıl fresklerinin renkleri muhteşem koruma altında." }
    ],
    tags: ["Doğa", "Tarih", "Sessizlik"],
    coordinates: { lat: 38.6167, lng: 35.1667 },
    entryFee: "₺60",
    visitDuration: "2-3 saat",
    bestSeason: "Nisan–Kasım",
    status: "published"
  },

  {
    id: "gordion",
    name: "Gordion",
    location: "Polatlı, Ankara",
    district: "Polatlı",
    shortDescription: "Kral Midas'ın şehri. Tümülüs içindeki ahşap oda, MÖ 700'den kalma dünyanın en iyi korunmuş organik yapısı.",
    images: ["gordion phrygian burial mound cinematic", "midas tumulus archaeology dramatic", "polatlı ankara ancient city scenic", "phrygian capital ruins atmospheric no people", "gordion wooden chamber golden hour"],
    prompts: [
      { question: "Müzede", answer: "Fripler'in tanrı sembolü 'Labrys' figürleri müzede; 2.700 yıllık ahşap mobilyalar hayrete düşürüyor." },
      { question: "İskender", answer: "Gordion düğümünü Büyük İskender burada kılıcıyla çözdü; mekân aynı, düğüm yok." }
    ],
    tags: ["Antik Kent", "Tarih", "Müze"],
    coordinates: { lat: 39.6503, lng: 31.9942 },
    entryFee: "₺120",
    visitDuration: "2-3 saat",
    bestSeason: "Nisan–Ekim",
    status: "published"
  },

  {
    id: "catalhoyuk",
    name: "Çatalhöyük",
    location: "Çumra, Konya",
    district: "Çumra",
    shortDescription: "9.000 yıl önce dünyanın en kalabalık yerleşim yeri. İnsanlar kapısız, duvardan girilen evlerde komşuyla iç içe yaşadı.",
    images: ["catalhoyuk neolithic site cinematic", "prehistoric settlement konya dramatic", "ancient mud brick houses scenic", "neolithic village turkey atmospheric no people", "catalhoyuk excavation golden hour"],
    prompts: [
      { question: "Bağlam", answer: "MÖ 7.500 yılında 8.000 kişi yaşıyordu; çağdaş mimaride kapı yoktu, çatıdan inilirdi." },
      { question: "Müzede", answer: "Ziyaretçi merkezindeki model evler ve Ankara Anadolu Medeniyetleri Müzesi'ndeki orijinal eserler görülmeli." }
    ],
    tags: ["Tarih", "Müze"],
    coordinates: { lat: 37.6672, lng: 32.8269 },
    entryFee: "₺150",
    visitDuration: "1-2 saat",
    bestSeason: "Nisan–Ekim",
    status: "published"
  },

  {
    id: "phrygian_valley",
    name: "Frigya Vadisi",
    location: "İhsaniye, Afyonkarahisar",
    district: "İhsaniye",
    shortDescription: "Kayaya oyulmuş aslan heykelleri, kaya tapınakları ve kale kalıntıları. Frig medeniyetinin en az keşfedilmiş kalıntıları.",
    images: ["phrygian valley rock carvings cinematic", "afyon rock carved monuments dramatic", "frigya vadisi ruins scenic", "anatolian rock sanctuary atmospheric no people", "phrygian lion sculpture golden hour"],
    prompts: [
      { question: "Arslantaş", answer: "İki aslan figürlü bu kaya anıtı Anadolu'nun en etkileyici Frig eserlerinden; kimse bilmiyor." },
      { question: "Yürüyüş", answer: "Vadide 15+ km'lik işaretli patika var; bisiklet veya yürüyüş için ideal." }
    ],
    tags: ["Antik Kent", "Doğa", "Macera"],
    coordinates: { lat: 39.2500, lng: 30.5500 },
    entryFee: "Ücretsiz",
    visitDuration: "Yarım gün",
    bestSeason: "Nisan–Haziran, Eylül–Kasım",
    status: "published"
  },

  // ─── KARADENİZ / BLACK SEA ────────────────────────────────────────────────

  {
    id: "ayder_yaylasi",
    name: "Ayder Yaylası",
    location: "Çamlıhemşin, Rize",
    district: "Çamlıhemşin",
    shortDescription: "Yemyeşil vadinin tepesinde sıcak su kaynakları ve sis perdesi. Her Karadeniz tozu burada dinleniyor.",
    images: ["ayder plateau rize green valley cinematic", "black sea mountain fog scenic dramatic", "highland valley waterfall turkey atmospheric", "ayder hot springs green mountains no people", "kaçkar mountains sunrise golden hour"],
    prompts: [
      { question: "Fırtık Ekmeği", answer: "Köyde fırınlanan mısır ekmeği (fırın ekmeği) ile tereyağı ve peynir; başka şey istemezsiniz." },
      { question: "Kaplıca", answer: "Yaylada kaplıca tesisleri var; dışarıdan tahta kaplarda da akan kaplıca suyundan yararlanabilirsiniz." }
    ],
    tags: ["Doğa", "Sessizlik"],
    coordinates: { lat: 40.9258, lng: 41.0564 },
    entryFee: "Ücretsiz (araç girişi ücretli)",
    visitDuration: "1-2 gün",
    bestSeason: "Mayıs–Ekim",
    status: "published"
  },

  {
    id: "kackar_daglari",
    name: "Kaçkar Dağları",
    location: "Rize/Artvin",
    district: "Çamlıhemşin",
    shortDescription: "Türkiye'nin Alpler'i. Buzul göllerine yükselen vadilerde teçhizatlı trekking, dünyanın en saf havasını veriyor.",
    images: ["kaçkar mountains glacier lake cinematic", "eastern black sea alpine trail dramatic", "rize artvin mountain wilderness scenic", "glacier lake trekking turkey atmospheric no people", "kaçkar summit sunrise golden hour"],
    prompts: [
      { question: "Rehber Şart", answer: "Dilaver, Deniz ve Kavrun geçitleri için yerel rehber zorunlu; yollar işaretsiz ve hava değişken." },
      { question: "Hazırlık", answer: "Temmuz'da bile gece sıfırın altına iniyor; uyku tulumu ve dört mevsim kıyafet şart." }
    ],
    tags: ["Doğa", "Macera"],
    coordinates: { lat: 40.8500, lng: 41.1000 },
    entryFee: "Ücretsiz",
    visitDuration: "2-5 gün (trekking)",
    bestSeason: "Temmuz–Eylül",
    status: "published"
  },

  {
    id: "uzungol",
    name: "Uzungöl",
    location: "Çaykara, Trabzon",
    district: "Çaykara",
    shortDescription: "Sabah sisin içinden cami minaresi yavaş yavaş çıkar. Fotoğraf sezonu başlamıştır.",
    images: ["uzungöl lake mosque fog cinematic", "trabzon lake mountain reflection scenic", "misty lake village turkey dramatic", "black sea highland lake atmospheric no people", "uzungöl morning fog golden hour"],
    prompts: [
      { question: "Erken Kalk", answer: "Saat 7-8 arası sis tam göl yüzeyinde olur; gün ortasında fotoğrafik etki kaybolur." },
      { question: "Gürültüden Kaç", answer: "Gölün kuzeyindeki yayla yolunu takip ederek, turistin görmediği çayır evlerine ulaşabilirsiniz." }
    ],
    tags: ["Doğa", "Sessizlik"],
    coordinates: { lat: 40.6217, lng: 40.2872 },
    entryFee: "Ücretsiz",
    visitDuration: "Yarım gün",
    bestSeason: "Mayıs–Ekim",
    status: "published"
  },

  {
    id: "safranbolu",
    name: "Safranbolu Çarşısı",
    location: "Safranbolu, Karabük",
    district: "Merkez",
    shortDescription: "Osmanlı konak mimarisi bu şehirde yaşıyor; terlemez. UNESCO listesindeki çarşı sabah tenha, öğleden sonra canlı.",
    images: ["safranbolu ottoman houses cinematic", "historic bazaar cobblestone karabuk scenic", "turkish konak architecture dramatic", "safranbolu old town atmospheric no people", "ottoman village sunrise golden hour"],
    prompts: [
      { question: "Sabah Ritüeli", answer: "Tarihi çarşıda yeni açılan fırından sıcak açma ve çay, en iyi Safranbolu başlangıcı." },
      { question: "Konak Tur", answer: "Kaymakamlar Evi ve Asmazlar Konağı iç mekanları ile Osmanlı ev düzenini görmek mümkün." }
    ],
    tags: ["Tarih", "Gastronomi"],
    coordinates: { lat: 41.2497, lng: 32.6918 },
    entryFee: "Ücretsiz",
    visitDuration: "1 gün",
    bestSeason: "Tüm yıl",
    status: "published"
  },

  {
    id: "yedigoller",
    name: "Yedigöller",
    location: "Mengen, Bolu",
    district: "Mengen",
    shortDescription: "Yedi göl, sonbaharda her biri farklı bir sarı-kırmızı paleti. Türkiye'nin en güzel sonbahar rengi burada.",
    images: ["yedigöller seven lakes bolu cinematic", "autumn forest lake reflection dramatic", "black sea highland lakes scenic", "yedigöller national park atmospheric no people", "seven lakes autumn golden hour"],
    prompts: [
      { question: "Sonbahar", answer: "Ekim ortası–kasım başı altın oran; hafta içi gelirseniz gölleri neredeyse kendinize ayırtırsınız." },
      { question: "Yürüyüş", answer: "Tüm gölleri birleştiren yaklaşık 6 km'lik milli park yürüyüş parkuru kolay-orta zorlukta." }
    ],
    tags: ["Doğa", "Sessizlik"],
    coordinates: { lat: 40.9350, lng: 31.4017 },
    entryFee: "₺100",
    visitDuration: "3-4 saat",
    bestSeason: "Ekim–Kasım",
    status: "published"
  },

  {
    id: "kure_daglari",
    name: "Küre Dağları",
    location: "Azdavay, Kastamonu",
    district: "Azdavay",
    shortDescription: "Karadeniz'in kayalık vadilerinde korunan bu milli park, Atatürk ormanlarının ardından Türkiye'nin en çok oksijen üreten yeri.",
    images: ["küre mountains kastamonu national park cinematic", "black sea forest canyon dramatic scenic", "pristine forest waterfall turkey atmospheric", "kastamonu hiking trail no people", "küre dağları green canyon golden hour"],
    prompts: [
      { question: "Valla Kanyonu", answer: "Kanyonun içinden akan çay boyunca yapılan 6 saatlik yürüyüş, Türkiye'nin en iyi kanyonlarından biri." },
      { question: "Ne Zaman", answer: "Mayıs-haziran şelale sezonunda su miktarı zirveye çıkar; sonbahar da eşit güzel." }
    ],
    tags: ["Doğa", "Macera"],
    coordinates: { lat: 41.7500, lng: 33.5000 },
    entryFee: "₺60",
    visitDuration: "1-2 gün",
    bestSeason: "Mayıs–Haziran, Eylül–Ekim",
    status: "published"
  },

  // ─── DOĞU ANADOLU / EASTERN ANATOLIA ─────────────────────────────────────

  {
    id: "ishak_pasha",
    name: "İshak Paşa Sarayı",
    location: "Doğubayazıt, Ağrı",
    district: "Doğubayazıt",
    shortDescription: "Ağrı Dağı siluetine karşı yükselen bu saray, birbirinden farklı on mimari üslubu bir arada taşıyor. Güneş batarken turuncu olur.",
    images: ["ishak pasha palace mount ararat cinematic", "eastern turkey palace dramatic sunset", "doğubayazıt palace snow mountain scenic", "ottoman persian palace atmospheric no people", "ishak pasha golden hour ararat"],
    prompts: [
      { question: "Gün Batımı", answer: "Saray güneyin ışığını en güzel 17-19 arası alıyor; o saatte Ağrı Dağı silueti keskinleşiyor." },
      { question: "Kervansaray", answer: "Saray altındaki kervansaray ve hamam kalıntıları ayrıca ziyaret edilebilir; ihmal edilmiş güzellik." }
    ],
    tags: ["Tarih", "Müze"],
    coordinates: { lat: 39.5433, lng: 44.1050 },
    entryFee: "₺150",
    visitDuration: "2-3 saat",
    bestSeason: "Mayıs–Ekim",
    status: "published"
  },

  {
    id: "akdamar_kilisesi",
    name: "Akdamar Kilisesi",
    location: "Gevaş, Van",
    district: "Gevaş",
    shortDescription: "Van Gölü'nün ortasındaki adacıkta duran bu Ermeni kilisesi, su üzerinde asılı bir rüya gibi görünüyor.",
    images: ["akdamar church van lake cinematic", "armenian church island dramatic", "van lake island historic scenic", "lake van church reflection atmospheric no people", "akdamar sunrise lake golden hour"],
    prompts: [
      { question: "Tekne", answer: "Gevaş iskelesinden 15 dakikalık tekne yolculuğu; eylülde göl sakin, görüntü kristal." },
      { question: "Fresk", answer: "Dış cephedeki Kitab-ı Mukaddes sahneleri ve hayvan kabartmaları 1000 yıl öncesinden mükemmel korunmuş." }
    ],
    tags: ["Tarih", "Deniz", "Sessizlik"],
    coordinates: { lat: 38.3400, lng: 43.0300 },
    entryFee: "₺100 + tekne ücreti",
    visitDuration: "2-3 saat",
    bestSeason: "Mayıs–Ekim",
    status: "published"
  },

  {
    id: "ahlat_mezarligi",
    name: "Ahlat Selçuklu Mezarlığı",
    location: "Ahlat, Bitlis",
    district: "Ahlat",
    shortDescription: "Dünyanın en büyük Selçuklu mezarlığı. Yazıtlı anıt taşların arasında yürürken rüzgar fısıldıyor.",
    images: ["ahlat seljuk cemetery cinematic", "medieval tombstones van lake dramatic", "bitlis cemetery historic scenic", "seljuk inscribed tombs atmospheric no people", "ahlat stones sunset golden hour lake"],
    prompts: [
      { question: "Büyük Kümbetler", answer: "Hasan Padişah ve Bayındır Türbesi, Selçuklu mimari süslemesinin en ince örnekleri." },
      { question: "Arka Plan", answer: "Van Gölü ve Süphan Dağı'na karşı çekim yapmak için batıya dönük açılar en çok tercih edilen." }
    ],
    tags: ["Tarih", "Sessizlik"],
    coordinates: { lat: 38.7567, lng: 42.4733 },
    entryFee: "Ücretsiz",
    visitDuration: "1-2 saat",
    bestSeason: "Nisan–Ekim",
    status: "published"
  },

  {
    id: "nemrut_krateri",
    name: "Nemrut Krateri",
    location: "Tatvan, Bitlis",
    district: "Tatvan",
    shortDescription: "Dünyanın içinde oluşmuş bir dünya. Bu aktif volkan krateri içinde dört göl ve sıcak su kaynakları barındırıyor.",
    images: ["nemrut crater lake bitlis cinematic", "volcanic crater turkey dramatic aerial", "nemrud caldera van lake scenic", "crater lakes bitlis atmospheric no people", "nemrut crater sunrise golden hour"],
    prompts: [
      { question: "Ulaşım", answer: "Tatvan'dan çakıl yol ile yaklaşık 40 dakika; yüksek taban arazi önerilir." },
      { question: "Sıcak Su", answer: "Kuzey kraterin içinde kaplıca suyu çıkıyor; etrafta çimenlikte piknik alanı mevcut." }
    ],
    tags: ["Doğa", "Macera"],
    coordinates: { lat: 38.6167, lng: 42.2333 },
    entryFee: "Ücretsiz",
    visitDuration: "3-4 saat",
    bestSeason: "Haziran–Eylül",
    status: "published"
  },

  {
    id: "nemrut_dagi",
    name: "Nemrut Dağı",
    location: "Kahta, Adıyaman",
    district: "Kahta",
    shortDescription: "2.150 metre yüksekteki tanrı heykelleri gün doğumunda ateş rengine bürünür. Kommagene Krallığı'nın gururu.",
    images: ["mount nemrut stone heads cinematic", "adiyaman summit gods dramatic sunset", "nemrut dagi statue heads scenic", "ancient summit monument turkey atmospheric no people", "nemrut sunrise golden light statues"],
    prompts: [
      { question: "Sabah mı, Akşam mı", answer: "Doğu terası gün doğumunda, batı terası gün batımında ışık alır; ikisi de eşit etkileyici." },
      { question: "Gece Beklentisi", answer: "Zirvede konaklayan bazı turlar var; çadırla bir gece muhteşem yıldız manzarası sunar." }
    ],
    tags: ["Tarih", "Doğa", "Antik Kent"],
    coordinates: { lat: 37.9808, lng: 38.7425 },
    entryFee: "₺200",
    visitDuration: "3-4 saat",
    bestSeason: "Nisan–Ekim",
    status: "published"
  },

  {
    id: "kars_ani",
    name: "Ani Harabeleri",
    location: "Kars",
    district: "Kars",
    shortDescription: "Orta Çağ'ın yüz bin nüfuslu 'Bin ve Bir Kilise Şehri'. Ermenistan sınırında esen rüzgar sayfaları çevirir.",
    images: ["ani ruins kars cinematic", "medieval city ruins dramatic", "thousand churches armenian turkey scenic", "kars border ruins atmospheric no people", "ani sunrise golden hour historic"],
    prompts: [
      { question: "Katedral", answer: "Selçuklu tarafından camiye çevrilen, Osmanlı'da kiliseye dönen yapı bugün harabeye dönmüş; her taşta tarih." },
      { question: "Sınır", answer: "Aras Nehri ötesinde Ermenistan; resmi kapı yok ama köprü kalıntısı bakılınca görünüyor." }
    ],
    tags: ["Tarih", "Sessizlik", "Antik Kent"],
    coordinates: { lat: 40.5061, lng: 43.5717 },
    entryFee: "₺200",
    visitDuration: "2-3 saat",
    bestSeason: "Mayıs–Ekim",
    status: "published"
  },

  {
    id: "cildir_golu",
    name: "Çıldır Gölü",
    location: "Çıldır, Kars",
    district: "Çıldır",
    shortDescription: "Kışın buz tutan bu göl üzerinde at kızağı sürüşü, Türkiye'nin en olağandışı deneyimlerinden. Yaz aylarında da turkuaz rengi büyülüyor.",
    images: ["çıldır lake frozen horse sleigh cinematic", "kars lake winter dramatic", "ice lake turkey snow scenic", "northeastern turkey lake atmospheric no people", "çıldır göl sunrise golden hour"],
    prompts: [
      { question: "Kış Sezonu", answer: "Ocak-şubat aylarında buz üzerinde at kızağına binmek mümkün; yerel rehber ve koşum kiralamaları var." },
      { question: "Yaz", answer: "Haziran-eylülde gölün çevresindeki köylerde yaylaların yeşili ve göl mavisi iç içe girer." }
    ],
    tags: ["Doğa", "Macera"],
    coordinates: { lat: 41.1333, lng: 43.0000 },
    entryFee: "Ücretsiz",
    visitDuration: "2-3 saat",
    bestSeason: "Ocak–Şubat (kış), Haziran–Eylül (yaz)",
    status: "published"
  },

  // ─── EGE ADALARI & MARMARA ───────────────────────────────────────────────

  {
    id: "gokceada",
    name: "Gökçeada",
    location: "Gökçeada, Çanakkale",
    district: "Gökçeada",
    shortDescription: "Ege'nin sürgün adası bugün rüzgar sörfçülerinin ve dalış meraklılarının cenneti. Türkiye'nin Yunanistan'ı.",
    images: ["gökçeada island aegean cinematic", "çanakkale island dramatic sea", "imroz island wind surfing scenic", "greek revival village turkey atmospheric no people", "gökçeada sunset golden hour coastal"],
    prompts: [
      { question: "Dalış", answer: "Yıkık Yunan evleri de dahil sualtı görüntülerin en iyi noktaları; dalış okulu var." },
      { question: "Rum Köyleri", answer: "Terk edilmiş Rum köyleri (Tepeköy, Bademli) üzüm bağları arasında saklı; bisikletle keşif ideal." }
    ],
    tags: ["Deniz", "Doğa", "Sessizlik"],
    coordinates: { lat: 40.1950, lng: 25.8897 },
    entryFee: "Ücretsiz (feribot ayrı)",
    visitDuration: "2-3 gün",
    bestSeason: "Mayıs–Ekim",
    status: "published"
  },

  {
    id: "bozcaada",
    name: "Bozcaada",
    location: "Bozcaada, Çanakkale",
    district: "Bozcaada",
    shortDescription: "Çanakkale'den bir saat, yüzyıl geride. Bağların arasındaki dar sokaklarda Yunan-Türk tarihinin katmanları hissedilir.",
    images: ["bozcaada island vineyard cinematic", "tenedos castle dramatic sea", "aegean island cobblestone scenic", "çanakkale island village atmospheric no people", "bozcaada sunset golden hour castle"],
    prompts: [
      { question: "Şarap", answer: "Adanın bağları kendi üzümlerinden şarap yapıyor; üretim tesisleri hafta sonları ziyarete açık." },
      { question: "Kasaba", answer: "Yunan ve Türk mimarisinin iç içe geçtiği kasaba sokaklarında kaybolmak en büyük aktivite." }
    ],
    tags: ["Gastronomi", "Sessizlik", "Deniz"],
    coordinates: { lat: 39.8333, lng: 26.0667 },
    entryFee: "Ücretsiz (feribot ayrı)",
    visitDuration: "1-2 gün",
    bestSeason: "Mayıs–Ekim",
    status: "published"
  },

  {
    id: "assos",
    name: "Assos",
    location: "Behramkale, Çanakkale",
    district: "Ayvacık",
    shortDescription: "Aristoteles burada öğretti. Athena tapınağından Midilli'ye bakılınca felsefeye hayran olunuyor.",
    images: ["assos ancient temple aegean cinematic", "aristotle school ruins dramatic", "behramkale castle village scenic", "çanakkale ruins coastal atmospheric no people", "assos sunset temple golden hour"],
    prompts: [
      { question: "Tapınak", answer: "Athena Tapınağı'nın sütunları MÖ 6. yüzyıldan; gün batımı manzarası için en doğru zaman." },
      { question: "Liman", answer: "Altta antik liman kalıntıları ve balık restoranları; kabuklu deniz ürünleri taze, balık ucuz." }
    ],
    tags: ["Antik Kent", "Tarih", "Sessizlik"],
    coordinates: { lat: 39.4911, lng: 26.3394 },
    entryFee: "₺100",
    visitDuration: "2-3 saat",
    bestSeason: "Nisan–Ekim",
    status: "published"
  },

  // ─── İÇ EGE & EKEYD ──────────────────────────────────────────────────────

  {
    id: "afyon_kaleleri",
    name: "Afyonkarahisar Kalesi",
    location: "Merkez, Afyonkarahisar",
    district: "Merkez",
    shortDescription: "226 metre yüksekliğindeki volkanik kayaya oyulmuş bu kale, şehir üzerinde hükmetmeye devam ediyor. Merdiven sayar mısın?",
    images: ["afyonkarahisar castle rock cinematic", "volcanic rock fortress afyon dramatic", "ancient castle hilltop turkey scenic", "afyon kale panorama atmospheric no people", "castle summit sunrise golden hour"],
    prompts: [
      { question: "Tırmanış", answer: "707 basamak; sabah erken ya da akşam üstü serin saatlerde tırmanın, öğlen taş gibi ısınıyor." },
      { question: "Aşağıdaki Şehir", answer: "Tepeden Afyon'un tüm tarihi çarşısı ve Ulu Camii görünüyor; kışın karlı manzara başka." }
    ],
    tags: ["Tarih", "Macera"],
    coordinates: { lat: 38.7536, lng: 30.5408 },
    entryFee: "₺60",
    visitDuration: "1-2 saat",
    bestSeason: "Nisan–Kasım",
    status: "published"
  },

  {
    id: "isparta_gul_bahceleri",
    name: "Isparta Gül Bahçeleri",
    location: "Merkez, Isparta",
    district: "Merkez",
    shortDescription: "Dünyanın gül yağı başkenti. Haziranda tarlalar pembeye döner, sabah 6'da hasat yapılır ve koku her yeri sarar.",
    images: ["isparta rose fields turkey cinematic", "pink rose harvest dramatic scenic", "turkish rose cultivation atmospheric", "rose valley isparta no people golden hour", "rose distillery traditional turkey"],
    prompts: [
      { question: "Hasat Zamanı", answer: "Haziran 1-15 arası tarlalar tam açılışta; sabah 5-9 arasında hasat başlar, o saatte koku dorukta." },
      { question: "Gül Yağı", answer: "Yerel kooperatiflerden saf gül yağı fiyatı İstanbul'un dörtte biri; damıtma tesisleri ziyaretçi alıyor." }
    ],
    tags: ["Doğa", "Gastronomi", "Sessizlik"],
    coordinates: { lat: 37.7648, lng: 30.5566 },
    entryFee: "Ücretsiz",
    visitDuration: "Yarım gün",
    bestSeason: "Haziran (gül hasadı)",
    status: "published"
  },

  {
    id: "egirdir_golu",
    name: "Eğirdir Gölü",
    location: "Eğirdir, Isparta",
    district: "Eğirdir",
    shortDescription: "Göl üzerindeki iki adayı birbirine bağlayan köprüyle tamamlanan bu şehirde su her yeri çevreliyor. Kayganlık adası özellikle iyi.",
    images: ["eğirdir lake island turkey cinematic", "isparta lake scenic dramatic", "lake town peninsula atmospheric", "eğirdir sunset lake no people", "anatolian lake village golden hour"],
    prompts: [
      { question: "Adalar", answer: "Yeşilada ve Adaköy'ü birleştiren set üzerinde yürüyerek gün batımını izleyin." },
      { question: "Yürüyüş", answer: "St. Paul Yolu'nun güzergahı burayı kesiyor; birkaç günlük yürüyüş parkuru için başlangıç noktası." }
    ],
    tags: ["Doğa", "Sessizlik"],
    coordinates: { lat: 37.8792, lng: 30.8558 },
    entryFee: "Ücretsiz",
    visitDuration: "Yarım gün-1 gün",
    bestSeason: "Nisan–Ekim",
    status: "published"
  },

  // ─── GÜNEY EGE / ANTIK YEH ────────────────────────────────────────────────

  {
    id: "knidos",
    name: "Knidos",
    location: "Datça, Muğla",
    district: "Datça",
    shortDescription: "Datça yarımadasının ucundaki bu şehirde hem Ege hem Akdeniz aynı anda görünüyor. Afrodit'in ilk çıplak heykeli burada duruyordu.",
    images: ["knidos ancient ruins datça cinematic", "peninsula ruins aegean sea dramatic", "greek city cape temple scenic", "knidos harbor ruins atmospheric no people", "cape ruins sunset golden hour"],
    prompts: [
      { question: "Yolculuk", answer: "Datça'dan 38 km'lik kıyı yolu; son 8 km çakıl. Minibüs ya da araçla gidin; çok değer." },
      { question: "İki Deniz", answer: "İki limandan biri Ege, diğeri Akdeniz; her gün ve mevsimde renk farkı değişiyor." }
    ],
    tags: ["Antik Kent", "Deniz", "Sessizlik"],
    coordinates: { lat: 36.6886, lng: 27.3753 },
    entryFee: "₺150",
    visitDuration: "2-3 saat",
    bestSeason: "Nisan–Ekim",
    status: "published"
  },

  {
    id: "stratonikeia",
    name: "Stratonikeia",
    location: "Eskihisar, Muğla",
    district: "Yatağan",
    shortDescription: "Açık hava müzesi gibi: antik şehir üzerinde köy kurulmuş, köylüler antik tiyatroda oturuyor, sokaklar Yunan döşemeli.",
    images: ["stratonikeia ancient city village cinematic", "greek ruins village overlay muğla dramatic", "ancient theater village scenic", "marble road village turkey atmospheric no people", "stratonikeia ruins golden hour"],
    prompts: [
      { question: "Köy İçi", answer: "Dört yüz nüfuslu köyde çay bahçesi ve bakkal var; antik sokak üzerinde kahvenizi için." },
      { question: "Bouleuterion", answer: "Meclisi (bouleuterion), muhteşem koruma halinde; Anadolu'nun en iyi korunmuş Hellenistik meclislerinden." }
    ],
    tags: ["Antik Kent", "Tarih", "Sessizlik"],
    coordinates: { lat: 37.3361, lng: 28.0650 },
    entryFee: "Ücretsiz",
    visitDuration: "1-2 saat",
    bestSeason: "Tüm yıl",
    status: "published"
  },

  // ─── TRAKYA / THRACE ─────────────────────────────────────────────────────

  {
    id: "edirne_selimiye",
    name: "Selimiye Camii",
    location: "Edirne",
    district: "Merkez",
    shortDescription: "Mimar Sinan'ın 'ustam bu camii' dediği eser. İçinde dursanız kubbenin sizi hangi tarihten yakaladığını anlayamazsınız.",
    images: ["selimiye mosque edirne cinematic", "ottoman architecture mimar sinan dramatic", "mosque interior dome scenic", "edirne historic mosque atmospheric no people", "selimiye sunset golden hour"],
    prompts: [
      { question: "İç Mekân", answer: "Kubbe merkezine geliniz, başınızı geriye atın; ışığın nasıl düştüğünü gözleyin — mimarın asıl oyunu bu." },
      { question: "Anlatı", answer: "Sinan 80 yaşında bu camiyi yaptı; Ayasofya'nın kubbesinden daha geniş ve daha yüksek yapmıştı kendisi." }
    ],
    tags: ["Tarih", "Müze"],
    coordinates: { lat: 41.6771, lng: 26.5592 },
    entryFee: "Ücretsiz",
    visitDuration: "1-2 saat",
    bestSeason: "Tüm yıl",
    status: "published"
  },

  // ─── İSTANBUL ÇEVRESİ ────────────────────────────────────────────────────

  {
    id: "cumalikizik",
    name: "Cumalıkızık Köyü",
    location: "Bursa",
    district: "Yıldırım",
    shortDescription: "700 yıllık Osmanlı köyü bugün hâlâ yaşıyor. Sabah çay bahçelerinde ocak başında pişirilen köy kahvaltısı için yüzlerce kilometre değer.",
    images: ["cumalıkızık village bursa cinematic", "ottoman village timber frame dramatic", "700 year village cobblestone scenic", "bursa village historic atmospheric no people", "cumalıkızık morning golden hour"],
    prompts: [
      { question: "Kahvaltı", answer: "Köy meydanındaki çay bahçeleri erken saatlerde taze üretilmiş peynir, bal ve bal ile tahıl kahvaltısı sunuyor." },
      { question: "Mimari", answer: "Osmanlı ahşap iskelet yapı geleneğinin en sağlam örnekleri burada; bazıları beş-altı nesil büyükbabasının evinde oturuyor." }
    ],
    tags: ["Tarih", "Gastronomi", "Sessizlik"],
    coordinates: { lat: 40.2033, lng: 29.2450 },
    entryFee: "Ücretsiz",
    visitDuration: "2-3 saat",
    bestSeason: "Tüm yıl",
    status: "published"
  },

  // ─── İÇ ANADOLU EK ───────────────────────────────────────────────────────

  {
    id: "guzelyurt",
    name: "Güzelyurt",
    location: "Güzelyurt, Aksaray",
    district: "Güzelyurt",
    shortDescription: "Kapadokya'nın hiç kalabalıklaşmamış alternatifi. Vadisi, kaya kiliseleri ve eski Rum evi saatlerce dolaştırıyor.",
    images: ["güzelyurt aksaray village cinematic", "aksaray valley cave church dramatic", "cappadocia alternative scenic village", "abandoned greek village atmospheric turkey no people", "güzelyurt valley golden hour"],
    prompts: [
      { question: "Manastır", answer: "Ihlara'ya 18 km uzakta; Manastır Vadisi içindeki kiliseler daha az ziyaretçi ile gezilebiliyor." },
      { question: "Konaklama", answer: "Eski Rum evlerinden çevrilmiş birkaç küçük butik pansiyon var; rezervasyon erken dolduruyor." }
    ],
    tags: ["Tarih", "Sessizlik", "Doğa"],
    coordinates: { lat: 38.2489, lng: 34.3736 },
    entryFee: "Ücretsiz",
    visitDuration: "Yarım gün-1 gün",
    bestSeason: "Nisan–Haziran, Eylül–Kasım",
    status: "published"
  },

  {
    id: "alacahoyuk",
    name: "Alacahöyük",
    location: "Alacahöyük, Çorum",
    district: "Alaca",
    shortDescription: "Hitit öncesini anlatan bu tümülüs kentte altın taçlar ve heykel standartları tartışmalı olmuyor. MÖ 2300'den arta kalan.",
    images: ["alacahöyük hittite prehistoric ruins cinematic", "ancient mound çorum dramatic", "bronze age turkey site scenic", "prehistoric settlement atmospheric no people", "alacahöyük museum golden hour"],
    prompts: [
      { question: "Sfenks Kapısı", answer: "Sfenksli girişin iki yanındaki kabartmalar orijinal; ne kadar eski olduğunu bilmek hayrete düşürüyor." },
      { question: "Hattuşa'yla Birleştir", answer: "Boğazkale ve Yazılıkaya ile aynı gün programlanabilir; üçü de 60 km çevresinde." }
    ],
    tags: ["Antik Kent", "Tarih", "Müze"],
    coordinates: { lat: 40.2333, lng: 34.6833 },
    entryFee: "₺100",
    visitDuration: "1-2 saat",
    bestSeason: "Nisan–Ekim",
    status: "published"
  },

  // ─── KARADENIZ TARIHI ─────────────────────────────────────────────────────

  {
    id: "sumela_monastiri",
    name: "Sümela Manastırı",
    location: "Maçka, Trabzon",
    district: "Maçka",
    shortDescription: "386 metrelik uçurum yamacına yapışık bu manastır gerçek mi, yazıldı mı belirsiz. Vadiden yukarı bakmak başlı başına bir deneyim.",
    images: ["sumela monastery cliff trabzon cinematic", "black sea cliff monastery dramatic", "byzantine monastery mountain scenic", "pontic mountains monastery atmospheric no people", "sumela sunrise valley golden hour"],
    prompts: [
      { question: "Yürüyüş", answer: "Vadiyi boydan boya geçen yürüyüş yolu (yaklaşık 8 km) manastırın tepesinden başlıyor." },
      { question: "Frescolar", answer: "İçteki freskler 9. yüzyıldan 19. yüzyıla kadar katmanlı; farklı dönemlerin üst üste binişini görmek ilgi çekici." }
    ],
    tags: ["Tarih", "Doğa", "Macera"],
    coordinates: { lat: 40.6942, lng: 39.6625 },
    entryFee: "₺200",
    visitDuration: "2-3 saat",
    bestSeason: "Mayıs–Ekim",
    status: "published"
  },

  {
    id: "artvin_borcka",
    name: "Borçka Karagöl",
    location: "Borçka, Artvin",
    district: "Borçka",
    shortDescription: "Yeşil ve mavi bu kadar net ayrılmaz. Karagöl'ün rengi suni görünür ama her şey doğal.",
    images: ["borçka karagöl lake artvin cinematic", "emerald lake forest turkey dramatic", "artvin turquoise lake scenic", "black sea highland lake atmospheric no people", "karagöl forest lake golden hour"],
    prompts: [
      { question: "Renk", answer: "Gölün yeşil-mavi rengi yağmur miktarına göre değişiyor; yağışlı yılın ardından daha derin." },
      { question: "Orman Yürüyüşü", answer: "Gölün çevresinde 3 km'lik halka yol var; hızlı salak tur için de yeterli." }
    ],
    tags: ["Doğa", "Sessizlik"],
    coordinates: { lat: 41.3667, lng: 41.6500 },
    entryFee: "₺50",
    visitDuration: "1-2 saat",
    bestSeason: "Mayıs–Ekim",
    status: "published"
  },

  // ─── EGE KÖYLERİ ─────────────────────────────────────────────────────────

  {
    id: "alacati",
    name: "Alaçatı",
    location: "Alaçatı, İzmir",
    district: "Çeşme",
    shortDescription: "Taş evler, dalıp giden sarmaşıklar ve Ege'nin en güçlü rüzgarı. Hafta sonu değil, salı öğleni gelin.",
    images: ["alaçatı stone houses izmir cinematic", "wind surfing aegean turkey dramatic", "greek stone village çeşme scenic", "alaçatı cobblestone street atmospheric no people", "alaçatı morning golden light windmill"],
    prompts: [
      { question: "Sörf", answer: "Alaçatı Plajı Ege'nin en güçlü rüzgar koridoru; sörf okulu fiyatları öğleden önce daha uygun." },
      { question: "Pazar", answer: "Pazar sabahı kurulan çarşıda köy peyniri, zeytinyağı ve taze otları kaçırmayın." }
    ],
    tags: ["Deniz", "Gastronomi", "Macera"],
    coordinates: { lat: 38.2706, lng: 26.3756 },
    entryFee: "Ücretsiz",
    visitDuration: "1 gün",
    bestSeason: "Nisan–Haziran, Eylül–Ekim",
    status: "published"
  },

  // ─── VAN GÖLÜ HAVZASI ─────────────────────────────────────────────────────

  {
    id: "hosap_kalesi",
    name: "Hoşap Kalesi",
    location: "Gürpınar, Van",
    district: "Gürpınar",
    shortDescription: "1643 yılında tek bir Kürt beyinin kurduğu bu kale, nehrin üzerinde yükselerek 300 yıl boyunca yöreyi yönetti.",
    images: ["hoşap castle van cinematic", "kurdish castle mountain turkey dramatic", "van castle river scenic", "eastern turkey historic fortress atmospheric no people", "hoşap sunrise castle golden hour"],
    prompts: [
      { question: "Erişim", answer: "Hoşap köyündeki kale kapısından içeri serbestçe girebilirsiniz; rehber tutmak zor." },
      { question: "Görünüm", answer: "Kale alt avlusundan nehir ve köy manzarası için güneye bakın; kartpostal gibi." }
    ],
    tags: ["Tarih", "Macera"],
    coordinates: { lat: 38.2050, lng: 43.6714 },
    entryFee: "₺60",
    visitDuration: "1-2 saat",
    bestSeason: "Mayıs–Ekim",
    status: "published"
  },

  // ─── MERSİN / SILIFKE ─────────────────────────────────────────────────────

  {
    id: "kiz_kalesi",
    name: "Kız Kalesi",
    location: "Erdemli, Mersin",
    district: "Erdemli",
    shortDescription: "Denizin içinde, sahilden 200 metre açıkta duran bu kale bize ulaşmak için yüzmeyi deniyor ya da tekne bekliyor.",
    images: ["kız kalesi mersin sea castle cinematic", "maiden castle island turkey dramatic", "corycus byzantine fortress scenic", "mersin sea castle atmospheric no people", "maiden castle sunset golden hour"],
    prompts: [
      { question: "Kara Kale", answer: "Karşı kıyıdaki Corycus Kalesi (Kara Kale) ile birlikte ziyaret edin; ikisi arasındaki tünel efsanevi." },
      { question: "Yüzme", answer: "Deniz sığ; yüzerek gidebilirsiniz — kara kaleden yüzüp sualtı duvarını geçmek 10 dakika." }
    ],
    tags: ["Deniz", "Tarih", "Macera"],
    coordinates: { lat: 36.4556, lng: 34.1458 },
    entryFee: "₺100",
    visitDuration: "1-2 saat",
    bestSeason: "Mayıs–Ekim",
    status: "published"
  },

  {
    id: "cennet_cehennem",
    name: "Cennet & Cehennem Obruğu",
    location: "Silifke, Mersin",
    district: "Silifke",
    shortDescription: "İki dev çukur: birine inersiniz, ötekine bakar titrrersiniz. Cennet obruğunun dibinde Meryem Ana Kilisesi bekliyor.",
    images: ["cennet obruk cave church silifke cinematic", "heavenly hole cave turkey dramatic", "mersin sinkhole church scenic", "cave descent silifke atmospheric no people", "obruk sunrise golden hour"],
    prompts: [
      { question: "İniş", answer: "Cennet obruğuna 452 basamak inerek ulaşılır; altta kilise ve şelale var, iklim serin." },
      { question: "Cehennem", answer: "Cehennem çukuruna inmek tehlikeli, üstten bakmak bile yeterince etkileyici." }
    ],
    tags: ["Doğa", "Tarih", "Macera"],
    coordinates: { lat: 36.6467, lng: 33.5275 },
    entryFee: "₺100",
    visitDuration: "2-3 saat",
    bestSeason: "Nisan–Haziran, Eylül–Kasım",
    status: "published"
  },

  // ─── BOLU / ZONGULDAK ─────────────────────────────────────────────────────

  {
    id: "abant_golu",
    name: "Abant Gölü",
    location: "Mudurnu, Bolu",
    district: "Mudurnu",
    shortDescription: "Fotoğraf kartpostallarının aslı. Gölü çeviren yürüyüş yolunda kış ortasında bile sürprizler çıkar.",
    images: ["abant lake bolu cinematic", "highland lake reflection fog dramatic", "bolu forest lake scenic", "abant lake winter atmospheric no people", "abant morning golden hour misty"],
    prompts: [
      { question: "Yürüyüş", answer: "Gölü çevreleyen 6 km'lik halka yol; kolay, her mevsim açık, çocuklu aileler için de uygun." },
      { question: "Kış", answer: "Aralık-şubat arası karla örtülü orman arasında gölün yansıması bambaşka." }
    ],
    tags: ["Doğa", "Sessizlik"],
    coordinates: { lat: 40.5975, lng: 31.2617 },
    entryFee: "₺100 (araç)",
    visitDuration: "2-4 saat",
    bestSeason: "Ekim–Kasım, Ocak–Şubat",
    status: "published"
  },

  // ─── BATM / SİİRT ─────────────────────────────────────────────────────────

  {
    id: "hasankeyf",
    name: "Hasankeyf",
    location: "Batman",
    district: "Hasankeyf",
    shortDescription: "Dicle kıyısında on bin yıllık insanlık belleği. Baraj suları yükselmeden önce kurtarılan eserler yeni mekânlarda yaşıyor.",
    images: ["hasankeyf batman dicle cinematic", "ancient river city dramatic", "cliff dwellings river turkey scenic", "hasankeyf ruins bridge atmospheric no people", "hasankeyf sunset golden hour"],
    prompts: [
      { question: "Güncel Durum", answer: "Ilısu Barajı kısmen suya gömse de kaleler ve kaya yapıları hâlâ görülebilir durumda." },
      { question: "Ziyaret", answer: "Kaya mezarları ve El Rızk Camii kalıntıları; arkeoloji parkı ziyaretçiye açık." }
    ],
    tags: ["Tarih", "Doğa"],
    coordinates: { lat: 37.7150, lng: 41.4089 },
    entryFee: "Ücretsiz",
    visitDuration: "2-3 saat",
    bestSeason: "Ekim–Nisan",
    status: "published"
  },

  // ─── KUZEYBATI ANADOLU ────────────────────────────────────────────────────

  {
    id: "bursa_cumalikizik",
    name: "Bursa Tarihi Çarşılar",
    location: "Bursa",
    district: "Osmangazi",
    shortDescription: "Koza Hanı ve Bedesten'de ipek böceği kozasından bafon kumaşa uzanan ticaret hattı yüzyıllardır değişmedi.",
    images: ["bursa koza han silk market cinematic", "ottoman bazaar bursa dramatic", "silk trade historical market scenic", "bursa grand bazaar atmospheric no people", "bursa bazaar golden light"],
    prompts: [
      { question: "Koza Han", answer: "Temmuz'da ipek borsası açık olduğunda kozacıların açık artırmalarını izleyebilirsiniz." },
      { question: "Kebap", answer: "Pide üzerine dökülen İskender Kebabı Bursa'da yenilmezse sayılmaz; orijinal mekan merkezdedir." }
    ],
    tags: ["Tarih", "Gastronomi"],
    coordinates: { lat: 40.1833, lng: 29.0606 },
    entryFee: "Ücretsiz",
    visitDuration: "2-3 saat",
    bestSeason: "Tüm yıl",
    status: "published"
  },

  // ─── RİZE'NİN YAYLAS ──────────────────────────────────────────────────────

  {
    id: "sal_yaylasi",
    name: "Sal Yaylası",
    location: "Ardeşen, Rize",
    district: "Ardeşen",
    shortDescription: "Rize'nin neredeyse hiç tanınmayan yaylasında yaşlı kadınlar hâlâ geleneksel kıyafetle çay topluyor.",
    images: ["sal yayla rize tea plantation cinematic", "black sea highland tea garden dramatic", "green terraced tea fields scenic", "rize yayla women picking tea atmospheric no people", "yayla tea sunrise golden hour"],
    prompts: [
      { question: "Çay Toplama", answer: "Haziran-ekim arası hasat sezonunda bahçe sahipleri zaman zaman ziyaretçilere toplama deneyimi yaşatıyor." },
      { question: "Kahvaltı", answer: "Yaylada bir ev pansiyonunda muhlama, peynir ve çayı aynı anda yemek unutulmaz." }
    ],
    tags: ["Doğa", "Gastronomi", "Sessizlik"],
    coordinates: { lat: 41.1500, lng: 41.0000 },
    entryFee: "Ücretsiz",
    visitDuration: "Yarım gün",
    bestSeason: "Haziran–Ekim",
    status: "published"
  },

  // ─── KAYSERİ / ERCİYES ───────────────────────────────────────────────────

  {
    id: "erciyes_dagi",
    name: "Erciyes Dağı",
    location: "Kayseri",
    district: "Develi",
    shortDescription: "3.916 metre ile Orta Anadolu'nun en yüksek noktası. Kayak sezonunda neredeyse hiç yabancı yoktur.",
    images: ["erciyes mountain kayseri cinematic", "volcanic mountain anatolia dramatic", "turkey ski resort mountain scenic", "erciyes peak cloud atmospheric no people", "erciyes summit sunrise golden hour"],
    prompts: [
      { question: "Kayak", answer: "Aralık-nisan arası kayak; Türkiye'nin en iyi ve en az kalabalık kayak merkezlerinden biri." },
      { question: "Yaz", answer: "Temmuz-ağustos arası krater çevresinde 6 saatlik trekking; buzul kalıntıları hâlâ mevcut." }
    ],
    tags: ["Doğa", "Macera"],
    coordinates: { lat: 38.5303, lng: 35.4478 },
    entryFee: "Ücretsiz (kayak ayrı)",
    visitDuration: "1 gün",
    bestSeason: "Ocak–Mart (kayak), Temmuz–Ağustos (trekking)",
    status: "published"
  },

  // ─── DENİZLİ / ANTIK KENTLER ─────────────────────────────────────────────

  {
    id: "laodikya",
    name: "Laodikya",
    location: "Denizli",
    district: "Pamukkale",
    shortDescription: "Pamukkale'nin 6 km yanında duran bu antik Hristiyan kenti yeni kazılarla gün yüzüne çıkıyor. Kalabalık orada, hazine burada.",
    images: ["laodikya ancient city denizli cinematic", "roman ruins christian city dramatic", "turkey archaeological site scenic", "laodicea ruins atmospheric no people", "laodikya ruins sunset golden hour"],
    prompts: [
      { question: "Neden Önemli", answer: "Yeni Ahit'teki 'Laodikya Kilisesi' bu şehirde; erken Hristiyan tarihinin en önemli duraklarından." },
      { question: "Pratik", answer: "Pamukkale bileti Laodikya için de geçerli; minibüs veya dolmuş her saat işliyor." }
    ],
    tags: ["Antik Kent", "Tarih"],
    coordinates: { lat: 37.8328, lng: 29.1100 },
    entryFee: "₺200 (Pamukkale bileti kapsar)",
    visitDuration: "2-3 saat",
    bestSeason: "Nisan–Haziran, Eylül–Kasım",
    status: "published"
  },

  // ─── TUNCELI / MUNZUR ────────────────────────────────────────────────────

  {
    id: "munzur_vadisi",
    name: "Munzur Vadisi",
    location: "Ovacık, Tunceli",
    district: "Ovacık",
    shortDescription: "Türkiye'nin en saf debi suyunu taşıyan Munzur'da rafting yaparken dağın karı sizi ıslatır. Vahşi doğanın son sığınağı.",
    images: ["munzur valley tunceli cinematic", "wild river eastern turkey dramatic", "rafting mountain turkey scenic", "tunceli wilderness nature atmospheric no people", "munzur river sunrise golden hour"],
    prompts: [
      { question: "Rafting", answer: "Mayıs-haziran kar erimeleri mevsimi; Ovacık'tan tur organizasyonları kırımsız sular için en heyecanlı dönem." },
      { question: "Yayla", answer: "Çemişgezek yayla yolu üzerinde insan hiç görmeden saatler geçirilebilir." }
    ],
    tags: ["Doğa", "Macera"],
    coordinates: { lat: 39.3792, lng: 38.7394 },
    entryFee: "Ücretsiz",
    visitDuration: "1-2 gün",
    bestSeason: "Mayıs–Eylül",
    status: "published"
  },

  // ─── ANTIK KÜLTÜR ─────────────────────────────────────────────────────────

  {
    id: "perge",
    name: "Perge",
    location: "Aksu, Antalya",
    district: "Aksu",
    shortDescription: "Antalya'ya 20 km, kalabalığa yüzlerce yıl. Kolonlu ana cadde ve hamamlar, antik bir şehrin nabzını yeniden hissettiriyor.",
    images: ["perge ancient city antalya cinematic", "roman colonnaded street dramatic", "anatolian city ruins scenic", "perge nymphaeum ruins atmospheric no people", "perge ruins sunset golden hour"],
    prompts: [
      { question: "Antalya ile Kombine", answer: "Antalya Müzesi'nde önce Perge heykellerini görün, sonra şehre gidin; bağlam her şeyi değiştirir." },
      { question: "Stadyum", answer: "12.000 kişilik stadyum neredeyse tam; merdivenlerinde oturarak orijinal hissiyatı yakalamak mümkün." }
    ],
    tags: ["Antik Kent", "Tarih"],
    coordinates: { lat: 36.9606, lng: 30.8556 },
    entryFee: "₺200",
    visitDuration: "2-3 saat",
    bestSeason: "Ekim–Nisan",
    status: "published"
  },

  // ─── EGE KIYILARI ─────────────────────────────────────────────────────────

  {
    id: "foca",
    name: "Foça",
    location: "Foça, İzmir",
    district: "Foça",
    shortDescription: "Dünyanın başka hiçbir yerinde göremeyeceğiniz Akdeniz foku (Monachus monachus) burada mağaralarda üretiyor.",
    images: ["foça phocaea aegean cinematic", "mediterranean monk seal izmir dramatic", "ancient greek harbor scenic", "foça fishing village atmospheric no people", "foça coast sunset golden hour"],
    prompts: [
      { question: "Fokkalar", answer: "Tekne turlarında sabah saatlerinde fokları görmek mümkün; gürültü etmemek şart." },
      { question: "Tarihi", answer: "İzmir'in (Smyrna) kurucusu Phokaia vatandaşları; Marsilya dahil Batı Avrupa'nın kurucu şehri." }
    ],
    tags: ["Doğa", "Deniz", "Tarih"],
    coordinates: { lat: 38.6750, lng: 26.7567 },
    entryFee: "Ücretsiz",
    visitDuration: "Yarım gün-1 gün",
    bestSeason: "Nisan–Haziran, Eylül–Ekim",
    status: "published"
  },

  // ─── TACİZ EŞİĞİNDEKİ GÜZELLER ──────────────────────────────────────────

  {
    id: "yildiz_daglari",
    name: "Yıldız Dağları",
    location: "Demirköy, Kırklareli",
    district: "Demirköy",
    shortDescription: "Trakya'nın tek doğal ormanı, fındık ve gürgen ağaçlarının sardığı bu vadide bükler altında piknik yapılır.",
    images: ["yıldız mountains kırklareli cinematic", "thrace natural forest dramatic scenic", "demirköy forest waterfall atmospheric", "trakya forest no people peaceful", "yıldız mountains golden hour autumn"],
    prompts: [
      { question: "Şelale", answer: "Dupnisa Mağarası yakınlarındaki şelaleler ilkbaharda güçleniyor; doğal havuzlarda yüzmek mümkün." },
      { question: "Tabiat Parkı", answer: "Kırklareli Yıldız Dağları Tabiat Parkı içinde; İstanbul'a 3 saat, kalabalık neredeyse yok." }
    ],
    tags: ["Doğa", "Sessizlik", "Macera"],
    coordinates: { lat: 41.8167, lng: 27.6667 },
    entryFee: "Ücretsiz",
    visitDuration: "Yarım gün-1 gün",
    bestSeason: "Nisan–Haziran, Eylül–Kasım",
    status: "published"
  },

];
