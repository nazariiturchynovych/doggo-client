import React from 'react';
import { Avatar, AvatarFallback, AvatarImage, ToastAction, useToast } from '@/shared/ui';
import { createAvatarFallback } from '@/shared/lib/utils.ts';
import { useGetUser } from '@/widgets/dog-owner/dog-owner-card/lib/hooks';
import { WalkerSkeleton } from '@/widgets/walker/walker-card/ui/WalkerSkeleton.tsx';
import { Walker } from '@/entities/walker/model/models.ts';

type WalkerCardProps = {
  walker?: Walker;
  isLoading: boolean;
};

export const WalkerCard: React.FC<WalkerCardProps> = ({ walker, isLoading }) => {
  const { data: userResponse, isPending } = useGetUser({ id: walker?.userId || '' });
  const { toast } = useToast();

  const user = userResponse?.data;

  if (isLoading || isPending) {
    return <WalkerSkeleton />;
  }

  if (!walker || !user) {
    toast({
      title: 'Cant find walker',
      description: 'there is no walker with this id',
      action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
    });
    return <WalkerSkeleton />;
  }

  return (
    <div className="flex flex-col justify-between bg-white p-4">
      <div className="mb-2 flex w-full gap-3">
        <Avatar>
          <AvatarImage
            src="/src/shared/assets/images/avatar.svg"
            alt="avatar"
            height={60}
            width={60}
          />
          <AvatarFallback>{createAvatarFallback(user.firstName, user.lastName)}</AvatarFallback>
        </Avatar>
        <div className="flex w-full justify-between">
          <div>
            <p>
              {user.firstName} {user.lastName}
            </p>
            <p>{user.email}</p>
            <p>Age: {user.age}</p>
            <p>{walker.about}</p>
            <p>{walker.skills}</p>
          </div>
          <div className="flex">
            <svg
              className="fill-amber-400"
              fill="evernode"
              width="18"
              height="18"
              viewBox="0 0 1920 1920"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1915.918 737.475c-10.955-33.543-42.014-56.131-77.364-56.131h-612.029l-189.063-582.1v-.112C1026.394 65.588 995.335 43 959.984 43c-35.237 0-66.41 22.588-77.365 56.245L693.443 681.344H81.415c-35.35 0-66.41 22.588-77.365 56.131-10.955 33.544.79 70.137 29.478 91.03l495.247 359.831-189.177 582.212c-10.955 33.657 1.13 70.25 29.817 90.918 14.23 10.278 30.946 15.487 47.66 15.487 16.716 0 33.432-5.21 47.775-15.6l495.134-359.718 495.021 359.718c28.574 20.781 67.087 20.781 95.662.113 28.687-20.668 40.658-57.261 29.703-91.03l-189.176-582.1 495.36-359.83c28.574-20.894 40.433-57.487 29.364-91.03"
                fillRule="evenodd"
              />
            </svg>
            4.97
          </div>
        </div>
      </div>
    </div>
  );
};
