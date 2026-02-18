import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import type { ClassValue } from "clsx"; // type-only import

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}
