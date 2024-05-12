import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, FormMessage, Loader, SimpleFormInput } from '@/shared/ui';
import { useUserStore } from '@/entities/user';
import { JobRequestSchema } from '@/features/create-job-request/models/models.ts';
import { DogCarouselInput } from '@/features/create-job-request/ui/DogCarouselInput.tsx';
import DateTimePicker from '@/features/create-job-request/ui/DateTimePicker.tsx';
import { useCreateJobRequest, useGetDogOwnerDogs } from '@/shared/hooks';

const JobRequestForm = () => {
  const user = useUserStore((state) => state.user);
  const { mutateAsync: createJobRequest, isPending: isLoadingCreate } = useCreateJobRequest();
  const { data } = useGetDogOwnerDogs({ id: user.dogOwnerId || '' });

  const form = useForm<z.infer<typeof JobRequestSchema>>({
    resolver: zodResolver(JobRequestSchema),
    defaultValues: {
      description: '',
      dogId: '',
      isPersonalIdentifierRequired: false,
      paymentTo: 0,
      requiredAge: 0,
      requiredScheduleResponse: { from: new Date().toISOString(), to: new Date().toISOString() },
    },
  });

  const handleSubmit = async (value: z.infer<typeof JobRequestSchema>) => {
    console.log(value);

    const response = await createJobRequest(value);

    console.log('response', response);
  };

  const buttonDisabled = data?.data && data.data.length > 0;

  return (
    <div className="flex h-auto items-center justify-center sm:p-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex w-full max-w-3xl flex-col justify-center gap-9">
          <DogCarouselInput
            dogs={data?.data ?? []}
            onSelect={(dogId) => {
              console.log(form.getValues('dogId'));
              form.setValue('dogId', dogId);
            }}
          />
          <DateTimePicker
            setScheduleValue={(timeFrom, timeTo) => {
              form.setValue('requiredScheduleResponse', {
                from: timeFrom.toISOString(),
                to: timeTo.toISOString(),
              });
            }}
          />
          <SimpleFormInput
            inputPlaceholder={'Go near river, allow to iteract with other dogs'}
            fieldLabel={'Describe what you want from walker:'}
            fieldName={'description'}
            inputType={''}
            textArea={true}
          />
          <SimpleFormInput
            fieldLabel={'Walker need to have personal identifier?'}
            fieldName={'isPersonalIdentifierRequired'}
            inputType={'checkbox'}
          />
          <SimpleFormInput fieldLabel={'Payment:'} fieldName={'paymentTo'} inputType={'number'} />
          <SimpleFormInput
            fieldLabel={'How old need to be walker?'}
            fieldName={'requiredAge'}
            inputType={'number'}
          />
          <div className="flex w-full min-w-52 flex-col items-center justify-center gap-4">
            {!buttonDisabled && <FormMessage>Please create dog first</FormMessage>}
            <Button
              disabled={!buttonDisabled}
              type="submit"
              className=" min-w-52 whitespace-nowrap">
              {!isLoadingCreate ? 'Create JobRequest' : <Loader color={'white'} />}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default JobRequestForm;
