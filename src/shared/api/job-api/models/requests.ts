export type CreateJobRequestProps = {
  jobRequestId: string;
  comment: string;
};

export type GetJobRequestProps = {
  id?: string;
};

export type GetDogOwnerJobsRequestProps = {
  id: string;
};

export type GetPageOfJobsRequestProps = {
  nameSearchTerm?: string;
  sortColumn?: string;
  sortOrder?: string;
  pageCount: number;
  page: number;
};

export type UpdateJobRequestProps = {
  id: string;
  name?: string;
  age?: string;
  weight?: number;
  description?: string;
};

export type DeleteJobRequestProps = {
  id?: string;
};
