import { Guid } from 'typescript-guid';

export type CreateDogRequestProps = {
  name: string,
  age: number,
  weight: number,
  description: string,
  dogOwnerId: string
}

export type GetDogRequestProps = {
  id?: Guid
};

export type GetDogOwnerDogsRequestProps = {
  id: Guid
};

export type GetPageOfDogsRequestProps = {
  nameSearchTerm?: string,
  sortColumn?: string,
  sortOrder?: string,
  pageCount: number,
  page: number,
};

export type UpdateDogRequestProps = {
  id: Guid,
  name?: string,
  age?: string,
  weight?: number,
  description?: string,
};

export type DeleteDogRequestProps = {
  id?: Guid
};

