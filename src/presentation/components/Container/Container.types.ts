import type { HTMLTag } from "astro/types";

export type ContainerSize = "default" | "wide";

export interface ContainerProps {
  as?: HTMLTag;
  size?: ContainerSize;
  id?: string;
  class?: string;
}
