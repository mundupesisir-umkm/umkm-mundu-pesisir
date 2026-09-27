"use client";

import { useState, useEffect, useCallback } from "react";
import { TestimonialItem } from "@/constants/testimonials";
import { fetchTestimonials } from "@/lib/supabase";

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [tableExists, setTableExists] = useState<boolean>(true);

  const loadTestimonials = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetchTestimonials();
      if (!res.error) {
        setTestimonials(res.data || []);
        setTableExists(res.tableExists !== false);
        setError(null);
      } else {
        setTestimonials(res.data || []);
        setTableExists(res.tableExists !== false);
        setError(res.error);
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Error fetching testimonials";
      setError(msg);
      setTestimonials([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTestimonials();
  }, [loadTestimonials]);

  return { testimonials, isLoading, error, tableExists, reload: loadTestimonials };
}
