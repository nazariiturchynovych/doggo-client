import React from 'react';
import { Button, Form, Loader, SimpleFormInput } from '@/shared/ui';
import { SheetClose, SimpleFormSheet } from '@/shared/ui/sheet.tsx';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateWalker } from '@/shared/hooks';
import { UpdateWalkerSchema } from '@/features/update-walker';

type UpdateWalkerProps = {
  walkerId: string;
};

export const UpdateWalkerForm: React.FC<UpdateWalkerProps> = ({ walkerId }) => {
  const { mutateAsync: updateWalker, isPending: isLoadingCreate } = useUpdateWalker(walkerId);

  const walkerForm = useForm<z.infer<typeof UpdateWalkerSchema>>({
    resolver: zodResolver(UpdateWalkerSchema),
    defaultValues: {
      id: '',
      skills: '',
      about: '',
    },
  });

  const handleSubmit = async (value: z.infer<typeof UpdateWalkerSchema>) => {
    value.id = walkerId;
    await updateWalker(value);
  };

  return (
    <SimpleFormSheet
      triggerText={'Edit'}
      tittle={'Edit walker information'}
      description={"Make changes to your profile here. Click save when you're done."}>
      <Form {...walkerForm}>
        <form
          onSubmit={walkerForm.handleSubmit(handleSubmit)}
          className="flex w-full max-w-5xl flex-col gap-1">
          <SimpleFormInput
            fieldLabel={'Skills:'}
            fieldName={'skills'}
            inputType={''}
            textArea={true}
          />
          <SimpleFormInput
            fieldLabel={'About'}
            fieldName={'about'}
            inputType={''}
            textArea={true}
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
