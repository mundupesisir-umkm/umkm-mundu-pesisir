"use client";

import { useState, useEffect, useCallback } from "react";
import { ProductItem } from "@/constants/products";
import { fetchProducts } from "@/lib/supabase";

export function useProducts() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetchProducts();
      if (!res.error) {
        // Use purely what is in the database (empty array if 0 products)
        setProducts(res.data || []);
        setError(null);
      } else {
        setProducts([]);
        setError(res.error);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error fetching products";
      setError(msg);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return { products, isLoading, error, reload: loadProducts };
}
