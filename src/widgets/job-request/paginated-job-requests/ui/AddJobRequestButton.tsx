import React from 'react';
import { Button, Dialog, DialogContent, DialogTrigger } from '@/shared/ui';
import JobRequestForm from '@/features/create-job-request/ui/JobRequestForm.tsx';

type AddJobRequestButtonProps = {
  disabled?: boolean;
};

export const AddJobRequestButton: React.FC<AddJobRequestButtonProps> = ({ disabled }) => {
  return (
    <Dialog>
      <DialogTrigger asChild className="absolute right-2 top-3 z-20 bg-primary">
        <Button disabled={disabled} type="button" className="rounded-full">
          +
        </Button>
      </DialogTrigger>
      <DialogContent className="z-[51]">
        <JobRequestForm />
      </DialogContent>
    </Dialog>
  );
};
