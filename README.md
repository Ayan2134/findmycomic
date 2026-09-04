# FindMyComic

Find your next favorite stand-up comedian, based on actual style — not just "stand-up" as one genre.

Pick a few comedians you already like, and FindMyComic recommends others using a
style-tag similarity model (dark ↔ clean, absurdist ↔ observational, political ↔
apolitical, storytelling ↔ one-liners, high-energy ↔ deadpan, crowd-work ↔ scripted).

## Tech stack
- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- No database yet — comedian data lives in `src/data/comedians.ts` as a typed seed file.
  This is intentional for the MVP: easy to edit, easy to review in a PR, no infra to run.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project structure

```
src/
  app/
    page.tsx                 # home page: hero + comedian picker + browse list
    results/page.tsx         # recommendation results (reads ?likes=slug1,slug2)
    comedian/[slug]/page.tsx # comedian profile page + "similar to" list
    layout.tsx, globals.css  # shared chrome + design tokens
  components/
    ComedianPicker.tsx        # client-side search + multi-select
    TagBar.tsx                 # visualizes a single style tag as a meter
  data/
    comedians.ts              # seed data — the whole "database" for now
  lib/
    recommend.ts               # taste-profile + similarity/recommendation logic
  types/
    comedian.ts                 # StyleTags + Comedian types, tag labels
```

## How the recommendation logic works

Each comedian has 6 style tags, each on a 0-10 scale between two poles (see
`src/types/comedian.ts`). When a user picks comedians they like, we average their
tag vectors into a single "taste profile" (`buildTasteProfile`), then rank every
other comedian by how close their tags are to that profile using normalized
Euclidean distance (`getRecommendations` in `src/lib/recommend.ts`). Comedian
profile pages use the same distance function to find comedians similar to a
single comedian (`getSimilarTo`).

This is intentionally simple (no ML, no external API) so it's easy to reason
about and tune by hand while the comedian list is small.

## Adding / editing comedians

Edit `src/data/comedians.ts` directly — add a new object to the `comedians`
array with a unique `slug`, and fill in `tags` on the 0-10 scale described in
`src/types/comedian.ts`. No other file needs to change; profile pages and
recommendations pick it up automatically.

The current tag values are a first-pass approximation — refine them as you
actually watch specials, or once you add a way for users to submit/adjust tags.

## Next steps / ideas (not built yet)
- Move comedian data into a real database (e.g. SQLite via Prisma, or Supabase)
  once you want user-submitted comedians/tags or a lot more entries.
- Add live show / open-mic listings (ties back to the original "bored on
  weekends in Bangalore" problem).
- User accounts, so people can save their taste profile instead of re-picking
  every time.
- Deploy on Vercel: connect this repo, it should build with zero config.

## Deploying
Push this repo to GitHub, then import it on [vercel.com](https://vercel.com) —
no environment variables or extra config needed for the current MVP.
