import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Loader,
  Textarea,
} from '@/shared/ui';
import { useUserStore } from '@/entities/user';
import { JobRequestSchema } from '@/features/create-job-request/models/models.ts';
import { useCreateJobRequest, useGetDogOwnerDogs } from '@/features/create-job-request/lib/hooks';
import { DogCarouselInput } from '@/features/create-job-request/ui/DogCarouselInput.tsx';
import DateTimePicker from '@/features/create-job-request/ui/DateTimePicker.tsx';
import { CreateJobRequestRequestProps } from '@/shared/api/job-request-api';

const JobRequestForm = () => {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
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
      requiredScheduleResponse: { from: new Date(), to: new Date() },
    },
  });

  const handleSubmit = async (value: z.infer<typeof JobRequestSchema>) => {
    const response = await createJobRequest(value as CreateJobRequestRequestProps);

    console.log('response', response);

    if (response.isSuccess) {
      navigate('/');
    }
  };

  return (
    <div className="flex h-auto items-center justify-center p-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex w-full max-w-3xl flex-col  items-center justify-center gap-9">
          <DogCarouselInput
            dogs={data?.data ?? []}
            onSelect={(dogId) => {
              console.log(form.getValues('dogId'));
              form.setValue('dogId', dogId);
            }}
          />

          <DateTimePicker
            setValueFrom={(timeFrom) => {
              form.setValue('requiredScheduleResponse', {
                from: timeFrom,
                to: form.getValues('requiredScheduleResponse.to'),
              });
            }}
            setValueTo={(timeTo) => {
              form.setValue('requiredScheduleResponse', {
                from: form.getValues('requiredScheduleResponse.from'),
                to: timeTo,
              });
            }}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Describe what you want from walker</FormLabel>
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

          <FormField
            control={form.control}
            name="isPersonalIdentifierRequired"
            render={({ field }) => (
              <FormItem className="flex w-full items-center gap-5 p-2">
                <FormLabel>Walker need to have personal identifier?</FormLabel>
                <FormControl>
                  <Input type="checkbox" {...field} className="w-10" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="paymentTo"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Payment</FormLabel>
                <FormControl>
                  <Input type="number" {...field} value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="requiredAge"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>How old need to be walker?</FormLabel>
                <FormControl>
                  <Input type="number" {...field} value={field.value} />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />

          <div className="flex w-full items-center justify-center gap-4">
            <Button type="submit" className=" whitespace-nowrap">
              {isLoadingCreate && <Loader />}
              Create JobRequest
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default JobRequestForm;
