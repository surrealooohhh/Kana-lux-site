"use client";

import { useMemo, useState } from "react";
import { KanaCard } from "@/components/kana/kana-card";
import { KanaDrawer } from "@/components/kana/kana-drawer";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useKanaProgress } from "@/hooks/use-kana-progress";
import { shuffle } from "@/lib/utils";
import type { KanaItem } from "@/types/kana";

export function KanaGrid({ items, showModes = true }: { items: KanaItem[]; showModes?: boolean }) {
  const [selected, setSelected] = useState<KanaItem | null>(null);
  const [mode, setMode] = useState("row");
  const { favoriteSet, toggleFavorite, recent } = useKanaProgress();
  const randomItems = useMemo(() => shuffle(items), [items]);
  const visible = useMemo(() => {
    if (mode === "random") return randomItems;
    if (mode === "favorites") return items.filter((item) => favoriteSet.has(item.id));
    if (mode === "recent") return items.filter((item) => recent.includes(item.id));
    return items;
  }, [favoriteSet, items, mode, randomItems, recent]);
  return (
    <div>
      {showModes ? <div className="mb-8 flex justify-center overflow-x-auto"><Tabs value={mode} onValueChange={setMode}><TabsList><TabsTrigger value="row">按行</TabsTrigger><TabsTrigger value="random">随机</TabsTrigger><TabsTrigger value="favorites">收藏</TabsTrigger><TabsTrigger value="recent">最近</TabsTrigger></TabsList></Tabs></div> : null}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {visible.map((kana) => <KanaCard key={kana.id} kana={kana} favorited={favoriteSet.has(kana.id)} onSelect={setSelected} onFavorite={toggleFavorite} />)}
      </div>
      {visible.length === 0 ? <div className="glass mx-auto mt-10 max-w-md rounded-2xl p-8 text-center text-muted-foreground">暂无内容。收藏或学习几个假名后，这里会自动出现。</div> : null}
      <KanaDrawer kana={selected} open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)} />
    </div>
  );
}
