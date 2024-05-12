import React from 'react';
import { Dog } from '@/entities/dog/model/models.ts';

type UserCardProps = {
  dog: Dog;
};

export const DogCard: React.FC<UserCardProps> = ({ dog }) => {
  return (
    <div className="flex w-full min-w-56 max-w-80 flex-col items-center justify-center gap-5 rounded-md border bg-white p-4">
      <img
        className="max-h-32 w-full max-w-screen-md"
        src="/src/shared/assets/images/dogmock5.jpg"
        alt="dog"
      />
      <div className="flex w-full justify-between ">
        <div className="font-bold">{dog.name}</div>
        <div className="flex items-center justify-end gap-2">
          15
          <svg
            className="fill-black"
            width="18px"
            height="18px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
