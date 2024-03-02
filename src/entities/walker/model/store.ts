import { create } from 'zustand';
import { BaseResponse, BaseResponseWithData } from '@/shared/api/result';
import { Walker } from './models';
import { CreateWalkerRequestProps, GetWalkerRequestProps, walkerApi } from '@/shared/api/walker-api';
import { Guid } from 'typescript-guid';
import { devtools } from 'zustand/middleware';

type WalkerState = {
  walker: Walker;
  setWalker: (user: Walker) => void;
  getCurrentWalker: () => Promise<BaseResponseWithData<Walker>>
  createWalker: (reqProps: CreateWalkerRequestProps) => Promise<BaseResponse>
};

export const useWalkerStore = create<WalkerState>()(devtools((set) => ({
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

      createWalker: async (reqProps: CreateWalkerRequestProps) => {
        let response = await walkerApi.createWalker(reqProps);

        if (response.isSuccess) {
          const reqProps: GetWalkerRequestProps = {
            id: undefined,
          };
          const getResponse = await walkerApi.getWalker(reqProps);
          set(() => ({
            walker: getResponse.data,
          }));
          response = getResponse;
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
    }),
  ))
;
