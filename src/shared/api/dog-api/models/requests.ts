import { Guid } from 'typescript-guid';

export type CreateDogRequestProps = {
  name: string;
  age: number;
  weight: number;
  description: string;
  dogOwnerId: string;
};

export type GetDogRequestProps = {
  id: string;
};

export type GetDogOwnerDogsRequestProps = {
  id: string;
};

export type GetPageOfDogsRequestProps = {
  nameSearchTerm?: string;
  sortColumn?: string;
  sortOrder?: string;
  pageCount: number;
  page: number;
};

export type UpdateDogRequestProps = {
  id: Guid;
  name?: string;
  age?: string;
  weight?: number;
  description?: string;
};

export type DeleteDogRequestProps = {
  id?: string;
};
