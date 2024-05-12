import React from 'react';
import { DogCard } from '@/widgets/dog/dog-card';
import { DogCardSkeleton } from '@/widgets/dog/dog-card/ui/DogCardSkeleton.tsx';
import { useGetDogOwnerDogs } from '@/shared/hooks';
import { ScrollArea, ScrollBar } from '@/shared/ui';
import { AddDogButton } from '@/widgets/dog/dog-grid/ui/AddDogButton.tsx';

type DogGridProps = {
  dogOwnerId: string;
};

export const DogGrid: React.FC<DogGridProps> = ({ dogOwnerId }) => {
  const { data: dogsResponse, isLoading } = useGetDogOwnerDogs({ id: dogOwnerId });

  return (
    <div className={'relative p-2 sm:px-5'}>
      <h4 className="p-2 pb-6 text-center text-xl font-bold">Dogs</h4>
      <ScrollArea className="w-full lg:h-72">
        <div className="w-maw flex gap-5 pb-3 lg:grid lg:grid-cols-3 xl:grid-cols-4">
          {isLoading &&
            Array.from({ length: 7 }, (_, index) => ({ id: index })).map((item) => (
              <DogCardSkeleton key={item.id} />
            ))}
          {dogsResponse && dogsResponse.data && dogsResponse.data.length > 0 ? (
            dogsResponse.data.map((dog) => <DogCard key={dog.id.toString()} dog={dog} />)
          ) : (
            <div className="p-5 text-center text-lg text-slate-500">
              If you dont have dogs, please click '+' to add dog
            </div>
          )}
        </div>
        <ScrollBar className={'mt-2 lg:hidden'} orientation="horizontal" />
      </ScrollArea>
      <AddDogButton />
    </div>
  );
}; //TODO change dog card because for all dogs is another call to api
