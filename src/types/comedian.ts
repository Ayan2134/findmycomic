// Each tag is a 0-10 scale between two poles.
// 0 = fully the left pole, 10 = fully the right pole, 5 = right in the middle.
export interface StyleTags {
  /** 0 = squeaky clean, 10 = filthy / dark */
  darkness: number;
  /** 0 = grounded observational, 10 = absurdist / surreal */
  absurdism: number;
  /** 0 = apolitical, 10 = heavily political/social commentary */
  political: number;
  /** 0 = punchy one-liners, 10 = long-form storytelling */
  storytelling: number;
  /** 0 = deadpan / low-energy, 10 = high-energy / physical */
  energy: number;
  /** 0 = tightly scripted, 10 = heavy crowd-work / improv */
  crowdWork: number;
}

export const TAG_LABELS: Record<keyof StyleTags, [string, string]> = {
  darkness: ["Clean", "Dark"],
  absurdism: ["Observational", "Absurdist"],
  political: ["Apolitical", "Political"],
  storytelling: ["One-liners", "Storytelling"],
  energy: ["Deadpan", "High-energy"],
  crowdWork: ["Scripted", "Crowd-work"],
};

export interface Comedian {
  slug: string;
  name: string;
  country: string;
  /** One or two sentence description of their comedic voice */
  blurb: string;
  /** Well-known specials/sets, for reference and links */
  knownFor: string[];
  tags: StyleTags;
  /** Optional link to a special or clip */
  watchUrl?: string;
}
