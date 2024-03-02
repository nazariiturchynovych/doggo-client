import { create } from 'zustand';
import { BaseResponse, BaseResponseWithData } from '@/shared/api/result';
import { DogOwner } from './models';
import { Guid } from 'typescript-guid';
import { devtools } from 'zustand/middleware';
import { dogOwnerApi, CreateDogOwnerRequestProps, GetDogOwnerRequestProps } from '@/shared/api/dog-owner-api';

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
      setDogOwner: (dogOwner) =>
        set(() => {
          return { dogOwner: dogOwner };
        }),

      createDogOwner: async (reqProps: CreateDogOwnerRequestProps) => {
        let response = await dogOwnerApi.createDogOwner(reqProps);

        if (response.isSuccess) {
          const reqProps: GetDogOwnerRequestProps = {
            id: undefined,
          };
          const getResponse = await dogOwnerApi.getDogOwner(reqProps);
          set(() => ({
            dogOwner: getResponse.data,
          }));
          response = getResponse;
        }
        return response;
      },
      getCurrentDogOwner: async () => {
        const reqProps: GetDogOwnerRequestProps = {
          id: undefined,
        };
        const response = await dogOwnerApi.getDogOwner(reqProps);

        if (response.isSuccess) {
          set(() => ({
            dogOwner: response.data,
          }));
        }
        return response;
      },
    }),
  ))
;
