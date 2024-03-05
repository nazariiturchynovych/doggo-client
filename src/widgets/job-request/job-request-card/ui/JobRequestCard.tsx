import React from 'react'
import { JobRequest } from '@/entities/jobRequest/model/models.ts';

type JobRequestCardProps = {
  jobRequest: JobRequest
}

const JobRequestCard: React.FC<JobRequestCardProps> = ({jobRequest}) => {
  return <div className='flex gap-3 border shadow-md max-w-96 w-full'>
    <div className='w-full p-2 border'>{jobRequest.id.toString()}</div>
    <div className='w-full p-2 border'>{jobRequest.dogOwnerId.toString()}</div>
    <div className='w-full p-2 border'>{jobRequest.description}</div>
    <div className='w-full p-2 border'>{jobRequest.hasAcceptedJob}</div>
    <div className='w-full p-2 border'>{jobRequest.paymentTo}</div>
    <div className='w-full p-2 border'>{jobRequest.isPersonalIdentifierRequired}</div>
    <div className='w-full p-2 border'>{jobRequest.requiredAge}</div>
    <div className='w-full p-2 border'>{jobRequest.requiredSchedule.from.toString()}</div>
  </div>
}

export default JobRequestCard;