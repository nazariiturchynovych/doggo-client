import { create } from 'zustand';
import { BaseResponseWithData } from '@/shared/api/result';
import { Walker } from './models';
import { GetWalkerRequestProps, walkerApi } from '@/shared/api/walker-api';
import { Guid } from 'typescript-guid';

type WalkerState = {
  walker: Walker;
  setWalker: (user: Walker) => void;
  getCurrentWalker: () => Promise<BaseResponseWithData<Walker>>
};

export const useWalkerStore = create<WalkerState>()((set) => ({
      walker: {
        id: Guid.EMPTY,
        userId: Guid.EMPTY,
        skills: '',
        about: '',

      },
      setWalker: (walker) =>
        set(() => {
          return { walker: walker };
        }),
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
    }),
  )
;
