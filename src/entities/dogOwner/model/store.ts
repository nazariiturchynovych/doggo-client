import { create } from 'zustand';
import { BaseResponseWithData } from '@/shared/api/result';
import { DogOwner } from './models';
import { devtools } from 'zustand/middleware';
import { CreateDogOwnerRequestProps, dogOwnerApi } from '@/shared/api/dog-owner-api';

type DogOwnerState = {
  dogOwner: DogOwner;
  setDogOwner: (user: DogOwner) => void;
  getCurrentDogOwner: () => Promise<BaseResponseWithData<DogOwner>>;
  createDogOwner: (reqProps: CreateDogOwnerRequestProps) => Promise<BaseResponseWithData<DogOwner>>;
};

export const useDogOwnerStore = create<DogOwnerState>()(
  devtools((set) => ({
    dogOwner: {
      id: '',
      userId: '',
      address: '',
      district: '',
    },

    setDogOwner: (dogOwner) => set(() => ({ dogOwner: dogOwner })),

    createDogOwner: async (reqProps: CreateDogOwnerRequestProps) => {
      const response = await dogOwnerApi.createDogOwner(reqProps);

      if (response.isSuccess) {
        set(() => ({
          dogOwner: response.data,
        }));
      }
      return response;
    },
    getCurrentDogOwner: async () => {
      const response = await dogOwnerApi.getDogOwner();

      if (response.isSuccess) {
        set(() => ({
          dogOwner: response.data,
        }));
      }
      return response;
    },
  })),
);
