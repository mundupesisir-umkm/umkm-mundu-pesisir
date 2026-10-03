const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://bxtwyqmldikttqotcwjg.supabase.co";
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  "sb_publishable_TEyknZL_oFWMbZzIcK8IUw_sxULoJo7";

const supabase = createClient(supabaseUrl, supabaseKey);

const unifiedProducts = [
  // 1. Ibu Magfiro (WA: 082119882446)
  {
    name: "Siwang & Sambal Cumi Ibu Magfiro",
    category_label: "SIWANG & SAMBAL (IBU MAGFIRO)",
    category_key: "siwang",
    description: "Olahan Terasi Bawang (Siwang) renyah gurih dan Sambal Cumi pedas gurih khas Ibu Magfiro. Tersedia 5 pilihan ukuran toples praktis sesuai selera.",
    price: 15000,
    price_formatted: "Rp 15.000 - Rp 55.000",
    phone: "082119882446",
    image: "/products/placeholder.svg",
    composition: "Siwang: Bawang merah Cirebon, terasi udang rebon asli Mundu Pesisir, cabai, bumbu rempah alami. Sambal Cumi: Cumi asin segar nelayan, cabai rawit, bawang merah, bawang putih, minyak kelapa, garam rempah.",
    shelf_life: "Siwang: 3 - 4 Bulan di suhu ruang (tutup rapat). Sambal Cumi: 1 Bulan di pendingin / 2 minggu di suhu ruang.",
    packaging: "Kemasan toples higienis kedap udara (Tersedia Toples Kecil, Toples Sedang, dan Toples Besar)."
  },

  // 2. Ibu Santi (WA: 082115397254)
  {
    name: "Beras Berkualitas Panen Lokal Ibu Santi",
    category_label: "BERAS & HASIL TANI (IBU SANTI)",
    category_key: "beras",
    description: "Beras putih pulen panen lokal Cirebon tanpa pemutih sintetis buatan Ibu Santi. Tersedia pilihan eceran per kilogram maupun karungan 25 kg.",
    price: 14500,
    price_formatted: "Mulai Rp 14.500 / kg",
    phone: "082115397254",
    image: "/products/placeholder.svg",
    composition: "100% Beras bulir padi utuh petani lokal Cirebon (Tersedia 3 mutu pilihan: Kualitas Standar, Super, dan Premium Pandan/Ramos).",
    shelf_life: "6 - 12 Bulan dalam wadah tertutup sejuk dan kering.",
    packaging: "Kemasan kantong plastik tebal higienis per 1 kg & Karung 25 kg anyaman kuat berjahit rapi."
  },

  // 3. Siti Maemunah (WA: 083823396163)
  {
    name: "Bandeng Presto, Sarden & Pindang Biles Siti Maemunah",
    category_label: "SEAFOOD & OLAHAN IKAN (SITI MAEMUNAH)",
    category_key: "seafood",
    description: "Aneka olahan ikan laut segar tangkapan nelayan Mundu Pesisir buatan Siti Maemunah. Pilihan: Bandeng Presto duri lunak, Ikan Sarden olahan segar, dan Pindang Ikan Biles gurih.",
    price: 3000,
    price_formatted: "Rp 3.000 - Rp 35.000",
    phone: "083823396163",
    image: "/products/placeholder.svg",
    composition: "Ikan bandeng presto duri lunak, ikan sarden laut segar perahu nelayan, ikan biles pesisir, kunyit, daun salam, serai, garam laut alami.",
    shelf_life: "Bandeng & Sarden: 4 hari suhu ruang vakum / 1 - 2 bulan dalam freezer beku. Pindang Biles: 3 hari suhu ruang / 1 minggu di kulkas.",
    packaging: "Kemasan plastik vakum higienis kedap udara & besek bambu tradisional."
  }
];

async function seed() {
  console.log("Replacing products in Supabase with placeholder.svg...");
  const { error: delError } = await supabase.from("products").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  if (delError) {
    console.error("Delete error:", delError);
  }
  
  const { data, error } = await supabase.from("products").insert(unifiedProducts).select();
  if (error) {
    console.error("Error inserting products:", error);
  } else {
    console.log(`Successfully updated ${data.length} unified UMKM products in Supabase!`);
    data.forEach((p, i) => console.log(`${i+1}. ${p.name} | Image: ${p.image}`));
  }
}

seed();
