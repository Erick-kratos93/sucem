export type SectionHeadingLevel = 2 | 3 | 4;
export type SectionHeadingAlign = "left" | "center" | "right";

export interface SectionHeadingProps {
  title: string;
  level?: SectionHeadingLevel;
  align?: SectionHeadingAlign;
  id?: string;
  class?: string;
}
