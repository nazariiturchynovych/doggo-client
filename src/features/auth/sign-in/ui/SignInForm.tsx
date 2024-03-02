import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form.tsx';
import { Button, Input, Loader } from '@/shared/ui';
import { SignInSchema } from '@/features/auth/sign-in/models/models.ts';
import { useSignInUser } from '@/features/auth/sign-in/lib/hooks';
import { useGetCurrentUser } from '@/shared/lib/hooks/user';
import { LoginGoogle, LoginFacebook } from '@/features/auth/sign-in';

function SignInForm() {
  const { mutateAsync: loginUser, isPending } = useSignInUser();
  const { mutateAsync: getCurrentUser } = useGetCurrentUser();

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof SignInSchema>) => {
    const loginResponse = await loginUser(values);
    if (loginResponse.isSuccess) {
      await getCurrentUser();
      navigate('/');
    }
  };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex w-full flex-col gap-5'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Email' type='email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder='Password' {...field} />
              </FormControl>
              <Button variant='link' className=' block h-0 w-full px-0 pb-2 pt-0 text-end'>
                <Link to={'/forgot-password'}>Forgot password?</Link>
              </Button>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>
          {isPending ? (
            <div className='flex-center gap-2'>
              <Loader />
            </div>
          ) : (
            'Log in'
          )}
        </Button>
        <div className='flex flex-col'>
          <p>
            Dont have an account?{' '}
            <Button variant='link' className=' px-0 text-base'>
              <Link to={'/sign-up'}>Register</Link>
            </Button>
          </p>
          <div
            className="relative my-4 flex w-full items-center justify-center before:flex-1 before:border-[1px] before:border-b-black before:content-[''] after:flex-1 after:border-[1px] after:border-b-black after:content-['']">
            <p className='mx-4 mb-0 text-center text-xl font-semibold dark:text-white'>Or</p>
          </div>
          <div className='flex flex-row items-center justify-center gap-2 lg:justify-start'>
            <LoginGoogle />
            <LoginFacebook />
          </div>
        </div>
      </form>
    </Form>
  );
}

export default SignInForm;
