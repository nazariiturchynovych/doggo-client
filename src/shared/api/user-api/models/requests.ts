import { Guid } from 'typescript-guid';

export type GetUserRequestProps = {
  id: string;
};

export type GetPageOfUsersRequestProps = {
  nameSearchTerm?: string;
  sortColumn?: string;
  sortOrder?: string;
  pageCount: number;
  page: number;
};

export type UpdateUserRequestProps = {
  firstName?: string;
  lastName?: string;
  age?: number;
  phoneNumber?: string;
};

export type ChangePasswordRequestProps = {
  currentPassword: string;
  newPassword: string;
};

export type DeleteUserRequestProps = {
  id?: Guid;
};

export type AddUserPersonalIdentifierRequestProps = {
  credential: number;
};
