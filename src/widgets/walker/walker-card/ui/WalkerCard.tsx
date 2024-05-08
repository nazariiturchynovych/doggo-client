import React from 'react';
import { WalkerSkeleton } from '@/widgets/walker/walker-card/ui/WalkerSkeleton.tsx';
import { useGetWalker } from '@/shared/hooks';
import { UpdateWalkerForm } from '@/features/update-walker/ui/UpdateWalkerForm.tsx';
import CreateWalkerForm from '@/features/create-walker/ui/CreateWalkerForm.tsx';

type WalkerCardProps = {
  walkerId?: string;
};

export const WalkerCard: React.FC<WalkerCardProps> = ({ walkerId }) => {
  const { data: walkerResponse, isPending: isWalkerLoading } = useGetWalker({ id: walkerId! });

  if (isWalkerLoading || !walkerResponse) {
    return <WalkerSkeleton />;
  }

  const walker = walkerResponse.data;

  return (
    <div className={'flex min-h-20 flex-col justify-between gap-2 sm:flex-row'}>
      {walkerResponse.data ? (
        <>
          <div className={'flex w-full flex-col gap-1'}>
            <div className={'font-semibold'}>Walker Info</div>
            <div className={'flex gap-2'}>Skills: {walker.skills}</div>
            <div className={'flex gap-2'}>About: {walker.about}</div>
          </div>
          <UpdateWalkerForm walkerId={walkerId!} />
        </>
      ) : (
        <CreateWalkerForm />
      )}
    </div>
  );
};
