export type CreateDogOwnerRequestProps = {
  address: string;
  district: string;
};

export type GetDogOwnerRequestProps = {
  id: string;
};

export type GetPageOfDogOwnersRequestProps = {
  nameSearchTerm?: string;
  sortColumn?: string;
  sortOrder?: string;
  pageCount: number;
  page: number;
};

export type UpdateDogOwnerRequestProps = {
  id: string;
  address?: string;
  district?: string;
};

export type DeleteDogOwnerRequestProps = {
  id?: string;
};
