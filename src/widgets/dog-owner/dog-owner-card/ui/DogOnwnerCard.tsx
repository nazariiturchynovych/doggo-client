import React from 'react';
import { Button, Form, Loader, SimpleFormInput, ToastAction, useToast } from '@/shared/ui';
import { DogOwnerCardSkeleton } from '@/widgets/dog-owner/dog-owner-card/ui/DogOwnerCardSkeleton.tsx';
import { SheetClose, SimpleFormSheet } from '@/shared/ui/sheet.tsx';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { DogOwnerSchema } from '@/features/create-dog-owner/models/models.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGetDogOwner, useUpdateDogOwner } from '@/shared/hooks';

type DogOwnerCardProps = {
  dogOwnerId: string;
};

export const DogOwnerCard: React.FC<DogOwnerCardProps> = ({ dogOwnerId }) => {
  const { data: dogOwnerResponse, isLoading: isDogOwnerLoading } = useGetDogOwner({
    id: dogOwnerId,
  });
  const { toast } = useToast();

  const { mutateAsync: updateDogOwner, isPending: isLoadingCreate } = useUpdateDogOwner(dogOwnerId);

  const dogOwnerForm = useForm<z.infer<typeof DogOwnerSchema>>({
    resolver: zodResolver(DogOwnerSchema),
    defaultValues: {
      id: '',
      address: '',
      district: '',
    },
  });
  const handleSubmit = async (value: z.infer<typeof DogOwnerSchema>) => {
    console.log('dsadas');
    value.id = dogOwnerId;
    await updateDogOwner(value);
  };

  if (!dogOwnerResponse || isDogOwnerLoading) {
    return <DogOwnerCardSkeleton />;
  }

  if (dogOwnerResponse.isFailure) {
    toast({
      title: 'Cant find dogOwner',
      description: 'there is no dogOwner with this id',
      action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
    });
    return <DogOwnerCardSkeleton />;
  } //TODO

  const dogOwner = dogOwnerResponse.data;

  return (
    <div className={'flex flex-col justify-between gap-2 sm:flex-row'}>
      <div className={'flex flex-col gap-1'}>
        <div className={'font-semibold'}>DogOwner Info</div>
        <div className={'flex gap-2'}>Address: {dogOwner.address}</div>
        <div className={'flex gap-2'}>District: {dogOwner.district}</div>
      </div>
      <SimpleFormSheet
        triggerText={'Edit'}
        tittle={'Edit dog owner information'}
        description={"Make changes to your profile here. Click save when you're done."}>
        <Form {...dogOwnerForm}>
          <form
            onSubmit={dogOwnerForm.handleSubmit(handleSubmit)}
            className="flex w-full max-w-5xl flex-col gap-1">
            <SimpleFormInput
              fieldLabel={'Address:'}
              fieldName={'address'}
              inputType={''}
              textArea={true}
              isInputDisabled={false}
            />
            <div className={'flex w-full justify-between'}></div>
            <SimpleFormInput
              fieldLabel={'District:'}
              fieldName={'district'}
              inputType={''}
              textArea={true}
              isInputDisabled={false}
            />
            <SheetClose>
              <Button className={'mt-2 w-full'} type={'submit'}>
                {isLoadingCreate ? <Loader /> : 'Save Changes'}
              </Button>
            </SheetClose>
          </form>
        </Form>
      </SimpleFormSheet>
    </div>
  );
};
