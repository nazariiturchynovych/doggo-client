import React, { useState } from 'react';
import { Calendar, Input, Popover, PopoverContent, PopoverTrigger } from '@/shared/ui';
import { formatDate, formatTime } from '@/features/create-job-request/lib/utils';

type DateTimePickerProps = {
  setScheduleValue: (inputFrom: Date, inputTo: Date) => void;
};

const createDateFromTimeString = (timeString: string, date: Date): Date => {
  const newDate = new Date(date);
  const [hours, minutes] = timeString.split(':').map(Number);
  newDate.setHours(hours);
  newDate.setMinutes(minutes);
  return newDate;
};

export const DateTimePicker: React.FC<DateTimePickerProps> = ({ setScheduleValue }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeFrom, setTimeFrom] = useState(formatTime(date!));
  const [timeTo, setTimeTo] = useState(formatTime(date!));

  React.useEffect(() => {
    const dateTimeFrom = createDateFromTimeString(timeFrom, date!);
    const dateTimeTo = createDateFromTimeString(timeTo, date!);

    setScheduleValue(dateTimeFrom, dateTimeTo);
  }, [timeFrom, timeTo, date]);

  return (
    <div className="z-[2000] flex w-full justify-between rounded-md border p-2 sm:items-center">
      <Popover>
        <div
          className={
            'flex w-full flex-col content-center gap-2 sm:flex-row sm:items-center sm:rounded-md'
          }>
          <div className={'min-h-10 w-auto content-center'}>{formatDate(date!)}</div>
          <div className={'flex'}>
            <div className="flex items-center gap-2 sm:justify-center">
              <div>From:</div>
              <Input
                required={true}
                type={'time'}
                value={timeFrom}
                className=" w-auto border p-0 sm:border-0 "
                onChange={(event) => setTimeFrom(event.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 sm:justify-center">
              <div>To:</div>
              <Input
                required={true}
                type={'time'}
                value={timeTo}
                className=" w-auto border p-0 sm:border-0 "
                onChange={(event) => setTimeTo(event.target.value)}
              />
            </div>
          </div>
        </div>
        <PopoverTrigger className="flex p-2 ">
          <div>
            <img src="/src/shared/assets/icons/calendar.svg" height={30} width={30} alt={'crd'} />
          </div>
        </PopoverTrigger>
        <PopoverContent className="z-[52] w-full">
          <Calendar mode="single" selected={date} onSelect={setDate} className="w-full" />
          <div className=" flex w-full content-center items-center justify-between gap-2 rounded-md border px-4">
            <div className="flex items-center justify-center gap-2">
              From:
              <Input
                required={true}
                type={'time'}
                value={timeFrom}
                className=" w-auto border-0 p-0 "
                onChange={(event) => setTimeFrom(event.target.value)}
              />
            </div>
            <div className="flex items-center justify-center gap-2">
              To:
              <Input
                required={true}
                type={'time'}
                value={timeTo}
                className=" w-auto border-0 p-0 "
                onChange={(event) => setTimeTo(event.target.value)}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateTimePicker;
