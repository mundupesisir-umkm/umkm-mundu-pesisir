"use client";

import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib";

interface NavSearchProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export const NavSearch: React.FC<NavSearchProps> = ({
  placeholder = "Cari produk & info...",
  onSearch,
  className = "",
}) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch?.(value);
  };

  const handleClear = () => {
    setQuery("");
    onSearch?.("");
  };

  return (
    <div className={cn("relative flex items-center shrink-0", className)}>
      <div className="absolute left-3 text-[#8a6843] pointer-events-none flex items-center">
        <Search className="w-3.5 h-3.5 text-[#8a6843]" />
      </div>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full lg:w-28 xl:w-48 focus:lg:w-36 focus:xl:w-52 bg-white/95 text-[#0a2642] placeholder:text-[#8c7a68] text-xs sm:text-sm pl-8.5 pr-7 py-1.5 sm:py-2 rounded-lg border border-[#d3c1ac] focus:border-[#0a2642] focus:outline-hidden focus:ring-2 focus:ring-[#0a2642]/15 transition-all duration-300 shadow-2xs"
      />
      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-2.5 text-[#8c7a68] hover:text-[#0a2642] transition-colors"
          title="Hapus pencarian"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
