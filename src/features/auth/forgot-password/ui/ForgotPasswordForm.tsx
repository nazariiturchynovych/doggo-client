import * as z from 'zod';
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
import { ForgotPasswordSchema } from '@/features/auth/forgot-password/models/models.ts';
import { useForgotPassword } from '@/shared/hooks';

export function ForgotPasswordForm() {
  const { mutateAsync: resetPasswordAsync, isPending, data } = useForgotPassword();

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof ForgotPasswordSchema>) => {
    await resetPasswordAsync(values);
  };

  return data ? (
    <div className="max-w-[1100px]">
      <p className="mb-0 mt-5 text-2xl">Forgot your Doggo Account </p>
      <p className="mb-0 mt-5 text-xl">
        We’ll check to see whether an account is associated with "{form.getValues('email')}" and if
        so, we will send you instructions on how to reset your password. If you do not receive an
        email from us, please make sure to use a valid email address to reset the password of your
        account.
      </p>
    </div>
  ) : (
    <>
      <p className="mb-0 mt-5 text-lg">Forgot your Doggo Account password?</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" type="email" {...field} />
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
              'Send email'
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
