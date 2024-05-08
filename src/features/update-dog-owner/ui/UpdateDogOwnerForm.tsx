import React from 'react';
import { Button, Form, Loader, SimpleFormInput } from '@/shared/ui';
import { SheetClose, SimpleFormSheet } from '@/shared/ui/sheet.tsx';
import { useUpdateDogOwner } from '@/shared/hooks';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateDogOwnerSchema } from '@/features/update-dog-owner';

type UpdateDogOwnerProps = {
  dogOwnerId: string;
};

export const UpdateDogOwnerForm: React.FC<UpdateDogOwnerProps> = ({ dogOwnerId }) => {
  const { mutateAsync: updateDogOwner, isPending: isLoadingCreate } = useUpdateDogOwner(dogOwnerId);

  const dogOwnerForm = useForm<z.infer<typeof UpdateDogOwnerSchema>>({
    resolver: zodResolver(UpdateDogOwnerSchema),
    defaultValues: {
      id: '',
      address: '',
      district: '',
    },
  });
  const handleSubmit = async (value: z.infer<typeof UpdateDogOwnerSchema>) => {
    value.id = dogOwnerId;
    await updateDogOwner(value);
  };

  return (
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
  );
};
