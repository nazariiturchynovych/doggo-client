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


export interface UserAPI {
  getUser: (props: GetUserRequestProps) => Promise<BaseResponse>;
  getPageOfUsers: (props: GetPageOfUsersRequestProps) => Promise<BaseResponse>;
  updateUser: (props: UpdateUserRequestProps) => Promise<BaseResponse>;
  changePassword: (props: ChangePasswordRequestProps) => Promise<BaseResponse>;
  deleteUser: (props: DeleteUserRequestProps) => Promise<BaseResponse>;
  addUserPersonalIdentifier: (props: AddUserPersonalIdentifierRequestProps) => Promise<BaseResponse>;
}

export class UserService implements UserAPI {

  async getUser(props: GetUserRequestProps) {
    const signInQuery = `/User/sign-up/?id=${props.id ?? ''}`;
    const { data } = await $api.get<BaseResponseWithData<SignInDto>>(signInQuery);
    return data;
  }

  async getPageOfUsers(props: GetPageOfUsersRequestProps) {
    const signInQuery = `/User/users
    ?${props.nameSearchTerm ?? `nameSearchTerm=${props.nameSearchTerm}`}
    &${props.sortColumn ?? `sortColumn=${props.sortColumn}`}
    &${props.sortOrder ?? `sortOrder=${props.sortOrder}`}
    &pageCount=${props.pageCount}
    &page=${props.pageCount}`;

    const { data } = await $api.get<BaseResponseWithData<SignInDto>>(signInQuery);
    return data;
  }

  async updateUser(props: UpdateUserRequestProps) {
    const signInQuery = '/User/user';
    const { data } = await $api.put<BaseResponseWithData<SignInDto>>(signInQuery, props);
    return data;
  }

  async changePassword(props: ChangePasswordRequestProps) {
    const signInQuery = 'User/password';
    const { data } = await $api.put<BaseResponseWithData<SignInDto>>(signInQuery, props);
    return data;
  }

  async deleteUser(props: DeleteUserRequestProps) {
    const signInQuery = `/User/users/${props.id ?? ''}`;
    const { data } = await $api.delete<BaseResponseWithData<SignInDto>>(signInQuery);
    return data;
  }

  async addUserPersonalIdentifier(props: AddUserPersonalIdentifierRequestProps) {
    const signInQuery = '/User/personal-identifier';
    const { data } = await $api.post<BaseResponseWithData<SignInDto>>(signInQuery, props);
    return data;
  }

}