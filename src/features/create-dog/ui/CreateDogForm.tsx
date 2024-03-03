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
import { DogSchema } from '@/features/create-dog/models/models.ts';
import { useCreateDog } from '@/features/create-dog/lib/hooks';
import { Guid } from 'typescript-guid';
import { useUserStore } from '@/entities/user';

const DogForm = () => {
  const user = useUserStore(state => state.user)

  const navigate = useNavigate();
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
    value.dogOwnerId = user.dogOwnerId?.toString() || Guid.EMPTY.toString();

    const response = await createDog(value);

    if (response.isSuccess) {
      navigate('/');
    }

  };

  return (
    <div className='flex justify-center items-center p-5 shadow-md h-auto'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className='flex w-full max-w-5xl flex-col  gap-9'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='shad-form_label'>Name of your doggie</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage className='shad-form_message' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='age'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='shad-form_label'>What is age of your dog</FormLabel>
                <FormControl>
                  <Input type="number" className="shad-input" {...field} value={field.value} />
                </FormControl>
                <FormMessage className='shad-form_message' />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='shad-form_label'>Write about your dog</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Love to smile, bite sticks, swiw through Atlantic ocean'
                    className='resize-none'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='shad-form_message' />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='weight'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='shad-form_label'>How much does your dog weigh?</FormLabel>
                <FormControl>
                  <Input type="number" step={0.1} className="shad-input" {...field} />
                </FormControl>
                <FormMessage className='shad-form_message' />
              </FormItem>
            )}
            />

          <div className='flex items-center justify-between gap-4'>
            <Button type='button' className='shad-button_dark_4' onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button
              type='submit'
              className='shad-button_primary whitespace-nowrap'>
              {isLoadingCreate && <Loader />}
              Create Dog
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default DogForm;
