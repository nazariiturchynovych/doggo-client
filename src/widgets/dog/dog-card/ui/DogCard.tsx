import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui';
import { createAvatarFallback } from '@/shared/lib/utils.ts';
import { Dog } from '@/entities/dog/model/models.ts';

type UserCardProps = {
  dog: Dog
}

export const DogCard: React.FC<UserCardProps> = ({ dog }) => {
  return (
    <div className='p-4 shadow-md rounded-md'>
      <div className='border-2 rounded-md flex flex-col justify-center min-w-60 gap-5 p-3 border-primary'>
        <div className='flex items-center justify-center'>
          <Avatar>
            <AvatarImage src='' alt='avatar' height={60} width={60} />
            <AvatarFallback>{createAvatarFallback(dog.name)}</AvatarFallback>
          </Avatar>
        </div>
        <div>{dog.name}</div>
        <div>Age: {dog.age}</div>
        <div>Weight: {dog.weight}</div>
        <div>{dog.description}</div>
      </div>
    </div>
  );
};
