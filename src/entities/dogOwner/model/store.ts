import { create } from 'zustand';
import { BaseResponse, BaseResponseWithData } from '@/shared/api/result';
import { DogOwner } from './models';
import { CreateDogOwnerRequestProps, GetDogOwnerRequestProps, walkerApi } from '@/shared/api/walker-api';
import { Guid } from 'typescript-guid';
import { devtools } from 'zustand/middleware';

type DogOwnerState = {
  dogOwner: DogOwner;
  setDogOwner: (user: DogOwner) => void;
  getCurrentDogOwner: () => Promise<BaseResponseWithData<DogOwner>>
  createDogOwner: (reqProps: CreateDogOwnerRequestProps) => Promise<BaseResponse>
};

export const useDogOwnerStore = create<DogOwnerState>()(devtools((set) => ({
      dogOwner: {
        id: Guid.EMPTY,
        userId: Guid.EMPTY,
        address: '',
        district: '',
        dogIds: [],
        jobRequestIds: [],
        jobIds: []
      },
      setDogOwner: (walker) =>
        set(() => {
          return { walker: walker };
        }),

      createDogOwner: async (reqProps: CreateDogOwnerRequestProps) => {
        let response = await walkerApi.createDogOwner(reqProps);

        if (response.isSuccess) {
          const reqProps: GetDogOwnerRequestProps = {
            id: undefined,
          };
          const getResponse = await walkerApi.getDogOwner(reqProps);
          set(() => ({
            walker: getResponse.data,
          }));
          response = getResponse;
        }
        return response;
      },
      getCurrentDogOwner: async () => {
        const reqProps: GetDogOwnerRequestProps = {
          id: undefined,
        };
        const response = await walkerApi.getDogOwner(reqProps);

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
