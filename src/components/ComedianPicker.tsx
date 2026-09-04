"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { comedians } from "@/data/comedians";

export function ComedianPicker() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return comedians
      .filter(
        (c) =>
          !selected.includes(c.slug) &&
          c.name.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [query, selected]);

  function addComedian(slug: string) {
    setSelected((prev) => [...prev, slug]);
    setQuery("");
  }

  function removeComedian(slug: string) {
    setSelected((prev) => prev.filter((s) => s !== slug));
  }

  function goToResults() {
    if (selected.length === 0) return;
    router.push(`/results?likes=${selected.join(",")}`);
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type a comedian you already like…"
          className="w-full rounded-md border border-line bg-surface px-4 py-3 text-paper placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-marquee"
        />
        {results.length > 0 && (
          <ul className="absolute z-10 mt-1 w-full rounded-md border border-line bg-surface-2 overflow-hidden">
            {results.map((c) => (
              <li key={c.slug}>
                <button
                  onClick={() => addComedian(c.slug)}
                  className="w-full text-left px-4 py-2.5 hover:bg-surface transition-colors"
                >
                  <span className="text-paper">{c.name}</span>
                  <span className="text-muted text-sm ml-2">{c.country}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map((slug) => {
            const c = comedians.find((c) => c.slug === slug);
            if (!c) return null;
            return (
              <button
                key={slug}
                onClick={() => removeComedian(slug)}
                className="group inline-flex items-center gap-2 rounded-full border border-marquee/40 bg-marquee/10 px-3.5 py-1.5 text-sm text-paper"
              >
                {c.name}
                <span className="text-muted group-hover:text-paper">×</span>
              </button>
            );
          })}
        </div>
      )}

      <button
        onClick={goToResults}
        disabled={selected.length === 0}
        className="self-start rounded-md bg-marquee px-6 py-3 font-semibold text-ink disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 transition"
      >
        Find comedians like this
      </button>
    </div>
  );
}
