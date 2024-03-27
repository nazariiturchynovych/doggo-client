import { create } from 'zustand';
import { BaseResponseWithData } from '@/shared/api/result';
import { Walker } from './models';
import {
  CreateWalkerRequestProps,
  GetWalkerRequestProps,
  walkerApi,
} from '@/shared/api/walker-api';
import { devtools } from 'zustand/middleware';

type WalkerState = {
  walker: Walker;
  setWalker: (user: Walker) => void;
  getCurrentWalker: () => Promise<BaseResponseWithData<Walker>>;
  createWalker: (reqProps: CreateWalkerRequestProps) => Promise<BaseResponseWithData<Walker>>;
};

export const useWalkerStore = create<WalkerState>()(
  devtools((set) => ({
    walker: {
      id: '',
      userId: '',
      skills: '',
      about: '',
    },
    setWalker: (walker) =>
      set(() => {
        return { walker: walker };
      }),

    createWalker: async (reqProps: CreateWalkerRequestProps) => {
      const response = await walkerApi.createWalker(reqProps);

      if (response.isSuccess) {
        set(() => ({
          walker: response.data,
        }));
      }

      return response;
    },
    getCurrentWalker: async () => {
      const reqProps: GetWalkerRequestProps = {
        id: undefined,
      };
      const response = await walkerApi.getWalker(reqProps);

      if (response.isSuccess) {
        set(() => ({
          walker: response.data,
        }));
      }
      return response;
    },
  })),
);
