import React from 'react';
import { DogOwnerCardSkeleton } from '@/widgets/dog-owner/dog-owner-card/ui/DogOwnerCardSkeleton.tsx';
import { useGetDogOwner } from '@/shared/hooks';
import { UpdateDogOwnerForm } from '@/features/update-dog-owner/ui/UpdateDogOwnerForm.tsx';
import CreateDogOwnerForm from '@/features/create-dog-owner/ui/CreateDogOwnerForm.tsx';

type DogOwnerCardProps = {
  dogOwnerId?: string;
};

export const DogOwnerCard: React.FC<DogOwnerCardProps> = ({ dogOwnerId }) => {
  const { data: dogOwnerResponse, isLoading: isDogOwnerLoading } = useGetDogOwner({
    id: dogOwnerId!,
  });

  if (!dogOwnerResponse || isDogOwnerLoading) {
    return <DogOwnerCardSkeleton />;
  }

  const dogOwner = dogOwnerResponse.data;

  return (
    <div className={'flex flex-col justify-between gap-2 sm:flex-row'}>
      {dogOwnerResponse.data ? (
        <>
          <div className={'flex flex-col gap-1'}>
            <div className={'font-semibold'}>DogOwner Info</div>
            <div className={'flex gap-2'}>Address: {dogOwner.address}</div>
            <div className={'flex gap-2'}>District: {dogOwner.district}</div>
          </div>
          <UpdateDogOwnerForm dogOwnerId={dogOwnerId!} />
        </>
      ) : (
        <CreateDogOwnerForm />
      )}
    </div>
  );
};
