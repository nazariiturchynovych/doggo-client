import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, Loader, SimpleFormInput } from '@/shared/ui';
import { JobSchema } from '@/features/create-job/models/models.ts';
import { CreateJobRequestProps } from '@/shared/api/job-api';
import { FC } from 'react';
import { useCreateJob } from '@/shared/hooks';

type JobFormProps = {
  jobRequestId: string;
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
          <SimpleFormInput
            fieldLabel={'Write here if you want to tell something to owner:'}
            inputPlaceholder={'Go near river, allow to play with other dogs'}
            fieldName={'comment'}
            inputType={''}
            textArea={true}
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
