export interface VillageStat {
  value: string;
  label: string;
  sublabel: string;
  icon: string;
}

export interface VillagePillar {
  title: string;
  description: string;
  tag: string;
  icon: string;
}

export const VILLAGE_PROFILE_CONFIG = {
  badge: "PROFIL RESMI DESA BAHARI",
  headline: "Mengenal Desa Mundu Pesisir, Sentra Kuliner Pesisir Cirebon",
  description:
    "Desa nelayan bersejarah di pesisir utara Laut Jawa dengan tradisi bahari yang kaya, ekosistem mangrove yang lestari, dan sentra penghasil Siwang (Terasi Bawang) kebanggaan Kabupaten Cirebon.",

  stats: [
    {
      value: "1,55 km²",
      label: "Luas Wilayah",
      sublabel: "Dataran rendah pesisir (1-5 mdpl)",
      icon: "Map",
    },
    {
      value: "Laut Jawa",
      label: "Batas Utara Langsung",
      sublabel: "Hanya ±15 menit dari Kota Cirebon",
      icon: "Compass",
    },
    {
      value: "Udang Rebon",
      label: "Komoditas Ikonik",
      sublabel: "Bahan baku terasi & siwang asli",
      icon: "Fish",
    },
    {
      value: "Tradisi Nadran",
      label: "Kearifan Leluhur",
      sublabel: "Sedekah laut syukur tahunan",
      icon: "Anchor",
    },
  ] as VillageStat[],

  pillars: [
    {
      title: "Harmoni Tradisi & Budaya Nadran",
      tag: "KEARIFAN LOKAL",
      description:
        "Masyarakat nelayan Mundu Pesisir menjunjung tinggi tradisi Sedekah Laut (Nadran) setiap tahunnya. Tradisi ini adalah ungkapan rasa syukur tulus kepada Sang Pencipta atas kelimpahan hasil laut dan doa keselamatan bagi para perahu nelayan saat mengarungi ombak samudra.",
      icon: "⚓",
    },
    {
      title: "Pemberdayaan Wanita Nelayan & Sentra Siwang",
      tag: "EKONOMI KREATIF",
      description:
        "Dapur-dapur pesisir digerakkan oleh kelompok ibu-ibu nelayan yang mengolah hasil tangkapan segar menjadi produk bernilai tambah tinggi. Lahirlah Siwang (Terasi Bawang) renyah, Kerupuk Ikan Payur mekar, dan aneka olahan seafood kering yang higienis dan bebas pengawet kimia.",
      icon: "🦐",
    },
    {
      title: "Kelestarian Hutan Mangrove Pesisir",
      tag: "EKOSISTEM BERKELANJUTAN",
      description:
        "Kawasan hutan mangrove di pesisir Mundu dirawat bersama sebagai benteng alami pencegah abrasi pantai, sekaligus daerah pemijahan (nursery ground) bagi udang rebon dan ikan-ikan kecil, menjaga rantai ekologi laut tetap subur sepanjang generasi.",
      icon: "🌿",
    },
  ] as VillagePillar[],

  vision: {
    title: "Visi Kemandirian Nelayan Desa Mundu Pesisir",
    description:
      "Mewujudkan masyarakat pesisir yang mandiri, berdaya saing, dan sejahtera melalui hilirisasi produk hasil laut berkualitas unggul yang langsung menjangkau konsumen di seluruh Indonesia secara transparan, adil, dan tanpa ketergantungan pada tengkulak.",
    points: [
      "Meningkatkan nilai jual hasil tangkapan nelayan lokal.",
      "Membuka lapangan kerja bagi kelompok perempuan pesisir.",
      "Menjaga keaslian resep kuliner warisan leluhur Cirebon.",
      "Memanfaatkan teknologi digital untuk akses pasar nasional.",
    ],
  },
};
