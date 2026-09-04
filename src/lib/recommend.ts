import { Comedian, StyleTags } from "@/types/comedian";

const TAG_KEYS: (keyof StyleTags)[] = [
  "darkness",
  "absurdism",
  "political",
  "storytelling",
  "energy",
  "crowdWork",
];

function tagsToVector(tags: StyleTags): number[] {
  return TAG_KEYS.map((k) => tags[k]);
}

/** Average the tag vectors of a set of comedians into a single "taste profile". */
export function buildTasteProfile(liked: Comedian[]): number[] {
  if (liked.length === 0) return TAG_KEYS.map(() => 5);
  const sums = TAG_KEYS.map(() => 0);
  for (const c of liked) {
    const v = tagsToVector(c.tags);
    v.forEach((val, i) => (sums[i] += val));
  }
  return sums.map((s) => s / liked.length);
}

/** Euclidean distance between two vectors, converted to a 0-1 similarity score (1 = identical). */
function similarity(a: number[], b: number[]): number {
  const maxDistPerDim = 10; // tags are 0-10
  const maxDist = Math.sqrt(a.length * maxDistPerDim * maxDistPerDim);
  const dist = Math.sqrt(
    a.reduce((sum, val, i) => sum + Math.pow(val - b[i], 2), 0)
  );
  return 1 - dist / maxDist;
}

export interface Recommendation {
  comedian: Comedian;
  score: number; // 0-1, higher = better match
}

export function getRecommendations(
  likedSlugs: string[],
  all: Comedian[],
  count = 8
): Recommendation[] {
  const liked = all.filter((c) => likedSlugs.includes(c.slug));
  const profile = buildTasteProfile(liked);

  return all
    .filter((c) => !likedSlugs.includes(c.slug))
    .map((c) => ({
      comedian: c,
      score: similarity(profile, tagsToVector(c.tags)),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count);
}

/** Find comedians most similar to a single comedian (used on profile pages). */
export function getSimilarTo(
  slug: string,
  all: Comedian[],
  count = 6
): Recommendation[] {
  const target = all.find((c) => c.slug === slug);
  if (!target) return [];
  const targetVec = tagsToVector(target.tags);
  return all
    .filter((c) => c.slug !== slug)
    .map((c) => ({
      comedian: c,
      score: similarity(targetVec, tagsToVector(c.tags)),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count);
}
