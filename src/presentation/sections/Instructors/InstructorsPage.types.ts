import type { CollectionEntry } from "astro:content";

export interface InstructorsPageProps {
  page: CollectionEntry<"pages">;
  instructors: CollectionEntry<"instructors">[];
}
