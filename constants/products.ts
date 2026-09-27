export interface ProductItem {
  id: string;
  name: string;
  categoryLabel: string;
  categoryKey: "siwang" | "seafood";
  weight?: string;
  description: string;
  price: number;
  priceFormatted: string;
  phone?: string;
  image: string;
  badge?: string;
  details?: {
    composition: string;
    shelfLife: string;
    packaging: string;
  };
}

export const PRODUCT_CATALOG_CONFIG = {
  badge: "PRODUK ASLI PESISIR",
  headline: "Katalog Produk Unggulan",
  subtitle: "Pesan langsung ke pengrajin UMKM via WhatsApp",
  pageHeadline: "Semua Produk Olahan UMKM Desa Mundu Pesisir",
  pageSubtitle:
    "Jelajahi aneka Siwang renyah beraroma terasi rebon asli, kerupuk mekar gurih, dan aneka hasil laut tangkapan perahu nelayan lokal Cirebon tanpa pengawet kimia.",
  categories: [
    { id: "all", label: "Semua" },
    { id: "siwang", label: "Sambal Siwang" },
    { id: "seafood", label: "Seafood" },
  ],
  whatsappAdminNumber: "6281214145254",
  viewAllButtonText: "Lihat Semua Katalog",
  products: [
    {
      id: "siwang-original-1",
      name: "Siwang Original Gurih Khas Mundu Pesisir",
      categoryLabel: "SIWANG (TERASI BAWANG)",
      categoryKey: "siwang",
      description:
        "Terasi Bawang (Siwang) otentik Cirebon dari terasi rebon asli Mundu Pesisir",
      price: 25000,
      priceFormatted: "Rp 25.000",
      image: "/siwang-pouch.jpg",
      badge: "Paling Laris",
      details: {
        composition:
          "Bawang merah Cirebon pilihan, terasi udang rebon asli Mundu, cabai, bumbu rempah alami.",
        shelfLife: "3 - 4 Bulan di suhu ruang (kedap udara).",
        packaging: "Standing pouch zipper tebal kedap udara.",
      },
    },
    {
      id: "siwang-pedas-2",
      name: "Siwang Pedas Nagih Khas Mundu Pesisir",
      categoryLabel: "SIWANG (TERASI BAWANG)",
      categoryKey: "siwang",
      description:
        "Perpaduan renyahnya bawang goreng dan cabai rawit pedas dengan aroma khas terasi rebon segar.",
      price: 25000,
      priceFormatted: "Rp 25.000",
      image: "/siwang-pouch.jpg",
      details: {
        composition:
          "Bawang merah garing, terasi rebon pesisir, cabai rawit merah kering, garam gurih.",
        shelfLife: "3 - 4 Bulan di suhu ruang.",
        packaging: "Standing pouch zipper tebal kedap udara.",
      },
    },
    {
      id: "siwang-teri-3",
      name: "Siwang Teri Crispy Khas Mundu Pesisir",
      categoryLabel: "SIWANG (TERASI BAWANG)",
      categoryKey: "siwang",
      description:
        "Varian istimewa dengan taburan ikan teri nasi garing berpadu gurihnya terasi rebon asli.",
      price: 25000,
      priceFormatted: "Rp 25.000",
      image: "/siwang-pouch.jpg",
      details: {
        composition:
          "Bawang merah, ikan teri nasi garing, terasi udang rebon, rempah tradisional.",
        shelfLife: "3 - 4 Bulan di suhu ruang.",
        packaging: "Standing pouch zipper tebal kedap udara.",
      },
    },
    {
      id: "kerupuk-ikan-4",
      name: "Kerupuk Ikan Payur Mekar Gurih",
      categoryLabel: "SEAFOOD (OLAHAN IKAN)",
      categoryKey: "seafood",
      description:
        "Kerupuk ikan laut payur segar tangkapan perahu nelayan Mundu, mekar renyah dan gurih alami.",
      price: 25000,
      priceFormatted: "Rp 25.000",
      image: "/siwang-pouch.jpg",
      details: {
        composition:
          "Daging ikan payur segar, tepung tapioka, bawang putih, garam, ketumbar.",
        shelfLife: "6 Bulan dalam kemasan tertutup.",
        packaging: "Kemasan plastik tebal higienis.",
      },
    },
    {
      id: "terasi-rebon-5",
      name: "Terasi Udang Rebon Murni Gelondong",
      categoryLabel: "SEAFOOD (TERASI MURNI)",
      categoryKey: "seafood",
      description:
        "Terasi mentah kualitas super dari udang rebon murni tanpa pengawet dan tanpa pewarna sintetis.",
      price: 25000,
      priceFormatted: "Rp 25.000",
      image: "/siwang-pouch.jpg",
      badge: "100% Murni",
      details: {
        composition: "100% udang rebon pilihan pesisir Cirebon, garam laut alami.",
        shelfLife: "12 Bulan di tempat sejuk dan kering.",
        packaging: "Bungkusan kedap udara higienis.",
      },
    },
    {
      id: "seafood-cumi-6",
      name: "Cumi Kering Asin Nelayan Mundu",
      categoryLabel: "SEAFOOD (HASIL TANGKAPAN)",
      categoryKey: "seafood",
      description:
        "Cumi-cumi segar hasil tangkapan harian nelayan pesisir yang dikeringkan alami dengan sinar matahari.",
      price: 25000,
      priceFormatted: "Rp 25.000",
      image: "/siwang-pouch.jpg",
      details: {
        composition: "Cumi-cumi segar perahu nelayan, garam laut alami.",
        shelfLife: "6 Bulan dalam penyimpanan kering.",
        packaging: "Kemasan vakum kedap udara.",
      },
    },
    {
      id: "paket-trio-7",
      name: "Paket Hemat Siwang Trio (3 Pouch)",
      categoryLabel: "SIWANG (PAKET HEMAT)",
      categoryKey: "siwang",
      description:
        "Paket lengkap 3 rasa favorit: Original Gurih, Pedas Nagih, dan Teri Crispy dalam kemasan oleh-oleh.",
      price: 70000,
      priceFormatted: "Rp 70.000",
      image: "/siwang-pouch.jpg",
      badge: "Hemat Rp 5.000",
      details: {
        composition: "3 pouch Siwang varian Original, Pedas, dan Teri Crispy.",
        shelfLife: "3 - 4 Bulan di suhu ruang.",
        packaging: "Kemasan paket kardus oleh-oleh rapi.",
      },
    },
    {
      id: "ikan-jambal-8",
      name: "Ikan Asin Jambal Roti Daging Tebal",
      categoryLabel: "SEAFOOD (IKAN ASIN)",
      categoryKey: "seafood",
      description:
        "Ikan asin jambal roti kualitas premium dengan daging tebal empuk dan tidak terlalu asin.",
      price: 35000,
      priceFormatted: "Rp 35.000",
      image: "/siwang-pouch.jpg",
      details: {
        composition: "Daging ikan jambal segar, garam laut murni tanpa pengawet kimia.",
        shelfLife: "6 Bulan di lemari pendingin.",
        packaging: "Vakum higienis kedap udara.",
      },
    },
    {
      id: "kerupuk-kulit-9",
      name: "Kerupuk Kulit Ikan Tenggiri Renyah",
      categoryLabel: "SEAFOOD (CAMILAN LAUT)",
      categoryKey: "seafood",
      description:
        "Camilan gurih dari kulit ikan tenggiri asli pesisir Cirebon dengan bumbu rempah tradisional.",
      price: 20000,
      priceFormatted: "Rp 20.000",
      image: "/siwang-pouch.jpg",
      details: {
        composition: "Kulit ikan tenggiri, bawang putih, garam, ketumbar, rempah alami.",
        shelfLife: "4 Bulan dalam toples tertutup.",
        packaging: "Plastik zipper tebal kedap udara.",
      },
    },
  ] as ProductItem[],
};
