import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getHexColor(color?: string) {
  if (!color) return "#333";
  const c = color.toLowerCase();
  if (c.includes("green")) return "#bef264";
  if (c.includes("red")) return "#991b1b";
  if (c.includes("purple")) return "#6b21a8";
  if (c.includes("white")) return "#bef264";
  if (c.includes("black")) return "#000000";
  return "#333";
}
