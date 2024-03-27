import React from 'react';
import { Dog } from '@/entities/dog/model/models.ts';
import { DogCard } from '@/widgets/dog/dog-card';
import { DogCardSkeleton } from '@/widgets/dog/dog-card-skeleton/DogCardSkeleton.tsx';
import { AddDogButton } from '@/widgets/dog/dog-grid/ui/AddDogButton.tsx';

type DogGridProps = {
  dogs: Dog[];
  isLoading: boolean;
};

export const DogGrid: React.FC<DogGridProps> = ({ dogs, isLoading }) => {
  return (
    <div className="relative min-h-60 flex-col rounded border shadow-md">
      <div className=" p-2 text-center text-lg font-bold">Dogs</div>
      {isLoading && <DogCardSkeleton />}
      {dogs.length > 0 ? (
        <div className="grid w-full grid-cols-3 gap-5 bg-white p-5 ">
          {dogs.map((dog) => (
            <DogCard key={dog.id.toString()} id={dog.id} />
          ))}
        </div>
      ) : (
        <div className="p-5 text-center text-lg text-slate-500">
          If you dont have dogs, please click '+' to add dog
        </div>
      )}
      <AddDogButton />
    </div>
  );
};
