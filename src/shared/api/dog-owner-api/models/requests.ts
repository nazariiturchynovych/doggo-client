import { Guid } from 'typescript-guid';

export type CreateDogOwnerRequestProps = {
  address: string,
  district: string
}

export type GetDogOwnerRequestProps = {
  id?: Guid
};

export type GetPageOfDogOwnersRequestProps = {
  nameSearchTerm?: string,
  sortColumn?: string,
  sortOrder?: string,
  pageCount: number,
  page: number,
};

export type UpdateDogOwnerRequestProps = {
  id: Guid,
  address?: string,
  district?: string,
};

export type DeleteDogOwnerRequestProps = {
  id?: Guid
};

