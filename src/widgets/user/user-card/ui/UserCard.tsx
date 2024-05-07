import React from 'react';
import { User } from '@/entities/user';
import { Avatar, AvatarFallback, AvatarImage, Button } from '@/shared/ui';
import { createAvatarFallback } from '@/shared/lib/utils.ts';

type UserCardProps = {
  user: User;
};

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className={'flex w-full flex-col gap-2 p-2 sm:flex-row md:w-2/5'}>
      <div className={'flex w-full gap-2'}>
        <Avatar>
          <AvatarImage src="src/shared/assets/images/userImg.png" alt="avatar" height={60} />
          <AvatarFallback>{createAvatarFallback(user.firstName, user.lastName)}</AvatarFallback>
        </Avatar>
        <div className={'flex-col'}>
          <div className={'font-semibold'}>
            {user.firstName} {user.lastName}
          </div>
          <div className={'text-xs text-gray-400'}>{user.email}</div>
          <div className={'text-xs'}>{user.age} years old</div>
        </div>
      </div>
      <Button>Edit</Button>
    </div>
  );
};
