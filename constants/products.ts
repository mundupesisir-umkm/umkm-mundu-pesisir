export interface ProductVariant {
  id?: string;
  name: string;
  price: number;
  priceFormatted: string;
  unit?: string;
  description?: string;
}

export interface ProductItem {
  id: string;
  name: string;
  categoryLabel: string;
  categoryKey: "siwang" | "seafood" | "beras" | string;
  weight?: string;
  description: string;
  price: number;
  priceFormatted: string;
  phone?: string;
  image: string;
  badge?: string;
  variants?: ProductVariant[];
  details?: {
    composition: string;
    shelfLife: string;
    packaging: string;
  };
}

export const PRODUCT_CATALOG_CONFIG = {
  badge: "PRODUK ASLI PESISIR",
  headline: "Katalog Produk Unggulan UMKM",
  subtitle: "Pesan langsung ke pengrajin UMKM via WhatsApp",
  pageHeadline: "Semua Produk Unggulan UMKM Desa Mundu Pesisir",
  pageSubtitle:
    "Jelajahi aneka produk olahan Siwang & Sambal Cumi, Beras Berkualitas panen lokal, dan Olahan Ikan Laut segar langsung dari pengrajin warga Desa Mundu Pesisir Cirebon.",
  categories: [
    { id: "all", label: "Semua" },
    { id: "siwang", label: "Sambal Siwang" },
    { id: "seafood", label: "Seafood & Ikan" },
    { id: "beras", label: "Beras & Hasil Tani" },
  ],
  whatsappAdminNumber: "6282216182885",
  viewAllButtonText: "Lihat Semua Katalog",
  products: [
    // -------------------------------------------------------------
    // 1. UMKM IBU MAGFIRO (WA: 082119882446)
    // -------------------------------------------------------------
    {
      id: "umkm-ibu-magfiro-siwang-sambal",
      name: "Siwang & Sambal Cumi Ibu Magfiro",
      categoryLabel: "SIWANG & SAMBAL (IBU MAGFIRO)",
      categoryKey: "siwang",
      description:
        "Olahan Terasi Bawang (Siwang) renyah gurih dan Sambal Cumi pedas gurih khas Ibu Magfiro. Tersedia 5 pilihan ukuran toples praktis sesuai selera.",
      price: 15000,
      priceFormatted: "Rp 15.000 - Rp 55.000",
      phone: "082119882446",
      image: "/products/placeholder.svg",
      variants: [
        {
          id: "magfiro-siwang-kecil",
          name: "Siwang Toples Kecil",
          price: 15000,
          priceFormatted: "Rp 15.000",
          unit: "Toples 100gr",
          description: "Siwang renyah gurih ukuran toples kecil, praktis untuk lauk sehari-hari.",
        },
        {
          id: "magfiro-siwang-sedang",
          name: "Siwang Toples Sedang",
          price: 28000,
          priceFormatted: "Rp 28.000",
          unit: "Toples 200gr",
          description: "Siwang renyah gurih ukuran toples sedang, pas untuk lauk keluarga.",
        },
        {
          id: "magfiro-siwang-besar",
          name: "Siwang Toples Besar",
          price: 55000,
          priceFormatted: "Rp 55.000",
          unit: "Toples 400gr",
          description: "Siwang toples besar isi melimpah, hemat untuk stok lauk makan di rumah.",
        },
        {
          id: "magfiro-sambal-cumi-kecil",
          name: "Sambal Cumi Toples Kecil",
          price: 25000,
          priceFormatted: "Rp 25.000",
          unit: "Toples 150gr",
          description: "Sambal cumi pedas gurih potongan cumi melimpah kemasan toples kecil.",
        },
        {
          id: "magfiro-sambal-cumi-sedang",
          name: "Sambal Cumi Toples Sedang",
          price: 50000,
          priceFormatted: "Rp 50.000",
          unit: "Toples 300gr",
          description: "Sambal cumi toples sedang isi lebih banyak, siap santap dengan nasi hangat.",
        },
      ],
      details: {
        composition:
          "Siwang: Bawang merah Cirebon pilihan, terasi udang rebon asli Mundu Pesisir, cabai, bumbu rempah alami. Sambal Cumi: Cumi asin segar tangkapan nelayan, cabai rawit, bawang merah, bawang putih, minyak kelapa, garam rempah.",
        shelfLife:
          "Siwang: 3 - 4 Bulan di suhu ruang (tutup rapat). Sambal Cumi: 1 Bulan di pendingin / 2 minggu di suhu ruang.",
        packaging:
          "Kemasan toples higienis kedap udara (Tersedia Toples Kecil, Toples Sedang, dan Toples Besar).",
      },
    },

    // -------------------------------------------------------------
    // 2. UMKM IBU SANTI (WA: 082115397254)
    // -------------------------------------------------------------
    {
      id: "umkm-ibu-santi-beras-pilihan",
      name: "Beras Berkualitas Panen Lokal Ibu Santi",
      categoryLabel: "BERAS & HASIL TANI (IBU SANTI)",
      categoryKey: "beras",
      description:
        "Beras putih pulen panen petani lokal Cirebon tanpa pemutih sintetis buatan Ibu Santi. Tersedia pilihan eceran per kilogram maupun karungan 25 kg.",
      price: 14500,
      priceFormatted: "Mulai Rp 14.500 / kg",
      phone: "082115397254",
      image: "/products/placeholder.svg",
      variants: [
        {
          id: "santi-beras-kilo-standar",
          name: "Beras Per Kilo (Kualitas Standar)",
          price: 14500,
          priceFormatted: "Rp 14.500",
          unit: "Per 1 Kg",
          description: "Beras pulen untuk konsumsi harian keluarga ekonomis dan bersih.",
        },
        {
          id: "santi-beras-kilo-super",
          name: "Beras Per Kilo (Kualitas Super)",
          price: 15500,
          priceFormatted: "Rp 15.500",
          unit: "Per 1 Kg",
          description: "Beras kualitas super putih alami, bulir utuh, dan pulen empuk.",
        },
        {
          id: "santi-beras-kilo-premium",
          name: "Beras Per Kilo (Kualitas Premium)",
          price: 16000,
          priceFormatted: "Rp 16.000",
          unit: "Per 1 Kg",
          description: "Beras kualitas premium aroma wangi alami dan sangat pulen istimewa.",
        },
        {
          id: "santi-beras-karung-standar",
          name: "Beras Per Karung 25kg (Standar)",
          price: 355000,
          priceFormatted: "Rp 355.000",
          unit: "Karung 25 Kg",
          description: "Beras kemasan karung 25 kg mutu standar untuk usaha kuliner/warung/keluarga.",
        },
        {
          id: "santi-beras-karung-super",
          name: "Beras Per Karung 25kg (Super)",
          price: 370000,
          priceFormatted: "Rp 370.000",
          unit: "Karung 25 Kg",
          description: "Beras kemasan karung 25 kg mutu super terpercaya dan pulen.",
        },
        {
          id: "santi-beras-karung-premium",
          name: "Beras Per Karung 25kg (Premium)",
          price: 375000,
          priceFormatted: "Rp 375.000",
          unit: "Karung 25 Kg",
          description: "Beras kemasan karung 25 kg kualitas premium terbaik lumbung tani Cirebon.",
        },
      ],
      details: {
        composition:
          "100% Beras bulir padi utuh petani lokal Cirebon (Tersedia 3 mutu pilihan: Kualitas Standar, Super, dan Premium Pandan/Ramos).",
        shelfLife: "6 - 12 Bulan dalam wadah tertutup sejuk dan kering.",
        packaging:
          "Kemasan kantong plastik tebal higienis per 1 kg & Karung 25 kg anyaman kuat berjahit rapi.",
      },
    },

    // -------------------------------------------------------------
    // 3. UMKM SITI MAEMUNAH (WA: 083823396163)
    // -------------------------------------------------------------
    {
      id: "umkm-siti-maemunah-olahan-ikan",
      name: "Bandeng Presto, Sarden & Pindang Biles Siti Maemunah",
      categoryLabel: "SEAFOOD & OLAHAN IKAN (SITI MAEMUNAH)",
      categoryKey: "seafood",
      description:
        "Aneka olahan ikan laut segar tangkapan nelayan Mundu Pesisir buatan Siti Maemunah. Pilihan: Bandeng Presto duri lunak, Ikan Sarden olahan segar, dan Pindang Ikan Biles gurih.",
      price: 3000,
      priceFormatted: "Rp 3.000 - Rp 35.000",
      phone: "083823396163",
      image: "/products/placeholder.svg",
      variants: [
        {
          id: "maemunah-bandeng-presto",
          name: "Bandeng Presto Duri Lunak",
          price: 35000,
          priceFormatted: "Rp 35.000",
          unit: "1 Ekor Vakum",
          description: "Bandeng duri lunak bumbu kuning rempah meresap, tinggal goreng garing.",
        },
        {
          id: "maemunah-ikan-sarden",
          name: "Ikan Sarden Olahan Segar",
          price: 15000,
          priceFormatted: "Rp 15.000",
          unit: "Kemasan Mika",
          description: "Ikan sarden laut segar tangkapan perahu nelayan dibersihkan dan siap masak.",
        },
        {
          id: "maemunah-pindang-biles",
          name: "Pindang Ikan Biles Gurih",
          price: 3000,
          priceFormatted: "Rp 3.000",
          unit: "1 Porsi / Besek",
          description: "Pindang ikan biles rempah kukus gurih alami, nikmat bersama sambal terasi.",
        },
      ],
      details: {
        composition:
          "Ikan bandeng presto duri lunak, ikan sarden laut segar perahu nelayan, ikan biles pesisir, kunyit, daun salam, serai, garam laut alami.",
        shelfLife:
          "Bandeng & Sarden: 4 hari suhu ruang vakum / 1 - 2 bulan dalam freezer beku. Pindang Biles: 3 hari suhu ruang / 1 minggu di kulkas.",
        packaging:
          "Kemasan plastik vakum higienis kedap udara & besek bambu tradisional.",
      },
    },
  ] as ProductItem[],
};
