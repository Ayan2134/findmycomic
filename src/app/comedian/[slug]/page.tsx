import Link from "next/link";
import { notFound } from "next/navigation";
import { comedians } from "@/data/comedians";
import { getSimilarTo } from "@/lib/recommend";
import { TagBarGroup } from "@/components/TagBar";

export function generateStaticParams() {
  return comedians.map((c) => ({ slug: c.slug }));
}

export default async function ComedianPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const comedian = comedians.find((c) => c.slug === slug);
  if (!comedian) notFound();

  const similar = getSimilarTo(slug, comedians, 6);

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 flex flex-col gap-12">
      <div>
        <p className="text-muted mb-2">{comedian.country}</p>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-paper">
          {comedian.name}
        </h1>
        <p className="text-muted text-lg mt-4 max-w-xl">{comedian.blurb}</p>
        <p className="text-sm text-muted mt-3">
          Known for: {comedian.knownFor.join(", ")}
        </p>
      </div>

      <div>
        <h2 className="font-display font-bold text-xl text-paper mb-4">Style</h2>
        <TagBarGroup tags={comedian.tags} />
      </div>

      <div>
        <h2 className="font-display font-bold text-xl text-paper mb-4">
          If you like {comedian.name}, try…
        </h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3">
          {similar.map(({ comedian: c, score }) => (
            <li key={c.slug} className="flex flex-col">
              <Link
                href={`/comedian/${c.slug}`}
                className="text-paper hover:text-marquee transition-colors"
              >
                {c.name}
              </Link>
              <span className="text-xs text-muted">{Math.round(score * 100)}% similar</span>
            </li>
          ))}
        </ul>
      </div>

      <Link href="/" className="self-start text-sm text-muted hover:text-paper">
        ← back to FindMyComic
      </Link>
    </div>
  );
}
