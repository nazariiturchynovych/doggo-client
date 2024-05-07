import React from 'react';
import { Loader } from '@/shared/ui';
import { useGetUser } from '@/widgets/dog-owner/dog-owner-card/lib/hooks';
import { DividerHorizontal } from '@/shared/ui/divider-horizontal.tsx';
import { DividerVertical } from '@/shared/ui/divider-vertical.tsx';
import { UserCard } from '@/widgets';
import { WalkerCard } from '@/widgets/walker/walker-card/ui/WalkerCard.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { DogOwnerCard } from '@/widgets/dog-owner/dog-owner-card/ui/DogOnwnerCard.tsx';

export const UserProfile: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  if (!id) {
    navigate('/');
  }

  const { data: userResponse } = useGetUser({ id: id! });

  if (!userResponse) {
    return <Loader />;
  }
  const user = userResponse.data;

  return (
    <div className={'flex h-screen p-5'}>
      <div className={'flex w-full flex-col gap-5 rounded-md border bg-white p-5'}>
        <div className={'flex flex-col gap-4 md:flex-row'}>
          <UserCard user={user} />
          <DividerHorizontal className={'md:hidden'} />
          <DividerVertical className={'hidden md:block'} />
          <div className={'flex w-full flex-col gap-5 p-2 '}>
            {user.walkerId ? <WalkerCard walkerId={user.walkerId} /> : <Loader />}
            <DividerHorizontal />
            {user.dogOwnerId ? <DogOwnerCard dogOwnerId={user.dogOwnerId} /> : <Loader />}
          </div>
        </div>
        <DividerHorizontal />
        <div className={'flex'}>a</div>
      </div>
    </div>
  );
};
