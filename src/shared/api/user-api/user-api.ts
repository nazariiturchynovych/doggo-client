import { BaseResponse, BaseResponseWithData } from '@/shared/api/result';
import { SignInDto } from '@/shared/api/auth-api/models/dtos.ts';
import $api from '@/shared/lib/config/axios.ts';
import {
  AddUserPersonalIdentifierRequestProps,
  ChangePasswordRequestProps, DeleteUserRequestProps,
  GetPageOfUsersRequestProps,
  GetUserRequestProps,
  UpdateUserRequestProps,
} from '@/shared/api/user-api/models/requests.ts';
import { UserDto } from '@/shared/api/user-api/models/dtos.ts';


export interface UserApiService {
  getUser: (props: GetUserRequestProps) => Promise<BaseResponse>;
  getPageOfUsers: (props: GetPageOfUsersRequestProps) => Promise<BaseResponse>;
  updateUser: (props: UpdateUserRequestProps) => Promise<BaseResponse>;
  changePassword: (props: ChangePasswordRequestProps) => Promise<BaseResponse>;
  deleteUser: (props: DeleteUserRequestProps) => Promise<BaseResponse>;
  addUserPersonalIdentifier: (props: AddUserPersonalIdentifierRequestProps) => Promise<BaseResponse>;
}

export class UserApi implements UserApiService  {

  async getUser(props: GetUserRequestProps) {
    const query = `/User/user${props.id ? `/?id=${props.id}` : ''}`;
    const { data } = await $api.get<BaseResponseWithData<UserDto>>(query);
    return data;
  }

  async getPageOfUsers(props: GetPageOfUsersRequestProps) {
    const query = `/User/users
    ?${props.nameSearchTerm ?? `nameSearchTerm=${props.nameSearchTerm}`}
    &${props.sortColumn ?? `sortColumn=${props.sortColumn}`}
    &${props.sortOrder ?? `sortOrder=${props.sortOrder}`}
    &pageCount=${props.pageCount}
    &page=${props.pageCount}`;

    const { data } = await $api.get<BaseResponseWithData<SignInDto>>(query);
    return data;
  }

  async updateUser(props: UpdateUserRequestProps) {
    const query = '/User/user';
    const { data } = await $api.put<BaseResponseWithData<SignInDto>>(query, props);
    return data;
  }

  async changePassword(props: ChangePasswordRequestProps) {
    const query = 'User/password';
    const { data } = await $api.put<BaseResponseWithData<SignInDto>>(query, props);
    return data;
  }

  async deleteUser(props: DeleteUserRequestProps) {
    const query = `/User/user/${props.id ?? ''}`;
    const { data } = await $api.delete<BaseResponseWithData<SignInDto>>(query);
    return data;
  }

  async addUserPersonalIdentifier(props: AddUserPersonalIdentifierRequestProps) {
    const query = '/User/personal-identifier';
    const { data } = await $api.post<BaseResponseWithData<SignInDto>>(query, props);
    return data;
  }

}