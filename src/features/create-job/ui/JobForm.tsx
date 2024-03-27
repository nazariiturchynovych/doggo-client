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
  FormMessage,
  Textarea,
} from '@/shared/ui';
import { Button, Loader } from '@/shared/ui';
import { JobSchema } from '@/features/create-job/models/models.ts';
import { useCreateJob } from '@/features/create-job/lib/hooks';
import { CreateJobRequestProps } from '@/shared/api/job-api';
import { Guid } from 'typescript-guid';
import { FC } from 'react';

type JobFormProps = {
  jobRequestId: Guid;
};

const JobForm: FC<JobFormProps> = ({ jobRequestId }) => {
  const navigate = useNavigate();
  const { mutateAsync: createJob, isPending: isLoadingCreate } = useCreateJob();

  const form = useForm<z.infer<typeof JobSchema>>({
    resolver: zodResolver(JobSchema),
    defaultValues: {
      jobRequestId: jobRequestId.toString(),
      comment: '',
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
    <div className="flex h-auto items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex w-full max-w-3xl flex-col  items-center justify-center gap-9">
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-bold">
                  Write here if you want to tell something to owner
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Go near river, allow to iteract with other dogs"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full items-center justify-between gap-4">
            <Button type="submit" className=" w-full">
              {isLoadingCreate ? <Loader /> : 'Apply'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default JobForm;
