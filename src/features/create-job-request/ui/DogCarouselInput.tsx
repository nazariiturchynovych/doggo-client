import { Dog } from '@/entities/dog/model/models.ts';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/ui/carousel.tsx';
import { Avatar, AvatarFallback, AvatarImage, Button } from '@/shared/ui';
import { createAvatarFallback } from '@/shared/lib/utils.ts';
import { useState } from 'react';

type DogListProps = {
  dogs: Dog[];
  onSelect: (dogId: string) => void;
};
export const DogCarouselInput: React.FC<DogListProps> = ({ dogs, onSelect }) => {
  const [selectedId, setSelectedId] = useState('');

  return (
    <Carousel className='w-full max-w-xs max-h-[300px]'>
      <CarouselContent className={'h-full'}>
        {dogs.map((dog) => (
          <CarouselItem key={dog.id.toString()} className='h-full'>
            <div className='p-4 shadow-md rounded-md h-full'>
              <div
                className='border-2 rounded-md flex flex-col justify-center items-center min-w-60 gap-5 p-3 border-primary h-full relative'>
                <div className='flex items-center justify-center'>
                  {selectedId === dog.id.toString() &&
                    <div className='absolute top-2 right-2 fill-green-600 flex h-7 w-7 '>
                      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024'
                           fill='' className='icon' version='1.1'>
                        <path
                          d='M439.2 680c9.6 8.8 25.6 8.8 35.2-0.8l300-309.6C784 360 784 344 773.6 334.4c-9.6-9.6-25.6-9.6-35.2 0.8L438.4 644.8l35.2-0.8-182.4-167.2c-10.4-9.6-25.6-8.8-35.2 1.6-9.6 10.4-8.8 25.6 1.6 35.2L439.2 680z'
                          fill='' />
                        <path
                          d='M515.2 1007.2c-276 0-500-224-500-500S239.2 7.2 515.2 7.2s500 224 500 500-224 500-500 500z m0-952C265.6 55.2 63.2 257.6 63.2 507.2s202.4 452 452 452 452-202.4 452-452S764.8 55.2 515.2 55.2z'
                          fill='' />
                      </svg>
                    </div>}
                  <Avatar>
                    <AvatarImage src='' alt='avatar' height={60} width={60} />
                    <AvatarFallback>{createAvatarFallback(dog.name)}</AvatarFallback>
                  </Avatar>
                </div>
                <div>{dog.name}</div>
                <Button type='button' onClick={() => {
                  onSelect(dog.id.toString());
                  setSelectedId(dog.id.toString());
                }}>Select</Button>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious type={'button'} />
      <CarouselNext type={'button'} />
    </Carousel>
  );
};