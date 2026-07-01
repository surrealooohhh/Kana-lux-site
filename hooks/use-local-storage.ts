"use client";

import { useEffect, useRef, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const initialValueRef = useRef(initialValue);
  const [value, setValue] = useState<T>(initialValue);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      setValue(item ? (JSON.parse(item) as T) : initialValueRef.current);
    } catch {
      window.localStorage.removeItem(key);
      setValue(initialValueRef.current);
    } finally {
      setReady(true);
    }
  }, [key]);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, ready, value]);

  return [value, setValue, ready] as const;
}
