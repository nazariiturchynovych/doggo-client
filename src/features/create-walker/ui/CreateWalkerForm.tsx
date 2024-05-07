import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, Loader, SimpleFormInput } from '@/shared/ui';
import { WalkerSchema } from '@/features/create-walker/models/models.ts';
import { authenticationApi, RefreshTokenRequestProps } from '@/shared/api/auth-api';
import { useCreateWalker } from '@/shared/hooks';

const WalkerForm = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof WalkerSchema>>({
    resolver: zodResolver(WalkerSchema),
    defaultValues: {
      skills: '',
      about: '',
    },
  });

  // Query
  const { mutateAsync: createWalker, isPending: isLoadingCreate } = useCreateWalker();

  // Handler
  const handleSubmit = async (value: z.infer<typeof WalkerSchema>) => {
    console.log('fsdafsafa');
    const data = await createWalker(value);

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

    navigate(`/walker-profile/${data.data.id}`);
  };

  return (
    <div className="flex h-auto items-center justify-center p-5 shadow-md">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex w-full max-w-5xl flex-col  gap-9">
          <SimpleFormInput
            inputPlaceholder={'Training, first AID'}
            fieldLabel={'Skills:'}
            fieldName={'skills'}
            inputType={''}
            textArea={true}
          />
          <div className={'flex w-full justify-between'}></div>
          <SimpleFormInput
            inputPlaceholder={'Love corgies'}
            fieldLabel={'About'}
            fieldName={'about'}
            inputType={''}
            textArea={true}
          />

          <div className="flex items-center justify-end gap-4">
            <Button type="button" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button type="submit">{isLoadingCreate ? <Loader /> : 'Create Walker'}</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default WalkerForm;
