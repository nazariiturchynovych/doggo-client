import React from 'react';
import { User } from '@/entities/user';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui';
import { createAvatarFallback } from '@/shared/lib/utils.ts';

type UserCardProps = {
  user: User;
};

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="rounded-md p-4 shadow-md">
      <div className="flex min-w-60 flex-col justify-center gap-5 rounded-md border-2 border-primary p-3">
        <div className="flex items-center justify-center">
          <Avatar>
            <AvatarImage
              src="src/shared/assets/images/avatar.svg"
              alt="avatar"
              height={60}
              width={60}
            />
            <AvatarFallback>{createAvatarFallback(user.firstName, user.lastName)}</AvatarFallback>
          </Avatar>
        </div>
        <div>{user.email}</div>
        <div>
          {user.firstName} {user.lastName}
        </div>
        <div>Age: {user.age}</div>
      </div>
    </div>
  );
};
