"use client";

import { useState, useEffect, useCallback } from "react";
import { TestimonialItem } from "@/constants/testimonials";
import { fetchTestimonials } from "@/lib/supabase";

export function useTestimonials(initialTestimonials?: TestimonialItem[]) {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(
    initialTestimonials && initialTestimonials.length > 0 ? initialTestimonials : []
  );
  const [isLoading, setIsLoading] = useState<boolean>(!initialTestimonials || initialTestimonials.length === 0);
  const [error, setError] = useState<string | null>(null);
  const [tableExists, setTableExists] = useState<boolean>(true);

  const loadTestimonials = useCallback(async () => {
    try {
      const res = await fetchTestimonials();
      if (!res.error) {
        setTestimonials(res.data || []);
        setTableExists(res.tableExists !== false);
        setError(null);
      } else {
        if (!initialTestimonials || initialTestimonials.length === 0) {
          setTestimonials(res.data || []);
        }
        setTableExists(res.tableExists !== false);
        setError(res.error);
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Error fetching testimonials";
      setError(msg);
      if (!initialTestimonials || initialTestimonials.length === 0) {
        setTestimonials([]);
      }
    } finally {
      setIsLoading(false);
    }
  }, [initialTestimonials]);

  useEffect(() => {
    if (!initialTestimonials || initialTestimonials.length === 0) {
      loadTestimonials();
    }
  }, [loadTestimonials, initialTestimonials]);

  return { testimonials, isLoading, error, tableExists, reload: loadTestimonials };
}
