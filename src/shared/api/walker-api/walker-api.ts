import { BaseResponse, BaseResponseWithData } from '@/shared/api/result';
import $api from '@/shared/lib/config/axios.ts';
import {
  CreateWalkerRequestProps,
  DeleteWalkerRequestProps,
  GetPageOfWalkersRequestProps,
  GetWalkerRequestProps,
  UpdateWalkerRequestProps,
} from '@/shared/api/walker-api/models/requests.ts';
import { Walker } from '@/entities/walker/model/models.ts';

export interface WalkerApiService {
  createWalker: (props: CreateWalkerRequestProps) => Promise<BaseResponse>;
  getWalker: (props: GetWalkerRequestProps) => Promise<BaseResponseWithData<Walker>>;
  getPageOfWalkers: (
    props: GetPageOfWalkersRequestProps,
  ) => Promise<BaseResponseWithData<Walker[]>>;
  updateWalker: (props: UpdateWalkerRequestProps) => Promise<BaseResponse>;
  deleteWalker: (props: DeleteWalkerRequestProps) => Promise<BaseResponse>;
}

export class WalkerApi implements WalkerApiService {
  async createWalker(props: CreateWalkerRequestProps) {
    const query = '/Walker/walker';
    const { data } = await $api.post<BaseResponseWithData<Walker>>(query, props);
    return data;
  }

  async getWalker(props: GetWalkerRequestProps) {
    const query = `/Walker/walker${props.id ? `/?id=${props.id}` : ''}`;
    const { data } = await $api.get<BaseResponseWithData<Walker>>(query);
    return data;
  }

  async getPageOfWalkers(props: GetPageOfWalkersRequestProps) {
    const query = `/Walker/walkers
    ?${props.nameSearchTerm ?? `nameSearchTerm=${props.nameSearchTerm}`}
    &${props.sortColumn ?? `sortColumn=${props.sortColumn}`}
    &${props.sortOrder ?? `sortOrder=${props.sortOrder}`}
    &pageCount=${props.pageCount}
    &page=${props.pageCount}`;

    const { data } = await $api.get<BaseResponseWithData<Walker[]>>(query);
    return data;
  }

  async updateWalker(props: UpdateWalkerRequestProps) {
    const query = '/Walker/walker';
    const { data } = await $api.put<BaseResponse>(query, props);
    return data;
  }

  async deleteWalker(props: DeleteWalkerRequestProps) {
    const query = `/Walker/walker/${props.id ?? ''}`;
    const { data } = await $api.delete<BaseResponse>(query);
    return data;
  }
}
