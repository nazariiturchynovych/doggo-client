import { BaseResponse, BaseResponseWithData, PageOf } from '@/shared/api/result';
import $api from '@/shared/lib/config/axios.ts';
import {
  CreateJobRequestRequestProps,
  DeleteJobRequestRequestProps,
  GetPageOfJobRequestsRequestProps,
  GetJobRequestRequestProps,
  UpdateJobRequestRequestProps,
  GetDogOwnerJobRequestsRequestProps,
} from '@/shared/api/job-request-api/models/requests.ts';
import { JobRequest } from '@/entities/jobRequest/model/models.ts';

export interface JobRequestApiService {
  createJobRequest: (props: CreateJobRequestRequestProps) => Promise<BaseResponse>;
  getJobRequest: (props: GetJobRequestRequestProps) => Promise<BaseResponseWithData<JobRequest>>;
  getPageOfJobRequests: (
    props: GetPageOfJobRequestsRequestProps,
  ) => Promise<BaseResponseWithData<PageOf<JobRequest>>>;
  getDogOwnerJobRequests: (
    props: GetDogOwnerJobRequestsRequestProps,
  ) => Promise<BaseResponseWithData<JobRequest[]>>;
  updateJobRequest: (props: UpdateJobRequestRequestProps) => Promise<BaseResponse>;
  deleteJobRequest: (props: DeleteJobRequestRequestProps) => Promise<BaseResponse>;
}

function createJobRequestsQuery(params: GetPageOfJobRequestsRequestProps): string {
  const { nameSearchTerm, sortColumn, sortOrder, pageCount, page } = params;

  const queryParams: string[] = [];

  // Add non-empty and defined optional parameters
  if (nameSearchTerm !== undefined && nameSearchTerm !== '') {
    queryParams.push(`nameSearchTerm=${encodeURIComponent(nameSearchTerm)}`);
  }

  if (sortColumn !== undefined && sortColumn !== '') {
    queryParams.push(`sortColumn=${encodeURIComponent(sortColumn)}`);
  }

  if (sortOrder !== undefined && sortOrder !== '') {
    queryParams.push(`sortOrder=${encodeURIComponent(sortOrder)}`);
  }

  // Add required parameters
  queryParams.push(`pageCount=${pageCount}`);
  queryParams.push(`page=${page}`);

  // Combine all parameters into a query string
  const queryString = queryParams.join('&');

  // Return the full query string
  return `/JobRequest/job-requests?${queryString}`;
}

export class JobRequestApi implements JobRequestApiService {
  async createJobRequest(props: CreateJobRequestRequestProps) {
    const query = '/JobRequest/job-request';
    const { data } = await $api.post<BaseResponse>(query, props);
    return data;
  }

  async getJobRequest(props: GetJobRequestRequestProps) {
    const query = `/JobRequest/job-request${props.id ? `/${props.id}` : ''}`;
    const { data } = await $api.get<BaseResponseWithData<JobRequest>>(query);
    return data;
  }

  async getPageOfJobRequests(props: GetPageOfJobRequestsRequestProps) {
    const query = createJobRequestsQuery(props);

    const { data } = await $api.get<BaseResponseWithData<PageOf<JobRequest>>>(query);
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
