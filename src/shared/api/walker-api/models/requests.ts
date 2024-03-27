export type CreateWalkerRequestProps = {
  skills: string;
  about: string;
};

export type GetWalkerRequestProps = {
  id?: string;
};

export type GetPageOfWalkersRequestProps = {
  nameSearchTerm?: string;
  sortColumn?: string;
  sortOrder?: string;
  pageCount: number;
  page: number;
};

export type UpdateWalkerRequestProps = {
  id: string;
  skills?: string;
  about?: string;
};

export type DeleteWalkerRequestProps = {
  id?: string;
};
