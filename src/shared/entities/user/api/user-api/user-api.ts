import { BaseResult, BaseResultWithData } from '@/shared/api/result';
import { SignInDto } from '@/shared/api/auth-api/models/dtos.ts';
import $api from '@/shared/lib/config/axios.ts';
import {
  AddUserPersonalIdentifierRequestProps,
  ChangePasswordRequestProps, DeleteUserRequestProps,
  GetPageOfUsersRequestProps,
  GetUserRequestProps,
  UpdateUserRequestProps,
} from '@/shared/entities/user/api/user-api/models/requests.ts';


export interface UserAPI {
  getUser: (props: GetUserRequestProps) => Promise<BaseResult>;
  getPageOfUsers: (props: GetPageOfUsersRequestProps) => Promise<BaseResult>;
  updateUser: (props: UpdateUserRequestProps) => Promise<BaseResult>;
  changePassword: (props: ChangePasswordRequestProps) => Promise<BaseResult>;
  deleteUser: (props: DeleteUserRequestProps) => Promise<BaseResult>;
  addUserPersonalIdentifier: (props: AddUserPersonalIdentifierRequestProps) => Promise<BaseResult>;
}

export class UserService implements UserAPI {

  async getUser(props: GetUserRequestProps) {
    const signInQuery = `/User/sign-up/?id=${props.id ?? ''}`;
    const { data } = await $api.get<BaseResultWithData<SignInDto>>(signInQuery);
    return data;
  }

  async getPageOfUsers(props: GetPageOfUsersRequestProps) {
    const signInQuery = `/User/users
    ?${props.nameSearchTerm ?? `nameSearchTerm=${props.nameSearchTerm}`}
    &${props.sortColumn ?? `sortColumn=${props.sortColumn}`}
    &${props.sortOrder ?? `sortOrder=${props.sortOrder}`}
    &pageCount=${props.pageCount}
    &page=${props.pageCount}`;

    const { data } = await $api.get<BaseResultWithData<SignInDto>>(signInQuery);
    return data;
  }

  async updateUser(props: UpdateUserRequestProps) {
    const signInQuery = '/User/user';
    const { data } = await $api.put<BaseResultWithData<SignInDto>>(signInQuery, props);
    return data;
  }

  async changePassword(props: ChangePasswordRequestProps) {
    const signInQuery = 'User/password';
    const { data } = await $api.put<BaseResultWithData<SignInDto>>(signInQuery, props);
    return data;
  }

  async deleteUser(props: DeleteUserRequestProps) {
    const signInQuery = `/User/users/${props.id ?? ''}`;
    const { data } = await $api.delete<BaseResultWithData<SignInDto>>(signInQuery);
    return data;
  }

  async addUserPersonalIdentifier(props: AddUserPersonalIdentifierRequestProps) {
    const signInQuery = '/User/personal-identifier';
    const { data } = await $api.post<BaseResultWithData<SignInDto>>(signInQuery, props);
    return data;
  }

}