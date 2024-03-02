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
  FormMessage, Input,
} from '@/shared/ui';
import { Button, Loader } from '@/shared/ui';
import { authenticationApi, RefreshTokenRequestProps } from '@/shared/api/auth-api';
import { DogOwnerSchema } from '@/features/create-dog-owner/models/models.ts';
import { useCreateDogOwner } from '@/features/create-dog-owner/lib/hooks';

const DogOwnerForm = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof DogOwnerSchema>>({
    resolver: zodResolver(DogOwnerSchema),
    defaultValues: {
      address: '',
      district: '',
    },
  });

  // Query
  const { mutateAsync: createWalker, isPending: isLoadingCreate } = useCreateDogOwner();

  // Handler
  const handleSubmit = async (value: z.infer<typeof DogOwnerSchema>) => {
    const data = await createWalker(value);

    console.log('result dog owner', data);
    if (data.isSuccess) {
      const props: RefreshTokenRequestProps = {
        token: localStorage.getItem('token') || '',
        refreshToken: localStorage.getItem('refreshToken') || '',
      };

      const data = await authenticationApi.refreshToken(props);
      if (data.isSuccess) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('refreshToken', data.data.refreshToken);
      }
    }

    navigate('/');
  };

  return (
    <div className='flex justify-center items-center p-5 shadow-md h-auto'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className='flex w-full max-w-5xl flex-col  gap-9'>
          <FormField
            control={form.control}
            name='address'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='shad-form_label'>Write your address</FormLabel>
                <FormControl>
                  <Input
                    placeholder='some street, some house, some number'
                    type='text'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='shad-form_message' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='district'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='shad-form_label'>Write your district</FormLabel>
                <FormControl>
                  <Input
                    placeholder='your district'
                    type='text'
                    {...field}
                  />

                </FormControl>
                <FormMessage className='shad-form_message' />
              </FormItem>
            )}
          />

          <div className='flex items-center justify-end gap-4'>
            <Button type='button' className='shad-button_dark_4' onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button
              type='submit'
              className='shad-button_primary whitespace-nowrap'>
              {isLoadingCreate && <Loader />}
              Become DogOwner
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default DogOwnerForm;
