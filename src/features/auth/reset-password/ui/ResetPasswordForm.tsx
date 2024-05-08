import * as z from 'zod';
import { Link, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
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
import { ConfirmForgotPasswordSchema } from '../models/models.ts';
import { useConfirmForgotPassword } from '@/shared/hooks';

export function ResetPasswordForm() {
  const [searchParams] = useSearchParams();
  const { mutateAsync: resetPasswordAsync, isPending, data } = useConfirmForgotPassword();

  const form = useForm<z.infer<typeof ConfirmForgotPasswordSchema>>({
    resolver: zodResolver(ConfirmForgotPasswordSchema),
    defaultValues: {
      email: '',
      newPassword: '',
      confirmPassword: '',
      token: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof ConfirmForgotPasswordSchema>) => {
    values.email = searchParams.get('email') || '';
    values.token = searchParams.get('token') || '';
    await resetPasswordAsync(values);
  };

  return data && data.isSuccess ? (
    <>
      <p className="mb-3 mt-5 text-lg">You successfully changed your password</p>
      <Button>
        <Link to="/sign-in">Return to Login</Link>
      </Button>
    </>
  ) : (
    <>
      <p className="mb-0 mt-5 text-lg">Please write your new password?</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-5">
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="New password"
                    type="password"
                    autoComplete={'on'}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Confirm password"
                    type="password"
                    autoComplete={'on'}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            {isPending ? (
              <div className="flex-center gap-2">
                <Loader />
              </div>
            ) : (
              'Log in'
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
