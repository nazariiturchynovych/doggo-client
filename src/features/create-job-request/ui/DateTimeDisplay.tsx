import React from 'react';
import { formatDates } from '@/features/create-job-request/lib/utils';

interface DateTimeDisplayProps {
  timeFrom: string;
  timeTo: string;
  date: Date;
}

export const DateTimeDisplay: React.FC<DateTimeDisplayProps> = ({ timeFrom, timeTo, date }) => {
  return <div className="text-center">{formatDates(timeFrom, timeTo, date)}</div>;
};
