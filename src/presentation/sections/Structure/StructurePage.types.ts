import type { CollectionEntry } from "astro:content";

export interface StructurePageProps {
  page: CollectionEntry<"pages">;
  tabs: CollectionEntry<"structureTabs">[];
}
