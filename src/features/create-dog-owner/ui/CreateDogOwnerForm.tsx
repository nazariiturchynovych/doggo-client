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
} from '@/shared/ui';
import { authenticationApi, RefreshTokenRequestProps } from '@/shared/api/auth-api';
import { DogOwnerSchema } from '@/features/create-dog-owner/models/models.ts';
import { useCreateDogOwner } from '@/features/create-dog-owner/lib/hooks';
import { useUserStore } from '@/entities/user';

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
  const { mutateAsync: createDogOwner, isPending: isLoadingCreate } = useCreateDogOwner();
  const getCurrentUser = useUserStore((state) => state.getCurrentUser);
  // Handler
  const handleSubmit = async (value: z.infer<typeof DogOwnerSchema>) => {
    const data = await createDogOwner(value);

    if (data.isSuccess) {
      const props: RefreshTokenRequestProps = {
        token: localStorage.getItem('token') || '',
        refreshToken: localStorage.getItem('refreshToken') || '',
      };

      const authData = await authenticationApi.refreshToken(props);
      if (authData.isSuccess) {
        localStorage.setItem('token', authData.data.token);
        localStorage.setItem('refreshToken', authData.data.refreshToken);

        await getCurrentUser();

        navigate(`/dog-owner-profile/${data.data.id}`);
      }
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center p-5 shadow-md">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex w-full max-w-5xl flex-col  gap-9">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Write your address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="some street, some house, some number"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="district"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Write your district</FormLabel>
                <FormControl>
                  <Input placeholder="your district" type="text" {...field} />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-end gap-4">
            <Button type="button" className="shad-button_dark_4" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button type="submit" className="shad-button_primary whitespace-nowrap">
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
