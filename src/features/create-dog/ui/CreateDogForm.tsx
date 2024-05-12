import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, Loader, SimpleFormInput } from '@/shared/ui';
import { DogSchema } from '@/features/create-dog/models/models.ts';
import { Guid } from 'typescript-guid';
import { useUserStore } from '@/entities/user';
import { useCreateDog } from '@/shared/hooks';

const DogForm = () => {
  const user = useUserStore((state) => state.user);

  const form = useForm<z.infer<typeof DogSchema>>({
    resolver: zodResolver(DogSchema),
    defaultValues: {
      name: '',
      age: 0,
      description: '',
      weight: 0,
      dogOwnerId: '',
    },
  });

  // Query
  const { mutateAsync: createDog, isPending: isLoadingCreate } = useCreateDog();

  // Handler
  const handleSubmit = async (value: z.infer<typeof DogSchema>) => {
    console.log(value);
    value.dogOwnerId = user.dogOwnerId?.toString() || Guid.EMPTY.toString();
    console.log('fsdfds');
    await createDog(value);
  };

  return (
    <div className="flex h-auto items-center justify-center sm:p-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex w-full max-w-5xl flex-col  gap-9">
          <SimpleFormInput
            fieldLabel={'Name of your doggie'}
            fieldName={'name'}
            inputType={'text'}
          />
          <SimpleFormInput
            fieldLabel={'What is age of your dog'}
            fieldName={'age'}
            inputType={'number'}
          />
          <SimpleFormInput
            fieldLabel={'How much does your dog weigh?'}
            fieldName={'weight'}
            inputType={'number'}
          />
          <SimpleFormInput
            fieldLabel={'Write about your dog'}
            fieldName={'description'}
            inputPlaceholder={'Love to smile, bite sticks, swiw through Atlantic ocean'}
            inputType={''}
            textArea={true}
          />
          <div className="flex items-center justify-between gap-4">
            <Button type="submit" className="min-w-28 whitespace-nowrap">
              {isLoadingCreate ? <Loader color={'white'} /> : 'Add dog'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default DogForm;
