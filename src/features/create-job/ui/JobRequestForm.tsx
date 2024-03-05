import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage, Input, Textarea,
} from '@/shared/ui';
import { Button, Loader } from '@/shared/ui';
import { JobSchema } from '@/features/create-job/models/models.ts';
import { useCreateJob } from '@/features/create-job/lib/hooks';
import { CreateJobRequestProps } from '@/shared/api/job-api';
import React from 'react';
import { Guid } from 'typescript-guid';

type JobFormProps = {
  jobRequestId: Guid
}

const JobForm: React.FC<JobFormProps> = ({jobRequestId}) => {
  const navigate = useNavigate();
  const { mutateAsync: createJob, isPending: isLoadingCreate } = useCreateJob();


  const form = useForm<z.infer<typeof JobSchema>>({
    resolver: zodResolver(JobSchema),
    defaultValues: {
      jobRequestId: jobRequestId.toString(),
      comments: '',
      payment: 0
    },
  });

  const handleSubmit = async (value: z.infer<typeof JobSchema>) => {
    const response = await createJob(value as CreateJobRequestProps);
    console.log('response', response);

    if (response.isSuccess) {
      navigate('/');
    }

  };

  return (
    <div className='flex justify-center items-center p-5 shadow-md h-auto'> //Move to form

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className='flex w-full max-w-3xl flex-col  gap-9 justify-center items-center'>

          <FormField
            control={form.control}
            name='comments'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel >Write here if you want to tell something to owner</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Go near river, allow to iteract with other dogs'
                    className='resize-none'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='payment'
            render={({ field }) => (
              <FormItem className='flex items-center gap-5 p-2 w-full'>
                <FormLabel>Write price you expected</FormLabel>
                <FormControl>
                  <Input type='number' {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <div className='flex items-center justify-between gap-4 w-full'>
            <Button type='button' onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button
              type='submit'
              className=' whitespace-nowrap'>
              {isLoadingCreate && <Loader />}
              Create Job
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default JobForm;
