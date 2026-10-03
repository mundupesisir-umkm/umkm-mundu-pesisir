import { Language } from "./types";

export interface ProductDetailsSpec {
  composition: string;
  shelfLife: string;
  packaging: string;
}

const EN_REPLACEMENTS: [RegExp, string][] = [
  [/Bawang merah Cirebon/gi, "Cirebon shallots"],
  [/terasi udang rebon asli Mundu Pesisir/gi, "authentic Mundu Pesisir rebon shrimp paste"],
  [/terasi udang rebon asli/gi, "authentic rebon shrimp paste"],
  [/terasi udang rebon/gi, "rebon shrimp paste"],
  [/rempah alami/gi, "natural spices"],
  [/garam laut alami/gi, "natural sea salt"],
  [/minyak kelapa nabati/gi, "vegetable coconut oil"],
  [/cabai rawit/gi, "bird's eye chili"],
  [/di suhu ruang(an)?/gi, "at room temperature"],
  [/Bulan/gi, "Months"],
  [/Hari/gi, "Days"],
  [/Minggu/gi, "Weeks"],
  [/Standing pouch zipper tebal kedap udara/gi, "Heavy-duty airtight zipper standing pouch"],
  [/Toples kedap udara/gi, "Airtight seal jar"],
  [/Plastik vakum tebal/gi, "Heavy-duty vacuum seal pouch"],
];

/**
 * Translates dynamic product specification strings into the requested locale.
 */
export function translateProductDetails<T extends ProductDetailsSpec | undefined | null>(
  details: T,
  language: Language
): T {
  if (!details || language !== "en") {
    return details;
  }

  const translateText = (text: string): string => {
    let res = text;
    for (const [pattern, replacement] of EN_REPLACEMENTS) {
      res = res.replace(pattern, replacement);
    }
    return res;
  };

  return {
    ...details,
    composition: translateText(details.composition),
    shelfLife: translateText(details.shelfLife),
    packaging: translateText(details.packaging),
  };
}

export interface OrderMessageParams {
  productName: string;
  variantName?: string;
  quantity: number;
  totalPriceFormatted: string;
  language: Language;
}

/**
 * Formats a localized WhatsApp order message template.
 */
export function formatOrderWhatsAppMessage({
  productName,
  variantName,
  quantity,
  totalPriceFormatted,
  language,
}: OrderMessageParams): string {
  const itemTitle = variantName ? `*${productName}*\nVarian: *${variantName}*` : `*${productName}*`;

  if (language === "en") {
    return `Hello Mundu Pesisir Artisan, I am interested and would like to order:\n\n${itemTitle}\nQuantity: ${quantity} package(s)\nEstimated Total: ${totalPriceFormatted}\n\nPlease advise on current stock availability and shipping costs to my address. Thank you!`;
  }
  return `Halo Pengrajin UMKM Mundu Pesisir, saya tertarik dan ingin memesan produk:\n\n${itemTitle}\nJumlah: ${quantity} kemasan\nEstimasi Total: ${totalPriceFormatted}\n\nMohon informasi ketersediaan stok terbaru dan rincian ongkos kirim ke alamat saya. Terima kasih!`;
}
