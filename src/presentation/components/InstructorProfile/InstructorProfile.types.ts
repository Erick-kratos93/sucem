import type { CollectionEntry } from "astro:content";

export interface InstructorProfileDialogProps {
  instructor: CollectionEntry<"instructors">;
}

export interface InstructorProfilesProps {
  instructors: CollectionEntry<"instructors">[];
}
