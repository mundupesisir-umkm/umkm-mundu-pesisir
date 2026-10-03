export interface ContactChannel {
  id: string;
  icon: "WhatsApp" | "Mail" | "MapPin" | "Clock";
  title: string;
  subtitle: string;
  primaryValue: string;
  actionText: string;
  actionHref: string;
  isPrimary?: boolean;
  statusBadge?: string;
}

export const CONTACT_CONFIG = {
  badge: "LOKASI & LAYANAN RESMI",
  headline: "Hubungi & Kunjungi Sentra UMKM Mundu Pesisir",
  description:
    "Kami siap melayani pembelian retail oleh-oleh, pesanan jumlah besar (grosir/reseller), kemitraan antar instansi, hingga kunjungan langsung ke gerai kami di pesisir Cirebon.",

  channels: [
    {
      id: "whatsapp",
      icon: "WhatsApp",
      title: "Layanan Admin UMKM Desa Mundu",
      subtitle: "Respon tercepat untuk cek stok terpusat, pengiriman, dan info umum desa",
      primaryValue: "+62 812-1414-5254",
      actionText: "Chat Admin WhatsApp",
      actionHref:
        "https://wa.me/6281214145254?text=Halo%20Admin%20UMKM%20Mundu%20Pesisir,%20saya%20ingin%20bertanya%20seputar%20produk%20dan%20pemesanan.",
      isPrimary: true,
      statusBadge: "🟢 Admin Desa",
    },
    {
      id: "wa-ibu-magfiro",
      icon: "WhatsApp",
      title: "UMKM Ibu Magfiro (Siwang & Sambal Cumi)",
      subtitle: "Pemesanan langsung Siwang toples aneka ukuran & Sambal cumi segar",
      primaryValue: "+62 821-1988-2446",
      actionText: "Chat Ibu Magfiro",
      actionHref:
        "https://wa.me/6282119882446?text=Halo%20Ibu%20Magfiro,%20saya%20ingin%20memesan%20Siwang%20atau%20Sambal%20Cumi.",
      statusBadge: "Pengrajin Langsung",
    },
    {
      id: "wa-ibu-santi",
      icon: "WhatsApp",
      title: "UMKM Ibu Santi (Beras Pilihan)",
      subtitle: "Pemesanan beras pulen per kilo & karungan 25kg (3 mutu pilihan)",
      primaryValue: "+62 821-1539-7254",
      actionText: "Chat Ibu Santi",
      actionHref:
        "https://wa.me/6282115397254?text=Halo%20Ibu%20Santi,%20saya%20ingin%20memesan%20beras%20berkualitas%20panen%20lokal.",
      statusBadge: "Penyedia Beras",
    },
    {
      id: "wa-siti-maemunah",
      icon: "WhatsApp",
      title: "UMKM Siti Maemunah (Bandeng & Ikan Laut)",
      subtitle: "Pemesanan bandeng presto duri lunak, sarden segar, & pindang biles",
      primaryValue: "+62 838-2339-6163",
      actionText: "Chat Siti Maemunah",
      actionHref:
        "https://wa.me/6283823396163?text=Halo%20Ibu%20Siti%20Maemunah,%20saya%20ingin%20memesan%20olahan%20ikan%20pesisir.",
      statusBadge: "Pengolah Ikan",
    },
    {
      id: "email",
      icon: "Mail",
      title: "Korespondensi & Kemitraan Email",
      subtitle: "Khusus penawaran B2B, reseller supermarket, atau studi banding",
      primaryValue: "umkm.mundupesisir@gmail.com",
      actionText: "Kirim Email Resmi",
      actionHref: "mailto:umkm.mundupesisir@gmail.com",
      statusBadge: "Balasan 1x24 Jam",
    },
  ] as ContactChannel[],

  routes: [
    {
      from: "Dari Stasiun Cirebon (Kejaksan / Prujakan)",
      duration: "± 15 Menit (8,5 km)",
      description:
        "Arahkan kendaraan ke Jalan Kalijaga ke arah selatan menuju pesisir Mundu. Gerai berada di jalur utama pesisir dekat kantor desa.",
    },
    {
      from: "Dari Gerbang Tol Kanci / Ciperna",
      duration: "± 12 Menit (7 km)",
      description:
        "Keluar di Exit Tol Kanci / Ciperna, ikuti jalan arteri menuju jalur pesisir Mundu. Akses jalan mulus dan dapat dilalui mobil maupun bus pariwisata.",
    },
  ],

  faqs: [
    {
      question: "Apakah bisa kirim ke luar kota dan luar pulau?",
      answer:
        "Bisa! Kami bekerja sama dengan ekspedisi terpercaya (JNE, J&T, SiCepat, Paxel). Setiap toples Siwang dan olahan seafood dikemas dengan kardus tebal dan lapisan bubble wrap gratis sehingga dijamin tidak remuk dan kedap udara.",
    },
    {
      question: "Berapa lama daya tahan Siwang tanpa bahan pengawet?",
      answer:
        "Siwang (Terasi Bawang) kami mampu bertahan renyah hingga 3 - 4 bulan pada suhu ruang dalam toples tertutup rapat, karena proses penirisan minyak menggunakan spinner higienis tanpa tambahan bahan pengawet kimia.",
    },
    {
      question: "Apakah tersedia harga khusus untuk reseller atau grosir?",
      answer:
        "Ya, kami menyediakan paket reseller dan grosir dengan potongan harga khusus untuk minimal order mulai dari 12 toples. Hubungi WhatsApp admin kami untuk mendapatkan katalog harga reseller.",
    },
    {
      question: "Apakah bisa datang langsung untuk membeli atau melihat produksi?",
      answer:
        "Tentu sangat bisa! Gerai UMKM Desa Mundu Pesisir buka setiap hari pukul 07.30 - 17.00 WIB. Anda bisa langsung mencoba tester rasa sebelum membeli.",
    },
  ],
};
