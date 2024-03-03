import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createAvatarFallback(firstString: string, secondString?: string): string {
  const firstLetterFirstString = firstString.charAt(0).toUpperCase();
  const firstLetterSecondString = secondString?.charAt(0).toUpperCase();

  return `${firstLetterFirstString}${firstLetterSecondString ?? ''}`;
}