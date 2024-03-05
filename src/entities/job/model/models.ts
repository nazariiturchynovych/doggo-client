import { Guid } from 'typescript-guid';
import { Dog } from '@/entities/dog/model/models.ts';
import { JobRequest } from '@/entities/jobRequest/model/models.ts';

export type Job = {
  id: Guid,
  walkerId: Guid,
  dogOwnerId: Guid,
  dogId: Guid,
  comment: string,
  salary: number,
  jobStatus: JobStatus,
  dog: Dog,
  jobRequest: JobRequest
};

export enum JobStatus {
  applied,
  accepted,
  rejected,
}