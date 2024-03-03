import { BaseResponse, BaseResponseWithData } from '@/shared/api/result';
import $api from '@/shared/lib/config/axios.ts';
import {
  CreateJobRequestRequestProps,
  DeleteJobRequestRequestProps,
  GetPageOfJobRequestsRequestProps,
  GetJobRequestRequestProps,
  UpdateJobRequestRequestProps, GetDogOwnerJobRequestsRequestProps,
} from '@/shared/api/job-request-api/models/requests.ts';
import { JobRequest } from '@/entities/jobRequest/model/models.ts';


export interface JobRequestApiService {
  createJobRequest: (props: CreateJobRequestRequestProps) => Promise<BaseResponse>;
  getJobRequest: (props: GetJobRequestRequestProps) => Promise<BaseResponseWithData<JobRequest>>;
  getPageOfJobRequests: (props: GetPageOfJobRequestsRequestProps) => Promise<BaseResponseWithData<JobRequest[]>>;
  getDogOwnerJobRequests: (props: GetDogOwnerJobRequestsRequestProps) => Promise<BaseResponseWithData<JobRequest[]>>;
  updateJobRequest: (props: UpdateJobRequestRequestProps) => Promise<BaseResponse>;
  deleteJobRequest: (props: DeleteJobRequestRequestProps) => Promise<BaseResponse>;
}

export class JobRequestApi implements JobRequestApiService {
  async createJobRequest(props: CreateJobRequestRequestProps) {
    const query = '/JobRequest/job-request';
    const { data } = await $api.post<BaseResponse>(query, props);
    return data;
  }

  async getJobRequest(props: GetJobRequestRequestProps) {
    const query = `/JobRequest/job-request${props.id ? `/?id=${props.id}` : ''}`;
    const { data } = await $api.get<BaseResponseWithData<JobRequest>>(query);
    return data;
  }

  async getPageOfJobRequests(props: GetPageOfJobRequestsRequestProps) {
    const query = `/JobRequest/job-requests
    ?${props.nameSearchTerm ?? `nameSearchTerm=${props.nameSearchTerm}`}
    &${props.sortColumn ?? `sortColumn=${props.sortColumn}`}
    &${props.sortOrder ?? `sortOrder=${props.sortOrder}`}
    &pageCount=${props.pageCount}
    &page=${props.pageCount}`;

    const { data } = await $api.get<BaseResponseWithData<JobRequest[]>>(query);
    return data;
  }

  async getDogOwnerJobRequests(props: GetDogOwnerJobRequestsRequestProps) {
    const query = `/JobRequest/dog-owner/${props.id}/job-requests`;

    const { data } = await $api.get<BaseResponseWithData<JobRequest[]>>(query);
    return data;
  }

  async updateJobRequest(props: UpdateJobRequestRequestProps) {
    const query = '/JobRequest/job-request';
    const { data } = await $api.put<BaseResponse>(query, props);
    return data;
  }

  async deleteJobRequest(props: DeleteJobRequestRequestProps) {
    const query = `/JobRequest/job-request/${props.id ?? ''}`;
    const { data } = await $api.delete<BaseResponse>(query);
    return data;
  }

}