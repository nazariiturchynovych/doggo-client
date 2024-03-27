import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createAvatarFallback(firstString: string, secondString?: string): string {
  const firstLetterFirstString = firstString.charAt(0).toUpperCase();
  const firstLetterSecondString = secondString?.charAt(0).toUpperCase();

  return `${firstLetterFirstString}${firstLetterSecondString ?? ''}`;
}

export function getPageFromArray<T>(array: T[], page: number): T[] {
  const pageSize = 10;
  const start = page == 1 ? 0 : (page - 1) * pageSize;
  const end = Math.min(start + pageSize, array.length);
  return array.slice(start, end);
}

export function formatDateRange(startDate: Date, endDate: Date): string {
  // Format start date
  const startDay = startDate.getDate().toString().padStart(2, '0');
  const startMonth = (startDate.getMonth() + 1).toString().padStart(2, '0');
  const startHour = startDate.getHours().toString().padStart(2, '0');
  const startMinute = startDate.getMinutes().toString().padStart(2, '0');

  // Format end date
  const endHour = endDate.getHours().toString().padStart(2, '0');
  const endMinute = endDate.getMinutes().toString().padStart(2, '0');

  // Construct the formatted string
  const formattedStartDate = `${startDay}.${startMonth} ${startHour}:${startMinute}`;
  const formattedEndDate = `${endHour}:${endMinute}`;

  return `${formattedStartDate}-${formattedEndDate}`;
}
