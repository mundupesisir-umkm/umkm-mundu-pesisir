"use client";

import React from "react";
import { ShieldCheck, Clock, PackageCheck } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { ProductItem } from "@/constants/products";

interface ProductDetailSpecsProps {
  details?: ProductItem["details"];
  localizedDetails?: ProductItem["details"] | null;
}

export const ProductDetailSpecs: React.FC<ProductDetailSpecsProps> = ({
  details,
  localizedDetails,
}) => {
  const { t } = useLanguage();

  if (!details) return null;

  return (
    <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex flex-col gap-2.5 text-xs text-slate-700">
      <div className="flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-[#008276] shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-900">
            {t.productDetail.compositionLabel}:
          </strong>{" "}
          <span className="text-slate-600">
            {localizedDetails?.composition || details.composition}
          </span>
        </div>
      </div>
      <div className="flex items-start gap-2.5">
        <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-900">
            {t.productDetail.shelfLifeLabel}:
          </strong>{" "}
          <span className="text-slate-600">
            {localizedDetails?.shelfLife || details.shelfLife}
          </span>
        </div>
      </div>
      <div className="flex items-start gap-2.5">
        <PackageCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-900">
            {t.productDetail.packagingLabel}:
          </strong>{" "}
          <span className="text-slate-600">
            {localizedDetails?.packaging || details.packaging}
          </span>
        </div>
      </div>
    </div>
  );
};
