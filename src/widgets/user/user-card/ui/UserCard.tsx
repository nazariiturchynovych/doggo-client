import React from 'react';
import { User } from '@/entities/user';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui';
import { createAvatarFallback } from '@/widgets/user/user-card/lib';

type UserCardProps = {
  user: User
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className='p-4 shadow-md rounded-md'>
      <div className='border-2 rounded-md flex flex-col justify-center min-w-60 gap-5 p-3 border-primary'>
        <div className='flex items-center justify-center'>
          <Avatar>
            <AvatarImage src='' alt='avatar' height={60} width={60} />
            <AvatarFallback>{createAvatarFallback(user.firstName, user.lastName)}</AvatarFallback>
          </Avatar>
        </div>
        <div>{user.email}</div>
        <div>{user.firstName} {user.lastName}</div>
        <div>Age: {user.age}</div>
      </div>
    </div>

  );
};
