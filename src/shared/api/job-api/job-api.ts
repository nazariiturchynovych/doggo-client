import { BaseResponse, BaseResponseWithData } from '@/shared/api/result';
import $api from '@/shared/lib/config/axios.ts';
import {
  CreateJobRequestProps,
  DeleteJobRequestProps,
  GetPageOfJobsRequestProps,
  GetJobRequestProps,
  UpdateJobRequestProps, GetDogOwnerJobsRequestProps,
} from '@/shared/api/job-api/models/requests.ts';
import { Job } from '@/entities/job/model/models.ts';


export interface JobApiService {
  createJob: (props: CreateJobRequestProps) => Promise<BaseResponse>;
  getJob: (props: GetJobRequestProps) => Promise<BaseResponseWithData<Job>>;
  getPageOfJobs: (props: GetPageOfJobsRequestProps) => Promise<BaseResponseWithData<Job[]>>;
  getDogOwnerJobs: (props: GetDogOwnerJobsRequestProps) => Promise<BaseResponseWithData<Job[]>>;
  updateJob: (props: UpdateJobRequestProps) => Promise<BaseResponse>;
  deleteJob: (props: DeleteJobRequestProps) => Promise<BaseResponse>;
}

export class JobApi implements JobApiService {
  async createJob(props: CreateJobRequestProps) {
    const query = '/Job/job-request';
    const { data } = await $api.post<BaseResponse>(query, props);
    return data;
  }

  async getJob(props: GetJobRequestProps) {
    const query = `/Job/job-request${props.id ? `/?id=${props.id}` : ''}`;
    const { data } = await $api.get<BaseResponseWithData<Job>>(query);
    return data;
  }

  async getPageOfJobs(props: GetPageOfJobsRequestProps) {
    const query = `/Job/job-requests
    ?${props.nameSearchTerm ?? `nameSearchTerm=${props.nameSearchTerm}`}
    &${props.sortColumn ?? `sortColumn=${props.sortColumn}`}
    &${props.sortOrder ?? `sortOrder=${props.sortOrder}`}
    &pageCount=${props.pageCount}
    &page=${props.pageCount}`;

    const { data } = await $api.get<BaseResponseWithData<Job[]>>(query);
    return data;
  }

  async getDogOwnerJobs(props: GetDogOwnerJobsRequestProps) {
    const query = `/Job/dog-owner/${props.id}/job-requests`;

    const { data } = await $api.get<BaseResponseWithData<Job[]>>(query);
    return data;
  }

  async updateJob(props: UpdateJobRequestProps) {
    const query = '/Job/job-request';
    const { data } = await $api.put<BaseResponse>(query, props);
    return data;
  }

  async deleteJob(props: DeleteJobRequestProps) {
    const query = `/Job/job-request/${props.id ?? ''}`;
    const { data } = await $api.delete<BaseResponse>(query);
    return data;
  }

}