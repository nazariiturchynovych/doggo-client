import { BaseResponse, BaseResponseWithData } from '@/shared/api/result';
import $api from '@/shared/lib/config/axios.ts';
import {
  CreateDogRequestProps,
  DeleteDogRequestProps,
  GetPageOfDogsRequestProps,
  GetDogRequestProps,
  UpdateDogRequestProps,
  GetDogOwnerDogsRequestProps,
} from '@/shared/api/dog-api/models/requests.ts';
import { Dog } from '@/entities/dog/model/models.ts';

export interface DogApiService {
  createDog: (props: CreateDogRequestProps) => Promise<BaseResponse>;
  getDog: (props: GetDogRequestProps) => Promise<BaseResponseWithData<Dog>>;
  getDogOwnerDogs: (props: GetDogOwnerDogsRequestProps) => Promise<BaseResponseWithData<Dog[]>>;
  getPageOfDogs: (props: GetPageOfDogsRequestProps) => Promise<BaseResponseWithData<Dog[]>>;
  updateDog: (props: UpdateDogRequestProps) => Promise<BaseResponse>;
  deleteDog: (props: DeleteDogRequestProps) => Promise<BaseResponse>;
}

export class DogApi implements DogApiService {
  async createDog(props: CreateDogRequestProps) {
    const query = '/Dog/dog';
    const { data } = await $api.post<BaseResponse>(query, props);
    return data;
  }

  async getDogOwnerDogs(props: GetDogOwnerDogsRequestProps) {
    const query = `/Dog/dog-owner/${props.id}/dogs`;

    const { data } = await $api.get<BaseResponseWithData<Dog[]>>(query);
    return data;
  }

  async getDog(props: GetDogRequestProps) {
    const query = `/Dog/dog${props.id ? `/${props.id}` : ''}`;
    const { data } = await $api.get<BaseResponseWithData<Dog>>(query);
    return data;
  }

  async getPageOfDogs(props: GetPageOfDogsRequestProps) {
    const query = `/Dog/dogs
    ?${props.nameSearchTerm ?? `nameSearchTerm=${props.nameSearchTerm}`}
    &${props.sortColumn ?? `sortColumn=${props.sortColumn}`}
    &${props.sortOrder ?? `sortOrder=${props.sortOrder}`}
    &pageCount=${props.pageCount}
    &page=${props.pageCount}`;

    const { data } = await $api.get<BaseResponseWithData<Dog[]>>(query);
    return data;
  }

  async updateDog(props: UpdateDogRequestProps) {
    const query = '/Dog/dog';
    const { data } = await $api.put<BaseResponse>(query, props);
    return data;
  }

  async deleteDog(props: DeleteDogRequestProps) {
    const query = `/Dog/dog/${props.id ?? ''}`;
    const { data } = await $api.delete<BaseResponse>(query);
    return data;
  }
}
