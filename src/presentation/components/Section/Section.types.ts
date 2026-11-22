import type { HTMLTag } from "astro/types";

export type SectionBackground = "surface" | "alt" | "primary" | "dark" | "transparent";
export type SectionSpacing = "default" | "compact" | "flush";

export interface SectionProps {
  as?: HTMLTag;
  background?: SectionBackground;
  spacing?: SectionSpacing;
  id?: string;
  class?: string;
}
