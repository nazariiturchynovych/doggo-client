import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  Form,
  Loader,
  SimpleFormInput,
} from '@/shared/ui';
import { useCreateWalker } from '@/shared/hooks';
import { CreateWalkerSchema } from '@/features/create-walker/models';

const WalkerForm = () => {
  const form = useForm<z.infer<typeof CreateWalkerSchema>>({
    resolver: zodResolver(CreateWalkerSchema),
    defaultValues: {
      skills: '',
      about: '',
    },
  });

  const { mutateAsync: createWalker, isPending: isLoadingCreate } = useCreateWalker();

  const handleSubmit = async (value: z.infer<typeof CreateWalkerSchema>) => {
    await createWalker(value);
  };

  return (
    <Dialog>
      <div className={'flex h-full w-full items-center justify-center'}>
        <DialogTrigger asChild>
          <Button className={'w-full'}>Become Walker</Button>
        </DialogTrigger>
      </div>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex h-auto items-center justify-center sm:p-5">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex w-full max-w-5xl flex-col gap-5">
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
                <Button type="submit">{isLoadingCreate ? <Loader /> : 'Become Walker'}</Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalkerForm;
