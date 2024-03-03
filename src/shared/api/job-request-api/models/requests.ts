import { Guid } from 'typescript-guid';

export type CreateJobRequestRequestProps = {
  dogId: string,
  requiredAge: number,
  isPersonalIdentifierRequired: boolean,
  description: string,
  paymentTo: number,
  requiredScheduleResponse: {
    from: string,
    to: string,
  }
}


export type GetJobRequestRequestProps = {
  id?: Guid
};

export type GetDogOwnerJobRequestsRequestProps = {
  id: Guid
};

export type GetPageOfJobRequestsRequestProps = {
  nameSearchTerm?: string,
  sortColumn?: string,
  sortOrder?: string,
  pageCount: number,
  page: number,
};

export type UpdateJobRequestRequestProps = {
  id: Guid,
  name?: string,
  age?: string,
  weight?: number,
  description?: string,
};

export type DeleteJobRequestRequestProps = {
  id?: Guid
};

