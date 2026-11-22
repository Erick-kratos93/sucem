import type { NavigationItem } from "../../../config/site";

export interface HeaderNavProps {
  items: NavigationItem[];
  variant: "desktop" | "mobile";
}
