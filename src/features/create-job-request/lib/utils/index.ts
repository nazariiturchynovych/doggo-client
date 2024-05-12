export function formatDates(timeFrom: string, timeTo: string, date: Date): string {
  const fromDate = formatDate(date);
  return `${fromDate} From: ${timeFrom} To: ${timeTo}`;
}

export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1);
  const day = padZero(date.getDate());

  return `${year}.${month}.${day}`;
}

export function formatTime(date: Date): string {
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());

  return `${hours}:${minutes}`;
}

function padZero(value: number): string {
  return value < 10 ? `0${value}` : `${value}`;
}
