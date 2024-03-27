import React, { useState } from 'react';
import { Calendar } from '@/shared/ui';

type SomeProps = {};

export const Some: React.FC<SomeProps> = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  console.log(date);

  return <Calendar mode="single" selected={date} onSelect={setDate} className="w-full" />;
};
