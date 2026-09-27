export interface CategoryItem {
  id: string;
  icon: "siwang" | "fish" | "seafood";
  title: string;
  description: string;
  linkText: string;
  href: string;
}

export interface WhyUsItem {
  id: string;
  icon: "fisherman" | "shield" | "community";
  title: string;
  description: string;
}

export const CATEGORIES_CONFIG = {
  badge: "KATEGORI UNGGULAN",
  headline: "Produk Khas Hasil Olahan Pesisir",
  description:
    "Pilih kategori produk favorit Anda untuk melihat koleksi lengkap dan harga terjangkau",
  categories: [
    {
      id: "siwang",
      icon: "siwang",
      title: "Siwang (Terasi Bawang)",
      description:
        "Sambal tabur garing gurih berbahan terasi udang rebon asli Desa Mundu dan irisan bawang merah goreng Brebes-Cirebon.",
      linkText: "Lihat Varian Siwang",
      href: "#produk-siwang",
    },
    {
      id: "olahan-ikan",
      icon: "fish",
      title: "Olahan Ikan",
      description:
        "Kerupuk Payur ikan tenggiri khas Mundu Pesisir, kerupuk udang rebon bintik alami, dan camilan kulit ikan kakap garing.",
      linkText: "Lihat Olahan Ikan",
      href: "#produk-ikan",
    },
    {
      id: "aneka-seafood",
      icon: "seafood",
      title: "Aneka Seafood",
      description:
        "Cumi asin telor super empuk, ikan asin jambal roti daging tebal, teri jengki belah, dan rebon kering manis tangkapan perahu nelayan.",
      linkText: "Lihat Seafood",
      href: "#produk-seafood",
    },
  ] as CategoryItem[],
};

export const WHY_US_CONFIG = {
  badge: "KUALITAS PESISIR",
  headline: "Kenapa Memilih Produk UMKM Mundu Pesisir?",
  description:
    "Keaslian cita rasa bahari tradisional Cirebon yang diproduksi dengan hati dan integritas",
  features: [
    {
      id: "nelayan-lokal",
      icon: "fisherman",
      title: "100% Tangkapan Nelayan Lokal",
      description:
        "Bahan baku udang rebon, cumi, dan ikan diperoleh langsung dari perahu nelayan Desa Mundu Pesisir setiap pagi sehingga terjaga kesegarannya.",
    },
    {
      id: "bebas-pengawet",
      icon: "shield",
      title: "Bebas Pengawet & Kimia Berbahaya",
      description:
        "Daya awet produk dihasilkan dari pengeringan matahari alami dan teknik pemasakan matang tradisional. Aman dikonsumsi seluruh keluarga.",
    },
    {
      id: "kesejahteraan-desa",
      icon: "community",
      title: "Mendukung Kesejahteraan Desa",
      description:
        "Setiap pembelian langsung membantu perekonomian ibu-ibu pesisir pembuat Siwang dan ratusan nelayan tradisional di wilayah Mundu Cirebon.",
    },
  ] as WhyUsItem[],
};
