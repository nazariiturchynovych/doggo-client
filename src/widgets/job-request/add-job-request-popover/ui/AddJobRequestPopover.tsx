import React from 'react';
import JobRequestForm from '@/features/create-job-request/ui/JobRequestForm.tsx';
import { SimpleFormSheet } from '@/shared/ui/sheet.tsx';

type AddJobRequestButtonProps = {
  disabled?: boolean;
  buttonText: string;
  className?: string;
};

export const AddJobRequestPopover: React.FC<AddJobRequestButtonProps> = () => {
  return (
    <SimpleFormSheet
      triggerText={'Add job request'}
      tittle={'please add job request'}
      description={''}>
      <JobRequestForm />
    </SimpleFormSheet>
  );
};
