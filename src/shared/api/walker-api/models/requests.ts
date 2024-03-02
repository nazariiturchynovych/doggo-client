import { Guid } from 'typescript-guid';

export type CreateWalkerRequestProps = {
  skills: string,
  about: string
}

export type GetWalkerRequestProps = {
  id?: Guid
};

export type GetPageOfWalkersRequestProps = {
  nameSearchTerm?: string,
  sortColumn?: string,
  sortOrder?: string,
  pageCount: number,
  page: number,
};

export type UpdateWalkerRequestProps = {
  id: Guid,
  skills?: string,
  about?: string,
};

export type DeleteWalkerRequestProps = {
  id?: Guid
};

