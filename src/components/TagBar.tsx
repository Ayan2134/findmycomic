import { TAG_LABELS, StyleTags } from "@/types/comedian";

export function TagBar({
  tagKey,
  value,
}: {
  tagKey: keyof StyleTags;
  value: number;
}) {
  const [left, right] = TAG_LABELS[tagKey];
  const pct = Math.max(0, Math.min(100, (value / 10) * 100));

  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="w-24 text-right text-muted shrink-0">{left}</span>
      <div className="relative flex-1 h-1.5 rounded-full bg-surface-2">
        <div
          className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-marquee shadow-[0_0_0_3px_var(--color-ink)]"
          style={{ left: `calc(${pct}% - 6px)` }}
        />
      </div>
      <span className="w-24 text-muted shrink-0">{right}</span>
    </div>
  );
}

export function TagBarGroup({ tags }: { tags: StyleTags }) {
  const keys = Object.keys(tags) as (keyof StyleTags)[];
  return (
    <div className="flex flex-col gap-2.5">
      {keys.map((k) => (
        <TagBar key={k} tagKey={k} value={tags[k]} />
      ))}
    </div>
  );
}
