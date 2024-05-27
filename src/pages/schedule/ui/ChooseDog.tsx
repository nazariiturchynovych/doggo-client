import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger, ScrollArea, ScrollBar } from '@/shared/ui';
import { useGetDogOwnerDogs } from '@/shared/hooks';
import { useUserStore } from '@/entities/user';
import { getRandomIntInclusive } from '@/widgets/job-request/job-request-card/ui/JobRequestCard.tsx';
import { useQueryClient } from '@tanstack/react-query';

type ChooseDogProps = {
  setDogId: (id: string) => void;
};

export const ChooseDog: React.FC<ChooseDogProps> = ({ setDogId }) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const user = useUserStore((state) => state.user);

  const { data } = useGetDogOwnerDogs({ id: user.dogOwnerId! });

  if (!data || data.data.length == 0) {
    return <div>1</div>;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className={'flex items-center rounded-full p-1 px-2 hover:bg-gray-100'}>
          <img
            src="src/shared/assets/icons/dog-icon.svg"
            height={32}
            width={32}
            className={'rounded-full'}
            alt="dog"
          />
          <div>Choose dog</div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <ScrollArea className="h-80 w-full">
          {data.data.map((dog) => (
            <div
              className={'flex h-14 border-b p-2 last:border-b-0'}
              onClick={() => {
                queryClient.removeQueries({ queryKey: ['GetDogJobRequests'] });
                setDogId(dog.id);
              }}>
              <img
                className={'rounded-full'}
                height={40}
                width={40}
                src={`/src/shared/assets/images/dogmock${getRandomIntInclusive(1, 5)}.jpg`}
                alt=""
              />
              <div>{dog.name}</div>
            </div>
          ))}
          <ScrollBar />
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};
