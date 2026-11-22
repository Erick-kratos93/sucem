import type { ImageMetadata } from "astro";

export type PageHeroVariant = "default" | "center-large" | "center-medium";

export interface PageHeroProps {
  title: string;
  subtitle: string;
  image: ImageMetadata;
  variant?: PageHeroVariant;
}
