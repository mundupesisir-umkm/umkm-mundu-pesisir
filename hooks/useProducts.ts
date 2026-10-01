"use client";

import { useState, useEffect, useCallback } from "react";
import { ProductItem } from "@/constants/products";
import { fetchProducts } from "@/lib/supabase";

export function useProducts(initialProducts?: ProductItem[]) {
  const [products, setProducts] = useState<ProductItem[]>(
    initialProducts && initialProducts.length > 0 ? initialProducts : []
  );
  const [isLoading, setIsLoading] = useState<boolean>(!initialProducts || initialProducts.length === 0);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = useCallback(async () => {
    // If we already have initialProducts and it's the first load, don't show spinner
    try {
      const res = await fetchProducts();
      if (!res.error) {
        setProducts(res.data || []);
        setError(null);
      } else {
        if (!initialProducts || initialProducts.length === 0) {
          setProducts([]);
        }
        setError(res.error);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error fetching products";
      setError(msg);
      if (!initialProducts || initialProducts.length === 0) {
        setProducts([]);
      }
    } finally {
      setIsLoading(false);
    }
  }, [initialProducts]);

  useEffect(() => {
    // Only fetch if initial data was not provided or to sync background data
    if (!initialProducts || initialProducts.length === 0) {
      loadProducts();
    }
  }, [loadProducts, initialProducts]);

  return { products, isLoading, error, reload: loadProducts };
}
