import Link from "next/link";
import { comedians } from "@/data/comedians";
import { getRecommendations } from "@/lib/recommend";

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ likes?: string }>;
}) {
  const params = await searchParams;
  const likedSlugs = (params.likes ?? "").split(",").filter(Boolean);
  const liked = comedians.filter((c) => likedSlugs.includes(c.slug));
  const recommendations = getRecommendations(likedSlugs, comedians, 8);

  if (liked.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16">
        <p className="text-muted">
          Pick a few comedians first.{" "}
          <Link href="/" className="text-marquee hover:underline">
            Go back
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 flex flex-col gap-10">
      <div>
        <p className="text-muted mb-2">Because you like</p>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-paper">
          {liked.map((c) => c.name).join(", ")}
        </h1>
      </div>

      <ol className="flex flex-col divide-y divide-line border-t border-b border-line">
        {recommendations.map(({ comedian, score }, i) => (
          <li key={comedian.slug} className="py-5 flex gap-5 items-start">
            <span className="font-display font-bold text-2xl text-muted w-8 shrink-0">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex-1">
              <div className="flex items-baseline justify-between gap-4">
                <Link
                  href={`/comedian/${comedian.slug}`}
                  className="font-display font-bold text-xl text-paper hover:text-marquee transition-colors"
                >
                  {comedian.name}
                </Link>
                <span className="text-sm text-marquee shrink-0">
                  {Math.round(score * 100)}% match
                </span>
              </div>
              <p className="text-muted text-sm mt-1">{comedian.blurb}</p>
              <p className="text-sm text-muted mt-1">
                Known for: {comedian.knownFor.join(", ")}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <Link href="/" className="self-start text-sm text-muted hover:text-paper">
        ← try different comedians
      </Link>
    </div>
  );
}
