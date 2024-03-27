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
  Loader,
  Textarea,
} from '@/shared/ui';
import { WalkerSchema } from '@/features/create-walker/models/models.ts';
import { authenticationApi, RefreshTokenRequestProps } from '@/shared/api/auth-api';
import { useCreateWalker } from '@/features/create-walker/lib/hooks';

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
          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Write about your skills</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Training, first aid, etc."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Write bout yourself</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    {...field}
                  />
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
              Create Walker
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default WalkerForm;
