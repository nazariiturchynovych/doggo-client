import { Guid } from 'typescript-guid';

export type CreateJobRequestProps = {
  jobRequestId: string;
  comment: string;
};

export type GetJobRequestProps = {
  id?: Guid;
};

export type GetDogOwnerJobsRequestProps = {
  id: Guid;
};

export type GetPageOfJobsRequestProps = {
  nameSearchTerm?: string;
  sortColumn?: string;
  sortOrder?: string;
  pageCount: number;
  page: number;
};

export type UpdateJobRequestProps = {
  id: Guid;
  name?: string;
  age?: string;
  weight?: number;
  description?: string;
};

export type DeleteJobRequestProps = {
  id?: Guid;
};
