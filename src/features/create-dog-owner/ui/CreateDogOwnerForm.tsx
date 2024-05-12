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
import { CreateDogOwnerSchema } from '@/features/create-dog-owner/models';
import { useCreateDogOwner } from '@/shared/hooks';

const DogOwnerForm = () => {
  const form = useForm<z.infer<typeof CreateDogOwnerSchema>>({
    resolver: zodResolver(CreateDogOwnerSchema),
    defaultValues: {
      address: '',
      district: '',
    },
  });

  const { mutateAsync: createDogOwner, isPending: isLoadingCreate } = useCreateDogOwner();

  const handleSubmit = async (value: z.infer<typeof CreateDogOwnerSchema>) => {
    await createDogOwner(value);
  };

  return (
    <Dialog>
      <div className={'flex h-full w-full items-center justify-center'}>
        <DialogTrigger asChild>
          <Button className={'w-full'}>Become DogOwner</Button>
        </DialogTrigger>
      </div>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex h-auto w-full items-center justify-center sm:p-5 ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex w-full max-w-5xl flex-col gap-5">
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
                <Button type="submit" className="shad-button_primary whitespace-nowrap">
                  {isLoadingCreate && <Loader />}
                  Become DogOwner
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DogOwnerForm;
