import type { CollectionEntry } from "astro:content";

export interface InstitutionsPageProps {
  page: CollectionEntry<"pages">;
  institutions: CollectionEntry<"institutions">[];
  instructors: CollectionEntry<"instructors">[];
}

export interface InstitutionGroup {
  id: string;
  label: string;
  institutions: CollectionEntry<"institutions">[];
}
