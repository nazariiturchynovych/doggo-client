import React, { useState } from 'react';
import { Calendar, Input, Popover, PopoverContent, PopoverTrigger } from '@/shared/ui';

type DateTimePickerProps = {
  setValueFrom: (inputFrom: string) => void;
  setValueTo: (inputTo: string) => void;

};
export const DateTimePicker: React.FC<DateTimePickerProps> = ({setValueFrom, setValueTo}) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const now = new Date();

  //format dd.mm.yyyy, --:--
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const [timeFrom, setTimeFrom] = useState(currentTime);
  const [timeTo, setTimeTo] = useState(currentTime);

  const handleTimeChangeFrom: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setTimeFrom(event.target.value);

    const [hours, minutes] = event.target.value.split(':');

    const myDate = date || new Date();
    myDate.setHours(parseInt(hours, 10));
    myDate.setMinutes(parseInt(minutes, 10));

    setValueFrom(myDate.toISOString())
  };
  const handleTimeChangeTo: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setTimeTo(event.target.value);

    const [hours, minutes] = event.target.value.split(':');

    const myDate = date || new Date();
    myDate.setHours(parseInt(hours, 10));
    myDate.setMinutes(parseInt(minutes, 10));


    setValueTo(myDate.toISOString())
  };

  return (
    <div className='flex w-full justify-between items-center border rounded-md h-10 p-2'>
      <DateTimeDisplay date={date} timeFrom={timeFrom} timeTo={timeTo} />
      <div>
        <Popover>
          <PopoverTrigger className='flex'>
            <div>

                <img src='/src/shared/assets/icons/calendar.svg' height={30} width={30} alt={'crd'} />
            </div>
          </PopoverTrigger>
          <PopoverContent className='w-full'>
            <Calendar
              mode='single'
              selected={date}
              onSelect={setDate}
              className='w-full'
            />
            <div
              className=' flex items-center content-center w-full border rounded-md gap-2 justify-between px-4'>
              <div className='flex justify-center items-center'>
                From: <Input required={true} type={'time'} className=' w-auto border-0 p-0'
                             value={timeFrom}
                             onChange={handleTimeChangeFrom} />
              </div>
              <div className='flex justify-center items-center'>
                To: <Input required={true} type={'time'} className=' w-auto border-0 p-0'
                           value={timeTo}
                           onChange={handleTimeChangeTo} />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

interface DateTimeDisplayProps {
  date?: Date;
  timeFrom: string;
  timeTo: string;
}

const DateTimeDisplay: React.FC<DateTimeDisplayProps> = ({ date, timeFrom, timeTo }) => {
  const formattedDate = date ? `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}` : 'dd.mm.yyyy';
  const displayText = `${formattedDate},  ${timeFrom} - ${timeTo}`;

  return <div className='text-center'>{displayText}</div>;
};

export default DateTimePicker;