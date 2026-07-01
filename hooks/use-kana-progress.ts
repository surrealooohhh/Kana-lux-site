"use client";

import { useMemo } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type { StudyRecord } from "@/types/kana";

export function useKanaProgress() {
  const [favorites, setFavorites] = useLocalStorage<string[]>("kana:favorites", []);
  const [recent, setRecent] = useLocalStorage<string[]>("kana:recent", []);
  const [records, setRecords] = useLocalStorage<StudyRecord[]>("kana:records", []);
  const favoriteSet = useMemo(() => new Set(favorites), [favorites]);

  function toggleFavorite(id: string) {
    setFavorites((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }
  function markRecent(id: string) {
    setRecent((current) => [id, ...current.filter((item) => item !== id)].slice(0, 12));
  }
  function addRecord(record: Omit<StudyRecord, "viewedAt">) {
    setRecords((current) => [{ ...record, viewedAt: Date.now() }, ...current].slice(0, 50));
  }

  return { favorites, favoriteSet, recent, records, toggleFavorite, markRecent, addRecord };
}
