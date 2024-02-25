import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage, Input, Loader,
} from '@/shared/ui';
import { useSignUp } from '@/features/auth/sign-up/lib/hooks';
import { useGetCurrentUser, useSignInUser } from '@/features/auth/sign-in';
import { SignUpSchema } from '@/features/auth/sign-up/models/models.ts';
import { useToast } from '@/shared/ui/use-toast.ts';

function SignUpForm() {
  const { toast } = useToast();
  const { mutateAsync, isPending } = useSignUp();
  const { mutateAsync: loginUser } = useSignInUser();
  const { mutateAsync: getCurrentUser } = useGetCurrentUser();
  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      age: 0,
      phoneNumber: '',
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof SignUpSchema>) => {
    const response = await mutateAsync(values);

    console.log(response);
    if (response && response.isFailure) {
      toast({
        title: 'registration is failed, please try again',
        description: `${response.errorMessage}`,
      });
    }
    if (response.isSuccess) {
      const loginResponse = await loginUser(values);

      console.log(loginResponse);

      if (loginResponse.isSuccess) {
        await getCurrentUser();

        navigate('/');
      }
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
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='firstName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input type='text' placeholder='First Name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='lastName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input type='text' placeholder='Last Name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='age'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input type='number' placeholder='Age' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='phoneNumber'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input type='text' placeholder='Phone Number' {...field} />
              </FormControl>
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
            'Sign Up'
          )}
        </Button>
      </form>
    </Form>
  );
}

export default SignUpForm;