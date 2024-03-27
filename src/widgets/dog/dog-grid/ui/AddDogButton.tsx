import React from 'react';
import { Button, Dialog, DialogContent, DialogTrigger } from '@/shared/ui';
import DogForm from '@/features/create-dog/ui/CreateDogForm.tsx';

export const AddDogButton: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild className="absolute right-3 top-3 z-20 bg-primary">
        <Button type="button" className="rounded-full">
          +
        </Button>
      </DialogTrigger>
      <DialogContent className="z-[100] sm:max-w-[500px]">
        <DogForm />
      </DialogContent>
    </Dialog>
  );
};
