import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, Loader, SimpleFormInput } from '@/shared/ui';
import { authenticationApi, RefreshTokenRequestProps } from '@/shared/api/auth-api';
import { DogOwnerSchema } from '@/features/create-dog-owner/models/models.ts';
import { useUserStore } from '@/entities/user';
import { useCreateDogOwner } from '@/shared/hooks';

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
          <SimpleFormInput
            fieldLabel={'Write your address'}
            inputPlaceholder={'some street, some house, some number'}
            fieldName={'address'}
            inputType={'text'}
          />
          <SimpleFormInput
            fieldLabel={'Write your district'}
            fieldName={'district'}
            inputType={'text'}
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
