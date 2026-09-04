import Link from "next/link";
import { ComedianPicker } from "@/components/ComedianPicker";
import { comedians } from "@/data/comedians";

export default function Home() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 flex flex-col gap-16">
      <section className="flex flex-col gap-6">
        <h1 className="font-display font-extrabold text-5xl sm:text-6xl leading-[0.95] tracking-tight text-paper max-w-2xl">
          Bored of the same five specials on your watchlist?
        </h1>
        <p className="text-muted text-lg max-w-xl">
          Pick a few comedians you already like. We match on actual style —
          dark vs. clean, storytelling vs. one-liners, crowd-work vs.
          scripted — not just &ldquo;stand-up&rdquo; as one big genre.
        </p>
        <ComedianPicker />
      </section>

      <section className="border-t border-line pt-10">
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="font-display font-bold text-2xl text-paper">
            Browse the lineup
          </h2>
          <span className="text-sm text-muted">{comedians.length} comedians so far</span>
        </div>
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3">
          {comedians.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/comedian/${c.slug}`}
                className="text-paper hover:text-marquee transition-colors"
              >
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
