export function createAvatarFallback(firstString: string, secondString: string): string {
  const firstLetterFirstString = firstString.charAt(0).toUpperCase();
  const firstLetterSecondString = secondString.charAt(0).toUpperCase();

  return `${firstLetterFirstString}${firstLetterSecondString}`;
}