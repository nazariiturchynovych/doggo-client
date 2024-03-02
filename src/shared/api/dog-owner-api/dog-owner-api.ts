import { BaseResponse, BaseResponseWithData } from '@/shared/api/result';
import $api from '@/shared/lib/config/axios.ts';
import {
  CreateDogOwnerRequestProps,
  DeleteDogOwnerRequestProps,
  GetPageOfDogOwnersRequestProps,
  GetDogOwnerRequestProps,
  UpdateDogOwnerRequestProps,
} from '@/shared/api/dog-owner-api/models/requests.ts';
import { DogOwner } from '@/entities/dogOwner/model/models.ts';


export interface DogOwnerApiService {
  createDogOwner: (props: CreateDogOwnerRequestProps) => Promise<BaseResponse>;
  getDogOwner: (props: GetDogOwnerRequestProps) => Promise<BaseResponseWithData<DogOwner>>;
  getPageOfDogOwners: (props: GetPageOfDogOwnersRequestProps) => Promise<BaseResponseWithData<DogOwner[]>>;
  updateDogOwner: (props: UpdateDogOwnerRequestProps) => Promise<BaseResponse>;
  deleteDogOwner: (props: DeleteDogOwnerRequestProps) => Promise<BaseResponse>;
}

export class DogOwnerApi implements DogOwnerApiService {
  async createDogOwner(props: CreateDogOwnerRequestProps) {
    const query = '/DogOwner/dog-owner';
    const { data } = await $api.post<BaseResponse>(query, props);
    return data;
  }


  async getDogOwner(props: GetDogOwnerRequestProps) {
    const query = `/DogOwner/dog-owner${props.id ? `/?id=${props.id}` : ''}`;
    const { data } = await $api.get<BaseResponseWithData<DogOwner>>(query);
    return data;
  }

  async getPageOfDogOwners(props: GetPageOfDogOwnersRequestProps) {
    const query = `/DogOwner/dog-owners
    ?${props.nameSearchTerm ?? `nameSearchTerm=${props.nameSearchTerm}`}
    &${props.sortColumn ?? `sortColumn=${props.sortColumn}`}
    &${props.sortOrder ?? `sortOrder=${props.sortOrder}`}
    &pageCount=${props.pageCount}
    &page=${props.pageCount}`;

    const { data } = await $api.get<BaseResponseWithData<DogOwner[]>>(query);
    return data;
  }

  async updateDogOwner(props: UpdateDogOwnerRequestProps) {
    const query = '/DogOwner/dog-owner';
    const { data } = await $api.put<BaseResponse>(query, props);
    return data;
  }

  async deleteDogOwner(props: DeleteDogOwnerRequestProps) {
    const query = `/DogOwner/dog-owner/${props.id ?? ''}`;
    const { data } = await $api.delete<BaseResponse>(query);
    return data;
  }

}